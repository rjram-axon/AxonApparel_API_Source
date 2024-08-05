var InvList = [];
var purmad = [];
var DCompid = 0;
var CmpId = 0;
var SuppId = 0;
var ChkBillNo = 0;
var GrnItemList = [];
var GrId = 0;
var ESaveItemList = [];
var AccList = [];
var GBillAmount = 0;
var GBillDate = 0;
var OSaveItemList = [];
var PurGrnViewList = [];
var GrnViewList = [];
var ProdGrnViewList = [];
var OItemList = [];
var GrnDetid = 0;
var EItemList = [];
var Guserid = 0;

var PInvIdpro = 0;
var CmpIdpro = 0;
var SuppIdpro = 0;
var OrdTypepro = 0;
var ProcessId = 0;
var ProcessInvId = 0;
var UnitIdpro = 0;
var ProType = 0;
var PrnItemListpro = [];
var PrnMasIdpro = 0;
var PESaveItemListpro = [];
var PrnDetid = 0;
var PEItemListpro = [];
var POSaveItemListpro = [];
var POItemListpro = [];
var AccListpro = [];
var CreDebListpro = [];
var CreDebSaveListpro = [];
var ChkBillNopro = 0;
var GBillAmount = 0;
var GBillDate = 0;

var CmpIdprd = 0;
var SuppIdprd = 0;
var ProcessIdprd = 0;
var ProdInvIdprd = 0;
var UnitIdprd = 0;
var ProTypeprd = 0;
var ITypeprd = 0;
var ChkBillNoprd = 0;
var PrdItemListprd = [];
var ProdMasIdprd = 0;
var PDESaveItemListprd = [];
var PrdnDetidprd = 0;
var PDEItemListprd = [];
var PDOSaveItemListprd = [];
var PDOItemListprd = [];
var AccListprd = [];
var CreDebSaveListprd = [];
var CreDebListprd = [];
var GBillAmountprd = 0;
var GBillDateprd = 0;

var Invid = 0;
var GCompId = 0;
var GSuppId = 0;
var GOtype = 0;
var ChkBillNo = 0;
var GBillAmount = 0;
var GBillDate = 0;
var Itmdet = [];
var AccListOI = [];
$(document).ready(function () {
    debugger;

    getDate();
    //$('#txtFromDate').datepicker({
    //    dateformat: 'dd/mm/yy',
    //    onselect: function (datastring, txtdate) {
    //        DtChk = true;
    //    }
    //});
    
    Guserid = $("#hdnUserid").data('value');
    LoadCompanyDDL("#ddlCompany,#ddlcompanyo");
    LoadSupplierDDL("#ddlSupplier");
    LoadCompanyUnitDDL("#ddlCompanyUnito");
    LoadBuyerDDL('#ddlBuyer');
    LoadOrderNoDDL('#ddlOrderNo');
    LoadBuyRefNoDDL('#ddlRefNo');
    DCompid = $("#hdnDCompid").data('value');
    LoadJobNoDDL("#ddlwrkordo");
    LoadRefNoDDL("#ddlrefnoo");
    LoadOrderNoDDL("#ddlordernoo");
    LoadSupplierDDL("#ddlSuppliero");
    LoadCurrencyDDL("#ddlCurrencyo");
    LoadData();
    SuppInvNoDDl();
    $('#tblProcessdetails').hide();
    $('#tblProductiondetails').hide();
    $('#tblOpenInvoicedetails').hide();
    $('#tblEntryGrndetailsPur').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblEntryGrndetailsPur').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblEntryGrndetailsPur').dataTable().fnGetData(row);
              

        var GrId = data.pur_grn_masid; //table.row($(this).parents('tr')).data()["pur_grn_masid"];



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
    $('#tblItemdetailsPur').on('click', 'tr', function (e) {
        //debugger;

        var table = $('#tblItemdetailsPur').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblItemdetailsPur').dataTable().fnGetData(row);

        var ItmId = data.ItemId; //table.row($(this).parents('tr')).data()["ItemId"];
        var ClrId = data.ColorId; //table.row($(this).parents('tr')).data()["ColorId"];
        var SzId = data.SizeId; //table.row($(this).parents('tr')).data()["SizeId"];
        var GrdetId = data.Pur_grn_detid; //table.row($(this).parents('tr')).data()["Pur_grn_detid"];



        var OItemList = [];
        OItemList = OSaveItemList;

        OItemList = $.grep(OItemList, function (v) {
            return (v.Pur_Inv_DetID === GrdetId);
        });

        loadInvOrdTable(OItemList);

    });
    $(document).on('click', '.Purchase', function () {
        debugger;
        var table = $('#tblPurchasedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'True';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblPurchasedetails').DataTable();
        var data = table.rows().data();
                var row = $(this).closest('tr');
                row.find('#PurchaseHo').prop("checked", false);
                row.find('#PurchaseRt').prop("checked", false);

    });
    $(document).on('click', '.PurchaseHo', function () {
        debugger;
        var table = $('#tblPurchasedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'H';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblPurchasedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#Purchase').prop("checked", false);
        row.find('#PurchaseRt').prop("checked", false);

    });
    $(document).on('click', '.PurchaseRt', function () {
        debugger;
        var table = $('#tblPurchasedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'R';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblPurchasedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#PurchaseHo').prop("checked", false);
        row.find('#Purchase').prop("checked", false);
    });
    $(document).on('click', '.btnItemviewPur', function () {
        debugger;
        var table = $('#tblItemdetailsPur').DataTable();
        var row = $(this).closest('tr');
        var Data = $('#tblItemdetailsPur').dataTable().fnGetData(row);
        var GrnNo = Data.GrnNo
        var Itemid = Data.ItemId
        var Colorid = Data.ColorId
        var Sizeid = Data.SizeId
        var type = 'P'
        Grnitemview(GrnNo, Itemid, Colorid, Sizeid, type);
    
    });
    $(document).on('click', '.btnItemviewPro', function () {
        debugger;
        var table = $('#tblPItemdetailspro').DataTable();
        var row = $(this).closest('tr');
        var Data = $('#tblPItemdetailspro').dataTable().fnGetData(row);
        var GrnNo = Data.Proc_recpt_no
        var Itemid = Data.ItemId
        var Colorid = Data.ColorId
        var Sizeid = Data.SizeId
        var type = 'R'
        Grnitemview(GrnNo, Itemid, Colorid, Sizeid, type);

    });
    $(document).on('click', '.btnItemviewPrd', function () {
        debugger;
        var table = $('#tblPrditmdetailsprd').DataTable();
        var row = $(this).closest('tr');
        var Data = $('#tblPrditmdetailsprd').dataTable().fnGetData(row);
        var GrnNo = Data.ReciptNo
        var Itemid = Data.ItemId
        var Colorid = Data.ColorId
        var Sizeid = Data.SizeId
        var type = 'D'
        Grnitemview(GrnNo, Itemid, Colorid, Sizeid, type);

    });
    $(document).on('click', '.Process', function () {
        debugger;

        var table = $('#tblProcessdetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'True';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblProcessdetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#ProcessHo').prop("checked", false);
        row.find('#ProcessRt').prop("checked", false);
    });
    $(document).on('click', '.ProcessHo', function () {
        debugger;

        var table = $('#tblProcessdetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'H';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblProcessdetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#Process').prop("checked", false);
        row.find('#ProcessRt').prop("checked", false);
    });
    $(document).on('click', '.ProcessRt', function () {
        debugger;

        var table = $('#tblProcessdetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'R';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblProcessdetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#ProcessHo').prop("checked", false);
        row.find('#Process').prop("checked", false);
    });

    $(document).on('click', '.Production', function () {
        debugger;

        var table = $('#tblProductiondetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'Y';
                    InvList[f].UserId = Guserid;
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'N';
                    InvList[f].UserId = Guserid;
                }
            }
        }
        var table = $('#tblProductiondetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#ProductionHo').prop("checked", false);
        row.find('#ProductionRt').prop("checked", false);
    });
    $(document).on('click', '.ProductionHo', function () {
        debugger;

        var table = $('#tblProductiondetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'H';
                    InvList[f].UserId = Guserid;
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'N';
                    InvList[f].UserId = Guserid;
                }
            }
        }
        var table = $('#tblProductiondetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#Production').prop("checked", false);
        row.find('#ProductionRt').prop("checked", false);
    });
    $(document).on('click', '.ProductionRt', function () {
        debugger;

        var table = $('#tblProductiondetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'R';
                    InvList[f].UserId = Guserid;
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'N';
                    InvList[f].UserId = Guserid;
                }
            }
        }
        var table = $('#tblProductiondetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#ProductionHo').prop("checked", false);
        row.find('#Production').prop("checked", false);
    });
    $(document).on('click', '.Openinvoice', function () {
        debugger;

        var table = $('#tblOpenInvoicedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 1;
                    InvList[f].UserId = Guserid;
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 0;
                    InvList[f].UserId = Guserid;
                }
            }
        }
        var table = $('#tblOpenInvoicedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#OpeninvoiceHo').prop("checked", false);
        row.find('#OpeninvoiceRt').prop("checked", false);
    });
  

    $(document).on('click', '.OpeninvoiceHo', function () {
        debugger;

        var table = $('#tblOpenInvoicedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 2;
                    InvList[f].UserId = Guserid;
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 0;
                    InvList[f].UserId = Guserid;
                }
            }
        }
        var table = $('#tblOpenInvoicedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#Openinvoice').prop("checked", false);
        row.find('#OpeninvoiceRt').prop("checked", false);
    });
    $(document).on('click', '.OpeninvoiceRt', function () {
        debugger;

        var table = $('#tblOpenInvoicedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 3;
                    InvList[f].UserId = Guserid;
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 0;
                    InvList[f].UserId = Guserid;
                }
            }
        }
        var table = $('#tblOpenInvoicedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#OpeninvoiceHo').prop("checked", false);
        row.find('#Openinvoice').prop("checked", false);
    });

    $(document).on('click', '.Commercialinvoice', function () {
        debugger;
        var table = $('#tblCommercialInvoicedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'True';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblCommercialInvoicedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#CommercialinvoiceHo').prop("checked", false);
        row.find('#CommercialinvoiceRt').prop("checked", false);

    });
    $(document).on('click', '.CommercialinvoiceHo', function () {
        debugger;
        var table = $('#tblCommercialInvoicedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'H';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblCommercialInvoicedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#Commercialinvoice').prop("checked", false);
        row.find('#CommercialinvoiceRt').prop("checked", false);

    });
    $(document).on('click', '.CommercialinvoiceRt', function () {
        debugger;
        var table = $('#tblCommercialInvoicedetails').DataTable();
        var slno = table.row($(this).parents('tr')).data()["pur_invid"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'R';
                }
            }
        }
        else {
            for (var f = 0; f < InvList.length; f++) {
                if (InvList[f].pur_invid == slno) {
                    InvList[f].passed = 'False';
                    InvList[f].UserId = Guserid;
                    InvList[f].Hold_OR_Ret = 'N';
                }
            }
        }
        var table = $('#tblCommercialInvoicedetails').DataTable();
        var data = table.rows().data();
        var row = $(this).closest('tr');
        row.find('#CommercialinvoiceHo').prop("checked", false);
        row.find('#Commercialinvoice').prop("checked", false);
    });

    $('#tblPrnitmdetailspro').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblPrnitmdetailspro').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPrnitmdetailspro').dataTable().fnGetData(row);

        var CSno = data.proc_recpt_masid;

        var colorempty = [];
        colorempty = PESaveItemListpro;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Proc_Recpt_Masid === CSno);
        });

        PEItemListpro = colorempty;
        loadPInvItemTable(PEItemListpro);

        if (PEItemListpro.length > 0) {
            var detid = PEItemListpro[0].Proc_Recpt_Detid;

            POItemListpro = $.grep(POSaveItemListpro, function (v) {
                return (v.Process_recpt_DetId === detid);
            });

            loadPInvOrdTable(POItemListpro);
        }

        if (CreDebSaveListpro.length > 0) {
            CreDebListpro = $.grep(CreDebSaveListpro, function (v) {
                return (v.Proc_Recpt_Masid === CSno);
            });
            loadCreDebTable(CreDebListpro);
        }

    });
    $('#tblPItemdetailspro').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblPItemdetailspro').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPItemdetailspro').dataTable().fnGetData(row);

        var CSno = data.Proc_Recpt_Detid;


        var colorempty = [];
        colorempty = POSaveItemListpro;

        colorempty = $.grep(colorempty, function (v) {
            return (v.Process_recpt_DetId === CSno);
        });

        POItemListpro = colorempty;
        loadPInvOrdTable(POItemListpro);

    });
    $('#tblPrdndetailsprd').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tblPrdndetailsprd').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPrdndetailsprd').dataTable().fnGetData(row);
        var CSno = data.prod_recpt_masid;
        PDEItemListprd = $.grep(PDESaveItemListprd, function (v) {
            return (v.GrnMasid === CSno);
        });

        loadPDInvItemTable(PDEItemListprd);

        if (PDEItemListprd.length > 0) {
            var detid = PDEItemListprd[0].Grndetid;

            PDOItemListprd = $.grep(PDOSaveItemListprd, function (v) {
                return (v.Prod_recpt_DetId === detid);
            });

            loadPDInvOrdTable(PDOItemListprd);
        }

        if (CreDebSaveListprd.length > 0) {
            CreDebListprd = $.grep(CreDebSaveListprd, function (v) {
                return (v.Proc_Recpt_Masid === CSno);
            });
            loadCreDebTable(CreDebListprd);
        }

    });
    $('#tblPrditmdetailsprd').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tblPrditmdetailsprd').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblPrditmdetailsprd').dataTable().fnGetData(row);
        var recdetid = data.Grndetid;

        if (PDOSaveItemListprd.length > 0) {
            PDOItemListprd = $.grep(PDOSaveItemListprd, function (v) {
                return (v.Prod_recpt_DetId === recdetid);
            });
            loadPDInvOrdTable(PDOItemListprd);
        }
    });
    $(document).on('click', '#PurViewitem', function () {
        debugger;
        var table = $('#tblPurchasedetails').DataTable();
        var ID = table.row($(this).parents('tr')).data()["pur_invid"];
        PurgetbyID(ID);
    });
    $(document).on('click', '#ProcViewitem', function () {
        debugger;
        var table = $('#tblProcessdetails').DataTable();
        var ID = table.row($(this).parents('tr')).data()["pur_invid"];
        ProcgetbyID(ID);
    });
    $(document).on('click', '#ProdViewitem', function () {
        debugger;
        var table = $('#tblProductiondetails').DataTable();
        var ID = table.row($(this).parents('tr')).data()["pur_invid"];
        ProdgetbyID(ID);
    });
    $(document).on('click', '#OIViewitem', function () {
        debugger;
        var table = $('#tblOpenInvoicedetails').DataTable();
        var ID = table.row($(this).parents('tr')).data()["pur_invid"];
       
        OIgetbyID(ID);
    });
});
function PurGrnitemview(Data,type){
    debugger;
    var GrnNo = Data.GrnNo
    var Itemid = Data.ItemId
    var Colorid = Data.ColorId
    var Sizeid = Data.Sizeid
    $.ajax({
        url: "/BillPassController/Grnview",
        data: JSON.stringify({ GrnNo: GrnNo, Itemid: Itemid, Colorid: Colorid, sizeid: Sizeid, Type: type }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            PurGrnViewList = result;
            loadInvSaveItemTable(PurGrnViewList);

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
        });

}
function Grnitemview(GrnNo, Itemid, Colorid, Sizeid, type) {
    debugger;
    
    $.ajax({
        url: "/BillPass/Grnview/",
        data: JSON.stringify({ GrnNo: GrnNo, Itemid: Itemid, Colorid: Colorid, sizeid: Sizeid, Type: type }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            GrnViewList = result;
            LoadGrnTalbe(GrnViewList);
            $('#MyModalGrnViewTable').modal('show');
            if (type == 'P') {
                $('#Purdet').show();
                $('#Procdet').hide();
                $('#Proddet').hide();
            } else if (type == 'R') {
                $('#Purdet').hide();
                $('#Procdet').show();
                $('#Proddet').hide();
            } else if (type == 'D') {
                $('#Purdet').hide();
                $('#Procdet').hide();
                $('#Proddet').show();
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function LoadGrnTalbe(GrnViewList) {
    $('#Grnviewtable').DataTable().destroy();
    debugger;

    var table = $('#Grnviewtable').DataTable({
        data: GrnViewList,
        columns: [
            { title: "PO No", data: "PONo" },
            {
                title: "PO Date", data: "PODate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Order Qty", data: "Order_QTY" },
            { title: "Rate", data: "GrnRate" },
            //{ title: "Order No", data: "" },
            //{ title: "Style", data: "" },

        ]
    });
}
function PurgetbyID(Id) {

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

                $('#txtCompPur').val(obj[0]["Company"]);
                $('#txtSuppPur').val(obj[0]["Supplier"]);
                $('#txtInvoiceDatePur').val(moment(obj[0]["supp_inv_date"]).format('DD/MM/YYYY'));
                $('#txtEntryDatePur').val(moment(obj[0]["invoice_date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceNoPur').val(obj[0]["supp_inv_no"]);
                $('#txtEntryNoPur').val(obj[0]["invoice_no"]);
                $('#txtCompanyIdPur').val(obj[0]["company_id"]);
                $('#txtSuppIdPur').val(obj[0]["supplierid"]);

                $('#txtCurrencyPur').val(obj[0]["CurrencyId"]);
                $('#txtExchangeRatePur').val(obj[0]["ExchangeRate"]);
                $('#txtGrossAmountPur').val(obj[0]["Gross_amount"]);
                $('#txtRemarksPur').val(obj[0]["remarks"]);


                $('#txtCreditRatePur').val(obj[0]["CRateDiff"]);
                $('#txtDebitRatePur').val(obj[0]["DRateDiff"]);
                $('#txtRateReasonPur').val(obj[0]["DReason"]);

                CmpId = obj[0]["company_id"];
                SuppId = obj[0]["supplierid"];
                var DebCreId = obj[0]["DebCreId"];




                if (ChkBillNo == "True") {
                    $('#dptInvIdPur').show();
                    $('#txtInvIdPur').hide();
                    $('#optNewBillPur').show();
                } else {
                    $('#txtInvIdPur').show();
                    $('#dptInvIdPur').hide();
                    $('#optNewBillPur').hide();
                }

                LoadPurInvGrnEdit(Id, CmpId, SuppId);
                LoadPurInvAddlessEdit(Id);

                EditLoadBillInvNoAmt(CmpId, SuppId);

                $('#myModal1Pur').modal('show');
               



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
            loadAccTablepru(AccList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function EditLoadBillInvNoAmt(GCompId, GSuppId) {
    debugger;
    var EDate = $('#txtEntryDatePur').val();
    var entryno = $('#txtEntryNoPur').val();//$('#ddlInvoiceNo').val();

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
                $(ddlInvoiceNoPur).empty();

                // $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNoPur).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });
                if (obj.length > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];
                    $('#txtInvoiceAmtPur').val(GBillAmount);
                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                    $('#txtInvoiceDatePur').val(GBillDate);
                }
            }

        }

    });

}
function loadGrnItemTable(GrnItemList) {

    $('#tblEntryGrndetailsPur').DataTable().destroy();
    debugger;

    var table = $('#tblEntryGrndetailsPur').DataTable({

        data: GrnItemList,
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



    $("#tblEntryGrndetailsPur tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryGrndetailsPur tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
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

            $('#txtCurrencyPur').val(Cb);
            $('#txtExchangeRatePur').val(ExRate);
            $('#txtCurrencyIdPur').val(CuId);


            GrnDetid = ESaveItemList[0].Pur_grn_detid;

            EItemList = ESaveItemList;

            EItemList = $.grep(EItemList, function (v) {
                return (v.Pur_grn_masid === GrId);
            });

            loadInvItemTable(EItemList);



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
function loadInvSaveItemTable(ESaveItemList) {

    $('#tblItemSavedetailsPur').DataTable().destroy();
    debugger;

    var table = $('#tblItemSavedetailsPur').DataTable({
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
function loadInvItemTable(EItemList) {

    $('#tblItemdetailsPur').DataTable().destroy();
    debugger;

    var table = $('#tblItemdetailsPur').DataTable({
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
            { title: "GrnNo", data: "GrnNo", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
             { title: "Rev Qty", data: "balance_qty" },
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

                {
                    title: "VIEW", data: "Pur_inv_id",
                    render: function (data) {
                        return '<a id="grnitemtabpur" onclick="" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnItemviewPur btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
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


    $("#tblItemdetailsPur tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemdetailsPur tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
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
                minusamt = parseFloat(minusamt) + Amt;
            }

        })

        TotNetAmt = TotGrossAmt;
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;



        TotNetAmt = parseFloat(TotNetAmt).toFixed(DecimalPlace);
        $('#txtNetAmountPur').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
        $('#txtNetAmountPur').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
    $('#txtGrossAmountPur').val(TotGrossAmt);

}
function loadInvOrdSaveTable(OSaveItemList) {

    $('#tblInvOrdSavedetailsPur').DataTable().destroy();
    debugger;

    var table = $('#tblInvOrdSavedetailsPur').DataTable({
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
function loadInvOrdTable(OItemList) {

    $('#tblInvOrddetailsPur').DataTable().destroy();
    //debugger;

    var table = $('#tblInvOrddetailsPur').DataTable({
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
               { title: "Received Qty", data: "ReceQty" },
                 { title: "Excess Qty", data: "ExcessQty" },
                   { title: "Debit Qty", data: "debit_qty" },
                     { title: "Receivable Qty", data: "receivable_qty" },
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
function loadAccTablepru(AcListObj) {
    debugger;
    $('#tblPaydetailsPur').DataTable().destroy();

    $('#tblPaydetailsPur').DataTable({
        data: AccList,
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

               { title: "AddlessId", data: "addless_id", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "aorl", },
               { title: "Percent", data: "percentage", },
               { title: "Amount", data: "amount", },

               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               //},

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
function ProcgetbyID(Id) {

    PInvIdpro = Id;
    $.ajax({
        url: "/ProcessInvoice/LoadEditProInvDetails",
        data: JSON.stringify({ Process_Invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtcompanypro').val(obj[0]["Company"]);
                $('#txtProcessorpro').val(obj[0]["Supplier"]);
                $('#txtEntryDatepro').val(moment(obj[0]["Entry_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceDatepro').val(moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceNopro').val(obj[0]["Inv_No"]);
                $('#txtEntrynopro').val(obj[0]["Entry_No"]);
                $('#txtProcesspro').val(obj[0]["Process"]);
                $('#txtUnitpro').val(obj[0]["Unit"]);

                //$('#txtCurrency').val(obj[0]["CurrencyId"]);
                //$('#txtExchangeRate').val(obj[0]["ExchangeRate"]);
                //$('#txtGrossAmount').val(obj[0]["Gross_amount"]);
                $('#txtRemarkspro').val(obj[0]["remarks"]);


                //$('#txtCreditRate').val(obj[0]["CRateDiff"]);
                //$('#txtDebitRate').val(obj[0]["DRateDiff"]);
                //$('#txtRateReason').val(obj[0]["DReason"]);

                CmpIdpro = obj[0]["CompanyId"];
                SuppIdpro = obj[0]["SupplierId"];
                OrdTypepro = obj[0]["OrderType"];
                if (OrdTypepro == 'W') {
                    $('#optMS').prop('checked', true);
                }
                else if (OrdTypepro == 'S') {
                    $('#optSS').prop('checked', true);
                }
                else if (OrdTypepro == 'E') {
                    $('#optES').prop('checked', true);
                }
                else if (OrdTypepro == 'G') {
                    $('#optGS').prop('checked', true);
                }
                ProcessId = obj[0]["ProcessId"];
                ProcessInvId = obj[0]["Process_Invid"];
                UnitIdpro = obj[0]["UnitIdpro"];
                ProType = obj[0]["InternalOrExternal"];

                if (ChkBillNopro == "True") {
                    $('#dptInvIdpro').show();
                    $('#txtInvIdpro').hide();
                    $('#optNewBillpro').show();
                } else {
                    $('#txtInvIdpro').show();
                    $('#dptInvIdpro').hide();
                    $('#optNewBillpro').hide();
                }

                LoadProInvPrnEdit(Id, CmpIdpro, SuppIdpro);
                LoadProInvAddlessEdit(Id);
                LoadProInvRateDiffEdit(Id);
                EditLoadBillInvNoAmt(CmpIdpro, SuppIdpro);

                $('#myModal1pro').modal('show');
                $('#btnUpdatepro').show();
                $('#btnAddpro').hide();
                $('#btnDelpro').hide();

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadProInvPrnEdit(InvId, CompId, SuppIdpro) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/MultiGetInvPrnEditItemDetails",
        data: JSON.stringify({ Process_Invid: InvId, CompanyId: CompId, SupplierId: SuppIdpro }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PrnItemListpro = result;
            loadPrnItemTable(PrnItemListpro);
            var IId = 0;
            var CId = 0;
            var SId = 0;
            var PrnDtid = 0;

            PrnMasIdpro = PrnItemListpro[0].proc_recpt_masid;

            LoadPInvEditItemDetails(InvId, PrnMasIdpro, CompId, SuppIdpro);
            LoadPInvEditOrderDetails(InvId, CompId, SuppIdpro, IId, CId, SId, PrnDtid);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPrnItemTable(PrnItemListpro) {

    $('#tblPrnitmdetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblPrnitmdetailspro').DataTable({

        data: PrnItemListpro,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [


             { title: "PurInvDcId", data: "Process_Inv_DcId", "visible": false },
             { title: "PrnRecptId", data: "proc_recpt_masid", "visible": false },
            { title: "Prn No", data: "PrnNo" },
            { title: "Party Dely No", data: "DcNo" },
            {
                title: "Date", data: "DCDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
             { title: "Process", data: "Process" },
               { title: "ProcessId", data: "ProcessId", "visible": false },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnGrnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 //},
        ]
    });



    $("#tblPrnitmdetailspro tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPrnitmdetailspro tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}
function LoadPInvEditItemDetails(InvId, PrnMasIdpro, CompId, SuppIdpro) {
    debugger;



    $.ajax({
        url: "/ProcessInvoice/GetProInvEditItemDetails",
        data: JSON.stringify({ Process_Invid: InvId, Proc_Recpt_Masid: PrnMasIdpro, CompanyId: CompId, SupplierId: SuppIdpro }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            PESaveItemListpro = result;
            loadPInvSaveItemTable(PESaveItemListpro);




            //var Cb = ESaveItemList[0].CAbb;
            //var ExRate = ESaveItemList[0].EXRate;
            //var CuId = ESaveItemList[0].CurrId;

            //$('#txtCurrency').val(Cb);
            //$('#txtExchangeRate').val(ExRate);
            //$('#txtCurrencyId').val(CuId);


            PrnDetid = PESaveItemListpro[0].Proc_Recpt_Detid;

            PEItemListpro = PESaveItemListpro;

            PEItemListpro = $.grep(PEItemListpro, function (v) {
                return (v.Proc_Recpt_Masid === PrnMasIdpro);
            });

            loadPInvItemTable(PEItemListpro);



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadPInvEditOrderDetails(InvId, CompId, SuppIdpro, ItmId, ClrId, SzId, PrnDetId) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvEditOrdDetails",
        data: JSON.stringify({ Process_Invid: InvId, CompanyId: CompId, SupplierId: SuppIdpro, Process_recpt_DetId: PrnDetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            POSaveItemListpro = result;
            loadPInvOrdSaveTable(POSaveItemListpro);

            POItemListpro = POSaveItemListpro;

            POItemListpro = $.grep(POItemListpro, function (v) {
                return (v.Process_recpt_DetId === PrnDetid);
            });

            loadPInvOrdTable(POItemListpro);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPInvSaveItemTable(PESaveItemListpro) {

    $('#tblPItemSavedetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblPItemSavedetailspro').DataTable({
        data: PESaveItemListpro,
        columns: [

            { title: "ProInvId", data: "Process_Invid" },
            { title: "ProInvDetId", data: "Process_InvDetid" },
            { title: "PrnMasIdpro", data: "Proc_Recpt_Masid" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
              { title: "OrdQty", data: "OrdQty" },
            { title: "Grn.Qty", data: "GrnQty" },
            { title: "SecQty", data: "SecQty" },
               { title: "AppRate", data: "AppRate" },
            { title: "GrnRate", data: "GrnRate" },
            { title: "BalQty", data: "BalQty" },
            { title: "SecQty", data: "SecQty" },
            { title: "Inv.Qty", data: "Invoice_Qty" },
            { title: "PrnDetId", data: "Proc_Recpt_Detid" },
            { title: "Uom", data: "Uom" },
            { title: "Rate", data: "Rate" },
            { title: "Amount", data: "Amount" },
            { title: "DebQty", data: "DebtQty" },
            { title: "AcptQty", data: "AcptQty" },
            { title: "ItemId", data: "ItemId" },
            { title: "ColorId", data: "ColorId" },
            { title: "SizeId", data: "SizeId" },
            { title: "UomId", data: "UomId" },
            { title: "Procrecptno", data: "Proc_recpt_no" },
        ]
    });



}
function loadPInvItemTable(PEItemListpro) {

    $('#tblPItemdetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblPItemdetailspro').DataTable({
        data: PEItemListpro,
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

            { title: "ProInvId", data: "Process_Invid", "visible": false },
            { title: "ProInvDetId", data: "Process_InvDetid", "visible": false },
            { title: "PrnMasIdpro", data: "Proc_Recpt_Masid", "visible": false },
            { title: "RecpNo", data: "Proc_recpt_no", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
              { title: "OrdQty", data: "OrdQty" },
            { title: "Grn Qty", data: "GrnQty" },
            { title: "Sec Qty", data: "SecQty" },
            { title: "AppRate", data: "AppRate" },
            { title: "Grn Rate", data: "GrnRate" },
            { title: "Bal Qty", data: "BalQty" },
            { title: "Sec Qty", data: "SecQty" },
             {
                 title: "Inv Qty", data: "Invoice_Qty",
                 render: function (data) {

                     return '<input type="text" id="txtOQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },
            { title: "PrnDetId", data: "Proc_Recpt_Detid", "visible": false },
            { title: "Uom", data: "Uom" },

            {
                title: "Rate", data: "Rate",
                render: function (data) {

                    return '<input type="text" id="txtRate" class="calcRate form-control"  style="width: 50px;text-align: center; "  value=' + data + '>';

                },
            },

              {
                  title: "Amount", data: "Amount",
                  render: function (data) {

                      return '<input type="text" id="txtAMT" class="txtAMT form-control"  style="width: 50px;text-align: center; "  value=' + data + ' disabled>';

                  },
              },

            //{ title: "Amount", data: "Amount" },
            { title: "Deb Qty", data: "DebtQty" },
            { title: "Acpt Qty", data: "AcptQty" },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "UomId", data: "UomId", "visible": false },
             { title: "Procrecptno", data: "Proc_recpt_no", "visible": false },
             {
                 title: "VIEW", data: "Process_Invid",
                 render: function (data) {
                     return '<a id="grnitemtabpro" onclick="" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnItemviewPro btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                 },
             },
        //{
        //    title: "ACTION", "mDataProp": null,
        //    "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnInvOrdview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        //},
        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < PEItemListpro.length; e++) {
        var amount = PEItemListpro[e].InvAmt;
        totalamnt = totalamnt + parseFloat(amount);

    }

    var totalamnt1 = 0;
    var totalamnt2 = 0;
    for (var e = 0; e < PEItemListpro.length; e++) {
        var amount1 = PEItemListpro[e].Amount;
        var amount2 = PEItemListpro[e].Invoice_Qty;
        totalamnt1 = totalamnt1 + parseFloat(amount1);
        totalamnt2 = totalamnt2 + parseFloat(amount2);

    }
    $('#txtTotalamountpro').val(totalamnt1.toFixed(3));
    // $('#txtNetAmount').val(totalamnt1.toFixed(3));
    $('#txtTotalQtypro').val(totalamnt2.toFixed(3));
    LoadNetGrossAmtpro();


    $("#tblPItemdetailspro tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPItemdetailspro tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function loadPInvOrdSaveTable(POSaveItemListpro) {

    $('#tblPInvOrdSavedetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblPInvOrdSavedetailspro').DataTable({
        data: POSaveItemListpro,
        columns: [
            { title: "Sno", data: "OSNo" },
            { title: "PurInvOrdDetID", data: "Process_Inv_JobDetID" },
              { title: "ProcessrecptDetId", data: "Process_recpt_DetId" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Job Ord No", data: "Job_Ord_No" },
             { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "PurinvID", data: "Process_InvId" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "PurInvDetID", data: "Process_InvDetid" },


        ]
    });

}
function loadPInvOrdTable(POItemListpro) {

    $('#tblPInvOrddetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblPInvOrddetailspro').DataTable({
        data: POItemListpro,
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
              { title: "S.No", data: "OSNo", "visible": false },
             { title: "ProInvOrdDetID", data: "Process_Inv_JobDetID", "visible": false },
              { title: "ProcessrecptDetId", data: "Process_recpt_DetId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
              { title: "Style", data: "Style" },
               { title: "Job Ord No", data: "Job_Ord_No" },
               { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "ProinvID", data: "Process_InvId", "visible": false },
            {
                title: "Inv Qty", data: "InvoiceQty",
                render: function (data) {

                    return '<input type="text" id="txtOPQty" class="CalOIQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },
            { title: "ProInvDetID", data: "Process_InvDetid", "visible": false },



        ]
    });

}
function LoadProInvAddlessEdit(Id) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvEditAddLessDetails",
        data: JSON.stringify({ Process_Invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AccListpro = result;
            loadAccTablepro(AccListpro);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadAccTablepro(AcListObj) {
    debugger;
    $('#tblPaydetailspro').DataTable().destroy();

    $('#tblPaydetailspro').DataTable({
        data: AccListpro,

        columns: [

               { title: "AddlessId", data: "addless_id", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "aorl", },
               { title: "Percent", data: "percentage", },
               { title: "Amount", data: "amount", },


        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccListpro.length; e++) {
        var amount = AccListpro[e].amount;
        totalamnt = totalamnt + parseFloat(amount);

    }

    //$('#txtNetAmount').val(totalamnt.toFixed(3));

    //GAddAmt = $('#txtNetAmount').val();

    //var GAmt = $('#txtGrossAmount').val();
    //var NAmt = $('#txtNetAmount').val();
    //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);
    //$('#txtNetAmount').val(FNAmt);
    LoadNetGrossAmtpro();
}
function LoadNetGrossAmtpro() {
    debugger;


    var totalamnt = 0;
    for (var e = 0; e < PEItemListpro.length; e++) {
        var amount = PEItemListpro[e].InvAmt;
        totalamnt = totalamnt + parseFloat(amount);

    }

    var totalamnt1 = 0;
    var totalamnt2 = 0;
    for (var e = 0; e < PEItemListpro.length; e++) {
        var amount1 = PEItemListpro[e].Amount;
        var amount2 = PEItemListpro[e].Invoice_Qty;
        totalamnt1 = totalamnt1 + parseFloat(amount1);
        totalamnt2 = totalamnt2 + parseFloat(amount2);

    }
    $('#txtTotalamountpro').val(totalamnt1.toFixed(2));

    $('#txtTotalQtypro').val(totalamnt2.toFixed(3));



    var TotNetAmt = 0;
    var TotGrossAmt = 0;

    $.each(PESaveItemListpro, function (i) {
        var InvAmt = PESaveItemListpro[i].Amount;
        TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
    });


    if (AccListpro.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccListpro, function (i) {

            var Percentage = parseFloat(AccListpro[i].percentage);
            var PlusOrMinus = AccListpro[i].aorl;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccListpro[i].amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccListpro[i].amount);
                minusamt = parseFloat(minusamt) + Amt;
            }

        })

        TotNetAmt = TotGrossAmt;
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;

        TotNetAmt = parseFloat(TotNetAmt).toFixed(2);
        $('#txtNetAmountpro').val(TotNetAmt);
        $('#txtNNetamountpro').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(2);
        $('#txtNetAmountpro').val(TotGrossAmt);
        $('#txtNNetamountpro').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(2);
    $('#txtGrossamountpro').val(TotGrossAmt);

}
function LoadProInvRateDiffEdit(Id) {
    debugger;

    $.ajax({
        url: "/ProcessInvoice/GetProInvEditRateDiffDetails",
        data: JSON.stringify({ Process_Invid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            CreDebSaveListpro = result;
            loadCreDebSaveTable(CreDebSaveListpro);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadCreDebSaveTable(list) {

    $('#tblsaveitmdetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblsaveitmdetailspro').DataTable({
        data: list,
        columns: [
             { title: "GRN No", data: "Grnno" },
              { title: "Masid", data: "Proc_Recpt_Masid" },
             { title: "Detid", data: "Proc_Recpt_Detid" },
             { title: "Item", data: "Item" },
             { title: "Category1", data: "Color" },
             { title: "Category2", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "ORD Date", data: "Date" },
             { title: "Inv Qty", data: "Invoice_Qty" },
             { title: "Inv Rate", data: "Rate" },
              { title: "Rate Difference", data: "RateDiff" },
               { title: "RAmnt Diferrence", data: "RateAmntDif" },
                 { title: "Quantity Difference", data: "QtyDiff" },
               { title: "QtyAmnt Diferrence", data: "QtyAmntDif" },
             {
                 title: "Apply", data: "Proc_Recpt_Masid",
                 render: function (data) {
                     return '<input type="checkbox" class="editor-active"  style="width: 50px;text-align: center;"  >';
                 },
             },
        ]
    });
}
function EditLoadBillInvNoAmt(GCompId, GSuppIdpro) {
    debugger;
    var EDate = $('#txtEntryDatepro').val();
    var entryno = $('#txtEntrynopro').val();//$('#ddlInvoiceNo').val();

    $.ajax({
        url: "/ProcessInvoice/GetEditBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppIdpro, Inv_Date: EDate, Entry_No: entryno }),
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
                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));

                    $('#txtInvoiceAmtpro').val(GBillAmount);
                }
            }

        }

    });

}
function loadCreDebTable(list) {

    $('#tblitmdetailspro').DataTable().destroy();
    debugger;

    var table = $('#tblitmdetailspro').DataTable({
        data: list,
        columns: [
             { title: "Grn No", data: "Grnno" },
               { title: "Masid", data: "Proc_Recpt_Masid", "visible": false },
             { title: "Detid", data: "Proc_Recpt_Detid", "visible": false },
             { title: "Item", data: "Item" },
             { title: "Color", data: "Color" },
             { title: "Size", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "Ord Date", data: "Date" },
             { title: "Inv Qty", data: "Invoice_Qty" },
             { title: "Inv Rate", data: "Rate" },
                { title: "Rate Diff", data: "RateDiff" },
               { title: "RAmnt Diff", data: "RateAmntDif" },
                 { title: "Qty Diff", data: "QtyDiff" },
               { title: "QtyAmnt Diff", data: "QtyAmntDif" },
             //{
             //    title: "Apply", data: "Proc_Recpt_Detid",
             //    render: function (data) {
             //        return '<input type="checkbox" id="groupchk" class="groupchk editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';
             //    },
             //},
             //{
             //    title: "Apply", data: "Proc_Recpt_Detid",
             //    render: function (data, type, row) {

             //        return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';


             //    }
             //},

                {
                    title: "Apply", data: "Proc_Recpt_Detid",
                    render: function (data, type, row) {
                        if ((row.IsChecked == 'Y' || row.check == true)) {
                            return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked  value=' + data + ' >';
                        }
                        else {
                            return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                        }


                    }
                },

        ]
    });
}
function ProdgetbyID(Id) {

    PInvId = Id;
    $.ajax({
        url: "/ProductionInvoice/LoadEditProdInvDetails",
        data: JSON.stringify({ ProdInvId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtcompanyprd').val(obj[0]["Company"]);
                $('#txtProcessorprd').val(obj[0]["Processor"]);
                $('#txtEntryDateprd').val(moment(obj[0]["InvDate"]).format('DD/MM/YYYY'));
                $('#txtInvoiceDateprd').val(moment(obj[0]["RefDate"]).format('DD/MM/YYYY'));
                $('#txtEntrynoprd').val(obj[0]["InvNo"]);
                $('#txtInvoiceNoprd').val(obj[0]["RefNo"]);
                $('#txtProcessprd').val(obj[0]["Process"]);
                $('#txtUnitprd').val(obj[0]["CompanyUnit"]);
                $('#txtRemarksprd').val(obj[0]["Remarks"]);
                $('#txtEntryIdprd').val(obj[0]["ProdInvIdprd"]);
                $('#txtProcessIdprd').val(obj[0]["ProcessIdprd"]);
                $('#txtSuppIdprd').val(obj[0]["Processorid"]);

                CmpIdprd = obj[0]["Companyid"];
                SuppIdprd = obj[0]["Processorid"];
                OrdType = obj[0]["OrderType"];
                ProcessIdprd = obj[0]["ProcessIdprd"];
                ProdInvIdprd = obj[0]["ProdInvIdprd"];
                UnitIdprd = obj[0]["CompanyUnitIdprd"];
                ProTypeprd = obj[0]["InternalOrExternal"];
                ITypeprd = obj[0]["InvoiceType"];


                if (ChkBillNoprd == "Y") {
                    $('#dptInvIdprd').show();
                    $('#txtInvIdprd').hide();
                    $('#optNewBillprd').show();
                } else {
                    $('#txtInvIdprd').show();
                    $('#dptInvIdprd').hide();
                    $('#optNewBillprd').hide();
                }

                LoadProdInvPrnEdit(Id, CmpIdprd, SuppIdprd);
                LoadProdInvAddlessEdit(Id);
                LoadProdInvRateDiffEdit(Id);
                EditLoadBillInvNoAmt(CmpIdprd, SuppIdprd);


                $('#myModal1prd').modal('show');

                var OrdType = $('input[name="optMwrkord"]:checked').attr('value');

                if (OrdType == 'W') {
                    $('#optEW').prop('checked', true);
                }
                if (OrdType == 'J') {
                    $('#optEJ').prop('checked', true);
                }
                if (OrdType == 'S') {
                    $('#optES').prop('checked', true);
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
function LoadProdInvPrnEdit(InvId, CompId, SuppIdprd) {
    debugger;

    $.ajax({
        url: "/ProductionInvoice/GetInvPrdEditItemDetails",
        data: JSON.stringify({ ProdInvId: InvId, Companyid: CompId, Processorid: SuppIdprd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PrdItemListprd = result;
            loadPrdItemTable(PrdItemListprd);
            var IId = 0;
            var CId = 0;
            var SId = 0;
            var PrdDtid = 0;

            ProdMasIdprd = PrdItemListprd[0].prod_recpt_masid;

            LoadPdInvEditItemDetails(InvId, ProdMasIdprd, CompId, SuppIdprd);
            LoadPdInvEditOrderDetails(InvId, CompId, SuppIdprd, IId, CId, SId, PrdDtid);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPrdItemTable(PrdItemListprd) {

    $('#tblPrdndetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblPrdndetailsprd').DataTable({

        data: PrdItemListprd,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [


             { title: "PrdInvDcId", data: "ProdInvDcId", "visible": false },
             { title: "PrdRecptId", data: "prod_recpt_masid", "visible": false },
            { title: "Dc No", data: "DcNo" },
            {
                title: "Dc Date", data: "DCDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
              { title: "Grn No", data: "GrnNo" },
               {
                   title: "Grn Date", data: "GrnDate",
                   render: function (data) {
                       return (moment(data).format("DD/MM/YYYY"));
                   }
               },
                { title: "Process", data: "process" },
                 {
                     title: "ACTION", "mDataProp": null, "visible": false,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnGrnItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
                 },
        ]
    });



    $("#tblPrdndetailsprd tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPrdndetailsprd tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}
function LoadPdInvEditItemDetails(InvId, PrdMasId, CompId, SuppIdprd) {
    debugger;

    $.ajax({
        url: "/ProductionInvoice/GetProdInvEditItemDetails",
        data: JSON.stringify({ ProdInvId: InvId, GrnMasid: PrdMasId, Companyid: CompId, Processorid: SuppIdprd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            PDESaveItemListprd = result;
            loadPDInvSaveItemTable(PDESaveItemListprd);


            PrdnDetidprd = PDESaveItemListprd[0].Proc_Recpt_Detid;

            PDEItemListprd = PDESaveItemListprd;

            PDEItemListprd = $.grep(PDEItemListprd, function (v) {
                return (v.GrnMasid === ProdMasIdprd);
            });

            loadPDInvItemTable(PDEItemListprd);

            LoadNetGrossAmtprd();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadPdInvEditOrderDetails(InvId, CompId, SuppIdprd, ItmId, ClrId, SzId, PrdDtid) {
    debugger;

    $.ajax({
        url: "/ProductionInvoice/GetProdInvEditOrdDetails",
        data: JSON.stringify({ Prod_InvId: InvId, Companyid: CompId, Processorid: SuppIdprd, Prod_recpt_DetId: PrdDtid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            PDOSaveItemListprd = result;
            loadPDInvOrdSaveTable(PDOSaveItemListprd);

            PDOItemListprd = PDOSaveItemListprd;

            PDOItemListprd = $.grep(PDOItemListprd, function (v) {
                return (v.Prod_recpt_DetId === PrdnDetidprd);
            });

            loadPDInvOrdTable(PDOItemListprd);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadPDInvOrdSaveTable(PDOSaveItemListprd) {

    $('#tblPDInvOrdSavedetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblPDInvOrdSavedetailsprd').DataTable({
        data: PDOSaveItemListprd,
        columns: [
            { title: "Sno", data: "OSNo" },
            { title: "ProdInvOrdJobDetID", data: "Prood_Inv_JobDetID" },
              { title: "Prod_recpt_DetId", data: "Prod_recpt_DetId" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
            { title: "Style", data: "Style" },
            { title: "Job Ord No", data: "Job_Ord_No" },
             { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "ProdInvIdprd", data: "Prod_InvId" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "ProdInvDetID", data: "Prod_InvDetid" },


        ]
    });

}
function loadPDInvOrdTable(PDOItemListprd) {

    $('#tblPDInvOrddetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblPDInvOrddetailsprd').DataTable({
        data: PDOItemListprd,
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
              { title: "S.No", data: "OSNo", "visible": false },
               { title: "ProdInvOrdJobDetID", data: "Prood_Inv_JobDetID", "visible": false },
              { title: "ProdrecptDetId", data: "Prod_recpt_DetId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "RefNo" },
              { title: "Style", data: "Style" },
               { title: "Job Ord No", data: "Job_Ord_No" },
               { title: "Received Qty", data: "RecQty" },
            { title: "Received Rate", data: "RecRate" },
            { title: "ProdInvIdprd", data: "Prod_InvId", "visible": false },
            {
                title: "Inv Qty", data: "InvoiceQty",
                render: function (data) {

                    return '<input type="text" id="txtOPQty" class="CalOIQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },
            { title: "ProdInvDetID", data: "Prod_InvDetid", "visible": false },



        ]
    });

}
function loadPDInvSaveItemTable(PDESaveItemListprd) {

    $('#tblPDItemSavedetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblPDItemSavedetailsprd').DataTable({
        data: PDESaveItemListprd,
        columns: [

            { title: "ProdInvIdprd", data: "ProdInvId" },
            { title: "ProdInvDetid", data: "ProdInvDetid" },
            { title: "Grndetid", data: "Grndetid" },
            { title: "GrnMasid", data: "GrnMasid" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Grn.Qty", data: "GrnQty" },
            { title: "GrnRate", data: "GrnRate" },
            { title: "BalQty", data: "BalQty" },
            { title: "Inv Qty", data: "InvoiceQty" },
            { title: "Uom", data: "Uom" },
            { title: "Rate", data: "InvoiceRate" },
            { title: "Amount", data: "Amount" },
            { title: "Lot No", data: "LotNo" },
            { title: "Bundle No", data: "BundleNo" },
            { title: "Rej Qty", data: "RejectdQty" },
            { title: "ItemId", data: "ItemId" },
            { title: "ColorId", data: "ColorId" },
            { title: "SizeId", data: "SizeId" },
        ]
    });



}
function loadPDInvItemTable(PDEItemListprd) {

    $('#tblPrditmdetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblPrditmdetailsprd').DataTable({
        data: PDEItemListprd,
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

            { title: "ProdInvIdprd", data: "ProdInvId", "visible": false },
            { title: "ProdInvDetid", data: "ProdInvDetid", "visible": false },
            { title: "Grndetid", data: "Grndetid", "visible": false },
              { title: "GrnMasid", data: "GrnMasid", "visible": false },
              { title: "ReciptNo", data: "ReciptNo", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Grn.Qty", data: "GrnQty" },
            { title: "GrnRate", data: "GrnRate" },
            { title: "AppRate", data: "Apprate" },
            { title: "BalQty", data: "BalQty" },
             {
                 title: "Inv Qty", data: "InvoiceQty",
                 render: function (data) {

                     return '<input type="text" id="txtOQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                 },
             },

            { title: "Uom", data: "Uom" },

            {
                title: "Rate", data: "InvoiceRate",
                render: function (data) {

                    return '<input type="text" id="txtRate" class="calcRate form-control"  style="width: 50px;text-align: center; "  value=' + data + '>';

                },
            },

               {
                   title: "Amount", data: "Amount",
                   render: function (data) {

                       return '<input type="text" id="txtAMT" class="calcAMT form-control"  style="width: 50px;text-align: center; "  value=' + data + ' disabled >';

                   },
               },


           // { title: "Amount", data: "Amount" },
            { title: "Lot No", data: "LotNo" },
            { title: "Bundle No", data: "BundleNo" },
            { title: "Rej Qty", data: "RejectdQty" },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "SizeId", data: "SizeId", "visible": false },
            {
                title: "View", data: "ProdInvId",
                render: function (data) {
                    return '<a id="grnitemtabprd" onclick="" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnItemviewPrd btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                },
            },

        {
            title: "ACTION", "mDataProp": null, "visible": false,
            "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnInvOrdview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
        },
        ]
    });

    //var totalamnt = 0;
    //for (var e = 0; e < PDEItemListprd.length; e++) {
    //    var amount = PDEItemListprd[e].InvAmt;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}

    //$('#txtGrossAmount').val(totalamnt.toFixed(3));
    LoadNetGrossAmtprd();


    $("#tblPrditmdetailsprd tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPrditmdetailsprd tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function LoadNetGrossAmtprd() {
    debugger;

    var totalamnt = 0;
    if (PDEItemListprd.length > 0) {
        for (var e = 0; e < PDEItemListprd.length; e++) {
            var amount = PDEItemListprd[e].Amount;
            totalamnt = totalamnt + parseFloat(amount);

        }


        var totalamnt1 = 0;
        var totalamnt2 = 0;
        for (var e = 0; e < PDEItemListprd.length; e++) {
            var amount1 = PDEItemListprd[e].Amount;
            var amount2 = PDEItemListprd[e].InvoiceQty;
            totalamnt1 = totalamnt1 + parseFloat(amount1);
            totalamnt2 = totalamnt2 + parseFloat(amount2);

        }
        $('#txtTotalamountprd').val(totalamnt1.toFixed(2));

        $('#txtTotalQtyprd').val(totalamnt2.toFixed(3));
    }



    var TotNetAmtprd = 0;
    var TotGrossAmtprd = 0;

    $.each(PDESaveItemListprd, function (i) {
        var InvAmt = PDESaveItemListprd[i].Amount;
        TotGrossAmtprd = parseFloat(TotGrossAmtprd) + parseFloat(InvAmt);
    });


    if (AccListprd.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccListprd, function (i) {

            var Percentage = parseFloat(AccListprd[i].percentage);
            var PlusOrMinus = AccListprd[i].aorl;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccListprd[i].amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccListprd[i].amount);
                minusamt = parseFloat(minusamt) + Amt;
            }

        })

        TotNetAmtprd = TotGrossAmtprd;
        TotNetAmtprd = TotNetAmtprd + plusamt;
        TotNetAmtprd = TotNetAmtprd - minusamt;

        TotNetAmtprd = parseFloat(TotNetAmtprd).toFixed(2);
        $('#txtNetAmountprd').val(TotNetAmtprd);
        $('#txtNNetamountprd').val(TotNetAmtprd);
    }
    else {
        TotGrossAmtprd = parseFloat(TotGrossAmtprd).toFixed(2);
        $('#txtNetAmountprd').val(TotGrossAmtprd);
        $('#txtNNetamountprd').val(TotGrossAmtprd);
    }
    TotGrossAmtprd = parseFloat(TotGrossAmtprd).toFixed(2);
    $('#txtGrossamountprd').val(TotGrossAmtprd);
    $('#txtgrossamtprd').val(TotGrossAmtprd);
}
function LoadProdInvAddlessEdit(Id) {
    debugger;

    $.ajax({
        url: "/ProductionInvoice/GetProdInvEditAddLessDetails",
        data: JSON.stringify({ ProdInvId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AccListprd = result;
            loadAccTableprd(AccListprd);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadAccTableprd(AcListObj) {
    debugger;
    $('#tblPaydetailsprd').DataTable().destroy();

    $('#tblPaydetailsprd').DataTable({
        data: AccListprd,

        columns: [

               { title: "AddlessId", data: "addless_id", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "aorl", },
               { title: "Percent", data: "percentage", },
               { title: "Amount", data: "amount", },

               

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccListprd.length; e++) {
        var amount = AccListprd[e].amount;
        totalamnt = totalamnt + parseFloat(amount);

    }

    //$('#txtNetAmount').val(totalamnt.toFixed(3));

    //GAddAmt = $('#txtNetAmount').val();

    //var GAmt = $('#txtGrossAmount').val();
    //var NAmt = $('#txtNetAmount').val();
    //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);
    //$('#txtNetAmount').val(FNAmt);
    LoadNetGrossAmtprd();
}
function LoadProdInvRateDiffEdit(Id) {
    debugger;

    $.ajax({
        url: "/ProductionInvoice/GetProdInvEditRateDiffDetails",
        data: JSON.stringify({ ProdInvId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            CreDebSaveListprd = result;
            loadCreDebSaveTable(CreDebSaveListprd);

            var masid = 0;
            if (PDESaveItemListprd.length > 0) {
                masid = PDESaveItemListprd[0].GrnMasid;
            }

            CreDebListprd = $.grep(CreDebSaveListprd, function (v) {
                return (v.Proc_Recpt_Masid === masid);
            });
            loadCreDebTable(CreDebListprd);
            // loadCreDebSaveTable(CreDebSaveListprd);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function EditLoadBillInvNoAmt(GCompId, GSuppIdprd) {
    debugger;
    var EDate = $('#txtEntryDateprd').val();
    var entryno = $('#txtEntrynoprd').val();//$('#ddlInvoiceNo').val();

    $.ajax({
        url: "/ProcessInvoice/GetEditBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppIdprd, Inv_Date: EDate, Entry_No: entryno }),
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
                    GBillAmountprd = obj[0]["Inv_Amount"];
                    GBillDateprd = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));

                    $('#txtInvoiceAmtprd').val(GBillAmountprd);
                }
            }

        }

    });

}
function loadCreDebSaveTable(list) {

    $('#tblsaveitmdetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblsaveitmdetailsprd').DataTable({
        data: list,
        columns: [
             { title: "GRN No", data: "Grnno" },
              { title: "Masid", data: "Proc_Recpt_Masid" },
             { title: "Detid", data: "Proc_Recpt_Detid" },
             { title: "Item", data: "Item" },
             { title: "Category1", data: "Color" },
             { title: "Category2", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "ORD Date", data: "Date" },
             { title: "Inv Qty", data: "Invoice_Qty" },
             { title: "Inv Rate", data: "Rate" },
              { title: "Rate Difference", data: "RateDiff" },
               { title: "RAmnt Diferrence", data: "RateAmntDif" },
                 { title: "Quantity Difference", data: "QtyDiff" },
               { title: "QtyAmnt Diferrence", data: "QtyAmntDif" },
             {
                 title: "Apply", data: "Proc_Recpt_Masid",
                 render: function (data) {
                     return '<input type="checkbox" class="editor-active"  style="width: 50px;text-align: center;"  >';
                 },
             },
        ]
    });
}
function loadCreDebTable(list) {

    $('#tblitmdetailsprd').DataTable().destroy();
    debugger;

    var table = $('#tblitmdetailsprd').DataTable({
        data: list,
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
             { title: "GRN No", data: "Grnno", "visible": false },
               { title: "Masid", data: "Proc_Recpt_Masid", "visible": false },
             { title: "Detid", data: "Proc_Recpt_Detid", "visible": false },
             { title: "Item", data: "Item" },
             { title: "Category1", data: "Color" },
             { title: "Category2", data: "Size" },
             { title: "Bal Qty", data: "BalQty" },
             { title: "ORD Date", data: "Date" },
             { title: "InvQty", data: "Invoice_Qty" },
             { title: "InvRate", data: "Rate" },
                { title: "RateDifference", data: "RateDiff" },
               { title: "RAmntDiferrence", data: "RateAmntDif" },
                 { title: "QuantityDifference", data: "QtyDiff" },
               { title: "QtyAmntDiferrence", data: "QtyAmntDif" },
             //{
             //    title: "Apply", data: "Proc_Recpt_Detid",
             //    render: function (data) {
             //        return '<input type="checkbox" id="groupchk" class="groupchk editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';
             //    },
             //},
                 {
                     title: "Apply", data: "Proc_Recpt_Detid",
                     render: function (data, type, row) {
                         if ((row.IsChecked == 'Y' || row.check == true)) {
                             return '<input type="checkbox" id="groupbom" class="groupbom editor-active" checked  value=' + data + ' >';
                         }
                         else {
                             return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                         }


                     }
                 },
        ]
    });
}
function OIgetbyID(id) {
    debugger;
    Invid = id;
    $.ajax({
        url: "/OpenInvoice/Loadheaderdet",
        data: JSON.stringify({ invid: id }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            $('#myModalo').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();

            var obj = result.Value;
            $('#ddlcompanyo').val(obj[0].CompanyID).trigger('change');
            $('#txtEntryNoo').val(obj[0].EntryNo);
            $('#ddlCompanyUnito').val(obj[0].Company_UnitID).trigger('change');
            $('#txtInvoiceNoo').val(obj[0].InvoiceNo);
            $('#ddlSuppliero').val(obj[0].SupplierID).trigger('change');
            $('#txtExchangeo').val(obj[0].ExchangeRate);
            $('#txtEntryDateo').val(moment(obj[0].EntryDate).format("DD/MM/YYYY"));
            $('#txtInvoiceDateo').val(moment(obj[0].InvoiceDate).format("DD/MM/YYYY"));
            $('#ddlCurrencyo').val(obj[0].CurrencyID).trigger('change');
            $('#txtGrossAmounto').val(obj[0].Gross_amount);
            $('#txtRemarkso').val(obj[0].Remarks);
            //  $('#txtnetamnt').val(obj[0].Addless_amount);

            GCompId = obj[0]["CompanyID"];
            GSuppId = obj[0]["SupplierID"];


            $("#optgordo").attr("disabled", true);
            $("#optsordo").attr("disabled", true);
            $("#optbordo").attr("disabled", true);


            var Mtype = obj[0]["Order_Type"];

            GOtype = obj[0]["Order_Type"];

            if (Mtype == "G") {
                $("#optgordo").prop("checked", true);
                $("#optsordo").prop("checked", false);
                $("#optbordo").prop("checked", false);



                $("#ddlordernoo").attr("disabled", true);
                $("#ddlrefnoo").attr("disabled", true);
                $("#ddlwrkordo").attr("disabled", true);


            } else if (Mtype == "B") {
                $("#optgordo").prop("checked", false);
                $("#optsordo").prop("checked", false);
                $("#optbordo").prop("checked", true);

                $("#ddlordernoo").attr("disabled", false);
                $("#ddlrefnoo").attr("disabled", false);
                $("#ddlwrkordo").attr("disabled", false);


            } else {
                $("#optgordo").prop("checked", false);
                $("#optsordo").prop("checked", true);
                $("#optbordo").prop("checked", false);

                $("#ddlordernoo").attr("disabled", false);
                $("#ddlrefnoo").attr("disabled", false);
                $("#ddlwrkordo").attr("disabled", false);
            }


            if (ChkBillNo == "True") {
                $('#dptInvIdo').show();
                $('#txtInvIdo').hide();
                $('#optNewBillo').show();
            } else {
                $('#txtInvIdo').show();
                $('#dptInvIdo').hide();
                $('#optNewBillo').hide();
            }
            

            EditLoadBillInvNoAmt(GCompId, GSuppId);
            GetItmedit(Invid);
            Getaddlsdet(Invid);





        }

    });
}
function EditLoadBillInvNoAmt(GCompId, GSuppId) {
    debugger;
    var EDate = $('#txtEntryDateo').val();
    var entryno = $('#txtEntryNoo').val();//$('#ddlInvoiceNo').val();


    var PurType = 'OD';

    var FType = GOtype;



    $.ajax({
        url: "/ProcessInvoice/GetEditBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, Entry_No: entryno, BOrdType: FType, BPurType: PurType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNoo).empty();

                // $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNoo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });
                if (obj.length > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];

                    $('#txtDBillAmounto').val(GBillAmount);

                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));

                    $('#txtInvoiceDateo').val(GBillDate);
                }
            }

        }

    });

}
function GetItmedit(Invid) {
    debugger;
    $.ajax({
        url: "/OpenInvoice/LoadItmedit",
        async: false,
        data: JSON.stringify({ invid: Invid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Itmdet = result.Value;
            LoadItmtab(Itmdet);

            var totalAccamnt = 0;
            for (var e = 0; e < Itmdet.length; e++) {
                var amount = Itmdet[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }

            $('#txtTotalAmounto').val(totalAccamnt.toFixed(3));



        }
    });
}
function LoadItmtab(list) {
    $('#tblitmdetailso').DataTable().destroy();

    $('#tblitmdetailso').DataTable({
        data: list,
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
                   { title: "SNo", data: "slno", "visible": false },
                   { title: "Detid", data: "Open_Inv_DetID", "visible": false },
                   { title: "Bmasid", data: "ordid", "visible": false },
                   { title: "Order No", data: "Order_No" },
                   { title: "refid", data: "refid", "visible": false },
                   { title: "Ref No", data: "Refno" },
                   { title: "Wrkid", data: "jobid", "visible": false },
                   { title: "Work Order No", data: "Job_Ord_No" },
                    { title: "Cost Head", data: "CostHead" },
                     { title: "Qty", data: "Qty" },
                      { title: "unitid", data: "UOMID", "visible": false },
                   {
                       title: "Unit", data: "uom",

                   },
                    { title: "Rate", data: "Rate" },
                     { title: "Amount", data: "Amount" },


        ]

    });
}
function Getaddlsdet(Invid) {
    debugger;
    $.ajax({
        url: "/OpenInvoice/Loadaddlessdit",
        async: false,
        data: JSON.stringify({ invid: Invid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AccListOI = result.Value;
            loadAccTable(AccListOI);


            //if (AccListOI.length > 0) {
            //    var totalAccamnt = 0;
            //    for (var e = 0; e < AccListOI.length; e++) {
            //        var amount = AccListOI[e].Amount;
            //        totalAccamnt = totalAccamnt + parseFloat(amount);

            //    }

            //    $('#txtnetamnt').val(totalAccamnt.toFixed(3));
            //}

            var totalAccamnt = 0;
            for (var e = 0; e < AccListOI.length; e++) {
                var amount = AccListOI[e].Amount;
                var AorL = AccListOI[e].AorL;

                if (AorL == '+') {
                    totalAccamnt = totalAccamnt + parseFloat(amount);
                } else {
                    totalAccamnt = totalAccamnt - parseFloat(amount);
                }

            }



            // $('#txtnetamnt').val(totalAccamnt.toFixed(3));

            var GAmt = $('#txtTotalAmounto').val();
            var NAmt = totalAccamnt;
            var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            $('#txtGrossAmounto').val(parseFloat(GAmt).toFixed(2));
            $('#txtnetamnto').val(parseFloat(FNAmt).toFixed(2));

        }
    });
}
function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetailso').DataTable().destroy();

    $('#tblPaydetailso').DataTable({
        data: AccListOI,

        columns: [

               { title: "AddlessId", data: "addlessid", "visible": false },
               { title: "Accounts Head", data: "addless", },
               { title: "+/-", data: "AorL", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccListOI.length; e++) {
        var amount = AccListOI[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }


    $('#txtAccAmt').val(totalamnt.toFixed(3));
    var AccountAmt = $('#txtAccAmt').val();
    var BAmt = $('#txtBTotAmt').val();

    var totalAccamnt = 0;
    for (var e = 0; e < AccListOI.length; e++) {
        var amount = AccListOI[e].Amount;
        var AorL = AccListOI[e].AorL;

        if (AorL == '+') {
            totalAccamnt = totalAccamnt + parseFloat(amount);
        } else {
            totalAccamnt = totalAccamnt - parseFloat(amount);
        }

    }



    // $('#txtnetamnt').val(totalAccamnt.toFixed(3));

    var GAmt = $('#txtTotalAmounto').val();
    var NAmt = totalAccamnt;
    var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);




    $('#txtGrossAmounto').val(parseFloat(GAmt).toFixed(2));
    $('#txtnetamnto').val(parseFloat(FNAmt).toFixed(2));


}
function NMade() {
    debugger;
    var sno = [];
    var OSType = $('input[name="OSType"]:checked').attr('value');
    if (OSType == 'N') {
        for (var M = 0; M < InvList.length; M++) {
            if (InvList[M].passed == 'True' || InvList[M].Hold_OR_Ret == 'H' || InvList[M].Hold_OR_Ret == 'R' || InvList[M].passed == 'Y' || InvList[M].passed == 'H' || InvList[M].passed == 'R') {

                sno.push(InvList[M].pur_invid);

            } else if (InvList[M].passed == 1 || InvList[M].passed == 2 || InvList[M].passed == 3 ) {

                sno.push(InvList[M].pur_invid);

            }
        }
    } else if (OSType == 'Y') {
        for (var M = 0; M < InvList.length; M++) {
            if (InvList[M].passed == 'False'|| InvList[M].passed == 'N' || InvList[M].passed == 'H' || InvList[M].passed == 'R') {

                sno.push(InvList[M].pur_invid);

            } else if (InvList[M].passed == 0 || InvList[M].passed == 2 || InvList[M].passed == 3) {
                sno.push(InvList[M].pur_invid);
            }
        }
    }else if (OSType == 'H') {
        for (var M = 0; M < InvList.length; M++) {
            if (InvList[M].Hold_OR_Ret == 'N' || InvList[M].passed == 'N' || InvList[M].passed == 'Y' || InvList[M].passed == 'R') {

                sno.push(InvList[M].pur_invid);

            } else if (InvList[M].Hold_OR_Ret == 'R' || InvList[M].passed == 0 || InvList[M].passed == 1 || InvList[M].passed == 3) {

                sno.push(InvList[M].pur_invid);

            }
        }
    } else if (OSType == 'R') {
        for (var M = 0; M < InvList.length; M++) {
            if (InvList[M].Hold_OR_Ret == 'N' || InvList[M].passed == 'N' || InvList[M].passed == 'H' || InvList[M].passed == 'Y') {

                sno.push(InvList[M].pur_invid);

            } else if (InvList[M].Hold_OR_Ret == 'H'||InvList[M].passed == 0 || InvList[M].passed == 2 || InvList[M].passed == 1) {

                sno.push(InvList[M].pur_invid);

            }
        }
    } else if (OSType == 'A') {
        for (var M = 0; M < InvList.length; M++) {
                sno.push(InvList[M].pur_invid);
        }
    }
    if (sno == '') {
        //alert("No any change in table...!");
        var msg = 'No any change in table...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return false;
    }
    Update(sno);
}

//function getDate() {
//    debugger;
//    var todaydate = new Date();
//    var day = todaydate.getDate();
//    var Pmonth = todaydate.getMonth() - 2;
//    var Cmonth = todaydate.getMonth() + 1;
//    var year = todaydate.getFullYear();
//    var datestring = day + "/" + Pmonth + "/" + year;
//    var Fdatestring = day + "/" + Cmonth + "/" + year;
//    Reqdate = Fdatestring;
//    var day = new Date(),
//        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
//        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
//        date = month + '/' + day.getDate() + '/' + year;


//    $('#txtFromDate').val(datestring);
//    $('#txtToDate').val(Fdatestring);
//    // $('#txtInvoiceDate').val(Fdatestring);
    

//}


function getDate() {

    debugger;
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);



}



function LoadData() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var Supplierid = $('#ddlSupplier').val();
    if (Supplierid == undefined || Supplierid == null) {

        Supplierid = 0;
    }

    var CmpID = $('#ddlCompany').val();

    if (CmpID == undefined || CmpID == null) {

        CmpID = DCompid;
    }

    var BuyID = $('#ddlBuyer').val();

    if (BuyID == undefined || BuyID == null) {

        BuyID = 0;
    }

    var OrdNo = $('#ddlOrderNo  option:selected').text();

    if (OrdNo == undefined || OrdNo == '--Select Order No--') {

        OrdNo = '';
    }

    var RefNo = $('#ddlRefNo option:selected').text();
    if (RefNo == undefined || RefNo == '--Select Buy RefNo--') {

        RefNo = '';
    }
    var SuppInvNo = $('#ddlSupplierInvNo option:selected').text();

    if (SuppInvNo == undefined || SuppInvNo == '--Select SupplierInvNo--') {

        SuppInvNo = '';
    }
   // var SuppInvNo = '';

    var OType = $('input[name="OType"]:checked').attr('value');
    var PoType = $('input[name="PoType"]:checked').attr('value');
    var OSType = $('input[name="OSType"]:checked').attr('value');
    var OPType = $('input[name="OPType"]:checked').attr('value');

    $.ajax({
        url: "/BillPass/LoadListData/",
        type: "POST",
        data: JSON.stringify({ CmpId: CmpID, Order_No: OrdNo, Ref_No: RefNo, SuppInvNo: SuppInvNo, BuyId: BuyID, Suppid: Supplierid, frmDate: FDate, ToDate: TDate, OrderType: OType, POType: PoType, OSType: OSType, OPType: OPType }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            InvList = (result.Value);

            for (var f = 0; f < InvList.length; f++) {
                InvList[f].invoice_date = moment(InvList[f]["invoice_date"]).format('DD/MM/YYYY');

            }
            $('#tblPurchasedetails').hide();
            $('#tblProcessdetails').hide();
            $('#tblProductiondetails').hide();
            $('#tblOpenInvoicedetails').hide();
            $('#tblCommercialInvoicedetails').hide();

            if (OType == "P") {
                $('#tblPurchasedetails').show();
                $('#tblPru').show();
                $('#tblProc').hide();
                $('#tblProd').hide();
                $('#tblOI').hide();
                $('#tblOICom').hide();
                loadPurchaseTable();
            } else if (OType == "R") {
                $('#tblProcessdetails').show();
                $('#tblPru').hide();
                $('#tblProc').show();
                $('#tblProd').hide();
                $('#tblOI').hide();
                $('#tblOICom').hide();
                loadProcessTable();
            } else if (OType == "D") {
                $('#tblProductiondetails').show();
                $('#tblPru').hide();
                $('#tblProc').hide();
                $('#tblProd').show();
                $('#tblOI').hide();
                $('#tblOICom').hide();
                loadProductionTable();
            } else if (OType == "I") {
                $('#tblOpenInvoicedetails').show();
                $('#tblPru').hide();
                $('#tblProc').hide();
                $('#tblProd').hide();
                $('#tblOICom').hide();
                $('#tblOI').show();
                loadOpenInvoiceTable();
            }
            else if (OType == "C") {
                $('#tblCommercialInvoicedetails').show();
                $('#tblPru').hide();
                $('#tblProc').hide();
                $('#tblProd').hide();
                $('#tblOI').hide();
                $('#tblOICom').show();
                loadCommercialInvoiceTable();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
   
}


function loadPurchaseTable() {
    debugger;
    var inputcount = 0;
    $('#tblPurchasedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblPurchasedetails').DataTable().destroy();
    }
    $('#tblPurchasedetails').empty();

    $('#tblPurchasedetails').DataTable({

        data: InvList,
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

            { title: "INVOICEID", data: "pur_invid", "visible": false },
            { title: "ENTRYNO", data: "invoice_no" },
            { title: "ENTRYDATE", data: "invoice_date" },
            { title: "ORDER NO", data: "order_no" },
            { title: "REF NO", data: "ref_no" },
            { title: "SUPPLIER", data: "supplier" },
            { title: "GRN NO/AMT", data: "receipt_no" },
            { title: "INVOICE NO", data: "supp_inv_no" },
            { title: "NET AMT", data: "netamount" },
            { title: "CURRENCY", data: "Abbreviation" },
           // { title: "PASSED", data: "passed" },

             {
                 title: "PASSED", data: "passed",
                 render: function (data) {
                     if (data == "True") {
                         return '<input type="checkbox" id="Purchase" class="editor-active Purchase" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="checkbox" id="Purchase" class="editor-active Purchase"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "HOLD", data: "Hold_OR_Ret",
                 render: function (data) {
                     if (data == "H") {
                         return '<input type="checkbox" id="PurchaseHo" class="editor-active PurchaseHo" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="checkbox" id="PurchaseHo" class="editor-active PurchaseHo"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "RETURN", data: "Hold_OR_Ret",
                 render: function (data) {
                     if (data == "R") {
                         return '<input type="checkbox" id="PurchaseRt" class="editor-active PurchaseRt" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="checkbox" id="PurchaseRt" class="editor-active PurchaseRt"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
            { title: "PAID AMT", data: "Payment_amt" },
            {
                title: "VIEW", data: "pur_invid",
                render: function (data) {
                    return '<a id="PurViewitem" onclick="" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnSelect btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblPurchasedetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPurchasedetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadProcessTable() {
    debugger;
    var inputcount = 0;
    $('#tblProcessdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblProcessdetails').DataTable().destroy();
    }
    $('#tblProcessdetails').empty();

    $('#tblProcessdetails').DataTable({

        data: InvList,
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

            { title: "INVOICEID", data: "pur_invid", "visible": false },
             { title: "PROCESS", data: "process" },
            { title: "ENTRYNO", data: "invoice_no" },
            { title: "ENTRYDATE", data: "invoice_date" },
            { title: "ORDER NO", data: "order_no" },
            { title: "REF NO", data: "ref_no" },
            { title: "SUPPLIER", data: "supplier" },
            { title: "GRN NO/AMT", data: "receipt_no" },
            { title: "INVOICE NO", data: "supp_inv_no" },
            { title: "NET AMT", data: "netamount" },
            //{ title: "CURRENCY", data: "Abbreviation" },
           // { title: "PASSED", data: "passed" },
            {
                title: "PASSED", data: "passed",
                render: function (data) {
                    if (data == "True") {
                        return '<input type="checkbox" id="Process" class="editor-active Process" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                    } else {
                        return '<input type="checkbox" id="Process" class="editor-active Process"  style="width: 50px;text-align: center;"  value=' + data + '>';
                    }
                },
            },
            {
                title: "HOLD", data: "Hold_OR_Ret",
                render: function (data) {
                    if (data == "H") {
                        return '<input type="checkbox" id="ProcessHo" class="editor-active ProcessHo" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                    } else {
                        return '<input type="checkbox" id="ProcessHo" class="editor-active ProcessHo"  style="width: 50px;text-align: center;"  value=' + data + '>';
                    }
                },
            },
            {
                title: "RETURN", data: "Hold_OR_Ret",
                render: function (data) {
                    if (data == "R") {
                        return '<input type="checkbox" id="ProcessRt" class="editor-active ProcessRt" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                    } else {
                        return '<input type="checkbox" id="ProcessRt" class="editor-active ProcessRt"  style="width: 50px;text-align: center;"  value=' + data + '>';
                    }
                },
            },

            { title: "PAID AMT", data: "Payment_amt" },
            {
                title: "VIEW", data: "pur_invid",
                render: function (data) {
                    return '<a id="ProcViewitem" onclick=" getAppbyID({0})" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnSelect btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblProcessdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblProcessdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function loadProductionTable() {
    debugger;
    var inputcount = 0;
    $('#tblProductiondetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblProductiondetails').DataTable().destroy();
    }
    $('#tblProductiondetails').empty();

    $('#tblProductiondetails').DataTable({

        data: InvList,
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

            { title: "INVOICEID", data: "pur_invid", "visible": false },
             //{ title: "PROCESS", data: "process" },
            { title: "ENTRYNO", data: "invoice_no" },
            { title: "ENTRYDATE", data: "invoice_date" },
            { title: "ORDER NO", data: "order_no" },
            { title: "REF NO", data: "ref_no" },
            { title: "SUPPLIER", data: "supplier" },
            { title: "GRN NO", data: "receipt_no" },
            { title: "INVOICE NO", data: "supp_inv_no" },
            { title: "NET AMT", data: "netamount" },
            //{ title: "CURRENCY", data: "Abbreviation" },
           // { title: "PASSED", data: "passed" },
             {
                 title: "PASSED", data: "passed",
                 render: function (data) {
                     if (data == "Y") {
                         return '<input type="checkbox" id="Production" class="editor-active Production" checked="" style="width: 50px;text-align: center;"  value=' + data + '>';
                     } else {
                         return '<input type="checkbox" id="Production" class="editor-active Production"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "HOLD", data: "passed",
                 render: function (data) {
                     if (data == "H") {
                         return '<input type="checkbox" id="ProductionHo" class="editor-active ProductionHo" checked="" style="width: 50px;text-align: center;"  value=' + data + '>';
                     } else {
                         return '<input type="checkbox" id="ProductionHo" class="editor-active ProductionHo"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "RETURN", data: "passed",
                 render: function (data) {
                     if (data == "R") {
                         return '<input type="checkbox" id="ProductionRt" class="editor-active ProductionRt" checked="" style="width: 50px;text-align: center;"  value=' + data + '>';
                     } else {
                         return '<input type="checkbox" id="ProductionRt" class="editor-active ProductionRt"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
            { title: "PAID AMT", data: "Payment_amt" },
            { 
                title: "VIEW", data: "pur_invid",
                render: function (data) {
                    return '<a id="ProdViewitem" onclick="" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnSelect btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblProductiondetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblProductiondetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function backtomainb() {
    window.location.reload();
}
function loadOpenInvoiceTable() {
    debugger;
    var inputcount = 0;
    $('#tblOpenInvoicedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblOpenInvoicedetails').DataTable().destroy();
    }
    $('#tblOpenInvoicedetails').empty();

    $('#tblOpenInvoicedetails').DataTable({

        data: InvList,
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

            { title: "INVOICEID", data: "pur_invid", "visible": false },
            { title: "ENTRYNO", data: "invoice_no" },
            { title: "ENTRYDATE", data: "invoice_date" },
            { title: "INVOICE NO", data: "supp_inv_no" },
            { title: "ORDER NO", data: "order_no" },
            { title: "REF NO", data: "ref_no" },
            { title: "SUPPLIER", data: "supplier" },
            { title: "CURRENCY", data: "Abbreviation" },
            { title: "NET AMOUNT", data: "netamount" },
             {
                 title: "PASSED", data: "passed",
                 render: function (data) {
                     if (data == "1") {
                         return '<input type="checkbox" id="Openinvoice" class="editor-active Openinvoice" checked="" style="width: 50px;text-align: center;"  value=' + data + '>';
                     } else {
                         return '<input type="checkbox" id="Openinvoice" class="editor-active Openinvoice"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "HOLD", data: "passed",
                 render: function (data) {
                     if (data == "2") {
                         return '<input type="checkbox" id="OpeninvoiceHo" class="editor-active OpeninvoiceHo" checked="" style="width: 50px;text-align: center;"  value=' + data + '>';
                     } else {
                         return '<input type="checkbox" id="OpeninvoiceHo" class="editor-active OpeninvoiceHo"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "RETURN", data: "passed",
                 render: function (data) {
                     if (data == "3") {
                         return '<input type="checkbox" id="OpeninvoiceRt" class="editor-active OpeninvoiceRt" checked="" style="width: 50px;text-align: center;"  value=' + data + '>';
                     } else {
                         return '<input type="checkbox" id="OpeninvoiceRt" class="editor-active OpeninvoiceRt"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
            { title: "PAID AMT", data: "Payment_amt" },
            {
                title: "VIEW", data: "pur_invid",
                render: function (data) {
                    return '<a id="OIViewitem" onclick=" getAppbyID({0})" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnSelect btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblOpenInvoicedetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblOpenInvoicedetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function loadCommercialInvoiceTable() {
    debugger;
    var inputcount = 0;
    $('#tblCommercialInvoicedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblCommercialInvoicedetails').DataTable().destroy();
    }
    $('#tblCommercialInvoicedetails').empty();

    $('#tblCommercialInvoicedetails').DataTable({

        data: InvList,
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

            { title: "INVOICEID", data: "pur_invid", "visible": false },
            { title: "ENTRYNO", data: "invoice_no" },
            { title: "ENTRYDATE", data: "invoice_date" },
            { title: "ORDER NO", data: "order_no" },
            { title: "REF NO", data: "ref_no" },
            { title: "SUPPLIER", data: "supplier" },
            { title: "GRN NO/AMT", data: "receipt_no" },
            { title: "INVOICE NO", data: "supp_inv_no" },
            { title: "NET AMT", data: "netamount" },
            { title: "CURRENCY", data: "Abbreviation" },
           // { title: "PASSED", data: "passed" },

             {
                 title: "PASSED", data: "passed",
                 render: function (data) {
                     if (data == "True") {
                         return '<input type="checkbox" id="Commercialinvoice" class="editor-active Commercialinvoice" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="checkbox" id="Commercialinvoice" class="editor-active Commercialinvoice"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "HOLD", data: "Hold_OR_Ret",
                 render: function (data) {
                     if (data == "H") {
                         return '<input type="checkbox" id="CommercialinvoiceHo" class="editor-active CommercialinvoiceHo" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="checkbox" id="CommercialinvoiceHo" class="editor-active CommercialinvoiceHo"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
             {
                 title: "RETURN", data: "Hold_OR_Ret",
                 render: function (data) {
                     if (data == "R") {
                         return '<input type="checkbox" id="CommercialinvoiceRt" class="editor-active CommercialinvoiceRt" checked=""  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                     else {
                         return '<input type="checkbox" id="CommercialinvoiceRt" class="editor-active CommercialinvoiceRt"  style="width: 50px;text-align: center;"  value=' + data + '>';
                     }
                 },
             },
            { title: "PAID AMT", data: "Payment_amt" },
            {
                title: "VIEW", data: "pur_invid",
                render: function (data) {
                    return '<a id="PurViewitem" onclick="" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="{0}"><button type="button" class="btnSelect btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class="fa fa-eye"></i> </button></a>';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblCommercialInvoicedetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblCommercialInvoicedetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function Update(id) {
    debugger;
    var list = [];
    for (var f = 0; f < InvList.length; f++) {
        for (var h = 0; h < id.length; h++) {
            if (InvList[f].pur_invid == id[h]) {
                list.push(InvList[f]);
            }
        }
    }
   
   

    //$.each(InvList, function (e) {
    //    if (InvList[e].pur_invid == id) {
    //        list.push(InvList[e]);
    //    }

    //})


    var objSubmit = {
        DetList: list
    };


    LoadingSymb();
    $.ajax({
        url: "/BillPass/Update",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                var OSType = $('input[name="OSType"]:checked').attr('value');

                if (OSType == "Y") {
                    //alert("BillPass Notmade Sucessfully..");
                    var msg = 'BillPass Notmade Sucessfully...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                } else {
                    //alert("BillPass Made Sucessfully..");
                    var msg = 'BillPass Made Sucessfully...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                }
                LoadData();
            } else {
                window.location.href = "/Error/Index";
            }
        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });

}

function SuppInvNoDDl() {
    debugger;
    var OType = $('input[name="OType"]:checked').attr('value');

    $.ajax({
        url: "/BillPass/GetSupplierInvNo",
        data: JSON.stringify({ Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var obj = [];
            var obj = json.Value;

            var revdet = {};
            var rev = [];
          
            $.each(obj, function (i, el) {

                if (!revdet[el.supp_inv_no]) {
                    revdet[el.supp_inv_no] = true;
                    rev.push(el);
                }
            });

            $('#ddlSupplierInvNo').empty();
            $('#ddlSupplierInvNo').append($('<option/>').val('0').text('--Select SupplierInvNo--'));
            $.each(rev, function () {
                $('#ddlSupplierInvNo').append($('<option></option>').val(this.supp_inv_no).text(this.supp_inv_no));
            });
        }


    });


}

function Modal3Close() {

    $('#MyModalGrnViewTable').modal('hide');
}