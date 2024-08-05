var Gp = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var Type = '';
var superuser = 0;
var GUserid = 0;
$(document).ready(function () {
    debugger;
    GUserid = $("#hdnUserid").data('value');
    superuser = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();

    var fill = localStorage.getItem('PurchaseOrderApprovalFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }

  
    ListOrRefNo();
    ListPStyle();
    ListPoNo();
    ListSupplierNo();
    LoadCompanyDDL("#ddlMCompany");
   
    $('#MSplId').hide();

    $("#selectall").change(function () {
        debugger;
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
});

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

function TypeOrder(val) {
    if (Type == '' || val == 'Pending') {
        Type = 'PENDING';
       
    }
    else {
        Type = 'APPROVED';
    }

    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
}

function LoadPurchaseOrderAdd() {
    debugger;
    PMID = 0;

    var OrderType = $("input[name='MOType']:checked").val();

    var CompId = $('#ddlMCompany').val();

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
        window.location.href = "/PurchaseOrderAdd/PurchaseOrderAddIndex?PMasId=" + PMID + "=&OrderType=" + OTy + "=&CompId=" + CompId;
    } else if (OrderType == "G") {


        var OType = $('input[name="MOType"]:checked').attr('value');
        var PType = $('input[name="PoType"]:checked').attr('value');
        var LorI = $('input[name="MLocal"]:checked').attr('value');
        var Mode = 0;
        var PoMasId = 0;
        var StyRowID = 0;
        window.location.href = "/PurchaseOrderEntry/PurchaseOrderEntryIndex?StyleRowId=" + StyRowID + "=&OrderType=" + OType + "=&PurType=" + PType + "=&CompId=" + CompId + "=&PMasId=" + PoMasId + "=&Mode=" + Mode + "=&LocalImport=" + LorI;



    } else if (OrderType == "S") {
        var OTy = S;
        window.location.href = "/PurchaseOrderAdd/PurchaseOrderAddIndex?PMasId=" + PMID + "=&OrderType=" + OrderType + "=&CompId=" + CompId;
    }


}


function List() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
    //ListOrderRefNo();
    ListOrRefNo();
}


function getbyAddID(Id) {
    debugger;

    POID = Id;
    var Mode = 1;
    var MStyRowID = 0;
    var TypeF =Type;

    var OType = $('input[name="MOType"]:checked').attr('value');
    var PType = $('input[name="PoType"]:checked').attr('value');

    var CompId = 0;
    window.location.href = "/PurchaseOrderEntry/PurchaseOrderEntryIndex?StyleRowId=" + MStyRowID + "=&OrderType=" + OType + "=&PurType=" + PType + "=&CompId=" + CompId + "=&PurMasId=" + POID + "=&Mode=" + Mode + "=&TypeA=" + TypeF;

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
    debugger;
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
    LoadMainGrid();
    ListOrRefNo();
}
function RadioPClick() {

    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrRefNo();
}


function CMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();

}

function SMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
}

function SuppMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
}

function OMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
}

function POMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
}
function REFMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
}
function RadioMBClick() {
    $('#tOMbody').DataTable().destroy();

    var OType = $('input[name="MOType"]:checked').attr('value');

    if (OType != 'R') {
        $('#MSplId').hide();
        LoadMainGrid();
    } else {
        $('#MSplId').show();
        LoadMainGrid();
    }

}

function RadioMAClick() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
    // ListOrRefNo();
}

function RadioMLClick() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
}

function LoadMainGrid() {

    debugger;

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


    var CompId = $('#ddlMCompany').val();
    var StyId = $('#ddlMStyle').val();
    var SuppId = $('#ddlMSupplier').val();
    var POId = $('#ddlMPoNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var LType = $('input[name="MLocal"]:checked').attr('value');
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="PoType"]:checked').attr('value');
    if (Type == '') {
        Type = 'PENDING';

    }
    var TypeO = Type;

    if (Type == 'PENDING') {
        $('#lblmainlist').text('Pending List');
    } else {
        $('#lblmainlist').text('Approved List');
    }



    if (superuser == "superuser") {
        var ToApp = 0;
    } else {
        var ToApp = GUserid;
    }


    var menufilter = OrdNo + ',' + RefNo + ',' + SuppId + ',' + CompId + ',' + POId + ',' + StyId + ',' + LType + ',' + OType + ',' + POType + ',' + FDate + ',' + TDate + ',' + Gp + ',' + TypeO + ',' + ToApp;
    localStorage.setItem('PurchaseOrderApprovalFilter', menufilter);



    $.ajax({
        url: "/PurchaseOrderMain/GetPurMainAppDetails",
        data: JSON.stringify({ OrderNo: OrdNo, RefNo: RefNo, SupplierId: SuppId, companyid: CompId, pur_ord_id: POId, StyleId: StyId, LocalImport: LType, Purchase_Type: OType, Purchase_ItemType: POType, FrmDate: FDate, ToDate: TDate, MDecType: Gp, Type: TypeO, ToApprove: ToApp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tOMbody').DataTable({
                data: dataSet,
                scrollY: 200,
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
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tOMbody').DataTable();

                $('#tOMbody tbody').on('click', 'tr', function () {
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

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadMainGridFromBack() {
    debugger;
    var fill = localStorage.getItem('PurchaseOrderApprovalFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[9]);
    $('#txtToDate').val(fillobj[10]);

    if (fillobj[6] == 'I') {
        $('#I').prop('checked', true);
    } else {
        $('#L').prop('checked', true);
    }
    if (fillobj[7] == 'B') {
        $('#optB').prop('checked', true);
    } else if (fillobj[7] == 'S') {
        $('#optS').prop('checked', true);
    } else if (fillobj[7] == 'G') {
        $('#optG').prop('checked', true);
    } else if (fillobj[7] == 'R') {
        $('#optR').prop('checked', true);
    }


    if (fillobj[8] == '') {
        $('#optAAL').prop('checked', true);
    } else if (fillobj[8] == 'Y') {
        $('#optAY').prop('checked', true);
    } else if (fillobj[8] == 'A') {
        $('#optAA').prop('checked', true);
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

    if (Type == fillobj[12]) {
        $('#lblmainlist').text('Pending List');
    } else {
        $('#lblmainlist').text('Approved List');
    }


    $.ajax({
        url: "/PurchaseOrderMain/GetPurMainAppDetails",
        data: JSON.stringify({ OrderNo: fillobj[0], RefNo: fillobj[1], SupplierId: fillobj[2], companyid: fillobj[3], pur_ord_id: fillobj[4], StyleId: fillobj[5], LocalImport: fillobj[6], Purchase_Type: fillobj[7], Purchase_ItemType: fillobj[8], FrmDate: fillobj[9], ToDate: fillobj[10], MDecType: fillobj[11], Type: fillobj[12], ToApprove: fillobj[13] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {


            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tOMbody').DataTable({
                data: dataSet,
                scrollY: 200,
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
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tOMbody').DataTable();

                $('#tOMbody tbody').on('click', 'tr', function () {
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

                $(ddlMSupplier).empty();

                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
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


/////////////////Purchase Cnacel
function PurCancel() {

    var Prg = "PurCan";
    Gp = Prg;

    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();

}

function PurOrder() {

    var Prg = "PurOrd";
    Gp = Prg;

    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();

}

function backtomain() {

    $('#myModal2').modal('hide');
}
///////////////////////