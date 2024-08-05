var InvList = [];
var DCompid = 0;
var GUserid = 0;
var TransMasid = 0;
$(document).ready(function () {
    debugger;
    getDate();
    LoadCompanyDDL('#ddlCompany,#ddlACompany');
    LoadSupplierDDL('#ddlSupplier,#ddlASupplier');
    DCompid = $("#hdnDCompid").data('value');
    GUserid = $("#hdnUserid").data('value');
    BankDDl();
    PaymentDDl();
    LoadMainGrid();
    $(document).on('keyup', '.txtPayment', function () {
        debugger;
        var table = $('#tblPaymentdetdetails').DataTable();
        var CSno = table.row($(this).parents('tr')).data()["Pur_Inv_Id"];
        var Val = $(this).val();

        $.each(InvList, function () {
            if (this.Pur_Inv_Id == CSno) {
                this.Adj_Amt = Val;
            }
        });
        var table = $('#tblPaymentdetdetails').DataTable();
        var data = table.rows().data();

        $('input[id=txtPayment]').each(function (ig) {
            if (data[ig].Pur_Inv_Id == CSno) {
                var row = $(this).closest('tr');
                row.find('#txtPayment').focus().val('').val(Val);
            }
        });
        TotAmt();
    });

});

function getDate() {
    debugger;
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = day + "/" + Pmonth + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;

    $('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);
    $('#txtCHKdate').val(Fdatestring);
    $('#txtPaymentDate').val(Fdatestring);

}

function LoadDetails() {
    LoadMainGrid();
}

function LoadData() {
    debugger;


    var Supplierid = $('#ddlASupplier').val();
    if (Supplierid == undefined || Supplierid == null) {

        Supplierid = 0;
    }

    var CmpID = $('#ddlACompany').val();

    if (CmpID == undefined || CmpID == null) {

        CmpID = DCompid;
    }


    var OType = $('input[name="OType"]:checked').attr('value');
    //var PoType = $('input[name="PoType"]:checked').attr('value');
    //var OSType = $('input[name="OSType"]:checked').attr('value');
    //var OPType = $('input[name="OPType"]:checked').attr('value');

    $.ajax({
        url: "/Payment/AddList/",
        type: "POST",
        data: JSON.stringify({ Supplierid: Supplierid, Companyid: CmpID, Type: OType }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            InvList = (result.Value);

            //for (var f = 0; f < InvList.length; f++) {
            //    InvList[f].invoice_date = moment(InvList[f]["invoice_date"]).format('DD/MM/YYYY');

            //}
            loadPurchaseTable();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}

function loadPurchaseTable() {
    debugger;
    var inputcount = 0;
    $('#tblPaymentdetdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblPaymentdetdetails').DataTable().destroy();
    }
    $('#tblPaymentdetdetails').empty();

    $('#tblPaymentdetdetails').DataTable({

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
            { title: "INVOICEID", data: "Pur_Inv_Id", "visible": false },
            { title: "DETID", data: "Trans_Detid", "visible": false },
            { title: "TYPE", data: "Type" },
            { title: "ENTRY NO", data: "InvoiceNo" },
            { title: "ENTRY DATE", data: "InvoiceDate" },
            { title: "INVOICE NO", data: "SupplierInvoiceNo" },
            { title: "AMOUNT", data: "Inv_Amount" },
            { title: "BALANCE", data: "BalanceAmount" },
           // { title: "PAYMENT", data: "Adj_Amt" },
         {
             title: "PAYMENT", data: "Adj_Amt",
             render: function (data) {

                 return '<input type="text" id="txtPayment" class="txtPayment form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

             },
         },
        ]
    });


    $("#tblPaymentdetdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblPaymentdetdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    TotAmt();
}

function TotAmt() {
    var total = 0;
    for (var f = 0; f < InvList.length; f++) {
        total = total + parseFloat(InvList[f].Adj_Amt);
    }
    $('#txttotal').val(total);
}


var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {
    debugger;

    table = "Bill_Adj_mas",
        column = "Trans_No",
    //  compId = $('#ddlCompany').val(),
         compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }

    Docum = 'PAYMENT ENTRY'


    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtPaymentNo').val(result.Value);
        }
    });

}

function clearTextBox() {

    $('#ddlASupplier').val(0);
    $('#txtCHKNo').val("");
    $('#ddlBank').val(0);
    $('#txtNarration').val("");
    $('#txtCHKamount').val("");
    $('#txtRemarks').val("");
    $('#optchq').prop("checked", true);
    $('#OptPur').prop("checked", true);
    $('#optSupp').prop("checked", true);
    $('#btnSave').show();
    $('#btnUpdate').hide();
    $('#btnDelete').hide();

    GenerateNumber();
    LoadData();
}

function BankDDl() {
    debugger;
    $.ajax({
        url: "/Bank/GetBank",
        //data: JSON.stringify({ Type: OType }),
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
                if (!revdet[el.BankId]) {
                    revdet[el.BankId] = true;
                    rev.push(el);
                }
            });
            $('#ddlBank').empty();
            $('#ddlBank').append($('<option/>').val('0').text('--Select Bank--'));
            $.each(rev, function () {
                $('#ddlBank').append($('<option></option>').val(this.BankId).text(this.BankName));
            });
        }
    });


}


function LoadMainGrid() {


    var cmpid = $('#ddlCompany').val();

    if (cmpid == null) {
        cmpid = DCompid;
    } else {
        cmpid = $('#ddlCompany').val();
    }


    var Supplierid = $('#ddlSupplier').val();
    if (Supplierid == undefined || Supplierid == null) {

        Supplierid = 0;
    }
  
    var Payno = $('#ddlShipmentno option:selected').text();
    if (Payno == undefined || Payno == '--Select PaymentNo--') {

        Payno = '';
    }
   // var Payno = '';

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var chkadv = 'Y';

    $.ajax({
        url: "/Payment/GetmainList",
        data: JSON.stringify({ Supplierid: Supplierid, Companyid: cmpid, Paymentno: Payno, FromDate: FDate, ToDate: TDate, advance: chkadv }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tblPaymentdetails tr').each(function () {
                inputcount++;
            });
            //if (inputcount > 0) {
            $('#tblPaymentdetails').DataTable().destroy();
                //var table = $('#tblPaymentdetails').DataTable();
                //var rows = table.clear().draw();
                //$('#tblPaymentdetails').DataTable().rows.add(dataSet);
                //$('#tblPaymentdetails').DataTable().columns.adjust().draw();
            //}
            //else {


                $('#tblPaymentdetails').DataTable({
                    data: dataSet,
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
                             { title: "Paymentid", "visible": false },
                             { title: "COMPANY" },
                             { title: "SUPPLIER" },
                             { title: "PAYMENT NO" },
                             { title: "PAYMENT DATE" },
                             { title: "CHEQUE DATE" },
                             { title: "AMOUNT" },
                             { title: "ACTION" },


                    ]

                });
           // }
          

       
            //if (ChkBuyer) {
            //    var refobj = [];
            //    $.each(dataSet, function (i) {
            //        var obj = {
            //            Buyerid: dataSet[i][10],
            //            Buyer: dataSet[i][2]
            //        }
            //        refobj.push(obj);
            //    });



            //    var revdet = {};
            //    var rev = [];

            //    $.each(refobj, function (i, el) {

            //        if (!revdet[el.Buyerid]) {
            //            revdet[el.Buyerid] = true;
            //            rev.push(el);
            //        }
            //    });

            //    $('#ddlMBuyer').empty();
            //    $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
            //    $.each(rev, function () {
            //        $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
            //    });

            //}

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });
  
}

function getbyID(ID) {
    debugger;
    TransMasid = ID;
    $('#btnSave').hide();
    $('#btnUpdate').show();
    $('#btnDelete').hide();

    LoadDetData(ID);
    LoadMasData(ID);
    $('#myModal1').modal('show');
}

function DeletebyId(ID) {
    debugger;
    TransMasid = ID;
    $('#btnSave').hide();
    $('#btnUpdate').hide();
    $('#btnDelete').show();

    LoadDetData(ID);
    LoadMasData(ID);
    $('#myModal1').modal('show');
}

function LoadDetData(id) {
    debugger;

    $.ajax({
        url: "/Payment/GetEditDet/",
        type: "POST",
        data: JSON.stringify({ Transid: id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            InvList = (result.Value);

            //for (var f = 0; f < InvList.length; f++) {
            //    InvList[f].invoice_date = moment(InvList[f]["invoice_date"]).format('DD/MM/YYYY');

            //}
            loadPurchaseTable();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}

function LoadMasData(id) {
    debugger;

    $.ajax({
        url: "/Payment/GetEditMas/",
        type: "POST",
        data: JSON.stringify({ Transid: id }),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            $('#txtPaymentDate').val(moment(obj[0].Trans_Date).format('DD/MM/YYYY'));
            $('#txtCHKdate').val(moment(obj[0].Cheque_Date).format('DD/MM/YYYY'));
            $('#txtPaymentNo').val(obj[0].Trans_No);
            $('#txtCHKNo').val(obj[0].Cheque_No);
            $('#txtNarration').val(obj[0].Narration);
            $('#txtCHKamount').val(obj[0].Cheque_Amt);
            $('#ddlBank').val(obj[0].Bankid).trigger('change');
            $('#ddlASupplier').val(obj[0].Supplierid).trigger('change');
            $('#ddlACompany').val(obj[0].Companyid).trigger('change');
            $('#txtRemarks').val(obj[0].Remarks);


            if (obj[0].Mode == 'H') {
                $('#optchq').prop("checked", true);
            }
            else if (obj[0].Mode == 'D') {
                $('#optdd').prop("checked", true);
            }

            else if (obj[0].Mode == 'C') {
                $('#optcash').prop("checked", true);
            }
            else {
                $('#optrtgs').prop("checked", true);
            }


            if (obj[0].Trans_Type == 'P') {
                $('#OptPur').prop("checked", true);
            }
            else if (obj[0].Trans_Type == 'R') {
                $('#OptProc').prop("checked", true);
            }

            else if (obj[0].Trans_Type == 'D') {
                $('#OptProduc').prop("checked", true);
            }
            else {
                $('#OptJob').prop("checked", true);
            }



            if (obj[0].Type == 'S') {
                $('#optSupp').prop("checked", true);
            }
            else if (obj[0].Type == 'W') {
                $('#optWkd').prop("checked", true);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}



function Save() {
    debugger;

    var PoType = $('input[name="PoType"]:checked').attr('value');

    if ($('#txtPaymentDate').val().trim() == "") {
        $('#txtPaymentDate').css('border-color', 'Red');
        return  false;
    }
    else {
        $('#txtPaymentDate').css('border-color', 'lightgrey');
    }


    var PayDt = $('#txtPaymentDate').val();


    if ($('#txtCHKdate').val().trim() == "") {
        $('#txtCHKdate').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtCHKdate').css('border-color', 'lightgrey');
    }

    var Chkdt = $('#txtCHKdate').val();

   
    if ($('#txtPaymentNo').val().trim() == "") {
        $('#txtPaymentNo').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtPaymentNo').css('border-color', 'lightgrey');
    }

    

    if (PoType == 'H' || PoType == 'D') {
        if ($('#txtCHKNo').val().trim() == "") {
            $('#txtCHKNo').css('border-color', 'Red');
            return false;
        }
        else {
            $('#txtCHKNo').css('border-color', 'lightgrey');
        }
    }

    var Chkno = $('#txtCHKNo').val();

    if ($('#txtNarration').val().trim() == "") {
        $('#txtNarration').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtNarration').css('border-color', 'lightgrey');
    }

    var narr = $('#txtNarration').val();

    if ($('#txtCHKamount').val().trim() == "") {
        $('#txtCHKamount').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtCHKamount').css('border-color', 'lightgrey');
    }

    var Chkamt = $('#txtCHKamount').val();
    if (PoType == 'H' || PoType == 'D') {
        if ($('#ddlBank').val() == 0) {
            $('#ddlBank').siblings(".select2-container").css('border', '1px solid red');
            return false;
        }
        else {
            $('#ddlBank').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    var bankid = $('#ddlBank option:selected').val();


    if ($('#ddlASupplier').val() == 0) {
        $('#ddlASupplier').siblings(".select2-container").css('border', '1px solid red');
        return false;
    }
    else {
        $('#ddlASupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    var Supplierid = $('#ddlASupplier').val();
    if (Supplierid == undefined || Supplierid == null) {

        Supplierid = 0;
    }

    var CmpID = $('#ddlACompany').val();

    if (CmpID == undefined || CmpID == null) {

        CmpID = DCompid;
    }

    var SuppInvNo = $('#ddlSupplierInvNo option:selected').text();

    if (SuppInvNo == undefined || SuppInvNo == '--Select SupplierInvNo--') {

        SuppInvNo = '';
    }
    // var SuppInvNo = '';

    var PType = $('input[name="PType"]:checked').attr('value');
    var OType = $('input[name="OType"]:checked').attr('value');


    var totamt = 0;
    for (var f = 0; f < InvList.length; f++) {
        totamt = totamt + parseFloat(InvList[f].Adj_Amt);

    }

    if (totamt == Chkamt) {

    } else {
        //alert('Please Check Payment Amount ..');
        var msg = 'Please Check Payment Amount...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return false;
    }
    //var Entryno = $('#txtPaymentNo').val();
    debugger;
    table = "Bill_Adj_mas",
    column = "Trans_No",
    compId = $('#ddlCompany').val();

    if (compId == null) {
        compId = DCompid;
    } else {
        compId = $('#ddlCompany').val();
    }
    Docum = 'PAYMENT ENTRY'

    var oldPaymentNo = $('#txtPaymentNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newPaymentNo = result.Value;
            if (oldPaymentNo != newPaymentNo) {
                //alert('Payment No has been changed...');
                var msg = 'Payment Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtPaymentNo').val(result.Value);
            }
            var obj = {
                Trans_Type: OType,
                Trans_No: $('#txtPaymentNo').val(),
                Trans_Date: PayDt,
                Supplierid: Supplierid,
                Type: PType,
                Cheque_No: Chkno,
                Cheque_Date: Chkdt,
                Cheque_Amt: Chkamt,
                Remarks: $('#txtRemarks').val(),
                Narration: narr,
                Bankid: bankid,
                Companyid: CmpID,
                Trans_masid: 0,
                Advance_Amt: Chkamt,
                Mode: PoType,
                CreatedBy: GUserid,
                Det: InvList,
            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();

            $.ajax({
                url: "/Payment/Add/",
                type: "POST",
                data: JSON.stringify(obj),
                async: false,
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == true) {
                        AddUserEntryLog('Procurement', 'Payment', 'ADD', $("#txtPaymentNo").val());
                        //alert("Payment Added Sucessfully..");
                        //window.location.href = "/Payment/PaymentIndex";
                        var msg = 'Payment Added Sucessfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/Payment/PaymentIndex";
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

function chkpotype() {

    var PoType = $('input[name="PoType"]:checked').attr('value');

    if (PoType == 'H') {

        $('#txtCHKNo').val("");
        $('#ddlBank').val(0);
        $("#txtCHKNo").attr("disabled", false);
        $("#ddlBank").attr("disabled", false);
    }
    else if (PoType == 'D') {
        $('#txtCHKNo').val("");
        $('#ddlBank').val(0);
        $("#txtCHKNo").attr("disabled", false);
        $("#ddlBank").attr("disabled", false);
    }

    else if (PoType == 'C') {
        $('#txtCHKNo').val("");
        $('#ddlBank').val(0);
        $("#txtCHKNo").attr("disabled", true);
        $("#ddlBank").attr("disabled", true);
    }
    else {
        $('#txtCHKNo').val("");
        $('#ddlBank').val(0);
        $("#txtCHKNo").attr("disabled", true);
        $("#ddlBank").attr("disabled", true);
    }

}

function Update() {
    debugger;
    var PoType = $('input[name="PoType"]:checked').attr('value');

    if ($('#txtPaymentDate').val().trim() == "") {
        $('#txtPaymentDate').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtPaymentDate').css('border-color', 'lightgrey');
    }


    var PayDt = $('#txtPaymentDate').val();


    if ($('#txtCHKdate').val().trim() == "") {
        $('#txtCHKdate').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtCHKdate').css('border-color', 'lightgrey');
    }

    var Chkdt = $('#txtCHKdate').val();


    if ($('#txtPaymentNo').val().trim() == "") {
        $('#txtPaymentNo').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtPaymentNo').css('border-color', 'lightgrey');
    }

    var Entryno = $('#txtPaymentNo').val();

    if (PoType == 'H' || PoType == 'D') {
        if ($('#txtCHKNo').val().trim() == "") {
            $('#txtCHKNo').css('border-color', 'Red');
            return false;
        }
        else {
            $('#txtCHKNo').css('border-color', 'lightgrey');
        }
    }

    var Chkno = $('#txtCHKNo').val();

    if ($('#txtNarration').val().trim() == "") {
        $('#txtNarration').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtNarration').css('border-color', 'lightgrey');
    }

    var narr = $('#txtNarration').val();

    if ($('#txtCHKamount').val().trim() == "") {
        $('#txtCHKamount').css('border-color', 'Red');
        return false;
    }
    else {
        $('#txtCHKamount').css('border-color', 'lightgrey');
    }

    var Chkamt = $('#txtCHKamount').val();
    if (PoType == 'H' || PoType == 'D') {
        if ($('#ddlBank').val() == 0) {
            $('#ddlBank').siblings(".select2-container").css('border', '1px solid red');
            return false;
        }
        else {
            $('#ddlBank').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    var bankid = $('#ddlBank option:selected').val();


    if ($('#ddlASupplier').val() == 0) {
        $('#ddlASupplier').siblings(".select2-container").css('border', '1px solid red');
        return false;
    }
    else {
        $('#ddlASupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    var Supplierid = $('#ddlASupplier').val();
    if (Supplierid == undefined || Supplierid == null) {

        Supplierid = 0;
    }

    var CmpID = $('#ddlACompany').val();

    if (CmpID == undefined || CmpID == null) {

        CmpID = DCompid;
    }

    var SuppInvNo = $('#ddlSupplierInvNo option:selected').text();

    if (SuppInvNo == undefined || SuppInvNo == '--Select SupplierInvNo--') {

        SuppInvNo = '';
    }
    // var SuppInvNo = '';

    var PType = $('input[name="PType"]:checked').attr('value');
    var OType = $('input[name="OType"]:checked').attr('value');
    var totamt = 0;
    for (var f = 0; f < InvList.length; f++) {
        totamt = totamt + parseFloat(InvList[f].Adj_Amt);

    }

    if (totamt == Chkamt) {

    } else {
        //alert('Please Check Payment Amount ..');
        var msg = 'Please Check Payment Amount...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return false;
    }


    var obj = {
        Trans_Type: OType,
        Trans_No: Entryno,
        Trans_Date: PayDt,
        Supplierid: Supplierid,
        Type: PType,
        Cheque_No: Chkno,
        Cheque_Date: Chkdt,
        Cheque_Amt: Chkamt,
        Remarks: $('#txtRemarks').val(),
        Narration: narr,
        Bankid: bankid,
        Companyid: CmpID,
        Trans_masid: TransMasid,
        Advance_Amt: Chkamt,
        Mode: PoType,
        CreatedBy: GUserid,
        Det: InvList,
       
    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/Payment/Update/",
        type: "POST",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Payment', 'UPDATE', $("#txtPaymentNo").val());
                //alert("Payment Updated Sucessfully...");
                //window.location.href = "/Payment/PaymentIndex";
                var msg = 'Payment Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var url = "/Payment/PaymentIndex";
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


function Delete() {
    debugger;
    var PayDt = $('#txtPaymentDate').val();
    var Chkdt = $('#txtCHKdate').val();

    var Entryno = $('#txtPaymentNo').val();
    var Chkno = $('#txtCHKNo').val();
    var narr = $('#txtNarration').val();
    var Chkamt = $('#txtCHKamount').val();
    var bankid = $('#ddlBank option:selected').val();


    var Supplierid = $('#ddlASupplier').val();
    if (Supplierid == undefined || Supplierid == null) {

        Supplierid = 0;
    }

    var CmpID = $('#ddlACompany').val();

    if (CmpID == undefined || CmpID == null) {

        CmpID = DCompid;
    }

    var SuppInvNo = $('#ddlSupplierInvNo option:selected').text();

    if (SuppInvNo == undefined || SuppInvNo == '--Select SupplierInvNo--') {

        SuppInvNo = '';
    }
    // var SuppInvNo = '';

    var PType = $('input[name="PType"]:checked').attr('value');
    var OType = $('input[name="OType"]:checked').attr('value');
    var PoType = $('input[name="PoType"]:checked').attr('value');


    var obj = {
        Trans_Type: OType,
        Trans_No: Entryno,
        Trans_Date: PayDt,
        Supplierid: Supplierid,
        Type: PType,
        Cheque_No: Chkno,
        Cheque_Date: Chkdt,
        Cheque_Amt: Chkamt,
        Remarks: $('#txtRemarks').val(),
        Narration: narr,
        Bankid: bankid,
        Companyid: CmpID,
        Trans_masid: TransMasid,
        Advance_Amt: Chkamt,
        Mode: PoType,
        CreatedBy: GUserid,
        Det: InvList,
    }
    $("#btnDelete").attr("disabled", true);
    LoadingSymb();

    $.ajax({
        url: "/Payment/Delete/",
        type: "POST",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                AddUserEntryLog('Procurement', 'Payment', 'DELETE', $("#txtPaymentNo").val());
                //alert("Payment Deleted Sucessfully..");
                //window.location.href = "/Payment/PaymentIndex";
                var msg = 'Payment Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "/Payment/PaymentIndex";
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

function PaymentDDl() {
    debugger;

    var cmpid = $('#ddlCompany').val();

    if (cmpid == null) {
        cmpid = DCompid;
    } else {
        cmpid = $('#ddlCompany').val();
    }

    $.ajax({
        url: "/Payment/GetPaymentNo",
        data: JSON.stringify({ Companyid: cmpid }),
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
                if (!revdet[el.Trans_masid]) {
                    revdet[el.Trans_masid] = true;
                    rev.push(el);
                }
            });
            $('#ddlShipmentno').empty();
            $('#ddlShipmentno').append($('<option/>').val('0').text('--Select PaymentNo--'));
            $.each(rev, function () {
                $('#ddlShipmentno').append($('<option></option>').val(this.Trans_masid).text(this.Trans_No));
            });
        }
    });


}