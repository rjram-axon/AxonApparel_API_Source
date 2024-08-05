var AddItemList = [];
var Aindex = 0;
var Iindex = 0;
var GCompId = 0;
var DorC = 0;
var ItemList = [];
var OItemList = [];
var OSItemList = [];
var GSuppId = 0;
var GInvId = 0;
var GDebId = 0;
var GDocType = 0;
var GEntryType = 0;
var GDocPrefix = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var Printid = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlAcompany");
    LoadSupplierDDL("#ddlMSupplier,#ddlASupplier");
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadAddDebDetails();
    LoadMainGrid();
    LoadMainDocDropLoad();

    //LoadOrderNo();
    //LoadStyle();
    //LoadGrnNo();
    //LoadPoNo();
    //LoadAddlessDDL("#ddlAcc");
    //ListSupplier();
    //ListOrdRef();
    //ListSuppDcInv();
    //LoadMainGrid();

    $(document).on('keyup', '.calcdebqty', function () {
        debugger;

        var table = $('#tblOrdercredeb').DataTable();
        var SlNo = table.row($(this).parents('tr')).data()["Sno"];
        var detid = table.row($(this).parents('tr')).data()["GrnDetId"];
        var balq = table.row($(this).parents('tr')).data()["InvQty"];

        var value = $(this).val();
        var DQty = value;

        $.each(OSItemList, function () {
            if (this.Sno == SlNo) {

                if (balq >= value) {
                    this.DebitQty = value;
                }
                else {
                    var t = value - balq;
                    this.DebitQty = balq;
                }

            }
        });
        //var totalamnt = 0;

        //for (var e = 0; e < OSItemList.length; e++) {
        //    if (OSItemList[e].GrnDetId == detid) {
        //        var amount = OSItemList[e].DebitQty;
        //        totalamnt = totalamnt + parseFloat(amount);
        //    }
        //}


        for (var e = 0; e < OSItemList.length; e++) {
            var GrnDetid = OSItemList[e].GrnDetId;
            var DebQty = OSItemList[e].DebitQty;

            for (var f = 0; f < ItemList.length; f++) {
                var DGrnDetid = ItemList[f].grn_detid;
                var dRate = ItemList[f].dRate;
                if (GrnDetid == DGrnDetid) {
                    ItemList[f].Amount = DebQty * dRate;
                    ItemList[f].dQty = DebQty;
                }
            }
        }




        for (var g = 0; g < ItemList.length; g++) {
            var GrnDetid = ItemList[g].grn_detid;
            var DebQty = ItemList[g].dQty;
            var dRate = ItemList[g].dRate;
            for (var h = 0; h < OSItemList.length; h++) {
                var DGrnDetid = OSItemList[h].GrnDetId;

                if (GrnDetid == DGrnDetid) {
                    OSItemList[h].Amount = DebQty * dRate;
                    OSItemList[h].Rate = dRate;
                }
            }
        }
        //for (var e = 0; e < ItemList.length; e++) {
        //    if (ItemList[e].GrnDetId == detid) {
        //        var amount = OSItemList[e].DebitQty;
        //        totalamnt = totalamnt + parseFloat(amount);
        //    }
        //}

        //$.each(ItemList, function () {
        //    if (this.grn_detid == detid) {
        //        this.dQty = totalamnt;
        //        this.Amount = totalamnt * 2
        //    }
        //});

        colorempty = OSItemList;
        colorempty = $.grep(colorempty, function (v) {
            return (v.GrnDetId === detid);
        });
        OItemList = colorempty;


        loadOrdItemTable(OItemList);
        loadOrdSaveItemTable(OSItemList);
        loadItemTable(ItemList);

        if (RItemList.length > 0) {
            for (var f = 0; f < RItemList.length; f++) {
                RItemList[f].DAmount = 0;
                RItemList[f].CAmount = 0;
            }


            for (var e = 0; e < ItemList.length; e++) {
                var iInvid = ItemList[e].Invid;
                var Qty = ItemList[e].dQty;
                var rate = ItemList[e].dRate;
                var amount = parseFloat(Qty * rate).toFixed(2);

                for (var f = 0; f < RItemList.length; f++) {
                    var DInvid = RItemList[f].InvId;
                    if (DInvid == iInvid) {
                        RItemList[f].DAmount = RItemList[f].DAmount + parseFloat(amount);
                        RItemList[f].CAmount = RItemList[f].CAmount + parseFloat(amount);
                    }
                }
                loadRateItemTable(RItemList);
            }
        }


        var rows = $("#tblOrdercredeb").dataTable().fnGetNodes();
        var dtTable = $('#tblOrdercredeb').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtDebitQty]').each(function () {
                if (sn == SlNo && $(this).val() == DQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtDebitQty').val();
                    row.find('#txtDebitQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});


$(document).ready(function () {
    $("#tblAddcredeb ").dataTable().find("tbody").on('click', 'tr', function () {
        Aindex = (this.rowIndex) - 1;
    });
});


$(document).ready(function () {
    $("#tblOrdercredeb ").dataTable().find("tbody").on('click', 'tr', function () {
        Iindex = (this.rowIndex) - 1;
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
    $('#txtEntryDate').val(Fdatestring);

    $('#txtFrmDate').val(MainFDate);
    $('#txttoDate').val(Fdatestring);


}


function RadioAIClick() {

    LoadAddDebDetails();
}

function LoadAddDebDetails() {

    debugger;
    var chkdorcrd = 0;
    var CompId = $('select#ddlAcompany option:selected').val();
    var SuppId = $('select#ddlASupplier option:selected').val();

    var TypeQyInv = $('input[name="InvQty"]:checked').attr('value');
    var TypeDebCre = $('input[name="CreDeb"]:checked').attr('value');

    if (TypeDebCre == "Debit") {
        DorC = "D";
    }
    else {
        DorC = "C";
    }

    if (TypeQyInv == "ID" && TypeDebCre == "Debit") {
        chkdorcrd = "ID";
    }
    else if (TypeQyInv == "ID" && TypeDebCre == "Credit") {
        chkdorcrd = "IC";
    } else if (TypeQyInv == "QD" && TypeDebCre == "Debit") {
        chkdorcrd = "QD";
    } else {
        chkdorcrd = "QC";
    }


    var enttyp = $('select#ddlAOrderType option:selected').val();

    $.ajax({
        url: "/DebitCredit/LoadDataAddDebDetails",
        data: JSON.stringify({ companyid: CompId, supplierid: SuppId, DocType: chkdorcrd, EntryType: enttyp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            AddItemList = result;
            loadAddItemTable(AddItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadAddItemTable(AddItemList) {

    $('#tblAddcredeb').DataTable().destroy();
    debugger;

    $('#tblAddcredeb').DataTable({
        data: AddItemList,
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

            { title: "InvoiceId", data: "DocuID", "visible": false },
            { title: "Invoice", data: "DocuNo" },
            { title: "Supplier.Inv", data: "DcNo" },
            {
                title: "Inv.date", data: "DocuDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            {
                title: "Supplier.Date", data: "DcDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Supplier", data: "Supplier" },
              { title: "SupplierId", data: "supplierid", "visible": false },
               { title: "CompId", data: "companyid", "visible": false },
                { title: "Company", data: "company" },

             {
                 title: "ACTION", "mDataProp": null,
                 "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" data-toggle="modal" data-target="#myModal1"  class="btnDebCreadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
             }
        ]
    });
}

$(document).on('click', '.btnDebCreadd', function () {
    debugger;
    $('#myModal').modal('hide');
    $('#myModal1').modal('show');



   // Aindex;
   // var currentaddcpi = AddItemList.slice(Aindex);



    var table = $('#tblAddcredeb').DataTable();
    var Comp = table.row($(this).parents('tr')).data()["company"];
    var Supp = table.row($(this).parents('tr')).data()["Supplier"];
    var InvId = table.row($(this).parents('tr')).data()["DocuID"];
    var Invno = table.row($(this).parents('tr')).data()["DocuNo"];
    var SuppDcNo = table.row($(this).parents('tr')).data()["DcNo"];

    GCompId = table.row($(this).parents('tr')).data()["companyid"];
    GSuppId = table.row($(this).parents('tr')).data()["supplierid"];
    GInvId = table.row($(this).parents('tr')).data()["DocuID"];


    //var Comp = currentaddcpi[0].company;
    //var Supp = currentaddcpi[0].Supplier;
    //var InvId = currentaddcpi[0].DocuID;
    //var Invno = currentaddcpi[0].DocuNo;
    //var SuppDcNo = currentaddcpi[0].DcNo;

    //GCompId = currentaddcpi[0].companyid;
    //GSuppId = currentaddcpi[0].supplierid;
    //GInvId = currentaddcpi[0].DocuID;

    $('#txtCompany').val(Comp);
    $('#txtSupplier').val(Supp);
    $('#txtInvNo').val(Invno);
    $('#txtSuppInv').val(SuppDcNo);

    GenerateNumber();

    var CType = $('#ddlAOrderType').val();
    var Invtype = $('input[name="InvQty"]:checked').attr('value');
    if (Invtype == 'QD') {
        CType = 'Q'
    }

    LoadDebItemDetails(InvId, DorC, CType);
    var TypeDebCre = $('input[name="CreDeb"]:checked').attr('value');
  
    if (TypeDebCre == "Debit") {
        DorC = "D";
    }
    else {
        DorC = "C";
    }
    LoadDebRateDetails(InvId, DorC, CType);

    $('#btnUpdate').hide();
    $('#btnAdd').show();
});


var table, column, compId, Docum;
function GenerateNumber(table, column, compId, Docum) {

    debugger;

    table = "pur_debit_mas",
    column = "debit_no",
    compId = GCompId,
    Docum = 'PURCHASE DC'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtDebitNo').val(result.Value);
        }
    });
}
function LoadDebItemDetails(InvId, DorC, CType) {

    $.ajax({
        url: "/DebitCredit/LoadDataItemDebDetails",
        data: JSON.stringify({ InvMasId: InvId, DocType: DorC, EntryType: CType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadItemTable(ItemList);

            var GrnDetId = ItemList[0].grn_detid;


            var CType = $('#ddlAOrderType').val();
            var Mode = "A";
            var Invtype = $('input[name="InvQty"]:checked').attr('value');
            if (Invtype == 'QD') {
                CType = 'Q'
            }
            //LoadDebOrdInvDetails(GrnDetId, Mode, CType);

           // var GDetId = GrnDetId;
            LoadDebOrdInvSaveDetails(InvId, Mode, CType);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function loadItemTable(ItemList) {

    $('#tblItemcredeb').DataTable().destroy();
    debugger;

    $('#tblItemcredeb').DataTable({
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

             { title: "DebDetId", data: "Debit_detid", "visible": false },
              { title: "DebId", data: "Debit_id", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "color" },
            { title: "Size", data: "Size" },
                   { title: "ItemId", data: "Itemid", "visible": false },
            { title: "ColorId", data: "colorid", "visible": false },
            { title: "SizeId", data: "Sizeid", "visible": false },
                   { title: "UomId", data: "uomid", "visible": false },
            { title: "Invoiced", data: "Qty" },
              { title: "P.O Rate", data: "PoRate" },
               { title: "Inv Rate", data: "Rate" },
                { title: "Debit Qty", data: "dQty" },
                 { title: "Unit", data: "uom" },
                 { title: "Rate", data: "dRate" },
                 { title: "Amount", data: "Amount" },
                  { title: "InvId", data: "Invid", "visible": false },

            
        ]
    });
}

function LoadDebOrdInvDetails(GDetId, Mode, CType) {

    $.ajax({
        url: "/DebitCredit/LoadDataOrdDebDetails",
        data: JSON.stringify({ GrnDetId: GDetId, Mode: Mode, EType: CType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OItemList = result;
            loadOrdItemTable(OItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadDebOrdInvSaveDetails(GDetId, Mode, CType) {

    $.ajax({
        url: "/DebitCredit/LoadDataOrdDebDetails",
        data: JSON.stringify({ GrnDetId: GDetId, Mode: Mode, EType: CType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OSItemList = result;
            loadOrdSaveItemTable(OSItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadOrdItemTable(OItemList) {

    $('#tblOrdercredeb').DataTable().destroy();
    debugger;

    $('#tblOrdercredeb').DataTable({
        data: OItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "JobRowId", data: "Sno", "visible": false },
            { title: "GdetId", data: "GrnDetId", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Max.Debit.Qty", data: "InvQty" },

             {
                 title: "Debit Qty", data: "DebitQty",
                 render: function (data) {

                     return '<input type="text" id="txtDebitQty" class="calcdebqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                 },
             },
              { title: "Itemid", data: "OItemid", "visible": false },
               { title: "Colorid", data: "OColorid", "visible": false },
                { title: "Sizeid", data: "OSizeid", "visible": false },
                 { title: "Uomid", data: "OUomid", "visible": false },
        ]
    });
}
function loadOrdSaveItemTable(OSItemList) {

    $('#tblOrdercredebSave').DataTable().destroy();
    debugger;

    $('#tblOrdercredebSave').DataTable({
        data: OSItemList,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

            { title: "JobRowId", data: "Sno" },
            { title: "GdetId", data: "GrnDetId" },
            { title: "Order No", data: "OrderNo" },
            { title: "Max.Debit.Qty", data: "InvQty" },
             { title: "Debit Qty", data: "DebitQty" },
              { title: "Itemid", data: "OItemid", "visible": false },
               { title: "Colorid", data: "OColorid", "visible": false },
                { title: "Sizeid", data: "OSizeid", "visible": false },
                 { title: "Uomid", data: "OUomid", "visible": false },


        ]
    });
}

function calcdebqty(value) {
    debugger;
    Iindex;

    var currentrowoftcpi = OItemList.slice(Iindex);

    var SlNo = currentrowoftcpi[0].Sno;
    var detid = currentrowoftcpi[0].GrnDetId;
    var balq = currentrowoftcpi[0].InvQty;
    var DQty = value;



    $.each(OSItemList, function () {
        if (this.Sno == SlNo) {

            if (balq >= value) {
                this.DebitQty = value;
            }
            else {
                var t = value - balq;
                this.DebitQty = balq;
            }

        }
    });
    var totalamnt = 0;

    for (var e = 0; e < OSItemList.length; e++) {
        if (OSItemList[e].GrnDetId == detid) {
            var amount = OSItemList[e].DebitQty;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $.each(ItemList, function () {
        if (this.grn_detid == detid) {
            this.dQty = totalamnt;
        }
    });

    colorempty = OSItemList;
    colorempty = $.grep(colorempty, function (v) {
        return (v.GrnDetId === detid);
    });
    OItemList = colorempty;


    loadOrdItemTable(OItemList);
    loadOrdSaveItemTable(OSItemList);
    loadItemTable(ItemList);


}


$(document).on('click', '.btnInvOrdview', function () {
    debugger;

    var table = $('#tblItemcredeb').DataTable();

    var GrnDetId = table.row($(this).parents('tr')).data()["grn_detid"];

    var colorempty = [];
    colorempty = OSItemList;

    colorempty = $.grep(colorempty, function (v) {
        return (v.GrnDetId === GrnDetId);
    });

    OItemList = colorempty;
    loadOrdItemTable(OItemList);
});

function LoadDebRateDetails(InvId, DorC,styp) {
    debugger;
    $.ajax({
        url: "/DebitCredit/LoadDataRateDiffDebDetails",
        data: JSON.stringify({ InvId: InvId, EType: DorC, Stype: styp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            RItemList = result;
            if (RItemList.length > 0) {
                for (var f = 0; f < RItemList.length; f++) {
                    RItemList[f].DAmount = 0;
                    RItemList[f].CAmount = 0;
                }


                for (var e = 0; e < ItemList.length; e++) {
                    var iInvid = ItemList[e].Invid;
                    var Qty = ItemList[e].dQty;
                    var rate = ItemList[e].dRate;
                    var amount = parseFloat(Qty * rate).toFixed(2);

                    for (var f = 0; f < RItemList.length; f++) {
                        var DInvid = RItemList[f].InvId;
                        if (DInvid == iInvid) {
                            RItemList[f].DAmount = RItemList[f].DAmount + parseFloat(amount);
                            RItemList[f].CAmount = RItemList[f].CAmount + parseFloat(amount);
                        }
                    }
                    loadRateItemTable(RItemList);
                }
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadRateItemTable(RItemList) {

    $('#tblOthercredeb').DataTable().destroy();
    debugger;

    $('#tblOthercredeb').DataTable({
        data: RItemList,

        columns: [

            { title: "DebitId", data: "Debit_id", "visible": false },
            { title: "InvId", data: "InvId", "visible": false },
            { title: "Header", data: "Head" },
            { title: "Amount", data: "DAmount" },
            { title: "Reason", data: "Reason" },


        ]
    });
}

function DebSave() {
    debugger;

    var DType = 0;
    if (ItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var CompId = $('select#ddlCompany option:selected').val();
    var SuppId = $('select#ddlSupplier option:selected').val();

    var OType = $('#ddlAOrderType').val();

    var OType = $('#ddlAOrderType').val();
    var Dpre = 0;
    if (OType == "P") {

        Dpre = "SIN";
    }
    if (OType == "R") {

        Dpre = "PIN";
    }
    if (OType == "D") {

        Dpre = "PDI";
    }

    var InvOrQlty = $('input[name="InvQty"]:checked').attr('value');
    var EntryType = 0;

    if (OType == "P" && InvOrQlty == "ID") {
        EntryType = "GI";
    }
    else if (OType == "R" && InvOrQlty == "ID") {
        EntryType = "PI";
    }
    else if (OType == "P" && InvOrQlty == "QD") {
        EntryType = "GQ";
    }
    else if (OType == "R" && InvOrQlty == "QD") {
        EntryType = "PQ";
    }
    else if (OType == "R" && InvOrQlty == "C") {
        EntryType = "PC";
    }



    var DeborCre = $('input[name="CreDeb"]:checked').attr('value');

    if (InvOrQlty == "ID" && DeborCre == "Debit") {
        DType = "ID";
    }
    else if (InvOrQlty == "ID" && DeborCre == "Credit") {
        DType = "IC";
    }
    else if (InvOrQlty == "QD" && DeborCre == "Debit") {
        DType = "QD";
    }
    else if (InvOrQlty == "QD" && DeborCre == "Credit") {
        DType = "QC";
    }

    debugger;
    table = "pur_debit_mas",
    column = "debit_no",
    compId = GCompId,
    Docum = 'PURCHASE DC'

    var oldDebitNo = $('#txtDebitNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newDebitNo = result.Value;
            if (oldDebitNo != newDebitNo) {
                //alert('Debit No has been changed...');
                var msg = 'Debit Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtDebitNo').val(result.Value);
            }
            var objPurSubmit = {

                Debit_no: $('#txtDebitNo').val(),
                Debit_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                companyid: GCompId,
                supplierid: GSuppId,
                InvMasId: GInvId,
                DocType: DType,
                Amount: 0.00,//$('#txtNetAmount').val(),
                remarks: $('#txtremark').val(),
                DocumentNo: $('#txtInvNo').val(),
                DocPrefix: Dpre,
                EntryType: EntryType,
                CreatedBy: Guserid,

                PurDebItemDet: ItemList,
                PurDebOrd: OSItemList,
                PurDebOthers: RItemList,

            };
            debugger;
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/DebitCredit/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {


                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Debit/Credit', 'ADD', $("#txtDebitNo").val());
                        //alert("Data Saved Sucessfully");

                        $('#myModal1').modal('hide');
                        $("#btnAdd").attr("disabled", false);
                        //window.location.reload();
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        // ClearAddData();

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
function LoadMainDocDropLoad() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();


    var RefType = "";
    var RType = $('select#ddlMReference option:selected').val();

    if (RType == 0) {
        RefType == "";
    }
    else {

        RefType = $('select#ddlMReference option:selected').text();
    }


    var NoteType = "";
    var NType = $('select#ddlMNotetype option:selected').val();

    if (NType == 0) {
        NoteType == "";
    }
    else {

        NoteType = $('select#ddlMNotetype option:selected').text();
    }


    $.ajax({
        url: "/DebitCredit/GetDebMainDropNo",
        data: JSON.stringify({ companyid: CompId, supplierid: SuppId, DocType: RefType, EntryType: NoteType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                var data = result.Value;
                $(ddlMDcNo).empty();

                $(ddlMDcNo).append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(data, function () {
                    $(ddlMDcNo).append($('<option></option>').val(this.Debit_id).text(this.Debit_no));
                });



            }
        }

    });
}
function LoadMainGrid() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();


    var RefType = "";
    var RType = $('select#ddlMReference option:selected').val();

    if (RType == 0) {
        RefType == "";
    }
    else {

        RefType = $('select#ddlMReference option:selected').val();
    }


    var NoteType = "";
    var NType = $('select#ddlMNotetype option:selected').val();

    if (NType == 0) {
        NoteType == "";
    }
    else {

        NoteType = $('select#ddlMNotetype option:selected').text();
    }



    var SDcNo = "";
    var DNo = $('select#ddlMDcNo option:selected').val();

    if (DNo == 0) {
        SDcNo == "";
    }
    else {

        SDcNo = $('select#ddlMDcNo option:selected').text();
    }
    $.ajax({
        url: "/DebitCredit/GetMainLoad",
        data: JSON.stringify({ companyid: CompId, supplierid: SuppId, DocType: RefType, EntryType: NoteType, DocumentNo: SDcNo, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblmaincredeb').DataTable({
                data: dataSet,
                scrollY: 200,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                         { title: "Debit_id", "visible": false },
                         { title: "Debit No" },
                         { title: "Date" },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Reference" },
                         { title: "Note Type" },
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tblmaincredeb').DataTable();

                $('#tblmaincredeb tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            CheckRights("DebitCredit");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMainRef() {
    $('#tblmaincredeb').DataTable().destroy();
    LoadMainDocDropLoad();
    LoadMainGrid();
}

function LoadMainSupp() {
    $('#tblmaincredeb').DataTable().destroy();
    LoadMainDocDropLoad();
    LoadMainGrid();
}
function LoadMainNote() {
    $('#tblmaincredeb').DataTable().destroy();
    LoadMainDocDropLoad();
    LoadMainGrid();
}
function LoadMainEntryNo() {
    $('#tblmaincredeb').DataTable().destroy();
    LoadMainGrid();
}
function LoadMainComp() {
    $('#tblmaincredeb').DataTable().destroy();
    LoadMainDocDropLoad();
    LoadMainGrid();
}

function getbyID(Id) {

    GDebId = Id;
    $.ajax({
        url: "/DebitCredit/LoadEditDebDetails",
        data: JSON.stringify({ Debit_id: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtCompany').val(obj[0]["company"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtInvNo').val(obj[0]["DocumentNo"]);
                $('#txtEntryDate').val(moment(obj[0]["Debit_date"]).format('DD/MM/YYYY'));
                $('#txtDebitNo').val(obj[0]["Debit_no"]);
                $('#txtSuppInv').val(obj[0]["DcNo"]);
                $('#txtremark').val(obj[0]["remarks"]);


                GInvId = obj[0]["InvMasId"];
                GCompId = obj[0]["companyid"];
                GSuppId = obj[0]["supplierid"];

                GDocType = obj[0]["DocType"];
                GEntryType = obj[0]["EntryType"];
                GDocPrefix = obj[0]["DocPrefix"];
                var styp = 'P';
                if (GDocPrefix == 'SIN') {
                    styp = 'P';
                }
                else if (GDocPrefix == 'PIN') {
                    styp = 'R';
                }
                else if (GDocPrefix == 'PDI') {
                    styp = 'D';
                }

                LoadPurDebItemEdit(Id);
                var DocType = obj[0]["DocType"];

                if (DocType == "ID") {
                    DorC = "D";
                }
                else {
                    DorC = "C";
                }

                if (DocType == "QD") {
                    styp = 'Q';
                }

                LoadDebRateDetails(GInvId, DorC, styp);



                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
                $('#btnDeletedebit').hide();



            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadPurDebItemEdit(InvId) {

    $.ajax({
        url: "/DebitCredit/LoadItemDebEditDetails",
        data: JSON.stringify({ InvMasId: InvId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadItemTable(ItemList);

            var GrnDetId = ItemList[0].grn_detid;

            var Mode = "E";
            var gdetid = 0;
            LoadDebOrdEditInvDetails(GDebId, gdetid, Mode);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDebOrdEditInvDetails(GDebId, GrnDetId, Mode) {

    $.ajax({
        url: "/DebitCredit/LoadDataOrdEditDebDetails",
        data: JSON.stringify({ Debit_id: GDebId, GrnDetId: GrnDetId, Mode: Mode }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            OSItemList = result;
           



            for (var g = 0; g < ItemList.length; g++) {
                var GrnDetid = ItemList[g].grn_detid;
                var DebQty = ItemList[g].dQty;
                var dRate = ItemList[g].dRate;
                for (var h = 0; h < OSItemList.length; h++) {
                    var DGrnDetid = OSItemList[h].GrnDetId;

                    if (GrnDetid == DGrnDetid) {
                        OSItemList[h].Amount = DebQty * dRate;
                        OSItemList[h].Rate = dRate;
                    }
                }
            }
            loadOrdSaveItemTable(OSItemList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getDeleteID(Id) {
    GDebId = Id;
    $.ajax({
        url: "/DebitCredit/LoadEditDebDetails",
        data: JSON.stringify({ Debit_id: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#txtCompany').val(obj[0]["company"]);
                $('#txtSupplier').val(obj[0]["Supplier"]);
                $('#txtInvNo').val(obj[0]["DocumentNo"]);
                $('#txtEntryDate').val(moment(obj[0]["Debit_date"]).format('DD/MM/YYYY'));
                $('#txtDebitNo').val(obj[0]["Debit_no"]);
                $('#txtSuppInv').val(obj[0]["DcNo"]);
                $('#txtremark').val(obj[0]["remarks"]);

                
                GInvId = obj[0]["InvMasId"];
                GCompId = obj[0]["companyid"];
                GSuppId = obj[0]["supplierid"];

                GDocType = obj[0]["DocType"];
                GEntryType = obj[0]["EntryType"];
                GDocPrefix = obj[0]["DocPrefix"];
                var styp='P'
                if (GDocPrefix == 'PIN') {
                    styp='R'
                }
                else if (GDocPrefix == 'PDI') {
                    styp = 'D';
                }

                LoadPurDebItemEdit(Id);
                var DocType = obj[0]["DocType"];

                if (DocType == "ID") {
                    DorC = "D";
                }
                else {
                    DorC = "C";
                }
                LoadDebRateDetails(GInvId, DorC, styp);



                $('#myModal').modal('hide');
                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').hide();
                $('#btnDeletedebit').show();



            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function DebUpdate() {
    debugger;


    if (ItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var objPurSubmit = {

        Debit_no: $('#txtDebitNo').val(),
        Debit_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        companyid: GCompId,
        supplierid: GSuppId,
        InvMasId: GInvId,
        DocType: GDocType,
        Amount: 0.00,//$('#txtNetAmount').val(),
        remarks: $('#txtremark').val(),
        DocumentNo: $('#txtInvNo').val(),
        DocPrefix: GDocPrefix,
        EntryType: GEntryType,
        CreatedBy: Guserid,
        Debit_id: GDebId,
        PurDebItemDet: ItemList,
        PurDebOrd: OSItemList,
        PurDebOthers: RItemList,

    };
    debugger;
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/DebitCredit/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Debit/Credit', 'ADD', $("#txtDebitNo").val());
                //alert("Data Updated Sucessfully");

                $('#myModal1').modal('hide');
                //window.location.reload();
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                // ClearAddData();

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function DebDelete() {
    debugger;


    if (ItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 1;
        var mod = 0;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var objPurSubmit = {

        Debit_no: $('#txtDebitNo').val(),
        Debit_date: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        companyid: GCompId,
        supplierid: GSuppId,
        InvMasId: GInvId,
        DocType: GDocType,
        Amount: 0.00,//$('#txtNetAmount').val(),
        remarks: $('#txtremark').val(),
        DocumentNo: $('#txtInvNo').val(),
        DocPrefix: GDocPrefix,
        EntryType: GEntryType,
        CreatedBy: Guserid,
        Debit_id: GDebId,
        PurDebItemDet: ItemList,
        PurDebOrd: OItemList,
        PurDebOthers: RItemList,

    };
    debugger;
    $("#btnDeletedebit").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/DebitCredit/Delete",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Debit/Credit', 'DELETE', $("#txtDebitNo").val());
                //alert("Data Deleted Sucessfully");

                $('#myModal1').modal('hide');
                //window.location.reload();
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                // ClearAddData();

            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function CreDebPrint(Id) {
    debugger;
    var compid = $('#ddlMCompany').val();

    window.open("../ReportInline/Stores/CreditDebit/CreditDebitInlineReport.aspx?Masid=" + Id + "&Companyid=" + compid);
    return true;
}



function SubReport() {
    debugger;
    var RptTyp = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');


    if (RptTyp == "M") {
        LoadingSymb();
        var compid = $('#ddlMCompany').val();
        $.ajax({
            type: "POST",
            url: "../ReportInline/Stores/CreditDebit/CreditDebitInlineReport.aspx?Masid=" + Printid + "&Companyid=" + compid + "&RptTyp=" + RptTyp,
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger;
                // $("#divResult").html("success");
            },
            error: function (e) {
                // $("#divResult").html("Something Wrong.");
            }
        });

        sentmail(Printid);

    }
    else {
        var compid = $('#ddlMCompany').val();
        // window.open("../ReportInline/Stores/OpenDebit/OpenDebitInlineReport.aspx?Masid=" + Repid + "&Companyid=" + compid + "&RptTyp=" + RptTyp);
        window.open("../ReportInline/Stores/CreditDebit/CreditDebitInlineReport.aspx?Masid=" + Printid + "&Companyid=" + compid + "&RptTyp=" + RptTyp);
        return true;
    }
}

function CreDebPrint(Id) {
    // $("#myModal2").hide();
    Printid = Id;
    $("#myModal2").modal('show');
}


function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
    $("#myModal3").modal('hide');
}

$(document).ready(function () {

    $('#tblItemcredeb').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblItemcredeb').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblItemcredeb').dataTable().fnGetData(row);


        var GrnDetId = data.grn_detid;


        //var CompId = $('select#ddlCompany option:selected').val();
        //var SuppId = $('select#ddlSupplier option:selected').val();

        //// LoadInvItemDetails(GrId, CompId, SuppId);
        //EItemList = [];
        //EItemList = ESaveItemList;

        //EItemList = $.grep(EItemList, function (v) {
        //    return (v.Pur_grn_masid === GrId);
        //});
        //loadInvItemTable(EItemList);

        //var Detid = EItemList[0].Pur_grn_detid;

        //OItemList = OSaveItemList;

        //OItemList = $.grep(OItemList, function (v) {
        //    return (v.Pur_Inv_DetID === Detid);
        //});
        //loadInvOrdTable(OItemList);



        //var table = $('#tblItemcredeb').DataTable();

        //var GrnDetId = table.row($(this).parents('tr')).data()["grn_detid"];

        var colorempty = [];
        colorempty = OSItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.GrnDetId === GrnDetId);
        });

        OItemList = colorempty;
        loadOrdItemTable(OItemList);

        if (ItemList.length > 0 && RItemList.length > 0) {

            for (var f = 0; f < RItemList.length; f++) {
                RItemList[f].DAmount = 0;
                RItemList[f].CAmount = 0;
            }


            for (var e = 0; e < ItemList.length; e++) {
                var Invid = ItemList[e].Invid;
                var Qty = ItemList[e].dQty;
                var rate = ItemList[e].dRate;
                var amount = parseFloat(Qty * rate).toFixed(2);

                for (var f = 0; f < RItemList.length; f++) {
                    var DInvid = RItemList[f].InvId;
                    if (Invid == DInvid) {
                        RItemList[f].DAmount = RItemList[f].DAmount + parseFloat(amount);
                        RItemList[f].CAmount = RItemList[f].CAmount + parseFloat(amount);
                    }
                }
            }
            loadRateItemTable(RItemList);
        }


    });
});
