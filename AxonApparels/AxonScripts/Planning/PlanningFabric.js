
var CompPlanningFabric = [];
var PlanFabric = [];
var PlanFabricDet = [];
var FabConItemList = [];
var ConFabItemList = [];
var PlanLoss = [];
var CmNo = 0;
var PlId = 0;
var Mod = 0;
var StyleRId = 0;
var CheckYarn = 0;
var bcid = 0;
var index = -1;
$(document).ready(function () {
    debugger;
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }
    var ItemId = queryvalue[1];
    var StyleRowId = queryvalue[3];
    StyleRId = queryvalue[3];
    PlId = queryvalue[5];
    Mod = queryvalue[7];

    LoadPlanFabricDetails(ItemId, StyleRowId);
    LoadPlanFabriComp(PlId);
    loadcolor();
    loadprintlistcolor();

    //if (Mod == 0) {

    //    Loadtotfabricdet(PlId);
    //    LoadPlanFabriCompDetails(PlId);
    //}
    LoadProcessDDL("#ddlProcess");

    ///////hide the save table
    $("#SaveFabTable").hide();
    ///////

    if (Mod == 0) {
        ///////hide the loss table
        $("#CListLoss").hide();
        ///////
    }


    //if (Mod == 1) {


    //        $('#Update').show();
    //        $('#Add').hide();


    //    CmNo = 1;
    //    CompNo = 1;
    //    Loadtotfabriceditdet(PlId);
    //    EditCompFabricLossPlanList(PlId, CmNo)
    //    EditDetConPlanFabList(PlId, CompNo);
    //    //
    //}


    //if (Mod == 2) {


    //    $('#Update').hide();
    //    $('#Add').hide();
    //    $('#Delete').show();

    //    CmNo = 1;
    //    CompNo = 1;
    //    Loadtotfabriceditdet(PlId);
    //    EditCompFabricLossPlanList(PlId, CmNo)
    //    EditDetConPlanFabList(PlId, CompNo);
    //    //
    //}

    $(document).on('click', '.btnCDetView', function () {
        debugger;
        //$('#tCDbody').DataTable().destroy();
        var GroupId = "";
        var CompSlN0 = "";

        rowindex1 = $(this).closest('td').parent()[0].sectionRowIndex;
        //var cur1 = PlanFabric.slice(rowindex1);
        var cur1 = $(this).closest('tr').find('td:eq(4)').html();

        PlanFabricDet = [];
        //edit
        if (Mod == 1) {
            var CompSlNo = cur1;
            //EditDetConPlanFabList(PlId, CompSlNo);
            for (var s = 0; s < FabConItemList.length; s++) {
                if (FabConItemList[s].CompSlNo == cur1) {
                    PlanFabricDet.push(FabConItemList[s]);
                }
            }
            loadFabAddTable(PlanFabricDet);
        }
        //

        //delete
        if (Mod == 2) {
            var CompSlNo = cur1;
            EditDetConPlanFabList(PlId, CompSlNo);
        }

        //add
        if (Mod == 0) {
            var CompSlNo = cur1;
            //LoadPlanFabriCompDetails(PlId, CompSlNo);
            for (var s = 0; s < FabConItemList.length; s++) {
                if (FabConItemList[s].CompSlNo == cur1) {
                    PlanFabricDet.push(FabConItemList[s]);
                }
            }
            loadFabAddTable(PlanFabricDet);

        }



    });

    $(document).on('click', '.btnLossView', function () {
        debugger;

        CmNo = $(this).closest('tr').find('td:eq(4)').html();
        LoadProcessDDL("#ddlProcess");
        if (Mod == 1 && Mod == 2) {
            EditCompFabricLossPlanList(PlId, CmNo)

        }

    });


});

$(document).ready(function () {
    $("#tCDbody ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});


function loadtable() {
    debugger;
    index;
    var currentrow = PlanFabricDet.slice(index);
    var sno = currentrow[0].snumb;
    var cno = currentrow[0].CompSlNo;
    var wt = currentrow[0].Weight;
    var size = currentrow[0].Size;
    var color = currentrow[0].Color;
    var protype = $('input[name="ALType"]:checked').attr('value');
    if (protype == 'A') {

        for (var x = 0; x < PlanFabricDet.length; x++) {
            PlanFabricDet[x].BColorPQty = PlanFabricDet[x].Weight;
            //PlanFabricDet[x].FColorPQty = 0;//PlanFabricDet[x].Weight;
        }

        for (var q = 0; q < PlanFabricDet.length; q++) {
            if (FabConItemList[q].CompSlNo == cno) {
                FabConItemList[q].BColorPQty = PlanFabricDet[q].Weight;
                //FabConItemList[q].FColorPQty = PlanFabricDet[q].Weight;
            }
        }
        loadFabAddTable(PlanFabricDet);
    }
    if (protype == 'S') {

        for (var x = 0; x < PlanFabricDet.length; x++) {
            if (PlanFabricDet[x].Size == size) {
                PlanFabricDet[x].BColorPQty = PlanFabricDet[x].Weight;
                // PlanFabricDet[x].FColorPQty = 0;//PlanFabricDet[x].Weight;
            }
        }

        for (var q = 0; q < PlanFabricDet.length; q++) {
            if (FabConItemList[q].Size == size && FabConItemList[q].CompSlNo == cno) {
                FabConItemList[q].BColorPQty = PlanFabricDet[q].Weight;
                //FabConItemList[q].FColorPQty = PlanFabricDet[q].Weight;
            }
        }
        loadFabAddTable(PlanFabricDet);

    }
    if (protype == 'C') {
        for (var x = 0; x < PlanFabricDet.length; x++) {
            if (PlanFabricDet[x].Color == color) {
                PlanFabricDet[x].BColorPQty = PlanFabricDet[x].Weight;
                // PlanFabricDet[x].FColorPQty = 0;//PlanFabricDet[x].Weight;
            }
        }


        for (var q = 0; q < PlanFabricDet.length; q++) {
            //for (var d = 0; d < PlanFabricDet.length; d++) {
            if (FabConItemList[q].Color == color && FabConItemList[q].CompSlNo == cno) {

                FabConItemList[q].BColorPQty = PlanFabricDet[q].Weight;
                //FabConItemList[q].FColorPQty = PlanFabricDet[q].Weight;
            }
            //}
        }
        loadFabAddTable(PlanFabricDet);
    }
}
function LoadPlanFabriComp(PlId) {



    $.ajax({
        url: "/PlanningFabric/ListPlanningFabricComp",
        data: JSON.stringify({ PlanID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LoadCompFabric(result);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
function LoadCompFabric(result) {



    var gridData = [];
    debugger;
    this.PlanFabric = result.data.Data;

    var PlanFabric = eval("[" + result.data.tableValue + "]");

    $('#tCFbody').DataTable({
        "order": [[5, "asc"]],
        data: PlanFabric,
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
                         { title: "Comp_Plan_MasID", "visible": false },
                         { title: "ComponentID", "visible": false },
                         { title: "Component Name" },
                         { title: "Fabric_Type" },
                         { title: "kgs" },
                         { title: "Pan Parts" },
                         { title: "Comp SlNo" },
                           {
                               title: "ViewDetails", "mDataProp": null,
                               "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnCDetView btn btn-info btn-round"> <i class="fa fa-eye"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Loss" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnLossView btn btn-round btn-danger"> <i class="fa fa-arrow-down"></i> </button>'
                               //"sDefaultContent": '<button type="button" class="btnCDetView"> Submit </button> <button type="button" class="btnLossView"> Loss </button>'
                           },


        ]

    });
    $("#tCFbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tCFbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function LoadPlanFabricDetails(ItemId, StyleRowId) {
    $.ajax({
        url: "/PlanningConsumption/GetPlanItemDetails",
        data: JSON.stringify({ ItemId: ItemId, StyleRowId: StyleRowId }),
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
                $('#txtHCompanyId').val(obj[0]["CompanyID"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtProdQty').val(obj[0]["Quantity"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtHBuyerId').val(obj[0]["buyerid"]);
                $('#txtItem').val(obj[0]["Item"]);
                $('#txtHItemId').val(obj[0]["ItemID"]);
                $('#txtHStyleId').val(obj[0]["StyleID"]);
                $('#txtBuyOrdMasId').val(obj[0]["BMasID"]);
                $('#txtEntryDate').val(moment(obj[0]["EDate"]).format('MM/DD/YYYY'));
                CheckYarn = obj[0]["Yarn_Plan"];



            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadcolor() {
    debugger;
    $.ajax({
        url: "/PlanningFabric/ColorList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Colorlist = result;

            for (var t = 0; t < Colorlist.length; t++) {
                if (Colorlist[t].Color == "GREY") {
                    bcid = Colorlist[t].ColorID;
                }
            }
            //$.each(result, function () {
            //    $("#sbTwo").append($("<option></option>").val(this.Itemgroupid).html(this.Itemgroup));

            //});
            //check();        

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadprintlistcolor() {
    debugger;
    $.ajax({
        url: "/PlanningFabric/PrintColorList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            PrintColorlist = result;
            //$.each(result, function () {
            //    $("#sbTwo").append($("<option></option>").val(this.Itemgroupid).html(this.Itemgroup));

            //});
            //check();     

            if (Mod == 0) {

                Loadtotfabricdet(PlId);
                LoadPlanFabriCompDetails(PlId);
            }

            if (Mod == 1) {


                $('#Update').show();
                $('#Add').hide();


                CmNo = 1;
                CompNo = 1;
                Loadtotfabriceditdet(PlId);
                EditCompFabricLossPlanList(PlId, CmNo)
                EditDetConPlanFabList(PlId, CompNo);
                //
            }


            if (Mod == 2) {


                $('#Update').hide();
                $('#Add').hide();
                $('#Delete').show();

                CmNo = 1;
                CompNo = 1;
                Loadtotfabriceditdet(PlId);
                EditCompFabricLossPlanList(PlId, CmNo)
                EditDetConPlanFabList(PlId, CompNo);
                //
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function Loadtotfabricdet(PlId) {
    debugger;
    $.ajax({
        url: "/PlanningFabric/ListTotPlanningFabricCompDetails",
        data: JSON.stringify({ PlanID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            FabConItemList = result;

            for (var f = 0; f < FabConItemList.length; f++) {
                FabConItemList[f].BColorID = bcid;
            }
            //PlanFabricDet = result;
            //loadFabAddTable(PlanFabricDet);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Loadtotfabriceditdet(PlId) {
    debugger;
    $.ajax({
        url: "/PlanningFabric/ListConFabricEdittotDetails",
        data: JSON.stringify({ PlanID: PlId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            FabConItemList = result;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadPlanFabriCompDetails(PlId, CNo) {

    debugger;

    var CSNo = 1;

    if (CNo > 0) {
        CSNo = CNo;
    }
    else {

        CSNo = 1;
    }



    $.ajax({
        url: "/PlanningFabric/ListPlanningFabricCompDetails",
        data: JSON.stringify({ PlanID: PlId, CompSINO: CSNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            // LoadCompFabricDetails(result);
            PlanFabricDet = result;
            loadFabAddTable(PlanFabricDet);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}


function loadFabAddTable(confabListObj) {
    $('#tCDbody').DataTable().destroy();
    debugger;
    // LoadColorDDL("#ddlPColor");

    $('#tCDbody').DataTable({
        data: PlanFabricDet,
        //scrollY: 100,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,
        columns: [
            { title: "SNo", data: "snumb" },
            { title: "FPlanId", data: "FPlanId", "visible": false },
            { title: "ColorID", data: "ColorID", "visible": false },
            { title: "Color", data: "Color" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Prod Qty", data: "Prdn_Qty" },
            { title: "Weight", data: "Weight" },
            { title: "Grammage", data: "Grammage", "visible": false },
            { title: "FabricID", data: "FabricID", "visible": false },
            { title: "GreyWidthID", data: "GreyWidthID", "visible": false },
            { title: "FinishWidthID", data: "FinishWidthID", "visible": false },
            { title: "Fabric Type", data: "FabricType", "visible": false },
            { title: "PlanID", data: "PlanID", "visible": false },
            { title: "Comp SlNo", data: "CompSlNo", "visible": false },       //{
       //    title: "Base Color",
       //    render: function (data, type, row) {
       //        return ' <select id="ddlBColor" class="form-control" style="width: 100px;"></select>';
       //    }
       //},

       {
           title: "Base Color", data: "BColorID",

           render: function (data, type, row) {

               var $select = $("<select></select>", {
                   "id": "ddlBColor",
                   "value": data,
                   "class": "form-control",
                   onchange: "loadbasecolor(this.value);"
               });

               $.each(Colorlist, function (k, v) {
                   var $option = $("<option></option>", {
                       "text": v.Color,
                       "value": v.ColorID
                   });

                   if (data === v.ColorID) {
                       $option.attr("selected", "selected")
                   }
                   $select.append($option);
               });


               return $select.prop("outerHTML");
               //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';                                                             
           }
       },
        //{
        //    title: "PurQty",
        //    render: function (data, type, row) {
        //        return '<input id="txtPurQty" type="text" value="0" style="width: 50px;text-align: center;"/>';
        //    }
        //},

        {
            title: "PurQty", data: "BColorPQty",
            render: function (data) {

                return '<input type="text" id="txtPurQty" class="form-control" onkeyup="loadpqty(this.value);" style="width: 50px;text-align: center;" value=' + data + ' >';

            },
        },
       //{
       //    title: "Finish Color",
       //    render: function (data, type, row) {
       //        return ' <select id="ddlFColor" class="form-control" style="width: 100px;"></select>';
       //    }
       //},

       {
           title: "Finish Color", data: "FColorID",
           render: function (data, type, row) {

               var $select = $("<select></select>", {
                   "id": "ddlFColor",
                   "value": data,
                   "class": "form-control",
                   onchange: "loadfinishcolor(this.value);"
               });
               $.each(Colorlist, function (k, v) {
                   var $option = $("<option></option>", {
                       "text": v.Color,
                       "value": v.ColorID
                   });

                   if (data === v.ColorID) {
                       $option.attr("selected", "selected")
                   }
                   $select.append($option);
               });
               return $select.prop("outerHTML");
               //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';                                                             
           }
       },
         {
             title: "PurQty", data: "FColorPQty",
             render: function (data, type, row) {
                 // return '<input id="txtFPurQty" type="text" value="0" style="width: 50px;text-align: center;"/>';
                 return '<input type="text" id="txtFPurQty" onkeyup="loadfcpqty(this.value);" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
             }
         },
         //{
         //    title: "Print Color", //data: "PColorID",
         //    render: function (data, type, row) {
         //        return ' <select id="ddlPColor" class="form-control" style="width: 100px;"></select>';
         //    }
         //},

         {
             title: "Print Color", data: "PColorID",
             render: function (data, type, row) {

                 var $select = $("<select></select>", {
                     "id": "ddlPColor",
                     "value": data,
                     "class": "form-control",
                     onchange: "loadprintcolor(this.value);"
                 });
                 $.each(PrintColorlist, function (k, v) {
                     var $option = $("<option></option>", {
                         "text": v.Color,
                         "value": v.ColorID
                     });

                     if (data === v.ColorID) {
                         $option.attr("selected", "selected")
                     }
                     $select.append($option);
                 });
                 return $select.prop("outerHTML");
                 //return '<select id="ddlGSize" selected="selected" class="form-control" style="width: 100px;"> </select>';                                                             
             }
         },
          {
              title: "Finish Gsm", data: "FGsm",
              render: function (data, type, row) {
                  // return '<input id="txtFGsm" type="text" value="0" style="width: 50px;text-align: center;" >';
                  return '<input type="text" id="txtFGsm" class="form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';
              }
          },
           //{
           //    title: "ACTION", "mDataProp": null,
           //    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFPUpdate btn btn-round btn-success"> <i class="fa fa-check"></i> </button>'
           //    // "sDefaultContent": '<button type="button" class="btnPAdd"> Submit </button><button type="button" class="btnPEdit"> Edit </button> '
           //    //"sDefaultContent": '<button type="button" class="btnFPUpdate"> Submit </button>'
           //}
       //     //{ title: "BColorPQty", data: "BColorPQty" },
       //     //{ title: "FColorPQty", data: "FColorPQty" },
       //    // { title: "FGsm", data: "FGsm" },
       //     //{ title: "GreyWidthID", data: "GreyWidthID" },
       //     //{ title: "FinishWidthID", data: "FinishWidthID" },
       //     { title: "FPlanId", data: "FPlanId" },                   

        ]
    });



}

function loadbasecolor(val) {
    debugger;
    index;
    var oldind = -1;
    var currentrow = PlanFabricDet.slice(index);
    var s = currentrow[0].CompSlNo;
    var sno = currentrow[0].snumb;

    for (var d = 0; d < Colorlist.length; d++) {
        if (Colorlist[d].ColorID == val) {
           
            oldind = d;
        }
    }
    $.each(PlanFabricDet, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.BColorID = val;

        }
    });

    $.each(FabConItemList, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.BColorID = val;

        }
    });

    array_move(Colorlist, oldind, 0)
    //loadFabAddTable(PlanFabricDet);
}

function loadfinishcolor(val) {
    debugger;
    index;
    var currentrow = PlanFabricDet.slice(index);
    var s = currentrow[0].CompSlNo;
    var sno = currentrow[0].snumb;
    var cname = "";
    var oldind = -1;
    for (var d = 0; d < Colorlist.length; d++) {
        if (Colorlist[d].ColorID == val) {
            cname = Colorlist[d].Color;
            oldind = d;
        }
    }

    $.each(PlanFabricDet, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.FColorID = val;
            this.Fcolor = cname;
        }
    });
    $.each(FabConItemList, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.FColorID = val;
            this.Fcolor = cname;

        }
    });
    array_move(Colorlist, oldind, 0)
    //loadFabAddTable(PlanFabricDet);
}

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


function loadprintcolor(val) {
    debugger;
    index;
    var oldind = -1;
    var currentrow = PlanFabricDet.slice(index);
    var s = currentrow[0].CompSlNo;
    var sno = currentrow[0].snumb;

    for (var d = 0; d < Colorlist.length; d++) {
        if (Colorlist[d].ColorID == val) {
            oldind = d;
        }
    }
    $.each(PlanFabricDet, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.PColorID = val;

        }
    });
    $.each(FabConItemList, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.PColorID = val;

        }
    });

    array_move(Colorlist, oldind, 0)
    //loadFabAddTable(PlanFabricDet);
}

function loadpqty(val) {
    debugger;
    index;
    var currentrow = PlanFabricDet.slice(index);
    var s = currentrow[0].CompSlNo;
    var sno = currentrow[0].snumb;

    var wt = currentrow[0].Weight;
    var fq = currentrow[0].FColorPQty;

    var tot = parseFloat(fq) + parseFloat(val);
    if (tot > wt) {
        alert('Sum of PurQty should not exceed actual weight');
        return true;
    }
    $.each(PlanFabricDet, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.BColorPQty = val;

        }
    });

    $.each(FabConItemList, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.BColorPQty = val;

        }
    });
}

function loadfcpqty(val) {
    debugger;
    index;
    var currentrow = PlanFabricDet.slice(index);
    var s = currentrow[0].CompSlNo;
    var sno = currentrow[0].snumb;
    var wt = currentrow[0].Weight;
    var bq = currentrow[0].BColorPQty;

    var tot = parseFloat(bq) + parseFloat(val);
    if (tot > wt) {
        alert('Sum of PurQty should not exceed actual weight');
        return true;
    }

    $.each(PlanFabricDet, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.FColorPQty = val;

        }
    });
    $.each(FabConItemList, function () {
        if (this.CompSlNo == s && this.snumb == sno) {
            this.FColorPQty = val;

        }
    });
}
function LoadCompFabricDetails(result) {
    debugger;

    var gridData = [];

    this.PlanFabricDet = result.data.Data;

    var PlanFabricDet = eval("[" + result.data.tableValue + "]");

    var CID = PlanFabricDet[0][0];


    $('#tCDbody').DataTable({

        data: PlanFabricDet,
        columns: [

                         { title: "ColorId", "visible": false },
                         { title: "Color" },
                         { title: "SizeId", "visible": false },
                         { title: "Size" },
                         { title: "Qty" },
                         { title: "Wgt(kgs)" },
                           { title: "Grammage", "visible": false },

                            { title: "FabricId", "visible": false },
                            { title: "FabWidthId", "visible": false },
                             { title: "TabWidthId", "visible": false },
                              { title: "Fabric Type", "visible": false },
                               { title: "PlanID", "visible": false },
                                { title: "Comp SINO", "visible": false },
                         {
                             title: "Base Color",
                             render: function (data, type, row) {
                                 return ' <select id="ddlBColor" class="form-control" style="width: 100px;"></select>';
                             }
                         },
                           {
                               title: "PurQty ",
                               render: function (data, type, row) {
                                   return '<input id="txtPurQty" type="text" value="0" style="width: 50px;text-align: center;" >';

                               }


                           },
                                                        {
                                                            title: "Finish Color ",
                                                            render: function (data, type, row) {
                                                                return '<select id="ddlFColor" class="form-control" style="width: 100px;"> </select>';
                                                            }
                                                        },
                                                        {
                                                            title: "PurQty ",
                                                            render: function (data, type, row) {
                                                                return '<input id="txtFPurQty" type="text" value="0" style="width: 50px;text-align: center;" >';

                                                            }

                                                        },
                                                         {
                                                             title: "Print Color ",
                                                             render: function (data, type, row) {
                                                                 return '<select id="ddlPColor" class="form-control" style="width: 100px;"> </select>';
                                                             }
                                                         },
                                         {
                                             title: "Finish Gsm",
                                             render: function (data, type, row) {
                                                 return '<input id="txtFGsm" type="text" value="0" style="width: 50px;text-align: center;" >';
                                             }
                                         },




                          {
                              title: "Update", "mDataProp": null,

                              "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFPUpdate btn btn-round btn-success"> <i class="fa fa-check"></i> </button>'
                              //"sDefaultContent": '<button type="button" class="btnFPUpdate"> Submit </button>'
                          },
        ]

    });



    LoadColorDDL("#ddlBColor,#ddlFColor,#ddlPColor");



}
function getbyID(MasID) {
    debugger;
    alert("111");

}
function Delete(ID) {
    debugger;
    alert("222");
}

function loadcomponentLossTable(compLossObj) {
    $('#tblcompfabricloss').DataTable().destroy();
    debugger;

    $('#tblcompfabricloss').DataTable({
        data: PlanLoss,
        columns: [
            { title: "FLPlanID", data: "FLPlanID", "visible": false },
            { title: "ProcessID", data: "ProcessId", "visible": false },
            { title: "Process", data: "ProcessName" },
            { title: "Loss%", data: "Loss_Per" },
            { title: "Sl No", data: "SlNo" },
            { title: "Comp SNo", data: "CompSNo" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompLossedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompLossremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                   //"sDefaultContent": '<button type="button" class="btncompLossedit"> Edit </button> <button type="button" class="btncompLossremove"> Remove </button>'
               }
        ]
    });
}
$(document).ready(function () {

    //component details
    $('#btnLossViewAdd').click(function () {
        debugger;

        if (Mod == 0) {
            ///////hide the loss table
            $("#CListLoss").show();
            ///////
        }

        var lengp = 0;
        var isAllValid = true;



        if ($('#ddlProcess').val() == "0") {
            isAllValid = false;
            $('#ddlProcess').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlProcess').siblings('span.error').css('visibility', 'hidden');
        }


        if ($('#txtLoss').val() == "") {
            isAllValid = false;
            $('#txtLoss').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtLoss').siblings('span.error').css('visibility', 'hidden');
        }

        if (PlanLoss.length == 0) {
            lengp = 1;
        }
        else {
            lengp = PlanLoss.length + 1;
        }

        if (isAllValid) {


            debugger;
            var compLossObj = {
                ProcessName: $("#ddlProcess option:selected").text(),
                ProcessId: $('#ddlProcess').val(),
                SlNo: lengp,
                Loss_Per: $('#txtLoss').val(),
                CompSNo: CmNo,
                FLPlanID: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            PlanLoss.push(compLossObj);

            loadcomponentLossTable(compLossObj);

            fnClearCompLossControls();
        }

    });


    function fnClearCompLossControls() {
        debugger;
        $('#ddlProcess').val('0');
        $('#txtLoss').val('');

    }

    $(document).on('click', '.btncompLossedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var cur1 = PlanLoss.slice(rowindex);

        $('#ddlProcess').val(cur1[0]['ProcessId']);
        $('#txtLoss').val(cur1[0]['Loss_Per']);


        $('#btnLossViewAdd').hide();
        $('#btnLossViewUpdate').show();
    });

    $('#btnLossViewUpdate').click(function () {
        debugger;
        var currentrowsel = PlanLoss.slice(rowindex);

        currentrowsel[0]['ProcessId'] = $("#ddlProcess").val();
        currentrowsel[0]['ProcessName'] = $("#ddlProcess option:selected").text();
        currentrowsel[0]['Loss_Per'] = $("#txtLoss").val();
        PlanLoss[rowindex] = currentrowsel[0];

        loadcomponentLossTable(PlanLoss);

        $('#btnLossViewUpdate').hide();
        $('#btnLossViewAdd').show();
        fnClearCompLossControls();


    });

    $(document).on('click', '.btncompLossremove', function () {
        rowindex = $(this).closest('tr').index();
        PlanLoss.splice(rowindex, 1);
        document.getElementById("tblcompfabricloss").deleteRow(rowindex + 1);
    });
    //






});
$(document).on('click', '.btnFPUpdate', function () {
    debugger;



    rowindex = $(this).closest('tr').index();
    var cur3 = PlanFabricDet.slice(rowindex);


    var CrID = cur3[0]['ColorID'];
    var CrName = cur3[0]['Color'];
    var SiId = cur3[0]['SizeId'];
    var Size = cur3[0]['Size'];
    var PQty = cur3[0]['Prdn_Qty'];
    var FabricID = cur3[0]['FabricID'];
    var GreyWidthID = cur3[0]['GreyWidthID'];
    var FinishWidthID = cur3[0]['FinishWidthID'];
    var Grammage = cur3[0]['Grammage'];
    var Weight = cur3[0]['Weight'];
    var FabricType = cur3[0]['FabricType'];
    var BPQty = $(this).closest('tr').find('#txtPurQty').val();
    var FPQty = $(this).closest('tr').find('#txtFPurQty').val();
    var FGsm = $(this).closest('tr').find('#txtFGsm').val();
    var BColorID = $(this).closest('tr').find('#ddlBColor').val();
    var FColorID = $(this).closest('tr').find('#ddlFColor').val();
    var PColorID = $(this).closest('tr').find('#ddlPColor').val();

    var TBQty = parseInt(BPQty) + parseInt(FPQty);

    if (BColorID == 0) {
        alert("Color are not made for this row...");
        return true;
    }
    if (FColorID == 0) {
        alert("Color are not made for this row...");
        return true;
    }

    if (parseInt(TBQty) > parseInt(Weight)) {
        alert("Please Check Base and Finish Qty are not greater then weight...");

        return true;
    }

    var CompSlNo = cur3[0]['CompSlNo'];
    var PlanID = cur3[0]['PlanID'];
    var FPlanId = cur3[0]['FPlanId'];


    var confabListObj = {
        CompSlNo: CompSlNo,
        PlanID: PlanID,
        ColorID: CrID,
        Color: CrName,
        SizeId: SiId,
        Size: Size,
        Prdn_Qty: PQty,
        Weight: Weight,
        Grammage: Grammage,
        FabricID: FabricID,
        FabricType: FabricType,
        GreyWidthID: GreyWidthID,
        FinishWidthID: FinishWidthID,
        BColorID: BColorID,
        FColorID: FColorID,
        PColorID: PColorID,
        BColorPQty: BPQty,
        FColorPQty: FPQty,
        FGsm: FGsm,
        FPlanId: FPlanId,
        //EntryDate: new Date($('#txtEntryDate').val()),


    };



    if (Mod == 0) {

        var cnt = $("#tblcompfabdetails tr").length - 1;

        var Data = "";

        // PackItemList = [];
        for (var i = 1; i <= cnt; i++) {

            var OCId = $("#tblcompfabdetails tr:eq(" + i + ") td:eq(2)").html();
            var OSizeId = $("#tblcompfabdetails tr:eq(" + i + ") td:eq(5)").html();
            var OCmSNo = $("#tblcompfabdetails tr:eq(" + i + ") td:eq(0)").html();
            //var OStyleRow = $("#tblcompdetails1 tr:eq(" + i + ") td:eq(4)").html();
            //var OQuantity = $("#tblcompdetails1 tr:eq(" + i + ") td:eq(7)").html();



        }

        if (FabConItemList.length > 0) {
            if (OCId == CrID && OSizeId == SiId && OCmSNo == CompSlNo) {
                alert("Color and Size Already Exists");
                //$('#txtQty').keyup(function () {
                //    table.search($(this).val()).draw();
                //})
                return true;


            }
        }


    }

    FabConItemList.push(confabListObj);
    loadconfpTable(confabListObj);
    alert("Updated Sucessfully");
});


//edit by bala





$(document).on('click', '.btnFPEdit', function () {
    debugger;

    
    var FPLID = $(this).closest('tr').find('td:eq(4)').html();


});
//

function loadconfpTable(confabListObj) {
    $('#tblcompfabdetails').DataTable().destroy();
    debugger;

    $('#tblcompfabdetails').DataTable({
        data: FabConItemList,
        "bPaginate": false,
        "paging": false,
        columns: [


            { title: "Comp SlNo", data: "CompSlNo" },
            { title: "PlanID", data: "PlanID" },
            { title: "CID", data: "ColorID" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "SzId", data: "SizeId" },
            { title: "Prod Qty", data: "Prdn_Qty" },
            { title: "Weight", data: "Weight" },
            { title: "Grammage", data: "Grammage" },
            { title: "FabricID", data: "FabricID" },
            { title: "Fabric Type", data: "FabricType" },
            { title: "BColorID", data: "BColorID" },
            { title: "FColorID", data: "FColorID" },
            { title: "PColorID", data: "PColorID" },
            { title: "BColor PQty", data: "BColorPQty" },
            { title: "FColor PQty", data: "FColorPQty" },
            { title: "Fin Gsm", data: "FGsm" },
            { title: "GreyWidthID", data: "GreyWidthID" },
            { title: "FinishWidthID", data: "FinishWidthID" },
           { title: "FPlanId", data: "FPlanId" },

                    
        ]
    });
}
function save() {

    debugger;

    if (FabConItemList.length == 0) {

        alert("Please Enter the Fabric Details..");
        return true;
    }

    var cnt = $("#tblcompfabdetails tr").length - 1;
    var Data = "";

    if (Mod == 0) {
        var Mode = "A";
    }
    var PId = PlId;

    
    var objConFabSubmit = {

        //

        CompanyId: $('#txtHCompanyId').val(),
        StyleId: $('#txtHStyleId').val(),
        PlanID: PId,
        Mode: Mode,
        OrderNo: $('#txtOrderNo').val(),
        PrgThr: "W",
        EntryDate: new Date($('#txtEntryDate').val()),
        PlanLoss: PlanLoss,
        PlanFabricDet: FabConItemList
    };

    $.ajax({
        url: "/PlanningFabric/Add",
        data: JSON.stringify(objConFabSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Data Saved Sucessfully");
            StyRowId = StyleRId;
            window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}
function EditCompFabricLossPlanList(PlId, CompNo) {



    debugger;

    $.ajax({
        url: "/PlanningFabric/ListCompFabricLossDetails",
        data: JSON.stringify({ PlanID: PlId, CNo: CompNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PlanLoss = result;
            loadcomponentLossTable(PlanLoss);
            //EditDetConPlanFabList(PlId, CompNo);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
function EditDetConPlanFabList(PlId, CompNo) {


    debugger;
    $.ajax({
        url: "/PlanningFabric/ListConFabricEditDetails",
        data: JSON.stringify({ PlId: PlId, CompNo: CompNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //LoadChildDataToArrayConEdit(result);

            PlanFabricDet = result;

            loadFabAddTable(PlanFabricDet);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
function LoadChildDataToArrayConEdit(result) {
    // $('#tCDbody').DataTable().destroy();

    var gridData = [];
    debugger;
    this.PlanFabricDet = result.data.Data;
    this.FabConItemList = result.data.Data;

    loadconfpTable(FabConItemList);

    var PlanFabricDet = eval("[" + result.data.tableValue + "]");

    var i = 0;
    var j = 0;
    $('#tCDbody').DataTable({

        data: PlanFabricDet,
        columns: [
                         { title: "ColorId", "visible": false },
                         { title: "Color" },
                         { title: "SizeId", "visible": false },
                         { title: "Size" },
                         { title: "Qty" },
                         { title: "Wgt(kgs)" },
                           { title: "Grammage", "visible": false },
                            { title: "FabricId", "visible": false },
                            { title: "FabWidthId", "visible": false },
                             { title: "TabWidthId", "visible": false },
                              { title: "FabricType", "visible": false },
                               { title: "PlanID", "visible": false },
                                { title: "CompSINO", "visible": false },
                                 { title: "FPlanId" },
                         {
                             title: "Base Color",
                             render: function (data, type, row) {
                                 return ' <select id="ddlBColor" class="form-control" style="width: 100px;"></select>';
                             }
                         },
                           {
                               title: "Pur Qty ",
                               render: function (data, type, row) {
                                   //  return '<input id="txtPurQty" type="text" value="0" style="width: 50px;text-align: center;" >';

                                   i += 1;
                                   return '<input id="txtPurQty' + i + '" type="text" value="' + row[14] + '" style="width: 50px;text-align: center;" >';

                               }


                           },
                                                        {
                                                            title: "Finish Color ",
                                                            render: function (data, type, row) {
                                                                return '<select id="ddlFColor" class="form-control" style="width: 100px;"> </select>';
                                                            }
                                                        },
                                                        {
                                                            title: "Pur Qty ",
                                                            render: function (data, type, row) {
                                                                //return '<input id="txtFPurQty" type="text" value="0" style="width: 50px;text-align: center;" >';

                                                                j += 1;
                                                                return '<input id="txtFPurQty' + j + '" type="text" value="' + row[15] + '" style="width: 50px;text-align: center;" >';

                                                            }

                                                        },
                                                         {
                                                             title: "Print Color ",
                                                             render: function (data, type, row) {
                                                                 return '<select id="ddlPColor" class="form-control" style="width: 100px;"> </select>';
                                                             }
                                                         },
                                         {
                                             title: "Finish Gsm",
                                             render: function (data, type, row) {
                                                 return '<input id="txtFGsm" type="text" value="0" style="width: 50px;text-align: center;" >';
                                             }
                                         },




                          {
                              title: "Update", "mDataProp": null,

                              "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnFPEdit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button>'
                              //"sDefaultContent": '<button type="button" class="btnFPEdit"> Edit </button>'
                          },

        ]


    });



    LoadColorDDL("#ddlBColor,#ddlFColor,#ddlPColor");


}
function Update() {


    debugger;


    var cnt = $("#tblcompfabdetails tr").length - 1;
    var Data = "";


    if (Mod == 1) {
        var Mode = "A";
    }
    var PId = PlId;


    var objConFabSubmit = {

        //
        CompanyId: $('#txtHCompanyId').val(),
        StyleId: $('#txtHStyleId').val(),
        PlanID: PId,
        Mode: Mode,
        OrderNo: $('#txtOrderNo').val(),
        PrgThr: "W",
        EntryDate: new Date($('#txtEntryDate').val()),
        PlanLoss: PlanLoss,
        PlanFabricDet: FabConItemList
    };

    $.ajax({
        url: "/PlanningFabric/Update",
        data: JSON.stringify(objConFabSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Data Updated Sucessfully");
            StyRowId = StyleRId;
            window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function FClose() {
    //window.location.href = "/PlanningMain/PlanningMainIndex";
    StyRowId = StyleRId;
    window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;
}

function Delete() {


    debugger;

    if (CheckYarn == "E") {
        alert("Yarn Made For This Entry,Please Delete Yarn And Then Proceed The Same....")
        return true;
    }


    var cnt = $("#tblcompfabdetails tr").length - 1;
    var Data = "";


    if (Mod == 2) {
        var Mode = "D";
    }
    var PId = PlId;

    var objConFabDelete = {

        //
        CompanyId: $('#txtHCompanyId').val(),
        StyleId: $('#txtHStyleId').val(),
        PlanID: PId,
        Mode: Mode,
        OrderNo: $('#txtOrderNo').val(),
        PrgThr: "W",
        //
        PlanLoss: PlanLoss,
        PlanFabricDet: FabConItemList
    };

    $.ajax({
        url: "/PlanningFabric/Delete",
        data: JSON.stringify(objConFabDelete),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {



            if (result.Value == true) {

                alert("Data Deleted Sucessfully");
                StyRowId = StyleRId;
                window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}
