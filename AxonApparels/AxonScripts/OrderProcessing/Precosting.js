var TrimsList = [];
var FabricList = [];
var EmbellishmentList = [];
var StyleRowId = 0;
var mod = 0;
var BMasId = 0;
var OrdNo = 0;
var Buyerid = 0;
var Styleid = 0;
var precostmasid = 0;
var Gitemid = 0;
var Itemid = 0;
var Colorid = 0;
var Sizeid = 0;
var trimsrowindex = -1;
var fabricrowindex = -1;
var Emblishrowindex = -1;
var superuser = 0;
var rightsflg = 0;
var Roleid = 0;
var Menuid = 0;
var Submenuid = 0;
var itmtype = '';
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
    LoadComponentDDL("#ddlComplist");
    LoadColorDDL("#ddlColorlist,#ddlFinishlist,#ddlGreylist,#ddlPrintlist");
    LoadSizeDDL("#ddlSizelist");
    LoadFabricDDL("#ddlFablist");
    LoadAccessoryItemDDL("#ddlTrimslist");
    LoadProcessDDL("#ddlEmblish");
    LoadUomDDL("#ddlUOMlist");
    getbyID(StyleRowId);

    $(document).ready(function () {
        $("#tblEntryCompItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
            index = (this.rowIndex) - 1;
        });
    });
    $("#ddlTrimslist").change(function () {
        debugger;
        var ID = this.value;
       
        GetUomCall(ID);
       
    });

    $('#btntrimsadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#ddlItemlist').val() == "0") {

            $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {
         
            $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

       

        if ($('#ddlTrimslist').val() == "0") {
            isAllValid = false;
           
            $('#ddlTrimslist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {
            
            $('#ddlTrimslist').siblings(".select2-container").css('border', '1px solid lightgrey');

        }
        if ($('#ddlColorlist').val() == "0") {
            isAllValid = false;
           
            $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {
           
            $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlSizelist').val() == "0") {
            isAllValid = false;
            
            $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {
          
            $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlUOMlist').val() == "0") {
            isAllValid = false;

            $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if (TrimsList.length == 0) {
            leng = 1;
           
        }
        else {
            leng = TrimsList.length + 1;
            
        }
        var GItm = $('#ddlItemlist').val();
        var Itm = $('#ddlTrimslist').val();
        var clr= $('#ddlColorlist').val();
        var sz = $('#ddlSizelist').val();
        $.each(TrimsList, function () {
            if (this.GItemid == GItm && this.Itemid == Itm && this.Colorid == clr && this.Sizeid == sz) {
                alert("Details already added");
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var trimsListObj = {
                GItem: $("#ddlItemlist option:selected").text(),
                GItemid: $('#ddlItemlist').val(),
                Item: $("#ddlTrimslist option:selected").text(),
                Itemid: $('#ddlTrimslist').val(),
                Color: $("#ddlColorlist option:selected").text(),
                Colorid: $('#ddlColorlist').val(),
                Size: $("#ddlSizelist option:selected").text(),
                Sizeid: $('#ddlSizelist').val(),
                UOM: $("#ddlUOMlist option:selected").text(),
                UOMid: $('#ddlUOMlist').val(),
                TrimsSlNo: leng,
                PrecostTrimmasid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            TrimsList.push(trimsListObj);

            loadTrimsTable(trimsListObj);
            ClearTrimsDll();
           
        }
    });

    $('#btnfabricadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#ddlTypelist').val() == "0") {

            $('#ddlTypelist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlTypelist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlComplist').val() == "0") {
            isAllValid = false;

            $('#ddlComplist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlComplist').siblings(".select2-container").css('border', '1px solid lightgrey');

        }
        if ($('#ddlFablist').val() == "0") {
            isAllValid = false;

            $('#ddlFablist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlFablist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlGreylist').val() == "0") {
            isAllValid = false;

            $('#ddlGreylist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlGreylist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlFinishlist').val() == "0") {
            isAllValid = false;

            $('#ddlFinishlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlFinishlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        //if ($('#ddlPrintlist').val() == "0") {
        //    isAllValid = false;

        //    $('#ddlPrintlist').siblings(".select2-container").css('border', '1px solid red');

        //}
        //else {

        //    $('#ddlPrintlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        //}
        if ($('#txtGMS').val() == "") {
            isAllValid = false;
            $('#txtGMS').css('border-color', 'Red');
        }
        else {
            $('#txtGMS').css('border-color', 'lightgrey');
        }

        if (FabricList.length == 0) {
            leng = 1;

        }
        else {
            leng = FabricList.length + 1;

        }
        var GItm = $('#ddlTypelist').val();
        var Itm = $('#ddlComplist').val();
        var clr = $('#ddlGreylist').val();
        var sz = $('#ddlFablist').val();
        $.each(FabricList, function () {
            if (this.GItemid == GItm && this.Componentid == Itm && this.Greycolorid == clr && this.Fabricid == sz) {
                alert("Details already added");
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var fabricListObj = {
                GItem: $("#ddlTypelist option:selected").text(),
                GItemid: $('#ddlTypelist').val(),
                Component: $("#ddlComplist option:selected").text(),
                Componentid: $('#ddlComplist').val(),
                Fabric: $("#ddlFablist option:selected").text(),
                Fabricid: $('#ddlFablist').val(),
                Greycolor: $("#ddlGreylist option:selected").text(),
                Greycolorid: $('#ddlGreylist').val(),
                Finishcolor: $("#ddlFinishlist option:selected").text(),
                Finishcolorid: $('#ddlFinishlist').val(),
                Printcolor: $("#ddlPrintlist option:selected").text(),
                Printcolorid: $('#ddlPrintlist').val(),
                FabricSlNo: leng,
                PrecostFabricmasid: 0,
                GSM: $('#txtGMS').val(),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            FabricList.push(fabricListObj);

            loadfabricTable(fabricListObj);
            ClearFabricDll();

        }
    });

    $('#btnemblishmentadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#ddlembItemlist').val() == "0") {

            $('#ddlembItemlist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlembItemlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlEmblish').val() == "0") {
            isAllValid = false;

            $('#ddlEmblish').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlEmblish').siblings(".select2-container").css('border', '1px solid lightgrey');

        }
       

        if (EmbellishmentList.length == 0) {
            leng = 1;

        }
        else {
            leng = EmbellishmentList.length + 1;

        }
        var GItm = $('#ddlembItemlist').val();
        var Itm = $('#ddlEmblish').val();
        
        $.each(EmbellishmentList, function () {
            if (this.GItemid == GItm && this.Processid == Itm) {
                alert("Details already added");
                isAllValid = false;
            }
        });

        if (isAllValid) {

            var EmbelishListObj = {
                GItem: $("#ddlembItemlist option:selected").text(),
                GItemid: $('#ddlembItemlist').val(),
                Process: $("#ddlEmblish option:selected").text(),
                Processid: $('#ddlEmblish').val(),
                
                EmblishSlNo: leng,
                PrecostEmbellishmentmasid: 0,
               
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            EmbellishmentList.push(EmbelishListObj);

            loadEmbellishmentTable(EmbelishListObj);
            ClearEmbilshDll();

        }
    });

    $(document).on('click', '.btntrimsedit', function () {
        debugger;
       // Mode = 1;

        trimsrowindex = $(this).closest('tr').index();

        var currentro12 = TrimsList.slice(trimsrowindex);

        $('#ddlItemlist').val(currentro12[0]['GItemid']).trigger('change');
        $('#ddlTrimslist').val(currentro12[0]['Itemid']).trigger('change');
        $('#ddlColorlist').val(currentro12[0]['Colorid']).trigger('change');
        $('#ddlSizelist').val(currentro12[0]['Sizeid']).trigger('change');
        $('#ddlUOMlist').val(currentro12[0]['UOMid']).trigger('change');
        Gitemid = currentro12[0]['GItemid'];
        Itemid = currentro12[0]['Itemid'];
        Colorid = currentro12[0]['Colorid'];
        Sizeid = currentro12[0]['Sizeid'];

        $('#btntrimsadd').hide();
        $('#btntrimsupdate').show();
    });

$('#btntrimsupdate').click(function () {
    debugger;

    var currentrowsel1 = TrimsList.slice(trimsrowindex);

    var isAllValid = true;


    if ($('#ddlItemlist').val() == "0") {

        $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }



    if ($('#ddlTrimslist').val() == "0") {
        isAllValid = false;

        $('#ddlTrimslist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlTrimslist').siblings(".select2-container").css('border', '1px solid lightgrey');

    }
    if ($('#ddlColorlist').val() == "0") {
        isAllValid = false;

        $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlSizelist').val() == "0") {
        isAllValid = false;

        $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlUOMlist').val() == "0") {
        isAllValid = false;

        $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if (isAllValid) {
        var currentrowsel = TrimsList.slice(trimsrowindex);

        currentrowsel[0]['GItemid'] = $("#ddlItemlist").val();
        currentrowsel[0]['GItem'] = $("#ddlItemlist option:selected").text();
        currentrowsel[0]['Itemid'] = $("#ddlTrimslist").val();
        currentrowsel[0]['Item'] = $("#ddlTrimslist option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlColorlist option:selected").val();
        currentrowsel[0]['Color'] = $("#ddlColorlist option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlSizelist").val();
        currentrowsel[0]['Size'] = $("#ddlSizelist option:selected").text();
        currentrowsel[0]['UOMid'] = $("#ddlUOMlist").val();
        currentrowsel[0]['UOM'] = $("#ddlUOMlist option:selected").text();

        
        TrimsList[trimsrowindex] = currentrowsel[0];
      
        loadTrimsTable(TrimsList);

        $('#btntrimsadd').show();
        $('#btntrimsupdate').hide();
        ClearTrimsDll();
    };
});

$(document).on('click', '.btnfabedit', function () {
    debugger;
    // Mode = 1;

    fabricrowindex = $(this).closest('tr').index();

    var currentro12 = FabricList.slice(fabricrowindex);

    $('#ddlTypelist').val(currentro12[0]['GItemid']).trigger('change');
    $('#ddlComplist').val(currentro12[0]['Componentid']).trigger('change');
    $('#ddlFablist').val(currentro12[0]['Fabricid']).trigger('change');
    $('#ddlGreylist').val(currentro12[0]['Greycolorid']).trigger('change');
    $('#ddlFinishlist').val(currentro12[0]['Finishcolorid']).trigger('change');
    $('#ddlPrintlist').val(currentro12[0]['Printcolorid']).trigger('change');
    $('#txtGMS').val(currentro12[0]['GSM']);
   

    $('#btnfabricadd').hide();
    $('#btnfabricupdate').show();
});

$('#btnfabricupdate').click(function () {
    debugger;

    var currentrowsel1 = FabricList.slice(fabricrowindex);

    var isAllValid = true;


    var isAllValid = true;


    if ($('#ddlTypelist').val() == "0") {

        $('#ddlTypelist').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlTypelist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }



    if ($('#ddlComplist').val() == "0") {
        isAllValid = false;

        $('#ddlComplist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlComplist').siblings(".select2-container").css('border', '1px solid lightgrey');

    }
    if ($('#ddlFablist').val() == "0") {
        isAllValid = false;

        $('#ddlFablist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlFablist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlGreylist').val() == "0") {
        isAllValid = false;

        $('#ddlGreylist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlGreylist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlFinishlist').val() == "0") {
        isAllValid = false;

        $('#ddlFinishlist').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlFinishlist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    //if ($('#ddlPrintlist').val() == "0") {
    //    isAllValid = false;

    //    $('#ddlPrintlist').siblings(".select2-container").css('border', '1px solid red');

    //}
    //else {

    //    $('#ddlPrintlist').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    if ($('#txtGMS').val() == "") {
        isAllValid = false;
        $('#txtGMS').css('border-color', 'Red');
    }
    else {
        $('#txtGMS').css('border-color', 'lightgrey');
    }


    if (isAllValid) {
        var currentrowsel = FabricList.slice(fabricrowindex);

        currentrowsel[0]['GItemid'] = $("#ddlTypelist").val();
        currentrowsel[0]['GItem'] = $("#ddlTypelist option:selected").text();
        currentrowsel[0]['Componentid'] = $("#ddlComplist").val();
        currentrowsel[0]['Component'] = $("#ddlComplist option:selected").text();
        currentrowsel[0]['Fabricid'] = $("#ddlFablist option:selected").val();
        currentrowsel[0]['Fabric'] = $("#ddlFablist option:selected").text();
        currentrowsel[0]['Greycolorid'] = $("#ddlGreylist").val();
        currentrowsel[0]['Greycolor'] = $("#ddlGreylist option:selected").text();
        currentrowsel[0]['Finishcolorid'] = $("#ddlFinishlist").val();
        currentrowsel[0]['Finishcolor'] = $("#ddlFinishlist option:selected").text();
        currentrowsel[0]['Printcolorid'] = $("#ddlPrintlist").val();
        currentrowsel[0]['Printcolor'] = $("#ddlPrintlist option:selected").text();
        currentrowsel[0]['GSM'] = $("#txtGMS").val();

        FabricList[fabricrowindex] = currentrowsel[0];

        loadfabricTable(FabricList);

        $('#btnfabricadd').show();
        $('#btnfabricupdate').hide();
        ClearFabricDll();
    };
});

$(document).on('click', '.btnEmbelishedit', function () {
    debugger;
    // Mode = 1;

    Emblishrowindex = $(this).closest('tr').index();

    var currentro12 = EmbellishmentList.slice(Emblishrowindex);

    $('#ddlembItemlist').val(currentro12[0]['GItemid']).trigger('change');
    $('#ddlEmblish').val(currentro12[0]['Processid']).trigger('change');
   
    $('#btnemblishmentadd').hide();
    $('#btnemblishmentupdate').show();
});

$('#btnemblishmentupdate').click(function () {
    debugger;

    var currentrowsel1 = EmbellishmentList.slice(Emblishrowindex);

    var isAllValid = true;


    if ($('#ddlembItemlist').val() == "0") {

        $('#ddlembItemlist').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlembItemlist').siblings(".select2-container").css('border', '1px solid lightgrey');
    }



    if ($('#ddlEmblish').val() == "0") {
        isAllValid = false;

        $('#ddlEmblish').siblings(".select2-container").css('border', '1px solid red');

    }
    else {

        $('#ddlEmblish').siblings(".select2-container").css('border', '1px solid lightgrey');

    }


    if (isAllValid) {
        var currentrowsel = EmbellishmentList.slice(Emblishrowindex);

        currentrowsel[0]['GItemid'] = $("#ddlembItemlist").val();
        currentrowsel[0]['GItem'] = $("#ddlembItemlist option:selected").text();
        currentrowsel[0]['Processid'] = $("#ddlEmblish").val();
        currentrowsel[0]['Process'] = $("#ddlEmblish option:selected").text();
        
        EmbellishmentList[Emblishrowindex] = currentrowsel[0];

        loadEmbellishmentTable(EmbellishmentList);

        $('#btnemblishmentadd').show();
        $('#btnemblishmentupdate').hide();
        ClearEmbilshDll();
    };
});

$(document).on('click', '.btntrimsremove', function () {
    debugger;
    trimsrowindex = $(this).closest('tr').index();
    var currentrowsel = TrimsList.slice(trimsrowindex);
    
    TrimsList.splice(trimsrowindex, 1);
    document.getElementById("tblTrimsdetails").deleteRow(trimsrowindex + 1);

   
});

$(document).on('click', '.btnfabremove', function () {
    debugger;
    fabricrowindex = $(this).closest('tr').index();
    var currentrowsel = FabricList.slice(fabricrowindex);

    FabricList.splice(fabricrowindex, 1);
    document.getElementById("tblFabricdetails").deleteRow(fabricrowindex + 1);


});

$(document).on('click', '.btnEmbelishremove', function () {
    debugger;
    Emblishrowindex = $(this).closest('tr').index();
    var currentrowsel = EmbellishmentList.slice(Emblishrowindex);

    EmbellishmentList.splice(Emblishrowindex, 1);
    document.getElementById("tblEmblishmentdetails").deleteRow(Emblishrowindex + 1);


});

$(document).on('click', '.btnadditem', function () {
    debugger;
    Menuid = 2435;
    rightsflg = 0;
    itmtype = 'GARMENT';
    if (superuser.toUpperCase() != "SUPERUSER") {
        Rolecheck();
    }
    else {
        rightsflg = 1;
        additem();
    }

});
$(document).on('click', '.btnaddtrims', function () {
    debugger;
    Menuid = 2435;
    rightsflg = 0;
    itmtype = 'TRIMS';
    if (superuser.toUpperCase() != "SUPERUSER") {
        Rolecheck();
    }
    else {
        rightsflg = 1;
        additem();
    }

});
$(document).on('click', '.btnaddcomponent', function () {
    debugger;
    Menuid = 2435;
    rightsflg = 0;
    itmtype = 'COMPONENT';
    if (superuser.toUpperCase() != "SUPERUSER") {
        Rolecheck();
    }
    else {
        rightsflg = 1;
        additem();
    }

});
$(document).on('click', '.btnaddfabric', function () {
    debugger;
    Menuid = 2435;
    rightsflg = 0;
    itmtype = 'FABRIC';
    if (superuser.toUpperCase() != "SUPERUSER") {
        Rolecheck();
    }
    else {
        rightsflg = 1;
        additem();
    }

});

$(document).on('click', '.btnaddsize', function () {
    debugger;
    Menuid = 2437;
    rightsflg = 0;
    if (superuser.toUpperCase() != "SUPERUSER") {
        Rolecheck();
    }
    else {
        rightsflg = 1;
        addsize();
    }
});
$(document).on('click', '.btnaddcolor', function () {
    debugger;
    Menuid = 2436;
    rightsflg = 0;
    if (superuser.toUpperCase() != "SUPERUSER") {
        Rolecheck();
    }
    else {
        rightsflg = 1;
        addcolor();
    }
});

});

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

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
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
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
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
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnEmbelishedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnEmbelishremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblEmblishmentdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEmblishmentdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

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
                $('#txtEntryDate').val(moment(obj[0]["Entrydate"]).format('DD/MM/YYYY'));
                OrdNo = obj[0]["Orderno"];
                BMasId = obj[0]["Bmasid"];
                Buyerid = obj[0]["Buyerid"];
                Styleid = obj[0]["Styleid"];
                precostmasid=obj[0]["PrecostFabTrimmasid"];
                
                if (Mod == 0) {
                    LoadGarmentItemDetails(ID, OrdNo);
                  
                } 
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnSave').hide();
                    $('#btnUpdate').show();
                    LoadGarmentItemDetails(ID, OrdNo);
                    LoadEditTrims(precostmasid);
                    LoadEditFabric(precostmasid);
                    LoadEditEmbellishment(precostmasid);
                } 
                else {
                    $('#btnDelete').show();
                    $('#btnSave').hide();
                    $('#btnUpdate').hide();
                    LoadGarmentItemDetails(ID, OrdNo);
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
}

function LoadEditTrims(ID) {
    debugger;

    $.ajax({
        url: "/Precosting/GetPrecostTrimsEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList=(result.Value);

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
        url: "/Precosting/GetPrecostfabricEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            FabricList=(result.Value);

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
        url: "/Precosting/GetPrecostEmblishmentEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            EmbellishmentList=(result.Value);

            loadEmbellishmentTable(result.Value);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadGarmentItemDetails(ID, OrdNo) {
    debugger;

    $.ajax({
        url: "/OrderMeasurement/LoadGarItemDetails",
        data: JSON.stringify({ StyleRowid: ID, OrderNo: OrdNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
           
            var Type = [];
            result.push(Type);
            if (result.length > 0) {
                //var data = result.Value;
                $(ddlItemlist).empty();
                $(ddlItemlist).append($('<option/>').val('0').text('--Select Item--'));
                $.each(result, function () {
                    $(ddlItemlist).append($('<option></option>').val(this.ITEMID).text(this.GarmentItem));
                });


                $(ddlTypelist).empty();
                $(ddlTypelist).append($('<option/>').val('0').text('--Select Item--'));
                $.each(result, function () {
                    $(ddlTypelist).append($('<option></option>').val(this.ITEMID).text(this.GarmentItem));
                });

                $(ddlembItemlist).empty();
                $(ddlembItemlist).append($('<option/>').val('0').text('--Select Item--'));
                $.each(result, function () {
                    $(ddlembItemlist).append($('<option></option>').val(this.ITEMID).text(this.GarmentItem));
                });
              
            }
            

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Save() {

    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if (FabricList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
    if (EmbellishmentList.length == 0) {

        alert("Please check Embellishment Details..");
        return true;
    }

    var objSubmit = {
        OrderNo: $('#txtOrderNo').val(),
        Bmasid: BMasId,
        Styleid:Styleid,
        Buyerid:Buyerid,
        Entrydate: $('#txtEntryDate').val(),
        Stylerowid: StyleRowId,
        TrimsDet:TrimsList,
        FabricDet:FabricList,
        EmbellishmentDet:EmbellishmentList   
    };
    //$("#ConAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Precosting/Add",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Precosting Saved Sucessfully");
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

function Update() {

    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if (FabricList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
    if (EmbellishmentList.length == 0) {

        alert("Please check Embellishment Details..");
        return true;
    }

    var objSubmit = {
        OrderNo: $('#txtOrderNo').val(),
        Bmasid: BMasId,
        Styleid: Styleid,
        Buyerid: Buyerid,
        Entrydate: $('#txtEntryDate').val(),
        Stylerowid: StyleRowId,
        PrecostFabTrimmasid:precostmasid,
        TrimsDet: TrimsList,
        FabricDet: FabricList,
        EmbellishmentDet: EmbellishmentList
    };
    LoadingSymb();
    $.ajax({
        url: "/Precosting/Update",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Precosting Updated Sucessfully");
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

function Delete() {

    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if (FabricList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
    if (EmbellishmentList.length == 0) {

        alert("Please check Embellishment Details..");
        return true;
    }

    var objSubmit = {
        OrderNo: $('#txtOrderNo').val(),
        Bmasid: BMasId,
        Styleid: Styleid,
        Buyerid: Buyerid,
        Entrydate: $('#txtEntryDate').val(),
        Stylerowid: StyleRowId,
        PrecostFabTrimmasid: precostmasid,
        TrimsDet: TrimsList,
        FabricDet: FabricList,
        EmbellishmentDet: EmbellishmentList
    };
    LoadingSymb();
    $.ajax({
        url: "/Precosting/Delete",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Precosting Delete Sucessfully");
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

function ClearTrimsDll() {
    $('#ddlItemlist').val(0).trigger('change');
    $('#ddlTrimslist').val(0).trigger('change');
    $('#ddlColorlist').val(0).trigger('change');
    $('#ddlSizelist').val(0).trigger('change');
    $('#ddlUOMlist').val(0).trigger('change');
    $('#btntrimsadd').show();
    $('#btntrimsupdate').hide();
}

function ClearFabricDll() {
    $('#ddlTypelist').val(0).trigger('change');
    $('#ddlComplist').val(0).trigger('change');
    $('#ddlFablist').val(0).trigger('change');
    $('#ddlGreylist').val(0).trigger('change');
    $('#ddlFinishlist').val(0).trigger('change');
    $('#ddlPrintlist').val(0).trigger('change');
    $('#txtGMS').val('');
    $('#btnfabricadd').show();
    $('#btnfabricupdate').hide();

}

function ClearEmbilshDll() {
    $('#ddlembItemlist').val(0).trigger('change');
    $('#ddlEmblish').val(0).trigger('change');

    $('#btnemblishmentadd').show();
    $('#btnemblishmentupdate').hide();

}

function Close() {
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
}

function GetUomCall(ID) {
    debugger;
    $.ajax({
        url: "/Trims/GetUombyItem/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.Value;

            if (tableload != undefined) {
                //$('#txtuomid').val(tableload.UomId);
                $('#ddlUOMlist').val(tableload.UomId).trigger('change');
            }
        }
    });
}

function Rolecheck() {
    debugger;
    $.ajax({
        url: "/Role/CheckRolebyId",
        data: JSON.stringify({ roleid: Roleid, menuid: Menuid, submenuid: Submenuid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].AddFlg == 1) {
                //if (obj[0].AddFlg == 1) {
                rightsflg = 1;
                menurights();
                // }
            }
            else {
                rightsflg = 0;
                menurights();
            }
        }
    });
}
function menurights() {
    debugger;
    switch (Menuid) {
        case 2438:
            addstyle();
            break;
        case 1473:
            addseason();
            break;
        case 1481:
            addcurrency();
            break;
        case 2437:
            addsize();
            break;
        case 2436:
            addcolor();
            break;
        case 2435:
            additem();
            break;
    }
    //if (Menuid == 2438) {
    //    addstyle();
    //}
    //if (Menuid == 1473) {
    //    addseason();
    //}
    //if (Menuid == 1481) {
    //    addcurrency();
    //}
    //if (Menuid == 2437) {
    //    addsize();
    //}
    //if (Menuid == 2436) {
    //    addcolor();
    //}
    //if (Menuid == 2435) {
    //    additem();
    //}  
}

function additem() {
    debugger;
    if (rightsflg == 1) {
        if ($('#ddlstyle').val() == 0) {
            alert('Please Select any Style..');
            return true;
        }
        else {
            AddStyleid = $('#ddlstyle').val();
        }
        $('#ItemID').val("");
        $('#ItmName').val("");
        // $('#ddlitemgroup').empty();
        $('#ddlItmitemtype').val(itmtype);
        $('#Descript').val("");
        //$('#base').val("");
        //$('#sec').val("");
        //$('#pur').val("");
        $('#cgst').val("");
        $('#igst').val("");
        $('#sgst').val("");
        $('#Rate').val("");
        $('#Color').val("");
        $('#HSNCODE').val("");


        $('#ItmStatus').val("");


        $('#ItemID').css('border-color', 'lightgrey');
        $('#ddlitemgroup').css('border-color', 'lightgrey');
        $('#ddlItmitemtype').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#Descript').css('border-color', 'lightgrey');
        $('#ItmStatus').css('border-color', 'lightgrey');
        $('#base').css('border-color', 'lightgrey');
        $('#sec').css('border-color', 'lightgrey');
        $('#pur').css('border-color', 'lightgrey');
        $('#cgst').css('border-color', 'lightgrey');
        $('#igst').css('border-color', 'lightgrey');
        $('#sgst').css('border-color', 'lightgrey');
        $('#Rate').css('border-color', 'lightgrey');
        $('#Color').css('border-color', 'lightgrey');
        $('#HSNCODE').css('border-color', 'lightgrey');


        //$('#tbody').DataTable().destroy();

        LoadItemGroupDDL("#ddlitemgroup");
        LoadUomDDL("#base,#sec,#pur");

        $("#myModal6").modal('show');
    }
    else {
        alert("You don't have rights...");

    }
}
function addsize() {
    debugger;
    if (rightsflg == 1) {
        $('#SizeID').val("");
        $('#SzName').val("");
        $('#seqno').val("");
        $('#ddlitemtype').val(0);
        $('#SzStatus').val("");
        $('#actualsize').val("");
        $('#lookup').val("");


        $('#SizeID').css('border-color', 'lightgrey');
        $('#seqno').css('border-color', 'lightgrey');
        $('#ddlitemtype').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#Status').css('border-color', 'lightgrey');
        $('#actualsize').css('border-color', 'lightgrey');
        $('#lookup').css('border-color', 'lightgrey');
        $("#myModal4").modal('show');
    }
    else {
        alert("You don't have rights...");

    }
}
function addcolor() {
    debugger;
    if (rightsflg == 1) {
        $('#ColorID').val("");
        $('#colorcode').val("");
        $('#colorname').val("");
        $('#pantone').val("");
        $('#Colorno').val("");
        $('#lookup').val("");
        // $('#coloroth').val("");
        $('#ClrStatus').val("");


        $('#ColorID').css('border-color', 'lightgrey');
        $('#ddlcolorgroup').css('border-color', 'lightgrey');
        $('#colorcode').css('border-color', 'lightgrey');
        $('#colorname').css('border-color', 'lightgrey');
        $('#pantone').css('border-color', 'lightgrey');
        $('#Colorno').css('border-color', 'lightgrey');
        $('#lookup').css('border-color', 'lightgrey');
        // $('#coloroth').css('border-color', 'lightgrey');
        $('#ClrStatus').css('border-color', 'lightgrey');
        $("#myModal5").modal('show');
    }
    else {
        alert("You don't have rights...");

    }
}
//Add Data Function 
function ItmAdd() {
    var res = Itmvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#ItmStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    //var groupdropdown = $('#ddlitemgroup');

    var ItemObj = {
        Itemid: $('#ItemID').val(),
        ItemName: $('#ItmName').val(),
        ItemGroupId: $('#ddlitemgroup').val(),
        //ItemTypeName: $('#ddlitemtype').val(),
        ItemTypeName: $("#ddlItmitemtype option:selected").text(),
        Description: $('#Descript').val(),
        BasicUnit: $('#base').val(),
        SecUnit: $('#sec').val(),
        PurUnit: $('#pur').val(),
        IsActive: ischecked,
        CGST: $('#cgst').val(),
        SGST: $('#sgst').val(),
        IGST: $('#igst').val(),
        rate: $('#Rate').val(),
        colornum: $('#Color').val(),
        HSNCODE: $('#HSNCODE').val(),
        itemcat: "P"
    };
    LoadingSymb();
    $.ajax({
        url: "/Item/Add",
        data: JSON.stringify(ItemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                alert('Given Item is Already Available...');
                return true;
            }
            else {

                $('#myModal6').modal('hide');
                alert('Data Saved Successfully');
                $('#ddlcoloritem').empty();
                fngetitembystyle(AddStyleid);

            }
            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function SzAdd() {
    var res = Szvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#SzStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var SizeObj = {
        SizeId: $('#SizeID').val(),
        SizeName: $('#SzName').val(),
        SeqNo: $('#seqno').val(),
        // ItemType: $('#ddlitemtype').val(),
        ItemType: $("#ddlitemtype option:selected").text(),
        IsActive: ischecked,
        LookUp: $('#lookup').val(),
        ActualSize: $('#actualsize').val()
    };
    LoadingSymb();
    $.ajax({
        url: "/Size/Add",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                alert('Given Size is Already Available...');
                return true;
            }
            else {

                alert('Data Saved Successfully');
                $('#myModal4').modal('hide');
                LoadGSizeDDL("#ddlsize");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function ClrAdd() {
    var res = clrvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#ClrStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var ColorObj = {
        ColorId: $('#ColorID').val(),
        ColorCode: $('#colorcode').val(),
        ColorName: $('#colorname').val(),
        Pantone: $('#pantone').val(),
        ColorGroupId: $('#ddlcolorgroup').val(),
        ColorNo: $('#Colorno').val(),
        Lookup: $('#lookup').val(),
        //ColorOth: $('#coloroth').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        type: "POST",
        url: "/ColorMaster/Add",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ColorObj),
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                alert('Given Color is Already Available...');
                return true;
            }
            else {
                alert('Data Saved Successfully');
                $('#myModal5').modal('hide');
                LoadColorDDL('#ddlcombo');
            }


            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Validation using jquery
function Itmvalidate() {
    debugger;
    var isValid = true;
    if ($('#ItmName').val().trim() == "") {
        $('#ItmName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ItmName').css('border-color', 'lightgrey');
    }

    if ($('#ddlitemgroup').val() == 0) {
        $('#ddlitemgroup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlitemgroup').css('border-color', 'lightgrey');
    }
    if ($('#ddlItmitemtype').val() == 0) {
        $('#ddlItmitemtype').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlItmitemtype').css('border-color', 'lightgrey');
    }

    if ($('#pur').val() == 0) {
        $('#pur').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#pur').css('border-color', 'lightgrey');
    }
    if ($('#sec').val() == 0) {
        $('#sec').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#sec').css('border-color', 'lightgrey');
    }
    if ($('#base').val() == 0) {
        $('#base').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#base').css('border-color', 'lightgrey');
    }
    return isValid;
}
function Szvalidate() {
    var isValid = true;
    if ($('#SzName').val().trim() == "") {
        $('#SzName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SzName').css('border-color', 'lightgrey');
    }
    //if ($('#actualsize').val().trim() == "") {
    //    $('#actualsize').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#actualsize').css('border-color', 'lightgrey');
    //}
    return isValid;
}
function clrvalidate() {
    debugger;
    var isValid = true;
    if ($('#colorname').val() == "") {
        $('#colorname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#colorname').css('border-color', 'lightgrey');
    }


    return isValid;
}
