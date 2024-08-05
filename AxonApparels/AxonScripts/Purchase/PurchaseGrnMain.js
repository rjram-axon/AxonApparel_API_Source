var Gs = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var PurAgnInd = 0;
var ItemMovementList = [];
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkDcNo = true;
var ChkPONo = true;
var ChkGRNNo = true;
var ChkComp = false;
$(document).ready(function () {
    debugger;
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    // LOADGRN();
    var fill = localStorage.getItem('PurchaseGRNMainFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }

    //LoadMainGrid();
    //ListOrderRefNo();
    //ListGrnPoNo();
    //ListGrnSupp();
    //ListGrnDc();
    //ListGrn();
    LoadCompanyDDL("#ddlMCompany");
    $('#SplId').hide();

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
    $('#tGMbody').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tGMbody').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tGMbody').dataTable().fnGetData(row);


        var ItmId = data[0];
        var GrnNo = data[5];
        LoadItemMovements(GrnNo);
        LoadMainOrderDetails(ItmId);
        LoadMainOrderStkDetails(ItmId);


    });
});


function LoadMainOrderDetails(Pid) {

    debugger;

    $.ajax({
        url: "/GRNMain/LoadMainOrderdet",
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



function LoadMainOrderStkDetails(Pid) {

    debugger;

    $.ajax({
        url: "/GRNMain/LoadMainOrderstkdet",
        data: JSON.stringify({ pid: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var trans = "";

            for (var t = 0; t < obj.length; t++) {
                var tr = obj[t].transno;

                if (trans == '') {
                    trans = tr;
                }
                else {
                    trans = trans + "," + tr;
                }



            }
            $('#txtmaintrans').val(trans);

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


function LoadGrnOrderAdd() {
    debugger;
    PGMID = 0;

    var OrderType = $("input[name='MOType']:checked").val(); 
    //var IType = "L";
    var IType = $("input[name='MIType']:checked").val();
    //if (OrderType == "B") {
    var OTy = "B";
    window.location.href = "/GRNAdd/GRNAddIndex?PGMasId=" + PGMID + "=&OrderType=" + OrderType + "=&PType=" + IType;
    // }

}
function LoadMainGrid() {

    debugger;

    if (Gs == 0) {
        Gs = "GRN";
    } else {
        Gs = Gs;
    }


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

    var DcNo = "";
    var DNo = $('select#ddlMDcNo option:selected').val();

    if (DNo == 0) {
        DcNo == "";
    }
    else {

        DcNo = $('select#ddlMDcNo option:selected').val();
    }

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var SuppId = $('#ddlMSupplier').val();
    var GrnId = $('#ddlMGrnNo').val();
    var PoId = $('#ddlMPoNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="MIType"]:checked').attr('value');

    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }

    if (DtChk||ChkComp) {

        OrdNo = "";
        RefNo = "";
        DcNo = "";
        SuppId = 0;
        GrnId = 0;
        PoId = 0;
    }
    if (Gs == 'GRN') {
        $('#lblMainlist').text('GRN List');
    }
    else {
        $('#lblMainlist').text('Quality List');
    }

    var menufilter = OrdNo + ',' + RefNo + ',' + DcNo + ',' + SuppId + ',' + CompId + ',' + PoId + ',' + GrnId + ',' + OrdeType + ',' + POType + ',' + FDate + ',' + TDate + ',' + Gs + ',' + PurAgnInd ;
    localStorage.setItem('PurchaseGRNMainFilter', menufilter);


    $.ajax({
        url: "/GRNMain/GetPurGrnMainDetails",
        data: JSON.stringify({ OrderNo: OrdNo, RefNo: RefNo, Dc_no: DcNo, supplierid: SuppId, companyid: CompId, PurOrdId: PoId, Grn_MasId: GrnId, pur_type: OrdeType, Pur_ItemType: POType, FromDate: FDate, ToDate: TDate, MEntryType: Gs, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {
                ListOrderRefNo();
              
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][4],
                        Supp: dataSet[i][3]
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

                $('#ddlMSupplier').empty();
                $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        dcno: dataSet[i][6]

                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.dcno]) {
                        revdet[el.dcno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMDcNo').empty();
                $('#ddlMDcNo').append($('<option/>').val('0').text('--Select DC No--'));
                $.each(rev, function () {
                    $('#ddlMDcNo').append($('<option></option>').val(this.dcno).text(this.dcno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][15],
                        poid: dataSet[i][14]
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

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        grnno: dataSet[i][5],
                        grnid: dataSet[i][0]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.grnid]) {
                        revdet[el.grnid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMGrnNo').empty();
                $('#ddlMGrnNo').append($('<option/>').val('0').text('--Select GRN No--'));
                $.each(rev, function () {
                    $('#ddlMGrnNo').append($('<option></option>').val(this.grnid).text(this.grnno));
                });


                return true;
            }


            var inputcount = 0;
            $('#tGMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tGMbody').DataTable();
                var rows = table.clear().draw();
                $('#tGMbody').DataTable().rows.add(dataSet);
                $('#tGMbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tGMbody').DataTable({
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
                             { title: "GrnMasId", "visible": false },
                             { title: "Company" },
                             { title: "CompanyId", "visible": false },
                             { title: "Supplier" },
                             { title: "SupplierId", "visible": false },
                             { title: "Grn No" },
                             { title: "Dc No" },
                             { title: "Date" },
                             { title: "Item Type" },
                             { title: "Qlc No", "visible": false },
                             { title: "ChkAccPos", "visible": false },
                              { title: "Supplierid", "visible": false },
                               { title: "Orderno", "visible": false },
                                { title: "Refno", "visible": false },
                                 { title: "Purordid", "visible": false },
                                  { title: "Pur_ord_no", "visible": false },
                             { title: "Action" },

                    ]

                });

                var table = $('#tGMbody').DataTable();
                $("#tGMbody tr").click(function () {
                    var selected = $(this).hasClass("selected");
                    $("#tGMbody tr").removeClass("selected");
                    if (!selected)
                        $(this).addClass("selected");
                });

            }



            if (ChkRefno) {
                ListOrderRefNo();
               
            }


            if (ChkOrdno) {
                ListOrderRefNo();

            }


            if (ChkSupplier) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][4],
                        Supp: dataSet[i][3]
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

                $('#ddlMSupplier').empty();
                $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });

            }

            if (ChkDcNo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        dcno: dataSet[i][6]
                       
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.dcno]) {
                        revdet[el.dcno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMDcNo').empty();
                $('#ddlMDcNo').append($('<option/>').val('0').text('--Select DC No--'));
                $.each(rev, function () {
                    $('#ddlMDcNo').append($('<option></option>').val(this.dcno).text(this.dcno));
                });

            }

            if (ChkPONo) {
              
                ListGrnPoNo();

            }

            if (ChkGRNNo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        grnno: dataSet[i][5],
                        grnid:dataSet[i][0]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.grnid]) {
                        revdet[el.grnid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMGrnNo').empty();
                $('#ddlMGrnNo').append($('<option/>').val('0').text('--Select GRN No--'));
                $.each(rev, function () {
                    $('#ddlMGrnNo').append($('<option></option>').val(this.grnid).text(this.grnno));
                });

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMainGridFromBack() {

    debugger;
    var fill = localStorage.getItem('PurchaseGRNMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[9]);
    $('#txtToDate').val(fillobj[10]);

    if (fillobj[8] == '') {
        $('#optl').prop('checked', true);
    } else if (fillobj[8] == 'A') {
        $('#optA').prop('checked', true);
    }
    else if (fillobj[8] == 'Y') {
        $('#optY').prop('checked', true);
    }

   
    if (fillobj[7] == 'O') {
        $('#optMB').prop('checked', true);
    } else if (fillobj[7] == 'SP') {
        $('#optMS').prop('checked', true);
    }
    else if (fillobj[7] == 'G') {
        $('#optMG').prop('checked', true);
    }
    else if (fillobj[7] == 'R') {
        $('#optMR').prop('checked', true);
    }

    if (fillobj[0] == "undefined") {
        fillobj[0] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = 0;
    }
   
    if (fillobj[11] == 'GRN') {
        $('#lblMainlist').text('GRN List');
    }
    else {
        $('#lblMainlist').text('Quality List');
    }


    $.ajax({
        url: "/GRNMain/GetPurGrnMainDetails",
        data: JSON.stringify({ OrderNo: fillobj[0], RefNo: fillobj[1], Dc_no: fillobj[2], supplierid: fillobj[3], companyid: fillobj[4], PurOrdId: fillobj[5], Grn_MasId: fillobj[6], pur_type: fillobj[7], Pur_ItemType: fillobj[8], FromDate: fillobj[9], ToDate: fillobj[10], MEntryType: fillobj[11], PurIndType: fillobj[12] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

                ListOrderRefNo();
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Suppid: dataSet[i][4],
                        Supp: dataSet[i][3]
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

                $('#ddlMSupplier').empty();
                $('#ddlMSupplier').append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(rev, function () {
                    $('#ddlMSupplier').append($('<option></option>').val(this.Suppid).text(this.Supp));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        dcno: dataSet[i][6]

                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.dcno]) {
                        revdet[el.dcno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMDcNo').empty();
                $('#ddlMDcNo').append($('<option/>').val('0').text('--Select DC No--'));
                $.each(rev, function () {
                    $('#ddlMDcNo').append($('<option></option>').val(this.dcno).text(this.dcno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Pono: dataSet[i][15],
                        poid: dataSet[i][14]
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

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        grnno: dataSet[i][5],
                        grnid: dataSet[i][0]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.grnid]) {
                        revdet[el.grnid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMGrnNo').empty();
                $('#ddlMGrnNo').append($('<option/>').val('0').text('--Select GRN No--'));
                $.each(rev, function () {
                    $('#ddlMGrnNo').append($('<option></option>').val(this.grnid).text(this.grnno));
                });



            var inputcount = 0;
            $('#tGMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tGMbody').DataTable();
                var rows = table.clear().draw();
                $('#tGMbody').DataTable().rows.add(dataSet);
                $('#tGMbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tGMbody').DataTable({
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
                             { title: "GrnMasId", "visible": false },
                             { title: "Company" },
                             { title: "CompanyId", "visible": false },
                             { title: "Supplier" },
                             { title: "SupplierId", "visible": false },
                             { title: "Grn No" },
                             { title: "Dc No" },
                             { title: "Date" },
                             { title: "Item Type" },
                             { title: "Qlc No", "visible": false },
                             { title: "ChkAccPos", "visible": false },
                              { title: "Supplierid", "visible": false },
                               { title: "Orderno", "visible": false },
                                { title: "Refno", "visible": false },
                                 { title: "Purordid", "visible": false },
                                  { title: "Pur_ord_no", "visible": false },
                             { title: "Action" },

                    ]

                });

                var table = $('#tGMbody').DataTable();
                $("#tGMbody tr").click(function () {
                    var selected = $(this).hasClass("selected");
                    $("#tGMbody tr").removeClass("selected");
                    if (!selected)
                        $(this).addClass("selected");
                });

            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ListOrderRefNo() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }

    $.ajax({
        url: "/GRNMain/GetOrderNo",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
              
                
                //$(ddlMPoNo).empty();
                //$(ddlMSupplier).empty();
                //$(ddlMDcNo).empty();
                //$(ddlMGrnNo).empty();

                if (ChkOrdno || DtChk) {
                    $(ddlMOrderNo).empty();
                    //OrdNo
                    $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                    $.each(data, function () {
                        $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));

                    });
                }

                if (ChkRefno || DtChk) {
                    $(ddlMRefNo).empty();
                    //RefNo
                    $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(data, function () {
                        $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                    });
                }

                //PoNo
                //$(ddlMPoNo).append($('<option/>').val('0').text('--Select PurOrdNo--'));
                //$.each(data, function () {
                //    $(ddlMPoNo).append($('<option></option>').val(this.PurOrdId).text(this.PurOrdNo));
                //});
                ////Supplier
                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(data, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.Supplier));
                //});
                ////Dc No
                //$(ddlMDcNo).append($('<option/>').val('0').text('--Select DcNo--'));
                //$.each(data, function () {
                //    $(ddlMDcNo).append($('<option></option>').text(this.Dc_no));
                //});
                ////Grn No

                //$(ddlMGrnNo).append($('<option/>').val('0').text('--Select GrnNo--'));
                //$.each(data, function () {
                //    $(ddlMGrnNo).append($('<option></option>').val(this.Grn_MasId).text(this.receipt_no));
                //});
            }
        }

    });
}

function ListGrnPoNo() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }


    $.ajax({
        url: "/GRNMain/GetGrnPoNo",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMPoNo).empty();

                //PoNo
                $(ddlMPoNo).append($('<option/>').val('0').text('--Select PurOrdNo--'));
                $.each(data, function () {
                    $(ddlMPoNo).append($('<option></option>').val(this.PurOrdId).text(this.PurOrdNo));
                });

            }
        }

    });
}




function ListGrnSupp() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }

    $.ajax({
        url: "/GRNMain/GetGrnSupp",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMSupplier).empty();

                ////Supplier
                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.Supplier));
                });

            }
        }

    });
}

function ListGrnDc() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }


    $.ajax({
        url: "/GRNMain/GetGrnDc",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMDcNo).empty();

                $(ddlMDcNo).append($('<option/>').val('0').text('--Select DcNo--'));
                $.each(data, function () {
                    $(ddlMDcNo).append($('<option></option>').text(this.Dc_no));
                });

            }
        }

    });
}
function ListGrn() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }


    $.ajax({
        url: "/GRNMain/GetGrn",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMGrnNo).empty();

                ////Grn No

                $(ddlMGrnNo).append($('<option/>').val('0').text('--Select GrnNo--'));
                $.each(data, function () {
                    $(ddlMGrnNo).append($('<option></option>').val(this.Grn_MasId).text(this.receipt_no));
                });

            }
        }

    });
}
function List() {
    CMainList();
   // $('#tGMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrderRefNo();
    //ListGrnPoNo();
    //ListGrnSupp();
    //ListGrnDc();
    //ListGrn();
}
function RadioMLClick() {

   // $('#tGMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrderRefNo();
    //ListGrnPoNo();
    //ListGrnSupp();
    //ListGrnDc();
    //ListGrn();
    CMainList();
}
function RadioMBClick() {
    $('#SplId').hide();
    CMainList();
   // $('#tGMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrderRefNo();
    //ListGrnPoNo();
    //ListGrnSupp();
    //ListGrnDc();
    //ListGrn();
}

function RadioSLClick() {
    $('#SplId').show();
    //$('#tGMbody').DataTable().destroy();
    //LoadMainGrid();
    //ListOrderRefNo();
    //ListGrnPoNo();
    //ListGrnSupp();
    //ListGrnDc();
    //ListGrn();
    CMainList();
}

function CMainList() {
    //// $('#tGMbody').DataTable().destroy();
     ChkRefno = true;
     ChkOrdno = true;
     DtChk = false;
     ChkSupplier = true;
     ChkDcNo = true;
     ChkPONo = true;
     ChkGRNNo = true;
     ChkComp = true;

    LoadMainGrid();
}

function GRnMainList() {
    //   $('#tGMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = false;
    ChkPONo = false;
    ChkGRNNo = false;
    ChkComp = false;
    LoadMainGrid();
}

function SuppMainList() {
    // $('#tGMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = true;
    ChkPONo = true;
    ChkGRNNo = true;
    ChkComp = false;
    LoadMainGrid();
}

function OMainList() {
    //  $('#tGMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = true;
    ChkPONo = true;
    ChkGRNNo = true;
    ChkComp = false;
    LoadMainGrid();
}

function POMainList() {
    // $('#tGMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = false;
    ChkPONo = false;
    ChkGRNNo = false;
    ChkComp = false;
    LoadMainGrid();
}
function REFMainList() {
    //  $('#tGMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = true;
    ChkPONo = true;
    ChkGRNNo = true;
    ChkComp = false;
    LoadMainGrid();
}
function PoMainList() {
    //  $('#tGMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = false;
    ChkPONo = false;
    ChkGRNNo = false;
    ChkComp = false;
    LoadMainGrid();

}

function DcMainList() {
    //   $('#tGMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkDcNo = false;
    ChkPONo = false;
    ChkGRNNo = false;
    ChkComp = false;
    LoadMainGrid();

}
function getbyID(Id, CpmId, SupId, accpos) {
    debugger;

    

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
    if (accpos == 1) {
        //alert("Accounts Posted,Please Contact Administrator..");
        var msg = 'Accounts Posted,Please Contact Administrator...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 1;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/GRNEntry/GRNEntryIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}


function AddQltyID(Id, CpmId, SupId) {
    debugger;



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

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 0;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/PurchaseQuality/PurchaseQualityIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}



function EditQltyID(Id, CpmId, SupId) {
    debugger;



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

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 1;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/PurchaseQuality/PurchaseQualityIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}

function QltyDelete(Id, CpmId, SupId) {
    debugger;



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

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 2;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/PurchaseQuality/PurchaseQualityIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}

function Delete(Id, CpmId, SupId, accpos) {
    debugger;


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
    if (accpos == 1) {
        //alert("Accounts Posted,Please Contact Administrator..");
        var msg = 'Accounts Posted,Please Contact Administrator...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 2;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/GRNEntry/GRNEntryIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;

}

function LOADQLTY() {

    var Prg = "Qlty";
    Gs = Prg;
    var Type = "Qlty";
   // $('#tGMbody').DataTable().destroy();
    //LoadMainGrid();
    CMainList();
}
function LOADGRN() {

    var Prg = "GRN";
    Gs = Prg;
    var Type = "GRN";
    //$('#tGMbody').DataTable().destroy();
    // LoadMainGrid();
    CMainList();
}

function Pur_Grn_Print(ID) {
    debugger;
    // window.location.href = "../ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInline.aspx?GrnMasId=" + ID;
    Repid = ID;
    $('#myModal2').modal('show');

    docname = "PURCHASE GOODS RECEIPT";
    GenerateReportItem(docname);
}



function GenerateReportItem(name) {
    debugger;
    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //document.getElementById('sbTwo');
            var obj = result.Value;
            repobj = obj;
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
    var ReportType = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');

    var RType = 0;
    var TType = $('input[name="MIType"]:checked').attr('value');

    if (TType == "Y") {
        RType = "YARN RECEIPT";
    } else if (TType == "A") {
        RType = "TRIMS RECEIPT";
    }
    var compid = $('#ddlMCompany').val();

   // if (TType == "Y") {
        var FType = $('input[name="FabType"]:checked').attr('value');
        if (FType == "G") {
            var src = '../ReportInline/Purchase/PurchaseGrnGreyInlineReport/PurchaseGrnGreyInlineReport.aspx?';
            src = src + "PurOrdId=" + Repid;
            var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
            $("#divReport").html(iframe);
            window.open("../ReportInline/Purchase/PurchaseGrnGreyInlineReport/PurchaseGrnGreyInlineReport.aspx?PurOrdId=" + Repid + "&Companyid=" + compid);

        } else if (FType == "F") {
            var src = '../ReportInline/Purchase/PurchaseGrnFinishInlineReport/PurchaseGrnFinishInlineReport.aspx?';
            src = src + "PurOrdId=" + Repid;
            var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
            $("#divReport").html(iframe);
            window.open("../ReportInline/Purchase/PurchaseGrnFinishInlineReport/PurchaseGrnFinishInlineReport.aspx?PurOrdId=" + Repid + "&Companyid=" + compid);
        } else {
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

            window.open("../ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInline.aspx?GrnMasId=" + Repid + "&Orderno=" + p[0] + "&Remarks=" + p[1] + "&Shortqty=" + p[2] + "&Rejqty=" + p[3] + "&Returnqty=" + p[4] + "&Recvqty=" + p[5] + "&Debitqty=" + p[6] + "&Excsqty=" + p[7] + "&Return=" + p[8] + "&Itmcode=" + p[9] + "&Amnt=" + p[10] + "&Rate=" + p[11] + "&Qty2=" + p[12] + "&Exqty=" + p[13] + "&POdet=" + p[14] + "&Grn=" + p[15] + "&Freight=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&ItemType=" + RType + "&RptTyp=" + ReportType + "&Companyid=" + compid);
        }
   // }
}

function backtomain() {

    $('#myModal2').modal('hide');
}
function LoadItemMovements(GrnNo) {
    debugger;

    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblItemMovementdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblItemMovementdetails').DataTable().destroy();
    }
    $('#tblItemMovementdetails').empty();

    $('#tblItemMovementdetails').DataTable({

        data: ItemMovementList,
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
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Order No", data: "OrderNo" ,visible:false},
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Issue Date", data: "IssueDate" },
            { title: "Issue Qty", data: "IssueQty" },

               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        if (data.Rate > "0") {
               //            return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //        } else { return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    }


               //}
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
