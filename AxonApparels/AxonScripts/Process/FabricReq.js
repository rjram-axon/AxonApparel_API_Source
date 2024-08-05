var Guserid = 0;
var UserName = 0;
var CompanyId = 0;
var MainFDate = 0;
var Mode;
var ItmList = [];
var Masid = 0;
var JOrdID = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadOrderNoDDL("#ddlOrderNo");
    LoadRefNoDDL("#ddlrefno");
    LoadStyleDDL("#ddlstyle");
    LoadOrderNoDDL("#ddlOrderNo");
    var protype = $('input[name="optwrkordmain"]:checked').attr('value');
    if (protype == 'E') {

        $('#msupp').show();
        $("#mwrkdiv").hide();

        $('#ddlMSupplier').empty();
        LoadSupplierDDL('#ddlMSupplier');
    }
    else if (protype == 'I') {


        $('#msupp').hide();
        $("#mwrkdiv").show();

        $('#ddlMwrkdiv').empty();
        LoadCompanyUnitDDL("#ddlMwrkdiv");
    }
    LoadMaingridddl();
    LoadMaingrid();

    //LoadWrkdiv();
    //LoadProcessor();


    $("#tblitmgrid").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < ItmList.length; d++) {
                    if (ItmList[d].sno == val) {
                        ItmList[d].check = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < ItmList.length; d++) {
                    if (ItmList[d].sno == val) {

                        ItmList[d].check = "N";
                    }

                }
            }

        });

    });


    $(document).on('keyup', '.calcacptquan', function () {
        debugger;



        var table = $('#tblitmgrid').DataTable();

        var pid = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["Recvdqty"];

        var value = $(this).val();


        var PQty = $('#txtPlanQty').val();

        if (PQty == "") {
            //alert("Please Enter Planned Qty,Then Proceed...");
            var msg = 'Please Enter Planned Quantity,Then Proceed...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

           
            if (ItmList.length > 0 && ItmList != undefined && ItmList != null) {
                for (var i in ItmList) {
                    if (ItmList[i].sno == pid) {
                        ItmList[i].FabricWt = 0;                       
                        break; //Stop this loop, we found it!
                    }
                }
             
            }
        }
        else {

            //$.each(ItmList, function () {
            //    if (this.sno == pid) {
            //        this.FabricWt = value;

            //    }
            //});
            //LoadItmtab(ItmList);
            if (ItmList.length > 0 && ItmList != undefined && ItmList != null) {

                for (var i in ItmList) {
                    if (ItmList[i].sno == pid) {                      

                        var StkQty = ItmList[i].AvailStock;

                        if (value > StkQty) {
                            //alert("Please Check the StockQty...");
                            var msg = 'Please Check the StockQty...';
                            var flg = 4;
                            var mod = 1;
                            var url = "";
                            AlartMessage(msg, flg, mod, url);

                            for (var i in ItmList) {
                                if (ItmList[i].sno == pid) {
                                    ItmList[i].FabricWt = 0;
                                    break; //Stop this loop, we found it!
                                }
                            }


                            //loadItemTable(ItemList);
                            var tablef = $('#tblitmgrid').DataTable();
                            var datas = tablef.rows().data();

                            $('input[id=txtDebtQty]').each(function (ig) {
                                if (datas[ig].sno == pid) {
                                    var row = $(this).closest('tr');
                                    row.find('#txtAcptQty').val(0);
                                }
                            });
                            return true;
                           
                        }
                        break; //Stop this loop, we found it!
                    }
                }


                for (var i in ItmList) {
                    if (ItmList[i].sno == pid) {
                        ItmList[i].FabricWt = value;
                        break; //Stop this loop, we found it!
                    }
                }
                
            }
        }
    });

    $(document).on('keyup', '.calcrate', function () {
        debugger;

        var table = $('#tblitmgrid').DataTable();


        var pid = table.row($(this).parents('tr')).data()["sno"];
        var balq = table.row($(this).parents('tr')).data()["Recvdqty"];

        var value = $(this).val();


        //$.each(ItmList, function () {
        //    if (this.sno == pid) {
        //        this.ReqWt = value;

        //    }
        //});
        //LoadItmtab(ItmList);
        if (ItmList.length > 0 && ItmList != undefined && ItmList != null) {
            for (var i in ItmList) {
                if (ItmList[i].sno == pid) {
                    ItmList[i].ReqWt = value;
                    break; //Stop this loop, we found it!
                }
            }
            
        }
    });

});


function LoadMaingrid() {
    debugger;


    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');




    if (proctype == 'E') {

        var SuppId = $('#ddlMSupplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'I') {
        var SuppId = $('#ddlMwrkdiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    var ordNo = 0;
    var ONo = $('select#ddlMOrderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == 0;
    }
    else {

        ordNo = $('#ddlMOrderno').val();
    }

    var RecNo = 0;
    var RNo = $('select#ddlMstyle option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == 0;
    }
    else {

        RecNo = $('#ddlMstyle').val();
    }
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }
    var RefNoId = $('#ddlMrefNo').val();
    if (RefNoId == null || RefNoId == "0") {
        RefNoId = 0;
    }
    var Masid = $('#ddlMOpenstockno').val();
    if (Masid == null || Masid == "0") {
        Masid = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    //var OType = $('#ddlMOrderType').val();

    var OType = "";
    var OTyp = $('#ddlMOrderType').val();

    if (OTyp == 0 || OTyp == undefined) {
        OType == 0;
    }
    else {

        OType = $('#ddlMOrderType').val();
    }

    $.ajax({
        url: "/FabricReq/LoadMaingrid",
        data: JSON.stringify({ bmasid: ordNo, styleid: RecNo, fabid: Masid, processortype: proctype, fromDate: FDate, todate: TDate, Otype: OType, ProcessorId: SuppId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tblitmmaingrid').DataTable({
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
                         { title: "FabReqMasid", "visible": false },
                         { title: "Fabric Requisition No" },
                         { title: "Fabric Req Date" },
                         { title: "Order No" },
                         { title: "Ref No" },
                         {
                             title: "Style",//data:"Recpt_Ref_no",
                             //render: function () {
                             //    return '<input type="text" id="txtReqQty" class="editor-active"  style="width: 50px;text-align: center;" value=' + dataSet[0][5] + ' >';
                             //},
                         },

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
            CheckRights("FabricReq");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadMaingridddl() {
    debugger;


    var proctype = $('input[name="optwrkordmain"]:checked').attr('value');

    if (proctype == 'E') {

        //var SuppId = $('#ddlMSupplier').val();

        var SuppId = $('#ddlMSupplier').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    else if (proctype == 'I') {
        //var SuppId = $('#ddlMwrkdiv').val();

        var SuppId = $('#ddlMwrkdiv').val();
        if (SuppId == null || SuppId == "0") {
            SuppId = 0;
        }
    }
    var ordNo = 0;
    var ONo = $('select#ddlMOrderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == 0;
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = 0;
    var RNo = $('select#ddlMstyle option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RecNo == 0;
    }
    else {

        RecNo = $('select#ddlMstyle option:selected').val();
    }
    var CompId = $('#ddlMCompany').val();
    if (CompId == null || CompId == "0") {
        CompId = 0;
    }

    var Masid = $('#ddlMOpenstockno').val();
    if (Masid == null || Masid == "0") {
        Masid = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = "";
    $.ajax({
        url: "/FabricReq/LoadMaingriddet",
        data: JSON.stringify({ bmasid: ordNo, styleid: RecNo, fabid: Masid, processortype: proctype, fromDate: FDate, todate: TDate, Otype: OType, ProcessorId: SuppId }),
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
                $.each(obj, function (i, el) {



                    if (!recptdet[el.Fabric_Req_no]) {
                        recptdet[el.Fabric_Req_no] = true;
                        recpt.push(el);
                    }

                    if (!dcdet[el.Buy_Ord_Masid]) {
                        dcdet[el.Buy_Ord_Masid] = true;
                        dc.push(el);
                    }

                    if (!procdet[el.styleid]) {
                        procdet[el.styleid] = true;
                        proc.push(el);
                    }

                    if (!unitdet[el.Buy_Ord_Masid]) {
                        unitdet[el.Buy_Ord_Masid] = true;
                        unit.push(el);
                    }
                });


                $(ddlMOpenstockno).append($('<option/>').val('0').text('--Select FabReqNo--'));
                $.each(recpt, function () {
                    $(ddlMOpenstockno).append($('<option></option>').val(this.Fabric_Req_Masid).text(this.Fabric_Req_no));
                });

                $(ddlMrefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(dc, function () {
                    $(ddlMrefNo).append($('<option></option>').val(this.Buy_Ord_Masid).text(this.refno));
                });



                $(ddlMstyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(proc, function () {
                    $(ddlMstyle).append($('<option></option>').val(this.styleid).text(this.style));
                });

                $(ddlMOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(unit, function () {
                    $(ddlMOrderno).append($('<option></option>').val(this.Buy_Ord_Masid).text(this.orderno));
                });

                //$(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                //$.each(data, function () {
                //    $(ddlMBuyer).append($('<option></option>').val(this.buyerid).text(this.buyer));
                //});
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(masid) {
    debugger;
    Masid = masid;
    LoadSupplierDDL('#ddlSupplier');
    LoadCompanyUnitDDL("#ddlwrkdiv");
    $.ajax({
        url: "/FabricReq/LoadEditItemDet",
        data: JSON.stringify({ Masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btnupd').show();
            $('#btndel').hide();
            $('#btnadd').hide();
            var obj = json.Value;


            $('#ddlOrderNo').val(obj[0].Buy_Ord_Masid);
            $('#ddlrefno').val(obj[0].Buy_Ord_Masid);
            $('#ddlstyle').val(obj[0].styleid);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtreqno').val(obj[0].Fabric_Req_no);
            $('#ddlCompany').val(obj[0].Companyid);
            $('#ddlType').val(obj[0].OType);
            $('#txtCancelno').val(obj[0].CancelNo);
            $('#txtCancelrefNo').val(obj[0].CancelRefNo);
            $('#txtDate').val(moment(obj[0].Fabric_Req_date).format("DD/MM/YYYY"));//.val(obj[0].CancelRefDate);

            $('#txtPlanQty').val(obj[0].PlannedQty);
            $('#txtPenQty').val(obj[0].PendingQty);

            var protype = obj[0].IntenalOrExternal;

            //var protype = $('input[name="optwrkord"]:checked').attr('value');
            if (protype == 'E') {
                $('input:radio[name="optwrkord"][value="E"]').prop('checked', true);
                $('#supp').show();
                $("#wrkdiv").hide();

                //$('#ddlSupplier').empty();
                //LoadSupplierDDL('#ddlSupplier');
                $('#ddlSupplier').val(obj[0].ProcessorId);
            }
            else if (protype == 'I') {

                $('input:radio[name="optwrkord"][value="I"]').prop('checked', true);
                $('#supp').hide();
                $("#wrkdiv").show();

                //$('#ddlwrkdiv').empty();
                //LoadCompanyUnitDDL("#ddlwrkdiv");

                $('#ddlwrkdiv').val(obj[0].ProcessorId);
            }
            ItmList = obj;

            LoadItmtab(ItmList);

            $("#ddlOrderNo").prop("disabled", true);
            $("#ddlrefno").prop("disabled", true);
            $("#ddlstyle").prop("disabled", true);
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function getDeleteID(masid) {
    debugger;
    Masid = masid;
    LoadSupplierDDL('#ddlSupplier');
    LoadCompanyUnitDDL("#ddlwrkdiv");
    $.ajax({
        url: "/FabricReq/LoadEditItemDet",
        data: JSON.stringify({ Masid: masid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;


            $('#myModal').show();
            $('#myModal').modal('show');
            $('#btndel').show();
            $('#btnupd').hide();
            $('#btnadd').hide();
            var obj = json.Value;


            $('#ddlOrderNo').val(obj[0].Buy_Ord_Masid);
            $('#ddlrefno').val(obj[0].Buy_Ord_Masid);
            $('#ddlstyle').val(obj[0].styleid);
            $('#txtProcessor').val(obj[0].supplier);
            $('#txtRefNo').val(obj[0].Recpt_Ref_no);
            $('#txtRemark').val(obj[0].remarks);
            $('#txtreqno').val(obj[0].Fabric_Req_no);
            $('#ddlCompany').val(obj[0].Companyid);
            $('#ddlType').val(obj[0].OType);
            $('#txtCancelno').val(obj[0].CancelNo);
            $('#txtCancelrefNo').val(obj[0].CancelRefNo);
            $('#txtDate').val(moment(obj[0].Fabric_Req_date).format("DD/MM/YYYY"));//.val(obj[0].CancelRefDate);

            $('#txtPlanQty').val(obj[0].PlannedQty);
            $('#txtPenQty').val(obj[0].PendingQty);

            var protype = obj[0].IntenalOrExternal;

            //var protype = $('input[name="optwrkord"]:checked').attr('value');
            if (protype == 'E') {
                $('input:radio[name="optwrkord"][value="E"]').prop('checked', true);
                $('#supp').show();
                $("#wrkdiv").hide();

                //$('#ddlSupplier').empty();
                //LoadSupplierDDL('#ddlSupplier');
                $('#ddlSupplier').val(obj[0].ProcessorId);
            }
            else if (protype == 'I') {

                $('input:radio[name="optwrkord"][value="I"]').prop('checked', true);
                $('#supp').hide();
                $("#wrkdiv").show();

                //$('#ddlwrkdiv').empty();
                //LoadCompanyUnitDDL("#ddlwrkdiv");

                $('#ddlwrkdiv').val(obj[0].ProcessorId);
            }
            ItmList = obj;

            LoadItmtab(ItmList);

            $("#ddlOrderNo").prop("disabled", true);
            $("#ddlrefno").prop("disabled", true);
            $("#ddlstyle").prop("disabled", true);
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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

    $('#txtDate').val(Fdatestring);
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);



}

function List() {
    $('#tblitmmaingrid').DataTable().destroy();
    LoadMaingrid();
}
function RadioMBClick() {
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'E') {

        $('#supp').show();
        $("#wrkdiv").hide();

        $('#ddlSupplier').empty();
        LoadSupplierDDL('#ddlSupplier');
    }
    else if (protype == 'I') {


        $('#supp').hide();
        $("#wrkdiv").show();

        $('#ddlwrkdiv').empty();
        LoadCompanyUnitDDL("#ddlwrkdiv");
    }
}

function RadioClick() {
    var protype = $('input[name="optwrkordmain"]:checked').attr('value');
    if (protype == 'E') {

        $('#msupp').show();
        $("#mwrkdiv").hide();

        $('#ddlMSupplier').empty();
        LoadSupplierDDL('#ddlMSupplier');
    }
    else if (protype == 'I') {


        $('#msupp').hide();
        $("#mwrkdiv").show();

        $('#ddlMwrkdiv').empty();
        LoadCompanyUnitDDL("#ddlMwrkdiv");
    }
}
function ClearTextbox() {
    Mode = 0;
    GenerateNumber();
    //$('#ddlCompany').val("0");
    $('#ddlItemgroup').val("0");
    $('#txtOpeningno').val("");
    $('#txtSubBillNo').val("");
    // $('#txtBillDate').val("");
    // $('#txtDate').val("");
    $('#ddlCurrency').val("0");
    $('#txtExRate').val("");
    $('#txtAmount').val("");
    $('#txtremarks').val("");
    $('#ddlDepartment').val("0");

    $('#btnupd').hide();
    $('#btndel').hide();
    $('#btnadd').show();

    var protype = $('input[name="optwrkord"]:checked').attr('value');
    if (protype == 'E') {

        $('#supp').show();
        $("#wrkdiv").hide();
        $('#ddlSupplier').empty();
        LoadSupplierDDL('#ddlSupplier');
    }
    else if (protype == 'I') {
        $('#supp').hide();
        $("#wrkdiv").show();

        $('#ddlwrkdiv').empty();
        LoadCompanyUnitDDL("#ddlwrkdiv");
    }

    ItmList = [];

    LoadItmtab(ItmList);


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
    CompanyId = $('select#ddlCompany option:selected').val();
    table = "Fabric_Requisition_Mas",
    column = "Fabric_Req_no",
    compId = CompanyId,
    Docum = 'FABRIC REQUISITION'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtreqno').val(result.Value);
        }
    });
}

function GetStyleNo() {
    debugger;
    var OrderNo = '';
    var ON = $('#ddlOrderNo').val();
    if (ON == 0) {
        OrderNo = "";
        //alert('Please select any OrderNo...');
        var msg = 'Please select any Order Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        //return false;
    }
    else {
        OrderNo = $('#ddlOrderNo option:selected').text();
    }
    $.ajax({
        url: "/PlanningConsumption/GetStyleNumber/",
        data: JSON.stringify({ OrdNo: OrderNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        //dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            CpyStyle = obj;

            $('#txtPenQty').val(obj[0]["Quantity"]);

            var compdet = {};
            var comp = [];

            $.each(obj, function (i, el) {

                if (!compdet[el.StyleID]) {
                    compdet[el.StyleID] = true;
                    comp.push(el);
                }
            });

            $('#ddlstyle').empty();
            $('#ddlstyle').append($('<option/>').val('0').text('--Select Style--'));
            $.each(comp, function () {
                $('#ddlstyle').append($('<option></option>').val(this.StyleID).text(this.Style));
            });


            $('#ddlrefno').empty();
            $('#ddlrefno').append($('<option/>').val('0').text('--Select RefNo--'));
            $.each(comp, function () {
                $('#ddlrefno').append($('<option></option>').text(this.Ref_no));
            });

            LoadItemDet();

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function LoadItemDet() {

    var Bmasid = $('#ddlOrderNo').val();
    var Styleid = $('#ddlstyle').val();


    if (Bmasid == null || Bmasid == 0 || Bmasid == undefined) {
        Bmasid = 0;
    }
    if (Styleid == null || Styleid == 0 || Styleid == undefined) {
        Styleid = 0;
    }
    $.ajax({
        url: "/FabricReq/LoadItemDet",
        data: JSON.stringify({ Bmasid: Bmasid, Styleid: Styleid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;

            ItmList = result.Value;

            var planqty = $('#txtPlanQty').val();
            if (planqty == "") {
                planqty = 0;
            }
            for (var t = 0; t < ItmList.length; t++) {
                var panqty = ItmList[t].panelprdqty;
                var freq = ItmList[t].freq;
                var wt = (parseFloat(freq) / parseFloat(panqty)).toFixed(3);
                ItmList[t].FabricWt = parseFloat(wt) * parseFloat(planqty);
                ItmList[t].ReqWt = parseFloat(wt) * parseFloat(planqty);

            }
            LoadItmtab(ItmList);

        }

    });
}


function LoadItmtab(list) {
    $('#tblitmgrid').DataTable().destroy();

    $('#tblitmgrid').DataTable({
        data: list,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [
              { title: "SNo", data: "sno", "visible": false },
                   { title: "PanelId", data: "panelid", "visible": false },
                   { title: "Panel", data: "panel" },
                   { title: "FabricId", data: "Itemid", "visible": false },
                   { title: "Fabric", data: "item" },
                    { title: "Colorid", data: "Colorid", "visible": false },
                   { title: "Color", data: "color" },
                   { title: "Combocolorid", data: "ComboColorid", "visible": false },
                   { title: "Combo Color", data: "combocolor" },
                   {
                       title: "Batch No", data: "BatchNo",

                   },
                   { title: "Lot No", data: "LotNo" },

                   {
                       title: "Dia", data: "size",

                   },
                   {
                       title: "Avail Stk", data: "AvailStock",
                       render: function (data) {

                           return '<input type="text" id="txtDebtQty" class="calcadjquan form-control"  disabled style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Fabric Wt", data: "FabricWt",
                       render: function (data) {

                           return '<input type="text" id="txtAcptQty" class="calcacptquan form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   {
                       title: "Req Wt", data: "ReqWt",
                       render: function (data) {

                           return '<input type="text" id="txtRate" class="calcrate form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },

                   },
                    //{
                    //    title: "Alloted", data: "sno",
                    //    render: function (data) {

                    //        return '<input type="checkbox" id="group" value=' + data + ' onclick="myfunc(this.value);">';
                    //    }
                    //},
                     {
                         title: "Alloted", data: "sno",
                         render: function (data, type, row) {
                             if ((row.check == 'true' || row.check == true || row.check == "Y")) {
                                 return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  checked  value=' + data + ' >';
                             }
                             else {
                                 return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                             }


                         }
                     },

        ]

    });
    var table = $('#tblitmgrid').DataTable();
    $("#tblitmgrid tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblitmgrid tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function myfunc(Val) {
    debugger;
    JOrdID = JOrdID + "," + Val;

}


function Calcwt() {
    debugger;
    var planqty = $('#txtPlanQty').val();
    if (planqty == "") {
        planqty = 0;
    }
    for (var t = 0; t < ItmList.length; t++) {
        var panqty = ItmList[t].panelprdqty;
        var freq = ItmList[t].freq;
        var wt = (parseFloat(freq) / parseFloat(panqty)).toFixed(3);
        ItmList[t].FabricWt = parseFloat(wt) * parseFloat(planqty);
        ItmList[t].ReqWt = parseFloat(wt) * parseFloat(planqty);

    }
    LoadItmtab(ItmList);
}


function validate() {
    var isValid = true;

    if ($('#ddlrefno').val() == 0) {
        $('#ddlrefno').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlrefno').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlstyle').val() == 0) {

        $('#ddlstyle').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlstyle').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlOrderNo').val() == 0) {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlCompany').val() == 0) {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlType').val() == 0) {

        $('#ddlType').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlType').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    var protype = $('input[name="optwrkord"]:checked').attr('value');

    if (protype == "E") {

        if ($('#ddlSupplier').val() == 0) {

            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlSupplier').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    } else {
        if ($('#ddlwrkdiv').val() == 0) {

            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlwrkdiv').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    if ($('#txtPlanQty').val().trim() == "") {
        $('#txtPlanQty').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPlanQty').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var procid;
    if (protype == 'E') {
        procid = $('#ddlSupplier').val();

    }
    else if (protype == 'I') {
        procid = $('#ddlwrkdiv').val();

    }



    var list = [];

    for (var j = 0; j < ItmList.length; j++) {
        if (ItmList[j].check == true || ItmList[j].check == "true" || ItmList[j].check == "Y") {
            list.push(ItmList[j]);
        }
    }


    if (list.length == 0) {
        //alert('Please select checkboxes for any one row..');
        var msg = 'Please select checkboxes for any one row...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }
    debugger;
    var oldfabreqno = $('#txtreqno').val();

    CompanyId = $('select#ddlCompany option:selected').val();
    table = "Fabric_Requisition_Mas",
    column = "Fabric_Req_no",
    compId = CompanyId,
    Docum = 'FABRIC REQUISITION'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newfabreqno = result.Value;
            if (oldfabreqno != newfabreqno) {
                //alert('Fabric Req No has been changed...');
                var msg = 'Fabric Requisition Number has been changed...';
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                $('#txtreqno').val(result.Value);
            }



            var Obj = {
                Fabric_Req_no: $('#txtreqno').val(),
                Fabric_Req_date: $('#txtDate').val(),
                IntenalOrExternal: protype,
                ProcessorId: procid,
                Buy_Ord_Masid: $('#ddlOrderNo option:selected').val(),
                DeliScheduleNo: 0,
                PlannedQty: $('#txtPlanQty').val(),
                Otype: $('#ddlType').val(),
                PendingQty: $('#txtPenQty').val(),
                companyid: $('#ddlCompany').val(),
                CreatedBy: Guserid,
                styleid: $('#ddlstyle').val(),
                FabDet: list
            }
            $("#btnadd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/FabricReq/Add",
                data: JSON.stringify(Obj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    //if (result.Value == 1) {

                    //alert('Data Saved Successfully');
                    //window.location.href = "/FabricReq/FabricReqIndex";
                    var msg = 'Data Saved Successfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/FabricReq/FabricReqIndex";
                    AlartMessage(msg, flg, mod, url);
                    //}
                    //if (result.Value == 0) {

                    //    alert('Data not saved properly');
                    //    window.location.href = "/StockInwardMain/StockInwardMainIndex";

                    //}

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

    var res = validate();
    if (res == false) {
        return false;
    }
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var procid;
    if (protype == 'E') {
        procid = $('#ddlSupplier').val();

    }
    else if (protype == 'I') {
        procid = $('#ddlwrkdiv').val();

    }


    //var list = [];

    //for (var j = 0; j < ItmList.length; j++) {
    //    if (ItmList[j].check == true || ItmList[j].check == "true") {
    //        list.push(ItmList[j]);
    //    }
    //}


    if (ItmList.length == 0) {
        //alert('Please select checkboxes for any one row..');
        var msg = 'Please select checkboxes for any one row...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var Obj = {
        Fabric_Req_Masid: Masid,
        Fabric_Req_no: $('#txtreqno').val(),
        Fabric_Req_date: $('#txtDate').val(),
        IntenalOrExternal: protype,
        ProcessorId: procid,
        Buy_Ord_Masid: $('#ddlOrderNo option:selected').val(),
        DeliScheduleNo: 0,
        companyid: $('#ddlCompany').val(),
        PlannedQty: $('#txtPlanQty').val(),
        Otype: $('#ddlType').val(),
        styleid: $('#ddlstyle').val(),
        PendingQty: $('#txtPenQty').val(),
        CreatedBy: Guserid,
        FabDet: ItmList
    }
    $("#btnupd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/FabricReq/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //if (result.Value == 1) {

            //alert('Data Updated Successfully');
            //window.location.href = "/FabricReq/FabricReqIndex";
            var msg = 'Data Updated Successfully...';
            var flg = 1;
            var mod = 1;
            var url = "/FabricReq/FabricReqIndex";
            AlartMessage(msg, flg, mod, url);
            //}
            //if (result.Value == 0) {

            //    alert('Data not saved properly');
            //    window.location.href = "/StockInwardMain/StockInwardMainIndex";

            //}

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function Delete() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }
    var protype = $('input[name="optwrkord"]:checked').attr('value');
    var procid;
    if (protype == 'E') {
        procid = $('#ddlSupplier').val();

    }
    else if (protype == 'I') {
        procid = $('#ddlwrkdiv').val();

    }

    var Obj = {
        Fabric_Req_Masid: Masid,
        Fabric_Req_no: $('#txtreqno').val(),
        Fabric_Req_date: $('#txtDate').val(),
        IntenalOrExternal: protype,
        ProcessorId: procid,
        Buy_Ord_Masid: $('#ddlOrderNo option:selected').val(),
        DeliScheduleNo: 0,
        companyid: $('#ddlCompany').val(),
        PlannedQty: $('#txtPlanQty').val(),
        Otype: $('#ddlType').val(),
        PendingQty: $('#txtPenQty').val(),
        CreatedBy: Guserid,
        styleid: $('#ddlstyle').val(),
        FabDet: ItmList
    }
    $("#btnupd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/FabricReq/Delete",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //if (result.Value == 1) {

            //alert('Data Deleted Successfully');
            //window.location.href = "/FabricReq/FabricReqIndex";
            var msg = 'Data Deleted Successfully...';
            var flg = 2;
            var mod = 0;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            //}
            //if (result.Value == 0) {

            //    alert('Data not saved properly');
            //    window.location.href = "/StockInwardMain/StockInwardMainIndex";

            //}

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function ProcRetPrint(Repid) {
    window.open("../ReportInline/Process/FabricReq/FabricReqInlineReport.aspx?Masid=" + Repid);

}