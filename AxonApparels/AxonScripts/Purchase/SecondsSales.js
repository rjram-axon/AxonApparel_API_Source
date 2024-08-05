/// <reference path="../../ReportInline/Purchase/SecondsSalesInlineReport/SecondsSalesInlineReport.aspx" />
/// <reference path="../../ReportInline/Purchase/SecondsSalesInlineReport/SecondsSalesInlineReport.aspx" />
var SItemList = [];
var MOrd = 0;
var Mref = 0;
var MSty = 0;
var MItm = 0;
var AccList = [];
var Decimalplace = 0;
var Masid = 0;
var Mode = 0;
var State = '';

$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCurrencyDDL("#ddlBCurrency");
    LoadCompanyDDL("#ddlFromCompany,#ddlMFromCompany");
    LoadStyleDDL("#ddlFStyle,#ddlMStyle");
    LoadRefNoDDL("#ddlFRefNo,#ddlMFromRefNo");
    LoadOrderNoDDL("#ddlFOrderNo,#ddlMFromOrderNo");
    LoadItemGroupDDL("#ddlItemGroup");
    LoadItemDDL("#ddlItem");
    LoadSupplierDDL("#ddlSupplier");
    LoadCompanyUnitDDL("#ddlCompanyUit,#ddlMUnit");

    LoadAddlessDDL("#ddlAcc");
    getDate();
    LoadMainGrid();
    LoadTranNoDDL();
    $('#btnImadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAcc').val() == "0") {
            isAllValid = false;

            $('#ddlAcc').siblings(".select2-container").css('border', '1px solid red');
        }
        else {

            $('#ddlAcc').siblings(".select2-container").css('border', '1px solid lightgrey');
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
                AddLessid: $('#ddlAcc').val(),
                aorl: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmount').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);


            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AccList.slice(rowindex);

        $('#ddlAcc').val(currentro12[0]['AddLessid']);
        $('#txtPorMins').val(currentro12[0]['aorl']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmount').val(currentro12[0]['Amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });

    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = AccList.slice(rowindex);

        currentrowsel[0]['AddLessid'] = $("#ddlAcc").val();
        currentrowsel[0]['Addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['aorl'] = $("#txtPorMins").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        currentrowsel[0]['Amount'] = $("#txtAmount").val();

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

        LoadNetGrossAmt();

        fnClearAccControls();

    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);

        LoadNetGrossAmt();

        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
    });

    $(document).on('change', '.calcQty', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["StockQty"];

        var Val = $(this).val();

        var TQty = Val;


        if (TQty > OrdBalQty) {
            //alert("Sales Qty Should Not Greater then Stock Qty..");
            var msg = 'Sales Quantity Should Not Greater then Stock Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            $.each(SItemList, function () {
                if (this.Stockid == STkId) {
                    this.SalesQty = 0;
                    TQty = 0;
                }
            });
            var otable = $('#tblStockTranItem').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtTQty]').each(function (ig) {
                if (odata[ig].Stockid == STkId && odata[ig].Itemid == IId && odata[ig].colorid == CId && odata[ig].sizeid == SId) {
                    var row = $(this).closest('tr');
                    row.find('#txtTQty').focus().val('').val(TQty);
                }
            });
            TotalCalcAmt();
            LoadNetGrossAmt();
            return true;
        } else {


            $.each(SItemList, function () {
                if (this.Stockid == STkId && this.Itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomid == PUId) {
                    this.SalesQty = TQty;
                }
            });

            var otable = $('#tblStockTranItem').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtTQty]').each(function (ig) {
                if (odata[ig].Stockid == STkId && odata[ig].Itemid == IId && odata[ig].colorid == CId && odata[ig].sizeid == SId) {
                    var row = $(this).closest('tr');
                    row.find('#txtTQty').focus().val('').val(TQty);
                }
            });
            TotalCalcAmt();
            LoadNetGrossAmt();
            return true;
        }



    });

    $(document).on('change', '.txtTrate', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        // var OrdBalQty = table.row($(this).parents('tr')).data()["StockQty"];

        var Val = $(this).val();

        var rte = Val;
        if (rte < 0) {
            rte = 0;
        }


        $.each(SItemList, function () {
            if (this.Stockid == STkId && this.Itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomid == PUId) {
                this.rate = rte;
            }
        });

        var otable = $('#tblStockTranItem').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTrate]').each(function (ig) {
            if (odata[ig].Stockid == STkId && odata[ig].Itemid == IId && odata[ig].colorid == CId && odata[ig].sizeid == SId) {
                var row = $(this).closest('tr');
                row.find('#txtTrate').focus().val('').val(rte);
            }
        });



        TotalCalcAmt();
        LoadNetGrossAmt();

    });

    $(document).on('change', '.txtTcgst', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        // var OrdBalQty = table.row($(this).parents('tr')).data()["StockQty"];

        var Val = $(this).val();

        var rte = Val;
        if (rte < 0) {
            rte = 0;
        }



        $.each(SItemList, function () {
            if (this.Stockid == STkId && this.Itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomid == PUId) {
                this.cgst = rte;
                if (rte > 0) {
                    this.igst = 0;
                }
            }
        });

        var otable = $('#tblStockTranItem').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTcgst]').each(function (ig) {
            if (odata[ig].Stockid == STkId && odata[ig].Itemid == IId && odata[ig].colorid == CId && odata[ig].sizeid == SId) {
                var row = $(this).closest('tr');
                row.find('#txtTcgst').focus().val('').val(rte);
                if (rte > 0) {
                    row.find('#txtTigst').focus().val('').val(0);
                }
            }
        });



        TotalCalcAmt();
        LoadNetGrossAmt();

    });


    $(document).on('change', '.txtTsgst', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        // var OrdBalQty = table.row($(this).parents('tr')).data()["StockQty"];

        var Val = $(this).val();

        var rte = Val;
        if (rte < 0) {
            rte = 0;
        }

        $.each(SItemList, function () {
            if (this.Stockid == STkId && this.Itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomid == PUId) {
                this.sgst = rte;
                if (rte > 0) {
                    this.igst = 0;
                }
            }
        });

        var otable = $('#tblStockTranItem').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTsgst]').each(function (ig) {
            if (odata[ig].Stockid == STkId && odata[ig].Itemid == IId && odata[ig].colorid == CId && odata[ig].sizeid == SId) {
                var row = $(this).closest('tr');
                row.find('#txtTsgst').focus().val('').val(rte);
                if (rte > 0) {
                    row.find('#txtTigst').focus().val('').val(0);
                }
            }
        });



        TotalCalcAmt();
        LoadNetGrossAmt();

    });

    $(document).on('change', '.txtTigst', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["colorid"];
        var SId = table.row($(this).parents('tr')).data()["sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["uomid"];
        // var OrdBalQty = table.row($(this).parents('tr')).data()["StockQty"];

        var Val = $(this).val();

        var rte = Val;
        if (rte < 0) {
            rte = 0;
        }

        $.each(SItemList, function () {
            if (this.Stockid == STkId && this.Itemid == IId && this.colorid == CId && this.sizeid == SId && this.uomid == PUId) {
                this.igst = rte;
                if (rte > 0) {
                    this.sgst = 0;
                    this.cgst = 0;
                }
            }
        });

        var otable = $('#tblStockTranItem').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtTsgst]').each(function (ig) {
            if (odata[ig].Stockid == STkId && odata[ig].Itemid == IId && odata[ig].colorid == CId && odata[ig].sizeid == SId) {
                var row = $(this).closest('tr');
                row.find('#txtTigst').focus().val('').val(rte);
                if (rte > 0) {
                    row.find('#txtTcgst').focus().val('').val(0);
                    row.find('#txtTsgst').focus().val('').val(0);
                }
            }
        });

        TotalCalcAmt();
        LoadNetGrossAmt();

    });

    $('#tblStockTranItem').on('click', 'tr', function (e) {
        debugger;

        //var table = $('#tblStockTranItem').DataTable();

        var table = $('#tblStockTranItem').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblStockTranItem').dataTable().fnGetData(row);

        //var STkId = table.row($(this).parents('tr')).data()["Stockid"];
        //var Order_no = table.row($(this).parents('tr')).data()["Order_no"];
        //var Transno = table.row($(this).parents('tr')).data()["Transno"];
        //var Markup_Rate = table.row($(this).parents('tr')).data()["Markup_Rate"];
        //var Ref_No = table.row($(this).parents('tr')).data()["Ref_No"];

        var STkId = data.Stockid;
        var Order_no = data.Order_no;
        var Transno = data.Transno;
        var Markup_Rate = data.Markup_Rate;
        var Ref_No = data.Ref_No;
        
        $('#Ordernodet').val(Order_no);
        $('#RefNodet').val(Ref_No);
        $('#TransNodet').val(Transno);
        $('#MarkupRatedet').val(Markup_Rate);

    });

});


function ClearTextbox() {
    Mode = 0;
  
    GenerateNumber();
    AccList = [];
    loadAccTable(AccList);
    loadexcratebom();
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
    $('#txtMFromDate').val(MainFDate);
    $('#txtMToDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    debugger;
    if (Mode == 0) {
        table = "FABRIC_SALES_MAS",
        column = "Entryno",
        Docum = 'SECONDS SALES',

        compId = $('#ddlFromCompany').val();

        if (compId == null) {
            compId = DCompid;
        } else {
            compId = $('#ddlFromCompany').val();
        }

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtEntryNo').val(result.Value);
            }
        });
    }
}

function LoadItemDetails() {
    debugger;

    if ($('#ddlSupplier').val() == 0) {
        $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    LoadStockTransferItemDetails();
}

function LoadStockTransferItemDetails() {
    debugger;

    var CompId = $('#ddlFromCompany').val();
    var unitid = $('#ddlCompanyUit').val();

    var ImId = $('#ddlItem').val();
    var IgId = $('#ddlItemGroup').val();

    var FStyId = $('#ddlFStyle').val();

    var FOType = $('input[name="FOrder"]:checked').attr('value');

    var FOrdNo = "";
    var FONo = $("#ddlFOrderNo option:selected").val();

    if (FONo == "0") {
        FOrdNo == "";
    }
    else {

        FOrdNo = MOrd;
    }

    var FRefNo = "";
    var FRNo = $("#ddlFOrderNo option:selected").val();

    if (FRNo == "0") {
        FRefNo == "";
    }
    else {

        FRefNo = Mref;
    }

    var Fsty = "";
    var FSNo = $("#ddlFStyle option:selected").val();

    if (FSNo == "0") {
        Fsty == "";
    }
    else {

        Fsty = MSty;
    }

    var Fitm = "";
    var FINo = $("#ddlItem option:selected").val();

    if (FINo == "0") {
        Fitm == "";
    }
    else {

        Fitm = MItm;
    }

    $.ajax({
        url: "/SecondsSales/LoadStockItemDetails",
        data: JSON.stringify({ CompId: CompId, unitid: unitid, OrderNo: FOrdNo, Refno: FRefNo, styleid: Fsty, itemgrpid: IgId, Itemid: Fitm, Ordertype: FOType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SItemList = result;

            $.each(SItemList, function (y) {
                if (State == 'Y') {
                    SItemList[y].igst = 0;
                }
                else {
                    SItemList[y].cgst = 0;
                    SItemList[y].sgst = 0;
                }
            });

            loadSktItemTable(SItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadSktItemTable(SItemList) {

    $('#tblStockTranItem').DataTable().destroy();
    debugger;

    var table = $('#tblStockTranItem').DataTable({
        //"order": [[1, "asc"]],
        data: SItemList,
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

             { title: "FabDetid", data: "FabDetid", "visible": false },
              { title: "Fabmasid", data: "Fabmasid", "visible": false },
             { title: "Item", data: "Item", },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },


            { title: "Uom", data: "Uom" },
            { title: "Stock Qty", data: "StockQty" },
             { title: "Sec Qty", data: "SecQty" },
           {
               title: "Sales Qty", data: "SalesQty",
               render: function (data) {

                   return '<input type="text" id="txtTQty" class="calcQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

               },
           },
              {
                  title: "Rate", data: "rate",
                  render: function (data) {

                      return '<input type="text" id="txtTrate" class="txtTrate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                  },
              },

                 {
                     title: "Amount", data: "amount",
                     render: function (data) {

                         return '<input type="text" id="txtTamt" class="txtTamt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';

                     },
                 },

                   {
                       title: "CGST", data: "cgst",
                       render: function (data) {

                           if (State == "Y") {
                               return '<input type="text" id="txtTcgst" class="txtTcgst form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';
                           } else return '<input type="text" id="txtTcgst" class="txtTcgst form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';

                       },
                   },
                     {
                         title: "SGST", data: "sgst",
                         render: function (data) {
                             if (State == "Y") {
                                 return '<input type="text" id="txtTsgst" class="txtTsgst form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';
                             } return '<input type="text" id="txtTsgst" class="txtTsgst form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';

                         },
                     },
                       {
                           title: "IGST", data: "igst",
                           render: function (data) {
                               if (State == "Y") {
                                   return '<input type="text" id="txtTigst" class="txtTigst form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';
                               } else return '<input type="text" id="txtTigst" class="txtTigst form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                           },
                       },
                         {
                             title: "TotTaxAmt", data: "Totaltaxamount",
                             render: function (data) {

                                 return '<input type="text" id="txtTtxamt" class="txtTtxamt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled >';

                             },
                         },
                          { title: "Lot No", data: "Lot_No" },

            { title: "ItemId", data: "Itemid", "visible": false },
             { title: "ColorId", data: "colorid", "visible": false },
             { title: "SizeId", data: "sizeid", "visible": false },
             { title: "UomId", data: "uomid", "visible": false },
              { title: "StockId", data: "Stockid", "visible": false },
        ]
    });

    var table = $('#tblStockTranItem').DataTable();
    $("#tblStockTranItem tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblStockTranItem tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    LoadNetGrossAmt();

}

function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlFOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MOrd = MOrd + "," + foo[i];
    });
}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlFRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        Mref = Mref + "," + foo[i];
    });
}

function mySty(Val) {
    debugger;
    var foo = [];
    MSty = 0;
    $('#ddlFStyle :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MSty = MSty + "," + foo[i];
    });
}

function myItm(Val) {
    debugger;
    var foo = [];
    MItm = 0;
    $('#ddlItem :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MItm = MItm + "," + foo[i];
    });
}
function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,

        columns: [

               { title: "AddlessId", data: "AddLessid", "visible": false },
               { title: "Accounts Head", data: "Addless", },
               { title: "+/-", data: "aorl", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               },

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccList.length; e++) {
        var amount = AccList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }


    $('#txtAccAmt').val(totalamnt.toFixed(3));
    var AccountAmt = $('#txtAccAmt').val();
    var BAmt = $('#txtBTotAmt').val();



    LoadNetGrossAmt();
}

function Getaddlsdet(ID) {
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
            AccList = result.Value;
            loadAccTable(AccList);
            LoadNetGrossAmt();
        }
    });
}

function fnClearAccControls() {
    $('#ddlAcc').val('0').trigger('change');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}

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
    $('#txtAmount').val(Amt);

}

function TotalCalcAmt() {

    if (SItemList.length > 0) {

        $.each(SItemList, function (i) {
            var qty = 0
            var rate = 0;
            var amt = 0;
            var cgstamt = 0;
            var sgstamt = 0;
            var igstamt = 0;
            var tottaxamt = 0;
            var stkid = SItemList[i].Stockid;

            qty = SItemList[i].SalesQty;
            rate = SItemList[i].rate;

            var clamt = parseFloat(qty) * parseFloat(rate);
            amt = parseFloat(clamt).toFixed(Decimalplace);
            SItemList[i].amount = amt;

            var ct = (amt * (SItemList[i].cgst / 100));
            var st = (amt * (SItemList[i].sgst / 100));
            var it = (amt * (SItemList[i].igst / 100));
            var tottx = parseFloat(ct + st + it).toFixed(Decimalplace);

            SItemList[i].Totaltaxamount = tottx;

            var otable = $('#tblStockTranItem').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtTsgst]').each(function (ig) {
                if (odata[ig].Stockid == stkid) {
                    var row = $(this).closest('tr');
                    row.find('#txtTamt').val(amt);
                    row.find('#txtTtxamt').val(tottx);

                }
            });


        });

    }


}

function LoadNetGrossAmt() {
    debugger;
    var TotNetAmt = 0;
    var TotGrossAmt = 0;
    //var DecimalPlace = 0;
    $.each(SItemList, function (i) {
        var InvAmt = parseFloat(SItemList[i].Totaltaxamount) + parseFloat(SItemList[i].amount);
        TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
        //DecimalPlace = ESaveItemList[i].DecimalPlace;
    });
    //if (DecimalPlace > 0) {

    //} else {
    //    DecimalPlace = 2;
    //}
    // var DecimalPlace = 2;

    if (AccList.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].Percentage);
            var PlusOrMinus = AccList[i].aorl;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccList[i].Amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccList[i].Amount);
                minusamt = parseFloat(minusamt) + Amt;
            }

        })

        TotNetAmt = TotGrossAmt;
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;

        TotNetAmt = parseFloat(TotNetAmt).toFixed(Decimalplace);
        $('#txtnetamnt').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(Decimalplace);
        $('#txtnetamnt').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(Decimalplace);
    $('#txtGrossAmount').val(TotGrossAmt);
    //$('#txtTotalAmount').val(TotGrossAmt);

}

function loadexcratebom() {
    debugger;

    var currID = $('#ddlCurrency').val();
    $.ajax({
        url: "/Currency/GetbyID/" + currID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                if (Mode == 0) {
                    $('#txtExchange').val(obj.Exchangerate);
                }
                Decimalplace = obj.Decimalplace;
            }
        }
    });


    TotalCalcAmt();
    LoadNetGrossAmt();
}
function Supplierchange() {

    var Supplierid = $('#ddlSupplier').val();
    GetState();

}

function save() {

    debugger;

     var res = validate();
    if (res == false) {
        return false;
    }


    if (SItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }


    var FOType = $('input[name="FOrder"]:checked').attr('value');

    var opchk = [];
    for (var y = 0; y < SItemList.length; y++) {
        if (SItemList[y].SalesQty > 0) {
            opchk.push(SItemList[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    debugger;
    var oldEntryNo = $('#txtEntryNo').val();

    table = "FABRIC_SALES_MAS",
    column = "Entryno",
    Docum = 'SECONDS SALES',
    compId = $('#ddlFromCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlFromCompany').val();
    }


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
                var msg = 'Entry No has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtEntryNo').val(result.Value);
            }
            var objPurSubmit = {

                Fabmasid: 0,
                Companyid: compId,
                Companyunitid: $('#ddlCompanyUit').val(),
                Supplierid: $('#ddlSupplier').val(),
                Entryno: $('#txtEntryNo').val(),
                EntryDate: $('#txtEntryDate').val(),
                Item_type: $('#ddlItemGroup').val(),
                Remarks: $('#txtRemarks').val(),
                GrossAmt: $('#txtGrossAmount').val(),
                ActGrossamt: $('#txtGrossAmount').val(),
                Addlessamt: 0,
                NetAmt: $('#txtnetamnt').val(),
                currencyid: $('#ddlCurrency').val(),
                exchangerate: $('#txtExchange').val(),
                dcno: $('#txtDcNo').val(),
                shipto: $('#ddlSupplier').val(),
                invtype: FOType,
                Dcdate: $('#txtEntryDate').val(),

                FABRIC_SALES_DET: SItemList,
                FabricSales_AddLess: AccList

            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/SecondsSales/Add",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                   
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'SecondsSales', 'ADD', $("#txtEntryNo").val());
                        //alert("Data Saved Sucessfully");
                        var msg = 'Data Saved Sucessfully...';
                        var flg = 1;
                        var mod = 4;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $('#myModal').modal('hide');
                        ClearData();

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

function LoadTranNoDDL() {

    debugger;

    var FDate = $('#txtMFromDate').val();
    var TDate = $('#txtMToDate').val();
    var cpId = $('#ddlMFromCompany').val();

    if (cpId == null) {
        cpId = DCompid;
    } else {
        cpId = $('#ddlMFromCompany').val();
    }

    var Typ = $('#ddlMType').val();

    $.ajax({
        url: "/SecondsSales/GetTransnoMainLoad",
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, OrderNo: 0, Refno: 0, Styid: 0, masid: 0, compid: cpId, Otype: Typ }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result;

            //JobNo
            $(ddlMTransferNo).empty();
            $(ddlMTransferNo).append($('<option/>').val('0').text('--Select EntryNo--'));
            $.each(data, function () {
                $(ddlMTransferNo).append($('<option></option>').val(this.Fabmasid).text(this.Entryno));
            });
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    debugger;
    LoadMainGrid();
    
}

function LoadMainGrid() {

    debugger;

    var FDate = $('#txtMFromDate').val();
    var TDate = $('#txtMToDate').val();
   
    var TfrID = $('#ddlMTransferNo').val();


    var FOrdNo = "";
    var FONo = $('#ddlMFromOrderNo').val();
    if (FONo == 0) {
        FOrdNo == "";
    }
    else {

        FOrdNo = $("#ddlMFromOrderNo option:selected").text();
    }


    var TOrdNo = "";
    var TONo = $('#ddlMToOrderNo').val();

    if (TONo == 0) {
        TOrdNo == "";
    }
    else {

        TOrdNo = $("#ddlMToOrderNo option:selected").text();
    }

    var FRefNo = "";
    var FRNo = $('#ddlMFromRefNo').val();

    if (FRNo == 0) {
        FRefNo == "";
    }
    else {

        FRefNo = $('select#ddlMFromRefNo option:selected').text();
    }


    var TRefNo = "";
    var TRNo = $('#ddlMStyle').val();

    if (TRNo == 0) {
        TRefNo == "";
    }
    else {

        TRefNo = $('select#ddlMStyle option:selected').val();
    }


    var cpId = $('#ddlMFromCompany').val();

   if (cpId == null) {
       cpId = DCompid;
    } else {
       cpId = $('#ddlMFromCompany').val();
    }

   var Typ = $('#ddlMType').val();

    $.ajax({
        url: "/SecondsSales/GetMainLoad",
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, OrderNo: FOrdNo, Refno: FRefNo, Styid: TRefNo, masid: 0, compid: cpId, Otype: Typ }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblMainStockTransfer tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblMainStockTransfer').DataTable();
                var rows = table.clear().draw();
                $('#tblMainStockTransfer').DataTable().rows.add(dataSet);
                $('#tblMainStockTransfer').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblMainStockTransfer').DataTable({
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
                             { title: "Fabmasid", "visible": false },
                             { title: "Entryno" },
                             { title: "EntryDate" },
                             { title: "Dc No" },
                             { title: "Supplier" },
                                { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblMainStockTransfer').DataTable();

                $('#tblMainStockTransfer tbody').on('click', 'tr', function () {
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

function validate() {
    var isValid = true;

    if ($('#ddlFromCompany').val() == 0) {
        //$('#ddlTocompany').css('border-color', 'Red');
        $('#ddlFromCompany').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlFromCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#txtEntryNo').val().trim() == "") {
        $('#txtEntryNo').css('border-color', 'Red');
        //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#txtEntryNo').css('border-color', 'lightgrey');
        //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
        //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#txtDcNo').val().trim() == "") {
        $('#txtDcNo').css('border-color', 'Red');
        //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#txtDcNo').css('border-color', 'lightgrey');
        //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlSupplier').val() == 0) {
        //$('#ddlFromCompany').css('border-color', 'Red');
        $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    return isValid;
}

function Close() {
    $('#myModal').modal('hide');
    ClearData();
}

function ClearData() {
    $('#ddlFOrderNo').val('0');
    $('#ddlTOrderNo').val('0');
    $('#ddlFStyle').val('0');
    $('#ddlTStyle').val('0');
    $('#ddlFWorkNo').val('0');
    $('#ddlTWorkNo').val('0');
    $('#ddlFRefNo').val('0');
    $('#ddlTRefNo').val('0');
    $('#ddlItemGroup').val('0');
    $('#ddlProcess').val('0');
    $('#ddlFromStore').val('0');
    $('#ddlTostore').val('0');
    var tablesize = $('#tblStockTranItem').DataTable();
    tablesize.clear().draw();
    window.location.reload();
}

function getbyID(Id) {

    Masid = Id;
    Mode = 1;
    $.ajax({
        url: "/SecondsSales/LoadEditMasDetails",
        data: JSON.stringify({ MasId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
              
                $('#ddlFromCompany').val(obj.Companyid).trigger('change');
                $('#txtEntryNo').val(obj.Entryno);
                $('#txtEntryDate').val(moment(obj.EntryDate).format('DD/MM/YYYY'));
                $('#ddlSupplier').val(obj.Supplierid).trigger('change');
                $('#ddlCurrency').val(obj.currencyid).trigger('change');
                $('#txtExchange').val(obj.exchangerate);
                $('#txtDcNo').val(obj.dcno);
                $('#txtRemarks').val(obj.Remarks);
                AccList = obj.FabricSales_AddLess;
                loadAccTable(AccList);
                $('#optB').attr('disabled', true);
                $('#optS').attr('disabled', true);
                $('#optG').attr('disabled', true);
                $('#btnitmload').attr('disabled', true);
                if (obj.invtype == 'B') {
                    $('#optB').prop('checked', true);
                }
                if (obj.invtype == 'S') {
                    $('#optS').prop('checked', true);
                }
                if (obj.invtype == 'G') {
                    $('#optG').prop('checked', true);
                }

                FOType = obj.invtype;
               
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/SecondsSales/LoadEditDetDetails",
        data: JSON.stringify({ MasId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result;
            debugger;
            if (obj != undefined) {
                SItemList = result.Value;
                loadSktItemTable(SItemList);
                $('#myModal').modal('show');
                $('#Update').show();
                $('#Add').hide();
                $('#Delete').hide();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function chkcmpnyid() {
    if (Mode == 0) {
        GenerateNumber();
    }
}

function Update() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (SItemList.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var FOType = $('input[name="FOrder"]:checked').attr('value');

    var opchk = [];
    for (var y = 0; y < SItemList.length; y++) {
        if (SItemList[y].SalesQty > 0) {
            opchk.push(SItemList[y]);
        }
    }
    if (opchk.length == 0) {
        //alert('Please fill atleast any one qty...');
        var msg = 'Please fill atleast any one quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    debugger;
    var oldEntryNo = $('#txtEntryNo').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlFromCompany').val();
    }

            var objPurSubmit = {

                Fabmasid: Masid,
                Companyid: compId,
                Companyunitid: $('#ddlCompanyUit').val(),
                Supplierid: $('#ddlSupplier').val(),
                Entryno: $('#txtEntryNo').val(),
                EntryDate: $('#txtEntryDate').val(),
                Item_type: $('#ddlItemGroup').val(),
                Remarks: $('#txtRemarks').val(),
                GrossAmt: $('#txtGrossAmount').val(),
                ActGrossamt: $('#txtGrossAmount').val(),
                Addlessamt: 0,
                NetAmt: $('#txtnetamnt').val(),
                currencyid: $('#ddlCurrency').val(),
                exchangerate: $('#txtExchange').val(),
                dcno: $('#txtDcNo').val(),
                shipto: $('#ddlSupplier').val(),
                invtype: FOType,
                Dcdate: $('#txtEntryDate').val(),

                FABRIC_SALES_DET: SItemList,
                FabricSales_AddLess: AccList

            };
            debugger;
            $("#Add").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/SecondsSales/Update",
                data: JSON.stringify(objPurSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'SecondsSales', 'UPDATE', $("#txtEntryNo").val());
                        //alert("Data Update Sucessfully");
                        var msg = 'Data Update Successfully...';
                        var flg = 1;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $('#myModal').modal('hide');
                        ClearData();

                    } else {

                        window.location.href = "/Error/Index";

                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
       
}

function Delete() {

    debugger;

    var objPurSubmit = {

        Fabmasid: Masid,
        Companyid: compId,
        Companyunitid: $('#ddlCompanyUit').val(),
        Supplierid: $('#ddlSupplier').val(),
        Entryno: $('#txtEntryNo').val(),
        EntryDate: $('#txtEntryDate').val(),
        Item_type: $('#ddlItemGroup').val(),
        Remarks: $('#txtRemarks').val(),
        GrossAmt: $('#txtGrossAmount').val(),
        ActGrossamt: $('#txtGrossAmount').val(),
        Addlessamt: 0,
        NetAmt: $('#txtnetamnt').val(),
        currencyid: $('#ddlCurrency').val(),
        exchangerate: $('#txtExchange').val(),
        dcno: $('#txtDcNo').val(),
        shipto: $('#ddlSupplier').val(),
        invtype: FOType,
        Dcdate: $('#txtEntryDate').val(),

        FABRIC_SALES_DET: SItemList,
        FabricSales_AddLess: AccList

    };
    debugger;
    $("#Add").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/SecondsSales/Delete",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'SecondsSales', 'Delete', $("#txtEntryNo").val());
                //alert("Data Delete Sucessfully");
                var msg = 'Data Delete Successfully...';
                var flg = 2;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal').modal('hide');
                ClearData();

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

    Masid = Id;
    Mode = 2;
    $.ajax({
        url: "/SecondsSales/LoadEditMasDetails",
        data: JSON.stringify({ MasId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                $('#ddlFromCompany').val(obj.Companyid).trigger('change');
                $('#txtEntryNo').val(obj.Entryno);
                $('#txtEntryDate').val(moment(obj.EntryDate).format('DD/MM/YYYY'));
                $('#ddlSupplier').val(obj.Supplierid).trigger('change');
                $('#ddlCurrency').val(obj.currencyid).trigger('change');
                $('#txtExchange').val(obj.exchangerate);
                $('#txtDcNo').val(obj.dcno);
                $('#txtRemarks').val(obj.Remarks);
                AccList = obj.FabricSales_AddLess;
                loadAccTable(AccList);
                $('#optB').attr('disabled', true);
                $('#optS').attr('disabled', true);
                $('#optG').attr('disabled', true);
                $('#btnitmload').attr('disabled', true);
                if (obj.invtype == 'B') {
                    $('#optB').prop('checked', true);
                }
                if (obj.invtype == 'S') {
                    $('#optS').prop('checked', true);
                }
                if (obj.invtype == 'G') {
                    $('#optG').prop('checked', true);
                }
                FOType = obj.invtype;
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/SecondsSales/LoadEditDetDetails",
        data: JSON.stringify({ MasId: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result;
            debugger;
            if (obj != undefined) {
                SItemList = result.Value;
                loadSktItemTable(SItemList);
                $('#myModal').modal('show');
                $('#Update').hide();
                $('#Add').hide();
                $('#Delete').show();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function GetState() {
    debugger;
    var comId = $('#ddlFromCompany').val();
    var Supid = $('#ddlSupplier').val();
    $.ajax({
        url: "/SecondsSales/LoadStateDetails",
        async: false,
        data: JSON.stringify({ Companyid: comId, Supplierid: Supid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            State = obj.ChkStateid;
            if (SItemList.length > 0) {
                loadSktItemTable(SItemList);
            }
        
        }
    });
}

function StkTransPrint(Id) {
    debugger;
    Rptid = Id;
    //$('#myModal2').modal('show');

    //docname = "STOCK TRANSFER";
    //GenerateReportItem(docname);
    var compid = $('#ddlMFromCompany').val();
    window.open("../ReportInline/Purchase/SecondsSalesInlineReport/SecondsSalesInlineReport.aspx?Masid=" + Rptid + "&Companyid=" + compid);

    //window.open("../ReportInline/Stores/StockTransfer/StockTransferInlineReport.aspx?Masid=" + Id);
    //return true;



}