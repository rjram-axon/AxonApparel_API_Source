var PlanYarn = [];
var PlanYarn1 = [];
var PlanYarnDyeing = [];
var EPlanYarnDyeing = [];
var PlanYarnLoss = [];
var PlanYarnDet = [];
var YarnDyeItemList = [];
var ItemId = 0;
var StyleRowId = 0;
var PlanId = 0;
var Bper = 0;
var Eweight = 0;
var TEWeight = 0;
var NPlanYarnDyeing = [];
var YlNo = 0;
var SyNo = 0;
var SDlNo = 0;
var FID = 0;
var BCID = 0;
var YMasID = 0;
var GYDetID = 0;
var Wght = 0;
var KQty = 0;
var VYSlNo = 0;
var Dying = 0;
var FBRID = 0;
var fid = 0;
var BCLID = 0;
var OrdNo = 0;
var StyleId = 0;
var StyleRId = 0;
var Itemrowindex = -1;
var slno = 0;
var yslno = 0;
var yarndet = [];
var wt = 0;
var index = -1;
var ctry = [];
$(document).ready(function () {
    debugger;
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }
    ItemId = queryvalue[1];
    StyleRowId = queryvalue[3];
    StyleRId = queryvalue[3];
    PlanId = queryvalue[5];
    Mod = queryvalue[7];

    //Main Text Load
    //$("#saveyarnDyeing").hide();
    if (Mod == 0) {
        ///////hide the loss table
        $("#CList1").hide();
        $("#CList").hide();
     
        ///////
    }

    LoadPlanYarnDetails(ItemId, StyleRowId);


    LoadPlanFabric(PlanId);

    //LoadYarnDyeing(PlanId, StyleRowId, ItemId, BCID, FID, YlNo, Qty1);

    LoadYarnDDL("#ddlYarn");
    LoadYSizeDDL("#ddlCount");
    LoadColorDDL("#ddlColor");
    LoadProcessDDL("#ddlProcess");


    if (Mod == 1) {


        $('#btnUpdate').show();
        $('#btnAdd').hide();


        CmNo = 1;
        CompNo = 1;
        EditCompYarnLossPlanList(PlanId, CmNo);

    }

    if (Mod == 2) {


        $('#btnUpdate').hide();
        $('#btnAdd').hide();
        $('#btnDelete').show();

        CmNo = 1;
        CompNo = 1;
        EditCompYarnLossPlanList(PlanId, CmNo);

    }

    $(document).on('click', '.btnYarnLoss', function () {
        debugger;

        SyNo = $(this).closest('tr').find('td:eq(0)').html();
        LoadProcessDDL("#ddlProcess");
        if (Mod == 1 || Mod == 2) {
            var CmNo = SyNo;
            EditCompYarnLossPlanList(PlanId, CmNo)

        }

    });


});

$(document).ready(function () {
    $("#tFYDbody ").dataTable().find("tbody").on('click', 'tr', function () {
        index = (this.rowIndex) - 1;
    });
});

function LoadPlanYarnDetails(ItemId, StyleRowId) {
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


                OrdNo = $('#txtOrderNo').val();
                StyleId = $('#txtHStyleId').val();


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadPlanFabric(PlanId) {



    $.ajax({
        url: "/PlanningYarn/ListPlanningFabricYarn",
        data: JSON.stringify({ PlanID: PlanId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {



            LoadPlanningYarnFabric(result);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
function LoadPlanningYarnFabric(result) {



    var gridData = [];
    debugger;
    this.PlanYarn1 = result.data.Data;



    var PlanYarn1 = eval("[" + result.data.tableValue + "]");
    var FID = PlanYarn1[0][2];
    var BCID = PlanYarn1[0][6];
    var YMasID = PlanYarn1[0][1];
    var Qty1 = PlanYarn1[0][5];
    var YlNo = PlanYarn1[0][0];

    if (YMasID > 0 && Mod == 1 || Mod == 2) {


        ListYarnEditDetDetails(YMasID, OrdNo, StyleId);

        var Dying = 1

        EditDetPlanYarnDyeingList(PlanId, ItemId, FID, BCID, StyleRowId, YMasID, GYDetID, Qty1, Dying, YlNo);

    }


    $('#tYFbody').DataTable({

        data: PlanYarn1,
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
                         { title: "SNo" },
                         { title: "YarnPlanMasID", "visible": false },
                         { title: "FabricID", "visible": false },
                         { title: "Fabric" },
                         { title: "Base Color" },
                         { title: "Weight(kgs)" },
                         { title: "ColorID", "visible": false },
                          { title: "Fabric Type" },
                           {
                               title: "ViewDetails", "mDataProp": null,
                               "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Yarn" style="width: 20px;padding: 0px;height: 20px;background: #6B8E23;border: 1px solid #6B8E23;" class="btnYarn btn btn_round"> <img style="width:14px;" src="../images/yarn.png"> </button>  <button type="button" data-toggle="tooltip" data-placement="top" title="Dyeing" style="width: 20px;padding: 0px;height: 20px;background: #6B8E23;border: 1px solid #6B8E23;" class="btnYarnDyeing btn btn_round"> <img style="width: 14px;margin-top: -1px;/* margin-left: 0.5px; */" src="../images/dyeing.png"> </button> <button data-toggle="tooltip" data-placement="top" title="Loss" type="button" style="width: 20px;padding: 0px;height: 20px;" class="btnYarnLoss btn btn_round btnl btn-danger"> <i class="fa fa-arrow-down"></i> </button>'
                               //"sDefaultContent": '<button type="button" class="btnYarn"> Yarn </button>  <button type="button" class="btnYarnDyeing"> Dyeing </button> <button type="button" class="btnYarnLoss"> Loss </button>'
                           },


        ]



    });

    if (Mod == 0) {

        LoadYarnDyeing(PlanId, StyleRowId, ItemId, BCID, FID, YlNo, Qty1);
    }

    $("#tYFbody tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tYFbody tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });


}

function LoadYarnDyeing(PlanId, StyleRowId, ItemId, BCID, FID, YlNo, Qty) {
    debugger;
    $.ajax({
        url: "/PlanningYarn/ListPlanningFabricYarnDyeingDetails",
        data: JSON.stringify({ PlanID: PlanId, StyleRowId: StyleRowId, ItemId: ItemId, BColorId: BCID, FabricId: FID, YDSlNo: YlNo, FQty: Qty }),

        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //LoadYarnDyeingDetails(result);

            PlanYarnDyeing = result;
            loadYarnDyeAddTable(PlanYarnDyeing);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadYarnDyeAddTable(PlanYarnDyeing) {
    $('#tFYDbody').DataTable().destroy();
    debugger;

    $('#tFYDbody').DataTable({
        data: PlanYarnDyeing,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

            { title: "YPlanDetID", data: "YPlanDetID", "visible": false },
            { title: "Sl No", data: "SlNo"},
            { title: "Garment_ColorID", data: "Garment_ColorID", "visible": false },
            { title: "Garment Color", data: "GColor" },
            { title: "Weight(Kgs)", data: "GWeight" },
            { title: "Yarn_DyeColorID", data: "CColorID", "visible": false },
            { title: "Dyeing Color", data: "CColor" },
          {
              title: "%", data: "Qty_Per",
              render: function (data) {

                  return '<input type="text" id="txtQty_Per" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' onkeyup="calcwght(this.value);">';

              },
          },
          { title: "Weight(Kgs)", data: "Weight" },
          {
              title: "Purchase(Kgs)", data: "Purchase_Qty",
              render: function (data) {

                  return '<input type="text" id="txtPurchase_Qty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

              },
          },

           {
               title: "Courses", data: "Courses",
               render: function (data) {

                   return '<input type="text" id="txtCourses class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

               },
           },
            { title: "YDSlNo", data: "YDSlNo" },
            { title: "YPlanDyeID", data: "YPlanDyeID", "visible": false },

           {
               title: "ACTION", "mDataProp": null,
               "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" class="btnDUpdate btn btn-successbtn-round"> Submit </button>'
               //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Submit" class="btnDUpdate btn btn-successbtn-round"> Submit </button>'
               //"sDefaultContent": '<button type="button" class="btnDUpdate"> Submit </button>'
           }

        ]
    });

}
function calcwght(Val) {

    debugger;
    
    index;
    var currentrowoftcpi = PlanYarnDyeing.slice(index);

    
    var GWght = currentrowoftcpi[0].GWeight;
    var Sno = currentrowoftcpi[0].SlNo;
    var yno = currentrowoftcpi[0].YDSlNo;
    var Per = Val;

    var ratecal = Val;
    var res = GWght * Per / 100;

    finalresult = res.toFixed(2);
    $.each(PlanYarnDyeing, function () {
        if (this.SlNo == Sno && this.YDSlNo==yno) {
            this.Weight = res;
            this.Qty_Per = ratecal;
        }
    });
    
    loadYarnDyeAddTable(PlanYarnDyeing);
    NPlanYarnDyeing.push(currentrowoftcpi[0]);

    
    ctry = NPlanYarnDyeing;
   ctry= $.grep(NPlanYarnDyeing, function (e) {
        //if (e.SlNo == Sno && e.YDSlNo == yno) {
       return e.SlNo == Sno && e.YDSlNo == yno;
        //}
   });
   ctry;
   list = ctry;
   loadconfpDetailTable(list);


    //var dt = [];
    //if (NPlanYarnDyeing.length > 0) {
    //    for (var e = 0; e < NPlanYarnDyeing.length; e++) {
    //        if (NPlanYarnDyeing[e].SlNo == Sno && NPlanYarnDyeing[e].YDSlNo == yno) {
    //            NPlanYarnDyeing[e].Weight = res;
    //            NPlanYarnDyeing[e].Qty_Per = ratecal;
    //        }
           
    //    }
    //}
    //else {
    //    NPlanYarnDyeing.push(currentrowoftcpi[0]);
    //}

    
}


function loadconfpDetailTable(list) {
    $('#tblcompyarndetails1').DataTable().destroy();
    debugger;

    $('#tblcompyarndetails1').DataTable({
        data: list,
        columns: [



            { title: "YPlanDetID", data: "YPlanDetID" },
            { title: "Sl No", data: "SlNo" },
            { title: "Garment_ColorID", data: "Garment_ColorID", "visible": false },
            { title: "GWeight", data: "GWeight" },
            { title: "Yarn_DyeColorID", data: "Yarn_DyeColorID" },
            { title: "Qty Per", data: "Qty_Per" },
            { title: "Weight", data: "Weight" },
            { title: "Purchase Qty", data: "Purchase_Qty" },
            { title: "Courses", data: "Courses" },
            { title: "YD SlNo", data: "YDSlNo" },
            { title: "YPlanDyeID", data: "YPlanDyeID" },


        ]
    });
}
$(document).on('click', '.btnYarnDyeing', function () {
    debugger;
    $('#tFYDbody').DataTable().destroy();


    rowindex = $(this).closest('tr').index();
    var currentro1 = PlanYarn1.slice(rowindex);


    var FID = currentro1[0]['FabricID'];
    var BCID = currentro1[0]['Fabric_ColorId'];
    var Qty = currentro1[0]['Fabric_Weight'];
    var YMI = currentro1[0]['YPlanmasID'];
    YlNo = $(this).closest('tr').find('td:eq(0)').html();


    //add
    if (Mod == 0) {

        LoadYarnDyeing(PlanId, StyleRowId, ItemId, BCID, FID, YlNo, Qty);
    }
    if (Mod == 1 && YMI > 0 || Mod == 2) {

        var YDETID = 0;
        var Dying = 1;
        EditDetPlanYarnDyeingList(PlanId, ItemId, FID, BCID, StyleRowId, YMI, YDETID, Qty, Dying, YlNo);
    }



});



$(document).on('click', '.btnAddDyeing', function () {
    debugger;

    $('#tFYDbody').DataTable().destroy();

    var FabID = "";
    var BCID = "";


    rowindex = $(this).closest('tr').index();
    var curentro1 = PlanYarnDet.slice(rowindex);

    var FabID = curentro1[0]['FabricID'];
    var BCID = curentro1[0]['BaseColorID'];
    var Qty = curentro1[0]['Knit_In_Qty'];
    var Dye = curentro1[0]['Dyeing_Req'];
    var YMASID = curentro1[0]['YPlanMasID'];
    var YDETID = curentro1[0]['YplanDetID'];

    //if (Dye == 0) {
    //    alert("Please Click the Dyeing")
    //}
    //else {

    if (Dye == true) {
        Dying = 1
    } else {
        Dying = 0
    }

    SDlNo = $(this).closest('tr').find('td:eq(0)').html();

    if (Mod == 0) {

        LoadYarnDyeing(PlanId, StyleRowId, ItemId, BCID, FabID, SDlNo, Qty);
    }
    if (Mod == 1 && YMASID > 0 && YDETID > 0 || Mod == 2) {

        var YINo = SDlNo;

        EditDetPlanYarnDyeingList(PlanId, ItemId, FabID, BCID, StyleRowId, YMASID, YDETID, Qty, Dying, YINo);
    }
    // }


});


$(document).ready(function () {

    //component details
    $('#btnLossYarnViewAdd').click(function () {
        debugger;

        if (Mod == 0) {
            ///////hide the loss table
            $("#CList").show();
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

        if (PlanYarnLoss.length == 0) {
            lengp = 1;
        }
        else {
            lengp = PlanYarnLoss.length + 1;
        }

        if (isAllValid) {


            debugger;
            var YarnLossObj = {
                ProcessName: $("#ddlProcess option:selected").text(),
                ProcessId: $('#ddlProcess').val(),
                SlNo: lengp,
                Loss_Per: $('#txtLoss').val(),
                YPlanLossID: 0,
                SNo: SyNo,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            PlanYarnLoss.push(YarnLossObj);

            loadyarnLossTable(YarnLossObj);

            fnClearYarnLossControls();
        }

    });


    function fnClearYarnLossControls() {
        debugger;
        $('#ddlProcess').val('0');
        $('#txtLoss').val('');

    }

    $(document).on('click', '.btnYarnLossedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var cur1 = PlanYarnLoss.slice(rowindex);

        $('#ddlProcess').val(cur1[0]['ProcessId']);
        $('#txtLoss').val(cur1[0]['Loss_Per']);


        $('#btnLossYarnViewAdd').hide();
        $('#btnLossYarnViewUpdate').show();
    });

    $('#btnLossYarnViewUpdate').click(function () {
        debugger;
        var currentrowsel = PlanYarnLoss.slice(rowindex);

        currentrowsel[0]['ProcessId'] = $("#ddlProcess").val();
        currentrowsel[0]['ProcessName'] = $("#ddlProcess option:selected").text();
        currentrowsel[0]['Loss_Per'] = $("#txtLoss").val();
        PlanYarnLoss[rowindex] = currentrowsel[0];

        loadyarnLossTable(PlanYarnLoss);

        $('#btnLossYarnViewUpdate').hide();
        $('#btnLossYarnViewAdd').show();
        fnClearYarnLossControls();


    });

    $(document).on('click', '.btnYarnLossremove', function () {
        rowindex = $(this).closest('tr').index();
        PlanYarnLoss.splice(rowindex, 1);
        document.getElementById("tblcompyarnloss").deleteRow(rowindex + 1);
    });
    //






});
function loadyarnLossTable(YarnLossObj) {
    $('#tblcompyarnloss').DataTable().destroy();
    debugger;

    $('#tblcompyarnloss').DataTable({
        data: PlanYarnLoss,
        columns: [
            { title: "YPlanLossID", data: "YPlanLossID", "visible": false },
            { title: "ProcessID", data: "ProcessId", "visible": false },
            { title: "Process", data: "ProcessName" },
            { title: "Loss%", data: "Loss_Per" },
            { title: "Sl No", data: "SlNo", "visible": false },
            { title: "SNo", data: "SNo", "visible": false },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-toggle="tooltip" data-placement="top" title="Edit" class="btnYarnLossedit btn  btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-toggle="tooltip" data-placement="top" title="Remove" class="btnYarnLossremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>'
                   //"sDefaultContent": '<button type="button" class="btnYarnLossedit"> Edit </button> <button type="button" class="btnYarnLossremove"> Remove </button>'
               }
        ]
    });
}

$(document).on('click', '.btnYarn', function () {
    debugger;
    rowindex = $(this).closest('tr').index();
    var currentrowp = PlanYarn1.slice(rowindex);

    FBRID = currentrowp[0]['FabricID'];
    BCLID = currentrowp[0]['Fabric_ColorId'];
    slno = currentrowp[0]['SlNo'];
    wt = currentrowp[0]['Fabric_Weight'];
    YlNo = $(this).closest('tr').find('td:eq(0)').html();

    var wght = $(this).closest('tr').find('td:eq(3)').html();
    // YlNo = $(this).closest('tr').find('td:eq(0)').html();


    //FID = $(this).closest('tr').find('td:eq(1)').html();
    //BCID = $(this).closest('tr').find('td:eq(5)').html();
    //Wght = $(this).closest('tr').find('td:eq(4)').html();

    rowindex = $(this).closest('tr').index();
    var currentro1 = PlanYarnDet.slice(rowindex);

    if (currentro1.length > 0) {
        Bper = 0;
        fid = currentro1[0]['FabricID'];
        BCLID = currentro1[0]['BaseColorID'];
        var Wgt = currentro1[0]['Knit_In_Qty'];

        //var Ngt = Ngt + Wgt;
        //alert(Ngt);
        var totalper = 0;
        for (var s = 0; s < PlanYarnDet.length; s++) {
            if (PlanYarnDet[s].YSlNo == slno) {
                var per = PlanYarnDet[s].Knit_In_Per;
                totalper = totalper + parseFloat(per);
            }
        }
        Bper = 100 - totalper;


    }
    else {
        $("#txtPer").val('');
        $('#txtWeight').val(wght);
        $('#txtActualWeight').val(wght);
        return true;

    }

    rowindex = $(this).closest('tr').index();
    var currentrowpyarn= PlanYarn1.slice(rowindex);
    var YMID = currentrowpyarn[0]['YPlanmasID'];

    if (YMID > 0 && Mod == 1 || Mod == 2) {

        var OrdNo = $('#txtOrderNo').val();
        var StyleId = $('#txtHStyleId').val();
        ListYarnEditDetDetails(YMID, OrdNo, StyleId);
    }

    if (Mod == 0) {

        var PerQty = $('#txtPer').val();



        if (Bper > 0) {
            $("#txtPer").val(Bper);
            var NAweight = Bper / 100 * wght;
            $('#txtWeight').val(NAweight);
            $('#txtActualWeight').val(NAweight);
            Bper = 0;
            yarndet = [];
            for (var x = 0; x < PlanYarnDet.length; x++) {
                if (PlanYarnDet[x].YSlNo == slno) {
                    yarndet.push(PlanYarnDet[x]);
                }
            }
            Loadsepyarn(yarndet);
            //var Tweight = 0;

            //Tweight = Tweight + NAweight;

            //alert(Tweight);

        }
        //else if (Bper == 0 && KQty > 0 && VYSlNo == YlNo) {
        else if (Bper == 0 && KQty > 0 ) {
            //$('#txtWeight').val(Wght);
            //$('#txtActualWeight').val(Wght);
            yarndet = [];
           // alert("Already Weight has been Exists");
            $('#txtWeight').val(0);
            $('#txtActualWeight').val(0);

            for (var x = 0; x < PlanYarnDet.length; x++) {
                if (PlanYarnDet[x].YSlNo == slno) {
                    yarndet.push(PlanYarnDet[x]);
                }
            }


            //var ctry = [];
            //ctry = PlanYarnDet;
            //ctry = $.grep(ctry, function (e) {
            //    if (e.YSlNo == slno) {
            //        return e;
            //    }
            //});
            //ctry;
            Loadsepyarn(yarndet);
        } else {
            $('#txtWeight').val(wght);
            $('#txtActualWeight').val(wght);
        }

        //valid

    }


});

$(document).ready(function () {

    //component details
    $('#btnYarnViewAdd').click(function () {
        debugger;
       var d= $("#ddlYarn option:selected").text();
        if (PlanYarnDet.length > 0) {
            for (var q = 0; q < PlanYarnDet.length; q++) {
                if (PlanYarnDet[q].YSlNo == slno) {
                    if (PlanYarnDet[q].Yarn == d) {
                        alert('Must be different yarn...');
                        return true;
                    }
                }
            }
        }

        var totalper = 0;
        for (var s = 0; s < PlanYarnDet.length; s++) {
            if (PlanYarnDet[s].YSlNo == slno) {
                var per = PlanYarnDet[s].Knit_In_Per;
                totalper = totalper + parseFloat(per);
            }
        }
        Bper = 100 - totalper;
        if (Bper == 0) {
            alert("Already Weight has been Exists");
            fnClearYarnDetailsControls();
            return true;
            
        }
        if (Mod == 0) {
            ///////hide the loss table
            $("#CList1").show();
            ///////
        }

        var Dye = 0;

        if ($('#Dyeing').is(":checked")) {
            Dye = 1;
        }
        else {
            Dye = 0;
        }


        Eweight = $('#txtWeight').val();
        AWeight = $('#txtActualWeight').val();
        TEWeight = parseInt(TEWeight) + parseInt(Eweight);



        var lengdp = 0;
        var isAllValid = true;



        if ($('#ddlYarn').val() == "0") {
            isAllValid = false;
            $('#ddlYarn').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlYarn').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlCount').val() == "0") {
            isAllValid = false;
            $('#ddlCount').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlCount').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlColor').val() == "0") {
            isAllValid = false;
            $('#ddlColor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlColor').siblings('span.error').css('visibility', 'hidden');
        }


        if ($('#txtPer').val() == "") {
            isAllValid = false;
            $('#txtPer').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtPer').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtWeight').val() == "") {
            isAllValid = false;
            $('#txtWeight').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtWeight').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtActualWeight').val() == "") {
            isAllValid = false;
            $('#txtActualWeight').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtActualWeight').siblings('span.error').css('visibility', 'hidden');
        }


        if (PlanYarnDet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = PlanYarnDet.length + 1;
        }

        if (isAllValid) {


            debugger;
            var YarnDetObj = {
                Yarn: $("#ddlYarn option:selected").text(),
                Knit_In_ItemId: $('#ddlYarn').val(),
                Size: $("#ddlCount option:selected").text(),
                Knit_In_SizeID: $('#ddlCount').val(),
                Color: $("#ddlColor option:selected").text(),
                Knit_in_ColorID: $('#ddlColor').val(),
                Knit_In_Per: $('#txtPer').val(),
                Knit_In_Qty: $('#txtWeight').val(),
                Knit_In_ActQty: $('#txtActualWeight').val(),
                Loss_per: $('#txtLossPer').val(),
                Dyeing_Req: Dye,
                // txtPer: $('#txtActualWeight').val(),
                YSlNo: YlNo,
                YplanDetID: 0,
                YPlanMasID: 0,
                SlNo: lengdp,
                FabricID: FBRID,
                BaseColorID: BCLID,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            PlanYarnDet.push(YarnDetObj);
            yarndet=[];

            for (var x = 0; x < PlanYarnDet.length; x++) {
                if (PlanYarnDet[x].YSlNo == slno) {
                    yarndet.push(PlanYarnDet[x]);
                }
            }
            Loadsepyarn(yarndet);
            //YarnDetObj = [];
            //YarnDetObj=$.grep(PlanYarnDet, function (e) {
            //    return e.YSlNo == slno ;
            //});
           // loadyarndetailsTable(YarnDetObj);

            fnClearYarnDetailsControls();

            if (PlanYarnDet.length > 0) {
                Bper = 0;
                //fid = currentro1[0]['FabricID'];
                //BCLID = currentro1[0]['BaseColorID'];
                //var Wgt = currentro1[0]['Knit_In_Qty'];

                //var Ngt = Ngt + Wgt;
                //alert(Ngt);
                var totalper = 0;
                for (var s = 0; s < PlanYarnDet.length; s++) {
                    if (PlanYarnDet[s].YSlNo == slno) {
                        var per = PlanYarnDet[s].Knit_In_Per;
                        totalper = totalper + parseFloat(per);
                    }
                }
                Bper = 100 - totalper;
            }


            if (Mod == 0) {

                var PerQty = $('#txtPer').val();



                if (Bper > 0) {
                    $("#txtPer").val(Bper);
                    var NAweight = Bper / 100 * wt;
                    $('#txtWeight').val(NAweight);
                    $('#txtActualWeight').val(NAweight);
                    Bper = 0;

                    //var Tweight = 0;

                    //Tweight = Tweight + NAweight;

                    //alert(Tweight);

                }
                    //else if (Bper == 0 && KQty > 0 && VYSlNo == YlNo) {
                else if (Bper == 0 && KQty > 0) {
                   
                    //yarndet = [];
                    //alert("Already Weight has been Exists");
                    $('#txtWeight').val(0);
                    $('#txtActualWeight').val(0);

                    //for (var x = 0; x < PlanYarnDet.length; x++) {
                    //    if (PlanYarnDet[x].YSlNo == slno) {
                    //        yarndet.push(PlanYarnDet[x]);
                    //    }
                    //}                   
                    //Loadsepyarn(yarndet);
                } else {
                    $('#txtWeight').val(wt);
                    $('#txtActualWeight').val(wt);
                }

                //valid

            }
            
        }

    });


    function fnClearYarnDetailsControls() {
        debugger;
        $('#ddlYarn').val('0');
        $('#ddlColor').val('0');
        $('#ddlCount').val('0');
        $('#txtPer').val('');
        $('#txtWeight').val('');
        $('#txtActualWeight').val('');
        $('#txtLossPer').val('');
        document.getElementById("Dyeing").checked = false;

    }

    $(document).on('click', '.btnYarnedit', function () {
        debugger;
        Mode = 1;

        //



        rowindex = $(this).closest('tr').index();

        var cur1 = PlanYarnDet.slice(rowindex);

        if (Mod == 0) {

            $('#ddlYarn').val(cur1[0]['Knit_In_ItemId']);
            $('#txtPer').val(cur1[0]['Knit_In_Per']);
            $('#ddlCount').val(cur1[0]['Knit_In_SizeID']);
            $('#txtWeight').val(cur1[0]['Knit_In_Qty']);
            $('#ddlColor').val(cur1[0]['Knit_in_ColorID']);
            $('#txtLossPer').val(cur1[0]['Loss_per']);
            $('#txtActualWeight').val(cur1[0]['Knit_In_Qty']);
        } else {

            $('#ddlYarn').val(cur1[0]['Knit_In_ItemId']);
            $('#txtPer').val(cur1[0]['Knit_In_Per']);
            $('#ddlCount').val(cur1[0]['Knit_In_SizeID']);
            $("#txtWeight").val(cur1[0]['Knit_In_Qty']);
            $('#ddlColor').val(cur1[0]['Knit_in_ColorID']);
            $('#txtLossPer').val(cur1[0]['Loss_per']);
            $('#txtActualWeight').val(cur1[0]['Knit_In_Qty']);
        }
        var Chk = cur1[0]['Dyeing_Req'];

        if (Chk == 0) {
            document.getElementById("Dyeing").checked = false;
        } else if (Chk == 1) {
            document.getElementById("Dyeing").checked = true;
        }

        $('#btnYarnViewAdd').hide();
        $('#btnYarnViewUpdate').show();
    });

    $('#btnYarnViewUpdate').click(function () {
        debugger;
        var currentrowsel = PlanYarnDet.slice(rowindex);

        currentrowsel[0]['Knit_In_ItemId'] = $("#ddlYarn").val();
        currentrowsel[0]['Yarn'] = $("#ddlYarn option:selected").text();

        currentrowsel[0]['Knit_In_SizeID'] = $("#ddlCount").val();
        currentrowsel[0]['Size'] = $("#ddlCount option:selected").text();

        currentrowsel[0]['Knit_in_ColorID'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['Loss_per'] = $("#txtLossPer").val();
        currentrowsel[0]['Knit_In_Qty'] = $("#txtWeight").val();
        currentrowsel[0]['Knit_In_Per'] = $("#txtPer").val();


        if ($('#Dyeing').is(":checked")) {
            currentrowsel[0]['Dyeing_Req'] = 1;
        }
        else {
            currentrowsel[0]['Dyeing_Req'] = 0;
        }


        PlanYarnDet[rowindex] = currentrowsel[0];

        loadyarndetailsTable(PlanYarnDet);

        $('#btnYarnViewUpdate').hide();
        $('#btnYarnViewAdd').show();
        fnClearYarnDetailsControls();


    });

    $(document).on('click', '.btnYarnremove', function () {
        rowindex = $(this).closest('tr').index();
        PlanYarnDet.splice(rowindex, 1);
        document.getElementById("tblyarnDetails").deleteRow(rowindex + 1);
    });




    //


});

function loadyarndetailsTable(YarnDetObj) {
    $('#tblyarnDetails').DataTable().destroy();
    debugger;


    var cur1 = PlanYarnDet.slice(0);

    YMasID = cur1[0]['YPlanMasID'];
    GYDetID = cur1[0]['YplanDetID'];

    var FabricID = cur1[0]['FabricID'];
    var BaseColorID = cur1[0]['BaseColorID'];
    var SDlNo = cur1[0]['SlNo'];
    KQty = cur1[0]['Knit_In_Qty'];
    VYSlNo = cur1[0]['YSlNo'];

    //alert(KQty);
    //alert(VYSlNo);

    $('#tblyarnDetails').DataTable({
        data: PlanYarnDet,
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
                   { title: "SlNo", data: "SlNo" },
                   { title: "YplanDetID", data: "YplanDetID", "visible": false },
                   { title: "Knit_In_ItemId", data: "Knit_In_ItemId", "visible": false },
                   { title: "Yarn", data: "Yarn" },
                   { title: "Knit_In_SizeID", data: "Knit_In_SizeID", "visible": false },
                   { title: "Counts", data: "Size" },
                   { title: "Knit_in_ColorID", data: "Knit_in_ColorID", "visible": false },
                   { title: "Color", data: "Color" },
                   { title: "%", data: "Knit_In_Per" },
                   { title: "Weight(Kgs)", data: "Knit_In_Qty" },
                   { title: "Loss%", data: "Loss_per" },
                   { title: "Actual Weight", data: "Knit_In_ActQty" },
                   { title: "YD SlNo", data: "YSlNo", "visible": false },
                   { title: "FabricID", data: "FabricID", "visible": false },
                   { title: "BaseCID", data: "BaseColorID", "visible": false },
                   { title: "YMasID", data: "YPlanMasID", "visible": false },
                   { title: "Dyeing", data: "Dyeing_Req" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  <button type="button" data-toggle="tooltip" data-placement="top" style="width: 20px;padding:0px;background: #6B8E23;border: 1px solid #6B8E23;height: 20px;" title="Dyeing" class="btnAddDyeing btn btn_round"> <img style="width: 14px;margin-top: -2.5px;margin-left: 0.5px;" src="../images/dyeing.png" </button>'
                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  <button type="button" data-toggle="tooltip" data-placement="top" style="width:25px;padding:0px;" title="Dyeing" class="btnAddDyeing btn-success btn btn_round"> <img style="width:20px;" src="../images/dyeing.png" </button>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
    $("#tblyarnDetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblyarnDetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });


}

function Loadsepyarn(list) {

    var cur1 = PlanYarnDet.slice(0);
    KQty = cur1[0]['Knit_In_Qty'];
    $('#tblyarnDetails').DataTable().destroy();
    $('#tblyarnDetails').DataTable({
        data: list,
        columns: [
                   { title: "SlNo", data: "SlNo" },
                   { title: "YplanDetID", data: "YplanDetID", "visible": false },
                   { title: "Knit_In_ItemId", data: "Knit_In_ItemId", "visible": false },
                   { title: "Yarn", data: "Yarn" },
                   { title: "Knit_In_SizeID", data: "Knit_In_SizeID", "visible": false },
                   { title: "Counts", data: "Size" },
                   { title: "Knit_in_ColorID", data: "Knit_in_ColorID", "visible": false },
                   { title: "Color", data: "Color" },
                   { title: "%", data: "Knit_In_Per" },
                   { title: "Weight(Kgs)", data: "Knit_In_Qty" },
                   { title: "Loss%", data: "Loss_per" },
                   { title: "Actual Weight", data: "Knit_In_ActQty" },
                   { title: "YD SlNo", data: "YSlNo", "visible": false },
                   { title: "FabricID", data: "FabricID", "visible": false },
                   { title: "BaseCID", data: "BaseColorID", "visible": false },
                   { title: "YMasID", data: "YPlanMasID", "visible": false },
                   { title: "Dyeing", data: "Dyeing_Req" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnYarnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>  <button type="button" data-toggle="tooltip" data-placement="top" style="width:25px;padding:0px;" title="Dyeing" class="btnAddDyeing btn-success btn btn_round"> <img style="width:20px;" src="../images/dyeing.png" </button>'
                   //"sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  <button type="button" class="btnAddDyeing"> Dyeing </button>'
                   // "sDefaultContent": '<button type="button" class="btnYarnedit"> Edit </button> <button type="button" class="btnYarnremove"> Remove </button>  '
               }
        ]

    });
}
function LoadPer() {
    debugger;
    if ($('#txtPer').val() > 100) {
        alert('Percentage should below 100...');
        return true;
    }

    if (Mod == 0) {

        var Wgt = $('#txtWeight').val();
        var Per = $('#txtPer').val();
        var AWght = (Per / 100) * Wgt;
        $('#txtWeight').val(AWght);
        $('#txtActualWeight').val(AWght);
        //Bper = 100 - Per;
    } else {
        var Wgt = Wght;
        var Per = $('#txtPer').val();
        var AWght = (Per / 100) * Wgt;
        $('#txtWeight').val(AWght);
        $('#txtActualWeight').val(AWght);
        Bper = 100 - Per;
    }
}

$(document).on('click', '.btnDUpdate', function () {
    debugger;

    //alert("A");

    rowindex = $(this).closest('tr').index();
    var cur3 = PlanYarnDyeing.slice(rowindex);


    var YPlanDetID = cur3[0]['YPlanDetID'];
    var SlNo = cur3[0]['SlNo'];
    var Garment_ColorID = cur3[0]['Garment_ColorID'];
    var GWeight = cur3[0]['GWeight'];
    var Yarn_DyeColorID = cur3[0]['CColorID'];
    var Qty_Per = cur3[0]['Qty_Per'];
    var Weight = cur3[0]['Weight'];
    var Purchase_Qty = $(this).closest('tr').find('#txtPurchase_Qty').val();
    //var Purchase_Qty = $(this).closest('tr').find('td:eq(4)').html();
    var Courses = cur3[0]['Courses'];
    var PerQty = $(this).closest('tr').find('#txtQty_Per').val();
    //var PerQty = $(this).closest('tr').find('td:eq(4)').html();
    var NWt = GWeight * PerQty / 100;
    var YDSlNo1 = cur3[0]['YDSlNo'];
    var YDyeID = cur3[0]['YPlanDyeID'];


    if(PerQty == 0)
    {
        alert("Please Enter the Percentage..");
        return true;
    }

    if (Mod == 0) {

        var cnt = $("#tblcompyarndetails1 tr").length - 1;

        var Data = "";

        // PackItemList = [];
        for (var i = 1; i <= cnt; i++) {

           // var OCId = $("#tblcompyarndetails1 tr:eq(" + i + ") td:eq(2)").html();
           // var OSizeId = $("#tblcompyarndetails1 tr:eq(" + i + ") td:eq(5)").html();
            var SNo = $("#tblcompyarndetails1 tr:eq(" + i + ") td:eq(1)").html();
            //var OStyleRow = $("#tblcompdetails1 tr:eq(" + i + ") td:eq(4)").html();
            //var OQuantity = $("#tblcompdetails1 tr:eq(" + i + ") td:eq(7)").html();



        }

        if (PlanYarnDyeing.length > 0) {
            if (SNo == SlNo) {
                alert("Already Exists..");
                //$('#txtQty').keyup(function () {
                //    table.search($(this).val()).draw();
                //})
                return true;


            }
        }


    }

    if (PerQty == 0) {
        alert("Please Enter Per for Yarn Dyeing:")
        return true;
    }

    if (Purchase_Qty > Weight) {
        alert("Purchase Qty are not exceed then weight:");
        return true;
    }

    if (Dying == 0 && Mod == 0) {
        alert("Dyeing are not Select For this Yarn");
        return true;
    }


    if (Yarn_DyeColorID == 0) {
        alert("Dyeing are not taken in Style Entry");
        return true;
    }



    var confabdetListObj = {
        YPlanDetID: YPlanDetID,
        SlNo: SlNo,
        Garment_ColorID: Garment_ColorID,
        GWeight: GWeight,
        Yarn_DyeColorID: Yarn_DyeColorID,
        Qty_Per: PerQty,
        Weight: NWt,
        Purchase_Qty: Purchase_Qty,
        Courses: Courses,
        YDSlNo: YDSlNo1,
        YPlanDyeID: YDyeID,
    };

    NPlanYarnDyeing.push(confabdetListObj);
    loadconfpDetTable(confabdetListObj);
    alert("Updated Sucessfully");
    //}
});

function loadconfpDetTable(confabListObj) {
   $('#tblcompyarndetails1').DataTable().destroy();
    debugger;

    $('#tblcompyarndetails1').DataTable({
        data: NPlanYarnDyeing,
        columns: [



            { title: "YPlanDetID", data: "YPlanDetID" },
            { title: "Sl No", data: "SlNo" },
            { title: "Garment_ColorID", data: "Garment_ColorID", "visible": false },
            { title: "Grey Weight", data: "GWeight" },
            { title: "Yarn_DyeColorID", data: "Yarn_DyeColorID" },
            { title: "Qty Per", data: "Qty_Per" },
            { title: "Weight", data: "Weight" },
            { title: "Purchase Qty", data: "Purchase_Qty" },
            { title: "Courses", data: "Courses" },
            { title: "YD SlNo", data: "YDSlNo" },
            { title: "YPlanDyeID", data: "YPlanDyeID" },


        ]
    });
}

function save() {

    debugger;


    if (PlanYarnDet.length == 0) {
        alert("Please Enter the Yarn Details..");
        return true;
    }
    var c = 0;
    for (var e = 0; e < PlanYarn1.length; e++) {
        c = PlanYarn1[e].SlNo;
        var totalper = 0;
        for (var f = 0; f < PlanYarnDet.length; f++) {
            if (PlanYarnDet[f].YSlNo == c) {
                var per = PlanYarnDet[f].Knit_In_Per;
                totalper = totalper + parseFloat(per);
            }
            
        }
        if (totalper < 100) {
            alert('Separate weight should not be less than 100');
            return true;
        }
    }

    var r = 0;
    for (var e = 0; e < PlanYarn1.length; e++) {
        r = PlanYarn1[e].SlNo;
        var data = $.grep(PlanYarnDet, function (e) {
            return e.YSlNo ==r;
        });

        if (data.length == 0) {
            alert('Yarn must be filled for all fabric...');
            return true;
        }
    }

   

    if (Mod == 0) {
        var Mode = "A";
    }
    var PId = PlanId;


    var objConYarnSubmit = {

        CompanyId: $('#txtHCompanyId').val(),
        StyleId: $('#txtHStyleId').val(),
        PlanId: PId,
        Mode: Mode,
        OrderNo: $('#txtOrderNo').val(),
        PrgThr: "W",
        EntryDate: new Date($('#txtEntryDate').val()),
        PlanYarnN: PlanYarn1,
        PlanYarnDet: PlanYarnDet,
        PlanYarnLoss: PlanYarnLoss,
        PlanYarnDyeing: NPlanYarnDyeing
    };

    $.ajax({
        url: "/PlanningYarn/Add",
        data: JSON.stringify(objConYarnSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Data Saved Sucessfully");
            //window.location.href = "/PlanningMain/PlanningMainIndex";
            StyRowId = StyleRId;
            window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}
function EditCompYarnLossPlanList(PlId, CompNo) {



    debugger;

    $.ajax({
        url: "/PlanningYarn/ListCompYarnLossDetails",
        data: JSON.stringify({ PlanID: PlId, CNo: CompNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PlanYarnLoss = result;
            loadyarnLossTable(PlanYarnLoss);


            //EditDetConPlanFabList(PlId, CompNo);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function ListYarnEditDetDetails(YMasID, OrdNo, StyleId) {



    debugger;

    $.ajax({
        url: "/PlanningYarn/ListYarnEditDetDetails",
        data: JSON.stringify({ YMasID: YMasID, OrdNo: OrdNo, StyleId: StyleId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            PlanYarnDet = result;
            loadyarndetailsTable(PlanYarnDet);



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function EditDetPlanYarnDyeingList(PlanID, ItemID, FabricID, baseColorID, StyleRowID, YMasID, YDetID, Qty, Dying, YlNo) {



    $.ajax({
        url: "/PlanningYarn/ListYarnDyeingEditDetails",
        data: JSON.stringify({ PlId: PlanID, ItemID: ItemID, FabricID: FabricID, baseColorID: baseColorID, StyleRowID: StyleRowID, YMasID: YMasID, YDetID: YDetID, Qty: Qty, Dying: Dying, YlNo: YlNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //LoadChildDataToArrayConYarnDyeEdit(result);
            PlanYarnDyeing = result;
            loadYarnDyeAddTable(PlanYarnDyeing);

            NPlanYarnDyeing = result;
            loadconfpDetTable(NPlanYarnDyeing);

            //NPlanYarnDyeing.push(NPlanYarnDyeing);
            //loadconfpDetTable(confabdetListObj);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}


//function LoadChildDataToArrayConYarnDyeEdit(result) {
//    debugger;
//    // $('#tFYDbody').DataTable().destroy();
//    var gridData = [];

//    this.PlanYarnDyeing1 = result.data.Data;

//    this.NPlanYarnDyeing = result.data.Data;
//    loadconfpDetTable(NPlanYarnDyeing);


//    var PlanYarnDyeing1 = eval("[" + result.data.tableValue + "]");

//    var i = 0;
//    var k = 0;
//    var W = 0;


//    $('#tFYDbody').DataTable({

//        data: PlanYarnDyeing1,
//        columns: [

//                         { title: "YPlanDyeID", "visible": false },
//                         { title: "YPlanDetID", "visible": false },
//                         { title: "SlNo", "visible": false },
//                         { title: "Garment_ColorID", "visible": false },
//                         { title: "Garment Color" },
//                         { title: "GWeight" },
//                         { title: "Yarn_DyeColorID", "visible": false },
//                         { title: "Dyeing Color" },
//                          { title: "YDSlNo" },
//                        // { title: "Qty_Per" },
//                              {
//                                  title: "Qty_Per ",
//                                  render: function (data, type, row) {
//                                   //   return '<input id="txtQty_Per" type="text" value="0" style="width: 50px;text-align: center;" >';

//                                      i += 1;
//                                      return '<input id="txtQty_Per' + i + '" type="text" value="' + row[9] + '" style="width: 50px;text-align: center;" >';

//                                  }


//                              },

//                         { title: "Weight" },
//                         //{ title: "Purchase_Qty", "visible": false },
//                         {
//                             title: "Purchase_Qty ",
//                             render: function (data, type, row) {
//                              //   return '<input id="txtPurchase_Qty" type="text" value="0" style="width: 50px;text-align: center;" >';
//                                 k += 1;
//                                 return '<input id="txtPurchase_Qty' + k + '" type="text" value="' + row[11] + '" style="width: 50px;text-align: center;" >';

//                             }


//                         },
//                         { title: "Courses", "visible": false },

//                          {
//                              title: "Update", "mDataProp": null,


//                              "sDefaultContent": '<button type="button" class="btnEDyUpdate"> Edit </button>'
//                          },
//        ]

//    });


//}
function CheckFab() {

    var Wgt = $('#txtWeight').val();

    if (Wgt == 0) {
        //alert("Please Select the Fabric Row:By click the Yarn Button");
    }
}

$(document).on('click', '.btnEUDyUpdate', function () {

    // alert("Haiii");

    //alert("b");


    //want to load the text box 

    rowindex = $(this).closest('tr').index();
    var cur4 = NPlanYarnDyeing.slice(rowindex);


    var NYPlanDetID = cur4[0]['YPlanDetID'];
    var NSlNo = cur4[0]['SlNo'];
    var NGarment_ColorID = cur4[0]['Garment_ColorID'];
    var NGWeight = cur4[0]['GWeight'];
    var NYarn_DyeColorID = cur4[0]['CColorID'];
    var NQty_Per = cur4[0]['Qty_Per'];
    // var NWeight = cur4[0]['Weight'];
    var NPurchase_Qty = cur4[0]['Purchase_Qty'];
    var NCourses = cur4[0]['Courses'];
    //var NPerQty = $(this).closest('tr').find('#txtQty_Per').val();
    var NNWt = cur4[0]['Weight'];
    var NYDSlNo1 = cur4[0]['YDSlNo'];
    var NYDPlanDyeID = cur4[0]['YPlanDyeID'];


    rowindex = $(this).closest('tr').index();
    var cur3 = PlanYarnDyeing1.slice(rowindex);


    var YPlDetID = cur3[0]['YPlanDetID'];
    var SlNo = cur3[0]['SlNo'];
    var Garment_ColorID = cur3[0]['Garment_ColorID'];
    var GWeight = cur3[0]['GWeight'];
    var Yarn_DyeColorID = cur3[0]['CColorID'];
    // var Qty_Per = $(this).closest('tr').find('#txtQty_Per').val();
    var Weight = cur3[0]['Weight'];
    // var Purchase_Qty = $(this).closest('tr').find('#txtPurchase_Qty').val();
    var Purchase_Qty = $(this).closest('tr').find('td:eq(4)').html();
    var Courses = cur3[0]['Courses'];
    //var PerQty = $(this).closest('tr').find('#txtQty_Per').val();
    var PerQty = $(this).closest('tr').find('td:eq(6)').html();
    var NWt = GWeight * PerQty / 100;
    var YDSlNo1 = cur3[0]['YDSlNo'];
    var YPlDyeID = cur3[0]['YPlanDyeID'];


    if (PerQty == 0) {
        alert("Please entry the % ");
        window.location.reload(true);
    }

    if (NYPlanDetID == YPlDetID && (NQty_Per != PerQty || NPurchase_Qty != Purchase_Qty) && NYDPlanDyeID == YPlDyeID) {

        // RemoveDyeingGrid();

        var confabdetListObj = {
            YPlanDetID: YPlDetID,
            SlNo: SlNo,
            Garment_ColorID: Garment_ColorID,
            GWeight: GWeight,
            Yarn_DyeColorID: Yarn_DyeColorID,
            Qty_Per: PerQty,
            Weight: NWt,
            Purchase_Qty: Purchase_Qty,
            Courses: Courses,
            YDSlNo: YDSlNo1,
            YPlanDyeID: YPlDyeID,

            //YPlanDetID: YPlanDetID,
            //SlNo: SlNo,
            //Garment_ColorID: Garment_ColorID,
            //GWeight: GWeight,
            //Yarn_DyeColorID: Yarn_DyeColorID,
            //Qty_Per: PerQty,
            //Weight: NWt,
            //Purchase_Qty: Purchase_Qty,
            //Courses: Courses,
            //YDSlNo: YDSlNo1,
            //YPlanDyeID: YDyeID,

        };

        NPlanYarnDyeing.push(confabdetListObj);
        loadconfpDetTable(confabdetListObj);

    }
});

function Update() {

    debugger;

    if (Mod == 0) {
        var Mode = "D";
    }
    var PId = PlanId;

    var objConYarnESubmit = {


        EntryDate: new Date($('#txtEntryDate').val()),
        CompanyId: $('#txtHCompanyId').val(),
        StyleId: $('#txtHStyleId').val(),
        PlanId: PId,
        Mode: Mode,
        OrderNo: $('#txtOrderNo').val(),
        PrgThr: "W",
        PlanYarnN: PlanYarn1,
        PlanYarnDet: PlanYarnDet,
        PlanYarnLoss: PlanYarnLoss,
        PlanYarnDyeing: NPlanYarnDyeing
    };

    $.ajax({
        url: "/PlanningYarn/Update",
        data: JSON.stringify(objConYarnESubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Data Updated Sucessfully");
            //window.location.href = "/PlanningMain/PlanningMainIndex";
            StyRowId = StyleRId;
            window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function YClose() {
    // window.location.href = "/PlanningMain/PlanningMainIndex";
    StyRowId = StyleRId;
    window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;
}
function Delete() {
    debugger;

    var PlId = PlanId;

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/PlanningYarn/Delete/" + PlId,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                alert("Data Deleted Sucessfully");
                //$('#tPAbody').DataTable().destroy();
                //LoadPlanAdd();
                //window.location.reload(true);

                //window.location.href = "/PlanningMain/PlanningMainIndex";
                StyRowId = StyleRId;
                window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}