var MainFDate = 0;
var repobj = [];
var Repid = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadMainGrid();
    ListOrderRefNo();
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
})

function LoadStockAuditEntry() {
    debugger;
    var Mode = 0;
    var Id = 0;
    var CompId = $('#ddlMCompany').val();
    window.open("/StockAuditEntry/StockAuditEntryIndex?StAudId=" + Id + "=&Mode=" + Mode + "=&CompId=" + CompId);

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

function LoadMainGrid() {

    debugger;


    var CompId = $('#ddlMCompany').val();
    var AudId = $('#ddlMAuditNo').val();
    var FrDate = $('#txtFromDate').val();
    var ToDate = $('#txtToDate').val();




    $.ajax({
        url: "/StockAuditMain/GetAudMainDetails",
        data: JSON.stringify({ Companyid: CompId, Audit_MasId: AudId, FDate: FrDate, TDate: ToDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tAMbody').DataTable({
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
                         { title: "AudMasId", "visible": false },
                         { title: "Company" },
                         { title: "Entry No" },
                         { title: "Entry Date" },                   
                         { title: "Action" },

                ]

            });
            $(document).ready(function () {
                var table = $('#tAMbody').DataTable();

                $('#tAMbody tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });
            CheckRights("StockAuditAdjustment");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ListOrderRefNo() {


    var FrDate = $('#txtFromDate').val();
    var ToDate = $('#txtToDate').val();
    
    $.ajax({
        url: "/StockAuditMain/GetOrderNoRet",
        data: JSON.stringify({ FDate: FrDate, TDate: ToDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMAuditNo).empty();


                //AuditNo
                $(ddlMAuditNo).append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(data, function () {
                   
                    $(ddlMAuditNo).append($('<option></option>').val(this.Audit_MasId).text(this.Entry_No));
                });
             

            }
        }

    });
}

function CMainList() {
    $('#tAMbody').DataTable().destroy();
    LoadMainGrid();
    
}

function AMainList() {
    $('#tAMbody').DataTable().destroy();
    LoadMainGrid();
    
}

function List() {
    $('#tAMbody').DataTable().destroy();
    LoadMainGrid();
}

function getbyID(Id) {
    debugger;

    
    var Mode = 1;
    window.location.href = "/StockAuditEntry/StockAuditEntryIndex?StAudId=" + Id + "=&Mode=" + Mode;


}
function Delete(Id) {
    debugger;

    var Mode = 2;

    window.location.href = "/StockAuditEntry/StockAuditEntryIndex?StAudId=" + Id + "=&Mode=" + Mode;
}




function StkauditPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "STOCK AUDIT";
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
    window.open("../ReportInline/Stores/StockAudit/StockAuditInlineReport.aspx?Masid=" + Repid);

}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}