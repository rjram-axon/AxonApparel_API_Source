var StockList = [];
var Itemlist = [];
var Colorlist = [];
var Sizelist = [];
var SaveStocklist = [];
var Mainlist = [];
var transmasid = 0;
var Mode = 0;
$(document).ready(function () {
    debugger;
    superuser = $("#hdnusername").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadOrderNoDDL("#ddlOrderNo,#ddlMBuyOrderNo,#ddlordno");
    LoadRefNoDDL("#ddlrefno");
    LoadJobNoDDL("#ddlWorkOrderNo");
    LoadProcessDDL("#ddlProcess,#ddlmainProcess");
    getDate();
    LoadStoreUnitDDL('#ddlStore');
    var fill = localStorage.getItem('ItemTransferMainFilter');
    if (fill != "null" && fill != null) {
        loadMainFromBack();
    } else {
        loadMain();
    }
    

    AddNewList();
    loadcolor();
    loadsize();
    loaditem();
    loadddl();
    LoadItemMovements();
    $('#btnList').click(function (e) {
        e.preventDefault();
        LoadStockList();
    });

    $('[name=ordtype]').click(function () {
        debugger;
        OrderwiseList();
        //var valueis = $(this).attr('onclick');
        //alert(valueis);
        //AddNewList();
    });

    $(document).on('keyup', '#txtTransQty', function (e) {
        debugger;
        var table = $('#stocktab').DataTable();
        var StkId = table.row($(this).parents('tr')).data()["StockId"];
        var FrmItemId = table.row($(this).parents('tr')).data()["FromItemId"];
        var FrmColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var FrmSizeId = table.row($(this).parents('tr')).data()["SizeId"];

        var ToItmId = table.row($(this).parents('tr')).data()["ToItemId"];
        var ToSzId = table.row($(this).parents('tr')).data()["ToSizeId"];
        var ToClrId = table.row($(this).parents('tr')).data()["ToColorId"];

        var balqty = table.row($(this).parents('tr')).data()["BalQty"];
        var Val = $(this).val();

        if ((FrmItemId == ToItmId) && (FrmColorId == ToClrId) && (FrmSizeId == ToSzId)) {
            //alert('Please Change anyone...');
            var msg = 'Please Change anyone...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            Val = 0;
            $.each(StockList, function () {
                if (this.StockId == StkId) {
                    this.TransQty = Val;
                }
            });

            var table = $('#stocktab').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtTransQty]').each(function (ig) {
                debugger;
                var row = $(this).closest('tr');

                for (var h = 0; h < StockList.length; h++) {
                    if (ig == h) {
                        var trnqty = StockList[h].TransQty;
                        row.find('#txtTransQty').val(trnqty);
                    }
                }
            });

            //loadStocktable(StockList);
            return false;
        }


        if (Val > balqty) {
            //alert('Should not exceed Bal qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            Val = 0;
            $.each(StockList, function () {
                if (this.StockId == StkId) {
                    this.TransQty = Val;

                }
            });
            var table = $('#stocktab').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtTransQty]').each(function (ig) {
                debugger;
                var row = $(this).closest('tr');

                for (var h = 0; h < StockList.length; h++) {
                    if (ig == h) {
                        var trnqty = StockList[h].TransQty;
                        row.find('#txtTransQty').val(trnqty);
                    }
                }
            });
            //loadStocktable(StockList);
            return false;
        }


        $.each(StockList, function () {
            if (this.StockId == StkId) {
                this.TransQty = Val;

            }
        });

    });

    $(document).on('keyup', '#txtSecTransQty', function (e) {
        debugger;
        var table = $('#stocktab').DataTable();
        var StkId = table.row($(this).parents('tr')).data()["StockId"];
        var FrmItemId = table.row($(this).parents('tr')).data()["FromItemId"];
        var FrmColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var FrmSizeId = table.row($(this).parents('tr')).data()["SizeId"];

        var ToItmId = table.row($(this).parents('tr')).data()["ToItemId"];
        var ToSzId = table.row($(this).parents('tr')).data()["ToSizeId"];
        var ToClrId = table.row($(this).parents('tr')).data()["ToColorId"];

        var balqty = table.row($(this).parents('tr')).data()["BalQty"];
        var Val = $(this).val();

        if ((FrmItemId == ToItmId) && (FrmColorId == ToClrId) && (FrmSizeId == ToSzId)) {
            //alert('Please Change anyone...');
            var msg = 'Please Change anyone...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            Val = 0;
            $.each(StockList, function () {
                if (this.StockId == StkId) {
                    this.SecTransQty = Val;
                }
            });

            var table = $('#stocktab').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtTransQty]').each(function (ig) {
                debugger;
                var row = $(this).closest('tr');

                for (var h = 0; h < StockList.length; h++) {
                    if (ig == h) {
                        var trnqty = StockList[h].SecTransQty;
                        row.find('#txtSecTransQty').val(trnqty);
                    }
                }
            });

            //loadStocktable(StockList);
            return false;
        }


        if (Val > balqty) {
            //alert('Should not exceed Bal qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            Val = 0;
            $.each(StockList, function () {
                if (this.StockId == StkId) {
                    this.TransQty = Val;

                }
            });
            var table = $('#stocktab').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtTransQty]').each(function (ig) {
                debugger;
                var row = $(this).closest('tr');

                for (var h = 0; h < StockList.length; h++) {
                    if (ig == h) {
                        var trnqty = StockList[h].SecTransQty;
                        row.find('#txtSecTransQty').val(trnqty);
                    }
                }
            });
            //loadStocktable(StockList);
            return false;
        }


        $.each(StockList, function () {
            if (this.StockId == StkId) {
                this.SecTransQty = Val;

            }
        });

    });

    $(document).on('change', '.ddlToItem', function () {
        debugger;
        var table = $('#stocktab').DataTable();
        var StockId = table.row($(this).parents('tr')).data()["StockId"];
        var FromItemId = table.row($(this).parents('tr')).data()["FromItemId"];
        var FrmColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var FrmSizeId = table.row($(this).parents('tr')).data()["SizeId"];

        var ToItemId = table.row($(this).parents('tr')).data()["ToItemId"];
        var ToSizeId = table.row($(this).parents('tr')).data()["ToSizeId"];
        var ToColorId = table.row($(this).parents('tr')).data()["ToColorId"];
        var Val = $(this).val();

        $.each(StockList, function () {
            if (this.StockId == StockId) {
                this.ToItemId = Val;
            }
        });


    });
    $(document).on('change', '.ddlToColor', function () {
        debugger;
        var table = $('#stocktab').DataTable();
        var StockId = table.row($(this).parents('tr')).data()["StockId"];
        var FromItemId = table.row($(this).parents('tr')).data()["FromItemId"];
        var FrmColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var FrmSizeId = table.row($(this).parents('tr')).data()["SizeId"];

        var ToItemId = table.row($(this).parents('tr')).data()["ToItemId"];
        var ToSizeId = table.row($(this).parents('tr')).data()["ToSizeId"];
        var ToColorId = table.row($(this).parents('tr')).data()["ToColorId"];
        var Val = $(this).val();

        $.each(StockList, function () {
            if (this.StockId == StockId) {
                this.ToColorId = Val;
            }
        });


    });
    $(document).on('change', '.ddlToSize', function () {
        debugger;
        var table = $('#stocktab').DataTable();
        var StockId = table.row($(this).parents('tr')).data()["StockId"];
        var FromItemId = table.row($(this).parents('tr')).data()["FromItemId"];
        var FrmColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var FrmSizeId = table.row($(this).parents('tr')).data()["SizeId"];

        var ToItemId = table.row($(this).parents('tr')).data()["ToItemId"];
        var ToSizeId = table.row($(this).parents('tr')).data()["ToSizeId"];
        var ToColorId = table.row($(this).parents('tr')).data()["ToColorId"];
        var Val = $(this).val();

        $.each(StockList, function () {
            if (this.StockId == StockId) {
                this.ToSizeId = Val;
            }
        });


    });


    $(document).on('click', '#btnedit', function () {
        debugger;
        Mode = 1;

        //var table = $('#tblmaindetails').DataTable();
        //var TransMasId = table.row($(this).parents('tr')).data()["TransMasId"];
        //transmasid = TransMasId;
        //Getbyid(transmasid);
        //$('#myModal1').modal('show');
        //$('#btnAdd').hide();
        //$('#btnDelete').hide();
        //$('#btnUpdate').show();
        //$("#ddlCompany").attr("disabled", true);
        //$("#ddlStore").attr("disabled", true);
        //$("#ddlProcess").attr("disabled", true);
        //$("#ddlOrderNo").attr("disabled", true);
        //$("#ddlWorkOrderNo").attr("disabled", true);
        //$("#ddlTranstype").attr("disabled", true);
        //$("#ddlTransno").attr("disabled", true);
        //$("#ddlItemType").attr("disabled", true);
        //$("#ddlItem").attr("disabled", true);
        //$("#ddlItemColor").attr("disabled", true);
        //$("#ddlItemSize").attr("disabled", true);
        //$('#btnList').attr('disabled', 'disabled');
    });
    $(document).on('click', '#btnremove', function () {
        debugger;
        Mode = 2;

        //var table = $('#tblmaindetails').DataTable();
        //var TransMasId = table.row($(this).parents('tr')).data()["TransMasId"];
        //transmasid = TransMasId;
        //Getbyid(transmasid);
        //$('#myModal1').modal('show');
        //$('#btnAdd').hide();
        //$('#btnDelete').show();
        //$('#btnUpdate').hide();
        //$('#btnList').attr('disabled', 'disabled');
    });

    $('#tblmaindetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblmaindetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblmaindetails').dataTable().fnGetData(row);
        var ProcessOrdNo = data[1];
        LoadItemMovements(ProcessOrdNo);
    });

    $('#stocktab').on('click', 'tr', function (e) {
        debugger;
        var table = $('#stocktab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#stocktab').dataTable().fnGetData(row);
        var ord = data.Order_no;
        var ref = data.Refno;
        var sty = data.Style;
      
        $('#txtmainOrdno').val(ord);
        $('#txtmainrefno').val(ref);
        $('#txtmainstyle').val(sty);
    });

});

function getbyEditID(Id) {
    Mode = 1;

    //var table = $('#tblmaindetails').DataTable();
   // var TransMasId = table.row($(this).parents('tr')).data()["TransMasId"];
    transmasid = Id;
    Getbyid(transmasid);
    $('#myModal1').modal('show');
    $('#btnAdd').hide();
    $('#btnDelete').hide();
    $('#btnUpdate').show();
    $("#ddlCompany").attr("disabled", true);
    $("#ddlStore").attr("disabled", true);
    $("#ddlProcess").attr("disabled", true);
    $("#ddlOrderNo").attr("disabled", true);
    $("#ddlWorkOrderNo").attr("disabled", true);
    $("#ddlTranstype").attr("disabled", true);
    $("#ddlTransno").attr("disabled", true);
    $("#ddlItemType").attr("disabled", true);
    $("#ddlItem").attr("disabled", true);
    $("#ddlItemColor").attr("disabled", true);
    $("#ddlItemSize").attr("disabled", true);
    $('#btnList').attr('disabled', 'disabled');


}

function getbyDeleteID(Id) {

    Mode = 2;

    //var table = $('#tblmaindetails').DataTable();
   // var TransMasId = table.row($(this).parents('tr')).data()["TransMasId"];
    transmasid = Id;
    Getbyid(transmasid);
    $('#myModal1').modal('show');
    $('#btnAdd').hide();
    $('#btnDelete').show();
    $('#btnUpdate').hide();
    $('#btnList').attr('disabled', 'disabled');


}

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
    $('#txtEntrydate').val(Fdatestring);
    //$('#txtOrderDate').val(Fdatestring);


}

function AddNewList() {
    var ordtyp = $('input[name="Mordtype"]:checked').attr('value');

    $.ajax({
        url: "/ItemTransfer/LoadItemtransList",
        data: JSON.stringify({
            compid: 0, storeid: 0, processid: 0, itemid: 0, colorid: 0, sizeid: 0, ordtype: ordtyp, Ordno: '', jobno: '',
            Transno: '', Transtype: '', Itemtype: ''
        }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            StockList = result.Value;
            obj = result.Value;

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Processid]) {
                    compdet[el.Processid] = true;
                    comp.push(el);
                }
            });

            $('#ddlProcess').empty();
            $('#ddlProcess').append($('<option/>').val('0').text('--Select Process--'));
            $.each(comp, function () {
                $('#ddlProcess').append($('<option></option>').val(this.Processid).text(this.Process));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.StoreUnitId]) {
                    compdet[el.StoreUnitId] = true;
                    comp.push(el);
                }
            });

            $('#ddlStore').empty();
            $('#ddlStore').append($('<option/>').val('0').text('--Select Storeunit--'));
            $.each(comp, function () {
                $('#ddlStore').append($('<option></option>').val(this.StoreUnitId).text(this.StoreName));
            });


            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Order_no]) {
                    compdet[el.Order_no] = true;
                    comp.push(el);
                }
            });

            $('#ddlOrderNo').empty();
            $('#ddlOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
            $.each(comp, function () {
                $('#ddlOrderNo').append($('<option></option>').val(this.Order_no).text(this.Order_no));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Job_Ord_No]) {
                    compdet[el.Job_Ord_No] = true;
                    comp.push(el);
                }
            });

            $('#ddlWorkOrderNo').empty();
            $('#ddlWorkOrderNo').append($('<option/>').val('0').text('--Select Job OrderNo--'));
            $.each(comp, function () {
                $('#ddlWorkOrderNo').append($('<option></option>').val(this.Job_Ord_No).text(this.Job_Ord_No));
            });


            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.TransType]) {
                    compdet[el.TransType] = true;
                    comp.push(el);
                }
            });

            $('#ddlTranstype').empty();
            $('#ddlTranstype').append($('<option/>').val('0').text('--Select Tarnstype--'));
            $.each(comp, function () {
                $('#ddlTranstype').append($('<option></option>').val(this.TransType).text(this.TransType));
            });

            //$("#ddlTranstype").val('PRN').trigger('change');


            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Transno]) {
                    compdet[el.Transno] = true;
                    comp.push(el);
                }
            });

            $('#ddlTransno').empty();
            $('#ddlTransno').append($('<option/>').val('0').text('--Select TarnsNo--'));
            $.each(comp, function () {
                $('#ddlTransno').append($('<option></option>').val(this.Transno).text(this.Transno));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.ItemGroupid]) {
                    compdet[el.ItemGroupid] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemType').empty();
            $('#ddlItemType').append($('<option/>').val('0').text('--Select ItemGroup--'));
            $.each(comp, function () {
                $('#ddlItemType').append($('<option></option>').val(this.ItemGroupid).text(this.Itemgroup));
            });
            //$("#ddlTranstype").text('FABRIC').trigger('change');

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.FromItemId]) {
                    compdet[el.FromItemId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItem').empty();
            $('#ddlItem').append($('<option/>').val('0').text('--Select Item--'));
            $.each(comp, function () {
                $('#ddlItem').append($('<option></option>').val(this.FromItemId).text(this.Item));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.SizeId]) {
                    compdet[el.SizeId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemSize').empty();
            $('#ddlItemSize').append($('<option/>').val('0').text('--Select Size--'));
            $.each(comp, function () {
                $('#ddlItemSize').append($('<option></option>').val(this.SizeId).text(this.Size));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.ColorId]) {
                    compdet[el.ColorId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemColor').empty();
            $('#ddlItemColor').append($('<option/>').val('0').text('--Select Color--'));
            $.each(comp, function () {
                $('#ddlItemColor').append($('<option></option>').val(this.ColorId).text(this.Color));
            });


            if (ordtyp == 'W') {
                $("#wrkchk").prop("checked", true);
            }
            if (ordtyp == 'J') {
                $("#Jchk").prop("checked", true);
            }
            if (ordtyp == 'G') {
                $("#Gchk").prop("checked", true);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function OrderwiseList() {
    debugger;
    var ordtyp = $('input[name="ordtype"]:checked').attr('value');

    var comid = $('#ddlCompany').val();

    $.ajax({
        url: "/ItemTransfer/LoadItemtransList",
        data: JSON.stringify({
            compid: 0, storeid: 0, processid: 0, itemid: 0, colorid: 0, sizeid: 0, ordtype: ordtyp, Ordno: '', jobno: '',
            Transno: '', Transtype: '', Itemtype: ''
        }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            StockList = result.Value;
            obj = result.Value;

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Processid]) {
                    compdet[el.Processid] = true;
                    comp.push(el);
                }
            });

            $('#ddlProcess').empty();
            $('#ddlProcess').append($('<option/>').val('0').text('--Select Process--'));
            $.each(comp, function () {
                $('#ddlProcess').append($('<option></option>').val(this.Processid).text(this.Process));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.StoreUnitId]) {
                    compdet[el.StoreUnitId] = true;
                    comp.push(el);
                }
            });

            $('#ddlStore').empty();
            $('#ddlStore').append($('<option/>').val('0').text('--Select Storeunit--'));
            $.each(comp, function () {
                $('#ddlStore').append($('<option></option>').val(this.StoreUnitId).text(this.StoreName));
            });


            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Order_no]) {
                    compdet[el.Order_no] = true;
                    comp.push(el);
                }
            });

            $('#ddlOrderNo').empty();
            $('#ddlOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
            $.each(comp, function () {
                $('#ddlOrderNo').append($('<option></option>').val(this.Order_no).text(this.Order_no));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Job_Ord_No]) {
                    compdet[el.Job_Ord_No] = true;
                    comp.push(el);
                }
            });

            $('#ddlWorkOrderNo').empty();
            $('#ddlWorkOrderNo').append($('<option/>').val('0').text('--Select Job OrderNo--'));
            $.each(comp, function () {
                $('#ddlWorkOrderNo').append($('<option></option>').val(this.Job_Ord_No).text(this.Job_Ord_No));
            });


            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.TransType]) {
                    compdet[el.TransType] = true;
                    comp.push(el);
                }
            });

            $('#ddlTranstype').empty();
            $('#ddlTranstype').append($('<option/>').val('0').text('--Select Tarnstype--'));
            $.each(comp, function () {
                $('#ddlTranstype').append($('<option></option>').val(this.TransType).text(this.TransType));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Transno]) {
                    compdet[el.Transno] = true;
                    comp.push(el);
                }
            });

            $('#ddlTransno').empty();
            $('#ddlTransno').append($('<option/>').val('0').text('--Select TarnsNo--'));
            $.each(comp, function () {
                $('#ddlTransno').append($('<option></option>').val(this.Transno).text(this.Transno));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.ItemGroupid]) {
                    compdet[el.ItemGroupid] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemType').empty();
            $('#ddlItemType').append($('<option/>').val('0').text('--Select ItemGroup--'));
            $.each(comp, function () {
                $('#ddlItemType').append($('<option></option>').val(this.ItemGroupid).text(this.Itemgroup));
            });


            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.FromItemId]) {
                    compdet[el.FromItemId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItem').empty();
            $('#ddlItem').append($('<option/>').val('0').text('--Select Item--'));
            $.each(comp, function () {
                $('#ddlItem').append($('<option></option>').val(this.FromItemId).text(this.Item));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.SizeId]) {
                    compdet[el.SizeId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemSize').empty();
            $('#ddlItemSize').append($('<option/>').val('0').text('--Select Size--'));
            $.each(comp, function () {
                $('#ddlItemSize').append($('<option></option>').val(this.SizeId).text(this.Size));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.ColorId]) {
                    compdet[el.ColorId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemColor').empty();
            $('#ddlItemColor').append($('<option/>').val('0').text('--Select Color--'));
            $.each(comp, function () {
                $('#ddlItemColor').append($('<option></option>').val(this.ColorId).text(this.Color));
            });



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadStockList() {
    debugger;
    var cmpid = $("#ddlCompany option:selected").val();
    var strid = $("#ddlStore option:selected").val();
    var procid = $("#ddlProcess option:selected").val();
    var itmid = $("#ddlItem option:selected").val();
    var clrid = $("#ddlItemColor option:selected").val();
    var szid = $("#ddlItemSize option:selected").val();
    var ordtyp = $('input[name="ordtype"]:checked').attr('value');
    var ONo = $("#ddlOrderNo option:selected").val();

    var jno = $("#ddlWorkOrderNo option:selected").val();
    var trnno = $("#ddlTransno option:selected").val();
    var trntyp = $("#ddlTranstype option:selected").val();
    var itmtyp = $("#ddlItemType option:selected").val();


    if ($('#ddlTranstype').val() == 0) {
        $('#ddlTranstype').siblings(".select2-container").css('border', '1px solid red');
        return false;
    }
    else {
        $('#ddlTranstype').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlItemType').val() == 0) {
        $('#ddlItemType').siblings(".select2-container").css('border', '1px solid red');
        return false;
    }
    else {
        $('#ddlItemType').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if (ONo == 0) {
        ONo = "";
    }
    else {
        ONo = $("#ddlOrderNo option:selected").text();
    }
    if (jno == 0) {
        jno = "";
    }
    else {
        jno = $("#ddlWorkOrderNo option:selected").text();
    }
    if (trnno == 0) {
        trnno = "";
    }
    else {
        trnno = $("#ddlTransno option:selected").text();
    }
    if (trntyp == 0) {
        trntyp = "";
    }
    else {
        trntyp = $("#ddlTranstype option:selected").text();
    }
    if (itmtyp == 0) {
        itmtyp = 0;
    }
    else {
        itmtyp = $("#ddlItemType option:selected").val();
    }
    $.ajax({
        url: "/ItemTransfer/LoadItemtransList",
        data: JSON.stringify({
            compid: cmpid, storeid: strid, processid: procid, itemid: itmid, colorid: clrid, sizeid: szid, ordtype: ordtyp, Ordno: ONo, jobno: jno,
            Transno: trnno, Transtype: trntyp, Itemtype: itmtyp
        }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            StockList = result.Value;
            obj = result.Value;

            loadStocktable(StockList);
            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Processid]) {
            //        compdet[el.Processid] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlProcess').empty();
            //$('#ddlProcess').append($('<option/>').val('0').text('--Select Process--'));
            //$.each(comp, function () {
            //    $('#ddlProcess').append($('<option></option>').val(this.Processid).text(this.Process));
            //});

            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.StoreUnitId]) {
            //        compdet[el.StoreUnitId] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlStore').empty();
            //$('#ddlStore').append($('<option/>').val('0').text('--Select Storeunit--'));
            //$.each(comp, function () {
            //    $('#ddlStore').append($('<option></option>').val(this.StoreUnitId).text(this.StoreName));
            //});


            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Order_no]) {
            //        compdet[el.Order_no] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlOrderNo').empty();
            //$('#ddlOrderNo').append($('<option/>').val('0').text('--Select OrderNo--'));
            //$.each(comp, function () {
            //    $('#ddlOrderNo').append($('<option></option>').val(this.Order_no).text(this.Order_no));
            //});

            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Job_Ord_No]) {
            //        compdet[el.Job_Ord_No] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlWorkOrderNo').empty();
            //$('#ddlWorkOrderNo').append($('<option/>').val('0').text('--Select Job OrderNo--'));
            //$.each(comp, function () {
            //    $('#ddlWorkOrderNo').append($('<option></option>').val(this.Job_Ord_No).text(this.Job_Ord_No));
            //});


            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.TransType]) {
            //        compdet[el.TransType] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlTranstype').empty();
            //$('#ddlTranstype').append($('<option/>').val('0').text('--Select Tarnstype--'));
            //$.each(comp, function () {
            //    $('#ddlTranstype').append($('<option></option>').val(this.TransType).text(this.TransType));
            //});

            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Transno]) {
            //        compdet[el.Transno] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlTransno').empty();
            //$('#ddlTransno').append($('<option/>').val('0').text('--Select TarnsNo--'));
            //$.each(comp, function () {
            //    $('#ddlTransno').append($('<option></option>').val(this.Transno).text(this.Transno));
            //});

            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.ItemGroupid]) {
            //        compdet[el.ItemGroupid] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlItemType').empty();
            //$('#ddlItemType').append($('<option/>').val('0').text('--Select ItemGroup--'));
            //$.each(comp, function () {
            //    $('#ddlItemType').append($('<option></option>').val(this.ItemGroupid).text(this.Itemgroup));
            //});


            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Itemid]) {
            //        compdet[el.Itemid] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlItem').empty();
            //$('#ddlItem').append($('<option/>').val('0').text('--Select Item--'));
            //$.each(comp, function () {
            //    $('#ddlItem').append($('<option></option>').val(this.Itemid).text(this.Item));
            //});

            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Sizeid]) {
            //        compdet[el.Sizeid] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlItemSize').empty();
            //$('#ddlItemSize').append($('<option/>').val('0').text('--Select Size--'));
            //$.each(comp, function () {
            //    $('#ddlItemSize').append($('<option></option>').val(this.Sizeid).text(this.Size));
            //});

            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.Colorid]) {
            //        compdet[el.Colorid] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlItemColor').empty();
            //$('#ddlItemColor').append($('<option/>').val('0').text('--Select Color--'));
            //$.each(comp, function () {
            //    $('#ddlItemColor').append($('<option></option>').val(this.Colorid).text(this.Color));
            //});
            //alert('Data Fetched sucessfully');
            var msg = 'Data Fetched sucessfully...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function Getbyid(transmasid) {
    debugger;

    $.ajax({
        url: "/ItemTransfer/LoadItemtransEditList",
        data: JSON.stringify({ masid: transmasid }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            StockList = result.Value;
            loadStocktable(StockList);
            var entryno = StockList[0].EntryNo;
            var entrydt = StockList[0].EntryDate;
            var ordtype = StockList[0].OrderType;
            var Remarks = StockList[0].Remarks;
            var cmpid = StockList[0].Companyid;

            $("#wrkchk").attr("disabled", true);
            $("#Jchk").attr("disabled", true);
            $("#Gchk").attr("disabled", true);

            if (ordtype == 'W') {
                $("#wrkchk").prop("checked", true);
            }
            if (ordtype == 'J') {
                $("#Jchk").prop("checked", true);
            }
            if (ordtype == 'G') {
                $("#Gchk").prop("checked", true);
            }
            $('#txtEntryno').val(entryno);
            $('#txtremarks').val(Remarks);
            $('#txtEntrydate').val(moment(entrydt).format("DD/MM/YYYY"));
            $('#ddlCompany').val(cmpid).trigger('change');
            CheckAlloted();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() { }

function loadddl() {

    var cmpid = $("#ddlMCompany option:selected").val();
    var transid = $("#ddlItemTransno option:selected").val();

    var frmitmid = $("#ddlFromItem option:selected").val();
    var toitmid = $("#ddlToItem option:selected").val();
    var frmdt = $("#txtFromDate").val();
    var todt = $("#txtToDate").val();
    var ordtyp = $('input[name="Mordtype"]:checked').attr('value');
    debugger;
    $.ajax({
        url: "/ItemTransfer/LoadItemtransMainDDLList",
        data: JSON.stringify({ masid: transid, compid: cmpid, fromitemid: frmitmid, Toitemid: toitmid, ordtype: ordtyp, frmdate: frmdt, todate: todt }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mainlist = result.Value;
            obj = result.Value;
            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.TransMasId]) {
                    compdet[el.TransMasId] = true;
                    comp.push(el);
                }
            });

            $('#ddlItemTransno').empty();
            $('#ddlItemTransno').append($('<option/>').val('0').text('--Select EntryNo--'));
            $.each(comp, function () {
                $('#ddlItemTransno').append($('<option></option>').val(this.TransMasId).text(this.EntryNo));
            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }

    });


}

function loadMain() {
    debugger;
    var cmpid = $("#ddlMCompany option:selected").val();
    var transid = $("#ddlItemTransno option:selected").val();

    var frmitmid = $("#ddlFromItem option:selected").val();
    var toitmid = $("#ddlToItem option:selected").val();
    var frmdt = $("#txtFromDate").val();
    var todt = $("#txtToDate").val();
    var ordtyp = $('input[name="Mordtype"]:checked').attr('value');
    var Orderno = $("#ddlordno option:selected").val();
    if (Orderno == 0 || Orderno == null) {
        Orderno = "";
    } else {
        Orderno = $("#ddlordno option:selected").text();
    }
    var refno = $("#ddlrefno option:selected").val();
    if (refno == 0 || refno == null) {
        refno = "";
    } else {
        refno = $("#ddlrefno option:selected").text();
    }

    var menufilter = transid + ',' + cmpid + ',' + frmitmid + ',' + toitmid + ',' + ordtyp + ',' + frmdt + ',' + todt + ',' + Orderno + ',' + refno ;
    localStorage.setItem('ItemTransferMainFilter', menufilter);

    debugger;
    $.ajax({
        url: "/ItemTransfer/LoadItemtransMainList",
        data: JSON.stringify({ masid: transid, compid: cmpid, fromitemid: frmitmid, Toitemid: toitmid, ordtype: ordtyp, frmdate: frmdt, todate: todt, orderno: Orderno, refno: refno }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            //Mainlist = result.Value;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblmaindetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmaindetails').DataTable();
                var rows = table.clear().draw();
                $('#tblmaindetails').DataTable().rows.add(dataSet);
                $('#tblmaindetails').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblmaindetails').DataTable({

                    data: dataSet,
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

                        { title: "Transmasid", "visible": false },
                        { title: "Tarnsno" },
                        { title: "Companyid", "visible": false },
                        { title: "Company" },
                        { title: "Entry Date"},
                        { title: "userid", "visible": false },
                        { title: "Createdby" },
                         {
                             title: "ACTION"

                             //"mDataProp": null,
                             //"sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'


                         }
                    ]
                });

            }
            // loadmaintable(Mainlist);

            //obj = result.Value;
            //var compdet = {};
            //var comp = [];

            //$.each(obj, function (i, el) {

            //    if (!compdet[el.TransMasId]) {
            //        compdet[el.TransMasId] = true;
            //        comp.push(el);
            //    }
            //});

            //$('#ddlItemTransno').empty();
            //$('#ddlItemTransno').append($('<option/>').val('0').text('--Select EntryNo--'));
            //$.each(comp, function () {
            //    $('#ddlItemTransno').append($('<option></option>').val(this.TransMasId).text(this.EntryNo));
            //});
            loadddl();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadMainFromBack() {
    debugger;
    var fill = localStorage.getItem('ItemTransferMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[5]);
    $('#txtToDate').val(fillobj[6]);

    if (fillobj[4] == 'W') {
        $('#MB').prop('checked', true);
    } else if (fillobj[4] == 'J') {
        $('#MJ').prop('checked', true);
    }
    else if (fillobj[4] == 'G') {
        $('#MG').prop('checked', true);
    }


    if (fillobj[7] == "undefined") {
        fillobj[7] = '';
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = '';
    }
    if (fillobj[0] == "undefined") {
        fillobj[0] = 0;
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }

    debugger;
    $.ajax({
        url: "/ItemTransfer/LoadItemtransMainList",
        data: JSON.stringify({ masid: fillobj[0], compid: fillobj[1], fromitemid: fillobj[2], Toitemid: fillobj[3], ordtype: fillobj[4], frmdate: fillobj[5], todate: fillobj[6], orderno: fillobj[7], refno: fillobj[8] }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            //Mainlist = result.Value;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblmaindetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmaindetails').DataTable();
                var rows = table.clear().draw();
                $('#tblmaindetails').DataTable().rows.add(dataSet);
                $('#tblmaindetails').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblmaindetails').DataTable({

                    data: dataSet,
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

                        { title: "Transmasid", "visible": false },
                        { title: "Tarnsno" },
                        { title: "Companyid", "visible": false },
                        { title: "Company" },
                        { title: "Entry Date" },
                        { title: "userid", "visible": false },
                        { title: "Createdby" },
                         {
                             title: "ACTION"

                         }
                    ]
                });

            }
          
            loadddl();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadcolor() {
    debugger;
    $.ajax({
        url: "/PlanningFabric/ColorList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            Colorlist = json;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadsize() {
    debugger;
    $.ajax({
        url: "/Size/Getstores",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Sizelist = result.Value;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loaditem() {
    debugger;
    $.ajax({
        url: "/Item/GetItem",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Itemlist = result.Value;

            obj = result.Value;
            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Itemid]) {
                    compdet[el.Itemid] = true;
                    comp.push(el);
                }
            });

            $('#ddlFromItem').empty();
            $('#ddlFromItem').append($('<option/>').val('0').text('--Select Item--'));
            $.each(comp, function () {
                $('#ddlFromItem').append($('<option></option>').val(this.Itemid).text(this.ItemName));
            });

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.Itemid]) {
                    compdet[el.Itemid] = true;
                    comp.push(el);
                }
            });

            $('#ddlToItem').empty();
            $('#ddlToItem').append($('<option/>').val('0').text('--Select Item--'));
            $.each(comp, function () {
                $('#ddlToItem').append($('<option></option>').val(this.Itemid).text(this.ItemName));
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadStocktable(StockList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#stocktab tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#stocktab').DataTable().destroy();
    }
    $('#stocktab').empty();

    $('#stocktab').DataTable({

        data: StockList,
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
            { title: "Transdetid", data: "TransDetId", "visible": false },
            { title: "Transmasid", data: "TransMasId", "visible": false },
            { title: "Tarnsno", data: "Transno", },
            { title: "Stockid", data: "StockId", "visible": false },
            { title: "NewStockid", data: "NewStockId", "visible": false },
            { title: "Frmitemid", data: "FromItemId", "visible": false },
            { title: "Fromitem", data: "Item", },
            {
                title: "ToItem", data: "ToItemId",

                render: function (data, type, row) {
                    var $select = $("<select></select>", {
                        "id": "ddlToItem",
                        "value": data,
                        "class": "form-control selWidth ddlToItem",

                    });

                    $.each(Itemlist, function (k, v) {
                        var $option = $("<option></option>", {
                            "text": v.ItemName,
                            "value": v.Itemid
                        });

                        if (data === v.Itemid) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });


                    return $select.prop("outerHTML");
                }

            },
            //{ title: "ToItemid", data: "ToItemId" },
            //{ title: "ToItem", data: "Item", "visible": false },
            { title: "FrmColorid", data: "ColorId", "visible": false },
            { title: "FrmColor", data: "Color" },
             {
                 title: "ToColor", data: "ToColorId",

                 render: function (data, type, row) {
                     var $select = $("<select></select>", {
                         "id": "ddlToColor",
                         "value": data,
                         "class": "form-control selWidth ddlToColor",

                     });

                     $.each(Colorlist, function (k, v) {
                         var $option = $("<option></option>", {
                             "text": v.Color,
                             "value": v.ColorID
                         });

                         if (data === v.ColorID) {
                             $option.attr("selected", "selected")
                         }
                         $select.append($option);
                     });


                     return $select.prop("outerHTML");
                 }

             },
            //{ title: "ToColorid", data: "ToColorId" },
            // { title: "ToColor", data: "Color" },
              { title: "FrmSizeid", data: "SizeId", "visible": false },
            { title: "FrmSize", data: "Size" },
             {
                 title: "ToSize", data: "ToSizeId",

                 render: function (data, type, row) {
                     var $select = $("<select></select>", {
                         "id": "ddlToSize",
                         "value": data,
                         "class": "form-control selWidth ddlToSize",

                     });

                     $.each(Sizelist, function (k, v) {
                         var $option = $("<option></option>", {
                             "text": v.SizeName,
                             "value": v.SizeId
                         });

                         if (data === v.SizeId) {
                             $option.attr("selected", "selected")
                         }
                         $select.append($option);
                     });


                     return $select.prop("outerHTML");
                 }

             },
            //{ title: "Tosizeid", data: "SizeId" },
            // { title: "ToSize", data: "Size" },
              //{ title: "TransQty", data: "TransQty" },
              { title: "StockQty", data: "BalQty" },

                  {
                      title: "TransQty", data: "TransQty",
                      render: function (data) {

                          return '<input type="text" id="txtTransQty" class="txtTransQty form-control"  style="width: 80px;text-align: center;" value=' + data + ' >';

                      },
                  },
                  {
                      title: "SecTransQty", data: "SecTransQty",
                      render: function (data) {

                          return '<input type="text" id="txtSecTransQty" class="txtSecTransQty form-control"  style="width: 80px;text-align: center;" value=' + data + ' >';

                      },
                  },
               //{
               //    title: "ACTION", "mDataProp": null,

               //    "render": function (data, type, row, meta) {
               //        //if (data.Rate > "0") {
               //        //    return '<div style="display:inline-flex"><button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" disabled="disabled" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //    //} else {
               //        return '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btntrimsedit" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>' }
               //    //}


               //}
        ]
    });


    $("#stocktab tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#stocktab tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function loadmaintable(Mainlist) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblmaindetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblmaindetails').DataTable().destroy();
    }
    $('#tblmaindetails').empty();

    $('#tblmaindetails').DataTable({

        data: Mainlist,
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

            { title: "Transmasid", data: "TransMasId", "visible": false },
            { title: "Tarnsno", data: "EntryNo", },
             { title: "Companyid", data: "Companyid", "visible": false },
            { title: "Company", data: "Company" },
            {
                title: "Entry Date", data: "EntryDate",
                "render": function (data, type, row, meta) {

                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "userid", data: "CreatedBy", "visible": false },
            { title: "Createdby", data: "User" },

             {
                 title: "ACTION", "mDataProp": null,
                 "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'


             }
        ]
    });


    $("#tblmaindetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblmaindetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}



function ClearTextbox() {
    GenerateNumber();
    //AddNewList();
    OrderwiseList();
    $("#btnUpdate").hide();
    $("#btnDelete").hide();
    $("#btnAdd").show();
    Mode = 0;
    $('#btnList').attr('disabled', false);
    $("#wrkchk").attr("disabled", false);
    $("#Jchk").attr("disabled", false);
    $("#Gchk").attr("disabled", false);
    $("#ddlCompany").attr("disabled", false);
    $("#ddlStore").attr("disabled", false);
    $("#ddlProcess").attr("disabled", false);
    $("#ddlOrderNo").attr("disabled", false);
    $("#ddlWorkOrderNo").attr("disabled", false);
    $("#ddlTranstype").attr("disabled", false);
    $("#ddlTransno").attr("disabled", false);
    $("#ddlItemType").attr("disabled", false);
    $("#ddlItem").attr("disabled", false);
    $("#ddlItemColor").attr("disabled", false);
    $("#ddlItemSize").attr("disabled", false);
    $('#ddlTranstype').siblings(".select2-container").css('border', '1px solid lightgrey');
    $('#ddlItemType').siblings(".select2-container").css('border', '1px solid lightgrey');
    $('#txtremarks').val('');
    //$("#ddlStyle").val(0).trigger('change');
    //$("#ddlOrderNo").val(0).trigger('change');
    //$("#ddlrefno").val(0).trigger('change');
    //$("#ddlGrpProcess").val(0).trigger('change');
    //$("#ddlWorkOrderNo").val(0).trigger('change');
    //$("#ddlProcess").val('').trigger('change');
    //$('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //$('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //$('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
    //$('#txtEntryno').css('border-color', 'lightgrey');
    //$('#txtProdpgmno').css('border-color', 'lightgrey');
    StockList = [];
    loadStocktable(StockList);

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    CompanyId = $('#ddlCompany').val();
    debugger;
    table = "ItemTransMas",
    column = "EntryNo",
    compId = CompanyId,
    Docum = 'ITEM TRANSFER'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryno').val(result.Value);

        }
    });


}

function Save() {
    debugger;
    stklist = new Array();

    var validate = true;



    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    //if ($('#ddlOrderNo').val() == 0) {
    //    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    validate = false;
    //}
    //else {
    //    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    //if ($('#ddlWorkOrderNo').val() == 0) {
    //    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    validate = false;
    //}
    //else {
    //    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    if ($('#txtEntryno').val() == "") {
        validate = false;
        $('#txtEntryno').css('border-color', 'Red');
    }
    else {
        $('#txtEntryno').css('border-color', 'lightgrey');
    }
    if ($('#txtEntrydate').val() == "") {
        validate = false;
        $('#txtEntrydate').css('border-color', 'Red');
    }
    else {
        $('#txtEntrydate').css('border-color', 'lightgrey');
    }

    StockList = $.grep(StockList, function (v) {
        return (v.TransQty > 0);
    });

    if (StockList.length == 0) {
        //alert('Fill atleast anyone TransQty..');
        var msg = 'Fill atleast anyone Trans quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        validate = false;
    }


    var ordtyp = $('input[name="ordtype"]:checked').attr('value');

    for (var c = 0; c < StockList.length; c++) {
        var list = {
            TransDetId: 0,
            TransMasId: 0,
            StockId: StockList[c].StockId,
            NewStockId: 0,
            FromItemId: StockList[c].FromItemId,
            ToItemId: StockList[c].ToItemId,
            ColorId: StockList[c].ColorId,
            ToColorId: StockList[c].ToColorId,
            SizeId: StockList[c].SizeId,
            ToSizeId: StockList[c].ToSizeId,
            TransQty: StockList[c].TransQty,
            SecTransQty: StockList[c].SecTransQty,
        }
        stklist.push(list);
    }


    CompanyId = $('#ddlCompany').val();
    debugger;
    table = "ItemTransMas",
    column = "EntryNo",
    compId = CompanyId,
    Docum = 'ITEM TRANSFER'

    var oldEntryNo = $('#txtEntryno').val();
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
                $('#txtEntryno').val(result.Value);
            }
            var obj = {
                TransMasId: 0,
                EntryNo: $('#txtEntryno').val(),
                CompanyId: $("#ddlCompany option:selected").val(),
                OrderType: ordtyp,
                Remarks: $('#txtremarks').val(),
                EntryDate: $('#txtEntrydate').val(),
                ItmTrsDet: stklist,
                CreatedBy: Guserid,
            }

            if (validate) {
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();

                $.ajax({
                    url: "/ItemTransfer/AddItemtranfer",
                    data: JSON.stringify({ Procobj: obj }),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        //$('#myModal').modal('hide');

                        if (result.Value == 1) {
                            AddUserEntryLog('Procurement', 'Item Transfer', 'ADD', $("#txtEntryno").val());
                            //alert('Data Saved Successfully');
                            //window.location.href = "/ItemTransfer/ItemTransferIndex";
                            var msg = 'Data Saved Successfully...';
                            var flg = 1;
                            var mod = 0;
                            var url = "/ItemTransfer/ItemTransferIndex";
                            AlartMessage(msg, flg, mod, url);

                        }
                        else {
                            window.location.href = "/Error/Index";
                        }

                    },
                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });
            }
        }
    });

}

function Update() {
    debugger;
    stklist = new Array();

    var validate = true;



    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    //if ($('#ddlOrderNo').val() == 0) {
    //    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    validate = false;
    //}
    //else {
    //    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    //if ($('#ddlWorkOrderNo').val() == 0) {
    //    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    validate = false;
    //}
    //else {
    //    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    if ($('#txtEntryno').val() == "") {
        validate = false;
        $('#txtEntryno').css('border-color', 'Red');
    }
    else {
        $('#txtEntryno').css('border-color', 'lightgrey');
    }
    if ($('#txtEntrydate').val() == "") {
        validate = false;
        $('#txtEntrydate').css('border-color', 'Red');
    }
    else {
        $('#txtEntrydate').css('border-color', 'lightgrey');
    }

    StockList = $.grep(StockList, function (v) {
        return (v.TransQty > 0);
    });
    if (StockList.length == 0) {
        //alert('Fill atleast anyone TransQty..');
        var msg = 'Fill atleast anyone Trans quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        validate = false;
    }

    var ordtyp = $('input[name="ordtype"]:checked').attr('value');

    for (var c = 0; c < StockList.length; c++) {
        var list = {
            TransDetId: StockList[c].TransDetId,
            TransMasId: StockList[c].TransMasId,
            StockId: StockList[c].StockId,
            NewStockId: StockList[c].NewStockId,
            FromItemId: StockList[c].FromItemId,
            ToItemId: StockList[c].ToItemId,
            ColorId: StockList[c].ColorId,
            ToColorId: StockList[c].ToColorId,
            SizeId: StockList[c].SizeId,
            ToSizeId: StockList[c].ToSizeId,
            TransQty: StockList[c].TransQty,
            SecTransQty: StockList[c].SecTransQty,
        }
        stklist.push(list);
    }



    var obj = {
        TransMasId: transmasid,
        EntryNo: $('#txtEntryno').val(),
        CompanyId: $("#ddlCompany option:selected").val(),
        OrderType: ordtyp,
        Remarks: $('#txtremarks').val(),
        EntryDate: $('#txtEntrydate').val(),
        ItmTrsDet: stklist,
        CreatedBy: Guserid,
    }

    if (validate) {
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();

        $.ajax({
            url: "/ItemTransfer/UpdateItemtranfer",
            data: JSON.stringify({ Procobj: obj }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                //$('#myModal').modal('hide');

                if (result.Value == 1) {
                    AddUserEntryLog('Procurement', 'Item Transfer', 'UPDATE', $("#txtEntryno").val());
                    //alert('Data Updated Successfully');
                    //window.location.href = "/ItemTransfer/ItemTransferIndex";
                    var msg = 'Data Updated Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/ItemTransfer/ItemTransferIndex";
                    AlartMessage(msg, flg, mod, url);

                }
                else {
                    window.location.href = "/Error/Index";
                }

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

}

function Delete() {
    debugger;
    stklist = new Array();

    var validate = true;



    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        validate = false;
    }
    else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    //if ($('#ddlOrderNo').val() == 0) {
    //    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    validate = false;
    //}
    //else {
    //    $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    //if ($('#ddlWorkOrderNo').val() == 0) {
    //    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid red');
    //    validate = false;
    //}
    //else {
    //    $('#ddlWorkOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    if ($('#txtEntryno').val() == "") {
        validate = false;
        $('#txtEntryno').css('border-color', 'Red');
    }
    else {
        $('#txtEntryno').css('border-color', 'lightgrey');
    }
    if ($('#txtEntrydate').val() == "") {
        validate = false;
        $('#txtEntrydate').css('border-color', 'Red');
    }
    else {
        $('#txtEntrydate').css('border-color', 'lightgrey');
    }

    StockList = $.grep(StockList, function (v) {
        return (v.TransQty > 0 || v.SecTransQty > 0);
    });
    var ordtyp = $('input[name="ordtype"]:checked').attr('value');

    for (var c = 0; c < StockList.length; c++) {
        var list = {
            TransDetId: StockList[c].TransDetId,
            TransMasId: StockList[c].TransMasId,
            StockId: StockList[c].StockId,
            NewStockId: StockList[c].NewStockId,
            FromItemId: StockList[c].FromItemId,
            ToItemId: StockList[c].ToItemId,
            ColorId: StockList[c].ColorId,
            ToColorId: StockList[c].ToColorId,
            SizeId: StockList[c].SizeId,
            ToSizeId: StockList[c].ToSizeId,
            TransQty: StockList[c].TransQty,
            SecTransQty: StockList[c].SecTransQty,
        }
        stklist.push(list);
    }



    var obj = {
        TransMasId: transmasid,
        EntryNo: $('#txtEntryno').val(),
        CompanyId: $("#ddlCompany option:selected").val(),
        OrderType: ordtyp,
        Remarks: $('#txtremarks').val(),
        EntryDate: $('#txtEntrydate').val(),
        ItmTrsDet: stklist,
        CreatedBy: Guserid,
    }

    if (validate) {
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();

        $.ajax({
            url: "/ItemTransfer/DeleteItemtranfer",
            data: JSON.stringify({ Procobj: obj }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                //$('#myModal').modal('hide');

                if (result.Value == 1) {
                    AddUserEntryLog('Procurement', 'Item Transfer', 'DELETE', $("#txtEntryno").val());
                    //alert('Data Deleted Successfully');
                    //window.location.href = "/ItemTransfer/ItemTransferIndex";
                    var msg = 'Data Deleted Successfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/ItemTransfer/ItemTransferIndex";
                    AlartMessage(msg, flg, mod, url);

                }
                else {
                    window.location.href = "/Error/Index";
                }

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

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
            { title: "Order No", data: "OrderNo", visible: false },
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Date", data: "IssueDate" },
            { title: "IssueQty", data: "IssueQty" },
            { title: "Store Name", data: "StoreName" },
        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function CheckAlloted() {

    var Recpno = $('#txtEntryno').val();

    $.ajax({
        url: "/PurchaseQuality/LoadQltyCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AllotedItemList = result;
            if (AllotedItemList.length > 0) {


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnUpdate").attr('disabled', true);
                    $("#btnDelete").attr('disabled', true);
                    $('#btnAdd').hide();
                    return true;
                }

            } else {
                $("#btnUpdate").attr('disabled', false);
                $("#btnDelete").attr('disabled', false);
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

