var MainFDate = 0;
var CompanyId = 0;
var Mode = 0;
var bid = 0;
var ItmList = [];
var QltyList = [];
var masid = 0;
var Qltytype = "RCPT";
var header = [];
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var DCompid = 0;
var validatestore = "False";
var admod = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    LoadRefNoDDL("#ddlrefno");
    LoadOrderNoDDL("#ddlOrdno");
    LoadBuyerDDL("#ddlBuyer");
    LoadStyleDDL("#ddlStyle");
    LoginUserid = $("#hdnLoginUserid").data('value');
    validatestore = $("#hdnValidateStore").data('value');

    ddlmain();
    LoadMaingrid();
   
    $(document).on('keyup', '.calcRecdqty', function () {
        debugger;
        var table = $('#tblcompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["buyordbomdetid"];
        var bal = table.row($(this).parents('tr')).data()["Balqty"];

        var val = $(this).val();

        if (val > bal) {
            //alert('Should not exceed Bal.Qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(ItmList, function () {
                if (this.buyordbomdetid == CSno) {
                    this.RecvdQuantity = 0;

                }
            });

            LoadItmtab(ItmList);
            return true;
        }

        $.each(ItmList, function () {
            if (this.buyordbomdetid == CSno) {
                this.RecvdQuantity = val;

            }
        });

        //LoadItmtab(ItmList);

        //Datatable textbox focus
        var rows = $("#tblcompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblcompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrecvdqty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrecvdqty').val();
                    row.find('#txtrecvdqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcsecqty', function () {
        debugger;
        var table = $('#tblcompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["buyordbomdetid"];



        var val = $(this).val();


        $.each(ItmList, function () {
            if (this.buyordbomdetid == CSno) {
                this.SecQty = val;

            }
        });

        //LoadItmtab(ItmList);

        //Datatable textbox focus
        var rows = $("#tblcompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblcompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtsecqty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtsecqty').val();
                    row.find('#txtsecqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.calcaccqty', function () {
        debugger;
        var table = $('#tblqlcompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["buyordbomdetid"];
        var bal = table.row($(this).parents('tr')).data()["Balqty"];
        var rej = table.row($(this).parents('tr')).data()["RejectedQty"];
        var val = $(this).val();


        var tot = parseFloat(val) + parseFloat(rej);
        if (tot > bal) {
            //alert('Should not exceed Bal.Qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(QltyList, function () {
                if (this.buyordbomdetid == CSno) {
                    this.AcceptQty = 0;

                }
            });

            LoadQltytab(QltyList);
            return true;
        }


        $.each(QltyList, function () {
            if (this.buyordbomdetid == CSno) {
                this.AcceptQty = val;

            }
        });

        //LoadItmtab(ItmList);

        //Datatable textbox focus
        var rows = $("#tblqlcompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblqlcompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtaccqty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtaccqty').val();
                    row.find('#txtaccqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });


    $(document).on('keyup', '.calcRejtqty', function () {
        debugger;
        var table = $('#tblqlcompdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["buyordbomdetid"];
        var bal = table.row($(this).parents('tr')).data()["Balqty"];
        var rej = table.row($(this).parents('tr')).data()["AcceptQty"];
        var val = $(this).val();

        
        var tot = parseFloat(val) + parseFloat(rej);
        if (tot > bal) {
            //alert('Should not exceed Bal.Qty...');
            var msg = 'Should not exceed Balance quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $.each(QltyList, function () {
                if (this.buyordbomdetid == CSno) {
                    this.RejectedQty = 0;

                }
            });

            LoadQltytab(QltyList);
            return true;
        }


        $.each(QltyList, function () {
            if (this.buyordbomdetid == CSno) {
                this.RejectedQty = val;

            }
        });

        //LoadItmtab(ItmList);

        //Datatable textbox focus
        var rows = $("#tblqlcompdetails").dataTable().fnGetNodes();
        var dtTable = $('#tblqlcompdetails').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrejtvdqty]').each(function () {
                if (sn == CSno && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrejtvdqty').val();
                    row.find('#txtrejtvdqty').focus().val('').val(num);
                    return true;
                }
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
    // $('#txtFromDate').val(date);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#txtDate').val(Fdatestring);
}

function chkcmpnyid() {
    debugger;
    if (Mode == 0) {
        CompanyId = $('select#ddlCompany option:selected').val();

        if (CompanyId == 0) {
            CompanyId = DCompid;
        }

        if (CompanyId == 0) {
            //alert('Select Company...');
            var msg = 'Please Select Company...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        else {
            GenerateNumber();
        }

        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

    }

}

function GenerateNumber() {
    debugger;
    table = "CSPReceiptMas",
    column = "ReceiptNo",
    compId = CompanyId,
    Docum = 'CSP RECEIPTS'

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

function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
    //LoadCompanyUnitDDL("#ddlPUnit");
    //LoadStoreUnitDDL("#ddlSecStore");
    //LoadWorkdivisionDDL("#ddlWK");
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
   // LoadStoreUnitDDL("#ddlMSMMainStore");
    //LoadCompanyDDL("#ddlMSCompany");
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //LoadCompanyDDL("#ddlSCompany");
    //LoadStoreUnitDDL("#ddlSMainStore");
}

function ClearTextbox() {
    debugger;
    $('#ddlCompany').val("0");
    $('#ddlrefno').val("0");
    $('#ddlOrdno').val("0");
    $('#ddlBuyer').val("0");
    $('#ddlStyle').val("0");
    $('#txtremarks').val("");
    ItmList = [];
    LoadItmtab(ItmList);
    chkcmpnyid();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#btnDel').hide();
    admod = 0;

    var type = $('input[name="MSType"]:checked').attr('value');
    if (type == 'M') {
        LoadMainStore();
    }
    if (type == 'S') {
        LoadSubStore();
    }
    if (type == 'E') {
        LoadSecStore();
    }
}

function AddQltyID(id) {
    debugger;
    masid = id;

    $('#ddlQlCompany').val("");
    $('#ddlqlrefno').val("");
    $('#ddlQlOrdno').val("");
    $('#ddlQlBuyer').val("");
    $('#ddlQlStyle').val("");
    $('#txtremarks').val("");
   
    $('#myModal1').show();
    $('#myModal1').modal('show');
    $('#btnqlAdd').show();
    $('#btnqlUpdate').hide();
    $('#btnqlDel').hide();

    GetQltyHeaderdet();
    
}


function backtomain() {
    $('#myModal').hide();
    $('#myModal').modal('hide');

    $('#myModal1').hide();
    $('#myModal1').modal('hide');
}


function GetQltyHeaderdet() {
    debugger;
    $.ajax({
        url: "/CSPReceipt/GetQltyAddlist",
        data: JSON.stringify({ masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnqlUpdate').hide();
            $('#btnqlDel').hide();
            $('#btnqlAdd').show();
          
            var obj = result.Value;
            header = result.Value;
            $('#txqltDate').val(moment(obj[0].ReceiptDate).format("DD/MM/YYYY"));
            $('#ddlQlCompany').val(obj[0].company);
            $('#ddlQlBuyer').val(obj[0].buyer);
            $('#ddlQlStyle').val(obj[0].style);
            $('#ddlQlOrdno').val(obj[0].OrderNo);
            $('#ddlqlrefno').val(obj[0].RefNo);
          
         
            $('#txtqlentryno').val(obj[0].ReceiptNo);
            $('#txtqlcsprefno').val(obj[0].DCNo);
            $('#txtqlremarks').val(obj[0].Remarks);



            GetQltydet(masid);
        }
    });
}

function GetQltydet(masid) {
    debugger;
    $.ajax({
        url: "/CSPReceipt/GetQltyAdddetlist",
        data: JSON.stringify({ masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            QltyList = result.Value;

            LoadQltytab(QltyList);
        }
    });
}

function loadaddlist() {
    debugger;

    var CompId = $('#ddlCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var style = $('#ddlStyle').val();
    if (style == null || style == "0") {
        style = 0;
    }

    var ord = $('select#ddlOrdno option:selected').text();//$('#ddlOrdno').text();
    if (ord == null || ord == "0") {
        ord = 0;
    }
    $.ajax({
        url: "/CSPReceipt/GetAddlist",
        data: JSON.stringify({ ordno: ord, styleid: style, cmpid: CompId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItmList = result.Value;

            LoadItmtab(ItmList);
        }
    });
   

}

function LoadItmtab(list) {
    $('#tblcompdetails').DataTable().destroy();

    $('#tblcompdetails').DataTable({
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
                   { title: "Sno", data: "buyordbomdetid", "visible": false },
                    { title: "Itemid", data: "Itemid", "visible": false },
                    { title: "Item", data: "item" },
                   { title: "Category-1", data: "color" },
                   { title: "Category-2", data: "size" },

                   { title: "Bal.Qty", data: "Balqty" },
                   { title: "Uom", data: "uom" },
                   {
                       title: "Received", data: "RecvdQuantity",
                       render: function (data) {

                           return '<input type="text" id="txtrecvdqty" class="calcRecdqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },

                    {
                        title: "Sec.Qty", data: "SecQty",
                        render: function (data) {

                            return '<input type="text" id="txtsecqty" class="calcsecqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                        },
                    },
                   { title: "Sec.Uom", data: "secuom" },


        ]

    });
}



function LoadQltytab(list) {
    $('#tblqlcompdetails').DataTable().destroy();

    $('#tblqlcompdetails').DataTable({
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
                   { title: "Sno", data: "buyordbomdetid", "visible": false },
                    { title: "Itemid", data: "Itemid", "visible": false },
                    { title: "Item", data: "item" },
                   { title: "Category-1", data: "color" },
                   { title: "Category-2", data: "size" },

                   { title: "Recvd.Qty", data: "RecvdQuantity" },
                   { title: "Uom", data: "uom" },
                   {
                       title: "Accept.Qty", data: "AcceptQty",
                       render: function (data) {

                           return '<input type="text" id="txtaccqty" class="calcaccqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   {
                       title: "Reject.Qty", data: "RejectedQty",
                       render: function (data) {

                           return '<input type="text" id="txtrejtvdqty" class="calcRejtqty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                    {
                        title: "Sec.Qty", data: "SecQty",
                       
                    },
                   { title: "Sec.Uom", data: "secuom" },


        ]

    });
}


function save() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please Select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    debugger;
    var oldentryno = $("#txtentryno").val();

    table = "CSPReceiptMas",
    column = "ReceiptNo",
    compId = CompanyId,
    Docum = 'CSP RECEIPTS'

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
                $('#txtentryno').val(result.Value);
            }

            var ordtype = $('input[name="Revert"]:checked').attr('value');
            var ObjAdd = {
                // prod_recpt_masid:
                ReceiptNo: $("#txtentryno").val(),
                ReceiptDate: $("#txtDate").val(),//new Date($('#txtDate').val()),
                RefNo: $("#txtcsprefno").val(),
                CompanyId: $("#ddlCompany").val(),
                Buyerid: $("#ddlBuyer").val(),
                OrderNo: $('select#ddlOrdno option:selected').text(),
                Styleid: $("#ddlStyle").val(),
                Remarks: $("#txtremarks").val(),
                Automated: '',
                //StoreUnitID: $("#ddlMSMMainStore").val(),
                StoreUnitID: storeunitid,
                RecptDet: ItmList

            }
            LoadingSymb();

            $("#btnAdd").attr("disabled", true);
            $.ajax({
                url: "/CSPReceipt/Add",
                data: JSON.stringify(ObjAdd),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'CSP Receipt', 'ADD', $("#txtentryno").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/CSPReceipt/CSPReceiptIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/CSPReceipt/CSPReceiptIndex";
                        AlartMessage(msg, flg, mod, url);
                    }
                    else {

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


function saveQlty() {
    debugger;
    $.each(QltyList, function () {
        this.ReceiptID = masid;
    });
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        // prod_recpt_masid:
        ReceiptNo: $("#txtqlentryno").val(),
        //ReceiptDate: new Date($('#txqltDate').val()),
        ReceiptDate: $("#txqltDate").val(),//new Date($('#txtDate').val()),
        RefNo: $("#txtqlcsprefno").val(),
        CompanyId: header[0].CompanyId,
        Buyerid: header[0].Buyerid,
        OrderNo: $('select#ddlQlOrdno option:selected').text(),
        Styleid: header[0].Styleid,
        Remarks: $("#txtqlremarks").val(),
        Automated: '',
        StoreUnitID: header[0].StoreUnitID,//$("#ddlMSMMainStore").val(),

        RecptDet: QltyList

    }
    LoadingSymb();
    $("#btnqlAdd").attr("disabled", true);

    $.ajax({
        url: "/CSPReceipt/QltyAdd",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Saved Successfully');
                //window.location.href = "/CSPReceipt/CSPReceiptIndex";
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/CSPReceipt/CSPReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            else {

                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function validate() {
    var isValid = true;
    //if ($('#txtcsprefno').val().trim() == "") {
    //    $('#txtcsprefno').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtcsprefno').css('border-color', 'lightgrey');
    //}
    //if ($('#ddlMSMMainStore').val() == 0) {
    //    $('#ddlMSMMainStore').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //}
    if ($('#ddlMSCompany').val() == 0) {
        //$('#ddlMSCompany').css('border-color', 'Red');
        $('#ddlMSCompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlMSCompany').css('border-color', 'lightgrey');
        $('#ddlMSCompany').siblings(".select2-container").css('border', 'lightgrey');
    }

    if ($('#ddlStyle').val() == 0) {
        //$('#ddlStyle').css('border-color', 'Red');
        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlMSCompany').siblings(".select2-container").css('border', 'lightgrey');
    }
    if ($('#ddlBuyer').val() == 0) {
       // $('#ddlBuyer').css('border-color', 'Red');
        $('#ddlBuyer').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlMSCompany').siblings(".select2-container").css('border', 'lightgrey');
    }
    return isValid;
}


function Recpt() {
    Qltytype = "RCPT";
    $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function Qlty() {
    Qltytype = "QLTY";
    $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}



function UpdateQlty() {
    debugger;
    $.each(QltyList, function () {
        this.ReceiptID = masid;
    });
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        // prod_recpt_masid:
        ReceiptNo: $("#txtqlentryno").val(),
       // ReceiptDate: new Date($('#txqltDate').val()),
        ReceiptDate: $("#txqltDate").val(),//new Date($('#txtDate').val()),
        RefNo: $("#txtqlcsprefno").val(),
        CompanyId: header[0].CompanyId,
        Buyerid: header[0].Buyerid,
        OrderNo: $('select#ddlQlOrdno option:selected').text(),
        Styleid: header[0].Styleid,
        Remarks: $("#txtqlremarks").val(),
        Automated: '',
        StoreUnitID: header[0].StoreUnitID,//4,//$("#ddlMSMMainStore").val(),

        RecptDet: QltyList

    }
    LoadingSymb();
    $("#UpdateQlty").attr("disabled", true);
    $.ajax({
        url: "/CSPReceipt/QltyUpdate",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Updated Successfully');
                //window.location.href = "/CSPReceipt/CSPReceiptIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/CSPReceipt/CSPReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            else {

                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function MasDeleteQlty() {
    debugger;
    $.each(QltyList, function () {
        this.ReceiptID = masid;
    });
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        // prod_recpt_masid:
        ReceiptNo: $("#txtqlentryno").val(),
        //ReceiptDate: new Date($('#txqltDate').val()),
        ReceiptDate: $("#txqltDate").val(),
        RefNo: $("#txtqlcsprefno").val(),
        CompanyId: header[0].CompanyId,
        Buyerid: header[0].Buyerid,
        OrderNo: $('select#ddlQlOrdno option:selected').text(),
        Styleid: header[0].Styleid,
        Remarks: $("#txtqlremarks").val(),
        Automated: '',
        StoreUnitID: header[0].StoreUnitID,//$("#ddlMSMMainStore").val(),

        RecptDet: QltyList

    }
    LoadingSymb();
    $.ajax({
        url: "/CSPReceipt/QltyDelete",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                //alert('Data Deleted Successfully');
                //window.location.href = "/CSPReceipt/CSPReceiptIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/CSPReceipt/CSPReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            else {

                window.location.href = "/Error/Index";
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
    var ONo = $('select#ddlMOrdno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrdno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMrecpt option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMrecpt option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var sty = $('#ddlMstyle').val();
    if (sty == null || sty == "0") {
        sty = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CSPReceipt/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, buyerid: buyer, masid: mas, refno: DCNo, ordno: ordNo, styleid: sty, recptno: RecNo, fromDate: FDate, todate: TDate, CSPType: Qltytype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
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
                         { title: "Recptid", "visible": false },
                         { title: "Receipt No" },
                         { title: "Receipt Date" },
                         { title: "Buyer" },
                         { title: "OrderNo" },
                         {
                             title: "Ref No"
                         },
                         { title: "DC No" },
                          { title: "Action" },


                ]

            });


            //ddlmain();

            //$('#ddlMreceptno').empty();
            //$('#ddlMDCNo').empty();
            //$('#ddlMCompany').empty();
            //$('#ddlMProcess').empty();
            //$('#ddlMunit').empty();
            //$('#ddlMBuyer').empty();

            $(document).ready(function () {
                var table = $('#tblmaindetails').DataTable();

                $('#tblmaindetails tbody').on('click', 'tr', function () {
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



function ddlmain() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlMOrdno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrdno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMrecpt option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMrecpt option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var sty = $('#ddlMstyle').val();
    if (sty == null || sty == "0") {
        sty = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }
    var mas = 0;
    var prid = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CSPReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, buyerid: buyer, masid: mas, refno: DCNo, ordno: ordNo, styleid: sty, recptno: RecNo, fromDate: FDate, todate: TDate }),
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
                var orddet = {};
                var ord = [];
                $.each(obj, function (i, el) {

                    if (!compdet[el.CompanyId]) {
                        compdet[el.CompanyId] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.ReceiptNo]) {
                        recptdet[el.ReceiptNo] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.RefNo]) {
                        dcdet[el.RefNo] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.Buyerid]) {
                        procdet[el.Buyerid] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.Styleid]) {
                        unitdet[el.Styleid] = true;
                        unit.push(el);
                    }

                    if (!orddet[el.OrderNo]) {
                        orddet[el.OrderNo] = true;
                        ord.push(el);
                    }
                });


                $(ddlMrecpt).append($('<option/>').val('0').text('--Select ReceiptNo--'));
                $.each(recpt, function () {
                    $(ddlMrecpt).append($('<option></option>').text(this.ReceiptNo));
                });

                $(ddlMDCNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(dc, function () {
                    $(ddlMDCNo).append($('<option></option>').text(this.RefNo));
                });

                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(comp, function () {
                    $(ddlMCompany).append($('<option></option>').val(this.CompanyId).text(this.company));
                });

                $(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(proc, function () {
                    $(ddlMBuyer).append($('<option></option>').val(this.Buyerid).text(this.buyer));
                });

                $(ddlMstyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(unit, function () {
                    $(ddlMstyle).append($('<option></option>').val(this.Styleid).text(this.style));
                });

                $(ddlMOrdno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlMOrdno).append($('<option></option>').text(this.OrderNo));
                });
            }



        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function CMainlist() {
    $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}




function getbyID(id) {
    debugger;
    admod = 1;
    masid = id;
    var ordNo = "";
    var ONo = $('select#ddlMOrdno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrdno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMrecpt option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMrecpt option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var sty = $('#ddlMstyle').val();
    if (sty == null || sty == "0") {
        sty = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CSPReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, buyerid: buyer, masid: masid, refno: DCNo, ordno: ordNo, styleid: sty, recptno: RecNo, fromDate: FDate, todate: TDate }),
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


            var type = $('input[name="MSType"]:checked').attr('value');
            if (type == 'M') {
                LoadMainStore();
            }
            if (type == 'S') {
                LoadSubStore();
            }
            if (type == 'E') {
                LoadSecStore();
            }

            var obj = json.Value;

            $('#txtDate').val(moment(obj[0].ReceiptDate).format("DD/MM/YYYY"));
            $('#ddlCompany').val(obj[0].CompanyId);
            $('#ddlBuyer').val(obj[0].Buyerid);
            $('#ddlStyle').val(obj[0].Styleid);
            $('#ddlOrdno').val(obj[0].bmasid);
            $('#ddlrefno').val(obj[0].bmasid);
            $('#ddlMSCompany').val(obj[0].CompanyId);
          
            $('#ddlMSMMainStore').val(obj[0].StoreUnitID);
            $('#txtentryno').val(obj[0].ReceiptNo);
            $('#txtcsprefno').val(obj[0].RefNo);
            $('#txtremarks').val(obj[0].Remarks);
            CompanyId = obj[0].CompanyId;

            if (obj[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = obj[0]["ParentUnitid"];
                editsubstore = obj[0]["StoreUnitID"];
                editmasunitstore = 0;
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = obj[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
            }
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();


            LoadEditInputItm(masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditInputItm(masid) {
    debugger;
    $.ajax({
        url: "/CSPReceipt/LoadEditItmDet",
        data: JSON.stringify({ masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            ItmList = result.Value;

            var chkaccept = 0;
            $.each(ItmList, function (i) {
                if (ItmList[i].AcceptQty > 0) {
                    chkaccept = 1;
                }
            });
            if (chkaccept == 1) {
                $("#btnDel").attr("disabled", true);
                $("#btnUpdate").attr("disabled", true);
            }

            LoadItmtab(ItmList);
        }
    });
}



function getbyQltyID(id) {
    debugger;
    masid = id;
    var ordNo = "";
    var ONo = $('select#ddlMOrdno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrdno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMrecpt option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMrecpt option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var sty = $('#ddlMstyle').val();
    if (sty == null || sty == "0") {
        sty = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CSPReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, buyerid: buyer, masid: masid, refno: DCNo, ordno: ordNo, styleid: sty, recptno: RecNo, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnqlUpdate').show();
            $('#btnqlDel').hide();
            $('#btnqlAdd').hide();
           

            var obj = json.Value;
            header = json.Value;
            $('#txqltDate').val(moment(obj[0].ReceiptDate).format("DD/MM/YYYY"));
            $('#ddlQlCompany').val(obj[0].company);
            $('#ddlQlBuyer').val(obj[0].buyer);
            $('#ddlQlStyle').val(obj[0].style);
            $('#ddlQlOrdno').val(obj[0].OrderNo);
            $('#ddlqlrefno').val(obj[0].DCNo);
            //$('#ddlMSCompany').val(obj[0].CompanyId);

            //$('#ddlMSMMainStore').val(obj[0].StoreUnitID);
            $('#txtqlentryno').val(obj[0].ReceiptNo);
            $('#txtqlcsprefno').val(obj[0].RefNo);
            $('#txtqlremarks').val(obj[0].Remarks);

            CheckAlloted();

            LoadEditInputQlty(masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function getQltyDeleteID(id) {
    debugger;
    masid = id;
    var ordNo = "";
    var ONo = $('select#ddlMOrdno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrdno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMrecpt option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMrecpt option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var sty = $('#ddlMstyle').val();
    if (sty == null || sty == "0") {
        sty = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CSPReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, buyerid: buyer, masid: masid, refno: DCNo, ordno: ordNo, styleid: sty, recptno: RecNo, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            $('#myModal1').show();
            $('#myModal1').modal('show');
            $('#btnqlUpdate').hide();
            $('#btnqlDel').show();
            $('#btnqlAdd').hide();


            var obj = json.Value;
            header = json.Value;
            $('#txqltDate').val(moment(obj[0].ReceiptDate).format("DD/MM/YYYY"));
            $('#ddlQlCompany').val(obj[0].company);
            $('#ddlQlBuyer').val(obj[0].buyer);
            $('#ddlQlStyle').val(obj[0].style);
            $('#ddlQlOrdno').val(obj[0].OrderNo);
            $('#ddlqlrefno').val(obj[0].DCNo);
            //$('#ddlMSCompany').val(obj[0].CompanyId);

            //$('#ddlMSMMainStore').val(obj[0].StoreUnitID);
            $('#txtqlentryno').val(obj[0].ReceiptNo);
            $('#txtqlcsprefno').val(obj[0].RefNo);
            $('#txtqlremarks').val(obj[0].Remarks);

            CheckAlloted();

            LoadEditInputQlty(masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadEditInputQlty(masid) {
    debugger;

    $.ajax({
        url: "/CSPReceipt/LoadEditItmDet",
        data: JSON.stringify({ masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            QltyList = result.Value;

            LoadQltytab(QltyList);

        }

    });
}

function Update() {
    debugger;
    $.each(ItmList, function () {
        this.ReceiptID = masid;
    });
    var res = validate();
    if (res == false) {
        return false;
    }
    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordtype = $('input[name="Revert"]:checked').attr('value');
    var ObjAdd = {
        ReceiptID: masid,
        ReceiptNo: $("#txtentryno").val(),
        ReceiptDate: $("#txtDate").val(),//new Date($('#txtDate').val()),
        RefNo: $("#txtcsprefno").val(),
        CompanyId: $("#ddlCompany").val(),
        Buyerid: $("#ddlBuyer").val(),
        OrderNo: $('select#ddlOrdno option:selected').text(),
        Styleid: $("#ddlStyle").val(),
        Remarks: $("#txtremarks").val(),
        Automated: '',
        //StoreUnitID: $("#ddlMSMMainStore").val(),
        StoreUnitID: storeunitid,
        RecptDet: ItmList

    }
    LoadingSymb();
    $("#btnUpdate").attr("disabled", true);

    $.ajax({
        url: "/CSPReceipt/Update",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'CSP Receipt', 'UPDATE', $("#txtentryno").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/CSPReceipt/CSPReceiptIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "/CSPReceipt/CSPReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            else {

                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function getDeleteID(id) {
    debugger;
    admod = 2;
    masid = id;
    var ordNo = "";
    var ONo = $('select#ddlMOrdno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrdno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMrecpt option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMrecpt option:selected').val();
    }


    var DCNo = "";
    var DNo = $('select#ddlMDCNo option:selected').val();

    if (DNo == 0 || DNo == undefined) {
        DCNo == "";
    }
    else {

        DCNo = $('select#ddlMDCNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var sty = $('#ddlMstyle').val();
    if (sty == null || sty == "0") {
        sty = 0;
    }
    var prid = 0;
    var process = $('#ddlMProcess').val();
    if (process == null || process == "0") {
        process = 0;
    }
    var buyer = $('#ddlMBuyer').val();
    if (buyer == null || buyer == "0") {
        buyer = 0;
    }


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CSPReceipt/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, buyerid: buyer, masid: masid, refno: DCNo, ordno: ordNo, styleid: sty, recptno: RecNo, fromDate: FDate, todate: TDate }),
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


            var type = $('input[name="MSType"]:checked').attr('value');
            if (type == 'M') {
                LoadMainStore();
            }
            if (type == 'S') {
                LoadSubStore();
            }
            if (type == 'E') {
                LoadSecStore();
            }

            var obj = json.Value;

            $('#txtDate').val(moment(obj[0].ReceiptDate).format("DD/MM/YYYY"));
            $('#ddlCompany').val(obj[0].CompanyId);
            $('#ddlBuyer').val(obj[0].Buyerid);
            $('#ddlStyle').val(obj[0].Styleid);
            $('#ddlOrdno').val(obj[0].bmasid);
            $('#ddlrefno').val(obj[0].bmasid);
            $('#ddlMSCompany').val(obj[0].CompanyId);

            $('#ddlMSMMainStore').val(obj[0].StoreUnitID);
            $('#txtentryno').val(obj[0].ReceiptNo);
            $('#txtcsprefno').val(obj[0].RefNo);
            $('#txtremarks').val(obj[0].Remarks);

            CompanyId = obj[0].CompanyId;

            if (obj[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = obj[0]["ParentUnitid"];
                editsubstore = obj[0]["StoreUnitID"];
                editmasunitstore = 0;
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = obj[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
            }
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();


            LoadEditInputItm(masid);


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function MasDelete() {
    debugger;
    $.each(ItmList, function () {
        this.ReceiptID = masid;
    });

    var res = validate();
    if (res == false) {
        return false;
    }

    var ObjAdd = {
        ReceiptID: masid,
        ReceiptNo: $("#txtentryno").val(),
        ReceiptDate: $("#txtDate").val(),//new Date($('#txtDate').val()),
        RefNo: $("#txtcsprefno").val(),
        CompanyId: $("#ddlCompany").val(),
        Buyerid: $("#ddlBuyer").val(),
        OrderNo: $('select#ddlOrdno option:selected').text(),
        Styleid: $("#ddlStyle").val(),
        Remarks: $("#txtremarks").val(),
        Automated: '',
        StoreUnitID: $("#ddlMSMMainStore").val(),
        RecptDet: ItmList
    }
    LoadingSymb();
    $.ajax({
        url: "/CSPReceipt/Delete",
        data: JSON.stringify(ObjAdd),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'CSP Receipt', 'DELETE', $("#txtentryno").val());
                //alert('Data Deleted Successfully');
                //window.location.href = "/CSPReceipt/CSPReceiptIndex";
                var msg = 'Data Deleted Successfully...';
                var flg = 2;
                var mod = 0;
                var url = "/CSPReceipt/CSPReceiptIndex";
                AlartMessage(msg, flg, mod, url);
            }
            else {

                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}
function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlMSMMainStore).empty();
            $(ddlMSMMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlMSMMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlMSMMainStore).trigger("select2:updated");

            $(ddlSCompany).empty();
            $(ddlSCompany).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSCompany).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSCompany).trigger("select2:updated");

            if (editsubmasunitstore > 0) {
                $('#ddlSCompany').val(editsubmasunitstore).trigger('change');
            }
            if (editmasunitstore > 0) {
                $('#ddlMSMMainStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompanyId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlSMainStore).empty();
            $(ddlSMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSMainStore).trigger("select2:updated");
            if (editsubstore > 0) {
                $('#ddlSMainStore').val(editsubstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function LoadUserCompanyDDL() {
    debugger;
    httpGet("/Company/GetCompany", onUserCompanySuccess, onUserCompanyFailure);
}

function onUserCompanySuccess(result) {
    if (result.Status == "SUCCESS") {

        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == CompanyId) {
                comp.push(data[i]);
            }
        });

        $(ddlMSCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlMSCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlMSCompany).trigger("select2:updated");
    }
    else {
        //alert('Company loading failed');
        var msg = 'Company loading failed...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);
}

function LoadFOrdDropDetails() {

    if (admod == 0) {
        var BMasId = $('#ddlOrdno option:selected').val();
        var JbId = 0;
        var StyId = 0;
        var RefNo = "";
        var RNo = $('select#ddlrefno option:selected').val();

        if (RNo == 0) {
            RefNo == "";
        }
        else {

            RefNo = $('select#ddlrefno option:selected').val();
        }

        if (BMasId > 0) {

            $.ajax({
                url: "/StockAuditEntry/GetDropNo",
                data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",

                success: function (result) {
                    var obj = result.Value;
                    if (result.Status == 'SUCCESS') {
                        debugger;
                        var data = result.Value;

                        //RefNo
                        $(ddlrefno).empty();
                        $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                        $.each(data, function () {
                            $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                        });

                        ////JobNo
                        //$(ddlwrkord).empty();
                        //$(ddlwrkord).append($('<option/>').val('0').text('--Select JobNo--'));
                        //$.each(data, function () {
                        //    $(ddlwrkord).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                        //});

                        //Style
                        $(ddlStyle).empty();
                        $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                        $.each(data, function () {
                            $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                        });
                    }


                }

            });

        }

    }

}

function CheckAlloted() {

    var Recpno = $('#txtqlentryno').val();

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
                    var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....";
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $("#btnqlUpdate").attr('disabled', true);
                    $("#btnqlDel").attr('disabled', true);
                    $('#btnqlAdd').hide();
                    return true;
                }

            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function ProcRetPrint(Id) {
    debugger;
    Rptid = Id;
    //$('#myModal2').modal('show');

    //docname = "STOCK TRANSFER";
    //GenerateReportItem(docname);
    var compid = $('#ddlMCompany').val();
    window.open("../ReportInline/Purchase/CSPreceiptInlineReport/CSPreceiptInlineReport.aspx?Masid=" + Rptid + "&Companyid=" + compid);

    //window.open("../ReportInline/Stores/StockTransfer/StockTransferInlineReport.aspx?Masid=" + Id);
    //return true;



}