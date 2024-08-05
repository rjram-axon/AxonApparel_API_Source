var Itmdet = [];
var AccList = [];
var CompanyId = 0;
var Invid = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var repobj = [];
var Repid = 0;
var Guserid = 0;
var GCompId = 0;
var DCompid = 0;
var ChkOrdno = true;
var ChkSupplier = true;
var ChkUnit = true;
var ChkComp = false;
var ChkEntryno = true;
var DtChk = false;
var ChkBillNo = 0;
var GBillAmount = 0;
var GBillDate = 0;
var GCompId = 0;
var GSuppId = 0;
var GOtype = 0;
var admod = 0;
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    ChkBillNo = $("#hdncheckBillsToInvoiceEntry").data('value');
    LoadCompanyDDL("#ddlcompany,#ddlMCompany");
    LoadSupplierDDL("#ddlSupplier");
    LoadCompanyUnitDDL("#ddlCompanyUnit,#ddlMcompanyunit");
    LoadJobNoDDL("#ddlwrkord");
    LoadUomDDL("#ddlunit");
    LoadItemDDL("#ddlcost");
    //LoadRefNoDDL("#ddlrefno");
    //LoadOrderNoDDL("#ddlorderno");
    LoadBulkOrdRefNoDDL("#ddlrefno");
    LoadBulkOrderNoDDL("#ddlorderno");
    LoadCurrencyDDL("#ddlCurrency");
    LoadAddlessDDL("#ddlAcc");
    getDate();
    var fill = localStorage.getItem('OpenInvoiceMainFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

    //LoadMaingrid();
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
    $('#btnitmadd').click(function () {
        debugger;
        var isAllValid = true;
        var lengdp = 0;


        var ordno = 0;
        var ordnoid = 0;

        var wrkno = 0;
        var wrkid = 0;

        var refno = 0;
        var refnoid = 0;





        var FType = $('input[name="MOType"]:checked').attr('value');

        if (FType == "G") {
        } else {

            if ($('#ddlorderno').val() == "0") {
                isAllValid = false;
                // $('#ddlorderno').css('border-color', 'Red');
                $('#ddlorderno').siblings(".select2-container").css('border', '1px solid red');
            }
            else {
                //$('#ddlorderno').css('border-color', 'lightgrey');
                $('#ddlorderno').siblings(".select2-container").css('border', '1px solid lightgrey');
            }

            if ($('#ddlrefno').val() == "0") {
                isAllValid = false;
                //$('#ddlrefno').css('border-color', 'Red');
                $('#ddlrefno').siblings(".select2-container").css('border', '1px solid red');
            }
            else {
                // $('#ddlrefno').css('border-color', 'lightgrey');
                $('#ddlrefno').siblings(".select2-container").css('border', '1px solid lightgrey');
            }

            if ($('#ddlwrkord').val() == "0") {
                isAllValid = false;
                // $('#ddlwrkord').css('border-color', 'Red');
                $('#ddlwrkord').siblings(".select2-container").css('border', '1px solid red');
            }
            else {
                //$('#ddlwrkord').css('border-color', 'lightgrey');
                $('#ddlwrkord').siblings(".select2-container").css('border', '1px solid lightgrey');
            }
        }
        if (Itmdet.length == 0) {
            lengdp = 1;
        }
        else {
            lengdp = Itmdet.length + 1;
        }


        if (FType == "G") {

            ordno = "";
            ordnoid = 0;

            wrkno = "";
            wrkid = 0;

            refno = "";
            refnoid = 0;



        } else {

            ordno = $("#ddlorderno option:selected").text();
            ordnoid = $("#ddlorderno option:selected").val();

            wrkno = $("#ddlwrkord option:selected").text();
            wrkid = $("#ddlwrkord option:selected").val();

            refno = $("#ddlrefno option:selected").text();
            refnoid = $("#ddlrefno option:selected").val();
        }


        if (isAllValid) {

            var DetObj = {
                slno: lengdp,
                Open_Inv_DetID: 0,

                ordid: ordnoid,// $("#ddlorderno option:selected").val(),
                Order_No: ordno,//$("#ddlorderno option:selected").text(),
                jobid: wrkid,//$("#ddlwrkord option:selected").val(),
                Job_Ord_No: wrkno, //$("#ddlwrkord option:selected").text(),
                refid: refnoid,//$("#ddlrefno option:selected").val(),
                Refno: refno,//$("#ddlrefno option:selected").text(),
                UOMID: $("#ddlunit option:selected").val(),
                uom: $("#ddlunit option:selected").text(),
                Qty: $("#txtqty").val(),
                Rate: $("#txtRate").val(),
                Amount: $("#txtamt").val(),
                CostHead: $("#ddlcost option:selected").text(),
                CostHeadID: $("#ddlcost option:selected").val(),
            }
            Itmdet.push(DetObj);
            LoadItmtab(Itmdet);

            //var totalAccamnt = 0;
            //for (var e = 0; e < Itmdet.length; e++) {
            //    var amount = Itmdet[e].Amount;
            //    totalAccamnt = totalAccamnt + parseFloat(amount);

            //}

            //$('#txtTotalAmount').val(totalAccamnt.toFixed(3));
            //var GAmt = $('#txtTotalAmount').val();
            //var NAmt = $('#txtnetamnt').val();
            //if (NAmt == "" || NAmt =="NaN") {
            //    NAmt = 0;
            //}
            //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            //$('#txtGrossAmount').val(parseFloat(FNAmt).toFixed(2));
            //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));

            LoadNetGrossAmt();
        }
        fnClearcDetailsControls();
    });

    $(document).on('click', '.btnitmedit', function () {

        debugger;
        rowindex = $(this).closest('tr').index();
        var cur1 = Itmdet.slice(rowindex);
         admod = 1;
        $('#ddlorderno').val(cur1[0]['ordid']).trigger('change');
        $('#ddlwrkord').val(cur1[0]['jobid']).trigger('change');
        $('#ddlrefno').val(cur1[0]['ordid']).trigger('change');
        $('#ddlcost').val(cur1[0]['CostHeadID']).trigger('change');
        $('#ddlunit').val(cur1[0]['UOMID']).trigger('change');
        $('#txtqty').val(cur1[0]['Qty']);
        $('#txtRate').val(cur1[0]['Rate']);
        $('#txtamt').val(cur1[0]['Amount']);


        $('#btnitmadd').hide();
       
        $('#btnitmupdate').show();
    });

    $('#btnitmupdate').click(function () {
        debugger;
        $('#txtGrossAmount').val('');
        $('#txtnetamnt').val('');

        var currentrowsel = Itmdet.slice(rowindex);

        var FType = $('input[name="MOType"]:checked').attr('value');

        if (FType == "G") {

            ordno = "";
            ordnoid = 0;

            wrkno = "";
            wrkid = 0;

            refno = "";
            refnoid = 0;

        } else {

            ordno = $("#ddlorderno option:selected").text();
            ordnoid = $("#ddlorderno option:selected").val();

            wrkno = $("#ddlwrkord option:selected").text();
            wrkid = $("#ddlwrkord option:selected").val();

            refno = $("#ddlrefno option:selected").text();
            refnoid = $("#ddlrefno option:selected").val();
        }

        currentrowsel[0]['ordid'] = ordnoid;// $("#ddlorderno").val();
        currentrowsel[0]['Order_No'] = ordno;//$("#ddlorderno option:selected").text();
        currentrowsel[0]['jobid'] = wrkid;//$("#ddlwrkord").val();
        currentrowsel[0]['Job_Ord_No'] = wrkno;//$("#ddlwrkord option:selected").text();
        currentrowsel[0]['refid'] = refnoid; //$("#ddlrefno").val();
        currentrowsel[0]['Refno'] = refno; //$("#ddlrefno  option:selected").text();
        currentrowsel[0]['UOMID'] = $("#ddlunit").val();
        currentrowsel[0]['uom'] = $("#ddlunit  option:selected").text();
        currentrowsel[0]['Qty'] = $("#txtqty").val();

        currentrowsel[0]['CostHead'] = $("#ddlcost option:selected").text();
        currentrowsel[0]['CostHeadID'] = $("#ddlcost").val();

        currentrowsel[0]['Rate'] = $("#txtRate").val();
        currentrowsel[0]['Amount'] = $("#txtamt").val();



        Itmdet[rowindex] = currentrowsel[0];

        LoadItmtab(Itmdet);

        //var totalAccamnt = 0;
        //for (var e = 0; e < Itmdet.length; e++) {
        //    var amount = Itmdet[e].Amount;
        //    totalAccamnt = totalAccamnt + parseFloat(amount);

        //}

        //$('#txtTotalAmount').val(totalAccamnt.toFixed(3));
        //var GAmt = $('#txtTotalAmount').val();
        //var NAmt = $('#txtnetamnt').val();
        //if (NAmt == "") {
        //    NAmt = 0;
        //}
        //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

        //$('#txtGrossAmount').val(parseFloat(FNAmt).toFixed(2));
        //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));


        //var totalAccamnt = 0;
        //for (var e = 0; e < AccList.length; e++) {
        //    var amount = AccList[e].Amount;
        //    totalAccamnt = totalAccamnt + parseFloat(amount);

        //}

        //$('#txtnetamnt').val(totalAccamnt.toFixed(3));

        //var GAmt = $('#txtTotalAmount').val();
        //var NAmt = $('#txtnetamnt').val();
        //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

        //$('#txtGrossAmount').val(GAmt);
        //$('#txtnetamnt').val(FNAmt);


        //$('#txtGrossAmount').val(parseFloat(GAmt).toFixed(2));
        //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));
        LoadNetGrossAmt();

        fnClearcDetailsControls();
        $('#btnitmadd').show();
        admod = 0;
        $('#btnitmupdate').hide();
    });

    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();

        Itmdet.splice(rowindex, 1);
        document.getElementById("tblitmdetails").deleteRow(rowindex + 1);


    });



    $('#btnImadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAcc').val() == "0") {
            isAllValid = false;
            //$('#ddlAcc').siblings('span.error').css('visibility', 'visible');
            $('#ddlAcc').siblings(".select2-container").css('border', '1px solid red');
        }
        else {
            //$('#ddlAcc').siblings('span.error').css('visibility', 'hidden');
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
                addless: $("#ddlAcc option:selected").text(),
                addlessid: $('#ddlAcc').val(),
                AorL: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                Amount: $('#txtAmount').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);

            //var totalAccamnt = 0;
            //for (var e = 0; e < AccList.length; e++) {
            //    var amount = AccList[e].Amount;
            //    var AorL = AccList[e].AorL;

            //    if (AorL == '+') {
            //        totalAccamnt = totalAccamnt + parseFloat(amount);
            //    } else {
            //        totalAccamnt = totalAccamnt - parseFloat(amount);
            //    }

            //}

            //$('#txtnetamnt').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtTotalAmount').val();
            //var NAmt = $('#txtnetamnt').val();
            //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            //$('#txtGrossAmount').val(parseFloat(GAmt).toFixed(2));
            //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));



            //$('#txtBTotAmt').val(FNAmt);

            fnClearAccControls();
        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AccList.slice(rowindex);

        $('#ddlAcc').val(currentro12[0]['addlessid']);
        $('#txtPorMins').val(currentro12[0]['AorL']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmount').val(currentro12[0]['Amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = AccList.slice(rowindex);

        currentrowsel[0]['addlessid'] = $("#ddlAcc").val();
        currentrowsel[0]['addless'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['AorL'] = $("#txtPorMins").val();
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


        //var totalAccamnt = 0;
        //for (var e = 0; e < AccList.length; e++) {
        //    var amount = AccList[e].Amount;
        //    totalAccamnt = totalAccamnt + parseFloat(amount);

        //}

        //$('#txtnetamnt').val(totalAccamnt.toFixed(3));

        //var GAmt = $('#txtTotalAmount').val();
        //var NAmt = $('#txtnetamnt').val();
        //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

        //$('#txtGrossAmount').val(FNAmt);

        //var totalAccamnt = 0;
        //for (var e = 0; e < AccList.length; e++) {
        //    var amount = AccList[e].Amount;
        //    var AorL = AccList[e].AorL;

        //    if (AorL == '+') {
        //        totalAccamnt = totalAccamnt + parseFloat(amount);
        //    } else {
        //        totalAccamnt = totalAccamnt - parseFloat(amount);
        //    }

        //}

        //$('#txtnetamnt').val(totalAccamnt.toFixed(3));

        //var GAmt = $('#txtTotalAmount').val();
        //var NAmt = $('#txtnetamnt').val();
        //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

        ////$('#txtGrossAmount').val(GAmt);
        ////$('#txtnetamnt').val(FNAmt);


        //$('#txtGrossAmount').val(parseFloat(GAmt).toFixed(2));
        //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));

        LoadNetGrossAmt();

        //$('#txtBTotAmt').val(FNAmt);

        fnClearAccControls();

    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);


        //var totalAccamnt = 0;
        //for (var e = 0; e < AccList.length; e++) {
        //    var amount = AccList[e].Amount;
        //    var AorL = AccList[e].AorL;

        //    if (AorL == '+') {
        //        totalAccamnt = totalAccamnt + parseFloat(amount);
        //    } else {
        //        totalAccamnt = totalAccamnt - parseFloat(amount);
        //    }

        //}

        //$('#txtnetamnt').val(totalAccamnt.toFixed(3));

        //var GAmt = $('#txtTotalAmount').val();
        //var NAmt = $('#txtnetamnt').val();
        //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

        ////$('#txtGrossAmount').val(GAmt);
        ////$('#txtnetamnt').val(FNAmt);

        //$('#txtGrossAmount').val(parseFloat(GAmt).toFixed(2));
        //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));

        LoadNetGrossAmt();

        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
    });

});

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

                $('#txtExchange').val(obj.Exchangerate);
            }
        }

    });
}
function fnClearAccControls() {
    $('#ddlAcc').val('0').trigger('change');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}

function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtTotalAmount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(Amt);



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
function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,
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

               { title: "AddlessId", data: "addlessid", "visible": false },
               { title: "Accounts Head", data: "addless", },
               { title: "+/-", data: "AorL", },
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

    //var totalAccamnt = 0;
    //for (var e = 0; e < AccList.length; e++) {
    //    var amount = AccList[e].Amount;
    //    var AorL = AccList[e].AorL;

    //    if (AorL == '+') {
    //        totalAccamnt = totalAccamnt + parseFloat(amount);
    //    } else {
    //        totalAccamnt = totalAccamnt - parseFloat(amount);
    //    }

    //}



    // $('#txtnetamnt').val(totalAccamnt.toFixed(3));

    //var GAmt = $('#txtTotalAmount').val();
    //var NAmt = totalAccamnt;
    //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);




    //$('#txtGrossAmount').val(parseFloat(GAmt).toFixed(2));
    //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));

    LoadNetGrossAmt();
}

function calcamnt() {
    debugger;
    var rate = $('#txtRate').val();
    var qty = $('#txtqty').val();
    var tot = parseFloat(rate) * parseFloat(qty);
    $('#txtamt').val(tot);
}

function fnClearcDetailsControls() {
    $('#ddlorderno').val('0').trigger('change');
    $('#ddlrefno').val('0').trigger('change');
    $('#ddlwrkord').val('0').trigger('change');
    $('#ddlcost').val('0').trigger('change');
    $('#ddlunit').val('0').trigger('change');
    $('#txtqty').val('');
    $('#txtRate').val('');
    $('#txtamt').val('');
    LoadJobNoDDL("#ddlwrkord");
    var FType = $('input[name="MOType"]:checked').attr('value');
    if (FType == 'B') {

        LoadBulkOrdRefNoDDL("#ddlrefno");
        LoadBulkOrderNoDDL("#ddlorderno");

    }
    else if (FType == 'S') {

        LoadSampleOrdRefNoDDL("#ddlrefno");
        LoadSampOrderNoDDL("#ddlorderno");

    } else {
        LoadOrderNoDDL("#ddlorderno");
    }
 
    admod = 0;
}

function ClearTextbox() {
    debugger;
    //   $('#ddlcompany').val("0");
    $('#txtEntryNo').val("");
    $('#txtEntryDate').val("");
    $('#txtInvoiceDate').val("");
    // $('#ddlCompanyUnit').val("0");
    $('#txtInvoiceNo').val("");
    $('#ddlSupplier').val("0").trigger('change');
    $('#ddlCurrency').val("0").trigger('change');
    $('#txtExchange').val("");
    $('#txtGrossAmount').val("");
    $('#txtRemarks').val("");
    $('#txtnetamnt').val("");

    getDate();
    GenerateNumber();

    admod = 0;



    $('#btnUpdate').hide();
    $('#btnDel').hide();
    $('#btnAdd').show();

    if (ChkBillNo == "True") {
        $('#dptInvId').show();
        $('#txtInvId').hide();
        $('#optNewBill').show();
    } else {
        $('#txtInvId').show();
        $('#dptInvId').hide();
        $('#optNewBill').hide();
    }


    Itmdet = [];
    LoadItmtab(Itmdet);
    AccList = [];
    loadAccTable(AccList);
}


function BillNo() {



    //wrkno = $("#ddlwrkord option:selected").text();
    var CompId = $("#ddlcompany option:selected").val();
    var SuppId = $("#ddlSupplier option:selected").val();




    if (SuppId > 0) {

        LoadBillInvNo(CompId, SuppId);
    }
}

//function chkcmpnyid() {
//    debugger;
//    // if (Mode == 0) {
//    CompanyId = $('select#ddlcompany option:selected').val();
//    if (CompanyId == 0) {
//        alert('Select Company...');
//        return true;
//    }
//    else {
//        GenerateNumber();
//    }
//    // }

//}
function GenerateNumber() {
    debugger;
    var CompanyId = $('#ddlcompany').val();
    table = "OpenInvoice_Mas",
    column = "EntryNo",
    compId = CompanyId,
    Docum = 'OPEN INVOICE'

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
    $('#txtEntryDate').val(Fdatestring);
    $('#txtInvoiceDate').val(Fdatestring);

}

//function backtomain() {
//    $('#myModal').hide();
//    $('#myModal').modal('hide');
//}


function LoadItmtab(list) {
    $('#tblitmdetails').DataTable().destroy();

    $('#tblitmdetails').DataTable({
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
                   { title: "SNo", data: "slno", "visible": false },
                   { title: "Detid", data: "Open_Inv_DetID", "visible": false },
                   { title: "Bmasid", data: "ordid", "visible": false },
                   { title: "Order No", data: "Order_No" },
                   { title: "refid", data: "refid", "visible": false },
                   { title: "Ref No", data: "Refno" },
                   { title: "Wrkid", data: "jobid", "visible": false },
                   { title: "Work Order No", data: "Job_Ord_No" },
                    { title: "Cost Head", data: "CostHead" },
                     { title: "Qty", data: "Qty" },
                      { title: "unitid", data: "UOMID", "visible": false },
                   {
                       title: "Unit", data: "uom",

                   },
                    { title: "Rate", data: "Rate" },
                     { title: "Amount", data: "Amount" },


               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>   </div>'

               }
        ]

    });
}

function validate() {
    var isValid = true;
    if ($('#ddlcompany').val().trim() == 0) {
        // $('#ddlcompany').css('border-color', 'Red');
        $('#ddlcompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        // $('#ddlcompany').css('border-color', 'lightgrey');
        $('#ddlcompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    //if ($('#txtInvoiceNo').val().trim() == 0) {
    //    $('#txtInvoiceNo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtInvoiceNo').css('border-color', 'lightgrey');
    //}


    if (ChkBillNo == 'True') {

        if ($('#ddlInvoiceNo').val() == 0) {
            $('#ddlInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    } else {

        if ($('#txtInvoiceNo').val().trim() == "") {
            $('#txtInvoiceNo').css('border-color', 'Red');
            //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#txtInvoiceNo').css('border-color', 'lightgrey');
            //$('#txtInvoiceNo').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }

    if ($('#ddlSupplier').val().trim() == 0) {
        //$('#ddlSupplier').css('border-color', 'Red');
        $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        // $('#ddlSupplier').css('border-color', 'lightgrey');
        $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlCurrency').val().trim() == 0) {
        //$('#ddlCurrency').css('border-color', 'Red');
        $('#ddlCurrency').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        //$('#ddlCurrency').css('border-color', 'lightgrey');
        $('#ddlCurrency').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    return isValid;
}

function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return true;
    }
    var protype = $('input[name="MOType"]:checked').attr('value');
    var IntOrExt = $('input[name="optExt"]:checked').attr('value');

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtnetamnt').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }



    var oldpono = $('#txtEntryNo').val();
    var CompanyId = $('#ddlcompany').val();
    table = "OpenInvoice_Mas",
    column = "EntryNo",
    compId = CompanyId,
    Docum = 'OPEN INVOICE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //$('#txtEntryNo').val(result.Value);
            var newpono = result.Value;
            if (oldpono != newpono) {
                //alert('InvoiceNo has been changed...');
                var msg = 'InvoiceNo has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#EntryNo').val(result.Value);
            }


            var objConSubmit = {


                //Open_InvID: $('#txtHCompanyId').val(),
                CompanyID: $('#ddlcompany').val(),
                Company_UnitID: $('#ddlCompanyUnit').val(),
                EntryNo: $('#txtEntryNo').val(),
                InvoiceNo: InvBillNo,//$('#txtInvoiceNo').val(),
                InvoiceDate: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
                EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),//$('#ddlfromunit').val(),
                SupplierID: $('#ddlSupplier').val(),
                Order_Type: protype,
                Gross_amount: $('#txtGrossAmount').val(),
                Addless_amount: $('#txtnetamnt').val(),
                //AddLessManualOrFormula  : type,// new Date($('#txtRefDate').val()),      
                CurrencyID: $('#ddlCurrency').val(),
                ExchangeRate: $('#txtExchange').val(),
                Remarks: $('#txtRemarks').val(),
                //Payment_Amt: $('#ddlBuyer').val(),
                //paid: $('#ddlBuyer').val(),
                //passed: $('#ddlBuyer').val(),
                InOrEx: IntOrExt,
                OpeninvDet: Itmdet,
                Openinvadless: AccList,
                CreatedBy: Guserid

            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/OpenInvoice/Add",
                data: JSON.stringify(objConSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == true) {


                        if (ChkBillNo == 'True') {
                            AddInvBillNo("Y");
                        }
                        AddUserEntryLog('Procurement', 'Open Invoice', 'ADD', $("#txtEntryNo").val());
                        //alert('Data Saved Successfully');
                        //window.location.href = "/OpenInvoice/OpenInvoiceIndex";
                        var msg = 'Data Saved Successfully...';
                        var flg = 1;
                        var mod = 0;
                        var url = "/OpenInvoice/OpenInvoiceIndex";
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


    //var objConSubmit = {


    //    //Open_InvID: $('#txtHCompanyId').val(),
    //    CompanyID: $('#ddlcompany').val(),
    //    Company_UnitID: $('#ddlCompanyUnit').val(),
    //    EntryNo: $('#txtEntryNo').val(),
    //    InvoiceNo: InvBillNo,//$('#txtInvoiceNo').val(),
    //    InvoiceDate: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
    //    EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),//$('#ddlfromunit').val(),
    //    SupplierID: $('#ddlSupplier').val(),
    //    Order_Type: protype,
    //    Gross_amount: $('#txtGrossAmount').val(),
    //    Addless_amount: $('#txtnetamnt').val(),
    //    //AddLessManualOrFormula  : type,// new Date($('#txtRefDate').val()),      
    //    CurrencyID: $('#ddlCurrency').val(),
    //    ExchangeRate: $('#txtExchange').val(),
    //    Remarks: $('#txtRemarks').val(),
    //    //Payment_Amt: $('#ddlBuyer').val(),
    //    //paid: $('#ddlBuyer').val(),
    //    //passed: $('#ddlBuyer').val(),

    //    OpeninvDet: Itmdet,
    //    Openinvadless: AccList

    //};
    //LoadingSymb();
    //$.ajax({
    //    url: "/OpenInvoice/Add",
    //    data: JSON.stringify(objConSubmit),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        debugger;
    //        if (result.Value == true) {


    //            if (ChkBillNo == 'True') {
    //                AddInvBillNo("Y");
    //            }

    //            alert('Data Saved Successfully');
    //            window.location.href = "/OpenInvoice/OpenInvoiceIndex";

    //        }
    //        else {
    //            window.location.href = "/Error/Index";

    //        }

    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }

    //});




}

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return true;
    }
    var protype = $('input[name="MOType"]:checked').attr('value');
    $.each(Itmdet, function () {
        this.Open_InvID = Invid;
    });
    $.each(AccList, function () {
        this.Open_InvID = Invid;
    });


    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtnetamnt').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#txtInvoiceNo').val();
    }

    var objConSubmit = {


        Open_InvID: Invid,
        CompanyID: $('#ddlcompany').val(),
        Company_UnitID: $('#ddlCompanyUnit').val(),
        EntryNo: $('#txtEntryNo').val(),
        InvoiceNo: $('#txtInvoiceNo').val(),
        InvoiceDate: $('#txtInvoiceDate').val(),//new Date($('#txtInvoiceDate').val()),
        EntryDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),//$('#ddlfromunit').val(),
        SupplierID: $('#ddlSupplier').val(),
        Order_Type: protype,
        Gross_amount: $('#txtGrossAmount').val(),
        Addless_amount: $('#txtnetamnt').val(),
        //AddLessManualOrFormula  : type,// new Date($('#txtRefDate').val()),      
        CurrencyID: $('#ddlCurrency').val(),
        ExchangeRate: $('#txtExchange').val(),
        Remarks: $('#txtRemarks').val(),
        //Payment_Amt: $('#ddlBuyer').val(),
        //paid: $('#ddlBuyer').val(),
        //passed: $('#ddlBuyer').val(),

        OpeninvDet: Itmdet,
        Openinvadless: AccList,
        CreatedBy: Guserid

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/OpenInvoice/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                AddInvBillNo("Y");
                AddUserEntryLog('Procurement', 'Open Invoice', 'UPDATE', $("#txtEntryNo").val());
                //alert('Data Updated Successfully');
                //window.location.href = "/OpenInvoice/OpenInvoiceIndex";
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 0;
                var url = "";
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


    var invtype = $('input[name="optwrkord"]:checked').attr('value');
    var InorEx = $('input[name="optEx"]:checked').attr('value');

    var issNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        issNo == "";
    }
    else {

        issNo = $('select#ddlMOrderNo option:selected').val();
    }
    var refNo = "";
    var Rno = $('select#ddlMrefno option:selected').val();

    if (Rno == 0 || Rno == undefined) {
        refNo == "";
    }
    else {

        refNo = $('select#ddlMrefno option:selected').val();
    }

    var unit = "";
    var enno = $('select#ddlMEntryNo option:selected').val();

    if (enno == 0 || enno == undefined) {
        unit == "";
    }
    else {

        unit = $('select#ddlMEntryNo option:selected').val();
    }




    var opnivnid = 0;


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


    var suppid = $('#ddlMSupplier').val();
    if (suppid == null) {
        suppid = 0;
    }
    var unitid = $('#ddlMcompanyunit').val();
    if (unitid == null) {
        unitid = 0;
    }
    //var unitid = $('#ddlMUnit').val();
    //if (unitid == null) {
    //    unitid = 0;
    //}
    //if(suppid==null
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var menufilter = CompId + ',' + suppid + ',' + unitid + ',' + issNo + ',' + opnivnid + ',' + unit + ',' + invtype + ',' + FDate + ',' + TDate + ',' + InorEx + ',' + refNo;
    localStorage.setItem('OpenInvoiceMainFilter', menufilter);


    $.ajax({
        url: "/OpenInvoice/GetMainDetails",
        data: JSON.stringify({ compid: CompId, suppid: suppid, unitid: unitid, orderno: issNo, opinvid: opnivnid, entryno: unit, otype: invtype, fromDate: FDate, todate: TDate, IorE: InorEx, refno: refNo }),
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
                "bSort": false,
                columns: [
                         { title: "InvoiceID", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Supp BillNo" },
                         { title: "Date" },
                         { title: "Invoice No" },
                         { title: "Invoice Amount" },
                         { title: "Action" },


                ]

            });


            ddlmain();


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

    var fill = localStorage.getItem('OpenInvoiceMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[7]);
    $('#txtToDate').val(fillobj[8]);

    if (fillobj[9] == 'E') {
        $('#OptI').prop('checked', true);
    } else {
        $('#OptE').prop('checked', true);
    }

    if (fillobj[6] == 'B') {
        $('#MB').prop('checked', true);
    } else if (fillobj[6] == 'S') {
        $('#MS').prop('checked', true);
    }
    else if (fillobj[6] == 'G') {
        $('#MG').prop('checked', true);
    }
    else if (fillobj[6] == 'A') {
        $('#MA').prop('checked', true);
    }
   
    if (fillobj[3] == "undefined") {
        fillobj[3] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[10] == "undefined") {
        fillobj[10] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = 0;
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = 0;
    }

    $.ajax({
        url: "/OpenInvoice/GetMainDetails",
        data: JSON.stringify({ compid: fillobj[0], suppid: fillobj[1], unitid: fillobj[2], orderno: fillobj[3], opinvid: fillobj[4], entryno: fillobj[5], otype: fillobj[6], fromDate: fillobj[7], todate: fillobj[8], IorE: fillobj[9], refno: fillobj[10] }),
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
                "bSort": false,
                columns: [
                         { title: "InvoiceID", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Supp BillNo" },
                         { title: "Date" },
                         { title: "Invoice No" },
                         { title: "Invoice Amount" },
                         { title: "Action" },


                ]

            });


            ddlmain();


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
    $('#tblbillmaingrid').DataTable().destroy();
    ChkOrdno = true;
    ChkSupplier = true;
    ChkUnit = true;
    ChkComp = false;
    ChkEntryno = true;
    DtChk = false;
    LoadMaingrid();
}

function OMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    ChkOrdno = false;
    ChkSupplier = false;
    ChkUnit = false;
    ChkComp = false;
    ChkEntryno = true;
    DtChk = false;
    LoadMaingrid();
}

function SMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    ChkOrdno = true;
    ChkSupplier = false;
    ChkUnit = true;
    ChkComp = false;
    ChkEntryno = true;
    DtChk = false;
    LoadMaingrid();
}

function EMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    ChkOrdno = false;
    ChkSupplier = false;
    ChkUnit = false;
    ChkComp = false;
    ChkEntryno = false;
    DtChk = false;
    LoadMaingrid();
}

function UMainlist() {
    $('#tblbillmaingrid').DataTable().destroy();
    ChkOrdno = true;
    ChkSupplier = true;
    ChkUnit = false;
    ChkComp = false;
    ChkEntryno = true;
    DtChk = false;
    LoadMaingrid();
}

function ddlmain() {
    debugger;


    var invtype = $('input[name="optwrkord"]:checked').attr('value');


    var issNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        issNo == "";
    }
    else {

        issNo = $('select#ddlMOrderNo option:selected').val();
    }


    var unit = "";
    var enno = $('select#ddlMEntryNo option:selected').val();

    if (enno == 0) {
        unit == "";
    }
    else {

        unit = $('select#ddlMEntryNo option:selected').val();
    }



    if (issNo == undefined) {
        issNo = "";
    }

    var opnivnid = 0;


    // var CompId = $('#ddlMCompany').val();
    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }
    var suppid = $('#ddlMSupplier').val();
    var unitid = $('#ddlMcompanyunit').val();
    var unit = $('#ddlMUnit').val();
    //if(suppid==null
    //var FDate = new Date($('#txtFromDate').val());
    //var TDate = new Date($('#txtToDate').val());

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/OpenInvoice/Getddl",
        data: JSON.stringify({ compid: CompId, suppid: suppid, unitid: unitid, orderno: issNo, opinvid: opnivnid, entryno: unit, otype: invtype, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;


                var revdet = {};
                var rev = [];


                $.each(data, function (i, el) {

                    if (!revdet[el.orderno]) {
                        revdet[el.orderno] = true;
                        rev.push(el);
                    }
                });

                var supdet = {};
                var sup = [];

                $.each(data, function (i, el) {

                    if (!supdet[el.SupplierID]) {
                        supdet[el.SupplierID] = true;
                        sup.push(el);
                    }
                });

                var unitdet = {};
                var unit = [];

                $.each(data, function (i, el) {

                    if (!unitdet[el.Company_UnitID]) {
                        unitdet[el.Company_UnitID] = true;
                        unit.push(el);
                    }
                });

                var entrydet = {};
                var entry = [];

                $.each(data, function (i, el) {

                    if (!entrydet[el.EntryNo]) {
                        entrydet[el.EntryNo] = true;
                        entry.push(el);
                    }
                });
                var refdet = {};
                var ref = [];
                $.each(data, function (i, el) {

                    if (!refdet[el.refNo]) {
                        refdet[el.refNo] = true;
                        ref.push(el);
                    }
                });

                if (ChkSupplier || ChkComp || DtChk) {
                    $('#ddlMSupplier').empty();
                    $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                    $.each(sup, function () {
                        $(ddlMSupplier).append($('<option></option>').val(this.SupplierID).text(this.supplier));

                    });
                }
                if (ChkUnit || ChkComp || DtChk) {
                    $('#ddlMcompanyunit').empty();
                    $(ddlMcompanyunit).append($('<option/>').val('0').text('--Select CompanyUnit--'));
                    $.each(unit, function () {
                        $(ddlMcompanyunit).append($('<option></option>').val(this.Company_UnitID).text(this.companyunit));

                    });
                }

                if (ChkOrdno || ChkComp || DtChk) {
                    $('#ddlMOrderNo').empty();
                    $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(rev, function () {
                        $(ddlMOrderNo).append($('<option></option>').text(this.orderno));

                    });
                }
                if (ChkEntryno || ChkComp || DtChk) {
                    $('#ddlMEntryNo').empty();
                    $(ddlMEntryNo).append($('<option/>').val('0').text('--Select EntryNo--'));
                    $.each(entry, function () {
                        $(ddlMEntryNo).append($('<option></option>').text(this.EntryNo));

                    });
                }
                if (ChkOrdno || ChkComp || DtChk) {
                    $('#ddlMrefno').empty();
                    $(ddlMrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(ref, function () {
                        $(ddlMrefno).append($('<option></option>').text(this.refNo));

                    });
                }


            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(id) {
    debugger;
    Invid = id;
    $.ajax({
        url: "/OpenInvoice/Loadheaderdet",
        data: JSON.stringify({ invid: id }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnDel').hide();
            $('#btnAdd').hide();

            var obj = result.Value;
            var IorE = obj[0]["InOrEx"];
            $('#ddlcompany').val(obj[0].CompanyID).trigger('change');
            $('#txtEntryNo').val(obj[0].EntryNo);
            $('#ddlCompanyUnit').val(obj[0].Company_UnitID).trigger('change');
            $('#txtInvoiceNo').val(obj[0].InvoiceNo);

            $('#txtExchange').val(obj[0].ExchangeRate);
            $('#txtEntryDate').val(moment(obj[0].IssueDate).format("DD/MM/YYYY"));
            $('#txtInvoiceDate').val(moment(obj[0].IssueDate).format("DD/MM/YYYY"));
            $('#ddlCurrency').val(obj[0].CurrencyID).trigger('change');
            $('#txtGrossAmount').val(obj[0].Gross_amount);
            $('#txtRemarks').val(obj[0].Remarks);
            if (IorE == 'E') {
                LoadSupplierDDL("#ddlSupplier");
            } else {
                LoadWorkdivisionDDL("#ddlSupplier");
            }
            $('#ddlSupplier').val(obj[0].SupplierID).trigger('change');
            //  $('#txtnetamnt').val(obj[0].Addless_amount);

            GCompId = obj[0]["CompanyID"];
            GSuppId = obj[0]["SupplierID"];


            $("#optgord").attr("disabled", true);
            $("#optsord").attr("disabled", true);
            $("#optbord").attr("disabled", true);
            $("#OptInt").attr("disabled", true);
            $("#OptExt").attr("disabled", true);
            $("#ddlSupplier").attr("disabled", true);

            var Mtype = obj[0]["Order_Type"];

          
            if (Mtype == 'B') {

                LoadBulkOrdRefNoDDL("#ddlrefno");
                LoadBulkOrderNoDDL("#ddlorderno");

            }
            else if (Mtype == 'S') {

                LoadSampleOrdRefNoDDL("#ddlrefno");
                LoadSampOrderNoDDL("#ddlorderno");

            } else {
                LoadOrderNoDDL("#ddlorderno");
            }


            GOtype = obj[0]["Order_Type"];

            if (Mtype == "G") {
                $("#optgord").prop("checked", true);
                $("#optsord").prop("checked", false);
                $("#optbord").prop("checked", false);



                $("#ddlorderno").attr("disabled", true);
                $("#ddlrefno").attr("disabled", true);
                $("#ddlwrkord").attr("disabled", true);


            } else if (Mtype == "B") {
                $("#optgord").prop("checked", false);
                $("#optsord").prop("checked", false);
                $("#optbord").prop("checked", true);

                $("#ddlorderno").attr("disabled", false);
                $("#ddlrefno").attr("disabled", false);
                $("#ddlwrkord").attr("disabled", false);


            } else {
                $("#optgord").prop("checked", false);
                $("#optsord").prop("checked", true);
                $("#optbord").prop("checked", false);

                $("#ddlorderno").attr("disabled", false);
                $("#ddlrefno").attr("disabled", false);
                $("#ddlwrkord").attr("disabled", false);
            }





            if (ChkBillNo == "True") {
                $('#dptInvId').show();
                $('#txtInvId').hide();
                $('#optNewBill').show();
            } else {
                $('#txtInvId').show();
                $('#dptInvId').hide();
                $('#optNewBill').hide();
            }


            if (IorE == 'I') {
                $('#OptInt').prop("checked", false);
                $('#OptExt').prop("checked", true);
            } else {
                $('#OptInt').prop("checked", true);
                $('#OptExt').prop("checked", false);
            }

            EditLoadBillInvNoAmt(GCompId, GSuppId);
            GetItmedit(Invid);
            Getaddlsdet(Invid);

            if (obj[0].passed == 1) {
                //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                var msg = 'Bill pass are made for this entry,Cannot update the INVOICE...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#btnUpdate').attr("disabled", true);

            } else if (obj[0].passed == 0) {

                $('#btnUpdate').attr("disabled", false);

            }




        }

    });
}

function GetItmedit(Invid) {
    debugger;
    $.ajax({
        url: "/OpenInvoice/LoadItmedit",
        async: false,
        data: JSON.stringify({ invid: Invid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Itmdet = result.Value;
            LoadItmtab(Itmdet);

            var totalAccamnt = 0;
            for (var e = 0; e < Itmdet.length; e++) {
                var amount = Itmdet[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }

            $('#txtTotalAmount').val(totalAccamnt.toFixed(3));



        }
    });
}

function Getaddlsdet(Invid) {
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


            //if (AccList.length > 0) {
            //    var totalAccamnt = 0;
            //    for (var e = 0; e < AccList.length; e++) {
            //        var amount = AccList[e].Amount;
            //        totalAccamnt = totalAccamnt + parseFloat(amount);

            //    }

            //    $('#txtnetamnt').val(totalAccamnt.toFixed(3));
            //}

            //var totalAccamnt = 0;
            //for (var e = 0; e < AccList.length; e++) {
            //    var amount = AccList[e].Amount;
            //    var AorL = AccList[e].AorL;

            //    if (AorL == '+') {
            //        totalAccamnt = totalAccamnt + parseFloat(amount);
            //    } else {
            //        totalAccamnt = totalAccamnt - parseFloat(amount);
            //    }

            //}

            // $('#txtnetamnt').val(totalAccamnt.toFixed(3));

            //var GAmt = $('#txtTotalAmount').val();
            //var NAmt = totalAccamnt;
            //var FNAmt = parseFloat(GAmt) + parseFloat(NAmt);

            //$('#txtGrossAmount').val(parseFloat(GAmt).toFixed(2));
            //$('#txtnetamnt').val(parseFloat(FNAmt).toFixed(2));
            LoadNetGrossAmt();
        }
    });
}

function OpenDelete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDel").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/OpenInvoice/Delete/" + Invid,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    AddInvBillNo("N");
                    //alert("Data Deleted Sucessfully");

                    //window.location.href = "/OpenInvoice/OpenInvoiceIndex";
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/OpenInvoice/OpenInvoiceIndex";
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
}


function OpenInvPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "OPEN INVOICE";
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
    debugger;
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
    window.open("../ReportInline/Stores/OpenInvoice/OpenInvoiceInlineReport.aspx?Masid=" + Repid + "&Rem=" + p[0] + "&Companyid=" + compid);

}


function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function LoadFOrdDropDetails() {


    var BMasId = $('#ddlorderno').val();
    var JbId = $('#ddlwrkord').val();
    var StyId = 0;
    var RefNo = "";
    var RNo = $('select#ddlrefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlrefno option:selected').val();
    }

    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                //RefNo
                $(ddlrefno).empty();
                $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlrefno).append($('<option></option>').text(this.RefNo));
                });

                //JobNo
                $(ddlwrkord).empty();
                $(ddlwrkord).append($('<option/>').val('0').text('--Select JobNo--'));
                $.each(data, function () {
                    $(ddlwrkord).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                });

                ////Style
                //$(ddlFStyle).empty();
                //$(ddlFStyle).append($('<option/>').val('0').text('--Select Style--'));
                //$.each(data, function () {
                //    $(ddlFStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                //});
            }


        }

    });

}


function LoadFOrdDropDetails() {
    LoadRefJobDropDetails();
}

function LoadRefJobDropDetails() {

    debugger;
    var BMasId = $('#ddlorderno').val();
    var JbId = $('#ddlwrkord').val();
    var StyId = 0;
    var RefNo = "";
    var RNo = $('select#ddlrefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlrefno option:selected').val();
    }

    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                //RefNo
                $(ddlrefno).empty();
                $(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlrefno).append($('<option></option>').text(this.RefNo));
                });

                //JobNo
                $(ddlwrkord).empty();
                $(ddlwrkord).append($('<option/>').val('0').text('--Select JobNo--'));
                $.each(data, function () {
                    $(ddlwrkord).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                });


            }


        }

    });

}

function backtomain() {

    window.location.href = "/OpenInvoice/OpenInvoiceIndex";

}

function RadioMBClick() {

    var FType = $('input[name="MOType"]:checked').attr('value');

    if (FType == "G") {

        $("#ddlorderno").attr("disabled", true);
        $("#ddlrefno").attr("disabled", true);
        $("#ddlwrkord").attr("disabled", true);
    } else {
        $("#ddlorderno").attr("disabled", false);
        $("#ddlrefno").attr("disabled", false);
        $("#ddlwrkord").attr("disabled", false);

        var FType = $('input[name="MOType"]:checked').attr('value');
        if (FType == 'B') {

            LoadBulkOrdRefNoDDL("#ddlrefno");
            LoadBulkOrderNoDDL("#ddlorderno");
           
        }
        else if (FType == 'S') {

            LoadSampleOrdRefNoDDL("#ddlrefno");
            LoadSampOrderNoDDL("#ddlorderno");

        } else {
            LoadOrderNoDDL("#ddlorderno");
        }

    }

    var CompId = $("#ddlcompany option:selected").val();
    var SuppId = $("#ddlSupplier option:selected").val();


    if (SuppId > 0) {

        LoadBillInvNo(CompId, SuppId);
    }
}

function LoadBillInvNo(comid, suppid) {

    var EDate = $('#txtEntryDate').val();
    var billid = 0;
    var PurType = 'OD';

    var FType = $('input[name="MOType"]:checked').attr('value');
    var IntOrExt = $('input[name="optExt"]:checked').attr('value');

    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: comid, SupplierId: suppid, Inv_Date: EDate, BillId: billid, BOrdType: FType, BPurType: PurType, IorE: IntOrExt }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            //GBillAmount = obj[0]["Inv_Amount"];
            //GBillDate = obj[0]["Inv_Date"];
            $('#txtDBillAmount').val('');

            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNo).empty();

                $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });

            }
        }

    });

}

function LoadBillInvNoAmt() {
    debugger;
    var EDate = $('#txtEntryDate').val();
    var billid = $('select#ddlInvoiceNo option:selected').val();//$('#ddlInvoiceNo').val();

    var CompId = $("#ddlcompany option:selected").val();
    var SuppId = $("#ddlSupplier option:selected").val();
    var IntOrExt = $('input[name="optExt"]:checked').attr('value')

    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: CompId, SupplierId: SuppId, Inv_Date: EDate, BillId: billid, IorE: IntOrExt }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (obj != undefined) {

                GBillAmount = obj[0]["Inv_Amount"];

                $('#txtDBillAmount').val(GBillAmount);

                GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                $('#txtInvoiceDate').val(GBillDate);

            }
            else {

            }

        }

    });

}

function EditLoadBillInvNoAmt(GCompId, GSuppId) {
    debugger;
    var EDate = $('#txtEntryDate').val();
    var entryno = $('#txtEntryNo').val();//$('#ddlInvoiceNo').val();


    var PurType = 'OD';

    var FType = GOtype;



    $.ajax({
        url: "/ProcessInvoice/GetEditBillInvNo",
        data: JSON.stringify({ CompanyId: GCompId, SupplierId: GSuppId, Inv_Date: EDate, Entry_No: entryno, BOrdType: FType, BPurType: PurType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNo).empty();

                // $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });
                if (obj.length > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];

                    $('#txtDBillAmount').val(GBillAmount);

                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));

                    $('#txtInvoiceDate').val(GBillDate);
                }
            }

        }

    });

}

function LoadNewBill() {

    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#chkbillStatus').is(":checked");
        if (ischecked == true) {
            LoadBillInvNo(GCompId, GSuppId);
        }
        else {
            EditLoadBillInvNoAmt(GCompId, GSuppId);
        }
    });
}

function AddInvBillNo(MType) {
    debugger;
    var billId = $('#ddlInvoiceNo option:selected').val();
    var EntryNo = $('#txtEntryNo').val();
    $.ajax({
        url: "/ProcessInvoice/BillAdd",
        data: JSON.stringify({ billId: billId, EntryNo: EntryNo, MType: MType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {


            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function Delete(id) {
    debugger;
    Invid = id;
    $.ajax({
        url: "/OpenInvoice/Loadheaderdet",
        data: JSON.stringify({ invid: id }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;

            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnUpdate').hide();
            $('#btnDel').show();
            $('#btnAdd').hide();

            var obj = result.Value;
            $('#ddlcompany').val(obj[0].CompanyID).trigger('change');
            $('#txtEntryNo').val(obj[0].EntryNo);
            $('#ddlCompanyUnit').val(obj[0].Company_UnitID).trigger('change');
            $('#txtInvoiceNo').val(obj[0].InvoiceNo);
            $('#ddlSupplier').val(obj[0].SupplierID).trigger('change');
            $('#txtExchange').val(obj[0].ExchangeRate);
            $('#txtEntryDate').val(moment(obj[0].IssueDate).format("DD/MM/YYYY"));
            $('#txtInvoiceDate').val(moment(obj[0].IssueDate).format("DD/MM/YYYY"));
            $('#ddlCurrency').val(obj[0].CurrencyID).trigger('change');
            $('#txtGrossAmount').val(obj[0].Gross_amount);
            $('#txtRemarks').val(obj[0].Remarks);
            //  $('#txtnetamnt').val(obj[0].Addless_amount);

            GCompId = obj[0]["CompanyID"];
            GSuppId = obj[0]["SupplierID"];


            $("#optgord").attr("disabled", true);
            $("#optsord").attr("disabled", true);
            $("#optbord").attr("disabled", true);


            var Mtype = obj[0]["Order_Type"];

            GOtype = obj[0]["Order_Type"];

            if (Mtype == "G") {
                $("#optgord").prop("checked", true);
                $("#optsord").prop("checked", false);
                $("#optbord").prop("checked", false);



                $("#ddlorderno").attr("disabled", true);
                $("#ddlrefno").attr("disabled", true);
                $("#ddlwrkord").attr("disabled", true);


            } else if (Mtype == "B") {
                $("#optgord").prop("checked", false);
                $("#optsord").prop("checked", false);
                $("#optbord").prop("checked", true);

                $("#ddlorderno").attr("disabled", false);
                $("#ddlrefno").attr("disabled", false);
                $("#ddlwrkord").attr("disabled", false);


            } else {
                $("#optgord").prop("checked", false);
                $("#optsord").prop("checked", true);
                $("#optbord").prop("checked", false);

                $("#ddlorderno").attr("disabled", false);
                $("#ddlrefno").attr("disabled", false);
                $("#ddlwrkord").attr("disabled", false);
            }


            if (ChkBillNo == "True") {
                $('#dptInvId').show();
                $('#txtInvId').hide();
                $('#optNewBill').show();
            } else {
                $('#txtInvId').show();
                $('#dptInvId').hide();
                $('#optNewBill').hide();
            }


            EditLoadBillInvNoAmt(GCompId, GSuppId);
            GetItmedit(Invid);
            Getaddlsdet(Invid);


            if (obj[0].passed == 1) {
                //alert('Bill pass are made for this entry,Cannot update the INVOICE...!');
                var msg = 'Bill pass are made for this entry,Cannot Delete the INVOICE...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#btnDel').attr("disabled", true);

            } else if (obj[0].passed == 0) {

                $('#btnDel').attr("disabled", false);

            }



        }

    });
}

function ClearPer() {

    $('#txtPer').val('');
}

function LoadNetGrossAmt() {
    debugger;
    var TotNetAmt = 0;
    var TotGrossAmt = 0;
    var DecimalPlace = 0;
    $.each(Itmdet, function (i) {
        var InvAmt = Itmdet[i].Amount;
        TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
        //DecimalPlace = ESaveItemList[i].DecimalPlace;
    });
    //if (DecimalPlace > 0) {

    //} else {
    //    DecimalPlace = 2;
    //}
    var DecimalPlace = 2;

    if (AccList.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].percentage);
            var PlusOrMinus = AccList[i].AorL;

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



        TotNetAmt = parseFloat(TotNetAmt).toFixed(DecimalPlace);
        $('#txtnetamnt').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
        $('#txtnetamnt').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
    $('#txtGrossAmount').val(TotGrossAmt);
    $('#txtTotalAmount').val(TotGrossAmt);

}

function RadioAPClick() {
    var PType = $('input[name="optExt"]:checked').attr('value');
    if (PType == 'E') {
        LoadSupplierDDL("#ddlSupplier");
        //LoadPrnGridDetails();	
    } else {
        LoadWorkdivisionDDL("#ddlSupplier");
        //LoadPrnGridDetails();	
    }
}

function LoadFOrdDropDetails() {

    if (admod == 0) {
        var BMasId = $('#ddlorderno option:selected').val();
        var JbId = $('#ddlwrkord option:selected').val();
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

                        //JobNo
                        $(ddlwrkord).empty();
                        $(ddlwrkord).append($('<option/>').val('0').text('--Select JobNo--'));
                        $.each(data, function () {
                            $(ddlwrkord).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                        });

                        ////Style
                        //$(ddlFStyle).empty();
                        //$(ddlFStyle).append($('<option/>').val('0').text('--Select Style--'));
                        //$.each(data, function () {
                        //    $(ddlFStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                        //});
                    }


                }

            });

        }

    }

}