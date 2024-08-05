
var CompanyId = 0;
var Mode = 0;
var bid = 0;
var MainFDate = 0;
var DCompid = 0;
var Guserid = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    LoadCompanyDDL("#ddlCompany,#ddlMCompany");
    // LoadSupplierDDL("#ddlSupplier");
    LoadDepartmentDDL("#ddlDepartment");
    LoadCurrencyDDL("#ddlCurrency");
    ddlmain();

    var fill = localStorage.getItem('BillEntryMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

    //LoadMaingrid();
    LoadSupplierDDL("#ddlSupplier,#ddlMSupplier");
    LoadWorkdivisionDDL("#ddlWorkDiv");

});

function backtomain() {
    //$('#myModal').hide();
    //$('#myModal').modal('hide');
    window.location.href = "/BillEntry/BillEntryIndex";
}

function ClearTextbox() {
    debugger;

    Mode = 0;
    // $('#ddlCompany').val("0");
    $('#ddlSupplier').val("0");
    $('#txtBillNo').val("");
    $('#txtSubBillNo').val("");
    // $('#txtBillDate').val("");
    // $('#txtDate').val("");
    $('#ddlCurrency').val("0");
    $('#txtExRate').val("");
    $('#txtAmount').val("");
    $('#txtremarks').val("");
    $('#ddlDepartment').val("0");

    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();
    getDateentry();
    GenerateNumber();
    var PType = $('input[name="optPro"]:checked').attr('value');

    if (PType == 'E') {
        // LoadSupplierDDL("#ddlSupplier");
        $('#Ispp').show();
        $('#Iwrk').hide();
    } else {
        // LoadWorkdivisionDDL("#ddlSupplier");
        $('#Ispp').hide();
        $('#Iwrk').show();

    }


}

function RadioMBClick() {
    debugger;

    var PType = $('input[name="optMPro"]:checked').attr('value');
    if (PType == 'E') {
        LoadSupplierDDL("#ddlMSupplier");

    } else {

        LoadWorkdivisionDDL("#ddlMSupplier");
    }
    CMainlist();
}

function RadioABClick() {

    var PType = $('input[name="optPro"]:checked').attr('value');
    if (PType == 'E') {
        $('#Ispp').show();
        $('#Iwrk').hide();

    } else {
        $('#Ispp').hide();
        $('#Iwrk').show();

    }

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

}

function getDateentry() {

    //var todaydate = new Date();
    //var day = todaydate.getDate();
    //var Pmonth = todaydate.getMonth() - 2;
    //var Cmonth = todaydate.getMonth() + 1;
    //var year = todaydate.getFullYear();
    //var datestring = Pmonth + "/" + day + "/" + year;
    //var Fdatestring = Cmonth + "/" + day + "/" + year;

    //var day = new Date(),
    //    year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
    //    month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
    //    date = month + '/' + day.getDate() + '/' + year;
    //// $('#txtFromDate').val(date);

    //$('#txtBillDate').val(Fdatestring);
    //$('#txtDate').val(Fdatestring);

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtBillDate').val(Fdatestring);
    $('#txtDate').val(Fdatestring);
    //$('#txtGReqDate').val(Fdatestring);
}

function chkcmpnyid() {
    debugger;
    if (Mode == 0) {
        CompanyId = $('select#ddlCompany option:selected').val();
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
        }
    }

}

function GenerateNumber() {
    debugger;
    table = "BillEntry",
    column = "BillNo",
     compId = $('select#ddlCompany option:selected').val(),
    //compId = CompanyId,
    Docum = 'BILL ENTRY'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtBillNo').val(result.Value);
        }
    });
}

function loadexcrate() {
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

                $('#txtExRate').val(obj.Exchangerate);
            }
        }

    });
}

function LoadMaingrid() {
    debugger;

    var billNo = "";
    var ONo = $('select#ddlMBillNo option:selected').val();

    if (ONo == 0) {
        billNo == "";
    }
    else {

        billNo = $('select#ddlMBillNo option:selected').val();
    }

    if (billNo == null) {
        billNo = "";
    }

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var supp = $('#ddlMSupplier').val();
    if (supp == null) {
        supp = 0;
    } else {
        supp = $('#ddlMSupplier').val();
    }
    //var FDate = new Date($('#txtFromDate').val());
    //var TDate = new Date($('#txtToDate').val());

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var PType = $('input[name="optMPro"]:checked').attr('value');

    var menufilter = CompId + ',' + supp + ',' + billNo + ',' + protype + ',' + FDate + ',' + TDate + ',' + PType ;
    localStorage.setItem('BillEntryMainFilter', menufilter);

    $.ajax({
        url: "/BillEntry/List",
        data: JSON.stringify({ companyId: CompId, suppid: supp, billno: billNo, ordtype: protype, fromDate: FDate, todate: TDate, SuppType: PType }),
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
                bSort: false,
                columns: [
                         { title: "Billid", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Bill No" },
                         { title: "Date" },
                         { title: "Supp Bill No" },
                         { title: "Department" },
                          { title: "Action" },


                ]

            });


            //ddlmain();
            //$('#ddlMCompany').empty();
            //$('#ddlMSupplier').empty();
            //$('#ddlMBillNo').empty();

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
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadMaingridFromBack() {
    debugger;
    var fill = localStorage.getItem('BillEntryMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[4]);
    $('#txtToDate').val(fillobj[5]);


    if (fillobj[6] == 'E') {
        $('#MP').prop('checked', true);
    } else {
        $('#MW').prop('checked', true);
    }

    if (fillobj[3] == 'B') {
        $('#optoutwrkord').prop('checked', true);
    } else if (fillobj[3] == 'S') {
        $('#optoutsaemord').prop('checked', true);
    }
    else if (fillobj[3] == 'G') {
        $('#optouetsamord').prop('checked', true);
    }
    else if (fillobj[3] == 'A') {
        $('#optoeutsamord').prop('checked', true);
    }

    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
  
    $.ajax({
        url: "/BillEntry/List",
        data: JSON.stringify({ companyId: fillobj[0], suppid: fillobj[1], billno: fillobj[2], ordtype: fillobj[3], fromDate: fillobj[4], todate: fillobj[5], SuppType: fillobj[6] }),
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
                bSort: false,
                columns: [
                         { title: "Billid", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Bill No" },
                         { title: "Date" },
                         { title: "Supp Bill No" },
                         { title: "Department" },
                          { title: "Action" },


                ]

            });


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
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainlist() {
    // ddlmain();
    $('#tblbillmaingrid').DataTable().destroy();
    LoadMaingrid();
    ddlmain();
}

function ddlmain() {
    var billNo = "";
    var ONo = $('select#ddlMBillNo option:selected').val();

    if (ONo == 0) {
        billNo == "";
    }
    else {

        billNo = $('select#ddlMBillNo option:selected').val();
    }

    if (billNo == null) {
        billNo = "";
    }

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var supp = $('#ddlMSupplier').val();
    if (supp == null) {
        supp = 0;
    }
    //var FDate = new Date($('#txtFromDate').val());
    //var TDate = new Date($('#txtToDate').val());

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var PType = $('input[name="optMPro"]:checked').attr('value');

    $.ajax({
        url: "/BillEntry/Listdet",
        data: JSON.stringify({ companyId: CompId, suppid: supp, billno: billNo, ordtype: protype, fromDate: FDate, todate: TDate, SuppType: PType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

                var data = json.Value;


                $('#ddlMSupplier').empty();
                $('#ddlMBillNo').empty();

                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(data, function () {
                //    $(ddlMCompany).append($('<option></option>').text(this.company));

                //});

                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    //$(ddlMSupplier).append($('<option></option>').text(this.supplier));

                    $(ddlMSupplier).append($('<option></option>').val(this.SupplierID).text(this.supplier));
                });

                $(ddlMBillNo).append($('<option/>').val('0').text('--Select BillNo--'));
                $.each(data, function () {
                    $(ddlMBillNo).append($('<option></option>').text(this.BillNo));
                });
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(b) {
    debugger;
    Mode = 1;
    $('#myModal').show();
    $('#myModal').modal('show');

    if (Mode == 2) {
        $('#btnUpdate').hide();
        $('#btnDel').show();
    } else {
        $('#btnUpdate').show();
        $('#btnDel').hide();
    }
    $('#btnAdd').hide();
    bid = b;
    $.ajax({
        url: "/BillEntry/Getdet",
        data: JSON.stringify({ billid: bid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            det = result.Value;

            $('#ddlCompany').val(det[0].CompanyID);
            //$('#ddlSupplier').val(det[0].SupplierID);        
            $('#txtBillNo').val(det[0].BillNo);
            $('#txtSubBillNo').val(det[0].SupBillNo);
            $('#ddlCurrency').val(det[0].CurrencyID);
            $('#txtExRate').val(det[0].ExchangeRate);
            $('#txtAmount').val(det[0].Amount);
            $('#txtremarks').val(det[0].Remarks);
            //$('#ddlDepartment').text(det[0].department);
            $(ddlDepartment).empty();
            $(ddlDepartment).append($('<option></option>').text(det[0].department));
            $('#txtBillDate').val(moment(det[0]["BillDate"]).format('DD/MM/YYYY'));
            $('#txtDate').val(moment(det[0]["SupBillDate"]).format('DD/MM/YYYY'));

            if (det[0].Order_Type == 'B') {
                $('input:radio[name="MOType"][value="B"]').prop('checked', true);
            } else if (det[0].Order_Type == "S") {
                $('input:radio[name="MOType"][value="S"]').prop('checked', true);
            } else if (det[0].Order_Type == "G") {
                $('input:radio[name="MOType"][value="G"]').prop('checked', true);
            } else if (det[0].Order_Type == "A") {
                $('input:radio[name="MOType"][value="A"]').prop('checked', true);
            }

            if (det[0].Pur_Type == 'PU') {
                $('input:radio[name="Type"][value="PU"]').prop('checked', true);
            } else if (det[0].Pur_Type == "PR") {
                $('input:radio[name="Type"][value="PR"]').prop('checked', true);
            } else if (det[0].Pur_Type == "PD") {
                $('input:radio[name="Type"][value="PD"]').prop('checked', true);
            } else if (det[0].Pur_Type == "OD") {
                $('input:radio[name="Type"][value="OD"]').prop('checked', true);
            }

            var PType = det[0].SupplierType;

            if (PType == 'E') {
                $('#Ispp').show();
                $('#Iwrk').hide();
                $('#rdEx').prop('checked', true);

                $('#ddlSupplier').val(det[0].SupplierID).trigger('change');

            } else {
                $('#Ispp').hide();
                $('#Iwrk').show();
                $('#ddlWorkDiv').val(det[0].SupplierID).trigger('change');
                $('#rdIn').prop('checked', true);
            }


            if (det[0].IsInvoiced == 'Y') {
                var invno = det[0].InvoiceNo;
                $('#btnUpdate').attr('disabled', true);
                $('#btnDel').attr('disabled', true);
                //alert('This Bill has been invoiced.. -' + invno);
                var msg = 'This Bill has been invoiced.. -' + invno;
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

function Add() {
    debugger;

    var isValid = true;

    if ($('#txtSubBillNo').val().trim() == "") {
        $('#txtSubBillNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtSubBillNo').css('border-color', 'lightgrey');
    }

    if ($('#txtAmount').val().trim() == "") {
        $('#txtAmount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtAmount').css('border-color', 'lightgrey');
    }
    //if ($('#ddlSupplier').val().trim() == "0") {
    //    //$('#ddlSupplier').css('border-color', 'Red');
    //    $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    //$('#ddlSupplier').css('border-color', 'lightgrey');
    //    $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}
    if ($('#ddlCurrency').val().trim() == "0") {
        //$('#ddlCurrency').css('border-color', 'Red');
        $('#ddlCurrency').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlCurrency').css('border-color', 'lightgrey');
        $('#ddlCurrency').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if (isValid == false) {
        //alert('Fill the details...');
        var msg = 'Fill the details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    var ordtype = $('input[name="MOType"]:checked').attr('value');
    var purtype = $('input[name="Type"]:checked').attr('value');


    var DepRefNo = "";
    var DpRNo = $('select#ddlDepartment option:selected').val();

    if (DpRNo == 0) {
        DepRefNo == "";
    }
    else {

        DepRefNo = $('select#ddlDepartment option:selected').text();
    }
    var PType = $('input[name="optPro"]:checked').attr('value');

    var supid = 0
    if (PType == 'E') {

        supid = $('#ddlSupplier option:selected').val();

    } else {

        supid = $('#ddlWorkDiv option:selected').val();
    }
    if (supid > 0) { }
    else {

        //alert('Please select Supplier..');
        var msg = 'Please select Supplier...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

    }

    debugger;
    table = "BillEntry",
    column = "BillNo",
    compId = $('select#ddlCompany option:selected').val(),
    Docum = 'BILL ENTRY'

    var oldbillno = $('#txtBillNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newbillno = result.Value;
            if (oldbillno != newbillno) {
                //alert('Bill No has been changed...');
                var msg = 'Bill Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtBillNo').val(result.Value);
            }
            var obj = {
                // BillID:
                CompanyID: $('select#ddlCompany option:selected').val(),
                BillNo: $('#txtBillNo').val(),
                BillDate: $('#txtBillDate').val(),//new Date($('#txtBillDate').val()),
                SupBillNo: $('#txtSubBillNo').val(),
                SupBillDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                //SupplierID: $('select#ddlSupplier option:selected').val(),
                SupplierID: supid,
                Pur_Type: purtype,
                Order_Type: ordtype,
                Amount: $('#txtAmount').val(),
                CurrencyID: $('select#ddlCurrency option:selected').val(),
                ExchangeRate: $('#txtExRate').val(),
                Remarks: $('#txtremarks').val(),
                IsInvoiced: "N",
                //InvoiceNo:
                department: DepRefNo,
                SupplierType: PType,
                CreatedBy: Guserid
            }
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/BillEntry/Add",
                data: JSON.stringify(obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == 0) {
                        //alert('Data Already Available');
                        var msg = 'Data Already Available...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        //$('#myModal').modal('hide');
                    }
                    else {
                        AddUserEntryLog('Procurement', 'Bills', 'ADD', $("#txtBillNo").val());
                        //alert('Data Saved Successfully');
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        $('#myModal').modal('hide');
                        $("#btnAdd").attr("disabled", false);

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
    var ordtype = $('input[name="MOType"]:checked').attr('value');
    var purtype = $('input[name="Type"]:checked').attr('value');
    var PType = $('input[name="optPro"]:checked').attr('value');
    var supid = 0
    if (PType == 'E') {

        supid = $('#ddlSupplier option:selected').val();

    } else {

        supid = $('#ddlWorkDiv option:selected').val();
    }
    if (supid > 0) { }
    else {

        //alert('Please select Supplier..');
        var msg = 'Please select Supplier...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);

    }

    var obj = {
        BillID: bid,
        CompanyID: $('select#ddlCompany option:selected').val(),
        BillNo: $('#txtBillNo').val(),
        //BillDate: new Date($('#txtBillDate').val()),
        //SupBillNo: $('#txtSubBillNo').val(),
        //SupBillDate: new Date($('#txtDate').val()),
        BillDate: $('#txtBillDate').val(),//new Date($('#txtBillDate').val()),
        SupBillNo: $('#txtSubBillNo').val(),
        SupBillDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        SupplierID: supid,
        Pur_Type: purtype,
        Order_Type: ordtype,
        Amount: $('#txtAmount').val(),
        CurrencyID: $('select#ddlCurrency option:selected').val(),
        ExchangeRate: $('#txtExRate').val(),
        Remarks: $('#txtremarks').val(),
        IsInvoiced: "N",
        //InvoiceNo:
        department: $('select#ddlDepartment option:selected').text(),
        SupplierType: PType
    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BillEntry/Update",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                //alert('Data Already Available');
                var msg = 'Data Already Available...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //$('#myModal').modal('hide');
            }
            else {
                AddUserEntryLog('Procurement', 'Bills', 'UPDATE', $("#txtBillNo").val());
                //alert('Data Updated Successfully');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#myModal').modal('hide');
                $("#btnUpdate").attr("disabled", false);

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(id) {
    debugger;
    //$('#myModal').show();
    //$('#myModal').modal('show');
    //$('#btnUpdate').hide();
    //$('#btnDel').show();
    //$('#btnAdd').hide();
    //var ans = confirm("Are you sure you want to delete this Record?");
    //if (ans) {
    //    LoadingSymb();
    //    $.ajax({
    //        url: "/BillEntry/Delete/" + id,
    //        type: "POST",
    //        contentType: "application/json;charset=UTF-8",
    //        dataType: "json",
    //        success: function (result) {
    //            alert("Data Deleted Sucessfully");
    //            //LoadMaingrid();
    //            window.location.href = "/BillEntry/BillEntryIndex";

    //        },
    //        error: function (errormessage) {
    //            alert(errormessage.responseText);
    //        }
    //    });
    //}

    Mode = 2;
    $('#myModal').show();
    $('#myModal').modal('show');

    if (Mode == 2) {
        $('#btnUpdate').hide();
        $('#btnDel').show();
    } else {
        $('#btnUpdate').show();
        $('#btnDel').hide();
    }
    $('#btnAdd').hide();
    bid = id;

    $.ajax({
        url: "/BillEntry/Getdet",
        data: JSON.stringify({ billid: bid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            det = result.Value;

            $('#ddlCompany').val(det[0].CompanyID);
            //$('#ddlSupplier').val(det[0].SupplierID);        
            $('#txtBillNo').val(det[0].BillNo);
            $('#txtSubBillNo').val(det[0].SupBillNo);
            $('#ddlCurrency').val(det[0].CurrencyID);
            $('#txtExRate').val(det[0].ExchangeRate);
            $('#txtAmount').val(det[0].Amount);
            $('#txtremarks').val(det[0].Remarks);
            //$('#ddlDepartment').text(det[0].department);
            $(ddlDepartment).empty();
            $(ddlDepartment).append($('<option></option>').text(det[0].department));
            $('#txtBillDate').val(moment(det[0]["BillDate"]).format('DD/MM/YYYY'));
            $('#txtDate').val(moment(det[0]["SupBillDate"]).format('DD/MM/YYYY'));

            if (det[0].Order_Type == 'B') {
                $('input:radio[name="MOType"][value="B"]').prop('checked', true);
            } else if (det[0].Order_Type == "S") {
                $('input:radio[name="MOType"][value="S"]').prop('checked', true);
            } else if (det[0].Order_Type == "G") {
                $('input:radio[name="MOType"][value="G"]').prop('checked', true);
            } else if (det[0].Order_Type == "A") {
                $('input:radio[name="MOType"][value="A"]').prop('checked', true);
            }

            if (det[0].Pur_Type == 'PU') {
                $('input:radio[name="Type"][value="PU"]').prop('checked', true);
            } else if (det[0].Pur_Type == "PR") {
                $('input:radio[name="Type"][value="PR"]').prop('checked', true);
            } else if (det[0].Pur_Type == "PD") {
                $('input:radio[name="Type"][value="PD"]').prop('checked', true);
            } else if (det[0].Pur_Type == "OD") {
                $('input:radio[name="Type"][value="OD"]').prop('checked', true);
            }

            var PType = det[0].SupplierType;

            if (PType == 'E') {
                $('#Ispp').show();
                $('#Iwrk').hide();
                $('#rdEx').prop('checked', true);

                $('#ddlSupplier').val(det[0].SupplierID).trigger('change');

            } else {
                $('#Ispp').hide();
                $('#Iwrk').show();
                $('#ddlWorkDiv').val(det[0].SupplierID).trigger('change');
                $('#rdIn').prop('checked', true);
            }


            if (det[0].IsInvoiced == 'Y') {
                var invno = det[0].InvoiceNo;
                $('#btnUpdate').attr('disabled', true);
                $('#btnDel').attr('disabled', true);
                //alert('This Bill has been invoiced.. -' + invno);
                var msg = 'This Bill has been invoiced.. -' + invno;
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

function deletebyid() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/BillEntry/Delete/" + bid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                //alert("Data Deleted Sucessfully");
                //LoadMaingrid();
                //window.location.href = "/BillEntry/BillEntryIndex";
                var msg = 'Data Deleted Sucessfully...';
                var flg = 2;
                var mod = 0;
                var url = "/BillEntry/BillEntryIndex";
                AlartMessage(msg, flg, mod, url);

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

}