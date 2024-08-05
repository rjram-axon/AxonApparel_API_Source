var cuttinglist = [];
var result = [];
var cuttingDetlist = [];
var cuttingGrammagelist = [];
var bundlelist = [];
var companyid = 0;
var companyunitid = 0;
var OrderType = 0;
var InterExter = 0;
var Frmdate, ToDt = 0;
var fromdate, todate = 0;
var table, column, compId, Docum;
var Mode = 0;
var JobOrdNo = 0;
var PrdprgNo = 0;
var CutOrdNo = 0;
var Processor = 0;
var OrderNo = 0;
var Style = 0;
var StyleId = 0;
var Company = 0;
var CompanyUnit = 0;
var CuttingOrdid = 0;
var CuttingOrdDetid = 0;
var maintbllist = [];
var Fdatestring = 0;
var CuttReceiptId = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var editCuttingOrddetid = 0;
var editbundleno = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkIncharge = true;
var ChkJNo = true;
var ChkRcNo = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var CompanyId = 0;
var PanelProcessReceiptEditFlg = "disabled";
var PanelProcessReceiptDeleteFlg = "disabled";
var PanelProcessReceiptPrintFlg = "disabled";
var ValidateProductionStore = "False";
var inProcess = '';
var OType='W';
$(document).ready(function () {
    debugger;
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoadCompanyDDL("#ddlcutCompany,#ddlinnercompany");
    LoadCompanyUnitDDL("#ddlcutunit,#ddlinnercompunit");
    LoadBuyerDDL("#ddlproBuyer,#ddlinnerBuyer");
    LoadWorkdivisionDDL("#ddlMainWorkdiv");
    LoadOrderNoDDL("#ddlinnerOrderNo");
    LoadStyleDDL("#ddlinnerstyle");
    LoadEmployeeDDL("#ddlemployee");
   // LoadCuttingRecptNoDDL("#ddlCutRcpNo");
    LoadRefNoDDL("#ddlinnerrefno");
    LoadJobNoDDL("#ddlissuestore");
    LoadShiftDDL("#ddlshift");
    LoadPanelProcessDDL("#ddlProcess,#ddlinnerProcess");
    //LoadEmployeeDDL("#ddlemployee");
    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');
    ValiCutBudApp = $("#hdnCostBudCutAppid").data('value');
    ValiCutBudAppSam = $("#hdnCostBudCutAppSamid").data('value');
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    Fdatestring = day + "/" + Cmonth + "/" + year;
    Frmdate = year + "/" + Cmonth + "/" + day;
    ToDt = year + "/" + Cmonth + "/" + day;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = day.getDate() + '/' + month + '/' + year;

    $("#txtFromDate").val(MainFDate);
    $("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();

    if ($('#optoutwrkord').is(':checked')) { OrderType = 'W'; }
    else if ($('#optsampleord').is(':checked')) { OrderType = 'S'; }
    else if ($('#optjobord').is(':checked')) { OrderType = 'J'; }

    if ($('#optoutint').is(':checked')) { InterExter = 'I'; }
    else if ($('#optoutext').is(':checked')) { InterExter = 'E'; }

    var fill = localStorage.getItem('PanelReceiptMainFilter');
    if (fill != "null" && fill != null) {
        LoadDataFromBack(companyid, OrderType, InterExter, fromdate, todate);
    } else {
        LoadData(companyid, OrderType, InterExter, fromdate, todate);
    }


    //LoadData(companyid, OrderType, InterExter, fromdate, todate);

    $("#btncutclose").click(function () {
        debugger;
        $('#myModal1').modal('hide');

        $('#txtrcpcompany').val('');
        $('#txtrcpprodunit').val('');
        $('#txtrcpprocessor').val('');
        $('#txtrcpstyle').val('');
        $('#txtrcporderno').val('');
        $('#txtrcpprogno').val('');
        $('#txtrcpjobno').val('');
        $('#txtrcpcutordno').val('');
        $('#txtCuttinordid').val(0);
        $('#txtrcprctno').val('');
        $('#txtrcprefno').val('');

        bundlelist = [];
        //$('#tblreceiptdetail').DataTable().destroy();
        //$('#tblbundledetails').DataTable().destroy();
    });

    //Load Radio Button of MSType
    if (Mode == 0) {
        //LoadCompanyDDL("#ddlMSCompany,#ddlSCompany");
        LoadStoreUnitDDL("#ddlMSMMainStore");
        //LoadStoreSectionDDL("#ddlSecStore");
        //LoadCompanyUnitDDL("#ddlPUnit");
        LoadWorkdivisionDDL("#ddlWK");
    }
    var MSType = $('input[name="MSType"]:checked').attr('value');


    if (MSType == "M") {
        $("#SubStoreId").hide();
        $("#SecStoId").hide();
    } else if (MSType == "E") {
        $("#SubStoreId").hide();
        $("#SecStoId").show();
        $("#MainStoreId").hide();
    }
    $(document).on('keyup', '.txtrate', function (e) {
        debugger;
        var table = $('#tblreceiptdetail').DataTable();
        var sno = table.row($(this).parents('tr')).data()["CuttingOrdDetId"];
        var rate = table.row($(this).parents('tr')).data()["Apprate"];
        var Val = $(this).val();

        if (ValiCutBudApp == 'Y') {
            if (Val <= rate) {
                $.each(cuttingDetlist, function () {
                    if (this.CuttingOrdDetId == sno) {
                        this.Rate = Val;

                    }
                });
            }
            else {
                //alert('Should not exceed BudgetRate...');
                var msg = 'Should not exceed BudgetRate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                $.each(cuttingDetlist, function () {
                    if (this.CuttingOrdDetId == sno) {
                        this.Rate = this.apprate;

                    }
                });
                var table = $('#tblreceiptdetail').DataTable();
                var data = table.rows().data();

                $('input[id=txtrate]').each(function (ig) {
                    if (data[ig].CuttingOrdDetId == sno) {
                        var row = $(this).closest('tr');
                        row.find('#txtrate').val(data[ig].Apprate);

                    }
                });
                return true;
            }
        }
        else {
            $.each(cuttingDetlist, function () {
                if (this.CuttingOrdDetId == sno) {
                    this.Rate = Val;

                }
            });
        }
    });
    $(document).on('click', '.btnbundleedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = bundlelist.slice(rowindex);



        var table = $('#tblbundledetails').DataTable();

        var BundleNo = table.row($(this).parents('tr')).data()["BundleNo"];
        var EmployeeId = table.row($(this).parents('tr')).data()["EmployeeId"];
        var Bundleqty = table.row($(this).parents('tr')).data()["Bundleqty"];
        editCuttingOrddetid = table.row($(this).parents('tr')).data()["CuttingOrddetid"];

        editbundleno = BundleNo;

        $('#txtbundleno').val(BundleNo);
        $('#ddlemployee').val(EmployeeId).trigger('change');
        $('#txtqty').val(Bundleqty);

        $('#btnbundleadd').hide();
        $('#btnbundleupdate').show();
    });

    $('#btnbundleupdate').click(function () {
        debugger;
        var currentrowsel = bundlelist.slice(rowindex);

        $.each(bundlelist, function (e) {
            if (bundlelist[e].CuttingOrddetid == editCuttingOrddetid && bundlelist[e].BundleNo == editbundleno) {
                bundlelist[e].EmployeeId = $("#ddlemployee option:selected").val();
                bundlelist[e].Employee = $("#ddlemployee option:selected").text();
                bundlelist[e].Bundleqty = $("#txtqty").val();
                bundlelist[e].BundleNo = $("#txtbundleno").val();
            }

        });

        var cutempty = [];
        cutempty = bundlelist;

        cutempty = $.grep(cutempty, function (v) {
            return (v.CuttingOrddetid == editCuttingOrddetid);
        });
        loadbundleTable(cutempty);
        //currentrowsel[0]['EmployeeId'] = $("#ddlemployee option:selected").val();
        //currentrowsel[0]['Employee'] = $("#ddlemployee option:selected").text();
        //currentrowsel[0]['Bundleqty'] = $("#txtqty").val();
        //currentrowsel[0]['BundleNo'] = $("#txtbundleno").val();

        // bundlelist[rowindex] = currentrowsel[0];

        // loadbundleTable(bundlelist);
        //}

        var totqty = 0;
        $.each(bundlelist, function (e) {
            if (bundlelist[e].CuttingOrddetid == editCuttingOrddetid) {
                totqty = totqty + parseInt(bundlelist[e].Bundleqty);
            }
        });


        var cuttingfilterlist = [];

        if (cuttingDetlist != undefined) {
            cuttingfilterlist = $.grep(bundlelist, function (element, index) {
                return element.CuttingOrddetid == editCuttingOrddetid;
            });

            for (var i in cuttingDetlist) {
                if (cuttingDetlist[i]['CuttingOrdDetId'] == editCuttingOrddetid) {
                    cuttingDetlist[i]['Recqty'] = (parseInt(totqty));
                    cuttingDetlist[i]['Weight'] = ((parseInt(cuttingDetlist[i]['Grammage']) * parseInt(cuttingDetlist[i]['Recqty'])) / 1000);
                    cuttingDetlist[i]['Nobundle'] = cuttingfilterlist.length;
                    break; //Stop this loop, we found it!
                }
            }
        }

        LoadCuttingDetails(cuttingDetlist);


        $('#btnbundleupdate').hide();
        $('#btnbundleadd').show();

        $('#ddlemployee').val('').trigger('change');
        $('#txtbundleno').val('');
        $('#txtqty').val('');

        Mode = 0;
    });

    $("#btnfstclose").click(function () {
        debugger;
        $('#myModal').modal('hide');

        $('#tblinnercuttingreceipt').DataTable().destroy();
        $("#ddlinnercompany").val(0);
        //$("#ddlcutCompany").val(0);
        $("#ddlinnerBuyer").val(0);
        $("#ddlinnerOrderNo").val(0);
        $("#ddlinnercompunit").val(0);
       // $("#ddlcutunit").val(0);
        $("#ddlinnerstyle").val(0);
        $("#ddlinnerWorkdivision").val(0);
        $("#ddlprocessor").val(0);
    });

    $('#btnbundleadd').click(function () {
        debugger;
        //validation and add order items
        var isAllValid = true;
        var leng = 0;

        debugger;
        if ($('#txtbundleno').val() == "") {
            isAllValid = false;
            $('#txtbundleno').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtbundleno').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtqty').val() == "0" || $('#txtcolorqty').val() == "") {
            isAllValid = false;
            $('#txtqty').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#txtqty').siblings('span.error').css('visibility', 'hidden');
        }
        if (CuttingOrdDetid == 0) {
            //alert("Please select any Item...");
            var msg = 'Please select any Item...';
            var flg = 4;
            var mod = 1;
            AlartMessage(msg, flg, mod);
        }
        else {
            if (isAllValid) {
                debugger;
                var bundleListObj = {
                    CuttingOrddetid: CuttingOrdDetid,
                    BundleNo: $('#txtbundleno').val(),
                    Bundleqty: $('#txtqty').val(),
                    Employee: $("#ddlemployee option:selected").text(),
                    EmployeeId: $('#ddlemployee').val(),
                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
                };

                bundlelist.push(bundleListObj);

                // loadbundleTable(bundlelist);

                var cutempty = [];
                cutempty = bundlelist;

                cutempty = $.grep(cutempty, function (v) {
                    return (v.CuttingOrddetid == CuttingOrdDetid);
                });
                loadbundleTable(cutempty);


                var cuttingfilterlist = [];

                if (cuttingDetlist != undefined) {
                    cuttingfilterlist = $.grep(bundlelist, function (element, index) {
                        return element.CuttingOrddetid == CuttingOrdDetid;
                    });

                    for (var i in cuttingDetlist) {
                        if (cuttingDetlist[i]['CuttingOrdDetId'] == CuttingOrdDetid) {
                            cuttingDetlist[i]['Recqty'] = (parseInt(cuttingDetlist[i]['Recqty']) + parseInt($('#txtqty').val()));
                            cuttingDetlist[i]['Weight'] = ((parseInt(cuttingDetlist[i]['Grammage']) * parseInt(cuttingDetlist[i]['Recqty'])) / 1000);
                            cuttingDetlist[i]['Nobundle'] = cuttingfilterlist.length;
                            break; //Stop this loop, we found it!
                        }
                    }
                }

                LoadCuttingDetails(cuttingDetlist);

                $('#ddlemployee').val('').trigger('change');
                $('#txtbundleno').val('');
                $('#txtqty').val('');
            }
        }
    });

    $(document).on('keyup', '.txtgramage', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = cuttingDetlist.slice(rowindex);
        var grammage = $(this).val();
        var qty = currentrow[0]['Recqty'];

        var itm = currentrow[0]['ItemId'];
        var clr = currentrow[0]['ColorId'];
        var sze = currentrow[0]['SizeId'];

        currentrow[0]['Grammage'] = grammage;
        currentrow[0]['Weight'] = ((grammage * qty) / 1000);

        cuttingDetlist[rowindex] = currentrow[0];

        LoadCuttingDetails(cuttingDetlist);

        //Datatable textbox focus
        var rows = $("#tblreceiptdetail").dataTable().fnGetNodes();
        var dtTable = $('#tblreceiptdetail').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var im = dtTable.cells({ row: i, column: 1 }).data()[0];
            var cl = dtTable.cells({ row: i, column: 2 }).data()[0];
            var sz = dtTable.cells({ row: i, column: 3 }).data()[0];
            $('input[id=txtgramage]').each(function () {
                if (im == itm && cl == clr && sz == sze && $(this).val() == grammage) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtgramage').val();
                    row.find('#txtgramage').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.txtrcdqty', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();
        //var currentrow = cuttingDetlist.slice(rowindex);
        var table = $('#tblreceiptdetail').DataTable();
        var itm = table.row($(this).parents('tr')).data()["ItemId"];
        var clr = table.row($(this).parents('tr')).data()["ColorId"];
        var sze = table.row($(this).parents('tr')).data()["SizeId"];
        var grammage = table.row($(this).parents('tr')).data()["Grammage"]; 
        var rate = table.row($(this).parents('tr')).data()["Rate"];
        var apprate = table.row($(this).parents('tr')).data()["Apprate"];

        var Balqty = table.row($(this).parents('tr')).data()["Balqty"];
        var qty = $(this).val();

        if (ValiCutBudApp == "Y" && OrderType == "S") {
            if (apprate < rate) {

                //alert("Please Check Budget Rate..");
                var msg = 'Please Check Budget Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                qty = 0;
                return true;
            }

        }

        if (ValiCutBudApp == "Y" && OrderType == "B") {
            if (apprate < rate) {

                //alert("Please Check Budget Rate..");
                var msg = 'Please Check Budget Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                qty = 0;
                return true;
            }

        }

        if (Balqty < qty) {
            //alert('Rec.Qty should not exceed BalQty..');
            var msg = 'Received Quantity should not exceed Balance Quantity...';
            var flg = 4;
            var mod = 1;
            AlartMessage(msg, flg, mod);
            //Datatable textbox focus
            var otable = $('#tblreceiptdetail').DataTable();
            var odata = otable.rows().data();

            $('input[id=txtrcdqty]').each(function (ig) {
                if (odata[ig].ItemId == itm && odata[ig].ColorId == clr && odata[ig].SizeId == sze) {
                    var row = $(this).closest('tr');
                    // row.find('#txtOpOrdQty').val(totalamnt);
                    row.find('#txtrcdqty').focus().val('').val(0);
                }
            });

            return true;
           
        }
        //var grammage = currentrow[0]['Grammage'];

       // var itm = currentrow[0]['ItemId'];
       // var clr = currentrow[0]['ColorId'];
        // var sze = currentrow[0]['SizeId'];
        $.each(cuttingDetlist, function () {
            if (this.ItemId == itm && this.ColorId == clr && this.SizeId == sze) {
                this.Recqty = qty;
                this.Weight = ((grammage * qty) / 1000);
            }
        });


        //currentrow[0]['Recqty'] = qty;
        //currentrow[0]['Weight'] = ((grammage * qty) / 1000);

        //cuttingDetlist[rowindex] = currentrow[0];

        LoadCuttingDetails(cuttingDetlist);
        //
        //Datatable textbox focus
        var rows = $("#tblreceiptdetail").dataTable().fnGetNodes();
        var dtTable = $('#tblreceiptdetail').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var im = dtTable.cells({ row: i, column: 1 }).data()[0];
            var cl = dtTable.cells({ row: i, column: 2 }).data()[0];
            var sz = dtTable.cells({ row: i, column: 3 }).data()[0];
            $('input[id=txtrcdqty]').each(function () {
                if (im == itm && cl == clr && sz == sze && $(this).val() == qty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtrcdqty').val();
                    row.find('#txtrcdqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.txtweight', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = cuttingDetlist.slice(rowindex);
        var weight = $(this).val();
        var recqty = currentrow[0]['Recqty'];

        var itm = currentrow[0]['ItemId'];
        var clr = currentrow[0]['ColorId'];
        var sze = currentrow[0]['SizeId'];
        currentrow[0]['Weight'] = weight;
        currentrow[0]['Grammage'] = (weight / recqty) * 1000;

        cuttingDetlist[rowindex] = currentrow[0];

        LoadCuttingDetails(cuttingDetlist);
        //Datatable textbox focus
        var rows = $("#tblreceiptdetail").dataTable().fnGetNodes();
        var dtTable = $('#tblreceiptdetail').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var im = dtTable.cells({ row: i, column: 1 }).data()[0];
            var cl = dtTable.cells({ row: i, column: 2 }).data()[0];
            var sz = dtTable.cells({ row: i, column: 3 }).data()[0];
            $('input[id=txtweight]').each(function () {
                if (im == itm && cl == clr && sz == sze && $(this).val() == weight) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtweight').val();
                    row.find('#txtweight').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('click', '.btnbundleremove', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = bundlelist.slice(rowindex);
        var table = $('#tblbundledetails').DataTable();

        var BundleNo = table.row($(this).parents('tr')).data()["BundleNo"];
        var EmployeeId = table.row($(this).parents('tr')).data()["EmployeeId"];
        var Bundleqty = table.row($(this).parents('tr')).data()["Bundleqty"];
        editCuttingOrddetid = table.row($(this).parents('tr')).data()["CuttingOrddetid"];

        var totqty = 0;
        $.each(bundlelist, function (e) {
            if (bundlelist[e].CuttingOrddetid == editCuttingOrddetid && undlelist[e].BundleNo == BundleNo) {
                totqty = totqty + parseInt(bundlelist[e].Bundleqty);
            }
        });


        var diffval = 0;

        if (cuttingDetlist != undefined) {
            //cuttingfilterlist = $.grep(cuttingDetlist, function (element, index) {
            //    return element.CuttingOrdDetId == CuttingOrddetid;
            //});
            for (var i in cuttingDetlist) {
                if (cuttingDetlist[i]['CuttingOrdDetId'] == CuttingOrdDetid) {
                    cuttingDetlist[i]['Recqty'] = (parseInt(cuttingDetlist[i]['Recqty']) - parseInt(totqty));
                    diffval = ((parseInt(cuttingDetlist[i]['Grammage']) * parseInt(cuttingDetlist[i]['Recqty'])) / 1000);
                    cuttingDetlist[i]['Weight'] = diffval;
                    break; //Stop this loop, we found it!
                }
            }
        }

        bundlelist.splice(rowindex, 1);
        document.getElementById("tblbundledetails").deleteRow(rowindex + 1);

        LoadCuttingDetails(cuttingDetlist);
    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        $('#myModal1').modal('show');
        $('#btnAdd').hide();
        $('#btnUpdate').show();
        $('#btnbundleupdate').hide();
        //$("#btnUpdate").prop("disabled", true);

       // LoadShiftDDL("#ddlshift");

        var table = $('#tblMainGrid').DataTable();
        CuttReceiptId = table.row($(this).parents('tr')).data()["CuttingReceiptId"];
        var CuttOrderId = table.row($(this).parents('tr')).data()["CuttingOrdId"];
        inProcess = table.row($(this).parents('tr')).data()["Process"];
        $('#txtProcess').val(inProcess);

        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        //var CuttReceiptId = currow[0]['CuttingReceiptId'];
        //var CuttOrderId = currow[0]['CuttingOrdId'];

        $.ajax({
            url: "/BitCuttingOrderReceipt/ReceiptHeaderInfo/",
            data: JSON.stringify({ ID: CuttReceiptId, CuttingOrderID: CuttOrderId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var headerinfo = [];
                headerinfo = result.Value;

                $('#txtrcpcompany').val(headerinfo[0].CompanyName);
                $('#txtrcpprodunit').val(headerinfo[0].CompanyUnitName);
                $('#txtrcpprocessor').val(headerinfo[0].Processor);
                $('#txtrcpstyle').val(headerinfo[0].Style);
                $('#txtrcporderno').val(headerinfo[0].OrderNo);
                $('#txtrcpprogno').val(headerinfo[0].ProdPrgNo);
                $('#txtrcpjobno').val(headerinfo[0].JobOrderNo);
                $('#txtrcpcutordno').val(headerinfo[0].CuttingOrdNo);
                $('#txtCuttinordid').val(headerinfo[0].CuttingOrdId);
                $('#ddlshift').val(headerinfo[0].ShiftId).trigger('change');
                $('#txtrcprctno').val(headerinfo[0].CuttingReceiptNo);
                $('#txtrcptdate').val(moment(headerinfo[0].CuttingReceiptDate).format('DD/MM/YYYY'));
                $('#txtrcprefno').val(headerinfo[0].RefNo);
                $('#txtrefdate').val(moment(headerinfo[0].RefDate).format('DD/MM/YYYY'));
                $('#txtRemark').val(headerinfo[0].Remarks);
                // $('#ddlMSMMainStore').val(headerinfo[0].ToStoreId).trigger('change');

                CheckAlloted();

                if (headerinfo[0]["Storetype"] == 'SS') {
                    $('#optSS').prop('checked', true);
                    LoadSubStore();
                    editsubmasunitstore = headerinfo[0]["ParentUnitid"];
                    editsubstore = headerinfo[0]["StoreUnitID"];
                    editmasunitstore = 0;
                }
                else {
                    $('#optMS').prop('checked', true);
                    LoadMainStore();
                    editmasunitstore = headerinfo[0]["StoreUnitID"];
                    editsubmasunitstore = 0;
                    editsubstore = 0;
                }
                LoadEmployeeStoreunit();
                LoadUserCompanyDDL();


                var CuttingDetailList = [];
                CuttingDetailList = headerinfo[0].cuttingreceiptdet;
                cuttingDetlist = headerinfo[0].cuttingreceiptdet;
                LoadCuttingDetails(CuttingDetailList);

                bundlelist = headerinfo[0].cuttingbundle;

                var returnedData = $.grep(bundlelist, function (element, index) {
                    return element.CuttingOrddetid == CuttingDetailList[0].CuttingOrdDetId;
                });

                loadbundleTable(returnedData);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    });
    $('#tblMainGrid').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblMainGrid').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblMainGrid').dataTable().fnGetData(row);
        var CuttingReceiptNo = data.CuttingReceiptNo;
        LoadItemMovements(CuttingReceiptNo);
    });
    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        var table = $('#tblMainGrid').DataTable();
        //var CuttOrdId = table.row($(this).parents('tr')).data()["CuttingOrdId"];

        //rowindex = $(this).closest('tr').index();
      
        
        //var currow = maintbllist.slice(rowindex);
        var CuttRcptId = table.row($(this).parents('tr')).data()["CuttingReceiptId"];
        var CuttOrderId = table.row($(this).parents('tr')).data()["CuttingOrdId"];
        var CuttRcptNo = table.row($(this).parents('tr')).data()["CuttingReceiptNo"];
        var JobNo = table.row($(this).parents('tr')).data()["JobNo"];
        var Orderno = table.row($(this).parents('tr')).data()["OrderNo"];
        var StyleId = table.row($(this).parents('tr')).data()["StyleId"];
        //var Recpno = $('#txtrcprctno').val();
        var table = $('#tblMainGrid').DataTable();
        CuttReceiptId = table.row($(this).parents('tr')).data()["CuttingReceiptId"];
        var CuttOrderId = table.row($(this).parents('tr')).data()["CuttingOrdId"];
        $.ajax({
            url: "/CuttingOrderReceipt/ReceiptHeaderInfo/",
            data: JSON.stringify({ ID: CuttReceiptId, CuttingOrderID: CuttOrderId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var headerinfo = [];
                headerinfo = result.Value;
                $('#txtrcpcutordno').val(headerinfo[0].CuttingOrdNo);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
        $.ajax({
            url: "/PurchaseQuality/LoadQltyCheckItemEditDetails",
            data: JSON.stringify({ RecNo: CuttRcptNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                AllotedItemList = result;
                if (AllotedItemList.length > 0) {

                    for (var x = 0; x < AllotedItemList.length; x++) {

                        //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                        var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....";
                        var flg = 4;
                        var mod = 1;
                        AlartMessage(msg, flg, mod);
                        $("#btnUpdate").attr('disabled', true);
                        $("#btnDel").attr('disabled', true);
                        $('#btnAdd').hide();
                        return true;
                    }

                }
                else {
                    
                    Delete(CuttRcptId, StyleId, CuttRcptNo, Orderno);

                }


            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

       // Delete(CuttRcptId, StyleId, CuttRcptNo, Orderno);
    });

    $(document).on('click', '.btnrcpdetadd', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = cuttingDetlist.slice(rowindex);

        CuttingOrdDetid = currentrow[0].CuttingOrdDetId;

        var returnedData = $.grep(bundlelist, function (element, index) {
            return element.CuttingOrddetid == CuttingOrdDetid;
        });

        loadbundleTable(returnedData);

    });

    $(document).on('click', '.btnordadd', function () {
        debugger;
        //rowindex = $(this).closest('tr').index();

        ////cuttinglist.sort(function (a, b) {
        ////    return a.BuyOrdMasId - b.BuyOrdMasId;
        ////});

        //var currentcolorrow = cuttinglist.slice(rowindex);


        var table = $('#tblinnercuttingreceipt').DataTable();


        //Prodprgid = table.row($(this).parents('tr')).data()["ProdPrgId"];
        CutOrdNo = table.row($(this).parents('tr')).data()["CuttingOrdNo"];
        inProcess = table.row($(this).parents('tr')).data()["Process"];
        $('#txtProcess').val(inProcess);

        OType = $('input[name="wrkord"]:checked').attr('value');
        //var WorkOrderNo = table.row($(this).parents('tr')).data()["WorkOrder"];

        $.each(cuttinglist, function (i) {
            if (cuttinglist[i].CuttingOrdNo == CutOrdNo) {
             
                JobOrdNo = cuttinglist[i].JobNo;
                PrdprgNo = cuttinglist[i].ProdPrgNo;
                //CutOrdNo = cuttinglist[i].CuttingOrdNo;
                Processor = cuttinglist[i].Processor;
                OrderNo = cuttinglist[i].OrderNo;
                Style = cuttinglist[i].Style;
                StyleId = cuttinglist[i].StyleId;
                CuttingOrdid = cuttinglist[i].CuttingOrdId;
            }

        });

        //rowindex = $(this).closest('tr').index();
        //var currentcolorrow = cuttinglist.slice(rowindex);


        //JobOrdNo = currentcolorrow[0]['JobNo'];
        //PrdprgNo = currentcolorrow[0]['ProdPrgNo'];
        //CutOrdNo = currentcolorrow[0]['CuttingOrdNo'];
        //Processor = currentcolorrow[0]['Processor'];
        //OrderNo = currentcolorrow[0]['OrderNo'];
        //Style = currentcolorrow[0]['Style'];
        //StyleId = currentcolorrow[0]['StyleId'];
        //CuttingOrdid = currentcolorrow[0]['CuttingOrdId'];
        //var ProdPrgNo = currow[0]['ProdPrgNo'];;
        //var WorkOrderNo = currow[0]['WorkOrder'];

        //JobOrdNo = currentcolorrow[0].JobNo;
        //PrdprgNo = currentcolorrow[0].ProdPrgNo;
        //CutOrdNo = currentcolorrow[0].CuttingOrdNo;
        //Processor = currentcolorrow[0].Processor;
        //OrderNo = currentcolorrow[0].OrderNo;
        //Style = currentcolorrow[0].Style;
        //StyleId = currentcolorrow[0].StyleId;
        //CuttingOrdid = currentcolorrow[0].CuttingOrdId;


        Company = $("#ddlinnercompany option:selected").text();
        CompanyUnit = $("#ddlinnercompunit option:selected").text();
        companyid = $("#ddlinnercompany option:selected").val();;
        editmasunitstore = 0;
        editsubmasunitstore = 0;
        editsubstore = 0;
        LoadEmployeeStoreunit();
        LoadUserCompanyDDL();


        $('#myModal1').modal('show');

        $('#txtrcpcompany').val(Company);
        $('#txtrcpprodunit').val(CompanyUnit);
        $('#txtrcpprocessor').val(Processor);
        $('#txtrcpstyle').val(Style);
        $('#txtrcporderno').val(OrderNo);
        $('#txtrcpprogno').val(PrdprgNo);
        $('#txtrcpjobno').val(JobOrdNo);
        $('#txtrcpcutordno').val(CutOrdNo);
        $('#txtCuttinordid').val(CuttingOrdid);

        $('#btnbundleupdate').hide();

        LoadEmployeeDDL("#ddlemployee");

        LoadCuttingOrderDetails(CuttingOrdid);

        GenerateCuttingReceiptNumber(table, column, compId, Docum);
        var d = new Date().getDate();
        var m = new Date().getMonth() + 1; // JavaScript months are 0-11
        var y = new Date().getFullYear();
        //$('#txtrcptdate').val(d + "/" + m + "/" + y);
        //$('#txtrefdate').val(d + "/" + m + "/" + y);
        $('#txtrcptdate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#txtrefdate').val(moment(new Date()).format('DD/MM/YYYY'));

        LoadShiftDDL("#ddlshift");
        bundlelist = [];
        loadbundleTable(bundlelist);

    });

    $("#btnaddnew").click(function () {
        debugger;

        companyid = $("#ddlcutCompany").val();
        companyunitid = $("#ddlcutunit").val();
        CompanyId = companyid;
        if (companyid == 0 || companyunitid == 0) {
            //alert("Please select Company and CompanyUnit");
            var msg = 'Please select Company and CompanyUnit...';
            var flg = 4;
            var mod = 1;
            AlartMessage(msg, flg, mod);
        }
        else {
            $("#ddlinnercompunit").val(companyunitid);
            $("#ddlinnercompany").val(companyid);

            $('#myModal').modal('show');
            LoadCuttingOrderReceipt();
        }
    });


    $('#tblreceiptdetail').on('click', 'tr', function (e) {

        debugger;
        var table = $('#tblreceiptdetail').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblreceiptdetail').dataTable().fnGetData(row);

        var table = $('#tblreceiptdetail').DataTable();

        var CutOrdDetId = data.CuttingOrdDetId;

        var cutempty = [];
        cutempty = bundlelist;

        cutempty = $.grep(cutempty, function (v) {
            return (v.CuttingOrddetid == CutOrdDetId);
        });
        loadbundleTable(cutempty);
    });

});
function LoadItemMovements(GrnNo) {
    debugger;

    $.ajax({
        url: "/GRNMain/LoadItemstockMovement/",
        data: JSON.stringify({ GrnNo: GrnNo }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ItemMovementList = (result.Value);

            loadItemMovementTable(ItemMovementList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadItemMovementTable(ItemMovementList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblItemMovementdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblItemMovementdetails').DataTable().destroy();
    }
    $('#tblItemMovementdetails').empty();

    $('#tblItemMovementdetails').DataTable({

        data: ItemMovementList,
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
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "Trans No", data: "transno" },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Order No", data: "OrderNo", visible: false },
            { title: "Quantity", data: "Quantity" },
            { title: "Stock Qty", data: "StockQty" },
            { title: "UOM", data: "Uom" },
            { title: "Issue No", data: "IssueNo" },
            { title: "Date", data: "IssueDate" },
            { title: "IssueQty", data: "IssueQty" },
            { title: "Store Name", data: "StoreName" },

        ]
    });


    $("#tblItemMovementdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblItemMovementdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function Delete(ID, StyleId, CuttRcptNo, Orderno) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/CuttingOrderReceipt/Delete/",
            data: JSON.stringify({ ID: ID, Styleid: StyleId, CuttRcptno: CuttRcptNo, OrderNo: Orderno }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                AddUserEntryLog('Production', 'Cutting Receipt', 'DELETE', $("#txtrcpcutordno").val());
                //alert("Record deleted successfully...");
                var msg = 'Record deleted successfully...';
                var flg = 2;
                var mod = 0;
                AlartMessage(msg, flg, mod);
                $('#tblMainGrid').DataTable().destroy();

                ResetControls();

                LoadData(companyid, OrderType, InterExter, fromdate, todate);
                //window.location.reload();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function CMainList() {
    $('#tblMainGrid').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkIncharge = true;
    ChkJNo = true;
    ChkRcNo = true;
    ChkComp = true;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlcutCompany').val();
    LoadData(companyid, OrderType, InterExter, FDate, TDate);

}
function JMainList() {
    $('#tblMainGrid').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkIncharge = false;
    ChkJNo = false;
    ChkRcNo = true;
    ChkComp = false;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlcutCompany').val();
    LoadData(companyid, OrderType, InterExter, FDate, TDate);

}
function OMainList() {
    $('#tblMainGrid').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkIncharge = false;
    ChkJNo = true;
    ChkRcNo = true;
    ChkComp = false;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlcutCompany').val();
    LoadData(companyid, OrderType, InterExter, FDate, TDate);

}
function RCMainList() {
    $('#tblMainGrid').DataTable().destroy();

    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkIncharge = false;
    ChkJNo = false;
    ChkRcNo = false;
    ChkComp = false;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlcutCompany').val();
    LoadData(companyid, OrderType, InterExter, FDate, TDate);

}
function IMainList() {
    $('#tblMainGrid').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkIncharge = false;
    ChkJNo = true;
    ChkRcNo = true;
    ChkComp = false;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlcutCompany').val();
    LoadData(companyid, OrderType, InterExter, FDate, TDate);

}
function ListFilter() {
    debugger;
    $('#tblMainGrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlcutCompany').val();

    LoadData(companyid, OrderType, InterExter, FDate, TDate);
}

function LoadData(companyid, ordertype, interexter, fromdate, todate) {
    debugger; 

    if ($('#optoutwrkord').is(':checked')) { OrderType = 'W'; }
    else if ($('#optsampleord').is(':checked')) { OrderType = 'S'; }
    else if ($('#optjobord').is(':checked')) { OrderType = 'J'; }

    if ($('#optoutint').is(':checked')) { InterExter = 'I'; }
    else if ($('#optoutext').is(':checked')) { InterExter = 'E'; }

    var recptid = $('#ddlCutRcpNo').val();
    if (recptid == 0 || recptid == undefined) {
        recptid = 0;
    }

    var jobno = $('#ddlprounit').val();
    if (jobno == 0 || jobno == undefined) {
        jobno = '';
    }
    else {
        jobno = $('#ddlprounit option:selected').text();;
    }
    var companyid = $('#ddlcutCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlcutCompany').val();
    }

    var ordno = $('#ddlcutOrderNo').val();
    if (ordno == 0 || ordno == undefined) {
        ordno = '';
    }
    else {
        ordno = $('#ddlcutOrderNo option:selected').text();;
    }

    var refno = $('#ddlcutRefNo').val();
   
    if (refno == 0 || refno == undefined) {
        refno = '';
    }
    else {
        refno = $('#ddlcutRefNo option:selected').text();;
    }
    var empid = $('#ddlproincharge').val();
    if (empid == 0 || empid == undefined) {
        empid = 0;
    }
    var unitid = $('#ddlcutunit').val();
    if (unitid == 0 || unitid == undefined) {
        unitid = 0;
    }

    var Process = $('#ddlProcess').val();
    if (Process == 0 || Process == undefined) {
        Process = 0;
    }


    if (ChkComp || DtChk) {
        recptid = 0;
        jobno = '';
        ordno = '';
        refno = '';
        empid = 0;
        unitid = 0;
        Process = 0;
    }


    var menufilter = recptid + ',' + OrderType + ',' + InterExter + ',' + fromdate + ',' + todate + ',' + companyid + ',' + jobno + ',' + ordno + ',' + refno + ',' + empid + ',' + unitid + ',' + Process;
    localStorage.setItem('PanelReceiptMainFilter', menufilter);
    //$('#tblcuttingmaingrid').DataTable().destroy();
    //Id, OrderType, InterExternal, Fromdate, Todate, companyid, jobordno, orderno, refno, employeeid, unitid

    $.ajax({
        type: "POST",
        url: '/BitCuttingOrderReceipt/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        data: JSON.stringify({
            Id: recptid, OrderType: OrderType, InterExternal: InterExter, Fromdate: fromdate, Todate: todate, companyid: companyid, jobordno: jobno,
            orderno:ordno, refno:refno, employeeid:empid, unitid:unitid,Processid:Process}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;
            //var dataSet = eval("[" + tableload + "]");

            if (!DtChk) {
                $('#tblMainGrid').DataTable({
                    data: maintbllist,
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
                        { title: "ID", data: "CuttingReceiptId", "visible": false },
                        { title: "CuttingOrderID", data: "CuttingOrdId", "visible": false },
                        { title: "StyleId", data: "StyleId", "visible": false },
                        { title: "Style", data: "Style", "visible": false },
                { title: "Order No", data: "OrderNo" },
                { title: "Ref No", data: "RefNo" },
                 { title: "Process", data: "Process" },
                { title: "Cut Rcpt No", data: "CuttingReceiptNo" },
                {
                    title: "Cut Rcpt Date", data: "CuttingReceiptDate",
                    render: function (data) {
                        return (moment(data).format("DD/MM/YYYY"));
                    }
                },
                { title: "Work Division", data: "WorkDivision" },
                { title: "Incharge", data: "Employee" },
                {
                    title: "ACTION", "mDataProp": null,
                    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + PanelProcessReceiptEditFlg + '  class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + PanelProcessReceiptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button" ' + PanelProcessReceiptPrintFlg + ' class="CuttRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                }
                    ]
                });
            }


            var buyerdet = {};
            var buyer = [];
            var empdet = {};
            var emp = [];
            var orddet = {};
            var ord = [];
            var wrkdet = {};
            var wrk = [];
            var Refdet = {};
            var Ref = [];
            var empdet = {};
            var emp = [];
            var supdet = {};
            var sup = [];

           
            $.each(maintbllist, function (i, el) {

                if (!buyerdet[el.CuttingReceiptId]) {
                    buyerdet[el.CuttingReceiptId] = true;
                    buyer.push(el);
                }

                if (!empdet[el.Employeeid]) {
                    empdet[el.Employeeid] = true;
                    emp.push(el);
                }

                if (!orddet[el.OrderNo]) {
                    orddet[el.OrderNo] = true;
                    ord.push(el);
                }

                if (!wrkdet[el.JobNo]) {
                    wrkdet[el.JobNo] = true;
                    wrk.push(el);
                }

                if (!Refdet[el.RefNo]) {
                    Refdet[el.RefNo] = true;
                    Ref.push(el);
                }
            });
                    if (ChkJNo || ChkComp || DtChk) {
                        $('#ddlprounit').empty();
                        $(ddlprounit).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
                        $.each(wrk, function () {
                            $(ddlprounit).append($('<option></option>').val(this.JobNo).text(this.JobNo));
                        });
                    }

                    if (ChkOrdno || ChkComp || DtChk) {
                        $('#ddlcutOrderNo').empty();
                        $(ddlcutOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                        $.each(ord, function () {
                            $(ddlcutOrderNo).append($('<option></option>').val(this.OrderNo).text(this.OrderNo));
                        });
                    }
                    if (ChkRefno || ChkComp || DtChk) {
                        $('#ddlcutRefNo').empty();
                        $(ddlcutRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                        $.each(Ref, function () {
                            $(ddlcutRefNo).append($('<option></option>').val(this.RefNo).text(this.RefNo));
                        });
                    }
                    if (ChkRcNo || ChkComp || DtChk) {
                        $('#ddlCutRcpNo').empty();
                        $(ddlCutRcpNo).append($('<option/>').val('0').text('--Select CuttingReceiptNo--'));
                        $.each(buyer, function () {
                            $(ddlCutRcpNo).append($('<option></option>').val(this.Inchargeid).text(this.Incharge));
                        });
                    }
                    if (ChkIncharge || ChkComp || DtChk) {
                        $('#ddlproincharge').empty();
                        $(ddlproincharge).append($('<option/>').val('0').text('--Select Incharge--'));
                        $.each(emp, function () {
                            $(ddlproincharge).append($('<option></option>').val(this.Employeeid).text(this.Employee));
                        });
                    }

               
          

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadDataFromBack(companyid, ordertype, interexter, fromdate, todate) {
    debugger;

    var fill = localStorage.getItem('PanelReceiptMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[3]);
    $('#txtToDate').val(fillobj[4]);

    if (fillobj[2] == 'E') {
        $('#optoutext').prop('checked', true);
    } else {
        $('#optoutint').prop('checked', true);
    }

    if (fillobj[1] == 'W') {
        $('#optoutwrkord').prop('checked', true);
    } else if (fillobj[1] == 'J') {
        $('#optjobord').prop('checked', true);
    }
    else if (fillobj[1] == 'S') {
        $('#optsampleord').prop('checked', true);
    }



    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = '';
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = '';
    }
    if (fillobj[0] == "undefined") {
        fillobj[0] = 0;
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = 0;
    }
    if (fillobj[10] == "undefined") {
        fillobj[10] = 0;
    }

    if (fillobj[11] == "undefined") {
        fillobj[11] = 0;
    }

    $.ajax({
        type: "POST",
        url: '/BitCuttingOrderReceipt/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, CompanyUnitId: companyunitid }),
        //data: JSON.stringify({
        //    Id: recptid, OrderType: OrderType, InterExternal: InterExter, Fromdate: fromdate, Todate: todate, companyid: companyid, jobordno: jobno,
        //    orderno: ordno, refno: refno, employeeid: empid, unitid: unitid, Processid: Process
        //}),
        data: JSON.stringify({
            Id: fillobj[0], OrderType: fillobj[1], InterExternal: fillobj[2], Fromdate: fillobj[3], Todate: fillobj[4], companyid: fillobj[5], jobordno: fillobj[6],
            orderno: fillobj[7], refno: fillobj[8], employeeid: fillobj[9], unitid: fillobj[10], Processid: fillobj[11]
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            //$('#tblcuttingord1').DataTable().destroy();

            maintbllist = json;
            //var dataSet = eval("[" + tableload + "]");

         
                $('#tblMainGrid').DataTable({
                    data: maintbllist,
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
                        { title: "ID", data: "CuttingReceiptId", "visible": false },
                        { title: "CuttingOrderID", data: "CuttingOrdId", "visible": false },
                        { title: "StyleId", data: "StyleId", "visible": false },
                        { title: "Style", data: "Style", "visible": false },
                { title: "Order No", data: "OrderNo" },
                { title: "Ref No", data: "RefNo" },
                 { title: "Process", data: "Process" },
                { title: "Cut Rcpt No", data: "CuttingReceiptNo" },
                {
                    title: "Cut Rcpt Date", data: "CuttingReceiptDate",
                    render: function (data) {
                        return (moment(data).format("DD/MM/YYYY"));
                    }
                },
                { title: "Work Division", data: "WorkDivision" },
                { title: "Incharge", data: "Employee" },
                {
                    title: "ACTION", "mDataProp": null,
                    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + PanelProcessReceiptEditFlg + '  class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + PanelProcessReceiptDeleteFlg + ' class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button" ' + PanelProcessReceiptPrintFlg + ' class="CuttRecptPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                }
                    ]
                });
         


            var buyerdet = {};
            var buyer = [];
            var empdet = {};
            var emp = [];
            var orddet = {};
            var ord = [];
            var wrkdet = {};
            var wrk = [];
            var Refdet = {};
            var Ref = [];
            var empdet = {};
            var emp = [];
            var supdet = {};
            var sup = [];


            $.each(maintbllist, function (i, el) {

                if (!buyerdet[el.CuttingReceiptId]) {
                    buyerdet[el.CuttingReceiptId] = true;
                    buyer.push(el);
                }

                if (!empdet[el.Employeeid]) {
                    empdet[el.Employeeid] = true;
                    emp.push(el);
                }

                if (!orddet[el.OrderNo]) {
                    orddet[el.OrderNo] = true;
                    ord.push(el);
                }

                if (!wrkdet[el.JobNo]) {
                    wrkdet[el.JobNo] = true;
                    wrk.push(el);
                }

                if (!Refdet[el.RefNo]) {
                    Refdet[el.RefNo] = true;
                    Ref.push(el);
                }
            });
            if (ChkJNo || ChkComp || DtChk) {
                $('#ddlprounit').empty();
                $(ddlprounit).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
                $.each(wrk, function () {
                    $(ddlprounit).append($('<option></option>').val(this.JobNo).text(this.JobNo));
                });
            }

            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlcutOrderNo').empty();
                $(ddlcutOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlcutOrderNo).append($('<option></option>').val(this.OrderNo).text(this.OrderNo));
                });
            }
            if (ChkRefno || ChkComp || DtChk) {
                $('#ddlcutRefNo').empty();
                $(ddlcutRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(Ref, function () {
                    $(ddlcutRefNo).append($('<option></option>').val(this.RefNo).text(this.RefNo));
                });
            }
            if (ChkRcNo || ChkComp || DtChk) {
                $('#ddlCutRcpNo').empty();
                $(ddlCutRcpNo).append($('<option/>').val('0').text('--Select CuttingReceiptNo--'));
                $.each(buyer, function () {
                    $(ddlCutRcpNo).append($('<option></option>').val(this.Inchargeid).text(this.Incharge));
                });
            }
            if (ChkIncharge || ChkComp || DtChk) {
                $('#ddlproincharge').empty();
                $(ddlproincharge).append($('<option/>').val('0').text('--Select Incharge--'));
                $.each(emp, function () {
                    $(ddlproincharge).append($('<option></option>').val(this.Employeeid).text(this.Employee));
                });
            }




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

$(document).on('click', '.CuttRecptPrint', function () {
    debugger;
    var compid = $('#ddlcutCompany').val();
    var table = $('#tblMainGrid').DataTable();
    var CuttingReceiptId = table.row($(this).parents('tr')).data()["CuttingReceiptId"];
    window.open("../ReportInline/Production/CuttingReceiptReportInline/CuttingReceiptReportInline.aspx?CuttingReceiptId=" + CuttingReceiptId + "&Companyid=" + compid + "&type=" + 'P');
});

function loadbundleTable(bundList) {
    $('#tblbundledetails').DataTable().destroy();
    debugger;

    $('#tblbundledetails').DataTable({
        data: bundList,
        columns: [
        { title: "CuttingOrdDetId", data: "CuttingOrddetid", "visible": false },
            { title: "BundleNo", data: "BundleNo" },
            { title: "Qty", data: "Bundleqty" },
            { title: "EmployeeID", data: "EmployeeId", "visible": false },
            { title: "Employee", data: "Employee" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbundleedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnbundleremove btn btn-danger btn-round"> <i class="fa fa-times"></i> </button>'

               }
        ]
    });
}

function LoadSecStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").show();
    $("#MainStoreId").hide();
}
function LoadMainStore() {
    $("#SubStoreId").hide();
    $("#SecStoId").hide();
    $("#MainStoreId").show();
}
function LoadSubStore() {
    $("#SecStoId").hide();
    $("#MainStoreId").hide();
    $("#SubStoreId").show();
    $("#SubStorPrdId").hide();
    //LoadCompanyDDL("#ddlSCompany,#ddlMSCompany");
    //LoadStoreUnitDDL("#ddlSMainStore");
}
function RadioSMClick() {
    $("#SubStoreMainId").show();
    $("#SubStorPrdId").hide();
}
function RadioSSPClick() {
    $("#SubStoreMainId").hide();
    $("#SubStorPrdId").show();
    //LoadStoreUnitDDL("#ddlSStoreSub");
    //LoadCompanyUnitDDL("#ddlSStorePunit");
}

//Add Data Function 
function Add() {
    debugger;

    var res = validate();
    if (res == false) {
        return false;
    }

    var ipissuqty = 0;

    $.each(cuttingDetlist, function (e) {
        if (cuttingDetlist[e].Recqty > 0) {

            ipissuqty = ipissuqty + cuttingDetlist[e].Recqty;
        }
       
    });
    if (ipissuqty == 0) {
        //alert('Please Fill atleast one Receipt Qty..');
        var msg = 'Please Fill atleast one Receipt quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }

    if (OType == 'W') {
        if (ValiCutBudApp == 'Y') {
            var cntrt = 0;
            $.each(cuttingDetlist, function (e) {
                if (cuttingDetlist[e].Recqty > 0) {
                    if (cuttingDetlist[e].Rate > 0) {

                    } else {
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }

    if (OType == 'S') {
        if (ValiCutBudAppSam == 'Y') {
            var cntrt = 0;
            $.each(cuttingDetlist, function (e) {
                if (cuttingDetlist[e].Recqty > 0) {
                    if (cuttingDetlist[e].Rate > 0) {

                    } else {
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }

    //var sumwgt = 0;

    //$.each(cuttingDetlist, function (e) {
    //    if (cuttingDetlist[e].Recqty > 0) {

    //        sumwgt = sumwgt + cuttingDetlist[e].Weight;
    //    }

    //});
    //var balwgt = cuttingDetlist[0].BalWgt;
    //if (sumwgt.toFixed(3) > balwgt.toFixed(3)) {
    //    alert('Please Check Total Issue,Receipt,Return Weight.. / Bal Wgt- ' + balwgt.toFixed(3));

    //    return false;
    //}


    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }
    if (storeunitid == 0 && ValidateProductionStore == "True") {
        //alert('Please select Store..');
        var msg = 'Please select Store...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return true;
    }

    //if (isAllValid) {
    debugger;
    table = "Cutting_Recpt_Mas",
    column = "CuttingRecptNo",
    compId = $('#ddlinnercompany').val(),
    Docum = 'BITCUTTING RECEIPT'

    var oldRcptNo = $("#txtrcprctno").val();
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var newRcptNo = result.Value;
            if (oldRcptNo != newRcptNo) {
                //alert('Rcpt.No has been changed...');
                var msg = 'Receipt Number has been changed...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                $('#txtrcprctno').val(result.Value);
            }
            var CuttingRcptObj = {
                CuttingReceiptNo: $("#txtrcprctno").val(), //$("#ddlOrderNo option:selected").text(),
                CuttingReceiptDate: $('#txtrcptdate').val(),
                Refno: $('#txtrcprefno').val(),
                RefDate: $('#txtrefdate').val(),
                CuttingOrdId: $('#txtCuttinordid').val(),
                ShiftId: $('#ddlshift').val(),
                Remarks: $('#txtRemark').val(),
                ConvType: "K",
                StyleId: StyleId,
                OrderNo: OrderNo,
                //ToStoreid: $('#ddlMSMMainStore').val(),
                ToStoreid: storeunitid,
                BuyordShip: null,
                createdby: Guserid,
                cuttingreceiptdet: cuttingDetlist,
                cuttingbundle: bundlelist,
            };
            $("#btnAdd").attr("disabled", true);
            LoadingSymb();
            $.ajax({
                url: "/CuttingOrderReceipt/Add",
                data: JSON.stringify(CuttingRcptObj),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    AddUserEntryLog('Production', 'Cutting Receipt', 'ADD', $("#txtrcpcutordno").val());
                    //alert("Record saved successfully...");
                    var msg = 'Record saved successfully...';
                    var flg = 1;
                    var mod = 1;
                    AlartMessage(msg, flg, mod);
                    //$('#tblmain').DataTable().destroy();
                    //loadData();
                    $('#myModal1').modal('hide');
                    $('#myModal').modal('hide');
                    ResetControls();
                    $('#tblMainGrid').DataTable().destroy();
                    LoadData(companyid, OrderType, InterExter, fromdate, todate);
                    $("#btnAdd").attr("disabled", false);
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
    //}
}

function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }


    var ipissuqty = 0;

    $.each(cuttingDetlist, function (e) {
        if (cuttingDetlist[e].Recqty > 0) {

            ipissuqty = ipissuqty + cuttingDetlist[e].Recqty;
        }

    });
    if (ipissuqty == 0) {
        //alert('Please Fill atleast one Receipt Qty..');
        var msg = 'Please Fill atleast one Receipt quantity...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
        return false;
    }

    if (OType == 'W') {
        if (ValiCutBudApp == 'Y') {
            var cntrt = 0;
            $.each(cuttingDetlist, function (e) {
                if (cuttingDetlist[e].Recqty > 0) {
                    if (cuttingDetlist[e].Rate > 0) {

                    } else {
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }

    if (OType == 'S') {
        if (ValiCutBudAppSam == 'Y') {
            var cntrt = 0;
            $.each(cuttingDetlist, function (e) {
                if (cuttingDetlist[e].Recqty > 0) {
                    if (cuttingDetlist[e].Rate > 0) {

                    } else {
                        cntrt = cntrt + 1;
                    }
                }
            });
            if (cntrt > 0) {
                //alert('Please Check the Item Rate..');
                var msg = 'Please Check the Item Rate...';
                var flg = 4;
                var mod = 1;
                AlartMessage(msg, flg, mod);
                return false;
            }
        }
    }


    //var cntrt = 0;
    //$.each(cuttingDetlist, function (e) {
    //    if (cuttingDetlist[e].Recqty > 0) {
    //        if (cuttingDetlist[e].Rate > 0) {

    //        } else {
    //            cntrt = cntrt + 1;
    //        }
    //    }
    //});
    //if (cntrt > 0) {
    //    alert('Please Check the Item Rate..');
    //    return false;
    //}
    //var sumwgt = 0;
    //$.each(cuttingDetlist, function (e) {
    //    if (cuttingDetlist[e].Recqty > 0) {

    //        sumwgt = sumwgt + cuttingDetlist[e].Weight;
    //    }

    //});
    //var balwgt = cuttingDetlist[0].BalWgt;
    //if (sumwgt.toFixed(3) > balwgt.toFixed(3)) {
    //    alert('Please Check Total Issue,Receipt,Return Weight.. / Bal Wgt -' + balwgt.toFixed(3));
    //    return false;
    //}

    var MSType = $('input[name="MSType"]:checked').attr('value');

    var storeunitid = 0;
    if (MSType == "S") {
        storeunitid = $('#ddlSMainStore').val();
    } else if (MSType == "M") {
        storeunitid = $('#ddlMSMMainStore').val();
    }

    //if (isAllValid) {
    var CuttingRcptObj = {
        CuttingReceiptNo: $("#txtrcprctno").val(), //$("#ddlOrderNo option:selected").text(),
        CuttingReceiptDate: $('#txtrcptdate').val(),
        Refno: $('#txtrcprefno').val(),
        RefDate: $('#txtrefdate').val(),
        ShiftId: $('#ddlshift').val(),
        Remarks: $('#txtRemark').val(),
        CuttingReceiptId: CuttReceiptId,
        //ConvType: "K",
        //StyleId: StyleId,
        //OrderNo: OrderNo,
        //ToStoreid: $('#ddlMSMMainStore').val(),
        //BuyordShip: null,
        createdby: Guserid,
        cuttingreceiptdet: cuttingDetlist,
        cuttingbundle: bundlelist,
    };
    $("#btnUpdate").attr("disabled", true);

    LoadingSymb();
    $.ajax({
        url: "/CuttingOrderReceipt/Update",
        data: JSON.stringify(CuttingRcptObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            AddUserEntryLog('Production', 'Cutting Receipt', 'UPDATE', $("#txtrcpcutordno").val());
            //alert("Record updated successfully...");
            var msg = 'Record updated successfully...';
            var flg = 1;
            var mod = 0;
            AlartMessage(msg, flg, mod);
            //$('#tblmain').DataTable().destroy();
            //loadData();
            $('#myModal1').modal('hide');
            $('#myModal').modal('hide');
            ResetControls();
            Mode = 0;
            $('#tblMainGrid').DataTable().destroy();
            //window.location.reload();
            LoadData(companyid, OrderType, InterExter, fromdate, todate);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ResetControls() {
    $('#optoutwrkord').prop('checked', true);
    $('#optoutint').prop('checked', true);
    //$('#ddlcutCompany').val(0);
    //$('#ddlcutunit').val(0);
    $('#ddlcutOrderNo').val(0);
    $('#ddlproBuyer').val(0);
    $('#ddlproincharge').val('');
    $('#ddlCutNo').val(0);
    $('#ddlwrkdivmain').val(0);

    if ($('#optoutwrkord').is(':checked')) { OrderType = 'W'; }
    else if ($('#optsampleord').is(':checked')) { OrderType = 'S'; }
    else if ($('#optjobord').is(':checked')) { OrderType = 'J'; }

    if ($('#optoutint').is(':checked')) { InterExter = 'I'; }
    else if ($('#optoutext').is(':checked')) { InterExter = 'E'; }

    day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = day.getDate() + '/' + month + '/' + year;

    $("#txtFromDate").val(date);
    $("#txtToDate").val(Fdatestring);

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();
}


function LoadAddItem() {
    LoadCuttingOrderReceipt();
}

function LoadCuttingOrderReceipt() {
    debugger;

    var inputcount = 0;
    $('#tblinnercuttingreceipt tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblinnercuttingreceipt').DataTable().destroy();
    }

    var OType = $('input[name="wrkord"]:checked').attr('value');

    var styid = $('select#ddlinnerstyle option:selected').val();
    if (styid == null || styid == "0") {
        styid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlinnerOrderNo option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlinnerOrderNo option:selected').text();
    }


    var RfNo = "";
    var Rn = $('select#ddlinnerrefno option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlinnerrefno option:selected').text();
    }

    var compid = $('#ddlinnercompany option:selected').val();
    if (compid == undefined || compid == "0") {
        compid = 0;
    }

    var buyerid = $('#ddlinnerBuyer option:selected').val();
    if (buyerid == undefined || buyerid == "0") {
        buyerid = 0;
    }
    var Process = $('#ddlinnerProcess option:selected').val();
    if (Process == undefined || Process == "0") {
        Process = 0;
    }

    var unitid = $('#ddlinnercompunit option:selected').val();
    if (unitid == undefined || unitid == "0") {
        unitid = 0;
    }

    var JobordNo = "";
    var JobordNo = $('#ddlissuestore option:selected').val();

    if (JobordNo == "0" || JobordNo == undefined) {
        JobordNo = "";
    }
    else {

        JobordNo = $('select#ddlissuestore option:selected').text();
    }

    var inorex = $('input[name="MOType"]:checked').attr('value');

    $.ajax({
        type: "POST",
        url: '/BitCuttingOrderReceipt/ListCuttingOrder',
        //data: JSON.stringify({}),
        data: JSON.stringify({ CompanyId: compid, CompanyUnitId: unitid, OrdType: OType, refno: RfNo, styleid: styid, OrderNo: ordNo, buyerid: buyerid, jobordno: JobordNo, inorext: inorex,Processid:Process }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            cuttinglist = json.Value;
            //$('#tblinnercuttingreceipt').Datatable().destroy();

            $('#tblinnercuttingreceipt').DataTable({
                data: cuttinglist,
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
                         { title: "ID", data: "BuyOrdMasId", "visible": false },
                         { title: "OrderNo", data: "OrderNo", "visible": false },
                         { title: "Cutting Ord Id", data: "CuttingOrdId", "visible": false },
                         { title: "Job Order", data: "JobNo" },
                         { title: "Prog No", data: "ProdPrgNo" },
                         { title: "Process", data: "Process" },
                         { title: "Cut Ord No", data: "CuttingOrdNo" },
                         { title: "Processor", data: "Processor" },
                         { title: "Cutt Ord Qty", data: "Orderqty" },
                         { title: "Balance", data: "Balance" },
                         { title: "Style", data: "Style" },
                         {
                             title: "ACTION", "mDataProp": null,
                             "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success" > <i class="fa fa-plus"></i> </button>'
                         }
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function GenerateCuttingReceiptNumber(table, column, compId, Docum) {
    table = "Cutting_Recpt_Mas",
    column = "CuttingRecptNo",
    compId = $('#ddlinnercompany').val(),
    Docum = 'BITCUTTING RECEIPT'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtrcprctno').val(result.Value);
        }
    });
}

function LoadCuttingOrderDetails(CutttingOrdId) {
    debugger;

    $.ajax({
        type: "GET",
        url: "/CuttingOrderReceipt/ListCuttingOrderdetails/" + CutttingOrdId,
        //data: JSON.stringify({ ID: CutttingOrdId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            cuttingDetlist = json.Value;

            //$.ajax({
            //    url: "/CuttingOrderReceipt/ListCuttingGrammage/",
            //    data: JSON.stringify({ OrderNo: OrderNo, StyleId: StyleId, JobNo: JobOrdNo }),
            //    type: "POST",
            //    contentType: "application/json;charset=UTF-8",
            //    dataType: "json",
            //    success: function (result) {
            //        debugger;
            //        cuttingGrammagelist = result.Value;

            //        if (cuttingGrammagelist != undefined && cuttingGrammagelist != null) {
            //            if (cuttingDetlist != undefined) {
            //                for (var i in cuttingGrammagelist) {
            //                    for (var j in cuttingDetlist) {
            //                        if (((cuttingDetlist[j]['ItemId'] == cuttingGrammagelist[i]['ItemId']) && (cuttingDetlist[j]['ColorId'] == cuttingGrammagelist[i]['ColorId']) && (cuttingDetlist[j]['SizeId'] == cuttingGrammagelist[i]['SizeId']))) {
            //                            cuttingDetlist[j]['Grammage'] = cuttingGrammagelist[i]['Weight'];
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //        LoadCuttingDetails(cuttingDetlist);
            //    }
            //});
            //$('#tblinnercuttingreceipt').Datatable().destroy();
            LoadCuttingDetails(cuttingDetlist);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function validate() {
    debugger;
    var isValid = true;
    //if ($('#ddlshift').val().trim() == "") {
    //if ($('#ddlshift').val() == 0) {
    //    //$('#ddlshift').css('border-color', 'Red');
    //    $('#ddlshift').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    //$('#ddlshift').css('border-color', 'lightgrey');
    //    $('#ddlshift').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    //if ($('#ddlMSMMainStore').val() == 0) {
    //    // $('#ddlMSMMainStore').css('border-color', 'Red');
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid red');
    //    isValid = false;
    //}
    //else {
    //    //$('#ddlMSMMainStore').css('border-color', 'lightgrey');
    //    $('#ddlMSMMainStore').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}

    if ($('#txtrcprefno').val().trim() == "") {
        $('#txtrcprefno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtrcprefno').css('border-color', 'lightgrey');
    }


    return isValid;
}

function LoadCuttingDetails(CuttingList) {
    debugger;
    var rowCount = $('#tblreceiptdetail tr').length;
    if (rowCount > 0) {
        $('#tblreceiptdetail').DataTable().destroy();
    }

    $('#tblreceiptdetail').DataTable({
        data: CuttingList,
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
                 { title: "CuttingOrdDetId", data: "CuttingOrdDetId", "visible": false },
                 { title: "ItemId", data: "ItemId", "visible": false },
                 { title: "ColorId", data: "ColorId", "visible": false },
                 { title: "SizeId", data: "SizeId", "visible": false },
                 { title: "Item", data: "Item" },
                 { title: "Color", data: "Color" },
                 { title: "Size", data: "Size" },
                 { title: "Order Qty", data: "Ordqty" },
                 { title: "Bal Qty", data: "Balqty" },
                 { title: "AppRate", data: "Apprate", "visible": false },
                 {
                     title: "Rate", data: "Rate",
                     render: function (data) {
                         return '<input type="text" id="txtrate"  class="form-control txtrate" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 //{ title: "Gms/Pcs", data: "Grammage" },
                 {
                     title: "Gms/Pcs", data: "Grammage","visible": false ,
                     render: function (data) {
                         return '<input type="text" id="txtgramage"  class="form-control txtgramage" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 {
                     title: "Rec.Qty", data: "Recqty",
                     render: function (data) {
                         return '<input type="text" id="txtrcdqty" class="form-control txtrcdqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 {
                     title: "Weight", data: "Weight","visible": false ,
                     render: function (data) {
                         return '<input type="text" id="txtweight" class="form-control txtweight" disabled style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 //{ title: "No.Bundle", data: "Nobundle" },
                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnrcpdetadd btn btn-round btn-success" > <i class="fa fa-plus"></i> </button>'
                 //}
        ]
    });
}

function Close() {
    window.location.href = "/BitCuttingOrderReceipt/BitCuttingOrderReceiptIndex";
}


function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }

    companyid = $('#ddlcutCompany option:selected').val();

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'M', Companyid: companyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlMSMMainStore).empty();
            $(ddlMSMMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlMSMMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlMSMMainStore).trigger("select2:updated");

            $(ddlSCompany).empty();
            $(ddlSCompany).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSCompany).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSCompany).trigger("select2:updated");

            if (editsubmasunitstore > 0) {
                $('#ddlSCompany').val(editsubmasunitstore).trigger('change');
            }
            if (editmasunitstore > 0) {
                $('#ddlMSMMainStore').val(editmasunitstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    $.ajax({
        url: "/StoreSetup/GetStoreRights",
        data: JSON.stringify({ Userid: LoginUserid, Storetype: 'B', Companyid: companyid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;
            $(ddlSMainStore).empty();
            $(ddlSMainStore).append($('<option/>').val('0').text('--Select Store--'));
            $.each(data, function () {
                $(ddlSMainStore).append($('<option></option>').val(this.Storeid).text(this.StoreName));
            });
            $(ddlSMainStore).trigger("select2:updated");
            if (editsubstore > 0) {
                $('#ddlSMainStore').val(editsubstore).trigger('change');
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}

function LoadUserCompanyDDL() {
    debugger;
    httpGet("/Company/GetCompany", onUserCompanySuccess, onUserCompanyFailure);
}

function onUserCompanySuccess(result) {
    if (result.Status == "SUCCESS") {

        companyid = $('#ddlcutCompany option:selected').val();
        var data = result.Value;
        var comp = [];
        $.each(data, function (i) {
            if (data[i].CompanyId == companyid) {
                comp.push(data[i]);
            }
        });

        $(ddlMSCompany).empty();
        // $(ddlMSCompany).append($('<option/>').val('0').text('--Select Company--'));
        $.each(comp, function () {
            $(ddlMSCompany).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(ddlMSCompany).trigger("select2:updated");
    }
    else {
        //alert('Company loading failed');
        var msg = 'Company loading failed...';
        var flg = 4;
        var mod = 1;
        AlartMessage(msg, flg, mod);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    AlartMessage(msg, flg, mod);
}


function CheckAlloted() {

    var Recpno = $('#txtrcprctno').val();

    $.ajax({
        url: "/PurchaseQuality/LoadQltyCheckItemEditDetails",
        data: JSON.stringify({ RecNo: Recpno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AllotedItemList = result;
            if (AllotedItemList.length > 0) {


                for (var x = 0; x < AllotedItemList.length; x++) {

                    //alert("Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it....")
                    var msg = "Stock is alloted for " + AllotedItemList[x].CTransNo + ",Please Check it...";
                    var flg = 4;
                    var mod = 1;
                    AlartMessage(msg, flg, mod);
                    $("#btnUpdate").attr('disabled', true);
                    $("#btnDel").attr('disabled', true);
                    $('#btnAdd').hide();
                    return true;
                }

            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}