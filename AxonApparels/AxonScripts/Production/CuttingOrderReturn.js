var fromdate, todate = 0;
var companyid = 0;
var companyunitid = 0;
var JobOrdNo, CuttingOrderNo = 0;
var CuttingIssueId, CuttingOrderId = 0;
var OrderNoDDL = "#";
var table, column, compId, Docum;
var headerrecord = [];
var InnerDetailrecord = [];
var RetLocType = 0;
var OrderType = 0;
var InterExter = 0;
var maintbllist = [];
var CuttReturnId = 0;
var CuttingIssNo = 0;
var Processor = 0;
var Userid = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkIncharge = true;
var ChkJNo = true;
var ChkSupplier = true;
var ChkComp = false;
var LoginUserid = '';
var editmasunitstore = 0;
var CuttingRetEditFlg = "disabled";
var CuttingRetDeleteFlg = "disabled";
var CuttingRetPrintFlg = "disabled";
var CuttingWastedet = [];
var wasteitemid = 0
var wastecolorid = 0;
var wastesizeid = 0;
var IssueDetId = 0;
var Isuerowindex = -1;
var OuterDetailrecord = [];
var LoginUserid = '';
var editmasunitstore = 0;
var editsubmasunitstore = 0;
var editsubstore = 0;
var ValidateProductionStore = "False";
var ValidateCuttingTolerance = 0;
$(document).ready(function () {

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    DCompid = $("#hdnDCompid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');
    LoadCompanyDDL("#ddlRCompany,#ddlACompany");
    LoadCompanyUnitDDL("#ddlMunit,#ddlAunitno");
    ValidateProductionStore = $("#hdnValidateProductionStore").data('value');
    ValidateCuttingTolerance = $("#hdnValidateCuttingTolerance").data('value');
    LoadBuyerDDL("#ddlRBuyer,#ddlABuyer");
    LoadOrderNoDDL("#ddlAOrderno");
    LoadStyleDDL("#ddlAstyle");
    LoadEmployeeDDL("#ddlMEmp");
   // LoadWorkdivisionDDL("#ddlMWorkdiv");
    LoadJobNoDDL("#ddlAWorkOrdNo");
    LoadRefNoDDL("#ddlARefno");
  
    LoadItemDDL("#ddlItemlist")
    LoadColorDDL("#ddlColorlist");
    LoadSizeDDL("#ddlSizelist");  
    LoadUomDDL("#ddlUOMlist");

    var MSType = $('input[name="MSType"]:checked').attr('value');


    if (MSType == "M") {
        $("#SubStoreId").hide();
        $("#SecStoId").hide();
    } else if (MSType == "E") {
        $("#SubStoreId").hide();
        $("#SecStoId").show();
        $("#MainStoreId").hide();
    }

   // LoadSupplierDDL("#ddlMProcessor");
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Frmdate = year + "/" + Cmonth + "/" + day;
    ToDt = year + "/" + Cmonth + "/" + day;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = day.getDate() + '/' + month + '/' + year;

    //$("#txtFromDate").val(date);
    //$("#txtToDate").val(Fdatestring);
    OChangedropcont();
    $("#txtFromDate").val(MainFDate);
    $("#txtToDate").val(moment(new Date()).format('DD/MM/YYYY'));

    fromdate = $("#txtFromDate").val();
    todate = $("#txtToDate").val();
    var fill = localStorage.getItem('CuttingReturnMainFilter');
    if (fill != "null" && fill != null) {
        LoadDataFromBack(companyid, OrderType, InterExter, fromdate, todate);
    } else {
        LoadData(companyid, OrderType, InterExter, fromdate, todate);
    }

    //LoadData(companyid, OrderType, InterExter, fromdate, todate);
    LoadDDL(companyid, OrderType, InterExter, fromdate, todate);

    $("#btnaddnew").click(function () {
        debugger;

        companyid = $("#ddlRCompany").val();
        companyunitid = $("#ddlMunit").val();

        if (companyid == 0 || companyunitid == 0) {
            //alert("Please select Company and CompanyUnit");
            var msg = 'Please select Company and CompanyUnit...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
        }
        else {
            $("#ddlAunitno").val(companyunitid);
            $("#ddlACompany").val(companyid);

            $('#myModal1').modal('show');
            LoadCuttingOrderReceipt();
            LoadEmployeeStoreunit();
        }
    });

    $(document).on('click', '.btnmaingrddelete', function () {
        debugger;
        var table = $('#tblcuttingreturnmaingrid').DataTable();

        //rowindex = $(this).closest('tr').index();

        //var currow = maintbllist.slice(rowindex);
        CuttReturnId = table.row($(this).parents('tr')).data()["CuttingReturnid"];
        var CuttReturnNo = table.row($(this).parents('tr')).data()["CuttingReturnNo"];
        var CuttReturnDate = table.row($(this).parents('tr')).data()["CuttingReturnDate"];
        var JobOrderNo = table.row($(this).parents('tr')).data()["JobOrderNo"];
        var CuttIssueNo = table.row($(this).parents('tr')).data()["CuttingIssueNo"];
        var CuttIssueId = table.row($(this).parents('tr')).data()["Cuttingissueid"];
        var CuttOrdNo = table.row($(this).parents('tr')).data()["CuttingOrderNo"];

        $.ajax({
            url: "/CuttingReturn/ReceiptHeaderInfo/",
            data: JSON.stringify({ ReturnID: CuttReturnId, JobOrdNo: JobOrderNo, CuttingRetNo: CuttReturnNo, IssueId: CuttIssueId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var headerinfo = [];
                headerinfo = result.Value;

                $('#txtReturnno').val(CuttReturnNo);
                
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

       // var Recpno = $('#txtReturnno').val();

        $.ajax({
            url: "/PurchaseQuality/LoadQltyCheckItemEditDetails",
            data: JSON.stringify({ RecNo: CuttReturnNo }),
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
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                        $("#btnUpdate").attr('disabled', true);
                        $("#btnDel").attr('disabled', true);
                        $('#btnAdd').hide();
                        return true;
                    }

                } else {

                    Delete(CuttReturnId);
                }


            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });


       // Delete(CuttReturnId);

    });

    $(document).on('click', '.btnmaingrdedit', function () {
        debugger;
        $('#myModal2').modal('show');
        //rowindex = $(this).closest('tr').index();
        var table = $('#tblcuttingreturnmaingrid').DataTable();
        CuttReturnId = table.row($(this).parents('tr')).data()["CuttingReturnid"];
        var CuttReturnNo = table.row($(this).parents('tr')).data()["CuttingReturnNo"];
        var CuttReturnDate = table.row($(this).parents('tr')).data()["CuttingReturnDate"]; 
        var JobOrderNo = table.row($(this).parents('tr')).data()["JobOrderNo"]; 
        var CuttIssueNo = table.row($(this).parents('tr')).data()["CuttingIssueNo"]; 
        var CuttIssueId = table.row($(this).parents('tr')).data()["Cuttingissueid"];
        var CuttOrdNo = table.row($(this).parents('tr')).data()["CuttingOrderNo"];

        //var currow = maintbllist.slice(rowindex);
        //CuttReturnId = currow[0]['CuttingReturnid'];
        //var CuttReturnNo = currow[0]['CuttingReturnNo'];
        //var CuttReturnDate = currow[0]['CuttingReturnDate'];
        //var JobOrderNo = currow[0]['JobOrderNo'];
        //var CuttIssueNo = currow[0]['CuttingIssueNo'];
        //var CuttIssueId = currow[0]['Cuttingissueid'];

        $('#btnAdd').hide();
        $('#btnUpdate').show();

      

        $.ajax({
            url: "/CuttingReturn/ReceiptHeaderInfo/",
            data: JSON.stringify({ ReturnID: CuttReturnId, JobOrdNo: JobOrderNo, CuttingRetNo: CuttReturnNo, IssueId: CuttIssueId }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var headerinfo = [];
                headerinfo = result.Value;

                $('#txtCompany').val(headerinfo[0].Company);
                $('#txtOrderNo').val(headerinfo[0].OrderNo);
                $('#txtOrderRefNo').val(headerinfo[0].RefNo);
                $('#txtReturnno').val(CuttReturnNo);
                $('#txtReturnDate').val(moment(CuttReturnDate).format('DD/MM/YYYY'));
                $('#txtIssueNo').val(CuttIssueNo);
                $('#txtinnerrem').val(headerinfo[0].Remarks);
                $('#txtWrkNo').val(JobOrderNo);
                $('#txtcutordno').val(headerinfo[0].CuttingOrderNo);
                $('#txtwrkdiv').val(headerinfo[0].Processor);

                $('#txtCancelno').val(headerinfo[0].Cutting_Cancel_no);
                $('#txtCanRefNo').val(headerinfo[0].Cancel_Ref_no);
                $('#txtCancelrefDate').val(headerinfo[0].Cancel_Ref_date);
                $('#txtCancelDate').val(headerinfo[0].Cutting_Cancel_date);

                CheckAlloted();
                //if (headerinfo[0].RetLocType == 'W') {
                //    $('#optinnerwrkdiv').prop('checked', true);
                //} else if (headerinfo[0].RetLocType == 'U') {
                //    $('#optinnerprdunit').prop('checked', true);
                //} else if (headerinfo[0].RetLocType == 'S') {
                //    $('#optinnerstore').prop('checked', true);
                //}

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


                Changedropdownlist();

                $('#ddlRetLocType').val(headerinfo[0].ToLocation);
                //var CuttingDetailList = [];
                InnerDetailrecord = headerinfo[0].CuttingReturnDetail;

                var inputcount = 0;
                $('#tblinnergrid tr').each(function () {
                    inputcount++;
                });

                if (inputcount > 0) {
                    //var tableinput = $('#tblinnergrid').DataTable();
                    //tableinput.clear().draw();
                    $('#tblinnergrid').DataTable().destroy();
                }

                LoadInnerGrid(InnerDetailrecord);
                IssueDetId = InnerDetailrecord[0].CuttingIssueDetid;

                $.ajax({
                    type: "POST",
                    url: '/CuttingReturn/ListCuttingReturnOpDetEditDetails',
                    data: JSON.stringify({ Issueid: CuttIssueId, RetId: CuttReturnId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json) {
                        debugger;

                        OuterDetailrecord = json.Value;
                        LoadOuterGrid(OuterDetailrecord);

                    },

                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });


                $.ajax({
                    type: "POST",
                    url: '/CuttingReturn/ListCuttingReturnWastageDetailsEdit',
                    data: JSON.stringify({ RetId: CuttReturnId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json) {
                        debugger;

                        CuttingWastedet = json.Value;
                        var cutempty = [];
                        cutempty = CuttingWastedet;

                        cutempty = $.grep(cutempty, function (v) {
                            return (v.CuttingIsuuedetId == IssueDetId);
                        });

                        loadWasteTable(cutempty);
                    },

                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });



            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    });

    $(document).on('click', '.btnordadd', function () {
        debugger;


        var table = $('#tblinnercuttingreturn').DataTable();


        //Prodprgid = table.row($(this).parents('tr')).data()["ProdPrgId"];
         CuttingOrderNo = table.row($(this).parents('tr')).data()["CuttingOrderNo"];
        //var WorkOrderNo = table.row($(this).parents('tr')).data()["WorkOrder"];

         $.each(cuttinglist, function (i) {
             if (cuttinglist[i].CuttingOrderNo == CuttingOrderNo) {

                 JobOrdNo = cuttinglist[i].JobOrderNo;
                 //CuttingOrderNo = cuttinglist[i].CuttingOrderNo;
                 CuttingIssueId = cuttinglist[i].Cuttingissueid;
                 CuttingOrderId = cuttinglist[i].CuttingOrdid;
                 CuttingIssNo = cuttinglist[i].CuttingIssueNo;
                 Processor = cuttinglist[i].Processor;
             }

         });

        //rowindex = $(this).closest('tr').index();
        //var currentcolorrow = cuttinglist.slice(rowindex);

        //JobOrdNo = currentcolorrow[0].JobOrderNo;
        //CuttingOrderNo = currentcolorrow[0].CuttingOrderNo;
        //CuttingIssueId = currentcolorrow[0].Cuttingissueid;
        //CuttingOrderId = currentcolorrow[0].CuttingOrdid;
        //CuttingIssNo = currentcolorrow[0].CuttingIssueNo;
        //Processor = currentcolorrow[0].Processor;

        $('#myModal2').modal('show');

        GenerateCuttingReturnNumber(table, column, compId, Docum);
        GenerateCuttingCancelNumber();
        Changedropdownlist();

        $.ajax({
            type: "POST",
            url: '/CuttingReturn/ListCuttingReturnHeaderDet',
            data: JSON.stringify({ JobOrdno: JobOrdNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                headerrecord = json.Value;
                $("#txtCompany").val(headerrecord[0].Company);
                $("#txtOrderNo").val(headerrecord[0].OrderNo);
                $("#txtOrderRefNo").val(headerrecord[0].RefNo);
                $("#txtReturnDate").val(date);
                $("#txtCancelrefDate").val(date);
                $("#txtCancelDate").val(date);
                $("#txtWrkNo").val(JobOrdNo);
                $("#txtIssueNo").val(CuttingIssNo);
                $("#txtwrkdiv").val(Processor);
                $("#txtcutordno").val(CuttingOrderNo);


                editmasunitstore = 0;
                editsubmasunitstore = 0;
                editsubstore = 0;
                LoadEmployeeStoreunit();
                LoadUserCompanyDDL();


                $.ajax({
                    type: "POST",
                    url: '/CuttingReturn/ListCuttingReturnDetDetails',
                    data: JSON.stringify({ Issueid: CuttingIssueId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json) {
                        debugger;
                        InnerDetailrecord = json.Value;
                        LoadInnerGrid(InnerDetailrecord);
                    },
                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });


                $.ajax({
                    type: "POST",
                    url: '/CuttingReturn/ListCuttingReturnOpDetDetails',
                    data: JSON.stringify({ Issueid: CuttingIssueId }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json) {
                        debugger;
                        OuterDetailrecord = json.Value;
                        LoadOuterGrid(OuterDetailrecord);
                    },

                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });




            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    });

    $(document).on('keyup', '.txtretqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = InnerDetailrecord.slice(rowindex);
        var ReturnQty = $(this).val();
        var Csno = currentrow[0]['CuttingIssueDetid'];
        var itm = currentrow[0]['Itemid'];
        var clr = currentrow[0]['Colorid'];
        var sze = currentrow[0]['Sizeid'];
        var lossqty = currentrow[0]['Lossqty'];
        var Balqty = currentrow[0]['Balanceqty'];
        currentrow[0]['Returnqty'] = ReturnQty;

        if ((parseInt(ReturnQty) + parseInt(lossqty)) > parseInt(Balqty)) {
            //alert("Return + Loss Quantity should not be greater than Balance Quantity...");
            var msg = "Return + Loss Quantity should not be greater than Balance Quantity...";
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $(this).val(0);
            currentrow[0]['Returnqty'] = 0;
        }
        else {
            InnerDetailrecord[rowindex] = currentrow[0];

            var inputcount = 0;
            $('#tblinnergrid tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tblinnergrid').DataTable().destroy();
            }

            LoadInnerGrid(InnerDetailrecord);
            ////Datatable textbox focus
            //var rows = $("#tblinnergrid").dataTable().fnGetNodes();
            //var dtTable = $('#tblinnergrid').DataTable();
            //for (var i = 0; i < rows.length; i++) {
            //    var im = dtTable.cells({ row: i, column: 3 }).data()[0];
            //    var cl = dtTable.cells({ row: i, column: 4 }).data()[0];
            //    var sz = dtTable.cells({ row: i, column: 5 }).data()[0];
            //    $('input[id=txtretqty]').each(function () {
            //        if (im == itm && cl == clr && sz == sze && $(this).val() == ReturnQty) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtretqty').val();
            //            row.find('#txtretqty').focus().val('').val(num);
            //            return true;
            //        }
            //    });
            //}
        }
        //Datatable textbox focus
        var rows = $("#tblinnergrid").dataTable().fnGetNodes();
        var dtTable = $('#tblinnergrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtretqty]').each(function () {
                if (sn == Csno && $(this).val() == ReturnQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtretqty').val();
                    row.find('#txtretqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.txtlossqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = InnerDetailrecord.slice(rowindex);
        var LossQty = $(this).val();
        var Csno = currentrow[0]['CuttingIssueDetid'];
        var itm = currentrow[0]['Itemid'];
        var clr = currentrow[0]['Colorid'];
        var sze = currentrow[0]['Sizeid'];

        var ReturnQty = currentrow[0]['Returnqty'];
        var Balqty = currentrow[0]['Balanceqty'];
        currentrow[0]['Lossqty'] = LossQty;
        if ((parseInt(ReturnQty) + parseInt(LossQty)) > parseInt(Balqty)) {
            //alert("Return + Loss Quantity should not be greater than Balance Quantity...");
            var msg = 'Return + Loss Quantity should not be greater than Balance Quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $(this).val(0);
            
        }
        else {
            InnerDetailrecord[rowindex] = currentrow[0];
            
            var inputcount = 0;
            $('#tblinnergrid tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tblinnergrid').DataTable().destroy();
            }

            LoadInnerGrid(InnerDetailrecord);
            //Datatable textbox focus
            //var rows = $("#tblinnergrid").dataTable().fnGetNodes();
            //var dtTable = $('#tblinnergrid').DataTable();
            //for (var i = 0; i < rows.length; i++) {
            //    var im = dtTable.cells({ row: i, column: 3 }).data()[0];
            //    var cl = dtTable.cells({ row: i, column: 4 }).data()[0];
            //    var sz = dtTable.cells({ row: i, column: 5 }).data()[0];
            //    $('input[id=txtlossqty]').each(function () {
            //        if (im == itm && cl == clr && sz == sze && $(this).val() == LossQty) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtlossqty').val();
            //            row.find('#txtlossqty').focus().val('').val(num);
            //            return true;
            //        }
            //    });
            //}
        }
        //Datatable textbox focus
        var rows = $("#tblinnergrid").dataTable().fnGetNodes();
        var dtTable = $('#tblinnergrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtlossqty]').each(function () {
                if (sn == Csno && $(this).val() == LossQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtlossqty').val();
                    row.find('#txtlossqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });


    $(document).on('keyup', '.txtCanqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = InnerDetailrecord.slice(rowindex);
        var CancelQty = $(this).val();
        var Csno = currentrow[0]['CuttingIssueDetid'];
        var itm = currentrow[0]['Itemid'];
        var clr = currentrow[0]['Colorid'];
        var sze = currentrow[0]['Sizeid'];
        var lossqty = currentrow[0]['Lossqty'];
        var Balqty = currentrow[0]['Balanceqty'];
        currentrow[0]['CancelQty'] = CancelQty;

        if ((parseInt(CancelQty) ) > parseInt(Balqty)) {
            //alert("Cancel Quantity should not be greater than Balance Quantity...");
            var msg = 'Cancel Quantity should not be greater than Balance Quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $(this).val(0);
            currentrow[0]['CancelQty'] = 0;
        }
        else {
            InnerDetailrecord[rowindex] = currentrow[0];

            var inputcount = 0;
            $('#tblinnergrid tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tblinnergrid').DataTable().destroy();
            }

            LoadInnerGrid(InnerDetailrecord);
            ////Datatable textbox focus
            //var rows = $("#tblinnergrid").dataTable().fnGetNodes();
            //var dtTable = $('#tblinnergrid').DataTable();
            //for (var i = 0; i < rows.length; i++) {
            //    var im = dtTable.cells({ row: i, column: 3 }).data()[0];
            //    var cl = dtTable.cells({ row: i, column: 4 }).data()[0];
            //    var sz = dtTable.cells({ row: i, column: 5 }).data()[0];
            //    $('input[id=txtretqty]').each(function () {
            //        if (im == itm && cl == clr && sz == sze && $(this).val() == ReturnQty) {
            //            var row = $(this).closest('tr');
            //            var num = row.find('#txtretqty').val();
            //            row.find('#txtretqty').focus().val('').val(num);
            //            return true;
            //        }
            //    });
            //}
        }
        //Datatable textbox focus
        var rows = $("#tblinnergrid").dataTable().fnGetNodes();
        var dtTable = $('#tblinnergrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtCanqty]').each(function () {
                if (sn == Csno && $(this).val() == CancelQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtCanqty').val();
                    row.find('#txtCanqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.txtSecqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = InnerDetailrecord.slice(rowindex);
        var SecQty = $(this).val();
        var Csno = currentrow[0]['CuttingIssueDetid'];
        var itm = currentrow[0]['Itemid'];
        var clr = currentrow[0]['Colorid'];
        var sze = currentrow[0]['Sizeid'];
        var lossqty = currentrow[0]['Lossqty'];
        var Balqty = currentrow[0]['Balanceqty'];
        currentrow[0]['Secqty'] = SecQty;

            InnerDetailrecord[rowindex] = currentrow[0];

            var inputcount = 0;
            $('#tblinnergrid tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tblinnergrid').DataTable().destroy();
        
            LoadInnerGrid(InnerDetailrecord);
      
        }
        //Datatable textbox focus
        var rows = $("#tblinnergrid").dataTable().fnGetNodes();
        var dtTable = $('#tblinnergrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0]; 
            $('input[id=txtSecqty]').each(function () {
                if (sn == Csno && $(this).val() == SecQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtSecqty').val();
                    row.find('#txtSecqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.txtopcanqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = OuterDetailrecord.slice(rowindex);
        var CancelQty = $(this).val();
        var Csno = currentrow[0]['CuttingOrdDetid'];
        var itm = currentrow[0]['Itemid'];
        var clr = currentrow[0]['Colorid'];
        var sze = currentrow[0]['Sizeid'];
        var lossqty = currentrow[0]['Lossqty'];
        var Balqty = currentrow[0]['Balanceqty'];
        currentrow[0]['CancelQty'] = CancelQty;

        if ((parseInt(CancelQty)) > parseInt(Balqty)) {
            //alert("Cancel Quantity should not be greater than Balance Quantity...");
            var msg = 'Cancel Quantity should not be greater than Balance Quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $(this).val(0);
            currentrow[0]['CancelQty'] = 0;
        }
        else {
            OuterDetailrecord[rowindex] = currentrow[0];

            var inputcount = 0;
            $('#tbloutergrid tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tbloutergrid').DataTable().destroy();
            }

            LoadOuterGrid(OuterDetailrecord);
       
        }
        //Datatable textbox focus
        var rows = $("#tbloutergrid").dataTable().fnGetNodes();
        var dtTable = $('#tbloutergrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 0 }).data()[0];
            $('input[id=txtopcanqty]').each(function () {
                if (sn == Csno && $(this).val() == CancelQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtopcanqty').val();
                    row.find('#txtopcanqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });

    $(document).on('keyup', '.txtopsecqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        var currentrow = OuterDetailrecord.slice(rowindex);
        var SecQty = $(this).val();
        var Csno = currentrow[0]['CuttingOrdDetid'];
        var itm = currentrow[0]['Itemid'];
        var clr = currentrow[0]['Colorid'];
        var sze = currentrow[0]['Sizeid'];
        var lossqty = currentrow[0]['Lossqty'];
        var Balqty = currentrow[0]['Balanceqty'];
        currentrow[0]['Secqty'] = SecQty;
      
            OuterDetailrecord[rowindex] = currentrow[0];

            var inputcount = 0;
            $('#tbloutergrid tr').each(function () {
                inputcount++;
            });

            if (inputcount > 0) {
                //var tableinput = $('#tblinnergrid').DataTable();
                //tableinput.clear().draw();
                $('#tbloutergrid').DataTable().destroy();
            }

            LoadOuterGrid(OuterDetailrecord);

        
        //Datatable textbox focus
        var rows = $("#tbloutergrid").dataTable().fnGetNodes();
        var dtTable = $('#tbloutergrid').DataTable();
        for (var i = 0; i < rows.length; i++) {
            var sn = dtTable.cells({ row: i, column: 1 }).data()[0];
            $('input[id=txtopsecqty]').each(function () {
                if (sn == Csno && $(this).val() == SecQty) {
                    var row = $(this).closest('tr');
                    var num = row.find('#txtopsecqty').val();
                    row.find('#txtopsecqty').focus().val('').val(num);
                    return true;
                }
            });
        }
    });


    $("#btnfstclose").click(function () {
        debugger;
        $('#myModal1').modal('hide');

        $('#tblinnercuttingreturn').DataTable().destroy();

        //$('#ddlRCompany').val(0);
       // $('#ddlMunit').val(0);
        $("#ddlAunitno").val(0);
        $("#ddlACompany").val(0);
        $("#ddlAOrderno").val(0);
        $("#ddlAstyle").val(0);
    });

    $("#btnlstclose").click(function () {
        debugger;
        $('#myModal2').modal('hide');

        var innercount = 0;
        $('#tblinnergrid tr').each(function () {
            innercount++;
        });

        if (innercount > 0) {
            $('#tblinnergrid').DataTable().destroy();
        }

        $('#txtinnerrem').val('');
        $('#txtcutordno').val('');

    });

    $('#btnwasteadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if (IssueDetId == 0) {
            //alert('Please Select Issue Item..');
            var msg = 'Please Select Issue Item...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isAllValid = false;
            return true;
        }


        if ($('#ddlItemlist').val() == "0") {

            $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }



        if ($('#ddlColorlist').val() == "0") {
            isAllValid = false;

            $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlSizelist').val() == "0") {
            isAllValid = false;

            $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlUOMlist').val() == "0") {
            isAllValid = false;

            $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtwasteqty').val() == "") {
            isAllValid = false;
            $('#txtwasteqty').css('border-color', 'Red');
        }
        else {
            $('#txtwasteqty').css('border-color', 'lightgrey');
        }


        var rt = 0;

        if ($('#txtwasterate').val() == "") {
            rt = 0;
        }
        else {
            rt = $('#txtwasterate').val();
        }

        var ItemId= $('#ddlItemlist').val();
        var SizeId= $('#ddlSizelist').val();
        var ColorId = $('#ddlColorlist').val();
       

        var cutempty = [];
        cutempty = CuttingWastedet;

        cutempty = $.grep(cutempty, function () {
            return (this.CuttingIsuuedetId == IssueDetId && this.ItemId == ItemId && this.ColorId == ColorId && this.SizeId == SizeId);
        });

        if (cutempty.length > 0) {
            //alert('Please Select different Item,Color,Size...');
            var msg = 'Please Select different Item,Color,Size...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isAllValid = false;
        }

        if (isAllValid) {

            var trimsListObj = {
                Item: $("#ddlItemlist option:selected").text(),
                ItemId: $('#ddlItemlist').val(),
                Color: $("#ddlColorlist option:selected").text(),
                ColorId: $('#ddlColorlist').val(),
                Size: $("#ddlSizelist option:selected").text(),
                SizeId: $('#ddlSizelist').val(),
                UOM: $("#ddlUOMlist option:selected").text(),
                UOMId: $('#ddlUOMlist').val(),
                Quantity: $('#txtwasteqty').val(),
                Rate: rt,
                WastageDetId: 0,
                CuttingIsuuedetId: IssueDetId,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            CuttingWastedet.push(trimsListObj);

            var cutempty = [];
            cutempty = CuttingWastedet;

            cutempty = $.grep(cutempty, function (v) {
                return (v.CuttingIsuuedetId == IssueDetId);
            });

            loadWasteTable(cutempty);
            ClearTrimsDll();

        }
    });


    $(document).on('click', '.btnwasteedit', function () {
        debugger;
        // Mode = 1;
        var table = $('#tblWastagedetails').DataTable();
        var CuttingIsuuedetId = table.row($(this).parents('tr')).data()["CuttingIsuuedetId"];
        var ItemId = table.row($(this).parents('tr')).data()["ItemId"];
        var ColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var SizeId = table.row($(this).parents('tr')).data()["SizeId"];
        var UomId = table.row($(this).parents('tr')).data()["UOMId"];
        var Quantity = table.row($(this).parents('tr')).data()["Quantity"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];

        $('#ddlItemlist').val(ItemId).trigger('change');
        $('#ddlColorlist').val(ColorId).trigger('change');
        $('#ddlSizelist').val(SizeId).trigger('change');
        $('#ddlUOMlist').val(UomId).trigger('change');
        $('#txtwasteqty').val(Quantity);
        $('#txtwasterate').val(Rate);

        wasteitemid = ItemId;
        wastecolorid = ColorId;
        wastesizeid = SizeId;
        IssueDetId = CuttingIsuuedetId;
    

        $('#btnwasteadd').hide()
        $('#btnwasteupdate').show();
    });

    $('#btnwasteupdate').click(function () {
        debugger;

      

        var isAllValid = true;


        if ($('#ddlItemlist').val() == "0") {

            $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlItemlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlColorlist').val() == "0") {
            isAllValid = false;

            $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlColorlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlSizelist').val() == "0") {
            isAllValid = false;

            $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlSizelist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
        if ($('#ddlUOMlist').val() == "0") {
            isAllValid = false;

            $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid red');

        }
        else {

            $('#ddlUOMlist').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtwasteqty').val() == "") {
            isAllValid = false;
            $('#txtwasteqty').css('border-color', 'Red');
        }
        else {
            $('#txtwasteqty').css('border-color', 'lightgrey');
        }
        var rt = 0;

        if ($('#txtwasterate').val() == "") {
            rt = 0;
        }
        else {
            rt = $('#txtwasterate').val();
        }

        if (isAllValid) {

            $.each(CuttingWastedet, function () {

                if (this.CuttingIsuuedetId == IssueDetId && this.ItemId == wasteitemid && this.ColorId == wastecolorid && this.SizeId == wastesizeid) {

                    this.Item = $("#ddlItemlist option:selected").text();
                    this.ItemId = $('#ddlItemlist').val();
                    this.Color = $("#ddlColorlist option:selected").text();
                    this.ColorId = $('#ddlColorlist').val();
                    this.Size = $("#ddlSizelist option:selected").text();
                    this.SizeId = $('#ddlSizelist').val();
                    this.UOM = $("#ddlUOMlist option:selected").text();
                    this.UOMId = $('#ddlUOMlist').val();
                    this.Quantity = $('#txtwasteqty').val();
                    this.Rate = rt;

                }

            });

            var cutempty = [];
            cutempty = CuttingWastedet;

            cutempty = $.grep(cutempty, function (v) {
                return (v.CuttingIsuuedetId == IssueDetId);
            });

         

            loadWasteTable(cutempty);
            ClearTrimsDll();
            $('#btnwasteadd').show();
            $('#btnwasteupdate').hide();
          
        };
    });

    $(document).on('click', '.btnwasteremove', function () {
        debugger;
        var table = $('#tblWastagedetails').DataTable();
        var CuttingIsuuedetId = table.row($(this).parents('tr')).data()["CuttingIsuuedetId"];
        var ItemId = table.row($(this).parents('tr')).data()["ItemId"];
        var ColorId = table.row($(this).parents('tr')).data()["ColorId"];
        var SizeId = table.row($(this).parents('tr')).data()["SizeId"];
        var UomId = table.row($(this).parents('tr')).data()["UOMId"];
        var Quantity = table.row($(this).parents('tr')).data()["Quantity"];
        var Rate = table.row($(this).parents('tr')).data()["Rate"];

        wasteitemid = ItemId;
        wastecolorid = ColorId;
        wastesizeid = SizeId;
        IssueDetId = CuttingIsuuedetId;


        var cutempty1 = [];
        cutempty1 = CuttingWastedet;

        cutempty1 = $.grep(cutempty1, function (v) {
            if (v.CuttingIsuuedetId == IssueDetId) {
                if (v.ItemId == wasteitemid && v.ColorId == wastecolorid && v.SizeId == wastesizeid) {
                   
                }
                else {
                    return v;
                }
            }
            else {
                return v;
            }
        });

        CuttingWastedet = cutempty1;

        var cutempty2 = [];
        cutempty2 = CuttingWastedet;

        cutempty2 = $.grep(cutempty2, function (v) {
            return (v.CuttingIsuuedetId == IssueDetId);
        });

        loadWasteTable(cutempty2);
        ClearTrimsDll();
        $('#btnwasteadd').show();
        $('#btnwasteupdate').hide();
    });


    $('#tblinnergrid').on('click', 'tr', function (e) {
        debugger;
        Isuerowindex = $(this).closest('tr').index();
        var currentrow = InnerDetailrecord.slice(Isuerowindex);
        IssueDetId = currentrow[0]['CuttingIssueDetid'];
        var cutempty2 = [];
        cutempty2 = CuttingWastedet;

        cutempty2 = $.grep(cutempty2, function (v) {
            return (v.CuttingIsuuedetId == IssueDetId);
        });

        loadWasteTable(cutempty2);
    });

    $('#tblcuttingreturnmaingrid').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblcuttingreturnmaingrid').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblcuttingreturnmaingrid').dataTable().fnGetData(row);
        var ProcessOrdNo = data.CuttingReturnNo;
        LoadItemMovements(ProcessOrdNo);
    });


});

function ClearTrimsDll() {
    $('#ddlItemlist').val(0).trigger('change');
    $('#ddlColorlist').val(0).trigger('change');
    $('#ddlSizelist').val(0).trigger('change');
    $('#ddlUOMlist').val(0).trigger('change');
    $('#txtwasteqty').val('');
    $('#txtwasterate').val('');
}

function loadWasteTable(trimsListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblWastagedetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblWastagedetails').DataTable().destroy();
    }
    $('#tblWastagedetails').empty();
    
    $('#tblWastagedetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: trimsListObj,
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
             { title: "WastageDetId", data: "WastageDetId", "visible": false },
            { title: "CuttingIsuuedetId", data: "CuttingIsuuedetId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },         
            { title: "ColorId", data: "ColorId", "visible": false },
            { title: "Color", data: "Color" },
            { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Uomid", data: "UOMId", "visible": false },
            { title: "UOM", data: "UOM" },
              { title: "Qty", data: "Quantity" },
                { title: "Rate", data: "Rate" },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnwasteedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnwasteremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblWastagedetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblWastagedetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}




function Delete(ID) {
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/CuttingReturn/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                AddUserEntryLog('Production', 'Cutting Return', 'UPDATE', $("#txtReturnno").val());
                //alert("Record deleted successfully...");                
                //$('#tblcuttingreturnmaingrid').DataTable().destroy();
                //LoadData(companyid, OrderType, InterExter, fromdate, todate);
                CuttReturnId = 0;
                //window.location.href = "/CuttingReturn/CuttingReturnIndex";
                var msg = 'Record deleted successfully...';
                var flg = 2;
                var mod = 0;
                var ur = "/CuttingReturn/CuttingReturnIndex";
                AlartMessage(msg, flg, mod, ur);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function Changedropdownlist() {
    $("#ddlRetLocType").empty();

    if ($('#optinnerwrkdiv').is(':checked')) { LoadWorkdivisionDDL("#ddlRetLocType"); }
    else if ($('#optinnerprdunit').is(':checked')) { LoadCompanyUnitDDL("#ddlRetLocType"); }
    else if ($('#optinnerstore').is(':checked')) {
        //  LoadStoreUnitDDL("#ddlRetLocType");

        LoadEmployeeStoreunit();
    }
}

function ListFilter() {
    debugger;
    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var companyid = $('#ddlRCompany').val();
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
    LoadData(companyid, OrderType, InterExter, FDate, TDate);
}

function clickonlist() {
    debugger;
    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();

    //$('#ddlMOrderno').empty();
    //$('#ddlMRefNo').empty();
    //$('#ddlRworkno').empty();

    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    //LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}
function CMainList() {

    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkIncharge = true;
    ChkJNo = true;
    ChkSupplier = true;
    ChkComp = false;
    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}

function JMainList() {

    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkIncharge = true;
    ChkJNo = false;
    ChkSupplier = true;
    ChkComp = false;
    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}

function OMainList() {

    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkIncharge = true;
    ChkJNo = true;
    ChkSupplier = true;
    ChkComp = false;
    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}


function RMainList() {

    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkIncharge = true;
    ChkJNo = true;
    ChkSupplier = true;
    ChkComp = false;
    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}


function SPMainList() {

    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkIncharge = true;
    ChkJNo = true;
    ChkSupplier = false;
    ChkComp = false;
    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}


function IMainList() {
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkIncharge = false;
    ChkJNo = true;
    ChkSupplier = true;
    ChkComp = false;
    $('#tblcuttingreturnmaingrid').DataTable().destroy();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    companyid = $('#ddlRCompany').val();

    LoadData(companyid, OrderType, InterExter, FDate, TDate);
    LoadDDL(companyid, OrderType, InterExter, FDate, TDate);
}



function LoadDDL(companyid, ordertype, interexter, fromdate, todate) {
    debugger;

    if ($('#optwork').is(':checked')) { OrderType = 'W'; }
    else if ($('#optsamord').is(':checked')) { OrderType = 'S'; }
    else if ($('#optjobord').is(':checked')) { OrderType = 'J'; }

    if ($('#optinter').is(':checked')) { InterExter = 'I'; }
    else if ($('#optexter').is(':checked')) { InterExter = 'E'; }

    var jordNo = "";
    var JONo = $('select#ddlRworkno option:selected').val();

    if (JONo == 0 || JONo == undefined) {
        jordNo == "";
    }
    else {

        jordNo = $('select#ddlRworkno option:selected').val();
    }

    var ordNo = "";
    var ONo = $('select#ddlMOrderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderno option:selected').val();
    }

    var RefNo = "";
    var RfNo = $('select#ddlMRefNo option:selected').val();

    if (RfNo == 0 || RfNo == undefined) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }
    var suppid = $('#ddlMWorkdiv').val();
    if (suppid == null || suppid == "0") {
        suppid = 0;
    }
    var empid = $('#ddlMEmp').val();
    if (empid == null || empid == "") {
        empid = 0;
    }
    var companyid = $('#ddlRCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlRCompany').val();
    }
    //$('#tblcuttingmaingrid').DataTable().destroy();

    if (ChkComp || DtChk) {
        jordNo == "";
        ordNo == "";
        suppid = 0;
        empid = 0;
    }

    $.ajax({
        type: "POST",
        url: '/CuttingReturn/GetMaindt/',
        data: JSON.stringify({ CompanyId: companyid, OrderType: OrderType, InterExternal: InterExter, Fromdate: fromdate, Todate: todate, jobordno: jordNo, orderno: ordNo, Refno: RefNo, Supplierid: suppid, employeeid: empid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;
            //maintbllist = json;
            maintbllist.sort(function (a, b) {
                return a.CuttingOrdId - b.CuttingOrdId;
            });


            var refdet = {};
            var ref = [];
            var orddet = {};
            var ord = [];
            var wrkdet = {};
            var wrk = [];
            var Empdet = {};
            var Emp = [];
            var Prockdet = {};
            var Proc = [];
            $.each(maintbllist, function (i, el) {

                if (!refdet[el.RefNo]) {
                    refdet[el.RefNo] = true;
                    ref.push(el);
                }

                if (!orddet[el.OrderNo]) {
                    orddet[el.OrderNo] = true;
                    ord.push(el);
                }

                if (!wrkdet[el.JobOrderNo]) {
                    wrkdet[el.JobOrderNo] = true;
                    wrk.push(el);
                }
                if (!Empdet[el.Inchargeid]) {
                    Empdet[el.Inchargeid] = true;
                    Emp.push(el);
                }
                if (!Prockdet[el.Processorid]) {
                    Prockdet[el.Processorid] = true;
                    Proc.push(el);
                }
               
            });

            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlMOrderno').empty();
                $(ddlMOrderno).append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function () {
                    $(ddlMOrderno).append($('<option></option>').text(this.OrderNo));
                });
            }
            if (ChkJNo || ChkComp || DtChk) {
                $('#ddlRworkno').empty();
                $(ddlRworkno).append($('<option/>').val('0').text('--Select WorkOrdNo--'));
                $.each(wrk, function () {
                    $(ddlRworkno).append($('<option></option>').text(this.JobOrderNo));
                });
            }
            if (ChkRefno || ChkComp || DtChk) {
                $('#ddlMRefNo').empty();
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(ref, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });
            }
          
            if (ChkIncharge || ChkComp || DtChk) {
                $('#ddlMEmp').empty();
                $(ddlMEmp).append($('<option/>').val('0').text('--Select Incharge--'));
                $.each(Emp, function () {
                    $(ddlMEmp).append($('<option></option>').val(this.Inchargeid).text(this.Incharge));
                });
            }
            if (ChkSupplier || ChkComp || DtChk) {
                if ($('#optinter').is(':checked')) {

                    $('#ddlMWorkdiv').empty();
                    $(ddlMWorkdiv).append($('<option/>').val('0').text('--Select WorkDiv--'));
                    $.each(ref, function () {
                        $(ddlMWorkdiv).append($('<option></option>').val(this.Processorid).text(this.Processor));
                    });
                }
                else if ($('#optexter').is(':checked')) {

                    $('#ddlMProcessor').empty();
                    $(ddlMProcessor).append($('<option/>').val('0').text('--Select Processor--'));
                    $.each(ref, function () {
                        $(ddlMProcessor).append($('<option></option>').val(this.Processorid).text(this.Processor));
                    });

                }
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadData(companyid, ordertype, interexter, fromdate, todate) {
    debugger;

    if ($('#optwork').is(':checked')) { OrderType = 'W'; }
    else if ($('#optsamord').is(':checked')) { OrderType = 'S'; }
    else if ($('#optjobord').is(':checked')) { OrderType = 'J'; }

    if ($('#optinter').is(':checked')) { InterExter = 'I'; }
    else if ($('#optexter').is(':checked')) { InterExter = 'E'; }

    var jordNo = "";
    var JONo = $('select#ddlRworkno option:selected').val();

    if (JONo == 0 || JONo == undefined) {
        jordNo == "";
    }
    else {

        jordNo = $('select#ddlRworkno option:selected').val();
    }

    var ordNo = "";
    var ONo = $('select#ddlMOrderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlMOrderno option:selected').val();
    }

    var RefNo = "";
    var RfNo = $('select#ddlMRefNo option:selected').val();

    if (RfNo == 0 || RfNo == undefined) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }


    var chkwork = $('#optinter').prop('checked');
    var chkProces = $('#optexter').prop('checked');
    if (chkwork) {
        var suppid = $('#ddlMWorkdiv').val();
        if (suppid == null || suppid == "0") {
            suppid = 0;
        }
    }
    else if (chkProces) {
        var suppid = $('#ddlMProcessor').val();
        if (suppid == null || suppid == "0") {
            suppid = 0;
        }
    }


    //var suppid = $('#ddlMWorkdiv').val();
    //if (suppid == null || suppid == "0") {
    //    suppid = 0;
    //}
    var empid = $('#ddlMEmp').val();
    if (empid == null || empid == "") {
        empid = 0;
    }
    var companyid = $('#ddlRCompany').val();

    if (companyid == null) {
        companyid = DCompid;
    } else {
        companyid = $('#ddlRCompany').val();
    }
    if (ChkComp || DtChk) {
        jordNo == "";
        ordNo == "";
        suppid = 0;
        empid = 0;
    }

    var menufilter = companyid + ',' + OrderType + ',' + InterExter + ',' + fromdate + ',' + todate + ',' + jordNo + ',' + ordNo + ',' + RefNo + ',' + suppid + ',' + empid ;
    localStorage.setItem('CuttingReturnMainFilter', menufilter);

    $.ajax({
        type: "POST",
        url: '/CuttingReturn/GetMaindt/',
        //data: JSON.stringify({ CompanyId: companyid, OrderType: OrderType, InterExternal: InterExter, Fromdate: fromdate, Todate: todate }),
        data: JSON.stringify({ CompanyId: companyid, OrderType: OrderType, InterExternal: InterExter, Fromdate: fromdate, Todate: todate, jobordno: jordNo, orderno: ordNo, Refno: RefNo, Supplierid: suppid, employeeid: empid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;
            if (!DtChk) {
                $('#tblcuttingreturnmaingrid').DataTable({
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
                                { title: "ID", data: "CuttingReturnid", "visible": false },
                                { title: "JobOrderNo", data: "JobOrderNo", "visible": false },
                                { title: "CuttIssueid", data: "Cuttingissueid", "visible": false },
                                { title: "Return No", data: "CuttingReturnNo" },
                                {
                                    title: "Return Date", data: "CuttingReturnDate",
                                    render: function (data) {
                                        return (moment(data).format("DD/MM/YYYY"));
                                    }
                                },
                                { title: "Issue No", data: "CuttingIssueNo" },
                                { title: "Incharge", data: "Incharge" },
                                { title: "Type", data: "OrdType" },
                                {
                                    title: "ACTION", "mDataProp": null,
                                    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CuttingRetEditFlg + '  class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CuttingRetDeleteFlg + '  class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button" ' + CuttingRetPrintFlg + '   class="CuttReturnPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                                }
                    ]
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
    var fill = localStorage.getItem('CuttingReturnMainFilter');
    var fillobj = [];
    fillobj = fill.split(",");

    $('#txtFromDate').val(fillobj[3]);
    $('#txtToDate').val(fillobj[4]);

    if (fillobj[2] == 'I') {
        $('#optinter').prop('checked', true);
    } else {
        $('#optexter').prop('checked', true);
    }

    if (fillobj[1] == 'W') {
        $('#optwork').prop('checked', true);
    } else if (fillobj[1] == 'J') {
        $('#optjobord').prop('checked', true);
    }
    else if (fillobj[1] == 'S') {
        $('#optsamord').prop('checked', true);
    }
   

    if (fillobj[5] == "undefined") {
        fillobj[5] = '';
    }
    if (fillobj[6] == "undefined") {
        fillobj[6] = '';
    }
    if (fillobj[7] == "undefined") {
        fillobj[7] = '';
    }
    if (fillobj[8] == "undefined") {
        fillobj[8] = 0;
    }
    if (fillobj[9] == "undefined") {
        fillobj[9] = 0;
    }
   
    $.ajax({
        type: "POST",
        url: '/CuttingReturn/GetMaindt/',
        data: JSON.stringify({ CompanyId: fillobj[0], OrderType: fillobj[1], InterExternal: fillobj[2], Fromdate: fillobj[3], Todate: fillobj[4], jobordno: fillobj[5], orderno: fillobj[6], Refno: fillobj[7], Supplierid: fillobj[8], employeeid: fillobj[9] }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            maintbllist = json;
            if (!DtChk) {
                $('#tblcuttingreturnmaingrid').DataTable({
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
                                { title: "ID", data: "CuttingReturnid", "visible": false },
                                { title: "JobOrderNo", data: "JobOrderNo", "visible": false },
                                { title: "CuttIssueid", data: "Cuttingissueid", "visible": false },
                                { title: "Return No", data: "CuttingReturnNo" },
                                {
                                    title: "Return Date", data: "CuttingReturnDate",
                                    render: function (data) {
                                        return (moment(data).format("DD/MM/YYYY"));
                                    }
                                },
                                { title: "Issue No", data: "CuttingIssueNo" },
                                { title: "Incharge", data: "Incharge" },
                                { title: "Type", data: "OrdType" },
                                {
                                    title: "ACTION", "mDataProp": null,
                                    "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CuttingRetEditFlg + '  class="btnmaingrdedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button><button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Delete" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" ' + CuttingRetDeleteFlg + '  class="btnmaingrddelete btn btn-danger btn-round" onClick=""> <i class="fa fa-times"></i> </button><button type="button" ' + CuttingRetPrintFlg + '   class="CuttReturnPrint btn btn_round btn-success"  data-toggle="tooltip" data-placement="top" title="print" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;" >  <i class="fa fa-print"></i> </button>'
                                }
                    ]
                });
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


$(document).on('click', '.CuttReturnPrint', function () {
    debugger;
    var compid = $('#ddlRCompany').val();
    var table = $('#tblcuttingreturnmaingrid').DataTable();
    var CuttingReturnid = table.row($(this).parents('tr')).data()["CuttingReturnid"];
    window.open("../ReportInline/Production/CuttingReturnReportInline/CuttingReturnReportInline.aspx?CuttingReturnid=" + CuttingReturnid + "&Companyid=" + compid + "&type=" + 'C');
});



function OChangedropcont() {
    debugger;

    var chkwork = $('#optinter').prop('checked');
    var chkProces = $('#optexter').prop('checked');
    if (chkwork) {
        $('#mwrk').show();
        $('#mprocess').hide();
    }
    else if (chkProces) {
        $('#mwrk').hide();
        $('#mprocess').show();
    }
   
}
function Changedropcont() {
    debugger;
   
    var chkwork = $('#optinter').prop('checked');
    var chkProces = $('#optexter').prop('checked');
    if (chkwork) {
        $('#mwrk').show();
        $('#mprocess').hide();
    }
    else if (chkProces) {
        $('#mwrk').hide();
        $('#mprocess').show();
    }
    CMainList();
}



function Add() {
    debugger;
    //if ($('#optinnerwrkdiv').is(':checked')) { RetLocType = 'W'; }
    //else if ($('#optinnerprdunit').is(':checked')) { RetLocType = 'U'; }
    //else if ($('#optinnerstore').is(':checked')) { RetLocType = 'S'; }

    var isValid = true;

    if ($('#txtCanRefNo').val().trim() == "") {
        $('#txtCanRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCanRefNo').css('border-color', 'lightgrey');
    }

    var ipretqty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].Returnqty > 0) {

            ipretqty = ipretqty + parseFloat(InnerDetailrecord[e].Returnqty);
        }

    });

    var ipissuqty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].Issueqty > 0) {

            ipissuqty = ipissuqty + parseFloat(InnerDetailrecord[e].Issueqty);
        }

    });



    var ipCancelQty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].CancelQty > 0) {

            ipCancelQty = ipCancelQty + parseFloat(InnerDetailrecord[e].CancelQty);
        }

    });

    var ipLossQty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].Lossqty > 0) {

            ipLossQty = ipLossQty + parseFloat(InnerDetailrecord[e].Lossqty);
        }

    });


    

    var OpCancelQty = 0;

    $.each(OuterDetailrecord, function (e) {
        if (OuterDetailrecord[e].CancelQty > 0) {

            OpCancelQty = OpCancelQty + parseFloat(OuterDetailrecord[e].CancelQty);
        }

    });

    if (ipLossQty == 0) {
        if (ipretqty == 0 && ipCancelQty == 0) {
            //alert('Please Fill atleast one Return Qty or Cancel Qty..');
            var msg = 'Please Fill atleast one Return quantity or Cancel quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        }
    }



    if (ipCancelQty > 0) {
        if (OpCancelQty == 0) {
            //alert('Please Fill Output Cancel Qty..');
            var msg = 'Please Fill Output Cancel quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        }
    }

    if (OpCancelQty > 0) {
        if (ipCancelQty == 0) {
            //alert('Please Fill Input Cancel Qty..');
            var msg = 'Please Fill Input Cancel quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        }
    }



    var sumwgt = parseFloat(ipretqty) + parseFloat(ipCancelQty);
    var balwgt = InnerDetailrecord[0].RecQty ;
    if (sumwgt > balwgt) {
        //alert('Please Check Total Issue,Receipt,Return Weight..');
        var totbalwgt=balwgt+parseFloat(ValidateCuttingTolerance);

            if (sumwgt > totbalwgt) {
                var msg = 'Please Check Total Issue,Receipt,Return Weight...' + 'Balance weight - ' + balwgt;
                var flg = 4;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                isValid = false;
                return false;
            } else if (sumwgt <= totbalwgt) {
                var ans = confirm("Are you sure you want to Return Balance + Tolerance? " + "Balance weight - " + balwgt);
                if (ans) {

                }
                else {
                    isValid = false;
                    return false;
                }
            }
    }


    //var SumBalanceqty = 0;

    //$.each(InnerDetailrecord, function (e) {
    //    if (InnerDetailrecord[e].Balanceqty > 0) {

    //        SumBalanceqty = SumBalanceqty + parseFloat(InnerDetailrecord[e].Balanceqty);
    //    }

    //});



    //var totret = parseFloat(ipretqty) + parseFloat(ipCancelQty);
    //var TotRecqty = InnerDetailrecord[0].RecQty;
    //var bal = parseFloat(SumBalanceqty) - parseFloat(TotRecqty);
    //if (bal < totret) {
    //    alert('Please Check Receipt Qty...');
    //    isValid = false;
    //    return false;
    //}

    //$.each(OuterDetailrecord, function (e) {
    //    debugger;
    //    InnerDetailrecord.push(OuterDetailrecord[e]);
    //});


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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        isValid = false;
        return true;
    }

    if (isValid) {

        $.each(OuterDetailrecord, function (e) {
            debugger;
            InnerDetailrecord.push(OuterDetailrecord[e]);
        });

        table = "Cutting_Return_Mas",
        column = "CuttingReturnNo",
        compId = $('#ddlACompany').val(),
        Docum = 'CUTTING RETURN'
        companyid = compId;

        var oldReturnno = $('#txtReturnno').val();
        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var newReturnno = result.Value;
                if (oldReturnno != newReturnno) {
                    //alert('Return No has been changed...');
                    var msg = 'Return Number has been changed...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $('#txtReturnno').val(result.Value);
                }
                table = "Cutting_Cancel_mas",
                column = "Cutting_Cancel_no",
                compId = $('#ddlACompany').val(),
                Docum = 'CUTTING CANCEL'
                companyid = compId;

                var oldCancelno = $('#txtCancelno').val();
                $.ajax({
                    url: "/BulkOrder/GenerateNo",
                    data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        var newCancelno = result.Value;
                        if (oldCancelno != newCancelno) {
                            //alert('Cancel No has been changed...');
                            var msg = 'Cancel Number has been changed...';
                            var flg = 4;
                            var mod = 1;
                            var ur = "";
                            AlartMessage(msg, flg, mod, ur);
                            $('#txtCancelno').val(result.Value);
                        }

                        var CuttingReturnObj = {
                            CuttingOrdid: CuttingOrderId,
                            Cuttingissueid: CuttingIssueId,
                            CuttingReturnNo: $('#txtReturnno').val(),
                            CuttingReturnDate: $('#txtReturnDate').val(),
                            Remarks: $('#txtinnerrem').val(),
                            ToLocation: storeunitid,

                            Cutting_Cancel_no: $('#txtCancelno').val(),
                            Cutting_Cancel_date: $('#txtCancelDate').val(),
                            Cancel_Ref_no: $('#txtCanRefNo').val(),
                            Cancel_Ref_date: $('#txtCancelrefDate').val(),

                            RetLocType: MSType,
                            createdby: Guserid,
                            CuttingReturnDetail: InnerDetailrecord,
                            WstageList: CuttingWastedet
                        };
                        $("#btnAdd").attr("disabled", true);
                        LoadingSymb();
                        $.ajax({
                            url: "/CuttingReturn/Add",
                            data: JSON.stringify(CuttingReturnObj),
                            type: "POST",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                AddUserEntryLog('Production', 'Cutting Return', 'ADD', $("#txtReturnno").val());
                                //alert("Record saved successfully...");

                                //window.location.href = "/CuttingReturn/CuttingReturnIndex";
                                var msg = 'Record saved successfully...';
                                var flg = 1;
                                var mod = 0;
                                var ur = "/CuttingReturn/CuttingReturnIndex";
                                AlartMessage(msg, flg, mod, ur);
                                //$('#tblcuttingreturnmaingrid').DataTable().destroy();            
                                //$('#tblinnergrid').DataTable().destroy();
                                //$('#myModal2').modal('hide');
                                //$('#myModal1').modal('hide');
                                //LoadData(companyid, OrderType, InterExter, fromdate, todate);
                            },
                            error: function (errormessage) {
                                alert(errormessage.responseText);
                            }
                        });
                    }
                });
            }
        });
    }
}

function Update() {
    debugger;
    //if ($('#optinnerwrkdiv').is(':checked')) { RetLocType = 'W'; }
    //else if ($('#optinnerprdunit').is(':checked')) { RetLocType = 'U'; }
    //else if ($('#optinnerstore').is(':checked')) { RetLocType = 'S'; }
    var isValid = true;

    if ($('#txtCanRefNo').val().trim() == "") {
        $('#txtCanRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtCanRefNo').css('border-color', 'lightgrey');
    }

    var ipretqty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].Returnqty > 0) {

            ipretqty = ipretqty + parseFloat(InnerDetailrecord[e].Returnqty);
        }

    });

    var ipissuqty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].Issueqty > 0) {

            ipissuqty = ipissuqty + parseFloat(InnerDetailrecord[e].Issueqty);
        }

    });

    var ipLossQty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].Lossqty > 0) {

            ipLossQty = ipLossQty + parseFloat(InnerDetailrecord[e].Lossqty);
        }

    });


    var ipCancelQty = 0;

    $.each(InnerDetailrecord, function (e) {
        if (InnerDetailrecord[e].CancelQty > 0) {

            ipCancelQty = ipCancelQty + parseFloat(InnerDetailrecord[e].CancelQty);
        }

    });

    var OpCancelQty = 0;

    $.each(OuterDetailrecord, function (e) {
        if (OuterDetailrecord[e].CancelQty > 0) {

            OpCancelQty = OpCancelQty +parseFloat( OuterDetailrecord[e].CancelQty);
        }

    });

    if (ipLossQty == 0) {

        if (ipretqty == 0 && ipCancelQty == 0) {
            //alert('Please Fill atleast one Return Qty or Cancel Qty..');
            var msg = 'Please Fill atleast one Return quantity or Cancel quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        }
    }



    if (ipCancelQty > 0) {
        if (OpCancelQty == 0) {
            //alert('Please Fill Output Cancel Qty..');
            var msg = 'Please Fill Output Cancel Quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        }
    }

    if (OpCancelQty > 0) {
        if (ipCancelQty == 0) {
            //alert('Please Fill Input Cancel Qty..');
            var msg = 'Please Fill Input Cancel Quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        }
    }

    //var sumwgt = parseFloat(ipretqty) + parseFloat(ipCancelQty);
    //var balwgt = InnerDetailrecord[0].RecQty;
    //if (sumwgt > balwgt) {
    //    //alert('Please Check Total Issue,Receipt,Return Weight..');
    //    var msg = 'Please Check Total Issue,Receipt,Return Weight...' + 'Balance weight - ' + balwgt;
    //    var flg = 4;
    //    var mod = 1;
    //    var ur = "";
    //    AlartMessage(msg, flg, mod, ur);
    //    isValid = false;
    //    return false;
    //}



    var sumwgt = parseFloat(ipretqty) + parseFloat(ipCancelQty);
    var balwgt = InnerDetailrecord[0].RecQty;
    if (sumwgt > balwgt) {
        //alert('Please Check Total Issue,Receipt,Return Weight..');
        var totbalwgt = balwgt + parseFloat(ValidateCuttingTolerance);

        if (sumwgt > totbalwgt) {
            var msg = 'Please Check Total Issue,Receipt,Return Weight...' + 'Balance weight - ' + balwgt;
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            isValid = false;
            return false;
        } else if (sumwgt <= totbalwgt) {
            var ans = confirm("Are you sure you want to Return Balance + Tolerance? " + "Balance weight - " + balwgt);
            if (ans) {

            } else {
                isValid = false;
                return false;
            }
        }
    }



    //var SumBalanceqty = 0;

    //$.each(InnerDetailrecord, function (e) {
    //    if (InnerDetailrecord[e].Balanceqty > 0) {

    //        SumBalanceqty = SumBalanceqty + parseFloat(InnerDetailrecord[e].Balanceqty);
    //    }

    //});

    //var totret = parseFloat(ipretqty) + parseFloat(ipCancelQty);
    //var TotRecqty = InnerDetailrecord[0].RecQty;
    //var bal = parseFloat(SumBalanceqty) - parseFloat(TotRecqty);
    //if (bal < totret) {
    //    alert('Please Check Receipt Qty...');
    //    isValid = false;
    //    return false;
    //}
    //if (ipissuqty == 0) {
    //    alert('Please Fill atleast one Return Qty..');
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();

    if (isValid) {

        $.each(OuterDetailrecord, function (e) {
            debugger;
            InnerDetailrecord.push(OuterDetailrecord[e]);
        });

        var CuttingReturnObj = {
            CuttingOrdid: CuttingOrderId,
            CuttingReturnid: CuttReturnId,
            Cuttingissueid: CuttingIssueId,
            CuttingReturnNo: $('#txtReturnno').val(),
            CuttingReturnDate: $('#txtReturnDate').val(),
            Remarks: $('#txtinnerrem').val(),
            ToLocation: storeunitid,

            Cutting_Cancel_no: $('#txtCancelno').val(),
            Cutting_Cancel_date: $('#txtCancelDate').val(),
            Cancel_Ref_no: $('#txtCanRefNo').val(),
            Cancel_Ref_date: $('#txtCancelrefDate').val(),


            RetLocType: MSType,
            createdby: Guserid,
            CuttingReturnDetail: InnerDetailrecord,
            WstageList: CuttingWastedet
        };
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/CuttingReturn/Update",
            data: JSON.stringify(CuttingReturnObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                AddUserEntryLog('Production', 'Cutting Return', 'UPDATE', $("#txtReturnno").val());
                //alert("Record updated successfully...");
                var msg = 'Record updated successfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/CuttingReturn/CuttingReturnIndex";
                AlartMessage(msg, flg, mod, ur);
                CuttReturnId = 0;
                //$('#myModal2').modal('hide');
                //$('#myModal1').modal('hide');
                //$('#tblcuttingreturnmaingrid').DataTable().destroy();

                //LoadData(companyid, OrderType, InterExter, fromdate, todate);

                //window.location.href = "/CuttingReturn/CuttingReturnIndex";
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function LoadInnerGrid(innerlist) {
    $('#tblinnergrid').DataTable({
        data: innerlist,
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
                 { title: "ID", data: "CuttingIssueId", "visible": false },
                  { title: "CuttingIssueDetid", data: "CuttingIssueDetid", "visible": false },
                 { title: "CuttingIssueStckId", data: "CuttingIssueStckid", "visible": false },
                 { title: "CuttingReturnDetId", data: "CuttingReturnDetId", "visible": false },
                 { title: "Itemid", data: "Itemid", "visible": false },
                 { title: "Colorid", data: "Colorid", "visible": false },
                 { title: "Sizeid", data: "Sizeid", "visible": false },
                 { title: "Item", data: "Item" },
                 { title: "Color", data: "Color" },
                 { title: "Size", data: "Size" },
                 { title: "UOM", data: "Uom" },
                 { title: "Iss Qty", data: "Issueqty" },
                 { title: "Bal Qty", data: "Balanceqty" },
                 {
                     title: "Ret Qty", data: "Returnqty",
                     render: function (data) {
                         return '<input type="text" id="txtretqty" class="form-control txtretqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 {
                     title: "Wastage Qty", data: "Lossqty",
                     render: function (data) {
                         return '<input type="text" id="txtlossqty" class="form-control txtlossqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                 {
                     title: "Allo Qty", data: "Allotedqty",
                     render: function (data) {
                         return '<input type="text" id="txtAlloqty" class="form-control txtAlloqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }, "visible": false
                 },
                  {
                      title: "Cancel Qty", data: "CancelQty",
                      render: function (data) {
                          return '<input type="text" id="txtCanqty" class="form-control txtCanqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                      }
                  },
                   {
                       title: "Sec Qty", data: "Secqty",
                       render: function (data) {
                           return '<input type="text" id="txtSecqty" class="form-control txtSecqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                       }
                   },

                 //{
                 //    title: "ACTION", "mDataProp": null,
                 //    "sDefaultContent": '<button type="button" type="button" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnordadd btn btn-round btn-success" > <i class="fa fa-plus"></i> </button>'
                 //}
        ]
    });

    $("#tblinnergrid tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblinnergrid tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function LoadOuterGrid(CuttingList) {
    debugger;
    var rowCount = $('#tbloutergrid tr').length;
    if (rowCount > 0) {
        $('#tbloutergrid').DataTable().destroy();
    }

    $('#tbloutergrid').DataTable({
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
                 { title: "CuttingOrdDetId", data: "CuttingOrdDetid", "visible": false },
                 { title: "ItemId", data: "Itemid", "visible": false },
                 { title: "ColorId", data: "Colorid", "visible": false },
                 { title: "Sizeid", data: "Sizeid", "visible": false },
                 { title: "Item", data: "Item" },
                 { title: "Color", data: "Color" },
                 { title: "Size", data: "Size" },
                 { title: "Order Qty", data: "OrdQty" },
                  { title: "Rec qty", data: "RecQty" },
                 { title: "Bal Qty", data: "Balanceqty" },
             
                 //{ title: "Gms/Pcs", data: "Grammage" },
            
                 {
                     title: "Cancel Qty", data: "CancelQty",
                     render: function (data) {
                         return '<input type="text" id="txtopcanqty" class="form-control txtopcanqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                     }
                 },
                  {
                      title: "Sec Qty", data: "Secqty",
                      render: function (data) {
                          return '<input type="text" id="txtopsecqty" class="form-control txtopsecqty" style="width: 50px;text-align: center;" value=' + data + ' >';
                      }
                  },
                 //{
                 //    title: "Weight", data: "Weight",
                 //    render: function (data) {
                 //        return '<input type="text" id="txtweight" class="form-control txtweight" disabled style="width: 50px;text-align: center;" value=' + data + ' >';
                 //    }
                 //},
               
        ]
    });

    $("#tbloutergrid tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tbloutergrid tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


function GenerateCuttingReturnNumber(table, column, compId, Docum) {
    debugger;
    table = "Cutting_Return_Mas",
    column = "CuttingReturnNo",
    compId = $('#ddlACompany').val(),
    Docum = 'CUTTING RETURN'
    companyid = compId;
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtReturnno').val(result.Value);
        }
    });
}



function GenerateCuttingCancelNumber() {
    debugger;
    table = "Cutting_Cancel_mas",
    column = "Cutting_Cancel_no",
    compId = $('#ddlACompany').val(),
    Docum = 'CUTTING CANCEL'
    companyid = compId;
    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtCancelno').val(result.Value);
        }
    });
}


//function LoadOrderNoDDL(AccessoryDDLName) {
//    AccessoryDDL = AccessoryDDLName;
//    httpGet("/Item/GetAccessoryItem", onAccessorySuccess, onAccessoryFailure);
//}


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


function LoadAddRet() {
    LoadCuttingOrderReceipt();
}

function LoadCuttingOrderReceipt() {
    debugger;
    var inputcount = 0;
    $('#tblinnercuttingreturn tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        //var tableinput = $('#tblinnergrid').DataTable();
        //tableinput.clear().draw();
        $('#tblinnercuttingreturn').DataTable().destroy();
    }

    //var OType = $('input[name="MIType"]:checked').attr('value');
    //var PType = $('input[name="PrType"]:checked').attr('value');

    var OType = $('input[name="MIType"]:checked').attr('value');

    var styid = $('select#ddlAstyle option:selected').val();
    if (styid == null || styid == "0") {
        styid = 0;
    }

    var ordNo = "";
    var ONo = $('select#ddlAOrderno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        ordNo == "";
    }
    else {

        ordNo = $('select#ddlAOrderno option:selected').text();
    }


    var RfNo = "";
    var Rn = $('select#ddlARefno option:selected').val();

    if (Rn == 0 || Rn == undefined) {
        RfNo == "";
    }
    else {

        RfNo = $('select#ddlARefno option:selected').text();
    }

    var compid = $('#ddlACompany option:selected').val();
    if (compid == undefined || compid == "0") {
        compid = 0;
    }

    var buyerid = $('#ddlABuyer option:selected').val();
    if (buyerid == undefined || buyerid == "0") {
        buyerid = 0;
    }

    var unitid = $('#ddlAunitno option:selected').val();
    if (unitid == undefined || unitid == "0") {
        unitid = 0;
    }

    var JobordNo = "";
    var JobordNo = $('#ddlAWorkOrdNo option:selected').val();

    if (JobordNo == "0" || JobordNo == undefined) {
        JobordNo = "";
    }
    else {

        JobordNo = $('select#ddlAWorkOrdNo option:selected').text();
    }

    var inorex = $('input[name="PrType"]:checked').attr('value');


    $.ajax({
        type: "POST",
        url: '/CuttingReturn/ListCuttingOrderReturn',
        //data: JSON.stringify({}),
        data: JSON.stringify({ CompanyId: compid, CompanyUnitId: unitid, OrdType: OType, refno: RfNo, styleid: styid, OrderNo: ordNo, buyerid: buyerid, jobordno: JobordNo, inorext: inorex }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            cuttinglist = json.Value;
            //$('#tblinnercuttingreceipt').Datatable().destroy();

            for (var f = 0; f < cuttinglist.length; f++) {
                cuttinglist[f].CuttingIssueDate = moment(cuttinglist[f]["CuttingIssueDate"]).format('DD/MM/YYYY');
                //ShipmentItemList[f].DelDate = moment(InvDetList[f]["DelDate"]).format('DD/MM/YYYY');
            }

            
            //cuttinglist.sort(function (a, b) {
            //    return a.Cuttingissueid - b.Cuttingissueid;
            //});

            $('#tblinnercuttingreturn').DataTable({
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
                         { title: "ID", data: "Cuttingissueid", "visible": false },
                         { title: "CutOrdID", data: "CuttingOrdid", "visible": false },
                         { title: "JobOrdNo", data: "JobOrderNo", "visible": false },
                         { title: "CutOrdNo", data: "CuttingOrderNo"},
                         { title: "Cut.Iss.No", data: "CuttingIssueNo", "visible": false },
                         { title: "Cut.Iss.Date", data: "CuttingIssueDate" },
                         { title: "Processor", data: "Processor" },
                         { title: "Style", data: "style" },
                         { title: "Issue Qty", data: "IssueQty" },
                         { title: "Balance", data: "Balance" },
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

function Close() {
    window.location.href = "/CuttingReturn/CuttingReturnIndex";
}

function LoadEmployeeStoreunit() {
    debugger;
    if (UserName == 'superuser') {
        LoginUserid = 0;
    }
    companyid = $('#ddlRCompany option:selected').val()

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
        companyid = $('#ddlRCompany option:selected').val()
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
}

function onUserCompanyFailure(result) {

    //alert('Company loading failed');
    var msg = 'Company loading failed...';
    var flg = 4;
    var mod = 1;
    var ur = "";
    AlartMessage(msg, flg, mod, ur);
}


function CheckAlloted() {

    var Recpno = $('#txtReturnno').val();

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
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
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