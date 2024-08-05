
var BMasId = 0;
//var CpyStyle = [];
//var StyleType = "N";
//var AddStyleid = 0;
//var EnbTranDate = 0;
var stylegarList = [];
var styletempList = [];
var processdetlist = [];
var itemdetlist = [];
var Sno = 0;
var Mode = 0;
var TempDetid = 0;
var TemplateId = [];
var Template = '';
var TemplateIdonEditMode = 0;
//var MClrid = [];
//var MClr = [];
//var MSizid = [];
//var MSiz = [];
var BuyerId = [];
var BuyerName = '';
var GItemId = [];
var Item = '';
var type = "oid";
var Type = [];
var Stylerowid = 0;
var chkmastempId = 0;
var processid = 0;
var itemgroupid = 0;
var itemid = 0;
var itmeditflg = 0;
var ordconsmasid = 0;
var garmitmid = 0;
var processedit = 0;
var oldPloss = '';
var Gitem_Id = 0;
var ordno = '';
$(document).ready(function () {
    debugger;
    superuser = $("#hdnusername").data('value');
    LoadProcessDDL('#ddlprocess');
  //  LoadItemGroupDDL('#ddlitemgroup');
    LoadItemDDL('#ddlitem');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    BMasId = queryvalue[1];
    Mode = queryvalue[3];

   
    if (Mode == 0) {
        //loadorderQtyno(BMasId);
        var type = "oid";
        loadData(type);

    }
    if (Mode == 1) {
        //loadorderQtyno(BMasId);
        var type = "oid";
        loadData(type);

    }
    if (Mode == 2) {
        //loadorderQtyno(BMasId);
        var type = "oid";
        loadData(type);
         $('#btnmainDelete').show();
         $('#btnUpdate').hide();
         $('#btnAdd').hide();
        
    }


    $('#btnprocessadd').click(function () {
        debugger;
        //Item duplication checking
        var duplicateitem = false;     
        for (var i = 0; i < processdetlist.length; i++) {
          
            if (processdetlist[i].ordconsprocessid == $('#ddlprocess').val()) {
                duplicateitem = true;
                alert("Cannot make entries with the same item " + $("#ddlprocess option:selected").text());
                $('#ddlprocess').val('0').trigger('change');             
                $('#txtloss').val('');               
            }
            else if (oldPloss > $('#txtloss').val() && superuser.toUpperCase() != "SUPERUSER") {
                duplicateitem = true;
                alert("cannot increase Process Loss");
                oldPloss = 0;
                $('#ddlprocess').val('0').trigger('change');
                $('#txtloss').val('');
            }
        }
        if (processdetlist.length == 0) {
        if (oldPloss > $('#txtloss').val() && superuser.toUpperCase() != "SUPERUSER") {
            duplicateitem = true;
            alert("cannot increase Process Loss");
            oldPloss = 0;
            $('#ddlprocess').val('0').trigger('change');
            $('#txtloss').val('');
        }
        }
        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;
        if (!duplicateitem) {
        if ($('#ddlprocess').val() == "0") {
            isAllValid = false;
            $('#ddlprocess').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlprocess').siblings('span.error').css('visibility', 'hidden');
        }
      

        if (isAllValid) {
            debugger;
           
            var styletempObj = {
                DSno: Sno,
                ordconsprocessmasid:0,
                ordconsprocessid : $('#ddlprocess').val(),
                Process: $("#ddlprocess option:selected").text(),
                ordconsprocessloss: $('#txtloss').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnmainDelete"/>']
            };

            processdetlist.push(styletempObj);

            loadProcesstbl(processdetlist);

            $('#ddlprocess').val(0).trigger('change');           
            $('#txtloss').val('');
        }
    }
    });
    $('#btnprocessupdate').click(function () {
        debugger;
        var isAllValid = true;
        var leng = 0;
        var duplicateitem = false;
        for (var i = 0; i < processdetlist.length; i++) {

            if (processdetlist[i].ordconsprocessid == $('#ddlprocess').val() && processdetlist[i].ordconsprocessloss == $('#txtloss').val()) {
                duplicateitem = true;
                alert("Cannot make entries with the same item " + $("#ddlprocess option:selected").text());
                $('#ddlprocess').val('0').trigger('change');
                $('#txtloss').val('');
                $('#btnprocessadd').show();
                $('#btnprocessupdate').hide();
            }
            else if (oldPloss > $('#txtloss').val() && superuser.toUpperCase() != "SUPERUSER") {
                duplicateitem = true;
                alert("cannot increase Process Loss");
                oldPloss = 0;
                $('#ddlprocess').val('0').trigger('change');
                $('#txtloss').val('');
                $('#btnprocessadd').show();
                $('#btnprocessupdate').hide();
            }
          
        }
       
        if (!duplicateitem) {
            if ($('#ddlprocess').val() == "0") {
                isAllValid = false;
                $('#ddlprocess').siblings('span.error').css('visibility', 'visible');
            }
            else {
                $('#ddlprocess').siblings('span.error').css('visibility', 'hidden');
            }
            if ($('#txtloss').val().trim() == "") {
                $('#txtloss').css('border-color', 'Red');
                isValid = false;
            }
            else {
                $('#txtloss').css('border-color', 'lightgrey');
            }
            if (isAllValid) {

                for (var r = 0; r < processdetlist.length; r++) {

                    if (processdetlist[r].ordconsprocessid == ordconsprocessid && Mode == 0) {

                        processdetlist[r].ordconsprocessid = $('#ddlprocess').val();
                        processdetlist[r].Process = $("#ddlprocess option:selected").text();
                        processdetlist[r].ordconsprocessloss = $('#txtloss').val();
                    }
                    else if (processdetlist[r].ordconsprocessid == ordconsprocessid && Mode == 1) {
                        processdetlist[r].ordconsprocessid = $('#ddlprocess').val();
                        processdetlist[r].Process = $("#ddlprocess option:selected").text();
                        processdetlist[r].ordconsprocessloss = $('#txtloss').val();
                    }
                }
                loadProcesstbl(processdetlist);
                $('#ddlprocess').val(0).trigger('change');
                $('#txtloss').val('');
                $('#btnprocessadd').show();
                $('#btnprocessupdate').hide();
            }
        }
    });

    //function DeleteChild(r) {
    $(document).on('click', '.btnprocessremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = processdetlist.slice(rowindex);

        ordconsprocessid = currentrowsel[0].ordconsprocessid;

        processdetlist.splice(rowindex, 1);
        document.getElementById("tblprocessdetails").deleteRow(rowindex + 1);
    });

    $(document).on('click', '.btnProcessedit', function () {
        Mode = 1;
        processedit = 1;
        debugger;
        var table = $('#tblprocessdetails').DataTable();
        ordconsprocessid = table.row($(this).parents('tr')).data()["ordconsprocessid"];
        Process = table.row($(this).parents('tr')).data()["Process"];
        PLoss = table.row($(this).parents('tr')).data()["ordconsprocessloss"];
        processid = ordconsprocessid;

        $('#ddlprocess').val(ordconsprocessid).trigger('change');
        $('#txtloss').val(PLoss);
        oldPloss = PLoss;
        $('#btnprocessadd').hide();
        $('#btnprocessupdate').show();

        //LoadCheckOrderTempPlanDetails(TempDetId);
    });

    $('#btnitemadd').click(function () {
        debugger;
        //Item duplication checking
        var duplicateitem = false;
        for (var i = 0; i < itemdetlist.length; i++) {

            if (itemdetlist[i].ordconsitemid == $('#ddlitem').val()) {
                duplicateitem = true;
                alert("Cannot make entries with the same item " + $("#ddlitem option:selected").text());
                $('#ddlitemgroup').val('0').trigger('change'); 
                $('#ddlitem').val('0').trigger('change');
            }
        }

        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;
        if ($('#ddlitemgroup').val() == "0") {
            isAllValid = false;
            $('#ddlitemgroup').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitemgroup').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlitem').val() == "0") {
            isAllValid = false;
            $('#ddlitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
        }

        if (isAllValid) {
            debugger;

            var itempObj = {
                ordconsyarnfabmasid:0,
                ItemGroupId: $('#ddlitemgroup').val(),
                ordconsitemtype : $("#ddlitemgroup option:selected").text(),
                ordconsitemid : $('#ddlitem').val(),
                Item: $("#ddlitem option:selected").text(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnmainDelete"/>']
            };

            itemdetlist.push(itempObj);

            loaditemtbl(itemdetlist);

            $('#ddlitemgroup').val(0).trigger('change');
            $('#ddlitem').val(0).trigger('change');
        }
    });
    $('#btnitemupdate').click(function () {
        debugger;
        var isAllValid = true;
        var leng = 0;
        var duplicateitem = false;
        for (var i = 0; i < itemdetlist.length; i++) {

            if (itemdetlist[i].ordconsitemid == $('#ddlitem').val()) {
                duplicateitem = true;
                alert("Cannot make entries with the same item " + $("#ddlitem option:selected").text());
                $('#ddlitemgroup').val('0').trigger('change');
                $('#ddlitem').val('0').trigger('change');
                $('#btnitemadd').show();
                $('#btnitemupdate').hide();
            }
        }
        debugger;
        if ($('#ddlitemgroup').val() == "0") {
            isAllValid = false;
            $('#ddlitemgroup').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitemgroup').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#ddlitem').val() == "0") {
            isAllValid = false;
            $('#ddlitem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
        }
        if (isAllValid) {

            for (var r = 0; r < itemdetlist.length; r++) {

                if ( Mode == 0) {

                    itemdetlist[r].ordconsitemtype = $('#ddlitemgroup').val();
                    itemdetlist[r].ordconsitemtype = $("#ddlitemgroup option:selected").text();
                    itemdetlist[r].ordconsitemid = $('#ddlitem').val();
                    itemdetlist[r].Item = $("#ddlitem option:selected").text();
                }
                else if ( Mode == 1) {
                    itemdetlist[r].ordconsitemtype = $('#ddlitemgroup').val();
                    itemdetlist[r].ordconsitemtype = $("#ddlitemgroup option:selected").text();
                    itemdetlist[r].ordconsitemid = $('#ddlitem').val();
                    itemdetlist[r].Item = $("#ddlitem option:selected").text();
                }
            }
            loaditemtbl(itemdetlist);
            $('#ddlitemgroup').val(0).trigger('change');
            $('#ddlitem').val(0).trigger('change');
            $('#btnitemadd').show();
            $('#btnitemupdate').hide();
        }
    });

    //function DeleteChild(r) {
    $(document).on('click', '.btnitemremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = itemdetlist.slice(rowindex);

        ordconsitemid = currentrowsel[0].ordconsitemid;

        itemdetlist.splice(rowindex, 1);
        document.getElementById("tblitemdetails").deleteRow(rowindex + 1);
    });

    $(document).on('click', '.btnItemedit', function () {
        Mode = 1;
        debugger;
        var table = $('#tblitemdetails').DataTable();
        ItemGroupId = table.row($(this).parents('tr')).data()["ItemGroupId"];
        ItemGroup = table.row($(this).parents('tr')).data()["ordconsitemtype"];
        ItemId = table.row($(this).parents('tr')).data()["ordconsitemid"];
        Item = table.row($(this).parents('tr')).data()["Item"];
        itemgroupid = ItemGroupId;
        itemid = ItemId;
        //LoadItemDDL('#ddlitem');
        $('#ddlitemgroup').val(ItemGroup).trigger('change');
        itemid = ItemId;
        itmeditflg = 1;
        //LoadItembyitmgrp();
        $('#btnitemadd').hide();
        $('#btnitemupdate').show();

        //LoadCheckOrderTempPlanDetails(TempDetId);
    });


    $("#ddlitemgroup").change(function () {
        debugger;
        LoadItembyitmgrp();
    });
    $("#ddlprocess").change(function () {
        debugger;
        if ($('#ddlprocess').val() != 0) {
            if (processedit != 1) {
                LoadProcessLoss();
            }
        }
        processedit = 0;
    });

});
function LoadItembyitmgrp() {
    debugger;
    var itemgrpid = $('#ddlitemgroup').val();
    $.ajax({
        url: "/Item/GetItembygrpid",
        data: JSON.stringify({ Itemgrpid: itemgrpid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            var Type = [];
            result.push(Type);
            if (result.length > 0) {
                //var data = result.Value;
                $(ddlitem).empty();
                $(ddlitem).append($('<option/>').val('0').text('--Select Item--'));
                $.each(result, function () {        
                    $(ddlitem).append($('<option></option>').val(this.Itemid).text(this.ItemName));
                });
                // $('#ddlitem').val(Itemid);
                debugger;
                if (itmeditflg==1) {
                    $('#ddlitem').val(itemid).trigger('change');
                    itemid = 0;
            }
            }
        }
    });
}

function LoadProcessLoss() {
    debugger;
    var selctprocessid = $('#ddlprocess').val();
    $.ajax({
        url: "/Process/GetbyID",
        data: JSON.stringify({ ID: selctprocessid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtloss').val(obj.ProcessLoss);
                oldPloss = obj.ProcessLoss;
            }
            else {
                alert("Loss load failed...");
            }
        }
    });
}



function LoadItem() {
    debugger;
    $.ajax({
        url: "/Item/GetItem",
        data: JSON.stringify({}),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                $(ddlitem).empty();
                $(ddlitem).append($('<option/>').val('0').text('--Select Item--'));
                $.each(data, function () {
                    $(ddlitem).append($('<option></option>').val(this.Itemid).text(this.ItemName));
                });
                //$('#ddlitem').val(Itemid);
                $('#ddlitem').val(itemid).trigger('change');
            }
        }
    });
}

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

//function getTemplateIdfromOrdstyleTemp(type) {
//    debugger;
//    $.ajax({
//        url: "/OrderItemDetails/List",
//        data: JSON.stringify({ Type: type, buyormasid: BMasId }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;
//            var tableload = json.data;
//            var dataSet = eval("[" + tableload + "]");
//            stylegarList = dataSet;
//            BuyerId = stylegarList[0][4];
//            GItemId = stylegarList[0][5];
//            TemplateId = stylegarList[0][6];
//            getbyorderstyleID(TemplateId);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}
function clearTextBox() {
    debugger;
    Mod = 0;
    $('#ddlprocess').val(0);
    $('#txtloss').val('');
    $('#txtavggarm').val('');
    $('#ddlitemgroup').val(0);
    $('#ddlitem').val(0);
    $('#btnprocessupdate').hide();
    $('#btnprocessadd').show();
    $('#btnitemupdate').hide();
    $('#btnitemadd').show();
    Sno = 0;
    Mode = 0;
    TemplateIdonEditMode = 0;
    $('#txtloss').siblings('span.error').css('visibility', 'hidden');
  
    $('#ddlprocess').siblings('span.error').css('visibility', 'hidden');
    LoadProcessDDL('#ddlprocess');
   
    $('#ddlitemgroup').siblings('span.error').css('visibility', 'hidden');
    //LoadItemGroupDDL('#ddlitemgroup');
    $('#ddlitem').siblings('span.error').css('visibility', 'hidden');
    LoadItemDDL('#ddlitem');
    var tableprocess = $('#tblprocessdetails').DataTable();
    tableprocess.clear().draw();

    processdetlist = [];
    loadProcesstbl(processdetlist);

    var tableitem = $('#tblitemdetails').DataTable();
    tableitem.clear().draw();

    itemdetlist = [];
    loaditemtbl(itemdetlist);

    $('#btnUpdate').hide();
    $('#btnmainDelete').hide();
    $('#btnAdd').show();
}
function validate() {
    var isValid = true;
    if ($('#txtavggarm').val() == '') {

        isValid = false;
        $('#txtavggarm').css('border-color', 'red');
    }
    else {
        $('#txtavggarm').css('border-color', 'lightgrey');
    }
    if (itemdetlist.length == 0) {

        isValid = false;
        
    }
    if (processdetlist.length == 0) {

        isValid = false;

    }
    return isValid;
}

//function getTemplateId(type) {
//    debugger;
//    $.ajax({
//        url: "/GarmentItem/List",
//        data: JSON.stringify({ Type: type, buyormasid: BMasId }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (json) {
//            debugger;
//            var tableload = json.data;
//            var dataSet = eval("[" + tableload + "]");
//            stylegarList = dataSet;
//            BuyerId = stylegarList[0][4];
//            GItemId = stylegarList[0][5];
//            TemplateId = stylegarList[0][6];
//            getbyID(TemplateId);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}
function loadProcesstbl(processdetlist) {
    debugger;
    $('#tblprocessdetails').DataTable().destroy();
    debugger;

    $('#tblprocessdetails').DataTable({
        data: processdetlist,
        scrollY: 230,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "ProcessmasId", data: "ordconsprocessmasid", "visible": false },
            { title: "ProcessId", data: "ordconsprocessid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "Loss", data: "ordconsprocessloss" },
            
        {
            title: "ACTION", "mDataProp": null,
            "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnProcessedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnprocessremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
        }
        ]
    });
}
function loaditemtbl(itemdetlist) {
    debugger;
    $('#tblitemdetails').DataTable().destroy();
    debugger;

    $('#tblitemdetails').DataTable({
        data: itemdetlist,
        scrollY: 230,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "ItemGroupmasId", data: "ordconsyarnfabmasid", "visible": false },
            { title: "ItemGroupId", data: "ordconsitemtype", "visible": false },
            { title: "ItemGroup", data: "ordconsitemtype" },
            { title: "ItemId", data: "ordconsitemid", "visible": false },
            { title: "Item", data: "Item" },

        {
            title: "ACTION", "mDataProp": null,
            "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
        }
        ]
    });
}




function getbyGarAddID(StyleRowid,GItem_Id) {
    debugger;
    Stylerowid = StyleRowid;
    Gitem_Id = GItem_Id
    for (i = 0; i < stylegarList.length; i++) {
        if (stylegarList[i][5] == GItem_Id) {
            var GaritmName = stylegarList[i][3]
            $('#txtgaritm').val(GaritmName);
        }
    }


    Mode = 0;
    clearTextBox();
    //loadorderQtyno(BMasId);
    var type = "oid";
    //getTemplateId(type);
    $('#myModal').modal('show');

}
function getbyGarEditID(StyleRowid, GItem_Id) {
    // clearTextBox();
    Gitem_Id = GItem_Id;
    //ordno = order_no;
    debugger;
    Stylerowid = StyleRowid;
    for (i = 0; i < stylegarList.length; i++) {
        if (stylegarList[i][5] == GItem_Id) {
            var GaritmName = stylegarList[i][3];
            ordno = stylegarList[i][1];
            $('#txtgaritm').val(GaritmName);
        }
    }
    loadorderQtyno(BMasId);
    var type = "oid";
    //getTemplateIdfromOrdstyleTemp(type);
    $('#myModal').modal('show');
    $('#btnUpdate').show();
    $('#btnmainDelete').hide();
    $('#btnAdd').hide();
    $('#btnprocessupdate').hide(); 
    $('#btnitemupdate').hide();
}
function getbyGarDeleteID(StyleRowid, GItem_Id) {
    debugger;
    Stylerowid = StyleRowid;
    Gitem_Id = GItem_Id;
    
    for (i = 0; i < stylegarList.length; i++) {
        if (stylegarList[i][5] == GItem_Id) {
            var GaritmName = stylegarList[i][3]
            ordno = stylegarList[i][1];
            $('#txtgaritm').val(GaritmName);
        }
    }
    loadorderQtyno(BMasId);
    var type = "oid";
    //getTemplateIdfromOrdstyleTemp(type);
    $('#myModal').modal('show');
    $('#btnUpdate').hide();
    $('#btnmainDelete').show();
    $('#btnAdd').hide();
    $('#btnprocessupdate').hide();
    $('#btnitemupdate').hide();
    //StyleDelete();
}
function Delete() {

    StyleDelete();
}
function loadorderQtyno(BMasId) {
    debugger;
    $.ajax({
        url: "/OrderItemDetails/GetGarmentOrderNo",
        data: JSON.stringify({ buyormasid: BMasId}),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            //var data = rresult.Value;

            for (i = 0; i < result.Value.length; i++) {

                if (result.Value[i].GarmentItemid == Gitem_Id) {
                    var conmasid = result.Value[i].ordconsmasid
                    var avggramg = result.Value[i].ordconsavggramage;
                    $('#txtavggarm').val(avggramg);
                    garmitmid = result.Value[0].GarmentItemid;
                    ordconsmasid = conmasid;
                    processdet(conmasid);
                    loadyarnfabdet(conmasid);
                }
            }

          
           // var conmasid = result.Value[0].ordconsmasid;
          
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function processdet(conmasid) {
    debugger;
    $.ajax({
        url: "/OrderItemDetails/processdet",
        data: JSON.stringify({ conmasid: conmasid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var res1 = result.Value;
            processdetlist = res1;
            loadProcesstbl(processdetlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function getitem(itmid) {
    debugger;
    $.ajax({
        url: "/Item/GetbyID",
        data: JSON.stringify({ ID: itmid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var res2 = result.Value;
            itemdetlist = res2;
            loaditemtbl(itemdetlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function loadyarnfabdet(conmasid) {
    debugger;
    $.ajax({
        url: "/OrderItemDetails/yarnfabdet",
        data: JSON.stringify({ conmasid: conmasid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var res2 = result.Value;
            itemdetlist = res2;
            loaditemtbl(itemdetlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
//function getbyorderstyleID(TemplateId) {
//    debugger;
//    Mode = 1;
//    if (Mode == 1) {
//        LoadOrderStyleTemplateDDL('#ddltemp');
//    }
//    var sno = 0;
//    id = TemplateId;
//    $.ajax({
//        url: "/GarmentItem/GetOrderStyleTemp/" + id,
//        typr: "GET",
//        contentType: "application/json;charset=UTF-8",
//        dataType: "json",
//        success: function (result) {
//            var obj = result.Value;
//            debugger;
//            if (result.Status == 'SUCCESS') {

//                var res = [];
//                res = obj;
//                var Typetxt = '';
//                for (i = 0; i < Type.length; i++) {
//                    for (j = 0; j < res.length; j++) {
//                        if (Type[i].Id == res[j].DTypeval) {
//                            Typetxt = Type[i].Value;
//                            res[j].DType = Typetxt;
//                            res[j].DTypeval = Type[i].Id;
//                        }
//                    }
//                }

//                styledetlist = res;
//                $('#ddltemp').val(obj[0].DTemplateId).trigger('change');
//                $('#txttemplatename').val(obj[0].DTemplate);
//                $('#txttemplateid').val(obj[0].DTemplateId);
//                $('#ddlgitm').val(obj[0].DGItemId).trigger('change');
//                $('#ddlbuy').val(obj[0].DBuyerId).trigger('change');
//                loadstyleTemplate(styledetlist);

//                $('#btnprocessadd').show();
//                $('#txttemplatename').show();
//                $('#btnprocessupdate').hide();
//                $('#ddltemp').hide();

//                $('#ddlType').val(0).trigger('change');
//                $('#ddlType').siblings('span.error').css('visibility', 'hidden');
//                $('#txtqty').val('');
//                $('#txtrate').val('');
//                $('#ddlconver').val(1);
//                $('#myModal').modal('show');
//                if (Mode == 1) {
//                    $('#btnUpdate').show();
//                    $('#btnmainDelete').hide();
//                    $('#btnAdd').hide();
//                }
//                else if (Mode == 2) {
//                    $('#btnmainDelete').show();
//                    $('#btnUpdate').hide();
//                    $('#btnAdd').hide();
//                }
//            } else { }
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });

//}
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
//function ConvertType(Val) {
//    debugger;
//    ConvertTypeId = [];
//    ConvertTypeName = [];
//    var TypeId = [];
//    var Type = [];
//    $('#ddlConvertType :selected').each(function (i, selected) {
//        if ($(selected).val() != 0) {
//            TypeId[i] = $(selected).val();
//            Type[i] = $(selected).text();
//            ConvertTypeId.push(TypeId[i]);
//            ConvertTypeName.push(Type[i]);
//        }

//    });

//    ConvertTypeId = $.unique(ConvertTypeId);
//    ConvertTypeName = $.unique(ConvertTypeName);
//}
function Add() {
    debugger;



    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;

   
    //var  = $("#txtgaritm").val();
    var avggram = $("#txtavggarm").val();
   // var GItemid = GItem_Id;
    var order_no = stylegarList[0][1];
    if (isAllValid) {
        var StyleTempObj = {
            ordconsavggramage : avggram,
            GarmentItemid : Gitem_Id,
            order_no: order_no,
            ordProcessDet: processdetlist,
            ordItemDet: itemdetlist,
            BmasId: BMasId,
            StyleRowid: Stylerowid
        };
        LoadingSymb();
        debugger;
        $.ajax({
            url: "/OrderItemDetails/Add",
            data: JSON.stringify(StyleTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Record saved successfully...");
                    $('#tbody').DataTable().destroy();
                    $('#myModal').modal('hide');
                    AddUserEntryLog('SalesManagement', 'Yarn/Fabric template', 'ADD', order_no);
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
//function mySize(Val) {
//    MSizid = [];
//    MSiz = [];
//    var Siz = [];
//    var nam = [];
//    $('#ddlsize :selected').each(function (i, selected) {
//        if ($(selected).val() != 0) {
//            Siz[i] = $(selected).val();
//            nam[i] = $(selected).text();
//            MSizid.push(Siz[i]);
//            MSiz.push(nam[i]);
//        }

//    });

//    MSizid = $.unique(MSizid);
//    MSiz = $.unique(MSiz);
//}
//function myColor(Val) {
//    debugger;
//    MClrid = [];
//    MClr = [];
//    var clr = [];
//    var nam = [];
//    $('#ddlcolor :selected').each(function (i, selected) {
//        if ($(selected).val() != 0) {
//            clr[i] = $(selected).val();
//            nam[i] = $(selected).text();
//            MClrid.push(clr[i]);
//            MClr.push(nam[i]);
//        }

//    });

//    MClrid = $.unique(MClrid);
//    MClr = $.unique(MClr);
//}


//function getbyID(TemplateId) {
//    debugger;
//    mode = 0;
//    TemplateIdonEditMode = TemplateId;

//    LoadSupplierDDL('#ddlsup');
//    LoadItemDDL('#ddlitem');
//    LoadColorDDL('#ddlcolor,#ddlGarcolor');
//    LoadSizeDDL('#ddlsize');
//    LoadGSizeDDL('#ddlGarsize');
//    var sno = 0;

//    $.ajax({
//        url: "/GarmentItem/GetStyleTemp/" + TemplateId,
//        typr: "GET",
//        contentType: "application/json;charset=UTF-8",
//        dataType: "json",
//        success: function (result) {
//            var obj = result.Value;
//            debugger;
//            if (result.Status == 'SUCCESS') {

//                var res = [];
//                res = obj;
//                var Typetxt = '';
//                for (i = 0; i < Type.length; i++) {
//                    for (j = 0; j < res.length; j++) {
//                        if (Type[i].Id == res[j].DTypeval) {
//                            Typetxt = Type[i].Value;
//                            res[j].DType = Typetxt;
//                            res[j].DTypeval = Type[i].Id;
//                        }
//                    }
//                }

//                styledetlist = res;
//                $('#ddltemp').val(obj[0].DTemplateId);
//                $('#ddlgitm').val(obj[0].DGItemId);
//                $('#ddlbuy').val(obj[0].DBuyerId);
//                loadstyleTemplate(styledetlist);

//                $('#btnprocessadd').show();
//                $('#btnprocessupdate').hide();

//                $('#ddlType').val(0).trigger('change');
//                $('#ddlType').siblings('span.error').css('visibility', 'hidden');
//                $('#txtqty').val('');
//                $('#txtrate').val('');
//                $('#ddlconver').val(1);
//                $('#myModal').modal('show');
//                if (Mode == 1) {
//                    $('#btnUpdate').show();
//                    $('#btnmainDelete').hide();
//                    $('#btnAdd').hide();
//                }
//                else if (Mode == 2) {
//                    $('#btnmainDelete').show();
//                    $('#btnUpdate').hide();
//                    $('#btnAdd').hide();
//                }
//            } else { }
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });

//}

//function Editgarment(TemplateId) {
//    debugger;
//    mode = 1;
//    debugger;
//    mode = 0;
//    TemplateIdonEditMode = TemplateId;

//    LoadSupplierDDL('#ddlsup');
//    LoadItemDDL('#ddlitem');
//    LoadColorDDL('#ddlcolor,#ddlGarcolor');
//    LoadSizeDDL('#ddlsize');
//    LoadGSizeDDL('#ddlGarsize');
//    var sno = 0;

//    $.ajax({
//        url: "/GarmentItem/GetStyleTemp/" + TemplateId,
//        typr: "GET",
//        contentType: "application/json;charset=UTF-8",
//        dataType: "json",
//        success: function (result) {
//            var obj = result.Value;
//            debugger;
//            if (result.Status == 'SUCCESS') {

//                var res = [];
//                res = obj;
//                var Typetxt = '';
//                for (i = 0; i < Type.length; i++) {
//                    for (j = 0; j < res.length; j++) {
//                        if (Type[i].Id == res[j].DTypeval) {
//                            Typetxt = Type[i].Value;
//                            res[j].DType = Typetxt;
//                            res[j].DTypeval = Type[i].Id;
//                        }
//                    }
//                }

//                styledetlist = res;
//                $('#ddltemp').val(obj[0].DTemplateId);
//                $('#ddlgitm').val(obj[0].DGItemId);
//                $('#ddlbuy').val(obj[0].DBuyerId);
//                loadstyleTemplate(styledetlist);

//                $('#btnprocessadd').show();
//                $('#btnprocessupdate').hide();

//                $('#ddlType').val(0).trigger('change');
//                $('#ddlType').siblings('span.error').css('visibility', 'hidden');
//                $('#txtqty').val('');
//                $('#txtrate').val('');
//                $('#ddlconver').val(1);
//                $('#myModal').modal('show');
//                if (Mode == 1) {
//                    $('#btnUpdate').show();
//                    $('#btnmainDelete').hide();
//                    $('#btnAdd').hide();
//                }
//                else if (Mode == 2) {
//                    $('#btnmainDelete').show();
//                    $('#btnUpdate').hide();
//                    $('#btnAdd').hide();
//                }
//            } else { }
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}
function Update() {
    debugger;

    var avggram = $("#txtavggarm").val();
   // var GItemid = Gitem_Id;
    //var order_no = stylegarList[0][1];
    var res = validate();

    if (res == false) {
        return false;
    }

    var isAllValid = true;


    if (isAllValid) {
        var StyleTempObj = {
            ordconsavggramage : avggram,
            GarmentItemid : Gitem_Id,
            //order_no: order_no,
            ordconsmasid:ordconsmasid,
            ordProcessDet: processdetlist,
            ordItemDet: itemdetlist,
            BmasId: BMasId,
            StyleRowid: Stylerowid
        };
        LoadingSymb();
        $.ajax({
            url: "/OrderItemDetails/Update",
            data: JSON.stringify(StyleTempObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == "SUCCESS") {
                    alert("Record updated successfully...");
                    $('#tblmain').DataTable().destroy();
                    loadData(type);
                    $('#myModal').modal('hide');
                    clearTextBox();
                    AddUserEntryLog('SalesManagement', 'Yarn/Fabric template', 'UPDATE', ordno);
                    window.location.href = "/BulkOrder/BulkOrderIndex";
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

function StyleDelete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/OrderItemDetails/Delete",
            data: JSON.stringify({ id: ordconsmasid }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Status == "SUCCESS") {
                    alert("Record Deleted successfully...");
                    $('#tblmain').DataTable().destroy();
                    loadData(type);
                    $('#myModal').modal('hide');
                    AddUserEntryLog('SalesManagement', 'Yarn/Fabric template', 'DELETE', ordno);
                    window.location.href = "/BulkOrder/BulkOrderIndex";
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
        url: "/OrderItemDetails/List",
        data: JSON.stringify({ type: type, buyormasid: BMasId }),
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
                         { title: "StyleRowid", "visible": false },
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


//function LoadCheckOrderTempPlanDetails(tempdetid) {


//    var tempid = chkmastempId;

//    $.ajax({
//        url: "/GarmentItem/CheckPlanOrdTempDetails",
//        data: JSON.stringify({ id: tempid, detid: tempdetid }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {

//            var obj = result.Value;
//            debugger;
//            if (obj != undefined) {


//                var COrdTemp = obj[0]["CheckOrdTemp"];


//                if (COrdTemp > 0) {

//                    alert("Trims Planning has been made for this Item,Please Check it....")
//                    $('#ddlsup').val(0).trigger('change');
//                    $('#ddlitem').val(0).trigger('change');
//                    $('#ddlcolor').val(0).trigger('change');
//                    $('#ddlsize').val(0).trigger('change');
//                    $('#txtqty').val('');
//                    $('#txtrate').val('');
//                    $('#ddlType').val('').trigger('change');
//                    $('#ddlconver').val(0).trigger('change');
//                    return true;
//                }
//                else {
//                    $("#Update").attr('disabled', true);
//                }

//            }
//            else {

//            }
//        },

//        failure: function (errMsg) {
//            alert(errMsg);
//        }
//    });
//}