var CompanyId = 0;
var Mode = 0;
var MainFDate = 0;
var orderlist = [];
var Itemlist = [];
var Itemdetlist = [];
var ItemdetlistSave = [];
var SecMasid = 0;
var Guserid = 0
var Masid = 0;
var DCompid = 0;
var SStkQty = 0;
var GOldStockid = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    LoadCompanyDDL("#ddlcompany,#ddllcompany");
    LoadItemGroupDDL("#ddlitemg");
    LoadSupplierDDL("#ddlsupplier");
    LoadStoreUnitDDL("#ddllstore");
    ddlmain();
    LoadMaingrid();
    $('#btnDesadd').click(function () {
        var isAllValid = true;
        debugger;
       
        var st1 = $('#ddllstore').val();

        if (st1 == 0) {
            //alert("Please Select Sub Store First..");
            var msg = 'Please Select Sub Store First...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $('#ddlLoc').val('0').trigger('change');
            $('#txtQty').val('');
            return true;
        }

        if ($('#ddlLoc').val() == "0") {         

            // $('#ddlLoc').css('border-color', 'Red');
            $('#ddlLoc').siblings(".select2-container").css('border', '1px solid red');
            isAllValid = false;
        }
        else {          

            //$('#ddlLoc').css('border-color', 'lightgrey');
            $('#ddlLoc').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtQty').val() == "") {
            isAllValid = false;
            $('#txtQty').css('border-color', 'Red');
        }
        else {
            $('#txtQty').css('border-color', 'lightgrey');
        }


        if (SecMasid == 0) {
            //alert('Please select any one item detail...');
            var msg = 'Please select any one item detail...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        var leng = 0;
        if (Itemdetlist.length == 0) {
            leng = 1;

        }
        else {
            leng = Itemdetlist.length + 1;

        }


        var d = $('#ddlLoc').val();
        if (ItemdetlistSave.length > 0) {
            for (var q = 0; q < ItemdetlistSave.length; q++) {
                if (ItemdetlistSave[q].SectionID == d && ItemdetlistSave[q].SecMasid==SecMasid) {
                    //alert('Must be different Bin No...');
                    var msg = 'Must be different Bin Number...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#ddlLoc').val('0').trigger('change');
                    $('#txtQty').val('');
                    return true;

                }
            }
        }

        var total = 0;
        for (var e = 0; e < ItemdetlistSave.length; e++) {
            if (ItemdetlistSave[e].SecMasid == SecMasid) {
                var amount = ItemdetlistSave[e].AllocationQty;
                total = total + parseFloat(amount);
            }
        }

        var d1 = $('#txtQty').val();

        if (ItemdetlistSave.length > 0) {

            if ((parseFloat(d1) + parseFloat(total)) > SStkQty) {

                //alert("Total Allocation Qty not more then Stock Qty...");
                var msg = 'Total Allocation Quantity not more then Stock Quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#ddlLoc').val('0').trigger('change');
                $('#txtQty').val('');
                return true;
               
            }
        } else {

            if (d1 > SStkQty) {
                //alert("Total Allocation Qty not more then Stock Qty...");
                var msg = 'Total Allocation Quantity not more then Stock Quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#ddlLoc').val('0').trigger('change');
                $('#txtQty').val('');
                return true;
               
            }

        }
     



        if (isAllValid) {
            var listObj = {
                sno: leng,
                NewStockID: 0,
                SecMasid: SecMasid,
                Section: $("#ddlLoc option:selected").text(),
                SectionID: $('#ddlLoc').val(),
                AllocationQty: $('#txtQty').val(),
                OldStockID: GOldStockid,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            ItemdetlistSave.push(listObj);

            Itemdetlist = $.grep(ItemdetlistSave, function (v) {
                return (v.SecMasid == SecMasid);
            });
            loadSectionTable(Itemdetlist);
            loadSectionSaveTable(ItemdetlistSave);

            //clear select data        
            $('#ddlLoc').val('0').trigger('change');
            $('#txtQty').val('');

            var tot = 0;
            for (var t = 0; t < Itemdetlist.length; t++) {
                var qty = Itemdetlist[t].AllocationQty;
                tot = tot + parseFloat(qty);
            }
            for (var d = 0; d < Itemlist.length; d++) {
                if (Itemlist[d].sno == SecMasid) {
                    var qty = Itemlist[d].stkqty;
                    Itemlist[d].allocqty = tot;
                }
            }
            var table = $('#Itmtab').DataTable();
            var data = table.rows().data();

            $('input[id=txtallqty]').each(function (ig) {
                if (data[ig].sno == SecMasid) {
                    var row = $(this).closest('tr');
                    row.find('#txtallqty').val(tot);

                }
            });
        }
    });
    $(document).on('click', '.btnedit', function () {
        debugger;
        Mod = 1;
        rowindex = $(this).closest('tr').index();

        var currentro12 = Itemdetlist.slice(rowindex);

        $("#ddlLoc").val(currentro12[0]['SectionID']).trigger('change');
        $("#txtQty").val(currentro12[0]['AllocationQty']);

        $('#btnDesadd').hide();
        $('#btnDesupdate').show();
    });
    $('#btnDesupdate').click(function () {
        debugger;

     

        var total = 0;
        for (var e = 0; e < ItemdetlistSave.length; e++) {
            if (ItemdetlistSave[e].SecMasid == SecMasid) {
                var amount = ItemdetlistSave[e].AllocationQty;
                total = total + parseFloat(amount);
            }
        }

        var d1 = $('#txtQty').val();

        if (ItemdetlistSave.length > 0) {

            if ((parseFloat(d1) + parseFloat(total)) > SStkQty) {

                //alert("Total Allocation Qty not more then Stock Qty...");
                var msg = 'Total Allocation Quantity not more then Stock Quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#ddlLoc').val('0').trigger('change');
                $('#txtQty').val('');
                return true;

            }
        } else {

            if (d1 > SStkQty) {
                //alert("Total Allocation Qty not more then Stock Qty...");
                var msg = 'Total Allocation Quantity not more then Stock Quantity...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#ddlLoc').val('0').trigger('change');
                $('#txtQty').val('');
                return true;

            }

        }

















        var currentrowsel = Itemdetlist.slice(rowindex);

        currentrowsel[0]['SectionID'] = $("#ddlLoc").val();
        currentrowsel[0]['Section'] = $("#ddlLoc option:selected").text();
        currentrowsel[0]['AllocationQty'] = $("#txtQty").val();
        var secmas = currentrowsel[0]['SecMasid'];
        var snumb = currentrowsel[0]['sno'];
        Itemdetlist[rowindex] = currentrowsel[0];

        loadSectionTable(Itemdetlist);

        for (var t = 0; t < ItemdetlistSave.length; t++) {
            if (ItemdetlistSave[t].SecMasid == secmas && ItemdetlistSave[t].sno == snumb) {
                ItemdetlistSave[t].AllocationQty = $("#txtQty").val();
                ItemdetlistSave[t].SectionID = $("#ddlLoc").val();
                ItemdetlistSave[t].Section = $("#ddlLoc option:selected").text();
            }

        }
        loadSectionSaveTable(ItemdetlistSave);


        var tot = 0;
        for (var t = 0; t < Itemdetlist.length; t++) {
            var qty = Itemdetlist[t].AllocationQty;
            tot = tot + parseFloat(qty);
        }
        for (var d = 0; d < Itemlist.length; d++) {
            if (Itemlist[d].sno == SecMasid) {
                var qty = Itemlist[d].stkqty;
                Itemlist[d].allocqty = tot;
            }
        }
        var table = $('#Itmtab').DataTable();
        var data = table.rows().data();

        $('input[id=txtallqty]').each(function (ig) {
            if (data[ig].sno == SecMasid) {
                var row = $(this).closest('tr');
                row.find('#txtallqty').val(tot);

            }
        });

        $('#btnDesupdate').hide();
        $('#btnDesadd').show();

        $('#ddlLoc').val('0').trigger('change');
        $('#txtQty').val('');

        Mod = 0;
    });
    $(document).on('click', '.btnremove', function () {
        debugger;

        rowindex = $(this).closest('tr').index();

        var currentrowsel = Itemdetlist.slice(rowindex);
        var secmas = currentrowsel[0]['SecMasid'];
        var snumb = currentrowsel[0]['sno'];
        Itemdetlist.splice(rowindex, 1);

        var obj = [];
        for (var f = 0; f < ItemdetlistSave.length; f++) {
            if (ItemdetlistSave[f].SecMasid == secmas && ItemdetlistSave[f].sno == snumb) {
                ItemdetlistSave.pop(ItemdetlistSave[f]);
            }
        }
        loadSectionSaveTable(ItemdetlistSave);

        if (Itemdetlist.length > 0) {
            var tot = 0;
            for (var t = 0; t < Itemdetlist.length; t++) {
                var qty = Itemdetlist[t].AllocationQty;
                tot = tot + parseFloat(qty);
            }
            for (var d = 0; d < Itemlist.length; d++) {
                if (Itemlist[d].sno == SecMasid) {
                    var qty = Itemlist[d].stkqty;
                    Itemlist[d].allocqty = tot;
                }
            }
            var table = $('#Itmtab').DataTable();
            var data = table.rows().data();

            $('input[id=txtallqty]').each(function (ig) {
                if (data[ig].sno == SecMasid) {
                    var row = $(this).closest('tr');
                    row.find('#txtallqty').val(tot);

                }
            });
        }
        else {
            for (var d = 0; d < Itemlist.length; d++) {
                if (Itemlist[d].sno == SecMasid) {
                    var qty = Itemlist[d].stkqty;
                    Itemlist[d].allocqty = 0;
                }
            }
            var table = $('#Itmtab').DataTable();
            var data = table.rows().data();

            $('input[id=txtallqty]').each(function (ig) {
                if (data[ig].sno == SecMasid) {
                    var row = $(this).closest('tr');
                    row.find('#txtallqty').val(0);

                }
            });
        }
        document.getElementById("tblLocdetails").deleteRow(rowindex + 1);
    });
    $('#Itmtab').on('click', 'tr', function (e) {

        debugger;
        var table = $('#Itmtab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#Itmtab').dataTable().fnGetData(row);
        SecMasid = data.sno;
        GOldStockid = data.stockid;
        SStkQty = data.stkqty;
        if (ItemdetlistSave.length > 0) {

            Itemdetlist = $.grep(ItemdetlistSave, function (v) {
                return (v.SecMasid == SecMasid);
            });
            loadSectionTable(Itemdetlist);
        }
    });
});


function loadSectionTable(list) {

    $('#tblLocdetails').DataTable().destroy();

    debugger;
    $('#tblLocdetails').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        columns: [
            { title: "Sno", data: "sno", "visible": false },
            { title: "SecMasid", data: "SecMasid", "visible": false },
            { title: "LocId", data: "SectionID", "visible": false },
            { title: "Location", data: "Section" },
            { title: "Qty", data: "AllocationQty" },
             { title: "OldStockID", data: "OldStockID", "visible": false },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button><i class="fa fa-trash-o" style="cursor: pointer;display:none;"></i></a>'//<button type="button" class="btnsizeview"> View Color </button>
               }
        ]
    });
}


function loadSectionSaveTable(list) {

    $('#tblSaveLocdetails').DataTable().destroy();

    debugger;
    $('#tblSaveLocdetails').DataTable({
        data: list,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "Sno", data: "sno", "visible": false },
            { title: "SecMasid", data: "SecMasid" },
            { title: "LocId", data: "SectionID", "visible": false },
            { title: "Location", data: "Section" },
            { title: "Qty", data: "AllocationQty" },
               { title: "OldStockID", data: "OldStockID", "visible": false },
        ]
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
    // $('#txtFromDate').val(date);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#txtentrydate').val(Fdatestring);

}

function chkcmpnyid() {
    debugger;
    if (Mode == 0) {
        CompanyId = $('select#ddllcompany option:selected').val();
        if (CompanyId == 0) {
            //alert('Select Company...');
            var msg = 'Select Company...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        else {
            GenerateNumber();
            Loadorderno(CompanyId);
            Loadstoreunit(CompanyId);
            Loadtranstype();
        }
    }

}

function GenerateNumber() {
    debugger;
    table = "StockAllocationMas",
    column = "AllocationNo",
    compId = CompanyId,
    Docum = 'Stock Location Allocation'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtentryno').val(result.Value);
        }
    });
}


function Loadorderno(CompanyId) {
    $.ajax({
        url: "/StockLocAllocation/GetOrderno",
        data: JSON.stringify({ cmpid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;
            orderlist = obj;
            if (result.Status == 'SUCCESS') {


                var data = result.Value;
                $(ddlodrno).empty();
                $(ddlodrno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlodrno).append($('<option></option>').val(this.buymasid).text(this.orderno));
                });

                $(ddllrefno).empty();
                $(ddllrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddllrefno).append($('<option></option>').val(this.buymasid).text(this.refno));
                });

            }
        }

    });
}

function LoadRefNo() {
    var ord = $('#ddlodrno option:selected').text();
    var list = $.grep(orderlist, function (e) {
        return e.orderno == ord;
    });
    $(ddllrefno).empty();
    $(ddllrefno).append($('<option/>').val('0').text('--Select RefNo--'));
    $.each(list, function () {
        $(ddllrefno).append($('<option></option>').val(this.buymasid).text(this.refno));
    });
    LoadStyle();
    LoadJobord();
}
function Loadstoreunit(CompanyId) {
    $.ajax({
        url: "/StockLocAllocation/GetStkStoreunit",
        data: JSON.stringify({ cmpid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {


                var data = result.Value;
                $(ddllstore).empty();
                $(ddllstore).append($('<option/>').val('0').text('--Select StoreUnit--'));
                $.each(data, function () {
                    $(ddllstore).append($('<option></option>').val(this.strunitid).text(this.strunit));
                });

            }
        }

    });
}

function Loadtranstype() {
    $.ajax({
        url: "/StockLocAllocation/Gettranstype",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {


                var data = result.Value;
                $(ddltranstype).empty();
                $(ddltranstype).append($('<option/>').val('0').text('--Select TransType--'));
                $.each(data, function () {
                    $(ddltranstype).append($('<option></option>').val(this.transtype).text(this.Inwardtype));
                });

            }
        }

    });
}

function Loadtransno() {
    var strunt = $('#ddllstore option:selected').val();

    $.ajax({
        url: "/StockLocAllocation/GetTransno",
        data: JSON.stringify({ compid: CompanyId, strunitid: strunt }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {
                var compdet = {};
                var comp = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.transno]) {
                        compdet[el.transno] = true;
                        comp.push(el);
                    }
                });


                $(ddltransno).empty();
                $(ddltransno).append($('<option/>').val('0').text('--Select TransNo--'));
                $.each(comp, function () {
                    $(ddltransno).append($('<option></option>').text(this.transno));
                });

            }
            LoadAlloStoreNo();
        }

    });
}

function LoadStyle() {
    var ordno = $('#ddlodrno option:selected').text();
    $.ajax({
        url: "/StockLocAllocation/GetStyle",
        data: JSON.stringify({ orderno: ordno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {


                var data = result.Value;
                $(ddllstyle).empty();
                $(ddllstyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddllstyle).append($('<option></option>').val(this.styleid).text(this.style));
                });

            }
        }

    });
}
function LoadJobord() {
    var ordno = $('#ddlodrno option:selected').text();
    $.ajax({
        url: "/StockLocAllocation/GetJobordno",
        data: JSON.stringify({ orderno: ordno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {


                var data = result.Value;
                $(ddljobno).empty();
                $(ddljobno).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                $.each(data, function () {
                    $(ddljobno).append($('<option></option>').val(this.jmasid).text(this.jobordno));
                });

            }
        }

    });
}

function LoadItem() {
    debugger;


    var st1 = $('#ddllstore').val();

    if (st1 == 0) {
        //alert("Please Select Sub Store First..");      
        var msg = 'Please Select Sub Store First...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordNo = "";
    var ONo = $('select#ddlodrno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlodrno option:selected').text();
    }

    var RecNo = "";
    var RNo = $('select#ddllrefno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddllrefno option:selected').text();
    }


    var DCNo = "";
    var DNo = $('select#ddltransno option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddltransno option:selected').val();
    }

    var JNo = "";
    var JoNo = $('select#ddljobno option:selected').val();

    if (JoNo == 0 || JoNo == undefined) {
        JNo == "";
    }
    else {

        JNo = $('select#ddljobno option:selected').text();
    }


    var CompId = $('#ddllcompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var styleid = $('#ddllstyle').val();
    if (styleid == null || styleid == "0") {
        styleid = 0;
    }

    var strunitid = $('#ddllstore').val();
    if (strunitid == null || strunitid == "0") {
        strunitid = 0;
    }
    var transtype = $('#ddltranstype').val();
    if (transtype == null || transtype == "0") {
        transtype = "";
    }

    var itmgrpid = $('#ddlitemg').val();
    if (itmgrpid == null || itmgrpid == "0") {
        itmgrpid = 0;
    }
    var suppid = $('#ddlsupplier').val();
    if (suppid == null || suppid == "0") {
        suppid = 0;
    }

    $.ajax({
        url: "/StockLocAllocation/LoadItem",
        data: JSON.stringify({ compid: CompId, suppid: suppid, ordno: ordNo, refno: RecNo, strunitid: strunitid, transtype: transtype, transno: DCNo, jobordno: JNo, styleid: styleid, itmgrpid: itmgrpid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            Itemlist = json.Value;
            $.each(Itemlist, function (e) {
                Itemlist[e].transdate = moment(Itemlist[e].transdate).format('DD/MM/YYYY');
            });

            LoadItemtab(Itemlist);

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadItemtab(list) {
    $('#Itmtab').DataTable().destroy();

    $('#Itmtab').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        fixedHeader: true,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,   
        "bSort": false,
        columns: [
                   { title: "Sno", data: "sno" },
                    { title: "TransNo", data: "transno" },
                    { title: "TransDate", data: "transdate" },
                   { title: "Itemid", data: "itmid", "visible": false },
                   { title: "Item", data: "itm" },

                   { title: "Colorid", data: "clrid", "visible": false },
                   { title: "Color", data: "clr" },
                   {
                       title: "Sizeid", data: "sizeid", "visible": false

                   },
                   {
                       title: "Size", data: "size",

                   },
                    {
                        title: "Uom", data: "uom",

                    },
                    {
                        title: "Lot No", data: "lotno",

                    },
                   { title: "StockQty", data: "stkqty" },
                    {
                        title: "Alloc.Qty", data: "allocqty",

                        render: function (data) {

                            return '<input type="text" id="txtallqty" class="txtallqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';

                        },
                    },


        ]

    });
    $("#Itmtab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#Itmtab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function clearTextBox() {
    Mode = 0;
   // $('#ddllcompany').val("0");
    $('#ddllstore').val("0");
    //$('#ddlitemg').val("");
    //$('#txtentryno').val("");
    // $('#ddltranstype').val("0");
    // $('#ddltransno').val("0");
     //$('#ddlsupplier').val("0");
    // $('#ddllstyle').val("");
    $('#txtrefno').val("");
    $('#txtremarks').val("");
   // $('#ddlDepartment').val("0");

    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();

    if (Mode == 0) {
        CompanyId = $('select#ddllcompany option:selected').val();
        if (CompanyId == 0) {
            //alert('Select Company...');
            var msg = 'Select Company...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        else {
            GenerateNumber();
            Loadorderno(CompanyId);
            Loadstoreunit(CompanyId);
            Loadtranstype();
        }
    }


    Itemlist = [];
    LoadItemtab(Itemlist);
    ItemdetlistSave = [];
    loadSectionSaveTable(ItemdetlistSave);
    Itemdetlist = [];
    loadSectionTable(Itemdetlist);
}

function validate() {
    var isValid = true;


    if ($('#ddllstore').val() == 0) {
        //$('#ddllstore').css('border-color', 'Red');
        $('#ddllstore').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddllstore').css('border-color', 'lightgrey');
        $('#ddllstore').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#txtrefno').val() == 0) {
        $('#txtrefno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtrefno').css('border-color', 'lightgrey');
    }


    return isValid;
}
function Add() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }
    var ordtype = $('input[name="order"]:checked').attr('value');

    var Stocktype = $('input[name="Stock"]:checked').attr('value');


    


    //Check Qty
    var opchk = [];

    for (var y = 0; y < Itemlist.length; y++) {
        if (Itemlist[y].allocqty > 0) {
            opchk.push(Itemlist[y]);
        }
    }

    if (opchk.length == 0) {
        //alert('Please fill atleast any one allocation qty...');
        var msg = 'Please fill atleast any one allocation quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    var detlist = [];
    var seclist = [];
    var itmstklist = [];

    for (var d = 0; d < Itemlist.length; d++) {
        if (Itemlist[d].allocqty > 0) {
            var obj = {
                StockID: Itemlist[d].stockid,
                ItemId: Itemlist[d].itmid,
                ColorId: Itemlist[d].clrid,
                SizeId: Itemlist[d].sizeid,
                Qty: Itemlist[d].allocqty,
                sno: Itemlist[d].sno
            }
            detlist.push(obj);
        }
    }

    for (var d = 0; d < Itemlist.length;d++) {
        if (Itemlist[d].allocqty > 0) {
            for (var f = 0; f < ItemdetlistSave.length; f++) {
                if (ItemdetlistSave[f].SecMasid == Itemlist[d].sno) {
                    var obj = {               


                        UnitId: Itemlist[d].cmpunitid,
                        Itemid: Itemlist[d].itmid,
                        Colorid: Itemlist[d].clrid,
                        sizeid: Itemlist[d].sizeid,
                        qty: ItemdetlistSave[f].AllocationQty,
                        Rate: Itemlist[d].rate,
                        joborderNo: Itemlist[d].jobordno,
                        TransType: Itemlist[d].transtype,
                        Transno: Itemlist[d].transno,
                        alloted: Itemlist[d].alloted,
                        ItemCat: Itemlist[d].itmcat,
                        processId: Itemlist[d].processid,
                        sQty: Itemlist[d].sqty,
                        lotNo: Itemlist[d].lotno,
                        balQty: ItemdetlistSave[f].AllocationQty,
                        purorprod: Itemlist[d].purorord,
                        transdate: Itemlist[d].transdate,
                        StockDate: Itemlist[d].transdate,
                        companyid: Itemlist[d].compid,
                        supplierid: Itemlist[d].suppid,
                        return_qty: Itemlist[d].retqty,
                        uomid: Itemlist[d].uomid,
                        MfrId: Itemlist[d].mfrid,
                        Styleid: Itemlist[d].styleid,
                        unit_or_other: Itemlist[d].unitrother,
                        ReProg: Itemlist[d].reprog,
                        StockType: Itemlist[d].stocktype,
                        Remarks: Itemlist[d].remarks,
                        Markup_Rate: Itemlist[d].markuprate,
                        ItemCode: "",
                        CatType: "",//li.cattype,
                        BundleNo: "",//li.bundleno,
                        OrderIdent: "",//li.orderindent,
                        FabricGSM: "",//li.fabgsm,
                        StoreUnitID: Itemlist[d].strunitid,
                        SectionID: ItemdetlistSave[f].SectionID,
                        snumb: ItemdetlistSave[f].SecMasid
                    }
                    itmstklist.push(obj);
                }
            }
        }
    }
    debugger;
    table = "StockAllocationMas",
    column = "AllocationNo",
    compId = CompanyId,
    Docum = 'Stock Location Allocation'

    var oldEntryNo = $('#txtentryno').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newEntryNo = result.Value;
            if (oldEntryNo != newEntryNo) {
                //alert('Entry No has been changed...');
                var msg = 'Entry Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryNo').val(result.Value);
            }
            var obj = {
                AllocationNo: $('#txtentryno').val(),
                AllocationRefNo: $('#txtrefno').val(),
                AllocationDate: $('#txtentrydate').val(),
                CompanyID: $('#ddllcompany').val(),
                SubStoreID: $('#ddllstore').val(),
                StockType: Stocktype,
                OrderType: ordtype,
                CreatedBy: Guserid,
                StkDet: detlist,
                StkSection: ItemdetlistSave,
                Gendet: Itemlist,
                Itmstkdet: itmstklist
            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/StockLocAllocation/Add",
                data: JSON.stringify(obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == 1) {
                        AddUserEntryLog('Procurement', 'Stock Allocation', 'ADD', $("#txtentryno").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/StockLocAllocation/StockLocAllocationIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/StockLocAllocation/StockLocAllocationIndex";
                        AlartMessage(msg, flg, mod, url);
                    }
                    if (result.Value == 0) {

                        //alert('Data not saved properly');
                        var msg = 'Data not saved properly...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }

            });
        }
    });
}


function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    var ordtype = $('input[name="order"]:checked').attr('value');

    var Stocktype = $('input[name="Stock"]:checked').attr('value');
    var detlist = [];
    var seclist = [];
    var itmstklist = [];

    for (var d = 0; d < Itemlist.length; d++) {
        if (Itemlist[d].allocqty > 0) {
            var obj = {
                StockID: Itemlist[d].stockid,
                ItemId: Itemlist[d].itmid,
                ColorId: Itemlist[d].clrid,
                SizeId: Itemlist[d].sizeid,
                Qty: Itemlist[d].allocqty,
                sno: Itemlist[d].sno
            }
            detlist.push(obj);
        }
    }
    for (var d = 0; d < Itemlist.length; d++) {
        if (Itemlist[d].allocqty > 0) {
            for (var f = 0; f < ItemdetlistSave.length; f++) {
                if (ItemdetlistSave[f].SecMasid == Itemlist[d].sno) {
                    var obj = {

                        StockId:ItemdetlistSave[d].Stockid,
                        UnitId: Itemlist[d].cmpunitid,
                        Itemid: Itemlist[d].itmid,
                        Colorid: Itemlist[d].clrid,
                        sizeid: Itemlist[d].sizeid,
                        qty: Itemlist[d].qty,
                        Rate: Itemlist[d].rate,
                        joborderNo: Itemlist[d].jobordno,
                        TransType: Itemlist[d].transtype,
                        Transno: Itemlist[d].transno,
                        alloted: Itemlist[d].alloted,
                        ItemCat: Itemlist[d].itmcat,
                        processId: Itemlist[d].processid,
                        sQty: Itemlist[d].sqty,
                        lotNo: Itemlist[d].lotno,
                        balQty: ItemdetlistSave[f].AllocationQty,
                        purorprod: Itemlist[d].purorord,
                        transdate: Itemlist[d].transdate,
                        StockDate: Itemlist[d].transdate,
                        companyid: Itemlist[d].compid,
                        supplierid: Itemlist[d].suppid,
                        return_qty: Itemlist[d].retqty,
                        uomid: Itemlist[d].uomid,
                        MfrId: Itemlist[d].mfrid,
                        Styleid: Itemlist[d].styleid,
                        unit_or_other: Itemlist[d].unitrother,
                        ReProg: Itemlist[d].reprog,
                        StockType: Itemlist[d].stocktype,
                        Remarks: Itemlist[d].remarks,
                        Markup_Rate: Itemlist[d].markuprate,
                        ItemCode: "",
                        CatType: "",//li.cattype,
                        BundleNo: "",//li.bundleno,
                        OrderIdent: "",//li.orderindent,
                        FabricGSM: "",//li.fabgsm,
                        StoreUnitID: Itemlist[d].strunitid,
                        SectionID: ItemdetlistSave[f].SectionID,
                        snumb: ItemdetlistSave[f].SecMasid,
                        Mode: ItemdetlistSave[f].ModeFn
                    }
                    itmstklist.push(obj);
                }
            }
        }
    }
    var obj = {
        AllocationID:Masid,
        AllocationNo: $('#txtentryno').val(),
        AllocationRefNo: $('#txtrefno').val(),
        AllocationDate: $('#txtentrydate').val(),
        CompanyID: $('#ddllcompany').val(),
        SubStoreID: $('#ddllstore').val(),
        StockType: Stocktype,
        OrderType: ordtype,
        CreatedBy: Guserid,
        StkDet: detlist,
        StkSection: ItemdetlistSave,
        Gendet: Itemlist,
        Itmstkdet: itmstklist
    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockLocAllocation/Update",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {
                AddUserEntryLog('Procurement', 'Stock Allocation', 'UPDATE', $("#txtentryno").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/StockLocAllocation/StockLocAllocationIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/StockLocAllocation/StockLocAllocationIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                //alert('Data not saved properly');
                var msg = 'Data not saved properly...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function LoadMaingrid() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlorderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlorderno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlrefno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlrefno option:selected').val();
    }

    var ordtype = $('input[name="ordermain"]:checked').attr('value');

    var Stocktype = $('input[name="stockmain"]:checked').attr('value');


    var JNo = "";
    var JoNo = $('select#ddlmainjobno option:selected').val();

    if (JoNo == 0 || JoNo == undefined) {
        JNo == "";
    }
    else {

        JNo = $('select#ddlmainjobno option:selected').val();
    }


    //var CompId = $('#ddlcompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}


    var CompId = $('#ddlcompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlcompany').val();
    }

    var styleid = $('#ddlstyle').val();
    if (styleid == null || styleid == "0") {
        styleid = 0;
    }
    var allid = $('#ddlallcno').val();
    if (allid == null || allid == "0") {
        allid = 0;
    }
    var strunitid = $('#ddlstore').val();
    if (strunitid == null || strunitid == "0") {
        strunitid = 0;
    }
    var transtype = $('#ddltranstype').val();
    if (transtype == null || transtype == "0") {
        transtype = "";
    }

    var Fromdate = $('#txtFromDate').val();
    var Todate = $('#txtToDate').val();

    $.ajax({
        url: "/StockLocAllocation/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, orderno: ordNo, refno: RecNo, strunitid: strunitid, ordtype: ordtype, stktype: Stocktype, jobordno: JNo, styleid: styleid, fromdate: Fromdate, todate: Todate, AllocationID: allid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblbillmaingrid').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                'bSort': false,
                columns: [
                         { title: "AllocationId", "visible": false },
                         { title: "SubStore" },
                         { title: "AllocationNo" },
                         { title: "Date" },
                         { title: "Ref No" },
                          { title: "Action" },


                ]

            });

            //$('#ddlstore').empty();
            //$('#ddlcompany').empty();
            //$('#ddlstyle').empty();
            //$('#ddlmainjobno').empty();
            //$('#ddlrefno').empty();
            //$('#ddlorderno').empty();
           


            $(document).ready(function () {
                var table = $('#tblbillmaingrid').DataTable();

                $('#tblbillmaingrid tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            CheckRights("StockAllocation");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function ddlmain() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlorderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlorderno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlrefno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlrefno option:selected').val();
    }

    var ordtype = $('input[name="ordermain"]:checked').attr('value');

    var Stocktype = $('input[name="stockmain"]:checked').attr('value');


    var JNo = "";
    var JoNo = $('select#ddlmainjobno option:selected').val();

    if (JoNo == 0 || JoNo == undefined) {
        JNo == "";
    }
    else {

        JNo = $('select#ddlmainjobno option:selected').val();
    }


    //var CompId = $('#ddlcompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}

    var CompId = $('#ddlcompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlcompany').val();
    }

    var styleid = $('#ddlstyle').val();
    if (styleid == null || styleid == "0") {
        styleid = 0;
    }

    var strunitid = $('#ddlstore').val();
    if (strunitid == null || strunitid == "0") {
        strunitid = 0;
    }
    var transtype = $('#ddltranstype').val();
    if (transtype == null || transtype == "0") {
        transtype = "";
    }

    var Fromdate = $('#txtFromDate').val();
    var Todate = $('#txtToDate').val();

    $.ajax({
        url: "/StockLocAllocation/LoadMaingridddl",
        data: JSON.stringify({ cmpid: CompId, orderno: ordNo, refno: RecNo, strunitid: strunitid, ordtype: ordtype, stktype: Stocktype, jobordno: JNo, styleid: styleid, fromdate: Fromdate, todate: Todate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;


                var compdet = {};
                var comp = [];
                var recptdet = {};
                var recpt = [];
                var dcdet = {};
                var dc = [];
                var procdet = {};
                var proc = [];
                var unitdet = {};
                var unit = [];
                var jorddet = {};
                var jord = [];
                var strdet = {};
                var str = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.CompanyID]) {
                        compdet[el.CompanyID] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.AllocationNo]) {
                        recptdet[el.AllocationNo] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.ddlrefno]) {
                        dcdet[el.ddlrefno] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.OrderNo]) {
                        procdet[el.OrderNo] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.Styleid]) {
                        unitdet[el.Styleid] = true;
                        unit.push(el);
                    }
                    if (!jorddet[el.JobOrdNo]) {
                        jorddet[el.JobOrdNo] = true;
                        jord.push(el);
                    }
                    if (!strdet[el.SubStoreID]) {
                        strdet[el.SubStoreID] = true;
                        str.push(el);
                    }
                });

                $('#ddlallcno').empty();
                $('#ddlrefno').empty();
                $('#ddlorderno').empty();
                $('#ddlstyle').empty();
                $('#ddlmainjobno').empty();
                $('#ddlstore').empty();

                $(ddlallcno).append($('<option/>').val('0').text('--Select AllocationNo--'));
                $.each(recpt, function () {
                    //$(ddlallcno).append($('<option></option>').text(this.AllocationNo));
                    $(ddlallcno).append($('<option></option>').val(this.AllocationID).text(this.AllocationNo));
                });

                $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(dc, function () {
                    $(ddlrefno).append($('<option></option>').text(this.AllocationRefNo));
                });

                //$(ddlcompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(comp, function () {
                //    $(ddlcompany).append($('<option></option>').val(this.CompanyID).text(this.company));
                //});

                $(ddlorderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(proc, function () {
                    $(ddlorderno).append($('<option></option>').text(this.OrderNo));
                });

                $(ddlstyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(unit, function () {
                    $(ddlstyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });

                $(ddlmainjobno).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                $.each(jord, function () {
                    $(ddlmainjobno).append($('<option></option>').text(this.JobOrdNo));
                });

                $(ddlstore).append($('<option/>').val('0').text('--Select StoreUnit--'));
                $.each(str, function () {
                    $(ddlstore).append($('<option></option>').val(this.SubStoreID).text(this.SubStore));
                });
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function CMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    LoadMaingrid();
}

function getbyID(masid) {
    debugger;
    Mode = 1;
    Masid = masid;
    //LoadCompanyDDL("#ddllcompany");
    //LoadStoreUnitDDL("#ddllstore");
    $.ajax({
        url: "/StockLocAllocation/GetEditHeaderDet",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtentrydate').val(moment(obj[0].AllocationDate).format("DD/MM/YYYY"));
            $('#ddllcompany').val(obj[0].CompanyID);
            $('#ddllstore').val(obj[0].SubStoreID);
            $('#txtentryno').val(obj[0].AllocationNo);
            $('#txtrefno').val(obj[0].AllocationRefNo);

            if (obj[0]["OrderType"] == 'B') {
                $('#optbuy').prop('checked', true);
                $('#optsam').prop('checked', false);
                $('#optjob').prop('checked', false);
            } else if (obj[0]["OrderType"] == 'S') {
                $('#optbuy').prop('checked', false);
                $('#optsam').prop('checked', true);
                $('#optjob').prop('checked', false);
            } else {
                $('#optbuy').prop('checked', false);
                $('#optsam').prop('checked', false);
                $('#optjob').prop('checked', true);
            }
            $("#optbuy").prop("disabled", true);
            $("#optsam").prop("disabled", true);
            $("#optjob").prop("disabled", true);


            if (obj[0]["StockType"] == 'O') {
                $('#optord').prop('checked', true);
                $('#optgen').prop('checked', false);
                $('#optbot').prop('checked', false);
            } else if (obj[0]["OrderType"] == 'G') {
                $('#optord').prop('checked', false);
                $('#optgen').prop('checked', true);
                $('#optbot').prop('checked', false);
            } else {
                $('#optord').prop('checked', false);
                $('#optgen').prop('checked', false);
                $('#optbot').prop('checked', true);
            }
            $("#optord").prop("disabled", true);
            $("#optgen").prop("disabled", true);
            $("#optbot").prop("disabled", true);

            $("#ddllcompany").prop("disabled", true);
            $("#ddllstore").prop("disabled", true);
            $("#BtnList").prop("disabled", true);
            var cid = obj[0].CompanyID;
            var str = obj[0].SubStoreID;
            LoadEditItem(Masid, cid, str);
            LoadEditSection(Masid);
            LoadAlloStoreNo();
        }
    });
}

function LoadEditItem(Masid, cid, str) {
    debugger;
    $.ajax({
        url: "/StockLocAllocation/GetEditLoadItem",
        data: JSON.stringify({ masid: Masid, compid: cid, strunitid: str }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            Itemlist = json.Value;
            $.each(Itemlist, function (e) {
                Itemlist[e].transdate = moment(Itemlist[e].transdate).format('DD/MM/YYYY');
            });
            LoadItemtab(Itemlist);
                   

            SecMasid = Itemlist[0].sno;
            GOldStockid = Itemlist[0].stockid;
            SStkQty = Itemlist[0].stkqty;

        }
    });
}
function LoadEditSection(Masid) {
    debugger;
    $.ajax({
        url: "/StockLocAllocation/GetEditSectionDet",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ItemdetlistSave = json.Value;
            loadSectionSaveTable(ItemdetlistSave);

            var colorempty = [];
            colorempty = ItemdetlistSave;

            colorempty = $.grep(colorempty, function (v) {
                return (v.Stockid == GOldStockid);
            });

            Itemdetlist = colorempty;
            loadSectionTable(Itemdetlist);

           
        }
    });
}


function getbyDelete(masid) {
    debugger;
    Mode = 1;
    Masid = masid;
    LoadCompanyDDL("#ddllcompany");
    //LoadStoreUnitDDL("#ddllstore");
    $.ajax({
        url: "/StockLocAllocation/GetEditHeaderDet",
        data: JSON.stringify({ masid: Masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();
            var obj = json.Value;

            $('#txtentrydate').val(moment(obj[0].AllocationDate).format("DD/MM/YYYY"));
            $('#ddllcompany').val(obj[0].CompanyID);
            $('#ddllstore').val(obj[0].SubStoreID);
            $('#txtentryno').val(obj[0].AllocationNo);
            $('#txtrefno').val(obj[0].AllocationRefNo);

            if (obj[0]["OrderType"] == 'B') {
                $('#optbuy').prop('checked', true);
                $('#optsam').prop('checked', false);
                $('#optjob').prop('checked', false);
            } else if (obj[0]["OrderType"] == 'S') {
                $('#optbuy').prop('checked', false);
                $('#optsam').prop('checked', true);
                $('#optjob').prop('checked', false);
            } else {
                $('#optbuy').prop('checked', false);
                $('#optsam').prop('checked', false);
                $('#optjob').prop('checked', true);
            }
            $("#optbuy").prop("disabled", true);
            $("#optsam").prop("disabled", true);
            $("#optjob").prop("disabled", true);


            if (obj[0]["StockType"] == 'O') {
                $('#optord').prop('checked', true);
                $('#optgen').prop('checked', false);
                $('#optbot').prop('checked', false);
            } else if (obj[0]["OrderType"] == 'G') {
                $('#optord').prop('checked', false);
                $('#optgen').prop('checked', true);
                $('#optbot').prop('checked', false);
            } else {
                $('#optord').prop('checked', false);
                $('#optgen').prop('checked', false);
                $('#optbot').prop('checked', true);
            }
            $("#optord").prop("disabled", true);
            $("#optgen").prop("disabled", true);
            $("#optbot").prop("disabled", true);

            $("#ddllcompany").prop("disabled", true);
            $("#ddllstore").prop("disabled", true);
            $("#BtnList").prop("disabled", true);
            var cid = obj[0].CompanyID;
            var str = obj[0].SubStoreID;
            LoadEditItem(Masid, cid, str);
            LoadEditSection(Masid);
            LoadAlloStoreNo();

        }
    });
}

function Delete() {
    debugger;
    var ordtype = $('input[name="order"]:checked').attr('value');

    var Stocktype = $('input[name="Stock"]:checked').attr('value');
    var detlist = [];
    var seclist = [];
    var itmstklist = [];

    for (var d = 0; d < Itemlist.length; d++) {
        if (Itemlist[d].allocqty > 0) {
            var obj = {
                StockID: Itemlist[d].stockid,
                ItemId: Itemlist[d].itmid,
                ColorId: Itemlist[d].clrid,
                SizeId: Itemlist[d].sizeid,
                Qty: Itemlist[d].allocqty,
                sno: Itemlist[d].sno
            }
            detlist.push(obj);
        }
    }
    for (var d = 0; d < Itemlist.length; d++) {
        if (Itemlist[d].allocqty > 0) {
            for (var f = 0; f < ItemdetlistSave.length; f++) {
                if (ItemdetlistSave[f].SecMasid == Itemlist[d].sno) {
                    var obj = {

                        StockId: ItemdetlistSave[d].Stockid,
                        UnitId: Itemlist[d].cmpunitid,
                        Itemid: Itemlist[d].itmid,
                        Colorid: Itemlist[d].clrid,
                        sizeid: Itemlist[d].sizeid,
                        qty: Itemlist[d].qty,
                        Rate: Itemlist[d].rate,
                        joborderNo: Itemlist[d].jobordno,
                        TransType: Itemlist[d].transtype,
                        Transno: Itemlist[d].transno,
                        alloted: Itemlist[d].alloted,
                        ItemCat: Itemlist[d].itmcat,
                        processId: Itemlist[d].processid,
                        sQty: Itemlist[d].sqty,
                        lotNo: Itemlist[d].lotno,
                        balQty: ItemdetlistSave[f].AllocationQty,
                        purorprod: Itemlist[d].purorord,
                        transdate: Itemlist[d].transdate,
                        StockDate: Itemlist[d].transdate,
                        companyid: Itemlist[d].compid,
                        supplierid: Itemlist[d].suppid,
                        return_qty: Itemlist[d].retqty,
                        uomid: Itemlist[d].uomid,
                        MfrId: Itemlist[d].mfrid,
                        Styleid: Itemlist[d].styleid,
                        unit_or_other: Itemlist[d].unitrother,
                        ReProg: Itemlist[d].reprog,
                        StockType: Itemlist[d].stocktype,
                        Remarks: Itemlist[d].remarks,
                        Markup_Rate: Itemlist[d].markuprate,
                        ItemCode: "",
                        CatType: "",//li.cattype,
                        BundleNo: "",//li.bundleno,
                        OrderIdent: "",//li.orderindent,
                        FabricGSM: "",//li.fabgsm,
                        StoreUnitID: Itemlist[d].strunitid,
                        SectionID: ItemdetlistSave[f].SectionID,
                        snumb: ItemdetlistSave[f].SecMasid,
                        Mode: ItemdetlistSave[f].ModeFn
                    }
                    itmstklist.push(obj);
                }
            }
        }
    }
    var obj = {
        AllocationID: Masid,
        AllocationNo: $('#txtentryno').val(),
        AllocationRefNo: $('#txtrefno').val(),
        AllocationDate: $('#txtentrydate').val(),
        CompanyID: $('#ddllcompany').val(),
        SubStoreID: $('#ddllstore').val(),
        StockType: Stocktype,
        OrderType: ordtype,
        CreatedBy: Guserid,
        StkDet: detlist,
        StkSection: ItemdetlistSave,
        Gendet: Itemlist,
        Itmstkdet: itmstklist
    }
    $("#btnDel").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StockLocAllocation/Delete",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {
                AddUserEntryLog('Procurement', 'Stock Allocation', 'DELETE', $("#txtentryno").val());
                //alert('Data Deleted Successfully');
                //window.location.href = "/StockLocAllocation/StockLocAllocationIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/StockLocAllocation/StockLocAllocationIndex";
                AlartMessage(msg, flg, mod, url);
            }
            if (result.Value == 0) {

                //alert('Data not saved properly');
                var msg = 'Data not saved properly...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function StkClose() {
    window.location.href = "/StockLocAllocation/StockLocAllocationIndex";
}

function fnClearLotControls() {


    $('#ddlLoc').val("0");
    $('#txtQty').val('');



}

function LoadAlloStoreNo() {

    var substoreid = $('#ddllstore').val();
    var entryid = 0;
    $.ajax({
        url: "/StockLocAllocation/GetAlloStore",
        data: JSON.stringify({ substoreid: substoreid, entryid: entryid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;


            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlLoc).empty();

                $(ddlLoc).append($('<option/>').val('0').text('--Select Section Name--'));
                $.each(data, function () {
                    $(ddlLoc).append($('<option></option>').val(this.SectionID).text(this.Section));
                });

            }
        }

    });

}

function LoadMainDet() {
    ddlmain();
    CMainlist();
}