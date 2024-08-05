var Gp = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var PurAgnInd = 0;
var PurAppId = 0;
var Rpt = '';
var PurOrdId = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkStyle = true;
var ChkPONo = true;
var ChkComp = false;
var DPurApp = 0;
var PlanFabric = [];
var UserName = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    PurAppId = $("#hdnPurAppid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    DPurApp = $("#hdnPurAppid").data('value');
    UserName = $("#hdnusername").data('value');
    //getDate();
       


});





function UpdateShrink() {
    
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/DBbackup/UpdateShrink",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                //alert("Database Shrink Sucessfully");

                //window.location.reload();
                var msg = 'Database Shrink Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Updateuser() {

    debugger;
    LoadingSymb();
    $.ajax({
        url: "/DBbackup/UpdateBackUp",
        data: JSON.stringify(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                //alert("Database Backup Sucessfully");

                //window.location.reload();
                var msg = 'Database Backup Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
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

    window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserName;
}