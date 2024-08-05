var Mainlist = [];
var Bomlist = [];
var Processlist = [];
var prodntlist = [];
var commlist = [];
var Type = '';
var bomindex = -1;
var processindex = -1;
var prodindex = -1;
var prodDetindex = -1;
var date = '';
var listofbom = [];
var listofprocess = [];
var listofprodord = [];
var listofprod = [];
var listofcut = [];
var styleid = 0;
var MainFDate = 0;
var DCompid = 0;
var GUom = '';
var Guserid = 0;
var BomSno = 0;
var ProSno = 0;
var DcurrencyDecimal = 2;
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    Guserid = $("#hdnUserid").data('value');
    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadStyleDDL("#ddlMStyle");
    LoadCurrencyDDL("#ddlCurrency");
    DCompid = $("#hdnDCompid").data('value');
    loadDefaultCurrDeciaml();
    ddlmain();


    var fill = localStorage.getItem('BudgetApprovalFilter');
    if (fill != "null" && fill != null) {
        LoadMaingridFromBack();
    } else {
        LoadMaingrid();
    }

    $("#QizStatus").click(function () {
        debugger;
        $('#QizStatus input[type="checkbox"]').prop('checked', this.checked);
        if (this.checked == true) {
            var res = $('#txtstylerate').val();

            var resq = parseFloat((4 * res) / 100);
            resq = resq.toFixed(DcurrencyDecimal);
            $('#qizcharges').val(resq);
        }
        else {
            $('#qizcharges').val(0);
        }
        calcmarkup();
    });


    $("#checkallbom").click(function () {
        debugger;
      //  $('#bomtable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < Bomlist.length; d++) {
            if (this.checked == true) {

                if (Bomlist[d].PoRate == 0) {
                    Bomlist[d].check = true;
                }
            }
            else {
                if (Bomlist[d].PoRate == 0) {
                    Bomlist[d].check = false;
                }
            }
        }

        LoadBomTable(Bomlist);

    });

    $("#checkallbomlock").click(function () {
        debugger;
        //  $('#bomtable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < Bomlist.length; d++) {
            if (this.checked == true) {

                if ((Bomlist[d].Itmtype == 'YARN' || Bomlist[d].Itmtype == 'FABRIC')) {
                    Bomlist[d].Lock = false;
                } else {
                    Bomlist[d].Lock = true;
                }
              
            }
            else {
                    Bomlist[d].Lock = false;
            }
        }

        LoadBomTable(Bomlist);

    });


    $("#checkallprocess").click(function () {
        debugger;
       // $('#processtable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < Processlist.length; d++) {
            if (this.checked == true) {
                if (Processlist[d].Actual_Rate == 0) {
                    Processlist[d].check = true;
                }
            }
            else {
                if (Processlist[d].Actual_Rate == 0) {
                    Processlist[d].check = false;
                }
            }
        }
        LoadProcessTable(Processlist);
    });

    $("#checkallprocesslock").click(function () {
        debugger;
        // $('#processtable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < Processlist.length; d++) {
            if (this.checked == true) {
               
                    Processlist[d].Lock = true;
               
            }
            else {
                
                    Processlist[d].Lock = false;
               
            }
        }
        LoadProcessTable(Processlist);
    });


    $("#checkallprod").click(function () {
        debugger;
       // $('#productiontable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < prodntlist.length; d++) {
            if (this.checked == true) {
                prodntlist[d].check = true;
            }
            else {
                prodntlist[d].check = false;
            }
        }
        prodctnitem(prodntlist);

    });

    $("#checkallprodlock").click(function () {
        debugger;
       // $('#productiontable input[type="checkbox"]').prop('checked', this.checked);

        for (var d = 0; d < prodntlist.length; d++) {
            if (this.checked == true) {
                prodntlist[d].Lock = true;
            }
            else {
                prodntlist[d].Lock = false;
            }
        }
        prodctnitem(prodntlist);

    });


    $("#bomtable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Bomlist.length; d++) {
                    if (Bomlist[d].sno == val) {
                        Bomlist[d].check = true;
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

                        Bomlist[d].check = false;
                    }

                }
            }

        });


        $('input[id=groupbomlock]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Bomlist.length; d++) {
                    if (Bomlist[d].sno == val) {
                        Bomlist[d].Lock = true;
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

                        Bomlist[d].Lock = false;
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


        $('input[id=groupproclock]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Processlist.length; d++) {
                    if (Processlist[d].sno == val) {
                        Processlist[d].Lock = true;
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
                        Processlist[d].Lock = false;
                    }

                }
            }

        });


    });

    $("#productiontable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupprodnt]').each(function () {
            var row = $(this).closest('tr');

            var table = $('#productiontable').DataTable();
            var Prid = table.row($(this).parents('tr')).data()["Processid"];
            var Fstrt = table.row($(this).parents('tr')).data()["FirstRate"];

            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < prodntlist.length; d++) {
                    if (prodntlist[d].Processid == Prid && prodntlist[d].FirstRate == Fstrt) {
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
                    if (prodntlist[d].Processid == Prid && prodntlist[d].FirstRate == Fstrt) {
                        prodntlist[d].check = false;
                    }

                }
            }

        });


        $('input[id=groupprodntlock]').each(function () {
            var row = $(this).closest('tr');

            var table = $('#productiontable').DataTable();
            var Prid = table.row($(this).parents('tr')).data()["Processid"];
            var Fstrt = table.row($(this).parents('tr')).data()["FirstRate"];

            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < prodntlist.length; d++) {
                    if (prodntlist[d].Processid == Prid && prodntlist[d].FirstRate == Fstrt) {
                        prodntlist[d].Lock = true;
                    }
                    //else {
                    //    prodntlist[d].check = false;
                    //}
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < prodntlist.length; d++) {
                    if (prodntlist[d].Processid == Prid && prodntlist[d].FirstRate == Fstrt) {
                        prodntlist[d].Lock = false;
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
        var table = $('#bomtable').DataTable();
         var PId = table.row($(this).parents('tr')).data()["sno"];
         BomSno = PId;

    });
   

    //$(document).on('keyup', '.calcRateBom', function () {
    //    debugger;

    //    var table = $('#bomtable').DataTable();
    //    var PId = table.row($(this).parents('tr')).data()["sno"];
    //    var rate = table.row($(this).parents('tr')).data()["Rate"];
    //    //var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
    //    var apprate = table.row($(this).parents('tr')).data()["PoRate"];
    //    var qty = table.row($(this).parents('tr')).data()["Quantity"];

    //    var val = $(this).val();

    //    if (apprate > 0 && val < apprate) {
    //        alert('Po is made...Cant reduce the rate...');
    //        //LoadBomTable(Bomlist);
    //        var table = $('#bomtable').DataTable();
    //        var ecdata = table.rows().data();
           
    //        $('input[id=txtratebom]').each(function (ig) {
    //            var row = $(this).closest('tr');
    //            for (var h = 0; h < Bomlist.length; h++) {
    //                if (ecdata[ig].sno == Bomlist[h].sno) {
    //                    var Rate = Bomlist[h].Rate;
    //                    row.find('#txtratebom').val(Rate);
    //                }
    //            }
    //        });
    //        Calctotbom();

    //        //var rows = $("#bomtable").dataTable().fnGetNodes();
    //        //var dtTable = $('#bomtable').DataTable();
    //        //for (var i = 0; i < rows.length; i++) {
    //        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
    //        //    $('input[id=txtratebom]').each(function () {
    //        //        if (sn == PId) {
    //        //            var row = $(this).closest('tr');
    //        //            var num = row.find('#txtratebom').val();
    //        //            row.find('#txtratebom').focus().val('').val(num);
    //        //           // return true;
    //        //        }
    //        //    });
    //        //}

    //        var table = $('#bomtable').DataTable();
    //        var ecdata = table.rows().data();
    //        $('input[id=txtratebom]').each(function (ig) {
    //            var row = $(this).closest('tr');
    //                if (ecdata[ig].sno == PId) {       
    //                    var num = row.find('#txtratebom').val();
    //                    row.find('#txtratebom').focus().val('').val(num);
    //                }
    //        });
    //        return true;
    //    }

    //    $.each(Bomlist, function () {
    //        if (this.sno == PId) {
    //            this.Rate = val;
    //        }
    //    });
    //    var cal = val * qty;
    //    cal = cal.toFixed(2);
    //    $.each(Bomlist, function () {
    //        if (this.sno == PId) {
    //            this.amount = cal;
    //        }
    //    });
    //    LoadBomTable(Bomlist);
    //    var table = $('#bomtable').DataTable();
    //    var ecdata = table.rows().data();
    //    debugger;
    //    $('input[id=txtratebom]').each(function (ig) {
    //        var row = $(this).closest('tr');
    //        for (var h = 0; h < Bomlist.length; h++) {
    //            if (ecdata[ig].sno == Bomlist[h].sno) {
    //                var Rate = Bomlist[h].Rate;
    //                row.find('#txtratebom').val(Rate);
    //            }
    //        }
    //    });

    //    Calctotbom();

    //    //var rows = $("#bomtable").dataTable().fnGetNodes();
    //    //var dtTable = $('#bomtable').DataTable();
    //    //for (var i = 0; i < rows.length; i++) {
    //    //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
    //    //    $('input[id=txtratebom]').each(function () {
    //    //        if (sn == PId && $(this).val() == val) {
    //    //            var row = $(this).closest('tr');
    //    //            var num = row.find('#txtratebom').val();
    //    //            row.find('#txtratebom').focus().val('').val(num);
    //    //            return true;
    //    //        }
    //    //    });
    //    //}
    //});


    $(document).on('keyup', '.calcRateProcess', function () {

        var table = $('#processtable').DataTable();
        var PId = table.row($(this).parents('tr')).data()["sno"];
        ProSno = PId;
    });


    //$(document).on('keyup', '.calcRateProcess', function () {
    //    debugger;


    //    var table = $('#processtable').DataTable();
    //    var PId = table.row($(this).parents('tr')).data()["sno"];
    //    var rate = table.row($(this).parents('tr')).data()["Rate"];
    //    var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
    //    var qty = table.row($(this).parents('tr')).data()["Quantity"];

    //    var val = $(this).val();

    //    if (apprate > 0 && val < apprate) {
    //        alert('Process Dc is made...Cant reduce the rate...');
    //       // LoadProcessTable(Processlist);
    //        var table = $('#processtable').DataTable();
    //        var ecdata = table.rows().data();

    //        $('input[id=txtrateprocess]').each(function (ig) {
    //            var row = $(this).closest('tr');
    //            for (var h = 0; h < Processlist.length; h++) {
    //                if (ecdata[ig].sno == Processlist[h].sno) {
    //                    var Rate = Processlist[h].Rate;
    //                    row.find('#txtrateprocess').val(Rate);
    //                }
    //            }
    //        });
    //        Calctotprocess();

    //        //var rows = $("#processtable").dataTable().fnGetNodes();
    //        //var dtTable = $('#processtable').DataTable();
    //        //for (var i = 0; i < rows.length; i++) {
    //        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
    //        //    $('input[id=txtrateprocess]').each(function () {
    //        //        if (sn == PId) {
    //        //            var row = $(this).closest('tr');
    //        //            var num = row.find('#txtrateprocess').val();
    //        //            row.find('#txtrateprocess').focus().val('').val(num);
    //        //            return true;
    //        //        }
    //        //    });
    //        //}

    //        var table = $('#processtable').DataTable();
    //        var ecdata = table.rows().data();
    //        $('input[id=txtrateprocess]').each(function (ig) {
    //            var row = $(this).closest('tr');
    //            if (ecdata[ig].sno == PId) {
    //                var num = row.find('#txtrateprocess').val();
    //                row.find('#txtrateprocess').focus().val('').val(num);
    //            }
    //        });

    //        return true;
    //    }
    //    $.each(Processlist, function () {
    //        if (this.sno == PId) {
    //            this.Rate = val;
    //        }
    //    });
    //    var cal = val * qty;
    //    cal = cal.toFixed(2);
    //    $.each(Processlist, function () {
    //        if (this.sno == PId) {
    //            this.amount = cal;
    //        }
    //    });
    //     LoadProcessTable(Processlist);
    //    var table = $('#processtable').DataTable();
    //    var ecdata = table.rows().data();

    //    $('input[id=txtrateprocess]').each(function (ig) {
    //        var row = $(this).closest('tr');
    //        for (var h = 0; h < Processlist.length; h++) {
    //            if (ecdata[ig].sno == Processlist[h].sno) {
    //                var Rate = Processlist[h].Rate;
    //                row.find('#txtrateprocess').val(Rate);
    //            }
    //        }
    //    });

    //    Calctotprocess();
    //    //var rows = $("#processtable").dataTable().fnGetNodes();
    //    //var dtTable = $('#processtable').DataTable();
    //    //for (var i = 0; i < rows.length; i++) {
    //    //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
    //    //    $('input[id=txtrateprocess]').each(function () {
    //    //        if (sn == PId && $(this).val() == val) {
    //    //            var row = $(this).closest('tr');
    //    //            var num = row.find('#txtrateprocess').val();
    //    //            row.find('#txtrateprocess').focus().val('').val(num);
    //    //            return true;
    //    //        }
    //    //    });
    //    //}
    //    var table = $('#processtable').DataTable();
    //    var ecdata = table.rows().data();
    //    $('input[id=txtrateprocess]').each(function (ig) {
    //        var row = $(this).closest('tr');
    //        if (ecdata[ig].sno == PId) {
    //            var num = row.find('#txtrateprocess').val();
    //            row.find('#txtrateprocess').focus().val('').val(num);
    //        }
    //    });

    //    return true;
    //});

    $(document).on('change', '.calcRateProduction', function () {
        debugger;

        var table = $('#productiontable').DataTable();
        var PId = table.row($(this).parents('tr')).data()["sno"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
        var qty = table.row($(this).parents('tr')).data()["Quantity"];
        var Prid = table.row($(this).parents('tr')).data()["Processid"];
        var Fstrt = table.row($(this).parents('tr')).data()["FirstRate"];

        var val = $(this).val();

        
        if (apprate > 0 && val < apprate) {
            //alert('GRN is made...Cant reduce the rate...');
            var msg = 'GRN is made...Cant reduce the rate...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            // LoadProductionTable(prodntlist);
            prodctnitem(prodntlist);
            Calctotprod();
            val = apprate;
            //var rows = $("#productiontable").dataTable().fnGetNodes();
            //var dtTable = $('#productiontable').DataTable();
            //for (var i = 0; i < rows.length; i++) {
            //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            //    $('input[id=txtrateprodtn]').each(function () {
            //        if (sn == PId) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtrateprodtn').val();
            //            row.find('#txtrateprodtn').focus().val('').val(num);
            //            return true;
            //        }
            //    });
            //}

            var otable = $('#productiontable').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtrateprodtn]').each(function (ig) {
                if (odata[ig].Processid == Prid && odata[ig].FirstRate == Fstrt) {
                    var row = $(this).closest('tr');
                    // row.find('#txtOpOrdQty').val(totalamnt);
                    row.find('#txtrateprodtn').focus().val('').val(val);
                }
            });
            return true;
        }
        $.each(prodntlist, function () {
            if (this.Processid == Prid && this.FirstRate == Fstrt) {
                this.Rate = val;
            }
        });
        //var cal = val * qty;
        //cal = cal.toFixed(2);
        $.each(prodntlist, function () {
            //if (this.sno == PId) {
            //    this.amount = cal;
            //}

            if (this.Processid == Prid && this.FirstRate == Fstrt) {
               
                var rte = this.Rate;
                var qt = this.Quantity;
                var cal = rte * qt;
                cal = cal.toFixed(DcurrencyDecimal);
                this.amount = cal;
            }

        });
        //  LoadProductionTable(prodntlist);
        prodctnitem(prodntlist);
        Calctotprod();

        //var rows = $("#productiontable").dataTable().fnGetNodes();
        //var dtTable = $('#productiontable').DataTable();
        //for (var i = 0; i < rows.length; i++) {
        //    var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
        //    $('input[id=txtrateprodtn]').each(function () {
        //        if (sn == PId && $(this).val() == val) {
        //            var row = $(this).closest('tr');
        //            var num = row.find('#txtrateprodtn').val();
        //            row.find('#txtrateprodtn').focus().val('').val(num);
        //            return true;
        //        }
        //    });
        //}


        var otable = $('#productiontable').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtrateprodtn]').each(function (ig) {
            if (odata[ig].Processid == Prid && odata[ig].FirstRate == Fstrt) {
                var row = $(this).closest('tr');
                // row.find('#txtOpOrdQty').val(totalamnt);
                row.find('#txtrateprodtn').focus().val('').val(val);
            }
        });


    });



    $(document).on('keyup', '.calcRateProductionDet', function () {
        debugger;

        var table = $('#productionDettable').DataTable();
        var PId = table.row($(this).parents('tr')).data()["sno"];
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
        var qty = table.row($(this).parents('tr')).data()["Quantity"];
        var Prcid = table.row($(this).parents('tr')).data()["Processid"];
        var Fstrt = table.row($(this).parents('tr')).data()["FirstRate"];


        var val = $(this).val();


        if (apprate > 0 && val < apprate) {
            //alert('GRN is made...Cant reduce the rate...');
            var msg = 'GRN is made...Cant reduce the rate...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);

            var list = [];
            list = $.grep(prodntlist, function (v) {
                return (v.Processid === Prcid);
            });
            LoadProductionDetTable(list);
            //LoadProductionDetTable(prodntlist);
           // Calctotprod();

            var rows = $("#productionDettable").dataTable().fnGetNodes();
            var dtTable = $('#productionDettable').DataTable();
            for (var i = 0; i < rows.length; i++) {
                var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
                $('input[id=txtrateprodtnDet]').each(function () {
                    if (sn == PId) {
                        var row = $(this).closest('tr');
                        var num = row.find('#txtrateprodtnDet').val();
                        row.find('#txtrateprodtnDet').focus().val('').val(num);
                        return true;
                    }
                });
            }
            return true;
        }
        $.each(prodntlist, function () {
            if (this.sno == PId) {
                this.Rate = val;
                this.FirstRate = val;
            }
        });
        var cal = val * qty;
        cal = cal.toFixed(DcurrencyDecimal);
        $.each(prodntlist, function () {
            if (this.sno == PId) {
                this.amount = cal;
            }
        });

        var list = [];
        list = $.grep(prodntlist, function (v) {
            return (v.Processid === Prcid);
        });
        LoadProductionDetTable(list);

       // LoadProductionDetTable(prodntlist);
        //Calctotprod();

        var rows = $("#productionDettable").dataTable().fnGetNodes();
        var dtTable = $('#productionDettable').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtrateprodtnDet]').each(function () {
                if (sn == PId && $(this).val() == val) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrateprodtnDet').val();
                    row.find('#txtrateprodtnDet').focus().val('').val(num);
                    return true;
                }
            });
        }
    });



});

function Pending() {
    debugger;

    Type = 'BUDGET';


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
    ddlmain();
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
            tot = tot.toFixed(DcurrencyDecimal);
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
        Type = "BUDGET";
    }
    else {
        Type;
    }

    if (Type == "BUDGET") {
        $('#lblListmain').text('Pending List');
    } else {
        $('#lblListmain').text('Approved List');
    }

    var ptype = $('input[name="OrdType"]:checked').attr('value');
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var menufilter = CompId + ',' + style + ',' + ordNo + ',' + RecNo + ',' + Type + ',' + ptype + ',' + FDate + ',' + TDate ;
    localStorage.setItem('BudgetApprovalFilter', menufilter);

    $.ajax({
        url: "/BudgetApproval/LoadMaingrid",
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

function LoadMaingridFromBack() {
    debugger;

    var fill = localStorage.getItem('BudgetApprovalFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[6]);
    $('#txtToDate').val(fillobj[7]);

    if (fillobj[5] == 'B') {
        $('#mainbulk').prop('checked', true);
    } else {
        $('#mainsample').prop('checked', true);
    }

    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }
    if (fillobj[3] == "undefined") {
        fillobj[3] = '';
    }
    if (fillobj[1] == "undefined") {
        fillobj[1] = 0;
    }
 
    Type = fillobj[4];


    if (Type == "BUDGET") {
        $('#lblListmain').text('Pending List');
    } else {
        $('#lblListmain').text('Approved List');
    }

    $.ajax({
        url: "/BudgetApproval/LoadMaingrid",
        data: JSON.stringify({ cmpid: fillobj[0], styleid: fillobj[1], ordno: fillobj[2], refno: fillobj[3], type: fillobj[4], ordtype: fillobj[5], fromDate: fillobj[6], todate: fillobj[7] }),
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
    ddlmain();
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
        Type = "BUDGET"
    }
    else {
        Type;
    }
    var ptype = $('input[name="OrdType"]:checked').attr('value');
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/BudgetApproval/LoadMaingriddet",
        data: JSON.stringify({ cmpid: CompId, styleid: style, ordno: ordNo, refno: RecNo, type: Type,ordtype:ptype, fromDate: FDate, todate: TDate }),
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


                //var tt = $('#Total').val();

                //var qty = $('#txtshiprate').val();
                //var set = parseFloat(tt / qty).toFixed(2);

                //var ex = $('#exchange').val();
                //var res = parseFloat(set * ex).toFixed(2);
                //$('#INR').val(res);

                var t = $('#NetAmount').val();
                var ex = $('#exchange').val();
                var tt = t / ex;
                var res = parseFloat(tt).toFixed(DcurrencyDecimal);
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
    LoadMaingrid();
}

//function getbyAddID(id) {
//    debugger;

//    if (Type == "") {
//        alert('Select Pending or Approved...');
//        return true;
//    }
//    var ordno = '';
//    var style = '';
//    var buyer = '';
//    var Company = '';
//    var refno = '';
//    var orddate = '';
//    var qty = 0;
//    var styrwid = 0;
//    var styamt = 0;
//    //var styleid = 0;
//    for (var d = 0; d < Mainlist.length; d++) {
//        if (Mainlist[d].stylerwid == id) {
//            ordno = Mainlist[d].orderno;
//            style = Mainlist[d].style;
//            styleid = Mainlist[d].styleid;
//            buyer = Mainlist[d].buyer;
//            Company = Mainlist[d].cmp;
//            refno = Mainlist[d].refno;
//            qty = Mainlist[d].qty;
//            orddate = moment(Mainlist[d].date).format("DD/MM/YYYY");
//            //styrwid = Mainlist[d].stylerwid;
//            styamt = Mainlist[d].StyleAmnt;

//        }
//    }

//    $('#myModal2').show();
//    $('#myModal2').modal('show');
//    $('#btnUpd').hide();
//    $('#btndelete').hide();
//    $('#btnsave').show();
//    $('#Ordernum').val(ordno);
//    $('#style').val(style);
//    $('#Buyer').val(buyer);
//    $('#Company').val(Company);
//    $('#Refnum').val(refno);
//    $('#qnty').val(qty);
//    $('#date').val(orddate);
//    $('#txtstylerate').val(styamt);

//    var rt = styamt;
//    var res = parseFloat((1 * rt) / 100);
//    res = res.toFixed(4);
//    $('#gaficharges').val(res);

//    var ischecked = false;
//    $(":checkbox").each(function () {
//        ischecked = $('#QizStatus').is(":checked");

//    });
//    if (ischecked == true) {
//        var resq = parseFloat((4 * rt) / 100);
//        resq = resq.toFixed(4);
//        $('#qizcharges').val(resq);
//    }
//    else {
//        $('#qizcharges').val(0);
//    }

//    date = orddate;
//    LoadShipmentRate(id);
//    LoadPcsWt(ordno, styleid);
//    LoadBomdet(ordno, styleid);
//    LoadProcessdet(ordno, styleid);
//    LoadProductndet(ordno, styleid);
//    LoadCommdet(ordno, styleid);
//    // totcost();

//    $('#profile-tab').click();
//}

function getbyAddID(id) {

    getbyEditID(id)
}

function getbyEditID(id) {
    debugger;
//    var tabs = document.querySelectorAll(".tab")
//    tabs.forEach((tab)=>{
//        tab.classList.remove("active");
//});
    $("#btnUpd").attr("disabled", false);
    $("#btnLock").attr("disabled", false);
    CheckPlanAmend(id);
    //$('#TxtProduction').val(1);

    if (Type == "") {
        //alert('Select Pending or Approved...');
        var msg = 'Select Pending or Approved...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
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
     styleid = 0;
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
            GUom = Mainlist[d].GUOM;
        }
    }
    $('#myModal2').show();
    $('#myModal2').modal('show');
    $('#btnUpd').show();
    $('#btndelete').hide();
    $('#btnsave').hide();
    $('#Ordernum').val(ordno);
    $('#style').val(style);
    $('#txtBuyer').val(buyer);
    $('#txtCompany').val(Company);
    $('#Refnum').val(refno);
    $('#qnty').val(qty);
    $('#date').val(orddate);
    $('#txtstylerate').val(styamt);


    if (GUom != '') {

        var fab = 'Fabric & Yarn Rate /' + GUom;
        var Acc = 'Accessories Rate /' + GUom;
        var rt = 'Rate /' + GUom;
        var t = '/' + GUom


        $("#lblfabyarn").text(fab);
        $("#lblAcc").text(Acc);
        $("#lblprocess").text(rt);
        $("#lblprod").text(rt);
        $("#lblcomm").text(rt);

        $("#lblrt1").text(t);
        $("#lblrt2").text(t);
        $("#lblrt3").text(t);
        $("#lblrt4").text(t);
        $("#lblrt5").text(t);
        $("#lblrt6").text(t);
        $("#lblrt7").text(t);
        $("#lblrt8").text(t);
        $("#lblrt9").text(t);
    }


    var rt = styamt;
    var res = parseFloat((1 * rt) / 100);
    res = res.toFixed(DcurrencyDecimal);
    $('#gaficharges').val(res);
    //$('#date').val(styrwid);
    //$('#qizcharges').val(0);
    LoadShipmentRate(id);
    date = orddate;
    LoadPcsWt(ordno, styleid);
    LoadBomdetEdit(ordno, styleid);
    LoadProcessdetEdit(ordno, styleid);
    LoadProductndetEdit(ordno, styleid);
    LoadCommdetEdit(ordno, styleid);
    ChkPOforbom(ordno, styleid);
    ChkPOforproc(ordno, styleid);
    ChkPOforprodord(ordno, styleid);
    ChkPOforprod(ordno, styleid);
    ChkPOforcut(ordno, styleid);
   // calcmarkup();
    $('#profile-tab').click();
}

function CheckPlanAmend(styrwid) {

    planamend = 0;
    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: styrwid, jmasid: '', Workordno: '' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var amendlist = []
            amendlist = result;
            if (amendlist.length > 0) {
                for (var x = 0; x < amendlist.length; x++) {
                    //alert("Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....");
                    var msg = "Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $("#btnsave").attr("disabled", true);
                    $("#btnUpd").attr("disabled", true);
                    $("#btndelete").attr("disabled", true);
                    return true;
                }
            } else {
                $("#btnAdd").attr("disabled", false);
                $("#btnUpd").attr("disabled", false);
                $("#btndelete").attr("disabled", false);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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

function LoadBomdetEdit(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadBomdetEdit",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            Bomlist = result.Value;

            $.each(Bomlist, function (i) {
                Bomlist[i].Rate = Bomlist[i].Rate.toFixed(DcurrencyDecimal);
                Bomlist[i].amount = Bomlist[i].amount.toFixed(DcurrencyDecimal);

            });

            //Bomlist.sort(function (a, b) {
            //    return a.sno - b.sno;
            //});
            LoadBomTable(Bomlist);
            if (Bomlist.length > 0) {
                $('#cmcost').val(Bomlist[0].CMCost);
                $('#finper').val(Bomlist[0].FinPer);
                $('#markup').val(Bomlist[0].MarkUpvalue);
                $('#ddlCurrency').val(Bomlist[0].CurrencyID).trigger('change');
                $('#exchange').val(Bomlist[0].exchgerate);
                if (Bomlist[0].Qizcharges == 0) {
                    $('#QizStatus').prop("checked", false);
                } else {
                    $('#QizStatus').prop("checked", true);
                }
                $('#qizcharges').val(Bomlist[0].Qizcharges);

                $('#Profit').val(Bomlist[0].ProfitPercent);
                $('#SalePrice').val(Bomlist[0].salesprice);
                $('#txtProfit').val(Bomlist[0].saleper);
                $('#PrfValue').val(Bomlist[0].saleprofit);
                $('#salesProfit').val(Bomlist[0].Salesratemargin);
                var LockPlanning = Bomlist[0].LockPlanning;
                var LockConsumption = Bomlist[0].LockConsumption;
                var LockFabric = Bomlist[0].LockFabric;
                var LockYarn = Bomlist[0].LockYarn;
                var LockAccesories = Bomlist[0].LockAccesories;
                var LockPacking = Bomlist[0].LockPacking;
                var LockOrder = Bomlist[0].LockOrder;

                if (LockPlanning == 'Y') {
                    $('#lckPlan').prop('checked', true);
                }
                else {
                    $('#lckPlan').prop('checked', false);
                }

                if (LockConsumption == 'Y') {
                    $('#lckCon').prop('checked', true);
                }
                else {
                    $('#lckCon').prop('checked', false);
                }

                if (LockFabric == 'Y') {
                    $('#lckFab').prop('checked', true);
                }
                else {
                    $('#lckFab').prop('checked', false);
                }

                if (LockYarn == 'Y') {
                    $('#lckYarn').prop('checked', true);
                }
                else {
                    $('#lckYarn').prop('checked', false);
                }

                if (LockAccesories == 'Y') {
                    $('#lckAcc').prop('checked', true);
                }
                else {
                    $('#lckAcc').prop('checked', false);
                }

                if (LockPacking == 'Y') {
                    $('#lckPak').prop('checked', true);
                }
                else {
                    $('#lckPak').prop('checked', false);
                }
                if (LockOrder == 'Y') {
                    $('#lckOrd').prop('checked', true);
                }
                else {
                    $('#lckOrd').prop('checked', false);
                }


            }

            Loadexchangerate();
            var amnt = $('#txtstylerate').val();
            var fin = $('#finper').val();

            var res = parseFloat((fin * amnt) / 100);
            res = res.toFixed(DcurrencyDecimal);
            $('#finpervalue').val(res);
            //calcfinper();
            Calctotbom();
            //chkbom();
            totcost();
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


            $.each(Processlist, function (i) {
                Processlist[i].Rate = Processlist[i].Rate.toFixed(DcurrencyDecimal);
                Processlist[i].amount = Processlist[i].amount.toFixed(DcurrencyDecimal);
            });

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
            //LoadProductionTable(prodntlist);


            $.each(prodntlist, function (i) {
                prodntlist[i].Rate = prodntlist[i].Rate.toFixed(DcurrencyDecimal);
                prodntlist[i].amount = prodntlist[i].amount.toFixed(DcurrencyDecimal);
            });

            prodctnitem(prodntlist);

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
            var qty=  $('#qnty').val();
            $.each(commlist, function (i) {
                var perrt=commlist[i].Value / qty;
                commlist[i].FirstRate = perrt.toFixed(DcurrencyDecimal);
            });

            LoadCommercialTable(commlist);

        }
    });
}
function backtomain() {
    $('#myModal2').hide();
    $('#myModal2').modal('hide');
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
            var obj = result.Value;
            $('#PcsWt').val(obj[0].pcswt);
        }
    });
}

function LoadBomdet(ord, sty) {
    debugger;
    $.ajax({
        url: "/BudgetApproval/LoadBomdet",
        data: JSON.stringify({ ordno: ord, styleid: sty }),
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
            // LoadProductionTable(prodntlist);
            prodctnitem(prodntlist);
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
    var totalamnt = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype == 'YARN' || Bomlist[e].Itmtype == 'FABRIC') {
            var amount = Bomlist[e].amount;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }


    var totalrate = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype == 'YARN' || Bomlist[e].Itmtype == 'FABRIC') {
            var rate = Bomlist[e].Rate;
            totalrate = totalrate + parseFloat(rate);
        }
    }

    var totalqty = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype == 'YARN' || Bomlist[e].Itmtype == 'FABRIC') {
            var qty = Bomlist[e].Quantity;
            totalqty = totalqty + parseFloat(qty);
        }
    }

    $('#txttotamntyarn').val(totalamnt.toFixed(DcurrencyDecimal));
    var qty = $('#qnty').val();
    var bom = totalamnt / qty;
    $('#txttotrateyarn').val(bom.toFixed(DcurrencyDecimal));
    // $('#txttotqtybom').val(totalqty.toFixed(2));
    $('#Fabyarn').val(bom.toFixed(DcurrencyDecimal));



    var totalAccamnt = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype != 'YARN' && Bomlist[e].Itmtype != 'FABRIC') {
            var amount = Bomlist[e].amount;
            totalAccamnt = totalAccamnt + parseFloat(amount);
        }
    }


    var totalAccrate = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype != 'YARN' && Bomlist[e].Itmtype != 'FABRIC') {
            var rate = Bomlist[e].Rate;
            totalAccrate = totalAccrate + parseFloat(rate);
        }
    }

    //var totalAccqty = 0;
    //for (var e = 0; e < Bomlist.length; e++) {
    //    if (Bomlist[e].itmgrp == 'ACCESSORY') {
    //        var qty = Bomlist[e].Quantity;
    //        totalqty = totalqty + parseFloat(qty);
    //    }
    //}

    $('#txttotamntbom').val(totalAccamnt.toFixed(DcurrencyDecimal));

    var qty = $('#qnty').val();
    var bom = totalAccamnt / qty;
    $('#txttotratebom').val(bom.toFixed(DcurrencyDecimal));
    //$('#txttotqtybom').val(totalqty.toFixed(2));



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
    $('#BOM').val(bom.toFixed(DcurrencyDecimal));


    var cl = (totatcloth) / qty;
    var pr = (totalamntproc) / qty;
    //var cl = (totatcloth + totalamntproc);Fabyarn
    //$('#Cloth').val(cl.toFixed(2));
    //$('#Fabyarn').val(pr.toFixed(2));

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

    $('#txttotamtproces').val(totalamnt.toFixed(DcurrencyDecimal));
    var qty = $('#qnty').val();
    var bom = totalamnt / qty;

    $('#txttotrateproces').val(bom.toFixed(DcurrencyDecimal));
    $('#txttotqtyproces').val(totalqty.toFixed(DcurrencyDecimal));
    $('#Cloth').val(bom.toFixed(DcurrencyDecimal));

    var totatcloth = 0;
    for (var e = 0; e < Bomlist.length; e++) {
        if (Bomlist[e].Itmtype == 'YARN' || Bomlist[e].Itmtype == 'FABRIC') {
            var at = Bomlist[e].amount;
            totatcloth = totatcloth + parseFloat(at);
        }
    }

    var qty = $('#qnty').val();
    var cl = (totatcloth + totalamnt) / qty;
    //$('#Cloth').val(cl.toFixed(2));
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
    cl = cl.toFixed(DcurrencyDecimal);
    $('#txttotamntprod').val(totalamnt.toFixed(DcurrencyDecimal));
    var qty = $('#qnty').val();
    var bom = totalamnt / qty;
    $('#txttotrateprod').val(bom.toFixed(DcurrencyDecimal));
    $('#txttotqtyprod').val(totalqty.toFixed(DcurrencyDecimal));
    //$('#TxtProduction').val(cl);
    $('#TxtProduction').val(bom.toFixed(DcurrencyDecimal));
}

function TotCommer() {
    debugger;
    var totcomm = 0;
    $.each(commlist, function (i) {
        var rt=parseFloat(commlist[i].Value);
        totcomm = totcomm + rt;
    });
    var qty = $('#qnty').val();

    var tot = totcomm / qty;
    $('#Totratecommer').val(tot.toFixed(DcurrencyDecimal));
    $('#txtCommercial').val(tot.toFixed(DcurrencyDecimal));
}


function totcost() {
    debugger;
    var fab = ($('#Fabyarn').val() == "" ? 0 : $('#Fabyarn').val());
    var cloth = ($('#Cloth').val() == "" ? 0 : $('#Cloth').val());
    var prod = ($('#TxtProduction').val() == "" ? 0 : $('#TxtProduction').val());
    var bom = ($('#BOM').val() == "" ? 0 : $('#BOM').val());
    var comm = ($('#txtCommercial').val() == "" ? 0 : $('#txtCommercial').val());

    var styamt = ($('#txtstylerate').val() == "" ? 0 : $('#txtstylerate').val());
    var salesper = ($('#salesProfit').val() == "" ? 0 : $('#salesProfit').val());
    var salescost = 0;
    if (salesper > 0 && styamt > 0) {
        salescost = (salesper / 100) * styamt;
    }

    var Salescostset = salescost.toFixed(DcurrencyDecimal);

    var qty = $('#qnty').val();

    var slcst = Salescostset / qty;

    $('#salesValue').val(slcst.toFixed(DcurrencyDecimal));

    //var Salescostset = ($('#salesValue').val() == "" ? 0 : $('#salesValue').val());


    //var a = $('#cmcost').val() == "" ? 0 : $('#cmcost').val();
    //var b = $('#finpervalue').val() == "" ? 0 : $('#finpervalue').val();
    //var c = $('#gaficharges').val() == "" ? 0 : $('#gaficharges').val();
    //var d = $('#markup').val() == "" ? 0 : $('#markup').val();
    //var e = $('#qizcharges').val() == "" ? 0 : $('#qizcharges').val();

    var rscost = parseFloat(fab) + parseFloat(cloth) + parseFloat(prod) + parseFloat(bom) + parseFloat(comm) + parseFloat(slcst);
   // var rup = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(rscost);

    var rup =  parseFloat(rscost);
    var tot = $('#Total').val(rup.toFixed(DcurrencyDecimal));

    var pr = $('#Value').val() == "" ? 0 : $('#Value').val();

    var net = parseFloat(rup) + parseFloat(pr);
    // var qty = $('#txtshiprate').val();
    var qty = $('#qnty').val();
    $('#NetAmount').val(net.toFixed(DcurrencyDecimal));

   

    var val = $('#Profit').val();
    var tot = $('#Total').val();
    var pr = (val * tot) / 100;
    $('#Value').val(pr.toFixed(DcurrencyDecimal));
    var io = parseFloat(tot) + parseFloat(pr);
    $('#NetAmount').val(io.toFixed(DcurrencyDecimal));

    var totcomm = 0;
    $.each(commlist, function (i) {
        var rt = parseFloat(commlist[i].Value);
        totcomm = totcomm + rt;
    });

    var a = $('#txttotamntyarn').val() == "" ? 0 : $('#txttotamntyarn').val();
    var b = $('#txttotamntbom').val() == "" ? 0 : $('#txttotamntbom').val();
    var c = $('#txttotamtproces').val() == "" ? 0 : $('#txttotamtproces').val();
    var d = $('#txttotamntprod').val() == "" ? 0 : $('#txttotamntprod').val();
    var e = totcomm


    var tv = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(Salescostset);
    tv = tv.toFixed(DcurrencyDecimal);
    $('#TotalValue').val(tv);


    var tot = $('#TotalValue').val();
    var pr = (val * tot) / 100;
    var io = parseFloat(tot) + parseFloat(pr);
    $('#TotalValue').val(io.toFixed(DcurrencyDecimal));



    var totcomm = 0;
    $.each(commlist, function (i) {
        var rt = parseFloat(commlist[i].Value);
        totcomm = totcomm + rt;
    });


    //var a = $('#txttotamntyarn').val() == "" ? 0 : $('#txttotamntyarn').val();
    //var b = $('#txttotamntbom').val() == "" ? 0 : $('#txttotamntbom').val();
    //var c = $('#txttotamtproces').val() == "" ? 0 : $('#txttotamtproces').val();
    //var d = $('#txttotamntprod').val() == "" ? 0 : $('#txttotamntprod').val();
    //var e = totcomm


    //var tv = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e);
    //tv = tv.toFixed(2);
    //$('#TotalValue').val(tv);


    //var tv = rup * qty;
    //tv = tv.toFixed(3);
    //$('#TotalValue').val(tv);
    var t = $('#NetAmount').val();
    var ex = $('#exchange').val();
    var tt = t / ex;
    var res = parseFloat(tt).toFixed(DcurrencyDecimal);
    $('#INR').val(res);

    //var tt = rup / qty;
    //var ex = $('#exchange').val();
    //var res = parseFloat(tt * ex).toFixed(3);
    //$('#INR').val(res);


    var sp = $('#SalePrice').val();
    var tcostperpcs = $('#NetAmount').val();

    var value2 = sp - tcostperpcs;
    $('#PrfValue').val(value2.toFixed(DcurrencyDecimal));

    var sp = $('#SalePrice').val();
    var oqty = $('#qnty').val();
    var tcost = $('#TotalValue').val();
    var tcostperpcs = $('#Total').val();

    var SValue = sp * oqty;
    var Tc = SValue - tcost;

    var ProPer = (Tc / SValue) * 100;

    $('#txtProfit').val(ProPer.toFixed(DcurrencyDecimal));

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
    res = res.toFixed(DcurrencyDecimal);
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
    mrkup = mrkup.toFixed(DcurrencyDecimal);
    $('#markup').val(mrkup);
    totcost();
}

function calcvalues(val) {
    debugger;
    var tot = $('#Total').val();
    var pr = (val * tot) / 100;
    $('#Value').val(pr.toFixed(DcurrencyDecimal));
    var io = parseFloat(tot) + parseFloat(pr);
    $('#NetAmount').val(io.toFixed(DcurrencyDecimal));

    var totcomm = 0;
    $.each(commlist, function (i) {
        var rt = parseFloat(commlist[i].Value);
        totcomm = totcomm + rt;
    });

    var a = $('#txttotamntyarn').val() == "" ? 0 : $('#txttotamntyarn').val();
    var b = $('#txttotamntbom').val() == "" ? 0 : $('#txttotamntbom').val();
    var c = $('#txttotamtproces').val() == "" ? 0 : $('#txttotamtproces').val();
    var d = $('#txttotamntprod').val() == "" ? 0 : $('#txttotamntprod').val();
    var e = totcomm


    var tv = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e);
    tv = tv.toFixed(DcurrencyDecimal);
    $('#TotalValue').val(tv);


    var tot = $('#TotalValue').val();
    var pr = (val * tot) / 100; 
    var io = parseFloat(tot) + parseFloat(pr);
    $('#TotalValue').val(io.toFixed(DcurrencyDecimal));


    totcost();

}



function calcsp(val) {
    debugger;
    //var nt = $('#NetAmount').val();
    //var value2 = parseFloat(val) - parseFloat(nt);

    //$('#PrfValue').val(value2.toFixed(2));

    //var sp = $('#SalePrice').val();
    //var prf = (value2 * 100) / sp;
    //$('#txtProfit').val(prf.toFixed(2));

    //var sp = $('#SalePrice').val();
    //var db = $('#Drawback').val();
    //var val1 = db / sp;
    //$('#DrwValue').val(val1.toFixed(3));
    //var rps = $('#INR').val();
    //var value2 = sp - rps;
    //$('#PrfValue').val(value2.toFixed(3));
    //var profit = (value2 * 100) / sp;
    //$('#txtProfit').val(profit.toFixed(3));


    var sp = $('#SalePrice').val();
    var tcostperpcs = $('#NetAmount').val();

    var value2 = sp - tcostperpcs;
    $('#PrfValue').val(value2.toFixed(DcurrencyDecimal));

    var sp = $('#SalePrice').val();
    var oqty = $('#qnty').val();
    var tcost = $('#TotalValue').val();
    var tcostperpcs = $('#Total').val();

    var SValue = sp * oqty;
    var Tc = SValue - tcost;

    var ProPer = (Tc / SValue) * 100;

    $('#txtProfit').val(ProPer.toFixed(DcurrencyDecimal));


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
    $('#DrwValue').val(val1.toFixed(DcurrencyDecimal));

    var val2 = (sp + val1) - rps;
    $('#PrfValue').val(value2.toFixed(DcurrencyDecimal));

    var profit = (val2 * 100) / sp;
    $('#txtProfit').val(profit.toFixed(DcurrencyDecimal));
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
                   { title: "SNo", data: "sno", "visible": false },

                   { title: "ItemId", data: "Itemid", "visible": false },
                   { title: "Item", data: "Item" },
                   { title: "Color", data: "color" },
                   { title: "Size", data: "size" },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data, type, row) {
                           //debugger;
                           if (row.AppCurrencyRate > 0) {
                               return '<input type="text" id="txtratebom" class="calcRateBom form-control"  style="width: 50px;text-align: center;" onchange="calcRateBom();"  value=' + row.AppCurrencyRate + '>';
                           } else {
                               return '<input type="text" id="txtratebom" class="calcRateBom form-control"  style="width: 50px;text-align: center;" onchange="calcRateBom();"  value=' + row.Rate + '>';
                           }
                       },
                       //render: function (data) {

                       //    return '<input type="text" id="txtratebom" class="calcRateBom form-control"  style="width: 50px;text-align: center;" onchange="calcRateBom();"  value=' + data + '>';

                       //},
                   },
                   { title: "Currency", data: "curr" },
                    { title: "Ex Rate", data: "exchgerate" },
                     { title: "Quantity", data: "Quantity" },
                      { title: "Amount", data: "amount" },
                   {
                       title: "Approve", data: "sno",
                       render: function (data, type, row) {
                           if ((row.check == 'true' || row.check == true) && row.PoRate > 0) {
                              
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  checked disabled value=' + data + ' >';
                           }
                           else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
                              
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active"  checked  value=' + data + ' >';
                           }
                           else {
                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                           }
                       }
                   },
                    {
                        title: "Lock", data: "sno",
                        render: function (data, type, row) {
                           
                                var chk = ''
                                if ((row.Lock == 'true' || row.Lock == true)) {
                                    chk = 'checked';
                                }
                                var box = ' &nbsp &nbsp <input type="checkbox" id="groupbomlock" class="groupbomlock editor-active"  ' + chk + ' value=' + data + ' >'
                                if ((row.Itmtype == 'YARN' || row.Itmtype == 'FABRIC')) {
                                    box = '';
                                }

                                return  box;
                        }
                    },
        ]

    });

    var table = $('#bomtable').DataTable();
    $("#bomtable tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#bomtable tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
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
                     { title: "Color", data: "color" },
                       { title: "Size", data: "size" },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data) {

                           return '<input type="text" id="txtrateprocess" class="calcRateProcess form-control"  style="width: 50px;text-align: center;" onchange="calcRateProcess();"  value=' + data + ' >';

                       },
                   },
                   { title: "Quantity", data: "Quantity" },
                   { title: "Amount", data: "amount" },
                   {
                       title: "Approve", data: "sno",
                       render: function (data, type, row) {
                           if ((row.check == 'true' || row.check == true) && row.Actual_Rate > 0) {
                               var chk = ''
                               if ((row.Lock == 'true' || row.Lock == true)) {
                                   chk = 'checked';
                               }

                               return '<input type="checkbox" id="groupproc" checked disabled value=' + data + ' >';
                           }
                           else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
                               var chk = ''
                               if ((row.Lock == 'true' || row.Lock == true)) {
                                   chk = 'checked';
                               }

                               return '<input type="checkbox" id="groupproc" checked value=' + data + ' >' ;
                           }
                           else {

                               var chk = ''
                               if ((row.Lock == 'true' || row.Lock == true)) {
                                   chk = 'checked';
                               }

                               return '<input type="checkbox" id="groupproc" unchecked value=' + data + ' >' ;

                           }
                       }
                   },

                    {
                        title: "Lock", data: "sno",
                        render: function (data, type, row) {
                                var chk = ''
                                if ((row.Lock == 'true' || row.Lock == true)) {
                                    chk = 'checked';
                                }

                                return  '<input type="checkbox" id="groupproclock" ' + chk + '  value=' + data + ' >';
                          
                        }
                    },

        ]

    });

    var table = $('#processtable').DataTable();
    $("#processtable tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#processtable tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}


//function LoadProductionTable(list) {

//    $('#productiontable').DataTable().destroy();

//    $('#productiontable').DataTable({
//        data: list,
//        scrollY: 150,
//        scrollCollapse: true,
//        paging: false,
//        fixedColumns: false,
//        select: false,
//        scrollX: "100%",
//        scrollXInner: "100%",
//        scroller: false,
//        columns: [
//                   { title: "SNo", data: "sno", "visible": false },
//                   { title: "ItemId", data: "Itemid", "visible": false },
//                     { title: "Process", data: "process" },
//                   { title: "Item", data: "Item" },
//                    { title: "Color", data: "color" },
//                     { title: "Size", data: "size" },
//                   {
//                       title: "Rate", data: "Rate",
//                       render: function (data) {

//                           return '<input type="text" id="txtrateprodtn" class="calcRateProduction form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

//                       },
//                   },
//                   { title: "Quantity", data: "Quantity" },
//                   { title: "Amount", data: "amount" },
//                   {
//                       title: "Apply", data: "sno",
//                       render: function (data, type, row) {
//                           if ((row.check == 'true' || row.check == true) && row.Actual_Rate > 0) {
//                               return '<input type="checkbox" style="margin: 10px;" id="groupprodnt" checked disabled value=' + data + ' >' + '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 25px;padding: 0px;height: 20px;border-radius:10px;margin-left: 25px" class="btnprdItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>';
//                           }
//                           else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
//                               return '<input type="checkbox" style="margin: 10px;" id="groupprodnt" checked value=' + data + ' >' + '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 25px;padding: 0px;height: 20px;border-radius:10px;margin-left: 25px" class="btnprdItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>';
//                           }
//                           else {
//                               return '<input type="checkbox" style="margin: 10px;" id="groupprodnt" unchecked value=' + data + ' >' + '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 25px;padding: 0px;height: 20px;border-radius:10px;margin-left: 25px" class="btnprdItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>';

//                           }
//                       }
//                   },

//        ]

//    });

//}


function LoadProductionTable(list) {
    debugger;

    $('#productiontable').DataTable().destroy();

    $('#productiontable').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: false,
        paging: false,
        fixedColumns: true,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        "rowCallback": function (row, data, index) {
            if (data.Actual_Rate > "0") {
                $('td', row).css('background-color', '#FCF3CF');

            }
         
        },

        columns: [
                   //{ title: "SNo", data: "sno", "visible": false },
                   //{ title: "ItemId", data: "Itemid", "visible": false },
                     { title: "Process", data: "process",width:"20%" },
                      { title: "ProcessId", data: "Processid", "visible": false },
                        { title: "FirstRate", data: "FirstRate", "visible": false },
                   {
                       title: "Rate", data: "Rate",width:"10%",
                       render: function (data) {

                           return '<input type="text" id="txtrateprodtn" class="calcRateProduction form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Quantity", data: "Quantity", width: "20%" },
                   { title: "Amount", data: "amount", width: "20%" },
                   {
                       title: "Approve", data: "Processid", width: "20%",
                       render: function (data, type, row) {
                           if ((row.check == 'true' || row.check == true) && row.Actual_Rate > 0) {
                             
                               return '<input type="checkbox" style="margin: 10px;" id="groupprodnt" checked disabled value=' + data + ' >' + '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 25px;padding: 0px;height: 20px;border-radius:10px;margin-left: 25px" class="btnprdItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>';
                           }
                           else if ((row.check == 'true' || row.check == true) && row.Actual_Rate == 0) {
                             
                               return '<input type="checkbox" style="margin: 10px;" id="groupprodnt" checked value=' + data + ' >' + '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 25px;padding: 0px;height: 20px;border-radius:10px;margin-left: 25px" class="btnprdItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>';
                           }
                           else {
                              
                               return '<input type="checkbox" style="margin: 10px;" id="groupprodnt" unchecked value=' + data + ' >'  + '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 25px;padding: 0px;height: 20px;border-radius:10px;margin-left: 25px" class="btnprdItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>';

                           }
                       }
                   },

                     {
                         title: "Lock", data: "Processid", width: "10%",
                         render: function (data, type, row) {
                            
                                 var chk = ''
                                 if ((row.Lock == 'true' || row.Lock == true)) {
                                     chk = 'checked';
                                 }

                                 return  '<input type="checkbox" style="margin: 10px;" id="groupprodntlock" ' + chk + '  value=' + data + ' >' ;
                           
                           
                         }
                     },


        ]

    });

    var table = $('#productiontable').DataTable();
    $("#productiontable tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#productiontable tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}


function LoadProductionDetTable(list) {

    $('#productionDettable').DataTable().destroy();

    $('#productionDettable').DataTable({
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
                    { title: "Color", data: "color" },
                     { title: "Size", data: "size" },
                   {
                       title: "Rate", data: "Rate",
                       render: function (data) {

                           return '<input type="text" id="txtrateprodtnDet" class="calcRateProductionDet form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                       },
                   },
                   { title: "Quantity", data: "Quantity" },
                   { title: "Amount", data: "amount" },
                 

        ]

    });

}

function prodctnitem(prodntlist) {
    debugger;
   // if (this.val = 'I') {
        var cl = [];
        var qt = [];
        tempimlist = [];
        if (prodntlist.length > 0) {
            for (var r = 0; r < prodntlist.length; r++) {
                if (prodntlist[r].Processid == prodntlist[r].Processid) {
                    cl.push(prodntlist[r]);
                    qt.push(prodntlist[r]);
                }
            }

            var newArray = [];
            $.each(cl, function (key, value) {
                var exists = false;
                var rate = 0;
                $.each(newArray, function (k, val2) {
                    if (value.Processid == val2.Processid && value.FirstRate == val2.FirstRate) { exists = true; };
                });
        
                if (exists == false && value.Processid != "" && value.FirstRate != "") { newArray.push(value); }
            });
            cl = newArray;



            if (cl.length > 0) {
            //    // cl = $.unique(cl);

            //    cl = cl.filter(function (itm, i, cl) {
            //        return i == cl.indexOf(itm);
            //    });



                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w].Processid;
                    var totalqty = 0;
                    var totamount=0
                    var Pr = '';
                    var Prid = 0;
                    var Apprt = 0;
                    var chk = '';
                    var rt = cl[w].Rate;
                    var frt = cl[w].FirstRate;
                    var lck = '';
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Processid == cid && qt[m].Rate == rt ) {
                            var qty = qt[m].Quantity;
                            var amt = qt[m].amount;
                            totalqty = totalqty + parseFloat(qty);
                            totamount = totamount + parseFloat(amt);
                            Pr = qt[m].process;
                            Prid = qt[m].Processid;
                            Apprt = qt[m].Actual_Rate;
                            chk = qt[m].check;
                            rt = qt[m].Rate;
                            frt = qt[m].FirstRate;
                            lck = qt[m].Lock;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y].Processid == cid && cl[y].FirstRate == frt) {
                            var Obj = {
                                
                                Processid: Prid,
                                process:Pr,                              
                                Quantity: totalqty,
                                Rate: rt,
                                amount:totamount,
                                Actual_Rate: Apprt,
                                check: chk,
                                FirstRate: frt,
                                Lock : lck,
                            }
                            tempimlist.push(Obj);
                        }
                    }
                }
                LoadProductionTable(tempimlist);
              


            }
        }
        else {
           // alert('Please Select Any One Process...');
            //return true;
        }
    //}
}


$(document).on('click', '.btnprdItemview', function () {
    debugger;
    var table = $('#productiontable').DataTable();
    var PId = table.row($(this).parents('tr')).data()["Processid"];

    var list = [];
    list = $.grep(prodntlist, function (v) {
        return (v.Processid === PId);
    });

    $("#myModal3").modal('show');
    LoadProductionDetTable(list);
});

function ProddetClose() {
    debugger;
    var list = [];
    list = prodntlist;
    prodctnitem(list);
    $("#myModal3").modal('hide');
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

$(document).ready(function () {
    $("#productionDettable ").dataTable().find("tbody").on('click', 'tr', function () {
        prodDetindex = (this.rowIndex) - 1;
    });
});


function LoadCommercialTable(list) {

    $('#commercialtable').DataTable().destroy();

    $('#commercialtable').DataTable({
        data: list,
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
                   { title: "SNo", data: "Particularid", "visible": false },
                   { title: "Description", data: "CostType" },
                   { title: "Cost", data: "Cost" },
                   { title: "Value", data: "Value" },
                   { title: "Cost/" + GUom, data: "FirstRate" },


        ]

    });
    TotCommer();
}


function Add() {
    debugger;
    $('#LoadingSpinner').show();
    var list = [];

    for (var j = 0; j < Bomlist.length; j++) {
        if (Bomlist[j].check == true || Bomlist[j].check == "true") {
            list.push(Bomlist[j]);
        }
    }


    for (var j = 0; j < Processlist.length; j++) {
        if (Processlist[j].check == true || Processlist[j].check == "true") {
            list.push(Processlist[j]);
        }
    }

    for (var j = 0; j < prodntlist.length; j++) {
        if (prodntlist[j].check == true || prodntlist[j].check == "true") {
            list.push(prodntlist[j]);
        }
    }

    if (list.length == 0) {
        //alert('Please select checkboxes..');
        var msg = "Please select checkboxes...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
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
            Access_Type: list[e].Access_Type,
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
    $("#btnsave").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BudgetApproval/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#LoadingSpinner').hide();
            debugger;
            if (result.Value == true) {
                AddUserEntryLog('Management Console', 'Budget Approval', 'ADD', $('#Ordernum').val());
                //alert('Data Saved Successfully');
                //window.location.href = "/BudgetApproval/BudgetApprovalIndex";
                var msg = "Data Saved Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "/BudgetApproval/BudgetApprovalIndex";
                AlartMessage(msg, flg, mod, url);
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


function Lock() {
    debugger;
    $('#LoadingSpinner').show();
    var locklist = [];

    for (var j = 0; j < Bomlist.length; j++) {
        if (Bomlist[j].Lock == "true" || Bomlist[j].Lock == true) {
            locklist.push(Bomlist[j]);
        }

    }


    for (var j = 0; j < Processlist.length; j++) {
        if (Processlist[j].Lock == "true" || Processlist[j].Lock == true) {
            locklist.push(Processlist[j]);
        }

    }

    for (var j = 0; j < prodntlist.length; j++) {
        if (prodntlist[j].Lock == "true" || prodntlist[j].Lock == true) {
            locklist.push(prodntlist[j]);
        }

    }

    var lckPrgm = 'N';

    var val1 = $('#lckPrgm').is(":checked");
    if (val1 == true) {
        lckPrgm = 'Y'
    }

    var lckOrd = 'N';

    var val2 = $('#lckOrd').is(":checked");
    if (val2 == true) {
        lckOrd = 'Y'
    }

    var lckPlan = 'N';

    var val3 = $('#lckPlan').is(":checked");
    if (val3 == true) {
        lckPlan = 'Y'
    }

    var lckCon = 'N';

    var val4 = $('#lckCon').is(":checked");
    if (val4 == true) {
        lckCon = 'Y'
    }

    var lckFab = 'N';

    var val5 = $('#lckFab').is(":checked");
    if (val5 == true) {
        lckFab = 'Y'
    }

    var lckYarn = 'N';

    var val6 = $('#lckYarn').is(":checked");
    if (val6 == true) {
        lckYarn = 'Y'
    }

    var lckAcc = 'N';

    var val7 = $('#lckAcc').is(":checked");
    if (val7 == true) {
        lckAcc = 'Y'
    }

    var lckPak = 'N';

    var val8 = $('#lckPak').is(":checked");
    if (val8 == true) {
        lckPak = 'Y'
    }

    var lockdet = [];

    if (locklist.length > 0) {
        for (var e = 0; e < locklist.length; e++) {
            //det[e].Cost_defn_bom_firstid=list[e].
            var objdet = {
                Cost_Defn_id: locklist[e].Cost_Defn_id,
                Cost_Defn_BOMid: locklist[e].Cost_Defn_BOMid,
                Processid: locklist[e].Processid,
                Itemid: locklist[e].Itemid,
                ColorID: locklist[e].Colorid,
                SizeID: locklist[e].Sizeid,
                Quantity: locklist[e].Quantity,
                Rate: locklist[e].Rate,
                Cost_defn_bom_firstid: locklist[e].Cost_defn_bom_firstid,
                Lock: locklist[e].Lock,
                styleid: styleid,
                Access_Type: locklist[e].Access_Type,
                LockSeqPrgm: lckPrgm,
                LockOrder: lckOrd,
                LockPlanning: lckPlan,
                LockConsumption: lckCon,
                LockFabric: lckFab,
                LockYarn: lckYarn,
                LockAccesories: lckAcc,
                LockPacking: lckPak,
                Order_No: $('#Ordernum').val(),
            }
            lockdet.push(objdet);
        }
    }
    else {

        var objdet = {
           
            styleid: styleid,
            LockSeqPrgm: lckPrgm,
            LockOrder: lckOrd,
            LockPlanning: lckPlan,
            LockConsumption: lckCon,
            LockFabric: lckFab,
            LockYarn: lckYarn,
            LockAccesories: lckAcc,
            LockPacking: lckPak,
            Order_No: $('#Ordernum').val(),
        }
        lockdet.push(objdet);

    }

    var LockObj = {

        Listofbomfirst: lockdet
    }
    $("#btnLock").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BudgetApproval/Lock",
        data: JSON.stringify(LockObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#LoadingSpinner').hide();
            if (result.Value == true) {

                //alert('Data Locked Successfully');
                var msg = "Data Locked Successfully...";
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
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
    $('#LoadingSpinner').show();
    var list = [];
    //var locklist = [];

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
            Bomlist[j].AppCurrencyRate = 0;
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


    //for (var j = 0; j < Bomlist.length; j++) {
    //    if (Bomlist[j].Lock == "true" || Bomlist[j].Lock == true) {
    //        locklist.push(Bomlist[j]);
    //    }
       
    //}


    //for (var j = 0; j < Processlist.length; j++) {
    //    if (Processlist[j].Lock == "true" || Processlist[j].Lock == true) {
    //        locklist.push(Processlist[j]);
    //    }
      
    //}

    //for (var j = 0; j < prodntlist.length; j++) {
    //    if (prodntlist[j].Lock == "true" || prodntlist[j].Lock == true) {
    //        locklist.push(prodntlist[j]);
    //    }
      
    //}



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
            AppCurrencyRate: list[e].AppCurrencyRate,
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
            sale_Profit: $('#PrfValue').val(),
            Drawback_Percent: $('#Drawback').val(),
            ExRate: $('#exchange').val(),
            CurrencyId: $('#ddlCurrency').val(),
            CMCost: $('#cmcost').val(),
            FinPer: $('#finper').val(),
            MarkUpvalue: $('#markup').val(),
            Gaficharges: $('#gaficharges').val(),
            Qizcharges: $('#qizcharges').val(),
            Salesratemargin: $('#salesProfit').val(),
           // CreatedBy: Guserid,
            ApprovedBy: Guserid,
        }
        det.push(objdet);
    }

    var Obj = {

        Listofbomfirst: det
    }

    //var lckPrgm = 'N';

    //var val1 = $('#lckPrgm').is(":checked");
    //if (val1 == true) {
    //    lckPrgm='Y'
    //}
   
    //var lckOrd = 'N';

    //var val2 = $('#lckOrd').is(":checked");
    //if (val2 == true) {
    //    lckOrd = 'Y'
    //}

    //var lckPlan = 'N';

    //var val3 = $('#lckPlan').is(":checked");
    //if (val3 == true) {
    //    lckPlan = 'Y'
    //}

    //var lckCon = 'N';

    //var val4 = $('#lckCon').is(":checked");
    //if (val4 == true) {
    //    lckCon = 'Y'
    //}

    //var lckFab = 'N';

    //var val5 = $('#lckFab').is(":checked");
    //if (val5 == true) {
    //    lckFab = 'Y'
    //}

    //var lckYarn = 'N';

    //var val6 = $('#lckYarn').is(":checked");
    //if (val6 == true) {
    //    lckYarn = 'Y'
    //}

    //var lckAcc = 'N';

    //var val7 = $('#lckAcc').is(":checked");
    //if (val7 == true) {
    //    lckAcc = 'Y'
    //}

    //var lckPak = 'N';

    //var val8 = $('#lckPak').is(":checked");
    //if (val8 == true) {
    //    lckPak = 'Y'
    //}

    //var lockdet = [];
    //for (var e = 0; e < locklist.length; e++) {
    //    //det[e].Cost_defn_bom_firstid=list[e].
    //    var objdet = {
    //        Cost_Defn_id: locklist[e].Cost_Defn_id,
    //        Cost_Defn_BOMid: locklist[e].Cost_Defn_BOMid,
    //        Processid: locklist[e].Processid,
    //        Itemid: locklist[e].Itemid,
    //        ColorID: locklist[e].Colorid,
    //        SizeID: locklist[e].Sizeid,
    //        Quantity: locklist[e].Quantity,
    //        Rate: locklist[e].Rate,
    //        Cost_defn_bom_firstid: locklist[e].Cost_defn_bom_firstid,
    //        Lock: locklist[e].Lock,
    //        styleid: styleid,
    //        Access_Type: locklist[e].Access_Type,
    //        LockSeqPrgm :lckPrgm,
    //        LockOrder :lckOrd,
    //        LockPlanning :lckPlan,
    //        LockConsumption :lckCon,
    //        LockFabric :lckFab,
    //        LockYarn :lckYarn,
    //        LockAccesories :lckAcc,
    //        LockPacking: lckPak
        
    //    }
    //    lockdet.push(objdet);
    //}

    //var LockObj = {

    //    Listofbomfirst: lockdet
    //}


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
            $('#LoadingSpinner').hide();
            if (result.Value == true) {
                AddUserEntryLog('Management Console', 'Budget Approval', 'UPDATE', $('#Ordernum').val());
                // alert('Data Updated Successfully');
                var msg = "Data Updated Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "";
                AlartMessage(msg, flg, mod, url);
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });


    //$.ajax({
    //    url: "/BudgetApproval/Lock",
    //    data: JSON.stringify(LockObj),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        debugger;
    //        if (result.Value == true) {

    //            alert('Data Locked Successfully');
    //            //window.location.href = "/BudgetApproval/BudgetApprovalIndex";
    //        }
    //        else {
    //            window.location.href = "/Error/Index";
    //        }

    //    },
    //    error: function (errormessage) {
    //        alert(errormessage.responseText);
    //    }

    //});


}


function Revert() {
    debugger;
    $('#LoadingSpinner').show();
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
            $('#LoadingSpinner').hide();
            if (result.Value == true) {
                AddUserEntryLog('Management Console', 'Budget Approval', 'REVERT', $('#Ordernum').val());
                //alert('Data Reverted Successfully');
                //window.location.href = "/BudgetApproval/BudgetApprovalIndex";
                var msg = "Data Reverted Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "/BudgetApproval/BudgetApprovalIndex";
                AlartMessage(msg, flg, mod, url);
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
            var PONo = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].OrderNo;
                var re = obj[t].RefNo;
                var st = obj[t].Style;
                var su = obj[t].Supplier;
                var rt = obj[t].PreRate;
                var po = obj[t].pur_ord_no;
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
                if (PONo == '') {
                    PONo = po;
                }
                else {
                    PONo = PONo + "," + po;
                }

            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            $('#txtmainstyle').val(sty);
            $('#txtsupplier').val(sup);
            $('#txtPrerate').val(rate);
            $('#txtmainPOno').val(PONo);
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
            var PONo = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].Orderno;
                var re = obj[t].refno;
                var st = obj[t].style;
                var su = obj[t].Supplier;
                var rt = obj[t].rate;
                var po = obj[t].POno;
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

                if (PONo == '') {
                    PONo = po;
                }
                else {
                    PONo = PONo + "," + po;
                }
            }
            $('#txtmainOrdno2').val(ord);
            $('#txtmainrefno2').val(ref);
            $('#txtmainstyle2').val(sty);
            $('#txtsupplier2').val(sup);
            $('#txtPrerate2').val(rate);
            $('#txtmainPOno2').val(PONo);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function calcRateBom() {
    debugger;

    //var table = $('#bomtable').DataTable();
    //var PId = table.row($(this).parents('tr')).data()["sno"];
    //var rate = table.row($(this).parents('tr')).data()["Rate"];
    ////var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
    //var apprate = table.row($(this).parents('tr')).data()["PoRate"];
    //var qty = table.row($(this).parents('tr')).data()["Quantity"];


    var PId = BomSno;
    var rate = 0;
    var apprate = 0;
    var qty = 0;
    var currrate = 0;
    var appcurrrate = 0;

    $.each(Bomlist, function () {
        if (this.sno == BomSno) {

             rate = this.Rate;         
             apprate = this.PoRate;
             qty = this.Quantity;
             currrate = this.CurrencyRate;
             appcurrrate = this.AppCurrencyRate;
        }
    });


   // var val = $(this).val();
    var val = 0;
    var table = $('#bomtable').DataTable();
    var ecdata = table.rows().data();
    $('input[id=txtratebom]').each(function (ig) {
        var row = $(this).closest('tr');
        if (ecdata[ig].sno == PId) {
           
            val = row.find('#txtratebom').val();



           
        }
    });



    if (apprate > 0 && val < apprate) {
        //alert('Po is made...Cant reduce the rate...');
        var msg = "PO is made...Cant reduce the rate...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        //LoadBomTable(Bomlist);
        var table = $('#bomtable').DataTable();
        var ecdata = table.rows().data();

        $('input[id=txtratebom]').each(function (ig) {
            var row = $(this).closest('tr');
            for (var h = 0; h < Bomlist.length; h++) {
                if (ecdata[ig].sno == Bomlist[h].sno) {

                    if (Bomlist[h].CurrencyRate > 0) {
                        var Rate = Bomlist[h].AppCurrencyRate;
                        var decimal = Bomlist[h].DecimalPlace;
                        row.find('#txtratebom').val(parseFloat(Rate).toFixed(decimal));
                    } else {
                        var Rate = Bomlist[h].Rate;
                        row.find('#txtratebom').val(parseFloat(Rate).toFixed(DcurrencyDecimal));
                    }

                  
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

            if (this.CurrencyRate > 0) {
                var decimal = this.DecimalPlace;

                this.AppCurrencyRate = parseFloat(val).toFixed(decimal);
                this.Rate = parseFloat(val * this.exchgerate).toFixed(DcurrencyDecimal);
            }
            else {

                this.Rate = parseFloat(val).toFixed(DcurrencyDecimal);
            }
        }
    });
   
    $.each(Bomlist, function () {
        if (this.sno == PId) {

            var cal = this.Rate * this.Quantity;
            //cal = parseFloat(cal).toFixed(2);

            //if (this.CurrencyRate > 0) {
            //    cal = cal * this.exchgerate;
            //}

            this.amount = parseFloat(cal).toFixed(DcurrencyDecimal);
        }
    });
    LoadBomTable(Bomlist);
    var table = $('#bomtable').DataTable();
    var ecdata = table.rows().data();
    debugger;
    $('input[id=txtratebom]').each(function (ig) {
        var row = $(this).closest('tr');
        for (var h = 0; h < Bomlist.length; h++) {
            if (ecdata[ig].sno == Bomlist[h].sno) {

                if (Bomlist[h].CurrencyRate > 0) {
                    var Rate = Bomlist[h].AppCurrencyRate;
                    row.find('#txtratebom').val(Rate);
                } else {
                    var Rate = Bomlist[h].Rate;
                    row.find('#txtratebom').val(Rate);
                }

                //var Rate = Bomlist[h].Rate;
                //row.find('#txtratebom').val(Rate);
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
}


function calcRateProcess() {
    debugger;


    //var table = $('#processtable').DataTable();
    //var PId = table.row($(this).parents('tr')).data()["sno"];
    //var rate = table.row($(this).parents('tr')).data()["Rate"];
    //var apprate = table.row($(this).parents('tr')).data()["Actual_Rate"];
    //var qty = table.row($(this).parents('tr')).data()["Quantity"];

    //var val = $(this).val();



    var PId = ProSno;
    var rate = 0;
    var apprate = 0;
    var qty = 0;

    $.each(Processlist, function () {
        if (this.sno == ProSno) {
            rate = this.Rate;         
            apprate = this.Actual_Rate;
            qty = this.Quantity;

        }
    });



    // var val = $(this).val();
    var val = 0;
    var table = $('#processtable').DataTable();
    var ecdata = table.rows().data();
    $('input[id=txtrateprocess]').each(function (ig) {
        var row = $(this).closest('tr');
        if (ecdata[ig].sno == PId) {
            var num = row.find('#txtrateprocess').val();
            val= row.find('#txtrateprocess').val();
        }
    });


    if (apprate > 0 && val < apprate) {
        //alert('Process Dc is made...Cant reduce the rate...');
        var msg = "Process Dc is made...Cant reduce the rate...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
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
    cal = cal.toFixed(DcurrencyDecimal);
    $.each(Processlist, function () {
        if (this.sno == PId) {
            this.amount = cal;
        }
    });
    LoadProcessTable(Processlist);
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
}
function SubPrint(StyId) {
    debugger;
    var CompId = $('#ddlMCompany').val();
    var styleId = StyId;
    window.open("../ReportInline/BudgetApproval/BudgetApprovalInlineReport.aspx?StyRowId=" + styleId + "&Companyid=" + CompId);
}

function loadDefaultCurrDeciaml() {
    debugger;
    var currID = $("#hdnDCurrencyId").data('value');

    $.ajax({
        url: "/Currency/GetbyID/" + currID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                DcurrencyDecimal = (obj.Decimalplace);
            }
        }

    });
}