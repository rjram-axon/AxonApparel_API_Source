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
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    DCompid = $("#hdnDCompid").data('value');
    getDate();
    LoadCompanyDDL('#ddlCompany,#ddlmaincomp');
    LoadOrderNoDDL('#ddlOrderNo');
    LoadStyleDDL('#ddlStyle,#ddlmainstyle');
    LoadJobNoDDL('#ddlJoborder');
    LoadRefNoDDL('#ddlRefno');
    // LoadBulkJobNoDDL('#ddlJoborder');
    loadEntryNoDDL();
    loaddata();

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

    $(document).on('click', '.btninvedit', function () {
        debugger;

        Invrowindex = $(this).closest('tr').index();

        var currentro12 = InvDetList.slice(Invrowindex);

        $('#txtSales').val(currentro12[0]['Sales']);
        $('#ddlType').val(currentro12[0]['Type']).trigger('change');
        $('#txtInvoiceNo').val(currentro12[0]['InvoiceNo']);
       // $('#txtInvoiceDate').val(moment(currentro12[0]['InvoiceDate']).format("DD/MM/YYYY"));

        $('#txtInvoiceDate').val(currentro12[0]['InvoiceDate']);

        $('#btninvadd').hide();
        $('#btninvupdate').show();
    });


    $('#btninvupdate').click(function () {
        debugger;

        var currentrowsel1 = InvDetList.slice(Invrowindex);

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
            var currentrowsel = InvDetList.slice(Invrowindex);
            currentrowsel[0]['Sales'] = $("#txtSales").val();
            currentrowsel[0]['Type'] = $("#ddlType option:selected").val();
            currentrowsel[0]['SalesType'] = $("#ddlType option:selected").text();
            currentrowsel[0]['InvoiceNo'] = $("#txtInvoiceNo").val();
            currentrowsel[0]['InvoiceDate'] = $("#txtInvoiceDate").val();

            InvDetList[Invrowindex] = currentrowsel[0];

            loadDetTable(InvDetList);

            $('#btninvadd').show();
            $('#btninvupdate').hide();
            ClearDet();
        };
    });


    $(document).on('click', '.btninvremove', function () {
        debugger;
        Invrowindex = $(this).closest('tr').index();
        var currentrowsel = InvDetList.slice(Invrowindex);

        InvDetList.splice(Invrowindex, 1);
        document.getElementById("tblInvdetails").deleteRow(Invrowindex + 1);


    });




});
function getbyEditID(id) {
    Mod = 1;
    getbyID(id);

}
function getbyDeleteID(id) {
    Mod = 2;
    getbyID(id);

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
    // $('#txtInvoiceDate').val(Fdatestring);


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
        { title: "Detid", data: "SalesInvDetid", "visible": false },
        { title: "Type", data: "Type", "visible": false },
        { title: "SalesType", data: "SalesType" },
        { title: "SalesValue", data: "Sales" },
        { title: "InvoiceNo", data: "InvoiceNo" },
      //{
      //    title: "InvoiceDate", data: "InvoiceDate", render: function (data) {
      //        return (moment(data).format("DD/MM/YYYY "));
      //    }
      //},
          {
              title: "InvoiceDate", data: "InvoiceDate",
              //render: function (data) {
              //    //return (moment(data).format("DD/MM/YYYY"));
              //    return (moment(new Date()).format('YYYY/MM/DD'));
              //}
              //render: function (data, type, row) {
              //    return (moment(data).format("DD/MM/YYYY"));
              //}
          },
        {
            title: "ACTION", "mDataProp": null,
            "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btninvedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btninvremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
        }
        ]
    });


    $("#tblInvdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblInvdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function clickonlist() {
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkStyle = true;
    ChkEntNo = true;
    ChkJobNo = true;
    ChkComp = false;
    loaddata();

}
function CMainList() {
    ChkRefno = true;
    ChkOrdno = true;
    DtChk = false;
    ChkStyle = true;
    ChkEntNo = true;
    ChkJobNo = true;
    ChkComp = true;
    loaddata();

}
function OMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = true;
    ChkEntNo = true;
    ChkJobNo = true;
    ChkComp = false;
    loaddata();

}
function SMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkEntNo = true;
    ChkJobNo = true;
    ChkComp = false;
    loaddata();

}
function EMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkEntNo = false;
    ChkJobNo = false;
    ChkComp = false;
    loaddata();

}
function JMainList() {
    ChkRefno = false;
    ChkOrdno = false;
    DtChk = false;
    ChkStyle = false;
    ChkEntNo = true;
    ChkJobNo = false;
    ChkComp = false;
    loaddata();

}

function Add() {

    var isAllValid = true;


    if ($('#ddlCompany').val() == "0") {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlOrderNo').val() == "0") {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlJoborder').val() == "0") {

        $('#ddlJoborder').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlJoborder').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    //if ($('#ddlRefno').val() == "0") {

    //    $('#ddlRefno').siblings(".select2-container").css('border', '1px solid red');

    //    isAllValid = false;
    //}
    //else {

    //    $('#ddlRefno').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}


    if ($('#ddlStyle').val() == "0") {

        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    if (isAllValid) {
        debugger;
        Companyid = $("#ddlCompany option:selected").val();
        table = "Sales_Inv_mas",
        column = "EntryNo",
        compId = Companyid,
        Docum = 'Sales Invoice'

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
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $('#txtEntryNo').val(result.Value);
                }
                var objSubmit = {
                    EntryNo: $('#txtEntryNo').val(),
                    Entrydate: $('#txtEntryDate').val(),
                    Bmasid: $("#ddlOrderNo option:selected").val(),
                    Compid: $("#ddlCompany option:selected").val(),
                    Job_ord_no: $("#ddlJoborder option:selected").text(),
                    Styleid: $("#ddlStyle option:selected").val(),
                    Remarks: $('#txtremarks').val(),
                    InvDet: InvDetList,

                };
                $("#btnAdd").attr("disabled", true);
                LoadingSymb();
                $.ajax({
                    url: "/SalesInvoice/Add",
                    data: JSON.stringify(objSubmit),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        if (result.Value == true) {
                            AddUserEntryLog('Production', 'Sales Invoice', 'ADD', $("#txtEntryNo").val());
                            //alert("Sales Invoice Saved Sucessfully");
                            var msg = 'Sales Invoice Saved Sucessfully...';
                            var flg = 1;
                            var mod = 0;
                            var ur = "/SalesInvoice/SalesInvoiceIndex";
                            AlartMessage(msg, flg, mod, ur);
                            //window.location.href = "/SalesInvoice/SalesInvoiceIndex";
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

function Update() {

    var isAllValid = true;


    if ($('#ddlCompany').val() == "0") {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlOrderNo').val() == "0") {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlJoborder').val() == "0") {

        $('#ddlJoborder').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlJoborder').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    //if ($('#ddlRefno').val() == "0") {

    //    $('#ddlRefno').siblings(".select2-container").css('border', '1px solid red');

    //    isAllValid = false;
    //}
    //else {

    //    $('#ddlRefno').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}


    if ($('#ddlStyle').val() == "0") {

        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    if (isAllValid) {
        var objSubmit = {
            EntryNo: $('#txtEntryNo').val(),
            Entrydate: $('#txtEntryDate').val(),
            Bmasid: $("#ddlOrderNo option:selected").val(),
            Compid: $("#ddlCompany option:selected").val(),
            Job_ord_no: $("#ddlJoborder option:selected").text(),
            Styleid: $("#ddlStyle option:selected").val(),
            Remarks: $('#txtremarks').val(),
            InvDet: InvDetList,
            SalesInvMasid: Masid
        };
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/SalesInvoice/Update",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {
                    AddUserEntryLog('Production', 'Sales Invoice', 'UPDATE', $("#txtEntryNo").val());
                    //alert("Sales Invoice Updated Sucessfully");
                    var msg = 'Sales Invoice Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "/SalesInvoice/SalesInvoiceIndex";
                    AlartMessage(msg, flg, mod, ur);
                    //window.location.href = "/SalesInvoice/SalesInvoiceIndex";
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


    if ($('#ddlOrderNo').val() == "0") {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    if ($('#ddlJoborder').val() == "0") {

        $('#ddlJoborder').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlJoborder').siblings(".select2-container").css('border', '1px solid lightgrey');
    }


    //if ($('#ddlRefno').val() == "0") {

    //    $('#ddlRefno').siblings(".select2-container").css('border', '1px solid red');

    //    isAllValid = false;
    //}
    //else {

    //    $('#ddlRefno').siblings(".select2-container").css('border', '1px solid lightgrey');
    //}


    if ($('#ddlStyle').val() == "0") {

        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid red');

        isAllValid = false;
    }
    else {

        $('#ddlStyle').siblings(".select2-container").css('border', '1px solid lightgrey');
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
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    if (isAllValid) {
        var objSubmit = {
            EntryNo: $('#txtEntryNo').val(),
            Entrydate: $('#txtEntryDate').val(),
            Bmasid: $("#ddlOrderNo option:selected").val(),
            Compid: $("#ddlCompany option:selected").val(),
            Job_ord_no: $("#ddlJoborder option:selected").text(),
            Styleid: $("#ddlStyle option:selected").val(),
            Remarks: $('#txtremarks').val(),
            InvDet: InvDetList,
            SalesInvMasid: Masid
        };
        $("#btnDel").attr("disabled", true);
        $("#btnUpdate").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/SalesInvoice/Delete",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {
                    AddUserEntryLog('Production', 'Sales Invoice', 'DELETE', $("#txtEntryNo").val());
                    //alert("Sales Invoice Deleted Sucessfully");
                    var msg = 'Sales Invoice Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var ur = "/SalesInvoice/SalesInvoiceIndex";
                    AlartMessage(msg, flg, mod, ur);
                    //window.location.href = "/SalesInvoice/SalesInvoiceIndex";
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

    $.ajax({
        url: "/SalesInvoice/GetInvMasDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {
                $('#txtEntryNo').val(obj[0]["EntryNo"]);
                $('#ddlCompany').val(obj[0]["Compid"]).trigger('change');
                $('#ddlOrderNo').val(obj[0]["Bmasid"]).trigger('change');
                $('#ddlJoborder').val(obj[0]["Jobmasid"]).trigger('change');
                $('#ddlStyle').val(obj[0]["Styleid"]).trigger('change');
                $('#txtremarks').val(obj[0]["Remarks"]);
                $('#txtEntryDate').val(moment(obj[0]["Entrydate"]).format('DD/MM/YYYY'));
                $('#ddlRefno').val(obj[0]["Bmasid"]).trigger('change');
                Masid = obj[0]["SalesInvMasid"];


                if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();

                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();

                }
                Loaddet(ID);
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
        url: "/SalesInvoice/GetInvDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //var obj = result.Value;
            //debugger;
            InvDetList = (result.Value);

            for (var f = 0; f < InvDetList.length; f++) {
                InvDetList[f].InvoiceDate = moment(InvDetList[f]["InvoiceDate"]).format('DD/MM/YYYY');
                //ShipmentItemList[f].DelDate = moment(InvDetList[f]["DelDate"]).format('DD/MM/YYYY');
            }
      

            loadDetTable(InvDetList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function loaddata() {
    debugger;


    var masid = $("#ddlmainentryno option:selected").val();
    var Fdate = $('#txtFromDate').val();
    var Tdate = $('#txtToDate').val();
    var Bmasid = $("#ddlmainordno option:selected").val();
    var refid = $("#ddlmainrefno option:selected").val();

    //var Compid = $("#ddlmaincomp option:selected").val();

    var CompId = $('#ddlmaincomp').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlmaincomp').val();
    }

    var Job_ord_no = $("#ddlmainjobno option:selected").val();
    var Styleid = $("#ddlmainstyle option:selected").val();

    if (Job_ord_no == "0") {
        Job_ord_no = '';
    }
    else {
        Job_ord_no = $("#ddlmainjobno option:selected").text();
    }

    if (ChkComp || DtChk) {
        masid = 0;
        Bmasid = 0;
        refid = 0;
        Job_ord_no = '';
        Styleid = 0;
    }

    $.ajax({
        url: "/SalesInvoice/GetInvMainDetails",
        data: JSON.stringify({ CompanyID: CompId, Order_No: Bmasid, Ref_no: refid, StyleID: Styleid, frmDate: Fdate, ToDate: Tdate, Entryid: masid, Jobno: Job_ord_no }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            
            var inputcount = 0;
            $('#tbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {

                var table = $('#tbody').DataTable();
                var rows = table.clear().draw();
                $('#tbody').DataTable().rows.add(dataSet);
                $('#tbody').DataTable().columns.adjust().draw();
            }
            else {

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
                             { title: "Masid", "visible": false },
                             { title: "EntryNo" },
                             { title: "EntryDate" },
                             { title: "BMasid", "visible": false },
                             { title: "Order No", "visible": false },
                             { title: "Ref No", "visible": false },
                             { title: "Styleid", "visible": false },
                             { title: "Style", "visible": false },
                             { title: "JobOrdNo", "visible": false },                        
                             { title: "Action" },

                    ]

                });

            }

            $(document).ready(function () {
                var table = $('#tbody').DataTable();

                $('#tbody ').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });


            });


            var orddet = {};
            var ord = [];
            var refdet = {};
            var ref = [];
            var Jobdet = {};
            var Job = [];
            var stydet = {};
            var sty = [];
            var entdet = {};
            var ent = [];

            $.each(dataSet, function (i, el) {

                if (!orddet[dataSet[i][3]]) {
                    orddet[dataSet[i][3]] = true;

                    var obj = {
                        BMasid: dataSet[i][3],
                        OrderNo: dataSet[i][4]
                    }

                    ord.push(obj);
                }
                if (!refdet[dataSet[i][3]]) {
                    refdet[dataSet[i][3]] = true;
                    var obj = {
                        BMasid: dataSet[i][3],
                        RefNo: dataSet[i][5]
                    }
                    ref.push(obj);
                }
                if (!Jobdet[dataSet[i][8]]) {
                    Jobdet[dataSet[i][8]] = true;
                    var obj = {
                        Job_ord_no: dataSet[i][8]
                    }
                    Job.push(obj);
                }
                if (!stydet[dataSet[i][6]]) {
                    stydet[dataSet[i][6]] = true;
                    var obj = {
                        Styleid: dataSet[i][6],
                        Style: dataSet[i][7]
                    }
                    sty.push(obj);
                }
                if (!entdet[dataSet[i][0]]) {
                    entdet[dataSet[i][0]] = true;
                    var obj = {
                        SalesInvMasid: dataSet[i][0],
                        EntryNo: dataSet[i][1]
                    }
                    ent.push(obj);
                }
            });


            if (ChkOrdno || ChkComp || DtChk) {
                $('#ddlmainordno').empty();
                $('#ddlmainordno').append($('<option/>').val('0').text('--Select OrderNo--'));
                $.each(ord, function (e) {
                    $('#ddlmainordno').append($('<option></option>').val(this.BMasid).text(this.OrderNo));
                });
            }

            if (ChkRefno || ChkComp || DtChk) {
                $('#ddlmainrefno').empty();
                $('#ddlmainrefno').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(ref, function () {
                    $('#ddlmainrefno').append($('<option></option>').val(this.BMasid).text(this.RefNo));
                });
            }
            if (ChkStyle || ChkComp || DtChk) {
                $('#ddlmainstyle').empty();
                $('#ddlmainstyle').append($('<option/>').val('0').text('--Select Style--'));
                $.each(sty, function () {
                    $('#ddlmainstyle').append($('<option></option>').val(this.Styleid).text(this.Style));
                });
            }
            if (ChkEntNo || ChkComp || DtChk) {
                $('#ddlmainentryno').empty();
                $('#ddlmainentryno').append($('<option/>').val('0').text('--Select SalesInvoiceNo--'));
                $.each(ent, function () {
                    $('#ddlmainentryno').append($('<option></option>').val(this.SalesInvMasid).text(this.EntryNo));
                });}

            if (ChkJobNo || ChkComp || DtChk) {
                $('#ddlmainjobno').empty();
                $('#ddlmainjobno').append($('<option/>').val('0').text('--Select JobOrdNo--'));
                $.each(Job, function () {
                    $('#ddlmainjobno').append($('<option></option>').val(this.Job_ord_no).text(this.Job_ord_no));
                });}


            //$.each(dataSet, function (i, el) {

                
            //});

            //$.each(dataSet, function (i, el) {

               
            //});

            //$.each(dataSet, function (i, el) {

                
            //});
            //$.each(dataSet, function (i, el) {

               
            //});








        },

        failure: function (errMsg) {
            alert(errMsg);
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
    table = "Sales_Inv_mas",
    column = "EntryNo",
    compId = Companyid,
    Docum = 'Sales Invoice'

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
    $('#txtEntryNo').val('');
    // $('#ddlCompany').val(0).trigger('change');
    $('#ddlOrderNo').val(0).trigger('change');
    $('#ddlJoborder').val(0).trigger('change');
    $('#ddlStyle').val(0).trigger('change');
    $('#txtremarks').val('');
    //$('#txtEntryDate').val(moment('').format('DD/MM/YYYY'));
    $('#ddlRefno').val(0).trigger('change');
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
    debugger;
    if (Mod == 0) {
        CompanyId = $('select#ddlCompany option:selected').val();
        if (CompanyId == 0) {
            //alert('Select Company...');
            var msg = 'Select Company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
        else {
            GenerateNumber();
        }
    }

}