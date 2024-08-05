var ItemList = [];
var SItemList = [];
var values = [];
var MStyRowID = 0;
var MSplRowID = 0;
var MOrd = 0;
var MRefNo = 0;
var MStyNo = 0;
var MIG = 0;
var OT = 0;
var Chknom = 0;
var PurAgnInd = 0;
$(document).ready(function () {
    debugger;
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }
    OT = queryvalue[3];
    var cmpid = queryvalue[5];
    var ptype = queryvalue[7];
    if (ptype == "Y") {
        $('#optAAll').attr('disabled', true);
        $('#optAAcc').attr('disabled', true);
        $('#optAYarn').show();
        $('input:radio[name="PoType"][value="Y"]').prop('checked', true);
    } else if (ptype == "A") {
        $('#optAAll').attr('disabled', true);
        $('#optAYarn').attr('disabled', true);
        $('#optAAcc').show();
        $('input:radio[name="PoType"][value="A"]').prop('checked', true);
    } else {
        $('#optAAll').show();
        $('#optAYarn').attr('disabled', true);
        $('#optAAcc').attr('disabled', true);
        $('input:radio[name="PoType"][value="L"]').prop('checked', true);
    }


    LoadCompanyDDL("#ddlACompany");
    LoadBuyerDDL("#ddlABuyer");
    LoadStyle(OT);
    LoadOrderNo(OT);
    LoadMultipleItemGroupDDL("#ddlItemGroup");
    LoadSupplierDDL("#ddlASupplier");


    $('input:radio[name="OType"][value="B"]').prop('checked', true);
    //$('input:radio[name="PoType"][value="A"]').prop('checked', true);
    $('input:radio[name="Local"][value="L"]').prop('checked', true);
    $('#SplId').hide();
    $('#CListSpl').hide();
    $("#OptAGeneral").prop("disabled", true);


    $("#ddlACompany").val(cmpid);



    $("#tblItemdetails").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < ItemList.length; d++) {
                    if (ItemList[d].StyleRowId == val) {
                        ItemList[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < ItemList.length; d++) {
                    if (ItemList[d].StyleRowId == val) {
                        ItemList[d].CheckLoad = "N";
                    }

                }
            }

        });

    });
    LoadIndentOrder();
});

function LoadSplOrder() {
    $('#SplId').show();
}

function LoadOrder() {
    $('#SplId').hide();
}

function LoadSplGen() {
    $('#SplId').hide();
}
function LoadOrder() {
    $('#SplId').hide();
}
function RadioALClick() {
    LoadBSDetails();
}

function LoadBSDetails() {

    debugger;
    var CompId = $('#ddlACompany').val();
    var BuyId = $('#ddlABuyer').val();
    var StyleId = $('#ddlAStyle').val();
    var OType = $('input[name="OType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');
    var LIType = $('input[name="Local"]:checked').attr('value');
    var PuType = "";
    if (PType == "A") {
        PuType = "A"
    } else if (PType == "Y") {
        PuType = "Y"
    } else {
        PuType = "L"
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

    if (MOrd == "0") {
        var MCOrd = "";
    }
    else {
        var MCOrd = MOrd;
    }

    $.ajax({
        url: "/PurchaseOrderAdd/LoadDetails",
        data: JSON.stringify({ companyid: CompId, BuyerId: BuyId, BMasId: MCOrd, RefNo: MRefNo, StyleId: MStyNo, OType: OType, PType: PuType, LocalImport: LIType, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadItemTable(ItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}




function loadItemTable(ItemList) {

    $('#tblItemdetails').DataTable().destroy();
    debugger;

    $('#tblItemdetails').DataTable({
        // "order": [[8, "asc"]],
        data: ItemList,
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

            { title: "StyleRowID", data: "StyleRowId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            {
                title: "Order Date", data: "orddate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Department", data: "RefNo" },
            { title: "Created", data: "Buyer" },
            { title: "Unit", data: "Style" },
            //{
            //    title: "Include", data: "StyleRowId",
            //    //render: function (data) {

            //    //    return '<input type="checkbox" class="case" name="case[]" value="1" onclick="myfunc(this);"/>';

            //    //},
            //    title: "Include", data: "StyleRowId",
            //    render: function (data) {

            //        return '<input type="checkbox" id="txtStyleRowId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

            //    },
            //},

               {
                   title: "Include", data: "StyleRowId",
                   render: function (data, type, row) {

                       return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';


                   }
               },
        ]
    });
}


//function myfunc(Val) {

//    MStyRowID = MStyRowID + "," + Val;

//}

function LoadCheck() {
    debugger;

    if (Chknom == "Nom") {

        if (MIG == 0) {
            alert("Please select any one itemgroup for nominated supplier...");
            return true;

        }
    }




    var list = [];

    for (var j = 0; j < ItemList.length; j++) {
        if (ItemList[j].CheckLoad == "Y") {

            MStyRowID = MStyRowID + "," + ItemList[j].StyleRowId;

            list.push(ItemList[j]);
        }
    }


    if (list.length == 0) {
        alert('Please select checkboxes for any one row..');
        return true;
    }

    var CompId = $('#ddlACompany').val();
    var SuppId = $('#ddlASupplier').val();
    var Supp = $('#ddlASupplier option:selected').text();
    if (CompId == 0) {
        alert("Please Select the Company..")
        return true;
    }
    if (SuppId == 0) {
        alert("Please Select the Supplier..")
        return true;
    }
    var OType = $('input[name="OType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');
    var LIType = $('input[name="Local"]:checked').attr('value');
    var Mode = 0;
    var PoMasId = 0;


    window.location.href = "/PurchaseOrderEntry/PurchaseOrderEntryIndex?StyleRowId=" + MStyRowID + "=&OrderType=" + OType + "=&PurType=" + PType + "=&CompId=" + CompId + "=&PMasId=" + PoMasId + "=&Mode=" + Mode + "=&ItemGroup=" + MIG + "=&Nom=" + Chknom + "=&Local=" + LIType + "=&Supid=" + SuppId + "=&Supp=" + Supp;

}

function LoadSplDetails() {

    debugger;
    var CompId = $('#ddlACompany').val();
    var BuyId = $('#ddlABuyer').val();
    var StyleId = $('#ddlAStyle').val();
    var OType = $('input[name="OSType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');
    var PuType = "";
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
        url: "/PurchaseOrderAdd/LoadSRDetails",
        data: JSON.stringify({ companyid: CompId, BuyerId: BuyId, OrderNo: OrdNo, RefNo: RefNo, StyleId: StyleId, OType: OType, PType: PuType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SItemList = result;
            SloadItemTable(SItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}




function SloadItemTable(SItemList) {

    $('#tblSplItemdetails').DataTable().destroy();
    debugger;

    $('#tblSplItemdetails').DataTable({
        // "order": [[8, "asc"]],
        data: SItemList,

        columns: [

            { title: "SPlMasID", data: "SplMasId", "visible": false },
            { title: "Spl.Req.No", data: "SplEntryNo" },
            { title: "Job/Work/Sample", data: "job_ord_no" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            {
                title: "Include", data: "SplMasId",
                //render: function (data) {

                //    return '<input type="checkbox" class="case" name="case[]" value="1" onclick="myfunc(this);"/>';

                //},
                title: "Include", data: "SplMasId",
                render: function (data) {

                    return '<input type="checkbox" id="txtStyleRowId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfuncSpl(this.value);">';

                },
            },
        ]
    });
}

function LoadDetails() {
    var OType = $('input[name="OType"]:checked').attr('value');

    if (OType != "R") {
        $('#CList').show();
        $('#CListSpl').hide();
        LoadIndentOrder();

    } else {
        $('#CList').hide();
        $('#CListSpl').show();
        LoadSplDetails();
    }
}

function myfuncSpl(Val) {

    MStyRowID = MStyRowID + "," + Val;

}

function myOrder(Val) {

    //var foo = [];
    //$('#ddlAOrderNo :selected').each(function (i, selected) {
    //    foo[i] = $(selected).val();

    //    MOrd = MOrd + "," + foo[i];


    //});

    LoadIndentOrder();
}

function myRefNo(Val) {
    var Ref = [];
    $('#ddlARefNo :selected').each(function (i, selected) {
        Ref[i] = $(selected).text();

        MRefNo = MRefNo + "," + Ref[i];


    });
}


function myStyleNo() {
    var Sty = [];
    $('#ddlAStyle :selected').each(function (i, selected) {
        Sty[i] = $(selected).val();

        MStyNo = MStyNo + "," + Sty[i];


    });
}

function myIgroup() {
    var Ig = [];
    $('#ddlItemGroup :selected').each(function (i, selected) {
        Ig[i] = $(selected).val();

        MIG = MIG + "," + Ig[i];


    });
}

function LoadOrderNo(OT) {


    var comId = $('#ddlACompany').val();
    var OType = OT;

    $.ajax({
        url: "/PurchaseOrderAdd/GetOrderNo",
        data: JSON.stringify({ companyid: comId, OType: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAOrderNo).empty();
               // $(ddlARefNo).empty();

                //$.each(data, function () {
                //    $(ddlAOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrderNo));
                //});

                $(ddlAOrderNo).append($('<option/>').val('0').text('--Select Indent No--'));
                $.each(data, function () {
                    $(ddlAOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrderNo));
                });

                //$.each(data, function () {
                //    $(ddlARefNo).append($('<option></option>').text(this.RefNo));
                //});

            }
        }

    });

}

function LoadStyle(OT) {


    var comId = $('#ddlACompany').val();
    var OType = OT;

    $.ajax({
        url: "/PurchaseOrderAdd/GetStyleNo",
        data: JSON.stringify({ companyid: comId, OType: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAStyle).empty();
                $.each(data, function () {
                    $(ddlAStyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                });



            }
        }

    });

}

function LoadOrder() {

    var OType = $('input[name="OType"]:checked').attr('value');
    LoadOrderNo(OType);
    LoadStyle(OType);
    LoadBSDetails();
}

function LoadSplSample() {
    var OType = $('input[name="OType"]:checked').attr('value');
    LoadOrderNo(OType);
    LoadStyle(OType);
    LoadBSDetails();
}

function LoadIndentOrder() {
    var OType = $('input[name="OType"]:checked').attr('value');
    //LoadOrderNo(OType);
    // LoadStyle(OType);
    LoadBSDetailsIndent();
}

function LoadBSDetailsIndent() {

    debugger;
    var CompId = $('#ddlACompany').val();
    var BuyId = $('#ddlABuyer').val();
    var StyleId = $('#ddlAStyle').val();
    var OType = $('input[name="OType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');
    var LIType = $('input[name="Local"]:checked').attr('value');
    var PuType = "";
    if (PType == "A") {
        PuType = "A"
    } else if (PType == "Y") {
        PuType = "Y"
    } else {
        PuType = "L"
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

    if (MOrd == "0") {
        var MCOrd = "";
    }
    else {
        var MCOrd = MOrd;
    }

    $.ajax({
        url: "/PurchaseOrderAdd/LoadIndentDetails",
        data: JSON.stringify({ companyid: CompId, BuyerId: BuyId, BMasId: MCOrd, RefNo: MRefNo, StyleId: MStyNo, OType: OType, PType: PuType, LocalImport: LIType, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadItemTable(ItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function RadioNomClick() {
    debugger;
    Chknom = $('input[name="nomin"]:checked').attr('value');
}