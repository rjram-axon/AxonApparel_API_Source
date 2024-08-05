var MainFDate = 0;
var repobj = [];
var Repid = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkStyle = true;
var ChkJonNo = true;
var ChkReqNo = true;
var ChkComp = false;
var ChkOrdTyp = true;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    //LoadStyleDDL("#ddlMStyle");
    getDate();

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


    var fill = localStorage.getItem('SpecialReqApprovalFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
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

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

function LoadAdd() {
    debugger;

    var cmpyid = $('select#ddlMCompany option:selected').val();
    if (cmpyid == 0) {
        //alert('Please Select Company...');
        var msg = 'Please Select Company...';
        var flg = 1;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else {
        var Mode = 1;
        window.location.href = "/SpecialRequisitionApprovalAdd/SpecialRequisitionApprovalAddIndex?CompnyId=" + cmpyid + "=&Mode=" + Mode;
    }
}

function LoadMaingrid() {
    debugger;



    var OType = "";
    var ONo = $('select#ddlMOrdertype option:selected').val();

    if (ONo == 0) {
        OType == "";
    }
    else {

        OType = $('select#ddlMOrdertype option:selected').val();
    }

    var JobNo = "";
    var RNo = $('select#ddlMJobno option:selected').val();

    if (RNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlMJobno option:selected').val();
    }




    var rid = 0;
    var unitoth = "P";

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


    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var style = $('#ddlMStyle').val();
    if (style == null) {
        style = 0;
    }
    var refno = $('#ddlMRefNo').val();
    if (refno == null || refno == 0) {
        refno = "";
    }
    var orderno = $('#ddlMOrderno').val();
    if (orderno == null || orderno == 0) {
        orderno = "";
    }
    var reqno = $('#ddlMReqno').val();
    if (reqno == null || reqno == 0) {
        reqno = "";
    }
    var FDate = $('#txtFromDate').val();

    var TDate = $('#txtToDate').val();
    var menufilter = CompId + ',' + OType + ',' + orderno + ',' + refno + ',' + JobNo + ',' + rid + ',' + reqno + ',' + style + ',' + Unit + ',' + unitoth + ',' + FDate + ',' + TDate;
    localStorage.setItem('SpecialReqApprovalFilter', menufilter);

    $.ajax({
        url: "/SpecialRequisitionMain/GetkMainDetailsApproval",
        data: JSON.stringify({ companyId: CompId, type: OType, orderno: orderno, refno: refno, jobordno: JobNo, reqid: rid, reqno: reqno, styleid: style, unitid: Unit, unitrother: unitoth, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tOMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tOMbody').DataTable();
                var rows = table.clear().draw();
                $('#tOMbody').DataTable().rows.add(dataSet);
                $('#tOMbody').DataTable().columns.adjust().draw();
            }
            else {



                $('#tOMbody').DataTable({
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
                             { title: "UnitID", "visible": false },
                             { title: "Unit" },
                             { title: "Spl Req No" },
                             { title: "Date" },
                             { title: "Ref No" },
                             { title: "Order No" },
                             { title: "Job No" },
                             { title: "Reqid", "visible": false },

                              { title: "Action" },


                    ]

                });





                $(document).ready(function () {
                    var table = $('#tOMbody').DataTable();

                    $('#tOMbody tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');

                        }
                        else {
                            table.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });


                });
                CheckRights("SpecialRequisition");

            }
            ddlmain();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadMaingridFromBack() {
    debugger;

    var fill = localStorage.getItem('SpecialReqApprovalFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[10]);
    $('#txtToDate').val(fillobj[11]);

    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = '';
    }
    if (fillobj[4] == "undefined") {
        fillobj[4] = '';
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[5] == "undefined") {
        fillobj[5] = 0;
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = 0;
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = 0;
    }
   
    $.ajax({
        url: "/SpecialRequisitionMain/GetkMainDetailsApproval",
        data: JSON.stringify({ companyId: fillobj[0], type: fillobj[1], orderno: fillobj[2], refno: fillobj[3], jobordno: fillobj[4], reqid: fillobj[5], reqno: fillobj[6], styleid: fillobj[7], unitid: fillobj[8], unitrother: fillobj[9], fromDate: fillobj[10], todate: fillobj[11] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tOMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tOMbody').DataTable();
                var rows = table.clear().draw();
                $('#tOMbody').DataTable().rows.add(dataSet);
                $('#tOMbody').DataTable().columns.adjust().draw();
            }
            else {



                $('#tOMbody').DataTable({
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
                             { title: "UnitID", "visible": false },
                             { title: "Unit" },
                             { title: "Spl Req No" },
                             { title: "Date" },
                             { title: "Ref No" },
                             { title: "Order No" },
                             { title: "Job No" },
                             { title: "Reqid", "visible": false },

                              { title: "Action" },


                    ]

                });





                $(document).ready(function () {
                    var table = $('#tOMbody').DataTable();

                    $('#tOMbody tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');

                        }
                        else {
                            table.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });


                });
              

            }
            ddlmain();
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ddlmain() {
    debugger;

    var OType = "";
    var ONo = $('select#ddlMOrdertype option:selected').val();

    if (ONo == 0) {
        OType == "";
    }
    else {

        OType = $('select#ddlMOrdertype option:selected').val();
    }

    var JobNo = "";
    var RNo = $('select#ddlMJobno option:selected').val();

    if (RNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlMJobno option:selected').val();
    }

    var rid = 0;
    var unitoth = "P";

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

    var Unit = $('#ddlMUnit').val();
    if (Unit == null) {
        Unit = 0;
    }
    var style = $('#ddlMStyle').val();
    if (style == null) {
        style = 0;
    }
    var refno = $('#ddlMRefNo').val();
    if (refno == null || refno == 0) {
        refno = "";
    }
    var orderno = $('#ddlMOrderno').val();
    if (orderno == null || orderno == 0) {
        orderno = "";
    }
    var reqno = $('#ddlMReqno').val();
    if (reqno == null || reqno == 0) {
        reqno = "";
    }
    var FDate = new Date($('#txtFromDate').val());

    var TDate = new Date($('#txtToDate').val());

    if (ChkComp) {
        orderno = "";
        refno = "";
        JobNo = "";
        reqno = "";
        JobNo == "";
        style = 0;
        Unit = 0;

    }

    if (DtChk) {

        orderno = "";
        refno = "";
        JobNo = "";
        reqno = "";
        JobNo == "";
        style = 0;
        Unit = 0;
    }


    $.ajax({
        url: "/SpecialRequisitionMain/GetMainddldet",
        data: JSON.stringify({ companyId: CompId, type: OType, orderno: orderno, refno: refno, jobordno: JobNo, reqid: rid, reqno: reqno, styleid: style, unitid: Unit, unitrother: unitoth, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;


                var OrderType = {};
                var OType = [];

                var JobOrder = {};
                var JobOrd = [];

                var OrderNo = {};
                var OrdNo = [];

                var RefNo = {};
                var RfNo = [];

                var Style = {};
                var Sty = [];

                $.each(obj, function (i, el) {

                    if (!OrderType[el.OrderType]) {
                        OrderType[el.OrderType] = true;
                        OType.push(el);
                    }
                    if (!JobOrder[el.Job_Ord_No]) {
                        JobOrder[el.Job_Ord_No] = true;
                        JobOrd.push(el);
                    }
                    if (!OrderNo[el.orderno]) {
                        OrderNo[el.orderno] = true;
                        OrdNo.push(el);
                    }
                    if (!RefNo[el.Ref_No]) {
                        RefNo[el.Ref_No] = true;
                        RfNo.push(el);
                    }
                    if (!Style[el.styleid]) {
                        Style[el.styleid] = true;
                        Sty.push(el);
                    }
                });


                if (ChkOrdTyp || ChkComp || DtChk) {

                    $('#ddlMOrdertype').empty();

                    $(ddlMOrdertype).append($('<option/>').val('0').text('--Select OrderType--'));
                    $.each(OType, function () {
                        $(ddlMOrdertype).append($('<option></option>').text(this.OrderType));

                    });
                }
                if (ChkJonNo || ChkComp || DtChk) {
                    $('#ddlMJobno').empty();
                    $(ddlMJobno).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                    $.each(JobOrd, function () {
                        $(ddlMJobno).append($('<option></option>').text(this.Job_Ord_No));
                    });
                }
                if (ChkRefno || ChkComp || DtChk) {
                    $('#ddlMRefNo').empty();
                    $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                    $.each(RfNo, function () {
                        $(ddlMRefNo).append($('<option></option>').text(this.Ref_No));
                    });
                }

                if (ChkOrdno || ChkComp || DtChk) {
                    $('#ddlMOrderno').empty();
                    $(ddlMOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(OrdNo, function () {
                        $(ddlMOrderno).append($('<option></option>').text(this.orderno));
                    });
                }

                if (ChkReqNo || ChkComp || DtChk) {
                    $('#ddlMReqno').empty();
                    $(ddlMReqno).append($('<option/>').val('0').text('--Select ReqNo--'));
                    $.each(data, function () {
                        $(ddlMReqno).append($('<option></option>').text(this.Spl_Req_No));
                    });
                }

                if (ChkStyle || ChkComp || DtChk) {
                    $('#ddlMStyle').empty();
                    $(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(Sty, function () {
                        $(ddlMStyle).append($('<option></option>').val(this.styleid).text(this.style));
                    });
                }



            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function List() {
    //$('#tOMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkStyle = true;
    ChkJonNo = true;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = true;
    LoadMaingrid();
    //ddlmain();
}

function CMainList() {
    //$('#tOMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkStyle = true;
    ChkJonNo = true;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = true;
    LoadMaingrid();
}

function JMainList() {
    // $('#tOMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkJonNo = false;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = false;
    LoadMaingrid();
}

function RqMainList() {
    // $('#tOMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkJonNo = false;
    ChkReqNo = false;
    ChkComp = false;
    ChkOrdTyp = false;
    LoadMaingrid();
}

function UMainList() {
    // $('#tOMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkStyle = true;
    ChkJonNo = true;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = false;
    LoadMaingrid();
}

function BMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkJonNo = true;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = false;
    LoadMaingrid();
}

function RMainList() {
    // $('#tOMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkJonNo = true;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = false;
    LoadMaingrid();
}

function SMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkJonNo = true;
    ChkReqNo = true;
    ChkComp = false;
    ChkOrdTyp = false;
    LoadMaingrid();
}

function getbyID(masid) {
    debugger;
    var Mode = 1;
    window.location.href = "/SpecialRequisitionApprovalAdd/SpecialRequisitionApprovalAddIndex?MasId=" + masid + "=&Mode=" + Mode;
}


function Delete(masid) {
    var Mode = 2;
    window.location.href = "/SpecialRequisitionApprovalAdd/SpecialRequisitionApprovalAddIndex?MasId=" + masid + "=&Mode=" + Mode;
}


function SplReqPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "SPECIAL REQUISITION";
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
    var compid = $('#ddlMCompany').val();

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
    var AppQtyView = 0;
    window.open("../ReportInline/Stores/SpecialRequisition/SpecialRequisitionInlineReport.aspx?Masid=" + Repid + "&Companyid=" + compid + "&AppQtyView=" + AppQtyView);

}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}
