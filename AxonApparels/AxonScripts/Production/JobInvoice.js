var JOrdID = 0;
var jid = [];
var maintbllist = [];
var entrygriddet = [];
var secondgridinfo = [];
var Userid = 0;
var UserName = 0;
var table, column, compId, Docum;
var GAmount = 0;
var Mode = 0;
var JobInvId = 0;
var AddPur = [];
var MainFDate = 0
var JobInvEditFlg = "disabled";
var JobInvDeleteFlg = "disabled";
var JobInvPrintFlg = "disabled";
$(document).ready(function () {
    debugger;
    Userid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');

    //$('#txtFromDate').val(moment(new Date()).format('DD/MM/YYYY'));
    MainFDate = $("#hdMainFromDate").data('value');
    $('#txtFromDate').val(MainFDate);

    $('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtentinvdate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtinvrefdate').val(moment(new Date()).format('DD/MM/YYYY'));
    //$('#txtinvjobdate').val(moment(new Date()).format('DD/MM/YYYY'));

    LoadCompanyDDL("#ddlMCompany");
    LoadAddlessDDL("#ddlAccHeads");
    LoadData();
    LoadDDL();

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        Mode = 2;
        JobInvId = 0;

        var table = $('#tblMainGrid').DataTable();
        JobInvId = table.row($(this).parents('tr')).data()["JobInvId"];


        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').hide();
        $('#btnDelete').show();

        getbyID(JobInvId);
    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        JobInvId = 0;

        var table = $('#tblMainGrid').DataTable();
        JobInvId = table.row($(this).parents('tr')).data()["JobInvId"];
        //var OrderNo = table.row($(this).parents('tr')).data()["OrderNo"];

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').show();
        $('#btnDelete').hide();

        getbyID(JobInvId);
    });

    $(document).on('click', '.chkgrn', function () {
        debugger;
        var table = $('#tblgrndet').DataTable();
        var row = $(this).closest('tr');
        var OrderNo = table.row($(this).parents('tr')).data()["JobOrdNo"];
        var chksel = table.row($(this).parents('tr')).data()["chksel"];
        var IsChecked = $(this).is(":checked");

        var filtRes = [];
        filtRes = $.grep(secondgridinfo, function (element, index) {
            return element.JobOrderno == OrderNo;
        });

        if (filtRes.length > 0) {

            for (d in filtRes) {
                if (IsChecked) {
                    filtRes[d]['InvQty'] = filtRes[d]['BalQty'];
                    filtRes[d]['Amount'] = (filtRes[d]['InvQty'] * filtRes[d]['Rate']);
                }
                else {
                    filtRes[d]['InvQty'] = 0;
                    filtRes[d]['Amount'] = 0;
                }
            }

            for (var n in filtRes) {
                var snumb = filtRes[n].Sno;
                for (var t in secondgridinfo) {
                    if (secondgridinfo[t].Sno == snumb) {
                        secondgridinfo[t]['InvQty'] = filtRes[n]['InvQty'];
                        secondgridinfo[t]['Amount'] = filtRes[n]['Amount'];
                    }
                }
            }

            LoadthirdpagesecndGrid(filtRes);

            //Calculate Gross Amount
            CalcGAmount(secondgridinfo);
        }

    });

    $("#tblgrndet").on('click', 'tr', function () {
        debugger;
        var table = $('#tblgrndet').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblgrndet').dataTable().fnGetData(row);

        var JobRecptNo = data.JobRecptNo;
        var JobRecptDate = data.JobRecptDate;
        var OrderNo = data.JobOrdNo;

        $('#txtinvjobordno').val(JobRecptNo);
        $('#txtinvjobdate').val(moment(JobRecptDate).format('DD/MM/YYYY'));

        var filtRes = [];
        filtRes = $.grep(secondgridinfo, function (element, index) {
            return element.JobOrderno == OrderNo;
        });

        if (filtRes.length > 0) {
            //for (var d in filtRes) {
            //    if (IsChecked) {
            //        filtRes[d]['InvQty'] = filtRes[d]['BalQty'];
            //        filtRes[d]['Amount'] = (filtRes[d]['InvQty'] * filtRes[d]['Rate']);
            //    }
            //    else {
            //        filtRes[d]['InvQty'] = 0;
            //        filtRes[d]['Amount'] = 0;
            //    }
            //}


            for (var n in filtRes) {
                var snumb = filtRes[n].Sno;
                for (var t in secondgridinfo) {
                    if (secondgridinfo[t].Sno == snumb) {
                        secondgridinfo[t]['InvQty'] = filtRes[n]['InvQty'];
                        secondgridinfo[t]['Amount'] = filtRes[n]['Amount'];
                    }
                }
            }

            //Calculate Gross Amount
            CalcGAmount(secondgridinfo);

            LoadthirdpagesecndGrid(filtRes);
        }
    });

    $(document).on('keyup', '.txtrevinvqty', function () {
        debugger;
        var table = $('#tblInvGrnDetails').DataTable();
        var row = $(this).closest('tr');
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var BalQty = table.row($(this).parents('tr')).data()["BalQty"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];
        var InvQty = $(this).val();// table.row($(this).parents('tr')).data()["InvQty"];
        if (parseInt(InvQty) > parseInt(BalQty)) {
            //alert("Invoice Qty should not exceed Balance Qty...!");
            var msg = 'Invoice quanitity should not exceed Balance quanitity...!';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $(this).val(BalQty);
            InvQty = BalQty;
        }
        //else {
        for (var d in secondgridinfo) {
            if (secondgridinfo[d]['Sno'] == Sno) {
                secondgridinfo[d]['InvQty'] = $(this).val();
                secondgridinfo[d]['Amount'] = parseFloat(InvQty * Rate);
            }
        }
        LoadthirdpagesecndGrid(secondgridinfo);

        //Calculate Gross Amount
        CalcGAmount(secondgridinfo);
        //}
    });

    $(document).on('keyup', '.txtrevrate', function () {
        var table = $('#tblInvGrnDetails').DataTable();
        var row = $(this).closest('tr');
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var InvQty = table.row($(this).parents('tr')).data()["InvQty"];
        var Rate = $(this).val();

        for (var d in secondgridinfo) {
            if (secondgridinfo[d]['Sno'] == Sno) {
                secondgridinfo[d]['Rate'] = $(this).val();
                secondgridinfo[d]['Amount'] = parseFloat(InvQty * Rate);
            }
        }
        LoadthirdpagesecndGrid(secondgridinfo);

        //Calculate Gross Amount
        CalcGAmount(secondgridinfo);
    });

    $(document).on('keyup', '.txtrevrejrate', function () {
        var table = $('#tblInvGrnDetails').DataTable();
        var row = $(this).closest('tr');
        var Sno = table.row($(this).parents('tr')).data()["Sno"];

        for (var d in secondgridinfo) {
            if (secondgridinfo[d]['Sno'] == Sno) {
                secondgridinfo[d]['RejRate'] = $(this).val();
            }
        }
        LoadthirdpagesecndGrid(secondgridinfo);
    });

    $(document).on('click', '.chkjobrecpt', function () {
        debugger;
        var table = $('#tblJobAddDetails').DataTable();

        var row = $(this).closest('tr');
        var val = table.row($(this).parents('tr')).data()["jobrecptid"];

        if ($(this).is(':checked')) {
            for (var i in entrygriddet) {
                if (entrygriddet[i]['jobrecptid'] == val) {
                    entrygriddet[i]['jobchk'] = 1;
                }
            }
        }
        else {
            for (var d in entrygriddet) {
                if (entrygriddet[d]['jobrecptid'] == val) {
                    entrygriddet[d]['jobchk'] = 0;
                }
            }
        }
    });

    $('#btnAccadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAccHeads').val() == "0") {
            isAllValid = false;
            $('#ddlAccHeads').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlAccHeads').siblings('span.error').css('visibility', 'hidden');
        }


        //if (compList.length == 0) {
        //    leng = 1;
        //}
        //else {
        //    leng = compList.length + 1;
        //}

        if (isAllValid) {
            debugger;
            var AccListObj = {
                Addless: $("#ddlAccHeads option:selected").text(),
                AddLessId: $('#ddlAccHeads').val(),
                PlusOrMinus: $('#txtPlusOrMinus').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmt').val(),
                Pur_Ord_Discountid: 0,
                Pur_Ord_id: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AddPur.push(AccListObj);

            loadAccTable(AddPur);

            var totalAccamnt = 0;
            for (var e = 0; e < AddPur.length; e++) {
                if (AddPur[e].PlusOrMinus == "+") {
                    var amount = AddPur[e].Amount;
                    totalAccamnt = totalAccamnt + parseFloat(amount);
                }
            }

            var GAmt = $('#txtgrossamount').val();
            // var NAmt = $('#txtNetAmt').val();
            var FNAmt = parseFloat(GAmt) + parseFloat(totalAccamnt);

            $('#txtnetamount').val(FNAmt);

            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnAccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AddPur.slice(rowindex);

        $('#ddlAccHeads').val(currentro12[0]['Addlessid']);
        $('#txtPlusOrMinus').val(currentro12[0]['PlusOrMinus']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmt').val(currentro12[0]['Amount']);


        $('#btnAccadd').hide();
        $('#btnAccupdate').show();
    });

    $('#btnAccupdate').click(function () {
        debugger;
        var currentrowsel = AddPur.slice(rowindex);

        currentrowsel[0]['Addlessid'] = $("#ddlAccHeads").val();
        currentrowsel[0]['Addless'] = $("#ddlAccHeads option:selected").text();
        currentrowsel[0]['PlusOrMinus'] = $("#txtPlusOrMinus").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();
        currentrowsel[0]['Amount'] = $("#txtAmt").val();

        AddPur[rowindex] = currentrowsel[0];

        loadAccTable(AddPur);

        $('#btnAccupdate').hide();
        $('#btnAccadd').show();

        fnClearAccControls();
        //if (Mode == 0) {
        //    fnClearCompControls();
        //}
        //else {
        //    fnClearCompControls();

        //}
        //Mode = 0;
    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AddPur.splice(rowindex, 1);
        document.getElementById("tblAccdetails").deleteRow(rowindex + 1);
    });
});

function fnClearAccControls() {
    $('#ddlAccHeads').val('0');
    $('#txtPlusOrMinus').val('');
    $('#txtPer').val('');
    $('#txtAmt').val('');
}

function loadAccTable(AddPur) {
    $('#tblAccdetails').DataTable().destroy();
    debugger;
    $('#tblAccdetails').DataTable({

        data: AddPur,

        columns: [

            { title: "Addlessid", data: "AddLessId", "visible": false },
            { title: "Account Head", data: "Addless" },
             { title: "PlusOrMinus", data: "PlusOrMinus" },
            { title: "Percentage", data: "Percentage" },

            { title: "Amount", data: "Amount" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display: inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnAccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button></div> '

               }
        ]
    });
}

function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtgrossamount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmt').val(Amt);



}

function LoadAccType() {

    $('#txtPlusOrMinus').val("");
    var AccHID = $('#ddlAccHeads').val();

    $.ajax({
        url: "/AccountHeads/GetbyID/" + AccHID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtPlusOrMinus').val(obj.AddlessType);

            }
        }

    });
}

function LoadEditAddless() {
    debugger;
    $.ajax({
        url: "/JobInvoice/LoadEditAddlessgrid",
        data: JSON.stringify({ Invid: JobInvId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            AddPur = result.Value;
            loadAccTable(AddPur);

            var totalAccamnt = 0;
            for (var e = 0; e < AddPur.length; e++) {
                var amount = AddPur[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);
            }

            //    loadItemTable(ItemList);
            // $('#txtNetAmt').val(totalAccamnt.toFixed(3));

            var GAmt = $('#txtGrossAmt').val();
            // var NAmt = $('#txtNetAmt').val();
            var FNAmt = parseFloat(GAmt) + parseFloat(totalAccamnt);

            $('#txtNetAmt').val(FNAmt);
        }

    });
}

function getbyID(JobInvId) {
    debugger;
    $.ajax({
        url: "/JobInvoice/LoadThirdPagFstGridInfoforEdit",
        data: JSON.stringify({ JobInvId: JobInvId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var firstgridinfo = result.Value;
            if (firstgridinfo != null) {
                var JobRecptNo = firstgridinfo[0].JobRecptNo;
                var JobRecptDate = firstgridinfo[0].JobRecptDate;

                $('#txtinvRefno').val(firstgridinfo[0].JobInvRefNo);
                $('#txtinvjobordno').val(JobRecptNo);
                $('#txtinvjobdate').val(moment(JobRecptDate).format('DD/MM/YYYY'));
                $('#txtinvcompany').val(firstgridinfo[0].company);
                $('#txtremarks').val(firstgridinfo[0].Remarks);
                $('#txtinvcompanyid').val(firstgridinfo[0].companyid);
                $('#txtunitorother').val(firstgridinfo[0].UnitorOther);
                $('#txtinvsupplier').val(firstgridinfo[0].supplier);
                $('#txtinvsuppid').val(firstgridinfo[0].supplierid);
                $('#txtentinvno').val(JobRecptNo);
            }

            LoadthirdpagefirstGrid(firstgridinfo);

            $.ajax({
                url: "/JobInvoice/LoadThirdPagScndGridInfoforEdit",
                data: JSON.stringify({ JobInvId: JobInvId }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (res) {
                    debugger;
                    secondgridinfo = res.Value;
                    LoadthirdpagesecndGrid(secondgridinfo);

                    //Calculate Gross Amount
                    CalcGAmount(secondgridinfo);
                }
            });

            LoadEditAddless();
        }
    });
    return false;
}

function CalcGAmount(lst) {
    GAmount = 0;
    if (lst != null) {
        for (var t in lst) {
            if (GAmount == 0) {
                GAmount = lst[t]['Amount'];
            }
            else {
                GAmount = (GAmount + lst[t]['Amount']);
            }
        }
    }

    $('#txtgrossamount').val(GAmount);
    $('#txtnetamount').val(GAmount);
}

function GenerateJobInvoice(table, column, compId, Docum) {
    table = "job_inv_mas",
    column = "Job_Inv_No",
    compId = $('#txtinvcompanyid').val(),
    Docum = 'JOB RECIEPT INVOICE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtentinvno').val(result.Value);
        }
    });
}

function validate() {
    debugger;
    var isValid = true;
    if ($('#txtinvRefno').val().trim() == "") {
        $('#txtinvRefno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtinvRefno').css('border-color', 'lightgrey');
    }

    return isValid;
}

function clickonlist() {
    debugger;

    $('#ddlinvno').empty();
    $('#ddlMSupplier').empty();
    $('#ddlinvrefno').empty();
    $('#ddljobordno').empty();
    $('#ddljobrefno').empty();

    LoadData();
    LoadDDL();
}

function ListFilter() {
    debugger;
    $('#tblMainGrid').DataTable().destroy();
    LoadData();
}

function LoadData() {
    debugger;

    var inputcount = 0;
    $('#tblMainGrid tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblMainGrid').DataTable().destroy();
    }

    var invrefno = "";
    var ONo = $('select#ddlinvrefno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        invrefno == "";
    }
    else {
        invrefno = $('select#ddlinvrefno option:selected').val();
    }

    var jobordno = "";
    var OrdNo = $('select#ddljobordno option:selected').val();

    if (OrdNo == 0 || OrdNo == undefined) {
        jobordno == "";
    }
    else {
        jobordno = $('select#ddlinvrefno option:selected').val();
    }

    var companyid = $('#ddlMCompany').val();
    if (companyid == null) {
        companyid = 0;
    }
    var Supplierid = $('#ddlMSupplier').val();
    if (Supplierid == null) {
        Supplierid = 0;
    }

    var invid = $('#ddlinvno').val();
    if (invid == null) {
        invid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        type: "POST",
        url: '/JobInvoice/GetMaindt/',
        data: JSON.stringify({ CompanyId: companyid, SupplierId: Supplierid, InvoiceId: invid, InvRefNo: invrefno, FromDate: FDate, ToDate: TDate, JobOrdNo: jobordno }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;

            $('#tblMainGrid').DataTable({
                data: maintbllist,
                columns: [
                    { title: "ID", data: "JobInvId", "visible": false },
                    { title: "Invoice No", data: "Job_Inv_No" },

            { title: "Invoice Ref No", data: "Sup_Inv_No" },
            {
                title: "Invoice Date", data: "Job_Inv_Date",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            {
                title: "Invoice Ref Date", data: "Sup_Inv_Date",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "SupplierId", data: "SupplierId", "visible": false },
            { title: "Supplier", data: "Supplier" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + JobInvEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + JobInvDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button"  ' + JobInvPrintFlg + ' class="CuttRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadDDL() {
    debugger;

    var inputcount = 0;
    $('#tblMainGrid tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblMainGrid').DataTable().destroy();
    }

    var invrefno = "";
    var ONo = $('select#ddlinvrefno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        invrefno == "";
    }
    else {
        invrefno = $('select#ddlinvrefno option:selected').val();
    }

    var companyid = $('#ddlMCompany').val();
    if (companyid == null) {
        companyid = 0;
    }
    var Supplierid = $('#ddlMSupplier').val();
    if (Supplierid == null) {
        Supplierid = 0;
    }

    var invid = $('#ddlinvno').val();
    if (invid == null) {
        invid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        type: "POST",
        url: '/JobInvoice/GetMaindt/',
        data: JSON.stringify({ CompanyId: companyid, SupplierId: Supplierid, InvoiceId: invid, InvRefNo: invrefno, FromDate: FDate, ToDate: TDate }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;

            $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
            $.each(maintbllist, function () {
                $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
            });

            $(ddlinvno).append($('<option/>').val('0').text('--Select Invoice No--'));
            $.each(maintbllist, function () {
                $(ddlinvno).append($('<option></option>').val(this.JobInvId).text(this.Job_Inv_No));
            });

            $(ddlinvrefno).append($('<option/>').val('0').text('--Select Inv Ref No--'));
            $.each(maintbllist, function () {
                $(ddlinvrefno).append($('<option></option>').text(this.Sup_Inv_No));
            });

            $(ddljobrefno).append($('<option/>').val('0').text('--Select Job Ref No--'));
            $.each(maintbllist, function () {
                $(ddljobrefno).append($('<option></option>').text(this.JobRefNo));
            });

            $(ddljobordno).append($('<option/>').val('0').text('--Select Job Ord No--'));
            $.each(maintbllist, function () {
                $(ddljobordno).append($('<option></option>').text(this.JobOrdNo));
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }

    var JobInvObj = {
        Job_Inv_No: $('#txtentinvno').val(),
        Sup_Inv_No: $('#txtinvRefno').val(),
        Job_Inv_Date: $('#txtentinvdate').val(),
        Sup_Inv_Date: $('#txtentinvdate').val(),
        SupplierId: $('#txtinvsuppid').val(),
        Unit_or_Other: $('#txtunitorother').val(),
        Passed: 0,
        Remarks: $('#txtremarks').val(),
        Gross_Amount: $('#txtgrossamount').val(),
        Addless_Amount: 0,
        Invoice_value: 0,
        Payment_Amt: 0,
        CreatedBy: Userid,
        JobinvDet: secondgridinfo,
        JobinvAorL: AddPur,
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/JobInvoice/Add",
        data: JSON.stringify(JobInvObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value) {
                //alert("Record saved successfully...");
                var msg = 'Record saved successfully...';
                var flg = 1;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $("#btnAdd").attr("disabled", false);
                $('#myModal1').modal('hide');
                $('#myModal').modal('hide');
                LoadData();
                Mode = 0;
            }
            else {
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
    var res = validate();
    if (res == false) {
        return false;
    }

    var JobInvObj = {
        JobInvId: JobInvId,
        Job_Inv_No: $('#txtentinvno').val(),
        Sup_Inv_No: $('#txtinvRefno').val(),
        Job_Inv_Date: $('#txtentinvdate').val(),
        Sup_Inv_Date: $('#txtentinvdate').val(),
        SupplierId: $('#txtinvsuppid').val(),
        Unit_or_Other: $('#txtunitorother').val(),
        Passed: 0,
        Remarks: $('#txtremarks').val(),
        Gross_Amount: $('#txtgrossamount').val(),
        Addless_Amount: 0,
        Invoice_value: 0,
        Payment_Amt: 0,
        CreatedBy: Userid,
        JobinvDet: secondgridinfo,
        JobinvAorL: AddPur,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/JobInvoice/Update",
        data: JSON.stringify(JobInvObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value) {
                //alert("Record updated successfully...");
                var msg = 'Record updated successfully...';
                var flg = 1;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $("#btnUpdate").attr("disabled", false);
                $('#myModal1').modal('hide');
                $('#myModal').modal('hide');
                LoadData();
                Mode = 0;
            }
            else {
                //alert("Record updated failed...");
                var msg = 'Record updated failed...';
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

function Cleartextbox() {
    debugger;
    //companyid = $("#ddlMCompany").val();

    //if (companyid == 0) {
    //    alert("Please select company");
    //}
    //else {
    $('#myModal').modal('show');

    $('#ddlACompany').empty();
    $('#ddlASupplier').empty();
    $('#ddlARefno').empty();
    $('#ddlJobordno').empty();
    $('#ddlordno').empty();

    $('#ddlrecptno').empty();
    $('#ddlrefno').empty();
    Loadgridddl();
    //$('#ddlACompany').val(companyid);
    //}
}

function LoadAddDetails() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlordno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlordno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlARefno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlARefno option:selected').val();
    }

    var jobordNo = "";
    var JONo = $('select#ddlJobordno option:selected').val();

    if (JONo == 0 || JONo == undefined) {
        jobordNo == "";
    }
    else {

        jobordNo = $('select#ddlJobordno option:selected').val();
    }

    var RecptNo = "";
    var RetNo = $('select#ddlrecptno option:selected').val();

    if (RetNo == 0 || RetNo == undefined) {
        RecptNo == "";
    }
    else {

        RecptNo = $('select#ddlrecptno option:selected').val();
    }

    var cmpyid = $('select#ddlACompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    var suppid = $('select#ddlASupplier option:selected').val();
    if (suppid == null || suppid == "0") {
        suppid = 0;
    }

    var procid = $('select#ddlrecptno option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var rref = '';

    var protype = $('input[name="type"]:checked').attr('value');
    $.ajax({
        url: "/JobInvoice/Loadgrid",
        data: JSON.stringify({ cmpid: cmpyid, suppid: suppid, jobordno: jobordNo, recptid: procid, recptno: RecptNo, rrefno: rref, refno: RecNo, orderno: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            LoadEntrytab(entrygriddet);
        }
    });
}

function Loadgridddl() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlordno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlordno option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlARefno option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlARefno option:selected').val();
    }

    var jobordNo = "";
    var JONo = $('select#ddlJobordno option:selected').val();

    if (JONo == 0 || JONo == undefined) {
        jobordNo == "";
    }
    else {

        jobordNo = $('select#ddlJobordno option:selected').val();
    }

    var RecptNo = "";
    var RetNo = $('select#ddlrecptno option:selected').val();

    if (RetNo == 0 || RetNo == undefined) {
        RecptNo == "";
    }
    else {

        RecptNo = $('select#ddlrecptno option:selected').val();
    }

    var cmpyid = $('select#ddlACompany option:selected').val();
    if (cmpyid == null || cmpyid == "0") {
        cmpyid = 0;
    }

    var suppid = $('select#ddlASupplier option:selected').val();
    if (suppid == null || suppid == "0") {
        suppid = 0;
    }

    var procid = $('select#ddlrecptno option:selected').val();
    if (procid == null || procid == "0") {
        procid = 0;
    }
    var rref = '';

    var protype = $('input[name="type"]:checked').attr('value');
    $.ajax({
        url: "/JobInvoice/LoadSndJobOrdgrid",
        data: JSON.stringify({ cmpid: cmpyid, suppid: suppid, jobordno: jobordNo, recptid: procid, recptno: RecptNo, rrefno: rref, refno: RecNo, orderno: ordNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            entrygriddet = result.Value;
            LoadEntrytab(entrygriddet);
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

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
                var udet = {};
                var un = [];
                $.each(data, function (i, el) {

                    if (!compdet[el.cmpid]) {
                        compdet[el.cmpid] = true;
                        comp.push(el);
                    }

                    if (!recptdet[el.refno]) {
                        recptdet[el.refno] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.ordno]) {
                        dcdet[el.ordno] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.jobordno]) {
                        procdet[el.jobordno] = true;
                        proc.push(el);
                    }
                    if (!unitdet[el.recptno]) {
                        unitdet[el.recptno] = true;
                        unit.push(el);
                    }

                    if (!udet[el.suppid]) {
                        udet[el.suppid] = true;
                        un.push(el);
                    }
                });


                $(ddlrecptno).append($('<option/>').val('0').text('--Select Recpt No--'));
                $.each(unit, function () {
                    $(ddlrecptno).append($('<option></option>').text(this.recptno));
                });


                $(ddlJobordno).append($('<option/>').val('0').text('--Select JobOrd No--'));
                $.each(proc, function () {
                    $(ddlJobordno).append($('<option></option>').text(this.jobordno));
                });


                $(ddlARefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(recpt, function () {
                    $(ddlARefno).append($('<option></option>').text(this.refno));
                });

                $(ddlACompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(comp, function () {
                    $(ddlACompany).append($('<option></option>').val(this.cmpid).text(this.cmp));
                });

                $(ddlASupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(un, function () {
                    $(ddlASupplier).append($('<option></option>').val(this.suppid).text(this.supp));
                });

                $(ddlordno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(dc, function () {
                    $(ddlordno).append($('<option></option>').text(this.ordno));
                });
            }
        }
    });
}

function Submit() {
    debugger;
    var receiptid = 0;
    var UnitorOther = 0;
    AddPur = [];

    companyid = $("#ddlACompany").val();

    if (companyid == 0) {
        //alert("Please select company");
        var msg = 'Please select company...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    else {
        var res = $.grep(entrygriddet, function (v) {
            return (v.jobchk === 1);
        });

        if (res.length == 0) {
            //alert('Select atleast onr GRN...');
            var msg = 'Select atleast one GRN...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        var chkSupplier = 0;

        for (var f = 0; f < res.length; f++) {
            var sup = res[f].suppid;
            chkSupplier = $.grep(res, function (v) {
                return (v.suppid != sup);
            });
        }

        if (chkSupplier.length > 0) {
            //alert('Must be same supplier...');
            var msg = 'Must be same supplier...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
        else {
            $('#myModal1').modal('show');

            for (var y = 0; y < res.length; y++) {
                UnitorOther = res[y].UnitorOther;

                if (receiptid == 0) {
                    receiptid = res[y].jobrecptid;
                }
                else {
                    receiptid = receiptid + ',' + res[y].jobrecptid;
                }
            }

            loadAccTable(AddPur);

            $.ajax({
                url: "/JobInvoice/LoadThirdHeaderInfo",
                data: JSON.stringify({ ReceptNo: receiptid }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    var headerinfo = result.Value;

                    $('#txtinvcompany').val($("#ddlACompany option:selected").text());
                    $('#txtinvcompanyid').val(companyid);
                    $('#txtunitorother').val(headerinfo[0].UnitorOther);
                    $('#txtinvsupplier').val(headerinfo[0].supplier);
                    $('#txtinvsuppid').val(headerinfo[0].supplierid);

                    GenerateJobInvoice(table, column, compId, Docum);

                    $.ajax({
                        url: "/JobInvoice/LoadThirdPagFstGridInfo",
                        data: JSON.stringify({ ReceptNo: receiptid }),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            debugger;
                            var firstgridinfo = result.Value;
                            LoadthirdpagefirstGrid(firstgridinfo);

                            if (firstgridinfo != null) {
                                var JobRecptNo = firstgridinfo[0].JobRecptNo;
                                var JobRecptDate = firstgridinfo[0].JobRecptDate;

                                $('#txtinvjobordno').val(JobRecptNo);
                                $('#txtinvjobdate').val(moment(JobRecptDate).format('DD/MM/YYYY'));
                            }

                            $.ajax({
                                url: "/JobInvoice/LoadThirdPagScndGridInfo",
                                data: JSON.stringify({ ReceptNo: receiptid }),
                                type: "POST",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                success: function (res) {
                                    debugger;
                                    secondgridinfo = res.Value;
                                    LoadthirdpagesecndGrid(secondgridinfo);
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}

function LoadthirdpagefirstGrid(lst) {
    var inputcount = 0;
    $('#tblgrndet tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblgrndet').DataTable().destroy();
    }

    $('#tblgrndet').DataTable({
        data: lst,
        columns: [
                    { title: "Sno", data: "Sno" },
                    { title: "Grn No", data: "DCNo" },
                    {
                        title: "Grn Date", data: "JobRecptDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },
                    { title: "Ref No", data: "JobOrdNo" },
                    { title: "JobRecptNo", data: "JobRecptNo" },

                    {
                        title: "Ref Date", data: "JobRecptDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },
                    {
                        title: "Select", data: "chksel",
                        render: function (data) {
                            return '<input type="checkbox" class="editor-active chkgrn" id="chkgrn" value=' + data + ' >';
                        }
                    },
                    //{
                    //    title: "ACTION", "mDataProp": null,
                    //    //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button"  class="CuttRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                    //    "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;" class="btnsndadd btn btn-round btn-primary" > <i class="fa fa-plus"></i> </button>'
                    //}
        ]
    });
}

function LoadthirdpagesecndGrid(list) {
    var inputcount = 0;
    $('#tblInvGrnDetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblInvGrnDetails').DataTable().destroy();
    }

    $('#tblInvGrnDetails').DataTable({
        data: list,
        columns: [
            { title: "Sno", data: "Sno" },
                    { title: "Order No", data: "JobOrderno" },
                    { title: "Style", data: "Style" },
                    { title: "StyleId", data: "StyleId", "visible": false },
                    { title: "JobRecptId", data: "JobRecptId", "visible": false },
                    { title: "Item", data: "Item" },
                    { title: "ItemId", data: "ItemId", "visible": false },
                    { title: "Color", data: "Color" },
                    { title: "ColorId", data: "ColorId", "visible": false },
                    { title: "Size", data: "Size" },
                    { title: "SizeId", data: "SizeId", "visible": false },
                    { title: "Uom", data: "uom", },
                    { title: "Recpt Qty", data: "RecptQty" },
                    { title: "R Rate", data: "Rate" },
                    { title: "BalQty", data: "BalQty" },
                    {
                        title: "Inv Qty", data: "InvQty",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtrevinvqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    {
                        title: "Rate", data: "Rate",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtrevrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Amount", data: "Amount" },
                    { title: "RejQty", data: "RejQty" },
                    {
                        title: "Rej Rate", data: "RejRate",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtrevrejrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    }
        ]
    });
}

function LoadEntrytab(list) {
    $('#tblJobAddDetails').DataTable().destroy();

    $('#tblJobAddDetails').DataTable({
        data: list,
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
                   { title: "JRecptid", data: "jobrecptid", "visible": false },
                   { title: "UnitorOther", data: "UnitorOther", "visible": false },
                   { title: "Job Ord No", data: "jobordno" },
                   { title: "DC No", data: "dcno" },
                   {
                       title: "DC Date", data: "dcdate",
                       render: function (data) {
                           return (moment(data).format("DD/MM/YYYY"));
                       }
                   },
                   { title: "Supplier", data: "supp" },
                   { title: "Job Recpt No", data: "recptno" },
                   {
                       title: "Job Recpt Date", data: "jobrepctdate",
                       render: function (data) {
                           return (moment(data).format("DD/MM/YYYY"));
                       }
                   },
                    { title: "Order No", data: "ordno" },

                   {
                       title: "Group", data: "jobchk",
                       render: function (data) {
                           return '<input type="checkbox" class="editor-active chkjobrecpt" id="chkjobrecpt" value=' + data + ' >';
                       }
                   },
        ]
    });
}

function Delete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/JobInvoice/Delete/" + JobInvId,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    //alert("Record deleted successfully...");
                    var msg = 'Record deleted successfully...';
                    var flg = 2;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $("#btnDelete").attr("disabled", false);
                    $('#myModal1').modal('hide');
                    //$('#tblMainGrid').DataTable().destroy();
                    ListFilter();
                }
                else {
                    //alert("Record deleted failed...");
                    var msg = 'Record deleted failed...';
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
}

