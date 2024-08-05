var MainFDate = 0;
var QuotId = 0;
var CompanId = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadStyleDDL("#ddlMStyle");
    LoadBuyerDDL("#ddlMBuyer");
    LoadMaingrid();
    ddlmain();
});
function getDate() {

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

function LoadAdd() {
    debugger;
    //var d = ("#ddlMCompany").val();
    var cmpyid = $('select#ddlMCompany option:selected').val();
    if (cmpyid == 0) {
        alert('Please Select Company...');
        return true;
    } else {
        var Mode = 0;
        window.location.href = "/QuotationAdd/QuotationAddIndex?CompnyId=" + cmpyid + "=&Mode=" + Mode;
    }
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function ddlmain() {

    debugger;
    var buyid = 0;
    var quotetype = "";
    var quoteno = "";
    var enqno = "";
    var styleid = 0;
    var CompId = $('#ddlMCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var refno = "";
    var Ref = $('select#ddlMRefNo option:selected').val();

    if (Ref == 0) {
        refno == "";
    }
    else {

        refno = $('select#ddlMRefNo option:selected').val();
    }
    $.ajax({
        url: "/QuotationMain/GetMainddldet",
        data: JSON.stringify({ companyId: CompId, buyerid: buyid, quotetype: quotetype, quoteno: quoteno, enqno: enqno, styleid: styleid, fromDate: FDate, todate: TDate, RefNo: refno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {


                var data = json.Value;


                var qorddet = {};
                var qord = [];
                var refdet = {};
                var ref = [];

                $.each(obj, function (i, el) {

                    if (!qorddet[el.QuoteNo]) {
                        qorddet[el.QuoteNo] = true;
                        qord.push(el);
                    }
                    if (!refdet[el.RefNo]) {
                        refdet[el.RefNo] = true;
                        ref.push(el);
                    }


                });
                var EnqNo = [];
                var Qtype = [];

                $.each(obj, function (i, el) {
                    
                    if (el.EnquiryId != 0) {
                        
                        EnqNo.push(el.enquiryno);
                    }
                        
                    
                    Qtype.push(el.QuoteType);
                });
                EnqNo.sort();
                var uniqueEnqNo = EnqNo.filter(onlyUnique);
                var uniqueQtype = Qtype.filter(onlyUnique);
                //var e = [...new Set(Qtype)];
                $(ddlMRefNo).empty();
                $(ddlMQuoteNo).empty();

                $(ddlMQuoteType).append($('<option/>').val('0').text('--Select QuoteType--'));
                $.each(uniqueQtype, function (i,el) {
                    $(ddlMQuoteType).append($('<option></option>').text(el));

                });

                $(ddlMEnquiryNo).append($('<option/>').val('0').text('--Select EnquiryNo--'));
                $.each(uniqueEnqNo, function (i,el) {
                    $(ddlMEnquiryNo).append($('<option></option>').text(el));
                });

                //$(ddlMBuyer).append($('<option/>').val('0').text('--Select Buyer--'));
                //$.each(data, function () {
                //    $(ddlMBuyer).append($('<option></option>').text(this.buyer));
                //});
                $(ddlMQuoteNo).append($('<option/>').val('0').text('--Select QuoteNo--'));
                $.each(qord, function () {
                    $(ddlMQuoteNo).append($('<option></option>').text(this.QuoteNo));
                });



                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });
                //$(ddlMStyle).append($('<option/>').val('0').text('--Select Style--'));
                //$.each(data, function () {
                //    $(ddlMStyle).append($('<option></option>').text(this.style));
                //});

            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMaingrid() {
    debugger;



    var QuoteNo = "";
    var ONo = $('select#ddlMQuoteNo option:selected').val();

    if (ONo == 0) {
        QuoteNo == "";
    }
    else {

        QuoteNo = $('select#ddlMQuoteNo option:selected').val();
    }

    var Quotetype = "";
    var QNo = $('select#ddlMQuoteType option:selected').val();

    if (QNo == 0) {
        Quotetype == "";
    }
    else {

        Quotetype = $('select#ddlMQuoteType option:selected').val();
    }

    var enqno = "";
    var ENo = $('select#ddlMEnquiryNo option:selected').val();

    if (ENo == 0) {
        enqno == "";
    }
    else {

        enqno = $('select#ddlMEnquiryNo option:selected').val();
    }

    var refno = "";
    var Ref = $('select#ddlMRefNo option:selected').val();

    if (Ref == 0) {
        refno == "";
    }
    else {

        refno = $('select#ddlMRefNo option:selected').val();
    }

    var CompId = $('#ddlMCompany').val();
    var buyid = $('#ddlMBuyer').val();
    var styleid = $('#ddlMStyle').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/QuotationMain/GetgridMainDetails",
        data: JSON.stringify({ companyId: CompId, buyerid: buyid, quotetype: Quotetype, quoteno: QuoteNo, enqno: enqno, styleid: styleid, fromDate: FDate, todate: TDate, RefNo: refno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tOMbody').DataTable({
                data: dataSet,
                scrollY: 200,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                fixedHeader: true,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                select: {
                    style: 'single'
                },
                "bSort": false,
                columns: [
                         { title: "QuoteId", "visible": false },
                         { title: "BuyerId", "visible": false },
                         { title: "Buyer" },
                         { title: "Quote No" },
                         { title: "Quote Date" },
                         { title: "Styleid", "visible": false },
                         { title: "Style" },
                         { title: "Quote Type" },
                          { title: "Enquiry No" },
                           { title: "Companyid", "visible": false },
                            { title: "Company" },
                              { title: "Ref No" },
                          { title: "Action" },


                ]

            });


            //ddlmain();
            //$('#ddlMQuoteType').empty();
            //$('#ddlMEnquiryNo').empty();
            //$('#ddlMQuoteNo').empty();

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

function CMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}

function BMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}

function QMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}

function QnoMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}

function EnqMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}
function StyMainList() {
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}
function List() {
    debugger;
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}

function RefMainList() {
    debugger;
    $('#tOMbody').DataTable().destroy();
    LoadMaingrid();
}

function getbyID(qid, cid) {
    debugger;
    var Mode = 1;
    window.location.href = "/QuotationAdd/QuotationAddIndex?MasId=" + qid + "=&Mode=" + Mode;
}


function Delete(qid) {
    var Mode = 2;
    window.location.href = "/QuotationAdd/QuotationAddIndex?MasId=" + qid + "=&Mode=" + Mode;
}

function QuotationPrint(QuoteId,CompanyId) {
    debugger;

    $('#myModal2').modal('show'); 
    QuotId = QuoteId;
    CompanId = CompanyId;
    GetRevNo(QuotId);
}


function SubReport() {
    debugger;

    //var RecId = $('#ddlMRev').val();
    //if (RecId > 0) {
    //    var RQuoteNo = $('select#ddlMRev option:selected').text();
    //    window.open("../ReportInline/OrderProcessing/AmdQuotationInLineReport.aspx?QuoteId=" + RecId + "&RQuoteNo=" + RQuoteNo);
    //}
    //else {
    //    window.open("../ReportInline/OrderProcessing/QuotationInLineReport.aspx?QuoteId=" + QuotId);
    //}
    window.open("../ReportInline/OrderProcessing/QuotationMainInlineReport.aspx?QuoteId=" + QuotId + "&CompId=" + CompanId);
}

function backtomain() {

    $('#myModal2').modal('hide');
}

function RevPrintList() {
    SubReport();
}


function GetRevNo(QuotId) {
    debugger;
 
    $.ajax({
        url: "/QuotationMain/GetRevNumber/",
        data: JSON.stringify({ QuoteID: QuotId }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
     
        success: function (result) {
            debugger;
            var obj = result.Value;
           
            var revdet = {};
            var rev = [];

            $.each(obj, function (i, el) {

                if (!revdet[el.RecID]) {
                    revdet[el.RecID] = true;
                    rev.push(el);
                }
            });

            $('#ddlMRev').empty();
            $('#ddlMRev').append($('<option/>').val('0').text('--Select Revised No--'));
            $.each(rev, function () {
                $('#ddlMRev').append($('<option></option>').val(this.RecID).text(this.RecQuoteNo));
            });
            

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });

    
}

function PrintRevReport() {
 
}