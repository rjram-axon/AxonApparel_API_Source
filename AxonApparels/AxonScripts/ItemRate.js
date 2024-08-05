var styletempList = [];
var styledetlist = [];
var Sno = 0;
var Mode = 0;
var RateId = 0;
var BuyId = 0;
var TemplateIdonEditMode = 0;
var MClrid = [];
var MClr = [];
var MSizid = [];
var MSiz = [];
var BuyerId = [];
var BuyerName = '';
var GItemId = [];
var Item = '';
var Type = [];

$(document).ready(function () {
    loadData();
    LoadBuyerDDL('#ddlbuy');
    LoadGarmentItemDDL('#ddlgitm');

    $('#btncoloradd').click(function () {
        debugger;

        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;


        if ($('#ddlbuy').val() == 0) {
            $('#ddlbuy').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlbuy').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#ddlitem').val() == "0") {
            isAllValid = false;
           // $('#ddlitem').siblings('span.error').css('visibility', 'visible');
            $('#ddlitem').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
           // $('#ddlitem').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        //if ($('#ddlsup').val() == "0") {
        //    isAllValid = false;
        //    $('#ddlsup').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#ddlsup').siblings('span.error').css('visibility', 'hidden');
        //}
       
        if ($('#ddlcolor').val() == "0") {
            isAllValid = false;
           // $('#ddlcolor').siblings('span.error').css('visibility', 'visible');
            $('#ddlcolor').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlcolor').siblings('span.error').css('visibility', 'hidden');
            $('#ddlcolor').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlsize').val() == "0") {
            isAllValid = false;
           // $('#ddlsize').siblings('span.error').css('visibility', 'visible');
            $('#ddlsize').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlsize').siblings('span.error').css('visibility', 'hidden');
            $('#ddlsize').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        //if ($('#txtrate').val().trim() == "") {
        //  //  $('#txtrate').css('border-color', 'Red');
        //    $('#txtrate').siblings(".select2-container").css('border', '1px solid red');
        //    isAllValid = false;
        //}
        //else {
        //   // $('#txtrate').css('border-color', 'lightgrey');
        //    $('#txtrate').siblings(".select2-container").css('border', '1px solid lightgrey');
        //}
        //if ($('#txtrate').val().trim() == "") {
        //    $('#txtrate').siblings(".select2-container").css('border', '1px solid red');
        //    isAllValid = false;
        //}
        //else {
        //    $('#txtrate').siblings(".select2-container").css('border', '1px solid lightgrey');
        //}
        if ($('#txtrate').val().trim() == "") {
            $('#txtrate').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#txtrate').css('border-color', 'lightgrey');
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
                        Sno: Sno,
                        RateId: 0,
                        SupplierId: $('#ddlsup').val(),
                        SupplierName: $('#ddlsup option:selected').text(),
                        ItemId: $('#ddlitem').val(),
                        Item: $("#ddlitem option:selected").text(),
                        ColorId: MClrid[t],
                        Color: MClr[t],
                        SizeId: MSizid[s],
                        Size: MSiz[s],                      
                        Rate: $('#txtrate').val(),
                        BuyerId: $('#ddlbuy').val(),
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
         
            $('#txtrate').val('');
        
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

                            if (styledetlist[r].Sno == Sno && Mode == 0) {

                                styledetlist[r].SupplierId = $('#ddlsup').val();
                                styledetlist[r].SupplierName = $("#ddlsup option:selected").text();
                                styledetlist[r].ItemId = $('#ddlitem').val();
                                styledetlist[r].Item = $("#ddlitem option:selected").text();
                                styledetlist[r].ColorId = MClrid[t];
                                styledetlist[r].Color = MClr[t];
                                styledetlist[r].SizeId = MSizid[s];
                                styledetlist[r].Size = MSiz[s];
                             
                                styledetlist[r].Rate = $('#txtrate').val();
                                //styledetlist[r].GColorId = GId;
                                //styledetlist[r].GColor = GClr;
                                //styledetlist[r].GSizeId = GSId;
                                //styledetlist[r].GSize = GSz;
                     
                            }
                            else if (styledetlist[r].RateId == RateId && Mode == 1) {
                                styledetlist[r].SupplierId = $('#ddlsup').val();
                                styledetlist[r].SupplierName = $("#ddlsup option:selected").text();
                                styledetlist[r].ItemId = $('#ddlitem').val();
                                styledetlist[r].Item = $("#ddlitem option:selected").text();
                                styledetlist[r].ColorId = MClrid[t];
                                styledetlist[r].Color = MClr[t];
                                styledetlist[r].SizeId = MSizid[s];
                                styledetlist[r].Size = MSiz[s];
                      
                                styledetlist[r].Rate = $('#txtrate').val();
                                //styledetlist[r].GColorId = GId;
                                //styledetlist[r].GColor = GClr;
                                //styledetlist[r].GSizeId = GSId;
                                //styledetlist[r].GSize = GSz;
                          
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
            $('#txtrate').val('');
            $('#ddlGarcolor').val(0).trigger('change');
         
            $('#btncoloradd').show();
            $('#btncolorupdate').hide();
        }
    });

    $(document).on('click', '.btnColoredit', function () {
        //Mode = 1;
        debugger;
        var table = $('#tblcolordetails').DataTable();
        SupplierId = table.row($(this).parents('tr')).data()["SupplierId"];
        Item1 = table.row($(this).parents('tr')).data()["Item1"];
     
        Sno = table.row($(this).parents('tr')).data()["Sno"];
        BuyId = table.row($(this).parents('tr')).data()["BuyerId"];
        ItemId = table.row($(this).parents('tr')).data()["ItemId"];
        ColorId = table.row($(this).parents('tr')).data()["ColorId"];
        SizeId = table.row($(this).parents('tr')).data()["SizeId"];
        RateId = table.row($(this).parents('tr')).data()["RateId"];
   
        Rate = table.row($(this).parents('tr')).data()["Rate"];
        //GColorId = table.row($(this).parents('tr')).data()["GColorId"];
        //Typeval: table.row($(this).parents('tr')).data()["Typeval"];

        //GSizeId = table.row($(this).parents('tr')).data()["GSizeId"];

        $('#ddlsup').val(SupplierId).trigger('change');
        //$('#ddlbuy ').val(BuyerId).trigger('change');
        //$('#ddlgitm').val(GItemId).trigger('change');
        $('#ddlitem').val(ItemId).trigger('change');
        $('#ddlcolor').val(ColorId).trigger('change');
        $('#ddlsize').val(SizeId).trigger('change');
  
        $('#txtrate').val(Rate);

      
        $('#btncoloradd').hide();
        $('#btncolorupdate').show();
    });

    //function DeleteChild(r) {
    $(document).on('click', '.btnremove', function () {
        debugger;

        if (TemplateIdonEditMode == 0) {
            rowindex = $(this).closest('tr').index();

            var currentrowsel = styledetlist.slice(rowindex);

            Sno = currentrowsel[0]['Sno'];

            styledetlist.splice(rowindex, 1);
            document.getElementById("tblcolordetails").deleteRow(rowindex + 1);
        } else {

            var table = $('#tblcolordetails').DataTable();
            RateId = table.row($(this).parents('tr')).data()["RateId"];

            DeleteIndItem(RateId);
        }
    });
});

function loadData() {
    debugger;

    $.ajax({
        type: "GET",
        url: '/ItemRate/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tblLoad = json.data;
            var dataset = eval("[" + tblLoad + "]");

            styletempList = json;
            LoadMaintab(dataset);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMaintab(maintbllist) {
    debugger;
    var data = [];
    for (var i = 0 ; i < maintbllist.length ; i++) {
        data.push(maintbllist[i]);
    }
    $('#tbody').DataTable({
        data: data,
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
        "bSort": false,
        columns: [
                    { title: "ID", "visible": false },
                    { title: "Buyer" },
                    { title: "Action" },
        ]
    });
}

function Delete(StyleTempID) {
    Mode = 2;
    getbyID(StyleTempID);
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

                if (RateId == 0) {
                    $('#txtrate').val(obj1.rate);
                }

            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
function view(BuyId) {
    Mode = 3;
    getbyID(BuyId);
}
function getbyID(BuyId) {
    debugger;
    if (Mode != 2 && Mode !=3) {
        Mode = 1;
    }
    TemplateIdonEditMode = BuyId;

    LoadSupplierDDL('#ddlsup');
    LoadItemDDL('#ddlitem');
    LoadColorDDL('#ddlcolor,#ddlGarcolor');
    LoadSizeDDL('#ddlsize'); 
    var sno = 0;

    $.ajax({
        url: "/ItemRate/GetRateItemEdit/" + BuyId,
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
                        if (Type[i].Id == res[j].Type) {
                            Typetxt = Type[i].Value;
                            res[j].Type = Typetxt;
                            res[j].Typeval = Type[i].Id;
                        }
                    }
                }
                

                styledetlist = res;
                $('#txttemplate').val(obj[0].Template);
                $('#ddlgitm').val(obj[0].GItemId);
                $('#ddlbuy').val(obj[0].BuyerId);

                loadstyleTemplate(styledetlist);

                $('#btncoloradd').show();
                $('#btncolorupdate').hide();
                          
                $('#txtrate').val('');
      
                $('#myModal').modal('show');
                if (Mode == 1) {
                    $('#btnUpdate').show();
                    $('#btnmainDelete').hide();
                    $('#btnAdd').hide();
                    $("#ddlbuy").prop("disabled", true);
                }
                else if (Mode == 2) {
                    $('#btnmainDelete').show();
                    $('#btnUpdate').hide();
                    $('#btnAdd').hide();
                }
                else if (Mode == 3) {
                    $('#btnUpdate').hide();
                    $('#btnmainDelete').hide();
                    $('#btnAdd').hide();
                }
            } else { }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function getViewbyID(BuyId) {
    debugger;
    if (Mode != 2) {
        Mode = 1;
    }
    TemplateIdonEditMode = BuyId;

    LoadSupplierDDL('#ddlsup');
    LoadItemDDL('#ddlitem');
    LoadColorDDL('#ddlcolor,#ddlGarcolor');
    LoadSizeDDL('#ddlsize');
    var sno = 0;

    $.ajax({
        url: "/ItemRate/GetRateItemEdit/" + BuyId,
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
                        if (Type[i].Id == res[j].Type) {
                            Typetxt = Type[i].Value;
                            res[j].Type = Typetxt;
                            res[j].Typeval = Type[i].Id;
                        }
                    }
                }

                styledetlist = res;
                $('#txttemplate').val(obj[0].Template);
                $('#ddlgitm').val(obj[0].GItemId);
                $('#ddlbuy').val(obj[0].BuyerId);

                loadstyleTemplate(styledetlist);

                $('#btncoloradd').show();
                $('#btncolorupdate').hide();

                $('#txtrate').val('');

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

function btnCloseSubmit() {
    $('#tbody').DataTable().destroy();
    loadData();
    Mode = 0;
}

function clearTextBox() {
    debugger;
    $('#txttemplate').val('');
    $('#ddlbuy ').val(0);
    $('#ddlgitm').val(0);
    $('#ddlitem').val(0);
    $('#ddlsup').val(0);
    $('#ddlcolor').val(0);
  
    $('#txtrate').val('');
  
    $('#txttemplate').focus();
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
    $('#txttemplate').css('border-color', 'lightgrey');
    $('#ddlbuy').siblings('span.error').css('border-color', 'lightgrey');
    $('#ddlgitm').siblings('span.error').css('border-color', 'lightgrey');

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


    //$('#ddlcolor option:eq(' + 0 + ')').remove();
}

function loadstyleTemplate(styletempList) {
    $('#tblcolordetails').DataTable().destroy();
    debugger;
    $("#ddlbuy").prop("disabled", false);
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
            { title: "RowSeq", data: "Sno", "visible": false },
            { title: "RateId", data: "RateId", "visible": false },
            { title: "SupplierId", data: "SupplierId", "visible": false },
            { title: "Supplier Name", data: "SupplierName" },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "Color", data: "Color" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Size", data: "Size" },
            //{ title: "Qty", data: "Qty" },
            { title: "Rate", data: "Rate" },
            //{ title: "ConvertTypeId", data: "ConvertTypeId", "visible": false },
            //{ title: "ConvertType", data: "ConvertTypeName" },
            //{ title: "Typeval", data: "Typeval", "visible": false },
            //{ title: "Type", data: "Type" },
        {
            title: "ACTION", "mDataProp": null,
            "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnColoredit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
        }
        ]
    });
}

function Add() {
    debugger;

    if ($('#ddlbuy').val() == 0) {
        $('#ddlbuy').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlbuy').css('border-color', 'lightgrey');
    }

    if (styledetlist.length == 0) {
        //alert('Item Rate should not be empty...');
        var msg = 'Item Rate should not be empty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    
   
        var StyleTempObj = {
          
            ItemRateDet: styledetlist
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ItemRate/Add",
            data: JSON.stringify(StyleTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    var buyer = $('#ddlbuy').find(":selected").text();
                    AddUserEntryLog('Master', 'Item Rate', 'ADD', buyer);

                    //alert("Record saved successfully...");
                    var msg = 'Record saved successfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    $("#btnAdd").attr("disabled", false);
                    $('#tbody').DataTable().destroy();
                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
                else {
                    //alert("Given Buyer is already available");
                    var msg = 'Given Buyer is already available...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    //alert("Record saved failed...");
                    var msg = 'Record saved failed...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    
}

function Update() {
    debugger;
 
    if ($('#ddlbuy').val() == 0) {
        $('#ddlbuy').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlbuy').css('border-color', 'lightgrey');
    }

    if (styledetlist.length == 0) {
        //alert('Style Template should not be empty...');
        var msg = 'Style Template should not be empty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

  
        var StyleTempObj = {
            ItemRateDet: styledetlist
        };
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ItemRate/Update",
            data: JSON.stringify(StyleTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    var buyer = $('#ddlbuy').find(":selected").text();
                    AddUserEntryLog('Master', 'Item Rate', 'UPDATE', buyer);

                    //alert("Record updated successfully...");
                    var msg = 'Record updated successfully...';
                    var flg = 1;
                    var mode = 0;
                    AlartMessage(msg, flg, mode);
                    $("#btnUpdate").attr("disabled", false);
                    $('#tbody').DataTable().destroy();

                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
                }
                else {
                    //alert("Record updated failed...");
                    var msg = 'Record updated failed...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    
}

function validate() {
    var isValid = true;

    if ($('#txttemplate').val() == '') {
        $('#txttemplate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txttemplate').css('border-color', 'lightgrey');
    }

    return isValid;
}

function StyleDelete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnmainDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ItemRate/Delete",
            data: JSON.stringify({ id: TemplateIdonEditMode }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Status == "SUCCESS") {
                    var buyer = $('#ddlbuy').find(":selected").text();
                    AddUserEntryLog('Master', 'Item Rate', 'DELETE', buyer);

                    //alert("Record Deleted successfully...");
                    var msg = 'Record Deleted successfully...';
                    var flg = 2;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    $("#btnmainDelete").attr("disabled", false);
                    $('#tbody').DataTable().destroy();

                    loadData();
                    $('#myModal').modal('hide');
                    clearTextBox();
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


function DeleteIndItem(RateId) {
    debugger;
    if ($('#ddlbuy').val() == 0) {
        $('#ddlbuy').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlbuy').css('border-color', 'lightgrey');
    }

    var ans = confirm("Are you sure you want to delete this Item?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/ItemRate/DeleteInv",
            data: JSON.stringify({ id: RateId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Status == "SUCCESS") {
                    

                    //alert("Record Deleted successfully...");
                    var msg = 'Record Deleted successfully...';
                    var flg = 2;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    getbyID(TemplateIdonEditMode);
                    //$('#myModal').modal('hide');
                    //clearTextBox();
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
function myGitem(Val) {
    debugger;
    GItemId = [];
    Item1 = [];
    var clr = [];
    var nam = [];
    $('#ddlgitm :selected').each(function (i, selected) {
        if ($(selected).val() != 0) {
            clr[i] = $(selected).val();
            nam[i] = $(selected).text();
            GItemId.push(clr[i]);
            Item1.push(nam[i]);
        }

    });

    GItemId = $.unique(GItemId);
    Item1 = $.unique(Item1);
}
function myBuyer(Val) {
    debugger;
    BuyerId = [];
    BuyerName = [];
    var BID = [];
    var Bnam = [];
    $('#ddlbuy  :selected').each(function (i, selected) {
        if ($(selected).val() != 0) {
            BID[i] = $(selected).val();
            BID[i] = $(selected).text();
            BuyerId.push(BID[i]);
            BuyerName.push(BID[i]);
        }

    });

    BuyerId = $.unique(BuyerId);
    BuyerName = $.unique(BuyerName);
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