
var StyRowId;
var Gp = 0;
var PStyRowId = 0;
var repobj = [];
var docname = '';
var MainFDate = 0;
var BuyOnEmp = "N";
var buylist = [];
var OrdApp = "N";
var superuser = 0;
var Guserid = 0;
var Pcount = 0;
var PrintCount = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkBuyer = true;
var ChkStyle = true;
var ChkJobNo = true;
var planamend = 0;
var ordno = '';
var sty = '';
$(document).ready(function () {
    debugger;
    var Prg = "Prog";

    Gp = Prg;


    LoadBuyerDDL("#ddlMBuyer");
    LoadCompanyDDL("#ddlMCompany");
    // LoadJobNoDDL("#ddlMJobNo");
    MainFDate = $("#hdMainFromDate").data('value');
    Guserid = $("#hdnUserid").data('value');
    BuyOnEmp = $("#hdnBuyWisCost").data('value');
    superuser = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    //ListOrderRefNo();
    //ListStyle();
    getDate();
    $('#BudUnitMerchId').hide();
    $('#BudPrintPreviewId').show();

    //Program();
    //Program();
    $(document).on('click', '.btneditbudget', function () {
        debugger;

    });
    $('#tPMbody').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tPMbody').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tPMbody').dataTable().fnGetData(row);

        ordno = data[3];
        sty = data[0];
    });
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

    var fill = localStorage.getItem('PlanningMenuFilter');
    if (fill != "null" && fill != null) {
        MainListFromBack(Gp);
    } else {

        MainList(Gp);
    }

    $(document).on('keyup', '#txtFromDate', function (e) {
        DtChk = true;
        MainList(Gp);
    });
    $(document).on('keyup', '#txtToDate', function (e) {
        DtChk = true;
        MainList(Gp);
    });

});

function Bom() {
    var Prg = "Bom";
    Gp = Prg;
    // $('#tPMbody').DataTable().destroy();

    var fill = localStorage.getItem('PlanningMenuFilter');
    if (fill != "null" && fill != null) {
        MainListFromBack(Gp);
    } else {

        MainList(Gp);
    }

    //MainList(Gp);
    //CheckRights("PgmBOM");
}
function Budget() {

    var Prg = "Bud";
    Gp = Prg;
    // $('#tPMbody').DataTable().destroy();
    var fill = localStorage.getItem('PlanningMenuFilter');
    if (fill != "null" && fill != null) {
        MainListFromBack(Gp);
    } else {

        MainList(Gp);
    }
    //MainList(Gp);
   // CheckRights("PgmBudget");
}
function Program() {

    var Prg = "Prog";
    Gp = Prg;
    //var fill = localStorage.getItem('PlanningMenuFilter');
    //if (fill != "null" && fill != null) {
    //    MainListFromBack(Gp);
    //} else {

    //    MainList(Gp);
    //}
    // $('#tPMbody').DataTable().destroy();
    MainList(Gp);
    //CheckRights("PlanProgram");
}

function Mload() {
    var Prg = "Prog";
    Gp = Prg;
    var fill = localStorage.getItem('PlanningMenuFilter');
    if (fill != "null" && fill != null) {
        MainListFromBack(Gp);
    } else {

        MainList(Gp);
    }
    //  $('#tPMbody').DataTable().destroy();
    //MainList(Gp);
}


function SamProgram() {
    //  var Prg = "SamProg";
    var Prg = "Prog";
    Gp = Prg;
    var fill = localStorage.getItem('PlanningMenuFilter');
    if (fill != "null" && fill != null) {
        MainListFromBack(Gp);
    } else {

        MainList(Gp);
    }
    // $('#tPMbody').DataTable().destroy();
    //MainList(Gp);
}

function WorkFlow() {
    var Prg = "WorkFlow";
    Gp = Prg;
    var fill = localStorage.getItem('PlanningMenuFilter');
    if (fill != "null" && fill != null) {
        MainListFromBack(Gp);
    } else {

        MainList(Gp);
    }
    // $('#tPMbody').DataTable().destroy();
    //MainList(Gp);
    //CheckRights("PgmWorkFlow");
}

function getbyAddID(StyleRowID) {
    if (Gp == "Prog") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "Bud") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId;

    } else if (Gp == "Bom") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/BOM/BOMIndex?StyleRowId=" + StyRowId;
    } else if (Gp == "WorkFlow") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex?StyId=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "SamProg") {
        StyRowId = StyleRowID;
        var Mode = 0;
        window.location.href = "/SamplePlanningFabric/SamplePlanningFabricIndex?StyId=" + StyRowId + "=&Mode=" + Mode;
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
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);



}
function MainList(Gp) {

    var odType = $('#ddlMOrderType').val();


    if (odType == "S") {
        $("#PrgId").hide();
        $("#SamPrgId").show();

        $("#lblSamBom").show();
    } else if (odType == "D") {
        $("#PrgId").hide();
        $("#SamPrgId").show();

        $("#lblSamBom").show();
    } else {
        $("#PrgId").show();
        $("#SamPrgId").hide();
        $("#lblSamBom").hide();
    }

    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null || CompId== undefined) {
    //    CompId = 0;
    //}

    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }


    var OType = $('input[name="Planned"]:checked').attr('value');


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || RNo == undefined) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }


    var JobNo = "";
    var JNo = $('select#ddlMJobNo option:selected').val();

    if (JNo == 0 || JNo == undefined) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlMJobNo option:selected').val();
    }


    var buyId = $('#ddlMBuyer').val();

    if (buyId == null || buyId == undefined) {
        buyId = 0;
    }

    var StyId = $('#ddlMStyle').val();

    if (StyId == null || StyId == undefined) {
        StyId = 0;
    }
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrderType = $('#ddlMOrderType').val();

    if (OrderType == 0) {
        var ODtype = "B";
    } else {
        var ODtype = $('#ddlMOrderType').val();
    }

    if (Gp == "Bud") {
        var bd = 'Y';
    }
    else {
        var bd = 'N';
    }

    if (DtChk) {

        OrdNo = "";
        RefNo = "";
        JobNo = "";
        buyId = 0;
        StyId = 0;
    }

    var Dispatchchecked = false;
    var DispatchClosed = "N";
    Dispatchchecked = $('#ChkDispatch').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    var menufilter = CompId + ',' + OrdNo + ',' + RefNo + ',' + StyId + ',' + FDate + ',' + TDate + ',' + OType + ',' + Gp + ',' + ODtype + ',' + bd + ',' + BuyOnEmp + ',' + Guserid + ',' + buyId + ',' + JobNo + ',' + DispatchClosed ;

    localStorage.setItem('PlanningMenuFilter', menufilter);


    $.ajax({
        url: "/PlanningMain/ListPlanning",
        data: JSON.stringify({ CompanyID: CompId, Order_No: OrdNo, Ref_no: RefNo, StyleID: StyId, frmDate: FDate, ToDate: TDate, OType: OType, Type: Gp, OrderType: ODtype, bud: bd, buystat: BuyOnEmp, empid: Guserid, buyerid: buyId, Job_Ord_No: JobNo, DispatchClosed: DispatchClosed }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][5]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        buyerid: dataSet[i][15],
                        buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.buyerid]) {
                        revdet[el.buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][0],
                        style: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Jobno: dataSet[i][16]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Jobno]) {
                        revdet[el.Jobno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMJobNo').empty();
                $('#ddlMJobNo').append($('<option/>').val('0').text('--Select WorkOrderNo--'));
                $.each(rev, function () {
                    $('#ddlMJobNo').append($('<option></option>').val(this.Jobno).text(this.Jobno));
                });

                return true;
            }


            var inputcount = 0;
            $('#tPMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tPMbody').DataTable();
                var rows = table.clear().draw();
                $('#tPMbody').DataTable().rows.add(dataSet);
                $('#tPMbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tPMbody').DataTable({
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
                    "rowCallback": function (row, data, index) {
                        if (data[11] > "0") {
                            $('td', row).css('background-color', 'Tan');

                        }
                        //else if (data[6] == "4")
                        //{
                        //    //$('td', row).css('background-color', 'Orange');
                        //}
                    },
                    columns: [
                             { title: "StyleId", "visible": false },
                             { title: "Company" },
                             { title: "Buyer" },
                             { title: "Order No" },
                             { title: "Style" },
                             { title: "Ref No" },
                             { title: "Date" },
                             { title: "Quantity" },
                             { title: "StyleRowID", "visible": false },
                             { title: "ProSeqMasID", "visible": false },
                             { title: "TPrgQty", "visible": false },
                             { title: "ProdAmend", "visible": false },
                             { title: "PlanApp", "visible": false },
                             { title: "CostApp", "visible": false },
                             { title: "Companyid", "visible": false },
                             { title: "Buyerid", "visible": false },
                             { title: "JobNo", "visible": false },
                             { title: "Program" },

                    ]

                });

            }

            $(document).ready(function () {
                var table = $('#tPMbody').DataTable();

                $('#tPMbody tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            //if (Gp == "Prog") {
            //    CheckRights("PlanProgram");
            //} else if (Gp == "Bud") {
            //    CheckRights("PgmBudget");
            //} else if (Gp == "Bom") {
            //    CheckRights("PgmBOM");
            //} else if (Gp == "WorkFlow") {
            //    CheckRights("PgmWorkFlow");
            //}


            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][5]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

            }


            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

            }


            if (ChkBuyer) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        buyerid: dataSet[i][15],
                        buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.buyerid]) {
                        revdet[el.buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

            }

            if (ChkStyle) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][0],
                        style: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

            }

            if (ChkJobNo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Jobno: dataSet[i][16]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Jobno]) {
                        revdet[el.Jobno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMJobNo').empty();
                $('#ddlMJobNo').append($('<option/>').val('0').text('--Select WorkOrderNo--'));
                $.each(rev, function () {
                    $('#ddlMJobNo').append($('<option></option>').val(this.Jobno).text(this.Jobno));
                });

            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}



function MainListFromBack(Gp) {

    debugger;
    var fill = localStorage.getItem('PlanningMenuFilter');
    var fillobj = [];
    fillobj = fill.split(",");
    //Gs = Type;
    $('#txtFromDate').val(fillobj[4]);
    $('#txtToDate').val(fillobj[5]);
    if (fillobj[6] == 'P') {
        $('#Planned').prop('checked', true);
    } else {
        $('#UnPlanned').prop('checked', true);
    }

    if (fillobj[14] == 'Y') {
        $('#ChkDispatch').prop('checked', true);
    } else {
        $('#ChkDispatch').prop('checked', false);
    }

    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = 0;
    }
    if (fillobj[12] == "undefined") {
        fillobj[12] = 0;
    }
    if (fillobj[13] == "undefined") {
        fillobj[13] = '';
    }
   

    //var menufilter = CompId + ',' + OrdNo + ',' + RefNo + ',' + StyId + ',' + FDate + ',' + TDate + ',' + OType + ',' + Gp + ',' + ODtype + ',' + bd + ',' + BuyOnEmp + ',' + Guserid + ',' + buyId + ',' + JobNo + ',' + DispatchClosed;

    //localStorage.setItem('PlanningMenuFilter', menufilter);


    $.ajax({
        url: "/PlanningMain/ListPlanning",
        data: JSON.stringify({ CompanyID: fillobj[0], Order_No: fillobj[1], Ref_no: fillobj[2], StyleID: fillobj[3], frmDate: fillobj[4], ToDate: fillobj[5], OType: fillobj[6], Type: Gp, OrderType: fillobj[8], bud: fillobj[9], buystat: fillobj[10], empid: Guserid, buyerid: fillobj[12], Job_Ord_No: fillobj[13], DispatchClosed: fillobj[14] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][5]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        buyerid: dataSet[i][15],
                        buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.buyerid]) {
                        revdet[el.buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][0],
                        style: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Jobno: dataSet[i][16]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Jobno]) {
                        revdet[el.Jobno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMJobNo').empty();
                $('#ddlMJobNo').append($('<option/>').val('0').text('--Select WorkOrderNo--'));
                $.each(rev, function () {
                    $('#ddlMJobNo').append($('<option></option>').val(this.Jobno).text(this.Jobno));
                });

                return true;
            }


            var inputcount = 0;
            $('#tPMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tPMbody').DataTable();
                var rows = table.clear().draw();
                $('#tPMbody').DataTable().rows.add(dataSet);
                $('#tPMbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tPMbody').DataTable({
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
                    "rowCallback": function (row, data, index) {
                        if (data[11] > "0") {
                            $('td', row).css('background-color', 'Tan');

                        }
                        //else if (data[6] == "4")
                        //{
                        //    //$('td', row).css('background-color', 'Orange');
                        //}
                    },
                    columns: [
                             { title: "StyleId", "visible": false },
                             { title: "Company" },
                             { title: "Buyer" },
                             { title: "Order No" },
                             { title: "Style" },
                             { title: "Ref No" },
                             { title: "Date" },
                             { title: "Quantity" },
                             { title: "StyleRowID", "visible": false },
                             { title: "ProSeqMasID", "visible": false },
                             { title: "TPrgQty", "visible": false },
                             { title: "ProdAmend", "visible": false },
                             { title: "PlanApp", "visible": false },
                             { title: "CostApp", "visible": false },
                             { title: "Companyid", "visible": false },
                             { title: "Buyerid", "visible": false },
                             { title: "JobNo", "visible": false },
                             { title: "Program" },

                    ]

                });

            }

            $(document).ready(function () {
                var table = $('#tPMbody').DataTable();

                $('#tPMbody tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            //if (Gp == "Prog") {
            //    CheckRights("PlanProgram");
            //} else if (Gp == "Bud") {
            //    CheckRights("PgmBudget");
            //} else if (Gp == "Bom") {
            //    CheckRights("PgmBOM");
            //} else if (Gp == "WorkFlow") {
            //    CheckRights("PgmWorkFlow");
            //}


            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][5]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMRefNo').empty();
                $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlMRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

            }


            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMOrderNo').empty();
                $('#ddlMOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlMOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

            }


            if (ChkBuyer) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        buyerid: dataSet[i][15],
                        buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.buyerid]) {
                        revdet[el.buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.buyerid).text(this.buyer));
                });

            }

            if (ChkStyle) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        styleid: dataSet[i][0],
                        style: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.styleid]) {
                        revdet[el.styleid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMStyle').empty();
                $('#ddlMStyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(rev, function () {
                    $('#ddlMStyle').append($('<option></option>').val(this.styleid).text(this.style));
                });

            }

            if (ChkJobNo) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Jobno: dataSet[i][16]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Jobno]) {
                        revdet[el.Jobno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMJobNo').empty();
                $('#ddlMJobNo').append($('<option/>').val('0').text('--Select WorkOrderNo--'));
                $.each(rev, function () {
                    $('#ddlMJobNo').append($('<option></option>').val(this.Jobno).text(this.Jobno));
                });

            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
//function MainList() {

//    // $('#tMbody').DataTable().destroy();
//    ChkRefno = true;
//    ChkOrdno = true;
//    ChkBuyer = true;
//    DtChk = false;
//    ChkStyle = true;
//    ChkJobNo = true;
//    Program();
//}


//function CMainList() {
//    // $('#tMbody').DataTable().destroy();
//    ChkRefno = true;
//    ChkOrdno = true;
//    ChkBuyer = true;
//    DtChk = false;
//    ChkStyle = true;
//    ChkJobNo = true;
//    MainList(Gp);
//}

function BMainList() {
    //$('#tMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    DtChk = false;
    ChkStyle = false;
    ChkJobNo = false;
    Program();
}

//function OMainList() {
//    ChkRefno = false;
//    ChkOrdno = false;
//    ChkBuyer = false;
//    DtChk = false;
//    ChkStyle = true;
//    ChkJobNo = true;
//    MainList(Gp);
//}

//function RMainList() {
//    // $('#tMbody').DataTable().destroy();
//    ChkRefno = false;
//    ChkOrdno = true;
//    ChkBuyer = true;
//    DtChk = false;
//    ChkStyle = true;
//    ChkJobNo = true;
//    MainList(Gp);
//}
//function SMainList() {
//    // $('#tMbody').DataTable().destroy();
//    ChkRefno = false;
//    ChkOrdno = false;
//    ChkBuyer = false;
//    DtChk = false;
//    ChkStyle = false;
//    ChkJobNo = false;
//    MainList(Gp);
//}
function JMainList() {
    // $('#tMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    DtChk = false;
    ChkStyle = false;
    ChkJobNo = false;
    Program();
}


//function getbyID(StyleRowID) {
//    debugger;
//    StyRowId = StyleRowID;
//    var Mode = 0;
//    window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;

//}

function getbyEditID(StyleRowID, PrgbomSeqcostApp) {

    debugger;

    if (Gp == "Prog") {

        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "Bud") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 2;
        //window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId;
        window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "Bom") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 1;
        window.location.href = "/BOM/BOMIndex?StyleRowId=" + StyRowId;
    } else if (Gp == "WorkFlow") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID; //Note This is ProSeqId
        var Mode = 1;

        window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex?ProSeqID=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "SamProg") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID; //Note This is ProSeqId
        var Mode = 1;

        window.location.href = "/SamplePlanningFabric/SamplePlanningFabricIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    }

}
function getbyDeleteID(StyleRowID, PrgbomSeqcostApp) {
    debugger;
    if (Gp == "Prog") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "Bud") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 3;
        window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    } else if (Gp == "Bom") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/BOM/BOMIndex?StyleRowId=" + StyRowId;
    } else if (Gp == "WorkFlow") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex?ProSeqID=" + StyRowId + "=&Mode=" + Mode;


    } else if (Gp == "SamProg") {
        if (superuser != "superuser") {
            if (PrgbomSeqcostApp == 1) {
                //alert("This order has been Approved,Please Contact Administrator..");
                var msg = 'This order has been Approved,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
                return true;
            }
        }
        StyRowId = StyleRowID;
        var Mode = 2;
        window.location.href = "/SamplePlanningFabric/SamplePlanningFabricIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
    }


}


function getbyPDeleteID(PrSId, TPrqty, PrgbomSeqcostApp) {
    debugger;
    if (superuser != "superuser") {
        if (PrgbomSeqcostApp == 1) {
            //alert("This order has been Approved,Please Contact Administrator..");
            var msg = 'This order has been Approved,Please Contact Administrator...';
            var flg = 4;
            var mode = 1;
            AlartMessage(msg, flg, mode);
            return true;
        }
    }
    if (TPrqty > 0) {
        //alert("Process has been made,Please check then Proceed..")\
        var msg = 'Process has been made,Please check then Proceed...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    } else {
        StyRowId = PrSId;
        var Mode = 2;
        window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex?ProSeqID=" + StyRowId + "=&Mode=" + Mode;
    }

}

//function getBomID(StyleRowID) {
//    debugger;
//    StyRowId = StyleRowID;
//    window.location.href = "/BOM/BOMIndex?StyleRowId=" + StyRowId;

//}


function getBudgetID(StyleRowID) {
    debugger;
    StyRowId = StyleRowID;
    window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId;

}
function getBudgeteditID(StyleRowID) {
    debugger;
    var Mode = 2;
    StyRowId = StyleRowID;
    window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
}


function getbudgetDeleteID(StyleRowID) {
    debugger;
    var Mode = 3;
    StyRowId = StyleRowID;
    window.location.href = "/Budget/BudgetIndex?StyleRowId=" + StyRowId + "=&Mode=" + Mode;
}

function List() {
    debugger;
    //$('#tPMbody').load({ render: ' <i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>' })

    //var table = $('#tPMbody').DataTable();

    //var rows = table
    //    .rows()
    //    .remove()
    //    .draw();

    //$('#tPMbody').DataTable().destroy();
    //ListOrderRefNo();
    //ListStyle();
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    DtChk = false;
    ChkStyle = true;
    ChkJobNo = true;
    Program();
}

function RadioUClick() {

    //$('#tPMbody').DataTable().destroy();
    ListOrderRefNo();
    ListStyle();
    MainList(Gp);
}
function RadioPClick() {

    // $('#tPMbody').DataTable().destroy();
    ListOrderRefNo();
    ListStyle();
    Program();
    // MainList();

}


function CMainList() {

    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    DtChk = false;
    ChkStyle = true;
    ChkJobNo = true;
    Program();
}

function SMainList() {

    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    DtChk = false;
    ChkStyle = false;
    ChkJobNo = false;
    Program();
}

function OMainList() {

    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    DtChk = false;
    ChkStyle = true;
    ChkJobNo = true;
    Program();
}

function RMainList() {
    ChkRefno = false;
    ChkOrdno = true;
    ChkBuyer = true;
    DtChk = false;
    ChkStyle = true;
    ChkJobNo = true;

    //ListOrderRefNo();
    //ListStyle();
    Program();
}

function ListOrderRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrderType = $('#ddlMOrderType').val();

    if (OrderType == 0) {
        var ODtype = "B";
    } else {
        var ODtype = $('#ddlMOrderType').val();
    }
    $.ajax({
        url: "/PlanningMain/GetOrderNo",
        data: JSON.stringify({ frmDate: FDate, ToDate: TDate, OrderType: ODtype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //success: function (json) {
        success: function (result) {
            var obj = result.Value;



            if (result.Status == 'SUCCESS') {

                var data = result.Value;



                var orddet = {};
                var ord = [];
                var refdet = {};
                var ref = [];

                $.each(obj, function (i, el) {

                    if (!orddet[el.Order_No]) {
                        orddet[el.Order_No] = true;
                        ord.push(el);
                    }
                    if (!refdet[el.Ref_no]) {
                        refdet[el.Ref_no] = true;
                        ref.push(el);
                    }


                });


                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();


                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(ord, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.Order_No));
                });
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.Ref_no));
                });

            }
        }

    });
}
function ListStyle() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrderType = $('#ddlMOrderType').val();

    if (OrderType == 0) {
        var ODtype = "B";
    } else {
        var ODtype = $('#ddlMOrderType').val();
    }
    $.ajax({
        url: "/PlanningMain/GetStyle",
        data: JSON.stringify({ frmDate: FDate, ToDate: TDate, OrderType: ODtype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var stydet = {};
                var sty = [];

                var jobdet = {};
                var job = [];

                $.each(obj, function (i, el) {

                    if (!stydet[el.StyleID]) {
                        stydet[el.StyleID] = true;
                        sty.push(el);
                    }

                    if (!jobdet[el.Job_Ord_No]) {
                        jobdet[el.Job_Ord_No] = true;
                        job.push(el);
                    }

                });

                $(ddlMStyle).empty();
                $(ddlMJobNo).empty();

                $(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(sty, function () {
                    $(ddlMStyle).append($('<option></option>').val(this.StyleID).text(this.Style));
                });

                $(ddlMJobNo).append($('<option/>').val('0').text('--Select JobNo--'));
                $.each(job, function () {
                    $(ddlMJobNo).append($('<option></option>').text(this.Job_Ord_No));
                });
            }
        }

    });
}

function CheckPlanAmend(styrwid) {
    planamend = 0;
    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: styrwid, jmasid: '', Workordno: '' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var amendlist = []
            amendlist = result;
            if (amendlist.length > 0) {
                for (var x = 0; x < amendlist.length; x++) {
                    //alert("Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....")
                    var msg = "Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....";
                    var flg = 4;
                    var mode = 1;
                    AlartMessage(msg, flg, mode);
                    planamend = planamend + 1;
                    return true;
                }
            } else {
                $("#btnAdd").attr("disabled", false);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function Buy_ord_Print(PStyRoId) {
    debugger;
    PStyRowId = PStyRoId;
    CheckPlanAmend(PStyRowId);
    if (Gp == "Prog") {

        $('#PrgPrintId').show();
        $('#BudPrintId').hide();
        $('#BudUnitMerchId').hide();
        $('#myModal4').show();
        $('#myModal4').modal('show');

    } else if (Gp == "Bud") {
        $('#PrgPrintId').hide();
        $('#BudPrintId').show();
        $('#BudUnitMerchId').hide();
        $('#myModal4').show();
        $('#myModal4').modal('show');

    }

    var PrintType = $('input[name="PrintPlanned"]:checked').attr('value');
    if (PrintType == "P" || PrintType == "C") {
        docname = "PROGRAM SUMMARY";
        GenerateReportItem(docname);
    }

}




function GenerateReportItem(name) {
    debugger;

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

            $(sbTwo).empty();

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

function RadioPrintClick() {

    var PrintType = $('input[name="BudPrintPlanned"]:checked').attr('value');
    var pt = $('input[name="PrintPlanned"]:checked').attr('value');

    if (PrintType == "R") {
        $('#BudUnitMerchId').show();
    } else {
        $('#BudUnitMerchId').hide();
    }
    if (pt == "C") {
        $('#Views').show();
    } else {
        $('#Views').hide();
    }
    //var MerType = $('input[name="MerchBudPrintPlanned"]:checked').attr('value');

    //if (MerType == "Merch") {
    //    window.open("../ReportInline/Planning/Budget/PieceWiseDetailCosting.aspx?StyRowId=" + PStyRowId);
    //}
}


function SubReport() {
    debugger;
    if (planamend == 0) {
        $('#myModal4').hide();
        $('#myModal4').modal('hide');

        //var CType = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
        //if (CType == "P") {

        //    SavePrintLog();
        //}
        //else {
        //    printpreviewdetails();
        //}

        var compid = $('#ddlMCompany').val();


        var PrintType = $('input[name="BudPrintPlanned"]:checked').attr('value');

        if (PrintType == "R") {
            $('#BudUnitMerchId').show();
        } else {
            $('#BudUnitMerchId').hide();
        }
        var Viwesize = $('#Viewsize').is(":checked");
        if (Viwesize == true) {
            var size = 1;
        } else {
            var size = 0;
        }

        var PrintType = $('input[name="PrintPlanned"]:checked').attr('value');

        if (Gp == "Prog") {

            $('#PrgPrintId').show();
            $('#BudPrintId').hide();

            if (PrintType == "C") {
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

                window.open("../ReportInline/Planning/Consumption/PlanningConsumptionInline.aspx?StyRowId=" + PStyRowId + "&shipdet=" + p[0] + "&cutqty=" + p[1] + "&purcs=" + p[2] + "&yarndyeprg=" + p[3] + "&Knitprg=" + p[4] + "&fabdyeprg=" + p[5] + "&printprg=" + p[6] + "&trims=" + p[7] + "&gsm=" + p[8] + "&avgntwt=" + p[9] + "&avggrswt=" + p[10] + "&allowdet=" + p[11] + "&ordno=" + p[12] + "&knitprgdet=" + p[13] + "&fabprg=" + p[14] + "&fabwash=" + p[15] + "&Companyid=" + compid + "&Viewsize=" + size);


            } else if (PrintType == "Y") {
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
                var OrderNo = ordno;
                var Style = sty;
                //window.open("../ReportInline/Planning/Consumption/PlanningConsumptionInline.aspx?StyRowId=" + PStyRowId + "&shipdet=" + p[0] + "&cutqty=" + p[1] + "&purcs=" + p[2] + "&yarndyeprg=" + p[3] + "&Knitprg=" + p[4] + "&fabdyeprg=" + p[5] + "&printprg=" + p[6] + "&trims=" + p[7] + "&gsm=" + p[8] + "&avgntwt=" + p[9] + "&avggrswt=" + p[10] + "&allowdet=" + p[11] + "&ordno=" + p[12] + "&knitprgdet=" + p[13] + "&fabprg=" + p[14] + "&fabwash=" + p[15] + "&Companyid=" + compid + "&Viewsize=" + size);
                window.open("../ReportInline/Planning/FabricProgram/FabricProgramInlineReport.aspx?OrderNo=" + OrderNo + "&styleid=" + Style);

            } else if (PrintType == "P") {
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
                //var src = '../ReportInline/Planning/ProgramSummary/PlanningProgramSummaryInline.aspx?';
                //src = src + "StyRowId=" + PStyRowId;
                //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
                //$("#divReport").html(iframe);
                //window.location.href = "../ReportInline/Planning/ProgramSummary/PlanningProgramSummaryInline.aspx?StyRowId=" + PStyRowId;
                window.open("../ReportInline/Planning/ProgramSummary/PlanningProgramSummaryInline.aspx?StyRowId=" + PStyRowId + "&shipdet=" + p[0] + "&cutqty=" + p[1] + "&purcs=" + p[2] + "&yarndyeprg=" + p[3] + "&Knitprg=" + p[4] + "&fabdyeprg=" + p[5] + "&printprg=" + p[6] + "&trims=" + p[7] + "&gsm=" + p[8] + "&avgntwt=" + p[9] + "&avggrswt=" + p[10] + "&allowdet=" + p[11] + "&ordno=" + p[12] + "&knitprgdet=" + p[13] + "&fabprg=" + p[14] + "&fabwash=" + p[15] + "&ProdPrg=" + p[16] + "&ProcPrg=" + p[17] + "&Companyid=" + compid);

            } else if (PrintType == "T") {
                debugger;

                var src = '../ReportInline/Planning/Trims/PlanningTrimsInline.aspx?';
                src = src + "StyRowId=" + PStyRowId;
                var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
                $("#divReport").html(iframe);
                window.open("../ReportInline/Planning/Trims/PlanningTrimsInline.aspx?StyRowId=" + PStyRowId + "&Companyid=" + compid);

            } else {
                debugger;

                var src = '../ReportInline/Planning/Consumption/PlanningConsumptionInline.aspx?';
                src = src + "StyRowId=" + PStyRowId;
                var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
                $("#divReport").html(iframe);
                window.open("../ReportInline/Planning/Consumption/PlanningConsumptionInline.aspx?StyRowId=" + PStyRowId + "&Companyid=" + compid);

            }
        } else if (Gp == "Bud") {

            $('#PrgPrintId').hide();
            $('#BudPrintId').show();


            var PrintType = $('input[name="BudPrintPlanned"]:checked').attr('value');

            if (PrintType == "D") {
                debugger;
                $('#BudUnitMerchId').hide();
                var src = '../ReportInline/Planning/Budget/PlanningBudgetDetailInline.aspx?';
                src = src + "StyRowId=" + PStyRowId;
                var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
                $("#divReport").html(iframe);
                window.open("../ReportInline/Planning/Budget/PlanningBudgetDetailInline.aspx?StyRowId=" + PStyRowId + "&Companyid=" + compid);

            } else if (PrintType == "S") {
                debugger;
                $('#BudUnitMerchId').hide();
                var src = '../ReportInline/Planning/Budget/PlanningBudgetSummaryInline.aspx?';
                src = src + "StyRowId=" + PStyRowId;
                var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
                $("#divReport").html(iframe);
                window.open("../ReportInline/Planning/Budget/PlanningBudgetSummaryInline.aspx?StyRowId=" + PStyRowId + "&Companyid=" + compid);

            }
            else if (PrintType == "C") {
                debugger;
                $('#BudUnitMerchId').hide();
                window.open("../Reports/Planning/CostingReport.aspx?StyRowId=" + PStyRowId + "&Companyid=" + compid);


            }

            else if (PrintType == "R") {
                //$('#BudUnitMerchId').show();
                var MerType = $('input[name="MerchBudPrintPlanned"]:checked').attr('value');
                if (MerType != "") {
                    window.open("../ReportInline/Planning/Budget/PieceWiseDetailCosting.aspx?StyRowId=" + PStyRowId + "&Type=" + MerType + "&Companyid=" + compid);
                }
            }
        }
    }

}

function backtomain() {
    $('#myModal4').hide();
    $('#myModal4').modal('hide');
}


function SavePrintLog() {
    debugger;


    var objConPrintSubmit = {

        CreatedBy: Guserid,
        StyleRowid: PStyRowId,
        DocumentNo: 'COSTING ORDER',

    };

    $.ajax({
        url: "/PlanningConsumption/PrintInsert",
        data: JSON.stringify(objConPrintSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == true) {
                checkprintdetails();
                //alert("Data Updated Sucessfully");

                //StyRowId = StyleRId;
                //window.location.href = "/PlanningAdd/PlanningAddIndex?StyleRowId=" + StyRowId + "=&Mode=" + 1;
            } else {

                window.location.href = "/Error/Index";


            }
        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}


function checkprintdetails() {
    debugger;

    $.ajax({
        url: "/PlanningConsumption/PrintCheck",
        data: JSON.stringify({ StyleRowid: PStyRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                Pcount = obj[0]["PrintName"];

                var PrintType = $('input[name="PrintPlanned"]:checked').attr('value');
                var CType = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');

                if (CType == "P") {
                    PrintCount = Pcount;
                } else {
                    PrintCount = "PREVIEW";
                }

                if (PrintType == "P") {
                    debugger;
                    $('#BudUnitMerchId').hide();
                    window.open("../ReportInline/Planning/Budget/PieceWiseCosting.aspx?StyRowId=" + PStyRowId + "&PrintName=" + PrintCount);


                }

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function printpreviewdetails() {
    var PrintType = $('input[name="PrintPlanned"]:checked').attr('value');
    var CType = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');

    if (CType == "P") {
        PrintCount = Pcount;
    } else {
        PrintCount = "PREVIEW";
    }

    if (PrintType == "P") {
        debugger;
        $('#BudUnitMerchId').hide();
        window.open("../ReportInline/Planning/Budget/PieceWiseCosting.aspx?StyRowId=" + PStyRowId + "&PrintName=" + PrintCount);


    }
}