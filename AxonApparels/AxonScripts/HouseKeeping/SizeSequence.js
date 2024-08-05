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
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    EnbTranDate = $("#hdnETransDate").data('value');

    LoadSizeSeqDDL("#ddlProcess");
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

    loaddetails();

    $('#btnAdd').click(function () {
        debugger;
        var rr = [];
        $('.selectpicker :selected').each(function (i, selected) {
            rr[i] = $(selected).val();
        });

        AddData(rr);
    });



    $('#btnUp').click(function () {
        debugger;
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
                    var flg = 1;
                    var mod = 0;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
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





function UpdateData(dd) {
    debugger;


    var ddlPr = dd;
    ID = $("#txtpseqid").val();


    //EDelete(ID);

    if (ddlPr == "") {
        //If the "Please Select" option is selected display error.
        //alert("Please select any one Size!");
        var msg = 'Please select any one Size..!';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return false;
    }


    LoadingSymb();
    $.ajax({
        url: "/Size/SeqAdd/",
        data: JSON.stringify({ sbTwo: dd }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                //alert("Data Updated Sucessfully");
                //window.location.href = "/SizeSequence/SizeSequenceIndex";
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "/SizeSequence/SizeSequenceIndex";
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


function loaddetails() {
    debugger;
    $.ajax({
        url: "/Size/GetSizeSeqLoad",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
 
            $.each(result, function () {
                $("#sbTwo").append($("<option></option>").val(this.SizeId).html(this.SizeName));
            });
            
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}










function ModelClose() {
    window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserName;;
}









/////////////////