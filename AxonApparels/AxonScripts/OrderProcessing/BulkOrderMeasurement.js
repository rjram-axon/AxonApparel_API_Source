
var ItemList = [];
var SizeItemList = [];
var SizeItemListSave = [];
var Guserid = 0;
var UserName = 0;
var StyleRowId = 0;
var mod = 0;
var BMasId = 0;
var compList = [];
var compListSave = [];
var GItemId = 0;
var rowindex = -1;
var index = 0;
var GCompId = 0;
var OrdNo = 0;
var MeaMasId = 0;
var TGarmItemId = 0;
var TComItemId = 0;
var type = 'B';
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');


    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRowId = queryvalue[1];
    Mod = queryvalue[3];
    type = queryvalue[5];
    getDate();
    LoadComponentDDL("#ddlComponent");
    getbyID(StyleRowId);

    $(document).ready(function () {
        $("#tblEntryCompItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
            index = (this.rowIndex) - 1;
        });
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


$(document).ready(function () {
    debugger;


    $('#btncomponentadd').click(function () {


        if (GItemId == 0) {
            //alert("Please Select Garment Item then Proceed..");
            var msg = 'Please Select Garment Item then Proceed...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }

        var d = $("#ddlComponent option:selected").text();
        if (compList.length > 0) {
            for (var q = 0; q < compList.length; q++) {
                if (compList[q].MeasureName == d && compList[q].ITEMID == GItemId) {
                    //alert('Must be different Component...');
                    var msg = 'Must be different Component...';
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    fnClearCompControls();
                    return true;

                }
            }
        }


        //Different Garment Item with component
        //


        var leng = 0;

        var isAllValid = true;


        if ($('#ddlComponent').val() == "0") {

            $('#ddlComponent').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlComponent').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtLook').val() == "") {
            isAllValid = false;
            $('#txtLook').css('border-color', 'Red');
        }
        else {
            $('#txtLook').css('border-color', 'lightgrey');
        }

        if ($('#txtTolerance').val() == "") {
            isAllValid = false;
            $('#txtTolerance').css('border-color', 'Red');
        }
        else {
            $('#txtTolerance').css('border-color', 'lightgrey');
        }
        if ($('#txtIncreament').val() == "") {
            isAllValid = false;
            $('#txtIncreament').css('border-color', 'Red');
        }
        else {
            $('#txtIncreament').css('border-color', 'lightgrey');
        }

        if (compList.length == 0) {
            leng = 1;

        }
        else {
            leng = compList.length + 1;

        }

        if (isAllValid) {

            GCompId = $('#ddlComponent').val();

            var compListObj = {
                MeasureName: $("#ddlComponent option:selected").text(),
                CompItemId: $('#ddlComponent').val(),
                Increment: $('#txtIncreament').val(),
                Tolerance: $('#txtTolerance').val(),
                Lookup: $('#txtLook').val(),
                ITEMID: GItemId,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            compList.push(compListObj);
            loadcomponentTable(compListObj);


            compListSave.push(compListObj);

            fnClearCompControls();

            LoadGarmentSizeItemDetails(StyleRowId, OrdNo);


        }
    });

    $(document).on('click', '.btncompedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = compList.slice(rowindex);

        $('#ddlComponent').val(currentro12[0]['CompItemId']).trigger('change');
        $('#txtIncreament').val(currentro12[0]['Increment']);
        $('#txtTolerance').val(currentro12[0]['Tolerance']);
        $('#txtLook').val(currentro12[0]['Lookup']);


        $('#btncomponentadd').hide();
        $('#btncomponentupdate').show();
    });

    $('#btncomponentupdate').click(function () {
        debugger;

        var currentrowsel1 = compList.slice(rowindex);
        var ncomps = currentrowsel1[0]['CompSlNo'];



        var isAllValid = true;


        if ($('#ddlComponent').val() == "0") {


            $('#ddlComponent').siblings(".select2-container").css('border', '1px solid red');
            isAllValid = false;
        }
        else {
            $('#ddlComponent').siblings('span.error').css('visibility', 'hidden');

        }

        if ($('#txtIncreament').val() == "") {
            isAllValid = false;
            $('#txtIncreament').css('border-color', 'Red');
        }
        else {
            $('#txtIncreament').css('border-color', 'lightgrey');
        }
        if ($('#txtTolerance').val() == "") {
            isAllValid = false;
            $('#txtTolerance').css('border-color', 'Red');
        }
        else {
            $('#txtTolerance').css('border-color', 'lightgrey');
        }
        if ($('#txtLook').val() == "") {
            isAllValid = false;
            $('#txtLook').css('border-color', 'Red');
        }
        else {
            $('#txtLook').css('border-color', 'lightgrey');
        }

        if (isAllValid) {
            var currentrowsel = compList.slice(rowindex);

            currentrowsel[0]['CompItemId'] = $("#ddlComponent").val();
            currentrowsel[0]['MeasureName'] = $("#ddlComponent option:selected").text();

            currentrowsel[0]['Increment'] = $("#txtIncreament").val();
            currentrowsel[0]['Tolerance'] = $("#txtTolerance").val();
            currentrowsel[0]['Lookup'] = $("#txtLook").val();

            var comps = currentrowsel[0]['CompSlNo'];
            compList[rowindex] = currentrowsel[0];

            loadcomponentTable(compList);

            $('#btncomponentupdate').hide();
            $('#btncomponentadd').show();


            fnClearCompControls();



        };
    });
    $(document).on('click', '.btncompremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrowsel = compList.slice(rowindex);
        var compsn = currentrowsel[0]['CompItemId'];
        compList.splice(rowindex, 1);
        document.getElementById("tblEntryCompItemdetails").deleteRow(rowindex + 1);



    });

});

function fnClearCompControls() {

    $('#ddlComponent').val('0').trigger('change');

    $('#txtIncreament').val('');
    $('#txtTolerance').val('');
    $('#txtLook').val('');


}

function getbyID(ID) {
    debugger;

    $.ajax({
        url: "/OrderMeasurement/GetOrderMeasuDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {

                $('#txtOrderNo').val(obj[0]["OrderNo"]);
                $('#txtBuyer').val(obj[0]["Buyer"]);
                $('#txtRefNo').val(obj[0]["Style"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#txtBuyerOrderDate').val(moment(obj[0]["OrderDate"]).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(obj[0]["MeasureDate"]).format('DD/MM/YYYY'));
                OrdNo = obj[0]["OrderNo"];
                BMasId = obj[0]["Buy_Ord_MasId"];
                MeaMasId = obj[0]["MeasureMasId"];
                var chkinst = obj[0]["ChkIns"];
                if (chkinst == "Y") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }
                if (Mod == 0) {
                    LoadGarmentItemDetails(ID, OrdNo);
                    LoadGarmentSizeItemDetails(ID, OrdNo);
                } else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnSave').hide();
                    $('#btnUpdate').show();
                    LoadGarmentItemDetails(ID, OrdNo);
                    //
                    LoadGarmentCompEditItemDetails(MeaMasId);
                    LoadGarmentSizeEditItemDetails(MeaMasId);
                } else {
                    $('#btnDelete').show();
                    $('#btnSave').hide();
                    $('#btnUpdate').hide();
                    LoadGarmentItemDetails(ID, OrdNo);
                    LoadGarmentSizeEditItemDetails(MeaMasId)
                    LoadGarmentCompEditItemDetails(MeaMasId)
                }

            }

            GetOrdMesurImg(ID);
            $('#myModal1').modal('show');

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

            ItemList = result;
            loadItemTable(ItemList);
            TGarmItemId = ItemList[0].ITEMID;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadGarmentCompEditItemDetails(ID) {
    debugger;

    $.ajax({
        url: "/OrderMeasurement/LoadGarCompEditItemDetails",
        data: JSON.stringify({ MeasureMasId: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            compList = result;
            loadcomponentTable(compList);
            compListSave = result;
            TComItemId = compListSave[0].CompItemId;

            var cccolorempty = [];
            cccolorempty = compListSave;

            cccolorempty = $.grep(cccolorempty, function (v) {
                return (v.ITEMID == TGarmItemId);
            });

            compList = cccolorempty;
            loadcomponentTable(compList);

            //loadcomponentTable(compList);




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function GetOrdMesurImg(Id) {
    debugger;
    $.ajax({
        url: "/OrderMeasurement/GetOrderMeasuImg",
        data: JSON.stringify({ Id: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var list = result.Value;
            Imglist = [];
            $.each(list, function (d) {
                var obj = {
                    FilePath: list[d].FilePath,
                    FileID: list[d].FileID,
                    FileName: list[d].FileName,
                    ImgTitle: list[d].Imgtitle,
                }
                Imglist.push(obj);
            });
            nametxt = Imglist;

            addses();
           
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function DownloadFile(FilePath) {
    debugger;
    var url = "/Mail/DownloadFile?filePath=" + FilePath;

    window.location = url;

}
function addses() {
    var SizeObj = {
        Buyordimg: Imglist
    };
    $.ajax({
        url: "/StyleEntry/AddSession",
        data: JSON.stringify(SizeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            nametxt = GetFilelist();
            GetFiles();
        },
        error: function (errormessage) {
            // alert(errormessage.responseText);
        }
    });
}
function LoadGarmentSizeItemDetails(ID, OrdNo) {
    debugger;

    $.ajax({
        url: "/OrderMeasurement/LoadGarSizeItemDetails",
        data: JSON.stringify({ StyleRowid: ID, OrderNo: OrdNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            obj = result;
            var dup = [];

            for (var t = 0; t < obj.length; t++) {
                obj[t].CompItemId = GCompId;
                obj[t].ITEMID = GItemId;
                obj[t].Qty = 0;

            }

            if (compListSave.length > 0) {
                if (SizeItemListSave.length == 0) {
                    SizeItemListSave = obj;
                    loadSizeItemTableSave(SizeItemListSave);
                    SizeItemList = obj;
                    loadSizeItemTable(SizeItemList);

                }
                else {
                    for (var t = 0; t < obj.length; t++) {
                        for (var d = 0; d < SizeItemListSave.length; d++) {
                            if (SizeItemListSave[d].CompItemId == obj[t].CompItemId && SizeItemListSave[d].ITEMID == obj[t].ITEMID) {
                                // SizeItemListSave[d].GSM = obj[t].GSM;

                                dup.push(SizeItemListSave[d]);
                            }
                        }
                    }

                    if (dup.length > 0) {
                        loadSizeItemTableSave(SizeItemListSave);
                    }
                    else {

                        for (var d = 0; d < obj.length; d++) {
                            SizeItemListSave.push(obj[d]);
                        }
                        loadSizeItemTableSave(SizeItemListSave);

                    }

                    SizeItemList = $.grep(SizeItemListSave, function (r) {
                        return r.CompItemId == GCompId && r.ITEMID == GItemId;
                    });
                    loadSizeItemTable(SizeItemList);
                }
            } else {
                SizeItemList = obj;
                loadSizeItemTable(SizeItemList);
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadGarmentSizeEditItemDetails(MeaMasId) {
    debugger;

    $.ajax({
        url: "/OrderMeasurement/LoadGarSizeEditItemDetails",
        data: JSON.stringify({ MeasureMasId: MeaMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SizeItemList = result;
            SizeItemListSave = result;
            loadSizeItemTable(SizeItemList);
            loadSizeItemTableSave(SizeItemListSave);


            var sccolorempty = [];
            sccolorempty = SizeItemListSave;

            sccolorempty = $.grep(sccolorempty, function (v) {
                return (v.ITEMID == TGarmItemId && v.CompItemId == TComItemId);
            });

            SizeItemList = sccolorempty;
            loadSizeItemTable(SizeItemList);

            //obj = result;
            //var dup = [];

            //for (var t = 0; t < obj.length; t++) {
            //    obj[t].CompItemId = GCompId;
            //    obj[t].ITEMID = GItemId;
            //    obj[t].Qty = 0;

            //}

            //if (compListSave.length > 0) {
            //    if (SizeItemListSave.length == 0) {
            //        SizeItemListSave = obj;
            //        loadSizeItemTableSave(SizeItemListSave);
            //        SizeItemList = obj;
            //        loadSizeItemTable(SizeItemList);

            //    }
            //    else {
            //        for (var t = 0; t < obj.length; t++) {
            //            for (var d = 0; d < SizeItemListSave.length; d++) {
            //                if (SizeItemListSave[d].CompItemId == obj[t].CompItemId && SizeItemListSave[d].ITEMID == obj[t].ITEMID) {
            //                    // SizeItemListSave[d].GSM = obj[t].GSM;

            //                    dup.push(SizeItemListSave[d]);
            //                }
            //            }
            //        }

            //        if (dup.length > 0) {
            //            loadSizeItemTableSave(SizeItemListSave);
            //        }
            //        else {

            //            for (var d = 0; d < obj.length; d++) {
            //                SizeItemListSave.push(obj[d]);
            //            }
            //            loadSizeItemTableSave(SizeItemListSave);

            //        }

            //        SizeItemList = $.grep(SizeItemListSave, function (r) {
            //            return r.CompItemId == GCompId && r.ITEMID == GItemId;
            //        });
            //        loadSizeItemTable(SizeItemList);
            //    }
            //} else {
            //    SizeItemList = obj;
            //    loadSizeItemTable(SizeItemList);
            //}


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadItemTable(ItemList) {

    $('#tblEntryItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryItemdetails').DataTable({

        data: ItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "ItemId", data: "ITEMID", "visible": false },
            { title: "Item", data: "GarmentItem" },

        ]
    });



    var table = $('#tblEntryItemdetails').DataTable();
    $("#tblEntryItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function loadSizeItemTable(SizeItemList) {

    $('#tblEntrySizeItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntrySizeItemdetails').DataTable({

        data: SizeItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "MeasureDetId", data: "MeasureDetid", "visible": false },
            { title: "MeasureMasId", data: "MeasureMasId", "visible": false },
            //{ title: "Measurement Name", data: "MeasureName" },
           { title: "Size", data: "Size" },
            // {
            //     title: "Look Up", data: "Lookup",
            //     render: function (data) {
            //         return '<input type="text" id="txtQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

            //     },
            // },

            //{
            //    title: "Tolerance", data: "Tolerance",
            //    render: function (data) {
            //        return '<input type="text" id="txtTol" class="calctol form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

            //    },
            //},
            //{
            //    title: "Increament", data: "Increment",
            //    render: function (data) {

            //        return '<input type="text" id="txtInc" class="calcins form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

            //    },
            //},
             {
                 title: "Qty", data: "Qty",
                 render: function (data) {

                     return '<input type="text" id="txtPurQty" class="loadpqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },

               { title: "SizeId", data: "SizeId", "visible": false },
                { title: "gitemid", data: "ITEMID", "visible": false },
                 { title: "citemid", data: "CompItemId", "visible": false },
        ]
    });



    var table = $('#tblEntrySizeItemdetails').DataTable();
    $("#tblEntrySizeItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntrySizeItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}


function loadSizeItemTableSave() {

    $('#tblEntrySizeItemdetailsSave').DataTable().destroy();
    debugger;

    var table = $('#tblEntrySizeItemdetailsSave').DataTable({

        data: SizeItemListSave,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "MeasureDetId", data: "MeasureDetid" },
            { title: "MeasureMasId", data: "MeasureMasId" },

           { title: "Size", data: "Size" },

             {
                 title: "Qty", data: "Qty",
                 render: function (data) {

                     return '<input type="text" id="txtPurQty" class="loadpqty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },

               { title: "SizeId", data: "SizeId" },
                    { title: "gitemid", data: "ITEMID" },
                 { title: "citemid", data: "CompItemId" },
        ]
    });




}

function Close() {
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1 + "=&type=" + type;
}

function loadcomponentTable(compListObj) {
    debugger;
    $('#tblEntryCompItemdetails').DataTable().destroy();


    $('#tblEntryCompItemdetails').DataTable({
        data: compList,
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
             { title: "CompItemId", data: "CompItemId", "visible": false },
            { title: "Component Name", data: "MeasureName" },
            { title: "Look Up", data: "Lookup" },
            { title: "Tolerance", data: "Tolerance" },
            { title: "Increament", data: "Increment" },


               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncompremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblEntryCompItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryCompItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });




}

$(document).ready(function () {

    $('#tblEntryItemdetails').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblEntryItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryItemdetails').dataTable().fnGetData(row);

        var table = $('#tblEntryItemdetails').DataTable();

        GItemId = data.ITEMID;

        var colorempty = [];
        colorempty = compListSave;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ITEMID == GItemId);
        });

        compList = colorempty;
        loadcomponentTable(compList);

        if (compListSave.length > 0) {
            var scolorempty = [];
            scolorempty = SizeItemListSave;

            scolorempty = $.grep(scolorempty, function (v) {
                return (v.ITEMID == GItemId);
            });

            SizeItemList = scolorempty;
            loadSizeItemTable(SizeItemList);
        }



        if (compList.length > 0) {
            var yarn = [];
            yarn = SizeItemListSave;
            if (yarn.length > 0) {
                csnl = SizeItemListSave[0].CompItemId;
                csgl = SizeItemListSave[0].ITEMID;
                yarn = $.grep(yarn, function (v) {
                    return (v.CompItemId == csnl && v.ITEMID == GItemId);
                });

                SizeItemList = yarn;
                loadSizeItemTable(SizeItemList);




            }
        }

    });
});


$(document).on('keyup', '.loadpqty', function (e) {
    debugger;

    var table = $('#tblEntrySizeItemdetails').DataTable();
    var sid = table.row($(this).parents('tr')).data()["SizeId"];
    var cmpid = table.row($(this).parents('tr')).data()["CompItemId"];
    var gitemid = table.row($(this).parents('tr')).data()["ITEMID"];
    var val = $(this).val();


    $.each(SizeItemList, function () {
        if (this.SizeId == sid && this.CompItemId == cmpid && this.ITEMID == gitemid) {
            this.ITEMID = GItemId;
            this.CompItemId = GCompId;
            this.Qty = val;
        }
    });


    $.each(SizeItemListSave, function () {
        if (this.SizeId == sid && this.CompItemId == cmpid && this.ITEMID == gitemid) {
            this.Qty = val;
            this.CompItemId = GCompId;
            this.ITEMID = GItemId;
        }
    });
    loadSizeItemTableSave(SizeItemListSave);


});


$(document).ready(function () {

    $('#tblEntryCompItemdetails').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblEntryCompItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryCompItemdetails').dataTable().fnGetData(row);

        var table = $('#tblEntryCompItemdetails').DataTable();

        var CmpId = data.CompItemId;
        var GIteID = data.ITEMID;

        var pcolorempty = [];
        pcolorempty = SizeItemListSave;

        pcolorempty = $.grep(pcolorempty, function (v) {
            return (v.CompItemId == CmpId && v.ITEMID == GIteID);
        });

        SizeItemList = pcolorempty;
        loadSizeItemTable(SizeItemList);


    });
});


function Add() {

    debugger;
    var isAct = 0;
    var imgdet = [];
    if (nametxt.length > 0) {
        for (var d = 0; d < nametxt.length; d++) {

            var res = [];
            res = nametxt[d].FilePath.split("/");

            var obj = {
                Imgpath: nametxt[d].FilePath,
                Imgtitle: res[2],//title[d],
                Order_no: $('#txtOrderNo').val()// $('#ddlOrderNo option:selected').text()
            }
            imgdet.push(obj);
        }
    }
    if (compListSave.length == 0) {
        //alert("Please Enter the Component Details..");
        var msg = 'Please Enter the Component Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var opchk = [];
    for (var y = 0; y < SizeItemListSave.length; y++) {
        if (SizeItemListSave[y].Qty > 0) {
            opchk.push(SizeItemListSave[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one qty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = "Y";
        }
        else {
            checkbox_value += "off";
            isAct = "N";
        }
    });

    var objPurSubmit = {

        OrderNo: $('#txtOrderNo').val(),
        BuyMasId: BMasId,
        MeasureDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        StyleRowid: StyleRowId,
        Remarks: $('#txtRemark').val(),
        AMEND: "N",
        ChkIns: isAct,
        BulkMeaDet: compListSave,
        BulkMeaSizeDet: SizeItemListSave,
        OrderMesurmentImage: imgdet,

    };
    debugger;
    $("#btnSave").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OrderMeasurement/Add",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                //alert("Data Saved Sucessfully");
                var msg = 'Data Saved Sucessfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                AddUserEntryLog('SalesManagement', 'Add OrderMeasurment', 'ADD', $('#txtOrderNo').val());
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1 + "=&type=" + type;
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

    debugger;
    var isAct = 0;
    if (compListSave.length == 0) {
        //alert("Please Enter the Component Details..");
        var msg = 'Please Enter the Component Details...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }

    var opchk = [];
    for (var y = 0; y < SizeItemListSave.length; y++) {
        if (SizeItemListSave[y].Qty > 0) {
            opchk.push(SizeItemListSave[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one qty...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    var imgdet = [];
    if (nametxt.length > 0) {
        for (var d = 0; d < nametxt.length; d++) {

            var res = [];
            res = nametxt[d].FilePath.split("/");

            var obj = {
                Imgpath: nametxt[d].FilePath,
                Imgtitle: res[2],//title[d],
                Order_no: $('#txtOrderNo').val()// $('#ddlOrderNo option:selected').text()
            }
            imgdet.push(obj);
        }
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#Status').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = "Y";
        }
        else {
            checkbox_value += "off";
            isAct = "N";
        }
    });
    var objPurSubmit = {

        OrderNo: $('#txtOrderNo').val(),
        BuyMasId: BMasId,
        MeasureDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        StyleRowid: StyleRowId,
        Remarks: $('#txtRemark').val(),
        AMEND: "N",
        ChkIns: isAct,
        MeasureMasId: MeaMasId,
        BulkMeaDet: compListSave,
        BulkMeaSizeDet: SizeItemListSave,
        OrderMesurmentImage: imgdet,
    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OrderMeasurement/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            if (result.Value == true) {
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                
                AddUserEntryLog('SalesManagement', 'Add OrderMeasurment', 'UPDATE', $('#txtOrderNo').val());
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1 + "=&type=" + type;


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
    debugger;

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDelete").attr("disabled", true);


        var objConPurDelete = {

            OrderNo: $('#txtOrderNo').val(),
            BuyMasId: BMasId,
            MeasureDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
            StyleRowid: StyleRowId,
            Remarks: $('#txtRemark').val(),
            AMEND: "N",
            ChkIns: "N",
            MeasureMasId: MeaMasId,
            BulkMeaDet: compListSave,
            BulkMeaSizeDet: SizeItemListSave,
        };
        LoadingSymb();
        $.ajax({
            url: "/OrderMeasurement/Delete",
            data: JSON.stringify(objConPurDelete),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {
                    //alert("Data Deleted Sucessfully");
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    AddUserEntryLog('SalesManagement', 'Add OrderMeasurment', 'DELETE', $('#txtOrderNo').val());

                    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1 + "=&type=" + type;


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
}
