var MainFDate = 0;
var UserName = 0
$(document).ready(function () {
    UserName = $("#hdnusername").data('value');
    LoadCompanyDDL("#ddlMCompany");
    var protype = $('input[name="OrdType"]:checked').attr('value');

    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");

    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");

    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");

    }
    LoadSupplierDDL("#ddlMSupplier");
    LoadYarnDDL("#ddlMYarn");  
    LoadStyleDDL("#ddlMStyle");

    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    ddlmain();
});
function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();


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


function LoadOrd() {
    debugger;
    var protype = $('input[name="OrdType"]:checked').attr('value');
    $("#ddlMRefno").empty();
    if (protype == 'B') {
        LoadBulkOrderNoDDL("#ddlMOrderno");
        LoadBulkRefNoDDL("#ddlMRefno");
        ddlmain();
    }
    if (protype == 'S') {
        LoadSampOrderNoDDL("#ddlMOrderno");
        LoadSampleRefNoDDL("#ddlMRefno");
        ddlmain();
    }
    if (protype == 'A') {
        LoadOrderNoDDL("#ddlMOrderno");
        LoadRefNoDDL("#ddlMRefno");
        ddlmain();
    }
}
function LoadReport() {
    debugger;



    var OrdNo =0;
    var ONo = $('select#ddlMOrderno option:selected').val();

    if (ONo == 0) {
        OrdNo =="0";
    }
    else {

        OrdNo = $('select#ddlMOrderno option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefno option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefno option:selected').text();
    }

    var supid = $('#ddlMSupplier').val();
    var ynid = $('#ddlMYarn').val();
    var procordid = $('#ddlMProcessOrder').val();
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();   
    var protype = $('input[name="OrdType"]:checked').attr('value');
    var styid = $('#ddlMStyle').val();
    var compname = $('#ddlMCompany').text();


    window.open("../Reports/Process/ProcessOrder/ProcessKnittingReport.aspx?OrderNo=" + OrdNo + "&FromDate=" + frmdate + "&ToDate=" + todate
         + "&Ordtype=" + protype + "&Ref=" + RefNo + "&yarnid=" + ynid + "&supid=" + supid + "&ProcOrdId=" + procordid + "&styid=" + styid + "&CompName=" + compname + "&UserName=" + UserName);

}


function ddlmain() {
    var type = $('input[name="OrdType"]:checked').attr('value');


    if (type == 'B') {
        type = 'W';
    } else {
        var type = $('input[name="OrdType"]:checked').attr('value');
    }
    var proctype = 'P';
    var OrdNo = "";
    var RefNo = "";
    var StyId = 0;
    var prodid = 0;
    var clsd = "N";
    var prid = 0;
    var CompId =0;  
    var prod = "";   
    var Unit = 0;
    var process = 0;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessOrder/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, closed: clsd, buyrsamp: type, processortype: proctype, prodordid: prodid, prodord: prod, type: proctype, processorid: prid, unitid: Unit, processid: process, fromDate: FDate, todate: TDate, orderno: OrdNo, refno: RefNo, styleid: StyId }),
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
             
                $.each(obj, function (i, el) {

                    if (!compdet[el.prodnord]) {
                        compdet[el.prodnord] = true;
                        comp.push(el);
                    }
                   
                });


                $(ddlMProcessOrder).empty();

                $(ddlMProcessOrder).append($('<option/>').val('0').text('--Select ProdOrd--'));
                $.each(comp, function () {
                    //$(ddlMProcessOrder).append($('<option></option>').text(this.prodnord));
                    $(ddlMProcessOrder).append($('<option></option>').val(this.productionordid).text(this.prodnord));
                });

               
                              
            }


        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}