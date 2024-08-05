$(document).ready(function () {
    GetP3Entry();
});



function GetP3Entry() {
    debugger;


    $.ajax({
        url: "/P3Entry/GetP3Entry/",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;

            if (result.Status == "SUCCESS") {
                var data = result.Value;
                debugger;
                $("#ddlMRefno").empty();
                $("#ddlMRefno").append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $("#ddlMRefno").append($('<option></option>').val(this.Buy_Ord_MasId).text(this.RefNo));
                });
            }




        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}


function LoadReport() {
    debugger;
    //if ($('#ddlMRefno').val() == 0) {
    //    $('#ddlMRefno').css('border-color', 'Red');
    //    return true;
    //}
    //else {
    //    $('#ddlMRefno').css('border-color', 'lightgrey');
    //}

    var bid = $('#ddlMRefno').val();
    window.location.href = "../Reports/Order/P3EntryStatementReport.aspx?BMasid=" + bid;
}