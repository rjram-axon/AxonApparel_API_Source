
var BMasId = 0;
var CpyStyle = [];
var StyleType = "N";
var AddStyleid = 0;
var EnbTranDate = 0;
var stylegarList = [];
var styletempList = [];
var styledetlist = [];
var Sno = 0;
var Mode = 0;
var TempDetid = 0;
var TemplateId = [];
var Template = '';
var TemplateIdonEditMode = 0;
var MClrid = [];
var MClr = [];
var MSizid = [];
var MSiz = [];
var BuyerId = [];
var BuyerName = '';
var GItemId = [];
var Item = '';
var type = "Gitm";
var Type = [];
var chkmastempId = 0;
$(document).ready(function () {
    debugger;
    //getstyledetlist();
    //clearTextBox();
    LoadSupplierDDL('#ddlsup');
    LoadItemDDL('#ddlitem');
    LoadColorDDL('#ddlcolor,#ddlGarcolor');
    LoadSizeDDL('#ddlsize');
    LoadGSizeDDL('#ddlGarsize');
    DcurrencyAbs = $("#hdnDCurrencyAbs").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');
    debugger;
    if (EnbTranDate == "Y") {
        $("#txtstyledate").prop("disabled", true);

    } else {
        $("#txtstyledate").prop("disabled", false);

    }

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }

    BMasId = queryvalue[1];
    Mode = queryvalue[3];

    //if (Mode == 0) {
    //    clearTextBox();
    //    loadorderQtyno(BMasId);
    //    var Type = "Gitm";
    //    getTemplateId(Type);       
    //    $('#myModal').modal('show');

    //}
    if (Mode == 0) {
        loadorderQtyno(BMasId);
        var type = "Gitm";
        loadData(type);

    }
    if (Mode == 1) {
        loadorderQtyno(BMasId);
        var type = "Gitm";
        loadData(type);

    }
    if (Mode == 2) {
        loadorderQtyno(BMasId);
        var type = "Gitm";
        loadData(type);

    }

    LoadStyleTemplateDDL('#ddltemp');
    LoadBuyerDDL('#ddlbuy');
    LoadGarmentItemDDL('#ddlgitm');

    $('#btncoloradd').click(function () {
        debugger;



        //Item duplication checking
        var duplicateitem = false;
        for (var i = 0; i < styledetlist.length; i++) {
            //if (ComboMainGrid[i].ItemId == $('#ddlitemvar').val() && ComboMainGrid[i].PlanType == PlanType && ComboMainGrid[i].Apply == ApplyType) {
            //    duplicateitem = true;
            //    alert("Cannot make entries with the same item " + $("#ddlitemvar option:selected").text());
            //}
            if (styledetlist[i].DItemId == $('#ddlitem').val()) {
                duplicateitem = true;
                alert("Cannot make entries with the same item " + $("#ddlitem option:selected").text());
                $('#ddlitem').val('0').trigger('change');
                $('#ddlsup').val('0').trigger('change');
                $('#ddlcolor').val('0').trigger('change');
                $('#ddlsize').val('0').trigger('change');
                $('#txtqty').val('');
                $('#txtrate').val('');
                $('#ddlconver').val('0').trigger('change');
                $('#ddlType').val('0').trigger('change');
              
            }
        }

        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;
        if ($('#ddlitem').val() == "0") {
            isAllValid = false;
            $('#ddlitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
        }
        //if ($('#ddlsup').val() == "0") {
        //    isAllValid = false;
        //    $('#ddlsup').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#ddlsup').siblings('span.error').css('visibility', 'hidden');
        //}
        if ($('#ddlconver').val() == "0") {
            isAllValid = false;
            $('#ddlconver').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlconver').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlType').val() == "0") {
            isAllValid = false;
            $('#ddlType').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlType').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlcolor').val() == "0") {
            isAllValid = false;
            $('#ddlcolor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlsize').val() == "0") {
            isAllValid = false;
            $('#ddlsize').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlsize').siblings('span.error').css('visibility', 'hidden');
        }
        var GId = 0;
        var GClr = '';
        if ($('#ddlGarcolor').val() == "0") {
            GId = 0;
            GClr = '';
        }
        else {
            GId = $('#ddlGarcolor').val(),
            GClr = $("#ddlGarcolor option:selected").text()
        }

        if (isAllValid) {
            debugger;
            for (var t = 0; t < MClrid.length; t++) {
                for (var s = 0; s < MSizid.length; s++) {

                    var max = 0;

                    //jQuery.map(result, function (obj) {
                    jQuery.map(styledetlist, function (obj) {
                        debugger;
                        if (obj.Sno > max)
                            max = obj.Sno;
                    });
                    debugger;
                    if (Sno == 0 && styledetlist.length == 0) {
                        Sno = 1;
                    }
                    else {
                        Sno = max + 1//comboItemList.length+1;
                    }
                    var styletempObj = {
                        DSno: Sno,
                        DTempDetId: $('#ddltemp').val(),
                        DSupplierId: $('#ddlsup').val(),
                        DSupplierName: $('#ddlsup option:selected').text(),
                        DItemId: $('#ddlitem').val(),
                        DItem: $("#ddlitem option:selected").text(),
                        DColorId: MClrid[t],
                        DColor: MClr[t],
                        DSizeId: MSizid[s],
                        DSize: MSiz[s],
                        DGColorId: GId,
                        DGColor: GClr,
                        DTypeval: $('#ddlType').val(),
                        DType: $('#ddlType option:selected').text(),
                        DQty: $('#txtqty').val(),
                        DRate: $('#txtrate').val(),
                        DConvertTypeId: $('#ddlconver').val(),
                        DConvertTypeName: $('#ddlconver option:selected').text(),
                        Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnmainDelete"/>']
                    };

                    styledetlist.push(styletempObj);
                }
            }

            loadstyleTemplate(styledetlist);

            $('#ddlsup').val(0).trigger('change');
            $('#ddlitem').val(0).trigger('change');
            $('#ddlcolor').val(0).trigger('change');
            $('#ddlsize').val(0).trigger('change');
            $('#txtqty').val('');
            $('#txtrate').val('');
            $('#ddlconver').val(0);
            // $('#ddlGarcolor').val(0).trigger('change');;
            $('#ddlType').val(0).trigger('change');
        }
    });

    Type = new Array();
    Type[0] = { Id: "0", Value: "select type" };
    Type[1] = { Id: "GE", Value: "General" };
    Type[2] = { Id: "CO", Value: "Color" };
    Type[3] = { Id: "SZ", Value: "Size" };
    Type[4] = { Id: "CS", Value: "Color/Size" };

    //$(document).on('click', '.btncolorupdate', function () {
    $('#btncolorupdate').click(function () {
        debugger;
        var isAllValid = true;
        var leng = 0;

        debugger;
        if ($('#ddlitem').val() == "0") {
            isAllValid = false;
            $('#ddlitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
        }
        //if ($('#ddlsup').val() == "0") {
        //    isAllValid = false;
        //    $('#ddlsup').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#ddlsup').siblings('span.error').css('visibility', 'hidden');
        //}
        if ($('#ddlconver').val() == "0") {
            isAllValid = false;
            $('#ddlconver').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlconver').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlType').val() == "0") {
            isAllValid = false;
            $('#ddlType').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlType').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlcolor').val() == "0") {
            isAllValid = false;
            $('#ddlcolor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlsize').val() == "0") {
            isAllValid = false;
            $('#ddlsize').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlsize').siblings('span.error').css('visibility', 'hidden');
        }
        //var GId = 0;
        //var GClr = '';
        //if ($('#ddlGarcolor').val() == "0") {
        //    GId = 0;
        //    GClr = '';
        //}
        //else {
        //    GId = $('#ddlGarcolor').val(),
        //    GClr = $("#ddlGarcolor option:selected").text()
        //}

        if (isAllValid) {
            if (MSizid.length == 1) {
                for (var t = 0; t < MClrid.length; t++) {
                    for (var s = 0; s < MSizid.length; s++) {
                        for (var r = 0; r < styledetlist.length; r++) {
                            var GId = 0;
                            var GClr = '';
                            //if ($('#ddlGarcolor').val() == "0") {
                            //    GId = 0;
                            //    GClr = '';
                            //}
                            //else {
                            //    GId = $('#ddlGarcolor').val(),
                            //    GClr = $("#ddlGarcolor option:selected").text()
                            //}


                            //var GSId = 0;
                            //var GSz = '';
                            //if ($('#ddlGarsize').val() == "0") {
                            //    GSId = 0;
                            //    GSz = '';
                            //}
                            //else {
                            //    GSId = $('#ddlGarsize').val(),
                            //    GSz = $("#ddlGarsize option:selected").text()
                            //}
                            //if ($('#ddlitem').val() == "0") {
                            //    ItemId = 0;
                            //    Item = '';

                            //}
                            //else {
                            //    ItemId = $('#ddlitem').val(),
                            //    Item = $("#ddlitem option:selected").text()

                            //}
                            //if ($('#ddlsup').val() == "0") {
                            //    SupplierId = 0;
                            //    SupplierName = '';
                            //}
                            //else {
                            //    SupplierId = $('#ddlsup').val(),
                            //    SupplierName = $("#ddlsup option:selected").text()
                            //}
                            //if ($('#ddlconver').val() == "0") {
                            //    ConvertTypeId = 0;
                            //    ConvertTypeName = '';
                            //}
                            //else {
                            //    ConvertTypeId = $('#ddlconver').val(),
                            //    ConvertTypeName = $("#ddlconver option:selected").text()
                            //}
                            //if ($('#ddlType').val() == "0") {
                            //    ConvertTypeId = 0;
                            //    ConvertTypeName = '';
                            //}
                            //else {
                            //    ConvertTypeId = $('#ddlType').val(),
                            //    ConvertTypeName = $("#ddlType option:selected").text()
                            //}

                            if (styledetlist[r].DSno == Sno && Mode == 0) {

                                styledetlist[r].DSupplierId = $('#ddlsup').val();
                                styledetlist[r].DSupplierName = $("#ddlsup option:selected").text();
                                styledetlist[r].DItemId = $('#ddlitem').val();
                                styledetlist[r].DItem = $("#ddlitem option:selected").text();
                                styledetlist[r].DColorId = MClrid[t];
                                styledetlist[r].DColor = MClr[t];
                                styledetlist[r].DSizeId = MSizid[s];
                                styledetlist[r].DSize = MSiz[s];
                                styledetlist[r].DQty = $('#txtqty').val();
                                styledetlist[r].DRate = $('#txtrate').val();
                                //styledetlist[r].GColorId = GId;
                                //styledetlist[r].GColor = GClr;
                                //styledetlist[r].GSizeId = GSId;
                                //styledetlist[r].GSize = GSz;
                                styledetlist[r].DTypeval = $('#ddlType').val();
                                styledetlist[r].DType = $("#ddlType option:selected").text();
                                styledetlist[r].DConvertTypeId = $('#ddlconver').val();
                                styledetlist[r].DConvertTypeName = $("#ddlconver option:selected").text();
                            }
                            else if (styledetlist[r].DTempDetId == TempDetId && Mode == 1) {
                                styledetlist[r].DSupplierId = $('#ddlsup').val();
                                styledetlist[r].DSupplierName = $("#ddlsup option:selected").text();
                                styledetlist[r].DItemId = $('#ddlitem').val();
                                styledetlist[r].DItem = $("#ddlitem option:selected").text();
                                styledetlist[r].DColorId = MClrid[t];
                                styledetlist[r].DColor = MClr[t];
                                styledetlist[r].DSizeId = MSizid[s];
                                styledetlist[r].DSize = MSiz[s];
                                styledetlist[r].DQty = $('#txtqty').val();
                                styledetlist[r].DRate = $('#txtrate').val();
                                //styledetlist[r].GColorId = GId;
                                //styledetlist[r].GColor = GClr;
                                //styledetlist[r].GSizeId = GSId;
                                //styledetlist[r].GSize = GSz;
                                styledetlist[r].DTypeval = $('#ddlType').val();
                                styledetlist[r].DType = $("#ddlType option:selected").text();
                                styledetlist[r].DConvertTypeId = $('#ddlconver').val();
                                styledetlist[r].DConvertTypeName = $("#ddlconver option:selected").text();
                            }
                        }
                    }
                }
            }
            loadstyleTemplate(styledetlist);
            $('#ddlitem').val(0).trigger('change');
            $('#ddlsup').val(0).trigger('change');
            $('#ddlcolor').val(0).trigger('change');
            $('#ddlsize').val(0).trigger('change');
            $('#txtqty').val('');
            $('#txtrate').val('');
            $('#ddlGarcolor').val(0).trigger('change');
            $('#ddlType').val(0).trigger('change');
            $('#ddlconver').val(1).trigger('change');
            $('#btncoloradd').show();
            $('#btncolorupdate').hide();
        }
    });

    //function DeleteChild(r) {
    $(document).on('click', '.btnremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = styledetlist.slice(rowindex);

        Sno = currentrowsel[0]['DSno'];

        styledetlist.splice(rowindex, 1);
        document.getElementById("tblcolordetails").deleteRow(rowindex + 1);
    });

    $(document).on('click', '.btnColoredit', function () {
        Mode = 1;
        debugger;



        var table = $('#tblcolordetails').DataTable();
        SupplierId = table.row($(this).parents('tr')).data()["DSupplierId"];
        Item = table.row($(this).parents('tr')).data()["DItem"];
        ConvertTypeId = table.row($(this).parents('tr')).data()["DConvertTypeId"];
        Sno = table.row($(this).parents('tr')).data()["DSno"];
        TempDetId = table.row($(this).parents('tr')).data()["DTempDetId"];
        ItemId = table.row($(this).parents('tr')).data()["DItemId"];
        ColorId = table.row($(this).parents('tr')).data()["DColorId"];
        SizeId = table.row($(this).parents('tr')).data()["DSizeId"];
        Qty = table.row($(this).parents('tr')).data()["DQty"];
        Rate = table.row($(this).parents('tr')).data()["DRate"];
        Type: table.row($(this).parents('tr')).data()["DType"];


        

        $('#ddlsup').val(SupplierId).trigger('change');
        $('#ddlitem').val(ItemId).trigger('change');
        $('#ddlcolor').val(ColorId).trigger('change');
        $('#ddlsize').val(SizeId).trigger('change');
        $('#txtqty').val(Qty);
        $('#txtrate').val(Rate);
        $('#ddlType').val(table.row($(this).parents('tr')).data()["DTypeval"]).trigger('change');
        $('#ddlconver').val(ConvertTypeId).trigger('change');
        $('#btncoloradd').hide();
        $('#btncolorupdate').show();

        LoadCheckOrderTempPlanDetails(TempDetId);
    });


});

//function getstyledetlist() {
//    debugger;

//    $.ajax({
//        type: "GET",
//        url: '/StyleTemplate/List/',
//        data: JSON.stringify({}),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;
//            var tblLoad = json.data;
//            var dataset = eval("[" + tblLoad + "]");

//            styletempList = json;


//        },
//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });

//}

function getTemplateIdfromOrdstyleTemp(type) {
    debugger;
    $.ajax({
        url: "/GarmentItem/List",
        data: JSON.stringify({ Type: type, buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data;
            var dataSet = eval("[" + tableload + "]");
            stylegarList = dataSet;
            BuyerId = stylegarList[0][4];
            GItemId = stylegarList[0][5];
            TemplateId = stylegarList[0][6];            
            getbyorderstyleID(TemplateId);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearTextBox() {
    debugger;
    Mod = 0;   
    $('#ddltemp').val(0);
    $('#ddlbuy ').val(0);
    $('#ddlgitm').val(0);
    $('#ddlitem').val(0);
    $('#ddlsup').val(0);
    $('#ddlcolor').val(0);
    $('#ddlType').val(0).trigger('change');
    $('#txtqty').val('');
    $('#txtrate').val('');
    $('#ddlconver').val(1);
    $('#ddlsup').focus();
    $('#btncolorupdate').hide();
    $('#btncoloradd').show();
    Sno = 0;
    Mode = 0;
    TemplateIdonEditMode = 0;
    $('#txtqty').siblings('span.error').css('visibility', 'hidden');
    $('#txtrate').siblings('span.error').css('visibility', 'hidden');
    $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
    $('#ddlsup').siblings('span.error').css('visibility', 'hidden');
    $('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
    $('#ddlconver').siblings('span.error').css('visibility', 'hidden');
    $('#ddlsize').siblings('span.error').css('visibility', 'hidden');
    $('#ddlType').siblings('span.error').css('visibility', 'hidden');
    $('#ddlsup').css('border-color', 'lightgrey');
    $('#ddlbuy').css('border-color', 'lightgrey');
    $('#ddlgitm').css('border-color', 'lightgrey');

    LoadItemDDL('#ddlitem');
    LoadSupplierDDL('#ddlsup');
    LoadColorDDL('#ddlcolor,#ddlGarcolor');
    LoadSizeDDL('#ddlsize');
    LoadGSizeDDL('#ddlGarsize');   

    var tablestyletemp = $('#tblcolordetails').DataTable();
    tablestyletemp.clear().draw();

    styledetlist = [];
    loadstyleTemplate(styledetlist);

    $('#btnUpdate').hide();
    $('#btnmainDelete').hide();
    $('#btnAdd').show();

    //$("select#ddlcolor option[value='0']").remove();
    $("#ddlcolor").find('option[value=' + 0 + ']').remove();

}
function validate() {
    var isValid = true;
    if ($('#ddltemp').val() == 0) {

        isValid = false;
    }
    else {
        $('#ddltemp').css('border-color', 'lightgrey');
    }
    return isValid;
}

function getTemplateId(type,tempid) {
    debugger;
    $.ajax({
        url: "/GarmentItem/List",
        data: JSON.stringify({ Type: type, buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data;
            var dataSet = eval("[" + tableload + "]");
            stylegarList = dataSet;
            BuyerId = stylegarList[0][4];
            GItemId = stylegarList[0][5];
            TemplateId = stylegarList[0][6];
            getbyID(tempid);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadstyleTemplate(styletempList) {
    $('#tblcolordetails').DataTable().destroy();
    debugger;
    
    $('#tblcolordetails').DataTable({
        data: styletempList,
        scrollY: 230,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "RowSeq", data: "DSno", "visible": false },
            { title: "DetId", data: "DTempDetId", "visible": false },
            { title: "SupplierId", data: "DSupplierId", "visible": false },
            { title: "SupplierName", data: "DSupplierName" },
            { title: "ItemId", data: "DItemId", "visible": false },
            { title: "Item", data: "DItem" },
            { title: "ColorId", data: "DColorId", "visible": false },
            { title: "Color", data: "DColor" },
            { title: "SizeId", data: "DSizeId", "visible": false },
            { title: "Size", data: "DSize" },
            { title: "Qty", data: "DQty" },
            { title: "Rate", data: "DRate" },
            { title: "ConvertTypeId", data: "DConvertTypeId", "visible": false },
            { title: "ConvertType", data: "DConvertTypeName" },
            { title: "Typeval", data: "DTypeval", "visible": false },
            { title: "Type", data: "DType" },
        {
            title: "ACTION", "mDataProp": null,
            "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnColoredit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
        }
        ]
    });
}

function getbyGarAddID(TemplateId) {
    debugger;
    chkmastempId = TemplateId;
    Mode = 0;
    clearTextBox();
    loadorderQtyno(BMasId);
    var type = "Gitm";
    getTemplateId(type, chkmastempId);
    $('#myModal').modal('show');

}
function getbyGarEditID(TemplateId) {
    // clearTextBox();
    chkmastempId = TemplateId;
    loadorderQtyno(BMasId);
    var type = "Gitm";
    getTemplateIdfromOrdstyleTemp(type);
    $('#myModal').modal('show');

}
function getbyGarDeleteID(TemplateId) {
    debugger;
    //loadorderQtyno(BMasId);
    //var type = "Gitm";
    //getTemplateIdfromOrdstyleTemp(type);
    //$('#myModal').modal('show');
    //$('#btnUpdate').hide();
    //$('#btnmainDelete').show();
    //$('#btnAdd').hide();
    StyleDelete(TemplateId);
}
function loadorderQtyno(BMasId) {
    debugger;
    $.ajax({
        url: "/GarmentItem/GetGarmentOrderNo",
        data: JSON.stringify({ buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            var obj = result.Value;
            if (obj.length > 0) {
                var Ord_No = obj[0]["order_no"];


            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function getbyorderstyleID(TemplateId) {
    debugger;
    Mode = 1;
    if (Mode == 1) {
        LoadOrderStyleTemplateDDL('#ddltemp');
    }
    var sno = 0;
    id = TemplateId;
    $.ajax({
        url: "/GarmentItem/GetOrderStyleTemp/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (result.Status == 'SUCCESS') {

                var res = [];
                res = obj;
                var Typetxt = '';
                for (i = 0; i < Type.length; i++) {
                    for (j = 0; j < res.length; j++) {
                        if (Type[i].Id == res[j].DTypeval) {
                            Typetxt = Type[i].Value;
                            res[j].DType = Typetxt;
                            res[j].DTypeval = Type[i].Id;
                        }
                    }
                }
               
                styledetlist = res;               
                $('#ddltemp').val(obj[0].DTemplateId).trigger('change');             
                $('#txttemplatename').val(obj[0].DTemplate);
                $('#txttemplateid').val(obj[0].DTemplateId);
                $('#ddlgitm').val(obj[0].DGItemId).trigger('change');
                $('#ddlbuy').val(obj[0].DBuyerId).trigger('change');
                loadstyleTemplate(styledetlist);

                $('#btncoloradd').show();
                $('#txttemplatename').show();
                $('#btncolorupdate').hide();
                $('#ddltemp').hide();

                $('#ddlType').val(0).trigger('change');
                $('#ddlType').siblings('span.error').css('visibility', 'hidden');
                $('#txtqty').val('');
                $('#txtrate').val('');
                $('#ddlconver').val(1);
                $('#myModal').modal('show');
                if (Mode == 1) {
                    $('#btnUpdate').show();
                    $('#btnmainDelete').hide();
                    $('#btnAdd').hide();
                }
                else if (Mode == 2) {
                    $('#btnmainDelete').show();
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                }
            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
function getbyItemID(ItemId) {
    debugger;


    $.ajax({
        url: "/Item/GetbyID/" + ItemId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj1 = result.Value;
            debugger;
            if (result.Status == 'SUCCESS') {
                $('#txtrate').val(obj1.rate);

            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function btnCloseSubmit() {
    $('#tbody').DataTable().destroy();

}
function ConvertType(Val) {
    debugger;
    ConvertTypeId = [];
    ConvertTypeName = [];
    var TypeId = [];
    var Type = [];
    $('#ddlConvertType :selected').each(function (i, selected) {
        if ($(selected).val() != 0) {
            TypeId[i] = $(selected).val();
            Type[i] = $(selected).text();
            ConvertTypeId.push(TypeId[i]);
            ConvertTypeName.push(Type[i]);
        }

    });

    ConvertTypeId = $.unique(ConvertTypeId);
    ConvertTypeName = $.unique(ConvertTypeName);
}
function Add() {
    debugger;



    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

    var BuyerId = 0;
    var BuyerName = '';
    if ($('#ddlbuy').val() == "0") {
        BuyerId = 0;
        BuyerName = '';
    }
    else {
        BuyerId = $('#ddlbuy').val(),
        BuyerName = $("#ddlbuy option:selected").text()
    }

    var GItemId = 0;
    var Item = '';
    if ($('#ddlgitm').val() == "0") {
        GItemId = 0;
        Item = '';
    }
    else {
        GItemId = $('#ddlgitm').val(),
        Item = $("#ddlgitm option:selected").text()
    }


    if (styledetlist.length == 0) {
        alert('Style Template should not be empty...');
        return true;
    }

    var TemplateId = $("#ddltemp option:selected").val()
    var Template = $("#ddltemp option:selected").text();
    var BuyerId = $("#ddlbuy option:selected").val();
    var buyer = $("#ddlbuy option:selected").text();
    var GItemId = $("#ddlgitm option:selected").val();
    var item = $("#ddlgitm option:selected").text();
    var styleid = stylegarList[0][0];
    var order_no = stylegarList[0][1];
    var style = stylegarList[0][2];
    var BmasId = BMasId;
    if (isAllValid) {
        var StyleTempObj = {
            TemplateId: TemplateId,
            Ord_MasId: BmasId,
            Order_No: order_no,          
            style_ID: styleid,
            Style: style,
            GItemId: GItemId,
            GItem: item,           
            BuyerId: BuyerId,
            Buyer: buyer,
            Template: Template,           
            ordStyleTempDet: styledetlist
        };
        LoadingSymb();
        debugger;
        $.ajax({
            url: "/GarmentItem/Add",
            data: JSON.stringify(StyleTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Record saved successfully...");
                    $('#tbody').DataTable().destroy();
                    $('#myModal').modal('hide');
                    AddUserEntryLog('SalesManagement', 'TRIMS Template', 'ADD', order_no);
                    window.location.href = "/BulkOrder/BulkOrderIndex";
                    //clearTextBox();             
                }
                else {
                    alert("Record saved failed...");
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function mySize(Val) {
    MSizid = [];
    MSiz = [];
    var Siz = [];
    var nam = [];
    $('#ddlsize :selected').each(function (i, selected) {
        if ($(selected).val() != 0) {
            Siz[i] = $(selected).val();
            nam[i] = $(selected).text();
            MSizid.push(Siz[i]);
            MSiz.push(nam[i]);
        }

    });

    MSizid = $.unique(MSizid);
    MSiz = $.unique(MSiz);
}
function myColor(Val) {
    debugger;
    MClrid = [];
    MClr = [];
    var clr = [];
    var nam = [];
    $('#ddlcolor :selected').each(function (i, selected) {
        if ($(selected).val() != 0) {
            clr[i] = $(selected).val();
            nam[i] = $(selected).text();
            MClrid.push(clr[i]);
            MClr.push(nam[i]);
        }

    });

    MClrid = $.unique(MClrid);
    MClr = $.unique(MClr);
}


function getbyID(TemplateId) {
    debugger;
    mode = 0;
    TemplateIdonEditMode = TemplateId;

    LoadSupplierDDL('#ddlsup');
    LoadItemDDL('#ddlitem');
    LoadColorDDL('#ddlcolor,#ddlGarcolor');
    LoadSizeDDL('#ddlsize');
    LoadGSizeDDL('#ddlGarsize');
    var sno = 0;

    $.ajax({
        url: "/GarmentItem/GetStyleTemp/" + TemplateId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (result.Status == 'SUCCESS') {

                var res = [];
                res = obj;
                var Typetxt = '';
                for (i = 0; i < Type.length; i++) {
                    for (j = 0; j < res.length; j++) {
                        if (Type[i].Id == res[j].DTypeval) {
                            Typetxt = Type[i].Value;
                            res[j].DType = Typetxt;
                            res[j].DTypeval = Type[i].Id;
                        }
                    }
                }

                styledetlist = res;
                $('#ddltemp').val(obj[0].DTemplateId).trigger('change');
                $('#ddlgitm').val(obj[0].DGItemId).trigger('change');
                $('#ddlbuy').val(obj[0].DBuyerId).trigger('change');
                loadstyleTemplate(styledetlist);

                $('#btncoloradd').show();
                $('#btncolorupdate').hide();

                $('#ddlType').val(0).trigger('change');
                $('#ddlType').siblings('span.error').css('visibility', 'hidden');
                $('#txtqty').val('');
                $('#txtrate').val('');
                $('#ddlconver').val(1);
                $('#myModal').modal('show');
                if (Mode == 1) {
                    $('#btnUpdate').show();
                    $('#btnmainDelete').hide();
                    $('#btnAdd').hide();
                }
                else if (Mode == 2) {
                    $('#btnmainDelete').show();
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                }
            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function Editgarment(TemplateId) {
    debugger;
    mode = 1;
    debugger;
    mode = 0;
    TemplateIdonEditMode = TemplateId;

    LoadSupplierDDL('#ddlsup');
    LoadItemDDL('#ddlitem');
    LoadColorDDL('#ddlcolor,#ddlGarcolor');
    LoadSizeDDL('#ddlsize');
    LoadGSizeDDL('#ddlGarsize');
    var sno = 0;

    $.ajax({
        url: "/GarmentItem/GetStyleTemp/" + TemplateId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (result.Status == 'SUCCESS') {

                var res = [];
                res = obj;
                var Typetxt = '';
                for (i = 0; i < Type.length; i++) {
                    for (j = 0; j < res.length; j++) {
                        if (Type[i].Id == res[j].DTypeval) {
                            Typetxt = Type[i].Value;
                            res[j].DType = Typetxt;
                            res[j].DTypeval = Type[i].Id;
                        }
                    }
                }

                styledetlist = res;
                $('#ddltemp').val(obj[0].DTemplateId);
                $('#ddlgitm').val(obj[0].DGItemId);
                $('#ddlbuy').val(obj[0].DBuyerId);
                loadstyleTemplate(styledetlist);

                $('#btncoloradd').show();
                $('#btncolorupdate').hide();

                $('#ddlType').val(0).trigger('change');
                $('#ddlType').siblings('span.error').css('visibility', 'hidden');
                $('#txtqty').val('');
                $('#txtrate').val('');
                $('#ddlconver').val(1);
                $('#myModal').modal('show');
                if (Mode == 1) {
                    $('#btnUpdate').show();
                    $('#btnmainDelete').hide();
                    $('#btnAdd').hide();
                }
                else if (Mode == 2) {
                    $('#btnmainDelete').show();
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                }
            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Update() {
    debugger;

    var TemplateId = $("#ddltemp option:selected").val()
    var Template = $("#ddltemp option:selected").text();
    var BuyerId = $("#ddlbuy option:selected").val();
    var buyer = $("#ddlbuy option:selected").text();
    var GItemId = $("#ddlgitm option:selected").val();
    var item = $("#ddlgitm option:selected").text();
    var styleid = stylegarList[0][0];
    var order_no = stylegarList[0][1];
    var style = stylegarList[0][2];
    var BmasId = BMasId;
    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

    if (styledetlist.length == 0) {
        alert('Style Template should not be empty...');
        return true;
    }
   
    if (isAllValid) {
        var StyleTempObj = {
            TemplateId: TemplateId,
            Ord_MasId: BmasId,
            Order_No: order_no,          
            style_ID: styleid,
            Style: style,
            GItemId: GItemId,
            GItem: item,           
            BuyerId: BuyerId,
            Buyer: buyer,
            Template: Template,           
            ordStyleTempDet: styledetlist
        };    
        LoadingSymb();
        $.ajax({
            url: "/GarmentItem/Update",
            data: JSON.stringify(StyleTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Record updated successfully...");
                    $('#tbody').DataTable().destroy();

                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                    AddUserEntryLog('SalesManagement', 'TRIMS Template', 'UPDATE', order_no);
                }
                else {
                    alert("Record updated failed...");
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function StyleDelete(TemplateId) {
    debugger;
    var type = "Gitm";
    getTemplateIdfromOrdstyleTemp(type);
    var order_no = stylegarList[0][1];
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/GarmentItem/Delete",
            data: JSON.stringify({ id: TemplateId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Status == "SUCCESS") {
                    alert("Record Deleted successfully...");
                    $('#tbody').DataTable().destroy();
                    $('#tblmain').DataTable().destroy();
                    loadData(type);
                    $('#myModal').modal('hide');
                    AddUserEntryLog('SalesManagement', 'TRIMS Template', 'DELETE', order_no);
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
//Load Data function
function loadData(type) {
   
    debugger;
    $.ajax({
        url: "/GarmentItem/List",
        data: JSON.stringify({ type: type, buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data;
            var dataSet = eval("[" + tableload + "]");
            stylegarList = dataSet;
            BuyerId = stylegarList[0][4];
            GItemId = stylegarList[0][5];
            TemplateId = stylegarList[0][6];
            debugger;

            $('#tblmain').DataTable({
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
                         { title: "Styleid", "visible": false },
                         { title: "Order No" },
                         { title: "Style" },
                         { title: "GarmentItem" },
                         { title: "Buyerid", "visible": false },
                         { title: "GItemId", "visible": false },
                         { title: "TemplateId", "visible": false },
                         { title: "Buyer", "visible": false },
                         { title: "Action" }
                ]


            });
            $(document).ready(function () {
                var table = $('#tblmain').DataTable();

                $('#tblmain tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function LoadCheckOrderTempPlanDetails(tempdetid) {


    var tempid = chkmastempId;

    $.ajax({
        url: "/GarmentItem/CheckPlanOrdTempDetails",
        data: JSON.stringify({ id: tempid, detid: tempdetid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                var COrdTemp = obj[0]["CheckOrdTemp"];
              

                if (COrdTemp > 0) {

                    alert("Trims Planning has been made for this Item,Please Check it....")
                    $('#ddlsup').val(0).trigger('change');
                    $('#ddlitem').val(0).trigger('change');
                    $('#ddlcolor').val(0).trigger('change');
                    $('#ddlsize').val(0).trigger('change');
                    $('#txtqty').val('');
                    $('#txtrate').val('');
                    $('#ddlType').val('').trigger('change');
                    $('#ddlconver').val(0).trigger('change');
                    return true;
                }
                else {
                    $("#Update").attr('disabled', true);
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