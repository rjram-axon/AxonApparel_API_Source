var Gp = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var PurAgnInd = 0;
var PurAppId = 0;
var Rpt = '';
var PurOrdId = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkStyle = true;
var ChkPONo = true;
var ChkComp = false;
var DPurApp = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    PurAppId = $("#hdnPurAppid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    DPurApp = $("#hdnPurAppid").data('value');
    getDate();
    var fill = localStorage.getItem('PurchaseOrderGeneralMainFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }


    //LoadMainGrid();
    //ListOrRefNo();
    //ListPStyle();
    //ListPoNo();
    LoadSupplierSetup();
    //LoadSupplierDDL("#ddlMSupplier");
    //ListSupplierNo();
    LoadCompanyDDL("#ddlMCompany");

    $('#MSplId').hide();

    $("#selectall").change(function () {

        if (this.checked == true) {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', true);
            });
        } else {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', false);
            });
        }
    });
    $('#tOMbody').on('click', 'tr', function (e) {


        var table = $('#tOMbody').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tOMbody').dataTable().fnGetData(row);


        var ItmId = data[0];

        LoadMainOrderDetails(ItmId);



    });
});


function LoadMainOrderDetails(Pid) {

    $.ajax({
        url: "/PurchaseOrderMain/LoadMainOrderdet",
        data: JSON.stringify({ prodid: Pid }),
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
                var st = obj[t].Style;
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

function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}


function LoadPurchaseOrderAdd() {
    debugger;
    PMID = 0;

    var OrderType = $("input[name='MOType']:checked").val();
    var PurType = $("input[name='PoType']:checked").val();
    var SuppId = $('#ddlMSupplier option:selected').val();
    var Supp = $('#ddlMSupplier option:selected').text();
    var CompId = $('#ddlMCompany').val();
    if (SuppId == 0) {
        //alert("Please Select the Supplier..")
        var msg = 'Please Select the Supplier...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (CompId == 0) {
        //alert("Please Select the Company..")
        var msg = 'Please Select the Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (OrderType == "B") {

        var OTy = "B";
        window.location.href = "/PurchaseOrderAdd/PurchaseOrderAddIndex?PMasId=" + PMID + "=&OrderType=" + OTy + "=&CompId=" + CompId + "=&PurType=" + PurType;
    } else if (OrderType == "G") {

        debugger;
        var OType = $('input[name="MOType"]:checked').attr('value');
        var PurType = $('input[name="PoType"]:checked').attr('value');
        var LorI = $('input[name="MLocal"]:checked').attr('value');
        var Mode = 0;
        var PoMasId = 0;
        var StyRowID = 0;
        window.location.href = "/PurchaseOrderEntry/PurchaseOrderEntryIndex?StyleRowId=" + StyRowID + "=&OrderType=" + OType + "=&PurType=" + PurType + "=&CompId=" + CompId + "=&PMasId=" + PoMasId + "=&Mode=" + Mode + "=&LocalImport=" + LorI + "=&Nom=" + '' + "=&Local=" + LorI + "=&Supid=" + SuppId + "=&Supp=" + Supp;

        //var OTy = "G";
        //window.location.href = "/PurchaseGeneralAdd/PurchaseGeneralAddIndex?PMasId=" + PMID + "=&OrderType=" + OTy + "=&CompId=" + CompId + "=&PurType=" + PurType;

    } else if (OrderType == "S") {
        var OTy = "S";
        window.location.href = "/PurchaseOrderAdd/PurchaseOrderAddIndex?PMasId=" + PMID + "=&OrderType=" + OrderType + "=&CompId=" + CompId + "=&PurType=" + PurType;
    }


}


function List() {
  //  $('#tOMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrderRefNo();
    //ListOrRefNo();
    CMainList();
}


function getbyID(Id) {


    POID = Id;
    var Mode = 1;
    var MStyRowID = 0;

    var OType = $('input[name="MOType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');

    var CompId = 0;
    window.location.href = "/PurchaseOrderEntry/PurchaseOrderEntryIndex?StyleRowId=" + MStyRowID + "=&OrderType=" + OType + "=&PurType=" + PType + "=&CompId=" + CompId + "=&PurMasId=" + POID + "=&Mode=" + Mode;

}


function getbyCAddID(Id) {
    var Mode = 0;
    window.location.href = "/PurchaseCancel/PurchaseCancelIndex?PurOrdId=" + Id + "=&OrderType=" + "=&Mode=" + Mode;
}

function getbyCEditID(Id) {
    var Mode = 1;
    window.location.href = "/PurchaseCancel/PurchaseCancelIndex?PurOrdId=" + Id + "=&OrderType=" + "=&Mode=" + Mode;
}

function getbyCDeleteID(Id) {
    var Mode = 2;
    window.location.href = "/PurchaseCancel/PurchaseCancelIndex?PurOrdId=" + Id + "=&OrderType=" + "=&Mode=" + Mode;
}

function Delete(Id) {

    POID = Id;
    var Mode = 2;
    var MStyRowID = 0;
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');
    var CompId = 0;
    window.location.href = "/PurchaseOrderEntry/PurchaseOrderEntryIndex?StyleRowId=" + MStyRowID + "=&OrderType=" + OType + "=&PurType=" + PType + "=&CompId=" + CompId + "=&PurMasId=" + POID + "=&Mode=" + Mode;

}

function RadioUClick() {

    $('#tOMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrRefNo();
    CMainList();
}
function RadioPClick() {

    $('#tOMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrRefNo();
    CMainList();
}


function CMainList() {
    //  $('#tOMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkStyle = true;
    ChkPONo = true;
    ChkComp = true;
    LoadMainGrid();

}

function SMainList() {
    //  $('#tOMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = false;
    ChkComp = false;
    LoadMainGrid();
}

function SuppMainList() {
    // $('#tOMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkPONo = true;
    ChkComp = false;
    LoadMainGrid();
}

function OMainList() {
    // $('#tOMbody').DataTable().destroy();
    debugger;
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = false;
    ChkComp = false;
    LoadMainGrid();
}

function POMainList() {
    // $('#tOMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = false;
    ChkComp = false;
    LoadMainGrid();
}
function REFMainList() {
    //  $('#tOMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkPONo = false;
    ChkComp = false;
    LoadMainGrid();
}
function RadioMBClick() {
    $('#tOMbody').DataTable().destroy();

    var OType = $('input[name="MOType"]:checked').attr('value');

    if (OType != 'R') {
        $('#MSplId').hide();
        CMainList();
        //LoadMainGrid();
        //ListOrRefNo();
        //ListPStyle();
        //ListPoNo();
        //ListSupplierNo();
    } else {
        $('#MSplId').show();
        LoadMainGrid();
        CMainList();
        //ListOrRefNo();
        //ListPStyle();
        //ListPoNo();
        //ListSupplierNo();
    }

}

function RadioMAClick() {
    // $('#tOMbody').DataTable().destroy();
    LoadSupplierSetup();

    CMainList();
    //LoadMainGrid();
    //ListOrRefNo();
    //ListPStyle();
    //ListPoNo();
    //ListSupplierNo();
    // ListOrRefNo();
}

function RadioMLClick() {
    //$('#tOMbody').DataTable().destroy();
    CMainList();
    //LoadMainGrid();
    //ListOrRefNo();
    //ListPStyle();
    //ListPoNo();
    //ListSupplierNo();
}

function LoadMainGrid() {

    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }


    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var StyId = $('#ddlMStyle').val();
    var SuppId = $('#ddlMSupplier').val();
    var POId = $('#ddlMPoNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    var AppOType = $('input[name="AppOType"]:checked').attr('value');
    if (POType == 'L') {
        POType = '';
    }

    if (ChkComp) {
        OrdNo = "";
        RefNo = "";
        JobNo = "";
        SuppId = 0;
        StyId = 0;
        POId = 0;
    }

    if (DtChk) {

        OrdNo = "";
        RefNo = "";
        JobNo = "";
        SuppId = 0;
        StyId = 0;
        POId = 0;
    }

    var menufilter = OrdNo + ',' + RefNo + ',' + SuppId + ',' + CompId + ',' + POId + ',' + StyId + ',' + LType + ',' + OType + ',' + POType + ',' + FDate + ',' + TDate + ',' + Gp + ',' + PurAgnInd + ',' + AppOType;
    localStorage.setItem('PurchaseOrderGeneralMainFilter', menufilter);


    $.ajax({
        url: "/PurchaseOrderMain/GetPurMainDetails",
        data: JSON.stringify({ OrderNo: OrdNo, RefNo: RefNo, SupplierId: SuppId, companyid: CompId, pur_ord_id: POId, StyleId: StyId, LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate, MDecType: Gp, PurIndType: PurAgnInd, IsApproved: AppOType }),

        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][11]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][10]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][7],
                        Supp: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });

                //$('#ddlMSupplier').empty();
                //$('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(rev, function () {
                //    $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                //});

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][8],
                        style: dataSet[i][9]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][3],
                        Poid: dataSet[i][0],
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Poid]) {
                        revdet[el.Poid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMPoNo').empty();
                $('#ddlMPoNo').append($('<option/>').val('0').text('--Select PO No--'));
                $.each(rev, function () {
                    $('#ddlMPoNo').append($('<option></option>').val(this.Poid).text(this.Pono));
                });

                return true;
            }

             var inputcount = 0;
            $('#tOMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tOMbody').DataTable().destroy();
                //var table = $('#tOMbody').DataTable();
                //var rows = table.clear().draw();
                //$('#tOMbody').DataTable().rows.add(dataSet);
                //$('#tOMbody').DataTable().columns.adjust().draw();
            }
           // else {


                $('#tOMbody').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,
                    columns: [
                             { title: "PurOrdId", "visible": false },
                             { title: "Company" },
                             { title: "Supplier" },
                             { title: "Po No" },
                             { title: "Date" },
                             { title: "Reference" },
                             { title: "Po Type" },
                              { title: "Supplierid", "visible": false },
                             { title: "Styleid", "visible": false },
                             { title: "Style", "visible": false },
                             { title: "OrderNo", "visible": false },
                             { title: "Refno", "visible": false },
                              { title: "Approved" },
                             { title: "Action" },




                    ]

                });
           // }

            var table = $('#tOMbody').DataTable();
            $("#tOMbody tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tOMbody tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });


            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][11]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

            }


            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][10]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

            }


            if (ChkSupplier) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][7],
                        Supp: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });

                //$('#ddlMSupplier').empty();
                //$('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(rev, function () {
                //    $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                //});

            }

            if (ChkStyle) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][8],
                        style: dataSet[i][9]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

            }

            if (ChkPONo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][3],
                        poid: dataSet[i][0]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.poid]) {
                        revdet[el.poid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMPoNo').empty();
                $('#ddlMPoNo').append($('<option/>').val('0').text('--Select PO No--'));
                $.each(rev, function () {
                    $('#ddlMPoNo').append($('<option></option>').val(this.poid).text(this.Pono));
                });

            }


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMainGridFromBack() {

    var fill = localStorage.getItem('PurchaseOrderGeneralMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[9]);
    $('#txtToDate').val(fillobj[10]);

    if (fillobj[6] == 'L') {
        $('#L').prop('checked', true);
    } else {
        $('#I').prop('checked', true);
    }

    if (fillobj[7] == 'B') {
        $('#optB').prop('checked', true);
    } else if (fillobj[7] == 'S') {
        $('#optS').prop('checked', true);
    }
    else if (fillobj[7] == 'G') {
        $('#optG').prop('checked', true);
    }
    else if (fillobj[7] == 'R') {
        $('#optR').prop('checked', true);
    }
    if (fillobj[13] == 'Y') {
        $('#optaapp').prop('checked', true);
    } else {
        $('#optapen').prop('checked', true);
    }


    if (fillobj[0] == "undefined") {
        fillobj[0] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }

    $.ajax({
        url: "/PurchaseOrderMain/GetPurMainDetails",
        data: JSON.stringify({ OrderNo: fillobj[0], RefNo: fillobj[1], SupplierId: fillobj[2], companyid: fillobj[3], pur_ord_id: fillobj[4], StyleId: fillobj[5], LocalImport: fillobj[6], Purchase_Type: fillobj[7], Purchase_ItemType: fillobj[8], FrmDate: fillobj[9], ToDate: fillobj[10], MDecType: fillobj[11], PurIndType: fillobj[12], IsApproved: fillobj[13] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

       
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][11]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][10]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][7],
                        Supp: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Suppid]) {
                        revdet[el.Suppid] = true;
                        rev.push(el);
                    }
                });

                

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][8],
                        style: dataSet[i][9]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][3],
                        Poid: dataSet[i][0],
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Poid]) {
                        revdet[el.Poid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMPoNo').empty();
                $('#ddlMPoNo').append($('<option/>').val('0').text('--Select PO No--'));
                $.each(rev, function () {
                    $('#ddlMPoNo').append($('<option></option>').val(this.Poid).text(this.Pono));
                });

              

            var inputcount = 0;
            $('#tOMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tOMbody').DataTable().destroy();
                //var table = $('#tOMbody').DataTable();
                //var rows = table.clear().draw();
                //$('#tOMbody').DataTable().rows.add(dataSet);
                //$('#tOMbody').DataTable().columns.adjust().draw();
            }
            // else {


            $('#tOMbody').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                bSort: false,
                columns: [
                         { title: "PurOrdId", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Po No" },
                         { title: "Date" },
                         { title: "Reference" },
                         { title: "Po Type" },
                          { title: "Supplierid", "visible": false },
                         { title: "Styleid", "visible": false },
                         { title: "Style", "visible": false },
                         { title: "OrderNo", "visible": false },
                         { title: "Refno", "visible": false },
                          { title: "Approved" },
                         { title: "Action" },




                ]

            });
            // }

            var table = $('#tOMbody').DataTable();
            $("#tOMbody tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tOMbody tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });


          

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function ListPoNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');


    if (POType == "L") {
        POType = "";
    } else {
        POType = POType;
    }
    $.ajax({
        url: "/PurchaseOrderMain/GetPoNo",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMPoNo).empty();

                //Po No
                $(ddlMPoNo).append($('<option/>').val('0').text('--Select PoNo--'));
                $.each(data, function () {
                    $(ddlMPoNo).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                });


            }
        }

    });
}



function ListOrRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseOrderMain/GetOrderRefNo",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();
                //$(ddlMStyle).empty();
                //$(ddlMSupplier).empty();
                //$(ddlMPoNo).empty();

                //OrdNo
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));

                    // $(buyerDDL).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });
                ////Style
                //$(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                //$.each(data, function () {
                //    $(ddlMStyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                //});
                ////Supplier
                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(data, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                //});
                ////Po No
                //$(ddlMPoNo).append($('<option/>').val('0').text('--Select PoNo--'));
                //$.each(data, function () {
                //    $(ddlMPoNo).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                //});
                //cmp
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(data, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

            }
        }

    });
}

function ListPStyle() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    $.ajax({
        url: "/PurchaseOrderMain/GetOrderStyle",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMStyle).empty();

                $(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlMStyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                });
                ////Supplier
                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(data, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                //});
                ////Po No
                //$(ddlMPoNo).append($('<option/>').val('0').text('--Select PoNo--'));
                //$.each(data, function () {
                //    $(ddlMPoNo).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                //});
                //cmp
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(data, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

            }
        }

    });
}

function ListSupplierNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="Local"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');

    if (POType == "L") {
        POType = "";
    } else {
        POType = POType;
    }

    $.ajax({
        url: "/PurchaseOrderMain/GetSupplier",
        data: JSON.stringify({ LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                //$(ddlMSupplier).empty();

                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(data, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                //});
                ////Supplier
                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(data, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                //});
                ////Po No
                //$(ddlMPoNo).append($('<option/>').val('0').text('--Select PoNo--'));
                //$.each(data, function () {
                //    $(ddlMPoNo).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
                //});
                //cmp
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(data, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

            }
        }

    });
}


/////////////////Purchase Cnacel
function PurCancel() {

    var Prg = "PurCan";
    Gp = Prg;

  //  $('#tOMbody').DataTable().destroy();
    LoadMainGrid();

}

function PurOrder() {

    var Prg = "PurOrd";
    Gp = Prg;

   // $('#tOMbody').DataTable().destroy();
    LoadMainGrid();

}


function Pur_ord_Print(ID) {

    PurOrdId = ID;
    LoadPurEditDetails(ID);

    //
    //return true;
}

function LoadPurEditDetails(ID) {

    $.ajax({
        url: "/PurchaseOrderEntry/GetPurEditDetails",
        data: JSON.stringify({ pur_ord_id: ID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var Approve = '';

            if (obj != undefined) {
                Approve = obj[0]["IsApproved"];
            }
            if (PurAppId == 'Y' && Approve == 'Y') {
                Rpt = 'A';
            }
            else if (PurAppId == 'Y' && Approve == 'N') {
                Rpt = 'P';
            }
            else {
                Rpt = 'A';
            }
            Repid = ID;
            //$('#myModal2').modal('show');

            //docname = "PURCHASE ORDER";
            //GenerateReportItem(docname, Rpt);

            if (DPurApp == "Y") {

                if (Approve == "Y") {

                    $('#myModal2').modal('show');

                    docname = "PURCHASE ORDER";
                    GenerateReportItem(docname, Rpt);
                } else {
                    //alert("PO not Approved,Cannot Print..");
                    var msg = "PO not Approved,Cannot Print...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    return true;
                }
            } else {


                $('#myModal2').modal('show');

                docname = "PURCHASE ORDER";
                GenerateReportItem(docname, Rpt);
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function GenerateReportItem(name) {

    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            //document.getElementById('sbTwo');
            var obje = result.Value;
            repobj = obje;
            var obj = $.grep(repobj, function (r) {
                return r.optionid != 13280;
            });


            $.each(obj, function () {
                $("#sbTwo").append($("<option></option>").val(this.optionid).html(this.option));

            });

            i = 0, size = obj.length;
            for (i; i < size; i++) {
                //$("#sbTwo").multiselect("widget").find(":checkbox[value='" + obj[i][optionid] + "']").attr("checked", "checked");
                if (obj[i].optionvalue == true) {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", true);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", true);
                    //$("#sbTwo").multiselect("refresh");
                }
                else {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", false);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", false);
                }
            }
        }
    });
}



function SubReport() {

    debugger;


    var TType = $('input[name="PoType"]:checked').attr('value');

    //if (TType == "Y") {
    //    var FType = $('input[name="FabType"]:checked').attr('value');

    //    if (FType == "G") {
    //        var src = '../ReportInline/Purchase/PurchaseOrderGreyInlineReport/PurchaseOrderGreyInlineReport.aspx?';
    //        src = src + "PurOrdId=" + PurOrdId;
    //        var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //        $("#divReport").html(iframe);
    //        window.open("../ReportInline/Purchase/PurchaseOrderGreyInlineReport/PurchaseOrderGreyInlineReport.aspx?PurOrdId=" + PurOrdId);

    //    } else if (FType == "F") {
    //        var src = '../ReportInline/Purchase/PurchaseOrderFinishInlineReport/PurchaseOrderFinishReportInline.aspx?';
    //        src = src + "PurOrdId=" + PurOrdId;
    //        var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //        $("#divReport").html(iframe);
    //        window.open("../ReportInline/Purchase/PurchaseOrderFinishInlineReport/PurchaseOrderFinishReportInline.aspx?PurOrdId=" + PurOrdId);
    //    } else {

    //        //var src = '../ReportInline/Purchase/PurchaseOrderInlineReport/PurchaseOrderReportInline.aspx?';
    //        //src = src + "PurOrdId=" + PurOrdId;
    //        //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //        //$("#divReport").html(iframe);
    //        //window.location.href = "../ReportInline/Purchase/PurchaseOrderInlineReport/PurchaseOrderReportInline.aspx?PurOrdId=" + PurOrdId;


    //        ////window.location.href = "../ReportInline/Purchase/PurchaseOrdInlineReport/PurchaseOrdReportInline.aspx?PurOrdId=" + Repid + "&SecQty=" + p[0] + "&Rate=" + p[1] + "&Amnt=" + p[2] + "&Paydet=" + p[3] + "&Baseqty=" + p[4] + "&Annexure=" + p[5] + "&Splitup=" + p[6] + "&Terms=" + p[7] + "&Style=" + p[8] + "&Mfr=" + p[9] + "&Itmcode=" + p[10] + "&Refno=" + p[11] + "&Barcode=" + p[12] + "&Reqdate=" + p[13] + "&Gst=" + p[14] + "&Original=" + p[15] + "&Duplicate=" + p[16] + "&Triplicate=" + p[17] + "&Merchcpy=" + p[18] + "&Mdcpy=" + p[19];
    //        ////window.location.href = "../ReportInline/Purchase/PurchaseOrderInlineReport/PurchaseOrderReportInline.aspx?PurOrdId=" + Repid + "&SecQty=" + p[0] + "&Rate=" + p[1] + "&Amnt=" + p[2] + "&Paydet=" + p[3] + "&Baseqty=" + p[4] + "&Annexure=" + 0 + "&Splitup=" + p[6] + "&Terms=" + p[7] + "&Style=" + p[8] + "&Mfr=" + p[9] + "&Itmcode=" + p[10] + "&Refno=" + p[11] + "&Barcode=" + p[12] + "&Reqdate=" + p[13] + "&Gst=" + p[14] + "&Original=" + p[15] + "&Duplicate=" + p[16] + "&Triplicate=" + p[17] + "&Merchcpy=" + p[18] + "&Mdcpy=" + p[19] + "&RptOpt=" + Rpt;

    //        var arr = [];
    //        $('#sbTwo :selected').each(function (i, sel) {
    //            arr.push($(sel).val());
    //        });
    //        var res = [];
    //        var p = [];
    //        for (var r = 0; r < repobj.length; r++) {
    //            res.push(repobj[r].optionid);
    //            p.push(0);
    //        }
    //        for (var y = 0; y < arr.length; y++) {
    //            for (var f = 0; f < res.length; f++) {
    //                if (arr[y] == res[f]) {
    //                    p[f] = 1;
    //                }
    //            }
    //        }

    //        //window.location.href = "../ReportInline/Purchase/PurchaseOrdInlineReport/PurchaseOrdReportInline.aspx?PurOrdId=" + Repid + "&SecQty=" + p[0] + "&Rate=" + p[1] + "&Amnt=" + p[2] + "&Paydet=" + p[3] + "&Baseqty=" + p[4] + "&Annexure=" + p[5] + "&Splitup=" + p[6] + "&Terms=" + p[7] + "&Style=" + p[8] + "&Mfr=" + p[9] + "&Itmcode=" + p[10] + "&Refno=" + p[11] + "&Barcode=" + p[12] + "&Reqdate=" + p[13] + "&Gst=" + p[14] + "&Original=" + p[15] + "&Duplicate=" + p[16] + "&Triplicate=" + p[17] + "&Merchcpy=" + p[18] + "&Mdcpy=" + p[19];
    //        window.open("../ReportInline/Purchase/PurchaseOrderInlineReport/PurchaseOrderReportInline.aspx?PurOrdId=" + Repid + "&SecQty=" + p[0] + "&Rate=" + p[1] + "&Amnt=" + p[2] + "&Paydet=" + p[3] + "&Baseqty=" + p[4] + "&Annexure=" + 0 + "&Splitup=" + p[6] + "&Terms=" + p[7] + "&Style=" + p[8] + "&Mfr=" + p[9] + "&Itmcode=" + p[10] + "&Refno=" + p[11] + "&Barcode=" + p[12] + "&Reqdate=" + p[13] + "&Gst=" + p[14] + "&Original=" + p[15] + "&Duplicate=" + p[16] + "&Triplicate=" + p[17] + "&Merchcpy=" + p[18] + "&Mdcpy=" + p[19] + "&RptOpt=" + Rpt);

    //    }
    //}
    //else if (TType == "A") {
    //    var src = '../ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderTrimsInlineReport.aspx?';
    //    src = src + "PurOrdId=" + PurOrdId;
    //    var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //    $("#divReport").html(iframe);
    //    window.open("../ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderTrimsInlineReport.aspx?PurOrdId=" + PurOrdId);

    //}
    //else {

        var src = '../ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderTrimsInlineReport.aspx?';
        src = src + "PurOrdId=" + PurOrdId;
        var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
        $("#divReport").html(iframe);

        var arr = [];
        $('#sbTwo :selected').each(function (i, sel) {
            arr.push($(sel).val());
        });
        var res = [];
        var p = [];
        for (var r = 0; r < repobj.length; r++) {
            res.push(repobj[r].optionid);
            p.push(0);
        }
        for (var y = 0; y < arr.length; y++) {
            for (var f = 0; f < res.length; f++) {
                if (arr[y] == res[f]) {
                    p[f] = 1;
                }
            }
        }
        var RptTyp = 'W';
        var LoginUnit = $("#hdnLoginUnit").data('value');
        window.open("../ReportInline/Purchase/PurchaseOrderTrimsInlineReport/PurchaseOrderTrimsInlineReport.aspx?PurOrdId=" + PurOrdId + "&SecQty=" + p[0] + "&Rate=" + p[1] + "&Amnt=" + p[2] + "&Paydet=" + p[3] + "&Baseqty=" + p[4] + "&Annexure=" + 0 + "&Splitup=" + p[6] + "&Terms=" + p[7] + "&Style=" + p[8] + "&Mfr=" + p[9] + "&Itmcode=" + p[10] + "&Refno=" + p[11] + "&Barcode=" + p[12] + "&Reqdate=" + p[13] + "&Gst=" + p[14] + "&Original=" + p[15] + "&Duplicate=" + p[16] + "&Triplicate=" + p[17] + "&Merchcpy=" + p[18] + "&Mdcpy=" + p[19] + "&RptOpt=" + Rpt + "&RptTyp=" + RptTyp + "&LoginUnit=" + LoginUnit);

    //}
}



function backtomain() {

    $('#myModal2').modal('hide');
}


function LoadSupplierSetup() {
    debugger;
    var setup = $("#hdnSupplierSetup").data('value');

    var PurType = $("input[name='PoType']:checked").val();

    if (setup == 'True') {
        var Processid = 0;
        var typ = PurType
        if (PurType == '') {
            typ = 'L';
        }
        $.ajax({
            url: "/Supplier/GetSupplierSetup",
            data: JSON.stringify({ Processid: Processid, Type: typ }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result;
                if (obj.length > 0) {
                    var data = obj;
                    $(ddlMSupplier).empty();
                    $(ddlMSupplier).empty();
                    $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(data, function () {
                        $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.SupplierName));
                    });
                }
            }
        });
    } else {

        LoadSupplierDDL("#ddlMSupplier");
    }

}

///////////////////////

