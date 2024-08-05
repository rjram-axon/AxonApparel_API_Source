var MainFDate = 0;
var repobj = [];
var Repid = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMFromunit, #ddlMForunit");
    LoadProcessDDL("#ddlprocess");
    LoadSupplierDDL("#ddlMSupplier");
    //LoadRefNoDDL("#ddlMOrderNo");
    //LoadOrderNoDDL("#ddljobno");
    LoadMaingrid();
    //ddlmain();
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

function LoadStockinwardAdd() {
    debugger;
    //var d = ("#ddlMCompany").val();
    var cmpyid = $('select#ddlMCompany option:selected').val();
    if (cmpyid == 0) {
        //alert('Please Select Company...');
        var msg = 'Please Select Company...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    } else {
        var Mode=0;
        window.location.href = "/StockInwardAdd/StockInwardAddIndex?CompnyId=" + cmpyid + "=&Mode=" + Mode;
    }
}

//$(document).ready(function () {
//    $("#tblmaindetails ").dataTable().find("tbody").on('click', 'tr', function () {
//        index = (this.rowIndex) - 1;
//    });
//});

function ddlmain() {
    var GrnNo = "";
    var ONo = 0;//$('select#ddlgrn option:selected').val();

    if (ONo == 0) {
        GrnNo == "";
    }
    else {

        GrnNo = $('select#ddlgrn option:selected').val();
    }

    var JobNo = "";
    var RNo = 0;//$('select#ddljobno option:selected').val();

    if (RNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddljobno option:selected').val();
    }

    var masid = 0;
    var rcpt = "";

    var CompId = $('#ddlMCompany').val();
    var FromUnit = $('#ddlMFromunit').val();
    var ForUnit = $('#ddlMForunit').val();
    var supp = $('#ddlMSupplier').val();
    var process = $('#ddlprocess').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var UType = $('input[name="UType"]:checked').attr('value');
    if (OType == 'B') {
        OType = 'W';
    }

    $.ajax({
        url: "/StockInwardMain/GetStkMainddldet",
        data: JSON.stringify({ companyId: CompId, suppid: supp, processid: process, jobordNo: JobNo, unitgrnmasid: masid, unitgrnno: GrnNo, fromunit: FromUnit, forunit: ForUnit, recptcat: rcpt, fromDate: FDate, todate: TDate, Otype: OType, Utype: UType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var obj = json.Value;
            if (json.Status == 'SUCCESS') {

              
                var data = json.Value;
               
                $(ddlgrn).append($('<option/>').val('0').text('--Select URNNO--'));
                $.each(data, function () {
                    $(ddlgrn).append($('<option></option>').text(this.Unit_GRN_No));

                });
                
                $(ddljobno).append($('<option/>').val('0').text('--Select JobOrdNo--'));
                $.each(data, function () {
                    $(ddljobno).append($('<option></option>').text(this.Job_Ord_No));
                });

                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.refno));
                });
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function LoadMaingrid() {
    debugger;

    

    var GrnNo = "";
    var ONo = $('select#ddlgrn option:selected').val();

    if (ONo == 0) {
        GrnNo == "";
    }
    else {

        GrnNo = $('select#ddlgrn option:selected').val();
    }

    var JobNo = "";
    var RNo = $('select#ddljobno option:selected').val();

    if (RNo == 0) {
        JobNo == "";
    }
    else {

        JobNo = $('select#ddljobno option:selected').val();
    }

    var masid = 0;
    var rcpt = "";

    var CompId = $('#ddlMCompany').val();
    var FromUnit = $('#ddlMFromunit').val();
    var ForUnit = $('#ddlMForunit').val();
    var supp = $('#ddlMSupplier').val();
    var process = $('#ddlprocess').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    var OType = $('input[name="MOType"]:checked').attr('value');
    var UType = $('input[name="UType"]:checked').attr('value');
    if (OType == 'B') {
        OType = 'W';
    }


    $.ajax({
        url: "/StockInwardMain/GetStkMainDetails",
        data: JSON.stringify({ companyId: CompId, suppid: supp, processid: process, jobordNo: JobNo, unitgrnmasid: masid, unitgrnno: GrnNo, fromunit: FromUnit, forunit: ForUnit, recptcat: rcpt, fromDate: FDate, todate: TDate, Otype: OType, Utype: UType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
           
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            var inputcount = 0;
            $('#tblmaindetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tblmaindetails').DataTable();
                var rows = table.clear().draw();
                $('#tblmaindetails').DataTable().rows.add(dataSet);
                $('#tblmaindetails').DataTable().columns.adjust().draw();
            }
            else {
                $('#tblmaindetails').DataTable({
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
                             { title: "UnitGrnMasId", "visible": false },
                             { title: "From Unit" },
                             { title: "For Unit" },
                             { title: "URN No" },
                             { title: "Reference" },
                             { title: "Job Work No" },
                             { title: "Process" },
                             { title: "Companyid", "visible": false },
                              { title: "Action" },


                    ]

                });

            }
           
            $('#ddlgrn').empty();
            $('#ddljobno').empty();
            $('#ddlMOrderNo').empty();
            ddlmain();
           
            $(document).ready(function () {
                var table = $('#tblmaindetails').DataTable();

                $('#tblmaindetails tbody').on('click', 'tr', function () {
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
  //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function SMainList() {
   // $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function FromunitMainList() {
  //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function ForunitMainList() {
  //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function ProMainList() {
  //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function UrnMainList() {
   // $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function JobMainList() {
  //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function List() {
   // $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
    //ddlmain();
}

function getbyID(masid,cid) {
    debugger;
    var Mode = 1;
    window.location.href = "/StockInwardAdd/StockInwardAddIndex?MasId=" + masid + "=&Mode=" + Mode;
}


function Delete(masid) {
    var Mode = 2;
    window.location.href = "/StockInwardAdd/StockInwardAddIndex?MasId=" + masid + "=&Mode=" + Mode;
}




function StkInwPrint(Id) {
    debugger;
    Repid = Id;
    $('#myModal2').modal('show');

    docname = "UNIT GRN RECEIPT";
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
    window.open("../ReportInline/Stores/StoresInward/StoresInwardInlineReport.aspx?Masid=" + Repid + "&Supp=" + p[0] + "&Rem=" + p[1] + "&Companyid=" + compid);


}

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}
