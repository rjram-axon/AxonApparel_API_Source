var ItemList = [];
var MStyRowID = 0;
var MainFDate = 0;
var Guserid = 0;
var EItemList = [];
var SaveEItemList = [];
var OItemList = [];
var SaveOItemList = [];
var OrderType = "";
var Itemid = 0;
var Colorid = 0;
var Sizeid = 0;


var PurIType = 0;
var OType = 0;
var CmpId = 0;
var CmpUnId = 0;
var IndMasId = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlACompany,#ddlMCompany");
    LoadMultipleItemGroupDDL("#ddlAItemGrp");
    LoadStoreSectionDDL("#ddlStoreSection,#ddlMSection");
    LoadDepartmentDDL("#ddlDepart");
    LoadCompanyUnitDDL("#ddlCompUnit,#ddlMUnit");
    LoadCurrencyDDL("#ddlBCurrency");
    OrderType = "B"
    getDate();


    ListOrRefNo();
    ListIndEmpNo();
    ListIndStatus();
    LoadMainGrid();

    $('#tblIndentEntryItemdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblIndentEntryItemdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblIndentEntryItemdetails').dataTable().fnGetData(row);


        var StRId = data.SNo;//table.row($(this).parents('tr')).data()["StyleRowId"];
        var ItmId = data.Itemid;//table.row($(this).parents('tr')).data()["ItemID"];
        var ClrId = data.Colorid;//table.row($(this).parents('tr')).data()["ColorID"];
        var SzId = data.Sizeid;//table.row($(this).parents('tr')).data()["SizeID"];
        var PUId = data.PurUomid;//table.row($(this).parents('tr')).data()["PurUomId"];

        var colorempty = [];
        colorempty = SaveOItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === ItmId && v.ColorID === ClrId && v.SizeID === SzId && v.PurUomId === PUId);
        });
        OItemList = colorempty;
        loadIndOrderTable(OItemList);
    });

    $(document).on('keyup', '.calcAmt', function () {
        debugger;
        var table = $('#tblIndentEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var CGST = table.row($(this).parents('tr')).data()["CGST"];
        var SGST = table.row($(this).parents('tr')).data()["SGST"];
        var OrdBalQty = table.row($(this).parents('tr')).data()["BalanceQty"];
        var IId = table.row($(this).parents('tr')).data()["Itemid"];
        var CId = table.row($(this).parents('tr')).data()["Colorid"];
        var SId = table.row($(this).parents('tr')).data()["Sizeid"];
        var PUId = table.row($(this).parents('tr')).data()["PurUomid"];

        var Val = $(this).val();
        var Issqty = Val;

        var IQty = 0;
        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }


        var field = Val;
        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {

            $.each(EItemList, function () {
                if (this.SNo == CSno) {
                    this.quantity = 0;
                }
            });
            loadIndentItemTable(EItemList);
            return false;
        }



        var CGSTA = Rate * Val * CGST / 100;
        var SGSTA = Rate * Val * SGST / 100;

        var ratecal = Val;
        var res = ratecal * Rate;

        if (OrderType == "B") {

            if (ratecal > OrdBalQty) {
                alert("OrderQty Should Not Greater then OrderBalanceQty..");


                finalresult = res.toFixed(2);
                $.each(EItemList, function () {
                    if (this.SNo == CSno) {
                        this.Quantity = 0;

                    }
                });

                //loadItemTable(ItemList);
                var tablef = $('#tblIndentEntryItemdetails').DataTable();
                var datas = tablef.rows().data();

                $('input[id=txtAmnt]').each(function (ig) {
                    if (datas[ig].SNo == CSno) {
                        var row = $(this).closest('tr');
                        row.find('#txtQty').val(0);
                    }
                });
                return true;
            }
        }

        finalresult = res.toFixed(2);
        $.each(EItemList, function () {
            if (this.SNo == CSno) {
                this.Quantity = ratecal;
                this.Amt = res;
                this.CGSTAMt = CGSTA;
                this.SGSTAMT = SGSTA;
            }
        });


        var totalamnt = 0;
        for (var e = 0; e < EItemList.length; e++) {
            var amount = EItemList[e].Amt;
            totalamnt = totalamnt + parseFloat(amount);

        }


        //loadItemTable(ItemList);

        var table = $('#tblIndentEntryItemdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtAmnt]').each(function (ig) {
            if (data[ig].SNo == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtQty').val(ratecal);
                row.find('#txtAmnt').val(res);
                row.find('#txtcgstAmnt').val(CGSTA);
                row.find('#txtsgstAmnt').val(SGSTA);

            }
        });


        finalresult = res.toFixed(2);

        var pid = [];
        var bal = [];
        var qty = [];
        for (var t = 0; t < SaveOItemList.length; t++) {
            if (SaveOItemList[t].ItemID == IId && SaveOItemList[t].ColorID == CId && SaveOItemList[t].SizeID == SId) {
                pid.push(SaveOItemList[t].BuyODetId);
                bal.push(SaveOItemList[t].OBQty);
                qty.push(SaveOItemList[t].quantity);
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


        for (var u = 0; u < SaveOItemList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (SaveOItemList[u].BuyODetId == pid[r]) {
                    SaveOItemList[u].quantity = qty[r];
                }
            }
        }

        loadIndOrderTableSave(SaveOItemList);


        for (var u = 0; u < OItemList.length; u++) {
            for (var r = 0; r < pid.length; r++) {
                if (OItemList[u].BuyODetId == pid[r]) {
                    OItemList[u].quantity = qty[r];
                }
            }
        }




        var colorempty = [];
        colorempty = SaveOItemList;

        colorempty = $.grep(colorempty, function (v) {
            return (v.ItemID === IId && v.ColorID === CId && v.SizeID === SId);
        });
        OItemList = [];
        OItemList = colorempty;
        loadIndOrderTable(OItemList);




        ///



        $('#txttotal').val(totalamnt.toFixed(3));
        $('#txtBTotAmt').val(totalamnt.toFixed(3));
        $('#txtGrossAmount').val(totalamnt.toFixed(3));


    });
    $(document).on('keyup', '.txtRate', function () {
        debugger;
        var table = $('#tblIndentEntryItemdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["SNo"];

        var qt = table.row($(this).parents('tr')).data()["quantity"];
        var Val = $(this).val();


        $.each(EItemList, function () {
            if (this.SNo == CSno) {
                this.Rate = Val;
                this.Amt = Val * this.quantity;
            }
        });
        //loadItemTable(ItemList);

        var table = $('#tblIndentEntryItemdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtAmnt]').each(function (ig) {
            if (data[ig].SNo == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtRate').val(Val);
                var q = row.find('#txtQty').val();
                var res = parseFloat(Val * q).toFixed(2);
                row.find('#txtAmnt').val(res);

            }
        });


        var totalamnt = 0;
        for (var e = 0; e < EItemList.length; e++) {
            var amount = EItemList[e].Amt;
            totalamnt = totalamnt + parseFloat(amount);

        }

        $('#txttotal').val(totalamnt.toFixed(3));
        $('#txtBTotAmt').val(totalamnt.toFixed(3));
        $('#txtGrossAmount').val(totalamnt.toFixed(3));
    });
    $(document).on('keyup', '.calcsepquan', function () {
        debugger;

        var table = $('#tblIndEntryOrderdetails').DataTable();

        var pid = table.row($(this).parents('tr')).data()["BuyODetId"];
        var itmid = table.row($(this).parents('tr')).data()["ItemID"];
        var colorid = table.row($(this).parents('tr')).data()["ColorID"];
        var sizeid = table.row($(this).parents('tr')).data()["SizeID"];
        var balq = table.row($(this).parents('tr')).data()["OBQty"];

        var value = $(this).val();
        var Issqty = value;
        $.each(SaveOItemList, function () {
            if (this.BuyODetId == pid) {
                if (balq >= value) {
                    this.quantity = value;
                }
                else {
                    var t = value - balq;
                    this.quantity = balq;
                }

            }
        });

        var OItemList = [];
        OItemList = SaveOItemList;
        OItemList = $.grep(OItemList, function (e) {
            if (e.ItemID == itmid && e.SizeID == sizeid && e.ColorID == colorid) {
                return e;
            }
        });

        var totalamnt = 0;

        for (var e = 0; e < OItemList.length; e++) {
            var amount = OItemList[e].quantity;
            totalamnt = totalamnt + parseFloat(amount);
        }
        $.each(EItemList, function () {
            if (this.Itemid == itmid && this.Sizeid == sizeid && this.Colorid == colorid) {
                //this.quantity = 0;

                this.Quantity = totalamnt;
                this.Amt = parseFloat(totalamnt * this.Rate).toFixed(2);
                //}


            }
        });



        loadIndentItemTable(EItemList);
        loadIndOrderTable(OItemList)
        loadIndOrderTableSave(SaveOItemList);



        var rows = $("#tblIndEntryOrderdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblIndEntryOrderdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 12 }).data()[0];
            $('input[id=txtOQty]').each(function () {
                if (sn == pid && $(this).val() == Issqty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtOQty').val();
                    row.find('#txtOQty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});

function LoadAOrderNo() {


    var ComId = $('#ddlACompany').val();
    var OrdType = $('#ddlAOrdType').val();
    var ItemType = $('#ddlAItemtype').val();


    $.ajax({
        url: "/PurchaseIndent/GetOrderNo",
        data: JSON.stringify({ Companyid: ComId, Purchase_Type: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAOrdNo).empty();
                $(ddlARefno).empty();
                $(ddlAOrdNo).append($('<option/>').val('0').text('--Select Order No--'));
                $(ddlARefno).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(data, function () {
                    $(ddlAOrdNo).append($('<option></option>').val(this.BMasId).text(this.OrdNo));
                });

                $.each(data, function () {
                    $(ddlARefno).append($('<option></option>').text(this.RefNo));
                });

            }
        }

    });

}

function LoadABuyer() {


    var ComId = $('#ddlACompany').val();
    var OrdType = $('#ddlAOrdType').val();
    var ItemType = $('#ddlAItemtype').val();


    $.ajax({
        url: "/PurchaseIndent/GetBuyer",
        data: JSON.stringify({ Companyid: ComId, Purchase_Type: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlABuyer).empty();
                $(ddlABuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(data, function () {
                    $(ddlABuyer).append($('<option></option>').val(this.BuyerId).text(this.Buyer));
                });


            }
        }

    });

}
function LoadAWorkOrdNo() {


    var ComId = $('#ddlACompany').val();
    var OrdType = $('#ddlAOrdType').val();
    var ItemType = $('#ddlAItemtype').val();


    $.ajax({
        url: "/PurchaseIndent/GetWorkNo",
        data: JSON.stringify({ Companyid: ComId, Purchase_Type: OrdType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlAWrkOrdNo).empty();
                $(ddlAWrkOrdNo).append($('<option/>').val('0').text('--Select Job No--'));
                $.each(data, function () {
                    $(ddlAWrkOrdNo).append($('<option></option>').val(this.JobId).text(this.JobNo));
                });

            }
        }

    });

}

function LoadDetails() {



    LoadAItemLoadGrid();
}


function LoadAItemLoadGrid() {
    debugger;
    var CompId = $('#ddlACompany').val();
    var BuyId = $('#ddlABuyer').val();


    var OrdNo = "";
    var ONo = $('select#ddlAOrdNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrdNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefno option:selected').val();
    }

    var WorkNo = "";
    var WNo = $('select#ddlAWrkOrdNo option:selected').val();

    if (WNo == 0) {
        WorkNo == "";
    }
    else {

        WorkNo = $('select#ddlAWrkOrdNo option:selected').val();
    }


    var OrdType = "";
    var Otp = $('select#ddlAOrdType option:selected').val();

    if (Otp == 0) {
        OrdType == "";
    }
    else {

        OrdType = $('select#ddlAOrdType option:selected').val();
    }


    var ItmType = "";
    var Itp = $('select#ddlAItemtype option:selected').val();

    if (Itp == 0) {
        ItmType == "";
    }
    else {

        ItmType = $('select#ddlAItemtype option:selected').val();
    }


    $.ajax({
        url: "/PurchaseIndent/LoadDetails",
        data: JSON.stringify({ companyid: CompId, BuyerId: BuyId, OrdNo: OrdNo, RefNo: RefNo, JobNo: WorkNo, Purchase_Type: OrdType, Purchase_itemType: ItmType }),
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

    $('#tblAItemDetails').DataTable().destroy();
    debugger;

    $('#tblAItemDetails').DataTable({
         "order": [[1, "asc"]],
        data: ItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

            { title: "StyleRowID", data: "StyleRowId", "visible": false },
            { title: "Order No", data: "OrdNo" },
            {
                title: "Order Date", data: "OrderDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Ref No", data: "RefNo" },
            { title: "Buyer", data: "Buyer" },
            { title: "Style", data: "Style" },
              { title: "Work Order No", data: "JobNo" },
            {
                title: "Include", data: "StyleRowId",
                //render: function (data) {

                //    return '<input type="checkbox" class="case" name="case[]" value="1" onclick="myfunc(this);"/>';

                //},
                title: "Include", data: "StyleRowId",
                render: function (data) {

                    return '<input type="checkbox" id="txtStyleRowId" class="editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },
        ]
    });
}

function myfunc(Val) {

    MStyRowID = MStyRowID + "," + Val;

}

function ClearTextbox() {
    LoadAOrderNo();
    LoadAWorkOrdNo();
    LoadABuyer();
    LoadAItemLoadGrid();
}


function LoadIndStyRowId() {

    MStyRowID;



    var Comp = $('select#ddlACompany option:selected').text();
    //var Unit = $('select#ddlAPUnit option:selected').text();


    var CompId = $('#ddlACompany').val();
    var AOrdType = $('#ddlAOrdType').val();

    if (CompId == 0) {
        alert("Please Select Company then Proceed...");
        return true;
    }

    if (AOrdType == 0) {
        alert("Please Select Any One Order Type then Proceed...");
        return true;
    }

    $('#txtCompany').val(Comp);
    //$('#txtUnit').val(Unit);

    GenerateNumber();
    LoadIndentItemDetails(MStyRowID);
    LoadIndentOrderSaveDetails(MStyRowID);
    var ItmId = 0;
    var ClrId = 0;
    var SzId = 0;
    var UomId = 0;
    var Qty = 0;

    $('#myModal').modal('hide');
    $('#myModal2').modal('show');

}

function Close() {
    $('#myModal2').modal('hide');
}
function AClose() {
    cleartext();
    $('#myModal').modal('hide');
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

    $('#txtEntryDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    var OType = $('#ddlAOrdType').val();
    var ItemType = $('select#ddlAItemtype option:selected').text();
    var PType = "";
    if (ItemType == "YARN") {
        PType = "Y";
    } else if (ItemType == "ACCESSORY") {
        PType = "A";
    } else {
        PType = "L";
    }

    if (OType == 'B' && PType == 'L') {
        table = "Indent_Mas",
        column = "IndentNo",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE ORDER INDENT'
    }
    else if (OType == 'B' && PType == 'Y') {
        table = "Indent_Mas",
        column = "IndentNo",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE ORDER INDENT - YARN'
    } else if (OType == 'B' && PType == 'A') {
        table = "Indent_Mas",
        column = "IndentNo",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE ORDER INDENT - ACCESSORY'
    } if (OType == 'S' && PType == 'L') {
        table = "Indent_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE INDENT SAMPLE'
    }
    else if (OType == 'S' && PType == 'A') {
        table = "Indent_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE INDENT SAMPLE - ACCESSORY'
    } else if (OType == 'S' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE INDENT SAMPLE - YARN'
    } else if (OType == 'G' && PType == 'A') {
        table = "Indent_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE INDENT GENERAL - ACCESSORY'
    } else if (OType == 'G' && PType == 'Y') {
        table = "Stores_Issue_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE INDENT GENERAL - YARN'
    } else if (OType == 'G' && PType == 'L') {
        table = "Indent_Mas",
        column = "Issueno",
        compId = $('#ddlACompany').val();
        Docum = 'PURCHASE INDENT GENERAL'
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtIntentNo').val(result.Value);
        }
    });
}

function LoadIndentItemDetails(MStyRowID) {
    debugger;


    var OType = $('#ddlAOrdType').val();
    var ItemType = $('select#ddlAItemtype option:selected').text();
    var PType = "";
    if (ItemType == "YARN") {
        PType = "Y";
    } else if (ItemType == "ACCESSORY") {
        PType = "A";
    }
    else if (ItemType == "FABRIC") {
        PType = "Y";
    } else {
        PType = "L";
    }



    if (OType != 'G') {
        $.ajax({
            url: "/PurchaseIndent/LoadIndentItemDetails",
            data: JSON.stringify({ StyleRowId: MStyRowID, Purchase_Type: OType, Purchase_itemType: PType }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                EItemList = result;
                loadIndentItemTable(EItemList);
                if (EItemList.length > 0) {
                    Itemid = EItemList[0].Itemid;
                    Colorid = EItemList[0].Colorid;
                    Sizeid = EItemList[0].Sizeid;
                }

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}
function loadIndentItemTable(EItemList) {

    $('#tblIndentEntryItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblIndentEntryItemdetails').DataTable({
        "order": [[1, "asc"]],
        data: EItemList,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "IndentDetId", data: "Indentdetid", "visible": false },
            { title: "SNo", data: "SNo" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Pur Unit", data: "Unit", "visible": false },
            { title: "Ord Bal", data: "BalanceQty" },
            {
                title: "Qty", data: "Quantity",
                render: function (data) {
                    return '<input type="text" id="txtQty" class="calcAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "Sec_Qty",
                render: function (data) {

                    return '<input type="text" id="txtSQty" class="txtSQty form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                },
            },
             { title: "AppRate", data: "AppRate", "visible": false },
              {
                  title: "Rate", data: "Rate",
                  render: function (data) {

                      return '<input type="text" id="txtRate" class="txtRate form-control" style="width: 50px;text-align: center;"  value=' + data + '>';

                  },
              },
             {
                 title: "Amt", data: "Amt",
                 render: function (data) {

                     return '<input type="text" id="txtAmnt" class="txtAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                 },
             },
             { title: "Itemid", data: "Itemid", "visible": false },
             { title: "Colorid", data: "Colorid", "visible": false },
             { title: "Sizeid", data: "Sizeid", "visible": false },
             { title: "PurUomId", data: "PurUomid", "visible": false },
             { title: "BaseUnitId", data: "BaseUomid", "visible": false },

             { title: "Cgst", data: "CGST", "visible": false },
             { title: "Sgst", data: "SGST", "visible": false },
             { title: "Igst", data: "IGST", "visible": false },
             { title: "HCode", data: "HSNCODE" },
             {
                 title: "Cgst Amt", data: "CGSTAMt",
                 render: function (data) {

                     return '<input type="label" id="txtcgstAmnt" class="txtcgstAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                 },
             },
             {
                 title: "Sgst Amt", data: "SGSTAMT",
                 render: function (data) {

                     return '<input type="label" id="txtsgstAmnt" class="txtsgstAmnt form-control" style="width: 50px;text-align: center;" disabled value=' + data + '>';

                 },
             },
              { title: "Igst Amt", data: "IGSTAMT" },
              {
                  title: "Remarks", data: "ItemRemark",
                  render: function (data) {
                      return '<input type="text" id="txtremarks" class="remarks form-control"  style="width: 50px;text-align: left;"  value=' + data + ' >';
                  },
              },
                 {
                     title: "ACTION", "mDataProp": null,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitemedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnItemremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
                 },
        ]
    });
    //var totalamnt = 0;
    //for (var e = 0; e < ItemList.length; e++) {
    //    var amount = ItemList[e].Amt;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}


    //$('#txttotal').val(totalamnt.toFixed(3));
    //$('#txtGrossAmount').val(totalamnt.toFixed(3));
    //$('#txtBTotAmt').val(totalamnt.toFixed(3));
    //GrossAmt = $('#txttotal').val();
    //ANAmt = $('#txtAccAmt').val();
    //var FNAmt = parseFloat(GrossAmt) + parseFloat(ANAmt);

    //$('#txtNetAmt').val(FNAmt);


    var table = $('#tblIndentEntryItemdetails').DataTable();
    $("#tblIndentEntryItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblIndentEntryItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}


function LoadIndentOrderSaveDetails(SRowId) {
    debugger;

    var ItmId = 0;
    var ClrId = 0;
    var SizeId = 0;
    var PUomId = 0;
    var OQty = 0;
    var OType = $('#ddlAOrdType').val();

    $.ajax({
        url: "/PurchaseIndent/LoadIndentOrderDetails",
        data: JSON.stringify({ StyleRowId: SRowId, ItemID: ItmId, ColorID: ClrId, SizeID: SizeId, PurUomId: PUomId, quantity: OQty, Purchase_Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            SaveOItemList = result;
            loadIndOrderTableSave(SaveOItemList);
            if (SaveOItemList.length > 0) {
                var colorempty = [];
                OItemList = SaveOItemList;

                OItemList = $.grep(OItemList, function (v) {
                    return (v.ItemID === Itemid && v.ColorID === Colorid && v.SizeID === Sizeid);
                });

                loadIndOrderTable(OItemList);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadIndOrderTableSave(SaveOItemList) {
    debugger;
    $('#tblIndEntryOrderdetailsSave').DataTable().destroy();

    var table = $('#tblIndEntryOrderdetailsSave').DataTable({
        data: SaveOItemList,
        columns: [

            { title: "IndOrdJobId", data: "Indent_BuyJobid" },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "ORefNo" },
            { title: "Style", data: "OStyle" },
            { title: "Bom Qty", data: "BomQty" },
            { title: "Ord Bal", data: "OBQty" },
            { title: "Order Qty", data: "quantity" },
             { title: "Itemid", data: "ItemID" },
             { title: "Colorid", data: "ColorID" },
             { title: "Sizeid", data: "SizeID" },
             { title: "PurUomId", data: "PurUomId" },
             { title: "StyleId", data: "Styleid" },
            { title: "Buy_Ord_BOMDetid", data: "BuyODetId" }
        ]
    });
}


function loadIndOrderTable(OItemList) {
    debugger;
    $('#tblIndEntryOrderdetails').DataTable().destroy();

    var table = $('#tblIndEntryOrderdetails').DataTable({
        data: OItemList,
        columns: [

            { title: "IndOrdJobId", data: "Indent_BuyJobid", "visible": false },
            { title: "Order No", data: "OrderNo" },
            { title: "Ref No", data: "ORefNo" },
            { title: "Style", data: "OStyle" },
            { title: "Bom Qty", data: "BomQty" },
            { title: "Ord Bal", data: "OBQty" },
            {
                title: "Order Qty", data: "quantity",
                render: function (data) {

                    return '<input type="text" id="txtOQty" class="calcsepquan form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                },
            },
             { title: "Itemid", data: "ItemID", "visible": false },
             { title: "Colorid", data: "ColorID", "visible": false },
             { title: "Sizeid", data: "SizeID", "visible": false },
             { title: "PurUomId", data: "PurUomId", "visible": false },
             { title: "StyleId", data: "Styleid", "visible": false },
            { title: "Buy_Ord_BOMDetid", data: "BuyODetId", "visible": false }
        ]
    });
}

function save() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (EItemList.length == 0) {
        alert("Please Enter the Item Details..");
        return true;
    }

    var PType = $('input[name="Order"]:checked').attr('value');

    var OType = $('#ddlAOrdType').val();
    var ItemType = $('select#ddlAItemtype option:selected').text();
    var IType = "";
    if (ItemType == "YARN") {
        IType = "YN";
    } else if (ItemType == "ACCESSORY") {
        IType = "AC";
    } else {
        IType = "";
    }

    var ComId = $('#ddlACompany').val();
    var OrdType = $('#ddlAOrdType').val();

    var objPurIndSubmit = {

        Companyid: ComId,
        Company_unitid: $('#ddlCompUnit').val(),
        IndentNo: $('#txtIntentNo').val(),
        IndentDate: $('#txtEntryDate').val(),
        CurrencyId: $('#ddlBCurrency').val(),
        Purchase_Type: OType,
        Purchase_itemType: IType,
        Remarks: $('#txtRemark').val(),
        Closed: "N",
        Cancel: "N",
        Approved: "N",
        EmployeeId: Guserid,
        Departmentid: $('#ddlDepart').val(),
        SectionID: $('#ddlStoreSection').val(),
        IndentType: PType,
        PurIndDet: EItemList,
        PurIndOrder: SaveOItemList
    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/PurchaseIndent/Add",
        data: JSON.stringify(objPurIndSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                //var Mod = "R"
                //var MasId = 0;
                alert("Data Saved Sucessfully");
                $('#myModal2').modal('hide');
                var tablesize = $('#tblAItemDetails').DataTable();
                tablesize.clear().draw();
                window.location.reload();
                // window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

            } else {

                window.location.href = "/Error/Index";


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

    if ($('#ddlCompUnit').val() == 0) {
        $('#ddlCompUnit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompUnit').css('border-color', 'lightgrey');
    }
    if ($('#ddlDepart').val() == 0) {
        $('#ddlDepart').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlDepart').css('border-color', 'lightgrey');
    }
    if ($('#ddlStoreSection').val() == 0) {
        $('#ddlStoreSection').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlStoreSection').css('border-color', 'lightgrey');
    }

    return isValid;
}

function cleartext() {
    $('#ddlACompany').val('0');
    $('#ddlAOrdType').val('0');
    $('#ddlDepart').val('0');
    $('#ddlStoreSection').val('0');
    $('#ddlCompUnit').val('0');
    $('#txtRemark').val('');
}


function ListOrRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="ddlMOrderType"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();
    $.ajax({
        url: "/PurchaseIndentApproval/GetMIOrderRefNo",
        data: JSON.stringify({ Companyid: CompId, Purchase_Type: OType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMOrderno).empty();
                $(ddlMRefno).empty();


                //OrdNo
                $(ddlMOrderno).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(data, function () {
                    $(ddlMOrderno).append($('<option></option>').text(this.OrdNo));
                });
                //RefNo
                $(ddlMRefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefno).append($('<option></option>').text(this.RefNo));
                });


            }
        }

    });
}

function ListIndEmpNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="ddlMOrderType"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();
    $.ajax({
        url: "/PurchaseIndentApproval/GetMIIndentNo",
        data: JSON.stringify({ Companyid: CompId, Purchase_Type: OType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMIndentno).empty();
                $(ddlMcreatedby).empty();


                //OrdNo
                $(ddlMIndentno).append($('<option/>').val('0').text('--Select Indent No--'));
                $.each(data, function () {
                    $(ddlMIndentno).append($('<option></option>').text(this.IndentNo));
                });
                //RefNo
                $(ddlMcreatedby).append($('<option/>').val('0').text('--Select Employee--'));
                $.each(data, function () {
                    $(ddlMcreatedby).append($('<option></option>').text(this.Employee));
                });


            }
        }

    });
}

function ListIndStatus() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="ddlMOrderType"]:checked').attr('value');
    var CompId = $('#ddlMCompany').val();
    $.ajax({
        url: "/PurchaseIndentApproval/GetMIStatus",
        data: JSON.stringify({ Companyid: CompId,Purchase_Type: OType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMStatus).empty();

                //Status
                $(ddlMStatus).append($('<option/>').val('0').text('--Select Status--'));
                $.each(data, function () {
                    $(ddlMStatus).append($('<option></option>').text(this.Status));
                });



            }
        }

    });
}

function List() {
    $('#tblitmmaingrid').DataTable().destroy();
    LoadMainGrid();
}

function RadioMLClick() {
    $('#tblitmmaingrid').DataTable().destroy();
    LoadMainGrid();
}

function LoadMainGrid() {

    debugger;

    var OrdNo = "";
    var ONo = $('select#ddlMOrderno option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderno option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefno option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    var SecId = $('#ddlMSection').val();
    var UnitId = $('#ddlMUnit').val();
    var IndId = $('#ddlMIndentno').val();
    var EmpId = $('#ddlMcreatedby').val();
    var OType = $('#ddlMOrderType').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var AType = $('input[name="MStatus"]:checked').attr('value');


    $.ajax({
        url: "/PurchaseIndentApproval/GetPurIndMainAppDetails",
        data: JSON.stringify({ OrdNo: OrdNo, RefNo: RefNo, Company_unitid: UnitId, Companyid: CompId, SectionID: SecId, EmployeeId: EmpId, IndentMasid: IndId, Purchase_Type: OType, FrmDate: FDate, ToDate: TDate, AppType: AType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblitmmaingrid').DataTable({
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
                         { title: "IndMasId", "visible": false },
                         { title: "Company Unit" },
                         { title: "Section" },
                         { title: "Indent No" },
                         { title: "Date" },
                         { title: "Created By" },                      
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tblitmmaingrid').DataTable();

                $('#tblitmmaingrid tbody').on('click', 'tr', function () {
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


function getbyAddID(Id) {

    
    //LoadEmployeeDDL("#ddlRequestner");
    //LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/PurchaseIndentApproval/LoadEditIndDetails",
        data: JSON.stringify({ IndentMasid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtIntentNo').val(obj[0]["IndentNo"]);
                $('#txtEntryDate').val(moment(obj[0]["IndentDate"]).format('DD/MM/YYYY'));
                $('#ddlDepart').val(obj[0]["Departmentid"]);
                $('#ddlCompUnit').val(obj[0]["Company_unitid"]);
                $('#ddlStoreSection').val(obj[0]["SectionID"]);
                $('#txtRemark').val(obj[0]["Remarks"]);

                 PurIType = obj[0]["Purchase_itemType"];
                 OType = obj[0]["Purchase_Type"];        
                 CmpId = obj[0]["Companyid"];
                 CmpUnId = obj[0]["Company_unitid"];
                 IndMasId = obj[0]["IndentMasid"];
                 IndType = obj[0]["IndentType"];

                LoadIndItemDetailsEdit(Id, OType, CmpId);

                     

                $('#myModal').modal('hide');
                $('#myModal2').modal('show');
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

function LoadIndItemDetailsEdit(Id, OType, CmpId) {
    debugger;

    $.ajax({
        url: "/PurchaseIndentApproval/LoadItemEditDetailsInd",
        data: JSON.stringify({ IndentMasid: Id, Purchase_Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            EItemList = result;
            loadIndentItemTable(EItemList);

            var ItmId = 0;// EItemList[0].Itemid;
            var ClrId = 0;// EItemList[0].Colorid;
            var SzId = 0;// EItemList[0].Sizeid;
            var PUId = 0;//EItemList[0].Uomid;

            var Itemid = EItemList[0].Itemid;
            var Colorid = EItemList[0].Colorid;
            var Sizeid = EItemList[0].Sizeid;

        
            LoadEditIndOrderDetails(Id, ItmId, ClrId, SzId, PUId, OType);
           
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditIndOrderDetails(Id, ItmId, ClrId, SzId, PUId, OType) {
    debugger;

    $.ajax({
        url: "/PurchaseIndentApproval/LoadOrderEditDetailsInd",
        data: JSON.stringify({ IndentMasid: Id, OItemid: ItmId, OColorid: ClrId, OSizeid: SzId, OUomid: PUId, Purchase_Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            SaveOItemList = result;
            loadIndOrderTableSave(SaveOItemList);

            var ctry = [];
            ctry = SaveOItemList;
            ctry = $.grep(ctry, function (e) {
                return e.OItemid == Itemid && e.OColorid == Colorid && e.OSizeid == Sizeid;
            });
            OItemList = ctry;
            loadIndOrderTable(OItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function IndApproval() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (EItemList.length == 0) {
        alert("Please Enter the Item Details..");
        return true;
    }


    var ComId = $('#ddlACompany').val();
    var OrdType = $('#ddlAOrdType').val();

    var objPurIndSubmit = {

        Companyid: CmpId,
        IndentMasid:IndMasId,
        Company_unitid: $('#ddlCompUnit').val(),
        IndentNo: $('#txtIntentNo').val(),
        IndentDate: $('#txtEntryDate').val(),
        CurrencyId: $('#ddlBCurrency').val(),
        Purchase_Type: OType,
        Purchase_itemType: PurIType,
        Remarks: $('#txtRemark').val(),
        Closed: "N",
        Cancel: "N",
        Approved: "Y",
        EmployeeId: Guserid,
        Departmentid: $('#ddlDepart').val(),
        SectionID: $('#ddlStoreSection').val(),
        IndentType: IndType,
        PurIndDet: EItemList,
        PurIndOrder: SaveOItemList
    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/PurchaseIndentApproval/Approval",
        data: JSON.stringify(objPurIndSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                //var Mod = "R"
                //var MasId = 0;
                alert("Data Approved Sucessfully");
                $('#myModal2').modal('hide');
                var tablesize = $('#tblAItemDetails').DataTable();
                tablesize.clear().draw();
                window.location.reload();
                // window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function getbyEditID(Id) {


    //LoadEmployeeDDL("#ddlRequestner");
    //LoadDepartmentDDL("#ddlDepartment");
    $.ajax({
        url: "/PurchaseIndentApproval/LoadEditIndDetails",
        data: JSON.stringify({ IndentMasid: Id }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtIntentNo').val(obj[0]["IndentNo"]);
                $('#txtEntryDate').val(moment(obj[0]["IndentDate"]).format('DD/MM/YYYY'));
                $('#ddlDepart').val(obj[0]["Departmentid"]);
                $('#ddlCompUnit').val(obj[0]["Company_unitid"]);
                $('#ddlStoreSection').val(obj[0]["SectionID"]);
                $('#txtRemark').val(obj[0]["Remarks"]);

                PurIType = obj[0]["Purchase_itemType"];
                OType = obj[0]["Purchase_Type"];
                CmpId = obj[0]["Companyid"];
                CmpUnId = obj[0]["Company_unitid"];
                IndMasId = obj[0]["IndentMasid"];
                IndType = obj[0]["IndentType"];

                LoadIndItemDetailsEdit(Id, OType, CmpId);



                $('#myModal').modal('hide');
                $('#myModal2').modal('show');
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

function IndRevert() {

    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    if (EItemList.length == 0) {
        alert("Please Enter the Item Details..");
        return true;
    }



    var objPurIndSubmit = {

        Companyid: CmpId,
        IndentMasid: IndMasId,
        Company_unitid: $('#ddlCompUnit').val(),
        IndentNo: $('#txtIntentNo').val(),
        IndentDate: $('#txtEntryDate').val(),
        CurrencyId: $('#ddlBCurrency').val(),
        Purchase_Type: OType,
        Purchase_itemType: PurIType,
        Remarks: $('#txtRemark').val(),
        Closed: "N",
        Cancel: "N",
        Approved: "N",
        EmployeeId: Guserid,
        Departmentid: $('#ddlDepart').val(),
        SectionID: $('#ddlStoreSection').val(),
        IndentType: IndType,
        PurIndDet: EItemList,
        PurIndOrder: SaveOItemList
    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/PurchaseIndentApproval/Revert",
        data: JSON.stringify(objPurIndSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

              
                alert("Data Revert Sucessfully");
                $('#myModal2').modal('hide');
                var tablesize = $('#tblAItemDetails').DataTable();
                tablesize.clear().draw();
                window.location.reload();
               

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}