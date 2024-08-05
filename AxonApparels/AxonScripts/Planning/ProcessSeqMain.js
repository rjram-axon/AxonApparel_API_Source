
var StyId;
var MainFDate = 0;
$(document).ready(function () {
    //LoadBuyerDDL("#ddlMBuyer");
    //LoadCompanyDDL("#ddlMCompany");
    //$('#txtFromDate').val(moment(new Date()).format('MM/DD/YYYY'));
    //$('#txtToDate').val(moment(new Date()).format('MM/DD/YYYY'));
    ListOrderRefNo();
    MainList();
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
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
function List() {
    $('#tPMbody').DataTable().destroy();
    MainList();
}

function CMainList() {
    $('#tPMbody').DataTable().destroy();
    MainList();
}
function BMainList() {
    $('#tPMbody').DataTable().destroy();
    MainList();
}
function OMainList() {
    $('#tPMbody').DataTable().destroy();
    MainList();
}
function RMainList() {
    $('#tPMbody').DataTable().destroy();
    MainList();
}

function MainList() {
    debugger;

    var OType = $('input[name="Order"]:checked').attr('value');   

    var OrdNo = "";
    var ONo = $('select#ddlAOrdNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlAOrdNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlARefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlARefNo option:selected').val();
    }


    var BuyId = $('#ddlABuyer').val();
    var FrDate = $('#txtFromDate').val();
    var ToDate = $('#txtToDate').val();
    var CompId = $('#ddlACompany').val();                                           

    $.ajax({
        url: "/ProcessSeqMain/ListPlanning",
        data: JSON.stringify({ CompanyId: CompId, BuyerId: BuyId,Order_No:OrdNo,Ref_No: RefNo,FDate: FrDate, ToDate: ToDate, OrdType: OType}),
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
                          { title: "StyleRowid", "visible": false },
                         { title: "Action" },
                ]

            });

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function ListOrderRefNo() {
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/ProcessSeqMain/GetOrderNo",
        data: JSON.stringify({ frmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlACompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(data, function () {
                    $(ddlACompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
                });

                $(ddlABuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(data, function () {
                    $(ddlABuyer).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
                });

                $(ddlAOrdNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(data, function () {
                    $(ddlAOrdNo).append($('<option></option>').text(this.Order_No));
                });
                $(ddlARefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlARefNo).append($('<option></option>').text(this.Ref_No));
                });
                //$(ddlMJobNo).append($('<option/>').val('0').text('--Select JobNo--'));
                //$.each(data, function () {
                //    $(ddlMJobNo).append($('<option></option>').text(this.JobNo));
                //});
                //$(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                //$.each(data, function () {

                //    $(ddlMStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                //});

            }
        }

    });
}
function getbyID(styleid) {
    debugger;
    // StyRowId = StyleRowID;
    StyId = styleid;
    //window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex" ;

    window.location.href = "/ProcessSeqProc/ProcessSeqProcIndex?StyId=" + StyId;

}

function RadioWClick() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
function RadioJClick() {

    $('#tPMbody').DataTable().destroy();
    MainList();
}
