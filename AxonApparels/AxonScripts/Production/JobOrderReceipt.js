var fromdate, todate = 0;
var maintbllist = [];
var ScndGrdlist = [];
var ThirdGrdlist = [];
var Recptfilterlist = [];
var InterExter = 0;
var Mode = 0;
var table, column, compId, Docum;
var Userid = 0;
var UserName = 0;
var JobrecptId = 0;
var MainFDate = 0;
var GUserid = 0;
var protype = '';
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkStyle = true;
var ChkRecptNo = true;
var ChkDCNo = true;
var ChkJobNo = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var companyid = 0;
var JobRecptEditFlg = "disabled";
var JobRecptDeleteFlg = "disabled";
var JobRecptPrintFlg = "disabled";
var ValidateProductionStore = "False";
$(document).ready(function () {
    debugger;

    GUserid = $("#hdnUserid").data('value');
    Userid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');

    LoadCompanyDDL("#ddlmaincomp,#ddlsndcomp,#ddlMSCompany");
    //LoadSupplierDDL("#ddlsndsupp");//#ddlmainsupp

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtinnEntryDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtDCEntryDate').val(moment(new Date()).format('DD/MM/YYYY'));
    $('#txtinvrefdate').val(moment(new Date()).format('DD/MM/YYYY'));

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();


    LoadDDL();
    LoadData();
    //Load Radio Button of MSType
    if (Mode == 0) {
        //LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");
        LoadStoreUnitDDL("#ddlMSMMainStore");
        //LoadStoreSectionDDL("#ddlSecStore");
        //LoadCompanyUnitDDL("#ddlPUnit");
    }

    var MSType = $('input[name="MSType"]:checked').attr('value');

    if (MSType == "M") {
        $("#SubStoreId").hide();
        $("#SecStoId").hide();
    } else if (MSType == "E") {
        $("#SubStoreId").hide();
        $("#SecStoId").show();
        $("#MainStoreId").hide();
    }

    $("#btnjorclose").click(function () {
        debugger;
        //$('#myModal1').modal('hide');
        $('#myModal1').hide();
    });

    $("#btnfstclose").click(function () {
        $('#ddlsndOrderNo').empty();
        $('#ddlsndsupp').empty();
        $('#ddlsndref').empty();
        $('#ddlsndjobno').empty();
    });


    $("#btnaddnew").click(function () {
        debugger;
        companyid = $("#ddlmaincomp").val();

        if (companyid == 0) {
            //alert("Please select company");
            var msg = 'Please select company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlsndcomp").val(companyid);

            $('#myModal').modal('show');
            LoadsndGrid();
            LoadsndGridDDL();
        }
    });

    $(document).on('click', '.btnsndadd', function () {
        debugger;
        ThirdGrdlist = [];
        cleartextbox();

        var table = $('#tblsndgrid').DataTable();
        var JobOrdNo = table.row($(this).parents('tr')).data()["Jobno"];
        var OrdNo = table.row($(this).parents('tr')).data()["Orderno"];

        if ($('#optoutint').is(':checked')) { InterExter = 'P'; }
        else if ($('#optoutext').is(':checked')) { InterExter = 'S'; }

        $('#myModal1').modal('show');
        LoadShipmodeDDL('#ddlshipmode');
        LoadShipsystemDDL('#ddlshipsystem');

        companyid = compId;
        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();

        LoadthirdGrid(JobOrdNo, InterExter);
        GenerateJobReceipt(table, column, compId, Docum);
    });

    $(document).on('keyup', '.txtlotno', function () {
        debugger;
        var table = $('#tblreceiptdetail').DataTable();
        var Sno = table.row($(this).parents('tr')).data()["Sno"];

        for (var i in ThirdGrdlist) {
            if (ThirdGrdlist[i]['Sno'] == Sno) {
                ThirdGrdlist[i]['Lotno'] = $(this).val();
                break; //Stop this loop, we found it!
            }
        }
        LoadReceptGrid(ThirdGrdlist);
    });

    $(document).on('keyup', '.txtrecptqty', function () {
        debugger;
        var table = $('#tblreceiptdetail').DataTable();
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var bal = table.row($(this).parents('tr')).data()["BalQty"];
        var val = $(this).val();
        //for (var i in ThirdGrdlist) {
        //    if (ThirdGrdlist[i]['Sno'] == Sno) {
        //        if (ThirdGrdlist[i]['RecptQty'] > ThirdGrdlist[i]['BalQty']) {
        //            alert("Receipt Qty shouldn't exceed then Bal Qty...");
        //            ThirdGrdlist[i]['RecptQty'] = 0;
        //        }
        //        else {
        //            ThirdGrdlist[i]['RecptQty'] = $(this).val();
        //        }

        //        break; //Stop this loop, we found it!
        //    }
        //}
        //LoadReceptGrid(ThirdGrdlist);

        //var rows = $("#tblreceiptdetail").dataTable().fnGetNodes();
        //var dtTable = $('#tblreceiptdetail').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtrecptqty]').each(function () {
        //        if (sn == Sno) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtrecptqty').val();
        //            row.find('#txtrecptqty').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}


        //
        if (val > bal) {
            //alert("Receipt Qty shouldn't exceed then Bal Qty...");
            var msg = "Receipt quantity shouldn't exceed then Balance quantity...";
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            var fabtable = $('#tblreceiptdetail').DataTable();
            var fabdata = fabtable.rows().data();

            $('input[id=txtrecptqty]').each(function (ig) {
                if (fabdata[ig].Sno == Sno) {
                    var row = $(this).closest('tr');
                    row.find('#txtrecptqty').val(0);
                }

            });
            $.each(ThirdGrdlist, function () {
                if (this.Sno == Sno) {
                    this.RecptQty = 0;

                }
            });
            return true;
        }
        $.each(ThirdGrdlist, function () {
            if (this.Sno == Sno) {
                this.RecptQty = val;

            }
        });
    });

    $(document).on('keyup', '.txtrate', function () {
        debugger;
        var table = $('#tblreceiptdetail').DataTable();
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var val = $(this).val();
        //for (var i in ThirdGrdlist) {
        //    if (ThirdGrdlist[i]['Sno'] == Sno) {
        //        ThirdGrdlist[i]['Rate'] = $(this).val();
        //        break; //Stop this loop, we found it!
        //    }
        //}
        //LoadReceptGrid(ThirdGrdlist);
        $.each(ThirdGrdlist, function () {
            if (this.Sno == Sno) {
                this.Rate = val;

            }
        });
    });

    $(document).on('keyup', '.txtrejqty', function () {
        debugger;
        var table = $('#tblreceiptdetail').DataTable();
        var Sno = table.row($(this).parents('tr')).data()["Sno"];
        var Despatch = table.row($(this).parents('tr')).data()["Despatch"];

        for (var i in ThirdGrdlist) {
            if (ThirdGrdlist[i]['Sno'] == Sno) {
                ThirdGrdlist[i]['RejQty'] = $(this).val();
                //ThirdGrdlist[i]['Despatch'] = Despatch;
                break; //Stop this loop, we found it!
            }
        }
        LoadReceptGrid(ThirdGrdlist);
    });

    $(document).on('click', '.chkdespatch', function () {
        debugger;
        var table = $('#tblreceiptdetail').DataTable();

        var row = $(this).closest('tr');
        var val = table.row($(this).parents('tr')).data()["Sno"];

        if ($(this).is(':checked')) {
            for (var i in ThirdGrdlist) {
                if (ThirdGrdlist[i]['Sno'] == val) {
                    ThirdGrdlist[i]['Despatch'] = 1;
                }
            }
        }
        else {
            for (var d in ThirdGrdlist) {
                if (ThirdGrdlist[d]['Sno'] == val) {
                    ThirdGrdlist[d]['Despatch'] = 0;
                }
            }
        }
    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        Mode = 1;
        JobrecptId = 0;

        var table = $('#tblMainGrid').DataTable();
        JobrecptId = table.row($(this).parents('tr')).data()["JobReceiptId"];
        var JobOrdNo = table.row($(this).parents('tr')).data()["Jobno"];
        LoadShipmodeDDL('#ddlshipmode');
        LoadShipsystemDDL('#ddlshipsystem');

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnDelete').hide();
        $('#btnUpdate').show();
        protype = $('input[name="opttype"]:checked').attr('value');
        getbyId(JobrecptId, JobOrdNo);
    });

    $(document).on('click', '.CuttRecptPrint', function () {
        debugger;
        Mode = 1;
        JobrecptId = 0;

        var table = $('#tblMainGrid').DataTable();
        JobrecptId = table.row($(this).parents('tr')).data()["JobReceiptId"];
        var JobOrdNo = table.row($(this).parents('tr')).data()["Jobno"];
        LoadShipmodeDDL('#ddlshipmode');
        LoadShipsystemDDL('#ddlshipsystem');



        GetPrint(JobrecptId);
    });

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        Mode = 2;
        JobrecptId = 0;

        var table = $('#tblMainGrid').DataTable();
        JobrecptId = table.row($(this).parents('tr')).data()["JobReceiptId"];
        var JobOrdNo = table.row($(this).parents('tr')).data()["Jobno"];
        LoadShipmodeDDL('#ddlshipmode');
        LoadShipsystemDDL('#ddlshipsystem');

        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').hide();
        $('#btnDelete').show();

        getbyId(JobrecptId, JobOrdNo);

    });

});

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

    //if ($('#optoutwrkord').is(':checked')) { OrderType = 'W'; }
    //else if ($('#optsampleord').is(':checked')) { OrderType = 'S'; }
    //else if ($('#optjobord').is(':checked')) { OrderType = 'J'; }

    //if ($('#optoutint').is(':checked')) { InterExter = 'I'; }
    //else if ($('#optoutext').is(':checked')) { InterExter = 'E'; }

    var companyid = $('#ddlmaincomp').val();
    if (companyid == null) {
        companyid = 0;
    }
    var Supplierid = $('#ddlmainsupp').val();
    if (Supplierid == null) {
        Supplierid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var MainInterExter = 0;
    if ($('#optmainint').is(':checked')) { MainInterExter = 'P'; }
    else if ($('#optmainext').is(':checked')) { MainInterExter = 'S'; }


    var OrdNo = "";
    var ONo = $('select#ddlmainordno option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlmainordno option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlmainrefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlmainrefno option:selected').val();
    }


    var JobNo = "";
    var Job = $('select#ddlmainjobno option:selected').val();

    if (Job == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlmainjobno option:selected').val();
    }


    var RecNo = "";
    var Rec = $('select#ddlmainentryno option:selected').val();

    if (Rec == 0) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlmainentryno option:selected').text();
    }

    var DcNo = "";
    var Dc = $('select#ddlmaindcno option:selected').val();

    if (Dc == 0) {
        DcNo == "";
    }
    else {

        DcNo = $('select#ddlmaindcno option:selected').val();
    }


    var StyId = $('#ddlmainstyle').val();

    if (StyId == null) {
        StyId = 0;
    } else {
        StyId = $('#ddlmainstyle').val();
    }


    $.ajax({
        type: "POST",
        url: '/JobReceipt/GetMaindetail/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({ compid: companyid, orderno: OrdNo, jobordno: JobNo, jobrecptno: '', supplierid: Supplierid, dcno: DcNo, refno: RefNo, styleid: StyId, entryno: RecNo, fromdate: FDate, todate: TDate, UnitorOther: MainInterExter }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;
            //maintbllist.sort(function (a, b) {
            //    return a.CuttingOrdId - b.CuttingOrdId;
            //});

            ////var dataSet = eval("[" + tableload + "]");
            $('#tblMainGrid').DataTable({
                data: maintbllist,
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
                    { title: "ID", data: "JobReceiptId", "visible": false },
                    { title: "Entry No", data: "JobRecptno" },
                    {
                        title: "Entry Date", data: "JobRecptDate",
                        render: function (data) {
                            return (moment(data).format("DD/MM/YYYY"));
                        }
                    },
            { title: "Job No", data: "Jobno" },
            { title: "Style", data: "Style" },
            { title: "Order No", data: "Orderno" },
            { title: "Ref No", data: "Refno" },
            { title: "Supplier", data: "Supplier" },
            { title: "Job Qty", data: "JobQty" },
            { title: "Recpt Qty", data: "RecptQty" },
            { title: "Quality", data: "Quality" },
            {

                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + JobRecptEditFlg + ' class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + JobRecptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button" ' + JobRecptPrintFlg + ' class="CuttRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function OnChangeofRadios() {
    LoadsndGrid();
}


function GetPrint(Repid) {

    var compid = $('#ddlmaincomp').val();
    if (compid != null)
        window.open("../ReportInline/Production/JobReceipt/JobReceiptInlineReport.aspx?Masid=" + Repid + "&Companyid=" + compid);

}
function clickonlist() {
    debugger;
    $('#tblMainGrid').DataTable().destroy

    companyid = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    //$('#ddlmaincomp').empty();
    $('#ddlmainordno').empty();
    $('#ddlmainjobno').empty();
    $('#ddlmainsupp').empty();
    $('#ddlmainrefno').empty();
    $('#ddlmainstyle').empty();
    $('#ddlmainentryno').empty();
    $('#ddlmaindcno').empty();

    LoadData();
    LoadDDL();
}

function ListFilter() {
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

    LoadData();
}

function ListFilterSecondgrid() {
    debugger;
    var inputcount = 0;
    $('#tblsndgrid tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblsndgrid').DataTable().destroy();
    }

    $('#ddlsndOrderNo').empty();
    $('#ddlsndsupp').empty();
    $('#ddlsndref').empty();
    $('#ddlsndjobno').empty();

    LoadsndGrid();
    LoadsndGridDDL();
}

function LoadDDL() {
    debugger;

    //var inputcount = 0;
    //$('#tblMainGrid tr').each(function () {
    //    inputcount++;
    //});

    //if (inputcount > 0) {
    //    //var tableinput = $('#tblinnergrid').DataTable();
    //    //tableinput.clear().draw();
    //    $('#tblMainGrid').DataTable().destroy();
    //}

    //var companyid = $('#ddlmaincomp').val();
    //if (companyid == null) {
    //    companyid = 0;
    //}
    //var Supplierid = $('#ddlmainsupp').val();
    //if (Supplierid == null) {
    //    Supplierid = 0;
    //}

    //var FDate = $('#txtFromDate').val();
    //var TDate = $('#txtToDate').val();

    //var MainInterExter = 0;
    //if ($('#optmainint').is(':checked')) { MainInterExter = 'P'; }
    //else if ($('#optmainext').is(':checked')) { MainInterExter = 'S'; }




    var companyid = $('#ddlmaincomp').val();
    if (companyid == null) {
        companyid = 0;
    }
    var Supplierid = $('#ddlmainsupp').val();
    if (Supplierid == null) {
        Supplierid = 0;
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var MainInterExter = 0;
    if ($('#optmainint').is(':checked')) { MainInterExter = 'P'; }
    else if ($('#optmainext').is(':checked')) { MainInterExter = 'S'; }


    var OrdNo = "";
    var ONo = $('select#ddlmainordno option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlmainordno option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlmainrefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlmainrefno option:selected').val();
    }


    var JobNo = "";
    var Job = $('select#ddlmainjobno option:selected').val();

    if (Job == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlmainjobno option:selected').val();
    }


    var RecNo = "";
    var Rec = $('select#ddlmainentryno option:selected').val();

    if (Rec == 0) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlmainentryno option:selected').text();
    }

    var DcNo = "";
    var Dc = $('select#ddlmaindcno option:selected').val();

    if (Dc == 0) {
        DcNo == "";
    }
    else {

        DcNo = $('select#ddlmaindcno option:selected').val();
    }


    var StyId = $('#ddlmainstyle').val();

    if (StyId == null) {
        StyId = 0;
    } else {
        StyId = $('#ddlmainstyle').val();
    }




    $.ajax({
        type: "POST",
        url: '/JobReceipt/GetMaindetail/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        //data: JSON.stringify({ compid: companyid, orderno: '', jobordno: '', jobrecptno: '', supplierid: Supplierid, dcno: '', refno: '', styleid: 0, entryno: '', fromdate: FDate, todate: TDate, UnitorOther: MainInterExter }),
        data: JSON.stringify({ compid: companyid, orderno: OrdNo, jobordno: JobNo, jobrecptno: '', supplierid: Supplierid, dcno: DcNo, refno: RefNo, styleid: StyId, entryno: RecNo, fromdate: FDate, todate: TDate, UnitorOther: MainInterExter }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;

            var orddet = {};
            var ord = [];
            var jobdet = {};
            var job = [];
            var refdet = {};
            var ref = [];
            var suppdet = {};
            var supp = [];
            var stydet = {};
            var sty = [];
            var recdet = {};
            var rec = [];

            var dcdet = {};
            var dc = [];


            $.each(maintbllist, function (i, el) {

                if (!orddet[el.Orderno]) {
                    orddet[el.Orderno] = true;
                    ord.push(el);
                }
                if (!jobdet[el.Jobno]) {
                    jobdet[el.Jobno] = true;
                    job.push(el);
                }

                if (!refdet[el.Refno]) {
                    refdet[el.Refno] = true;
                    ref.push(el);
                }

                if (!suppdet[el.Supplier]) {
                    suppdet[el.Supplier] = true;
                    supp.push(el);
                }

                if (!stydet[el.StyleId]) {
                    stydet[el.StyleId] = true;
                    sty.push(el);
                }
                if (!recdet[el.JobReceiptId]) {
                    recdet[el.JobReceiptId] = true;
                    rec.push(el);
                }
                if (!dcdet[el.DcNo]) {
                    dcdet[el.DcNo] = true;
                    dc.push(el);
                }
            });

            if (ChkOrdno || ChkComp || DtChk) {
                $(ddlmainordno).empty();
                $(ddlmainordno).append($('<option/>').val('0').text('--Select Order No--'));
                $.each(ord, function () {
                    $(ddlmainordno).append($('<option></option>').text(this.Orderno));
                });
            }
            if (ChkJobNo || ChkComp || DtChk) {
                $(ddlmainjobno).empty();
                $(ddlmainjobno).append($('<option/>').val('0').text('--Select Job Order No--'));
                $.each(job, function () {
                    $(ddlmainjobno).append($('<option></option>').text(this.Jobno));
                });
            }
            if (ChkRefno || ChkComp || DtChk) {
                $(ddlmainrefno).empty();
                $(ddlmainrefno).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(ref, function () {
                    $(ddlmainrefno).append($('<option></option>').text(this.Refno));
                });
            }
            if (ChkSupplier || ChkComp || DtChk) {
                $(ddlmainsupp).empty();
                $(ddlmainsupp).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(supp, function () {
                    $(ddlmainsupp).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                });
            }
            if (ChkStyle || ChkComp || DtChk) {
                $(ddlmainstyle).empty();
                $(ddlmainstyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(sty, function () {
                    $(ddlmainstyle).append($('<option></option>').val(this.StyleId).text(this.Style));
                });
            }
            if (ChkRecptNo || ChkComp || DtChk) {
                $(ddlmainentryno).empty();
                $(ddlmainentryno).append($('<option/>').val('0').text('--Select Receipt No--'));
                $.each(rec, function () {
                    $(ddlmainentryno).append($('<option></option>').val(this.JobReceiptId).text(this.JobRecptno));
                });
            }
            if (ChkDCNo || ChkComp || DtChk) {
                $(ddlmaindcno).empty();
                $(ddlmaindcno).append($('<option/>').val('0').text('--Select DC No--'));
                $.each(dc, function () {
                    $(ddlmaindcno).append($('<option></option>').text(this.DcNo));
                });
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainList() {
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = true;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkDCNo = true;
    ChkJobNo = true;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function OMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkDCNo = true;
    ChkJobNo = true;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function JMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkDCNo = true;
    ChkJobNo = false;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function SPMainList() {
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkDCNo = true;
    ChkJobNo = true;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function RMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = true;
    ChkRecptNo = true;
    ChkDCNo = true;
    ChkJobNo = true;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function SMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkRecptNo = true;
    ChkDCNo = true;
    ChkJobNo = true;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function RCMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkRecptNo = false;
    ChkDCNo = true;
    ChkJobNo = false;
    ChkComp = false;
    LoadData();
    LoadDDL();
}
function DCMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkSupplier = false;
    ChkStyle = false;
    ChkRecptNo = false;
    ChkDCNo = false;
    ChkJobNo = false;
    ChkComp = false;
    LoadData();
    LoadDDL();
}





function LoadsndGrid() {
    debugger;

    var inputcount = 0;
    $('#tblsndgrid tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblsndgrid').DataTable().destroy();
    }

    var companysndid = $('#ddlsndcomp').val();
    if (companysndid == null) {
        companysndid = 0;
    }

    var Suppliersndid = $('#ddlsndsupp').val();
    if (Suppliersndid == null) {
        Suppliersndid = 0;
    }

    var strorderno = $('#ddlsndOrderNo').val();
    if (strorderno == null || strorderno == "0") {
        strorderno = '';
    }

    var strjoborderno = $('#ddlsndjobno').val();
    if (strjoborderno == null || strjoborderno == "0") {
        strjoborderno = '';
    }

    if ($('#optoutint').is(':checked')) { InterExter = 'P'; }
    else if ($('#optoutext').is(':checked')) { InterExter = 'S'; }

    $.ajax({
        type: "POST",
        url: '/JobReceipt/GetSndGridDet/',
        data: JSON.stringify({ compid: companysndid, orderno: strorderno, jobordno: strjoborderno, jobrecptno: '', supplierid: Suppliersndid, UnitorOther: InterExter, refno: '' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            ScndGrdlist = json;
            ScndGrdlist.sort(function (a, b) {
                return a.Jobno - b.Jobno;
            });

            ////var dataSet = eval("[" + tableload + "]");
            $('#tblsndgrid').DataTable({
                data: ScndGrdlist,
                columns: [
                            { title: "Order No", data: "Orderno" },
                            { title: "Ref No", data: "Refno" },
                            { title: "Job No", data: "Jobno" },
                            { title: "Style", data: "Style" },
                            { title: "Supplier", data: "Supplier", },
                            { title: "Job Qty", data: "Quantity" },
                            { title: "Bal Qty", data: "BalQty" },
                            {
                                title: "ACTION", "mDataProp": null,
                                //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button"  class="CuttRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                                "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;" class="btnsndadd btn btn-round btn-primary" > <i class="fa fa-plus"></i> </button>'
                            }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadsndGridDDL() {
    debugger;

    var inputcount = 0;
    $('#tblsndgrid tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblsndgrid').DataTable().destroy();
    }

    var companysndid = $('#ddlsndcomp').val();
    if (companysndid == null) {
        companysndid = 0;
    }
    var Suppliersndid = $('#ddlsndsupp').val();
    if (Suppliersndid == null) {
        Suppliersndid = 0;
    }

    if ($('#optoutint').is(':checked')) { InterExter = 'P'; }
    else if ($('#optoutext').is(':checked')) { InterExter = 'S'; }

    $.ajax({
        type: "POST",
        url: '/JobReceipt/GetSndGridDet/',
        data: JSON.stringify({ compid: companysndid, orderno: '', jobordno: '', jobrecptno: '', supplierid: Suppliersndid, UnitorOther: InterExter, refno: '' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            ScndGrdlist = json;
            ScndGrdlist.sort(function (a, b) {
                return a.Jobno - b.Jobno;
            });

            $(ddlsndOrderNo).append($('<option/>').val('0').text('--Select Order No--'));
            $.each(ScndGrdlist, function () {
                $(ddlsndOrderNo).append($('<option></option>').text(this.Orderno));
            });

            $(ddlsndsupp).append($('<option/>').val('0').text('--Select Supplier--'));
            $.each(ScndGrdlist, function () {
                $(ddlsndsupp).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
            });

            $(ddlsndref).append($('<option/>').val('0').text('--Select Ref No--'));
            $.each(ScndGrdlist, function () {
                $(ddlsndref).append($('<option></option>').text(this.Refno));
            });

            $(ddlsndjobno).append($('<option/>').val('0').text('--Select Job No--'));
            $.each(ScndGrdlist, function () {
                $(ddlsndjobno).append($('<option></option>').text(this.Jobno));
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyId(jobrecptid, JobOrdNo) {
    $.ajax({
        type: "POST",
        url: '/JobReceipt/GetThrdGridDetonEditMode/',
        data: JSON.stringify({ JobRecptId: jobrecptid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();
            $('#txtrcpcompany').val(json[0].Company);
            $('#txtrcpcompanyid').val(json[0].CompanyId);
            $('#txtrcpsupplier').val(json[0].Supplier);
            $('#txtrcpsupplierid').val(json[0].SupplierId);
            $('#txtrcpstyle').val(json[0].Style);
            $('#txtrcpstyleid').val(json[0].StyleId);
            $('#txtrcporderno').val(json[0].Orderno);
            $('#txtrecpRefno').val(json[0].Refno);
            $('#txtthrdJobOrdNo').val(JobOrdNo);
            $('#txtsndEntryNo').val(json[0].JobRecptno);
            $('#txtdespatchno').val(json[0].DespatchNo);
            $('#txtshipno').val(json[0].BuyOrdShip);
            $('#ddlshipmode').val(json[0].ShipModeId);
            $('#ddlshipsystem').val(json[0].SystemId);
            $('#txtdestination').val(json[0].Destination);
            $('#txtremarks').val(json[0].Remarks);
            $('#txtrcpdcno').val(json[0].DcNo);

            $('#txtinvrefno').val(json[0].InvRefNo);
            $('#txtdocrefno').val(json[0].DocRefNo);

            if (protype == "I") {
                $('input:radio[name="wrkord"][value="I"]').prop('checked', true);
            } else if (protype == "E") {
                $('input:radio[name="wrkord"][value="E"]').prop('checked', true);
            }
            if (json[0].ShipType == 'F') {
                $('.optshiptypefull').attr('checked', true);
            }
            else {
                $('.optshiptypepar').attr('checked', true);
            }
            companyid = json[0].CompanyId;

            if (json[0]["Storetype"] == 'SS') {
                $('#optSS').prop('checked', true);
                LoadSubStore();
                editsubmasunitstore = json[0]["ParentUnitid"];
                editsubstore = json[0]["StoreUnitID"];
                editmasunitstore = 0;
            }
            else {
                $('#optMS').prop('checked', true);
                LoadMainStore();
                editmasunitstore = json[0]["StoreUnitID"];
                editsubmasunitstore = 0;
                editsubstore = 0;
            }
            LoadEmployeeStoreunit();
            LoadUserCompanyDDL();

            //if ($('#optoutint').is(':checked')) {
            //    $('.optthirdint').attr('checked', true);
            //}
            //else if ($('#optoutext').is(':checked')) {
            //    $('.optthirdext').attr('checked', true);
            //}

            ThirdGrdlist = json;
            ThirdGrdlist.sort(function (a, b) {
                return a.Sno - b.Sno;
            });

            LoadReceptGrid(ThirdGrdlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadthirdGrid(JobOrdNo, UnitorOther) {
    debugger;

    var inputcount = 0;
    $('#tblreceiptdetail tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblreceiptdetail').DataTable().destroy();
    }

    $.ajax({
        type: "POST",
        url: '/JobReceipt/GetThrdGridDet/',
        data: JSON.stringify({ jobordno: JobOrdNo, UnitorOther: UnitorOther }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();
            $('#txtrcpcompany').val(json[0].Company);
            $('#txtrcpcompanyid').val(json[0].CompanyId);
            $('#txtrcpsupplier').val(json[0].Supplier);
            $('#txtrcpsupplierid').val(json[0].SupplierId);
            $('#txtrcpstyle').val(json[0].Style);
            $('#txtrcpstyleid').val(json[0].StyleId);
            $('#txtrcporderno').val(json[0].Orderno);
            $('#txtrecpRefno').val(json[0].Refno);
            $('#txtthrdJobOrdNo').val(JobOrdNo);


            //if ($('#optoutint').is(':checked')) {
            //    $('.optthirdint').attr('checked', true);
            //}
            //else if ($('#optoutext').is(':checked')) {
            //    $('.optthirdext').attr('checked', true);
            //}

            if (InterExter == "S") {
                $('input:radio[name="wrkord"][value="S"]').prop('checked', true);
            } else if (InterExter == "P") {
                $('input:radio[name="wrkord"][value="P"]').prop('checked', true);
            }

            ThirdGrdlist = json;
            ThirdGrdlist.sort(function (a, b) {
                return a.Jobno - b.Jobno;
            });

            $.ajax({
                type: "POST",
                url: '/JobReceipt/GetThrdGridDespatchDet/',
                data: JSON.stringify({ strOrdNo: json[0].Orderno }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (jresult) {
                    if (jresult != null) {
                        debugger;
                        $('#txtdespatchno').val(jresult[0].DespatchNo);
                        $('#txtshipno').val(jresult[0].ShipNo);
                        $('#ddlshipmode').val(jresult[0].ShipModeId);
                        $('#ddlshipsystem').val(jresult[0].SystemId);
                        $('#txtdestination').val(jresult[0].Destination);
                    }
                }
            });
            LoadReceptGrid(ThirdGrdlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function validate() {
    debugger;
    var isValid = true;
    //if ($('#ddlshift').val().trim() == "") {
    if ($('#txtrcpdcno').val() == '') {
        $('#txtrcpdcno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtrcpdcno').css('border-color', 'lightgrey');
    }

    return isValid;
}

function Add() {
    debugger;
    var shiptype = 0;
    var recptadd = false;

    var res = validate();
    if (res == false) {
        return false;
    }

    if ($('#optthirdint').is(':checked')) { InterExter = 'P'; }
    else if ($('#optthirdext').is(':checked')) { InterExter = 'S'; }

    if ($('#optshiptypefull').is(':checked')) { shiptype = 'F'; }
    else if ($('#optshiptypepar').is(':checked')) { shiptype = 'P'; }

    if (ThirdGrdlist.length > 0) {
        for (var i in ThirdGrdlist) {
            if (ThirdGrdlist[i]['RecptQty'] > 0) {
                recptadd = true;
            }
        }
    }


    if (recptadd == false) {

        //alert("Receipt Qty should be greater than zero...");
        var msg = 'Receipt quantity should be greater than zero...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    $.each(ThirdGrdlist, function (j) {
        if (ThirdGrdlist[j].RecptQty > 0) {
            if (ThirdGrdlist[j].Rate > 0) { }
            else if (recptadd) {
                var msg = 'Please Check the rate...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                //alert('Please Check the rate..');
                recptadd = false;
                return true;
            }

        }
    })

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }
    if (storeunitid == 0 && ValidateProductionStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    if (ThirdGrdlist.length > 0) {
        if (recptadd) {

            var JobRecptObj = {
                JobRecptNo: $('#txtsndEntryNo').val(),
                JobRecptDate: $('#txtinnEntryDate').val(),
                DcNo: $('#txtrcpdcno').val(),
                DcDate: $('#txtDCEntryDate').val(),
                SupplierId: $('#txtrcpsupplierid').val(),
                UnitorOther: InterExter,
                Jobno: $('#txtthrdJobOrdNo').val(),
                CompanyId: $('#ddlsndcomp').val(),
                Orderno: $('#txtrcporderno').val(),
                StyleId: $('#txtrcpstyleid').val(),
                Remarks: $('#txtremarks').val(),
                StoreUnitID: storeunitid,
                //Tostoreid: "W",
                //QualityMade: Processorid,// $('#ddlheaderwrkdiv').val(),
                //QualityRemarks: $('#txtheaderloss').val(),
                //QualityDate: Prodprgid,
                DespatchNo: $('#txtdespatchno').val(),
                BuyOrdShip: $('#txtshipno').val(),
                ShipModeId: $('#ddlshipmode').val(),
                SystemId: $('#ddlshipsystem').val(),
                DocRefNo: $('#txtdocrefno').val(),
                DocRefDate: $('#txtinvrefdate').val(),
                InvRefNo: $('#txtinvrefno').val(),
                InvRefDate: $('#txtinvrefdate').val(),
                ShipType: shiptype,
                CreatedBy: GUserid,
                JobRecptDet: ThirdGrdlist
            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/JobReceipt/Add",
                data: JSON.stringify(JobRecptObj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == true) {
                        //alert("Record saved successfully...");
                        var msg = 'Record saved successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);

                        $('#ddlcutunit').val(0);
                        $('#myModal1').modal('hide');
                        $('#myModal').modal('hide');
                        //$('#tblcuttingmaingrid').DataTable().destroy();
                        //$('#tblcuttingord1').DataTable().destroy();
                        LoadData();
                        Mode = 0;
                        cleartextbox();
                        recptadd = false;
                        //window.location.reload();
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
        else {
            // alert("Receipt Qty should be greater than zero...");
            var msg = 'Receipt quantity should be greater than zero...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
    }
}

function Update() {
    debugger;
    var shiptype = 0;
    var recptUpd = false;

    var res = validate();
    if (res == false) {
        return false;
    }

    if ($('#optthirdint').is(':checked')) { InterExter = 'P'; }
    else if ($('#optthirdext').is(':checked')) { InterExter = 'S'; }

    if ($('#optshiptypefull').is(':checked')) { shiptype = 'F'; }
    else if ($('#optshiptypepar').is(':checked')) { shiptype = 'P'; }

    if (ThirdGrdlist.length > 0) {
        for (var i in ThirdGrdlist) {
            if (ThirdGrdlist[i]['RecptQty'] > 0) {
                recptUpd = true;

            }
        }
    }
    if (recptUpd == false) {

        //alert("Receipt Qty should be greater than zero...");
        var msg = 'Receipt quantity should be greater than zero...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
    $.each(ThirdGrdlist, function (j) {
        if (ThirdGrdlist[j].RecptQty > 0) {
            if (ThirdGrdlist[j].Rate > 0) { }
            else if (recptUpd) {
                //alert('Please Check the rate..');
                var msg = 'Please Check the rate...';
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                recptUpd = false;
                return true;
            }

        }
    });

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    if (storeunitid == 0 && ValidateProductionStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    if (ThirdGrdlist.length > 0) {
        if (recptUpd) {
            var JobRecptObj = {
                JobReceiptId: JobrecptId,
                JobRecptNo: $('#txtsndEntryNo').val(),
                JobRecptDate: $('#txtinnEntryDate').val(),
                DcNo: $('#txtrcpdcno').val(),
                DcDate: $('#txtDCEntryDate').val(),
                SupplierId: $('#txtrcpsupplierid').val(),
                UnitorOther: InterExter,
                Jobno: $('#txtthrdJobOrdNo').val(),
                CompanyId: $('#ddlsndcomp').val(),
                Orderno: $('#txtrcporderno').val(),
                StyleId: $('#txtrcpstyleid').val(),
                Remarks: $('#txtremarks').val(),
                StoreUnitID: storeunitid,
                //Tostoreid: "W",
                //QualityMade: Processorid,// $('#ddlheaderwrkdiv').val(),
                //QualityRemarks: $('#txtheaderloss').val(),
                //QualityDate: Prodprgid,
                DespatchNo: $('#txtdespatchno').val(),
                BuyOrdShip: $('#txtshipno').val(),
                ShipModeId: $('#ddlshipmode').val(),
                SystemId: $('#ddlshipsystem').val(),
                DocRefNo: $('#txtdocrefno').val(),
                DocRefDate: $('#txtinvrefdate').val(),
                InvRefNo: $('#txtinvrefno').val(),
                InvRefDate: $('#txtinvrefdate').val(),
                ShipType: shiptype,
                CreatedBy: GUserid,
                JobRecptDet: ThirdGrdlist
            };
            $("#btnUpdate").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/JobReceipt/Update",
                data: JSON.stringify(JobRecptObj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Value == true) {
                        //alert("Record updated successfully...");
                        var msg = 'Record updated successfully...';
                        var flg = 1;
                        var mod = 0;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);

                        $('#ddlcutunit').val(0);
                        $('#myModal1').modal('hide');
                        $('#myModal').modal('hide');
                        //$('#tblcuttingmaingrid').DataTable().destroy();
                        //$('#tblcuttingord1').DataTable().destroy();
                        LoadData();
                        Mode = 0;
                        cleartextbox();
                        recptUpd = false;
                        //window.location.reload();
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
        else {
            // alert("Receipt Qty should be greater than zero...");
            var msg = 'Receipt quantity should be greater than zero...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
    }
}

function cleartextbox() {
    $('#txtrcpdcno').val('');
    $('#txtrecpRefno').val('');
    $('#txtinvrefno').val('');
    $('#txtdocrefno').val('');
    $('#txtremarks').val('');
}

function GenerateJobReceipt(table, column, compId, Docum) {
    table = "Job_Recpt_Mas",
    column = "JobRecptNo",
    compId = $('#ddlmaincomp').val(),
    Docum = 'JOB RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtsndEntryNo').val(result.Value);
        }
    });
}

function LoadReceptGrid(list) {
    var rowCount = $('#tblreceiptdetail tr').length;
    if (rowCount > 0) {
        $('#tblreceiptdetail').DataTable().destroy();
    }

    $('#tblreceiptdetail').DataTable({
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
                    { title: "Sno", data: "Sno" },
                    { title: "Item", data: "Item" },
                    { title: "Color", data: "Color" },
                    { title: "Size", data: "Size" },
                    {
                        title: "Lot No", data: "Lotno",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtlotno" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    { title: "Job Qty", data: "JobQty" },
                    { title: "Bal Qty", data: "BalQty" },
                    {
                        title: "Recpt Qty", data: "RecptQty",
                        render: function (data) {
                            return '<input type="text" id="txtrecptqty"  class="form-control txtrecptqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    {
                        title: "Rate", data: "Rate",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    },
                    {
                        title: "Despatch", data: "Despatch",
                        render: function (data) {
                            return '<input type="checkbox" id="chkdespatch" class="editor-active chkdespatch"  style="width: 50px;text-align: center;"  value=' + data + '>';
                        },
                    },
                    {
                        title: "Rej Qty", data: "RejQty",
                        render: function (data) {
                            return '<input type="text"  class="form-control txtrejqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                        }
                    }
        ]
    });
    $(document).ready(function () {
        var table = $('#tblreceiptdetail').DataTable();

        $('#tblreceiptdetail tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });


    });
    $('input[id=chkdespatch]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        if ($(this).val() == 1) {
            row.find('#chkdespatch').prop('checked', true);
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
}

function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //    LoadCompanyDDL("#ddlSCompany,#ddlMSCompany");
    //    LoadStoreUnitDDL("#ddlSMainStore");
}

function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}

function RadioSSPClick() {
    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    //LoadStoreUnitDDL("#ddlSStoreSub");
    //LoadCompanyUnitDDL("#ddlSStorePunit");
}

function Delete() {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/JobReceipt/Delete/" + JobrecptId,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    //alert("Record deleted successfully...");
                    var msg = 'Record deleted successfully...';
                    var flg = 2;
                    var mod = 0;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $('#myModal1').modal('hide');
                    //$('#tblMainGrid').DataTable().destroy();
                    ListFilter();
                    //window.location.reload();
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

function LoadIntExtData() {
    LoadDDL();
    LoadData();
}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: companyid }),
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
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: companyid }),
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
            if (data[i].CompanyId == companyid) {
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var ur = "";
    AlartMessage(msg, flg, mod, ur);
}