var procList = [];
var proc = [];
var StyleId;
var StyleRowId = [];
var PSID = 0;
var strid;
var Userid = 0;
var UserName = 0;
var Flag = 0;
var Mode = 0;
var JobId = 0;
var CompId = 0;
var OType = 0;
var CompUnitId = 0;
var Guserid = 0;
var EnbTranDate = 0;
var Ordertype = "";
var ProgSeqNo = 0;
var planamend = 0;
var Allprocess = '';
var AllprocCnt = 0;
var PlanLock = [];
var DispatchClosed = "N";

$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');

    LoadProcessSeqDDL("#ddlProcess");
    LoadOrderNoDDL("#ddlCPOrderNo");
    LoadStyleDDL("#ddlCPSty");

    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');

    }

    if (EnbTranDate == "Y") {
        $("#txtEntryDate").prop("disabled", true);

    } else {
        $("#txtEntryDate").prop("disabled", false);
    }

    if (queryvalue[0] == "StyId") {
        StyleRowId = queryvalue[1];
        LoadPlanDetails(StyleRowId);
    }
    if (queryvalue[0] == "ProSeqID") {
        PSID = queryvalue[1];
        Mode = queryvalue[3];
        // LoadStylerowid(PSID);
        LoadPlanDetails(PSID);
    }

    if (Mode == 2) {
        $('#btnUp').hide();
        $('#btnAdd').hide();
        $('#btnDelete').show();
    }

    $("#Itable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=chkbxip]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < inputlist.length; d++) {
                    if (inputlist[d].PSId == val) {
                        inputlist[d].Required = "Yes";
                    }
                    //else {
                    //    Bomlist[d].check = false;
                    //}
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < inputlist.length; d++) {
                    if (inputlist[d].PSId == val) {
                        inputlist[d].Required = "No";
                    }

                }
            }

        });
    });
    $("#Otable").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=chkbxop]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < outputlist.length; d++) {
                    if (outputlist[d].PSId == val) {
                        outputlist[d].Required = "Yes";
                    }
                    //else {
                    //    Bomlist[d].check = false;
                    //}
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < outputlist.length; d++) {
                    if (outputlist[d].PSId == val) {
                        outputlist[d].Required = "No";
                    }

                }
            }

        });
    });

    $('#btnAdd').click(function () {
        debugger;
        $('#sbTwo option').prop('selected', true);

        var rr = [];
        $('.selectpicker :selected').each(function (i, selected) {
            rr[i] = $(selected).val();
        });

        AddData(rr);
    });



    $('#btnUp').click(function () {
        debugger;

        if (PlanLock.length > 0) {
            if (PlanLock[0].LockPlanning == 'Y') {
                //alert('Processprogram Add has been Locked,Please Contact Administrator..');
                var msg = 'Processprogram Add has been Locked,Please Contact Administrator...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                return true;
            }
        }


        $('#sbTwo option').prop('selected', true);

        var dd = [];
        $('.selectpicker :selected').each(function (i, selected) {
            dd[i] = $(selected).val();
        });


        UpdateData(dd);
        //AddData(dd);
        //alert(dd);
    });


    //for validate



    $(document).on('keyup', '.txtinpgmqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = inputlist.slice(rowindex);

        currowind[0]['Quantity'] = $(this).val();
        inputlist[rowindex] = currowind[0];
    });

    $(document).on('keyup', '.txtinpsecqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = inputlist.slice(rowindex);

        currowind[0]['SecQty'] = $(this).val();
        inputlist[rowindex] = currowind[0];
    });

    $(document).on('keyup', '.txtprodqty', function () {
        debugger;
        rowindex = $(this).closest('tr').index();
        if (detlist.length > 0) {
            var currowind = detlist.slice(rowindex);
            currowind[0]['prodqty'] = $(this).val();
            //currowind[0]['Prog_Op_Qty'] = $(this).val();
            detlist[rowindex] = currowind[0];
        }
        if (compedit.length > 0) {

            var currowind = compedit.slice(rowindex);
            //currowind[0]['prodqty'] = $(this).val();
            currowind[0]['Prog_Op_Qty'] = $(this).val();
            compedit[rowindex] = currowind[0];
        }

    });

    $(document).on('keyup', '.txtoppgmqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = outputlist.slice(rowindex);

        currowind[0]['Quantity'] = $(this).val();
        outputlist[rowindex] = currowind[0];

    });

    $(document).on('keyup', '.txtopsecqt', function () {
        debugger;
        rowindex = $(this).closest('tr').index();

        var currowind = outputlist.slice(rowindex);

        currowind[0]['SecQty'] = $(this).val();
        outputlist[rowindex] = currowind[0];

    });



    $('#lefta').click(function () {
        
        var selectedItem = $('.selectpicker').val();
   

        var ProcessId = $("#sbTwo").val();
        var JobOrderNo = $("#txtJobNo").val();


        $.ajax({
            url: "/ProcessSeqProc/CheckProMade",
            data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var obj = result.Value;
                debugger;
                if (obj.length > 0) {

                    //alert("Program has been made for this Procees...");
                    var msg = 'Program has been made for this Procees...';
                    var flg = 4;
                    var mode = 1;
                    var url = "";
                    AlartMessage(msg, flg, mode, url);
                    return true;

                }
                else {
                    moveItems('#sbTwo', '#ddlProcess');
                }
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        })

       
        
    });

    function moveItems(origin, dest) {
        $(origin).find(':selected').appendTo(dest);
    }

});


function LoadStylerowid(pid) {
    debugger;
    var id;
    $.ajax({
        url: "/ProcessSeqProc/GetStylerowid",
        data: JSON.stringify({ id: pid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            obj = result.Value;
            // strid = obj.Stylerowid;
            StyleRowId = obj[0].Stylerowid;
            debugger;
            LoadPlanDetails(StyleRowId);


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}


function AddData(rr) {
    debugger;

    var ddlPr = rr;
    if (ddlPr == "") {
        //If the "Please Select" option is selected display error.
        //alert("Please select any one Process!");
        var msg = 'Please select any one Process..!';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
        return false;
    }
    ID = $("#txtpseqid").val();

    if (ID > 0) {
        EDelete(ID);
    }

    var procListObj = {

        JobNo: $("#txtJobNo").val(),
        EntryDate: $("#txtEntryDate").val(),
        //EntryDate: new Date($('#txtEntryDate').val()),
        OrdType: OType,
        CreatedBy: Guserid,

    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessSeqProc/Add",
        data: JSON.stringify({ ObjPSeq: procListObj, sbTwo: rr }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                //alert("Data Saved Sucessfully");
                var msg = 'Data Saved Sucessfully...';
                var flg = 4;
                var mode = 1;
                var url = "";
                AlartMessage(msg, flg, mode, url);
                AddUserEntryLog('Planning', 'ProcessSequenceAdd', 'ADD', $('#txtOrderNo').val());
                LoadProgAuto();

                if (Flag == "Y") {

                    window.location.reload();
                  

                } else {
                    window.location.href = "/PlanningMain/PlanningMainIndex";
                }
            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}





//function UpdateData(dd) {
//    debugger;
//    var ddlPr = dd;
//    ID = $("#txtpseqid").val();
//    $.ajax({
//        url: "/ProcessSeqProc/Update/" + ID,
//        type: "POST",
//        contentType: "application/json;charset=UTF-8",
//        dataType: "json",
//        success: function (result) {
//            debugger;
//            AddData(dd);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });

//}


function UpdateData(dd) {
    debugger;


    var ddlPr = dd;
    ID = $("#txtpseqid").val();


    //EDelete(ID);

    if (ddlPr == "") {
        //If the "Please Select" option is selected display error.
        //alert("Please select any one Process!");
        var msg = 'Please select any one Process..!';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
        return false;
    }

    var procListObj = {

        Processseqmasid: $("#txtpseqid").val(),
        JobNo: $("#txtJobNo").val(),
        EntryDate: $("#txtEntryDate").val(),
        //EntryDate: new Date($('#txtEntryDate').val()),
        OrdType: OType,
        CreatedBy: Guserid,

    };
    $("#btnUp").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/ProcessSeqProc/Update/",
        data: JSON.stringify({ ObjPSeq: procListObj, UpsbTwo: dd }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            //if (result.Value == true) {
            //    alert("Data Updated Sucessfully");
            //    window.location.href = "/PlanningMain/PlanningMainIndex";
            //} else {

            //    window.location.href = "/Error/Index";

            //}
            if (result.Value == true) {
                //alert("Data Updated Sucessfully");
                
                AddUserEntryLog('Planning', 'ProcessSequenceAdd', 'UPDATE', $('#txtOrderNo').val());
                LoadProgAuto();

                if (Flag == "Y") {
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    //window.location.reload();


                } else {
                    //window.location.href = "/PlanningMain/PlanningMainIndex";
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var url = "/PlanningMain/PlanningMainIndex";
                    AlartMessage(msg, flg, mod, url);
                }
            } else {

                window.location.href = "/Error/Index";

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function LoadPlanDetails(StyleRowId) {
    debugger;
    $.ajax({
        url: "/ProcessSeqProc/GetPlanDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (obj != undefined) {
                $('#txtOrderNo').val(obj[0]["Order_No"]);
                $('#txtCompany').val(obj[0]["CompanyName"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtBuyer').val(obj[0]["BuyerName"]);
                $('#txtRefNo').val(obj[0]["Ref_No"]);
                $('#txtJobNo').val(obj[0]["JobNo"]);
                $('#txtMercId').val(obj[0]["MerchandiserName"]);
                $('#txtUnit').val(obj[0]["Companyunitname"]);
                $('#txtpseqid').val(obj[0]["Processseqmasid"]);
                $('#txtEntryDate').val(moment(obj[0]["EntryDate"]).format('DD/MM/YYYY'));
                PSID = $("#txtpseqid").val();
                JobId = obj[0]["JobNoId"];
                CompId = obj[0]["CompanyId"];
                OType = obj[0]["OrdType"];
                CompUnitId = obj[0]["Companyunitid"];
                CheckPlanAmend(obj[0]["JobNo"]);
                LockDet();

                DispatchClosed = obj[0]["Despatch_Closed"];

                // PSID;
                if (PSID > 0) {
                    debugger;
                    $('#btnAdd').hide();
                    $('#SetCopy').attr('disabled', true);
                    //   $('#btnUp').show();

                    if (DispatchClosed == "N") {
                        $('#btnUp').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#btnUp').hide();
                    }

                    if (Mode == 2) {

                        $('#btnUp').hide();
                    }
                }
                else {
                    $('#btnAdd').show();
                    $('#btnUp').hide();
                    $('#SetCopy').attr('disabled', false);
                }

                if (Mode == 2) {
                    $('#btnUp').hide();
                    $('#btnAdd').hide();

                    //  $('#btnDelete').show();

                    if (DispatchClosed == "N") {
                        $('#btnDelete').show();
                    }
                    else if (DispatchClosed == "Y") {
                        $('#btnDelete').hide();
                    }
                }

                loaddetails(StyleRowId);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function CheckPlanAmend(jobordno) {
    planamend = 0;
    $.ajax({
        url: "/PlanningConsumption/LoadAmendDetails",
        data: JSON.stringify({ Stylerowid: 0, jmasid: '', Workordno: jobordno }),
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
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    planamend = planamend + 1;
                    return true;
                }
            } else {
                $("#btnAdd").attr("disabled", false);
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loaddetails(StyleRowId) {
    debugger;
    $.ajax({
        url: "/ProcessSeqProc/ListProcSeqDetails",
        data: JSON.stringify({ StyleRowId: StyleRowId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //List = result;
            //loadcomponentTable(compList);
            $.each(result, function () {
                $("#sbTwo").append($("<option></option>").val(this.Processid).html(this.Processname));
            });
            //$('#btnAdd').show();
            //$('#btnUpdate').hide();

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}





function Delete(ID) {
    debugger;

    if (PlanLock.length > 0) {
        if (PlanLock[0].LockPlanning == 'Y') {
            //alert('Processprogram Add has been Locked,Please Contact Administrator..');
            var msg = "Processprogram Add has been Locked,Please Contact Administrator...";
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }


    var ProcessseqId = $("#txtpseqid").val();
    //var ItemId = ItemID;


    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $("#btnDelete").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/ProcessSeqProc/Delete/" + ProcessseqId,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                //// $('#tPAbody').DataTable().destroy();
                // LoadPlanAdd();
                // window.location.reload(true);

                window.location.href = "/PlanningMain/PlanningMainIndex";
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function EDelete(ID) {
    debugger;
    var ProcessseqId = $("#txtpseqid").val();
    //var ItemId = ItemID;



    $.ajax({
        url: "/ProcessSeq/Delete/" + ProcessseqId,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}


function getbyID(styleid) {

    debugger;

    $('#txtName').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ProcessSeqProc/getbyID/" + styleid,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtCompany').val(obj.CompanyName);
                $('#txtBuyer').val(obj.BuyerName);
                $('#txtStyle').val(obj.Styleid);
                $('#txtOrderNo').val(obj.Order_No);
                $('#txtRefNo').val(obj.Ref_No);
                //$('#txtStyle').val(obj.CountryId);

                debugger;
                //$('#btnAdd').hide();
                //$('#btnUpdate').show();
            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function ModelClose() {
    window.location.href = "/PlanningMain/PlanningMainIndex";
}



function AllCreateProg(val) {
    debugger;

    if (PlanLock.length > 0) {
        if (PlanLock[0].LockPlanning == 'Y') {
            //alert('Processprogram Add has been Locked,Please Contact Administrator..');
            var msg = 'Processprogram Add has been Locked,Please Contact Administrator...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }

    $('#sbTwo option').prop('selected', true);
    var rr = [];
    $('.selectpicker :selected').each(function (i, selected) {
        rr[i] = $(selected).val();
    });

    var pr = [];
    $('.selectpicker :selected').each(function (i, selected) {
        pr[i] = $(selected).text();
    });
    //var i = 0;
    //var ProcessId = $("#sbTwo").val();
    if (val <= rr.length) {
        Allprocess = pr[val];
        var ProcessId = rr[val];
        var JobOrderNo = $("#txtJobNo").val();

        if (planamend == 0) {
            $.ajax({
                url: "/ProcessSeqProc/CheckProSeq",
                data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    var obj = result.Value;
                    debugger;
                    if (obj.length == 0) {


                        //alert("Please Save Selected Process Sequence and then Proceed...");
                        var msg = "Please Save Selected Process Sequence and then Proceed...";
                        var flg = 4;
                        var mod = 1;
                        var url = "";
                        AlartMessage(msg, flg, mod, url);
                        return true;

                    }
                    else {
                        LoadAutoGenerateAll(JobOrderNo, ProcessId, Guserid);
                    }
                },

                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
    }
}


function CreateProg() {

    if (PlanLock.length > 0) {
        if (PlanLock[0].LockPlanning == 'Y') {
            //alert('Processprogram Add has been Locked,Please Contact Administrator..');
            var msg = 'Processprogram Add has been Locked,Please Contact Administrator...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }


    var ProcessId = $("#sbTwo").val();
    var JobOrderNo = $("#txtJobNo").val();

    if (planamend == 0) {
        $.ajax({
            url: "/ProcessSeqProc/CheckProSeq",
            data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var obj = result.Value;
                debugger;
                if (obj.length == 0) {


                    //alert("Please Save Selected Process Sequence and then Proceed...");
                    var msg = "Please Save Selected Process Sequence and then Proceed...";
                    var flg = 4;
                    var mod = 1;
                    var url = "";
                    AlartMessage(msg, flg, mod, url);
                    return true;

                }
                else {
                    LoadAutoGenerate(JobOrderNo, ProcessId, Guserid);
                }
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}


function CheckProg() {

    var ProcessId = $("#sbTwo").val();
    var JobOrderNo = $("#txtJobNo").val();


    $.ajax({
        url: "/ProcessSeqProc/CheckProMade",
        data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj.length >0) {
                
                //alert("Program has been made for this Procees...");
                var msg = "Program has been made for this Procees...";
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                return true;

            }
            else {
                
            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadProgAuto() {
    debugger;

    var ans = confirm("Are you sure you want to Create the Program?");
    if (ans) {
        Flag = "Y";
        //LoadPlanDetails(StyleRowId);
    } else {
        window.location.href = "/PlanningMain/PlanningMainIndex";
    }
}


function LoadAutoGenerateAll(JobOrderNo, ProcessId, Userid) {
    debugger;
    $.ajax({
        url: "/ProcessSeqProc/AutoProg",
        data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo, CreatedBy: Userid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                //alert(Allprocess +" -Program Created Sucessfully..");
                var msg = Allprocess + " - Program Created Sucessfully...";
                var flg = 4;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;
                AllprocCnt = AllprocCnt + 1;
                AllCreateProg(AllprocCnt);
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function LoadAutoGenerate(JobOrderNo, ProcessId, Userid) {
    debugger;
    $.ajax({
        url: "/ProcessSeqProc/AutoProg",
        data: JSON.stringify({ Processid: ProcessId, JobNo: JobOrderNo, CreatedBy: Userid }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                //alert("Program Created Sucessfully..");
                var msg = "Program Created Sucessfully...";
                var flg = 1;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                //window.location.href = "/PurchaseOrderMain/PurchaseOrderMainIndex?PMasId=" + MasId + "=&OrderType=" + Mod;

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete() {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ProcessSeq/Delete/" + PSID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {
                    //$('#tPAbody').DataTable().destroy();
                    //MainList();
                    //window.location.reload(true);
                    //alert("Data Deleted Sucessfully");
                    var msg = "Data Deleted Sucessfully...";
                    var flg = 2;
                    var mod = 0;
                    var url = "/PlanningMain/PlanningMainIndex";
                    AlartMessage(msg, flg, mod, url);
                    AddUserEntryLog('Planning', 'ProcessSequenceAdd', 'DELETE', $('#txtOrderNo').val());
                    //window.location.href = "/PlanningMain/PlanningMainIndex";
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

//////////////////Process Program Edit
var eid;
function EditProg() {
    eid = JobId;
    if (planamend == 0) {
        var prgtype = "P";
        debugger;
        $("#myModal2").modal('show');
        $('#tblprodprocess').DataTable().destroy();
        $.ajax({
            type: "POST",
            url: '/ProcessProgram/GetProdPlanningEditList/',
            data: JSON.stringify({ Id: JobId, prgmtype: prgtype }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                prodplanningEditList = json;


                var tableload = json.data;
                var dataSet = eval("[" + tableload + "]");
                // $('#tPAbody').DataTable({


                $('#tblprodprocess').DataTable({
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
                             { title: "JobMasID", "visible": false },
                             { title: "ProcessID", "visible": false },
                             { title: "Process" },
                             { title: "Prod Prg No" },
                             {
                                 title: "Program Date"
                                 //render: function (data) {
                                 //    return (moment(data).format("DD/MM/YYYY"));
                                 //}
                             },
                               {
                                   title: "MaxSeqNo"
                                   //render: function (data) {
                                   //    return (moment(data).format("DD/MM/YYYY"));
                                   //}
                               },
                                 {
                                     title: "Program"//, "mDataProp": null,

                                     // "sDefaultContent": '<button type="button" data-toggle="modal" data-target="#myModal3" id="btnprod" class="btnprodplanadd"> Add </button>'
                                 },

                    ]
                });
                getbyidedit(JobId);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

}
var prodplanningedit = [];
function getbyidedit(id) {
    //$('#Itable').Datatable().destroy();
    //$('#Otable').Datatable().destroy();
    var PrgType="P";
    debugger;
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdPlanningEdit/',
        data: JSON.stringify({ Id: id, prgmtype: PrgType }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodplanningedit = json.Value;
            var jobordno = prodplanningedit[0].JobOrderNo;
            var cmpnyunit = prodplanningedit[0].CompanyUnit;
            var refno = prodplanningedit[0].RefNo;
            var style = prodplanningedit[0].Style;
            var buyer = prodplanningedit[0].Buyer;
            var qty = prodplanningedit[0].Quantity;
            Ordertype = prodplanningedit[0].Ordertype;
            //if (Gp == "G") {
            //    Programtype = "G";
            //}
            //else {
            //    Programtype = "P";
            //}


            $('#txtjobordno').val(jobordno);
            $('#txtcompunit').val(cmpnyunit);
            $('#txtrefno').val(refno);
            $('#txtstyle').val(style);

            $('#txtbuyer').val(buyer);
            $('#txtqty').val(qty);

            
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

$(document).on('click', '.btnprodplanedit', function () {
    debugger;
    $('#myModal3').modal('show');
    $('#myModal3').show();
    $('#btnsave').hide();
    $('#btncancel').hide();
    $('#btnupd').show();
    var tablesize = $('#Itable').DataTable();
    tablesize.clear().draw();

    var tablesize = $('#Otable').DataTable();
    tablesize.clear().draw();

    var rowindex = $(this).closest('tr').index();

    $('#ddlinputbasepro').val("IT");
    $('#ddloutputbasepro').val("OT");

    proIOList = [];

    var currentval = prodplanningedit.slice(rowindex);
    var prodprgid = currentval[0]['ProProgId'];
    pid = currentval[0]['ProcessId'];
    pnum = currentval[0]['ProProgNo'];
    proname = currentval[0]['Process'];
    ProgSeqNo = currentval[0]['MaxChk'];

    getprodlist(prodprgid);

});

function getprodlist(id) {
    var mid = id;
    inputlist = [];
    outputlist = [];

    $.ajax({
        type: "POST",
        url: '/ProcessProgram/GetProdEditList/',

        data: JSON.stringify({ Id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            prodedit = json.Value;
            prodplanningedit;
            var jobordno = prodplanningedit[0].JobOrderNo;
            var cmpnyunit = prodplanningedit[0].CompanyUnit;
            var refno = prodplanningedit[0].RefNo;
            var style = prodplanningedit[0].Style;
            var buyer = prodplanningedit[0].Buyer;
            var qty = prodplanningedit[0].Quantity;
            var process = proname;// prodplanningedit[0].Process;
            var prodpgmnum = pnum;//prodplanningedit[0].ProProgNo;
            var date = prodplanningedit[0].ProProgDate;
            var masid = prodplanningedit[0].ProProgId;
            $('#txtwrkordno').val(jobordno);
            $('#txtplancompunit').val(cmpnyunit);
            $('#txtplanrefno').val(refno);
            $('#txtprocess').val(process);
            $('#txtProdPrgid').val(mid);
            $('#txtprdprgno').val(prodpgmnum);
            $('#txtplanprogdate').val(moment(date).format('DD/MM/YYYY'));


            //txtprocess
            //txtwrkordno
            //txtProdPrgid
            //txtplanrefno
            //txtprdprgno
            //txtProddetid
            //txtplancompunit
            //txtplanprogdate




            for (var d = 0; d < prodedit.length; d++) {
                if (prodedit[d].InorOut == 'I') {
                    inputlist.push(prodedit[d]);
                    //loadInputProcess(prodedit[d]);
                }
                else if (prodedit[d].InorOut == 'O') {
                    outputlist.push(prodedit[d]);
                    //loadOutputProcessedit(prodedit[d]);
                }
            }
            if (inputlist.length > 0) {
                loadInputProcessEdit(inputlist);
            }
            if (outputlist.length > 0) {
                loadOutputProcessedit(outputlist);
            }




        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadInputProcessEdit(list) {
    debugger;
    $('#Itable').DataTable().destroy();
    debugger;

    $('#Itable').DataTable({
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
        "rowCallback": function (row, data, index) {
            if (data.Issue_qty > 0) {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },


        columns: [
            { title: "PSId", data: "PSId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "ColorId", data: "ColorId", "visible": false },
              { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Input Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Unit", data: "uom" },
            {
                title: "Program Qty", data: "Prog_Op_Qty",
                render: function (data) {
                    return '<input type="text" class="form-control txtinpgmqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "SecQty",
                render: function (data) {
                    return '<input type="text" class="form-control txtinpsecqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            { title: "Type", data: "CatType" },
            {
                title: "Required", data: "PSId","visible":false,
                render: function (data) {
                    return '<input type="checkbox" id="chkbxip" class="chkbxip editor-active" checked="checked" value=' + data + '>';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<button type="button" data-toggle="modal" class="btnIremove"> Remove </button>'
               //}
        ]
    });
}
function loadOutputProcessedit(List) {
    $('#Otable').DataTable().destroy();
    debugger;

    $('#Otable').DataTable({
        data: List,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (data.order_qty > 0) {
                $('td', row).css('background-color', '#FCF3CF');

            }

        },
        columns: [
            { title: "PSId", data: "Prodprgdetid", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
             { title: "ColorId", data: "ColorId", "visible": false },
              { title: "SizeId", data: "SizeId", "visible": false },
            { title: "Output Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "Unit", data: "uom" },
            {
                title: "Program Qty", data: "Prog_Op_Qty",
                render: function (data) {
                    return '<input type="text" class="form-control txtoppgmqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            {
                title: "Sec Qty", data: "SecQty",
                render: function (data) {
                    return '<input type="text" class="form-control txtopsecqt"  style="width: 50px;text-align: center;" value=' + data + ' >';

                },
            },
            { title: "Type", data: "CatType" },
            {
                title: "Required", data: "PSId","visible": false,
                render: function (data) {
                    return '<input type="checkbox" id="chkbxop" class="chkbxop editor-active" checked="checked" value=' + data + ' >';
                },
            },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<button type="button" data-toggle="modal" class="btnIremove"> Remove </button>'
               //}
        ]
    });
}
function UpdateProd() {
    debugger;

    iplist = new Array();
    oplist = new Array();
    Datas = new Array();
    for (var c = 0; c < inputlist.length; c++) {
        if (inputlist[c].Required == 'Yes') {
            var list = {
                Prodprgdetid: $('#txtProddetid').val(),
                Prodprgid: inputlist[c].Prodprgid,// $('#txtProdPrgid').val(),            
                Prog_Op_Qty: inputlist[c].Quantity,// $(tr).find('td:eq(7)').text(),
                ActualPlan_Qty: inputlist[c].Quantity,//$(tr).find('td:eq(7)').text(),
                AltItem: 'N',
                Amended: 'Y',
                Issue_qty: inputlist[c].Issue_qty,
                order_qty: inputlist[c].order_qty,
                Itemid: inputlist[c].ItemId, // $(tr).find('td:eq(0)').text()
                Colorid: inputlist[c].ColorId,//$(tr).find('td:eq(1)').text(),
                Sizeid: inputlist[c].SizeId,// $(tr).find('td:eq(2)').text(),
                InorOut: "I",
                SecQty: inputlist[c].SecQty,//$(tr).find('td:eq(8)').text(),
                CatType: inputlist[c].Type,// $(tr).find('td:eq(9)').text(),
                Required: inputlist[c].Required,//1

            }
            iplist.push(list);
        }
    }

    for (var e = 0; e < outputlist.length; e++) {
        if (outputlist[e].Required == 'Yes') {
            var list = {
                Prodprgdetid: $('#txtProddetid').val(),
                Prodprgid: outputlist[e].Prodprgid,//$('#txtProdPrgid').val(),
                Prog_Op_Qty: outputlist[e].Quantity,// $(tr).find('td:eq(7)').text(),
                ActualPlan_Qty: outputlist[e].Quantity,//$(tr).find('td:eq(7)').text(),
                AltItem: 'N',
                Amended: 'Y',
                Issue_qty: outputlist[e].Issue_qty,
                order_qty: outputlist[e].order_qty,
                Itemid: outputlist[e].ItemId, // $(tr).find('td:eq(0)').text()
                Colorid: outputlist[e].ColorId,//$(tr).find('td:eq(1)').text(),
                Sizeid: outputlist[e].SizeId,// $(tr).find('td:eq(2)').text(),
                InorOut: "O",
                SecQty: outputlist[e].SecQty,//$(tr).find('td:eq(8)').text(),
                CatType: outputlist[e].CatType,// $(tr).find('td:eq(9)').text(),
                Required: outputlist[e].Required,//1

            }
            oplist.push(list);
        }
    }


    var objedit = {

        ProdPrgid: $('#txtProdPrgid').val(),
        ProdPrgNo: $('#txtprdprgno').val(),
        ProgDate: $('#txtplanprogdate').val(),
        ProcessId: pid,// 3,// tableload[0].,// ProcessId,
        //ProcessId: prodplanningList.ProcessId,
        Job_ord_no: $('#txtwrkordno').val(),
        companyunitid: CompUnitId,//5,//prodplanningedit[0].CompanyUnit,// CompanyUnitId,
        companyid: CompId,//1,// CompanyId,
        OrderType: OType,//'W',// Ordertype,//$('#optworkorder').val(),
        ProgramType: 'P',//$('#txtprocess').val()
        ProdListInputDetails: iplist,// Datas[n][k],
        ProdListOutputtDetails: oplist,
        // Closed:'N',
        //IsProportion: 'N',
        Amend: 'N',
        Approved: 'N',
        CreatedBy: Guserid,
        ApprovedBy: Guserid,
        FinalizeAutoPost: 'Y',
        Prog_Seq_No: ProgSeqNo
    }


    LoadingSymb();
    $.ajax({
        url: "/ProcessProgram/UpdateProd",
        data: JSON.stringify(objedit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // $('#myModal').modal('hide');

            if (result.Value == 1) {
                //alert('Data Updated Successfully');
                var msg = "Data Updated Sucessfully...";
                var flg = 1;
                var mod = 1;
                var url = "";
                AlartMessage(msg, flg, mod, url);
                // window.location.href = "/ProcessProgram/ProcessProgramIndex";
                $('#myModal3').hide();

                EditProg(JobId);
            }
            else {
                window.location.href = "/Error/Index";
            }

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });



}
function load() {
    debugger;
    var cmpid = $('#ddlproCompany').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    $.ajax({
        type: "POST",
        url: '/ProcessProgram/ListEdit',
        data: JSON.stringify({ FromDate: FDate, ToDate: TDate, CompanyId: cmpid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            loadlist = json.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });


}
function CloseAddProgramList() {
 
    window.location.href = "/PlanningMain/PlanningMainIndex";
}

function CheckProgMade(ProcessId) {
    alert(ProcessId);
}

function LockDet() {
    var ord = $('#txtJobNo').val();
    var sty = 1;

    $.ajax({
        url: "/BudgetApproval/LoadLockDet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Type: 'C' }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //var obj = result;
            PlanLock = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}


function LoadFOrdDropDetails() {


    var BMasId = $('#ddlCPOrderNo').val();
   
    var StyId = $('#ddlCPSty').val();
    var RefNo = "";
    RefNo = "";
   var  JbId = 0;
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

function LoadCopy() {

    debugger;
    var orderno = $('#ddlCPOrderNo option:selected').text();

    var StyId = $('#ddlCPSty').val();
  
    $('#sbTwo option').prop('selected', true);
    var dd = [];
    $('.selectpicker :selected').each(function (i, selected) {
        dd[i] = $(selected).val();
    });

    if (PSID > 0) {
        var msg = 'Process Sequence already added...';
        var flg = 4;
        var mode = 1;
        var url = "";
        AlartMessage(msg, flg, mode, url);
        return true;

    }
    else {
        if (dd.length == 0) {
            $.ajax({
                url: "/ProcessProgram/GetCopyProcessList",
                data: JSON.stringify({ Orderno: orderno, Styleid: StyId }),
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",

                success: function (result) {
                    debugger;
                    var obj = result.Value;
                    if (result.Status == 'SUCCESS') {

                        var data = result.Value;

                        //Style
                        $(sbTwo).empty();
                        $.each(data, function () {
                            $(sbTwo).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
                        });
                    }


                }

            });
        }
        else {

            var msg = 'Process already added...';
            var flg = 4;
            var mode = 1;
            var url = "";
            AlartMessage(msg, flg, mode, url);
            return true;
        }
    }
}



/////////////////