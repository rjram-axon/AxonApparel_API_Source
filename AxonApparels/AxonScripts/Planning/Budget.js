var orderno, styleid, types, cost_id;
var bomdet = [];
var rowindex = 0;
var comId = 0;
var StyleId = 0;
var Processrowindex = -1;
var Processlistrowindex = -1;
var Bomrowindex = -1;
var processdetails1 = [];
var List = [];
var percentagelst = [];
var perpiecelst = [];
var indexval = -1;
var rowindex = 0;
var Mode = 0;
var productndet = [];
var namelistdet = [];
var StyRowId = 0;
var modeid = 0;
var commval = 0;
var Userid = 0;
var Guserid = 0;
var UserName = 0;
var flg = 0;
var BomSnid = 0;
var MisGafiChrg = '';
var OrdApp = "N";
var BomFillRate = 0;
var ProdtnFillRate = 0;
var ProdIdFill = 0;
var ProcFillRate = 0;
var ProcIdFill = 0;
var ProductnId = 0;
var ProducItm = '';
var ProducClr = '';
var ProducSz = '';

var tempimlist = [];
var tempszlist = [];
var tempcllist = [];

var ProcsId = 0;
var ProcsItm = '';
var ProcsClr = '';
var ProcsSz = '';
var BomFillItem = 0;
var CurrDecimalPlace = 0;
var DispatchClosed = "N";
var DcurrencyDecimal = 2;

$(document).ready(function () {

    // getorderdetails();
    debugger;
    flg = 0;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MisGafiChrg = $("#hdnGafiChrg").data('value');

    DcurrencyAbs = $("#hdnDCurrencyAbs").data('value');
    loadDefaultCurrDeciaml();
    //document.getElementById("lblcurrency").innerHTML = DcurrencyAbs;

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }
    if (queryvalue.length == 2) {
        StyRowId = queryvalue[1];
        Mode = 0;//queryvalue[3];
    }
    if (queryvalue.length == 4) {
        StyRowId = queryvalue[1];
        Mode = queryvalue[3];
    }
    debugger;
    if (queryvalue.length == 6) {
        StyRowId = queryvalue[1];
        Mode = queryvalue[3];
    }
    //if (Mode == 3) {
    //    getdeleteid();
    //}
    LoadCurrencyDDL("#ddlbomcurrency");
    LoadOrderNoDDL("#ddlCPOrderNo");
    LoadStyleDDL("#ddlCPSty");
    // LoadCurrencyDDL("#ddlCurrencybom");

    LoadPlanDetails(StyRowId);
    //commercialdet();
    getDate();
    clearTextBox();

    if (Mode == 0) {
        $("#btnsave").show();
        $("#btnUpd").hide();
        $("#btndelete").hide();
        $("#divBuyMer").hide();
    }
    if (Mode == 2) {
        flg = 0;
        $("#btnsave").hide();
        $("#btnUpd").show();
        $("#btndelete").hide();
        $("#divBuyMer").show();
    }

    if (Mode == 3) {
        flg = 0;
        $("#btnsave").hide();
        $("#btnUpd").hide();
        $("#btndelete").show();
        $("#divBuyMer").hide();
    }

    if (queryvalue.length == 6) {
        //StyRowId = queryvalue[1];
        //Mode = queryvalue[3];
        OrdApp = "Y";
        $("#btnsave").hide();
        $("#btnUpd").hide();
        $("#btndelete").hide();
        $("#divBuyMer").show();
    }
    $("#QizStatus").click(function () {
        debugger;
        if (MisGafiChrg == 'Y') {
            $('#QizStatus input[type="checkbox"]').prop('checked', this.checked);
            if (this.checked == true) {
                //var res = $('#txtstylerate').val();

                //var resq = parseFloat((4 * res) / 100);
                //resq = resq.toFixed(4);
                //$('#qizcharges').val(resq);

                var OrdVal = $("#txtOrderValue").val();
                var QizPer = $("#txtqizchargesper").val();
                var res = parseFloat((OrdVal * QizPer) / 100);

                res = res.toFixed(4);
                $('#qizcharges').val(res);
            }
            else {
                $('#qizcharges').val(0);
            }
            calcmarkup();
        }
        else if (MisGafiChrg == 'N') {
            $('#qizcharges').val(0);
            $('#markup').val(0);

            totcost();
        }
    });

    $('#production1table').on('click', 'tr', function (e) {
        debugger;
        var table = $('#production1table').DataTable();
        var row = $(this).closest('tr');
        var data = $('#production1table').dataTable().fnGetData(row);
        var processname = data.processname;
        ProductnId = data.processid;
        var d = $('input[name=optradioprocess]')[3].checked = true;

        var namelistprod = [];

        for (var d = 0; d < productndet.length; d++) {
            //$.each(productndet, function () {
            if (productndet[d].processname == processname) {
                debugger;
                var listof = {

                    Snumb: productndet[d].Snumb,
                    processid: productndet[d].processid,
                    Itemname: productndet[d].Itemname,
                    Color: productndet[d].Color,
                    Size: productndet[d].Size,
                    Quantity: productndet[d].Quantity,
                    Itmrate: productndet[d].Itmrate,
                    Amnt: productndet[d].Amnt,
                    secqnt: productndet[d].secqnt,
                    DispOpt: productndet[d].DispOpt,
                    apprate: productndet[d].apprate

                }
                namelistprod.push(listof);

            }
        }
        // 
        //listofprocessdet.push(namelist);
        $('#production2table').DataTable().destroy();

        namelistprod.sort(function (a, b) {
            return a.Snumb - b.Snumb;
        });

        $('#pdi').attr('disabled', false);
        $('#pds').attr('disabled', false);
        $('#pdc').attr('disabled', false);
        $('#pdn').attr('disabled', false);

        $('#production2table').DataTable({
            data: namelistprod,
            scrollY: 150,
            scrollCollapse: true,
            paging: false,
            fixedColumns: false,
            select: false,
            scrollX: "100%",
            scrollXInner: "100%",
            scroller: false,
            bSort: false,
            "rowCallback": function (row, data, index) {
                if (data.apprate > 0.00) {
                    $('#pdi').attr('disabled', true);
                    $('#pds').attr('disabled', true);
                    $('#pdc').attr('disabled', true);
                    $('#pdn').attr('disabled', true);
                }
            },
            columns: [
                 { title: "SNo", data: "Snumb", "visible": false },
                     { title: "Processid", data: "processid", "visible": false },
                     { title: "Item", data: "Itemname" },
                     { title: "Cat 1", data: "Color", "visible": false },
                     { title: "Cat 2", data: "Size", "visible": false },
                     {
                         title: "Quantity", data: "Quantity",
                         render: function (data) {

                             return '<input type="text" id="txtqtyproduc2" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                         },
                     },
                     //{
                     //    title: "Rate", data: "rate",
                     //    render: function (data, type) {
                     //        if (type === 'display') {
                     //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;"   onkeyup="calproductnamnt(this.value);"  value=' + data + '>';
                     //        }
                     //    }
                     //},
                     //{
                     //    title: "Amount", data: "Amnt",
                     //    render: function (data, type) {
                     //        if (type === 'display') {
                     //            return '<input type="text" id="txtamntproc2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                     //        }
                     //    }
                     //},

                        {
                            title: "Rate", data: "Itmrate",
                            render: function (data, type, row) {
                                if (row.apprate > 0.00) {
                                    return '<input type="text" id="txtrateproduc2" disabled class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                                } else {
                                    return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                                }
                            },
                        },

                     //{
                     //    title: "Rate", data: "Itmrate",
                     //    render: function (data) {

                     //        return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt" maxlength="7" style="width: 50px;text-align: center;" value=' + data + ' >';

                     //    },
                     //},
                     {
                         title: "Amount", data: "Amnt",
                         render: function (data) {

                             return '<input type="text" id="txtamntprodu2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                         },
                     },

            ]
        });
        $("#production2table tr").click(function () {
            var selected = $(this).hasClass("selected");
            $("#production2table tr").removeClass("selected");
            if (!selected)
                $(this).addClass("selected");
        });


        listofproductndet = namelistprod;


        if (listofproductndet[0].DispOpt=='C') {
            var cl = [];
            var qt = [];
            tempcllist = [];
            if (ProductnId > 0) {
                for (var r = 0; r < productndet.length; r++) {
                    if (productndet[r].processid == ProductnId) {
                        cl.push(productndet[r].Colorid);
                        qt.push(productndet[r]);
                    }
                }

                if (cl.length > 0) {
                    // cl = $.unique(cl);

                    cl = cl.filter(function (itm, i, cl) {
                        return i == cl.indexOf(itm);
                    });
                    for (var w = 0; w < cl.length; w++) {
                        var cid = cl[w];
                        var totalqty = 0;
                        var clr = '';
                        var rt = 0;
                        var Apprt = 0;
                        for (var m = 0; m < qt.length; m++) {
                            if (qt[m].Colorid == cid) {
                                var qty = qt[m].Quantity;
                                totalqty = totalqty + parseFloat(qty);
                                clr = qt[m].Color;
                                if (qt[m].Itmrate > 0) {
                                    rt = qt[m].Itmrate;
                                }
                               // rt = qt[m].Itmrate;
                                if (qt[m].apprate > 0) {
                                    Apprt = qt[m].apprate;
                                }
                               // Apprt = Apprt + parseFloat(qt[m].apprate);
                               // Apprt = qt[m].apprate;
                            }
                        }
                        for (var y = 0; y < cl.length; y++) {
                            if (cl[y] == cid) {
                                var Obj = {
                                    Snumb: 0,
                                    processid: ProductnId,
                                    Itemname: '',
                                    Color: clr,
                                    Size: '',
                                    Quantity: totalqty,
                                    Itmrate: rt,
                                    Amnt: (totalqty*rt).toFixed(3),
                                    apprate: Apprt
                                }
                                tempcllist.push(Obj);
                            }
                        }

                        for (var d = 0; d < productndet.length; d++) {
                            //$.each(processdetails1, function () {
                            if (productndet[d].processid == ProductnId && productndet[d].Colorid == cid) {
                                debugger;
                                productndet[d].Itmrate = rt;

                            }
                        }

                    }
                    LoadPrdnttble2(tempcllist);




                    var table = $('#production2table').DataTable();
                    table.column(3).visible(true);
                    table.column(4).visible(false);
                    table.column(2).visible(false);
                    $('input:radio[name="optradioprod"][value="C"]').prop('checked', true);

                   
                }
            }           
        }
        else if (listofproductndet[0].DispOpt == 'S') {
            var cl = [];
            var qt = [];
            tempszlist = [];
            if (ProductnId > 0) {
                for (var r = 0; r < productndet.length; r++) {
                    if (productndet[r].processid == ProductnId) {
                        cl.push(productndet[r].Sizeid);
                        qt.push(productndet[r]);
                    }
                }

                if (cl.length > 0) {
                    // cl = $.unique(cl);

                    cl = cl.filter(function (itm, i, cl) {
                        return i == cl.indexOf(itm);
                    });
                    for (var w = 0; w < cl.length; w++) {
                        var cid = cl[w];
                        var totalqty = 0;
                        var Sz = '';
                        var rt = 0;
                        var Apprt = 0;
                        for (var m = 0; m < qt.length; m++) {
                            if (qt[m].Sizeid == cid) {
                                var qty = qt[m].Quantity;
                                totalqty = totalqty + parseFloat(qty);
                                Sz = qt[m].Size;
                                if (qt[m].Itmrate > 0) {
                                    rt = qt[m].Itmrate;
                                }
                               // rt = qt[m].Itmrate;
                                if (qt[m].apprate > 0) {
                                    Apprt = qt[m].apprate;
                                }
                                //Apprt = Apprt + parseFloat(qt[m].apprate);
                               // Apprt = qt[m].apprate;
                            }
                        }
                        for (var y = 0; y < cl.length; y++) {
                            if (cl[y] == cid) {
                                var Obj = {
                                    Snumb: 0,
                                    processid: ProductnId,
                                    Itemname: '',
                                    Color: '',
                                    Size: Sz,
                                    Quantity: totalqty,
                                    Itmrate: rt,
                                    Amnt: (totalqty * rt).toFixed(3),
                                    apprate: Apprt

                                }
                                tempszlist.push(Obj);
                            }
                        }

                        for (var d = 0; d < productndet.length; d++) {
                            //$.each(processdetails1, function () {
                            if (productndet[d].processid == ProductnId && productndet[d].Sizeid == cid) {
                                debugger;
                                productndet[d].Itmrate = rt;

                            }
                        }
                    }
                    LoadPrdnttble2(tempszlist);

                  

                    var table = $('#production2table').DataTable();
                    table.column(4).visible(true);
                    table.column(3).visible(false);
                    $('input:radio[name="optradioprod"][value="S"]').prop('checked', true);
                }
            }
           
        }
        else if (listofproductndet[0].DispOpt == 'I') {
            var cl = [];
            var qt = [];
            tempimlist = [];
            if (ProductnId > 0) {
                for (var r = 0; r < productndet.length; r++) {
                    if (productndet[r].processid == ProductnId) {
                        cl.push(productndet[r].Itemid);
                        qt.push(productndet[r]);
                    }
                }

                if (cl.length > 0) {
                    // cl = $.unique(cl);

                    cl = cl.filter(function (itm, i, cl) {
                        return i == cl.indexOf(itm);
                    });
                    for (var w = 0; w < cl.length; w++) {
                        var cid = cl[w];
                        var totalqty = 0;
                        var Im = '';
                        var rt = 0;
                        var Apprt = 0;
                        for (var m = 0; m < qt.length; m++) {
                            if (qt[m].Itemid == cid) {
                                var qty = qt[m].Quantity;
                                totalqty = totalqty + parseFloat(qty);
                                Im = qt[m].Itemname;
                                if (qt[m].Itmrate > 0) {
                                    rt = qt[m].Itmrate;
                                }
                               // rt = qt[m].Itmrate;
                                if (qt[m].apprate > 0) {
                                    Apprt = qt[m].apprate;
                                }
                               // Apprt = Apprt + parseFloat(qt[m].apprate);
                               // Apprt = qt[m].apprate;
                            }
                        }
                        for (var y = 0; y < cl.length; y++) {
                            if (cl[y] == cid) {
                                var Obj = {
                                    Snumb: 0,
                                    processid: ProductnId,
                                    Itemname: Im,
                                    Color: '',
                                    Size: '',
                                    Quantity: totalqty,
                                    Itmrate: rt,
                                    Amnt: (totalqty * rt).toFixed(3),
                                    apprate: Apprt
                                }
                                tempimlist.push(Obj);
                            }
                        }

                        for (var d = 0; d < productndet.length; d++) {
                            //$.each(processdetails1, function () {
                            if (productndet[d].processid == ProductnId && productndet[d].Itemid == cid) {
                                debugger;
                                productndet[d].Itmrate = rt;

                            }
                        }
                    }
                    LoadPrdnttble2(tempimlist);
                  

                    var table = $('#production2table').DataTable();
                    table.column(2).visible(true);
                    table.column(4).visible(false);
                    table.column(3).visible(false);
                    $('input:radio[name="optradioprod"][value="I"]').prop('checked', true);

                   
                }
            }
           
        }
        else if (listofproductndet[0].DispOpt == 'N') {
            if (ProductnId > 0) {
                var ctry1 = jQuery.grep(productndet, function (value) {
                    return value.processid == ProductnId;
                });

                //$.each(ctry1, function () {
                //    if (this.processid == ProductnId) {
                //        this.Itmrate = 0;
                //        this.Amnt = 0;

                //    }
                //});
                LoadPrdnttble2(ctry1);


               
                var table = $('#production2table').DataTable();
                table.column(4).visible(true);
                table.column(3).visible(true);
                table.column(2).visible(false);
                $('input:radio[name="optradioprod"][value="N"]').prop('checked', true);

            }
            
        }
        var totalamnt = 0;
        for (var e = 0; e < namelistprod.length; e++) {
            var amount = namelistprod[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txttotamntprod').val(totalamnt);
        $('#production2table tr:eq(' + rowindex + ')').find('td:eq(2)').val(totalamnt);


        var amount = [];
        $.each(productndet, function () {
            if (this.processid == ProductnId) {

                amount.push(this.Amnt);
            }
        });
        var totalamnt = 0;
        for (var e = 0; e < amount.length; e++) {
            var amnt = amount[e];
            totalamnt = totalamnt + parseFloat(amnt);

        }

        var ctry = [];
        ctry = listofproduction;
        ctry = $.grep(ctry, function (e) {
            if (e.processid == ProductnId) {
                return e.Amnt = totalamnt;
            }
        });
        ctry;
       // loadprodntn1table(listofproduction);

        var table = $('#production1table').DataTable();
        var data = table.rows().data();

        $('input[id=txtamntprodnt1]').each(function (ig) {
            if (data[ig].processid == ProductnId ) {
                var row = $(this).closest('tr');
                row.find('#txtamntprodnt1').val(totalamnt);

            }
        });

        //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
        overallcalc();

        //$('input:radio[name="optradioprod"][value="N"]').prop('checked', true);


        //var table = $('#production2table').DataTable();
        //table.column(4).visible(true);
        //table.column(3).visible(true);
        //table.column(2).visible(false);


    });
    $('#process1table').on('click', 'tr', function (e) {
        debugger;

        var table = $('#process1table').DataTable();
        var row = $(this).closest('tr');
        var data = $('#process1table').dataTable().fnGetData(row);


        $('input[name=optradioprocess]')[3].checked = true;
        //rowindex = $(this).closest('tr').index();

        var processname = data.processname;
        ProcsId = data.processid;
        // var currentrow = getprocesslist.slice(rowindex); 
        //var currentrow = listofprocess.slice(rowindex);
        var namelist = [];
        // var processname = currentrow[0].processname;

        for (var d = 0; d < processdetails1.length; d++) {
            //$.each(processdetails1, function () {
            if (processdetails1[d].processname == processname) {
                debugger;
                var listof = {

                    Snumb: processdetails1[d].Snumb,
                    processid: processdetails1[d].processid,
                    Itemname: processdetails1[d].Itemname,
                    Color: processdetails1[d].Color,
                    Size: processdetails1[d].Size,
                    Quantity: processdetails1[d].Quantity,
                    Itmrate: processdetails1[d].Itmrate,
                    Amnt: processdetails1[d].Amnt,
                    secqnt: processdetails1[d].secqnt,
                    apprate: processdetails1[d].apprate,
                    DispOpt: processdetails1[d].DispOpt,
                    Itemid: processdetails1[d].Itemid,
                    Colorid: processdetails1[d].Colorid,
                    Sizeid: processdetails1[d].Sizeid
                }
                namelist.push(listof);

            }
        }
        // 
        //listofprocessdet.push(namelist);
        $('#process2table').DataTable().destroy();

        namelist.sort(function (a, b) {
            return a.Snumb - b.Snumb;
        });

        $('#pri').attr('disabled', false);
        $('#prs').attr('disabled', false);
        $('#prc').attr('disabled', false);
        $('#prn').attr('disabled', false);

        $('#process2table').DataTable({
            data: namelist,
            aaSorting: [[0, 'asc']],
            scrollY: 150,
            scrollCollapse: true,
            paging: false,
            fixedColumns: false,
            select: false,
            scrollX: "100%",
            scrollXInner: "100%",
            scroller: false,
            "rowCallback": function (row, data, index) {
                if (data.apprate > 0.00) {             
                    $('#pri').attr('disabled', true);
                    $('#prs').attr('disabled', true);
                    $('#prc').attr('disabled', true);
                    $('#prn').attr('disabled', true);                 
                }
            },
            //bSort: false,
            columns: [
                 { title: "SNo", data: "Snumb", "visible": false },
                     { title: "Processid", data: "processid", "visible": false },
                     { title: "Item", data: "Itemname" },
                     { title: "Cat 1", data: "Color", "visible": false },
                     { title: "Cat 2", data: "Size", "visible": false },
                     {
                         title: "Quantity", data: "Quantity",
                         render: function (data) {

                             return '<input type="text" id="txtqtyrateproc1" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                         },
                     },
                     //{
                     //    title: "Rate", data: "Itmrate",
                     //    render: function (data, type) {
                     //        if (type === 'display') {
                     //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;"   onkeyup="calprocamnt(this.value);"  value=' + data + '>';
                     //        }
                     //    }
                     //},
                      {
                          title: "Rate", data: "Itmrate",
                          render: function (data, type, row) {
                              if (row.apprate > 0.00) {
                                  return '<input type="text" id="txtrateproc1" disabled class="form-control calprocamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                              } else {
                                  return '<input type="text" id="txtrateproc1" class="form-control calprocamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                              }
                          },
                      },
                     //{
                     //    title: "Amount", data: "Amnt",
                     //    render: function (data, type) {
                     //        if (type === 'display') {
                     //            return '<input type="text" id="txtamntproc2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                     //        }
                     //    }
                     //},
                      {
                          title: "Amount", data: "Amnt",
                          render: function (data) {

                              return '<input type="text" id="txtamntproc2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                          },
                      },

                     {
                         title: "Sec Qty", data: "secqnt",


                     },
                     { title: "Itemid", data: "Itemid", "visible": false },
             { title: "Colorid", data: "Colorid", "visible": false },
             { title: "Sizeid", data: "Sizeid", "visible": false },

            ]
        });
        $("#process2table tr").click(function () {
            var selected = $(this).hasClass("selected");
            $("#process2table tr").removeClass("selected");
            if (!selected)
                $(this).addClass("selected");
        });

       
        listofprocessdet = namelist;
        //Display
        if (listofprocessdet[0].DispOpt == 'C') {
            var cl = [];
            var qt = [];
            tempcllist = [];
            if (ProcsId > 0) {
                for (var r = 0; r < processdetails1.length; r++) {
                    if (processdetails1[r].processid == ProcsId) {
                        cl.push(processdetails1[r].Colorid);
                        qt.push(processdetails1[r]);
                    }
                }

                if (cl.length > 0) {
                    // cl = $.unique(cl);

                    cl = cl.filter(function (itm, i, cl) {
                        return i == cl.indexOf(itm);
                    });
                    for (var w = 0; w < cl.length; w++) {
                        var cid = cl[w];
                        var totalqty = 0;
                        var clr = '';
                        var clrid = 0;
                        var rt = 0;
                        var Apprt = 0;
                        for (var m = 0; m < qt.length; m++) {
                            if (qt[m].Colorid == cid) {
                                var qty = qt[m].Quantity;
                                totalqty = totalqty + parseFloat(qty);
                                clr = qt[m].Color;
                                if (qt[m].Itmrate > 0) {
                                    rt = qt[m].Itmrate;
                                }
                                if (qt[m].apprate > 0) {
                                    Apprt = qt[m].apprate;
                                }

                               // Apprt = Apprt + parseFloat(qt[m].apprate);
                                //Apprt = qt[m].apprate;
                            }
                        }
                        for (var y = 0; y < cl.length; y++) {
                            if (cl[y] == cid) {
                                var Obj = {
                                    Snumb: 0,
                                    processid: ProcsId,
                                    Itemname: '',
                                    Color: clr,
                                    Size: '',
                                    Quantity: totalqty,
                                    Itmrate: rt,
                                    Amnt: (totalqty * rt).toFixed(3),
                                    secqnt: totalqty,
                                    Colorid: cid,
                                    Itemid: 0,
                                    Sizeid: 0,
                                    apprate: Apprt
                                }
                                tempcllist.push(Obj);

                                for (var d = 0; d < processdetails1.length; d++) {
                                    //$.each(processdetails1, function () {
                                    if (processdetails1[d].processid == ProcsId && processdetails1[d].Colorid == cid) {
                                        debugger;
                                        processdetails1[d].Itmrate = rt;

                                    }
                                }

                            }
                        }
                    }
                    LoadProcstbl2(tempcllist);
                    var table = $('#process2table').DataTable();
                    table.column(3).visible(true);
                    table.column(4).visible(false);
                    table.column(2).visible(false);
                    $('input:radio[name="optradioprocess"][value="C"]').prop('checked', true);

                }
            }
        }
        else if (listofprocessdet[0].DispOpt == 'S') {
            var cl = [];
            var qt = [];
            tempszlist = [];
            if (ProcsId > 0) {
                for (var r = 0; r < processdetails1.length; r++) {
                    if (processdetails1[r].processid == ProcsId) {
                        cl.push(processdetails1[r].Sizeid);
                        qt.push(processdetails1[r]);
                    }
                }

                if (cl.length > 0) {
                    // cl = $.unique(cl);

                    cl = cl.filter(function (itm, i, cl) {
                        return i == cl.indexOf(itm);
                    });
                    for (var w = 0; w < cl.length; w++) {
                        var cid = cl[w];
                        var totalqty = 0;
                        var Sz = '';
                        var rt = 0;
                        var Apprt = 0;
                        for (var m = 0; m < qt.length; m++) {
                            if (qt[m].Sizeid == cid) {
                                var qty = qt[m].Quantity;
                                totalqty = totalqty + parseFloat(qty);
                                Sz = qt[m].Size;
                                if (qt[m].Itmrate > 0) {
                                    rt = qt[m].Itmrate;
                                }
                                if (qt[m].apprate > 0) {
                                    Apprt = qt[m].apprate;
                                }
                               // Apprt = Apprt + parseFloat(qt[m].apprate);
                                //Apprt = qt[m].apprate;
                            }
                        }
                        for (var y = 0; y < cl.length; y++) {
                            if (cl[y] == cid) {
                                var Obj = {
                                    Snumb: 0,
                                    processid: ProcsId,
                                    Itemname: '',
                                    Color: '',
                                    Size: Sz,
                                    Quantity: totalqty,
                                    Itmrate: rt,
                                    Amnt: (totalqty * rt).toFixed(3),
                                    secqnt: totalqty,
                                    Sizeid: cid,
                                    Itemid: 0,
                                    Colorid: 0,
                                    apprate: Apprt
                                }
                                tempszlist.push(Obj);

                                for (var d = 0; d < processdetails1.length; d++) {
                                    //$.each(processdetails1, function () {
                                    if (processdetails1[d].processid == ProcsId && processdetails1[d].Sizeid == cid) {
                                        debugger;
                                        processdetails1[d].Itmrate = rt;

                                    }
                                }

                            }
                        }
                    }
                    LoadProcstbl2(tempszlist);
                    var table = $('#process2table').DataTable();
                    table.column(4).visible(true);
                    table.column(3).visible(false);
                    $('input:radio[name="optradioprocess"][value="S"]').prop('checked', true);
                }
            }

        }
        else if (listofprocessdet[0].DispOpt == 'I') {
            var cl = [];
            var qt = [];
            tempimlist = [];
            if (ProcsId > 0) {
                for (var r = 0; r < processdetails1.length; r++) {
                    if (processdetails1[r].processid == ProcsId) {
                        cl.push(processdetails1[r].Itemid);
                        qt.push(processdetails1[r]);
                    }
                }

                if (cl.length > 0) {
                    // cl = $.unique(cl);

                    cl = cl.filter(function (itm, i, cl) {
                        return i == cl.indexOf(itm);
                    });
                    for (var w = 0; w < cl.length; w++) {
                        var cid = cl[w];
                        var totalqty = 0;
                        var Im = '';
                        var rt = 0;
                        var Apprt = 0;
                        for (var m = 0; m < qt.length; m++) {
                            if (qt[m].Itemid == cid) {
                                var qty = qt[m].Quantity;
                                totalqty = totalqty + parseFloat(qty);
                                Im = qt[m].Itemname;
                                if (qt[m].Itmrate > 0) {
                                    rt = qt[m].Itmrate;
                                }
                                if (qt[m].apprate > 0) {
                                    Apprt = qt[m].apprate;
                                }
                               // Apprt = Apprt + parseFloat(qt[m].apprate);
                                //Apprt = qt[m].apprate;
                            }
                        }
                        for (var y = 0; y < cl.length; y++) {
                            if (cl[y] == cid) {
                                var Obj = {
                                    Snumb: 0,
                                    processid: ProcsId,
                                    Itemname: Im,
                                    Color: '',
                                    Size: '',
                                    Quantity: totalqty,
                                    Itmrate: rt,
                                    Amnt: (totalqty * rt).toFixed(3),
                                    secqnt: totalqty,
                                    Itemid: cid,
                                    Sizeid:0,
                                    Colorid: 0,
                                    apprate: Apprt
                                }
                                tempimlist.push(Obj);


                                for (var d = 0; d < processdetails1.length; d++) {
                                    //$.each(processdetails1, function () {
                                    if (processdetails1[d].processid == ProcsId && processdetails1[d].Itemid == cid) {
                                        debugger;
                                        processdetails1[d].Itmrate = rt;

                                    }
                                }

                            }
                        }
                    }
                    LoadProcstbl2(tempimlist);
                    var table = $('#process2table').DataTable();
                    table.column(2).visible(true);
                    table.column(4).visible(false);
                    table.column(3).visible(false);
                    $('input:radio[name="optradioprocess"][value="I"]').prop('checked', true);


                }
            }

        }
        else if (listofprocessdet[0].DispOpt == 'N') {
            if (ProcsId > 0) {
                var ctry1 = jQuery.grep(processdetails1, function (value) {
                    return value.processid == ProcsId;
                });

                //$.each(ctry1, function () {
                //    if (this.processid == ProductnId) {
                //        this.Itmrate = 0;
                //        this.Amnt = 0;

                //    }
                //});
                LoadProcstbl2(ctry1);



                var table = $('#process2table').DataTable();
                table.column(4).visible(true);
                table.column(3).visible(true);
                table.column(2).visible(false);
                $('input:radio[name="optradioprocess"][value="N"]').prop('checked', true);

            }

        }
        //

        var totalamnt = 0;
        for (var e = 0; e < namelist.length; e++) {
            var amount = namelist[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);

        }
        $('#txttotamnt').val(totalamnt);
        LoadPreProcessDetails(ProcsId, 0, 0, 0);
        //$('#process1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);

        // $('#bomtable tr:eq(' + rowindex + ')').find('td:eq(7)').text(finalresult);

        //GetProcessQuoteDet
        var JobOrdNo = $('#txtWorkOrder').val();
        $.ajax({
            url: "/Budget/GetProcessQuotedet",
            data: JSON.stringify({ ProcId: ProcsId, WorkOrdNo: JobOrdNo }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                var obj = json.Value;
                $('#ProQuotetable').DataTable().destroy();
                $('#ProQuotetable').DataTable({
                    data: obj,
                    scrollY: 150,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,


                    columns: [
                        { title: "QuoteNo", data: "Process_QuoteNo" },
                        { title: "MinQty", data: "MinQty" },
                        { title: "Rate", data: "Rate" },
                        { title: "Supplier", data: "Supplier" },
                    ]
                });
            }
        });
    });

    $('#btncldadd').click(function () {
        //validation and add order items
        var isAllValid = true;
        var itemddl = $("#ddlItem");
        debugger;
        if ($('#ddlItem').val() == "0") {
            isAllValid = false;
            $('#ddlItem').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
        }

        if (!($('#cost').val() != '' && (parseFloat($('#cost').val()) || 0))) {
            isAllValid = false;
            $('#cost').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#cost').siblings('span.error').css('visibility', 'hidden');
        }


        if (isAllValid) {
            debugger;
            var listObj = {
                particularid: $('#ddlItem').val(),
                particular: $("#ddlItem option:selected").text(),
                cost: $('#cost').val(),
                Value: $('#value').val(),
                remarks: $('#remarks').val(),
                CostType: $('input[name="price"]:checked').attr('value'),
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            var type = $('input[name="price"]:checked').attr('value');


            percentagelst.push(listObj);

            var tot = 0;
            for (var y = 0; y < percentagelst.length; y++) {
                var tt = percentagelst[y].Value;
                tot = tot + parseFloat(tt);
            }

            $('#totamntcomm').val(tot.toFixed(DcurrencyDecimal));
            $('#commercial').val(tot.toFixed(DcurrencyDecimal));

            loadchildTable(percentagelst);
            //$('#particularsdetails').DataTable().destroy();
            $('#ddlItem').val('0').trigger('change');
            $('#value').val('');
            $('#cost').val('');
            $('#remarks').val('');
            $('#orderItemError').empty();
        }
        //commercialcalc();
    })

    $(document).on('click', '.btnedit', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentro12 = percentagelst.slice(rowindex);

        $("#ddlItem").val(currentro12[0]['particularid']).trigger('change');
        $("#cost").val(currentro12[0]['cost']);
        $("#value").val(currentro12[0]['Value']);
        $("#remarks").val(currentro12[0]['remarks']);

        $('#btncldupdate').show();
        $('#btncldadd').hide();
    });
    $(document).on('click', '.btncurrbomadd', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentro12 = bomdet.slice(rowindex);
        $('#myModal1').modal('show');

        $("#txtsno").val(currentro12[0]['Snumb']);
        //$("#cost").val(currentro12[0]['cost']);
        //$("#value").val(currentro12[0]['Value']);
        //$("#remarks").val(currentro12[0]['remarks']);

        //$('#btncldupdate').show();
        //$('#btncldadd').hide();
    });
    $('#particularsdetails').DataTable().destroy();

    $('#btncldupdate').click(function () {
        debugger;
        //rowindex = $(this).closest('tr').index();

        var currentrowsel = percentagelst.slice(rowindex);

        currentrowsel[0]['particularid'] = $("#ddlItem").val();
        currentrowsel[0]['particular'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['cost'] = $("#cost").val();
        currentrowsel[0]['Value'] = $("#value").val();
        currentrowsel[0]['remarks'] = $("#remarks").val();
        currentrowsel[0]['CostType'] = $('input[name="price"]:checked').attr('value');
        percentagelst[rowindex] = currentrowsel[0];

        loadchildTable(percentagelst);
        $('#btncldupdate').hide();
        $('#btncldadd').show();

        if (Mode == 0) {
            clearTextBox();
            $('#remarks').val('');
            $('#cost').val('');
            $('#value').val('');
            $('#ddlItem').val('0');
        }
        else {
            $('#remarks').val('');
            $('#cost').val('');
            $('#value').val('');
            $('#ddlItem').val('0');

            $('#remarks').siblings('span.error').css('visibility', 'hidden');
            $('#value').siblings('span.error').css('visibility', 'hidden');
            $('#cost').siblings('span.error').css('visibility', 'hidden');
            $('#ddlItem').siblings('span.error').css('visibility', 'hidden');
        }
        var tot = 0;
        for (var y = 0; y < percentagelst.length; y++) {
            var tt = percentagelst[y].Value;
            tot = tot + parseFloat(tt);
        }

        $('#totamntcomm').val(tot.toFixed(DcurrencyDecimal));
        $('#commercial').val(tot.toFixed(DcurrencyDecimal));
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
        var workno = $('#Ordernum').val();
      
        loadPurQuote(workno, itm, clr, sz, comId);

        BomSnid = data.Snumb;
        $.each(bomdet, function () {
            if (this.Snumb == BomSnid) {
                $('#ddlbomcurrency').val(this.bomcurrencyid).trigger('change');
                $('#txtbomexrate').val(this.bomexrate);
                $('#txtbomrate').val(parseFloat(this.bomcurrate).toFixed(this.decimalplace));
            }
        });
        var OrdNo = $('#Ordernum').val();
        $.ajax({
            url: "/Budget/GetPurchaseQuotedet",
            data: JSON.stringify({ OrdNo: OrdNo, ItemId: itm, colorId: clr, SizeId: sz }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                var obj = json.Value;
                $('#PurQuotetable').DataTable().destroy();
                $('#PurQuotetable').DataTable({
                    data: obj,
                    scrollY: 150,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,


                    columns: [
                        { title: "QuoteNo", data: "EntryNo" },
                        { title: "MinQty", data: "MinQty" },
                        { title: "MaxQty", data: "MaxQty" },
                        { title: "Rate", data: "Rate" },
                        { title: "Supplier", data: "Supplier" },
                    ]
                });
            }
        });
    });

    $('#process2table').on('click', 'tr', function (e) {

        debugger;
        var table = $('#process2table').DataTable();
        var row = $(this).closest('tr');
        var data = $('#process2table').dataTable().fnGetData(row);

        var itm = data.Itemid;
        var sz = data.Sizeid;
        var clr = data.Colorid;
      
        var workno = $('#txtWorkOrder').val();

        loadProQuote(workno, itm, clr, sz, ProcsId, comId);
    });

    $(document).on('keyup', '.Addcurr', function () {
        debugger;
        if (BomSnid == 0) {
            //alert('Please select any bom...');
            var msg = 'Please select any BOM...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
        var cuid = $('#ddlbomcurrency').val();
        var eschrte = $('#txtbomexrate').val();
        var rte = $('#txtbomrate').val();
        var rate = eschrte * rte;
        rate = parseFloat(rate).toFixed(DcurrencyDecimal);

        var totamnt = 0;
        $.each(bomdet, function () {
            if (this.Snumb == BomSnid) {
                this.Itmrate = parseFloat(rate).toFixed(DcurrencyDecimal);
                this.Amnt = parseFloat(this.Quantity * rate).toFixed(DcurrencyDecimal);
                totamnt = this.Amnt;
                this.bomcurrencyid = cuid;
                this.bomexrate = eschrte;
                this.bomcurrate = parseFloat(rte).toFixed(CurrDecimalPlace);
            }
        });
        var totalamnt = 0;
        for (var e = 0; e < bomdet.length; e++) {
            var amount = bomdet[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);

        }

        $('#txttotbom').val(totalamnt.toFixed(DcurrencyDecimal));
        //alert(bomdet);
        overallcalc();
        var septable = $('#bomtable').DataTable();
        var sepdata = septable.rows().data();

        $('input[id=bomrate]').each(function (ig) {
            if (sepdata[ig].Snumb == BomSnid) {
                var row = $(this).closest('tr');
                row.find('#bomrate').val(parseFloat(rate).toFixed(DcurrencyDecimal));
                row.find('#txtamnt').val(parseFloat(totamnt).toFixed(DcurrencyDecimal));
            }
        });
    });


    $(document).on('change', '#txtbomrate', function () {
        debugger;
        $.each(bomdet, function () {
            if (this.Snumb == BomSnid) {
                $('#ddlbomcurrency').val(this.bomcurrencyid).trigger('change');
                $('#txtbomexrate').val(this.bomexrate);
                $('#txtbomrate').val(parseFloat(this.bomcurrate).toFixed(this.decimalplace));
            }
        });

    });


    $(document).on('change', '.txtrate', function () {
        debugger;



        //calcamnt($(this).val(), rowindex);
        var value = $(this).val();
        var table = $('#bomtable').DataTable();

        var quantity = table.row($(this).parents('tr')).data()["Quantity"];
        snum = table.row($(this).parents('tr')).data()["Snumb"];
        var ItemId = table.row($(this).parents('tr')).data()["Itemid"];


        var ratecal = parseFloat(value).toFixed(DcurrencyDecimal);
        BomFillRate = parseFloat(value).toFixed(DcurrencyDecimal);
        BomFillItem = ItemId;
        var res = ratecal * quantity;
        debugger;
        finalresult = res.toFixed(DcurrencyDecimal);
        // $('#bomtable tr:eq(' + (rowindex+1) + ')').find('td:eq(7)').text(finalresult);


        $.each(bomdet, function () {
            if (this.Snumb == snum) {
                this.Itmrate = parseFloat(ratecal).toFixed(DcurrencyDecimal);
                this.Amnt = finalresult;
            }
        });
        //bom(bomdet);
        var totalamnt = 0;
        for (var e = 0; e < bomdet.length; e++) {
            var amount = bomdet[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);

        }

        $('#txttotbom').val(totalamnt.toFixed(DcurrencyDecimal));
        //alert(bomdet);
        overallcalc();


        var septable = $('#bomtable').DataTable();
        var sepdata = septable.rows().data();

        $('input[id=bomrate]').each(function (ig) {
            if (sepdata[ig].Snumb == snum) {
                var row = $(this).closest('tr');
                row.find('#bomrate').val(parseFloat(ratecal).toFixed(DcurrencyDecimal));

                row.find('#txtamnt').val(finalresult);
            }
        });
    });

    //$(document).on('keyup', '.txtrate', function () {
    //    debugger;



    //    //calcamnt($(this).val(), rowindex);
    //    var value = $(this).val();
    //    var table = $('#bomtable').DataTable();

    //    var quantity = table.row($(this).parents('tr')).data()["Quantity"];
    //    snum = table.row($(this).parents('tr')).data()["Snumb"];


    //    var ratecal = value;
    //    var res = ratecal * quantity;
    //    debugger;
    //    finalresult = res.toFixed(2);
    //    // $('#bomtable tr:eq(' + (rowindex+1) + ')').find('td:eq(7)').text(finalresult);


    //    $.each(bomdet, function () {
    //        if (this.Snumb == snum) {
    //            this.Itmrate = ratecal;
    //            this.Amnt = finalresult;
    //        }
    //    });
    //    bom(bomdet);
    //    var totalamnt = 0;
    //    for (var e = 0; e < bomdet.length; e++) {
    //        var amount = bomdet[e].Amnt;
    //        totalamnt = totalamnt + parseFloat(amount);

    //    }

    //    $('#txttotbom').val(totalamnt.toFixed(3));
    //    //alert(bomdet);
    //    overallcalc();

    //    var rows = $("#bomtable").dataTable().fnGetNodes();
    //    var dtTable = $('#bomtable').DataTable();
    //    for (var i = 0; i < rows.length; i++) {
    //        var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
    //        $('input[id=bomrate]').each(function () {
    //            if (sn == snum && $(this).val() == value) {
    //                var row = $(this).closest('tr');
    //                var num = row.find('#bomrate').val();
    //                row.find('#bomrate').focus().val('').val(num);
    //                return true;
    //            }
    //        });
    //    }
    //});

    $(document).on('keyup', '.calprocamnt', function () {
        debugger;

        //calcamnt($(this).val(), rowindex);
        var value = $(this).val();

        var type = $('input[name="optradioprocess"]:checked').attr('value');

        var table = $('#process2table').DataTable();

        var quantity = table.row($(this).parents('tr')).data()["Quantity"];
        snum = table.row($(this).parents('tr')).data()["Snumb"];
        var proid = table.row($(this).parents('tr')).data()["processid"];
        var processnameadd = table.row($(this).parents('tr')).data()["processname"];
        ProcsItm = table.row($(this).parents('tr')).data()["Itemname"];
        ProcsClr = table.row($(this).parents('tr')).data()["Color"];
        ProcsSz = table.row($(this).parents('tr')).data()["Size"];
        ProcFillRate = value;
        ProcIdFill = proid;
        var ratecal = value;
        



        if (type == 'C') {
            var clr = table.row($(this).parents('tr')).data()["Color"];
            $.each(processdetails1, function () {
                if (this.processid == proid && this.Color == clr) {
                    this.Itmrate = value;
                    var res = value * this.Quantity;
                    res = res.toFixed(DcurrencyDecimal);
                    this.Amnt = res;
                    this.DispOpt = type;
                }
            });


            var fabdata = table.rows().data();

            $('input[id=txtrateproc1]').each(function (ig) {
                if (fabdata[ig].processid == proid && fabdata[ig].Color == clr) {
                    var row = $(this).closest('tr');
                    row.find('#txtrateproc1').val(value);
                    var r = row.find('#txtqtyrateproc1').val();
                    var res1 = value * r;
                    res1 = res1.toFixed(DcurrencyDecimal);
                    row.find('#txtamntproc2').val(res1);

                }
            });
        }
        else if (type == 'S') {

            var sz = table.row($(this).parents('tr')).data()["Size"];
            $.each(processdetails1, function () {
                if (this.processid == proid && this.Size == sz) {
                    this.Itmrate = value;
                    var res = value * this.Quantity;
                    res = res.toFixed(DcurrencyDecimal);
                    this.Amnt = res;
                    this.DispOpt = type;
                }
            });


            var fabdata = table.rows().data();

            $('input[id=txtrateproc1]').each(function (ig) {
                if (fabdata[ig].processid == proid && fabdata[ig].Size == sz) {
                    var row = $(this).closest('tr');
                    row.find('#txtrateproc1').val(value);
                    var r = row.find('#txtqtyrateproc1').val();
                    var res1 = value * r;
                    res1 = res1.toFixed(DcurrencyDecimal);
                    row.find('#txtamntproc2').val(res1);

                }
            });

        }
        else if (type == 'I') {
            var im = table.row($(this).parents('tr')).data()["Itemname"];
            $.each(processdetails1, function () {
                if (this.processid == proid && this.Itemname == im) {
                    this.Itmrate = value;
                    var res = value * this.Quantity;
                    res = res.toFixed(DcurrencyDecimal);
                    this.Amnt = res;
                    this.DispOpt = type;
                }
            });


            var fabdata = table.rows().data();

            $('input[id=txtrateproc1]').each(function (ig) {
                if (fabdata[ig].processid == proid && fabdata[ig].Itemname == im) {
                    var row = $(this).closest('tr');
                    row.find('#txtrateproc1').val(value);
                    var r = row.find('#txtqtyrateproc1').val();
                    var res1 = value * r;
                    res1 = res1.toFixed(DcurrencyDecimal);
                    row.find('#txtamntproc2').val(res1);

                }
            });
        }
        else if (type == 'N') {
            var quantity = table.row($(this).parents('tr')).data()["Quantity"];
            snum = table.row($(this).parents('tr')).data()["Snumb"];

            var processnameadd = table.row($(this).parents('tr')).data()["processname"];
            var res = ratecal * quantity;
            finalresult = res.toFixed(DcurrencyDecimal);
            //var fabtable = $('#tCDbody').DataTable();
            var fabdata = table.rows().data();

            $('input[id=txtrateproc1]').each(function (ig) {
                if (fabdata[ig].Snumb == snum && fabdata[ig].processid == proid) {
                    var row = $(this).closest('tr');
                    row.find('#txtamntproc2').val(finalresult);

                }
            });


            for (var d = 0; d < listofprocess.length; d++) {
                //$.each(processdetails1, function () {
                if (listofprocess[d].processname == processnameadd) {

                }
            }

            // })

            $.each(processdetails1, function () {
                if (this.Snumb == snum) {
                    this.Itmrate = ratecal;
                    this.Amnt = finalresult;
                    this.DispOpt = type;
                }
            });
        }
        debugger;

        processdetails1;
        var totalamnt = 0;
        for (var e = 0; e < processdetails1.length; e++) {
            if (processdetails1[e].processid == proid) {
                var amount = processdetails1[e].Amnt;
                totalamnt = totalamnt + parseFloat(amount);
            }
        }
        $('#txttotamnt').val(totalamnt);


        var amount = [];
        $.each(processdetails1, function () {
            if (this.processid == proid) {
                amount.push(this.Amnt);
            }
        });
        var totalamnt = 0;
        for (var e = 0; e < amount.length; e++) {
            var amnt = amount[e];
            totalamnt = totalamnt + parseFloat(amnt);

        }

        var ctry = [];
        ctry = listofprocess;
        ctry = $.grep(ctry, function (e) {
            if (e.processid == proid) {
                return e.Amnt = totalamnt;
            }
        });
        ctry;
        loadprocess1table(listofprocess);
        //$('#process1table tr:eq(' + (rowindex) + ')').find('td:eq(1)').text(totalamnt);
        overallcalc();

    });
    $(document).on('keyup', '.calproductnamnt', function () {
        debugger;
        var vali=false;
        vali = calalertprd()
        if (vali) {

            //calcamnt($(this).val(), rowindex);
            var value = $(this).val();

            var type = $('input[name="optradioprod"]:checked').attr('value');

            var table = $('#production2table').DataTable();
            var proid = table.row($(this).parents('tr')).data()["processid"];
            ProducItm = table.row($(this).parents('tr')).data()["Itemname"];
            ProducClr = table.row($(this).parents('tr')).data()["Color"];
            ProducSz = table.row($(this).parents('tr')).data()["Size"];
            ProdtnFillRate = value;
            ProdIdFill = proid;

            if (type == 'C') {
                var clr = table.row($(this).parents('tr')).data()["Color"];
                $.each(productndet, function () {
                    if (this.processid == proid && this.Color == clr) {
                        this.Itmrate = value;
                        var res = value * this.Quantity;
                        res = res.toFixed(DcurrencyDecimal);
                        this.Amnt = res;
                        this.DispOpt = type;
                    }
                });


                var fabdata = table.rows().data();

                $('input[id=txtrateproduc2]').each(function (ig) {
                    if (fabdata[ig].processid == proid && fabdata[ig].Color == clr) {
                        var row = $(this).closest('tr');
                        row.find('#txtrateproduc2').val(value);
                        var r = row.find('#txtqtyproduc2').val();
                        var res1 = value * r;
                        res1 = res1.toFixed(DcurrencyDecimal);
                        row.find('#txtamntprodu2').val(res1);

                    }
                });
            }

            else if (type == 'S') {

                var sz = table.row($(this).parents('tr')).data()["Size"];
                $.each(productndet, function () {
                    if (this.processid == proid && this.Size == sz) {
                        this.Itmrate = value;
                        var res = value * this.Quantity;
                        res = res.toFixed(DcurrencyDecimal);
                        this.Amnt = res;
                        this.DispOpt = type;
                    }
                });


                var fabdata = table.rows().data();

                $('input[id=txtrateproduc2]').each(function (ig) {
                    if (fabdata[ig].processid == proid && fabdata[ig].Size == sz) {
                        var row = $(this).closest('tr');
                        row.find('#txtrateproduc2').val(value);
                        var r = row.find('#txtqtyproduc2').val();
                        var res1 = value * r;
                        res1 = res1.toFixed(DcurrencyDecimal);
                        row.find('#txtamntprodu2').val(res1);

                    }
                });

            }
            else if (type == 'I') {
                var im = table.row($(this).parents('tr')).data()["Itemname"];
                $.each(productndet, function () {
                    if (this.processid == proid && this.Itemname == im) {
                        this.Itmrate = value;
                        var res = value * this.Quantity;
                        res = res.toFixed(DcurrencyDecimal);
                        this.Amnt = res;
                        this.DispOpt = type;
                    }
                });


                var fabdata = table.rows().data();

                $('input[id=txtrateproduc2]').each(function (ig) {
                    if (fabdata[ig].processid == proid && fabdata[ig].Itemname == im) {
                        var row = $(this).closest('tr');
                        row.find('#txtrateproduc2').val(value);
                        var r = row.find('#txtqtyproduc2').val();
                        var res1 = value * r;
                        res1 = res1.toFixed(DcurrencyDecimal);
                        row.find('#txtamntprodu2').val(res1);

                    }
                });
            }
            else if (type == 'N') {
                var quantity = table.row($(this).parents('tr')).data()["Quantity"];
                snum = table.row($(this).parents('tr')).data()["Snumb"];

                var processnameadd = table.row($(this).parents('tr')).data()["processname"];


                // }
                var ratecal = value;
                var res = ratecal * quantity;

                finalresult = res.toFixed(DcurrencyDecimal);
                var fabdata = table.rows().data();

                $('input[id=txtrateproduc2]').each(function (ig) {
                    if (fabdata[ig].Snumb == snum && fabdata[ig].processid == proid) {
                        var row = $(this).closest('tr');
                        row.find('#txtamntprodu2').val(finalresult);

                    }
                });


                $.each(productndet, function () {
                    if (this.Snumb == snum) {
                        this.Itmrate = ratecal;
                        this.Amnt = finalresult;
                        this.DispOpt = type;
                    }
                });
            }
            debugger;

            $.each(productndet, function () {
                if (this.processid == proid) {
                    this.DispOpt = type;
                }
            });
            productndet;
            var totalamnt = 0;
            for (var e = 0; e < productndet.length; e++) {
                if (productndet[e].processid == proid) {
                    var amount = productndet[e].Amnt;
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            $('#txttotamntprod').val(totalamnt);

            var amount = [];
            $.each(productndet, function () {
                if (this.processid == proid) {
                    amount.push(this.Amnt);
                }
            });
            var totalamnt = 0;
            for (var e = 0; e < amount.length; e++) {
                var amnt = amount[e];
                totalamnt = totalamnt + parseFloat(amnt);

            }

            var ctry = [];
            ctry = listofproduction;
            ctry = $.grep(ctry, function (e) {
                if (e.processid == proid) {
                    return e.Amnt = totalamnt;
                }
            });
            ctry;
            loadprodntn1table(listofproduction);
            //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
            overallcalc();
        }

    });
    $('#process2table tbody').on('click', 'td', function () {
        var tr = $(this).closest("tr");
        var rowindex = tr.index();

        Processrowindex = rowindex;
    });

    $('#production2table tbody').on('click', 'td', function () {
        var tr = $(this).closest("tr");
        var rowindex = tr.index();

        Processrowindex = rowindex;
    });

    $('#bomtable tbody').on('click', 'td', function () {
        var tr = $(this).closest("tr");
        var rowindex = tr.index();

        Bomrowindex = rowindex;
    });


});



function loadexcratebom() {
    debugger;
    var currID = $('#ddlbomcurrency').val();

    $.ajax({
        url: "/Currency/GetbyID/" + currID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtbomexrate').val(obj.Exchangerate); 
                CurrDecimalPlace=(obj.Decimalplace);

                var r = $('#txtbomrate').val();
                if (r != "") {
                    if (BomSnid == 0) {
                        //alert('Please select any bom...');
                        var msg = 'Please select any BOM...';
                        var flg = 4;
                        var mode = 1;
                        var url = "";
                        AlartMessage(msg, flg, mode, url);
                        return true;
                    }
                    var cuid = $('#ddlbomcurrency').val();
                    var eschrte = $('#txtbomexrate').val();
                    var rte = $('#txtbomrate').val();
                    var rate = eschrte * rte;
                    rate = parseFloat(rate).toFixed(DcurrencyDecimal);
                    var totamnt = 0;
                    $.each(bomdet, function () {
                        if (this.Snumb == BomSnid) {
                            this.Itmrate = parseFloat(rate).toFixed(DcurrencyDecimal);
                            this.Amnt = (this.Quantity * rate).toFixed(DcurrencyDecimal);
                            totamnt = this.Amnt;
                            this.bomcurrencyid = cuid;
                            this.bomexrate = eschrte;
                            this.decimalplace = CurrDecimalPlace;
                            this.bomcurrate = parseFloat(rte).toFixed(CurrDecimalPlace);
                        }
                    });
                    var totalamnt = 0;
                    for (var e = 0; e < bomdet.length; e++) {
                        var amount = bomdet[e].Amnt;
                        totalamnt = totalamnt + parseFloat(amount);

                    }

                    $('#txttotbom').val(totalamnt.toFixed(DcurrencyDecimal));
                    //alert(bomdet);
                    overallcalc();
                    var septable = $('#bomtable').DataTable();
                    var sepdata = septable.rows().data();

                    $('input[id=bomrate]').each(function (ig) {
                        if (sepdata[ig].Snumb == BomSnid) {
                            var row = $(this).closest('tr');
                            row.find('#bomrate').val(parseFloat(rate).toFixed(DcurrencyDecimal));
                            row.find('#txtamnt').val(parseFloat(totamnt).toFixed(DcurrencyDecimal));
                        }
                    });
                }
            }
        }

    });
}


function Loadexchangerate() {
    debugger;
    var currID = $('#ddlSCurrency').val();
    var currName = $("#ddlSCurrency option:selected").text();
    //if (currID != 0) {
    //    $("#lblcurrency").text(currName);
    //}
    //else {
        $("#lblcurrency").text("Indian Rupees");
    //}

    $.ajax({
        url: "/Currency/GetbyID/" + currID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

               // $('#exchange').val(obj.Exchangerate);
                var exrat = obj.Exchangerate;

                var set = $('#costset').val();

                var qt = $('#txtshiprate').val();

                var ccset = set / qt;

                var ex = $('#exchange').val();

                $('#exchange').val(ex);

                //var res = parseFloat(set * ex).toFixed(2);
                //$('#rupees').val(res);

                var selcurrency = set / ex;

                $('#selcurr').val(selcurrency.toFixed(DcurrencyDecimal));


                if (Mode == 2 || Mode == 3) {
                    $('#saleprice').val(masdetails[0].salesprice);                    
                    //$('#profit').val(masdetails[0].saleprofit);
                    $('#remark').val(masdetails[0].remarks);
                    calcsaleprice();
                }

            }
        }

    });

}

var listofprocessdet = [];
$(document).on('click', '.loadprocess', function () {
    debugger;


    $('input[name=optradioprocess]')[3].checked = true;
    rowindex = $(this).closest('tr').index();

    // var currentrow = getprocesslist.slice(rowindex); 
    var currentrow = listofprocess.slice(rowindex);
    var namelist = [];
    var processname = currentrow[0].processname;

    for (var d = 0; d < processdetails1.length; d++) {
        //$.each(processdetails1, function () {
        if (processdetails1[d].processname == processname) {
            debugger;
            var listof = {
                Snumb: processdetails1[d].Snumb,
                processid: processdetails1[d].processid,
                Itemname: processdetails1[d].Itemname,
                Color: processdetails1[d].Color,
                Size: processdetails1[d].Size,
                Quantity: processdetails1[d].Quantity,
                Itmrate: processdetails1[d].Itmrate,
                Amnt: processdetails1[d].Amnt,
                secqnt: processdetails1[d].secqnt,
                Itemid: processdetails1[d].Itemid,
                Colorid: processdetails1[d].Colorid,
                Sizeid: processdetails1[d].Sizeid
            }
            namelist.push(listof);

        }
    }
    // 
    //listofprocessdet.push(namelist);
    $('#process2table').DataTable().destroy();

    namelist.sort(function (a, b) {
        return a.Snumb - b.Snumb;
    });

    $('#pri').attr('disabled', false);
    $('#prs').attr('disabled', false);
    $('#prc').attr('disabled', false);
    $('#prn').attr('disabled', false);

    $('#process2table').DataTable({
        data: namelist,
        aaSorting: [[0, 'asc']],
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        
        "rowCallback": function (row, data, index) {
            if (data.apprate > 0.00) {             
                $('#pri').attr('disabled', true);
                $('#prs').attr('disabled', true);
                $('#prc').attr('disabled', true);
                $('#prn').attr('disabled', true);                 
            }
        },
        //bSort: false,
        columns: [
             { title: "SNo", data: "Snumb", "visible": false },
                 { title: "Processid", data: "processid", "visible": false },
                 { title: "Item", data: "Itemname" },
                 { title: "Cat 1", data: "Color", "visible": false },
                 { title: "Cat 2", data: "Size", "visible": false },
                 {
                     title: "Quantity", data: "Quantity",
                     render: function (data) {

                         return '<input type="text" id="txtqtyrateproc1" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                     },
                 },
                 //{
                 //    title: "Rate", data: "Itmrate",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;"   onkeyup="calprocamnt(this.value);"  value=' + data + '>';
                 //        }
                 //    }
                 //},
                  {
                      title: "Rate", data: "Itmrate",
                      render: function (data, type, row) {
                          if (row.apprate > 0.00) {
                              return '<input type="text" id="txtrateproc1" disabled class="form-control calprocamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                          } else {
                              return '<input type="text" id="txtrateproc1" class="form-control calprocamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                          }
                      },
                  },
                 //{
                 //    title: "Amount", data: "Amnt",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtamntproc2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                 //        }
                 //    }
                 //},
                  {
                      title: "Amount", data: "Amnt",
                      render: function (data) {

                          return '<input type="text" id="txtamntproc2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                      },
                  },

                 {
                     title: "Sec Qty", data: "secqnt",


                 },
             { title: "Itemid", data: "Itemid", "visible": false },
             { title: "Colorid", data: "Colorid", "visible": false },
             { title: "Sizeid", data: "Sizeid", "visible": false },

        ]
    });

    listofprocessdet = namelist;

    var totalamnt = 0;
    for (var e = 0; e < namelist.length; e++) {
        var amount = namelist[e].Amnt;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttotamnt').val(totalamnt);
    //$('#process1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);

    // $('#bomtable tr:eq(' + rowindex + ')').find('td:eq(7)').text(finalresult);


});

var listofproductndet = [];
$(document).on('click', '.loadproductn', function () {
    debugger;


    var d = $('input[name=optradioprocess]')[3].checked = true;
    rowindex = $(this).closest('tr').index();

    var currentrow = listofproduction.slice(rowindex);

    var namelistprod = [];
    var processname = currentrow[0].processname;

    for (var d = 0; d < productndet.length; d++) {
        //$.each(productndet, function () {
        if (productndet[d].processname == processname) {
            debugger;
            var listof = {

                Snumb: productndet[d].Snumb,
                processid: productndet[d].processid,
                Itemname: productndet[d].Itemname,
                Color: productndet[d].Color,
                Size: productndet[d].Size,
                Quantity: productndet[d].Quantity,
                Itmrate: productndet[d].Itmrate,
                Amnt: productndet[d].Amnt,
                secqnt: productndet[d].secqnt

            }
            namelistprod.push(listof);

        }
    }
    // 
    //listofprocessdet.push(namelist);
    $('#production2table').DataTable().destroy();

    namelistprod.sort(function (a, b) {
        return a.Snumb - b.Snumb;
    });
    $('#pdi').attr('disabled', false);
    $('#pds').attr('disabled', false);
    $('#pdc').attr('disabled', false);
    $('#pdn').attr('disabled', false);

    $('#production2table').DataTable({
        data: namelistprod,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        "rowCallback": function (row, data, index) {
            if (data.apprate > 0.00) {
                $('#pdi').attr('disabled', true);
                $('#pds').attr('disabled', true);
                $('#pdc').attr('disabled', true);
                $('#pdn').attr('disabled', true);
            }
        },
        columns: [
             { title: "SNo", data: "Snumb", "visible": false },
                 { title: "Processid", data: "processid", "visible": false },
                 { title: "Item", data: "Itemname" },
                 { title: "Cat 1", data: "Color", "visible": false },
                 { title: "Cat 2", data: "Size", "visible": false },
                 {
                     title: "Quantity", data: "Quantity",
                     render: function (data) {

                         return '<input type="text" id="txtqtyproduc2" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                     },
                 },
                 //{
                 //    title: "Rate", data: "rate",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;"   onkeyup="calproductnamnt(this.value);"  value=' + data + '>';
                 //        }
                 //    }
                 //},
                 //{
                 //    title: "Amount", data: "Amnt",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtamntproc2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                 //        }
                 //    }
                 //},

                     {
                         title: "Rate", data: "Itmrate",
                         render: function (data, type, row) {
                             if (row.apprate > 0.00) {
                                 return '<input type="text" id="txtrateproduc2" disabled class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                             } else {
                                 return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                             }
                         },
                     },

                 //{
                 //    title: "Rate", data: "Itmrate",
                 //    render: function (data) {

                 //        return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt" maxlength="7" style="width: 50px;text-align: center;" value=' + data + ' >';

                 //    },
                 //},
                 {
                     title: "Amount", data: "Amnt",
                     render: function (data) {

                         return '<input type="text" id="txtamntprodu2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                     },
                 },

        ]
    });
    $("#production2table tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#production2table tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
    listofproductndet = namelistprod;

    var totalamnt = 0;
    for (var e = 0; e < namelistprod.length; e++) {
        var amount = namelistprod[e].Amnt;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttotamntprod').val(totalamnt);
    $('#production2table tr:eq(' + rowindex + ')').find('td:eq(2)').val(totalamnt);

});


$(document).on('click', '.btnremove', function () {
    debugger;
    rowindex = $(this).closest('tr').index();
    percentagelst.splice(rowindex, 1);
    document.getElementById("particularsdetails").deleteRow(rowindex + 1);

    var tot = 0;
    for (var y = 0; y < percentagelst.length; y++) {
        var tt = percentagelst[y].Value;
        tot = tot + parseFloat(tt);
    }

    $('#totamntcomm').val(tot.toFixed(DcurrencyDecimal));
    $('#commercial').val(tot.toFixed(DcurrencyDecimal));
});

function clearTextBox() {
    //var table = $('#particularsdetails').DataTable();
    //table.clear().draw();

    LoadOverhdsDDL("#ddlItem");

    //styleList = [];

    $('#btncldupdate').hide();
    $('#btncldadd').show();

    Mode == 0;
    modeid = 0;
}
function Addcurr() {
    debugger;


}
function loadchildTable(list) {
    $('#particularsdetails').DataTable().destroy();
    debugger;
    $('#particularsdetails').DataTable({
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
            { title: "Id", data: "particularid", "visible": false },
            { title: "Item", data: "particular" },
            {
                title: "Cost", data: "cost",

            },
              //{
              //    title: "Value", data: "Value",
              //    render: function (data, type) {
              //        if (type === 'display') {
              //            return '<input type="text" id="txtvalue" class="txtvalue" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
              //        }
              //    }
              //},
               {
                   title: "Value", data: "Value",
                   render: function (data) {

                       return '<input type="label" id="txtvalue" class="form-control txtvalue"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                   },
               },
              { title: "Remarks", data: "remarks" },
               {
                   title: "Action", "mDataProp": null,
                   "sDefaultContent": '<div style="display: inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button></div> '

               }
        ]
    });
}
var value, res;
function calcvalue(cost) {
    debugger;
    var type = $('input[name="price"]:checked').attr('value');

    if (type == 'O') {
        var orderno = $('#Ordernum').val(),
        styleid = StyleId
        $.ajax({
            url: "/Budget/Getlist",
            data: JSON.stringify({ order: orderno, stylId: StyleId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                value = result[0].Value;
                commval = value;
                //if (Mode == 0) {
                res = (cost * value) / 100;
                $('#value').val(res.toFixed(DcurrencyDecimal));
                //}
            }
        });
    }
    else if (type == 'P') {
        var qty = $('#qnty').val();
        var perpc = qty * cost;
        perpc = perpc.toFixed(DcurrencyDecimal);
        $('#value').val(perpc);
    }
    else if (type == 'V') {
        $('#value').val(cost);
    }

}


function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "Cost_Defn_Mas",
    column = "Cost_Defn_No",
    compId = comId,
    Docum = 'COST DEFINITION'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#Entrynum').val(result.Value);
        }
    });
}

function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    $('#date').val(Fdatestring);
    // $('#txtToDate').val(Fdatestring);
}

function LoadPlanDetails(StyleRowId) {

    CheckPlanAmend(StyleRowId);

    $.ajax({
        url: "/PlanningAdd/GetPlanDetails",
        data: JSON.stringify({ StyleRowid: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#Ordernum').val(obj[0]["Order_No"]);
                $('#Refnum').val(obj[0]["Ref_no"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#style').val(obj[0]["Style"]);
                $('#qnty').val(obj[0]["Quantity"]);
                $('#txtordqty').val(obj[0]["OrderQty"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtWorkOrder').val(obj[0]["Job_Ord_No"]);
                $('#txtstylerate').val(obj[0]["StyleRate"]);

                $('#saleprice').val(obj[0]["Price"]);
                $('#ddlSCurrency').val(obj[0]["CurrId"]);
                $('#txtCurrency').val(obj[0]["CurrName"]);
                $('#exchange').val(obj[0]["ExRate"]);

                var rt = obj[0]["StyleRate"];


                var crt = obj[0]["CurrId"];

                //alert(crt);

                if (Mode == 0) {
                    var salprice = (obj[0]["Price"] * obj[0]["ExRate"]);
                    $('#saleprice').val(parseFloat(salprice).toFixed(DcurrencyDecimal));
                }

                $('#ddlSCurrency').val(crt);

                if (OrdApp == 'Y' && obj[0].PlanID == 0) {
                    //alert('Budget Entry is not made for this orderno...');
                    var msg = 'Budget Entry is not made for this Order Number...';
                    var flg = 4;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);
                }

                if (MisGafiChrg == 'Y') {

                    var OrdVal = $("#txtOrderValue").val();
                    var GafPer = $("#txtGafiPer").val();
                    var res = parseFloat((OrdVal * GafPer) / 100);

                    res = res.toFixed(DcurrencyDecimal);
                    $('#gaficharges').val(res);

                    var ischecked = false;
                    $(":checkbox").each(function () {
                        ischecked = $('#QizStatus').is(":checked");

                    });
                    if (ischecked == true) {
                        var resq = parseFloat((4 * rt) / 100);
                        resq = resq.toFixed(DcurrencyDecimal);
                        $('#qizcharges').val(resq);
                    }
                    else {
                        $('#qizcharges').val(0);
                    }
                }
                else if (MisGafiChrg == 'N') {
                    $('#gaficharges').val(0);
                    $('#qizcharges').val(0);
                    $('#markup').val(0);

                }

                //$('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                //$('#txtPlanId').val(obj[0]["PlanID"]);
                comId = obj[0]["CompanyID"];
                StyleRowId = $("#txtStyleRowId").val();
                StyleId = obj[0]["StyleID"];
               
                LoadShipmentRate(StyRowId);
                if (Mode == 0) {
                    GenerateNumber();
                    Getbomdetails();
                    processlist();
                    productnlist();
                    getprocessdetls();
                    getproddetails();
                    //getcompdetls();
                    var li = [];
                    loadchildTable(li);
                }
                else if (Mode == 2 || Mode == 3) {
                    masteredit();
                    Getbomeditdet();
                    processlist();
                    productnlist();
                    getprocessdetls();
                    getproddetails();
                    commercialdet();
                   
                }

                //}

                DispatchClosed = obj[0]["Despatch_Closed"];

                if (Mode == 0) {
                    $("#btnsave").show();
                    $("#btnUpd").hide();
                    $("#btndelete").hide();
                    $("#divBuyMer").hide();
                }
                if (Mode == 2) {
                    flg = 0;
                    $("#btnsave").hide();

                    // $("#btnUpd").show();

                    if (DispatchClosed == "N") {
                        $('#btnUpd').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#btnUpd').hide();
                    }

                    $("#btndelete").hide();
                    $("#divBuyMer").show();
                }

                if (Mode == 3) {
                    flg = 0;
                    $("#btnsave").hide();
                    $("#btnUpd").hide();


                   // $("#btndelete").show();

                    if (DispatchClosed == "N") {
                        $('#btndelete').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#btndelete').hide();
                    }

                    $("#divBuyMer").hide();
                }
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
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
                    //alert("Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it....")
                    var msg = "Planning amended for " + amendlist[x].Order_No + '-' + amendlist[x].Style + ",Please Check it...";
                    var flg = 4;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);
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
         
            var OrdValue = parseFloat(totalqty) * parseFloat(tot);
            $('#txtOrderValue').val(OrdValue);




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function getorderdetails(orderno, styleid) {
    $.ajax({
        url: "/Budget/GetBom",
        data: JSON.stringify({ order: orderno, stylId: styleid }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            $('#Entrynum').val(obj.CityId);
            $('#qnty').val(obj.Quantity);
            $('#Ordernum').val(obj.Orderno);
            $('#Refnum').val(obj.refno);
            $('#style').val(obj.style);
            //$('#Company').val(obj.companyid);
           //$('#Buyer').val(obj.buyerid);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function Getbomdetails(orderno, styleid) {
    debugger;
    $('#bomtable').DataTable().destroy();
    orderno = $('#Ordernum').val(),
    styleid = StyleId

    $.ajax({
        url: "/Budget/GetBom",
        data: JSON.stringify({ order: orderno, stylId: styleid }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            bomdet = json;

            //bomdet.sort(function (a, b) {
            //    return a.Snumb - b.Snumb;
            //});
            $('#bomtable').DataTable({
                data: bomdet,
                scrollY: 250,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                bSort: false,
                columns: [
                        { title: "SNo", data: "Snumb", "visible": false },
                         { title: "ItemId", data: "Itemid", "visible": false },
                         { title: "Item", data: "Itemname" },
                         { title: "Cat 1", data: "Category1" },
                         { title: "Cat 2", data: "Category2" },
                         {
                             title: "Quantity", data: "Quantity",

                             render: function (data) {
                                 return '<input type="text" id="bomqty" class="form-control" disabled maxlength="7" style="width: 110px;text-align: center;" value=' + data + '>';

                             },

                         },
                         //{
                         //    title: "Rate", data: "Itmrate",
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="text" id="txtrate" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' onkeyup="calcamnt(this.value);">';
                         //        }
                         //    }
                         //},


                         {
                             title: "Rate", data: "Itmrate",
                             render: function (data, type, row) {
                                 if (row.apprate > 0.00) {
                                     return '<input type="text" id="bomrate" disabled class="form-control txtrate" maxlength="7" style="width: 50px;text-align: center;" value=' + data + ' >';
                                 }
                                 else {
                                     return '<input type="text" id="bomrate"  class="form-control txtrate" maxlength="7" style="width: 50px;text-align: center;" value=' + data + ' >';

                                 }

                             },
                         },
                         
                         //{
                         //    title: "Amount", data: "Amnt",
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="text" id="txtamnt" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                         //        }
                         //    }
                         //}
                          {
                              title: "Amount", data: "Amnt",
                              render: function (data) {
                                  return '<input type="label" id="txtamnt" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled>';

                              },
                          },


                ]

            });
            $("#bomtable tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#bomtable tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });

            var totalamnt = 0;
            for (var e = 0; e < bomdet.length; e++) {
                var amount = bomdet[e].Amnt;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txttotbom').val(totalamnt);

            var chkapp = 0;
            $.each(bomdet, function (i) {
                if (bomdet[i].apprate > 0.00) {
                    chkapp = 1;
                }

            });
            if (chkapp == 1) {
                $('#SetCopy').attr('disabled', true);
            } else {
                $('#SetCopy').attr('disabled', false);
            }



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function Getbomeditdet() {
    debugger;
    orderno = $('#Ordernum').val(),
    type = "BOM",
    cost_id = 0
    $.ajax({
        url: "/Budget/GetBomedit",
        data: JSON.stringify({ type: type, costid: cost_id, orderno: orderno, mode: Mode, styleid: StyleId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            bomdet = json;
            //bomdet.sort(function (a, b) {
            //    return a.Snumb - b.Snumb;
            //});

            $.each(bomdet, function (i) {
                bomdet[i].Itmrate = bomdet[i].Itmrate.toFixed(DcurrencyDecimal);
                bomdet[i].Amnt = bomdet[i].Amnt.toFixed(DcurrencyDecimal);

            });

            $('#bomtable').DataTable().destroy();
            $('#bomtable').DataTable({
                data: bomdet,
                scrollY: 250,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                bSort: false,
                columns: [
                        { title: "SNo", data: "Snumb", "visible": false },
                         { title: "ItemId", data: "Itemid", "visible": false },
                         { title: "Item", data: "Itemname" },
                         { title: "Cat 1", data: "Category1" },
                         { title: "Cat 2", data: "Category2" },
                         {
                             title: "Quantity", data: "Quantity",

                             render: function (data) {
                                 return '<input type="text" id="bomqty" class="form-control" disabled maxlength="7" style="width: 110px;text-align: center;" value=' + data + '>';

                             },

                         },
                         //{
                         //    title: "Rate", data: "Itmrate",
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="text" id="txtrate" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' onkeyup="calcamnt(this.value);">';
                         //        }
                         //    }
                         //},


                         {
                             title: "Rate", data: "Itmrate",
                             render: function (data, type, row) {
                                 if (row.apprate > 0.00) {
                                     return '<input type="text" id="bomrate" disabled class="form-control txtrate" maxlength="7" style="width: 50px;text-align: center;" value=' + data + '>';
                                 }
                                 else {
                                     return '<input type="text" id="bomrate"  class="form-control txtrate" maxlength="7" style="width: 50px;text-align: center;" value=' + data + '>';

                                 }

                             },
                         },
                          
                         //{
                         //    title: "Amount", data: "Amnt",
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="text" id="txtamnt" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                         //        }
                         //    }
                         //}
                          {
                              title: "Amount", data: "Amnt",
                              render: function (data) {
                                  return '<input type="text" id="txtamnt" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled>';

                              },
                          },

                ]

            });
            $("#bomtable tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#bomtable tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
            var totalamnt = 0;
            for (var e = 0; e < bomdet.length; e++) {
                var amount = bomdet[e].Amnt;
                totalamnt = totalamnt + parseFloat(amount);

            }
            $('#txttotbom').val(totalamnt);

            var chkapp = 0;
            $.each(bomdet, function (i) {
                if (bomdet[i].apprate > 0.00) {
                    chkapp = 1;
                }

            });
            if (chkapp == 1) {
                $('#SetCopy').attr('disabled', true);
            } else {
                $('#SetCopy').attr('disabled', false);
            }

            overallcalc();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function bom(list) {
    //bomdet.sort(function (a, b) {
    //    return a.Snumb - b.Snumb;
    //});
    $('#bomtable').DataTable().destroy();
    $('#bomtable').DataTable({
        data: bomdet,
        scrollY: 250,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        columns: [
                { title: "SNo", data: "Snumb", "visible": false },
                 { title: "ItemId", data: "Itemid", "visible": false },
                 { title: "Item", data: "Itemname" },
                 { title: "Cat 1", data: "Category1" },
                 { title: "Cat 2", data: "Category2" },
                 {
                     title: "Quantity", data: "Quantity",
                     render: function (data) {
                         return '<input type="text" id="bomqty" class="form-control" disabled maxlength="7" style="width: 110px;text-align: center;" value=' + data + '>';

                     },

                 },
                 //{
                 //    title: "Rate", data: "Itmrate",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtrate" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' onkeyup="calcamnt(this.value);">';
                 //        }
                 //    }
                 //},


                 {
                     title: "Rate", data: "Itmrate",
                     render: function (data, type, row) {
                         if (row.apprate > 0.00) {
                             return '<input type="text" id="bomrate" disabled class="form-control txtrate" maxlength="7" style="width: 50px;text-align: center;" value=' + data + '>';
                         }
                         else {
                             return '<input type="text" id="bomrate"  class="form-control txtrate" maxlength="7" style="width: 50px;text-align: center;" value=' + data + '>';

                         }

                     },
                 },
            
                 //{
                 //    title: "Amount", data: "Amnt",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtamnt" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                 //        }
                 //    }
                 //}
                  {
                      title: "Amount", data: "Amnt",
                      render: function (data) {
                          return '<input type="text" id="txtamnt" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled>';

                      },
                  },

        ]

    });
    $("#bomtable tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#bomtable tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
var snum;
function calcamnt(value, rowindex) {
    debugger;
    //rowindex = $(this).closest('tr').index();
    //var currentro12 = bomdet.slice(rowindex);

    var table = $('#bomtable').DataTable();
    if (Bomrowindex != -1 && Bomrowindex != undefined) {
        rowindex = Bomrowindex;
    }


    var currentrow = bomdet.slice(rowindex);

    var quantity = currentrow[0].Quantity;
    snum = currentrow[0].Snumb;

    var ratecal = value;
    var res = ratecal * quantity;
    debugger;
    finalresult = res.toFixed(DcurrencyDecimal);
    // $('#bomtable tr:eq(' + (rowindex+1) + ')').find('td:eq(7)').text(finalresult);


    $.each(bomdet, function () {
        if (this.Snumb == snum) {
            this.Itmrate = ratecal;
            this.Amnt = finalresult;
        }
    });
    bom(bomdet);
    var totalamnt = 0;
    for (var e = 0; e < bomdet.length; e++) {
        var amount = bomdet[e].Amnt;
        totalamnt = totalamnt + parseFloat(amount);

    }

    $('#txttotbom').val(totalamnt.toFixed(DcurrencyDecimal));
    //alert(bomdet);
    overallcalc();
}



var getprocess = [];
var getprodctn = [];
var getprocesslist = [];
var getprodctnlist = [];
function processlist(types, orderno, styleid, cost_id) {
    debugger;
    // getprocessdetls();
    $('#process1table').DataTable().destroy();
    types = 'PROCESS',
    orderno = $('#Ordernum').val(),
    styleid = StyleId,
    cost_id = 0,
    Mode;
    StyRowId;


    $.ajax({
        url: "/Budget/GetProcesslist",
        data: JSON.stringify({ type: types, order: orderno, stylId: styleid, costid: cost_id, mode: Mode, strwid: StyRowId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            listofprocess = json;


            $.each(listofprocess, function (i) {
                listofprocess[i].Amnt = listofprocess[i].Amnt.toFixed(DcurrencyDecimal);

            });


            //$.each(listofprocess, function () {
            //    if (this.stageschedule == 1) {
            //        debugger;
            //        var listprocess = {
            //            processid: this.processid,
            //            processname: this.processname,
            //            Amnt: this.Amnt
            //        }

            //        getprocesslist.push(listprocess);

            //    }
            //    else if (this.stageschedule == 2) {
            //        debugger;
            //        var listprocess = {
            //            processid: this.processid,
            //            processname: this.processname,
            //            Amnt: this.Amnt
            //        }

            //        getprodctnlist.push(listprocess);

            //    }

            //});

            //  $.each(json, function () {
            //if (this.stageschedule == 1) {
            //    $.each(json, function () {
            //        if (this.stageschedule == 1) {
            //            debugger;
            //            var listprocess = {
            //                processid: this.processid,
            //                processname: this.processname,
            //                Amnt: this.Amnt
            //            }

            //            getprocess.push(listprocess);

            //        }
            //    });



            $('#process1table').DataTable({
                data: json,
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
                    // { title: "SNo", data: "Snumb" },
                         { title: "Processid", data: "processid", "visible": false },
                         { title: "Process", data: "processname" },
                         //{
                         //    title: "Amount", data: "Amnt",
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="text" id="txtamntproc1" class="amntprocess" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                         //        }
                         //    }
                         //},
                          {
                              title: "Amount", data: "Amnt",
                              render: function (data) {
                                  return '<input type="text" id="txtamntproc1" class="form-control amntprocess"  style="width: 80px;text-align: center;" value=' + data + ' disabled>';

                              },
                          },
                         //{
                         //    title: "Details", //data: "processid", "visible": false,
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="button" class="loadprocess"  style="width: 50px;text-align: center;" value="View" >';
                         //        }
                         //    }
                         //}

                        //{
                        //    title: "Details", "mDataProp": null,


                        //    "sDefaultContent": '<button type="button" class="loadprocess btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" > <i class="fa fa-eye"></i> </button>'
                        //}
                ]
            });

            $("#process1table tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#process1table tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
            //$('#process1table').DataTable().destroy();
            //  }
            // else if (this.stageschedule == 2) {
            //$.each(json, function () {
            //    if (this.stageschedule == 2) {
            //        debugger;
            //        var listprocess = {
            //            processid: this.processid,
            //            processname: this.processname,
            //            Amnt: this.Amnt
            //        }

            //        getprodctn.push(listprocess);

            //    }
            //});


            //                }

            // });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function loadprocess1table(list) {
    $('#process1table').DataTable().destroy();
    $('#process1table').DataTable({
        data: list,
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
            // { title: "SNo", data: "Snumb" },
                 { title: "Processid", data: "processid", "visible": false },
                 { title: "Process", data: "processname" },
                 //{
                 //    title: "Amount", data: "Amnt",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtamntproc1" class="amntprocess" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                 //        }
                 //    }
                 //},
                  {
                      title: "Amount", data: "Amnt",
                      render: function (data) {
                          return '<input type="text" id="txtamntproc1" class="form-control amntprocess"  style="width: 80px;text-align: center;" value=' + data + ' disabled>';

                      },
                  },
                 //{
                 //    title: "Details", //data: "processid", "visible": false,
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="button" class="loadprocess"  style="width: 50px;text-align: center;" value="View" >';
                 //        }
                 //    }
                 //}

                //{
                //    title: "Details", "mDataProp": null,


                //    "sDefaultContent": '<button type="button" class="loadprocess btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" > <i class="fa fa-eye"></i> </button>'
                //}
        ]
    });
    $("#process1table tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#process1table tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function productnlist(types, orderno, styleid, cost_id) {
    debugger;
    //$('#production1table').DataTable().destroy();
    types = 'PROCESS',
    orderno = $('#Ordernum').val(),
    styleid = StyleId,
    cost_id = 0,


    $.ajax({
        url: "/Budget/GetProductnlist",
        data: JSON.stringify({ type: types, order: orderno, stylId: styleid, costid: cost_id, mode: Mode, strwid: StyRowId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            listofproduction = json;


            $.each(listofproduction, function (i) {
                listofproduction[i].Amnt = listofproduction[i].Amnt.toFixed(DcurrencyDecimal);
            });



            $('#production1table').DataTable({
                data: json,
                //"bSort": false,
                //data: namelistprod,
                scrollY: 200,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                bSort: false,


                columns: [
                         { title: "Processid", data: "processid", "visible": false },
                         { title: "Production", data: "processname" },
                         //{
                         //    title: "Cost", data: "Amnt",
                         //    render: function (data, type) {
                         //        if (type === 'display') {
                         //            return '<input type="text" id="txtamntprodnt1" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                         //        }
                         //    }
                         //},
                                   {
                                       title: "Cost", data: "Amnt",
                                       render: function (data) {
                                           return '<input type="text" id="txtamntprodnt1" class="form-control"  style="width: 80px;text-align: center;" value=' + data + '  disabled>';

                                       },
                                   },
                          //{
                          //    title: "Details", //data: "processid", "visible": false,
                          //    render: function (data, type) {
                          //        if (type === 'display') {
                          //            return '<input type="button" class="loadproductn"  style="width: 50px;text-align: center;" value="View" >';
                          //        }
                          //    }
                          //}
                           //{
                           //    title: "Details", "mDataProp": null,


                           //    "sDefaultContent": '<button type="button" class="loadproductn btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" > <i class="fa fa-eye"></i> </button>'
                           //}

                ]
            });
            $("#production1table tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#production1table tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadprodntn1table(list) {
    $('#production1table').DataTable().destroy();
    $('#production1table').DataTable({
        data: list,
       // "bSort": false,
       // data: namelistprod,
        scrollY: 200,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,

        columns: [
                 { title: "Processid", data: "processid", "visible": false },
                 { title: "Production", data: "processname" },
                 //{
                 //    title: "Cost", data: "Amnt",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtamntprodnt1" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled >';
                 //        }
                 //    }
                 //},
                           {
                               title: "Cost", data: "Amnt",
                               render: function (data) {
                                   return '<input type="text" id="txtamntprodnt1" class="form-control"  style="width: 80px;text-align: center;" value=' + data + '  disabled>';

                               },
                           },
                  //{
                  //    title: "Details", //data: "processid", "visible": false,
                  //    render: function (data, type) {
                  //        if (type === 'display') {
                  //            return '<input type="button" class="loadproductn"  style="width: 50px;text-align: center;" value="View" >';
                  //        }
                  //    }
                  //}
                   //{
                   //    title: "Details", "mDataProp": null,


                   //    "sDefaultContent": '<button type="button" class="loadproductn btn btn-round btn-info" data-toggle="tooltip" data-placement="top" title="View" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" > <i class="fa fa-eye"></i> </button>'
                   //}

        ]
    });
    $("#production1table tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#production1table tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
var name;

//function getprocessdetls(types, orderno, styleid, cost_id) {
//    alert("ss");
//    $('#process2table').DataTable().destroy();
//    LoadProcess2Table(types, orderno, styleid, cost_id);
//}

function getprocessdetls(types, orderno, styleid, cost_id) {
    debugger;
    //$('#process2table').DataTable().destroy();
    types = 'PROCESS',
    orderno = $('#Ordernum').val(),
   styleid = StyleId

    cost_id = 0

    $.ajax({
        url: "/Budget/GetProcess",
        data: JSON.stringify({ type: types, order: orderno, stylId: styleid, costid: cost_id, mode: Mode, strwid: StyRowId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            processdetails1 = json;
            if (processdetails1.length > 0) {

                name = json[0].processname;
                if (processdetails1 != undefined) {
                    if (Mode == 0) {
                        $.each(processdetails1, function () {
                            this.DispOpt = 'N';
                        });
                    }

                    if (Mode == 2 || Mode == 3) {
                        $.each(processdetails1, function () {
                            if (this.DispOpt == " ") {
                                this.DispOpt = 'N';
                            }
                        });
                    }
                    // $.each(json, function () {                  
                    // if (this.stageschedule == 1) {                       
                    for (var d = 0; d < processdetails1.length; d++) {
                        if (processdetails1[d].processname == name) {
                            debugger;
                            var listof = {
                                Snumb: processdetails1[d].Snumb,
                                processid: processdetails1[d].processid,
                                Itemname: processdetails1[d].Itemname,
                                Color: processdetails1[d].Color,
                                Size: processdetails1[d].Size,
                                Quantity: processdetails1[d].Quantity,
                                Itmrate: processdetails1[d].Itmrate.toFixed(DcurrencyDecimal),
                                Amnt: processdetails1[d].Amnt.toFixed(DcurrencyDecimal),
                                secqnt: processdetails1[d].secqnt,
                                apprate: processdetails1[d].apprate,
                                Itemid: processdetails1[d].Itemid,
                                Colorid: processdetails1[d].Colorid,
                                Sizeid: processdetails1[d].Sizeid
                            }
                            namelistdet.push(listof);
                        }
                    }

                    //   $('#process2table').DataTable().destroy();
                    $('#pri').attr('disabled', false);
                    $('#prs').attr('disabled', false);
                    $('#prc').attr('disabled', false);
                    $('#prn').attr('disabled', false);

                    $('#process2table').DataTable({
                        data: namelistdet,
                        scrollY: 150,
                        scrollCollapse: true,
                        paging: false,
                        fixedColumns: false,
                        select: false,
                        scrollX: "100%",
                        scrollXInner: "100%",
                        scroller: false,
                        bSort: false,
                        "rowCallback": function (row, data, index) {
                            if (data.apprate > 0.00) {             
                                $('#pri').attr('disabled', true);
                                $('#prs').attr('disabled', true);
                                $('#prc').attr('disabled', true);
                                $('#prn').attr('disabled', true);                 
                            }
                        },
                        columns: [
                             { title: "SNo", data: "Snumb", "visible": false },
                                 { title: "Processid", data: "processid", "visible": false },
                                 { title: "Item", data: "Itemname" },
                                 { title: "Cat 1", data: "Color", "visible": false },
                                 { title: "Cat 2", data: "Size", "visible": false },
                                 {
                                     title: "Quantity", data: "Quantity",
                                     render: function (data) {

                                         return '<input type="text" id="txtqtyrateproc1" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                                     },
                                 },
                                 //{
                                 //    title: "Rate", data: "Itmrate",
                                 //    render: function (data, type) {
                                 //        if (type === 'display') {
                                 //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;" onkeyup="calprocamnt(this.value);" value=' + data + '>';
                                 //        }
                                 //    }
                                 //},
                                 //{
                                 //    title: "Amount", data: "Amnt",
                                 //    render: function (data, type) {
                                 //        if (type === 'display') {
                                 //            return '<input type="text" id="txtamntproc2" class="amnt" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                                 //        }
                                 //    }
                                 //},
                                    {
                                        title: "Rate", data: "Itmrate",
                                        render: function (data, type, row) {
                                            if (row.apprate > 0.00) {
                                                return '<input type="text" id="txtrateproc1" disabled class="form-control"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  onkeyup="calalert();">';
                                            } else {
                                                return '<input type="text" id="txtrateproc1" class="form-control"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  onkeyup="calalert();">';

                                            }
                                        },
                                    },
                                       {
                                           title: "Amount", data: "Amnt",
                                           render: function (data) {
                                               return '<input type="text" id="txtamntproc2" class="form-control amnt"  style="width: 80px;text-align: center;" value=' + data + '  disabled>';

                                           },
                                       },
                                 {
                                     title: "Sec Qty", data: "secqnt",


                                 },
                        { title: "Itemid", data: "Itemid", "visible": false },
    { title: "Colorid", data: "Colorid", "visible": false },
    { title: "Sizeid", data: "Sizeid", "visible": false },

                        ]
                    });
                    $("#process2table tr").click(function () {
                        var selected = $(this).hasClass("selected");
                        $("#process2table tr").removeClass("selected");
                        if (!selected)
                            $(this).addClass("selected");
                    });

                    var totalamnt = 0;
                    for (var e = 0; e < namelistdet.length; e++) {
                        var amount = namelistdet[e].Amnt;
                        totalamnt = totalamnt + parseFloat(amount);

                    }
                    $('#txttotamnt').val(totalamnt);
                    overallcalc();
                    //  }
                    //  });

                }
            }
            else {
                $('#pri').attr('disabled', false);
                $('#prs').attr('disabled', false);
                $('#prc').attr('disabled', false);
                $('#prn').attr('disabled', false);

                $('#process2table').DataTable({
                    data: processdetails1,
                    scrollY: 150,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,
                    "rowCallback": function (row, data, index) {
                        if (data.apprate > 0.00) {             
                            $('#pri').attr('disabled', true);
                            $('#prs').attr('disabled', true);
                            $('#prc').attr('disabled', true);
                            $('#prn').attr('disabled', true);                 
                        }
                    },
                    columns: [
                         { title: "SNo", data: "Snumb", "visible": false },
                             { title: "Processid", data: "processid", "visible": false },
                             { title: "Item", data: "Itemname" },
                             { title: "Cat 1", data: "Color", "visible": false },
                             { title: "Cat 2", data: "Size", "visible": false },
                             {
                                 title: "Quantity", data: "Quantity",
                                 render: function (data) {

                                     return '<input type="text" id="txtqtyrateproc1" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                                 },
                             },
                             //{
                             //    title: "Rate", data: "Itmrate",
                             //    render: function (data, type) {
                             //        if (type === 'display') {
                             //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;" onkeyup="calprocamnt(this.value);" value=' + data + '>';
                             //        }
                             //    }
                             //},
                             //{
                             //    title: "Amount", data: "Amnt",
                             //    render: function (data, type) {
                             //        if (type === 'display') {
                             //            return '<input type="text" id="txtamntproc2" class="amnt" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                             //        }
                             //    }
                             //},
                                {
                                    title: "Rate", data: "Itmrate",
                                    render: function (data, type, row) {
                                        if (row.apprate > 0.00) {
                                            return '<input type="text" id="txtrateproc1" disabled class="form-control"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  onkeyup="calalert();">';
                                        } else {
                                            return '<input type="text" id="txtrateproc1" class="form-control"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  onkeyup="calalert();">';

                                        }
                                    },
                                },
                                   {
                                       title: "Amount", data: "Amnt",
                                       render: function (data) {
                                           return '<input type="text" id="txtamntproc2" class="form-control amnt"  style="width: 80px;text-align: center;" value=' + data + '  disabled>';

                                       },
                                   },
                             {
                                 title: "Sec Qty", data: "secqnt",


                             },
                             { title: "Itemid", data: "Itemid", "visible": false },
             { title: "Colorid", data: "Colorid", "visible": false },
             { title: "Sizeid", data: "Sizeid", "visible": false },

                    ]
                });
                $("#process2table tr").click(function () {
                    var selected = $(this).hasClass("selected");
                    $("#process2table tr").removeClass("selected");
                    if (!selected)
                        $(this).addClass("selected");
                });
                $('#txttotamnt').val(0);
                overallcalc();
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    //$('#process2table').DataTable().destroy();
}
function calalert() {
    debugger;
    //alert('Please select any process !!!');
    var msg = "Please select any process...";
    var flg = 4;
    var mode = 1;
    var url = "";
    AlartMessage(msg, flg, mode, url);
}


function calalertprd() {
    debugger;
    if (ProductnId > 0) {

        return true;
    }
    else {
        //alert('Please select any process !!!');
        var msg = "Please select any process...";
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
        return false;
    }
}

function getproddetails(types, orderno, styleid, cost_id) {

    debugger;
    types = 'PROCESS',
    orderno = $('#Ordernum').val(),
  styleid = StyleId,
    cost_id = 0

    $.ajax({
        url: "/Budget/GetProductn",
        data: JSON.stringify({ type: types, order: orderno, stylId: styleid, costid: cost_id, mode: Mode, strwid: StyRowId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            if (json != undefined && json.length > 0) {
                var name = json[0].processname;
                var namelistprod = [];
                productndet = json;
                if (Mode == 0) {
                    $.each(productndet, function () {
                        this.DispOpt = 'N';
                    });
                }

                if (Mode == 2 || Mode==3) {
                    $.each(productndet, function () {
                        if (this.DispOpt == " ") {
                            this.DispOpt = 'N';
                        }
                    });
                }
                //if (this.stageschedule == 2) {
                debugger;
                for (var d = 0; d < productndet.length; d++) {
                    if (productndet[d].processname == name) {
                        debugger;
                        var listof = {
                            Snumb: productndet[d].Snumb,
                            processid: productndet[d].processid,
                            Itemname: productndet[d].Itemname,
                            Color: productndet[d].Color,
                            Size: productndet[d].Size,
                            Quantity: productndet[d].Quantity,
                            Itmrate: productndet[d].Itmrate.toFixed(DcurrencyDecimal),
                            Amnt: productndet[d].Amnt.toFixed(DcurrencyDecimal),
                            secqnt: productndet[d].secqnt,
                            apprate: productndet[d].apprate

                        }
                        namelistprod.push(listof);
                    }
                }
                $('#pdi').attr('disabled', false);
                $('#pds').attr('disabled', false);
                $('#pdc').attr('disabled', false);
                $('#pdn').attr('disabled', false);

                $('#production2table').DataTable({
                    data: namelistprod,
                    scrollY: 150,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,
                    "rowCallback": function (row, data, index) {
                        if (data.apprate > 0.00) {
                            $('#pdi').attr('disabled', true);
                            $('#pds').attr('disabled', true);
                            $('#pdc').attr('disabled', true);
                            $('#pdn').attr('disabled', true);
                        }
                    },
                    columns: [
                        { title: "SNo", data: "Snumb", "visible": false },
                             { title: "Processid", data: "processid", "visible": false },
                              { title: "Item", data: "Itemname" },
                             { title: "Cat 1", data: "Color", "visible": false },
                             { title: "Cat 2", data: "Size", "visible": false },
                             {
                                 title: "Quantity", data: "Quantity",
                                 render: function (data) {

                                     return '<input type="text" id="txtqtyproduc2" class="form-control" disabled maxlength="7" style="width: 100px;text-align: center;" value=' + data + ' >';

                                 },
                             },
                             //{
                             //    title: "Rate", data: "Itmrate",
                             //    render: function (data, type) {
                             //        if (type === 'display') {
                             //            return '<input type="text" id="txtrateproductn1" class="editor-active" style="width: 50px;text-align: center;" onkeyup="calproductnamnt(this.value);" value=' + data + '>';
                             //        }
                             //    }
                             //},
                             //{
                             //    title: "Amount", data: "Amnt",
                             //    render: function (data, type) {
                             //        if (type === 'display') {
                             //            return '<input type="text" id="txtamntprodu2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                             //        }
                             //    }
                             //}

                                 {
                                     title: "Rate", data: "Itmrate",
                                     render: function (data, type, row) {
                                         if (row.apprate > 0.00) {
                                             return '<input type="text" id="txtrateproduc2" disabled class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '>';
                                         } else {
                                             return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                                         }
                                     },
                                 },

                             //{
                             //    title: "Rate", data: "Itmrate",
                             //    render: function (data) {
                             //        return '<input type="text" id="txtrateproduc2" class="form-control" maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  onkeyup="calalert();">';

                             //    },
                             //},
                             {
                                 title: "Amount", data: "Amnt",
                                 render: function (data) {
                                     return '<input type="text" id="txtamntprodu2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + '  disabled>';

                                 },
                             },


                    ]
                });

                $("#production2table tr").click(function () {
                    var selected = $(this).hasClass("selected");
                    $("#production2table tr").removeClass("selected");
                    if (!selected)
                        $(this).addClass("selected");
                });
                var totalamnt = 0;
                for (var e = 0; e < namelistprod.length; e++) {
                    var amount = namelistprod[e].Amnt;
                    totalamnt = totalamnt + parseFloat(amount);

                }
                $('#txttotamntprod').val(totalamnt);
                overallcalc();

                // }


                //  });

            }
            else {
                $('#pdi').attr('disabled', false);
                $('#pds').attr('disabled', false);
                $('#pdc').attr('disabled', false);
                $('#pdn').attr('disabled', false);

                $('#production2table').DataTable({
                    data: json,
                    scrollY: 150,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,
                    "rowCallback": function (row, data, index) {
                        if (data.apprate > 0.00) {
                            $('#pdi').attr('disabled', true);
                            $('#pds').attr('disabled', true);
                            $('#pdc').attr('disabled', true);
                            $('#pdn').attr('disabled', true);
                        }
                    },
                    columns: [
                        { title: "SNo", data: "Snumb", "visible": false },
                             { title: "Processid", data: "processid", "visible": false },
                              { title: "Item", data: "Itemname" },
                             { title: "Cat 1", data: "Color", "visible": false },
                             { title: "Cat 2", data: "Size", "visible": false },
                             {
                                 title: "Quantity", data: "Quantity",
                                 render: function (data) {

                                     return '<input type="text" id="txtqtyproduc2" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                                 },
                             },
                             //{
                             //    title: "Rate", data: "Itmrate",
                             //    render: function (data, type) {
                             //        if (type === 'display') {
                             //            return '<input type="text" id="txtrateproductn1" class="editor-active" style="width: 50px;text-align: center;" onkeyup="calproductnamnt(this.value);" value=' + data + '>';
                             //        }
                             //    }
                             //},
                             //{
                             //    title: "Amount", data: "Amnt",
                             //    render: function (data, type) {
                             //        if (type === 'display') {
                             //            return '<input type="text" id="txtamntprodu2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + ' disabled>';
                             //        }
                             //    }
                             //}

                                 {
                                     title: "Rate", data: "Itmrate",
                                     render: function (data, type, row) {
                                         if (row.apprate > 0.00) {
                                             return '<input type="text" id="txtrateproduc2" disabled class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                                         } else {
                                             return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                                         }
                                     },
                                 },

                             //{
                             //    title: "Rate", data: "Itmrate",
                             //    render: function (data) {
                             //        return '<input type="text" id="txtrateproduc2" class="form-control" maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  onkeyup="calalert();">';

                             //    },
                             //},
                             {
                                 title: "Amount", data: "Amnt",
                                 render: function (data) {
                                     return '<input type="text" id="txtamntprodu2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + '  disabled>';

                                 },
                             },


                    ]
                });

                $("#production2table tr").click(function () {
                    var selected = $(this).hasClass("selected");
                    $("#production2table tr").removeClass("selected");
                    if (!selected)
                        $(this).addClass("selected");
                });
                $('#txttotamntprod').val(0);
                overallcalc();
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function calproductnamnt(value) {
    debugger;
    var type = $('input[name="optradioprod"]:checked').attr('value');

    var table = $('#production2table').DataTable();
    if (Processrowindex != -1 && Processrowindex != undefined) {
        rowindex = Processrowindex;
    }

    //var current = productndet.slice(rowindex);
    //var processid = current[0].processid;

    //if (productndet[0].processname == name) {
    //    var currentrowof = productndet.slice(rowindex);
    //    var quantity = currentrowof[0].Quantity;
    //    snum = currentrowof[0].Snumb;
    //}
    //else {
    var currentrow = listofproductndet.slice(rowindex);

    var quantity = currentrow[0].Quantity;
    var proid = currentrow[0].processid;
    snum = currentrow[0].Snumb;
    // }
    var ratecal = value;
    var res = ratecal * quantity;

    finalresult = res.toFixed(DcurrencyDecimal);
    if (type == 'S' || type == 'C') {
        $('#production2table tr:eq(' + rowindex + ')').find('td:eq(4)').text(finalresult);
    }
    if (type == 'N') {
        $('#production2table tr:eq(' + rowindex + ')').find('td:eq(3)').text(finalresult);
    }


    $.each(productndet, function () {
        if (this.Snumb == snum) {
            this.Itmrate = ratecal;
            this.Amnt = finalresult;
        }
    });
    debugger;

    productndet;
    var totalamnt = 0;
    for (var e = 0; e < productndet.length; e++) {
        if (productndet[e].processid == proid) {
            var amount = productndet[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $('#txttotamntprod').val(totalamnt);

    var amount = [];
    $.each(productndet, function () {
        if (this.processid == proid) {
            amount.push(this.Amnt);
        }
    });
    var totalamnt = 0;
    for (var e = 0; e < amount.length; e++) {
        var amnt = amount[e];
        totalamnt = totalamnt + parseFloat(amnt);

    }

    var ctry = [];
    ctry = listofproduction;
    ctry = $.grep(ctry, function (e) {
        if (e.processid == proid) {
            return e.Amnt = totalamnt;
        }
    });
    ctry;
    loadprodntn1table(listofproduction);
    //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
    overallcalc();


}
//var processid; var totamnt = []; var value;

function calprocamnt(value) {
    debugger;
    var type = $('input[name="optradioprocess"]:checked').attr('value');

    var table = $('#process2table').DataTable();
    if (Processrowindex != -1 && Processrowindex != undefined) {
        rowindex = Processrowindex;
    }

    var currentrow = listofprocessdet.slice(rowindex);

    var quantity = currentrow[0].Quantity;
    snum = currentrow[0].Snumb;
    var proid = currentrow[0].processid;
    var processnameadd = currentrow[0].processname;
    // }

    var ratecal = value;
    var res = ratecal * quantity;

    finalresult = res.toFixed(DcurrencyDecimal);
    if (type == 'S' || type == 'C') {
        $('#process2table tr:eq(' + rowindex + ')').find('td:eq(4)').text(finalresult);
    }
    if (type == 'N') {
        $('#process2table tr:eq(' + rowindex + ')').find('td:eq(3)').text(finalresult);
    }

    for (var d = 0; d < listofprocess.length; d++) {
        //$.each(processdetails1, function () {
        if (listofprocess[d].processname == processnameadd) {

        }
    }

    // })

    $.each(processdetails1, function () {
        if (this.Snumb == snum) {
            this.Itmrate = ratecal;
            this.Amnt = finalresult;
        }
    });
    debugger;

    processdetails1;
    var totalamnt = 0;
    for (var e = 0; e < processdetails1.length; e++) {
        if (processdetails1[e].processid == proid) {
            var amount = processdetails1[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $('#txttotamnt').val(totalamnt);


    var amount = [];
    $.each(processdetails1, function () {
        if (this.processid == proid) {
            amount.push(this.Amnt);
        }
    });
    var totalamnt = 0;
    for (var e = 0; e < amount.length; e++) {
        var amnt = amount[e];
        totalamnt = totalamnt + parseFloat(amnt);

    }

    var ctry = [];
    ctry = listofprocess;
    ctry = $.grep(ctry, function (e) {
        if (e.processid == proid) {
            return e.Amnt = totalamnt;
        }
    });
    ctry;
    loadprocess1table(listofprocess);
    //$('#process1table tr:eq(' + (rowindex) + ')').find('td:eq(1)').text(totalamnt);
    overallcalc();
}



function changebasedoncolor() {
    debugger;
    if (this.val = 'C') {
        var table = $('#process2table').DataTable();
        table.column(3).visible(true);
        table.column(4).visible(false);
    }

}

function changebasedonsize() {
    debugger;
    if (this.val = 'S') {

        var table = $('#process2table').DataTable();
        table.column(4).visible(true);
        table.column(3).visible(false);


    }

}
function changebasedonnone() {
    if (this.val = 'N') {
        var table = $('#process2table').DataTable();
        table.column(4).visible(false);
        table.column(3).visible(false);
    }
}
//
function procitem() {
    debugger;
    if (this.val = 'I') {
        var cl = [];
        var qt = [];
        tempimlist = [];
        if (ProcsId > 0) {
            for (var r = 0; r < processdetails1.length; r++) {
                if (processdetails1[r].processid == ProcsId) {
                    cl.push(processdetails1[r].Itemid);
                    qt.push(processdetails1[r]);
                }
            }

            if (cl.length > 0) {
                // cl = $.unique(cl);

                cl = cl.filter(function (itm, i, cl) {
                    return i == cl.indexOf(itm);
                });
                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w];
                    var totalqty = 0;
                    var Im = '';
                    var Itemid = 0;
                    var Apprt = 0;
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Itemid == cid) {
                            var qty = qt[m].Quantity;
                            totalqty = totalqty + parseFloat(qty);
                            Im = qt[m].Itemname;
                            Itemid = qt[m].Itemid;
                            if (qt[m].apprate > 0) {
                                Apprt = qt[m].apprate;
                            }
                            //Apprt = Apprt + parseFloat(qt[m].apprate);
                           // Apprt = qt[m].apprate;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y] == cid) {
                            var Obj = {
                                Snumb: 0,
                                processid: ProcsId,
                                Itemname: Im,
                                Color: '',
                                Size: '',
                                Quantity: totalqty,
                                Itmrate: 0,
                                Amnt: 0,
                                secqnt: totalqty,
                                Itemid: cid,
                                Colorid: 0,
                                Sizeid: 0,
                                apprate:Apprt
                            }
                            tempimlist.push(Obj);
                        }
                    }
                }
                LoadProcstbl2(tempimlist);
                var table = $('#process2table').DataTable();
                table.column(2).visible(true);
                table.column(4).visible(false);
                table.column(3).visible(false);


                $('#txttotamntprod').val(0);

                var amount = [];
                $.each(processdetails1, function () {
                    if (this.processid == ProcsId) {
                        this.Amnt = 0;
                        amount.push(this.Amnt);
                    }
                });
                var totalamnt = 0;
                for (var e = 0; e < amount.length; e++) {
                    var amnt = amount[e];
                    totalamnt = totalamnt + parseFloat(amnt);

                }

                var ctry = [];
                ctry = listofprocess;
                ctry = $.grep(ctry, function (e) {
                    if (e.processid == ProcsId) {
                        return e.Amnt = totalamnt;
                    }
                });
                ctry;
                loadprocess1table(listofprocess);
                //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
                overallcalc();
            }
        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}

function proccolor() {
    debugger;
    if (this.val = 'C') {

        var cl = [];
        var qt = [];
        tempcllist = [];
        if (ProcsId > 0) {
            for (var r = 0; r < processdetails1.length; r++) {
                if (processdetails1[r].processid == ProcsId) {
                    cl.push(processdetails1[r].Colorid);
                    qt.push(processdetails1[r]);
                }
            }

            if (cl.length > 0) {
                // cl = $.unique(cl);

                cl = cl.filter(function (itm, i, cl) {
                    return i == cl.indexOf(itm);
                });
                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w];
                    var totalqty = 0;
                    var clr = '';
                    var Apprt = 0;
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Colorid == cid) {
                            var qty = qt[m].Quantity;
                            totalqty = totalqty + parseFloat(qty);
                            clr = qt[m].Color;
                            if (qt[m].apprate > 0) {
                                Apprt = qt[m].apprate;
                            }
                           // Apprt = Apprt + parseFloat(qt[m].apprate);
                           // Apprt = qt[m].apprate;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y] == cid) {
                            var Obj = {
                                Snumb: 0,
                                processid: ProcsId,
                                Itemname: '',
                                Color: clr,
                                Size: '',
                                Quantity: totalqty,
                                Itmrate: 0,
                                Amnt: 0,
                                secqnt: totalqty,
                                Colorid: cid,
                                Sizeid:0,
                                Itemid: 0,
                                apprate: Apprt
                            }
                            tempcllist.push(Obj);
                        }
                    }
                }
                LoadProcstbl2(tempcllist);
                var table = $('#process2table').DataTable();
                table.column(3).visible(true);
                table.column(4).visible(false);
                table.column(2).visible(false);

                $('#txttotamntprod').val(0);

                var amount = [];
                $.each(processdetails1, function () {
                    if (this.processid == ProcsId) {
                        this.Amnt = 0;
                        amount.push(this.Amnt);
                    }
                });
                var totalamnt = 0;
                for (var e = 0; e < amount.length; e++) {
                    var amnt = amount[e];
                    totalamnt = totalamnt + parseFloat(amnt);

                }

                var ctry = [];
                ctry = listofprocess;
                ctry = $.grep(ctry, function (e) {
                    if (e.processid == ProcsId) {
                        return e.Amnt = totalamnt;
                    }
                });
                ctry;
                loadprocess1table(listofprocess);
                //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
                overallcalc();
            }
        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}
function procsize() {
    debugger;
    if (this.val = 'S') {

        var cl = [];
        var qt = [];
        tempszlist = [];
        if (ProcsId > 0) {
            for (var r = 0; r < processdetails1.length; r++) {
                if (processdetails1[r].processid == ProcsId) {
                    cl.push(processdetails1[r].Sizeid);
                    qt.push(processdetails1[r]);
                }
            }

            if (cl.length > 0) {
                // cl = $.unique(cl);

                cl = cl.filter(function (itm, i, cl) {
                    return i == cl.indexOf(itm);
                });
                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w];
                    var totalqty = 0;
                    var Sz = '';
                    var Apprt = 0;
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Sizeid == cid) {
                            var qty = qt[m].Quantity;
                            totalqty = totalqty + parseFloat(qty);
                            Sz = qt[m].Size;
                            if (qt[m].apprate > 0) {
                                Apprt = qt[m].apprate;
                            }
                            //Apprt = Apprt + parseFloat(qt[m].apprate);
                            //Apprt = qt[m].apprate;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y] == cid) {
                            var Obj = {
                                Snumb: 0,
                                processid: ProcsId,
                                Itemname: '',
                                Color: '',
                                Size: Sz,
                                Quantity: totalqty,
                                Itmrate: 0,
                                Amnt: 0,
                                secqnt: totalqty,
                                Sizeid: cid,
                                Itemid:0,
                                Colorid: 0,
                                apprate: Apprt
                            }
                            tempszlist.push(Obj);
                        }
                    }
                }
                LoadProcstbl2(tempszlist);
                var table = $('#process2table').DataTable();
                table.column(4).visible(true);
                table.column(3).visible(false);

                $('#txttotamntprod').val(0);

                var amount = [];
                $.each(processdetails1, function () {
                    if (this.processid == ProcsId) {
                        this.Amnt = 0;
                        amount.push(this.Amnt);
                    }
                });
                var totalamnt = 0;
                for (var e = 0; e < amount.length; e++) {
                    var amnt = amount[e];
                    totalamnt = totalamnt + parseFloat(amnt);

                }

                var ctry = [];
                ctry = listofprocess;
                ctry = $.grep(ctry, function (e) {
                    if (e.processid == ProcsId) {
                        return e.Amnt = totalamnt;
                    }
                });
                ctry;
                loadprocess1table(listofprocess);
                //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
                overallcalc();
            }
        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}
function procnone() {
    if (this.val = 'N') {
        if (ProcsId > 0) {
            var ctry1 = jQuery.grep(processdetails1, function (value) {
                return value.processid == ProcsId;
            });

            $.each(ctry1, function () {
                if (this.processid == ProcsId) {
                    this.Itmrate = 0;
                    this.Amnt = 0;

                }
            });
            LoadProcstbl2(ctry1);


            var totalamnt = 0;
            for (var e = 0; e < processdetails1.length; e++) {
                if (processdetails1[e].processid == ProcsId) {
                    var amount = processdetails1[e].Amnt;
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            $('#txttotamntprod').val(totalamnt);

            var amount = [];
            $.each(processdetails1, function () {
                if (this.processid == ProcsId) {
                    amount.push(this.Amnt);
                }
            });
            var totalamnt = 0;
            for (var e = 0; e < amount.length; e++) {
                var amnt = amount[e];
                totalamnt = totalamnt + parseFloat(amnt);

            }

            var ctry = [];
            ctry = listofprocess;
            ctry = $.grep(ctry, function (e) {
                if (e.processid == ProcsId) {
                    return e.Amnt = totalamnt;
                }
            });
            ctry;
            loadprocess1table(listofprocess);
            //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
            overallcalc();

            var table = $('#process2table').DataTable();
            table.column(4).visible(true);
            table.column(3).visible(true);
            table.column(2).visible(false);


        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}
//
function prodctnitem() {
    debugger;
    if (this.val = 'I') {
        var cl = [];
        var qt = [];
        tempimlist = [];
        if (ProductnId > 0) {
            for (var r = 0; r < productndet.length; r++) {
                if (productndet[r].processid == ProductnId) {
                    cl.push(productndet[r].Itemid);
                    qt.push(productndet[r]);
                }
            }

            if (cl.length > 0) {
                // cl = $.unique(cl);

                cl = cl.filter(function (itm, i, cl) {
                    return i == cl.indexOf(itm);
                });
                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w];
                    var totalqty = 0;
                    var Im = '';
                    var Apprt = 0;
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Itemid == cid) {
                            var qty = qt[m].Quantity;
                            totalqty = totalqty + parseFloat(qty);
                            Im = qt[m].Itemname;
                            if (qt[m].apprate > 0) {
                                Apprt = qt[m].apprate;
                            }
                           // Apprt = Apprt + parseFloat(qt[m].apprate);
                            //Apprt = qt[m].apprate;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y] == cid) {
                            var Obj = {
                                Snumb: 0,
                                processid: ProductnId,
                                Itemname: Im,
                                Color: '',
                                Size: '',
                                Quantity: totalqty,
                                Itmrate: 0,
                                Amnt: 0,
                                apprate: Apprt
                            }
                            tempimlist.push(Obj);
                        }
                    }
                }
                LoadPrdnttble2(tempimlist);
                var table = $('#production2table').DataTable();
                table.column(2).visible(true);
                table.column(4).visible(false);
                table.column(3).visible(false);


                $('#txttotamntprod').val(0);

                var amount = [];
                $.each(productndet, function () {
                    if (this.processid == ProductnId) {
                        this.Amnt = 0;
                        amount.push(this.Amnt);
                    }
                });
                var totalamnt = 0;
                for (var e = 0; e < amount.length; e++) {
                    var amnt = amount[e];
                    totalamnt = totalamnt + parseFloat(amnt);

                }

                var ctry = [];
                ctry = listofproduction;
                ctry = $.grep(ctry, function (e) {
                    if (e.processid == ProductnId) {
                        return e.Amnt = totalamnt;
                    }
                });
                ctry;
                loadprodntn1table(listofproduction);
                //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
                overallcalc();
            }
        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}
function prodctnsize() {
    debugger;
    if (this.val = 'S') {

        var cl = [];
        var qt = [];
        tempszlist = [];
        if (ProductnId > 0) {
            for (var r = 0; r < productndet.length; r++) {
                if (productndet[r].processid == ProductnId) {
                    cl.push(productndet[r].Sizeid);
                    qt.push(productndet[r]);
                }
            }

            if (cl.length > 0) {
                // cl = $.unique(cl);

                cl = cl.filter(function (itm, i, cl) {
                    return i == cl.indexOf(itm);
                });
                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w];
                    var totalqty = 0;
                    var Sz = '';
                    var Apprt = 0;
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Sizeid == cid) {
                            var qty = qt[m].Quantity;
                            totalqty = totalqty + parseFloat(qty);
                            Sz = qt[m].Size;
                            if (qt[m].apprate > 0) {
                                Apprt = qt[m].apprate;
                            }
                           // Apprt = Apprt + parseFloat(qt[m].apprate);
                            //Apprt = qt[m].apprate;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y] == cid) {
                            var Obj = {
                                Snumb: 0,
                                processid: ProductnId,
                                Itemname: '',
                                Color: '',
                                Size: Sz,
                                Quantity: totalqty,
                                Itmrate: 0,
                                Amnt: 0,
                                apprate: Apprt
                            }
                            tempszlist.push(Obj);
                        }
                    }
                }
                LoadPrdnttble2(tempszlist);
                var table = $('#production2table').DataTable();
                table.column(4).visible(true);
                table.column(3).visible(false);

                $('#txttotamntprod').val(0);

                var amount = [];
                $.each(productndet, function () {
                    if (this.processid == ProductnId) {
                        this.Amnt = 0;
                        amount.push(this.Amnt);
                    }
                });
                var totalamnt = 0;
                for (var e = 0; e < amount.length; e++) {
                    var amnt = amount[e];
                    totalamnt = totalamnt + parseFloat(amnt);

                }

                var ctry = [];
                ctry = listofproduction;
                ctry = $.grep(ctry, function (e) {
                    if (e.processid == ProductnId) {
                        return e.Amnt = totalamnt;
                    }
                });
                ctry;
                loadprodntn1table(listofproduction);
                //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
                overallcalc();
            }
        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}

function prodctncolor() {
    debugger;
    if (this.val = 'C') {

        var cl = [];
        var qt = [];
        tempcllist = [];
        if (ProductnId > 0) {
            for (var r = 0; r < productndet.length; r++) {
                if (productndet[r].processid == ProductnId) {
                    cl.push(productndet[r].Colorid);
                    qt.push(productndet[r]);
                }
            }

            if (cl.length > 0) {
                // cl = $.unique(cl);

                cl = cl.filter(function (itm, i, cl) {
                    return i == cl.indexOf(itm);
                });
                for (var w = 0; w < cl.length; w++) {
                    var cid = cl[w];
                    var totalqty = 0;
                    var clr = '';
                    var Apprt = 0;
                    for (var m = 0; m < qt.length; m++) {
                        if (qt[m].Colorid == cid) {
                            var qty = qt[m].Quantity;
                            totalqty = totalqty + parseFloat(qty);
                            clr = qt[m].Color;
                            if (qt[m].apprate > 0) {
                                Apprt = qt[m].apprate;
                            }
                            //Apprt = Apprt + parseFloat(qt[m].apprate);
                            //Apprt = qt[m].apprate;
                        }
                    }
                    for (var y = 0; y < cl.length; y++) {
                        if (cl[y] == cid) {
                            var Obj = {
                                Snumb: 0,
                                processid: ProductnId,
                                Itemname: '',
                                Color: clr,
                                Size: '',
                                Quantity: totalqty,
                                Itmrate: 0,
                                Amnt: 0,
                                apprate: Apprt

                            }
                            tempcllist.push(Obj);
                        }
                    }
                }
                LoadPrdnttble2(tempcllist);
                var table = $('#production2table').DataTable();
                table.column(3).visible(true);
                table.column(4).visible(false);
                table.column(2).visible(false);

                $('#txttotamntprod').val(0);

                var amount = [];
                $.each(productndet, function () {
                    if (this.processid == ProductnId) {
                        this.Amnt = 0;
                        amount.push(this.Amnt);
                    }
                });
                var totalamnt = 0;
                for (var e = 0; e < amount.length; e++) {
                    var amnt = amount[e];
                    totalamnt = totalamnt + parseFloat(amnt);

                }

                var ctry = [];
                ctry = listofproduction;
                ctry = $.grep(ctry, function (e) {
                    if (e.processid == ProductnId) {
                        return e.Amnt = totalamnt;
                    }
                });
                ctry;
                loadprodntn1table(listofproduction);
                //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
                overallcalc();
            }
        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}

function prodctnnone() {
    if (this.val = 'N') {
        if (ProductnId > 0) {
            var ctry1 = jQuery.grep(productndet, function (value) {
                return value.processid == ProductnId;
            });

            $.each(ctry1, function () {
                if (this.processid == ProductnId) {
                    this.Itmrate = 0;
                    this.Amnt = 0;

                }
            });
            LoadPrdnttble2(ctry1);


            var totalamnt = 0;
            for (var e = 0; e < productndet.length; e++) {
                if (productndet[e].processid == ProductnId) {
                    var amount = productndet[e].Amnt;
                    totalamnt = totalamnt + parseFloat(amount);
                }
            }
            $('#txttotamntprod').val(totalamnt);

            var amount = [];
            $.each(productndet, function () {
                if (this.processid == ProductnId) {
                    amount.push(this.Amnt);
                }
            });
            var totalamnt = 0;
            for (var e = 0; e < amount.length; e++) {
                var amnt = amount[e];
                totalamnt = totalamnt + parseFloat(amnt);

            }

            var ctry = [];
            ctry = listofproduction;
            ctry = $.grep(ctry, function (e) {
                if (e.processid == ProductnId) {
                    return e.Amnt = totalamnt;
                }
            });
            ctry;
            loadprodntn1table(listofproduction);
            //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
            overallcalc();

            var table = $('#production2table').DataTable();
            table.column(4).visible(true);
            table.column(3).visible(true);
            table.column(2).visible(false);


        }
        else {
            //alert('Please Select Any One Process...');
            var msg = "Please select any one process...";
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}



function getcompdetls(types, orderno, styleid, cost_id) {
    types = 'COMPONENT PROCESSES',
    orderno = $('#Ordernum').val(),
    styleid = StyleId,
    cost_id = 0
    debugger;
    $.ajax({
        url: "/Budget/GetProcess",
        data: JSON.stringify({ type: types, order: orderno, stylId: styleid, costid: cost_id, mode: Mode, strwid: StyRowId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            compdetails = json;
            $('#comp1table').DataTable({
                data: compdetails,
                columns: [
                         { title: "Processid", data: "processid", "visible": false },
                         { title: "Process", data: "processname" },
                         { title: "Amount", data: "Amnt" },

                ]
            });

            //bomdet = json;
            $('#comp2table').DataTable({
                data: compdetails,
                columns: [
                         { title: "Processid", data: "processid", "visible": false },
                         { title: "Item", data: "Itemname" },
                         { title: "Color", data: "Color" },
                         { title: "Size", data: "Size" },
                         { title: "Component", data: "component" },
                         { title: "Quantity", data: "Quantity" },
                         { title: "Rate", data: "rate" },
                         { title: "Amount", data: "Amnt" },
                ]
            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function commercialdet() {
    types = 'COMMERCIAL',
     orderno = $('#Ordernum').val(),
        cost_id = 0,
    Mode
    $.ajax({
        url: "/Budget/GetCommercial",
        data: JSON.stringify({ type: types, costid: cost_id, orderno: orderno, mode: Mode, styleid: StyleId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            List = json;
            percentagelst = JSON.parse(JSON.stringify(List));
            // calcvalue(List[0].cost);
            //commval;            
            for (var x = 0; x < List.length; x++) {
                (List[x].cost) * value;
                //List[x].Value = (parseFloat((List[x].cost)*value)/100);
            }
            loadchildTable(List);
            //bomdet = json;

            var totalamnt = 0;
            for (var e = 0; e < List.length; e++) {
                var amount = List[e].Value;
                var CostType = List[e].CostType;
                totalamnt = totalamnt + parseFloat(amount);

            }

            if (CostType == 'O') {
                $('#optpercentage').prop("checked", true);
                $('#optperpiece').prop("checked", false);
                $('#optpervalue').prop("checked", false);
            } else if (CostType == 'P') {
                $('#optpercentage').prop("checked", false);
                $('#optperpiece').prop("checked", true);
                $('#optpervalue').prop("checked", false);
            } else {
                $('#optpercentage').prop("checked", false);
                $('#optperpiece').prop("checked", false);
                $('#optpervalue').prop("checked", true);
            }


            $('#totamntcomm').val(totalamnt);
            $('#commercial').val(totalamnt.toFixed(DcurrencyDecimal));
            //overallcalc();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function masteredit() {
    debugger;
    types = 'MASTER',
     orderno = $('#Ordernum').val(),
        cost_id = 0,
    Mode

    $.ajax({
        url: "/Budget/GetMasteredit",
        data: JSON.stringify({ type: types, costid: cost_id, orderno: orderno, mode: Mode ,styleid: StyleId }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            masdetails = json;


            $('#Entrynum').val(masdetails[0].costdefnno);
            $('#Ordernum').val(masdetails[0].Orderno);
            $('#CostdefnId').val(masdetails[0].costdefnid);
            $('#dbpercent').val(masdetails[0].drawbackper);
            $('#txtProfitper').val(masdetails[0].ProfitPercent);
            $('#ddlSCurrency').val(masdetails[0].currencyid);
           // $('#ddlCurrency').val(masdetails[0].currencyid).trigger('change'); 
            $('#txtCurrency').val(masdetails[0].currency);
            $('#txtProfitper').val(masdetails[0].ProfitPercent);
            if (masdetails[0].BuyerMerchendiser == "B") {
                $('#ddlBuyMer').val(1);
            }
            else if (masdetails[0].BuyerMerchendiser == "M") {
                $('#ddlBuyMer').val(2);
            }
            else {
                $('#ddlBuyMer').val(0);
            }

            $('#cmcost').val(masdetails[0].CMCost);
            $('#finper').val(masdetails[0].FinPer);
            $('#txtGafiPer').val(masdetails[0].Gaficharges);
            $('#txtqizchargesper').val(masdetails[0].Qizcharges);
            $('#txtExport').val(masdetails[0].ExpCharges);
            $('#txtImport').val(masdetails[0].ImpCharges);
            //calcfinper();
            //calcExpper();
            //calcfinper();
            //calcImpper();
            //calcGifper();
            $('#finpervalue').val(masdetails[0].FinPerValue);
            $('#txtImportValue').val(masdetails[0].ImpChargesValue);
            $('#txtExportValue').val(masdetails[0].ExpChargesValue);
            $('#qizcharges').val(masdetails[0].QizchargesValue);
            $('#gaficharges').val(masdetails[0].GafichargesValue);
            $('#txtSalesrateper').val(masdetails[0].Salesratemargin);
            var totalamnt = 0;

            if (bomdet.length > 0) {
                $.each(bomdet, function (h) {

                    var amount = bomdet[h].Amnt;
                    totalamnt = totalamnt + parseFloat(amount);

                });
            }
            //FinValue
            //var fin = $('#finper').val();
            //var res = parseFloat((fin * totalamnt) / 100);
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);

            //var FFabCost = $('#fabric').val();
            //var FTrimCost = $('#accessories').val();
            //var FCMTCost = $('#cmt').val();
            //var Finper = $('#finper').val();
            //var FinTCost = parseFloat(FFabCost) + parseFloat(FTrimCost) + parseFloat(FCMTCost);
            //var FinPerValue = parseFloat((FinTCost * Finper) / 100);
            //var res = FinPerValue;
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);
            //totcost();

            ////gafiValue
            //var Gafi = $('#txtGafiPer').val();
            //var res = parseFloat((fin * totalamnt) / 100);
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);

            ////qizValue
            //var fin = $('#finper').val();
            //var res = parseFloat((fin * totalamnt) / 100);
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);

            ////expValue
            //var fin = $('#finper').val();
            //var res = parseFloat((fin * totalamnt) / 100);
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);

            ////impValue
            //var fin = $('#finper').val();
            //var res = parseFloat((fin * totalamnt) / 100);
            //res = res.toFixed(4);
            //$('#finpervalue').val(res);


            if (MisGafiChrg == 'Y') {
                $('#markup').val(masdetails[0].MarkUpvalue);
                // $('#gaficharges').val(masdetails[0].Gaficharges);
                if (masdetails[0].Qizcharges == 0) {
                    $('#QizStatus').prop("checked", false);
                } else {
                    $('#QizStatus').prop("checked", true);
                }
                //$('#qizcharges').val(masdetails[0].Qizcharges);
                var OrdVal = $("#txtOrderValue").val();
                var QizPer = $("#txtqizchargesper").val();
                var res = parseFloat((OrdVal * QizPer) / 100);

                res = res.toFixed(4);
                $('#qizcharges').val(res);
            }
            else if (MisGafiChrg == 'N') {

                $('#gaficharges').val(0);
                $('#QizStatus').prop("checked", false);
                $('#qizcharges').val(0);
            }
            Loadexchangerate();

            totcost();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function totcost() {
    debugger;
    if (MisGafiChrg == 'N') {
        $('#markup').val(0);
    }
    var fabric = ($('#fabric').val() == "" ? 0 : $('#fabric').val());
    var accss = ($('#accessories').val() == "" ? 0 : $('#accessories').val());
    var matcost = ($('#packing').val() == "" ? 0 : $('#packing').val());
    var proccost = ($('#process').val() == "" ? 0 : $('#process').val());
    var cmtcost = ($('#cmt').val() == "" ? 0 : $('#cmt').val());
    //var compprocost = ($('#compprocess').val() == "" ? 0 : $('#compprocess').val());
    var compprocost = 0;
    var commcost = ($('#commercial').val() == "" ? 0 : $('#commercial').val());

    var styamt = ($('#txtstylerate').val() == "" ? 0 : $('#txtstylerate').val());
    var salesper = ($('#txtSalesrateper').val() == "" ? 0 : $('#txtSalesrateper').val());
    var salescost = 0;
    if (salesper > 0 && styamt > 0) {
        salescost = (salesper / 100) * styamt;
    }
    var Salescostset = salescost.toFixed(DcurrencyDecimal);
    var quanty = $('#txtordqty').val();
    var slcst = Salescostset / quanty;profitvalue
    $('#Salescostset').val(slcst);
   // var Salescostset = ($('#Salescostset').val() == "" ? 0 : $('#Salescostset').val());

    var a = $('#cmcost').val() == "" ? 0 : $('#cmcost').val();
    var b = $('#finpervalue').val() == "" ? 0 : $('#finpervalue').val();
    var c = $('#gaficharges').val() == "" ? 0 : $('#gaficharges').val();
    //var d = $('#markup').val() == "" ? 0 : $('#markup').val();
    var e = $('#qizcharges').val() == "" ? 0 : $('#qizcharges').val();
    var f = $('#txtImportValue').val() == "" ? 0 : $('#txtImportValue').val();
    var G = $('#txtExportValue').val() == "" ? 0 : $('#txtExportValue').val();
    var rscost = parseFloat(fabric) + parseFloat(accss) + parseFloat(matcost) + parseFloat(proccost) + parseFloat(cmtcost) + parseFloat(compprocost) + parseFloat(commcost) + parseFloat(Salescostset);

    //var rup = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(rscost);
    //var rup = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(e) + parseFloat(f) + parseFloat(G) + parseFloat(rscost);
    var rup = parseFloat(rscost);
    $('#totalcost').val(rup.toFixed(DcurrencyDecimal));


    var pp = $('#txtProfitper').val();
    var tc = $('#totalcost').val();
    var PPValue = tc * pp / 100;
    var PPTValue = parseFloat(PPValue) + parseFloat(tc);

    $('#totalcost').val(PPTValue.toFixed(DcurrencyDecimal));

    var quanty = $('#txtordqty').val();
    var rupnew = $('#totalcost').val();
    var costpset = rupnew / quanty;
    $('#costset').val(costpset.toFixed(DcurrencyDecimal));


    //var pp = $('#txtProfitper').val();
    //var tc = $('#totalcost').val();
    //var PPValue = tc * pp / 100;
    //var PPTValue = parseFloat(PPValue) + parseFloat(tc);

    //$('#totalcost').val(PPTValue.toFixed(3));

    var ex = $('#exchange').val();
    var res = parseFloat(costpset * ex).toFixed(DcurrencyDecimal);
    $('#rupees').val(costpset.toFixed(DcurrencyDecimal));
    
    var rs = $('#rupees').val();

    var selvalue = rs / ex;
    $('#selcurr').val(selvalue.toFixed(DcurrencyDecimal));



    var shrate = $('#txtshiprate').val();
    var ex = $('#exchange').val();

    var sp = $('#saleprice').val();
    var tcostperpcs = $('#costset').val();

    var value2 = sp - tcostperpcs;
    $('#profitvalue').val(value2.toFixed(DcurrencyDecimal));

    var sp = $('#saleprice').val();
    var oqty = $('#txtordqty').val();
    var tcost = $('#totalcost').val();
    var tcostperpcs = $('#costset').val();

    var SValue = sp * oqty;
    var Tc = SValue - tcost;

    var ProPer = (Tc / SValue) * 100;

    $('#profit').val(ProPer.toFixed(DcurrencyDecimal));
    //calcsaleprice();
    //calcmarkup();
}

function calcsaleprice() {
    debugger;
    //var sp = $('#saleprice').val();
    //var db = $('#dbpercent').val();
    //var val1 = db / sp;
    //$('#dbvalue').val(val1.toFixed(3));

    //var rps = $('#rupees').val();

    //var value2 = (sp + val1) - rps;
    //$('#profitvalue').val(value2.toFixed(3));

    //var profit = (value2 * 100) / sp;
    //$('#profit').val(profit.toFixed(3));

    var sp = $('#saleprice').val();
    var oqty = $('#txtordqty').val();
    var tcost = $('#totalcost').val();
    var tcostperpcs = $('#costset').val();

    var SValue = sp * oqty;

    var Tc = SValue - tcost;

    //var GTc = (Tc / Sqty) * 100;

    //var db = $('#dbpercent').val();
    //var val1 = db / sp;
    //$('#dbvalue').val(val1.toFixed(3));
    //var rps = $('#rupees').val();
    var value2 = sp - tcostperpcs;
    $('#profitvalue').val(value2.toFixed(DcurrencyDecimal));

    $('#profit').val(Tc.toFixed(DcurrencyDecimal));

    //var profit = (value2 * 100) / sp;
    //$('#profit').val(GTc.toFixed(3));
}

function calcProfitper() {
    var pp = $('#txtProfitper').val();
    var tc = $('#totalcost').val();
    var PPValue = tc * pp / 100;
    var PPTValue = parseFloat(PPValue) + parseFloat(tc);

    $('#totalcost').val(PPTValue.toFixed(DcurrencyDecimal));

    var quanty = $('#txtordqty').val();
    var rupnew = $('#totalcost').val();
    var costpset = rupnew / quanty;
    $('#costset').val(costpset.toFixed(DcurrencyDecimal));
}

function calcdrwbck() {
    debugger;
    var db = $('#dbpercent').val();
    var proft = $('#profit').val();
    var sp = $('#saleprice').val();
    var rps = $('#rupees').val();


    var val1 = parseFloat((db * sp) / 100);
    $('#dbvalue').val(val1.toFixed(DcurrencyDecimal));

    var val2 = (sp + val1) - rps;
    //$('#profitvalue').val(value2.toFixed(3));

    var profit = (val2 * 100) / sp;
    $('#profit').val(profit.toFixed(DcurrencyDecimal));
}

function calcfinper() {
    debugger;
    //var totalamnt = 0;

    //if (bomdet.length > 0) {
    //    $.each(bomdet, function (h) {

    //        var amount = bomdet[h].Amnt;
    //        totalamnt = totalamnt + parseFloat(amount);

    //    });
    //}
    //var amnt = $('#txtstylerate').val();
    //var fin = $('#finper').val();

    //var res = parseFloat((fin * amnt) / 100);
    //res = res.toFixed(4);
    //$('#finpervalue').val(res);
    //totcost();
    var FFabCost = $('#fabric').val();
    var FTrimCost = $('#accessories').val();
    var FCMTCost = $('#cmt').val();
    var Finper = $('#finper').val();
    var FinTCost = parseFloat(FFabCost) + parseFloat(FTrimCost) + parseFloat(FCMTCost);
    var FinPerValue = parseFloat((FinTCost * Finper) / 100);
    var res = FinPerValue;
    res = res.toFixed(4);
    $('#finpervalue').val(res);
    totcost();
}

function calcImpper() {
    debugger;

    var FabCost = $('#fabric').val();
    var TrimCost = $('#accessories').val();
    var Imper = $('#txtImport').val();
    var FTCost = parseFloat(FabCost) + parseFloat(TrimCost);
    var IPerValue = parseFloat((FTCost * Imper) / 100);
    var res = IPerValue;
    res = res.toFixed(4);
    $('#txtImportValue').val(res);
    totcost();
}

function calcExpper() {
    debugger;

    var EFabCost = $('#fabric').val();
    var ETrimCost = $('#accessories').val();
    var Exper = $('#txtExport').val();
    var EFTCost = parseFloat(EFabCost) + parseFloat(ETrimCost);
    var EPerValue = parseFloat((EFTCost * Exper) / 100);
    var res = EPerValue;
    res = res.toFixed(4);
    $('#txtExportValue').val(res);
    totcost();
}

function calcGifper() {
    debugger;

    var OrdVal = $("#txtOrderValue").val();
    var GafPer = $("#txtGafiPer").val();
    var res = parseFloat((OrdVal * GafPer) / 100);

    res = res.toFixed(4);
    $('#gaficharges').val(res);
    totcost();
}

function calcmarkup() {
    debugger;

    //var a = $('#cmcost').val() == "" ? 0 : $('#cmcost').val();
    //var b = $('#finpervalue').val() == "" ? 0 : $('#finpervalue').val();
    //var c = $('#gaficharges').val() == "" ? 0 : $('#gaficharges').val();

    //var d = $('#fabric').val() == "" ? 0 : $('#fabric').val();
    //var e = $('#accessories').val() == "" ? 0 : $('#accessories').val();
    //var f = $('#process').val() == "" ? 0 : $('#process').val();
    //var g = $('#cmt').val() == "" ? 0 : $('#cmt').val();
    //var h = $('#commercial').val() == "" ? 0 : $('#commercial').val();
    //var i = $('#qizcharges').val() == "" ? 0 : $('#qizcharges').val();
    //var tt = $('#txtstylerate').val();

    //var res = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(f) + parseFloat(g) + parseFloat(h) + parseFloat(i);
    //var mrkup = parseFloat(tt - res);
    //mrkup = mrkup.toFixed(4);
    //$('#markup').val(mrkup);

    //totcost();

    var tt = $('#txtOrderValue').val();
    var res = $('#totalcost').val();//parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(f) + parseFloat(g) + parseFloat(h) + parseFloat(i);
    var mrkup = parseFloat(tt - res);
    mrkup = mrkup.toFixed(DcurrencyDecimal);
    $('#markup').val(mrkup);

    //totcost();
}
function LoadProcstbl2(list) {
    $('#process2table').DataTable().destroy();

    list.sort(function (a, b) {
        return a.Snumb - b.Snumb;
    });
    $('#pri').attr('disabled', false);
    $('#prs').attr('disabled', false);
    $('#prc').attr('disabled', false);
    $('#prn').attr('disabled', false);

    $('#process2table').DataTable({
        data: list,
        aaSorting: [[0, 'asc']],
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,   
        "rowCallback": function (row, data, index) {
            if (data.apprate > 0.00) {             
                $('#pri').attr('disabled', true);
                $('#prs').attr('disabled', true);
                $('#prc').attr('disabled', true);
                $('#prn').attr('disabled', true);                 
            }
        },
        //bSort: false,
        columns: [
             { title: "SNo", data: "Snumb", "visible": false },
                 { title: "Processid", data: "processid", "visible": false },
                 { title: "Item", data: "Itemname" },
                 { title: "Cat 1", data: "Color", "visible": false },
                 { title: "Cat 2", data: "Size", "visible": false },
                 {
                     title: "Quantity", data: "Quantity",
                     render: function (data) {

                         return '<input type="text" id="txtqtyrateproc1" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                     },
                 },
                 //{
                 //    title: "Rate", data: "Itmrate",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtrateproc1" class="editor-active" style="width: 50px;text-align: center;"   onkeyup="calprocamnt(this.value);"  value=' + data + '>';
                 //        }
                 //    }
                 //},
                  {
                      title: "Rate", data: "Itmrate",
                      render: function (data, type, row) {
                          if (row.apprate > 0.00) {
                              return '<input type="text" id="txtrateproc1" disabled class="form-control calprocamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                          } else {
                              return '<input type="text" id="txtrateproc1" class="form-control calprocamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                          }
                      },
                  },
                 //{
                 //    title: "Amount", data: "Amnt",
                 //    render: function (data, type) {
                 //        if (type === 'display') {
                 //            return '<input type="text" id="txtamntproc2" class="editor-active" style="width: 50px;text-align: center;" value=' + data + '  disabled>';
                 //        }
                 //    }
                 //},
                  {
                      title: "Amount", data: "Amnt",
                      render: function (data) {

                          return '<input type="text" id="txtamntproc2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                      },
                  },

                 {
                     title: "Sec Qty", data: "secqnt",


                 },
                 { title: "Itemid", data: "Itemid", "visible": false },
             { title: "Colorid", data: "Colorid", "visible": false },
             { title: "Sizeid", data: "Sizeid", "visible": false },

        ]
    });
    $("#process2table tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#process2table tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    listofprocessdet = list;

    var totalamnt = 0;
    for (var e = 0; e < list.length; e++) {
        var amount = list[e].Amnt;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttotamnt').val(totalamnt);
}

function LoadPrdnttble2(list) {
    $('#production2table').DataTable().destroy();

    //namelistprod.sort(function (a, b) {
    //    return a.Snumb - b.Snumb;
    //});
    $('#pdi').attr('disabled', false);
    $('#pds').attr('disabled', false);
    $('#pdc').attr('disabled', false);
    $('#pdn').attr('disabled', false);

    $('#production2table').DataTable({
        data: list,
        scrollY: 150,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        bSort: false,
        "rowCallback": function (row, data, index) {
            if (data.apprate > 0.00) {
                $('#pdi').attr('disabled', true);
                $('#pds').attr('disabled', true);
                $('#pdc').attr('disabled', true);
                $('#pdn').attr('disabled', true);
            }
        },
        columns: [
             { title: "SNo", data: "Snumb", "visible": false },
                 { title: "Processid", data: "processid", "visible": false },
                 { title: "Item", data: "Itemname" },
                 { title: "Cat 1", data: "Color", "visible": false },
                 { title: "Cat 2", data: "Size", "visible": false },
                 {
                     title: "Quantity", data: "Quantity",
                     render: function (data) {

                         return '<input type="text" id="txtqtyproduc2" class="form-control" maxlength="7" disabled style="width: 100px;text-align: center;" value=' + data + ' >';

                     },
                 },
                     {
                         title: "Rate", data: "Itmrate",
                         render: function (data, type, row) {
                             if (row.apprate > 0.00) {
                                 return '<input type="text" id="txtrateproduc2" disabled class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';
                             } else {
                                 return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt"  maxlength="7" style="width: 50px;text-align: center;" value=' + data + '  >';

                             }
                         },
                     },
                
                 //{
                 //    title: "Rate", data: "Itmrate",
                 //    render: function (data) {

                 //        return '<input type="text" id="txtrateproduc2" class="form-control calproductnamnt" maxlength="7" style="width: 50px;text-align: center;" value=' + data + ' >';

                 //    },
                 //},
                 {
                     title: "Amount", data: "Amnt",
                     render: function (data) {

                         return '<input type="text" id="txtamntprodu2" class="form-control"  style="width: 80px;text-align: center;" value=' + data + ' disabled >';

                     },
                 },

        ]
    });
    $("#production2table tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#production2table tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });



    var totalamnt = 0;
    for (var e = 0; e < list.length; e++) {
        var amount = list[e].Amnt;
        totalamnt = totalamnt + parseFloat(amount);

    }
    $('#txttotamntprod').val(totalamnt);
}
function loadfillbom() {
    debugger;
    $.each(bomdet, function () {
        if (this.apprate > 0) { }
        else {
            if (this.Itemid == BomFillItem) {
                this.Itmrate = BomFillRate;
                var am = parseFloat(BomFillRate) * parseFloat(this.Quantity);
                am = am.toFixed(DcurrencyDecimal);
                this.Amnt = am;
            }
        }
    });

    var totalamnt = 0;
    for (var e = 0; e < bomdet.length; e++) {
        var amount = bomdet[e].Amnt;
        totalamnt = totalamnt + parseFloat(amount);

    }

    $('#txttotbom').val(totalamnt.toFixed(DcurrencyDecimal));
    //alert(bomdet);
    overallcalc();

    var septable = $('#bomtable').DataTable();
    var sepdata = septable.rows().data();

    //$('input[id=bomrate]').each(function (ig) {
    //    var row = $(this).closest('tr');

    //    //var table = $('#processtable').DataTable();
    //    //var PId = table.row($(this).parents('tr')).data()["sno"];

    //    var apprt = row.find('#txtbomapprt').val();
    //    if (apprt > 0) { } else {
    //        row.find('#bomrate').val(BomFillRate);
    //        var amt = row.find('#bomqty').val();
    //        var res = parseFloat(amt) * BomFillRate;
    //        res = res.toFixed(2);
    //        row.find('#txtamnt').val(res);
    //    }

    //});


    var table = $('#bomtable').DataTable();
    var ecdata = table.rows().data();

    $('input[id=bomrate]').each(function (ig) {
        var row = $(this).closest('tr');
        for (var h = 0; h < bomdet.length; h++) {
            if (ecdata[ig].Snumb == bomdet[h].Snumb) {
                var Rate = bomdet[h].Itmrate;
                row.find('#bomrate').val(Rate);
                        var amt = row.find('#bomqty').val();
                        var res = parseFloat(amt) * Rate;
                        res = res.toFixed(DcurrencyDecimal);
                        row.find('#txtamnt').val(res);
            }
        }
    });


}

function LoadFillProdtn() {
    debugger;

    var type = $('input[name="optradioprod"]:checked').attr('value');
    var table = $('#production2table').DataTable();
    if (type == 'C') {


        $.each(productndet, function () {

            if (this.apprate > 0) { }
            else if (this.processid == ProdIdFill ) {
                this.Itmrate = ProdtnFillRate;
                var res = ProdtnFillRate * this.Quantity;
                res = res.toFixed(DcurrencyDecimal);
                this.Amnt = res;
                this.DispOpt = type;
            }
        });

        $.each(tempcllist, function () {
            if (this.apprate > 0) { }
            else if (this.processid == ProdIdFill) {
                this.Itmrate = ProdtnFillRate;
                var res = ProdtnFillRate * this.Quantity;
                res = res.toFixed(DcurrencyDecimal);
                this.Amnt = res;
            }
        });

        LoadPrdnttble2(tempcllist);
        var table = $('#production2table').DataTable();
        table.column(3).visible(true);
        table.column(4).visible(false);
        table.column(2).visible(false);
        //var fabdata = table.rows().data();

        //$('input[id=txtrateproduc2]').each(function (ig) {
        //    if (fabdata[ig].processid == ProdIdFill && this.Color == ProducClr) {
        //        var row = $(this).closest('tr');
        //        row.find('#txtrateproduc2').val(ProdtnFillRate);
        //        var r = row.find('#txtqtyproduc2').val();
        //        var res1 = ProdtnFillRate * r;
        //        res1 = res1.toFixed(2);
        //        row.find('#txtamntprodu2').val(res1);

        //    }
        //});
    }
    else if (type == 'S') {


        $.each(productndet, function () {
            if (this.apprate > 0) { }
           else if (this.processid == ProdIdFill) {
                this.Itmrate = ProdtnFillRate;
                var res = ProdtnFillRate * this.Quantity;
                res = res.toFixed(DcurrencyDecimal);
                this.Amnt = res;
                this.DispOpt = type;
            }
        });


        //var fabdata = table.rows().data();

        //$('input[id=txtrateproduc2]').each(function (ig) {
        //    if (fabdata[ig].processid == ProdIdFill && fabdata[ig].Size == ProducSz) {
        //        var row = $(this).closest('tr');
        //        row.find('#txtrateproduc2').val(ProdtnFillRate);
        //        var r = row.find('#txtqtyproduc2').val();
        //        var res1 = ProdtnFillRate * r;
        //        res1 = res1.toFixed(2);
        //        row.find('#txtamntprodu2').val(res1);

        //    }
        //});

        $.each(tempszlist, function () {
            if (this.apprate > 0) { }
            else if (this.processid == ProdIdFill) {
                this.Itmrate = ProdtnFillRate;
                var res = ProdtnFillRate * this.Quantity;
                res = res.toFixed(DcurrencyDecimal);
                this.Amnt = res;
            }
        });

        LoadPrdnttble2(tempszlist);
        var table = $('#production2table').DataTable();
        table.column(4).visible(true);
        table.column(3).visible(false);
    }
    else if (type == 'I') {

        $.each(productndet, function () {
            if (this.apprate > 0) { }
           else  if (this.processid == ProdIdFill) {
                this.Itmrate = ProdtnFillRate;
                var res = ProdtnFillRate * this.Quantity;
                res = res.toFixed(DcurrencyDecimal);
                this.Amnt = res;
                this.DispOpt = type;
            }
        });


        //var fabdata = table.rows().data();

        //$('input[id=txtrateproduc2]').each(function (ig) {
        //    if (fabdata[ig].processid == ProdIdFill && fabdata[ig].Itemname == im) {
        //        var row = $(this).closest('tr');
        //        row.find('#txtrateproduc2').val(ProdtnFillRate);
        //        var r = row.find('#txtqtyproduc2').val();
        //        var res1 = ProdtnFillRate * r;
        //        res1 = res1.toFixed(2);
        //        row.find('#txtamntprodu2').val(res1);

        //    }
        //});
        $.each(tempimlist, function () {
            if (this.apprate > 0) { }
           else  if (this.processid == ProdIdFill) {
                this.Itmrate = ProdtnFillRate;
                var res = ProdtnFillRate * this.Quantity;
                res = res.toFixed(DcurrencyDecimal);
                this.Amnt = res;
            }
        });

        LoadPrdnttble2(tempimlist);
        var table = $('#production2table').DataTable();
        table.column(2).visible(true);
        table.column(4).visible(false);
        table.column(3).visible(false);
    }
    else if (type == 'N') {
        $.each(productndet, function () {
            if (this.apprate > 0) { }          
            else if (this.processid == ProdIdFill) {
                this.Itmrate = ProdtnFillRate;
                var am = parseFloat(ProdtnFillRate) * parseFloat(this.Quantity);
                am = am.toFixed(DcurrencyDecimal);
                this.Amnt = am;
                this.DispOpt = type;
            }
        });

        var septable = $('#production2table').DataTable();
        var sepdata = septable.rows().data();

        $('input[id=txtrateproduc2]').each(function (ig) {
            if (sepdata[ig].apprate > 0) { }
            else if (sepdata[ig].processid == ProdIdFill) {
                var row = $(this).closest('tr');
                row.find('#txtrateproduc2').val(ProdtnFillRate);
                var amt = row.find('#txtqtyproduc2').val();
                var res = parseFloat(amt) * ProdtnFillRate;
                res = res.toFixed(DcurrencyDecimal);
                row.find('#txtamntprodu2').val(res);
            }
        });

    }
    var totalamnt = 0;
    for (var e = 0; e < productndet.length; e++) {
       
         if (productndet[e].processid == ProdIdFill) {
            var amount = productndet[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $('#txttotamntprod').val(totalamnt);

    var amount = [];
    $.each(productndet, function () {
       
        if (this.processid == ProdIdFill) {
            amount.push(this.Amnt);
        }
    });
    var totalamnt = 0;
    for (var e = 0; e < amount.length; e++) {
        var amnt = amount[e];
        totalamnt = totalamnt + parseFloat(amnt);

    }

    var ctry = [];
    ctry = listofproduction;
    ctry = $.grep(ctry, function (e) {
       
        if (e.processid == ProdIdFill) {
            return e.Amnt = totalamnt;
        }
    });
    ctry;
    loadprodntn1table(listofproduction);
    //$('#production1table tr:eq(' + rowindex + ')').find('td:eq(1)').text(totalamnt);
    overallcalc();
}

function LoadFillProcess() {
    debugger;

    $.each(processdetails1, function () {
        if (this.apprate > 0) { }
        else if (this.processid == ProcIdFill) {
            this.Itmrate = ProcFillRate;
            var am = parseFloat(ProcFillRate) * parseFloat(this.Quantity);
            am = am.toFixed(DcurrencyDecimal);
            this.Amnt = am;
        }
    });

    var septable = $('#process2table').DataTable();
    var sepdata = septable.rows().data();

    $('input[id=txtqtyrateproc1]').each(function (ig) {
        if (sepdata[ig].apprate > 0) { }
        else if (sepdata[ig].processid == ProcIdFill) {
            var row = $(this).closest('tr');
            row.find('#txtrateproc1').val(ProcFillRate);
            var amt = row.find('#txtqtyrateproc1').val();
            var res = parseFloat(amt) * ProcFillRate;
            res = res.toFixed(DcurrencyDecimal);
            row.find('#txtamntproc2').val(res);
        }
    });
    var totalamnt = 0;
    for (var e = 0; e < processdetails1.length; e++) {
        //if (this.apprate > 0) { }
         if (processdetails1[e].processid == ProcIdFill) {
            var amount = processdetails1[e].Amnt;
            totalamnt = totalamnt + parseFloat(amount);
        }
    }
    $('#txttotamnt').val(totalamnt);


    var amount = [];
    $.each(processdetails1, function () {
         if (this.processid == ProcIdFill) {
            amount.push(this.Amnt);
        }
    });
    var totalamnt = 0;
    for (var e = 0; e < amount.length; e++) {
        var amnt = amount[e];
        totalamnt = totalamnt + parseFloat(amnt);

    }

    var ctry = [];
    ctry = listofprocess;
    ctry = $.grep(ctry, function (e) {
      
         if (e.processid == ProcIdFill) {
            return e.Amnt = totalamnt;
        }
    });
    ctry;
    loadprocess1table(listofprocess);
    //$('#process1table tr:eq(' + (rowindex) + ')').find('td:eq(1)').text(totalamnt);
    overallcalc();

}
function overallcalc() {
    debugger;

    if (bomdet.length > 0) {
        var totalamnt = 0;

        $.each(bomdet, function (h) {

            if (bomdet[h].itmtype == 'FABRIC' || bomdet[h].itmtype == 'YARN') {

                var amount = bomdet[h].Amnt;
                totalamnt = totalamnt + parseFloat(amount);
            }
        });
        $('#fabric').val(totalamnt.toFixed(DcurrencyDecimal));
    }


    if (bomdet.length > 0) {
        var totalamnt = 0;

        $.each(bomdet, function (h) {

            if (bomdet[h].itmtype == 'ACCESSORY' || bomdet[h].itmtype == 'PACKING') {


                var amount = bomdet[h].Amnt;
                totalamnt = totalamnt + parseFloat(amount);
            }
        });
        $('#accessories').val(totalamnt.toFixed(DcurrencyDecimal));
    }


    if (processdetails1.length > 0) {
        var totalamnt = 0;

        $.each(processdetails1, function (h) {

            //if (processdetails1[h].Itemgroup == 'FABRIC' || processdetails1[h].Itemgroup == 'ACCESSORY' || processdetails1[h].Itemgroup == 'YARN' || processdetails1[h].Itemgroup == 'GARMENT') {

            var amount = processdetails1[h].Amnt;
            totalamnt = totalamnt + parseFloat(amount);
            //}
        });
        $('#process').val(totalamnt.toFixed(DcurrencyDecimal));
    }
    if (productndet.length > 0) {
        var totalamnt = 0;

        $.each(productndet, function (h) {

            //if (productndet[h].Itemgroup == 'FABRIC' || productndet[h].Itemgroup == 'ACCESSORY' || productndet[h].Itemgroup == 'YARN' || productndet[h].Itemgroup == 'GARMENT' || productndet[h].Itemgroup == 'COMPONENT') {

            var amount = productndet[h].Amnt;
            totalamnt = totalamnt + parseFloat(amount);
            //}
        });
        $('#cmt').val(totalamnt.toFixed(DcurrencyDecimal));
    }

    //calcmarkup();
    totcost();

}

function CalcComercial() {
    debugger;
    var cost = $('#cost').val();

    var type = $('input[name="price"]:checked').attr('value');

    if (type == 'O') {
        var orderno = $('#Ordernum').val(),
        styleid = StyleId
        $.ajax({
            url: "/Budget/Getlist",
            data: JSON.stringify({ order: orderno, stylId: StyleId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                value = result[0].Value;
                commval = value;
                //if (Mode == 0) {
                res = (cost * value) / 100;
                $('#value').val(res.toFixed(DcurrencyDecimal));
                //}
            }
        });
    }
    else if (type == 'P') {
        var qty = $('#qnty').val();
        var perpc = qty * cost;
        perpc = perpc.toFixed(DcurrencyDecimal);
        $('#value').val(perpc);
    }
    else if (type == 'V') {
        $('#value').val(cost);
    }

}


function GenerateNumber(table, column, compId, Docum) {

    debugger;
    table = "Cost_Defn_Mas",
    column = "Cost_Defn_No",
    compId = comId,
    Docum = 'COST DEFINITION'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#Entrynum').val(result.Value);
        }
    });

}
function commercialcalc() {
    debugger;
    var arr = [];
    var type = $('input[name="price"]:checked').attr('value');

    var texto = $('particularsdetails tr:nth-child(1) td:nth-child(3)').text();


    $('#particularsdetails tr .txtvalue').each(function () {
        debugger;
        var x = $(this).val();
        arr.push(x);

        //Do something with ItemCode.
    });

    //$('#particularsdetails tr').each(function (row, tr) {

    //        TableDataPar[row] = {
    //            Value: $(tr).find('td:eq(3)').text()
    //        }
    //    });
    //TableDataPar.shift();
    if (type == 'O') {
        var totalamnt = 0;

        $.each(arr, function (h) {

            var amount = arr[h];
            totalamnt = totalamnt + parseFloat(amount);
        });
        //if (type == 'O') {
        $('#totamntcomm').val(totalamnt.toFixed(DcurrencyDecimal));
        $('#commercial').val(totalamnt.toFixed(DcurrencyDecimal));
    }

    loadchildTable(percentagelst);
}

function perpricecomm() {
    debugger;
    var qty;
    var arr = [];
    var TableDataPar = new Array();
    var result;
    qty = $('#qnty').val();
    if (this.val = 'PC') {
        debugger;
        $('#particularsdetails tr').each(function (row, tr) {

            TableDataPar[row] = {
                Cost: $(tr).find('td:eq(1)').text()
            }

        });
        TableDataPar.shift();
        var totalamnt = 0;
        var tot = [];

        $.each(TableDataPar, function (h) {

            var amount = TableDataPar[h].Cost;
            totalamnt = amount * qty;
            tot.push(totalamnt);
            // $('#particularsdetails tr:eq(' + (h + 1) + ')').find('td:eq(3)').text(totalamnt);

        });

        for (var t = 0; t < List.length; t++) {
            List[t].Value = tot[t];
        }

        loadchildTable(List);
        $('#particularsdetails tr .txtvalue').each(function () {
            debugger;
            var cst = $(this).val();
            arr.push(cst);
        });
        var totalamnt = 0;

        $.each(arr, function (h) {
            var amount = arr[h];
            totalamnt = totalamnt + parseFloat(amount);
        });
        //if (type == 'O') {
        $('#totamntcomm').val(totalamnt.toFixed(DcurrencyDecimal));
        $('#commercial').val(totalamnt.toFixed(DcurrencyDecimal));

    }

}
function add() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    bomdet;
    processdetails1;
    productndet;
    listofprocessdet;
    listofproductndet;
    percentagelst;
    var listof = [];
    var lofprocess = [];
    var listofprodctn = [];
    var commlist = [];


    if (percentagelst.length > 0) {
        for (var d = 0; d < percentagelst.length; d++) {
            var list = {
                Cost_Defn_id: $('#CostdefnId').val(),
                Cost_Defn_COMid: $('#CostdefncomId').val(),
                Particularid: percentagelst[d].particularid,//$(tr).find('td:eq(0)').text(),
                Cost: percentagelst[d].cost,// $(tr).find('td:eq(2)').text(),
                //Value: $(tr).find('td:eq(3)').text(),
                Type: 'N',
                Remarks: percentagelst[d].remarks,// $(tr).find('td:eq(4)').text(),
                CostType: percentagelst[d].CostType,
                // AppCost: 0.00,
                Actual_Cost: percentagelst[d].Value,// 0.00,
                // FirstRate: 0.00
            }
            commlist.push(list);
        }
    }
    if (bomdet.length > 0) {
        for (var i = 0; i < bomdet.length; i++) {
            if (bomdet[i].Itmrate > 0) {
                var det = {
                    Cost_Defn_id: $('#CostdefnId').val(),
                    Cost_Defn_BOMid: $('#CostdefnbomId').val(),
                    Processid: bomdet[i].processid,
                    UOMid: bomdet[i].uomid,
                    Access_Type: bomdet[i].AccessType,
                    //Actual_Qty: 0,
                    //Actual_Rate: 0,
                    ExRate: bomdet[i].bomexrate,
                    CurrencyRate: bomdet[i].bomcurrate,
                    //AppRate: 0,
                    //AppCurrencyRate: 0,
                    //AppQty: 0,
                    IsSecQty: 'N',//bomdet[i].issecqnt,
                    Itemid: bomdet[i].Itemid,
                    Colorid: bomdet[i].Colorid,
                    Sizeid: bomdet[i].Sizeid,
                    Quantity: bomdet[i].Quantity,
                    Rate: bomdet[i].Itmrate,
                    CurrencyID: bomdet[i].bomcurrencyid,
                    ExRate: bomdet[i].bomexrate,
                    CurrencyRate: bomdet[i].bomcurrate,
                    //FirstRate: 0,
                    //SecQty: 0,
                    //AppSecQty: 0,
                    //ActualSecQty: 0
                }
                var bomlist = [];
                bomlist.push(det);
                listof.push(det);
            }
        }



    }

    if (processdetails1.length > 0) {
        debugger;
        for (var t = 0; t < processdetails1.length; t++) {
            if (processdetails1[t].Itmrate > 0) {
                var pdet = {
                    Cost_Defn_id: $('#CostdefnId').val(),
                    Cost_Defn_BOMid: $('#CostdefnbomId').val(),
                    Processid: processdetails1[t].processid,
                    //UOMid: 1,
                    Access_Type: "",
                    //Actual_Qty: 0,
                    //Actual_Rate: 0,
                    //ExRate: 0,
                    //CurrencyRate: 0,
                    //AppRate: 0,
                    //AppCurrencyRate: 0,
                    //AppQty: 0,
                    IsSecQty: processdetails1[t].issecqnt,
                    Itemid: processdetails1[t].Itemid,
                    Colorid: processdetails1[t].Colorid,
                    Sizeid: processdetails1[t].Sizeid,
                    Quantity: processdetails1[t].Quantity,
                    Rate: processdetails1[t].Itmrate,
                    DisplayOption: processdetails1[t].DispOpt,
                    //CurrencyID: $('#ddlCurrency').val(),
                    //FirstRate: 0,
                    //SecQty: 0,
                    //AppSecQty: 0,
                    //ActualSecQty: 0

                }
                var prlist = [];
                prlist.push(pdet);
                listof.push(pdet);
            }
        }


    }

    
    if (productndet.length > 0) {
        debugger;
        for (var t = 0; t < productndet.length; t++) {
            if (productndet[t].Itmrate > 0) {
                var pdet = {
                    Cost_Defn_id: $('#CostdefnId').val(),
                    Cost_Defn_BOMid: $('#CostdefnbomId').val(),
                    Processid: productndet[t].processid,
                    //UOMid: 1,
                    Access_Type: "",
                    //Actual_Qty: 0,
                    // Actual_Rate: 0,
                    //ExRate: 0,
                    //CurrencyRate: 0,
                    //AppRate: 0,
                    //AppCurrencyRate: 0,
                    //AppQty: 0,
                    IsSecQty: productndet[t].issecqnt,
                    Itemid: productndet[t].Itemid,
                    Colorid: productndet[t].Colorid,
                    Sizeid: productndet[t].Sizeid,
                    Quantity: productndet[t].Quantity,
                    Rate: productndet[t].Itmrate,
                    DisplayOption: productndet[t].DispOpt,
                    // CurrencyID: $('#ddlCurrency').val(),
                    //FirstRate: 0,
                    //SecQty: 0,
                    //AppSecQty: 0,
                    //ActualSecQty: 0

                }
                var prlist = [];
                prlist.push(pdet);
                listof.push(pdet);
            }
        }
    }
    var ptype = $('input[name="PAType"]:checked').attr('value');

    debugger;
    table = "Cost_Defn_Mas",
    column = "Cost_Defn_No",
    compId = comId,
    Docum = 'COST DEFINITION'

    var oldEntryNo = $('#Entrynum').val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newEntryNo = result.Value;
            if (oldEntryNo != newEntryNo) {
                //alert('Entry No has been changed...');
                var msg = "Entry Number has been changed...";
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                $('#Entrynum').val(result.Value);
            }
            var list = {
                Cost_Defn_id: $('#CostdefnId').val(),
                Cost_Defn_No: $('#Entrynum').val(),
                Cost_Defn_date: $('#date').val(),//new Date($('#date').val()),//$('#date').val(),
                Order_No: $('#Ordernum').val(),
                Companyid: comId,// 11,
                styleid: StyleId,
                CreatedBy: Guserid,
                ApprovedBy: Guserid,
                Currencyid: $('#ddlSCurrency').val(),
                ProfitPercent: $('#txtProfitper').val(),
                Approved: 'N',
                Amend: 'N',
                SalePrice: $('#saleprice').val(),
                sale_Profit: $('#profitvalue').val(),
                sale_Profit_percent: $('#profit').val(),
                Amend_Reason: 'Y',
                //first_budget: 1,
                Drawback_Percent: $('#dbpercent').val(),
                //AppCostArrived: 0,
                Remarks: $('#remark').val(),
                PA: ptype,
                ExchangeRate: $('#exchange').val(),
                CMCost: $('#cmcost').val(),
                FinPer: $('#finper').val(),
                MarkUpvalue: $('#markup').val(),
                Gaficharges: $('#txtGafiPer').val(),
                Qizcharges: $('#txtqizchargesper').val(),
                ImpCharges: $('#txtImport').val(),
                ExpCharges: $('#txtExport').val(),

                FinPerValue: $('#finpervalue').val(),
                GafichargesValue: $('#gaficharges').val(),
                QizchargesValue: $('#qizcharges').val(),
                ImpChargesValue: $('#txtImportValue').val(),
                ExpChargesValue: $('#txtExportValue').val(),
                ShipRate: $('#txtshiprate').val(),
                OrderValue: $('#txtOrderValue').val(),
                Salesratemargin: $('#txtSalesrateper').val(),
                ListDetails: listof,

                Listofcom: commlist
            }
            $("#btnsave").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/Budget/AddMas",
                data: JSON.stringify(list),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    debugger;
                    if (result.Value == 1) {

                        //alert('Data Saved Successfully');
                        var msg = "Data Saved Successfully...";
                        var flg = 1;
                        var mode = 0;
                        var url = "/PlanningMain/PlanningMainIndex";
                        AlartMessage(msg, flg, mode, url);
                        AddUserEntryLog('Planning', 'Budget', 'ADD', $('#Entrynum').val());
                        //window.location.href = "/PlanningMain/PlanningMainIndex";
                    }
                    if (result.Value == 0) {

                        //alert('Data not saved properly');
                        var msg = "Data not saved properly...";
                        var flg = 4;
                        var mode = 1;
                        var url = "";
                        AlartMessage(msg, flg, mode, url);
                        // window.location.href = "/PlanningMain/PlanningMainIndex";
                    }

                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }

            });
        }
    });
}


function adddet(list) {
    debugger;
    list;
    LoadingSymb();
    $.ajax({
        url: "/Budget/AddMas",
        data: JSON.stringify(list),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 1) {

                //alert('Data Saved Successfully');
                //window.location.href = "/PlanningMain/PlanningMainIndex";
                var msg = "Data Saved Successfully...";
                var flg = 1;
                var mode = 0;
                var url = "/PlanningMain/PlanningMainIndex";
                AlartMessage(msg, flg, mode, url);
            }
            if (result.Value == 0) {

                //alert('Data not saved properly');
                var msg = "Data not saved properly...";
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function Update() {
    debugger;
    var res = validate();
    if (res == false) {
        return false;
    }
    bomdet;
    processdetails1;
    productndet;
    listofprocessdet;
    listofproductndet;
    var listof = [];
    var lofprocess = [];
    var listofprodctn = [];
    var commlist = [];

    var BuyerMerchen = $('#ddlBuyMer').val();

    //$.each(processdetails1, function (h) {

    //    debugger;
    //    if (processdetails1[h].stageschedule == 1) {
    //        lofprocess.push(processdetails1[h]);
    //    }
    //});

    //$.each(productndet, function (h) {

    //    debugger;
    //    if (productndet[h].stageschedule == 2) {
    //        listofprodctn.push(productndet[h]);
    //    }
    //});

    //var TableDataI = new Array();
    //$('#particularsdetails tr').each(function (row, tr) {
    //    TableDataI[row] = {
    //        Cost_Defn_id: $('#CostdefnId').val(),
    //        Cost_Defn_COMid:24,// $('#CostdefncomId').val(),
    //        Particularid: $(tr).find('td:eq(0)').text(),
    //        Cost: $(tr).find('td:eq(2)').text(),
    //        //Value: $(tr).find('td:eq(3)').text(),
    //        Type: 'N',
    //        Remarks: $(tr).find('td:eq(4)').text(),
    //        CostType: 'V',
    //        AppCost: 0.00,
    //        Actual_Cost: 0.00,
    //        FirstRate: 0.00
    //    }
    //});
    //TableDataI.shift();
    //for (var d = 0; d < List.length; d++) {

    //    var com = {
    //        Cost_Defn_id: List[d].costdefnid,// $('#CostdefnId').val(),
    //        Cost_Defn_COMid: List[d].costdefncomid,// 24,// $('#CostdefncomId').val(),
    //        Particularid: List[d].particularid,//$(tr).find('td:eq(0)').text(),
    //        Cost: List[d].cost,//$(tr).find('td:eq(2)').text(),
    //        Value: List[d].Value,//$(tr).find('td:eq(3)').text(),
    //        Type: 'N',
    //        Remarks: List[d].remarks,// $(tr).find('td:eq(4)').text(),
    //        CostType: 'V',
    //        AppCost: 0.00,
    //        Actual_Cost: 0.00,
    //        FirstRate: 0.00

    //    }
    //    var comlist = [];
    //    comlist.push(com);
    //    // listof.push(com);
    //}

    if (percentagelst.length > 0) {
        for (var d = 0; d < percentagelst.length; d++) {

            var list = {
                Cost_Defn_id: $('#CostdefnId').val(),
                Cost_Defn_COMid: $('#CostdefncomId').val(),
                Particularid: percentagelst[d].particularid,//$(tr).find('td:eq(0)').text(),
                Cost: percentagelst[d].cost,// $(tr).find('td:eq(2)').text(),
                //Value: $(tr).find('td:eq(3)').text(),
                Type: 'N',
                Remarks: percentagelst[d].remarks,// $(tr).find('td:eq(4)').text(),
                CostType: percentagelst[d].CostType,
                //AppCost: 0.00,
                Actual_Cost: percentagelst[d].Value,// 0.00,
                //FirstRate: 0.00
            }
            commlist.push(list);
        }
    }

    if (bomdet.length > 0) {
        for (var i = 0; i < bomdet.length; i++) {
           // if (bomdet[i].Itmrate > 0) {
                var det = {
                    Cost_Defn_id: $('#CostdefnId').val(),
                    Cost_Defn_BOMid: bomdet[i].Cost_Defn_BOMid,
                    Processid: bomdet[i].processid,
                    UOMid: bomdet[i].uomid,
                    Access_Type: bomdet[i].AccessType,
                    //Actual_Qty: 0,
                    //Actual_Rate: 0,
                    //ExRate: 0,
                    //CurrencyRate: 0,
                    //AppRate: 0,
                    //AppCurrencyRate: 0,
                    //AppQty: 0,
                    IsSecQty: 'N',//bomdet[i].issecqnt,
                    Itemid: bomdet[i].Itemid,
                    Colorid: bomdet[i].Colorid,
                    Sizeid: bomdet[i].Sizeid,
                    Quantity: bomdet[i].Quantity,
                    Rate: bomdet[i].Itmrate,
                    CurrencyID: bomdet[i].bomcurrencyid,
                    ExRate: bomdet[i].bomexrate,
                    CurrencyRate: bomdet[i].bomcurrate,
                    //CurrencyID: 1,
                    //FirstRate: 0,
                    //SecQty: 0,
                    //AppSecQty: 0,
                    //ActualSecQty: 0
                }
                var bomlist = [];
                bomlist.push(det);
                listof.push(det);
           // }
        }



    }

    if (processdetails1.length > 0) {
        debugger;
        for (var t = 0; t < processdetails1.length; t++) {
           // if (processdetails1[t].Itmrate > 0) {
                var pdet = {
                    Cost_Defn_id: $('#CostdefnId').val(),
                    Cost_Defn_BOMid: processdetails1[t].Cost_Defn_BOMid,//$('#CostdefnbomId').val(),
                    Processid: processdetails1[t].processid,
                    // UOMid: 1,
                    Access_Type: "",
                    //Actual_Qty: 0,
                    //Actual_Rate: 0,
                    //ExRate: 0,
                    //CurrencyRate: 0,
                    //AppRate: 0,
                    //AppCurrencyRate: 0,
                    //AppQty: 0,
                    IsSecQty: processdetails1[t].issecqnt,
                    Itemid: processdetails1[t].Itemid,
                    Colorid: processdetails1[t].Colorid,
                    Sizeid: processdetails1[t].Sizeid,
                    Quantity: processdetails1[t].Quantity,
                    Rate: processdetails1[t].Itmrate,
                    DisplayOption: processdetails1[t].DispOpt,
                    //CurrencyID: 1,
                    //FirstRate: 0,
                    //SecQty: 0,
                    //AppSecQty: 0,
                    //ActualSecQty: 0

                }
                var prlist = [];
                prlist.push(pdet);
                listof.push(pdet);
           // }
        }


    }


    if (productndet.length > 0) {
        debugger;
        for (var t = 0; t < productndet.length; t++) {
            //if (productndet[t].Itmrate > 0) {
                var pdet = {
                    Cost_Defn_id: $('#CostdefnId').val(),
                    Cost_Defn_BOMid: productndet[t].Cost_Defn_BOMid,//$('#CostdefnbomId').val(),
                    Processid: productndet[t].processid,
                    // UOMid: 2,
                    Access_Type: "",
                    //Actual_Qty: 0,
                    //Actual_Rate: 0,
                    //ExRate: 0,
                    //CurrencyRate: 0,
                    //AppRate: 0,
                    //AppCurrencyRate: 0,
                    //AppQty: 0,
                    IsSecQty: productndet[t].issecqnt,
                    Itemid: productndet[t].Itemid,
                    Colorid: productndet[t].Colorid,
                    Sizeid: productndet[t].Sizeid,
                    Quantity: productndet[t].Quantity,
                    Rate: productndet[t].Itmrate,
                    CurrencyID: $('#ddlSCurrency').val(),
                    DisplayOption: productndet[t].DispOpt,
                    //FirstRate: 0,
                    //SecQty: 0,
                    //AppSecQty: 0,
                    //ActualSecQty: 0

                }
                var prlist = [];
                prlist.push(pdet);
                listof.push(pdet);
            //}
        }
    }

    var ptype = $('input[name="PAType"]:checked').attr('value');
    var list = {
        Cost_Defn_id: $('#CostdefnId').val(),
        Cost_Defn_No: $('#Entrynum').val(),
        Cost_Defn_date: $('#date').val(),//new Date($('#date').val()),//$('#date').val(),,
        Order_No: $('#Ordernum').val(),
        Companyid: comId,// 11,
        styleid: StyleId,
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        Currencyid: $('#ddlSCurrency').val(),
        Approved: 'N',
        Amend: 'N',
        SalePrice: $('#saleprice').val(),
        sale_Profit: $('#profitvalue').val(),
        sale_Profit_percent: $('#profit').val(),
        ProfitPercent: $('#txtProfitper').val(),   // margin
        Amend_Reason: 'yy',
        first_budget: 1,
        PA: ptype,
        Drawback_Percent: $('#dbpercent').val(),
        AppCostArrived: 0,
        Remarks: $('#remark').val(),
        CMCost: $('#cmcost').val(),

        FinPer: $('#finper').val(),
        MarkUpvalue: $('#markup').val(),
        Gaficharges: $('#txtGafiPer').val(),
        Qizcharges: $('#txtqizchargesper').val(),
        ImpCharges: $('#txtImport').val(),
        ExpCharges: $('#txtExport').val(),
        ExchangeRate: $('#exchange').val(),
        FinPerValue: $('#finpervalue').val(),
        GafichargesValue: $('#gaficharges').val(),
        QizchargesValue: $('#qizcharges').val(),
        ImpChargesValue: $('#txtImportValue').val(),
        ExpChargesValue: $('#txtExportValue').val(),
        ShipRate: $('#txtshiprate').val(),
        OrderValue: $('#txtOrderValue').val(),
        Salesratemargin: $('#txtSalesrateper').val(),

        BuyerMerchen: BuyerMerchen,
        ListDetails: listof,
        Listofcom: commlist,// TableDataI
    }


    $("#btnUpd").attr("disabled", true);
    LoadingSymb();

    updatedet(list);

}

function updatedet(list) {
    debugger;
    $("#btnUpd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/Budget/Update",
        data: JSON.stringify(list),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 1) {
                //alert('Data Updated Successfully');
                var msg = "Data Updated Successfully...";
                var flg = 1;
                var mod = 0;
                var url = "/PlanningMain/PlanningMainIndex";
                AlartMessage(msg, flg, mod, url);
                AddUserEntryLog('Planning', 'Budget', 'UPDATE', $('#Entrynum').val());
                flg = 0;
                //window.location.href = "/PlanningMain/PlanningMainIndex";
            }

            if (result.Value == 0) {

                //alert('Data not updated properly');
                var msg = "Data not updated properly...";
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function Update() {
//    var listof = [];
//    var lofprocess = [];
//    var listofprodctn = [];

//    $.each(processdetails1, function (h) {

//        debugger;
//        if (processdetails1[h].stageschedule == 1) {
//            lofprocess.push(processdetails1[h]);
//        }
//    });

//    $.each(productndet, function (h) {

//        debugger;
//        if (productndet[h].stageschedule == 2) {
//            listofprodctn.push(productndet[h]);
//        }
//    });

//    var TableDataI = new Array();
//    $('#particularsdetails tr').each(function (row, tr) {
//        TableDataI[row] = {
//            Cost_Defn_id: $('#CostdefnId').val(),
//            Cost_Defn_COMid: $('#CostdefncomId').val(),
//            Particularid: $(tr).find('td:eq(0)').text(),
//            Cost: $(tr).find('td:eq(2)').text(),
//            //Value: $(tr).find('td:eq(3)').text(),
//            Type: 'N',
//            Remarks: $(tr).find('td:eq(3)').text(),
//            CostType: 'V',
//            AppCost: 0.00,
//            Actual_Cost: 0.00,
//            FirstRate: 0.00
//        }
//    });
//    TableDataI.shift();


//    if (bomdet.length > 0) {
//        for (var i = 0; i < bomdet.length; i++) {
//            var det = {
//                Cost_Defn_id: $('#CostdefnId').val(),
//                Cost_Defn_BOMid: $('#CostdefnbomId').val(),
//                Processid: bomdet[i].processid,
//                UOMid: 9,
//                Access_Type: "F",
//                Actual_Qty: 300,
//                Actual_Rate: 235,
//                ExRate: 0,
//                CurrencyRate: 0,
//                AppRate: 235,
//                AppCurrencyRate: 0,
//                AppQty: 300,
//                IsSecQty: 'N',//bomdet[i].issecqnt,
//                Itemid: bomdet[i].Itemid,
//                Colorid: bomdet[i].Colorid,
//                Sizeid: bomdet[i].Sizeid,
//                Quantity: bomdet[i].Quantity,
//                Rate: bomdet[i].rate,
//                CurrencyID: 1,
//                FirstRate: 0,
//                SecQty: 0,
//                AppSecQty: 0,
//                ActualSecQty: 0
//            }
//            var bomlist = [];
//            bomlist.push(det);
//            listof.push(det);
//        }



//    }

//    if (lofprocess.length > 0) {
//        debugger;
//        for (var t = 0; t < lofprocess.length; t++) {
//            var pdet = {
//                Cost_Defn_id: $('#CostdefnId').val(),
//                Cost_Defn_BOMid: $('#CostdefnbomId').val(),
//                Processid: lofprocess[t].processid,
//                UOMid: 9,
//                Access_Type: "F",
//                Actual_Qty: 300,
//                Actual_Rate: 235,
//                ExRate: 0,
//                CurrencyRate: 0,
//                AppRate: 235,
//                AppCurrencyRate: 0,
//                AppQty: 300,
//                IsSecQty: lofprocess[t].issecqnt,
//                Itemid: lofprocess[t].Itemid,
//                Colorid: lofprocess[t].Colorid,
//                Sizeid: lofprocess[t].Sizeid,
//                Quantity: lofprocess[t].Quantity,
//                Rate: lofprocess[t].rate,
//                CurrencyID: 1,
//                FirstRate: 0,
//                SecQty: 0,
//                AppSecQty: 0,
//                ActualSecQty: 0

//            }
//            var prlist = [];
//            prlist.push(pdet);
//            listof.push(pdet);
//        }
//    }


//    if (listofprodctn.length > 0) {
//        debugger;
//        for (var t = 0; t < listofprodctn.length; t++) {
//            var pdet = {
//                Cost_Defn_id: $('#CostdefnId').val(),
//                Cost_Defn_BOMid: $('#CostdefnbomId').val(),
//                Processid: listofprodctn[t].processid,
//                UOMid: 9,
//                Access_Type: "F",
//                Actual_Qty: 300,
//                Actual_Rate: 235,
//                ExRate: 0,
//                CurrencyRate: 0,
//                AppRate: 235,
//                AppCurrencyRate: 0,
//                AppQty: 300,
//                IsSecQty: listofprodctn[t].issecqnt,
//                Itemid: listofprodctn[t].Itemid,
//                Colorid: listofprodctn[t].Colorid,
//                Sizeid: listofprodctn[t].Sizeid,
//                Quantity: listofprodctn[t].Quantity,
//                Rate: listofprodctn[t].rate,
//                CurrencyID: 1,
//                FirstRate: 0,
//                SecQty: 0,
//                AppSecQty: 0,
//                ActualSecQty: 0

//            }
//            var prlist = [];
//            prlist.push(pdet);
//            listof.push(pdet);
//        }
//    }

//    var list = {
//        Cost_Defn_id: $('#CostdefnId').val(),
//        Cost_Defn_No: $('#Entrynum').val(),
//        Cost_Defn_date: $('#date').val(),
//        Order_No: $('#Ordernum').val(),
//        Companyid: 11,
//        styleid: StyleId,
//        CreatedBy: 13,
//        ApprovedBy: 13,
//        Currencyid: 1,
//        Approved: 'N',
//        Amend: 'N',
//        SalePrice: 2,
//        sale_Profit: 0,
//        Amend_Reason: 'yy',
//        first_budget: 1,
//        Drawback_Percent: 7,
//        AppCostArrived: 0,
//        ListDetails: listof,
//        Listofcom: TableDataI
//    }
//    $.ajax({
//        url: "/Budget/Update",
//        data: JSON.stringify(list),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            alert('Data Updated Successfully');

//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}
function getdeleteid() {
    debugger;
    $.ajax({
        url: "/Budget/Getdeleteid",
        data: JSON.stringify({ stylrwid: StyRowId, mode: Mode }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            det = json.Value;



        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function Delete() {
    var Id = StyRowId;
    debugger;
    var bl = $.grep(bomdet, function (e) {
           return e.apprate>0;        
    });
    var pli = $.grep(processdetails1, function (e) {
        return e.apprate > 0;
    });
    var prdli = $.grep(productndet, function (e) {
        return e.apprate > 0;
    });
    if (bl.length > 0 || pli.length > 0 || prdli.length>0) {
        //alert('Budgegt Approval is made...Cant delete this budget...');
        var msg = "Budgegt Approval is made...Cant delete this budget...";
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        $("#btndelete").attr("disabled", true);
        return true;
    }
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        
        $("#btndelete").attr("disabled", true);
        $.ajax({
            url: "/Budget/delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                debugger;
                if (result.Value == true) {
                    //alert("Data deleted successfully...");
                    var msg = "Data deleted successfully...";
                    var flg = 2;
                    var mod = 0;
                    var url = "/PlanningMain/PlanningMainIndex";
                    AlartMessage(msg, flg, mod, url);
                    AddUserEntryLog('Planning', 'Budget', 'DELETE', $('#Entrynum').val());
                    //window.location.href = "/PlanningMain/PlanningMainIndex";


                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


function Multiclose() {
    debugger;
    if (OrdApp == 'Y') {
        window.location.href = "/OrderApproval/OrderApprovalIndex";
    }
    else {
        window.location.href = "/PlanningMain/PlanningMainIndex";
    }
}
function Close() {
    debugger;
    $('#myModal1').modal('hide');
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#saleprice').val().trim() == "") {
        $('#saleprice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#saleprice').css('border-color', 'lightgrey');
    }

    //if ($('#dbpercent').val().trim() == "") {
    //    $('#dbpercent').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#dbpercent').css('border-color', 'lightgrey');
    //}


    if ($('#ddlSCurrency').val() == 0) {
        //$('#ddlCurrency').css('border-color', 'Red');
        $('#ddlSCurrency').siblings(".select2-container").css('border', '1px solid red');

        isValid = false;
    }
    else {
        $('#ddlSCurrency').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    return isValid;
}

function calcSelecCurr() {
    debugger;
    var ex = $('#exchange').val();
    var rs = $('#rupees').val();

    var selvalue = ex / rs;

    $('#selcurr').val(selvalue.toFixed(DcurrencyDecimal));
}

function LoadPreOrderDetails(itemid,sizeid,colorid) {

    $.ajax({
        url: "/PurchaseOrderMain/LoadPreOrderdet",
        data: JSON.stringify({ Itemid: itemid, Sizeid: sizeid, Colorid: colorid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            var ord = "";
            var ref = "";
            var sty = "";
            var sup = "";
            var rate = "";
            if (obj != null ) {
                for (var t = 0; t < obj.length; t++) {
                    var od = obj[t].pur_ord_no;
                    var re = moment(obj[t].orddate).format('DD/MM/YYYY');
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
            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            //$('#txtmainstyle').val(sty);
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
                var od = obj[t].POno;
                var re = moment(obj[t].PoDate).format('DD/MM/YYYY');
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
            //$('#txtmainstyle2').val(sty);
            $('#txtsupplier2').val(sup);
            $('#txtPrerate2').val(rate);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function loadPurQuote(Workno, itemid, colorid, sizeid, compid) {
    debugger;

    $.ajax({
        url: "/VendorEntry/GetPurQuoteforPlan",
        data: JSON.stringify({ WorkordNo :Workno, itemid:itemid, Colorid:colorid, Sizeid:sizeid, Compid:compid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            loadPurQuoteTable(result);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadProQuote(Workno, itemid, colorid, sizeid,processid,compid) {
    debugger;

    $.ajax({
        url: "/ProcessQuoteEntry/GetProcessQuoteforPlan",
        data: JSON.stringify({ WorkordNo: Workno, itemid: itemid, Colorid: colorid, Sizeid: sizeid, Processid: processid, Compid: compid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            loadProQuoteTable(result);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadPurQuoteTable(Listobj) {
    debugger;
    var inputcount = 0;
    $('#PurQuotetable tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#PurQuotetable').DataTable().destroy();
    }
    $('#PurQuotetable').empty();

    $('#PurQuotetable').DataTable({
        data: Listobj,
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
             { title: "QuoteNo", data: "EntryNo" },
            { title: "MinQty", data: "MinQty" },
            { title: "MaxQty", data: "MaxQty" },
            { title: "Rate", data: "Rate" },
            { title: "Supplier", data: "Supplier" },
         
        ]
    });




}

function loadProQuoteTable(Listobj) {
    debugger;
    var inputcount = 0;
    $('#ProQuotetable tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#ProQuotetable').DataTable().destroy();
    }
    $('#ProQuotetable').empty();

    $('#ProQuotetable').DataTable({
        data: Listobj,
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
             { title: "QuoteNo", data: "QuoteNo" },
            { title: "MinQty", data: "MinQty" },
          
            { title: "Rate", data: "rate" },
            { title: "Supplier", data: "Supplier" },

        ]
    });

}

function LoadCopy() {

    debugger;
    var orderno = $('#ddlCPOrderNo option:selected').text();

    var StyId = $('#ddlCPSty').val();


    var chkapp = 0;
    $.each(bomdet, function (i) {
        if (bomdet[i].apprate > 0.00) {
            chkapp = 1;
        }

    });
    if (chkapp == 0) {
            $.ajax({
                url: "/Budget/GetBOMCopy",
                data: JSON.stringify({ OrderNo: orderno, Styleid: StyId }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",

                success: function (result) {
                    debugger;
                    var obj = result;

                        if (bomdet.length > 0) {
                            $.each(bomdet, function (i) {
                                $.each(obj, function (j) {
                                    if (bomdet[i].Itemid == obj[j].Itemid && bomdet[i].Colorid == obj[j].Colorid && bomdet[i].Sizeid == obj[j].Sizeid && bomdet[i].AccessType == 'A') {
                                        bomdet[i].Itmrate = obj[j].Itmrate;
                                        bomdet[i].bomcurrencyid = obj[j].bomcurrencyid;
                                        bomdet[i].bomexrate = obj[j].bomexrate;
                                        bomdet[i].bomcurrate = obj[j].bomcurrate;
                                    }
                                });
                            });

                            bom(bomdet);
                        }
                }

            });
       }
        else {

            var msg = 'BOM already approved...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    //}
}

function LoadFOrdDropDetails() {


    var BMasId = $('#ddlCPOrderNo').val();

    var StyId = $('#ddlCPSty').val();
    var RefNo = "";
    RefNo = "";
    var JbId = 0;
    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                //Style
                $(ddlCPSty).empty();
                $(ddlCPSty).append($('<option/>').val('0').text('--Select Style--'));
                $.each(data, function () {
                    $(ddlCPSty).append($('<option></option>').val(this.Styleid).text(this.Style));
                });
            }


        }

    });

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