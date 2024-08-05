/// <reference path="../../ReportInline/Production/OrderSalesInvoiceInline/OrderSalesInvoiceInlineReport.aspx" />
var maintbllist = [];
var AddGridtbllist = [];
var ItemGridtbllist = [];
var StockGridtbllist = [];
var StockGridtbllistFilter = [];
var InnerHeaderInfo = [];
var table, column, compId, Docum;
var companyid, despatchid = 0;
var storeid = 0;
var ItemId, ColorId, SizeId = 0;
var buyOrdShip, orderNo, style, destination, refno, shipno, buyer, shiptype = 0;
var fromdate, todate = 0;
var index = -1;
var repobj = [];
var Repid = 0;
var GUserid = 0;
var UserName = 0;
var DCompid = 0;
var BuyOrddespatchEditFlg = "disabled";
var BuyOrddespatchDeleteFlg = "disabled";
var BuyOrddespatchPrintFlg = "disabled";
var ShiprowId = '';
var ShipItemList = [];
var Invid = 0;
var Invno = '';
var Descriptionlist = [];
var AddlessId = 0;
var AccList = [];
var Desid = 0;
$(document).ready(function () {
    LoadCompanyDDL("#ddlMCompany,#ddlCompany,#ddlinnCompany");
    LoadBuyerDDL("#ddlMBuyer,#ddlBuyer,#ddlinnbuyer");
    LoadStoreUnitDDL("#ddlIssueStore,#ddlinnIssStore");
    LoadSupplierDDL("#ddlFreightSupplier");
    LoadCountryDDL('#ddlinnDestination');
    LoadBulkOrderNoDDL("#ddlMOrderNo,#ddlOrderNo");
    LoadBulkRefNoDDL("#ddlMRefNo,#ddlRefNo");

    LoadShipmodeDDL('#ddlShipMode');
    LoadShipsystemDDL('#ddlSystem');
    LoadPortOfLoadingDDL('#ddlPortOfDischarge,#ddlplaceofrecpt,#ddlinnportofloading');
    LoadConsigneeDDL('#ddlinnconsignee,#ddlinnNoteconsignee');
    LoadPayTermsDDL('#ddlPaymentmode');
    LoadAddlessDDL("#ddlAcc");
    loadDescp();

    GUserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    //$('#txtFromDate').val(moment(new Date()).format('DD/MM/YYYY'));
    //$('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));
    debugger;
    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();
    companyid = $("#ddlMCompany").val();

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }
    LoadData(CompId, fromdate, todate);

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
    $("#btnaddnew").click(function () {
        debugger;
        companyid = $("#ddlMCompany").val();

        if (companyid == 0) {
            //alert("Please select Company");
            var msg = 'Please select Company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlCompany").val(companyid);
            $('#ddlIssueStore').val(0);
            $('#ddlOrderNo').val(0);
            $('#ddlRefNo').val(0);
            $('#ddlBuyer').val(0);

            $('#myModal').modal('show');
            GetAddGridDetails();
        }
    });



    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        var row = $(this).closest('tr');
        var data = $('#tbldespatchmaingrid').dataTable().fnGetData(row);
        Invid = data.DespatchID;
        Invno = data.ReceiptNo;

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnDel').hide();
        $('#btnUpdate').show();

        getbyID(Invid);
    });

    $(document).on('keyup', '.txtitemdespatch', function () {
        debugger;
        var rowindex = $(this).closest('tr').index();

        calcAmt(this.value, rowindex);
    });

    $(document).on('keyup', '.txtstckdespatch', function () {
        debugger;
        var rowindex = $(this).closest('tr').index();
        calcsepquan(this.value, rowindex);
    });

    $("#ddlMCompany").change(function () {

        ListFilter();
    });

    $("#btnclose").click(function () {
        $('#myModal1').modal('hide');
        StockGridtbllist = [];
        ItemGridtbllist = [];
    });

    $("#btnorderclose").click(function () {
        $('#myModal').modal('hide');
        $('#ddlIssueStore').val(0);
        $('#ddlOrderNo').val(0);
        $('#ddlRefNo').val(0);
        $('#ddlBuyer').val(0);
    });

    $("#ddlIssueStore").change(function () {
        storeid = $("#ddlIssueStore").val();

        if (storeid > 0) {
            $('#ddlIssueStore').css('border-color', 'lightgrey');
        }
    });



    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        Mode = 2;
        var row = $(this).closest('tr');
        var data = $('#tbldespatchmaingrid').dataTable().fnGetData(row);
        Invid = data.DespatchID;
        Invno = data.ReceiptNo;

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnDel').show();
        $('#btnUpdate').hide();

        getbyID(Invid);
    });

    $(document).on('click', '.btnordadd', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentcolorrow = AddGridtbllist.slice(rowindex);


        var table = $('#tbladdgriddet').DataTable();
        ShiprowId = table.row($(this).parents('tr')).data()["ShipRowID"];
        BuyOrdShip = table.row($(this).parents('tr')).data()["BuyOrdShip"];
        orderNo = table.row($(this).parents('tr')).data()["OrderNo"];

        //LoadCompanyDDL("#ddlinnCompany");
        //LoadBuyerDDL("#ddlinnbuyer");
        //LoadStyleDDL("#ddlinnstyle");
        //LoadEmployeeDDL("#ddlinnMerchandiser,#ddlinnManager");

        $('#txtShipDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtDispDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtInvRefDate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtRefDate').val(moment(new Date()).format('DD/MM/YYYY'));

        //ShiprowId = currentcolorrow[0].ShipRowID;
        //BuyOrdShip = currentcolorrow[0].BuyOrdShip;
        //orderNo = currentcolorrow[0].OrderNo;



        //Style = currentcolorrow[0].Style;
        //destination = currentcolorrow[0].Destination;
        //refno = currentcolorrow[0].RefNo;
        //shipno = currentcolorrow[0].BuyOrdShip;
        //buyer = currentcolorrow[0].Buyer;

        companyid = $("#ddlCompany").val();

        //Company = $("#ddlinnercompany option:selected").text();
        //CompanyUnit = $("#ddlinnercompunit option:selected").text();

        storeid = $("#ddlIssueStore").val();

        if (storeid == 0) {
            //alert("Select Store to proceed...");
            //$('#ddlIssueStore').css('border-color', 'red');
            $('#ddlIssueStore').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            $('#myModal1').modal('show');
        }

        $('#btnAdd').show();
        $('#btnUpdate').hide();
        $('#btnDel').hide();

        LoadInnerHeaderDetails(ShiprowId);

        LoadItemDetails(ShiprowId, BuyOrdShip, orderNo);

        GenerateDespatchNumber(table, column, compId, Docum);
    });



    $(document).on('keyup', '.txtOrderNo', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.Buyer_Ref_No = val;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtOrderNo]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtOrderNo').focus().val('').val(val);
            }
        });


    });

    $(document).on('keyup', '.txtArtno', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.Articleno = val;
            }
        });

        var otable = $('#tblitemDetails').DataTable(); 
        var odata = otable.rows().data();

        $('input[id=txtArtno]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtArtno').focus().val('').val(val);
            }
        });


    });

    $(document).on('keyup', '.txtHscode', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.HsCode = val;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtHscode]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtHscode').focus().val('').val(val);
            }
        });


    });


    $(document).on('click', '.btnSplit', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var HsCode = table.row($(this).parents('tr')).data()["HsCode"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var slno = [];
        $.each(ShipItemList, function () {
            var sl = this.Sno;
            slno.push(sl);
        });
        var largest = 0;

        for (var i = 0; i < slno.length; i++) {
            if (slno[i] > largest) {
                var largest = slno[i];
            }
        }

        var leng = largest + 1;

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                var obj = {

                    Articleno: this.Articleno,
                    BuyerId: this.BuyerId,
                    Buyer_Ref_No: this.Buyer_Ref_No,
                    CompanyId: this.CompanyId,
                    Destination: this.Destination,
                    Exrate: this.Exrate,
                    Fcarton: 0,
                    HsCode: '',
                    Invdetid: 0,
                    Invid: this.Invid,
                    Itemid: this.Itemid,
                    OrderNo: this.OrderNo,
                    OrderRefno: this.OrderRefno,
                    Order_No: this.Order_No,
                    Ordqty: this.Ordqty,
                    Paymentmode: this.Paymentmode,
                    PortOfLoadingId: this.PortOfLoadingId,
                    Prodqty: this.Prodqty,
                    ShipRowId: this.ShipRowId,
                    Shipno: this.Shipno,
                    Style: this.Style,
                    Styleid: this.Styleid,
                    System: this.System,
                    Tcarton: 0,
                    Totcarton: 0,
                    amount: this.amount,
                    balqty: this.balqty - this.qty,
                    currencyid: this.currencyid,
                    description: this.description,
                    item: this.item,
                    qty: 0,
                    rate: 0,
                    shipmode: this.shipmode,
                    Sno: leng,
                }
            }

            ShipItemList.push(obj);

        });

        LoadItemDet(ShipItemList);
        //var otable = $('#tblitemDetails').DataTable();
        //var odata = otable.rows().data();

        //$('input[id=txtHscode]').each(function (ig) {
        //    if (odata[ig].ShipRowId == ShipRowId) {
        //        var row = $(this).closest('tr');
        //        row.find('#txtHscode').focus().val('').val(val);
        //    }
        //});


    });


    $(document).on('click', '.btnSplitDelete', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];

        var colorempty = [];
        colorempty = ShipItemList;

        colorempty = $.grep(colorempty, function (v) {
                return (v.Sno != Sno);
        });

        ShipItemList = colorempty;

        LoadItemDet(ShipItemList);
      

    });


    $(document).on('keyup', '.txtQty', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var balqty = table.row($(this).parents('tr')).data()["balqty"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();


        var amount = 0;

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                if (balqty < val) {
                    val = 0;
                }
                this.qty = val;

                amount = parseFloat(val) * parseFloat(this.rate);
                this.amount = amount;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtQty]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtQty').focus().val('').val(val);
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtamt]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtamt').focus().val('').val(amount);
            }
        });

        LoadNetGrossAmt();

    });

    $(document).on('keyup', '.txtrate', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var balqty = table.row($(this).parents('tr')).data()["balqty"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];

        var val = $(this).val();
        var amount = 0;
        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.rate = val;
                amount = parseFloat(val) * parseFloat(this.qty);
                this.amount = amount;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtrate]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtrate').focus().val('').val(val);
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtamt]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtamt').focus().val('').val(amount);
            }
        });



    });

    $(document).on('keyup', '.txtFcarton', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Fcarton = table.row($(this).parents('tr')).data()["Fcarton"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];

        var val = $(this).val();
        var totcarton = 0;
        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.Fcarton = val;
                totcarton = parseFloat(this.Tcarton) - parseFloat(val);
                this.Totcarton = totcarton + 1 ;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtFcarton]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtFcarton').focus().val('').val(val);
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTotcarton]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtTotcarton').val(totcarton+1);
            }
        });
        Totcarton();
    });

    $(document).on('keyup', '.txtTcarton', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Tcarton = table.row($(this).parents('tr')).data()["Tcarton"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();
        var totcarton = 0;
        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.Tcarton = val;
                totcarton = parseFloat(this.Tcarton) - parseFloat(this.Fcarton);
                this.Totcarton = totcarton+1;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTcarton]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtTcarton').focus().val('').val(val);
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTotcarton]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtTotcarton').val(totcarton+1);
            }
        });
        Totcarton();
    });

    $(document).on('change', '.txtGRwgt', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();
      
        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.GRwgt = val;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtGRwgt]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtGRwgt').focus().val('').val(val);
            }
        });
        Totalweight();
    });

    $(document).on('change', '.txtNETwgt', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.NETwgt = val;
            }
        });

        var otable = $('#tblitemDetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtNETwgt]').each(function (ig) {
            if (odata[ig].ShipRowId == ShipRowId && odata[ig].Sno == Sno) {
                var row = $(this).closest('tr');
                row.find('#txtNETwgt').focus().val('').val(val);
            }
        });
        Totalweight();
    });




    $(document).on('change', '.ddlDesc', function () {
        debugger;
        var table = $('#tblitemDetails').DataTable();
        var ShipRowId = table.row($(this).parents('tr')).data()["ShipRowId"];
        var Sno = table.row($(this).parents('tr')).data()["Sno"];

        var val = $(this).val();

        $.each(ShipItemList, function () {
            if (this.ShipRowId == ShipRowId && this.Sno == Sno) {
                this.description = val;
            }
        });

        //var otable = $('#tblitemDetails').DataTable();
        //var odata = otable.rows().data();

        //$('input[id=txtOrderNo]').each(function (ig) {
        //    if (odata[ig].ShipRowId == ShipRowId) {
        //        var row = $(this).closest('tr');
        //        row.find('#txtOrderNo').focus().val('').val(val);
        //    }
        //});


    });


   
    //$("#tbladdgriddet").dataTable().find("tbody").on('click', 'td', function ()
    $('#tbladdgriddet').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tbladdgriddet').DataTable();
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < AddGridtbllist.length; d++) {
                    if (AddGridtbllist[d].ShipRowID == val) {
                        AddGridtbllist[d].CheckLoad = "Y";

                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < AddGridtbllist.length; d++) {
                    if (AddGridtbllist[d].ShipRowID == val) {
                        AddGridtbllist[d].CheckLoad = "N";
                    }

                }
            }

        });

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

    $('#txtInvDate').val(Fdatestring);
    $('#txtRefDate').val(Fdatestring);

}


function fnInlinePrint(Id) {
    debugger;
    //var Mod = 1;
    //$('#myModal3').modal('show');
    //var src = '../ReportInline/Production/Despatch/DespatchInlineReport.aspx?';
    //src = src + "ddlOrderNo=" + Id
    ////src = src + "txtFromDate=" + FDate
    ////src = src + "&txtToDate=" + TDate
    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //$("#divReport").html(iframe);
    window.location.href = "../ReportInline/Production/Despatch/DespatchInlineReport.aspx?DespatchId=" + Id;
}

function GenerateDespatchNumber(table, column, compId, Docum) {
    table = "Despatchmas",
    column = "DespatchNo",
    compId = companyid,// $('#ddlinnercompany').val(),
    Docum = 'DESPATCH'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtDispNo').val(result.Value);
        }
    });
}

function getbyID(id) {
    debugger;
    LoadInnerHeaderDetails(id);
    LoadeditItemDetails(id);
    LoadInvAddlessEdit(id);
}

function LoadInnerHeaderDetails(id) {
    debugger;

    $.ajax({
        type: "POST",
        url: "/OrderSalesInvoice/GetInnerHeaderDetails/",
        data: JSON.stringify({ Invid: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            InnerHeaderInfo = json;

            Invid = id;
            $("#ddlinnCompany").val(InnerHeaderInfo.companyid).trigger('change'),
            $("#ddlinnbuyer").val(InnerHeaderInfo.buyerid).trigger('change'),
            $("#ddlinnconsignee").val(InnerHeaderInfo.conssigneeid).trigger('change'),
            $("#ddlinnNoteconsignee").val(InnerHeaderInfo.notify).trigger('change'),
            $("#txtInvNo").val(InnerHeaderInfo.InvoiceNo),
            $("#txtInvDate").val(moment(InnerHeaderInfo.invoicedate).format("DD/MM/YYYY")),
            $("#txtInvRefNo").val(InnerHeaderInfo.refno),
            $("#txtRefDate").val(moment(InnerHeaderInfo.refdate).format("DD/MM/YYYY")),
            $("#ddlinnportofloading").val(InnerHeaderInfo.portofloading).trigger('change'),
            $("#ddlinnDestination").val(InnerHeaderInfo.destination).trigger('change'),
            $("#ddlPortOfDischarge").val(InnerHeaderInfo.portofdischarge).trigger('change'),
            $("#ddlShipMode").val(InnerHeaderInfo.shipmode).trigger('change'),
            $("#ddlSystem").val(InnerHeaderInfo.systemid).trigger('change'),
            $("#ddlPaymentmode").val(InnerHeaderInfo.payment).trigger('change'),
            $("#txtPrecarrBy").val(InnerHeaderInfo.Precarriage),
            $("#ddlplaceofrecpt").val(InnerHeaderInfo.placeofrecpt).trigger('change'),
            $("#txtVesselFlightNo").val(InnerHeaderInfo.Vesselno),
            $("#txtMarksNos").val(InnerHeaderInfo.MarksNos),
            $("#txtTotalCartons").val(InnerHeaderInfo.Totalcartons),
            $("#txtTotalgross").val(InnerHeaderInfo.Totalgrosswgt),
            $("#txtTotalnet").val(InnerHeaderInfo.Totalnetwgt);
            $("#ddlCurrency").val(InnerHeaderInfo.currencyid).trigger('change'),
            $("#txtExrate").val(InnerHeaderInfo.Exrate),

            $("#txtSBillno").val(InnerHeaderInfo.SBillNo),
            $("#txtSBilldate").val(moment(InnerHeaderInfo.SBillDate).format("DD/MM/YYYY")),
            $("#txtCDTno").val(InnerHeaderInfo.CTDNo),
            $("#txtCDTdate").val(moment(InnerHeaderInfo.CTDDate).format("DD/MM/YYYY")),
            $("#txtLCno").val(InnerHeaderInfo.LCNo),
            $("#txtLCdate").val(moment(InnerHeaderInfo.LCDate).format("DD/MM/YYYY")),
            $("#txtLCtype").val(InnerHeaderInfo.LCtype),
            $("#txtStatement").val(InnerHeaderInfo.Statement),
            $("#txtStatementCode").val(InnerHeaderInfo.StatementCode),
            $("#txtStatementType").val(InnerHeaderInfo.StatementType),
            $("#txtSchemeCode").val(InnerHeaderInfo.SchemeCode),
            $("#txtContainerNo").val(InnerHeaderInfo.ContainerNo)

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Add() {
    debugger;


    //var opchk = [];

    //for (var y = 0; y < ItemGridtbllist.length; y++) {
    //    if (ItemGridtbllist[y].DespatchQty > 0) {
    //        opchk.push(ItemGridtbllist[y]);
    //    }
    //}

    //if (opchk.length == 0) {
    //    alert('Please fill atleast any one qty...');
    //    return true;
    //}


    //var res = validate();
    //if (res == false) {
    //    return false;
    //}


    //if ($('#optfullord').is(':checked')) {
    //    shiptype = "F";
    //}
    //else if ($('#optpartord').is(':checked')) {
    //    shiptype = "P";
    //}

    var DespatchObj = {


        Invid: 0,
        companyid: $("#ddlinnCompany").val(),
        buyerid: $("#ddlinnbuyer").val(),
        conssigneeid: $("#ddlinnconsignee").val(),
        notify: $("#ddlinnNoteconsignee").val(),
        InvoiceNo: $("#txtInvNo").val(),
        invoicedate: $("#txtInvDate").val(),
        refno: $("#txtInvRefNo").val(),
        refdate: $("#txtRefDate").val(),
        portofloading: $("#ddlinnportofloading").val(),
        destination: $("#ddlinnDestination").val(),
        portofdischarge: $("#ddlPortOfDischarge").val(),
        shipmode: $("#ddlShipMode").val(),
        systemid: $("#ddlSystem").val(),
        payment: $("#ddlPaymentmode").val(),
        Precarriage: $("#txtPrecarrBy").val(),
        placeofrecpt: $("#ddlplaceofrecpt").val(),
        Vesselno: $("#txtVesselFlightNo").val(),
        MarksNos: $("#txtMarksNos").val(),
        Totalcartons: $("#txtTotalCartons").val(),
        Totalgrosswgt: $("#txtTotalgross").val(),
        Totalnetwgt: $("#txtTotalnet").val(),
        currencyid: $("#ddlCurrency").val(),
        Exrate: $("#txtExrate").val(),
        Detlist: ShipItemList,

        SBillNo : $("#txtSBillno").val(),
        SBillDate : $("#txtSBilldate").val(),
        CTDNo : $("#txtCDTno").val(),
        CTDDate : $("#txtCDTdate").val(),
        LCNo :$("#txtLCno").val(),
        LCDate : $("#txtLCdate").val(),
        LCtype : $("#txtLCtype").val(),
        Statement : $("#txtStatement").val(),
        StatementCode : $("#txtStatementCode").val(),
        StatementType :$("#txtStatementType").val(),
        SchemeCode : $("#txtSchemeCode").val(),
        ContainerNo :$("#txtContainerNo").val(),
        Acclist: AccList,
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderSalesInvoice/Add",
        data: JSON.stringify(DespatchObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == "SUCCESS") {
                //alert("Record saved successfully...");
                var msg = 'Record saved successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
                AlartMessage(msg, flg, mod, ur);
                $('#myModal1').modal('hide');
                //window.location.href = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
            }
            else if (result.Status == "ERROR") {
                //alert("Record saved failed...");
                var msg = 'Record saved failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {
    debugger;


    //var opchk = [];

    //for (var y = 0; y < ItemGridtbllist.length; y++) {
    //    if (ItemGridtbllist[y].DespatchQty > 0) {
    //        opchk.push(ItemGridtbllist[y]);
    //    }
    //}

    //if (opchk.length == 0) {
    //    alert('Please fill atleast any one qty...');
    //    return true;
    //}


    //var res = validate();
    //if (res == false) {
    //    return false;
    //}


    //if ($('#optfullord').is(':checked')) {
    //    shiptype = "F";
    //}
    //else if ($('#optpartord').is(':checked')) {
    //    shiptype = "P";
    //}

    var DespatchObj = {

        Invid: Invid,
        companyid: $("#ddlinnCompany").val(),
        buyerid: $("#ddlinnbuyer").val(),
        conssigneeid: $("#ddlinnconsignee").val(),
        notify: $("#ddlinnNoteconsignee").val(),
        InvoiceNo: $("#txtInvNo").val(),
        invoicedate: $("#txtInvDate").val(),
        refno: $("#txtInvRefNo").val(),
        refdate: $("#txtRefDate").val(),
        portofloading: $("#ddlinnportofloading").val(),
        destination: $("#ddlinnDestination").val(),
        portofdischarge: $("#ddlPortOfDischarge").val(),
        shipmode: $("#ddlShipMode").val(),
        systemid: $("#ddlSystem").val(),
        payment: $("#ddlPaymentmode").val(),
        Precarriage: $("#txtPrecarrBy").val(),
        placeofrecpt: $("#ddlplaceofrecpt").val(),
        Vesselno: $("#txtVesselFlightNo").val(),
        MarksNos: $("#txtMarksNos").val(),
        Totalcartons: $("#txtTotalCartons").val(),
        Totalgrosswgt: $("#txtTotalgross").val(),
        Totalnetwgt: $("#txtTotalnet").val(),
        currencyid: $("#ddlCurrency").val(),
        Exrate: $("#txtExrate").val(),
        Detlist: ShipItemList,

        SBillNo : $("#txtSBillno").val(),
        SBillDate : $("#txtSBilldate").val(),
        CTDNo : $("#txtCDTno").val(),
        CTDDate : $("#txtCDTdate").val(),
        LCNo :$("#txtLCno").val(),
        LCDate : $("#txtLCdate").val(),
        LCtype : $("#txtLCtype").val(),
        Statement : $("#txtStatement").val(),
        StatementCode : $("#txtStatementCode").val(),
        StatementType :$("#txtStatementType").val(),
        SchemeCode : $("#txtSchemeCode").val(),
        ContainerNo :$("#txtContainerNo").val(),
        Acclist: AccList,
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderSalesInvoice/Update",
        data: JSON.stringify(DespatchObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == "SUCCESS") {
                //alert("Record Update successfully...");
                var msg = 'Record Update successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
                AlartMessage(msg, flg, mod, ur);
                $('#myModal1').modal('hide');
                //window.location.href = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
            }
            else if (result.Status == "ERROR") {
                //alert("Record saved failed...");
                var msg = 'Record saved failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function Delete() {
    debugger;


    //var opchk = [];

    //for (var y = 0; y < ItemGridtbllist.length; y++) {
    //    if (ItemGridtbllist[y].DespatchQty > 0) {
    //        opchk.push(ItemGridtbllist[y]);
    //    }
    //}

    //if (opchk.length == 0) {
    //    alert('Please fill atleast any one qty...');
    //    return true;
    //}


    //var res = validate();
    //if (res == false) {
    //    return false;
    //}


    //if ($('#optfullord').is(':checked')) {
    //    shiptype = "F";
    //}
    //else if ($('#optpartord').is(':checked')) {
    //    shiptype = "P";
    //}

    var DespatchObj = {

        Invid: Invid,
        companyid: $("#ddlinnCompany").val(),
        buyerid: $("#ddlinnbuyer").val(),
        conssigneeid: $("#ddlinnconsignee").val(),
        notify: $("#ddlinnNoteconsignee").val(),
        InvoiceNo: $("#txtInvNo").val(),
        invoicedate: $("#txtInvDate").val(),
        refno: $("#txtInvRefNo").val(),
        refdate: $("#txtRefDate").val(),
        portofloading: $("#ddlinnportofloading").val(),
        destination: $("#ddlinnDestination").val(),
        portofdischarge: $("#ddlPortOfDischarge").val(),
        shipmode: $("#ddlShipMode").val(),
        systemid: $("#ddlSystem").val(),
        payment: $("#ddlPaymentmode").val(),
        Precarriage: $("#txtPrecarrBy").val(),
        placeofrecpt: $("#ddlplaceofrecpt").val(),
        Vesselno: $("#txtVesselFlightNo").val(),
        MarksNos: $("#txtMarksNos").val(),
        Totalcartons: $("#txtTotalCartons").val(),
        Totalgrosswgt: $("#txtTotalgross").val(),
        Totalnetwgt: $("#txtTotalnet").val(),
        currencyid: $("#ddlCurrency").val(),
        Exrate: $("#txtExrate").val(),
        Detlist: ShipItemList,

        SBillNo : $("#txtSBillno").val(),
        SBillDate : $("#txtSBilldate").val(),
        CTDNo : $("#txtCDTno").val(),
        CTDDate : $("#txtCDTdate").val(),
        LCNo :$("#txtLCno").val(),
        LCDate : $("#txtLCdate").val(),
        LCtype : $("#txtLCtype").val(),
        Statement : $("#txtStatement").val(),
        StatementCode : $("#txtStatementCode").val(),
        StatementType :$("#txtStatementType").val(),
        SchemeCode : $("#txtSchemeCode").val(),
        ContainerNo :$("#txtContainerNo").val(),
        Acclist: AccList,
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderSalesInvoice/Delete",
        data: JSON.stringify(DespatchObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Status == "SUCCESS") {
                //alert("Record deleted successfully...");
                var msg = 'Record deleted successfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
                AlartMessage(msg, flg, mod, ur);
                $('#myModal1').modal('hide');
                //window.location.href = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
            }
            else if (result.Status == "ERROR") {
                //alert("Record saved failed...");
                var msg = 'Record saved failed...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Valdidation using jquery
function validate() {
    var isValid = true;

    if ($('#ddlPortOfDischarge').val() == 0) {
        //$('#ddlFreightSupplier').css('border-color', 'Red');
        $('#ddlPortOfDischarge').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlFreightSupplier').css('border-color', 'lightgrey');
        $('#ddlPortOfDischarge').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlFreightSupplier').val() == 0) {
        //$('#ddlFreightSupplier').css('border-color', 'Red');
        $('#ddlFreightSupplier').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlFreightSupplier').css('border-color', 'lightgrey');
        $('#ddlFreightSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#txtDocRefNo').val().trim() == "") {
        $('#txtDocRefNo').css('border-color', 'Red');

        isValid = false;
    }
    else {
        $('#txtDocRefNo').css('border-color', 'lightgrey');
    }

    if ($('#txtInvRefNo').val().trim() == "") {
        $('#txtInvRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtInvRefNo').css('border-color', 'lightgrey');
    }


    return isValid;
}



function ListFilter() {
    debugger;
    //$('#tblbillmaingrid').DataTable().destroy();
    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    LoadData(companyid, FDate, TDate);
}

function LoadeditItemDetails(InvId) {
    debugger;
    $.ajax({
        type: "POST",
        url: "/OrderSalesInvoice/GetInnerItemDetails/",
        data: JSON.stringify({ Invid: InvId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ShipItemList = json;
            LoadItemDet(ShipItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}





function GetAddGridDetails() {
    debugger;
    var inputcount = 0;
    //$("#tbladdgriddet tr").each(function () {
    //    inputcount++;
    //});
    inputcount = $('#tbladdgriddet tr').length;
    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $("#tbladdgriddet").DataTable().destroy();
    }


    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').text();
    }

    var RecNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlRefNo option:selected').text();
    }
    var buyer = $('#ddlBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var ordtype = $('input[name="optshiptype"]:checked').attr('value');

    var storeid = $('#ddlIssueStore').val();
    if (storeid == null || storeid == "0") {
        storeid = 0;
    }

    var innercomp = $('#ddlCompany').val();
    if (innercomp == null || innercomp == "0") {
        innercomp = 0;
    }

    $.ajax({
        type: "POST",
        url: "/OrderSalesInvoice/GetAddGridDetails/",
        data: JSON.stringify({ CompanyId: innercomp, OrderType: ordtype, RefNo: RecNo, storeid: storeid, OrderNo: OrdNo, Buyerid: buyer }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            AddGridtbllist = json;
            $('#tbladdgriddet').DataTable({
                data: AddGridtbllist,
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
                    { title: "ID", data: "ShipRowID", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Style", data: "Style" },
            { title: "Ref No", data: "RefNo" },
            { title: "Buyer", data: "Buyer" },
            { title: "Destination", data: "Destination" },
            {
                title: "Ship Date", data: "ShipDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Quantity", data: "ProductionQty" },
            { title: "Balance", data: "BalanceQty" },
            {
                title: "ACTION", data: "ShipRowID",

                render: function (data, type, row) {

                    return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';


                }

                //"sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>'
            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadData(companyid, fromdate, todate) {
    debugger;
    var inputcount = 0;

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();
    inputcount = $('#tbldespatchmaingrid tr').length;
    if (inputcount > 0) {
        $("#tbldespatchmaingrid").DataTable().destroy();
    }

    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
    }

    var RecNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMRefNo option:selected').text();
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var ordtype = $('input[name="optmord"]:checked').attr('value');

    var comp = $('#ddlMCompany').val();

    if (comp == null) {
        comp = DCompid;
    } else {
        comp = $('#ddlMCompany').val();
    }

    $.ajax({
        type: "POST",
        url: '/OrderSalesInvoice/GetMaindt/',
        data: JSON.stringify({ CompanyId: comp, Fromdate: fromdate, Todate: todate, OrderType: ordtype, RefNo: RecNo, OrderNo: OrdNo, Buyerid: buyer }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;
            $('#tbldespatchmaingrid').DataTable({
                data: maintbllist,
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
                    { title: "Invid", data: "DespatchID", "visible": false },

            { title: "InvoiceNo", data: "DespatchNo" },
            {
                title: "InvoiceDate", data: "DespatchDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Destination", data: "Destination" },

            { title: "Buyer", data: "Buyer" },

            { title: "RefNo", data: "DocRefNo" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + BuyOrddespatchEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + BuyOrddespatchDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-minus"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" ' + BuyOrddespatchPrintFlg + ' class="btnmaingrdprint btn btn-danger btn-round" onClick=""> <i class="fa fa-print"></i> </button>'
            }
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


//function Delete(ID) {
//    debugger;
//    var ans = confirm("Are you sure you want to delete this Record?");
//    if (ans) {
//        LoadingSymb();
//        $.ajax({
//            url: "/OrderSalesInvoice/Delete/" + ID,
//            type: "POST",
//            contentType: "application/json;charset=UTF-8",
//            dataType: "json",
//            success: function (result) {
//                alert("Record deleted successfully...");
//                //$('#tblprodreturnmaingrid').DataTable().destroy();
//                ListFilter();
//            },
//            error: function (errormessage) {
//                alert(errormessage.responseText);
//            }
//        });
//    }
//}


$(document).on('click', '.btnmaingrdprint', function () {
    debugger;

    $('#myModal2').modal('show');


    var table = $('#tbldespatchmaingrid').DataTable();
     Desid = table.row($(this).parents('tr')).data()["DespatchID"];
    //var comp = $('#ddlMCompany').val();
    //window.open("../ReportInline/Production/OrderSalesInvoiceInline/OrderSalesInvoiceInlineReport.aspx?InvId=" + Desid + "&Companyid=" + comp);


    //Repid = despatchid;
    //$('#myModal2').modal('show');

    //docname = "BUYER ORDER DESPATCH";
    //GenerateReportItem(docname);
});




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
    //var arr = [];
    //$('#sbTwo :selected').each(function (i, sel) {
    //    arr.push($(sel).val());
    //});
    //var res = [];
    //var p = [];
    //for (var r = 0; r < repobj.length; r++) {
    //    res.push(repobj[r].optionid);
    //    p.push(0);
    //}
    //for (var y = 0; y < arr.length; y++) {
    //    for (var f = 0; f < res.length; f++) {
    //        if (arr[y] == res[f]) {
    //            p[f] = 1;
    //        }
    //    }
    //}

    //window.open("../ReportInline/Production/Despatch/DespatchInlineReport.aspx?DespatchId=" + Repid);

    var Invformat = $('input[name="InvoiceFormat"]:checked').attr('value');

    var comp = $('#ddlMCompany').val();
    window.open("../ReportInline/Production/OrderSalesInvoiceInline/OrderSalesInvoiceInlineReport.aspx?InvId=" + Desid + "&Companyid=" + comp + "&Format=" + Invformat);


}

function backtomain() {
    //$("#myModal2").hide();
    //$("#myModal2").modal('hide');

    window.location.href = "/OrderSalesInvoice/OrderSalesInvoiceIndex";
}



function SubmitAdd() {

    fnClearAccControls();

    $('#myModal1').modal('show');

    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();

    for (var j = 0; j < AddGridtbllist.length; j++) {
        if (AddGridtbllist[j].CheckLoad == "Y") {
            ShiprowId = ShiprowId + "," + AddGridtbllist[j].ShipRowID;
        }
    }
    LoadItemDetails();

}



var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    debugger;
    table = "OrderSalesInvoiceMas",
    column = "InvoiceNo",
    compId = $('#ddlinnCompany').val(),
    Docum = 'OrderSalesInvoice'
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtInvNo').val(result.Value);
        }
    });
}


function LoadItemDetails() {
    debugger;

    $.ajax({
        type: "POST",
        url: "/OrderSalesInvoice/GetAddItemDetails/",
        data: JSON.stringify({ ShipRowId: ShiprowId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            ShipItemList = json;
            LoadItemDet(ShipItemList);

            $('#ddlinnCompany').val(ShipItemList[0].CompanyId).trigger('change');
            $('#ddlinnbuyer').val(ShipItemList[0].BuyerId).trigger('change');
            $('#ddlinnconsignee').val('0').trigger('change');
            $('#ddlinnNoteconsignee').val('0').trigger('change');
            $('#ddlinnportofloading').val(ShipItemList[0].PortOfLoadingId).trigger('change');
            $('#ddlinnDestination').val(ShipItemList[0].Destination).trigger('change');
            $('#ddlPortOfDischarge').val('0').trigger('change');
            $('#ddlShipMode').val(ShipItemList[0].shipmode).trigger('change');
            $('#ddlSystem').val(ShipItemList[0].System).trigger('change');
            $('#ddlPaymentmode').val(ShipItemList[0].Paymentmode).trigger('change');
            $('#ddlplaceofrecpt').val('0').trigger('change');
            $('#ddlCurrency').val(ShipItemList[0].currencyid).trigger('change');
            $('#txtExrate').val(ShipItemList[0].Exrate)

            GenerateNumber();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadItemDet(ShipItemList) {
    debugger;
    var rowCount = $('#tblitemDetails tr').length;
    if (rowCount > 0) {
        $('#tblitemDetails').DataTable().destroy();
    }

    $('#tblitemDetails').DataTable({
        data: ShipItemList,
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
                 { title: "Masid", data: "Invid", "visible": false },
                 { title: "Detid", data: "Invdetid", "visible": false },
                 { title: "ShipRowid", data: "ShipRowId", "visible": false },
                 { title: "Itemid", data: "Itemid", "visible": false },
                 { title: "Styleid", data: "Styleid", "visible": false },
                 { title: "Sno", data: "Sno" },
                 { title: "Item", data: "item" },
                 { title: "Order No", data: "Order_No" },
                //{
                //    title: "OrderNo", data: "Order_No",
                //    render: function (data) {
                //        return '<input type="text" id="txtOrderNo" class="form-control txtOrderNo" style="width:100px;text-align: center;" value=' + data + '>';
                //    }
                //},
                 { title: "Ref No", data: "OrderRefno" },
                   { title: "Style", data: "Style" },
                {
                    title: "Article No", data: "Articleno",
                    render: function (data) {
                        return '<input type="text" id="txtArtno" class="form-control txtArtno" style="width: 100px;text-align: center;" value=' + data + '>';
                    }
                },
                {
                    title: "HSCode", data: "HsCode",
                    render: function (data) {
                        return '<input type="text" id="txtHscode" class="form-control txtHscode" style="width: 100px;text-align: center;" value=' + data + '>';
                    }
                },

                 //{ title: "Description", data: "description" },

                 {
                     title: "Description", data: "description",
                     render: function (data, type, row) {

                         var $select = $("<select></select>", {
                             "id": "ddlDesc",
                             "value": data,
                             "class": "form-control selWidth ddlDesc",
                             "style": "width:200px;"
                         });

                         $.each(Descriptionlist, function (k, v) {

                             if (k == 0) {
                                 var $option = $("<option></option>", {
                                     "text": "--Select Desc--",
                                     "value": 0
                                 });
                                 $select.append($option);
                             }
                             var $option = $("<option></option>", {
                                 "text": v.DescriptionName,
                                 "value": v.DescriptionId
                             });

                             if (data === v.DescriptionId) {
                                 $option.attr("selected", "selected")
                             }
                             $select.append($option);
                         });
                         return $select.prop("outerHTML");
                     }
                 },
                   { title: "Ord Qty", data: "Ordqty" },
                     { title: "Prod Qty", data: "Prodqty" },
                       { title: "Bal Qty", data: "balqty" },
                 {
                     title: "Qty", data: "qty",
                     render: function (data) {
                         return '<input type="text" id="txtQty" class="form-control txtQty" style="width: 50px;text-align: center;" value=' + data + '>';
                     }
                 },
                  {
                      title: "Rate", data: "rate",
                      render: function (data) {
                          return '<input type="text" id="txtrate" class="form-control txtrate" style="width: 50px;text-align: center;" value=' + data + '>';
                      }
                  },
                   {
                       title: "Amount", data: "amount",
                       render: function (data) {
                           return '<input type="text" id="txtamt" class="form-control txtamt" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                       }
                   },
                {
                    title: "From Carton", data: "Fcarton",
                    render: function (data) {
                    return '<input type="text" id="txtFcarton" class="form-control txtFcarton" style="width: 50px;text-align: center;" value=' + data + '  >';
                    }
                },
                 {
                     title: "To Carton", data: "Tcarton",
                     render: function (data) {
                         return '<input type="text" id="txtTcarton" class="form-control txtTcarton" style="width: 50px;text-align: center;" value=' + data + '  >';
                     }
                 },
                {
                    title: "Tot Carton", data: "Totcarton",
                    render: function (data) {
                        return '<input type="text" id="txtTotcarton" class="form-control txtTotcarton" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                    }
                },

                 {
                     title: "GR wgt", data: "GRwgt",
                     render: function (data) {
                         return '<input type="text" id="txtGRwgt" class="form-control txtGRwgt" style="width: 50px;text-align: center;" value=' + data + '  >';
                     }
                 },
                {
                    title: "NET wgt", data: "NETwgt",
                    render: function (data) {
                        return '<input type="text" id="txtNETwgt" class="form-control txtNETwgt" style="width: 50px;text-align: center;" value=' + data + '  >';
                    }
                },


                 {
                     title: "Split Up", "mDataProp": null,
                     "sDefaultContent": '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Split" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnSplit btn btn-round btn-success"> <i class="fa fa-plus"></i> </button>' + '<button type="button"  type="button" data-toggle="tooltip" data-placement="top" title="Split" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnSplitDelete btn btn_round btn-danger"> <i class="fa fa-times"></i> </button>'
                 }

        ]
    });

    $("#tblitemDetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitemDetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
    Totcarton();
    LoadNetGrossAmt();
    Totalweight();
}

function fnClearAccControls() {
    $('#ddlinnCompany').val('0').trigger('change');
    $('#ddlinnbuyer').val('0').trigger('change');
    $('#ddlinnconsignee').val('0').trigger('change');
    $('#ddlinnNoteconsignee').val('0').trigger('change');
    $('#ddlinnportofloading').val('0').trigger('change');
    $('#ddlinnDestination').val('0').trigger('change');
    $('#ddlPortOfDischarge').val('0').trigger('change');
    $('#ddlShipMode').val('0').trigger('change');
    $('#ddlSystem').val('0').trigger('change');
    $('#ddlPaymentmode').val('0').trigger('change');
    $('#ddlplaceofrecpt').val('0').trigger('change');
    $('#ddlCurrency').val('0').trigger('change');

    $('#txtInvNo').val('');
    //$('#txtInvDate').val('');
    $('#txtInvRefNo').val('');
    //$('#txtRefDate').val('');
    $('#txtPrecarrBy').val('');
    $('#txtVesselFlightNo').val('');
    $('#txtMarksNos').val('');
    $('#txtTotalCartons').val('');
    $('#txtTotalgross').val('');
    $('#txtTotalnet').val('');
    $('#txtExrate').val('');

    $('#txtSBillno').val('');
    $('#txtSBilldate').val('');
    $('#txtCDTno').val('');
    $('#txtCDTdate').val('');
    $('#txtLCno').val('');
    $('#txtLCdate').val('');
    $('#txtLCtype').val('');
    $('#txtStatement').val('');
    $('#txtStatementCode').val('');
    $('#txtStatementType').val('');
    $('#txtSchemeCode').val('');
    $('#txtContainerNo').val('');

}


function loadDescp() {
    debugger;
    $.ajax({
        url: "/Description/GetListMain",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            Descriptionlist = result.Value;
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Totcarton() {

    var totcarton = 0;
    $.each(ShipItemList, function () {
        totcarton =totcarton+ parseFloat(this.Totcarton);
    });
    $('#txtTotalCartons').val(totcarton);
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



        if (isAllValid) {


            debugger;
            var AcListObj = {
                Addless: $("#ddlAcc option:selected").text(),
                addless_id: $('#ddlAcc option:selected').val(),
                aorl: $('#txtPorMins').val(),
                percentage: $('#txtPer').val(),
                amount: $('#txtAAmount').val(),
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

           // LoadNetGrossAmt();

            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        var table = $('#tblPaydetails').DataTable();
        var addless_id = table.row($(this).parents('tr')).data()["addless_id"];
        var aorl = table.row($(this).parents('tr')).data()["aorl"];
        var percentage = table.row($(this).parents('tr')).data()["percentage"];
        var amount = table.row($(this).parents('tr')).data()["amount"];

        $('#ddlAcc').val(addless_id).trigger('change');
        $('#txtPorMins').val(aorl);
        $('#txtPer').val(percentage);
        $('#txtAAmount').val(amount);

        AddlessId = addless_id;

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
      
        $.each(AccList, function (i) {

            if (AccList[i].addless_id == AddlessId) {
                AccList[i].addless_id = $("#ddlAcc").val();
                AccList[i].Addless = $("#ddlAcc option:selected").text();
                AccList[i].aorl = $("#txtPorMins").val();
                AccList[i].percentage = $("#txtPer").val();
                AccList[i].amount = $("#txtAAmount").val();

            }
        })

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

        var table = $('#tblPaydetails').DataTable();
        var addid = table.row($(this).parents('tr')).data()["addless_id"];

        var AcsList = $.grep(AccList, function (e) {

            return e.addless_id != addid;

        });
        AccList = AcsList;

        loadAccTable(AccList);
       
        //LoadNetGrossAmt();
    });
   

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



function fnClearAccControls() {
    $('#ddlAcc').val('0');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAAmount').val('');
}

function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,

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

   
    LoadNetGrossAmt();
}

function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtgrossamt').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAAmount').val(Amt);

}


function LoadNetGrossAmt() {
    debugger;

    var totalamnt = 0;
    if (ShipItemList.length > 0) {
        for (var e = 0; e < ShipItemList.length; e++) {
            var amount = ShipItemList[e].amount;
            totalamnt = totalamnt + parseFloat(amount);

        }
    }



    var TotNetAmt = 0;
    var TotGrossAmt = 0;

    TotGrossAmt = totalamnt;
    
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

        TotNetAmt = parseFloat(TotNetAmt).toFixed(5);
        $('#txtNetAmount').val(TotNetAmt);
       // $('#txtNNetamount').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(5);
        $('#txtNetAmount').val(TotGrossAmt);
        //$('#txtNNetamount').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(5);
    //$('#txtGrossamount').val(TotGrossAmt);
    $('#txtgrossamt').val(TotGrossAmt);
}

function LoadInvAddlessEdit(Id) {
    debugger;

    $.ajax({
        url: "/OrderSalesInvoice/GetAddlessDetails",
        data: JSON.stringify({ Invid: Id }),
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

function Totalweight() {
    debugger;
 
    var totalgr = 0;
    var totalnet = 0;

    if (ShipItemList.length > 0) {
        for (var e = 0; e < ShipItemList.length; e++) {
            var GRwgt = ShipItemList[e].GRwgt;
            var NETwgt = ShipItemList[e].NETwgt;
            totalgr = totalgr + parseFloat(GRwgt);
            totalnet = totalnet + parseFloat(NETwgt);
        }
    }

    $('#txtTotalgross').val(totalgr.toFixed(3));
    $('#txtTotalnet').val(totalnet.toFixed(3));
}

function Pur_Grn_Print(ID) {
    debugger;
    $('#myModal2').modal('show');

}