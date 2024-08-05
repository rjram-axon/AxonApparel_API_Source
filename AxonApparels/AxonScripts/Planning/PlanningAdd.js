var OrderNo;
var StyleRowId;
var ItemId;
var Mode = 0;
var Gp = 0;
var CStyRowId = 0;
var OrdApp = "N";
$(document).ready(function () {
    debugger;
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    var StyleRowId = queryvalue[1];
    Mode = queryvalue[3];
    if (queryvalue.length == 6) {
        Mode = queryvalue[3];
        OrdApp = "Y";
       
    }
    CStyRowId = StyleRowId;
    LoadPlanDetails(StyleRowId);
    var Type = "C";
    LoadPlanAdd(StyleRowId, Mode, Type);
    Gp = "Con";
    CheckRights("PlanProgram");
});

function Con() {

    var Prg = "Con";
    Gp = Prg;
    var Type = "C";
   // $('#tPAbody').DataTable().destroy();
    LoadPlanAdd(CStyRowId, Mode, Type);
    CheckRights("PlanProgram");
}
function Fab() {

    var Prg = "Fab";
    Gp = Prg;
    var Type = "F";
    //$('#tPAbody').DataTable().destroy();
    LoadPlanAdd(CStyRowId, Mode, Type);
}
function Yarn() {

    var Prg = "Yarn";
    Gp = Prg;
    var Type = "Y";
   // $('#tPAbody').DataTable().destroy();
    LoadPlanAdd(CStyRowId, Mode, Type);

}
function Acc() {

    var Prg = "Acc";
    Gp = Prg;
    var Type = "A";
    //$('#tPAbody').DataTable().destroy();
    LoadPlanAdd(CStyRowId, Mode, Type);
    CheckRights("PlanTrims");
}
function LoadPlanAdd(StyleRowId, Mod, Type) {

    var StyRId = StyleRowId;
    var M = Mod;

    $.ajax({
        url: "/PlanningAdd/ListAddPlanning",
        data: JSON.stringify({ StyleRowid: StyRId, Mode: M, Type: Type }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            var inputcount = 0;
            $('#tPAbody tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tPAbody').DataTable();
                //var rows = table
                //    .rows()
                //    .remove()
                //    .draw();
                var rows = table.clear().draw();

                $('#tPAbody').DataTable().rows.add(dataSet); // Add new data
                $('#tPAbody').DataTable().columns.adjust().draw(); // Redraw the DataTable
            }
            else {


                $('#tPAbody').DataTable({
                    data: dataSet,
                    "rowCallback": function (row, data, index) {
                        if (data[5] > "0") {
                            $('td', row).css('background-color', 'Tan');

                        }
                    },
                    columns: [
                             { title: "ItemId", "visible": false },
                             { title: "Item" },
                             { title: "Order Qty" },
                             { title: "Production Qty" },
                             //{ title: "Style" },
                             //{ title: "RefNo" },
                             //{ title: "Date" },
                             //{ title: "Quantity" },
                             //{ title: "StyleRowID" },
                             { title: "PlanID", "visible": false },
                               { title: "ProdAmend", "visible": false },
                              { title: "Action" },


                    ]

                });
            }
            if (Gp == "Con") {
                CheckRights("PlanProgram");
            } else if (Gp == "Acc") {
                CheckRights("PlanTrims");
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
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
                //OrderNo = val(obj[0]["Order_No"]);
                StyleRowId = $("#txtStyleRowId").val();
                var Planid = $("#txtPlanId").val();
                //alert(Planid);

                if (Planid == 0 && Mode == 0) {
                    $('#Fab').prop('disabled', true);
                    $('#Yar').prop('disabled', true);
                }
                if (Planid > 0) {
                    // $('#Con').prop('disabled', true);
                    //$('#Yar').prop('disabled', true);
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



function getbyItemID(ItemID, PlanID) {
    debugger;
    StyleRowId = $("#txtStyleRowId").val();
    var PlanId = PlanID;
    var ItemId = ItemID;
    if (Gp == "Con") {
        var Mode = 0;
        window.location.href = "/PlanningConsumption/PlanningConsumptionIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode;
    } else if (Gp == "Fab") {

        var Mode = 0;
        window.location.href = "/PlanningFabric/PlanningFabricIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode;
    } else if (Gp == "Yarn") {

        var Mode = 0;
        window.location.href = "/PlanningYarn/PlanningYarnIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode;
    } else if (Gp == "Acc") {

        var PlanId = PlanID;
        var ItemId = ItemID;
        var ODQty = $("#txtProdQty").val();;
        var Mode = 0;
        window.location.href = "/Trims/TrimsIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode + "=&OQty=" + ODQty;
    }

}


function Edit(ItemID, PlanID) {
    debugger;
    StyleRowId = $("#txtStyleRowId").val();
    var PlanId = PlanID;
    var ItemId = ItemID;
    if (Gp == "Con") {
        var Mod = 1;
        window.location.href = "/PlanningConsumption/PlanningConsumptionIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mod + "=&Status=" + OrdApp;
    } else if (Gp == "Fab") {

        var Mod = 1;
        window.location.href = "/PlanningFabric/PlanningFabricIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mod;
    } else if (Gp == "Yarn") {

        var Mod = 1;
        window.location.href = "/PlanningYarn/PlanningYarnIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mod;
    } else if (Gp == "Acc") {

        var PlanId = PlanID;
        var ItemId = ItemID;
        var ODQty = $("#txtProdQty").val();
        var Mod = 1;
        window.location.href = "/Trims/TrimsIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mod + "=&OQty=" + ODQty + "=&Status=" + OrdApp;
    }


}


function TrimmsAdd(ItemID, PlanID, OQty) {
    debugger;
    StyleRowId = $("#txtStyleRowId").val();
    var PlanId = PlanID;
    var ItemId = ItemID;
    var ODQty = $("#txtProdQty").val();

    var Mode = 0;
    window.location.href = "/Trims/TrimsIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode + "=&OQty=" + ODQty;


}

function TrimmsEdit(ItemID, PlanID) {
    debugger;
    StyleRowId = $("#txtStyleRowId").val();
    var PlanId = PlanID;
    var ItemId = ItemID;
    var Mode = 1;
    window.location.href = "/Trims/TrimsIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode + "=&OQty=" + ODQty;


}

function Delete(ItemID, PlanID) {
    debugger;

    StyleRowId = $("#txtStyleRowId").val();
    var PlanId = PlanID;
    var ItemId = ItemID;
    if (Gp == "Con") {
        var Mode = 2;
        window.location.href = "/PlanningConsumption/PlanningConsumptionIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode + "=&Status=" + OrdApp;
    } else if (Gp == "Fab") {

        var Mode = 2;
        window.location.href = "/PlanningFabric/PlanningFabricIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode;
    } else if (Gp == "Yarn") {

        var Mode = 2;
        window.location.href = "/PlanningYarn/PlanningYarnIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode;
    } else if (Gp == "Acc") {

        var PlanId = PlanID;
        var ItemId = ItemID;
        var ODQty = $("#txtProdQty").val();
        var Mode = 2;
        window.location.href = "/Trims/TrimsIndex?ItemId=" + ItemId + "=&StyleRowId=" + StyleRowId + "=&PlanId=" + PlanId + "=&Mode=" + Mode + "=&OQty=" + ODQty;
    }

}
function Backmain() {
    window.location.href = "/PlanningMain/PlanningMainIndex";
}
