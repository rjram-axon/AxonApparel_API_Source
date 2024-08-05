var ApprovalTitleList = [];
var StyleRowId = 0;
var mod = 0;
var BMasId = 0;
var OrdNo = 0;
var Buyerid = 0;
var Styleid = 0;
var ordtype = '';
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');


    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRowId = queryvalue[1];
    Mod = queryvalue[3];
    BMasId = queryvalue[5];
    getDate();
    getbyID(StyleRowId);
    LoadApprovalDDL(StyleRowId)

    $('#btnAppadd').click(function () {
        debugger;
        var leng = 0;

        var isAllValid = true;


        if ($('#dllApprovaltitle').val() == "0") {

            $('#dllApprovaltitle').siblings(".select2-container").css('border', '1px solid red');

            isAllValid = false;
        }
        else {

            $('#dllApprovaltitle').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        for (var i = 0; ApprovalTitleList.length > i; i++) {
            var appid = $('#dllApprovaltitle').val();
            if (ApprovalTitleList[i].Approvalid == appid) {
                isAllValid = false;
                //alert("This Approval already added");
                var msg = 'This Approval already added...';
                var flg = 4;
                var mode = 1;
                AlartMessage(msg, flg, mode);
            }
        }


        if (ApprovalTitleList.length == 0) {
            leng = 1;

        }
        else {
            leng = ApprovalTitleList.length + 1;

        }

        if (isAllValid) {

            var appListObj = {
                order_no: $("#txtOrderNo").val(),
                styleid: Styleid,
                ordertype: ordtype,
                Approvalid: $('#dllApprovaltitle').val(),
                Sno: leng,
                ApprovalTitle: $("#dllApprovaltitle option:selected").text(),
                //Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            ApprovalTitleList.push(appListObj);

            loadApproveTable(ApprovalTitleList);
            $('#dllApprovaltitle').val('0');
        }

    });

    $(document).on('click', '.btnAppremove', function () {
        debugger;
        var fabricrowindex = $(this).closest('tr').index();
        var currentrowsel = ApprovalTitleList.slice(fabricrowindex);

        ApprovalTitleList.splice(fabricrowindex, 1);
        for (var i = 0; ApprovalTitleList.length > i; i++) {
            ApprovalTitleList[i].Sno = i + 1;
        }

        loadApproveTable(ApprovalTitleList);
        //document.getElementById("tblFabricdetails").deleteRow(fabricrowindex + 1);


    });

});

function getbyID(ID) {
    debugger;

    $.ajax({
        url: "/StyleApprovalTitle/GetAppmasDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {

                $('#txtOrderNo').val(obj[0]["order_no"]);
                $('#txtBuyer').val(obj[0]["BuyerName"]);
                $('#txtRefNo').val(obj[0]["Ref_No"]);
                $('#txtStyQty').val(obj[0]["quantity"]);
                $('#txtStyle').val(obj[0]["styleName"]);

                $('#txtDate').val(moment(obj[0]["OrderDate"]).format('DD/MM/YYYY'));
                //$('#txtEntryDate').val(moment(obj[0]["Entrydate"]).format('DD/MM/YYYY'));
                OrdNo = obj[0]["Orderno"];
                BMasId = obj[0]["Bmasid"];
                Buyerid = obj[0]["Buyerid"];
                Styleid = obj[0]["Styleid"];
                ordtype = obj[0]["Type"];
                //precostmasid = obj[0]["PreCostFabDeptmasid"];

                if (Mod == 0) {

                    loadApproveTable(ApprovalTitleList);
                }
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();
                    LoadEditAppDet(Styleid);

                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();
                    LoadEditAppDet(Styleid);
                }

            }

            $('#myModal1').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    $('#myModal1').modal('show');
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


}

function LoadEditAppDet(ID) {
    debugger;
    var ordno = $('#txtOrderNo').val();
    $.ajax({
        url: "/StyleApprovalTitle/GetAppEditDetails/",
        data: JSON.stringify({ Ordno: ordno, Id: ID }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            ApprovalTitleList = (result.Value);
            for (var i = 0; ApprovalTitleList.length > i;i++){
                ApprovalTitleList[i].Sno = i + 1;
            }

            loadApproveTable(ApprovalTitleList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadApproveTable(ApprovalTitleList) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblApprovaldetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblApprovaldetails').DataTable().destroy();
    }
    $('#tblApprovaldetails').empty();

    $('#tblApprovaldetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: ApprovalTitleList,
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
            { title: "OrdNo", data: "order_no", "visible": false },
            { title: "StyleId", data: "styleid", "visible": false },
            { title: "Approvalid", data: "Approvalid", "visible": false },
            { title: "ordertype", data: "ordertype", "visible": false },
            { title: "Sno", data: "Sno" },
            { title: "Approval Title", data: "ApprovalTitle" },
               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnAppremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblApprovaldetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblApprovaldetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}
function LoadApprovalDDL(ID) {
    debugger;
    $.ajax({
        url: "/StyleApprovalTitle/GetAppDDLdet/",
        data: JSON.stringify({ Id: ID }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj.length > 0) {
                var data = obj;
                var tardet = {};
                var tar = [];

                $.each(data, function (i, el) {

                    if (!tardet[el.ApprovalId]) {
                        tardet[el.ApprovalId] = true;
                        tar.push(el);
                    }
                    $(dllApprovaltitle).empty();

                    $(dllApprovaltitle).append($('<option/>').val('0').text('--Select ApprovalTitle--'));
                    $.each(tar, function () {
                        $(dllApprovaltitle).append($('<option></option>').val(this.ApprovalId).text(this.ApprovalName));
                    });

                });
            }
            else {
                $(dllApprovaltitle).empty();
                $(dllApprovaltitle).append($('<option/>').val('0').text('--Select ApprovalTitle--'));
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function alertm(msg, flg, mode) {
    //var msg = 'Please Check ApprovalList...';
    
    AlartMessage(msg, flg, mode);
}

function Save() {
    debugger;
    if (ApprovalTitleList.length == 0) {

        //alert("Please Check ApprovalList..");
        var msg = 'Please Check ApprovalList...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    var objSubmit = {
       
        AppDet: ApprovalTitleList
    };
    //$("#ConAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StyleApprovalTitle/Add",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'StyleApproval', 'ADD', $('#txtOrderNo').val());
                alert("Approval Saved Sucessfully");
                //var msg = 'Approval Saved Sucessfully...';
                //var flg = 4;
                //var mode = 1;
                //alertm(msg, flg, mode);
                
                //var flg = 4;
                //var mode = 1;
                //AlartMessage(msg, flg, mode);
               
                window.location.href = "/BulkOrder/BulkOrderIndex";
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
    debugger;
    if (ApprovalTitleList.length == 0) {

        //alert("Please Check ApprovalList..");
        var msg = 'Please Check ApprovalList...';
        var flg = 4;
        var mode = 1;
        alertm(msg, flg, mode);
        return true;
    }
    var objSubmit = {

        AppDet: ApprovalTitleList
    };
    //$("#ConAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StyleApprovalTitle/Update",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'StyleApproval', 'UPDATE', $('#txtOrderNo').val());
                alert("Approval Updated Sucessfully");
                //var msg = 'Approval Updated Sucessfully...';
                //var flg = 1;
                //var mode = 1;
                //alertm(msg, flg, mode);
                window.location.href = "/BulkOrder/BulkOrderIndex";
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
    debugger;
    if (ApprovalTitleList.length == 0) {

        //alert("Please Check ApprovalList..");
        var msg = 'Please Check ApprovalList...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
        return true;
    }
    var objSubmit = {

        AppDet: ApprovalTitleList
    };
    //$("#ConAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/StyleApprovalTitle/Delete",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                AddUserEntryLog('SalesManagement', 'StyleApproval', 'DELETE', $('#txtOrderNo').val());
                alert("Approval Deleted Sucessfully");
                window.location.href = "/BulkOrder/BulkOrderIndex";
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}


function Close() {
    window.location.href = "/BulkOrder/BulkOrderIndex";
}