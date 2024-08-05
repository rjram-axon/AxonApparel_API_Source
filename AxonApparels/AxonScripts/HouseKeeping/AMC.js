var fdate = '';
var resary2 = [];
var dcompany = '';
$(document).ready(function () {
    MainFDate = $("#hdMainFromDate").data('value');
    LoadMisData();
  //  LoadCompanyddl();
    getDate();
})

function getDate() {
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    fdate= Fdatestring;

    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
}
function Updateuser() {

    var companyid = $('#ddlUserCompany').val();
    if (companyid == 0 || companyid == null) {
        companyid = 0;
    }

    try {
        $.ajax({
            url: "/AMC/UpdateUserdata",
            data: JSON.stringify({ dcompanyid: companyid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                //alert('Data Updated Successfully...');
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
                $('#txtFromDate').val(MainFDate);
                $('#txtToDate').val(fdate);
                $('#txtUserLicence').val('');
                $('#ddlUserCompany').val('0').trigger('change');
                //machinename = result;
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    }
    catch (e) { }
}

function LoadCompanyddl() {
    $.ajax({
        url: "/AMC/GetCompany/",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=UTF-8",

        success: function (result) {
            
            var obj = result.Value;
            var count = obj.length;
            $.each(obj, function (i, el) {                
                resary2.push(el);
                debugger;
                if (resary2.length === count ) {
                  companyddl();
                }
            });    
        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function companyddl() {
    debugger;
    var resary = [];
    for (i = 0; resary2.length > i; i++) {
        var compname = resary2[i].Company.toUpperCase();
        var dcomp = dcompany.toUpperCase().match(compname);
        if (dcomp != null) {
            resary.push(resary2[i]);           
        }
    }
   
    $('#ddlUserCompany').empty();
    $('#ddlUserCompany').append($('<option/>').val('0').text('--Select Company--'));
    for (j = 0; resary.length > j; j++) {
        $('#ddlUserCompany').append($('<option></option>').val(resary[j].dCompanyId).text(resary[j].Company)); 
}

}

function CheckUserLicence() {
    
    var companyid = $('#ddlUserCompany').val();
    if (companyid == 0 || companyid == null) {
        companyid = 0;
    }

    try {
        $.ajax({
            url: "/AMC/CheckUserLicence",
            data: JSON.stringify({ dcompanyid: companyid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var obj = result.Value;
                $('#txtFromDate').val(obj[0].Fromdate);
                $('#txtToDate').val(obj[0].Todate);
                $('#txtUserLicence').val(obj[0].NoOfUser);

                if (obj[0].ChkLicenceexpiry > 0) {
                    var msg = 'AMC Expired !!!';
                    var flg = 3;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                }

                //machinename = result;
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    }
    catch (e) { }
}
function LoadMisData() {

    $.ajax({
        url: "/MisSetting/GetMisDetails",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj != undefined) {         
                dcompany = obj[0]["Company"];
                LoadCompanyddl();
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}