var MainFDate = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();  
    LoadCompanyDDL("#ddlMCompany");
    LoadMainGrid();
    ListOrderRefNo();
})

function MainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
}
function RadioMLClick() {
    $('#tOMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
}
function ListOrderRefNo() {


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var OType = $('input[name="MIType"]:checked').attr('value');

    $.ajax({
        url: "/PurchaseReturnMain/GetOrderNoRet",
        data: JSON.stringify({ Ordtype: OType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();
                $(ddlMReturnNo).empty();
                $(ddlMSupplier).empty();
               

                //OrdNo
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));

                    // $(buyerDDL).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });
            
                //Supplier
                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.SupplierID).text(this.Supplier));
                });
                //Po No
                $(ddlMReturnNo).append($('<option/>').val('0').text('--Select ReturnNo--'));
                $.each(data, function () { 
                    $(ddlMReturnNo).append($('<option></option>').val(this.Return_ID).text(this.Return_no));
                });
                //cmp
                //$(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                //$.each(data, function () {
                //    $(ddlMCompany).append($('<option></option>').val(this.companyid).text(this.company));
                //});

            }
        }

    });
}

function LoadMainGrid() {

    debugger;

    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }


    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();
    var PRTId = $('#ddlMReturnNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MIType"]:checked').attr('value');



    $.ajax({
        url: "/PurchaseReturnMain/GetRetMainDetails",
        data: JSON.stringify({ OrderNo: OrdNo, RefNo: RefNo, SupplierID: SuppId, CompanyID: CompId, Return_ID: PRTId, Ordtype: OType, FrmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tOMbody').DataTable({
                data: dataSet,
                scrollY: 200,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                columns: [
                         { title: "PurRetId", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Return No" },
                         { title: "Date" },                 
                         { title: "Ret Type" },
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
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadPurchaseReturnEntry() {
    debugger;
    var Mode = 0;
    var Id = 0;
    window.location.href = "/PurchaseReturnAdd/PurchaseReturnAddIndex?PRetId=" + Id + "=&Mode=" + Mode;

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
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

function getbyID(Id) {
    debugger;



    //var CompId = $('#ddlMCompany').val();

    //if (CompId == 0) {
    //    alert("Please Select the Company..")
    //    return true;
    //}

    //var AOType = $('input[name="MOType"]:checked').attr('value');
    //var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 1;
    //var SuppId = SupId;
    //var POrdID = 0;
    window.location.href = "/PurchaseReturnAdd/PurchaseReturnAddIndex?PRetId=" + Id + "=&Mode=" + Mode;


}

function Delete(Id) {
    debugger;



    var Mode = 2;

    window.location.href = "/PurchaseReturnAdd/PurchaseReturnAddIndex?PRetId=" + Id + "=&Mode=" + Mode;


}

function Purret_Print(Id) {
    debugger;
    Rptid = Id;
    //$('#myModal2').modal('show');

    //docname = "STOCK TRANSFER";
    //GenerateReportItem(docname);
    var compid = $('#ddlMCompany').val();
    window.open("../ReportInline/Purchase/PurchaseReturnInlineReport/PurchaseReturnInline.aspx?Masid=" + Rptid + "&Companyid=" + compid);

}