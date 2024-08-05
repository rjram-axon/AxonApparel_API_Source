
var ProcSeqSetUpDDL = "#";
var ProcSeqSetSeqUpDDL = "#";
$(document).ready(function () {

    LoadProcessSeqSetDDL("#ddlProcess");
    LoadProcessSeqSetSeqDDL("#sbTwo");



    //$('#btnAdd').click(function () {

    //    var rr = [];
    //    $('.selectpicker :selected').each(function (i, selected) {
    //        rr[i] = $(selected).val();
    //    });

    //    AddData(rr);
    //});


    $('#btnAdd').click(function () {
        $('#sbTwo option').prop('selected', true);

        var dd = [];
        $('.selectpicker :selected').each(function (i, selected) {
            dd[i] = $(selected).val();
        });


        AddData(dd);
        //AddData(dd);
        //alert(dd);
    });

})

function LoadProcessSeqSetDDL(ProcessSeqSetUpDDL) {
    ProcSeqSetUpDDL = ProcessSeqSetUpDDL;
    httpGet("/Process/GetProcessSeqSetUp", onProSeqSetSuccess, onProSeqSetFailure);
}
function LoadProcessSeqSetSeqDDL(ProcessSeqSetSeqUpDDL) {
    ProcSeqSetSeqUpDDL = ProcessSeqSetSeqUpDDL;
    httpGet("/Process/GetProcessSeqSetSeqUp", onProSeqSetSeqSuccess, onProSeqSetSeqFailure);
}
function onProSeqSetSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ProcSeqSetUpDDL).empty();
        $.each(data, function () {
            $(ProcSeqSetUpDDL).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
        });
    }
    else {
        //alert('ProcessSequenceSetUp loading failed');
        var msg = 'ProcessSequenceSetUp loading failed...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
}

function onProSeqSetFailure(result) {
    //alert('ProcessSequenceSetUp loading failed');
    var msg = 'ProcessSequenceSetUp loading failed...';
    var flg = 4;
    var mod = 1;
    var ur = "";
    AlartMessage(msg, flg, mod, ur);
}

function onProSeqSetSeqSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ProcSeqSetSeqUpDDL).empty();
        $.each(data, function () {
            $(ProcSeqSetSeqUpDDL).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
        });
    }
    else {
        //alert('ProcessSequenceSetUp loading failed');
        var msg = 'ProcessSequenceSetUp loading failed...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
    }
}

function onProSeqSetSeqFailure(result) {
    //alert('ProcessSequenceSetUp loading failed');
    var msg = 'ProcessSequenceSetUp loading failed...';
    var flg = 4;
    var mod = 1;
    var ur = "";
    AlartMessage(msg, flg, mod, ur);
}

function AddData(rr) {
    debugger;

    var ddlPr = rr;
    if (ddlPr == "") {
        //If the "Please Select" option is selected display error.
        //alert("Please select any one Process!");
        var msg = 'Please select any one Process..!';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return false;
    }

    LoadingSymb();
    $.ajax({
        url: "/ProcessSequenceSetup/Add",
        data: JSON.stringify({ sbTwo: rr }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                //alert("Data Saved Sucessfully");              
                //    window.location.reload();                
                var msg = 'Data Saved Sucessfully..!';
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

function ModelClose() {
       
    window.location.href = "/BulkOrder/BulkOrderIndex";
}