var ProShipList = [];
var ProItemList = [];
var filteredResult = [];
var TotQuantity = 0;
var ShipRowId = 0;
var HeaderProdQty = 0;
var StyRowId = 0;
var GBMasId = 0;
$(document).ready(function () {
    // loadData();
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    debugger;
    StyRowId = queryvalue[1];
    getbyID(StyRowId);


    $("#prodallowance").keypress(function (e) {
        debugger;
        if (e.keyCode == 13 && $('#prodallowance').val() > 0) {

            var allowance = $('#prodallowance').val();
            //var quantity = $('#basicquantity').val();

            //var Percentagecal = (quantity * allowance / 100);

            //var table = $('#tblprodshipdetails').DataTable();
            //var table_length = table.data().count();
            //var Basequantity = parseInt($('#basicquantity').val());
            //var valueperrow = ((Basequantity + Percentagecal) / table_length);

            for (var i = 0; i < ProShipList.length; i++) {
                var percentagecal = ProShipList[i]["Qty"];
                var percenval = (percentagecal * allowance / 100);
                var allowval = percenval;

                //Round Off
                ProShipList[i]["Allowance"] = Math.ceil(allowval);
                ProShipList[i]["Qty"] = parseInt(ProShipList[i]["Qty"]) + parseInt(Math.ceil(percenval));
            }

            loadProdShipTable(ProShipList);

            for (var i = 0; i < ProItemList.length; i++) {
                var percentagecal = ProItemList[i]["ProdQty"];
                var percenval = (percentagecal * allowance / 100);
                var allowval = percenval;

                //Round Off
                ProItemList[i]["Allowance"] = Math.ceil(allowval);
                ProItemList[i]["ProdQty"] = parseInt(ProItemList[i]["ProdQty"]) + parseInt(Math.ceil(percenval));
            }

            loadProdItemTable(ProItemList);
            CalculateTotQuality();
        }
        else {
            if (e.keyCode == 13 && $('#prodallowance').val() == 0) {
                for (var i = 0; i < ProShipList.length; i++) {
                    ProItemList[i]["ProdQty"] = ProItemList[i]["OrderQty"];
                }

                loadProdItemTable(ProItemList);
                CalculateTotQuality();
            }
        }
    });


    $("#ddlprocessunit").change(function () {
        var ProcessUnit = $('#ddlprocessunit').val();
        if (ProcessUnit == 0) {
            $('#ddlprocessunit').css('border-color', 'Red');
        }
        else {
            $('#ddlprocessunit').css('border-color', 'lightgrey');
        }
    });

    $("#ddlprodunit").change(function () {
        var ProdUnit = $('#ddlprodunit').val();
        if (ProdUnit == 0) {
            $('#ddlprodunit').css('border-color', 'Red');
        }
        else {
            $('#ddlprodunit').css('border-color', 'lightgrey');
        }
    });

    $(document).on('click', '.btnshipView', function () {
        debugger;
        var sumofprodqty = 0;
        var diffprodqty = 0;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = ProShipList.slice(rowindex);
        ShipRowId = currentrowsel[0]["ShiprowID"];
        HeaderProdQty = currentrowsel[0]["Qty"];

        //Filter in arraylist
        var filteredResult = $.grep(ProItemList, function (element, index) {
            return element.ShipRow == ShipRowId;
        });

        //Loop for sum of Production qty
        for (var i = 0; i < filteredResult.length; i++) {
            //console.log("loop", filteredResult[i])
            if (sumofprodqty == 0) {
                sumofprodqty = filteredResult[i]["ProdQty"];
            }
            else {
                sumofprodqty = (sumofprodqty + filteredResult[i]["ProdQty"]);
            }
        }

        if (sumofprodqty > HeaderProdQty) {
            diffprodqty = (sumofprodqty - HeaderProdQty);
        }

        if (diffprodqty > 0) {
            for (var i = 0; i < filteredResult.length; i++) {
                filteredResult[0]["ProdQty"] = (filteredResult[i]["ProdQty"] - diffprodqty);
                filteredResult[0]["Allowance"] = (filteredResult[i]["Allowance"] - diffprodqty);
                i = i + 1;
            }
        }

        loadProdItemTable(filteredResult);
    });

    $(document).on('click', '.btnshipedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ProShipList.slice(rowindex);

        $('#ddldestination').val(currentro12[0]['DestinationId']);
        $('#txtAssortno').val(currentro12[0]['Lotno']);
        $('#txtShipDate').val(moment(currentro12[0]['ShipDate']).format("DD/MM/YYYY"));
        $('#ddlPortLoading').val(currentro12[0]['PortofLoadingId']);
        $('#txtordqty').val(currentro12[0]['JobQty']);
        $('#txtProdQty').val(currentro12[0]['Qty']);
        $('#txtdeldate').val(moment(currentro12[0]['DeliveryDate']).format("DD/MM/YYYY"));

        $("btncolorupdate").prop('disabled', false);
        $('#btncoloradd').hide();
        $('#btncolorupdate').show();
    });

    $(document).on('click', '.btnitemedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ProItemList.slice(rowindex);

        $('#ddlColor').val(currentro12[0]['Colorid']);
        $('#ddlitem').val(currentro12[0]['ItemId']);
        $('#ddlitemcolor').val(currentro12[0]['Colorid']);
        $('#ddlsize').val(currentro12[0]['SizeId']);
        $('#txtqty').val(currentro12[0]['OrderQty']);
        $('#txtallowance').val(currentro12[0]['Allowance']);
        $('#txtProditemQty').val(currentro12[0]['ProdQty']);

        $("btncoloritemupdate").prop('disabled', false);
        $('#btncoloradd').hide();
        $('#btncolorupdate').show();
    });

    $('#btncoloritemupdate').click(function () {
        var currentrowsel = ProItemList.slice(rowindex);

        currentrowsel[0]['Colorid'] = $("#ddlColor").val();
        currentrowsel[0]['ItemId'] = $("#ddlitem").val();
        currentrowsel[0]['Colorid'] = $("#ddlitemcolor").val();
        currentrowsel[0]['SizeId'] = $('#ddlsize').val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['Color'] = $("#ddlitemcolor option:selected").text();
        currentrowsel[0]['Item'] = $("#ddlitem option:selected").text();
        currentrowsel[0]['OrderQty'] = $("#txtqty").val();
        currentrowsel[0]['Allowance'] = $("#txtallowance").val();
        currentrowsel[0]['ProdQty'] = $("#txtProditemQty").val();

        ProItemList[rowindex] = currentrowsel[0];

        loadProdItemTable(ProItemList);
        CalculateTotQuality();

        $("#ddlColor").val('0');
        $("#ddlitem").val('0');
        $("#ddlitemcolor").val('0');
        $("#ddlsize").val('0');
        $("#txtqty").val('');
        $("#txtallowance").val('');
        $("#txtProditemQty").val('');

    });

    $('#btncolorupdate').click(function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        if ($("#ddldestination").val() != 0) {
            var currentrowsel = ProShipList.slice(rowindex);

            currentrowsel[0]['DestinationId'] = $("#ddldestination").val();
            currentrowsel[0]['Lotno'] = $("#txtAssortno").val();
            currentrowsel[0]['JobQty'] = $("#txtordqty").val();
            currentrowsel[0]['PortofLoadingId'] = $('#ddlPortLoading').val();
            currentrowsel[0]['PortofLoading'] = $("#ddlPortLoading option:selected").text();
            currentrowsel[0]['Destination'] = $("#ddldestination option:selected").text();
            currentrowsel[0]['Qty'] = $("#txtProdQty").val();
            currentrowsel[0]['ShipDate'] = $("#txtShipDate").val();
            currentrowsel[0]['DeliveryDate'] = $("#txtdeldate").val();

            ProShipList[rowindex] = currentrowsel[0];

            loadProdShipTable(ProShipList);

            //$('#btncldupdate').hide();
            //$('#btncldadd').show();

            $('#txtProdQty').val('');
            $('#txtAssortno').val('');
            $('#txtordqty').val('');
            $('#ddlPortLoading').val('0');
            $('#ddldestination').val('0');
            $('#txtShipDate').val('');
            $('#txtdeldate').val('');

            $('#txtProdQty').siblings('span.error').css('visibility', 'hidden');
            $('#txtAssortno').siblings('span.error').css('visibility', 'hidden');
            $('#txtordqty').siblings('span.error').css('visibility', 'hidden');
            $('#ddlPortLoading').siblings('span.error').css('visibility', 'hidden');
            $('#DestinationId').siblings('span.error').css('visibility', 'hidden');
        }
    });
});

function loadData() {
    debugger;
    $.ajax({
        type: "GET",
        url: '/WorkOrder/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#twobody').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                         { title: "ID", "visible": false },
                         { title: "Order No" },
                         { title: "Style" },
                         { title: "Action" },
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "Job_Ord_Mas",
    column = "Job_Ord_No",
    compId = $("#txtCompanyId").val(),

    Docum = 'WORK ORDER'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#workno').val(result.Value);
        }
    });
}

function clearTextBox() {
    $('#ddlprodunit').val("0");
    $('#ddlprocessunit').val("0");
    $('#prodallowance').val("");
    //$('#txtstyle').val("");
    //$('#txtquantity').val("");
    //$('#txtWODate').val("");

    //$('#btnUpdate').hide();
    //$('#btnAdd').show();
    $('#txtorderno').css('border-color', 'lightgrey');
    $('#txtrefno').css('border-color', 'lightgrey');
    $('#txtstyle').css('border-color', 'lightgrey');
    $('#txtquantity').css('border-color', 'lightgrey');
    $('#txtWODate').css('border-color', 'lightgrey');


    $('#txtWODate').val(moment(new Date()).format('MM/DD/YYYY'));
}
function validate() {
    var isValid = true;

    if ($('#ddlprocessunit').val() == 0) {
        $('#ddlprocessunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlprocessunit').css('border-color', 'lightgrey');
    }
    if ($('#ddlprodunit').val() == 0) {
        $('#ddlprodunit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlprodunit').css('border-color', 'lightgrey');
    }


    return isValid;
}

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var WoObj = {
        StylerowId: StyRowId,
        StyleId: $('#txtstyleid').val(),
        Orderdate: $('#txtWODate').val(),
        OrderNo: $('#txtorderno').val(),
        BuyerId: $('#txtbuyerid').val(),
        CompanyId: $('#txtCompanyId').val(),
        Remarks: $('#remarks').val(),
        EmployeeID: 5,
        lstprodShipwo: ProShipList,
        lstprodItemwo: ProItemList,
        Quantity: $('#txtquantity').val(),
        ProcessunitId: $('#ddlprocessunit').val(),
        ProdUnitId: $('#ddlprodunit').val(),
        Workorder: $('#workno').val(),
        ProductionQty: $('#prodquantity').val(),
        AllowancePer: $('#prodallowance').val(),
    };
    LoadingSymb();
    $.ajax({
        url: "/WorkOrder/Add",
        data: JSON.stringify(WoObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
           

            if (result.Value == 1) {
                $('#myModal').modal('hide');
                //$('#twobody').DataTable().destroy();
                alert("Record saved successfully...");
                var Id = GBMasId;

                var Mod = 1;
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
                //loadData();


                $('#stylerowid').val("");
                $('#style').val("");
                $('#quantity').val("");
                $('#workprocessunit').val("");
                $('#workorder').val("");
                $('#prodquantity').val("");
                $('#prodallowance').val("");
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


function getbyID(ID) {
    debugger;
    $('#ddlprodunit,#ddlprocessunit,#ddldestination,#ddlitem,#ddlColor,#ddlitemcolor,#ddlsize,#ddlPortLoading').empty();
    var ItemID = ID;
    //Checking Work Order Entry with PlanningMas
    $.ajax({
        url: "/WorkOrder/GetPlanningMasEntry/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            //if (obj == true) {                
            //    //alert("Planning has been made for this Order No...");
            //}
            //else {    
            LoadCompanyUnitDDL("#ddlprodunit,#ddlprocessunit");
            LoadCountryDDL("#ddldestination");
            LoadItemDDL("#ddlitem");
            LoadColorDDL("#ddlColor,#ddlitemcolor");
            LoadSizeDDL("#ddlsize");
            LoadPortOfLoadingDDL("#ddlPortLoading");

            $("btncolorupdate").prop('disabled', true);
            $("btncoloritemupdate").prop('disabled', true);

            $('#stylerowid').css('border-color', 'lightgrey');
            $('#style').css('border-color', 'lightgrey');
            $('#quantity').css('border-color', 'lightgrey');
            debugger;
            $.ajax({
                url: "/WorkOrder/GetWorkOrder/" + ID,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    var obj = result.Value;
                    debugger;
                    $.ajax({
                        url: "/WorkOrder/GetProdShipWorkOrder/" + ID,
                        type: "GET",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        success: function (result) {
                            debugger;
                            ProShipList = result;
                            loadProdShipTable(ProShipList);

                            $.ajax({
                                url: "/WorkOrder/GetProdItemWorkOrder/" + ItemID,
                                type: "GET",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                success: function (result) {
                                    debugger;
                                    ProItemList = result;
                                    var currentrowsel = 0;

                                    //if(ProShipList!=null)
                                    //{
                                    currentrowsel = ProShipList.slice(0);
                                    ShipRowId = currentrowsel[0]["ShiprowID"];

                                    var filteredResult = $.grep(ProItemList, function (element, index) {
                                        return element.ShipRow == ShipRowId;
                                    });

                                    loadProdItemTable(filteredResult);
                                    CalculateTotQuality();
                                    //}

                                }
                            });
                        }
                    });

                    //debugger;
                    //var obj = $.grep(obj, function (element, index) {
                    //    return element.Stylerowid == ShipRowId;
                    //});

                    if (obj != undefined && obj != null) {
                        $('#txtorderno').val(obj[0]["OrderNo"]);
                        $('#txtrefno').val(obj[0]["RefNo"]);
                        $('#prodallowance').val(obj[0]["AllowancePer"]);
                        $('#stylerowid').val(obj[0]["Stylerowid"]);
                        $('#txtstyle').val(obj[0]["Style"]);
                        $('#txtquantity').val(obj[0]["Quantity"]);
                        $('#prodquantity').val(obj[0]["Quantity"]);
                        $('#basicuom').val(obj[0]["Guom"]);
                        $('#basicconvert').val(obj[0]["Conv"]);
                        $('#totitems').val(obj[0]["Conv"]);
                        $('#txtbuyer').val(obj[0]["Buyer"]);
                        $('#txtbuyerid').val(obj[0]["BuyerId"]);
                        $('#txtstyleid').val(obj[0]["StyleId"]);
                        $('#basicquantity').val((obj[0]["Quantity"] * obj[0]["Conv"]));
                        $('#txtCompanyId').val(obj[0]["CompanyId"]);
                        $('#workno').val(obj[0]["WorkOrder"]);
                        $('#ddlprodunit').val(obj[0]["ProcessUnitId"]);
                        $('#ddlprocessunit').val(obj[0]["ProcessUnitId"]);
                        $('#txtWODate').val(moment(obj[0]["Shipmentdate"]).format('DD/MM/YYYY'));

                        var BMasId = obj[0]["BMasId"];

                        GBMasId = BMasId;

                        var WorkNo = $("#workno").val();

                        if (WorkNo == "") {
                            $('#btnUpdate').hide();
                            $('#btnAdd').show();
                            GenerateNumber();

                        } else if (WorkNo != "") {
                            $('#btnUpdate').show();
                            $('#btnAdd').hide();
                        }
                    }


                    $('#myModal').modal('show');
                    //$('#btnUpdate').hide();
                    //$('#btnAdd').show();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
            return false;
            //}
        }
    });

}

function CalculateTotQuality() {
    debugger;
    TotQuantity = 0;
    if (ProItemList != undefined) {
        if (ProItemList.length > 0) {
            for (var j = 0; j < ProItemList.length; j++) {

                TotQuantity = parseInt(TotQuantity) + parseInt(ProItemList[j]["ProdQty"]);
            }
        }
    }

    //  $('#prodquantity').val(TotQuantity);
}


function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/WorkOrder/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
               
                if (result.Value == 1) {
                    $('#twobody').DataTable().destroy();
                    alert("Record Deleted successfully...");
                    var Id = GBMasId;


                    var Mod = 1;
                    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
                    //loadData();
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


function Update() {
    var ischecked = false;
    var res = validate();
    if (res == false) {
        return false;
    }
    var WoObjUpd = {
        StylerowId: StyRowId,
        StyleId: $('#txtstyleid').val(),
        Orderdate: $('#txtWODate').val(),
        OrderNo: $('#txtorderno').val(),
        BuyerId: $('#txtbuyerid').val(),
        CompanyId: $('#txtCompanyId').val(),
        Remarks: $('#remarks').val(),
        EmployeeID: 5,
        lstprodShipwo: ProShipList,
        lstprodItemwo: ProItemList,
        Quantity: $('#txtquantity').val(),
        ProcessunitId: $('#ddlprocessunit').val(),
        ProdUnitId: $('#ddlprodunit').val(),
        Workorder: $('#workno').val(),
        ProductionQty: $('#prodquantity').val(),
        AllowancePer: $('#prodallowance').val(),
    };

    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    //var checkbox_value = "";
    //$(":checkbox").each(function () {
    //    ischecked = $('#Status').is(":checked");
    //    //    if (ischecked) {
    //    //        checkbox_value += "on";
    //    //    }
    //    //    else {
    //    //        checkbox_value += "off";
    //    //    }
    //});

    //var WoObj = {
    //    StylerowId: $('#stylerowid').val(),
    //    Style: $('#style').val(),
    //    Quantity: $('#quantity').val(),
    //    ProcessunitId: $('#workprocessunit').val(),
    //    Workorder: $('#workorder').val(),
    //    ProductionQnty: $('#prodquantity').val(),

    //};
    LoadingSymb();
    $.ajax({
        url: "/WorkOrder/Update",
        data: JSON.stringify(WoObjUpd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
           
            if (result.Value == 1) {
                $('#myModal').modal('hide');
                //$('#twobody').DataTable().destroy();
                alert("Record updated successfully...");
                var Id = GBMasId;

                var Mod = 1;
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
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

function loadProdShipTable(ProShipList) {
    debugger;
    $('#tblprodshipdetails').DataTable().destroy();
    debugger;
    $('#tblprodshipdetails').DataTable({
        data: ProShipList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        select: {
            style: 'single'
        },
        columns: [
            { title: "ID", data: "ShiprowID", "visible": false },
            { title: "BuyerOrderShip", data: "BuyOrdShip", "visible": false },
            { title: "Assort No", data: "Lotno" },
            {
                title: "Ship.Date", data: "ShipDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Destination", data: "Destination" },
            { title: "Port", data: "PortofLoading" },
            { title: "Order Qty", data: "JobQty" },
            //{ title: "Uom", data: "fguom" },
            { title: "Prod Qty[In Pcs]", data: "Qty" },
            {
                title: "Dely.Date", data: "DeliveryDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            //{ title: "Uom", data: "fguom" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnshipedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnshipView btn btn-round btn-info"> <i class="fa fa-eye"></i> </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
               }
        ]
    });
}


function loadProdItemTable(ProItemList) {
    debugger;
    $('#tblitemdetails').DataTable().destroy();

    $('#tblitemdetails').DataTable({
        data: ProItemList,
        columns: [
            { title: "ID", data: "ItemId", "visible": false },
            { title: "BuyOrdShip", data: "BuyOrdShip", "visible": false },
            { title: "Style Row ID", data: "StyleRowId", "visible": false },
            { title: "Ship Row", data: "ShipRow", "visible": false },
            { title: "Order Color", data: "Color" },
            { title: "Item", data: "Item" },
            { title: "Prod.Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Qty", data: "OrderQty" },
            { title: "Allowance", data: "Allowance" },
            { title: "Prod Qty", data: "ProdQty" },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button"data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"  class="btnitemedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
               }
        ]
    });
}

function Close() {
    var Id = GBMasId;
    //window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id;
    var Mod = 1;
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod;
}