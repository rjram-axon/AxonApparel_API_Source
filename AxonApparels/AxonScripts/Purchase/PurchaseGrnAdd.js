var PAddItemList = [];
var POrdID = 0;
var PurAgnInd = 0;
var DCompid = 0

var MainList_barcode = [];
var MainList_barcodeScanList = [];

$(document).ready(function () {
    debugger;



    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }
    var ptype = queryvalue[5];
    var OMType = queryvalue[3];


    //if (ptype == "Y") {
    //    $('#optAL').attr('disabled', true);
    //    $('#optAA').attr('disabled', true);
    //    $('#optAY').show();
    //    $('input:radio[name="AIType"][value="Y"]').prop('checked', true);
    //} else if (ptype == "A") {
    //    $('#optAL').attr('disabled', true);
    //    $('#optAY').attr('disabled', true);
    //    $('#optAA').show();
    //    $('input:radio[name="AIType"][value="A"]').prop('checked', true);
    //} else {
    //    $('#optAL').show();
    //    $('#optAY').attr('disabled', true);
    //    $('#optAA').attr('disabled', true);
    //    $('input:radio[name="AIType"][value="L"]').prop('checked', true);
    //}


    if (OMType == "G") {
        $('#optAB').attr('disabled', true);
        $('#optAS').attr('disabled', true);
        $('#optAR').attr('disabled', true);
        $('input:radio[name="AOType"][value="G"]').prop('checked', true);
    }
    else if (OMType == "B") {
        $('#optAB').attr('disabled', false);
        $('#optAS').attr('disabled', true);
        $('#optAR').attr('disabled', true);
        $('#optAG').attr('disabled', true);
        $('input:radio[name="AOType"][value="B"]').prop('checked', true);
    }
    else if (OMType == "S") {
        $('#optAB').attr('disabled', true);
        $('#optAS').attr('disabled', false);
        $('#optAR').attr('disabled', true);
        $('#optAG').attr('disabled', true);
        $('input:radio[name="AOType"][value="S"]').prop('checked', true);
    }
    else if (OMType == "R") {
        $('#optAB').attr('disabled', true);
        $('#optAS').attr('disabled', true);
        $('#optAR').attr('disabled', false);
        $('#optAG').attr('disabled', true);
        $('input:radio[name="AOType"][value="R"]').prop('checked', true);
    }
    //else {
    //    $('#optAB').show();
    //    $('#optAS').show();
    //    $('#optAR').show();
    //    $('#optAG').attr('disabled', true);     
    //    //$('input:radio[name="AIType"][value="L"]').prop('checked', true);
    //}


    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    ValiPOApp = $("#hdnPurAppid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCompanyDDL("#ddlACompany");
    LoadSupplierDDL("#ddlASupplier");
   // LoadAddGridDetails();

    LoadAddGridDetails_Barcode();

    LoadOrdNoAddDetails();
    LoadRefNoAddDetails();
    $('#SplId').hide();


    $('#tblPAddItemdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblPAddItemdetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblPAddItemdetails').dataTable().fnGetData(row);
     

        var PoId = data.PurOrdId;
        

        LoadMainOrderDetails(PoId);
   


    });

    $("#tblPAddItemdetails").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < PAddItemList.length; d++) {
                    if (PAddItemList[d].PurOrdId == val) {
                        PAddItemList[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < PAddItemList.length; d++) {
                    if (PAddItemList[d].PurOrdId == val) {
                        PAddItemList[d].CheckLoad = "N";
                    }

                }
            }

        });

    });


});


$(document).ready(function () {
    $('input').bind("enterKey", function (e) {
        // alert("Enter key pressed");

        BarcodeScan();
    });
    $('input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});

function BarcodeScan() {
    debugger;

    var txtBarcodeScan_PurOrdNo = $('#txtBarcodeValue').val();

    for (var i = 0; i < MainList_barcodeScanList.length; i++) {

        if (MainList_barcodeScanList[i].PurOrdNo == txtBarcodeScan_PurOrdNo) {
            return;
        }
    }

    jQuery.each(MainList_barcode, function (i, val) {

        if (val.PurOrdNo == txtBarcodeScan_PurOrdNo) {

            var det = {

                PurOrdId: val.PurOrdId,
                PurOrdNo: val.PurOrdNo,
                OrdDate: val.OrdDate,
                Amount: val.Amount
            }
            MainList_barcodeScanList.push(det);

            loadPAddItemTable_Barcode(MainList_barcodeScanList);
            $('#txtBarcodeValue').val("");

            return;
        }

        // return (val.processorder);
    });

    //for (var i = 0; i < MainList_barcode.length; i++) {

    //    if (MainList_barcode[i].PurOrdNo == txtBarcodeScan_PurOrdNo) {

    //        var det = {
    //            PurOrdId: MainList_barcode[i].PurOrdId,
    //            PurOrdNo: MainList_barcode[i].PurOrdNo,
    //            OrdDate: MainList_barcode[i].OrdDate,
    //            Amount: MainList_barcode[i].Amount
    //        }
    //        MainList_barcodeScanList.push(det);

    //        loadPAddItemTable_Barcode(MainList_barcodeScanList);
    //        $('#txtBarcodeValue').val("");

    //        break;
    //    }
    //}
}

function LoadAddGridDetails_Barcode() {
    debugger;

    //var CompId = $('#ddlACompany').val();


    //var CompId = $('#ddlMCompany').val();


    var CompId = $('#ddlACompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlACompany').val();
    }

    var SupId = $('#ddlASupplier').val();

    var OType = $('input[name="AOType"]:checked').attr('value');
    var PType = $('input[name="AIType"]:checked').attr('value');
    var LoI = $('input[name="ALType"]:checked').attr('value');
    var PuType = "";
    //if (PType == '') {
    //    PType = 'L';
    //}
    if (PType == "A") {
        PuType = "ACCESSORY"
    } else if (PType == "Y") {
        PuType = "YARN"
    }

    var OrdNo = "";
    var ONo = $('select#ddlAOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }
    $.ajax({
        url: "/GRNAdd/GetAddLoaddetails_Barcode",  //GetDataOrderDetails_Barcode
        data: JSON.stringify({ LorI: LoI, pur_type: OType, Pur_ItemType: PType, OrderNo: OrdNo, RefNo: RefNo, supplierid: SupId, companyid: CompId, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var List = result.Value;

            if (ValiPOApp == 'Y') {

                for (var i = 0; i < List.length; i++) {

                    if (List[i].IsApproved == "Y") {
                        PAddItemList.push(List[i]);
                    }
                }
                MainList_barcode = PAddItemList;
            }
            else {

                MainList_barcode = result;
            }

            //if (ValiPOApp == 'Y') {
            //    PAddItemList = $.grep(result, function (e) {
            //        return e.IsApproved == 'Y';
            //    });
            //    // loadPAddItemTable(PAddItemList);

            //    MainList_barcode = PAddItemList;
            //}
            //else {
            //    PAddItemList = result;
            //    //   loadPAddItemTable(PAddItemList);

            //    MainList_barcode = PAddItemList;
            //}
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadPAddItemTable_Barcode(PAddItemList) {
    debugger;
    $('#tblPAddItemdetails').DataTable().destroy();

    $('#tblPAddItemdetails').DataTable({

        data: PAddItemList,
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

            { title: "PurOrdId", data: "PurOrdId", "visible": false },
            { title: "Purchase Order No", data: "PurOrdNo" },
            {
                title: "Order Date", data: "OrdDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Order Amount", data: "Amount" },
            //{

            //    title: "Include", data: "PurOrdId",
            //    render: function (data) {

            //        return '<input type="checkbox" id="txtPurOrdId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

            //    },
            //},

                   {
                       title: "Include", data: "PurOrdId",
                       render: function (data, type, row) {

                           return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked value=' + data + ' >';


                       }
                   },
        ]
    });

    var table = $('#tblPAddItemdetails').DataTable();
    $("#tblPAddItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPAddItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadAddGridDetails() {
    debugger;

    //var CompId = $('#ddlACompany').val();


    //var CompId = $('#ddlMCompany').val();


    var CompId = $('#ddlACompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlACompany').val();
    }

    var SupId = $('#ddlASupplier').val();

    var OType = $('input[name="AOType"]:checked').attr('value');
    var PType = $('input[name="AIType"]:checked').attr('value');
    var LoI = $('input[name="ALType"]:checked').attr('value');
    var PuType = "";
    //if (PType == '') {
    //    PType = 'L';
    //}
    if (PType == "A") {
        PuType = "ACCESSORY"
    } else if (PType == "Y") {
        PuType = "YARN"
    }

    var OrdNo = "";
    var ONo = $('select#ddlAOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }
    $.ajax({
        url: "/GRNAdd/GetAddLoaddetails",
        data: JSON.stringify({ LorI: LoI, pur_type: OType, Pur_ItemType: PType, OrderNo: OrdNo, RefNo: RefNo, supplierid: SupId, companyid: CompId, PurIndType: PurAgnInd }),
        type: "POST", 
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (ValiPOApp == 'Y') {
                PAddItemList = $.grep(result, function (e) {
                    return e.IsApproved == 'Y';
                });
                loadPAddItemTable(PAddItemList);
            }
            else {
                PAddItemList = result;
                loadPAddItemTable(PAddItemList);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPAddItemTable(PAddItemList) {
    debugger;
    $('#tblPAddItemdetails').DataTable().destroy();

    $('#tblPAddItemdetails').DataTable({

        data: PAddItemList,
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

            { title: "PurOrdId", data: "PurOrdId", "visible": false },
            { title: "Purchase Order No", data: "PurOrdNo" },
            {
                title: "Order Date", data: "OrdDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Order Amount", data: "Amount" },
            //{

            //    title: "Include", data: "PurOrdId",
            //    render: function (data) {

            //        return '<input type="checkbox" id="txtPurOrdId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

            //    },
            //},

                   {
                       title: "Include", data: "PurOrdId",
                       render: function (data, type, row) {

                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                           
                       }
                   },
        ]
    });

    var table = $('#tblPAddItemdetails').DataTable();
    $("#tblPAddItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPAddItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function myfunc(Val) {

    POrdID = POrdID + "," + Val;

}
function LoadOrdNoAddDetails() {

    var OType = $('input[name="AOType"]:checked').attr('value');
    var PType = $('input[name="AIType"]:checked').attr('value');
    var LoI = $('input[name="ALType"]:checked').attr('value');
    var PuType = "";
    if (PType == "A") {
        PuType = "ACCESSORY"
    } else if (PType == "Y") {
        PuType = "YARN"
    }


    $.ajax({
        url: "/GRNAdd/GetOrderNo",
        data: JSON.stringify({ LorI: LoI, Pur_ItemType: PType, pur_type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(data, function () {
                    $(ddlAOrderNo).append($('<option></option>').text(this.OrderNo));
                });


            }
        }

    });
}
function LoadRefNoAddDetails() {

    var OType = $('input[name="AOType"]:checked').attr('value');
    var PType = $('input[name="AIType"]:checked').attr('value');
    var LoI = $('input[name="ALType"]:checked').attr('value');
    var PuType = "";
    if (PType == "A") {
        PuType = "ACCESSORY"
    } else if (PType == "Y") {
        PuType = "YARN"
    }


    $.ajax({
        url: "/GRNAdd/GetRefNo",
        data: JSON.stringify({ LorI: LoI, Pur_ItemType: PType, pur_type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlARefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlARefNo).append($('<option></option>').text(this.RefNo));
                });


            }
        }

    });
}
function RadioABClick() {
    $('#SplId').hide();
    $('#tblPAddItemdetails').DataTable().destroy();
    LoadAddGridDetails();
}
function RadioAIClick() {
    $('#tblPAddItemdetails').DataTable().destroy();
    LoadAddGridDetails();
}
function RadioALClick() {
    $('#tblPAddItemdetails').DataTable().destroy();
    LoadAddGridDetails();
}


function LoadSplOrder() {
    $('#SplId').show();
    $('#tblPAddItemdetails').DataTable().destroy();
    LoadAddGridDetails();
}

function LoadADetails() {
    $('#tblPAddItemdetails').DataTable().destroy();
    LoadAddGridDetails();
}

function LoadGrnEntryDetails() {
    debugger;
    var list = [];

    for (var j = 0; j < PAddItemList.length; j++) {
        if (PAddItemList[j].CheckLoad == "Y") {

            POrdID = POrdID + "," + PAddItemList[j].PurOrdId;

            list.push(PAddItemList[j]);
        }
    }


    if (list.length == 0) {
        alert('Please select checkboxes for any one row..');
        return true;
    }

    var CompId = $('#ddlACompany').val();

    if (CompId == 0) {
        $('#ddlACompany').siblings(".select2-container").css('border', '1px solid red');
        return true;
    } else {
        $('#ddlACompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    var SuppId = $('#ddlASupplier').val();

    if (SuppId == 0) {
        $('#ddlASupplier').siblings(".select2-container").css('border', '1px solid red');
        return true;
    } else {
        $('#ddlASupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    var AOType = $('input[name="AOType"]:checked').attr('value');
    var AItemType = $('input[name="AIType"]:checked').attr('value'); 
    var Mode = 0;
    var PoMasId = 0;
    var Id = 0;
    window.location.href = "/GRNEntry/GRNEntryIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;

}


function LoadMainOrderDetails(Pid) {

    debugger;

    $.ajax({
        url: "/GRNAdd/LoadMainOrderdet",
        data: JSON.stringify({ pid: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var ord = "";
            var ref = "";
            var sty = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].OrderNo;
                var re = obj[t].RefNo;
                var st = obj[t].style;
                if (ord == '') {
                    ord = od;
                }
                else {
                    ord = ord + "," + od;
                }

                if (ref == '') {
                    ref = re;
                }
                else {
                    ref = ref + "," + re;
                }

                if (sty == '') {
                    sty = st;
                }
                else {
                    sty = sty + "," + st;
                }

            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            $('#txtmainstyle').val(sty);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}