var MainFDate = 0;
var repobj = [];
var Repid = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
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
});
function LoadLotSplitUpAdd() {
    debugger;
    window.location.href = "/LotsplitupAdd/LotsplitupAddIndex";

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

    var TransNo = "";
    var TNo = $('select#ddlMTransNo option:selected').val();

    if (TNo == 0) {
        TransNo == "";
    }
    else {

        TransNo = $('select#ddlMTransNo option:selected').val();
    }

    var EntryNo = "";
    var ENo = $('select#ddlMSplitNo option:selected').val();

    if (ENo == 0) {
        EntryNo == "";
    }
    else {

        EntryNo = $('select#ddlMSplitNo option:selected').val();
    }

    var LotNo = "";
    var LNo = $('select#ddlMLotNo option:selected').val();

    if (LNo == 0) {
        LotNo == "";
    }
    else {

        LotNo = $('select#ddlMLotNo option:selected').val();
    }

    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();




    $.ajax({
        url: "/LotsplitupMain/GetLotMainDetails",
        data: JSON.stringify({ Companyid: CompId, SupplierId: SuppId, TransNo: TransNo, EntryNo: EntryNo, MLotNo: LotNo, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tLMbody').DataTable({
                data: dataSet,
                columns: [
                         { title: "LotSplitMasId", "visible": false },
                         { title: "Split No" },
                         { title: "Split RefNo" },
                         { title: "Trans No" },
                         { title: "Split Date" },
                         { title: "Supplier" },
                         { title: "Action" },

                ]

            });

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function CMainList() {
    $('#tLMbody').DataTable().destroy();
    LoadMainGrid();
}
function SMainList() {
    $('#tLMbody').DataTable().destroy();
    LoadMainGrid();
}
function SpTMainList() {
    $('#tLMbody').DataTable().destroy();
    LoadMainGrid();

}

function TMainList() {
    $('#tLMbody').DataTable().destroy();
    LoadMainGrid();

}

function List() {
    $('#tLMbody').DataTable().destroy();
    LoadMainGrid();

}

function ListOrderRefNo() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/LotsplitupMain/GetLotMainOrdRefDetails",
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                var compdet = {};
                var comp = [];
                var procdet = {};
                var proc = [];

                $.each(obj, function (i, el) {

                    if (!compdet[el.prodnord]) {
                        compdet[el.prodnord] = true;
                        comp.push(el);
                    }
                    if (!procdet[el.SupplierId]) {
                        procdet[el.SupplierId] = true;
                        proc.push(el);
                    }
                });


                //SplitNo
                $(ddlMSplitNo).append($('<option/>').val('0').text('--Select SplitNo--'));
                $.each(data, function () {
                    $(ddlMSplitNo).append($('<option></option>').text(this.EntryNo));

                });
                //TransNo
                $(ddlMTransNo).append($('<option/>').val('0').text('--Select TransNo--'));
                $.each(data, function () {
                    $(ddlMTransNo).append($('<option></option>').text(this.TransNo));
                });
                //Supplier
                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(proc, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                });
                //Company
                $(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(comp, function () {
                    $(ddlMCompany).append($('<option></option>').val(this.Companyid).text(this.Company));
                });

            }
        }

    });
}
function getbyID(ID) {
    debugger;



    var Mode = 1;
    var TransNo = "";
    window.location.href = "/LotsplitupEntry/LotsplitupEntryIndex?TransNo=" + TransNo + "=&Mode=" + Mode + "=&TransID=" + ID;


}

function Delete(ID) {
    debugger;



    var Mode = 2;
    var TransNo = "";
    window.location.href = "/LotsplitupEntry/LotsplitupEntryIndex?TransNo=" + TransNo + "=&Mode=" + Mode + "=&TransID=" + ID;


}


function LotSpltPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "LOT SPLITUP";
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
    var compid = $('#ddlMCompany').val();
    window.location.href = "../ReportInline/Stores/LotSplitUp/LotSplitUpInlineReport.aspx?Masid=" + Repid + "&Companyid=" + compid;

}


function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}