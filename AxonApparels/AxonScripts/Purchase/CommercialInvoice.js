var InvDetList = [];
var Invrowindex = -1;
var Masid = 0;
var Companyid = 0;
var Mod = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkStyle = true;
var ChkEntNo = true;
var ChkJobNo = true;
var ChkComp = false;
var ChkBillNo = 0;
var AccList = [];
var MOrd = 0;
var MCom = 0;
var MSty = 0;
var MRef = 0;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    LoadCompanyDDL('#ddlCompany,#ddlmaincomp');
    LoadOrderNoDDL('#ddlmainordno,#ddlAOrderNo');
    LoadStyleDDL('#ddlStyle,#ddlmainstyle,#ddlAStyle');
    LoadJobNoDDL('#ddlJoborder');
    LoadRefNoDDL('#ddlmainrefno,#ddlARefno');
    LoadSupplierDDL("#ddlSupplier,#ddlMSupplier");
    LoadOverhdsDDL("#ddlAcommercial");

    ChkBillNo = $("#hdncheckBillsToInvoiceEntry").data('value');
    // LoadBulkJobNoDDL('#ddlJoborder');
    loadEntryNoDDL();
    LoadMaingrid();
    LoadAddlessDDL("#ddlAcc");
    loadentrynoddl();

    $('#btninvadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;
        if ($('#ddlType').val() == "0") {

            $('#ddlType').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#ddlType').siblings(".select2-container").css('border', '1px solid lightgrey');
        }


        if ($('#txtSales').val().trim() == "") {
            $('#txtSales').css('border-color', 'Red');
            isAllValid = false;
        }
        else {
            $('#txtSales').css('border-color', 'lightgrey');
        }

        if ($('#txtInvoiceNo').val().trim() == "") {
            $('#txtInvoiceNo').css('border-color', 'Red');
            isAllValid = false;
        }
        else {
            $('#txtInvoiceNo').css('border-color', 'lightgrey');
        }
        if ($('#txtInvoiceDate').val().trim() == "") {
            $('#txtInvoiceDate').css('border-color', 'Red');
            isAllValid = false;
        }
        else {
            $('#txtInvoiceDate').css('border-color', 'lightgrey');
        }
        var dt = $('#txtInvoiceDate').val();

        var aDate = moment(dt, 'DD/MM/YYYY', true);
        var isAllValid = aDate.isValid();
        if (!aDate.isValid()) {
            $('#txtInvoiceDate').css('border-color', 'Red');
        }


        if (isAllValid) {

            var ListObj = {
                Sales: $('#txtSales').val(),
                Type: $("#ddlType option:selected").val(),
                SalesType: $("#ddlType option:selected").text(),
                SecondSales: $('#txtSecondSales').val(),
                InvoiceNo: $('#txtInvoiceNo').val(),
                InvoiceDate: $('#txtInvoiceDate').val(),
                SalesInvDetid: 0,
                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            InvDetList.push(ListObj);

            loadDetTable(InvDetList);
            ClearDet();

        }
    });

    $('#btnAddLoad').click(function () {

        AddLoadData();

    });
    
    $(document).on('keyup', '.txtamt', function () {
        debugger;
        var table = $('#tblInvdetails').DataTable();

        var OrderNo = table.row($(this).parents('tr')).data()["OrderNo"];
        var Styleid = table.row($(this).parents('tr')).data()["Styleid"];
        var Commercialid = table.row($(this).parents('tr')).data()["Commercialid"];
        var Balancecost = table.row($(this).parents('tr')).data()["Balancecost"];

        var amt = $(this).val();

        if (Balancecost < amt) {
            amt = Balancecost;
        }

        $.each(InvDetList, function (e) {
            if (InvDetList[e].OrderNo == OrderNo && InvDetList[e].Styleid == Styleid && InvDetList[e].Commercialid == Commercialid) {
                InvDetList[e].Amount = amt;
            }
        });


        var otable = $('#tblInvdetails').DataTable();
        var odata = otable.rows().data();

        $('input[id=txtamt]').each(function (ig) {
            if (odata[ig].OrderNo == OrderNo && odata[ig].Styleid == Styleid && odata[ig].Commercialid == Commercialid) {
                var row = $(this).closest('tr');
                row.find('#txtamt').val(amt);
            }
        });

        LoadNetGrossAmt();

    });


});
function getbyEditID(id) {
    Mod = 1;
    getbyID(id);
    if (ChkBillNo == "True") {
        $('#dptInvId').show();
        $('#txtInvId').hide();
        $('#optNewBill').show();
    } else {
        $('#txtInvId').show();
        $('#dptInvId').hide();
        $('#optNewBill').hide();
    }

}
function getbyDeleteID(id) {
    Mod = 2;
    getbyID(id);
    if (ChkBillNo == "True") {
        $('#dptInvId').show();
        $('#txtInvId').hide();
        $('#optNewBill').show();
    } else {
        $('#txtInvId').show();
        $('#dptInvId').hide();
        $('#optNewBill').hide();
    }
}

function ClearDet() {
    $('#txtSales').val("");
    // $('#txtSecondSales').val("");
    $('#txtInvoiceNo').val("");
    $('#txtInvoiceDate').val("");
    //$('#ddlType').val("");
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
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtEntryDate').val(Fdatestring);
    $('#txtBReqDate').val(Fdatestring);
    $('#txtInvoiceDate').val(Fdatestring);


}

function loadDetTable(InvDetList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblInvdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblInvdetails').DataTable().destroy();
    }
    $('#tblInvdetails').empty();

    $('#tblInvdetails').DataTable({

        data: InvDetList,
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
        { title: "Detid", data: "Invdetid", "visible": false },
        { title: "Commercialid", data: "Commercialid", "visible": false },
        { title: "Commercial", data: "Commercial" },
        { title: "Orderno", data: "OrderNo" },
        { title: "Refno", data: "Refno" },
        { title: "Styleid", data: "Styleid", "visible": false },
        { title: "Style", data: "Style" },
         { title: "Total", data: "Totalcost" },
          { title: "Balance", data: "Balancecost" },
           //{ title: "Amount", data: "Amount" },
           {
               title: "Amount", data: "Amount",
               render: function (data) {

                   return '<input type="text" id="txtamt" class="txtamt form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

               },
           },

        ]
    });


    $("#tblInvdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblInvdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

    LoadNetGrossAmt();
}

function clickonlist() {
    //ChkRefno = true;
    //ChkOrdno = true;
    //DtChk = false;
    //ChkStyle = true;
    //ChkEntNo = true;
    //ChkJobNo = true;
    //ChkComp = false;
    //loaddata();
    LoadMaingrid();

}
//function CMainList() {
//    ChkRefno = true;
//    ChkOrdno = true;
//    DtChk = false;
//    ChkStyle = true;
//    ChkEntNo = true;
//    ChkJobNo = true;
//    ChkComp = true;
//    loaddata();

//}
//function OMainList() {
//    ChkRefno = false;
//    ChkOrdno = false;
//    DtChk = false;
//    ChkStyle = true;
//    ChkEntNo = true;
//    ChkJobNo = true;
//    ChkComp = false;
//    loaddata();

//}
//function SMainList() {
//    ChkRefno = false;
//    ChkOrdno = false;
//    DtChk = false;
//    ChkStyle = false;
//    ChkEntNo = true;
//    ChkJobNo = true;
//    ChkComp = false;
//    loaddata();

//}
//function EMainList() {
//    ChkRefno = false;
//    ChkOrdno = false;
//    DtChk = false;
//    ChkStyle = false;
//    ChkEntNo = false;
//    ChkJobNo = false;
//    ChkComp = false;
//    loaddata();

//}
//function JMainList() {
//    ChkRefno = false;
//    ChkOrdno = false;
//    DtChk = false;
//    ChkStyle = false;
//    ChkEntNo = true;
//    ChkJobNo = false;
//    ChkComp = false;
//    loaddata();

//}

function Add() {

    var isAllValid = true;


    if ($('#ddlCompany').val() == "0") {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#txtEntryNo').val().trim() == "") {
        $('#txtEntryNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryNo').css('border-color', 'lightgrey');
    }


    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }

    if (InvDetList.length == 0) {

        //alert("Please Check Invoice Details..");
        var msg = 'Please Check Invoice Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#ddlInvoiceNo').val();
    }


    if (isAllValid) {
        debugger;
        Companyid = $("#ddlCompany option:selected").val();
        table = "Commercial_Invmas",
        column = "EntryNo",
        compId = Companyid,
        Docum = 'COMMERCIAL INVOICE'

        var oldEntryNo = $('#txtEntryNo').val();
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
                    var msg = 'Entry Number has been changed...';
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    $('#txtEntryNo').val(result.Value);
                }
                var objSubmit = {
                    Invmasid : 0,
                    EntryNo: $('#txtEntryNo').val(),
                    EntryDate: $('#txtEntryDate').val(),
                    Companyid: $("#ddlCompany option:selected").val(),
                    Invoiceno: InvBillNo,
                    Invoicedate: $('#txtInvoiceDate').val(),
                    Remarks: $('#txtremarks').val(),
                    TotalAmt: $('#txtGrossAmount').val(),
                    Supplierid: $("#ddlSupplier option:selected").val(),
                    NetAmt: $('#txtNetAmount').val(),
                    CreatedBy: Guserid,
                    Commercial_Invdet: InvDetList,
                    CommercialInvoice_Addless:AccList,
                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/CommercialInvoice/Add",
                    data: JSON.stringify(objSubmit),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == true) {


                            if (ChkBillNo == 'True') {
                                AddInvBillNo("Y");
                            }


                            AddUserEntryLog('Purchase', 'CommercialInvoice', 'ADD', $("#txtEntryNo").val());
                            //alert("CommercialInvoice Saved Sucessfully");
                            //window.location.href = "/CommercialInvoice/CommercialInvoiceIndex";
                            var msg = 'CommercialInvoice Saved Sucessfully...';
                            var flg = 1;
                            var mod = 0;
                            var url = "/CommercialInvoice/CommercialInvoiceIndex";
                            AlartMessage(msg, flg, mod, url);
                        } else {

                            window.location.href = "/Error/Index";


                        }

                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                    }
                });
            }
        });
    }
}

function AddInvBillNo(MType) {
    debugger;
    var billId = $('#ddlInvoiceNo option:selected').val();
    var EntryNo = $('#txtEntryNo').val();
    $.ajax({
        url: "/ProcessInvoice/BillAdd",
        data: JSON.stringify({ billId: billId, EntryNo: EntryNo, MType: MType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {


            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {

    var isAllValid = true;


    if ($('#ddlCompany').val() == "0") {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#txtEntryNo').val().trim() == "") {
        $('#txtEntryNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryNo').css('border-color', 'lightgrey');
    }


    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }

    if (InvDetList.length == 0) {

        //alert("Please Check Invoice Details..");
        var msg = 'Please Check Invoice Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }

    var InvBillNo = 0;

    if (ChkBillNo == 'True') {

        var CNetAmt = $('#txtNetAmount').val();

        if (CNetAmt != GBillAmount) {
            //alert("Bill Amount Should Match With Net Amount..");
            var msg = 'Bill Amount Should Match With Net Amount...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        InvBillNo = $('#ddlInvoiceNo option:selected').text();
    } else {

        InvBillNo = $('#ddlInvoiceNo').val();
    }

    if (isAllValid) {
       
                var objSubmit = {
                    Invmasid: Masid,
                    EntryNo: $('#txtEntryNo').val(),
                    EntryDate: $('#txtEntryDate').val(),
                    Companyid: $("#ddlCompany option:selected").val(),
                    Invoiceno: InvBillNo,
                    Invoicedate: $('#txtInvoiceDate').val(),
                    Remarks: $('#txtremarks').val(),
                    TotalAmt: $('#txtGrossAmount').val(),
                    Supplierid: $("#ddlSupplier option:selected").val(),
                    NetAmt: $('#txtNetAmount').val(),
                    CreatedBy: Guserid,
                    Commercial_Invdet: InvDetList,
                    CommercialInvoice_Addless: AccList,
                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/CommercialInvoice/Update",
                    data: JSON.stringify(objSubmit),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == true) {

                            if (ChkBillNo == 'True') {
                                AddInvBillNo("Y");
                            }
                            AddUserEntryLog('Purchase', 'CommercialInvoice', 'Update', $("#txtEntryNo").val());
                            //alert("CommercialInvoice Update Sucessfully");
                            //window.location.href = "/CommercialInvoice/CommercialInvoiceIndex";
                            var msg = 'CommercialInvoice Update Sucessfully...';
                            var flg = 1;
                            var mod = 0;
                            var url = "/CommercialInvoice/CommercialInvoiceIndex";
                            AlartMessage(msg, flg, mod, url);
                        } else {

                            window.location.href = "/Error/Index";
                        }

                    },
                    error: function (errormessage) {

                        alert(errormessage.responseText);
                    }
                });
         
    }
}

function Delete() {

    var isAllValid = true;


    if ($('#ddlCompany').val() == "0") {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#txtEntryNo').val().trim() == "") {
        $('#txtEntryNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryNo').css('border-color', 'lightgrey');
    }


    if ($('#txtEntryDate').val().trim() == "") {
        $('#txtEntryDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtEntryDate').css('border-color', 'lightgrey');
    }

    if (InvDetList.length == 0) {

        //alert("Please Check Invoice Details..");
        var msg = 'Please Check Invoice Details...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return true;
    }



    if (isAllValid) {
        var objSubmit = {
            Invmasid: Masid,
            EntryNo: $('#txtEntryNo').val(),
            EntryDate: $('#txtEntryDate').val(),
            Companyid: $("#ddlCompany option:selected").val(),
            Invoiceno: $("#ddlInvoiceNo option:selected").text(),
            Invoicedate: $('#txtInvoiceDate').val(),
            Remarks: $('#txtremarks').val(),
            TotalAmt: $('#txtGrossAmount').val(),
            Supplierid: $("#ddlSupplier option:selected").val(),
            NetAmt: $('#txtNetAmount').val(),
            Commercial_Invdet: InvDetList,
            CommercialInvoice_Addless: AccList,
        };
        $("#btnAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/CommercialInvoice/Delete",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    if (ChkBillNo == 'True') {
                        AddInvBillNo("N");
                    }
                    AddUserEntryLog('Purchase', 'CommercialInvoice', 'Delete', $("#txtEntryNo").val());
                    //alert("CommercialInvoice Deleted Sucessfully");
                    //window.location.href = "/CommercialInvoice/CommercialInvoiceIndex";
                    var msg = 'CommercialInvoice Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var url = "/CommercialInvoice/CommercialInvoiceIndex";
                    AlartMessage(msg, flg, mod, url);
                } else {
                    window.location.href = "/Error/Index";
                }

            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });

    }
}


function getbyID(ID) {
    debugger;
    Mod = 1;
    $.ajax({
        url: "/CommercialInvoice/LoadMasedit/",
        data: JSON.stringify({ Masid: ID }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {


                $('#txtEntryNo').val(obj[0]["EntryNo"]);
                $('#ddlCompany').val(obj[0]["Companyid"]).trigger('change');
                $('#ddlSupplier').val(obj[0]["Supplierid"]).trigger('change');
                $('#txtremarks').val(obj[0]["Remarks"]);
                $('#txtEntryDate').val(moment(obj[0]["EntryDate"]).format('DD/MM/YYYY'));
                Masid = obj[0]["Invmasid"];
                $('#btnAddLoad').attr('disabled', true);

                if (ChkBillNo == "True") {
                    $('#dptInvId').show();
                    $('#txtInvId').hide();
                    $('#optNewBill').show();
                } else {
                    $('#txtInvId').show();
                    $('#dptInvId').hide();
                    $('#optNewBill').hide();
                }
                var cid = obj[0]["Companyid"];
                var sid = obj[0]["Supplierid"];
                EditLoadBillInvNoAmt(cid, sid);

                if (Mod == 1) {
                    $('#btnDeleter').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();

                }
                else {
                    $('#btnDeleter').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();

                }
                Loaddet(ID);
                Getaddlsdet(ID)
            }

            $('#myModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function GetDelete(ID) {
    debugger;
    Mod = 2;
    $.ajax({
        url: "/CommercialInvoice/LoadMasedit/",
        data: JSON.stringify({ Masid: ID }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {


                $('#txtEntryNo').val(obj[0]["EntryNo"]);
                $('#ddlCompany').val(obj[0]["Companyid"]).trigger('change');
                $('#ddlSupplier').val(obj[0]["Supplierid"]).trigger('change');
                $('#txtremarks').val(obj[0]["Remarks"]);
                $('#txtEntryDate').val(moment(obj[0]["EntryDate"]).format('DD/MM/YYYY'));
                Masid = obj[0]["Invmasid"];

                if (ChkBillNo == "True") {
                    $('#dptInvId').show();
                    $('#txtInvId').hide();
                    $('#optNewBill').show();
                } else {
                    $('#txtInvId').show();
                    $('#dptInvId').hide();
                    $('#optNewBill').hide();
                }
                var cid = obj[0]["Companyid"];
                var sid = obj[0]["Supplierid"];
                EditLoadBillInvNoAmt(cid, sid);

                if (Mod == 1) {
                    $('#btnDeleter').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();

                }
                else {
                    $('#btnDeleter').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();

                }
                Loaddet(ID);
                Getaddlsdet(ID)
            }

            $('#myModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Loaddet(ID) {
    debugger;

    $.ajax({
        url: "/CommercialInvoice/LoadDetedit/",
        data: JSON.stringify({ Masid: ID }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //var obj = result.Value;
            //debugger;
            InvDetList = (result.Value);

            //for (var f = 0; f < InvDetList.length; f++) {
            //    InvDetList[f].InvoiceDate = moment(InvDetList[f]["InvoiceDate"]).format('DD/MM/YYYY');
            //    //ShipmentItemList[f].DelDate = moment(InvDetList[f]["DelDate"]).format('DD/MM/YYYY');
            //}


            loadDetTable(InvDetList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Getaddlsdet(Invid) {
    debugger;
    $.ajax({
        url: "/CommercialInvoice/LoadAddlessedit",
        async: false,
        data: JSON.stringify({ Masid: Invid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            AccList = result.Value;
            loadAccTable(AccList);

            LoadNetGrossAmt();
        }
    });
}



function loadEntryNoDDL() {
    debugger;
    $.ajax({
        url: "/SalesInvoice/GetMainDDL",
        // data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                debugger;
                var data = result.Value;
                //EntryNo
                $(ddlmainentryno).empty();
                $(ddlmainentryno).append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(data, function () {
                    $(ddlmainentryno).append($('<option></option>').val(this.SalesInvMasid).text(this.EntryNo));
                });
            }
        }
    });
}


var table, column, compId, Docum;
function GenerateNumber() {
    debugger;
    Companyid = $("#ddlCompany option:selected").val();
    table = "Commercial_Invmas",
    column = "EntryNo",
    compId = Companyid,
    Docum = 'COMMERCIAL INVOICE'

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtEntryNo').val(result.Value);
        }
    });
}

function clearTextBox() {
    ClearDet();
    Mod = 0;
    $('#myModal').modal('show');
    if (ChkBillNo == "True") {
        $('#dptInvId').show();
        $('#txtInvId').hide();
        $('#optNewBill').show();
    } else {
        $('#txtInvId').show();
        $('#dptInvId').hide();
        $('#optNewBill').hide();
    }
    GenerateNumber();
    InvDetList = [];
    loadDetTable(InvDetList);
}

function LoadOrderwise() {
    debugger;
    if (Mod == 0) {
        var BMasId = $('#ddlOrderNo').val();
        var JbId = 0;
        var StyId = 0;
        var Refid = 0;
        $.ajax({
            url: "/GroupProcessOrder/GetGroupDropdwon",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;

                    ////OrdNo
                    //$(ddlOrderNo).empty();
                    //$(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    //$.each(data, function () {
                    //    $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                    //});

                    ////RefNo
                    //$(ddlrefno).empty();
                    //$(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    //$.each(data, function () {
                    //    $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                    //});

                    //JobNo
                    $(ddlJoborder).empty();
                    $(ddlJoborder).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlJoborder).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    $(ddlStyle).empty();
                    $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }
}

function LoadRefwise() {
    debugger;
    if (Mod == 0) {
        var BMasId = 0;
        var JbId = 0;
        var StyId = 0;
        var Refid = $('select#ddlRefno option:selected').val();

        $.ajax({
            url: "/GroupProcessOrder/GetGroupDropdwon",
            data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: Refid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                var obj = result.Value;
                if (result.Status == 'SUCCESS') {
                    debugger;
                    var data = result.Value;


                    //OrdNo
                    $(ddlOrderNo).empty();
                    $(ddlOrderNo).append($('<option/>').val('0').text('--Select OrderNo--'));
                    $.each(data, function () {
                        $(ddlOrderNo).append($('<option></option>').val(this.BMasId).text(this.Buy_Ord_no));
                    });

                    ////RefNo
                    //$(ddlrefno).empty();
                    //$(ddlrefno).append($('<option/>').val('0').text('--Select RefNo--'));
                    //$.each(data, function () {
                    //    $(ddlrefno).append($('<option></option>').val(this.BMasId).text(this.RefNo));
                    //});

                    //JobNo
                    $(ddlJoborder).empty();
                    $(ddlJoborder).append($('<option/>').val('0').text('--Select JobNo--'));
                    $.each(data, function () {
                        $(ddlJoborder).append($('<option></option>').val(this.JobId).text(this.Job_Ord_no));
                    });

                    //Style
                    $(ddlStyle).empty();
                    $(ddlStyle).append($('<option/>').val('0').text('--Select Style--'));
                    $.each(data, function () {
                        $(ddlStyle).append($('<option></option>').val(this.Styleid).text(this.Style));
                    });
                }


            }

        });
    }

}

function chkcmpnyid() {
   
    if (Mod == 0) {
        CompanyId = $('select#ddlCompany option:selected').val();
        if (CompanyId == 0) {
            //alert('Select Company...');
            var msg = 'Select Company...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
        else {
            GenerateNumber();
        }
    }

}

function changeSupllier() {
    debugger;
    chkcmpnyid();
    if (Mod == 0) {
        CompanyId = $('select#ddlCompany option:selected').val();
        var SupId = $('select#ddlSupplier option:selected').val();
        LoadBillInvNo(CompanyId, SupId);
    }

}

function LoadBillInvNo(comid, suppid) {

    var EDate = $('#txtEntryDate').val();
    var billid = 0;
    CompanyId = $('select#ddlCompany option:selected').val();
    var SupId = $('select#ddlSupplier option:selected').val();


    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: CompanyId, SupplierId: SupId, Inv_Date: EDate, BillId: billid, IorE: 'E' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            //GBillAmount = obj[0]["Inv_Amount"];
            //GBillDate = obj[0]["Inv_Date"];


            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNo).empty();

                $(ddlInvoiceNo).append($('<option/>').val('0').text('--Select Bill No--'));
                $.each(data, function () {
                    $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });

            }
        }

    });

}

function LoadBillInvNoAmt() {
    debugger;
    var EDate = $('#txtEntryDate').val();
    var billid = $('select#ddlInvoiceNo option:selected').val();//$('#ddlInvoiceNo').val();

    CompanyId = $('select#ddlCompany option:selected').val();
    var SupId = $('select#ddlSupplier option:selected').val();

    $.ajax({
        url: "/ProcessInvoice/GetBillInvNo",
        data: JSON.stringify({ CompanyId: CompanyId, SupplierId: SupId, Inv_Date: EDate, BillId: billid, IorE: 'E' }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (obj != undefined) {

                if (billid > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                    $('#txtInvoiceDate').val(GBillDate);
                }
                else {
                    GBillAmount = 0;
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = "";
                    $('#txtInvoiceDate').val(GBillDate);
                }
            }
            else {

            }

        }

    });

}

function EditLoadBillInvNoAmt(GCompId, GSuppId) {
    debugger;
    var EDate = $('#txtEntryDate').val();
    var entryno = $('#txtEntryNo').val();//$('#ddlInvoiceNo').val();
    CompanyId = $('select#ddlCompany option:selected').val();
    var SupId = $('select#ddlSupplier option:selected').val();

    $.ajax({
        url: "/ProcessInvoice/GetEditBillInvNo",
        data: JSON.stringify({ CompanyId: CompanyId, SupplierId: SupId, Inv_Date: EDate, Entry_No: entryno }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlInvoiceNo).empty();
                $.each(data, function () {
                    $(ddlInvoiceNo).append($('<option></option>').val(this.BillId).text(this.Inv_No));
                });
                if (obj.length > 0) {
                    GBillAmount = obj[0]["Inv_Amount"];
                    $('#txtInvoiceAmt').val(GBillAmount);
                    GBillDate = (moment(obj[0]["Inv_Date"]).format('DD/MM/YYYY'));
                    $('#txtInvoiceDate').val(GBillDate);
                }
            }

        }

    });

}

function LoadNewBill() {
    CompanyId = $('select#ddlCompany option:selected').val();
    var SupId = $('select#ddlSupplier option:selected').val();
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#chkbillStatus').is(":checked");
        if (ischecked == true) {
            LoadBillInvNo(CompanyId, SupId);
        }
        else {
            EditLoadBillInvNoAmt(CompanyId, SupId);
        }
    });
}

$(document).ready(function () {

    //component details
    $('#btnImadd').click(function () {
        debugger;

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlAcc').val() == "0") {
            isAllValid = false;
            $('#ddlAcc').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#ddlAcc').siblings('span.error').css('visibility', 'hidden');
        }


        if (AccList.length == 0) {
            leng = 1;
        }
        else {
            leng = AccList.length + 1;
        }

        AcSno = leng;


        var DecimalPlace = 2;
        //$.each(ESaveItemList, function (i) {
        //    DecimalPlace = ESaveItemList[i].DecimalPlace;
        //});
        if (DecimalPlace > 0) {

        }
        else {
            DecimalPlace = 2;
        }
        var amt = $('#txtAmount').val();
        amt = parseFloat(amt).toFixed(DecimalPlace);

        if (isAllValid) {


            debugger;
            var AcListObj = {
                AddLess: $("#ddlAcc option:selected").text(),
                addlessid: $('#ddlAcc option:selected').val(),
                AorL: $('#txtPorMins').val(),
                Percentage: $('#txtPer').val(),
                //amount: $('#txtAmount').val(),
                Amount: amt,
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            AccList.push(AcListObj);

            loadAccTable(AcListObj);

            var totalAccamnt = 0;
            for (var e = 0; e < AccList.length; e++) {
                var amount = AccList[e].Amount;
                totalAccamnt = totalAccamnt + parseFloat(amount);

            }

            LoadNetGrossAmt();
            fnClearAccControls();

        }
    });

    $(document).on('click', '.btnaccedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = AccList.slice(rowindex);

        $('#ddlAcc').val(currentro12[0]['addless_id']);
        $('#txtPorMins').val(currentro12[0]['AorL']);
        $('#txtPer').val(currentro12[0]['Percentage']);
        $('#txtAmount').val(currentro12[0]['Amount']);

        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });



    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = AccList.slice(rowindex);

        currentrowsel[0]['addlessid'] = $("#ddlAcc option:selected").val();
        currentrowsel[0]['AddLess'] = $("#ddlAcc option:selected").text();
        currentrowsel[0]['AorL'] = $("#txtPorMins").val();
        currentrowsel[0]['Percentage'] = $("#txtPer").val();


        var DecimalPlace =2;
        //$.each(ESaveItemList, function (i) {
        //    DecimalPlace = ESaveItemList[i].DecimalPlace;
        //});
        if (DecimalPlace > 0) {

        }
        else {
            DecimalPlace = 2;
        }
        var amt = $('#txtAmount').val();
        amt = parseFloat(amt).toFixed(DecimalPlace);

        currentrowsel[0]['Amount'] = amt;

        //  currentrowsel[0]['amount'] = $("#txtAmount").val();

        AccList[rowindex] = currentrowsel[0];

        loadAccTable(AccList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        if (Mode == 0) {
            fnClearAccControls();
        }
        else {
            fnClearAccControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnaccremove', function () {
        rowindex = $(this).closest('tr').index();
        AccList.splice(rowindex, 1);
        document.getElementById("tblPaydetails").deleteRow(rowindex + 1);
        LoadNetGrossAmt();
    });
    //

});

function LoadMaingrid() {
    debugger;


    //var invtype = $('input[name="optwrkord"]:checked').attr('value');
    //var InorEx = $('input[name="optEx"]:checked').attr('value');

    var OrdNo = "";
    var ONo = $('select#ddlmainordno option:selected').val();

    if (ONo == 0 || ONo == undefined) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlmainordno option:selected').text();
    }


    var refNo = "";
    var Rno = $('select#ddlmainrefno option:selected').val();

    if (Rno == 0 || Rno == undefined) {
        refNo == "";
    }
    else {

        refNo = $('select#ddlmainrefno option:selected').text();
    }

    var masid = "";
    var enno = $('select#ddlmainentryno option:selected').val();

    if (enno == 0 || enno == undefined) {
        masid == 0;
    }
    else {

        masid = $('select#ddlmainentryno option:selected').val();
    }


    var styid = "";
    var stno = $('select#ddlmainstyle option:selected').val();

    if (stno == 0 || stno == undefined) {
        styid == 0;
    }
    else {

        styid = $('select#ddlmainstyle option:selected').val();
    }

    var supid = "";
    var spno = $('select#ddlMSupplier option:selected').val();

    if (spno == 0 || spno == undefined) {
        supid == 0;
    }
    else {

        supid = $('select#ddlMSupplier option:selected').val();
    }

    var CompId = $('#ddlmaincomp').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlmaincomp').val();
    }

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        url: "/CommercialInvoice/GetMainDetails",
        data: JSON.stringify({ compid: CompId, suppid: supid, orderno: OrdNo, invid: masid, fromDate: FDate, todate: TDate, refno: refNo, styleid: styid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tbody').DataTable().destroy();
            }

            $('#tbody').DataTable({
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
                         { title: "InvoiceID", "visible": false },
                         { title: "Company" },
                         { title: "Supplier" },
                         { title: "Supp BillNo" },
                         { title: "Date" },
                         { title: "Invoice No" },
                          { title: "Action" },
                ]

            });

            $(document).ready(function () {
                var table = $('#tblbillmaingrid').DataTable();

                $('#tblbillmaingrid tbody').on('click', 'tr', function () {
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

function LoadPlusAdd() {
    $('#txtPorMins').val("");
    var AccID = $('#ddlAcc').val();

    $.ajax({
        url: "/AccountHeads/GetbyID/" + AccID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtPorMins').val(obj.AddlessType);

            }
        }

    });

}

function LoadNetAmount() {
    debugger;
    var Per = $('#txtPer').val();
    var GrossAmt = $('#txtGrossAmount').val();
    var Amt = (Per * GrossAmt) / 100;
    $('#txtAmount').val(parseFloat(Amt).toFixed(2));
}

function loadAccTable(AcListObj) {
    debugger;
    $('#tblPaydetails').DataTable().destroy();

    $('#tblPaydetails').DataTable({
        data: AccList,

        columns: [

               { title: "AddlessId", data: "addlessid", "visible": false },
               { title: "Accounts Head", data: "AddLess", },
               { title: "+/-", data: "AorL", },
               { title: "Percent", data: "Percentage", },
               { title: "Amount", data: "Amount", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnaccremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div> '

               },

        ]
    });

    var totalamnt = 0;
    for (var e = 0; e < AccList.length; e++) {
        var amount = AccList[e].Amount;
        totalamnt = totalamnt + parseFloat(amount);

    }

    LoadNetGrossAmt();
}

function fnClearAccControls() {
    $('#ddlAcc').val('0').trigger('change');
    $('#txtPorMins').val('');
    $('#txtPer').val('');
    $('#txtAmount').val('');
}
function LoadNetGrossAmt() {
    debugger;
    var TotNetAmt = 0;
    var TotGrossAmt = 0;
    var DecimalPlace = 0;
    $.each(InvDetList, function (i) {
        var InvAmt = InvDetList[i].Amount;
        TotGrossAmt = parseFloat(TotGrossAmt) + parseFloat(InvAmt);
        DecimalPlace = 2;
    });
    if (DecimalPlace > 0) {

    } else {
        DecimalPlace = 2;
    }

    if (AccList.length > 0) {
        var plusamt = 0;
        var minusamt = 0;

        $.each(AccList, function (i) {

            var Percentage = parseFloat(AccList[i].Percentage);
            var PlusOrMinus = AccList[i].AorL;

            if (PlusOrMinus == '+') {
                var Amt = parseFloat(AccList[i].Amount);
                plusamt = parseFloat(plusamt) + Amt;
            }
            if (PlusOrMinus == '-') {
                var Amt = parseFloat(AccList[i].Amount);
                minusamt = parseFloat(minusamt) + Amt;
            }

        })

        TotNetAmt = TotGrossAmt;
        TotNetAmt = TotNetAmt + plusamt;
        TotNetAmt = TotNetAmt - minusamt;

        TotNetAmt = parseFloat(TotNetAmt).toFixed(DecimalPlace);
        $('#txtNetAmount').val(TotNetAmt);
    }
    else {
        TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
        $('#txtNetAmount').val(TotGrossAmt);
    }
    TotGrossAmt = parseFloat(TotGrossAmt).toFixed(DecimalPlace);
    $('#txtGrossAmount').val(TotGrossAmt);

}

function AddLoadData() {
    debugger;

    if (MCom == 0) {
        //alert('Please Select Commercial..');
        var msg = 'Please Select Commercial...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return false;
    }

    if (MOrd == 0 && MRef == 0) {
        //alert('Please Select anyone OrderNo or Refno..');
        var msg = 'Please Select anyone Order Number or Refer Number...';
        var flg = 4;
        var mod = 1;
        var url = "";
        AlartMessage(msg, flg, mod, url);
        return false;
    }

    $.ajax({
        url: "/CommercialInvoice/LoadAddDet",
        data: JSON.stringify({ Commercial:MCom, Order:MOrd, Ref:MRef, Style:MSty }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                InvDetList = data;
                loadDetTable(InvDetList);
              
            }
        }

    });


}

function myCommercial(Val) {
    var foo = [];
    MCom = 0;
    $('#ddlAcommercial :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MCom = MCom + "," + foo[i];
    });
}

function myOrder(Val) {
    var foo = [];
    MOrd = 0;
    $('#ddlAOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MOrd = MOrd + "," + foo[i];
    });
}

function myRef(Val) {
    var foo = [];
    MRef = 0;
    $('#ddlARefno :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MRef = MRef + "," + foo[i];
    });
}

function myStyle(Val) {
    var foo = [];
    MSty = 0;
    $('#ddlAStyle :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MSty = MSty + "," + foo[i];
    });
}

function loadentrynoddl() {

    $.ajax({
        url: "/CommercialInvoice/LoadEntryddl/",
       // data: JSON.stringify({ Masid: ID }),
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            var entrydet = {};
            var entry = [];

            $.each(obj, function (i, el) {

                if (!entrydet[el.EntryNo]) {
                    entrydet[el.EntryNo] = true;
                    entry.push(el);
                }
            });

            $('#ddlmainentryno').empty();
            $(ddlmainentryno).append($('<option/>').val('0').text('--Select EntryNo--'));
            $.each(entry, function () {
                $(ddlmainentryno).append($('<option></option>').text(this.EntryNo));

            });

        }
    });

}