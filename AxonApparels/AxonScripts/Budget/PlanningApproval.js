var Mainlist = [];
var Bomlist = [];
var Processlist = [];
var prodntlist = [];
var commlist = [];
var Type = '';
var bomindex = -1;
var processindex = -1;
var prodindex = -1;
var date = '';
var listofbom = [];
var listofprocess = [];
var listofprodord = [];
var listofprod = [];
var listofcut = [];
var styleid = 0;
var MainFDate = 0;
var DCompid = 0;
var itemid = 0;
var GEstyleid = 0;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadStyleDDL("#ddlMStyle");
    LoadCurrencyDDL("#ddlCurrency");
    DCompid = $("#hdnDCompid").data('value');
    ddlmain();
    LoadMaingrid();

    $("#QizStatus").click(function () {
        debugger;
        $('#QizStatus input[type="checkbox"]').prop('checked', this.checked);
        if (this.checked == true) {
            var res = $('#txtstylerate').val();

            var resq = parseFloat((4 * res) / 100);
            resq = resq.toFixed(4);
            $('#qizcharges').val(resq);
        }
        else {
            $('#qizcharges').val(0);
        }
        calcmarkup();
    });


    $("#checkallbom").click(function () {
        debugger;
        $('#bomtable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < Bomlist.length; d++) {
            if (this.checked == true) {
                Bomlist[d].check = true;
            }
            else {
                Bomlist[d].check = false;
            }
        }


    });

    $("#checkallprocess").click(function () {
        debugger;
        $('#processtable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < Processlist.length; d++) {
            if (this.checked == true) {
                Processlist[d].check = true;
            }
            else {
                Processlist[d].check = false;
            }
        }


    });

    $("#checkallprod").click(function () {
        debugger;
        $('#productiontable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < prodntlist.length; d++) {
            if (this.checked == true) {
                prodntlist[d].check = true;
            }
            else {
                prodntlist[d].check = false;
            }
        }


    });

    $("#bomtable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Bomlist.length; d++) {
                    if (Bomlist[d].sno == val) {
                        Bomlist[d].IsApproved = "A";
                    }
                    //else {
                    //    Bomlist[d].check = false;
                    //}
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < Bomlist.length; d++) {
                    if (Bomlist[d].sno == val) {

                        Bomlist[d].IsApproved = "P";
                    }

                }
            }

        });

    });

    $("#processtable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupproc]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Processlist.length; d++) {
                    if (Processlist[d].sno == val) {
                        Processlist[d].check = true;
                    }
                    //else {
                    //    Processlist[d].check = false;
                    //}
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < Processlist.length; d++) {
                    if (Processlist[d].sno == val) {
                        Processlist[d].check = false;
                    }

                }
            }

        });
    });

    $("#productiontable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupprodnt]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < prodntlist.length; d++) {
                    if (prodntlist[d].sno == val) {
                        prodntlist[d].check = true;
                    }
                    //else {
                    //    prodntlist[d].check = false;
                    //}
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < prodntlist.length; d++) {
                    if (prodntlist[d].sno == val) {
                        prodntlist[d].check = false;
                    }

                }
            }

        });
    });


    $('#bomtable').on('click', 'tr', function (e) {

        debugger;
        var table = $('#bomtable').DataTable();
        var row = $(this).closest('tr');
        var data = $('#bomtable').dataTable().fnGetData(row);

        var itm = data.Itemid;
        var sz = data.Sizeid;
        var clr = data.Colorid;
        LoadPreOrderDetails(itm, sz, clr);

    });

    $('#processtable').on('click', 'tr', function (e) {

        debugger;
        var table = $('#processtable').DataTable();
        var row = $(this).closest('tr');
        var data = $('#processtable').dataTable().fnGetData(row);
        var ProcsId = data.Processid
        LoadPreProcessDetails(ProcsId, 0, 0, 0);

    });
    $(document).on('keyup', '.calcRateBom', function () {
        debugger;

        var table = $('#bomtable').DataTable();
        var PId = table.row($(this).parents('tr')).data()["sno"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        //var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
        var apprate = table.row($(this).parents('tr')).data()["PoRate"];
        var qty = table.row($(this).parents('tr')).data()["Quantity"];

        var val = $(this).val();

        if (apprate > 0 && val < apprate) {
            alert('Po is made...Cant reduce the rate...');
            //LoadBomTable(Bomlist);
            var table = $('#bomtable').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtratebom]').each(function (ig) {
                var row = $(this).closest('tr');
                for (var h = 0; h < Bomlist.length; h++) {
                    if (ecdata[ig].sno == Bomlist[h].sno) {
                        var Rate = Bomlist[h].Rate;
                        row.find('#txtratebom').val(Rate);
                    }
                }
            });
            Calctotbom();

            //var rows = $("#bomtable").dataTable().fnGetNodes();
            //var dtTable = $('#bomtable').DataTable();
            //for (var i = 0; i < rows.length; i++) {
            //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            //    $('input[id=txtratebom]').each(function () {
            //        if (sn == PId) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtratebom').val();
            //            row.find('#txtratebom').focus().val('').val(num);
            //           // return true;
            //        }
            //    });
            //}

            var table = $('#bomtable').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtratebom]').each(function (ig) {
                var row = $(this).closest('tr');
                if (ecdata[ig].sno == PId) {
                    var num = row.find('#txtratebom').val();
                    row.find('#txtratebom').focus().val('').val(num);
                }
            });
            return true;
        }

        $.each(Bomlist, function () {
            if (this.sno == PId) {
                this.Rate = val;
            }
        });
        var cal = val * qty;
        cal = cal.toFixed(2);
        $.each(Bomlist, function () {
            if (this.sno == PId) {
                this.amount = cal;
            }
        });
        //LoadBomTable(Bomlist);
        var table = $('#bomtable').DataTable();
        var ecdata = table.rows().data();
        debugger;
        $('input[id=txtratebom]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < Bomlist.length; h++) {
                if (ecdata[ig].sno == Bomlist[h].sno) {
                    var Rate = Bomlist[h].Rate;
                    row.find('#txtratebom').val(Rate);
                }
            }
        });

        Calctotbom();

        //var rows = $("#bomtable").dataTable().fnGetNodes();
        //var dtTable = $('#bomtable').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtratebom]').each(function () {
        //        if (sn == PId && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtratebom').val();
        //            row.find('#txtratebom').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
    });
    $(document).on('keyup', '.calcRateProcess', function () {
        debugger;


        var table = $('#processtable').DataTable();
        var PId = table.row($(this).parents('tr')).data()["sno"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
        var qty = table.row($(this).parents('tr')).data()["Quantity"];

        var val = $(this).val();

        if (apprate > 0 && val < apprate) {
            alert('Process Dc is made...Cant reduce the rate...');
            // LoadProcessTable(Processlist);
            var table = $('#processtable').DataTable();
            var ecdata = table.rows().data();

            $('input[id=txtrateprocess]').each(function (ig) {
                var row = $(this).closest('tr');
                for (var h = 0; h < Processlist.length; h++) {
                    if (ecdata[ig].sno == Processlist[h].sno) {
                        var Rate = Processlist[h].Rate;
                        row.find('#txtrateprocess').val(Rate);
                    }
                }
            });
            Calctotprocess();

            //var rows = $("#processtable").dataTable().fnGetNodes();
            //var dtTable = $('#processtable').DataTable();
            //for (var i = 0; i < rows.length; i++) {
            //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            //    $('input[id=txtrateprocess]').each(function () {
            //        if (sn == PId) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtrateprocess').val();
            //            row.find('#txtrateprocess').focus().val('').val(num);
            //            return true;
            //        }
            //    });
            //}

            var table = $('#processtable').DataTable();
            var ecdata = table.rows().data();
            $('input[id=txtrateprocess]').each(function (ig) {
                var row = $(this).closest('tr');
                if (ecdata[ig].sno == PId) {
                    var num = row.find('#txtrateprocess').val();
                    row.find('#txtrateprocess').focus().val('').val(num);
                }
            });

            return true;
        }
        $.each(Processlist, function () {
            if (this.sno == PId) {
                this.Rate = val;
            }
        });
        var cal = val * qty;
        cal = cal.toFixed(2);
        $.each(Processlist, function () {
            if (this.sno == PId) {
                this.amount = cal;
            }
        });
        // LoadProcessTable(Processlist);
        var table = $('#processtable').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtrateprocess]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < Processlist.length; h++) {
                if (ecdata[ig].sno == Processlist[h].sno) {
                    var Rate = Processlist[h].Rate;
                    row.find('#txtrateprocess').val(Rate);
                }
            }
        });

        Calctotprocess();
        //var rows = $("#processtable").dataTable().fnGetNodes();
        //var dtTable = $('#processtable').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtrateprocess]').each(function () {
        //        if (sn == PId && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtrateprocess').val();
        //            row.find('#txtrateprocess').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}
        var table = $('#processtable').DataTable();
        var ecdata = table.rows().data();
        $('input[id=txtrateprocess]').each(function (ig) {
            var row = $(this).closest('tr');
            if (ecdata[ig].sno == PId) {
                var num = row.find('#txtrateprocess').val();
                row.find('#txtrateprocess').focus().val('').val(num);
            }
        });

        return true;
    });

    $(document).on('keyup', '.calcRateProduction', function () {
        debugger;

        var table = $('#productiontable').DataTable();
        var PId = table.row($(this).parents('tr')).data()["sno"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
        var qty = table.row($(this).parents('tr')).data()["Quantity"];

        var val = $(this).val();


        if (apprate > 0 && val < apprate) {
            alert('GRN is made...Cant reduce the rate...');
            LoadProductionTable(prodntlist);
            Calctotprod();

            var rows = $("#productiontable").dataTable().fnGetNodes();
            var dtTable = $('#productiontable').DataTable();
            for (var i = 0; i < rows.length; i++) {
                var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                $('input[id=txtrateprodtn]').each(function () {
                    if (sn == PId) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtrateprodtn').val();
                        row.find('#txtrateprodtn').focus().val('').val(num);
                        return true;
                    }
                });
            }
            return true;
        }
        $.each(prodntlist, function () {
            if (this.sno == PId) {
                this.Rate = val;
            }
        });
        var cal = val * qty;
        cal = cal.toFixed(2);
        $.each(prodntlist, function () {
            if (this.sno == PId) {
                this.amount = cal;
            }
        });
        LoadProductionTable(prodntlist);
        Calctotprod();

        var rows = $("#productiontable").dataTable().fnGetNodes();
        var dtTable = $('#productiontable').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrateprodtn]').each(function () {
                if (sn == PId && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrateprodtn').val();
                    row.find('#txtrateprodtn').focus().val('').val(num);
                    return true;
                }
            });
        }
    });
});

function Pending() {
    debugger;

    Type = 'PENDING';


    ddlmain();
    //   $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function Approved() {
    Type = 'APPROVED';

    ddlmain();
    //  $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}
function Load() {
    //ddlmain();
    // $('#tblmaindetails').DataTable().destroy();
    LoadMaingrid();
}

function LoadShipmentRate(StyRowId) {
    $.ajax({
        url: "/Budget/GetShipmentwiserate",
        data: JSON.stringify({ stylerowid: StyRowId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json;

            var totalqty = 0;
            for (var e = 0; e < obj.length; e++) {
                var qt = obj[e].Quantity;
                totalqty = totalqty + parseFloat(qt);

            }


            var totalamnt = 0;
            for (var r = 0; r < obj.length; r++) {
                var amount = obj[r].Amnt;
                totalamnt = totalamnt + parseFloat(amount);

            }
            var tot = parseFloat(totalamnt) / parseFloat(totalqty);
            tot = tot.toFixed(4);
            $('#txtshiprate').val(tot);




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadMaingrid() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMRefNo option:selected').val();
    }




    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var style = $('#ddlMStyle').val();
    if (style == null || style == "0") {
        style = 0;
    }

    Type;
    if (Type == "") {
        Type = "PENDING"
    }
    else {
        Type;
    }
    var ptype = $('input[name="OrdType"]:checked').attr('value');
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/PlanningApproval/LoadMaingrid",
        data: JSON.stringify({ cmpid: CompId, styleid: style, ordno: ordNo, refno: RecNo, type: Type, ordtype: ptype, fromDate: FDate, todate: TDate }),
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
                    bSort: false,
                    columns: [
                             { title: "StyleRowid", "visible": false },
                             { title: "Buyer" },
                             { title: "Order No" },
                             { title: "Style" },
                             { title: "Ref No" },
                             {
                                 title: "Date"
                             },
                             { title: "Quantity" },
                              { title: "StyleId", "visible": false },
                              { title: "Action" },


                    ]

                });

            }


            //$('#ddlMRefNo').empty();
            //$('#ddlMOrderNo').empty();

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


function ddlmain() {
    debugger;

    var ordNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RecNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || ONo == undefined) {
        RecNo == "";
    }
    else {

        RecNo = $('select#ddlMRefNo option:selected').val();
    }




    //var CompId = $('#ddlMCompany').val();
    //if (CompId == null || CompId == "0") {
    //    CompId = 0;
    //}


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    var style = $('#ddlMStyle').val();
    if (style == null || style == "0") {
        style = 0;
    }

    Type;
    if (Type == "") {
        Type = "PENDING"
    }
    else {
        Type;
    }
    var ptype = $('input[name="OrdType"]:checked').attr('value');
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/PlanningApproval/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, styleid: style, ordno: ordNo, refno: RecNo, type: Type, ordtype: ptype, fromDate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json.Value;
            Mainlist = json.Value;
            if (json.Status == 'SUCCESS') {
                var data = json.Value;


                var orddet = {};
                var ord = [];

                var refdet = {};
                var ref = [];

                $.each(obj, function (i, el) {


                    if (!orddet[el.orderno]) {
                        orddet[el.orderno] = true;
                        ord.push(el);
                    }

                    if (!refdet[el.refno]) {
                        refdet[el.refno] = true;
                        ref.push(el);
                    }


                });



                $('#ddlMRefNo').empty();
                $('#ddlMOrderNo').empty();

                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.refno));
                });

                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.orderno));
                });
            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


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



}


function Loadexchangerate() {
    debugger;
    var currID = $('#ddlCurrency').val();

    var currName = $("#ddlCurrency option:selected").text();
    if (currID != 0) {
        $("#lblcurrency").text(currName);
    }
    else {
        $("#lblcurrency").text("Indian Rup");
    }
    $.ajax({
        url: "/Currency/GetbyID/" + currID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#exchange').val(obj.Exchangerate);


                //var exrat = obj.Exchangerate;
                var tt = $('#Total').val();

                var qty = $('#txtshiprate').val();
                var set = parseFloat(tt / qty).toFixed(2);

                var ex = $('#exchange').val();
                var res = parseFloat(set * ex).toFixed(2);
                $('#INR').val(res);
                //var ccset = set / exrat;

                //$('#rupees').val(ccset.toFixed(3));

                //var selcurrency = ccset / exrat;
                //$('#selcurr').val(selcurrency.toFixed(3));

            }
        }

    });

}
function CMainlist() {
    // $('#tblmaindetails').DataTable().destroy();

    ddlmain();
    LoadMaingrid();
}

function getbyAddID(id) {
    debugger;

    if (Type == "") {
        alert('Select Pending or Approved...');
        return true;
    }
    var ordno = '';
    var style = '';
    var buyer = '';
    var Company = '';
    var refno = '';
    var orddate = '';
    var qty = 0;
    var styrwid = 0;
    var styamt = 0;
    var item = '';
    //var styleid = 0;
    for (var d = 0; d < Mainlist.length; d++) {
        if (Mainlist[d].stylerwid == id) {
            ordno = Mainlist[d].orderno;
            style = Mainlist[d].style;
            styleid = Mainlist[d].styleid;
            buyer = Mainlist[d].buyer;
            Company = Mainlist[d].cmp;
            refno = Mainlist[d].refno;
            qty = Mainlist[d].qty;
            orddate = moment(Mainlist[d].date).format("DD/MM/YYYY");
            //styrwid = Mainlist[d].stylerwid;
            styamt = Mainlist[d].StyleAmnt;
            itemid = Mainlist[d].itemid;
            item = Mainlist[d].item;

        }
    }

    $('#myModal2').show();
    $('#myModal2').modal('show');
    $('#btnUpd').hide();
    $('#btndelete').hide();
    $('#btnsave').show();
    $('#Ordernum').val(ordno);
    $('#style').val(style);
    $('#BuyerName').val(buyer);
    $('#Companyname').val(Company);
    $('#itemname').val(item);
    $('#Refnum').val(refno);
    $('#qnty').val(qty);
    $('#date').val(orddate);
    $('#txtstylerate').val(styamt);

    var rt = styamt;
    var res = parseFloat((1 * rt) / 100);
    res = res.toFixed(4);
    $('#gaficharges').val(res);

    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#QizStatus').is(":checked");

    });
    if (ischecked == true) {
        var resq = parseFloat((4 * rt) / 100);
        resq = resq.toFixed(4);
        $('#qizcharges').val(resq);
    }
    else {
        $('#qizcharges').val(0);
    }

    date = orddate;
    LoadShipmentRate(id);
    LoadPcsWt(ordno, styleid);
    LoadBomdet(ordno, styleid, itemid);
    LoadProcessdet(ordno, styleid);
    LoadProductndet(ordno, styleid);
    LoadCommdet(ordno, styleid);
    // totcost();

    $('#profile-tab').click();
}

function getbyEditID(id) {
    debugger;

    //$('#TxtProduction').val(1);

    if (Type == "") {
        alert('Select Pending or Approved...');
        return true;
    }
    var ordno = '';
    var style = '';
    var buyer = '';
    var Company = '';
    var refno = '';
    var orddate = '';
    var qty = 0;
    var styrwid = 0;
    var styleid = 0;
    for (var d = 0; d < Mainlist.length; d++) {
        if (Mainlist[d].stylerwid == id) {
            ordno = Mainlist[d].orderno;
            style = Mainlist[d].style;
            styleid = Mainlist[d].styleid;
            GEstyleid = Mainlist[d].styleid;
            buyer = Mainlist[d].buyer;
            Company = Mainlist[d].cmp;
            refno = Mainlist[d].refno;
            qty = Mainlist[d].qty;
            orddate = moment(Mainlist[d].date).format("DD/MM/YYYY");
            //styrwid = Mainlist[d].stylerwid;
            styamt = Mainlist[d].StyleAmnt;
            itemid = Mainlist[d].itemid;
            item = Mainlist[d].item;
        }
    }
    $('#myModal2').show();
    $('#myModal2').modal('show');
    $('#btnUpd').hide();
    $('#btndelete').hide();
    $('#btnsave').show();
    $('#Ordernum').val(ordno);
    $('#style').val(style);
    $('#BuyerName').val(buyer);
    $('#Companyname').val(Company);
    $('#itemname').val(item);
    $('#Refnum').val(refno);
    $('#qnty').val(qty);
    $('#date').val(orddate);
    $('#txtstylerate').val(styamt);

    //var rt = styamt;
    //var res = parseFloat((1 * rt) / 100);
    //res = res.toFixed(4);
    //$('#gaficharges').val(res);
    //$('#date').val(styrwid);
    //$('#qizcharges').val(0);
    //LoadShipmentRate(id);
    //date = orddate;
    //LoadPcsWt(ordno, styleid);
    LoadBomdetEdit(ordno, styleid, itemid);
    //LoadProcessdetEdit(ordno, styleid);
    //LoadProductndetEdit(ordno, styleid);
    //LoadCommdetEdit(ordno, styleid);
    //ChkPOforbom(ordno, styleid);
    //ChkPOforproc(ordno, styleid);
    //ChkPOforprodord(ordno, styleid);
    //ChkPOforprod(ordno, styleid);
    //ChkPOforcut(ordno, styleid);
    //calcmarkup();
    $('#profile-tab').click();
}

function chkbom() {
    debugger;
    $('input[id=groupbom]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        var val = $(this).val();

        for (var d = 0; d < Bomlist.length; d++) {
            if (Bomlist[d].sno == val && (Bomlist[d].check == "true" || Bomlist[d].check == true)) {
                row.find('#groupbom').prop('checked', true);
            }
            else if (Bomlist[d].sno == val && (Bomlist[d].check == "false" || Bomlist[d].check == false)) {
                row.find('#groupbom').prop('checked', false);
            }
        }
    });
}

function chkprocess() {

    $('input[id=groupproc]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        var val = $(this).val();

        for (var d = 0; d < Processlist.length; d++) {
            if (Processlist[d].sno == val && Processlist[d].check == "true") {
                row.find('#groupproc').prop('checked', true);
            }
            else if (Processlist[d].sno == val && Processlist[d].check == "false") {
                row.find('#groupproc').prop('checked', false);
            }
        }
    });
}

function chkprodtn() {

    $('input[id=groupprodnt]').each(function () {
        debugger;
        var row = $(this).closest('tr');
        var val = $(this).val();

        for (var d = 0; d < prodntlist.length; d++) {
            if (prodntlist[d].sno == val && prodntlist[d].check == "true") {
                row.find('#groupprodnt').prop('checked', true);
            }
            else if (prodntlist[d].sno == val && prodntlist[d].check == "false") {
                row.find('#groupprodnt').prop('checked', false);
            }
        }
    });
}

function LoadBomdetEdit(ord, sty, itemid) {
    debugger;
    $.ajax({
        url: "/PlanningApproval/LoadBomdetEdit",
        data: JSON.stringify({ ordno: ord, styleid: sty, Itemid: itemid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Bomlist = result.Value;
            //Bomlist.sort(function (a, b) {
            //    return a.sno - b.sno;
            //});
            LoadBomTable(Bomlist);
            if (Bomlist.length > 0) {

                if (Bomlist[0].LockAcc == 0) {
                    $('#chklockAccessories').prop("checked", false);
                } else {
                    $('#chklockAccessories').prop("checked", true);
                }

                if (Bomlist[0].LockCon == 0) {
                    $('#chklockconsum').prop("checked", false);
                } else {
                    $('#chklockconsum').prop("checked", true);
                }
                if (Bomlist[0].LockFabric == 0) {
                    $('#chklockfabric').prop("checked", false);
                } else {
                    $('#chklockfabric').prop("checked", true);
                }

                if (Bomlist[0].LockPlanning == 0) {
                    $('#chklockplanning').prop("checked", false);
                } else {
                    $('#chklockplanning').prop("checked", true);
                }

                if (Bomlist[0].LockYarn == 0) {
                    $('#chklockyarn').prop("checked", false);
                } else {
                    $('#chklockyarn').prop("checked", true);
                }

                if (Bomlist[0].LockPrgSeq == 0) {
                    $('#chklockSeq').prop("checked", false);
                } else {
                    $('#chklockSeq').prop("checked", true);
                }
                if (Bomlist[0].LockOrder == "P") {
                    $('#chklockorder').prop("checked", false);
                } else {
                    $('#chklockorder').prop("checked", true);
                }
              
            }

            //Loadexchangerate();
            //var amnt = $('#txtstylerate').val();
            //var fin = $('#finper').val();

            //var res = parseFloat((fin * amnt) / 100);
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);
            //calcfinper();
            Calctotbom();
            //chkbom();
            //totcost();
        }
    });
}

function LoadProcessdetEdit(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadProcessdetEdit",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Processlist = result.Value;
            LoadProcessTable(Processlist);
            Calctotprocess();
            //chkprocess();

        }
    });
}

function LoadProductndetEdit(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadProdtundetEdit",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            prodntlist = result.Value;
            LoadProductionTable(prodntlist);
            Calctotprod();
            //chkprodtn();
        }
    });
}

function LoadCommdetEdit(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadCommdetEdit",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            commlist = result.Value;
            LoadCommercialTable(commlist);

        }
    });
}
function backtomain() {
    //$('#myModal2').hide();
    //$('#myModal2').modal('hide');
    window.location.href = "/PlanningApproval/PlanningApprovalIndex";
}

function ChkPOforbom(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadChkbom",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            listofbom = result.Value;

        }
    });
}
function ChkPOforproc(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadChkProcess",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            listofprocess = result.Value;

        }
    });
}

function ChkPOforprodord(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadChkProdutnOrd",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            listofprodord = result.Value;

        }
    });
}


function ChkPOforprod(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadChkprod",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            listofprod = result.Value;

        }
    });
}

function ChkPOforcut(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadChkCutting",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            listofcut = result.Value;

            if (listofbom.length > 0 || listofprocess.length > 0 || listofprodord.length > 0 || listofprod.length > 0 || listofcut.length > 0) {

                $('#btndelete').prop('disabled', true);
            }
        }
    });
}

function LoadPcsWt(ord, sty) {
    debugger;

    $.ajax({
        url: "/BudgetApproval/LoadpcsWt",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //var obj = result.Value;
            //$('#PcsWt').val(obj[0].pcswt);
        }
    });
}

function LoadBomdet(ord, sty, itmid) {
    debugger;
    $.ajax({
        url: "/PlanningApproval/LoadBomdet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Itemid: itmid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Bomlist = result.Value;
            LoadBomTable(Bomlist);
            Calctotbom();

        }
    });
}

function LoadProcessdet(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadProcessdet",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Processlist = result.Value;
            LoadProcessTable(Processlist);
            Calctotprocess();

        }
    });
}

function LoadProductndet(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadProdtundet",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            prodntlist = result.Value;
            LoadProductionTable(prodntlist);
            Calctotprod();

        }
    });
}

function LoadCommdet(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadCommdet",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            commlist = result.Value;
            LoadCommercialTable(commlist);
        }
    });
}

function Calctotbom() {
    //var totalamnt = 0;
    //for (var e = 0; e < Bomlist.length; e++) {
    //    var amount = Bomlist[e].amount;
    //    totalamnt = totalamnt + parseFloat(amount);

    //}


    //var totalrate = 0;
    //for (var e = 0; e < Bomlist.length; e++) {
    //    var rate = Bomlist[e].Rate;
    //    totalrate = totalrate + parseFloat(rate);

    //}

    var totalqty = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        var qty = Bomlist[e].Actual_Qty;
        totalqty = totalqty + parseFloat(qty);

    }

    //$('#txttotamntbom').val(totalamnt.toFixed(2));
    //$('#txttotratebom').val(totalrate.toFixed(2));
    $('#txttotqtybom').val(totalqty.toFixed(2));



    var totatcloth = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype == 'YARN' || Bomlist[e].Itmtype == 'FABRIC') {
            var at = Bomlist[e].amount;
            totatcloth = totatcloth + parseFloat(at);
        }
    }

    var totalamntproc = 0;
    for (var e = 0; e < Processlist.length; e++) {
        var amountpr = Processlist[e].amount;
        totalamntproc = totalamntproc + parseFloat(amountpr);

    }

    var totatbom = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype != 'YARN' && Bomlist[e].Itmtype != 'FABRIC') {
            var atbom = Bomlist[e].amount;
            totatbom = totatbom + parseFloat(atbom);
        }
    }
    var qty = $('#qnty').val();
    var bom = totatbom / qty;
    //$('#BOM').val(bom.toFixed(2));
    $('#BOM').val(totatbom.toFixed(2));


    //var cl = (totatcloth + totalamntproc) / qty;
    var cl = (totatcloth + totalamntproc);
    $('#Cloth').val(cl.toFixed(2));

}

function Calctotprocess() {
    var totalamnt = 0;
    for (var e = 0; e < Processlist.length; e++) {
        var amount = Processlist[e].amount;
        totalamnt = totalamnt + parseFloat(amount);

    }


    var totalrate = 0;
    for (var e = 0; e < Processlist.length; e++) {
        var rate = Processlist[e].Rate;
        totalrate = totalrate + parseFloat(rate);

    }

    var totalqty = 0;
    for (var e = 0; e < Processlist.length; e++) {
        var qty = Processlist[e].Quantity;
        totalqty = totalqty + parseFloat(qty);

    }

    $('#txttotamtproces').val(totalamnt.toFixed(2));
    $('#txttotrateproces').val(totalrate.toFixed(2));
    $('#txttotqtyproces').val(totalqty.toFixed(2));

    var totatcloth = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype == 'YARN' || Bomlist[e].Itmtype == 'FABRIC') {
            var at = Bomlist[e].amount;
            totatcloth = totatcloth + parseFloat(at);
        }
    }

    var qty = $('#qnty').val();
    var cl = (totatcloth + totalamnt) / qty;
    $('#Cloth').val(cl.toFixed(2));
}

function Calctotprod() {
    debugger;
    var totalamnt = 0;
    for (var e = 0; e < prodntlist.length; e++) {
        var amount = prodntlist[e].amount;
        totalamnt = totalamnt + parseFloat(amount);

    }
    var qty = $('#qnty').val();
    var cl = (totalamnt) / qty;

    var totalrate = 0;
    for (var e = 0; e < prodntlist.length; e++) {
        var rate = prodntlist[e].Rate;
        totalrate = totalrate + parseFloat(rate);

    }

    var totalqty = 0;
    for (var e = 0; e < prodntlist.length; e++) {
        var qty = prodntlist[e].Quantity;
        totalqty = totalqty + parseFloat(qty);

    }
    cl = cl.toFixed(2);
    $('#txttotamntprod').val(totalamnt.toFixed(2));
    $('#txttotrateprod').val(totalrate.toFixed(2));
    $('#txttotqtyprod').val(totalqty.toFixed(2));
    //$('#TxtProduction').val(cl);
    $('#TxtProduction').val(totalamnt.toFixed(2));
}

function totcost() {
    debugger;
    var cloth = ($('#Cloth').val() == "" ? 0 : $('#Cloth').val());
    var prod = ($('#TxtProduction').val() == "" ? 0 : $('#TxtProduction').val());
    var bom = ($('#BOM').val() == "" ? 0 : $('#BOM').val());
    var comm = ($('#Commercial').val() == "" ? 0 : $('#Commercial').val());

    var a = $('#cmcost').val() == "" ? 0 : $('#cmcost').val();
    var b = $('#finpervalue').val() == "" ? 0 : $('#finpervalue').val();
    var c = $('#gaficharges').val() == "" ? 0 : $('#gaficharges').val();
    var d = $('#markup').val() == "" ? 0 : $('#markup').val();
    var e = $('#qizcharges').val() == "" ? 0 : $('#qizcharges').val();

    var rscost = parseFloat(cloth) + parseFloat(prod) + parseFloat(bom) + parseFloat(comm);


    var rup = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(rscost);
    var tot = $('#Total').val(rup.toFixed(2));

    var pr = $('#Value').val() == "" ? 0 : $('#Value').val();

    var net = parseFloat(rup) + parseFloat(pr);
    var qty = $('#txtshiprate').val();
    $('#NetAmount').val(net.toFixed(2));

    var tv = rup / qty;
    tv = tv.toFixed(3);
    $('#TotalValue').val(tv);

    var tt = rup / qty;
    var ex = $('#exchange').val();
    var res = parseFloat(tt * ex).toFixed(2);
    $('#INR').val(res);
}

function calcfinper() {
    debugger;
    //var totalamnt = 0;

    //if (Bomlist.length > 0) {
    //    $.each(Bomlist, function (h) {

    //        var amount = Bomlist[h].amount;
    //        totalamnt = totalamnt + parseFloat(amount);

    //    });
    //}

    var amnt = $('#txtstylerate').val();
    var fin = $('#finper').val();

    var res = parseFloat((fin * amnt) / 100);
    res = res.toFixed(4);
    $('#finpervalue').val(res);
    calcmarkup();
}
function calcmarkup() {
    debugger;

    var a = $('#cmcost').val() == "" ? 0 : $('#cmcost').val();
    var b = $('#finpervalue').val() == "" ? 0 : $('#finpervalue').val();
    var c = $('#gaficharges').val() == "" ? 0 : $('#gaficharges').val();

    var d = $('#Cloth').val() == "" ? 0 : $('#Cloth').val();
    var e = $('#TxtProduction').val() == "" ? 0 : $('#TxtProduction').val();
    var f = $('#BOM').val() == "" ? 0 : $('#BOM').val();
    var g = $('#Commercial').val() == "" ? 0 : $('#Commercial').val();
    var i = $('#qizcharges').val() == "" ? 0 : $('#qizcharges').val();

    var tt = $('#txtstylerate').val();

    var res = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(f) + parseFloat(g) + parseFloat(i);
    var mrkup = parseFloat(tt - res);
    mrkup = mrkup.toFixed(4);
    $('#markup').val(mrkup);
    totcost();
}

function calcvalues(val) {
    debugger;
    var tot = $('#Total').val();
    var pr = (val * tot) / 100;
    $('#Value').val(pr);
    var io = parseFloat(tot) + parseFloat(pr);
    $('#NetAmount').val(io.toFixed(3));
}


function calcsp(val) {
    debugger;
    //var nt = $('#NetAmount').val();
    //var value2 = parseFloat(val) - parseFloat(nt);

    //$('#PrfValue').val(value2.toFixed(2));

    //var sp = $('#SalePrice').val();
    //var prf = (value2 * 100) / sp;
    //$('#txtProfit').val(prf.toFixed(2));

    var sp = $('#SalePrice').val();
    var db = $('#Drawback').val();
    var val1 = db / sp;
    $('#DrwValue').val(val1.toFixed(3));
    var rps = $('#INR').val();
    var value2 = sp - rps;
    $('#PrfValue').val(value2.toFixed(3));
    var profit = (value2 * 100) / sp;
    $('#txtProfit').val(profit.toFixed(3));
}

function calcdrwbck(val) {
    debugger;
    //var prf = $('#txtProfit').val();
    //var tt = parseFloat(prf) + parseFloat(val);
    //$('#txtProfit').val(tt.toFixed(2));

    //var sp = $('#SalePrice').val();
    //var value1 = (val * sp) / 100;
    //$('#DrwValue').val(value1.toFixed(2));

    //var nt = $('#NetAmount').val();
    //var value2 = sp + value1 - nt;
    //$('#PrfValue').val(value2.toFixed(2));
    //var profit= (value2 * 100) / sp;
    //$('#txtProfit').val(profit.toFixed(2));


    var db = $('#Drawback').val();
    var proft = $('#txtProfit').val();
    var sp = $('#SalePrice').val();
    var rps = $('#INR').val();


    var val1 = parseFloat((db * sp) / 100);
    $('#DrwValue').val(val1.toFixed(3));

    var val2 = (sp + val1) - rps;
    $('#PrfValue').val(value2.toFixed(3));

    var profit = (val2 * 100) / sp;
    $('#txtProfit').val(profit.toFixed(3));
}
function profitentry(val) {
    debugger;
    var sp = $('#SalePrice').val();
    var nt = $('#NetAmount').val();
    //var value2 = parseFloat(sp) - parseFloat(nt);

    //$('#PrfValue').val(value2.toFixed(2));
}

function LoadBomTable(list) {

    $('#bomtable').DataTable().destroy();

    $('#bomtable').DataTable({
        data: list,
        scrollY: 200,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (data.PoRate > "0") {
                $('td', row).css('background-color', '#FCF3CF');

            }
            //else if (data[6] == "4")
            //{
            //    //$('td', row).css('background-color', 'Orange');
            //}
        },
        columns: [

                   { title: "ItemId", data: "Itemid", "visible": false },
                   { title: "Item", data: "Item" },
                   { title: "Plan Type", data: "Plan_Type" },
                   { title: "Mode", data: "Apply_Type" },
                     { title: "Quantity", data: "Actual_Qty" },
                      { title: "Uom", data: "uom" },
                   {
                       title: "Apply", data: "sno",
                       render: function (data, type, row) {
                           if (row.IsApproved == 'A') {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  checked value=' + data + ' >';
                           }

                           else {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                           }


                       }
                   },

        ]

    });

}

function LoadProcessTable(list) {

    $('#processtable').DataTable().destroy();

    $('#processtable').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (data.Actual_Rate > "0") {
                $('td', row).css('background-color', '#FCF3CF');

            }
        },
        columns: [
                   { title: "SNo", data: "sno", "visible": false },
                   { title: "ItemId", data: "Itemid", "visible": false },
                      { title: "Process", data: "process" },
                   { title: "Item", data: "Item" },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data) {

                           return '<input type="text" id="txtrateprocess" class="calcRateProcess form-control"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                       },
                   },
                   { title: "Quantity", data: "Quantity" },
                   { title: "Amount", data: "amount" },
                   {
                       title: "Apply", data: "sno",
                       render: function (data, type, row) {
                           if ((row.check == 'true' || row.check == true) && row.Actual_Rate > 0) {
                               return '<input type="checkbox" id="groupproc" checked disabled value=' + data + ' >';
                           }
                           else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
                               return '<input type="checkbox" id="groupproc" checked value=' + data + ' >';
                           }
                           else {
                               return '<input type="checkbox" id="groupproc" unchecked value=' + data + ' >';

                           }
                       }
                   },

        ]

    });

}


function LoadProductionTable(list) {

    $('#productiontable').DataTable().destroy();

    $('#productiontable').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [
                   { title: "SNo", data: "sno", "visible": false },
                   { title: "ItemId", data: "Itemid", "visible": false },
                     { title: "Process", data: "process" },
                   { title: "Item", data: "Item" },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data) {

                           return '<input type="text" id="txtrateprodtn" class="calcRateProduction form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Quantity", data: "Quantity" },
                   { title: "Amount", data: "amount" },
                   {
                       title: "Apply", data: "sno",
                       render: function (data, type, row) {
                           if ((row.check == 'true' || row.check == true) && row.Actual_Rate > 0) {
                               return '<input type="checkbox" id="groupprodnt" checked disabled value=' + data + ' >';
                           }
                           else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
                               return '<input type="checkbox" id="groupprodnt" checked value=' + data + ' >';
                           }
                           else {
                               return '<input type="checkbox" id="groupprodnt" unchecked value=' + data + ' >';

                           }
                       }
                   },

        ]

    });

}

$(document).ready(function () {
    $("#bomtable ").dataTable().find("tbody").on('click', 'tr', function () {
        bomindex = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#processtable ").dataTable().find("tbody").on('click', 'tr', function () {
        processindex = (this.rowIndex) - 1;
    });
});

$(document).ready(function () {
    $("#productiontable ").dataTable().find("tbody").on('click', 'tr', function () {
        prodindex = (this.rowIndex) - 1;
    });
});


function LoadCommercialTable(list) {

    $('#commercialtable').DataTable().destroy();

    $('#commercialtable').DataTable({
        data: list,
        columns: [
                   { title: "SNo", data: "Particularid", "visible": false },
                   { title: "Description", data: "CostType" },
                   { title: "Cost", data: "Cost" },
                   { title: "Value", data: "Cost" },
                   { title: "Cost/Piece", data: "Value" },


        ]

    });

}


function Add() {
    debugger;
    var list = [];

    for (var j = 0; j < Bomlist.length; j++) {
        //if (Bomlist[j].IsApproved == "A") {
            list.push(Bomlist[j]);
        //}
    }


    //for (var j = 0; j < Processlist.length; j++) {
    //    if (Processlist[j].check == true || Processlist[j].check == "true") {
    //        list.push(Processlist[j]);
    //    }
    //}

    //for (var j = 0; j < prodntlist.length; j++) {
    //    if (prodntlist[j].check == true || prodntlist[j].check == "true") {
    //        list.push(prodntlist[j]);
    //    }
    //}

    if (list.length == 0) {
        //alert('Please select checkboxes..');
        //return true;
    }


    var ChkLockSeq = 0;
    var ChkLockOrder = 0;
    var ChkLockPlann = 0;
    var ChkLockCon = 0;
    var ChkLockFabric = 0;
    var ChkLockYarn = 0;
    var ChkLockAcc = 0;



    var isChkLockSeqchecked = false;
    isChkLockSeqchecked = $('#chklockSeq').is(":checked");
    if (isChkLockSeqchecked == true) {
        ChkLockSeq = true;
    } else {
        ChkLockSeq = false;
    }

    var isChkLockOrderChecked = false;
    isChkLockOrderChecked = $('#chklockorder').is(":checked");
    if (isChkLockOrderChecked == true) {
        ChkLockOrder = "A";
    } else {
        ChkLockOrder = "P";
    }

    var isChkLockPlannchecked = false;
    isChkLockPlannchecked = $('#chklockplanning').is(":checked");
    if (isChkLockPlannchecked == true) {
        ChkLockPlann = true;
    } else {
        ChkLockPlann = false;
    }

    var IsChkLockConchecked = false;
    IsChkLockConchecked = $('#chklockconsum').is(":checked");
    if (IsChkLockConchecked == true) {
        ChkLockCon = 1;
    } else {
        ChkLockCon = 0;
    }

    var IsChkLockFabricchecked = false;
    IsChkLockFabricchecked = $('#chklockfabric').is(":checked");
    if (IsChkLockFabricchecked == true) {
        ChkLockFabric = 1;
    } else {
        ChkLockFabric = 0;
    }

    var IsChkLockYarnchecked = false;
    IsChkLockYarnchecked = $('#chklockyarn').is(":checked");
    if (IsChkLockYarnchecked == true) {
        ChkLockYarn = 1;
    } else {
        ChkLockYarn = 0;
    }


    var IsChkLockAccchecked = false;
    IsChkLockAccchecked = $('#chklockAccessories').is(":checked");
    if (IsChkLockAccchecked == true) {
        ChkLockAcc = 1;
    } else {
        ChkLockAcc = 0;
    }

    var det = [];
    for (var e = 0; e < list.length; e++) {
        //det[e].Cost_defn_bom_firstid=list[e].
        var objdet = {
            Itemid: list[e].Itemid,
            AccreqId: list[e].AccreqId,
            AppDate: list[e].AppDate,
            IsApproved: list[e].IsApproved,


            MLockOrder: ChkLockOrder,
            MLockPrgSeq: ChkLockSeq,
            MLockPlanning: ChkLockPlann,
            MLockFabric: ChkLockFabric,
            MLockYarn: ChkLockYarn,
            MLockAcc: ChkLockAcc,
            MLockCon: ChkLockCon,
            orderno: $('#Ordernum').val(),
            styleid: styleid,

        }
        det.push(objdet);
    }
    var Astyleid = 0;
    if (styleid == 0) {
        Astyleid = GEstyleid;
    } else {
        Astyleid = styleid;
    }

    var Obj = {

        MLockOrder: ChkLockOrder,
        MLockPrgSeq: ChkLockSeq,
        MLockPlanning: ChkLockPlann,
        MLockFabric: ChkLockFabric,
        MLockYarn: ChkLockYarn,
        MLockAcc: ChkLockAcc,
        MLockCon: ChkLockCon,
        orderno: $('#Ordernum').val(),
        styleid: Astyleid,

        PlanningBomDet: det
    }
    $("#btnUpd").attr("disabled", true);
    $("#btnsave").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PlanningApproval/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                alert('Data Saved Successfully');
                window.location.href = "/PlanningApproval/PlanningApprovalIndex";
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function Update() {
    debugger;
    var list = [];

    //for (var j = 0; j < Bomlist.length; j++) {
    //    if (Bomlist[j].check == "true" || Bomlist[j].check == true) {
    //        list.push(Bomlist[j]);
    //    }
    //}


    //for (var j = 0; j < Processlist.length; j++) {
    //    if (Processlist[j].check == "true" || Processlist[j].check == true) {
    //        list.push(Processlist[j]);
    //    }
    //}

    //for (var j = 0; j < prodntlist.length; j++) {
    //    if (prodntlist[j].check == "true" || prodntlist[j].check == true) {
    //        list.push(prodntlist[j]);
    //    }
    //}

    for (var j = 0; j < Bomlist.length; j++) {
        if (Bomlist[j].check == "true" || Bomlist[j].check == true) {
        }
        else if (Bomlist[j].check == "false" || Bomlist[j].check == false) {
            Bomlist[j].Rate = 0;
            Bomlist[j].Quantity = 0;

        }
        list.push(Bomlist[j]);
    }


    for (var j = 0; j < Processlist.length; j++) {
        if (Processlist[j].check == "true" || Processlist[j].check == true) {
        }
        else if (Processlist[j].check == "false" || Processlist[j].check == false) {
            Processlist[j].Rate = 0;
            Processlist[j].Quantity = 0;
        }
        list.push(Processlist[j]);
    }

    for (var j = 0; j < prodntlist.length; j++) {
        if (prodntlist[j].check == "true" || prodntlist[j].check == true) {
        }
        else if (prodntlist[j].check == "false" || prodntlist[j].check == false) {
            prodntlist[j].Rate = 0;
            prodntlist[j].Quantity = 0;

        }
        list.push(prodntlist[j]);
    }

    var det = [];
    for (var e = 0; e < list.length; e++) {
        //det[e].Cost_defn_bom_firstid=list[e].
        var objdet = {
            Cost_Defn_id: list[e].Cost_Defn_id,
            Cost_Defn_BOMid: list[e].Cost_Defn_BOMid,
            Processid: list[e].Processid,
            Itemid: list[e].Itemid,
            ColorID: list[e].Colorid,
            SizeID: list[e].Sizeid,
            Quantity: list[e].Quantity,
            Rate: list[e].Rate,
            Cost_defn_bom_firstid: list[e].Cost_defn_bom_firstid,
            //det[e].UOMID=list[e].Cost_Defn_id;
            //det[e].Access_Type=list[e].Cost_Defn_id;
            //Actual_Qty: list[e].Actual_Qty,
            //Actual_Rate: list[e].Actual_Rate,
            Actual_Qty: 0,
            Actual_Rate: 0,
            //det[e].CurrencyId=list[e].Cost_Defn_id;
            ExRate: 0.00,
            CurrencyRate: list[e].CurrencyRate,
            AppRate: list[e].Rate,
            AppCurrencyRate: 0.00,
            //det[e].DisplayOption=list[e].Cost_Defn_id;
            AppQty: list[e].Quantity,
            //lUpdateDate: date
            Access_Type: list[e].Access_Type,

            Profitper: $('#Profit').val(),
            CostArrive: $('#Ordernum').val(),
            sale_prf_per: $('#txtProfit').val(),
            pcswt: $('#PcsWt').val(),
            Order_No: $('#Ordernum').val(),
            styleid: styleid,
            SalePrice: $('#SalePrice').val(),
            sale_Profit: $('#txtProfit').val(),
            Drawback_Percent: $('#Drawback').val(),
            ExRate: $('#exchange').val(),
            CurrencyId: $('#ddlCurrency').val(),
            CMCost: $('#cmcost').val(),
            FinPer: $('#finper').val(),
            MarkUpvalue: $('#markup').val(),
            Gaficharges: $('#gaficharges').val(),
            Qizcharges: $('#qizcharges').val(),
        }
        det.push(objdet);
    }

    var Obj = {

        Listofbomfirst: det
    }
    $("#btnUpd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BudgetApproval/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                alert('Data Updated Successfully');
                window.location.href = "/BudgetApproval/BudgetApprovalIndex";
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}


function Revert() {
    debugger;
    var list = [];

    for (var j = 0; j < Bomlist.length; j++) {
        //if (Bomlist[j].check == "true" || Bomlist[j].check == true) {
        //    list.push(Bomlist[j]);
        //}
        if (Bomlist[j].check == "true" || Bomlist[j].check == true) {
        }
        else if (Bomlist[j].check == "false" || Bomlist[j].check == false) {
            Bomlist[j].AppRate = 0;
            Bomlist[j].AppQty = 0;

        }
        list.push(Bomlist[j]);
    }


    for (var j = 0; j < Processlist.length; j++) {
        //if (Processlist[j].check == "true" || Processlist[j].check == true) {
        //    list.push(Processlist[j]);
        //}
        if (Processlist[j].check == "true" || Processlist[j].check == true) {
        }
        else if (Processlist[j].check == "false" || Processlist[j].check == false) {
            Processlist[j].AppRate = 0;
            Processlist[j].AppQty = 0;
        }
        list.push(Processlist[j]);
    }

    for (var j = 0; j < prodntlist.length; j++) {
        //if (prodntlist[j].check == "true" || prodntlist[j].check == true) {
        //    list.push(prodntlist[j]);
        //}
        if (prodntlist[j].check == "true" || prodntlist[j].check == true) {
        }
        else if (prodntlist[j].check == "false" || prodntlist[j].check == false) {
            prodntlist[j].AppRate = 0;
            prodntlist[j].AppQty = 0;

        }
        list.push(prodntlist[j]);
    }

    var det = [];
    for (var e = 0; e < list.length; e++) {
        //det[e].Cost_defn_bom_firstid=list[e].
        var objdet = {
            Cost_Defn_id: list[e].Cost_Defn_id,
            Cost_Defn_BOMid: list[e].Cost_Defn_BOMid,
            Processid: list[e].Processid,
            Itemid: list[e].Itemid,
            ColorID: list[e].Colorid,
            SizeID: list[e].Sizeid,
            Quantity: list[e].Quantity,
            Rate: list[e].Rate,
            //det[e].UOMID=list[e].Cost_Defn_id;
            //det[e].Access_Type=list[e].Cost_Defn_id;
            //Actual_Qty: list[e].Actual_Qty,
            //Actual_Rate: list[e].Actual_Rate,
            Actual_Qty: 0,
            Actual_Rate: 0,
            Access_Type: list[e].Access_Type,
            //det[e].CurrencyId=list[e].Cost_Defn_id;
            ExRate: 0.00,
            CurrencyRate: 0.00,
            AppRate: list[e].Rate,
            AppCurrencyRate: 0.00,
            //det[e].DisplayOption=list[e].Cost_Defn_id;
            AppQty: list[e].Quantity,
            //lUpdateDate: date
        }
        det.push(objdet);
    }

    var Obj = {

        Listofbomfirst: det
    }
    $("#btndelete").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BudgetApproval/Revert",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == true) {

                alert('Data Reverted Successfully');
                window.location.href = "/BudgetApproval/BudgetApprovalIndex";
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function LoadPreOrderDetails(itemid, sizeid, colorid) {

    $.ajax({
        url: "/PurchaseOrderMain/LoadPreOrderdet",
        data: JSON.stringify({ Itemid: itemid, Sizeid: sizeid, Colorid: colorid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var ord = "";
            var ref = "";
            var sty = "";
            var sup = "";
            var rate = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].OrderNo;
                var re = obj[t].RefNo;
                var st = obj[t].Style;
                var su = obj[t].Supplier;
                var rt = obj[t].PreRate;
                if (ord == '') {
                    ord = od;
                }
                else {
                    ord = ord + "," + od;
                }

                if (ref == '') {
                    ref = re;
                }
                else {
                    ref = ref + "," + re;
                }

                if (sty == '') {
                    sty = st;
                }
                else {
                    sty = sty + "," + st;
                }

                if (sup == '') {
                    sup = su;
                }
                else {
                    sup = sup + "," + su;
                }

                if (rate == '') {
                    rate = rt;
                }
                else {
                    rate = rate + "," + rt;
                }
            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            $('#txtmainstyle').val(sty);
            $('#txtsupplier').val(sup);
            $('#txtPrerate').val(rate);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadPreProcessDetails(Processid, itemid, sizeid, colorid) {

    $.ajax({
        url: "/Budget/GetPreProcessdet",
        data: JSON.stringify({ Proessid: Processid, Itemid: itemid, sizeid: sizeid, Colorid: colorid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result;

            var ord = "";
            var ref = "";
            var sty = "";
            var sup = "";
            var rate = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].Orderno;
                var re = obj[t].refno;
                var st = obj[t].style;
                var su = obj[t].Supplier;
                var rt = obj[t].rate;
                if (ord == '') {
                    ord = od;
                }
                else {
                    ord = ord + "," + od;
                }

                if (ref == '') {
                    ref = re;
                }
                else {
                    ref = ref + "," + re;
                }

                if (sty == '') {
                    sty = st;
                }
                else {
                    sty = sty + "," + st;
                }

                if (sup == '') {
                    sup = su;
                }
                else {
                    sup = sup + "," + su;
                }

                if (rate == '') {
                    rate = rt;
                }
                else {
                    rate = rate + "," + rt;
                }
            }
            $('#txtmainOrdno2').val(ord);
            $('#txtmainrefno2').val(ref);
            $('#txtmainstyle2').val(sty);
            $('#txtsupplier2').val(sup);
            $('#txtPrerate2').val(rate);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}