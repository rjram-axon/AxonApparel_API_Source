//var PQEntList = [];
//var PQEntListN = [];
//var QMasId = 0;
var ProQuote = [];
var ProcessQuoList = [];
var ProDetQuote = [];
var ProDetQuoteN = [];
var ProOrd = [];
var PsNo = 0;
var PQMasId = 0;
var ordNoDDL = "#";
var jobNoDDL = "#";
var JoBNo = 0;
var Odtype = 0;
var ProDetQuoteOrder = [];
var ProDetQuoteOrderN = [];
var GProcessId = 0;
var psid = 0;
var pno = 0;
var dis = "";
var pqmasidN = 0;
$(document).ready(function () {

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    var PQMasId = queryvalue[1];
    pqmasidN = PQMasId;

    if (PQMasId > 0) {
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#txtPQMasId').val(PQMasId);

        $("#CList1").show();
    } else {

        $('#btnAdd').show();
        $('#btnUpdate').hide();
    }
    if (PQMasId > 0) {
        EditPQItemDetails(PQMasId);
    }

    if (PQMasId == 0) {       
      
        LoadCompanyDDL("#ddlCompany");
        LoadSupplierDDL("#ddlSupplier");
        getDate();
        GenerateNumber();
        loadProcessTable();
        loadOrdTable();
        loadProQuoteDetTable();
        loadProQuoteOrderDetTable();
        loadProQuoteDetTableSave();

    }
    LoadItemDDL("#ddlItem");
    LoadUomDDL("#ddlUom");
    LoadColorDDL("#ddlColor");
    LoadSizeDDL("#ddlSize");
    LoadProcessDDL("#ddlProcess");
    LoadProcessDDL("#ddlProcess");
    LoadOrdNoDDL("#ddlOrderNo");

    var Ordertype = $('input[name="optionsRadios"]:checked').attr('value');
    if (Ordertype == 'B') {
        $("#Ordmas").show();
        $("#tblQuoteOrder").show();
        $("#promas").hide();
        $("#tblQuotePro").show();
        $("#btnProEdit").hide(); 
    } else {
        $("#Ordmas").hide();
        $("#tblQuoteOrder").hide();
        $("#promas").show(); 
        $("#tblQuotePro").show();
        $("#btnProEdit").show();
    }
});

function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    $('#txtDate').val(Fdatestring);
    $('#txtEntryDate').val(Fdatestring);
}
var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "Process_Quote",
    column = "Process_QuoteNo",
    compId = $('#ddlCompany').val(),
    Docum = 'PROCESS QUOTE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtQuoteNo').val(result.Value);
        }
    });
}

function LoadOrdNoDDL(OrdNoDDL) {
    ordNoDDL = OrdNoDDL;
    httpGet("/BulkOrder/GetOrderNo", onOrdNoSuccess, onOrdNoFailure);
}
function onOrdNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        var data = result.Value;
        $(ordNoDDL).append($('<option/>').val('0').text('--Select OrdNo--'));
        $.each(data, function () {
           // $(ordNoDDL).append($('<option></option>').text(this.Order_No));
            $(ordNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Order_No));
        });
    }
    else {
        //alert('OrderNo loading failed');
        var msg = 'Order Number loading failed...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
    }
}

function onOrdNoFailure(result) {
    //alert('OrderNo loading failed');
    var msg = 'Order Number loading failed...';
    var flg = 4;
    var mode = 1;
    var url = "";
    AlartMessage(msg, flg, mode, url);
}


function LoadJobNoDDL(JobNoDDL) {
    jobNoDDL = JobNoDDL;
    httpGet("/JobOrder/ListDetails", onJobNoSuccess, onJobNoFailure);
}
function onJobNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        var data = result.Value;
        $(jobNoDDL).append($('<option/>').val('0').text('--Select JobOrdNo--'));
        $.each(data, function () {
            // $(ordNoDDL).append($('<option></option>').text(this.Order_No));
            $(jobNoDDL).append($('<option></option>').val(this.JobOrderId).text(this.JobOrderNo));
        });
    }
    else {
        //alert('JobOrderNo loading failed');
        var msg = 'JobOrder Number loading failed...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
    }
}

function onJobNoFailure(result) {
    //alert('JobOrderNo loading failed');
    var msg = 'JobOrder Number loading failed...';
    var flg = 4;
    var mode = 1;
    var url = "";
    AlartMessage(msg, flg, mode, url);
}
function EditPQItemDetails(PQMasId) {
    $('#ddlCompany').empty();
    $('#ddlSupplier').empty();

    LoadCompanyDDL("#ddlCompany");
    LoadSupplierDDL("#ddlSupplier");


    $.ajax({
        url: "/ProcessQuoteEntry/PQEditMainList",
        data: JSON.stringify({ MasID: PQMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var ob = result.Value;
            debugger;
            if (ob != undefined) {


           
                //$('#ddlOrdNo').val(ob[0].Buy_Ord_MasId);
                //$('#txtRefNo').val(ob[0].Ref_No);
                $('#txtDate').val(moment(ob[0].QuoteDate).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(ob[0].EntryDate).format('DD/MM/YYYY'));
                $('#txtQTNo').val(ob[0].RefNo);
                $('#txtQuoteNo').val(ob[0].Process_QuoteNo);
                $('#ddlCompany').val(ob[0].companyid);
                $('#ddlSupplier').val(ob[0].Processorid);       
                $('#txtSupAdd').val(ob[0].Add1 + "," + ob[0].Add2 + "," + ob[0].Add3);
                $('#txtOType').val(ob[0].BuyOrdGeneral);
                $('#txtRemarks').val(ob[0].Remarks);
                var Ot = $('#txtOType').val();
               // alert(Ot);
                //var Ordertyp = $('input[name="optionsRadios"]:checked').attr('value');
                var ordtype = ob[0].BuyOrdGeneral;
                if (ordtype == "B") {
                        $("#Ordmas").show();
                        $("#tblQuoteOrder").show();
                        $("#promas").hide();
                        $("#tblQuotePro").show();
                        $("#tabdetmas").hide();
                        $("#btnProEdit").hide();
                        
                } else if (ordtype == "G") {
                  
                        $("#Ordmas").hide();
                        $("#tblQuoteOrder").hide();
                        $("#promas").show();
                        $("#tblQuotePro").show();
                        $("#btnProEdit").show();
                        $("#optBuy").prop("checked", true);
                        $("#optGen").prop("checked", false);
                    
                }
                if (Ot == "B") {

                    $("#optBuy").prop("checked", true);
                    $("#optGen").prop("checked", false);

                } 
                if (Ot == "G") {

                    $("#optBuy").prop("checked", false);
                    $("#optGen").prop("checked", true);

                }
                $("#optBuy").attr("disabled", true);
                $("#optGen").attr("disabled", true);
                $("#txtEntryDate").attr("disabled", true);
                $("#txtQTNo").attr("disabled", true);
                $("#txtDate").attr("disabled", true);
                LoadEditOrder(PQMasId);
                LoadEditPQPRDet(PQMasId);
                LoadEditPQItemDet(PQMasId);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadEditOrder(PQMasId) {
    debugger;

    $.ajax({
        url: "/ProcessQuoteEntry/ListEditOrderDetails",
        data: JSON.stringify({ MasId: PQMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ProOrd = result;
            //loadProcessTable(ProQuote);
            loadOrdTable(ProOrd);
            var table = $('#tblQuoteOrder'); 
            table.DataTable().column(5).visible(false);
            $('#Ordmas').hide();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadEditPQPRDet(PQMasId) {
    debugger;

    $.ajax({
        url: "/ProcessQuoteEntry/ListPQPREditDetDetails",
        data: JSON.stringify({ MasId: PQMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ProQuote = result;           
            loadProcessTable(ProQuote);
     

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadEditPQItemDet(PQMasId) {
    debugger;

    $.ajax({
        url: "/ProcessQuoteEntry/ListPQIEditDetDetails",
        data: JSON.stringify({ MasId: PQMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            var Otp = $('#txtOType').val();
            //alert(Otp);
            dis = "disabled"
            if (Otp=="G"){

                ProDetQuote = result;
                loadProQuoteDetTable(ProDetQuote);
                ProDetQuoteN = result;
                loadProQuoteDetTableSave(ProDetQuoteN);
            } else if (Otp == "B") {
                ProDetQuoteOrder = result;
           
                loadProQuoteOrderDetTable(ProDetQuoteOrder);
                ProDetQuoteN = result;
                loadProQuoteDetTableSave(ProDetQuoteN);
            }
            
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function RadioBClick() {

    Odtype = $('input[name="optionsRadios"]:checked').attr('value');
    $("#Ordmas").show();
    $("#tblQuoteOrder").show();
    $("#promas").hide();
    $("#tblQuotePro").show();
    $("#tabdetmas").hide();
 }

function RadioGClick() {

    Odtype = $('input[name="optionsRadios"]:checked').attr('value');
    $("#Ordmas").hide();
    $("#tblQuoteOrder").hide();
    $("#promas").show();
    $("#tblQuotePro").show();
    $("#tabdetmas").show();
}

$(document).ready(function () {

    //component details




    $('#btnPadd').click(function () {
        debugger;


        var Ordertype = $('input[name="optionsRadios"]:checked').attr('value');

        if (Ordertype == "B") {
            //alert("Please select General type")
            var msg = 'Please select General type...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $('#ddlProcess').val('0');
            return true;
        }

        var lengp = 0;
        var isAllValid = true;



        if ($('#ddlProcess').val() == "0") {
            isAllValid = false;
            $('#ddlProcess').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlProcess').siblings('span.error').css('visibility', 'hidden');
        }


        if (ProQuote.length == 0) {
            lengp = 1;
        }
        else {
            var len = ProQuote.length;
            var l = len-1;
            lengp = ProQuote[l].PsNo + 1;
        }

        
       // GProcessId = $('#ddlProcess').val();

        if (isAllValid) {


            debugger;
            var PrObj = {
                Process: $("#ddlProcess option:selected").text(),
                Processid: $('#ddlProcess').val(),
                PsNo: lengp,
                //CompSNo: CmNo,
                Process_QuoteProid: 0,
                Delchk: 0,
                ListChk:0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };
            var M = 0;
            if (ProQuote.length > 0) {
                $.each(ProQuote, function (i) {
                    if (ProQuote[i].Processid == PrObj.Processid) {
                        var msg = 'This Process already added...';
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        M = 1;
                        return true;
                    }
                });
            }
            if (M == 0) {
                ProQuote.push(PrObj);
                ProcessQuoList.push(PrObj);
                loadProcessTable(PrObj);

                fnClearProcessControls();
            }
        }

    });


    function fnClearProcessControls() {
        debugger;
        $('#ddlProcess').val('0');


    }

    $(document).on('click', '.btnPrcedit', function () {
        debugger;
        Mode = 1;

        //rowindex = $(this).closest('tr').index();

        //var cur1 = ProQuote.slice(rowindex);
        rowindex = $(this).closest('tr').index();

        var cur1 = ProQuote.slice(rowindex);
        //var table = $('#tblQuotePro').DataTable();
        //var row = $('#tblQuotePro').closest('tr');
        //var data = $('#tblQuotePro').dataTable().fnGetData(row);

        $('#ddlProcess').val(cur1[0]['Processid']);
        $('#txtLoss').val(cur1[0]['PsNo']);


        $('#btnPadd').hide();
        $('#btnPupdate').show();
    });

    $('#btnPupdate').click(function () {
        debugger;
        var currentrowsel = ProQuote.slice(rowindex);

        currentrowsel[0]['Processid'] = $("#ddlProcess").val();
        currentrowsel[0]['Process'] = $("#ddlProcess option:selected").text();
        // currentrowsel[0]['Loss_Per'] = $("#txtLoss").val();
        ProQuote[rowindex] = currentrowsel[0];

        loadProcessTable(ProQuote);

        $('#btnPupdate').hide();
        $('#btnPadd').show();
        fnClearProcessControls();


    });

    $(document).on('click', '.btnRemovePro', function () {
        rowindex = $(this).closest('tr').index();
        var psn = ProQuote[rowindex].PsNo;
        var M = 0;
        if (pqmasidN == 0) {
            for (var i = 0; i < ProDetQuote.length; i++) {
                if (ProDetQuote[i].PsNo == psn) {
                    var msg = 'This Process is ...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    M = 1;
                }
            }
        } else {
            for (var i = 0; i < ProDetQuote.length; i++) {
                if (ProDetQuote[i].PsNo == psn && ProDetQuote[i].DelChk == 0) {
                    var msg = 'This Process is ...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    M = 1;
                }
            }
        }
        
        var Ordertype = $('input[name="optionsRadios"]:checked').attr('value');
        var Arr = [];
        Arr = ProDetQuoteN;
        if (Ordertype == "B") {
            ProDetQuoteN = [];
            for (var n = 0; n < Arr.length; n++) {
                if (Arr[n].PsNo != psn) {
                    ProDetQuoteN.push(Arr[n]);
                }
            }
        }
        loadProQuoteDetTableSave(ProDetQuoteN);
        if (M == 0) {
            if (pqmasidN == 0) {
                ProQuote.splice(rowindex, 1);
                ProcessQuoList.splice(rowindex, 1);
                document.getElementById("tblQuotePro").deleteRow(rowindex + 1);
            } else {
                ProQuote[rowindex].DelChk = 1;
                document.getElementById("tblQuotePro").deleteRow(rowindex + 1);
            }
        }
    });
    //



});
//function removeProcessduplicateValue(ProcessList) {
//    debugger;
//    var newArray = [];
//    $.each(ProcessList, function (key, value) {
//        var exists = false;
//        var rate = 0;
//        $.each(newArray, function (k, val2) {
//            if (value.Processid == val2.Processid) { exists = true; };
//        });

//        if (exists == false && value.Processid != "") { newArray.push(value); }
//    });


//}


$(document).ready(function () {

    //component details
    $('#btnOadd').click(function () {
        debugger;



        var Ordertype = $('input[name="optionsRadios"]:checked').attr('value');

        if (Ordertype == "G") {
            //alert("Please select Order type")
            var msg = 'Please select Order type...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            $('#ddlOrderNo').val('0');
            $('#txtJobno').val('');
            $('#txtRefno').val('');
            $('#txtStyle').val('');
            return true;

        }

        var lengp = 0;
        var isAllValid = true;



        if ($('#ddlOrderNo').val() == "0") {
            isAllValid = false;
            $('#ddlOrderNo').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlOrderNo').siblings('span.error').css('visibility', 'hidden');
        }


        if (ProOrd.length == 0) {
            lengp = 1;
        }
        else {
            lengp = ProOrd.length + 1;
        }

        if (isAllValid) {


            debugger;
            var PrOObj = {
                Buy_ord_no: $("#ddlOrderNo option:selected").text(),
                Buy_ord_masId: $('#ddlOrderNo').val(),
                Style: $('#txtStyle').val(),
                RefNo: $('#txtRefno').val(),
                JobNo: $('#txtJobno').val(),
              //  PsNo: lengp,
                //CompSNo: CmNo,
               // Process_QuoteProid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            ProOrd.push(PrOObj);

            loadOrdTable(PrOObj);

            fnClearOrderControls();
        }

    });


    function fnClearOrderControls() {
        debugger;
        $('#ddlOrderNo').val('0');
        $('#txtStyle').val('');
        $('#txtRefno').val('');
        $('#txtJobno').val('');


    }

    $(document).on('click', '.btnOrderEdit', function () {
        debugger;
        Mode = 1;
        LoadOrdNoDDL("#ddlOrderNo");
        rowindex = $(this).closest('tr').index();

        var cur1 = ProOrd.slice(rowindex);

        //$('#ddlProcess').val(cur1[0]['Processid']);
        $('#ddlOrderNo').val(cur1[0]['Buy_ord_masId']);
        $('#txtJobno').val(cur1[0]['JobNo']);
        $('#txtRefno').val(cur1[0]['Style']);
        $('#txtStyle').val(cur1[0]['RefNo']);

        $('#btnOadd').hide();
        $('#btnOupdate').show();
    });

    $('#btnOupdate').click(function () {
        debugger;
        var currentrowsel = ProOrd.slice(rowindex);

        currentrowsel[0]['Buy_ord_masId'] = $("#ddlOrderNo").val();
        currentrowsel[0]['Buy_ord_no'] = $("#ddlOrderNo option:selected").text();
        currentrowsel[0]['JobNo'] = $("#txtJobno").val();
        currentrowsel[0]['RefNo'] = $("#txtRefno").val();
        currentrowsel[0]['Style'] = $("#txtStyle").val();
        // currentrowsel[0]['Loss_Per'] = $("#txtLoss").val();
        ProOrd[rowindex] = currentrowsel[0];

        loadOrdTable(ProOrd);

        $('#btnOupdate').hide();
        $('#btnOadd').show();
        fnClearOrderControls();


    });

    $(document).on('click', '.btnRemoveOrder', function () {
        rowindex = $(this).closest('tr').index();
        ProOrd.splice(rowindex, 1);
        document.getElementById("tblQuoteOrder").deleteRow(rowindex + 1);
    });
    //



});
function loadProcessTable(PrObj) {
    $('#tblQuotePro').DataTable().destroy();
    debugger;
    var Ordertype = $('input[name="optionsRadios"]:checked').attr('value');
    $('#tblQuotePro').DataTable({
        //"order": [[2, "asc"]],
        data: ProQuote,
        scrollY: 120,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
            { title: "Process_QuoteProid", data: "Process_QuoteProid", "visible": false },
            { title: "ProcessID", data: "Processid", "visible": false },
            { title: "Process", data: "Process" },
            { title: "PsNo", data: "PsNo", "visible": false },
            //{ title: "CompSNo", data: "CompSNo" },
               {
                   title: "ACTION",  data: "Process_QuoteProid",
                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnProEditPro" class="btnPrcedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Process Selector" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPrcessItem btn btn-round btn-info"> <i class="gg-chevron-right-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnRemoveProcess" class="btnRemovePro btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                   render: function (data) {
                       if (pqmasidN > 0 && Ordertype == "B") {
                              
                           return ' <button type="button" data-toggle="tooltip" data-placement="top" title="Process Selector" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPrcessItem btn btn-round btn-info"> <i class="gg-chevron-right-o"></i> </button>';
                       }
                       else  {
                              
                           return '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnProEditPro" class="btnPrcedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Process Selector" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPrcessItem btn btn-round btn-info"> <i class="gg-chevron-right-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" id="btnRemoveProcess" class="btnRemovePro btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>';
                       }
                      
                   }
               }
        ]
    });

    //{
    //    title: "Approve", data: "sno",
    //    render: function (data, type, row) {
    //        if ((row.check == 'true' || row.check == true) && row.PoRate > 0) {
                              
    //            return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  checked disabled value=' + data + ' >';
    //        }
    //        else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
                              
    //            return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  checked  value=' + data + ' >';
    //        }
    //        else {
    //            return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

    //        }
    //    }
    //}
}



function loadOrdTable(PrObj) {
    $('#tblQuoteOrder').DataTable().destroy();
    debugger;

    $('#tblQuoteOrder').DataTable({
        data: ProOrd,
        columns: [
            { title: "Buy_ord_MasId", data: "Buy_ord_masId", "visible": false },
            { title: "Order No", data: "Buy_ord_no" },
             { title: "Job No", data: "JobNo" },
            { title: "Style", data: "Style" },
            { title: "Ref No", data: "RefNo" },    
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"  class="btnOrderEdit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i></button> <button type="button" data-toggle="tooltip" data-placement="top" title="View Process" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnProcessItem btn btn-round btn-info"> <i class="gg-chevron-right-o"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnRemoveOrder btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                   //"sDefaultContent": '<button type="button" class="btnOrderEdit"> Edit </button> <button type="button" class="btnProcessItem"> ViewProcess </button><button type="button" class="btnRemoveOrder"> Remove </button>'
               }
        ]
    });
}

$(document).ready(function () {
    $(document).on('click', '.btnPrcessItem', function () {
        debugger;

        rowindex = $(this).closest('tr').index();
                var cur3 = ProQuote.slice(rowindex);
                PsNo = cur3[0]['PsNo'];
                pno = PsNo;
                var JNo = cur3[0]['JobNo'];
                JoBNo = cur3[0]['Job_ord_no'];
                var PrId = cur3[0]['Processid'];
                for (var j = 0; j < ProcessQuoList.length; j++) {
                    if (PrId == ProcessQuoList[j].Processid) {

                        psid = ProcessQuoList[j].PsNo;
                    }
                }
                for (var j = 0; j < ProQuote.length; j++) {
                    if (PrId == ProQuote[j].Processid) {

                        psid = ProQuote[j].PsNo;
                    }
                }
                GProcessId = PrId;
                //LoadOrdProcess(JNo);
                //alert(JoBNo);
                //LoadOrdProcessItem(JoBNo, PrId);
                //if (JoBNo !== "") {
                //    LoadOrdProcessItem(JoBNo, PrId);
                //}
                var TypeO = $('input[name="optionsRadios"]:checked').attr('value');

                if (TypeO == "B") {
                    LoadOrdProcessItem(JoBNo, PrId);
                }
    });
});

$(document).ready(function () {
    $(document).on('click', '.btnProcessItem', function () {
        debugger;
        //$('#tCDbody').DataTable().destroy();
        //var GroupId = "";
        //var CompSlN0 = "";
        rowindex = $(this).closest('tr').index();
        var curp3 = ProOrd.slice(rowindex);
        var JNo = curp3[0]['JobNo'];
        var PrId = curp3[0]['Processid'];
        //alert(JNo);
        JoBNo = JNo;
        //alert(Odtype);

        var TypeO = $('input[name="optionsRadios"]:checked').attr('value');

        if (TypeO == "B") {
            LoadOrdProcess(JNo);
        }
       // LoadOrdProcessItem(JoBNo, PrId);

    });
});


function LoadOrdProcess(JNo) {

    $.ajax({
        url: "/ProcessQuoteEntry/ListPQPROrdDetDetails",
        data: JSON.stringify({ JobOrdNo: JNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //if (pqmasidN == 0) {
                ProQuote = result;
                loadProcessTable(ProQuote);
                
               

            //} else {
            //    var processlist = ProQuote;
            //    var Rlist = result;
            //    for (var i = 0; i < processlist.length; i++) {
            //        for (var n = o; n < Rlist.length; n++) {

            //        }
            //    }
            //}
            

            var TotLen = ProcessQuoList.length;
            var PNo = 0;
            if (TotLen > 0) {
                var len = TotLen - 1;
                PNo = ProcessQuoList[len].PsNo;
                var jobno = ProQuote[0].Job_ord_no;
                //for (var i = 0; i < ProQuote.length; i++) {
                    for (var j = 0; j < ProcessQuoList.length; j++) {
                        if (jobno == ProcessQuoList[j].Job_ord_no) {
                            return true;
                        }
                    }
                //}
            }
            //ProcessQuoList = ProQuote;
            //$.each(ProQuote, function (i) {
            //    if (ProcessQuoList.length > 0) {
            //        var ps = PNo + 1;
            //        PNo = ps;
            //        this.PsNo = ps;
            //        ProcessQuoList.push(ProQuote[i]);
            //    } else {
            //        ProcessQuoList.push(ProQuote[i]);
            //    }
            //});

            if (ProcessQuoList.length > 0) {
                $.each(ProQuote, function (i) {
                            var ps = PNo + 1;
                            PNo = ps;
                            this.PsNo = ps;
                            ProcessQuoList.push(ProQuote[i]);
                       
                });
            } else {
                $.each(ProQuote, function (i) {
                    ProcessQuoList.push(ProQuote[i]);
                });
            }
            
            


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadOrdProcessItem(JNo, PrId) {

    $.ajax({
        url: "/ProcessQuoteEntry/ListOrdProcessDetails",
        data: JSON.stringify({ JobOrdNo: JNo,ProcessId:PrId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //ProDetQuote = result;
            //loadProQuoteDetTable(ProDetQuote);
            ProDetQuoteOrder = result;
            $.each(ProDetQuoteOrder, function (i) {
                this.PsNo = psid;
            });
            //loadProQuoteDetTableSave(ProDetQuoteN);
            loadProQuoteOrderDetTable(ProDetQuoteOrder);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

$(document).ready(function () {

    //component details
    $('#btnQDadd').click(function () {
        debugger;

        //ProDetQuoteN = [];
        //ProDetQuote = [];
        var Ordertype = $('input[name="optionsRadios"]:checked').attr('value');

        if (Ordertype == "B") {
            //alert("Please select General type")
            var msg = 'Please select General type...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
           
            $('#ddlItem').val('0');
            $('#ddlColor').val('0');
            $('#ddlSize').val('0');
            $('#ddlUom').val('0');
            $('#txtRate').val('');
            $('#txtMinQty').val('');
            $('#txtStyle').val('');
            return true;
        }
        // var lengp = 0;
        var isAllValid = true;



        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#ddlColor').val() == "0") {
            isAllValid = false;
            $('#ddlColor').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlColor').siblings('span.error').css('visibility', 'hidden');
        } if ($('#ddlSize').val() == "0") {
            isAllValid = false;
            $('#ddlSize').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlSize').siblings('span.error').css('visibility', 'hidden');
        } if ($('#ddlUom').val() == "0") {
            isAllValid = false;
            $('#ddlUom').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlUom').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtRate').val() == "") {
            isAllValid = false;
            $('#txtRate').siblings('span.error').css('visibility', 'visible');
        }
        else if ($('#txtRate').val() == 0) {
            var msg = 'Please enter the rate...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return false;
            $('#txtRate').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtRate').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#txtMinQty').val() == "") {
            isAllValid = false;
            $('#txtMinQty').siblings('span.error').css('visibility', 'visible');
        }
        else if ($('#txtMinQty').val() == 0) {
            var msg = 'Please enter the Minimum Quantity...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return false;
            $('#txtMinQty').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtMinQty').siblings('span.error').css('visibility', 'hidden');
        }
        //if ($('#txtAppRate').val() == "") {
        //    isAllValid = false;
        //    $('#txtAppRate').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#txtAppRate').siblings('span.error').css('visibility', 'hidden');
        //}
        if ($('#txtAppRate').val() == 0) {
            var msg = 'Please enter the App Rate...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return false;
            $('#txtAppRate').siblings('span.error').css('visibility', 'visible');
        }
        if (ProDetQuote.length == 0) {
            lengp = 1;
        }
        else {
            lengp = ProDetQuote.length + 1;
        }

        if (GProcessId == 0) {
            //alert("Please Select Any Process..");
            var msg = 'Please Select Any Process...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }

        if (isAllValid) {


            debugger;
            var PrQDetObj = {
                Item: $("#ddlItem option:selected").text(),
                Itemid: $('#ddlItem').val(),
                Color: $("#ddlColor option:selected").text(),
                Colorid: $('#ddlColor').val(),
                Size: $("#ddlSize option:selected").text(),
                Sizeid: $('#ddlSize').val(),
                Uom: $("#ddlUom option:selected").text(),
                Uomid: $('#ddlUom').val(),
                rate: $('#txtRate').val(),
                MinQty: $('#txtMinQty').val(),
                AppRate: $('#txtAppRate').val(),
                Process_Quote_detid: 0,
                Process_QuoteProid: 0,
                PsNo: pno,
                Disable: 0,
                DelChk:0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            dis = "";
   

            ProDetQuote.push(PrQDetObj);
            loadProQuoteDetTable(PrQDetObj);


            //ProDetQuoteN.push(PrQDetObj);
            //loadProQuoteDetTableSave(PrQDetObj);

            fnClearProQuoteDetControls();
            //Detlistadd();
        }

    });


    function fnClearProQuoteDetControls() {
        debugger;
        $('#ddlItem').val('0');
        $('#ddlColor').val('0');
        $('#ddlSize').val('0');
        $('#ddlUom').val('0');
        $('#txtRate').val('');
        $('#txtMinQty').val('');
        $('#txtAppRate').val('');

    }

    $(document).on('click', '.btnPrdetedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();
        var cur1 = ProDetQuote.slice(rowindex);

        $('#ddlItem').val(cur1[0]['Itemid']);
        $('#ddlColor').val(cur1[0]['Colorid']);
        $('#ddlSize').val(cur1[0]['Sizeid']);
        $('#ddlUom').val(cur1[0]['Uomid']);
        $('#txtRate').val(cur1[0]['rate']);
        $('#txtMinQty').val(cur1[0]['MinQty']);
        $('#txtAppRate').val(cur1[0]['AppRate']);


        $('#btnQDadd').hide();
        $('#btnQDupdate').show();
    });

    $('#btnQDupdate').click(function () {
        debugger;
        var currentrowsel = ProDetQuote.slice(rowindex);

        currentrowsel[0]['Itemid'] = $("#ddlItem").val();
        currentrowsel[0]['Item'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['Colorid'] = $("#ddlColor").val();
        currentrowsel[0]['Color'] = $("#ddlColor option:selected").text();
        currentrowsel[0]['Sizeid'] = $("#ddlSize").val();
        currentrowsel[0]['Size'] = $("#ddlSize option:selected").text();
        currentrowsel[0]['Uomid'] = $("#ddlUom").val();
        currentrowsel[0]['Uom'] = $("#ddlUom option:selected").text();
        currentrowsel[0]['rate'] = $("#txtRate").val();
        currentrowsel[0]['MinQty'] = $("#txtMinQty").val();
        currentrowsel[0]['AppRate'] = $("#txtAppRate").val();

        ProDetQuote[rowindex] = currentrowsel[0];
        loadProQuoteDetTable(ProDetQuote);

        $('#btnQDupdate').hide();
        $('#btnQDadd').show();
        fnClearProQuoteDetControls();
        //Detlistadd();

    });
    
    $(document).on('click', '.btnRemoveProdet', function () {
        rowindex = $(this).closest('tr').index();
        if (pqmasidN == 0) {
            ProDetQuote.splice(rowindex, 1);
        }
        var row = rowindex;
        if (pqmasidN > 0) {
            ProDetQuote[row].DelChk = 1;
        }
        document.getElementById("tblPQuoteItem").deleteRow(rowindex + 1);
    });
    //

    $(document).on('click', '.btnRemoveDetItem', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        if (pqmasidN == 0) {
            ProDetQuoteN.splice(rowindex, 1);
        }
        var row = rowindex;
        if (pqmasidN > 0) {
            ProDetQuoteN[row].DelChk = 1;
        }
        document.getElementById("tblQuoteDetSave").deleteRow(rowindex + 1);
    });

});

function loadProQuoteDetTable(PrObj) {
    $('#tblPQuoteItem').DataTable().destroy();
    debugger;

    $('#tblPQuoteItem').DataTable({
        data: ProDetQuote,
        scrollY: 145,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        //"bSort": false,
        columns: [
            { title: "Process_Quote_detid", data: "Process_Quote_detid", "visible": false },
            { title: "Process_QuoteProid", data: "Process_QuoteProid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "ItemId", data: "Itemid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "ColorId", data: "Colorid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "SizeId", data: "Sizeid", "visible": false },
            { title: "Uom", data: "Uom" },
            { title: "UomId", data: "Uomid", "visible": false },
            { title: "Rate", data: "rate" },
            { title: "Min Qty", data: "MinQty" },
            { title: "App Rate", data: "AppRate" },
            { title: "P SNo", data: "PsNo" },
            //{ title: "Disable", data: "Disable", "visible": false },
            {
                title: "ACTION", data: "Disable",
                //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Update" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"  class="btnGeneralUpdate btn btn-round btn-success" > <i class="fa fa-check"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPrdetedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnRemoveProdet btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                //"sDefaultContent": '<button type="button" class="btnGeneralUpdate"> Update </button> <button type="button" class="btnPrdetedit"> Edit </button> <button type="button" class="btnRemoveProdet"> Remove </button>'
                render: function (data) {
                    if (data == 1) {
                        return '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPrdetedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnRemoveProdet btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                    } else {
                        return '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnPrdetedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnRemoveProdet btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                    }
                },
            }
        ]
    });
}

function loadProQuoteOrderDetTable(PrObj) {
    $('#tblPQuoteItem').DataTable().destroy();
    debugger;

    $('#tblPQuoteItem').DataTable({
        data: ProDetQuoteOrder,
        scrollY: 145,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
            { title: "Process_Quote_detid", data: "Process_Quote_detid", "visible": false },
             { title: "Process_Quote_detid", data: "Process_Quote_detid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "ItemId", data: "Itemid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "ColorId", data: "Colorid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "SizeId", data: "Sizeid", "visible": false },
            { title: "Uom", data: "Uom" },
            { title: "UomId", data: "Uomid", "visible": false },
            //{ title: "Rate", data: "rate" },

              {
                  title: "Rate", data: "rate",
                  render: function (data) {

                      return '<input type="text" id="txtGRate" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

                  },
              },

           // { title: "MinQty", data: "MinQty" },
           {
               title: "Min Qty", data: "MinQty",
               render: function (data) {

                   return '<input type="text" id="txtGMinQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

               },
           },
           // { title: "AppRate", data: "AppRate" },
           {
               title: "App Rate", data: "AppRate",
               render: function (data) {

                   return '<input type="text" id="txtGAppRate" class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' >';

               },
           },
             { title: "P SNo", data: "PsNo" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Update" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"  class="btnOrderUpdate btn btn-round btn-success"> <i class="fa fa-refresh"></i> </button> '
                   //"sDefaultContent": '<button type="button" class="btnOrderUpdate"> Update </button> '
               }
        ]
    });
}


$(document).on('click', '.btnOrderUpdate', function () {
    debugger;


    $('#tblPQuoteItem tr').click(function () {
        $('#tblPQuoteItem tr').css('background-color', 'White');
        $(this).css('background-color', '#b8bbc1');

    });


    rowindex = $(this).closest('tr').index();
    var currentro12 = ProDetQuoteOrder.slice(rowindex);


    var Process_Quote_detid = currentro12[0]['Process_Quote_detid'];
    var Process_QuoteProid = currentro12[0]['Process_QuoteProid'];
    var Item = currentro12[0]['Item'];
    var Itemid = currentro12[0]['Itemid'];
    var Color = currentro12[0]['Color'];
    var Colorid = currentro12[0]['Colorid'];
    var Size = currentro12[0]['Size'];
    var Sizeid = currentro12[0]['Sizeid'];
    var Uom = currentro12[0]['Uom'];
    var Uomid = currentro12[0]['Uomid'];
    var PsNo = currentro12[0]['PsNo'];
    var GRate = $(this).closest('tr').find('#txtGRate').val();
    var GMinQty = $(this).closest('tr').find('#txtGMinQty').val();
    var GAppRate = $(this).closest('tr').find('#txtGAppRate').val();

    if (GRate == 0) {
        var msg = 'Please enter the rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else if (GMinQty == 0) {
        var msg = 'Please enter the minimum quntity...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else if (GAppRate == 0) {
        var msg = 'Please enter the approval rate...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    


    var copListObj = {
        Process_Quote_detid: Process_Quote_detid,
        Process_QuoteProid: Process_QuoteProid,
        Item: Item,
        Itemid: Itemid,
        Color: Color,
        Colorid: Colorid,
        Size: Size,
        Sizeid: Sizeid,
        Uom: Uom,
        Uomid: Uomid,
        PsNo: PsNo,
        rate: GRate,
        MinQty: GMinQty,
        AppRate: GAppRate
       

    };




    //if (ProDetQuoteOrderN.length > 0) {
    //        if (OCId == CrID && OSizeId == SiId && OCmSNo == CompSlNo) {
    //            alert("Color and Size Already Exists");
               
    //            return true;


    //        }
    //    }
    
    var M = 0;
    for (var i = 0; i < ProDetQuoteN.length; i++) {
        if (ProDetQuoteN[i].Itemid == copListObj.Itemid && ProDetQuoteN[i].Colorid == copListObj.Colorid && ProDetQuoteN[i].Sizeid == copListObj.Sizeid && ProDetQuoteN[i].Uomid == copListObj.Uomid && ProDetQuoteN[i].PsNo == copListObj.PsNo) {
            M = 1;
            ProDetQuoteN[i].rate = copListObj.rate;
            ProDetQuoteN[i].MinQty = copListObj.MinQty;
            ProDetQuoteN[i].AppRate = copListObj.AppRate;
        }
    }
    if (M == 0) {
        ProDetQuoteN.push(copListObj);
        //alert("Updated Sucessfully");
    }

    loadProQuoteDetTableSave(copListObj);
    $('#CList1').show();
    var msg = 'Updated Sucessfully...';
    var flg = 1;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);

});

$(document).on('click', '.btnGeneralUpdate', function () {
//function Detlistadd() {
    debugger;


    $('#tblPQuoteItem tr').click(function () {
        $('#tblPQuoteItem tr').css('background-color', 'White');
        $(this).css('background-color', '#b8bbc1');

    });


    rowindex = $(this).closest('tr').index();
    var currentro12 = ProDetQuote.slice(rowindex);


    var Process_Quote_detid = currentro12[0]['Process_Quote_detid'];
    var Process_QuoteProid = currentro12[0]['Process_QuoteProid'];
    var Item = currentro12[0]['Item'];
    var Itemid = currentro12[0]['Itemid'];
    var Color = currentro12[0]['Color'];
    var Colorid = currentro12[0]['Colorid'];
    var Size = currentro12[0]['Size'];
    var Sizeid = currentro12[0]['Sizeid'];
    var Uom = currentro12[0]['Uom'];
    var Uomid = currentro12[0]['Uomid'];
    var PsNo = currentro12[0]['PsNo'];
    var GRate = currentro12[0]['rate'];
    var GMinQty = currentro12[0]['MinQty'];
    var GAppRate = currentro12[0]['AppRate'];





    var copListObj = {
        Process_Quote_detid: Process_Quote_detid,
        Process_QuoteProid: Process_QuoteProid,
        Item: Item,
        Itemid: Itemid,
        Color: Color,
        Colorid: Colorid,
        Size: Size,
        Sizeid: Sizeid,
        Uom: Uom,
        Uomid: Uomid,
        PsNo: PsNo,
        rate: GRate,
        MinQty: GMinQty,
        AppRate: GAppRate


    };

    var listChk = ProDetQuoteN;
    var addlist = 0;
    for (var i = 0; i < listChk.length ; i++) {
        if (listChk[i].Itemid == copListObj.Itemid && listChk[i].Colorid == copListObj.Colorid && listChk[i].Sizeid == copListObj.Sizeid && listChk[i].Uomid == copListObj.Uomid) {
            //if (listChk[i].AppRate != copListObj.AppRate || listChk[i].MinQty != copListObj.MinQty || listChk[i].rate != copListObj.rate) {
            listChk[i].AppRate = copListObj.AppRate;
            listChk[i].MinQty = copListObj.MinQty;
            listChk[i].rate = copListObj.rate;
            //}
            addlist = 1;
        }
    }
    if (addlist == 0) {
        ProDetQuoteN.push(copListObj);
    }
    loadProQuoteDetTableSave(copListObj);
    //alert("Updated Sucessfully");
    var msg = 'Updated Sucessfully...';
    var flg = 1;
    var mod = 1;
    var url = "";
    AlartMessage(msg, flg, mod, url);

    });
//}
function loadProQuoteDetTableSave(PrObj) {
    $('#tblQuoteDetSave').DataTable().destroy();
    debugger;

    $('#tblQuoteDetSave').DataTable({
        data: ProDetQuoteN,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
            { title: "Process_Quote_detid", data: "Process_Quote_detid", "visible": false },
            { title: "Process_QuoteProid", data: "Process_QuoteProid", "visible": false },
            { title: "Item", data: "Item" },
            { title: "ItemId", data: "Itemid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "ColorId", data: "Colorid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "SizeId", data: "Sizeid", "visible": false },
            { title: "Uom", data: "Uom" },
            { title: "UomId", data: "Uomid", "visible": false },
            { title: "Rate", data: "rate" },
            { title: "Min Qty", data: "MinQty" },
            { title: "App Rate", data: "AppRate" },
             { title: "P SNo", data: "PsNo" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnRemoveDetItem btn btn-round btn-danger"> <i class="fa fa-times"></i> </button>'
                   //"sDefaultContent": '<button type="button" class="btnPrdetedit"> Edit </button> '
               }
        ]
    });
}
function LoadSupplierAdd() {
    $('#txtSupAdd').val("");
    var SupID = $('#ddlSupplier').val();

    $.ajax({
        url: "/Supplier/GetbyId/" + SupID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtSupAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}

function LoadEntryOrder() {

    $('#txtRefno').val("");
    $('#txtStyle').val("");
    var MasId = $('#ddlOrderNo').val();

    $.ajax({
        url: "/ProcessQuoteEntry/GetOrderDetails",
        data: JSON.stringify({ MasId: MasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtRefno').val(obj[0]["RefNo"]);
                $('#txtJobno').val(obj[0]["JobNo"]);
                //$('#txtCompany').val(obj[0]["Company"]);
                //$('#txtStyle').val(obj[0]["Style"]);
                //$('#txtProdQty').val(obj[0]["Quantity"]);
                //$('#txtBuyer').val(obj[0]["buyer"]);
                //$('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                //$('#txtPlanId').val(obj[0]["PlanID"]);
                //OrderNo = val(obj[0]["Order_No"]);
             


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Add() {

    var Ordtype = $('input[name="optionsRadios"]:checked').attr('value');
    var res = validate();
    if (res == false) {
        return false;
    }

    
    if (ProQuote.length == 0) {
        //alert("Please Enter the Process Details")
        var msg = 'Please Enter the Process Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    if (Ordtype == "B") {
        if (ProDetQuoteN.length == 0) {
            //alert("Please Enter the Item Details")
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    } else {
        if (ProDetQuote.length == 0) {
            //alert("Please Enter the Item Details")
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }
    
    
    var itemdetlist = [];
    if (Ordtype == "B") {
        itemdetlist = ProDetQuoteN;
    } else {
        itemdetlist = ProDetQuote;
    }
    debugger;
    table = "Process_Quote",
    column = "Process_QuoteNo",
    compId = $('#ddlCompany').val(),
    Docum = 'PROCESS QUOTE'

    var oldQuoteNo = $('#txtQuoteNo').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newQuoteNo = result.Value;
            if (oldQuoteNo != newQuoteNo) {
                //alert('Quote No has been changed...');
                var msg = 'Quote Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtQuoteNo').val(result.Value);
            }
            var objPSubmit = {
                companyid: $('#ddlCompany').val(),
                Process_QuoteDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
                Process_QuoteNo: $('#txtQuoteNo').val(),
                RefNo: $('#txtQTNo').val(),
                RefDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
                BuyOrdGeneral: Ordtype,
                Processorid: $('#ddlSupplier').val(),
                //Buy_ord_no: $("#ddlOrdNo option:selected").text(),
                Remarks: $('#txtRemarks').val(),
                Commit_Cancel: "N",

                ProQuoteProcess: ProcessQuoList,
                ProQuoteDet: itemdetlist

            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/ProcessQuoteEntry/SavePQuote",
                data: JSON.stringify(objPSubmit),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //alert("Data Saved Successfully");
                    //window.location.reload(true);
                    //alert("Data Saved Sucessfully");
                    //window.location.href = "/ProcessQuote/ProcessQuoteIndex";
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/ProcessQuote/ProcessQuoteIndex";
                    AlartMessage(msg, flg, mod, url);
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}
function validate() {
    var isValid = true;
    if ($('#txtQuoteNo').val().trim() == "") {
        $('#txtQuoteNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQuoteNo').css('border-color', 'lightgrey');
    }
    if ($('#txtQTNo').val().trim() == "") {
        $('#txtQTNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQTNo').css('border-color', 'lightgrey');
    }
    if ($('#txtDate').val().trim() == "") {
        $('#txtDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtDate').css('border-color', 'lightgrey');
    }
    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }
   
    if ($('#ddlSupplier').val() == 0) {
        $('#ddlSupplier').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlSupplier').css('border-color', 'lightgrey');
    }
    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlCompany').css('border-color', 'lightgrey');
    } 
    var Ordtype = $('input[name="optionsRadios"]:checked').attr('value');
    if (Ordtype == 'G') {
        
        if (pqmasidN == 0) {
            var newArray = [];
            var arr = ProDetQuote;
            $.each(arr, function (key, value) {
                var exists = false;
                var rate = 0;
                $.each(newArray, function (k, val2) {
                    if (value.PsNo == val2.PsNo) { exists = true; };
                });

                if (exists == false && value.PsNo != "") { newArray.push(value); }
            });
            $.each(newArray, function (k) {
                $.each(ProcessQuoList, function (m) {
                    if (newArray[k].PsNo == ProcessQuoList[m].PsNo) {
                        ProcessQuoList[m].ListChk = 1;
                    }
                });
            });
            var PM = 0;
            var newArray2 = [];
            $.each(ProcessQuoList, function (i) {
                if (ProcessQuoList[i].ListChk == 0) {
                    newArray2.push(ProcessQuoList[i].Process);
                    PM = 1;
                }
            });
        } else {
            var newArray = [];
            var arr = ProDetQuote;
            $.each(arr, function (key, value) {
                if (arr[key].DelChk == 0) {

                    var exists = false;
                    var rate = 0;
                    $.each(newArray, function (k, val2) {
                        if (value.PsNo == val2.PsNo) { exists = true; };
                    });

                    if (exists == false && value.PsNo != "") { newArray.push(value); }
                }
            });
            $.each(newArray, function (k) {
                $.each(ProQuote, function (m) {
                    if (newArray[k].PsNo == ProQuote[m].PsNo) {
                        ProQuote[m].ListChk = 1;
                    }
                });
            });
            var PM = 0;
            var newArray2 = [];
            $.each(ProQuote, function (i) {
                if (ProQuote[i].Delchk == 0) {
                    if (ProQuote[i].ListChk == 0) {
                        newArray2.push(ProQuote[i].Process);
                        PM = 1;
                    }
                }
            });
        }
       
        if (newArray2.length > 0) {
            var msg = "Please Enter the" + ' "' + newArray2 + '" ' + " item details...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            isValid = false;
        }
    }
   
    return isValid;
}
function Update() {
    // window.location.reload(true);

    var res = validate();
    if (res == false) {
        return false;
    }


    if (ProQuote.length == 0) {
        //alert("Please Enter the Process Details")
        var msg = 'Please Enter the Process Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    if (ProDetQuoteN.length == 0) {
        //alert("Please Enter the Item Details")
        var msg = 'Please Enter the Item Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var Ordtype = $('input[name="optionsRadios"]:checked').attr('value');


    var objPUSubmit = {
        companyid: $('#ddlCompany').val(),
        Process_QuoteDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),
        Process_QuoteNo: $('#txtQuoteNo').val(),
        RefNo: $('#txtQTNo').val(),
        RefDate: $('#txtDate').val(),//new Date($('#txtDate').val()),
        BuyOrdGeneral: Ordtype,
        Processorid: $('#ddlSupplier').val(),
        //Buy_ord_no: $("#ddlOrdNo option:selected").text(),
        Remarks: $('#txtRemarks').val(),
        Commit_Cancel: "N",
        Process_Quoteid: $('#txtPQMasId').val(),

        ProQuoteProcess: ProQuote,
        ProQuoteDet: ProDetQuoteN

    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessQuoteEntry/UpdatePQuote",
        data: JSON.stringify(objPUSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert("Data Saved Successfully");
            //window.location.reload(true);
            //alert("Data Updated Sucessfully");
            //window.location.href = "/ProcessQuote/ProcessQuoteIndex";
            var msg = 'Data Updated Sucessfully...';
            var flg = 1;
            var mod = 0;
            var url = "/ProcessQuote/ProcessQuoteIndex";
            AlartMessage(msg, flg, mod, url);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function BtnItemClose() {
    window.location.href = "/ProcessQuote/ProcessQuoteIndex";
}