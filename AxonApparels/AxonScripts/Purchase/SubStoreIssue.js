var DCompid = 0;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var StockList = [];
var Masid = 0;
var Mode = 0;
var Maintype = "Issue";
var Inserttype = "";
var validatestore = "False";
$(document).ready(function () {
    debugger;
    LoginUserid = $("#hdnLoginUserid").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    validatestore = $("#hdnValidateStore").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlACompany,#ddlToCompany");
    //LoadStyleDDL("#ddlAStyle");
    LoadOrderNoDDL("#ddlMOrderNo,#ddlAOrderNo");
    LoadRefNoDDL("#ddlMRefNo");
    LoadJobNoDDL("#ddlMJobNo");
    LoadItemDDL("#ddlAItem");
    LoadItemGroupDDL("#ddlAItemGroup");
    //LoadProcessDDL("#ddlALastProcess");
    LoadStoreUnitDDL("#ddlAStore,#ddlMIssueStore,#ddlMRecptStore");
    LoadCompanyUnitDDL("#ddlToStoreUit");
    getDate();
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();
    LoadIssuNoDDL();
    LoadMainGrid();
    $(document).on('keyup', '#txtTransferQty', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var StockQty = table.row($(this).parents('tr')).data()["StockQty"];
        var Val = $(this).val();
        var Amt = 0;

        if (Val > StockQty) {
            Val = 0;
        }

        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.TransferQty = Val;
                this.Amount = this.Rate * this.TransferQty;
                Amt = this.Amount;
            }
        });

        var table = $('#tblAddStockDetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtAmount]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < StockList.length; h++) {

                if (IssueStockID == ecdata[ig].IssueStockID) {
                    var Amount = Amt;
                    row.find('#txtAmount').val(Amount);

                }
            }

        });

    });
    $(document).on('keyup', '#txtRate', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.Rate = Val;
                this.Amount = this.Rate * this.TransferQty;
            }
        });

        var table = $('#tblAddStockDetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtAmount]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < StockList.length; h++) {

                if (StockList[h].IssueStockID == ecdata[ig].IssueStockID) {
                    var Amount = StockList[h].Amount;
                    row.find('#txtAmount').val(Amount);

                }
            }

        });


    });

    $(document).on('keyup', '#txtCGST', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.CGST = Val;
            }
        });

    });

    $(document).on('keyup', '#txtSGST', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.SGST = Val;
            }
        });

    });

    $(document).on('keyup', '#txtIGST', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.SGST = Val;
            }
        });

    });

    $(document).on('keyup', '#txtCGSTAMT', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.CGSTAMT = Val;
            }
        });

    });

    $(document).on('keyup', '#txtSGSTAMT', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.SGSTAMT = Val;
            }
        });

    });

    $(document).on('keyup', '#txtIGSTAMT', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.SGSTAMT = Val;
            }
        });

    });

    $(document).on('keyup', '#txtReceivedQty', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var TransferQty = table.row($(this).parents('tr')).data()["TransferQty"];
        var Val = $(this).val();
        if (Val > TransferQty) {
            Val = 0;
        }
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.ReceivedQty = Val;
                this.RejectedQty = 0;
            }
        });

        var table = $('#tblAddStockDetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtRejectedQty]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < StockList.length; h++) {

                if (IssueStockID == ecdata[ig].IssueStockID) {
                    // var Amount = Amt;
                    row.find('#txtReceivedQty').focus().val('').val(Val);
                    row.find('#txtRejectedQty').val(0);

                }
            }

        });


    });

    $(document).on('keyup', '#txtRejectedQty', function (e) {
        debugger;
        var table = $('#tblAddStockDetails').DataTable();
        var IssueStockID = table.row($(this).parents('tr')).data()["IssueStockID"];
        var TransferQty = table.row($(this).parents('tr')).data()["TransferQty"];
        var Val = $(this).val();
        var Val = $(this).val();
        $.each(StockList, function () {
            if (this.IssueStockID == IssueStockID) {
                this.RejectedQty = Val;
                this.ReceivedQty = 0;
            }
        });
        var table = $('#tblAddStockDetails').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtReceivedQty]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < StockList.length; h++) {

                if (IssueStockID == ecdata[ig].IssueStockID) {
                    // var Amount = Amt;
                    row.find('#txtRejectedQty').focus().val('').val(Val);
                    row.find('#txtReceivedQty').val(0);

                }
            }

        });
    });

})

function List() {
    LoadMainGrid();
}

function CMainList() {
    LoadMainGrid();
}

function LoadIssueMain() {
    Maintype = "Issue";
    LoadMainGrid();
}
function LoadRecptMain() {
    Maintype = "Receipt";
    LoadMainGrid();
}

function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#MainStoreId").show();
}
function LoadSubStore() {
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
}

//function getDate() {

//    var todaydate = new Date();
//    var day = todaydate.getDate();
//    var Pmonth = todaydate.getMonth() - 2;
//    var Cmonth = todaydate.getMonth() + 1;
//    var year = todaydate.getFullYear();
//    var datestring = day + "/" + Pmonth + "/" + year;
//    var Fdatestring = day + "/" + Cmonth + "/" + year;

//    var day = new Date(),
//        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
//        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
//        date = month + '/' + day.getDate() + '/' + year;
//    $('#txtEntryDate').val(Fdatestring);
//    $('#txtFromDate').val(datestring);
//    $('#txtToDate').val( Fdatestring);
//}


function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    //$('#txtFromDate').val(MainFDate);
    //$('#txtToDate').val(Fdatestring);

    $('#txtEntryDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

function LoadEmployeeStoreunit() {
    debugger;
    var CompId = $('#ddlToCompany').val();
    if (CompId == null) {
        CompId = DCompid;
    }
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: CompId }),
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
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: CompId }),
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
        var CompId = $('#ddlToCompany').val();
        if (CompId == null) {
            CompId = DCompid;
        }
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == CompId) {
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

function ClearText() {
    debugger;
    Mode = 0;
    Maintype = "Issue";
    LoadMainStore();
    $('#btnUpdate').hide();
    $('#btnRecptAdd').hide();
    $('#btnAdd').show();
    $('#btnDelete').hide();
    //LoadAddStoreStock();
    GenerateNumber();
    $("#btnLoadStk").attr("disabled", false);
    // LoadJobNoDDL("#ddlAWork");

    // LoadCompanyDDL("#ddlACompany,#ddlToCompany");
    //LoadStyleDDL("#ddlAStyle");
    LoadOrderNoDDL("#ddlAOrderNo");
    LoadRefNoDDL("#ddlARefNo");
    //LoadJobNoDDL("#ddlAWork");
    LoadItemDDL("#ddlAItem");
    LoadItemGroupDDL("#ddlAItemGroup");
    //LoadProcessDDL("#ddlALastProcess");
    LoadStoreUnitDDL("#ddlAStore");
    // LoadCompanyUnitDDL("#ddlToStoreUit");
    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();

    $('#ddlAStyle').val(0);
    $('#ddlAWork').val(0);
    $('#ddlARefNo').val(0);
  
    $("#txtEntryDate").attr("disabled", false);
    $("#ddlACompany").attr("disabled", false);
    $("#ddlAOrderNo").attr("disabled", false);
    $("#ddlARefNo").attr("disabled", false);
    $("#ddlAStyle").attr("disabled", false);
    $("#ddlAWork").attr("disabled", false);
    $("#ddlAStore").attr("disabled", false);
    $("#optAB").attr("disabled", false);
    $("#optAW").attr("disabled", false);
    $("#optASA").attr("disabled", false);
    $("#optAG").attr("disabled", false);

    $("#ddlToCompany").attr("disabled", false);
    $("#ddlToStoreUit").attr("disabled", false);
    $("#ddlMSCompany").attr("disabled", false);
    $("#ddlMSMMainStore").attr("disabled", false);
    $("#ddlSCompany").attr("disabled", false);
    $("#ddlSMainStore").attr("disabled", false);
    StockList = [];
    loadStockTable(StockList);


}

function ACompanyChange() {
    if (Mode == 0) {
        GenerateNumber();
        LoadOrderNoDDL("#ddlAOrderNo");
        LoadRefNoDDL("#ddlARefNo");

        LoadItemDDL("#ddlAItem");
        LoadItemGroupDDL("#ddlAItemGroup");
        $(ddlAStyle).empty();
        $(ddlAWork).empty();
    }
}

function validate() {
    var isValid = true;

    var ordtype = $('input[name="AOType"]:checked').attr('value');

    if (ordtype != "G") {
        if ($('#ddlAOrderNo').val() == 0) {
            if ($('#ddlARefNo').val() == 0) {
                $('#ddlARefNo').siblings(".select2-container").css('border', '1px solid red');

                isValid = false;
            }
            else {
                $('#ddlARefNo').siblings(".select2-container").css('border', '1px solid lightgrey');
            }
        }
    }
    if (ordtype != "G") {
        if ($('#ddlAOrderNo').val() == 0) {
            $('#ddlAOrderNo').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#ddlAOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    if (ordtype != "G") {
        if ($('#ddlAStyle').val() == 0) {
            $('#ddlAStyle').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#ddlAStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    if (ordtype != "G") {
        if ($('#ddlAWork').val() == 0) {
            $('#ddlAWork').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#ddlAWork').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    if ($('#ddlAStore').val() == 0) {
        $('#ddlAStore').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlAStore').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    //if ($('#ddlAItem').val() == 0) {
    //    $('#ddlAItem').siblings(".select2-container").css('border', '1px solid red');

    //    isValid = false;
    //}
    //else {
    //    $('#ddlAItem').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    if ($('#ddlAItemGroup').val() == 0) {
        $('#ddlAItemGroup').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlAItemGroup').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function LoadAddStoreStock() {
    debugger;

    if (Mode == 0) {

        var res = validate();
        if (res == false) {
            return false;
        }

        var ordtype = $('input[name="AOType"]:checked').attr('value');

        var OrdNo = "";
        if (ordtype != "G") {
            var ONo = $('select#ddlAOrderNo option:selected').val();

            if (ONo == 0) {
                OrdNo == "";
            }
            else {

                OrdNo = $('select#ddlAOrderNo option:selected').text();
            }
        }

        var RefNo = "";
        if (ordtype != "G") {
            var RNo = $('select#ddlARefNo option:selected').val();

            if (RNo == 0) {
                RefNo == "";
            }
            else {

                RefNo = $('select#ddlARefNo option:selected').text();
            }
        }

        var JobNo = "";
        if (ordtype != "G") {
            var JobNo = $('select#ddlAWork option:selected').val();

            if (JobNo == 0) {
                JobNo == "";
            }
            else {

                JobNo = $('select#ddlAWork option:selected').text();
            }
        }

        if (ordtype != "G") {
            var StyId = $('#ddlAStyle').val();
            if (ordtype != "G") {
                if (StyId == null) {
                    StyId = 0;
                } else {
                    StyId = $('#ddlAStyle').val();
                }

            }
        } else {
            var StyId = 0;
        }
        var Compid = $('#ddlACompany').val();

        if (Compid == null) {
            Compid = 0;
        } else {
            Compid = $('#ddlACompany').val();
        }

        var IssStoreid = $('#ddlAStore').val();

        if (IssStoreid == null) {
            IssStoreid = 0;
        } else {
            IssStoreid = $('#ddlAStore').val();
        }

        var Itemid = $('#ddlAItem').val();

        if (Itemid == null) {
            Itemid = 0;
        } else {
            Itemid = $('#ddlAItem').val();
        }

        var ItemGrpid = $('#ddlAItemGroup').val();

        if (ItemGrpid == null) {
            ItemGrpid = 0;
        } else {
            ItemGrpid = $('#ddlAItemGroup').val();
        }

        var Processid = $('#ddlALastProcess').val();

        if (Processid == null) {
            Processid = 0;
        } else {
            Processid = $('#ddlALastProcess').val();
        }

        var ordtype = $('input[name="AOType"]:checked').attr('value');


        $.ajax({
            url: "/SubStoreIssue/GetSubStoreStockAdd/",
            type: "POST",
            data: JSON.stringify({ Compid: Compid, Styleid: StyId, JobNo: JobNo, OrderNo: OrdNo, RefNo: RefNo, Storeid: IssStoreid, itemid: Itemid, itemgrpid: ItemGrpid, processid: Processid, Ordtype: ordtype }),
            async: false,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                debugger;
                StockList = (result.Value);

                loadStockTable(StockList);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function GenerateNumber() {
    debugger;

    table = "StoreTransferMas",
    column = "Transno",
    // compId = CompanyId,
    Docum = 'SUB STORE ISSUE'


    var Compid = $('#ddlACompany').val();

    if (Compid == null) {
        Compid = 0;
    } else {
        Compid = $('#ddlACompany').val();
    }

    if (Compid == 0) {
        Compid = DCompid;
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: Compid, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryNo').val(result.Value);
        }
    });
}

function LoadMainGrid() {

    debugger;

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var OType = $('input[name="MOType"]:checked').attr('value');

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var IssId = $('#ddlMIssueNo').val();
    if (IssId == null) {
        IssId = 0;
    }
    var IssStoreid = $('#ddlMIssueStore option:selected').val();
    if (IssStoreid == null) {
        IssStoreid = 0;
    }
    var RecptStoreid = $('#ddlMRecptStore option:selected').val();
    if (RecptStoreid == null) {
        RecptStoreid = 0;
    }

    //var IssStoreid =0;
    //var RecptStoreid = 0;


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == null) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || RNo == null) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').text();
    }

    var JobNo = "";
    var JNo = $('select#ddlMJobNo option:selected').val();

    if (JNo == 0 || JNo == null) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlMJobNo option:selected').text();
    }



    $.ajax({
        url: "/SubStoreIssue/List",
        data: JSON.stringify({ Companyid: CompId, IsuStoreid: IssStoreid, RcptStoreid: RecptStoreid, OrderNo: OrdNo, RefNo: RefNo, JobNo: JobNo, masid: IssId, ordtype: OType, Frmdate: FDate, Todate: TDate, type: Maintype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblMainDelidetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblMainDelidetails').DataTable();
                var rows = table.clear().draw();
                $('#tblMainDelidetails').DataTable().rows.add(dataSet);
                $('#tblMainDelidetails').DataTable().columns.adjust().draw();
            }
            else {

                $('#tblMainDelidetails').DataTable({
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
                             { title: "IssueId", "visible": false },
                             { title: "Issue Store" },
                             { title: "Receipt Store" },
                             { title: "Issue No" },
                             { title: "Date" },
                             { title: "Reference" },
                             { title: "QltyChk", "visible": false },
                             { title: "Action" },

                    ]

                });
            }
            $(document).ready(function () {
                var table = $('#tblMainDelidetails').DataTable();

                $('#tblMainDelidetails tbody').on('click', 'tr', function () {
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

function Save() {
    debugger;



    if (StockList.length == 0) {

        //alert("Please Check Stock Details..");
        var msg = 'Please Check Stock Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var cnt = 0;

    $.each(StockList, function (i) {
        if (StockList[i].TransferQty > 0) {
            cnt++;
        }
    });

    if (cnt == 0) {

        //alert("Please fill Transfer Qty..");
        var msg = 'Please fill Transfer quantity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
        return true;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }

    var ordtype = $('input[name="AOType"]:checked').attr('value');

    var MSType = $('input[name="MSType"]:checked').attr('value');
    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    }
    else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    //if (storeunitid == 0) {
    //    alert("Please Select ToStoreUnit..");
    //    return true;

    //}
    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    debugger;
    table = "StoreTransferMas",
    column = "Transno",
    Docum = 'SUB STORE ISSUE'

    var Compid = $('#ddlACompany').val();

    if (Compid == null) {
        Compid = 0;
    } else {
        Compid = $('#ddlACompany').val();
    }
    if (Compid == 0) {
        Compid = DCompid;
    }

    var oldEntryNo = $('#txtEntryNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: Compid, Doc: Docum }),
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
            var objSubmit = {
                MasID: 0,
                Transno: $('#txtEntryNo').val(),
                TransDate: $('#txtEntryDate').val(),
                FromcompID: $('#ddlACompany').val(),
                Order_No: $('#ddlAOrderNo option:selected').text(),
                StyleID: $('#ddlAStyle').val(),
                Job_Ord_no: $('#ddlAWork option:selected').text(),
                TransType: ordtype,
                IssueStoreID: $('#ddlAStore').val(),
                Item_GroupID: $('#ddlAItemGroup').val(),
                ItemID: $('#ddlAItem').val(),
                ToCompID: $('#ddlToCompany').val(),
                ToUnitID: $('#ddlToStoreUit').val(),
                RecptStoreID: storeunitid,
                Remarks: $('#txtRemarks').val(),
                CreatedBy: Guserid,
                StoreTransDet: StockList,
                VehicleNo: $('#txtVehicleNo').val(),
            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/SubStoreIssue/Add",
                data: JSON.stringify(objSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Sub Store Issue', 'ADD', $("#txtEntryNo").val());
                        //alert("SubStore Issue Saved Sucessfully");
                        //window.location.href = "/SubStoreIssue/SubStoreIssueIndex";
                        var msg = 'SubStore Issue Saved Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/SubStoreIssue/SubStoreIssueIndex";
                        AlartMessage(msg, flg, mod, url);
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

function loadStockTable(StockObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblAddStockDetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblAddStockDetails').DataTable().destroy();
    }
    $('#tblAddStockDetails').empty();

    $('#tblAddStockDetails').DataTable({

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

            { title: "Detid", data: "DetID", "visible": false },
            { title: "Masid", data: "MasID", "visible": false },
            { title: "IssueStockID", data: "IssueStockID", "visible": false },
            { title: "RecptStockID", data: "RecptStockID", "visible": false },
            { title: "RejectedStockID", data: "RejectedStockID", "visible": false },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "LotNo", data: "Lotno" },
            { title: "UOM", data: "UOM" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "Prg Qty", data: "ProgramQty" },
           // { title: "Transfer Qty", data: "TransferQty", "visible": false },

             {
                 title: "Transfer Qty", data: "TransferQty",
                 render: function (data) {

                     return '<input type="text" id="txtTransferQty" class="calcAmt form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
              {
                  title: "Issue Qty", data: "TransferQty",
                  render: function (data) {

                      return '<input type="text" id="txtIssueQty" class="calcAmt form-control"  style="width: 50px;text-align: center;" value=' + data + ' disabled >';

                  },
              },
               {
                   title: "Receipt Qty", data: "ReceivedQty",
                   render: function (data) {

                       return '<input type="text" id="txtReceivedQty" class="txtReceivedQty form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                   },
               },
                {
                    title: "Rejected Qty", data: "RejectedQty",
                    render: function (data) {

                        return '<input type="text" id="txtRejectedQty" class="txtRejectedQty form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                    },
                },
           // { title: "Rate", data: "Rate" },

             {
                 title: "Rate", data: "Rate", "visible": false,
                 render: function (data) {

                     return '<input type="text" id="txtRate" class="calcAmt form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },

           // { title: "Amount", data: "Amount" },

             {
                 title: "Amount", data: "Amount", "visible": false,
                 render: function (data) {

                     return '<input type="text" id="txtAmount" class="txtAmount form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },


            { title: "HSN Code", data: "HSNcode", "visible": false },
           // { title: "CGST", data: "CGST" },

              {
                  title: "CGST", data: "CGST", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtCGST" class="calcCGST form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },



              {
                  title: "SGST", data: "SGST", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtSGST" class="calcSGST form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },


              {
                  title: "IGST", data: "IGST", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtIGST" class="calcIGST form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },
            //{ title: "CGST AMT", data: "CGSTAMT" },
            //{ title: "SGST AMT", data: "SGSTAMT" },
            //{ title: "IGST AMT", data: "IGSTAMT" },

              {
                  title: "CGST AMT", data: "CGSTAMT", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtCGSTAMT" class="calcCGSTAMT form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },



              {
                  title: "SGST AMT", data: "SGSTAMT", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtSGSTAMT" class="calcSGSTAMT form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },


              {
                  title: "IGST AMT", data: "IGSTAMT", "visible": false,
                  render: function (data) {

                      return '<input type="text" id="txtIGSTAMT" class="calcIGSTAMT form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },

             


        ]
    });


    $("#tblAddStockDetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblAddStockDetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
    ConsmtnHideCol();
}

function getbyID(Id,ChkQlty) {

    debugger;

    if (ChkQlty > 0) {
        //alert('Quality made for this Issue,So cannot be Update..');
        var msg = 'Quality made for this Issue,So cannot be Update...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $("#btnUpdate").attr("disabled", true);
        $("#btnDelete").attr("disabled", true);
    } else {

        $("#btnUpdate").attr("disabled", false);
        $("#btnDelete").attr("disabled", false);
    }

    Mode = 1;
    Masid = Id;
    $("#btnLoadStk").attr("disabled", true);
    $.ajax({
        url: "/SubStoreIssue/GetSubStoreStockEdit/",
        type: "POST",
        data: JSON.stringify({ Masid: Id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            StockList = (result.Value);

            $('#txtEntryNo').val(StockList[0].TransNo);
            $('#txtEntryDate').val(StockList[0].TransDate);
            $('#ddlACompany').val(StockList[0].FrmCompID).trigger('change');
            // $('#ddlAOrderNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlARefNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlAStyle').val(StockList[0].Styleid).trigger('change');
            // $('#ddlAWork').val(StockList[0].JmasID).trigger('change');
            // ordtype,
            $('#ddlAStore').val(StockList[0].IssueStoreid).trigger('change');
            // $('#ddlAItemGroup').val(StockList[0].TransNo),
            //$('#ddlAItem').val(StockList[0].TransNo),
            $('#ddlToCompany').val(StockList[0].ToCompID);
            $('#ddlToStoreUit').val(StockList[0].ToUnitID).trigger('change');
            $('#ddlMSMMainStore').val(StockList[0].RecptStoreID).trigger('change');
            $('#txtRemarks').val(StockList[0].Remarks);
            $('#txtVehicleNo').val(StockList[0].Vehicle_No);
            $('#qltrem').hide();
            $(ddlAStyle).empty();
            $(ddlAStyle).append($('<option/>').val(StockList[0].Styleid).text(StockList[0].Style));
            $(ddlAOrderNo).empty();
            $(ddlAOrderNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].OrderNo));
            $(ddlARefNo).empty();
            $(ddlARefNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].RefNo));
            $(ddlAWork).empty();
            $(ddlAWork).append($('<option/>').val(StockList[0].JmasID).text(StockList[0].JobordNo));

            $("#txtEntryDate").attr("disabled", true);
            $("#ddlACompany").attr("disabled", true);
            $("#ddlAOrderNo").attr("disabled", true);
            $("#ddlARefNo").attr("disabled", true);
            $("#ddlAStyle").attr("disabled", true);

            $("#ddlAWork").attr("disabled", true);
            $("#ddlAStore").attr("disabled", true);

            $("#ddlToCompany").attr("disabled", false);
            $("#ddlToStoreUit").attr("disabled", false);
            $("#ddlMSCompany").attr("disabled", false);
            $("#ddlMSMMainStore").attr("disabled", false);
            $("#ddlSCompany").attr("disabled", false);
            $("#ddlSMainStore").attr("disabled", false);


            var ordtype = StockList[0].OrderType;
            $("#optAB").attr("disabled", true);
            $("#optAW").attr("disabled", true);
            $("#optASA").attr("disabled", true);
            $("#optAG").attr("disabled", true);
            if (ordtype == "B ") {
                $('#optAW').prop('checked', false);
                $('#optAB').prop('checked', true);
            }
            if (ordtype == "W ") {
                $('#optAW').prop('checked', true);
            }
            if (ordtype == "S ") {
                $('#optAW').prop('checked', false);
                $('#optASA').prop('checked', true);
            }
            if (ordtype == "G ") {
                $('#optAW').prop('checked', false);
                $('#optAG').prop('checked', true);
            }
            var StoreType = StockList[0].StoreType;
            if (StoreType == 'MS') {
                $('#optMS').prop('checked', true);
                editmasunitstore = StockList[0].RecptStoreID;
                LoadMainStore();
            }
            else {
                $('#optSS').prop('checked', true);
                editsubmasunitstore = StockList[0].ParentUnitid;
                editsubstore = StockList[0].RecptStoreID;
                LoadSubStore();
            }
            LoadToComp();
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#btnDelete').hide();
            $('#btnRecptAdd').hide();
            $('#myModal').modal('show');

            loadStockTable(StockList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function GetDelete(Id,ChkQlty) {
    debugger;
    if (ChkQlty > 0) {
        //alert('Quality made for this Issue,So cannot be Delete..');
        var msg = 'Quality made for this Issue,So cannot be Delete...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $("#btnUpdate").attr("disabled", true);
        $("#btnDelete").attr("disabled", true);
    } else {
        $("#btnUpdate").attr("disabled", false);
        $("#btnDelete").attr("disabled", false);
    }
    Masid = Id;
    Mode = 2;
    $("#btnLoadStk").attr("disabled", true);
    $.ajax({
        url: "/SubStoreIssue/GetSubStoreStockEdit/",
        type: "POST",
        data: JSON.stringify({ Masid: Id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            StockList = (result.Value);
            $('#txtEntryNo').val(StockList[0].TransNo);
            $('#txtEntryDate').val(StockList[0].TransDate);
            $('#ddlACompany').val(StockList[0].FrmCompID).trigger('change');
            // $('#ddlAOrderNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlARefNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlAStyle').val(StockList[0].Styleid).trigger('change');
            // $('#ddlAWork').val(StockList[0].JmasID).trigger('change');
            // ordtype,
            $('#ddlAStore').val(StockList[0].IssueStoreid).trigger('change');
            // $('#ddlAItemGroup').val(StockList[0].TransNo),
            //$('#ddlAItem').val(StockList[0].TransNo),
            $('#ddlToCompany').val(StockList[0].ToCompID);
            $('#ddlToStoreUit').val(StockList[0].ToUnitID).trigger('change');
            $('#ddlMSMMainStore').val(StockList[0].RecptStoreID).trigger('change');
            $('#txtRemarks').val(StockList[0].Remarks);
            $('#qltrem').hide();
            $(ddlAStyle).empty();
            $(ddlAStyle).append($('<option/>').val(StockList[0].Styleid).text(StockList[0].Style));
            $(ddlAOrderNo).empty();
            $(ddlAOrderNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].OrderNo));
            $(ddlARefNo).empty();
            $(ddlARefNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].RefNo));
            $(ddlAWork).empty();
            $(ddlAWork).append($('<option/>').val(StockList[0].JmasID).text(StockList[0].JobordNo));

            $("#txtEntryDate").attr("disabled", true);
            $("#ddlACompany").attr("disabled", true);
            $("#ddlAOrderNo").attr("disabled", true);
            $("#ddlARefNo").attr("disabled", true);
            $("#ddlAStyle").attr("disabled", true);

            $("#ddlAWork").attr("disabled", true);
            $("#ddlAStore").attr("disabled", true);

            $("#ddlToCompany").attr("disabled", false);
            $("#ddlToStoreUit").attr("disabled", false);
            $("#ddlMSCompany").attr("disabled", false);
            $("#ddlMSMMainStore").attr("disabled", false);
            $("#ddlSCompany").attr("disabled", false);
            $("#ddlSMainStore").attr("disabled", false);

            var ordtype = StockList[0].OrderType;
            $("#optAB").attr("disabled", true);
            $("#optAW").attr("disabled", true);
            $("#optASA").attr("disabled", true);
            $("#optAG").attr("disabled", true);
            if (ordtype == "B ") {
                $('#optAW').prop('checked', false);
                $('#optAB').prop('checked', true);
            }
            if (ordtype == "W ") {
                $('#optAW').prop('checked', true);
            }
            if (ordtype == "S ") {
                $('#optAW').prop('checked', false);
                $('#optASA').prop('checked', true);
            }
            if (ordtype == "G ") {
                $('#optAW').prop('checked', false);
                $('#optAG').prop('checked', true);
            }
            var StoreType = StockList[0].StoreType;
            if (StoreType == 'MS') {
                editmasunitstore = StockList[0].RecptStoreID;
                LoadMainStore();
            }
            else {
                editsubmasunitstore = StockList[0].ParentUnitid;
                editsubstore = StockList[0].RecptStoreID;
                LoadSubStore();
            }
            LoadToComp();

            $('#btnRecptAdd').hide();
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
            $('#btnDelete').show();
            $('#myModal').modal('show');

            loadStockTable(StockList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {

    if (StockList.length == 0) {

        //alert("Please Check Stock Details..");
        var msg = 'Please Check Stock Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    var cnt = 0;

    if (Maintype == "Issue") {
        $.each(StockList, function (i) {
            if (StockList[i].TransferQty > 0) {
                cnt++;
            }
        });

        if (cnt == 0) {

            //alert("Please fill Transfer Qty..");
            var msg = 'Please fill Transfer Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }
    else if (Maintype == "Receipt") {

        $.each(StockList, function (i) {
            if (StockList[i].ReceivedQty == 0) {
                if (StockList[i].RejectedQty == 0) {
                    cnt++;
                }
            }
        });

        //$.each(StockList, function (i) {
        //    if (StockList[i].RejectedQty > 0) {
        //        cnt++;
        //    }
        //});

        if (cnt != 0) {

            //alert("Please fill Received Qty..");
            var msg = 'Please fill Received Qty...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }

    var ordtype = $('input[name="AOType"]:checked').attr('value');
    var MSType = $('input[name="MSType"]:checked').attr('value');
    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    //if (storeunitid == 0) {
    //    alert("Please Select ToStoreUnit..");
    //    return true;
    //}
    if (storeunitid == 0 && validatestore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var objSubmit = {
        MasID: Masid,
        Transno: $('#txtEntryNo').val(),
        TransDate: $('#txtEntryDate').val(),
        FromcompID: $('#ddlACompany').val(),
        Order_No: $('#ddlAOrderNo option:selected').text(),
        StyleID: $('#ddlAStyle').val(),
        Job_Ord_no: $('#ddlAWork option:selected').text(),
        TransType: ordtype,
        IssueStoreID: $('#ddlAStore').val(),
        Item_GroupID: $('#ddlAItemGroup').val(),
        ItemID: $('#ddlAItem').val(),
        ToCompID: $('#ddlToCompany').val(),
        ToUnitID: $('#ddlToStoreUit').val(),
        RecptStoreID: storeunitid,
        Remarks: $('#txtRemarks').val(),
        CreatedBy: Guserid,
        StoreTransDet: StockList,
        MainType: Maintype,
        QualityNo: $('#txtEntryNo').val(),
        QualityDate: $('#txtEntryDate').val(),
        QualityMade: Guserid,
        QualityRemarks: $('#txtQltyRemarks').val(),
        insertype: Inserttype,
        VehicleNo: $('#txtVehicleNo').val(),
    };

    $("#btnRecptAdd").attr("disabled", true);
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/SubStoreIssue/Update",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                if (Maintype == "Issue") {
                    AddUserEntryLog('Procurement', 'Sub Store Issue', 'ISSUE UPDATE', $("#txtEntryNo").val());
                    //alert("SubStore Issue Updated Sucessfully");
                    var msg = 'SubStore Issue Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/SubStoreIssue/SubStoreIssueIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                if (Maintype == "Receipt" && Mode == 4) {
                    AddUserEntryLog('Procurement', 'Sub Store Issue', 'RECEIPT ADD', $("#txtEntryNo").val());
                    //alert("SubStore Receipt Added Sucessfully");
                    var msg = 'SubStore Receipt Added Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/SubStoreIssue/SubStoreIssueIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                if (Maintype == "Receipt" && Mode == 5) {
                    AddUserEntryLog('Procurement', 'Sub Store Issue', 'RECEIPT UPDATE', $("#txtEntryNo").val());
                    //alert("SubStore Receipt Updated Sucessfully");
                    var msg = 'SubStore Receipt Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/SubStoreIssue/SubStoreIssueIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                //window.location.href = "/SubStoreIssue/SubStoreIssueIndex";
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

    if (StockList.length == 0) {

        //alert("Please Check Stock Details..");
        var msg = 'Please Check Stock Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var ordtype = $('input[name="AOType"]:checked').attr('value');

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    var objSubmit = {
        MasID: Masid,
        Transno: $('#txtEntryNo').val(),
        TransDate: $('#txtEntryDate').val(),
        FromcompID: $('#ddlACompany').val(),
        Order_No: $('#ddlAOrderNo option:selected').text(),
        StyleID: $('#ddlAStyle').val(),
        Job_Ord_no: $('#ddlAWork option:selected').text(),
        TransType: ordtype,
        IssueStoreID: $('#ddlAStore').val(),
        Item_GroupID: $('#ddlAItemGroup').val(),
        ItemID: $('#ddlAItem').val(),
        ToCompID: $('#ddlToCompany').val(),
        ToUnitID: $('#ddlToStoreUit').val(),
        RecptStoreID: storeunitid,
        Remarks: $('#txtRemarks').val(),
        CreatedBy: Guserid,
        StoreTransDet: StockList,
        insertype: Inserttype,
        MainType: Maintype,
        VehicleNo: $('#txtVehicleNo').val(),
    };
    $("#btnDelete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/SubStoreIssue/Delete",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                if (Mode == 6) {
                    AddUserEntryLog('Procurement', 'Sub Store Issue', 'RECEIPT DELETE', $("#txtEntryNo").val());
                    //alert("SubStore Receipt Deleted Sucessfully")
                    var msg = 'SubStore Receipt Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/SubStoreIssue/SubStoreIssueIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                else {
                    AddUserEntryLog('Procurement', 'Sub Store Issue', 'ISSUE DELETE', $("#txtEntryNo").val());
                    //alert("SubStore Issue Deleted Sucessfully");
                    var msg = 'SubStore Issue Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/SubStoreIssue/SubStoreIssueIndex";
                    AlartMessage(msg, flg, mod, url);
                }
                //window.location.href = "/SubStoreIssue/SubStoreIssueIndex";
            } else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}

function LoadToComp() {

    LoadEmployeeStoreunit();
    LoadUserCompanyDDL();
}

function LoadOrderwise() {
    debugger;
    if (Mode == 0) {
        var BMasId = $('#ddlAOrderNo').val();
        var JbId = 0;
        var StyId = 0;
        var Refid = 0;
        ddlmode = 1;
        //var RefNo = "";
        //var RNo = $('select#ddlrefno option:selected').val();

        //if (RNo == 0) {
        //    RefNo == "";
        //}
        //else {

        //    RefNo = $('select#ddlrefno option:selected').val();
        //}

        $.ajax({
            url: "/GroupProcessOrder/GetGroupDropdwon",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;
                    //var bmas = 0;
                    //$.each(data, function () {
                    //    bmas = this.BMasId;
                    //});

                    ////OrdNo
                    //$(ddlOrderNo).empty();
                    //$(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    //$.each(data, function () {
                    //    $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                    //});

                    ////RefNo
                    //$(ddlrefno).empty();
                    //$(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    //$.each(data, function () {
                    //    $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                    //});

                    //JobNo
                    $(ddlAWork).empty();
                    $(ddlAWork).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlAWork).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    var Stydet = {};
                    var Sty = [];

                    $.each(data, function (i, el) {
                        if (!Stydet[el.Styleid]) {
                            Stydet[el.Styleid] = true;
                            Sty.push(el);
                        }
                    });



                    $(ddlAStyle).empty();
                    $(ddlAStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(Sty, function () {
                        $(ddlAStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }
}

function LoadRefwise() {
    debugger;
    if (Mode == 0) {
        var BMasId = 0;
        var JbId = 0;
        var StyId = 0;
        var Refid = $('select#ddlARefNo option:selected').val();
        ddlmode = 2;
        //var RefNo = "";
        //var RNo = $('select#ddlrefno option:selected').val();

        //if (RNo == 0) {
        //    RefNo == "";
        //}
        //else {

        //    RefNo = $('select#ddlrefno option:selected').val();
        //}

        $.ajax({
            url: "/GroupProcessOrder/GetGroupDropdwon",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;
                    //var bmas = 0;
                    //$.each(data, function () {
                    //    bmas = this.BMasId;
                    //});


                    var Orddet = {};
                    var Ord = [];

                    $.each(data, function (i, el) {
                        if (!Orddet[el.BMasId]) {
                            Orddet[el.BMasId] = true;
                            Ord.push(el);
                        }
                    });




                    //OrdNo
                    $(ddlAOrderNo).empty();
                    $(ddlAOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(Ord, function () {
                        $(ddlAOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                    });

                    ////RefNo
                    //$(ddlrefno).empty();
                    //$(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    //$.each(data, function () {
                    //    $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                    //});

                    //JobNo
                    $(ddlAWork).empty();
                    $(ddlAWork).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlAWork).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style

                    var Stydet = {};
                    var Sty = [];

                    $.each(data, function (i, el) {
                        if (!Stydet[el.Styleid]) {
                            Stydet[el.Styleid] = true;
                            Sty.push(el);
                        }
                    });




                    $(ddlAStyle).empty();
                    $(ddlAStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(Sty, function () {
                        $(ddlAStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }

}

function LoadProcess() {
    debugger;
    if (Mode == 0) {
        var JbId = $('select#ddlAWork option:selected').val();

        $.ajax({
            url: "/GroupProcessOrder/GetProcessDropdwon",
            data: JSON.stringify({ JobId: JbId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;
                    //DDL MultiProcess
                    $(ddlALastProcess).empty();
                    $(ddlALastProcess).append($('<option/>').val('0').text('--Select Process--'));
                    $.each(data, function () {
                        $(ddlALastProcess).append($('<option></option>').val(this.ProcessId).text(this.Process));
                    });
                }
            }
        });
    }
}

function ConsmtnHideCol() {
    debugger;
    var tbl = $('#tblAddStockDetails');

    if (Maintype == 'Issue') {

        tbl.DataTable().column(13).visible(false);
        tbl.DataTable().column(14).visible(false);
        tbl.DataTable().column(15).visible(false);

        tbl.DataTable().column(12).visible(true);
        //tbl.DataTable().column(17).visible(true);
        //tbl.DataTable().column(18).visible(true);
        //tbl.DataTable().column(19).visible(true);
        //tbl.DataTable().column(20).visible(true);
        //tbl.DataTable().column(21).visible(true);
        //tbl.DataTable().column(22).visible(true);
        //tbl.DataTable().column(23).visible(true);
        //tbl.DataTable().column(24).visible(true);


    }
    else if (Maintype == 'Receipt') {
        tbl.DataTable().column(13).visible(true);
        tbl.DataTable().column(14).visible(true);
        tbl.DataTable().column(15).visible(true);

        tbl.DataTable().column(12).visible(false);
        //tbl.DataTable().column(17).visible(false);
        //tbl.DataTable().column(18).visible(false);
        //tbl.DataTable().column(19).visible(false);
        //tbl.DataTable().column(20).visible(false);
        //tbl.DataTable().column(21).visible(false);
        //tbl.DataTable().column(22).visible(false);
        //tbl.DataTable().column(23).visible(false);
        //tbl.DataTable().column(24).visible(false);
    }

}

function getbyRecptAddID(Id) {

    debugger;
    Mode = 4;
    Masid = Id;
    Inserttype = "Add"
    $("#btnLoadStk").attr("disabled", true);
    $.ajax({
        url: "/SubStoreIssue/GetSubStoreStockEdit/",
        type: "POST",
        data: JSON.stringify({ Masid: Id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            StockList = (result.Value);

            //$('#txtEntryNo').val(StockList[0].TransNo);
            // $('#txtEntryDate').val(StockList[0].TransDate);
            $('#ddlACompany').val(StockList[0].FrmCompID).trigger('change');
            // $('#ddlAOrderNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlARefNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlAStyle').val(StockList[0].Styleid).trigger('change');
            // $('#ddlAWork').val(StockList[0].JmasID).trigger('change');
            // ordtype,
            $('#ddlAStore').val(StockList[0].IssueStoreid).trigger('change');
            // $('#ddlAItemGroup').val(StockList[0].TransNo),
            //$('#ddlAItem').val(StockList[0].TransNo),
            $('#ddlToCompany').val(StockList[0].ToCompID);
            $('#ddlToStoreUit').val(StockList[0].ToUnitID).trigger('change');
            $('#ddlMSMMainStore').val(StockList[0].RecptStoreID).trigger('change');
            $('#txtRemarks').val(StockList[0].Remarks);
            $('#qltrem').show();
            $(ddlAStyle).empty();
            $(ddlAStyle).append($('<option/>').val(StockList[0].Styleid).text(StockList[0].Style));
            $(ddlAOrderNo).empty();
            $(ddlAOrderNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].OrderNo));
            $(ddlARefNo).empty();
            $(ddlARefNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].RefNo));
            $(ddlAWork).empty();
            $(ddlAWork).append($('<option/>').val(StockList[0].JmasID).text(StockList[0].JobordNo));

            $("#txtEntryDate").attr("disabled", false);
            $("#ddlACompany").attr("disabled", true);
            $("#ddlAOrderNo").attr("disabled", true);
            $("#ddlARefNo").attr("disabled", true);
            $("#ddlAStyle").attr("disabled", true);

            $("#ddlAWork").attr("disabled", true);
            $("#ddlAStore").attr("disabled", true);

            $("#ddlToCompany").attr("disabled", true);
            $("#ddlToStoreUit").attr("disabled", true);
            $("#ddlMSCompany").attr("disabled", true);
            $("#ddlMSMMainStore").attr("disabled", true);
            $("#ddlSCompany").attr("disabled", true);
            $("#ddlSMainStore").attr("disabled", true);


            var ordtype = StockList[0].OrderType;
            $("#optAB").attr("disabled", true);
            $("#optAW").attr("disabled", true);
            $("#optASA").attr("disabled", true);
            $("#optAG").attr("disabled", true);
            if (ordtype == "B ") {
                $('#optAW').prop('checked', false);
                $('#optAB').prop('checked', true);
            }
            if (ordtype == "W ") {
                $('#optAW').prop('checked', true);
            }
            if (ordtype == "S ") {
                $('#optAW').prop('checked', false);
                $('#optASA').prop('checked', true);
            }
            if (ordtype == "G ") {
                $('#optAW').prop('checked', false);
                $('#optAG').prop('checked', true);
            }
            var StoreType = StockList[0].StoreType;
            if (StoreType == 'MS') {
                $('#optMS').prop('checked', true);
                editmasunitstore = StockList[0].RecptStoreID;
                LoadMainStore();
            }
            else {
                $('#optSS').prop('checked', true);
                editsubmasunitstore = StockList[0].ParentUnitid;
                editsubstore = StockList[0].RecptStoreID;
                LoadSubStore();
            }
            LoadToComp();
           
            $('#btnRecptAdd').show();
            $('#btnAdd').hide();
            $('#btnUpdate').hide();
            $('#btnDelete').hide();
            $('#myModal').modal('show');
            GenerateQltyNumber();

            loadStockTable(StockList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });



}

function GenerateQltyNumber() {
    debugger;

    table = "StoreTransferMas",
    column = "QualityNo",
    // compId = CompanyId,
    Docum = 'SUB STORE RECEIPT'


    var Compid = $('#ddlACompany').val();

    if (Compid == null) {
        Compid = 0;
    } else {
        Compid = $('#ddlACompany').val();
    }

    if (Compid == 0) {
        Compid = DCompid;
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: Compid, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryNo').val(result.Value);
        }
    });
}

function getbyReceptEditID(Id) {

    debugger;
    Mode = 5;
    Masid = Id;
    Inserttype = "Update";
    $("#btnLoadStk").attr("disabled", true);
    $.ajax({
        url: "/SubStoreIssue/GetSubStoreStockEdit/",
        type: "POST",
        data: JSON.stringify({ Masid: Id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            StockList = (result.Value);

            $('#txtEntryNo').val(StockList[0].QualityNo);
            $('#txtEntryDate').val(StockList[0].QualityDate);
            $('#ddlACompany').val(StockList[0].FrmCompID).trigger('change');
            // $('#ddlAOrderNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlARefNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlAStyle').val(StockList[0].Styleid).trigger('change');
            // $('#ddlAWork').val(StockList[0].JmasID).trigger('change');
            // ordtype,
            $('#ddlAStore').val(StockList[0].IssueStoreid).trigger('change');
            // $('#ddlAItemGroup').val(StockList[0].TransNo),
            //$('#ddlAItem').val(StockList[0].TransNo),
            $('#ddlToCompany').val(StockList[0].ToCompID);
            $('#ddlToStoreUit').val(StockList[0].ToUnitID).trigger('change');
            $('#ddlMSMMainStore').val(StockList[0].RecptStoreID).trigger('change');
            $('#txtRemarks').val(StockList[0].Remarks);
            $('#txtQltyRemarks').val(StockList[0].QltyItemRemarks);
            $('#qltrem').show();
            $(ddlAStyle).empty();
            $(ddlAStyle).append($('<option/>').val(StockList[0].Styleid).text(StockList[0].Style));
            $(ddlAOrderNo).empty();
            $(ddlAOrderNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].OrderNo));
            $(ddlARefNo).empty();
            $(ddlARefNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].RefNo));
            $(ddlAWork).empty();
            $(ddlAWork).append($('<option/>').val(StockList[0].JmasID).text(StockList[0].JobordNo));

            $("#txtEntryDate").attr("disabled", true);
            $("#ddlACompany").attr("disabled", true);
            $("#ddlAOrderNo").attr("disabled", true);
            $("#ddlARefNo").attr("disabled", true);
            $("#ddlAStyle").attr("disabled", true);

            $("#ddlAWork").attr("disabled", true);
            $("#ddlAStore").attr("disabled", true);

            $("#ddlToCompany").attr("disabled", true);
            $("#ddlToStoreUit").attr("disabled", true);
            $("#ddlMSCompany").attr("disabled", true);
            $("#ddlMSMMainStore").attr("disabled", true);
            $("#ddlSCompany").attr("disabled", true);
            $("#ddlSMainStore").attr("disabled", true);


            var ordtype = StockList[0].OrderType;
            $("#optAB").attr("disabled", true);
            $("#optAW").attr("disabled", true);
            $("#optASA").attr("disabled", true);
            $("#optAG").attr("disabled", true);
            if (ordtype == "B ") {
                $('#optAW').prop('checked', false);
                $('#optAB').prop('checked', true);
            }
            if (ordtype == "W ") {
                $('#optAW').prop('checked', true);
            }
            if (ordtype == "S ") {
                $('#optAW').prop('checked', false);
                $('#optASA').prop('checked', true);
            }
            if (ordtype == "G ") {
                $('#optAW').prop('checked', false);
                $('#optAG').prop('checked', true);
            }
            var StoreType = StockList[0].StoreType;
            if (StoreType == 'MS') {
                $('#optMS').prop('checked', true);
                editmasunitstore = StockList[0].RecptStoreID;
                LoadMainStore();
            }
            else {
                $('#optSS').prop('checked', true);
                editsubmasunitstore = StockList[0].ParentUnitid;
                editsubstore = StockList[0].RecptStoreID;
                LoadSubStore();
            }
            LoadToComp();
           
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#btnDelete').hide();
            $('#myModal').modal('show');
            $('#btnRecptAdd').hide();

            loadStockTable(StockList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function GetReceptDelete(Id) {

    debugger;
    Mode = 6;
    Masid = Id;
    Inserttype = "Delete";
    $("#btnLoadStk").attr("disabled", true);
    $.ajax({
        url: "/SubStoreIssue/GetSubStoreStockEdit/",
        type: "POST",
        data: JSON.stringify({ Masid: Id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            StockList = (result.Value);

            $('#txtEntryNo').val(StockList[0].QualityNo);
            $('#txtEntryDate').val(StockList[0].QualityDate);
            $('#ddlACompany').val(StockList[0].FrmCompID).trigger('change');
            // $('#ddlAOrderNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlARefNo ').val(StockList[0].BmasID).trigger('change');
            // $('#ddlAStyle').val(StockList[0].Styleid).trigger('change');
            // $('#ddlAWork').val(StockList[0].JmasID).trigger('change');
            // ordtype,
            $('#ddlAStore').val(StockList[0].IssueStoreid).trigger('change');
            // $('#ddlAItemGroup').val(StockList[0].TransNo),
            //$('#ddlAItem').val(StockList[0].TransNo),
            $('#ddlToCompany').val(StockList[0].ToCompID);
            $('#ddlToStoreUit').val(StockList[0].ToUnitID).trigger('change');
            $('#ddlMSMMainStore').val(StockList[0].RecptStoreID).trigger('change');
            $('#txtRemarks').val(StockList[0].Remarks);
            $('#txtQltyRemarks').val(StockList[0].QltyItemRemarks);

            $(ddlAStyle).empty();
            $(ddlAStyle).append($('<option/>').val(StockList[0].Styleid).text(StockList[0].Style));
            $(ddlAOrderNo).empty();
            $(ddlAOrderNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].OrderNo));
            $(ddlARefNo).empty();
            $(ddlARefNo).append($('<option/>').val(StockList[0].BmasID).text(StockList[0].RefNo));
            $(ddlAWork).empty();
            $(ddlAWork).append($('<option/>').val(StockList[0].JmasID).text(StockList[0].JobordNo));

            $("#txtEntryDate").attr("disabled", true);
            $("#ddlACompany").attr("disabled", true);
            $("#ddlAOrderNo").attr("disabled", true);
            $("#ddlARefNo").attr("disabled", true);
            $("#ddlAStyle").attr("disabled", true);

            $("#ddlAWork").attr("disabled", true);
            $("#ddlAStore").attr("disabled", true);

            $("#ddlToCompany").attr("disabled", true);
            $("#ddlToStoreUit").attr("disabled", true);
            $("#ddlMSCompany").attr("disabled", true);
            $("#ddlMSMMainStore").attr("disabled", true);
            $("#ddlSCompany").attr("disabled", true);
            $("#ddlSMainStore").attr("disabled", true);


            var ordtype = StockList[0].OrderType;
            $("#optAB").attr("disabled", true);
            $("#optAW").attr("disabled", true);
            $("#optASA").attr("disabled", true);
            $("#optAG").attr("disabled", true);
            if (ordtype == "B ") {
                $('#optAW').prop('checked', false);
                $('#optAB').prop('checked', true);
            }
            if (ordtype == "W ") {
                $('#optAW').prop('checked', true);
            }
            if (ordtype == "S ") {
                $('#optAW').prop('checked', false);
                $('#optASA').prop('checked', true);
            }
            if (ordtype == "G ") {
                $('#optAW').prop('checked', false);
                $('#optAG').prop('checked', true);
            }
            var StoreType = StockList[0].StoreType;
            if (StoreType == 'MS') {
                $('#optMS').prop('checked', true);
                editmasunitstore = StockList[0].RecptStoreID;
                LoadMainStore();
            }
            else {
                $('#optSS').prop('checked', true);
                editsubmasunitstore = StockList[0].ParentUnitid;
                editsubstore = StockList[0].RecptStoreID;
                LoadSubStore();
            }
            LoadToComp();
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
            $('#btnDelete').show();
            $('#myModal').modal('show');
            $('#btnRecptAdd').hide();

            loadStockTable(StockList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}

function LoadIssuNoDDL() {
    debugger;

    $.ajax({
        url: "/SubStoreIssue/LoadIssueNo",
        //data: JSON.stringify({ cmpid: cmpyid, cmpunitid: cunitid, ordertype: protype }),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMIssueNo).empty();
                $(ddlMIssueNo).append($('<option/>').val('0').text('--Select IssuNo--'));
                $.each(data, function () {
                    $(ddlMIssueNo).append($('<option></option>').val(this.MasID).text(this.Transno));
                });

            }


        }

    });
}
function SubstoreIssuePrint(Id) {
    debugger;

    Repid = Id;
    $('#myModal2').modal('show');

    docname = "SUBSTORE ISSUE";
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
    window.open("../ReportInline/Stores/SubStoreIssueReportInline/SubStoreIssueReportInline.aspx?Masid=" + Repid + "&Companyid=" + compid);

    // window.open("../ReportInline/Stores/StockTransfer/StockTransferInlineReport.aspx?Masid=" + Rptid + "&Remarks=" + p[0] + "&TotalQty=" + p[1] + "&SecQty=" + p[2] + "&Splitup=" + p[3] + "&Gatepass=" + p[4] + "&IssueQty=" + 0 + "&Rate=" + p[6] + "&DeliLoc=" + p[7] + "&ExcessQty=" + p[8] + "&OrdNo=" + p[9] + "&WrkOrdNo=" + p[10] + "&ArtNo=" + p[11] + "&RefNo=" + p[12]);

}
