
var ItemList = [];
var MGRowID = 0;
var GrId = 0;
var GrnDetid = 0;
var GrnItemList = [];
var EItemList = [];
var ESaveItemList = [];
var OItemList = [];
var OSaveItemList = [];
var Itemrowindex = -1;
var rowindex = -1;
var Gindex = 0;
var Eindex = 0;
var Oindex = 0;
var AccList = [];
var GrossAmt = 0;
var ANAmt = 0;
var GInvId = 0;
var GAddAmt = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var DCompid = 0;
var ChkBillNo = 0;
var GBillAmount = 0;
var GBillDate = 0;
var GCompId = 0;
var GSuppId = 0;
var CmpId = 0;
var SuppId = 0;
var chkBudRateBulk = "False";
var chkBudRateSample = "False";
var CurrDecimal = 0;
var OrdType = '';
$(document).ready(function () {
    debugger;


    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    ChkBillNo = $("#hdncheckBillsToInvoiceEntry").data('value');
    chkBudRateBulk = $("#hdnValidateBudRateinPurinvBulk").data('value');
    chkBudRateSample = $("#hdnValidateBudRateinPurinvSample").data('value');
    ValidatePurchaseGRNqty = $("#hdnValidatePurchaseGRNqty").data('value');
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadSupplierDDL("#ddlSupplier");
    getDate();
    LoadOrderNo();
    LoadStyle();
    LoadGrnNo();
    LoadPoNo();
    LoadAddlessDDL("#ddlAcc");
    ListSupplier();
    ListOrdRef();
    ListSuppDcInv();
    var fill = localStorage.getItem('PurchaseInvoiceMainFilter');
    if (fill != "null" && fill != null) {
        LoadMainGridFromBack();
    } else {
        LoadMainGrid();
    }

   // LoadMainGrid();
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
    $(document).on('change', '.calcQty', function () {
        debugger;

        var table = $('#tblItemdetails').DataTable();
        var GrnDetId = table.row($(this).parents('tr')).data()["Pur_grn_detid"];
        var IId = table.row($(this).parents('tr')).data()["ItemId"];
        var CId = table.row($(this).parents('tr')).data()["ColorId"];
        var SId = table.row($(this).parents('tr')).data()["SizeId"];
        var RevQty = table.row($(this).parents('tr')).data()["balance_qty"];
     
        var Val = $(this).val();  
        var IQty = Val;
        var DifQty = parseFloat(IQty) - parseFloat(RevQty);

        if (ValidatePurchaseGRNqty == 'True') {
   
        if (Val > RevQty) {
            $.each(EItemList, function () {
                if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                    this.InvoiceQty = RevQty;
                    //this.DiffQty = DifQty;
                    this.DiffQty = 0;
                    IQty = RevQty;
                    Val = RevQty;

                    //this.DiffAmt = DiffRate * InvoiceQty;
                    //this.DiffQtyAmt = InvRate * DiffQty;
                }
            });
            loadInvItemTable(EItemList);

            $.each(ESaveItemList, function () {
                if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                    this.InvoiceQty = RevQty;
                    //this.DiffQty = DifQty;
                    this.DiffQty = 0;

                    //this.DiffAmt = DiffRate * InvoiceQty;
                    //this.DiffQtyAmt = InvRate * DiffQty;
                }
            });

            loadInvSaveItemTable(ESaveItemList);
        }
        else {
            $.each(EItemList, function () {
                if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                    this.InvoiceQty = IQty;
                    this.DiffQty = DifQty;

                    //this.DiffAmt = DiffRate * InvoiceQty;
                    //this.DiffQtyAmt = InvRate * DiffQty;
                }
            });

            loadInvItemTable(EItemList);

            $.each(ESaveItemList, function () {
                if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                    this.InvoiceQty = IQty;
                    this.DiffQty = DifQty;

                    // this.DiffAmt = DiffRate * InvoiceQty;
                    //this.DiffQtyAmt = InvRate * DiffQty;
                }
            });

            loadInvSaveItemTable(ESaveItemList);

        }
        } else {


            $.each(EItemList, function () {
                if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {

                    if (Val > RevQty) {
                        this.InvoiceQty = RevQty;
                    } else {
                        this.InvoiceQty = IQty;
                    }

                    //this.InvoiceQty = IQty;
                    this.DiffQty = DifQty;

                   // this.DiffAmt = DiffRate * InvoiceQty;
                   // this.DiffQtyAmt = InvRate * DiffQty;
                }
            });

            loadInvItemTable(EItemList);

            $.each(ESaveItemList, function () {
                if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                    if (Val > RevQty) {
                        this.InvoiceQty = RevQty;
                    } else {
                        this.InvoiceQty = IQty;
                    }

                    //this.InvoiceQty = IQty;
                    this.DiffQty = DifQty;

                     //this.DiffAmt = DiffRate * InvoiceQty;
                    //this.DiffQtyAmt = InvRate * DiffQty;
                }
            });

            loadInvSaveItemTable(ESaveItemList);


        }

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < OSaveItemList.length; t++) {
            if (OSaveItemList[t].Pur_Inv_DetID == GrnDetId) {
                pid.push(OSaveItemList[t].OSSNo);
                bal.push(OSaveItemList[t].ReceQty);
                qty.push(OSaveItemList[t].InvoiceQty);
            }
        }

        var c = pid.length;
        var t = 0;

        if (Val < bal[0]) {
            qty[0] = Val;
            for (var l = 1; l < qty.length; l++) {
                qty[l] = 0;
            }
        }
        else {
            for (var r = 0; r < c; r++) {
                if (r == 0) {
                    if (bal[r] <= Val) {
                        qty[r] = bal[r];
                        t = Val - bal[r];
                    }
                }
                if (r > 0) {
                    if (bal[r] >= t) {
                        qty[r] = t;
                        t = 0;
                    }
                    else {
                        var y = t - bal[r];
                        if (bal[r] < y || bal[r] > y) {
                            qty[r] = bal[r];
                            t = t - qty[r];
                        }
                        else {
                            qty[r] = y;
                            t = t - y;
                        }
                    }

                }
            }
        }

        for (var u = 0; u < OSaveItemList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OSaveItemList[u].OSSNo == pid[r]) {
                    OSaveItemList[u].InvoiceQty = qty[r];
                }
            }
        }

        loadInvOrdSaveTable(OSaveItemList);


        for (var u = 0; u < OItemList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OItemList[u].OSSNo == pid[r]) {
                    OItemList[u].InvoiceQty = qty[r];
                }
            }
        }

        //loadPOrderTable(POrderList);



        colorempty = OSaveItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Pur_Inv_DetID === GrnDetId);
        });

        OItemList = colorempty;

        loadInvOrdTable(OItemList);


        //var totalQty = 0;
        //for (var e = 0; e < ESaveItemList.length; e++) {
        //    var qn = ESaveItemList[e].DiffQty;
        //    totalQty = totalQty + parseFloat(qn);

        //}


        var PtotalQty = 0;
        for (var e = 0; e < ESaveItemList.length; e++) {
            if (ESaveItemList[e].DiffQty > 0 ) {
                var qn = ESaveItemList[e].DiffQty ;
                PtotalQty = PtotalQty + parseFloat(qn);
            }
        }

        var NtotalQty = 0;
        for (var e = 0; e < ESaveItemList.length; e++) {
            if (ESaveItemList[e].DiffQty < 0 ) {
                var qn = ESaveItemList[e].DiffQty ;
                NtotalQty = NtotalQty + parseFloat(qn);
            }
        }

        var tot = (-(NtotalQty));

        $('#txtDebitQty').val(parseFloat(PtotalQty).toFixed(2));
        $('#txtCreditQty').val(parseFloat(tot).toFixed(2));


        //if (totalQty < 0) {
        //    var tot = (-(totalQty));
        //    $('#txtDebitQty').val(0);
        //    $('#txtCreditQty').val(tot);
        //}
        //else if (totalQty > 0) {


        //    $('#txtCreditQty').val(0);
        //    $('#txtDebitQty').val(totalQty);
        //}
        var rows = $("#tblItemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblItemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 9 }).data()[0];
            $('input[id=txtOQty]').each(function () {
                if (sn == GrnDetId && $(this).val() == IQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOQty').val();
                    row.find('#txtOQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('change', '.calcRate', function () {
        debugger;

        var table = $('#tblItemdetails').DataTable();
        var GrnDetId = table.row($(this).parents('tr')).data()["Pur_grn_detid"];
        var IId = table.row($(this).parents('tr')).data()["ItemId"];
        var CId = table.row($(this).parents('tr')).data()["ColorId"];
        var SId = table.row($(this).parents('tr')).data()["SizeId"];
        var InvQty = table.row($(this).parents('tr')).data()["InvoiceQty"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var DQty = table.row($(this).parents('tr')).data()["DiffQty"];
        var AppRate = table.row($(this).parents('tr')).data()["AppRate"];

        var Val = $(this).val();

        // OrdType = $('input[name="AddOrd"]:checked').attr('value');

        if (OrdType == 'B') {
            if (chkBudRateBulk == "True") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg='Rate should not be greater than Budget Rate...';
                    var flg=4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    Val = 0;
                }
            }
        }

        if (OrdType == 'R') {
            if (chkBudRateBulk == "True") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg = 'Rate should not be greater than Budget Rate...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    Val = 0;
                }
            }
        }


        else if (OrdType == 'S') {

            if (chkBudRateSample == "True") {
                if (Val > AppRate) {
                    //alert('Rate should not be greater than Budget Rate ..');
                    var msg = 'Rate should not be greater than Budget Rate...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    Val = 0;
                }
            }
        }

        var IRate = Val;
        var IAmt = InvQty * IRate;
        var DifRate = parseFloat(IRate) - parseFloat(Rate);

        var DifAmt = DifRate * InvQty;
       // var DifQtyAmt = DifRate * DQty;
        var DifQtyAmt = IRate * DQty;


        var DecimalPlace = 0;
        $.each(ESaveItemList, function (i) {
            DecimalPlace = ESaveItemList[i].DecimalPlace;
        });
        if (DecimalPlace > 0) {

        } else {
            DecimalPlace = 2;
        }



        $.each(EItemList, function () {
            if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                this.InvoiceQty = InvQty;
                this.InvRate = parseFloat(IRate).toFixed(DecimalPlace);
                this.InvAmt = parseFloat(IAmt).toFixed(DecimalPlace);
                this.DiffRate = parseFloat(DifRate).toFixed(DecimalPlace);
                this.DiffAmt = parseFloat(DifAmt).toFixed(DecimalPlace);
                this.DiffQtyAmt = parseFloat(DifQtyAmt).toFixed(DecimalPlace);
                //this.InvRate = IRate;
                //this.InvAmt = IAmt;
                //this.DiffRate = DifRate;
                //this.DiffAmt = DifAmt;
                //this.DiffQtyAmt = DifQtyAmt;
            }
        });

        loadInvItemTable(EItemList);

        $.each(ESaveItemList, function () {
            if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                this.InvoiceQty = InvQty;
                this.InvRate = parseFloat(IRate).toFixed(DecimalPlace);
                this.InvAmt = parseFloat(IAmt).toFixed(DecimalPlace);
                this.DiffRate = parseFloat(DifRate).toFixed(DecimalPlace);
                this.DiffAmt = parseFloat(DifAmt).toFixed(DecimalPlace);
                this.DiffQtyAmt = parseFloat(DifQtyAmt).toFixed(DecimalPlace);
                //this.InvRate = IRate;
                //this.InvAmt = IAmt;
                //this.DiffRate = DifRate;
                //this.DiffAmt = DifAmt;
                //this.DiffQtyAmt = DifQtyAmt;
            }
        });

        loadInvSaveItemTable(ESaveItemList);

      

        var PtotalRate = 0;
        for (var e = 0; e < ESaveItemList.length; e++) {
            if (ESaveItemList[e].DiffRate > 0) {
                var qn = ESaveItemList[e].DiffRate;
                PtotalRate = PtotalRate + parseFloat(qn);
            }
        }

        var NtotalRate = 0;
        for (var e = 0; e < ESaveItemList.length; e++) {
            if (ESaveItemList[e].DiffRate < 0) {
                var qn = ESaveItemList[e].DiffRate;
                NtotalRate = NtotalRate + parseFloat(qn);
            }
        }

        var tot = (-(NtotalRate));

        var PtotalQty = 0;
        for (var e = 0; e < ESaveItemList.length; e++) {
            if (ESaveItemList[e].DiffQty > 0) {
                var qn = ESaveItemList[e].DiffQty * parseFloat(ESaveItemList[e].InvRate);
                PtotalQty = PtotalQty + parseFloat(qn);
            }
        }

        var NtotalQty = 0;
        for (var e = 0; e < ESaveItemList.length; e++) {
            if (ESaveItemList[e].DiffQty < 0) {
                var qn = ESaveItemList[e].DiffQty * parseFloat(ESaveItemList[e].InvRate);
                NtotalQty = NtotalQty + parseFloat(qn);
            }
        }

        var debt = PtotalRate + PtotalQty;
        var cdet = tot + NtotalQty;


        $('#txtDebitRate').val(parseFloat(debt).toFixed(DecimalPlace));
        $('#txtCreditRate').val(parseFloat(cdet).toFixed(DecimalPlace));





        //$('#txtDebitRate').val(parseFloat(PtotalRate).toFixed(DecimalPlace));
        //$('#txtCreditRate').val(parseFloat(tot).toFixed(DecimalPlace));

        var rows = $("#tblItemdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblItemdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 9}).data()[0];
            $('input[id=txtInvrate]').each(function () {
                if (sn == GrnDetId && $(this).val() == Val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtInvrate').val();
                    row.find('#txtInvrate').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
    $(document).on('change', '.CalOIQty', function () {
        debugger;

        var table = $('#tblInvOrddetails').DataTable();
        var SNo = table.row($(this).parents('tr')).data()["OSSNo"];
        var StyId = table.row($(this).parents('tr')).data()["StyleID"];
        var detid = table.row($(this).parents('tr')).data()["Pur_Inv_DetID"];
        var balq = table.row($(this).parents('tr')).data()["ReceQty"];
        
        var value = $(this).val();
        var Val = value;

        $.each(OSaveItemList, function () {
            if (this.OSSNo == SNo) {
                if (balq >= value) {
                    this.InvoiceQty = value;
                }
                else {
                    var t = value - balq;
                    this.InvoiceQty = balq;
                    Val = balq;
                }
            }
        });


        var OItemList = [];
        OItemList = OSaveItemList;
        OItemList = $.grep(OItemList, function (e) {          
                return e.OSSNo == SNo;            
        });
        //$.each(OItemList, function () {
        //    if (this.OSSNo == SNo) {
        //        if (balq >= value) {
        //            this.InvoiceQty = value;
        //        }
        //        else {
        //            var t = value - balq;
        //            this.InvoiceQty = balq;
        //        }

        //    }
        //});


        loadInvOrdTable(OItemList);
        loadInvOrdSaveTable(OSaveItemList);


        var totalamnt = 0;

        for (var e = 0; e < OSaveItemList.length; e++) {
            if (OSaveItemList[e].Pur_Inv_DetID == detid) {
                var amount = OSaveItemList[e].InvoiceQty;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $.each(ESaveItemList, function () {
            if (this.Pur_grn_detid == detid) {
                this.InvoiceQty = totalamnt;
            }
        });

        $.each(EItemList, function () {
            if (this.Pur_grn_detid == detid) {
                this.InvoiceQty = totalamnt;
            }
        });

        loadInvItemTable(EItemList);
        loadInvSaveItemTable(ESaveItemList);


        var otable = $('#tblInvOrddetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtORQty]').each(function (ig) {
            if (odata[ig].OSSNo == SNo) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtORQty').focus().val('').val(Val);
            }
        });


        //var rows = $("#tblInvOrddetails").dataTable().fnGetNodes();
        //var dtTable = $('#tblInvOrddetails').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtORQty]').each(function () {
        //        if (sn == SNo && $(this).val() == Val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtORQty').val();
        //            row.find('#txtORQty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
});


$(document).ready(function () {
    $("#tblEntryGrndetails ").dataTable().find("tbody").on('click', 'tr', function () {
        Gindex = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
        Eindex = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#tblInvOrddetails ").dataTable().find("tbody").on('click', 'tr', function () {
        Oindex = (this.rowIndex) - 1;
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

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#txtInvoiceDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);

    $('#txtFrmDate').val(MainFDate);
    $('#txttoDate').val(Fdatestring);


}

function LoadOrderNo() {


    var comId = $('#ddlCompany').val();
    var suppId = $('#ddlSupplier').val();
     OrdType = $('input[name="AddOrd"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseInvoice/GetOrderNo",
        data: JSON.stringify({ company_id: comId, supplierid: suppId, OType: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlRefNo).empty();
                $(ddlOrderNo).empty();
                $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $(ddlRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrdNo));
                });

                $.each(data, function () {
                    $(ddlRefNo).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                });

            }

        }

    });

}

function LoadStyle() {


    var comId = $('#ddlCompany').val();
    var suppId = $('#ddlSupplier').val();
    var OrderNo = $("#ddlOrderNo option:selected").text();// $('#ddlOrderNo').text();
     OrdType = $('input[name="AddOrd"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseInvoice/GetStyle",
        data: JSON.stringify({ company_id: comId, supplierid: suppId, OType: OrdType, OrdNo: OrderNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlStyle).empty();

                $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlStyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                });

            }
        }

    });

}

function LoadGrnNo() {


    var comId = $('#ddlCompany').val();
    var suppId = $('#ddlSupplier').val();
    var OrderNo = $("#ddlOrderNo option:selected").text();// $('#ddlOrderNo').text();
    var StyId = $('#ddlStyle').val();
     OrdType = $('input[name="AddOrd"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseInvoice/GetGrnNo",
        data: JSON.stringify({ company_id: comId, supplierid: suppId, OType: OrdType, OrdNo: OrderNo, StyleId: StyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlGrnNo).empty();

                $(ddlGrnNo).append($('<option/>').val('0').text('--Select GrnNo--'));
                $.each(data, function () {
                    $(ddlGrnNo).append($('<option></option>').val(this.GrnMasId).text(this.GrnNn));
                });

            }
        }

    });

}


function LoadPoNo() {


    var comId = $('#ddlCompany').val();
    var suppId = $('#ddlSupplier').val();
    var OrderNo = $("#ddlOrderNo option:selected").text();// $('#ddlOrderNo').text();
    var StyId = $('#ddlStyle').val();
    var GrnId = $('#ddlGrnNo').val();
     OrdType = $('input[name="AddOrd"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseInvoice/GetPoNo",
        data: JSON.stringify({ company_id: comId, supplierid: suppId, OType: OrdType, OrdNo: OrderNo, StyleId: StyId, GrnMasId: GrnId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlPurNo).empty();

                $(ddlPurNo).append($('<option/>').val('0').text('--Select PoNo--'));
                $.each(data, function () {
                    $(ddlPurNo).append($('<option></option>').val(this.PMasId).text(this.PoNo));
                });

            }
        }

    });

}


function LoadGridDetails() {

    LoadAddDetails();

}
function LoadAddDetails() {

    debugger;
    var CompId = $('select#ddlCompany option:selected').val();
    var SuppId = $('select#ddlSupplier option:selected').val();
    if (CompId == 0) {
        //alert("Please select Company...")
        var msg = 'Please select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (SuppId == 0) {
        //alert("Please select Supplier...")
        var msg = 'Please select Supplier...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var comId = $('#ddlCompany').val();
    var suppId = $('#ddlSupplier').val();
    var StyId = $('#ddlStyle').val();
    var GrnId = $('#ddlGrnNo').val();
    var PoId = $('#ddlPurNo').val();
     OrdType = $('input[name="AddOrd"]:checked').attr('value');

    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').text();
    }

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var FDate = $('#txtFrmDate').val();
    var TDate = $('#txttoDate').val();

    $.ajax({
        url: "/PurchaseInvoice/LoadDataGridDetails",
        data: JSON.stringify({ company_id: comId, supplierid: suppId, OType: OrdType, OrdNo: OrdNo, StyleId: StyId, GrnMasId: GrnId, PMasId: PoId, FromDate: FDate, ToDate: TDate }),
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

    $('#tblInvAddgrid').DataTable().destroy();
    debugger;

    $('#tblInvAddgrid').DataTable({
        data: ItemList,

        columns: [

            { title: "GrnMasID", data: "GrnMasId", "visible": false },
            { title: "Supplier", data: "Supplier" },
            { title: "Grn No", data: "GrnNn" },
            {
                title: "Date", data: "supp_inv_date",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Party Delivery No", data: "GrnDcNo" },

            {
                title: "Include", data: "GrnMasId",
                title: "Include", data: "GrnMasId",
                render: function (data) {

                    return '<input type="checkbox" id="txtGrnMasId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },
        ]
    });
}

function myfunc(Val) {
    MGRowID = MGRowID + "," + Val;
}




function LoadEntryDetails() {

    MGRowID;

    OrdType = $('input[name="AddOrd"]:checked').attr('value');
    $('#myModal').modal('hide');
    $('#myModal1').modal('show');

    var Comp = $('select#ddlCompany option:selected').text();
    var Supp = $('select#ddlSupplier option:selected').text();

    var CompId = $('select#ddlCompany option:selected').val();
    var SuppId = $('select#ddlSupplier option:selected').val();

    $('#txtComp').val(Comp);
    $('#txtSupp').val(Supp);
    GenerateNumber();
    LoadGrnInvDetails(MGRowID, CompId, SuppId);
    LoadBillInvNo(CompId, SuppId);
    $('#Add').show();
    $('#Update').hide();
    $('#Delete').hide();

    if (ChkBillNo == "True") {
        $('#dptInvId').show();
        $('#txtInvId').hide();
        $('#optNewBill').show();
    } else {
        $('#txtInvId').show();
        $('#dptInvId').hide();
        $('#optNewBill').hide();
    }

}


var table, column, compId, Docum;
function GenerateNumber(table, column, compId, Docum) {

    debugger;

    table = "Pur_Inv_Mas",
    column = "invoice_no",
    compId = $('#ddlCompany').val(),
    Docum = 'PURCHASE INVOICE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtEntryNo').val(result.Value);
        }
    });
}

function LoadGrnInvDetails(MGRowID, CompId, SuppId) {
    debugger;

    $.ajax({
        url: "/PurchaseInvoice/GetInvGrnItemDetails",
        data: JSON.stringify({ GMasId: MGRowID, company_id: CompId, supplierid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            GrnItemList = result;
            loadGrnItemTable(GrnItemList);

            GrId = GrnItemList[0].pur_grn_masid;
            //var ClrId = EItemList[0].Colorid;
            //var SzId = EItemList[0].Sizeid;
            //var UomId = EItemList[0].Uomid;
            //var Qty = 0;
            //var ESNo = EItemList[0].SNo;

            var Iid = 0;
            var Cid = 0;
            var Sid = 0;
            var Gdid = 0;

            var ONo = 0;


            //LoadInvItemDetails(GrId, CompId, SuppId);
            //LoadInvItemDetails(GrId, CompId, SuppId);
            LoadInvItemSaveDetails(MGRowID, CompId, SuppId);
            LoadInvOrderSaveDetails(MGRowID, CompId, SuppId, Iid, Cid, Sid, Gdid)

            //LoadInvOrderDetails(MGRowID, ItmId, ClrId, SzId, UomId, Qty);
            //LoadInvOrderSaveDetails(MGRowID, CompId, SuppId, Iid, Cid, Sid, Gdid);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadGrnItemTable(GrnItemList) {

    $('#tblEntryGrndetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryGrndetails').DataTable({

        data: GrnItemList,
        //scrollY: 100,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,
        //"bSort": false,
        columns: [


             { title: "PurInvDcId", data: "Pur_Inv_DcId", "visible": false },
             { title: "GrnMasId", data: "pur_grn_masid", "visible": false },
            { title: "Grn No", data: "GrnNo" },
            { title: "Party Dely No", data: "DcNo" },
            {
                title: "Date", data: "DCDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },

                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnGrnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });



    $("#tblEntryGrndetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryGrndetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function LoadInvItemSaveDetails(MGRowID, CompId, SuppId) {
    debugger;
    $.ajax({
        url: "/PurchaseInvoice/GetInvSaveItemDetails",
        data: JSON.stringify({ GMasId: MGRowID, company_id: CompId, supplierid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ESaveItemList = result;
            loadInvSaveItemTable(ESaveItemList);

            GrnDetid = ESaveItemList[0].Pur_grn_detid;

            EItemList = ESaveItemList;

            EItemList = $.grep(EItemList, function (v) {
                return (v.Pur_grn_masid === GrId);
            });

            loadInvItemTable(EItemList);



            var Cb = EItemList[0].CAbb;
            var ExRate = EItemList[0].EXRate;
            var CuId = EItemList[0].CurrId;

            $('#txtCurrency').val(Cb);
            $('#txtExchangeRate').val(ExRate);
            $('#txtCurrencyId').val(CuId);

            //var SzId = OItemList[0].OSizeid;
            //var UomId = OItemList[0].OUomid;
            //var JMasId = OItemList[0].JoMasId;
            //var ONo = OItemList[0].ISno;
            //var Qty = 0;

            //LoadDelStockDetails(JMasId, ItmId, ClrId, SzId, UomId, Qty, ONo);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadInvItemDetails(GrId, CompId, SuppId) {
    debugger;
    $.ajax({
        url: "/PurchaseInvoice/GetInvSaveItemDetails",
        data: JSON.stringify({ GMasId: GrId, company_id: CompId, supplierid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            EItemList = result;
            loadInvItemTable(EItemList);

            var ItmId = EItemList[0].ItemId;
            var ClrId = EItemList[0].ColorId;
            var SzId = EItemList[0].SizeId;
            var GrnDetId = EItemList[0].Pur_grn_detid;
            var IId = 0;
            var CId = 0;
            var SId = 0;
            var GrnDtid = 0;

            LoadInvOrderDetails(GrId, CompId, SuppId, ItmId, ClrId, SzId, GrnDetId);
            LoadInvOrderSaveDetails(MGRowID, CompId, SuppId, IId, CId, SId, GrnDtid);


        },
        failure: function (errMsg) {

            alert(errMsg);
        }
    });
}

function LoadInvOrderDetails(MGRowID, CompId, SuppId, ItmId, ClrId, SzId, GrnDetId) {
    debugger;

    $.ajax({
        url: "/PurchaseInvoice/GetInvOrdDetails",
        data: JSON.stringify({ GMasId: MGRowID, company_id: CompId, supplierid: SuppId, OItemID: ItmId, OColorID: ClrId, OSizeID: SzId, Pur_Inv_DetID: GrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OItemList = result;
            loadInvOrdTable(OItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadInvOrderSaveDetails(MGRowID, CompId, SuppId, ItmId, ClrId, SzId, GrnDetId) {
    debugger;

    $.ajax({
        url: "/PurchaseInvoice/GetInvOrdDetails",
        data: JSON.stringify({ GMasId: MGRowID, company_id: CompId, supplierid: SuppId, OItemID: ItmId, OColorID: ClrId, OSizeID: SzId, Pur_Inv_DetID: GrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OSaveItemList = result;
            loadInvOrdSaveTable(OSaveItemList);

            OItemList = OSaveItemList;

            OItemList = $.grep(OItemList, function (v) {
                return (v.Pur_Inv_DetID === GrnDetid);
            });

            loadInvOrdTable(OItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadInvOrdTable(OItemList) {

    $('#tblInvOrddetails').DataTable().destroy();
    //debugger;

    var table = $('#tblInvOrddetails').DataTable({
        data: OItemList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
              { title: "S.No", data: "OSSNo", "visible": false },
             { title: "PurInvOrdDetID", data: "Pur_Inv_Ord_DetID", "visible": false },
            { title: "Order No", data: "Order_No" },
            { title: "Ref No", data: "RefNo" },
              { title: "Style", data: "Style" },
               { title: "Bal Qty", data: "ReceQty" },
                 { title: "Excess Qty", data: "ExcessQty" },
                   { title: "Debit Qty", data: "debit_qty" },
                     { title: "Received Qty", data: "receivable_qty" },
                { title: "Received Rate", data: "Rate" },
            { title: "PurinvID", data: "Pur_invID", "visible": false },
            {
                title: "Inv Qty", data: "InvoiceQty",
                render: function (data) {

                    return '<input type="text" id="txtORQty" class="CalOIQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },
            { title: "PurInvDetID", data: "Pur_Inv_DetID", "visible": false },
             { title: "StyleID", data: "StyleID", "visible": false },

        //{
        //    title: "ACTION", "mDataProp": null,
        //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnInvStkview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        //},
        ]
    });

}




function loadInvOrdSaveTable(OSaveItemList) {

    $('#tblInvOrdSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblInvOrdSavedetails').DataTable({
        data: OSaveItemList,
        columns: [
             { title: "Sno", data: "OSSNo" },
             { title: "PurInvOrdDetID", data: "Pur_Inv_Ord_DetID" },
            { title: "Order No", data: "Order_No" },
            { title: "Ref No", data: "RefNo" },
              { title: "Style", data: "Style" },
               { title: "Received Qty", data: "ReceQty" },
                { title: "Received Rate", data: "Rate" },
            { title: "PurinvID", data: "Pur_invID" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "PurInvDetID", data: "Pur_Inv_DetID" },
             { title: "StyleID", data: "StyleID" },

        ]
    });

}
function loadInvItemTable(EItemList) {

    $('#tblItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblItemdetails').DataTable({
        data: EItemList,
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

             { title: "PurInvId", data: "Pur_inv_id", "visible": false },
            { title: "PurInvDetId", data: "Pur_inv_Detid", "visible": false },
             { title: "PurGrnMasId", data: "Pur_grn_masid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
             { title: "Rev Qty", data: "received_qty" },
              { title: "Bal Qty", data: "balance_qty" },
              { title: "Unit", data: "Uom" },
              { title: "Rate", data: "Rate" },
              { title: "GrnDetId", data: "Pur_grn_detid", "visible": false },
               { title: "CGST", data: "CGST", "visible": false },
                { title: "SGST", data: "SGST", "visible": false },
                 { title: "IGST", data: "IGST", "visible": false },
                  { title: "CGSTAMT", data: "CGSTAMt", "visible": false },
                   { title: "SGSTAMT", data: "SGSTAMT", "visible": false },
                    { title: "IGSTAMT", data: "IGSTAMT", "visible": false },
                   { title: "HSNCODE", data: "HSNCODE", "visible": false },
                   { title: "ItemId", data: "ItemId", "visible": false },
                   { title: "ColorId", data: "ColorId", "visible": false },
                   { title: "SizeId", data: "SizeId", "visible": false },
                     { title: "UomId", data: "UomId", "visible": false },
          {
              title: "Inv Qty", data: "InvoiceQty",
              render: function (data) {

                  return '<input type="text" id="txtOQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

              },
          },

             {
                 title: "Inv Rate", data: "InvRate",
                 render: function (data) {

                     return '<input type="text" id="txtInvrate" class="calcRate form-control"  style="width: 50px;text-align: center; "  value=' + data + ' >';

                 },
             },
             {
                 title: "Inv Amt", data: "InvAmt",
                 render: function (data) {

                     return '<input type="text" id=""class="form-control"  style="width: 50px;text-align: center;" disabled  value=' + data + ' onkeyup="calcRate(this.value);">';

                 },
             },
              {
                  title: "Diff Rate", data: "DiffRate",
                  render: function (data) {

                      return '<input type="text" id=""class="form-control"  style="width: 50px;text-align: center;"  disabled value=' + data + ' onkeyup="calcexssqty(this.value);">';

                  },
              },
               {
                   title: "Diff Amt", data: "DiffAmt",
                   render: function (data) {

                       return '<input type="text" id=""class="form-control"  style="width: 50px;text-align: center;" disabled  value=' + data + ' onkeyup="calcexssqty(this.value);">';

                   },
               },
               {
                   title: "Diff Qty", data: "DiffQty",
                   render: function (data) {

                       return '<input type="text" id=""class="form-control"  style="width: 50px;text-align: center;"  disabled value=' + data + ' onkeyup="calcexssqty(this.value);">';

                   },
               },
               {
                   title: "Diff QtyAmt", data: "DiffQtyAmt",
                   render: function (data) {

                       return '<input type="text" id=""class="form-control"  style="width: 50px;text-align: center;"  disabled value=' + data + ' onkeyup="calcexssqty(this.value);">';

                   },
               },

       
        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < EItemList.length; e++) {
        var amount = EItemList[e].InvAmt;
        totalamnt = totalamnt + parseFloat(amount);

    }

    //$('#txtNetAmount').val(totalamnt.toFixed(3));
    //$('#txtGrossAmount').val(totalamnt.toFixed(3));
    LoadNetGrossAmt();


    $("#tblItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function loadInvSaveItemTable(ESaveItemList) {

    $('#tblItemSavedetails').DataTable().destroy();
    debugger;

    var table = $('#tblItemSavedetails').DataTable({
        data: ESaveItemList,
        columns: [

             { title: "PurInvId", data: "Pur_inv_id" },
            { title: "PurInvDetId", data: "Pur_inv_Detid" },
               { title: "PurGrnMasId", data: "Pur_grn_masid" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
             { title: "Received Qty", data: "balance_qty" },
              { title: "Unit", data: "Uom" },
              { title: "Rate", data: "Rate" },
              { title: "GrnDetId", data: "Pur_grn_detid", "visible": false },
               { title: "CGST", data: "CGST", "visible": false },
                { title: "SGST", data: "SGST", "visible": false },
                 { title: "IGST", data: "IGST", "visible": false },
                  { title: "CGSTAMT", data: "CGSTAMt", "visible": false },
                   { title: "SGSTAMT", data: "SGSTAMT", "visible": false },
                    { title: "IGSTAMT", data: "IGSTAMT", "visible": false },
                   { title: "HSNCODE", data: "HSNCODE", "visible": false },
                   { title: "ItemId", data: "ItemId", "visible": false },
                   { title: "ColorId", data: "ColorId", "visible": false },
                   { title: "SizeId", data: "SizeId", "visible": false },
                     { title: "UomId", data: "UomId", "visible": false },
          { title: "InvQty", data: "InvoiceQty" },
           { title: "InvRate", data: "InvRate" },
             { title: "InvAmt", data: "InvAmt" },
              { title: "DiffRate", data: "DiffRate" },
               { title: "DiffAmt", data: "DiffAmt" },
                { title: "DiffQty", data: "DiffQty" },
                 { title: "DiffQtyAmt", data: "DiffQtyAmt" },

        ]
    });



}


//$(document).on('click', '.btnGrnItemview', function () {
//    debugger; 
  

//    var table = $('#tblEntryGrndetails').DataTable();

//    var GrId = table.row($(this).parents('tr')).data()["pur_grn_masid"];
   

//    var CompId = $('select#ddlCompany option:selected').val();
//    var SuppId = $('select#ddlSupplier option:selected').val();

//    // LoadInvItemDetails(GrId, CompId, SuppId);
//    EItemList = [];
//    EItemList = ESaveItemList;

//    EItemList = $.grep(EItemList, function (v) {
//        return (v.Pur_grn_masid === GrId);
//    });
//    loadInvItemTable(EItemList);

//    var Detid = EItemList[0].Pur_grn_detid;

//    OItemList = OSaveItemList;

//    OItemList = $.grep(OItemList, function (v) {
//        return (v.Pur_Inv_DetID === Detid);
//    });
//    loadInvOrdTable(OItemList);

//});


$(document).ready(function () {

    $('#tblEntryGrndetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblEntryGrndetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryGrndetails').dataTable().fnGetData(row);
              

        var GrId = data.pur_grn_masid; //table.row($(this).parents('tr')).data()["pur_grn_masid"];


        var CompId = $('select#ddlCompany option:selected').val();
        var SuppId = $('select#ddlSupplier option:selected').val();

        // LoadInvItemDetails(GrId, CompId, SuppId);
        EItemList = [];
        EItemList = ESaveItemList;

        EItemList = $.grep(EItemList, function (v) {
            return (v.Pur_grn_masid === GrId);
        });
        loadInvItemTable(EItemList);

        var Detid = EItemList[0].Pur_grn_detid;

        OItemList = OSaveItemList;

        OItemList = $.grep(OItemList, function (v) {
            return (v.Pur_Inv_DetID === Detid);
        });
        loadInvOrdTable(OItemList);

    });
});


//$(document).on('click', '.btnInvOrdview', function () {
//    debugger; 
//    var table = $('#tblItemdetails').DataTable();

//    var ItmId = table.row($(this).parents('tr')).data()["ItemId"];
//    var ClrId = table.row($(this).parents('tr')).data()["ColorId"];
//    var SzId = table.row($(this).parents('tr')).data()["SizeId"];
//    var GrdetId = table.row($(this).parents('tr')).data()["Pur_grn_detid"]; 

//    var CompId = $('select#ddlCompany option:selected').val();
//    var SuppId = $('select#ddlSupplier option:selected').val();

//    //LoadInvOrderDetails(MGRowID, CompId, SuppId, ItmId, ClrId, SzId, GrdetId);

//    var OItemList = [];
//    OItemList = OSaveItemList;

//    OItemList = $.grep(OItemList, function (v) {
//        return (v.Pur_Inv_DetID === GrdetId);
//    });

//    loadInvOrdTable(OItemList);
//});


$(document).ready(function () {

    $('#tblItemdetails').on('click', 'tr', function (e) {
        //debugger;

        var table = $('#tblItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblItemdetails').dataTable().fnGetData(row);
       
        var ItmId = data.ItemId; //table.row($(this).parents('tr')).data()["ItemId"];
        var ClrId = data.ColorId; //table.row($(this).parents('tr')).data()["ColorId"];
        var SzId = data.SizeId; //table.row($(this).parents('tr')).data()["SizeId"];
        var GrdetId = data.Pur_grn_detid; //table.row($(this).parents('tr')).data()["Pur_grn_detid"];

        var CompId = $('select#ddlCompany option:selected').val();
        var SuppId = $('select#ddlSupplier option:selected').val();


        var OItemList = [];
        OItemList = OSaveItemList;

        OItemList = $.grep(OItemList, function (v) {
            return (v.Pur_Inv_DetID === GrdetId);
        });

        loadInvOrdTable(OItemList);

    });
});

function ClearAddData() {
    $('#ddlOrderNo').val('0');
    $('#ddlRefNo').val('0');
    $('#ddlStyle').val('0');
    $('#ddlGrnNo').val('0');
    $('#ddlPurNo').val('0');
    $('#ddlCompany').val('0');
    $('#ddlSupplier').val('0');
    $('#txtDebitRate').val('');
    $('#txtCreditRate').val('');
    var tablesize = $('#tblInvAddgrid').DataTable();
    tablesize.clear().draw();
    //window.location.reload();
}

function calcQty(Val) {
    debugger;

    Eindex;

    var currentrowoftcpi = EItemList.slice(Eindex);

    var GrnDetId = currentrowoftcpi[0].Pur_grn_detid;
    var IId = currentrowoftcpi[0].ItemId;
    var CId = currentrowoftcpi[0].ColorId;
    var SId = currentrowoftcpi[0].SizeId;
    var RevQty = currentrowoftcpi[0].balance_qty;


    var IQty = Val;
    var DifQty = parseFloat(IQty) - parseFloat(RevQty);


    if (Val > RevQty) {
        $.each(EItemList, function () {
            if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                this.InvoiceQty = RevQty;
                // this.DiffQty = DifQty;
                this.DiffQty = 0;
                IQty = RevQty;
                Val = RevQty;
            }
        });
        loadInvItemTable(EItemList);

        $.each(ESaveItemList, function () {
            if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                this.InvoiceQty = RevQty;
                //this.DiffQty = DifQty;
                this.DiffQty = 0;
            }
        });

        loadInvSaveItemTable(ESaveItemList);
    }
    else {
        $.each(EItemList, function () {
            if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                this.InvoiceQty = IQty;
                this.DiffQty = DifQty;
            }
        });

        loadInvItemTable(EItemList);

        $.each(ESaveItemList, function () {
            if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
                this.InvoiceQty = IQty;
                this.DiffQty = DifQty;
            }
        });

        loadInvSaveItemTable(ESaveItemList);

    }

    var pid = [];
    var bal = [];
    var qty = [];
    for (var t = 0; t < OSaveItemList.length; t++) {
        if (OSaveItemList[t].Pur_Inv_DetID == GrnDetId) {
            pid.push(OSaveItemList[t].OSSNo);
            bal.push(OSaveItemList[t].ReceQty);
            qty.push(OSaveItemList[t].InvoiceQty);
        }
    }

    var c = pid.length;
    var t = 0;

    if (Val < bal[0]) {
        qty[0] = Val;
    }
    else {
        for (var r = 0; r < c; r++) {
            if (r == 0) {
                if (bal[r] <= Val) {
                    qty[r] = bal[r];
                    t = Val - bal[r];
                }
            }
            if (r > 0) {
                if (bal[r] >= t) {
                    qty[r] = t;
                    t = 0;
                }
                else {
                    var y = t - bal[r];
                    if (bal[r] < y || bal[r] > y) {
                        qty[r] = bal[r];
                        t = t - qty[r];
                    }
                    else {
                        qty[r] = y;
                        t = t - y;
                    }
                }

            }
        }
    }

    for (var u = 0; u < OSaveItemList.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (OSaveItemList[u].OSSNo == pid[r]) {
                OSaveItemList[u].InvoiceQty = qty[r];
            }
        }
    }

    loadInvOrdSaveTable(OSaveItemList);


    for (var u = 0; u < OItemList.length; u++) {
        for (var r = 0; r < pid.length; r++) {
            if (OItemList[u].OSSNo == pid[r]) {
                OItemList[u].InvoiceQty = qty[r];
            }
        }
    }

    //loadPOrderTable(POrderList);



    colorempty = OSaveItemList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.Pur_Inv_DetID === GrnDetId);
    });

    OItemList = colorempty;

    loadInvOrdTable(OItemList);


    //var totalQty = 0;
    //for (var e = 0; e < ESaveItemList.length; e++) {
    //    var qn = ESaveItemList[e].DiffQty;
    //    totalQty = totalQty + parseFloat(qn);

    //}


    var PtotalQty = 0;
    for (var e = 0; e < ESaveItemList.length; e++) {
        if (ESaveItemList[e].DiffQty > 0 ) {
            var qn = ESaveItemList[e].DiffQty ;
            PtotalQty = PtotalQty + parseFloat(qn);
        }
    }

    var NtotalQty = 0;
    for (var e = 0; e < ESaveItemList.length; e++) {
        if (ESaveItemList[e].DiffQty < 0) {
            var qn = ESaveItemList[e].DiffQty ;
            NtotalQty = NtotalQty + parseFloat(qn);
        }
    }

    var tot = (-(NtotalQty));

    $('#txtDebitQty').val(PtotalQty);
    $('#txtCreditQty').val(tot);


    //if (totalQty < 0) {
    //    var tot = (-(totalQty));
    //    $('#txtDebitQty').val(0);
    //    $('#txtCreditQty').val(tot);
    //}
    //else if (totalQty > 0) {


    //    $('#txtCreditQty').val(0);
    //    $('#txtDebitQty').val(totalQty);
    //}

}

function calcRate(Val) {
    debugger;

    Eindex;


    var DecimalPlace = 0;
    //$.each(ESaveItemList, function (i) {
    //    DecimalPlace = ESaveItemList[i].DecimalPlace;
    //});
  

    var currentrowoftcpi = EItemList.slice(Eindex);

    var GrnDetId = currentrowoftcpi[0].Pur_grn_detid;
    var IId = currentrowoftcpi[0].ItemId;
    var CId = currentrowoftcpi[0].ColorId;
    var SId = currentrowoftcpi[0].SizeId;
    var InvQty = currentrowoftcpi[0].InvoiceQty;
    var Rate = currentrowoftcpi[0].Rate;
    var DQty = currentrowoftcpi[0].DiffQty;
    DecimalPlace = currentrowoftcpi[0].DecimalPlace;
    if (DecimalPlace > 0) {

    }
    else {
        DecimalPlace = 2;
    }


    var IRate = Val;
    var IAmt = InvQty * IRate;
    var DifRate = parseFloat(IRate) - parseFloat(Rate);

    var DifAmt = DifRate * InvQty;
    var DifQtyAmt = DifRate * DQty;

    $.each(EItemList, function () {
        if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
            this.InvoiceQty = InvQty;
            this.InvRate = parseFloat(IRate).toFixed(DecimalPlace);
            this.InvAmt = parseFloat(IAmt).toFixed(DecimalPlace);
            this.DiffRate = parseFloat(DifRate).toFixed(DecimalPlace);
            this.DiffAmt = parseFloat(DifAmt).toFixed(DecimalPlace);
            this.DiffQtyAmt = parseFloat(DifQtyAmt).toFixed(DecimalPlace);
        }
    });

    loadInvItemTable(EItemList);

    $.each(ESaveItemList, function () {
        if (this.Pur_grn_detid == GrnDetId && this.ItemId == IId && this.ColorId == CId && this.SizeId == SId) {
            this.InvoiceQty = InvQty;
            //this.InvRate = IRate;
            //this.InvAmt = IAmt;
            //this.DiffRate = DifRate;
            //this.DiffAmt = DifAmt;
            //this.DiffQtyAmt = DifQtyAmt;
            this.InvRate = parseFloat(IRate).toFixed(DecimalPlace);
            this.InvAmt = parseFloat(IAmt).toFixed(DecimalPlace);
            this.DiffRate = parseFloat(DifRate).toFixed(DecimalPlace);
            this.DiffAmt = parseFloat(DifAmt).toFixed(DecimalPlace);
            this.DiffQtyAmt = parseFloat(DifQtyAmt).toFixed(DecimalPlace);
        }
    });

    loadInvSaveItemTable(ESaveItemList);

    //var totalQty = 0;
    //for (var e = 0; e < ESaveItemList.length; e++) {
    //    var qn = ESaveItemList[e].DiffQty;
    //    totalQty = totalQty + parseFloat(qn);

    //}

    //var totalRate = 0;
    //for (var e = 0; e < ESaveItemList.length; e++) {
    //    var rt = ESaveItemList[e].DiffRate;
    //    totalRate = totalRate + parseFloat(rt);

    //}

    //if (totalRate < 0) {
    //    var tot = (-(totalRate));
    //    $('#txtCreditRate').val(tot);
    //    $('#txtDebitRate').val(0);
    //}
    //else if (totalRate > 0) {


    //    $('#txtDebitRate').val(totalRate);
    //    $('#txtCreditRate').val(0);
    //}

    var PtotalRate = 0;
    for (var e = 0; e < ESaveItemList.length; e++) {
        if (ESaveItemList[e].DiffRate > 0) {
            var qn = ESaveItemList[e].DiffRate * parseFloat(ESaveItemList[e].InvoiceQty);
            PtotalRate = PtotalRate + parseFloat(qn);
        }
    }

    var NtotalRate = 0;
    for (var e = 0; e < ESaveItemList.length; e++) {
        if (ESaveItemList[e].DiffRate < 0) {
            var qn = ESaveItemList[e].DiffRate * parseFloat(ESaveItemList[e].InvoiceQty);
            NtotalRate = NtotalRate + parseFloat(qn);
        }
    }

    var tot = (-(NtotalRate));


    var PtotalQty = 0;
    for (var e = 0; e < ESaveItemList.length; e++) {
        if (ESaveItemList[e].DiffQty > 0) {
            var qn = ESaveItemList[e].DiffQty * parseFloat(ESaveItemList[e].InvRate);
            PtotalQty = PtotalQty + parseFloat(qn);
        }
    }

    var NtotalQty = 0;
    for (var e = 0; e < ESaveItemList.length; e++) {
        if (ESaveItemList[e].DiffQty < 0) {
            var qn = ESaveItemList[e].DiffQty * parseFloat(ESaveItemList[e].InvRate);
            NtotalQty = NtotalQty + parseFloat(qn);
        }
    }

    var debt = PtotalRate + PtotalQty;
    var cdet = tot + NtotalQty;


    $('#txtDebitRate').val(parseFloat(debt).toFixed(DecimalPlace));
    $('#txtCreditRate').val(parseFloat(cdet).toFixed(DecimalPlace));

}
///payment add///
////////////////////////nomi////////////////

function LoadNetGrossAmt() {
    debugger;
    var TotNetAmt = 0;
    var TotGrossAmt = 0;
    var DecimalPlace = 0;
    $.each(ESaveItemList, function (i) {
        var InvAmt = ESaveItemList[i].InvAmt;
        TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
        DecimalPlace = ESaveItemList[i].DecimalPlace;
    });
    if (DecimalPlace > 0) {

    } else {
        DecimalPlace = 2;
    }

    if (AccList.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].percentage);
            var PlusOrMinus = AccList[i].aorl;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccList[i].amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccList[i].amount);
                minusamt =parseFloat( minusamt) + Amt;
            }

        })

        TotNetAmt = TotGrossAmt;
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;

      

        TotNetAmt = parseFloat(TotNetAmt).toFixed(DecimalPlace);
        $('#txtNetAmount').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
        $('#txtNetAmount').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
    $('#txtGrossAmount').val(TotGrossAmt);

}





$(document).ready(function () {

    //component details
    $('#btnImadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAcc').val() == "0") {
            isAllValid = false;
            $('#ddlAcc').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlAcc').siblings('span.error').css('visibility', 'hidden');
        }


        if (AccList.length == 0) {
            leng = 1;
        }
        else {
            leng = AccList.length + 1;
        }

        AcSno = leng;


        var DecimalPlace = 0;
        $.each(ESaveItemList, function (i) {
            DecimalPlace = ESaveItemList[i].DecimalPlace;
        });
        if (DecimalPlace > 0) {

        }
        else {
            DecimalPlace = 2;
        }
        var amt = $('#txtAmount').val();
        amt = parseFloat(amt).toFixed(DecimalPlace);

        if (isAllValid) {


            debugger;
            var AcListObj = {
                Addless: $("#ddlAcc option:selected").text(),
                addless_id: $('#ddlAcc').val(),
                aorl: $('#txtPorMins').val(),
                percentage: $('#txtPer').val(),
                //amount: $('#txtAmount').val(),
                amount: amt,
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);

            var totalAccamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }


            ////    loadItemTable(ItemList);
            //$('#txtNetAmount').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtGrossAmount').val();
            //var NAmt = $('#txtNetAmount').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            //$('#txtNetAmount').val(FNAmt);
            //$('#txtBTotAmt').val(FNAmt);
            LoadNetGrossAmt();
            fnClearAccControls();
           
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AccList.slice(rowindex);

        $('#ddlAcc').val(currentro12[0]['addless_id']);
        $('#txtPorMins').val(currentro12[0]['aorl']);
        $('#txtPer').val(currentro12[0]['percentage']);
        $('#txtAmount').val(currentro12[0]['amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = AccList.slice(rowindex);

        currentrowsel[0]['addless_id'] = $("#ddlAcc").val();
        currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['aorl'] = $("#txtPorMins").val();
        currentrowsel[0]['percentage'] = $("#txtPer").val();


        var DecimalPlace = 0;
        $.each(ESaveItemList, function (i) {
            DecimalPlace = ESaveItemList[i].DecimalPlace;
        });
        if (DecimalPlace > 0) {

        }
        else {
            DecimalPlace = 2;
        }
        var amt = $('#txtAmount').val();
        amt = parseFloat(amt).toFixed(DecimalPlace);

        currentrowsel[0]['amount'] = amt;

      //  currentrowsel[0]['amount'] = $("#txtAmount").val();

        AccList[rowindex] = currentrowsel[0];

        loadAccTable(AccList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        if (Mode == 0) {
            fnClearAccControls();
        }
        else {
            fnClearAccControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);
        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
        LoadNetGrossAmt();
    });
    //

});

function LoadPlusAdd() {
    $('#txtPorMins').val("");
    var AccID = $('#ddlAcc').val();

    $.ajax({
        url: "/AccountHeads/GetbyID/" + AccID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtPorMins').val(obj.AddlessType);

            }
        }

    });

}

function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossAmount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(parseFloat(Amt).toFixed(2));
}

function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

               { title: "AddlessId", data: "addless_id", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "aorl", },
               { title: "Percent", data: "percentage", },
               { title: "Amount", data: "amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               },

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccList.length; e++) {
        var amount = AccList[e].amount;
        totalamnt = totalamnt + parseFloat(amount);

    }

    //$('#txtNetAmount').val(totalamnt.toFixed(3));

    //GAddAmt = $('#txtNetAmount').val();

    //var GAmt = $('#txtGrossAmount').val();
    //var NAmt = $('#txtNetAmount').val();
    //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);
    //$('#txtNetAmount').val(FNAmt);
    LoadNetGrossAmt();
}

function fnClearAccControls() {
    $('#ddlAcc').val('0').trigger('change');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}

function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Qty
    var opchk = [];

    for (var y = 0; y < EItemList.length; y++) {
        if (EItemList[y].InvoiceQty > 0) {
            opchk.push(EItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < EItemList.length; y++) {
        if (EItemList[y].InvRate > 0) {
            opchk.push(EItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }

    var CompId = $('select#ddlCompany option:selected').val();
    var SuppId = $('select#ddlSupplier option:selected').val();

    debugger;
    table = "Pur_Inv_Mas",
    column = "invoice_no",
    compId = $('#ddlCompany').val(),
    Docum = 'PURCHASE INVOICE'

    var oldentryno = $('#txtEntryNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newentryno = result.Value;
            if (oldentryno != newentryno) {
                //alert('Entry No has been changed...');
                var msg = 'Entry Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryNo').val(result.Value);
            }
            var objPurSubmit = {

                company_id: CompId,
                invoice_no: $('#txtEntryNo').val(),
                invoice_date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
                supplierid: SuppId,
                company_unitid: 0,
                Gross_amount: $('#txtGrossAmount').val(),
                Addless_amount: GAddAmt,
                invoice_value: $('#txtNetAmount').val(),
                supp_inv_no: InvBillNo,
                supp_inv_date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
                remarks: $('#txtRemarks').val(),
                DebtRaised: "N",
                Approved: "N",
                AddLessManualOrFormula: "M",
                CurrencyId: $('#txtCurrency').val(),
                ExchangeRate: $('#txtExchangeRate').val(),
                CreatedBy: Guserid,
                CurrencyId: $('#txtCurrencyId').val(),
                CRateDiff: $('#txtCreditRate').val(),
                DRateDiff: $('#txtDebitRate').val(),
                DReason: $('#txtQtyReason').val(),
                DHead: "RateDifference",

                //PurInvDDet: EItemList,
                //PurInvOrdDDet: OItemList,
                //PurInvDcDet: GrnItemList,
                //PurInvAddLess: AccList,

                PurInvDDet: ESaveItemList,
                PurInvOrdDDet: OSaveItemList,
                PurInvDcDet: GrnItemList,
                PurInvAddLess: AccList,
            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/PurchaseInvoice/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Purchase Invoice', 'ADD', $("#txtEntryNo").val());
                        //alert("Data Saved Sucessfully");
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);

                        if (ChkBillNo == 'True') {
                            AddInvBillNo("Y");
                        } 


                        $('#myModal1').modal('hide');
                        //window.location.reload();
                        //$('#tblMainDelidetails').DataTable().destroy();
                        //ListMainUnit();
                        //ListOrderRefNo();
                        //ListDisNo();
                        //ListIssueNo();
                        //LoadMainGrid();
                        ClearAddData();

                    } else {

                        window.location.href = "/Error/Index";

                    }


                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#txtComp').val().trim() == "") {
        $('#txtComp').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtComp').css('border-color', 'lightgrey');
    }

    if (ChkBillNo == 'True') {

        if ($('#ddlInvoiceNo').val() == 0) {
            $('#ddlInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    } else {

        if ($('#txtInvoiceNo').val().trim() == "") {
            $('#txtInvoiceNo').css('border-color', 'Red');
            //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#txtInvoiceNo').css('border-color', 'lightgrey');
            //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    //if ($('#ddlLoc').val() == 0) {
    //    $('#ddlLoc').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlLoc').css('border-color', 'lightgrey');
    //}

    return isValid;
}

function CalOIQty(value) {
    debugger;

    Oindex;

    var currentrowoftcpi = OItemList.slice(Eindex);

    var SNo = currentrowoftcpi[0].OSSNo;
    var StyId = currentrowoftcpi[0].StyleID;
    var detid = currentrowoftcpi[0].Pur_Inv_DetID;
    var balq = currentrowoftcpi[0].ReceQty;


    $.each(OSaveItemList, function () {
        if (this.OSSNo == SNo) {
            if (balq >= value) {
                this.InvoiceQty = value;
            }
            else {
                var t = value - balq;
                this.InvoiceQty = balq;
            }
        }
    });

    $.each(OItemList, function () {
        if (this.OSSNo == SNo) {
            if (balq >= value) {
                this.InvoiceQty = value;
            }
            else {
                var t = value - balq;
                this.InvoiceQty = balq;
            }

        }
    });


    loadInvOrdTable(OItemList);
    loadInvOrdSaveTable(OSaveItemList);


    var totalamnt = 0;

    for (var e = 0; e < OItemList.length; e++) {
        var amount = OItemList[e].InvoiceQty;
        totalamnt = totalamnt + parseFloat(amount);
    }
    $.each(ESaveItemList, function () {
        if (this.Pur_grn_detid == detid) {
            this.InvoiceQty = totalamnt;
        }
    });

    $.each(EItemList, function () {
        if (this.Pur_grn_detid == detid) {
            this.InvoiceQty = totalamnt;
        }
    });

    loadInvItemTable(EItemList);
    loadInvSaveItemTable(ESaveItemList);

}

function ListOrdRef() {

    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrType = $('input[name="MOType"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();

    $.ajax({
        url: "/PurchaseInvoice/GetOrd",
        data: JSON.stringify({ OType: OrType, company_id: CompId, supplierid: SuppId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMOrderNo).empty();

                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').val(this.BMasId).text(this.OrdNo));
                });

                $(ddlMReferno).empty();

                $(ddlMReferno).append($('<option/>').val('0').text('--Select ReferNo--'));
                $.each(data, function () {
                    $(ddlMReferno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                });


                //$('#ddlMReferNo').empty();
                //$('#ddlMReferNo').append($('<option/>').val('0').text('--Select Sub RefNo--'));
                //$.each(data, function () {
                //    $('#ddlMReferNo').append($('<option></option>').val(this.BMasId).text(this.RefNo));
                //});

            }
        }

    });
}

function ListSuppDcInv() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrType = $('input[name="MOType"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    $.ajax({
        url: "/PurchaseInvoice/GetInvSDcNo",
        data: JSON.stringify({ OType: OrType, company_id: CompId, supplierid: SuppId, OrdNo: OrdNo, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                $(ddlMRefno).empty();
                $(ddlMInvoice).empty();
                $(ddlMRefno).append($('<option/>').val('0').text('--Select Sub RefNo--'));
                $.each(data, function () {
                    $(ddlMRefno).append($('<option></option>').val(this.pur_invid).text(this.supp_inv_no));
                });
                //invno
                $(ddlMInvoice).append($('<option/>').val('0').text('--Select InvoiceNo--'));
                $.each(data, function () {
                    $(ddlMInvoice).append($('<option></option>').val(this.pur_invid).text(this.invoice_no));
                });


            }
        }

    });
}

function ListSupplier() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrType = $('input[name="MOType"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();


    $.ajax({
        url: "/PurchaseInvoice/GetSupp",
        data: JSON.stringify({ OType: OrType, company_id: CompId, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {



                var data = result.Value;
                $(ddlMSupplier).empty();
                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.Supplier));
                });

            }
        }

    });
}

function LoadMainGrid() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrType = $('input[name="MOType"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var SuppId = $('#ddlMSupplier').val();


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
    }


    var RefNo = "";
    var RNo = $('select#ddlMReferno option:selected').val();
    if (RNo == 0) {
        RefNo == "";
    }
    else {
        RefNo = $('select#ddlMReferno option:selected').text();
    }

    var InvNo = "";
    var INo = $('select#ddlMInvoice option:selected').val();

    if (INo == 0) {
        InvNo == "";
    }
    else {

        InvNo = $('select#ddlMInvoice option:selected').text();
    }


    var SInvNo = "";
    var SINo = $('select#ddlMRefno option:selected').val();

    if (SINo == 0) {
        SInvNo == "";
    }
    else {

        SInvNo = $('select#ddlMRefno option:selected').text();
    }

    var menufilter = OrType + ',' + CompId + ',' + SuppId + ',' + OrdNo + ',' + InvNo + ',' + SInvNo + ',' + FDate + ',' + TDate + ',' + RefNo ;
    localStorage.setItem('PurchaseInvoiceMainFilter', menufilter);

    $.ajax({
        url: "/PurchaseInvoice/GetMainLoad",
        data: JSON.stringify({ OType: OrType, company_id: CompId, supplierid: SuppId, OrdNo: OrdNo, invoice_no: InvNo, supp_inv_no: SInvNo, FromDate: FDate, ToDate: TDate, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblInvmaingrid').DataTable({
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
                         { title: "InvId", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Invoice" },
                         { title: "Date" },
                         { title: "Sup Inv" },
                         { title: "Invoic Amount" },
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tblInvmaingrid').DataTable();

                $('#tblInvmaingrid tbody').on('click', 'tr', function () {
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

    var fill = localStorage.getItem('PurchaseInvoiceMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[6]);
    $('#txtToDate').val(fillobj[7]);
  
    if (fillobj[0] == 'B') {
        $('#optMB').prop('checked', true);
    } else if (fillobj[0] == 'S') {
        $('#optMS').prop('checked', true);
    }
    else if (fillobj[0] == 'G') {
        $('#optMG').prop('checked', true);
    }
    else if (fillobj[0] == 'R') {
        $('#optMR').prop('checked', true);
    }
   

    if (fillobj[3] == "undefined") {
        fillobj[3] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
   

    $.ajax({
        url: "/PurchaseInvoice/GetMainLoad",
        data: JSON.stringify({ OType: fillobj[0], company_id: fillobj[1], supplierid: fillobj[2], OrdNo: fillobj[3], invoice_no: fillobj[4], supp_inv_no: fillobj[5], FromDate: fillobj[6], ToDate: fillobj[7], RefNo: fillobj[8] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblInvmaingrid').DataTable({
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
                         { title: "InvId", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Invoice" },
                         { title: "Date" },
                         { title: "Sup Inv" },
                         { title: "Invoic Amount" },
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tblInvmaingrid').DataTable();

                $('#tblInvmaingrid tbody').on('click', 'tr', function () {
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

function List() {
    $('#tblInvmaingrid').DataTable().destroy();
    ListSupplier();
    ListOrdRef();
    ListSuppDcInv();
    LoadMainGrid();
}

function CMainList() {
    $('#tblInvmaingrid').DataTable().destroy();
    ListSupplier();
    ListOrdRef();
    ListSuppDcInv();
    LoadMainGrid();
}

function RadioCClick() {
    $('#tblInvmaingrid').DataTable().destroy();
    ListSupplier();
    ListOrdRef();
    ListSuppDcInv();
    LoadMainGrid();
}

function SMainList() {
    $('#tblInvmaingrid').DataTable().destroy();

    ListSupplier();
    ListSuppDcInv();
    LoadMainGrid();
}

function InvMainList() {
    $('#tblInvmaingrid').DataTable().destroy();
    ListSupplier();
    ListOrdRef();
    LoadMainGrid();
}

function SuppInvMainList() {
    $('#tblInvmaingrid').DataTable().destroy();
    ListSupplier();
    ListOrdRef();
    LoadMainGrid();
}

function getbyID(Id) {

    GInvId = Id;
    $.ajax({
        url: "/PurchaseInvoice/LoadEditInvDetails",
        data: JSON.stringify({ pur_invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtComp').val(obj[0]["Company"]);
                $('#txtSupp').val(obj[0]["Supplier"]);
                $('#txtInvoiceDate').val(moment(obj[0]["supp_inv_date"]).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(obj[0]["invoice_date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceNo').val(obj[0]["supp_inv_no"]);
                $('#txtEntryNo').val(obj[0]["invoice_no"]);
                $('#txtCompanyId').val(obj[0]["company_id"]);
                $('#txtSuppId').val(obj[0]["supplierid"]);

                $('#txtCurrency').val(obj[0]["CurrencyId"]);
                $('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                $('#txtGrossAmount').val(obj[0]["Gross_amount"]);
                $('#txtRemarks').val(obj[0]["remarks"]);


                $('#txtCreditRate').val(obj[0]["CRateDiff"]);
                $('#txtDebitRate').val(obj[0]["DRateDiff"]);
                $('#txtRateReason').val(obj[0]["DReason"]);

                CmpId = obj[0]["company_id"];
                SuppId = obj[0]["supplierid"];
                var DebCreId = obj[0]["DebCreId"];

                


                if (ChkBillNo == "True") {
                    $('#dptInvId').show();
                    $('#txtInvId').hide();
                    $('#optNewBill').show();
                } else {
                    $('#txtInvId').show();
                    $('#dptInvId').hide();
                    $('#optNewBill').hide();
                }

                LoadPurInvGrnEdit(Id, CmpId, SuppId);
                LoadPurInvAddlessEdit(Id);

                EditLoadBillInvNoAmt(CmpId, SuppId);

                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#Update').show();
                $('#Add').hide();
                $('#Delete').hide();
                if (obj[0]["Passed"] == true) {
                    //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                    var msg = 'Bill pass are made for this entry,Cannot update the INVOICE...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#Update').attr("disabled", true);

                } else if (obj[0]["Passed"] == false) {

                    $('#Update').attr("disabled", false);

                }
               
                 OrdType = $('input[name="MOType"]:checked').attr('value');


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadPurInvGrnEdit(InvId, CompId, SuppId) {
    debugger;

    $.ajax({
        url: "/PurchaseInvoice/GetInvGrnEditItemDetails",
        data: JSON.stringify({ pur_invid: InvId, company_id: CompId, supplierid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            GrnItemList = result;
            loadGrnItemTable(GrnItemList);
            var IId = 0;
            var CId = 0;
            var SId = 0;
            var GrnDtid = 0;
            GrId = GrnItemList[0].pur_grn_masid;

            LoadInvEditItemDetails(InvId, GrId, CompId, SuppId);
            LoadInvEditOrderDetails(InvId, CompId, SuppId, IId, CId, SId, GrnDtid);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadInvEditItemDetails(InvId, GrId, CompId, SuppId) {
    debugger;



    $.ajax({
        url: "/PurchaseInvoice/GetInvEditItemDetails",
        data: JSON.stringify({ Pur_inv_id: InvId, Pur_grn_masid: GrId, company_id: CompId, supplierid: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            ESaveItemList = result;
            loadInvSaveItemTable(ESaveItemList);




            var Cb = ESaveItemList[0].CAbb;
            var ExRate = ESaveItemList[0].EXRate;
            var CuId = ESaveItemList[0].CurrId;

            $('#txtCurrency').val(Cb);
            $('#txtExchangeRate').val(ExRate);
            $('#txtCurrencyId').val(CuId);


            GrnDetid = ESaveItemList[0].Pur_grn_detid;

            EItemList = ESaveItemList;

            EItemList = $.grep(EItemList, function (v) {
                return (v.Pur_grn_masid === GrId);
            });

            loadInvItemTable(EItemList);

            var PtotalQty = 0;
            for (var e = 0; e < ESaveItemList.length; e++) {
                if (ESaveItemList[e].DiffQty > 0) {
                    var qn = ESaveItemList[e].DiffQty;
                    PtotalQty = PtotalQty + parseFloat(qn);
                }
            }

            var NtotalQty = 0;
            for (var e = 0; e < ESaveItemList.length; e++) {
                if (ESaveItemList[e].DiffQty < 0) {
                    var qn = ESaveItemList[e].DiffQty;
                    NtotalQty = NtotalQty + parseFloat(qn);
                }
            }

            var tot = (-(NtotalQty));

            $('#txtDebitQty').val(parseFloat(PtotalQty).toFixed(2));
            $('#txtCreditQty').val(parseFloat(tot).toFixed(2));

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadInvEditOrderDetails(InvId, CompId, SuppId, ItmId, ClrId, SzId, GrnDetId) {
    debugger;

    $.ajax({
        url: "/PurchaseInvoice/GetInvEditOrdDetails",
        data: JSON.stringify({ Pur_invID: InvId, company_id: CompId, supplierid: SuppId, OItemID: ItmId, OColorID: ClrId, OSizeID: SzId, Pur_Inv_DetID: GrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OSaveItemList = result;
            //loadInvOrdTable(OItemList);
            loadInvOrdSaveTable(OSaveItemList);

            OItemList = OSaveItemList;

            OItemList = $.grep(OItemList, function (v) {
                return (v.Pur_Inv_DetID === GrnDetid);
            });

            loadInvOrdTable(OItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadPurInvAddlessEdit(Id) {
    debugger;

    $.ajax({
        url: "/PurchaseInvoice/GetInvEditAddLessDetails",
        data: JSON.stringify({ Pur_invID: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AccList = result;
            loadAccTable(AccList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function InvUpdate() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Check Qty
    var opchk = [];

    for (var y = 0; y < EItemList.length; y++) {
        if (EItemList[y].InvoiceQty > 0) {
            opchk.push(EItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < EItemList.length; y++) {
        if (EItemList[y].InvRate > 0) {
            opchk.push(EItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }

    var CompId = $('#txtCompanyId').val();
    var SuppId = $('#txtSuppId').val();

    var objPurSubmit = {

        company_id: CompId,
        invoice_no: $('#txtEntryNo').val(),
        invoice_date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        supplierid: SuppId,
        company_unitid: 0,
        Gross_amount: $('#txtGrossAmount').val(),
        Addless_amount: $('#txtAmount').val(),
        invoice_value: $('#txtNetAmount').val(),
        supp_inv_no: InvBillNo,
        supp_inv_date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        remarks: $('#txtRemarks').val(),
        DebtRaised: "N",
        Approved: "N",
        AddLessManualOrFormula: "M",
        CurrencyId: $('#txtCurrency').val(),
        ExchangeRate: $('#txtExchangeRate').val(),
        CreatedBy: Guserid,
        CurrencyId: $('#txtCurrencyId').val(),
        CRateDiff: $('#txtCreditRate').val(),
        DRateDiff: $('#txtDebitRate').val(),
        DReason: $('#txtQtyReason').val(),
        DHead: "RateDifference",
        pur_invid: GInvId,

        PurInvDDet: ESaveItemList,
        PurInvOrdDDet: OSaveItemList,
        PurInvDcDet: GrnItemList,
        PurInvAddLess: AccList,
    };
    debugger;
    $("#Update").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseInvoice/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                if (ChkBillNo == 'True') {
                    AddInvBillNo("Y");
                }
                AddUserEntryLog('Procurement', 'Purchase Invoice', 'UPDATE', $("#txtEntryNo").val());
                //alert("Data Updated Sucessfully");
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal1').modal('hide');
                //window.location.reload();
                //$('#tblMainDelidetails').DataTable().destroy();
                //ListMainUnit();
                //ListOrderRefNo();
                //ListDisNo();
                //ListIssueNo();
                //LoadMainGrid();
                ClearAddData();

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getDeleteID(Id) {
    GInvId = Id;
    $.ajax({
        url: "/PurchaseInvoice/LoadEditInvDetails",
        data: JSON.stringify({ pur_invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtComp').val(obj[0]["Company"]);
                $('#txtSupp').val(obj[0]["Supplier"]);
                $('#txtInvoiceDate').val(moment(obj[0]["supp_inv_date"]).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(obj[0]["invoice_date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceNo').val(obj[0]["supp_inv_no"]);
                $('#txtEntryNo').val(obj[0]["invoice_no"]);
                $('#txtCompanyId').val(obj[0]["company_id"]);
                $('#txtSuppId').val(obj[0]["supplierid"]);
                $('#txtCurrency').val(obj[0]["CurrencyId"]);
                $('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                $('#txtGrossAmount').val(obj[0]["Gross_amount"]);
                $('#txtRemarks').val(obj[0]["remarks"]);
                $('#txtCreditRate').val(obj[0]["CRateDiff"]);
                $('#txtDebitRate').val(obj[0]["DRateDiff"]);
                $('#txtRateReason').val(obj[0]["DReason"]);

                var CmpId = obj[0]["company_id"];
                var SuppId = obj[0]["supplierid"];
                var DebCreId = obj[0]["DebCreId"];

                LoadPurInvGrnEdit(Id, CmpId, SuppId);
                LoadPurInvAddlessEdit(Id);
                EditLoadBillInvNoAmt(CmpId, SuppId);

                if (ChkBillNo == "True") {
                    $('#dptInvId').show();
                    $('#txtInvId').hide();
                    $('#optNewBill').show();
                } else {
                    $('#txtInvId').show();
                    $('#dptInvId').hide();
                    $('#optNewBill').hide();
                }
                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#Update').hide();
                $('#Add').hide();
                $('#Delete').show();
                if (obj[0]["Passed"] == true) {
                    //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                    var msg = 'Bill pass are made for this entry,Cannot Delete the INVOICE...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#Delete').attr("disabled", true);

                } else if (obj[0]["Passed"] == false) {

                    $('#Delete').attr("disabled", false);

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

function InvDelete() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (EItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    //Check Qty
    var opchk = [];

    for (var y = 0; y < EItemList.length; y++) {
        if (EItemList[y].InvoiceQty > 0) {
            opchk.push(EItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one invocie qty...');
        var msg = 'Please fill atleast any one invocie quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    //Check Rate
    var opchk = [];

    for (var y = 0; y < EItemList.length; y++) {
        if (EItemList[y].InvRate > 0) {
            opchk.push(EItemList[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one rate...');
        var msg = 'Please fill atleast any one rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var InvBillNo = 0;

    //if (ChkBillNo == 'True') {

    //    var CNetAmt = $('#txtNetAmount').val();

    //    if (CNetAmt != GBillAmount) {
    //        alert("Bill Amount Should Match With Net Amount..");
    //        var msg = 'Bill Amount Should Match With Net Amount...';
    //        var flg = 4;
    //        var mod = 1;
    //        var url = "";
    //        AlartMessage(msg, flg, mod, url);
    //        return true;
    //    }
    //    InvBillNo = $('#ddlInvoiceNo option:selected').text();
    //} else {

    //    InvBillNo = $('#txtInvoiceNo').val();
    //}

    var CompId = $('#txtCompanyId').val();
    var SuppId = $('#txtSuppId').val();

    var objPurSubmit = {

        company_id: CompId,
        invoice_no: $('#txtEntryNo').val(),
        invoice_date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        supplierid: SuppId,
        company_unitid: 0,
        Gross_amount: $('#txtGrossAmount').val(),
        Addless_amount: $('#txtAmount').val(),
        invoice_value: $('#txtNetAmount').val(),
        supp_inv_no: InvBillNo,
        supp_inv_date: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        remarks: $('#txtRemarks').val(),
        DebtRaised: "N",
        Approved: "N",
        AddLessManualOrFormula: "M",
        CurrencyId: $('#txtCurrency').val(),
        ExchangeRate: $('#txtExchangeRate').val(),
        CreatedBy: Guserid,
        CurrencyId: $('#txtCurrencyId').val(),
        CRateDiff: $('#txtCreditRate').val(),
        DRateDiff: $('#txtDebitRate').val(),
        DReason: $('#txtQtyReason').val(),
        DHead: "RateDifference",
        pur_invid: GInvId,

        PurInvDDet: ESaveItemList,
        PurInvOrdDDet: OSaveItemList,
        PurInvDcDet: GrnItemList,
        PurInvAddLess: AccList,
    };
    debugger;
    $("#Delete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PurchaseInvoice/Delete",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {
                AddInvBillNo("N");
                AddUserEntryLog('Procurement', 'Purchase Invoice', 'DELETE', $("#txtEntryNo").val());
                //alert("Data Deleted Sucessfully");
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);

                $('#myModal1').modal('hide');
                //window.location.reload();
                //$('#tblMainDelidetails').DataTable().destroy();
                //ListMainUnit();
                //ListOrderRefNo();
                //ListDisNo();
                //ListIssueNo();
                //LoadMainGrid();
                ClearAddData();

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function PurInvPrint(Id) {
    debugger;

    Repid = Id;
    $('#myModal2').modal('show');

    docname = "PURCHASE INVOICE";
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

    var compid = $('#ddlMCompany').val();

    window.open("../ReportInline/Stores/PurchaseInvoice/PurchaseInvoiceInlineReport.aspx?Masid=" + Repid + "&Rem=" + p[0] + "&Style=" + p[1] + "&Purrate=" + p[2] + "&Invqty=" + p[3] + "&Ewaybill=" + p[4] + "&Ewaydate=" + p[5] + "&Companyid=" + compid);
}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function LoaddropNo() {
    LoadOrderNo();
}

function LoadBillInvNo(comid, suppid) {

    var EDate = $('#txtEntryDate').val();
    var billid = 0;
    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: comid, SupplierId: suppid, Inv_Date: EDate, BillId: billid, IorE: 'E' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            //GBillAmount = obj[0]["Inv_Amount"];
            //GBillDate = obj[0]["Inv_Date"];


            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNo).empty();

                $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });

            }
        }

    });

}

function LoadBillInvNoAmt() {
    debugger;
    var EDate = $('#txtEntryDate').val();
    var billid = $('select#ddlInvoiceNo option:selected').val();//$('#ddlInvoiceNo').val();
    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, BillId: billid, IorE: 'E' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (obj != undefined) {

                if (billid > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                    $('#txtInvoiceDate').val(GBillDate);
                }
                else {
                    GBillAmount = 0;
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = "";
                    $('#txtInvoiceDate').val(GBillDate);
                }
            }
            else {

            }

        }

    });

}

function EditLoadBillInvNoAmt(GCompId, GSuppId) {
    debugger;
    var EDate = $('#txtEntryDate').val();
    var entryno = $('#txtEntryNo').val();//$('#ddlInvoiceNo').val();

    $.ajax({
        url: "/ProcessInvoice/GetEditBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, Entry_No: entryno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNo).empty();

                // $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });
                if (obj.length > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                    $('#txtInvoiceDate').val(GBillDate);
                }
            }

        }

    });

}

function LoadNewBill() {

    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#chkbillStatus').is(":checked");
        if (ischecked == true) {
            LoadBillInvNo(CmpId, SuppId);
        }
        else {
            EditLoadBillInvNoAmt(CmpId, SuppId);
        }
    });
}

function AddInvBillNo(MType) {
    debugger;
    var billId = $('#ddlInvoiceNo option:selected').val();
    var EntryNo = $('#txtEntryNo').val();
    $.ajax({
        url: "/ProcessInvoice/BillAdd",
        data: JSON.stringify({ billId: billId, EntryNo: EntryNo, MType: MType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {


            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}