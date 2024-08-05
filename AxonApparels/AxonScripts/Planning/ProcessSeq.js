
var ProSeqID;
var GJobId;
var MainFDate = 0;
$(document).ready(function () {
    //LoadBuyerDDL("#ddlMBuyer");
    //LoadCompanyDDL("#ddlMCompany");
    //$('#txtFromDate').val(moment(new Date()).format('MM/DD/YYYY'));
    //$('#txtToDate').val(moment(new Date()).format('MM/DD/YYYY'));
    MainList();
    ListOrderRefNo();
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    CheckRights("ProcessSequence");
});


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

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    //$('#dtOrderDate').val(Fdatestring);
    //$('#dtRefDate').val(Fdatestring);
}

function ListOrderRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessSeq/GetOrderNo",
        data: JSON.stringify({ frmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(data, function () {
                    $(ddlMCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
                });

                $(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(data, function () {
                    $(ddlMBuyer).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
                });

                $(ddlMOrdNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlMOrdNo).append($('<option></option>').text(this.Order_No));
                });
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.Ref_No));
                });
                $(ddlMJobNo).append($('<option/>').val('0').text('--Select JobNo--'));
                $.each(data, function () {
                    $(ddlMJobNo).append($('<option></option>').text(this.JobNo));
                });
                $(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {

                    $(ddlMStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                });

            }
        }

    });
}
function MainList() {

    var OType = $('input[name="Order"]:checked').attr('value');

    var OrdNo = "";
    var ONo = $('select#ddlMOrdNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrdNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }


    var JobNo = "";
    var JNo = $('select#ddlMJobNo option:selected').val();

    if (JNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddlMJobNo option:selected').val();
    }
    var BuyId = $('#ddlMBuyer').val();
    var StyId = $('#ddlMStyle').val();
    var FrDate = $('#txtFromDate').val();
    var ToDate = $('#txtToDate').val();
    var CompId = $('#ddlMCompany').val();
    $.ajax({
        url: "/ProcessSeq/ListPlanning",
        data: JSON.stringify({ CompanyId: CompId, BuyerId: BuyId, Styleid: StyId, Order_No: OrdNo, Ref_No: RefNo, JobNo: JobNo, FDate: FrDate, ToDate: ToDate, OrdType: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
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
                columns: [
                     { title: "Styleid", "visible": false },
                         { title: "Order No" },
                         { title: "Ref No" },
                         { title: "Job No" },
                         { title: "Buyer" },
                         { title: "Merchandiser" },
                         { title: "ProcessSeqMasId", "visible": false },
                         { title: "Cprgno", "visible": false },
                         { title: "Action" },
                ]

            });
            CheckRights("ProcessSequence");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function save() {
    debugger;

    //alert("www");

    //  StyleId = styleid;
    window.location.href = "/ProcessSeqMain/ProcessSeqMainIndex";

    // window.location.href = "/ProcessSeqMain/ProcessSeqMainIndex?StyleId=" + StyleId;
    //alert('Loading');
}

function getbyID(ProSeqID) {
    debugger;
    ProSeqID = ProSeqID;
    window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex?ProSeqID=" + ProSeqID;
}

function RadioWClick() {

    $('#tPMbody').DataTable().destroy();
    MainList();
    CheckRights("ProcessSequence");
}

function List() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function RadioJClick() {

    $('#tPMbody').DataTable().destroy();
    MainList();
    CheckRights("ProcessSequence");
}
function RadioSClick() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function McompList() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function BcompList() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function OcompList() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function RcompList() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function JcompList() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function ScompList() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function Delete(Id,CprgId) {
    debugger;

    //var ItemId = ItemID;
    if (CprgId > 0) {

            alert("Program has been made for this entry,Please Check it....")
            //$("#btnUpdate").attr('disabled', true);
            //$('#btnAdd').hide();
            return true;
       

    }

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ProcessSeq/Delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                

                if (result.Value == true) {
                    //$('#tPAbody').DataTable().destroy();
                    //MainList();
                    //window.location.reload(true);
                    alert("Data Deleted Sucessfully");
                    window.location.href = "/ProcessSeq/ProcessSeqIndex";
                } else {

                    window.location.href = "/Error/Index";

                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function Buy_ord_Print(PJRoId) {
    debugger;
    GJobId = PJRoId;

    $('#myModal4').show();
    $('#myModal4').modal('show');


}

function SubReport() {
    debugger;

    var src = '../ReportInline/Planning/ProcessSeq/PlanningProcessSeqInline.aspx?';
    src = src + "JobId=" + GJobId;
    var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    $("#divReport").html(iframe);
    window.location.href = "../ReportInline/Planning/ProcessSeq/PlanningProcessSeqInline.aspx?JobId=" + GJobId;
}

function backtomain() {
    $('#myModal4').hide();
    $('#myModal4').modal('hide');
}