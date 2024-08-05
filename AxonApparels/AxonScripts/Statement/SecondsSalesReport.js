var ordNoDDL = "#";
var MOrd = 0;
var Mref = 0;
$(document).ready(function () {

    getDate();
    LoadCompanyDDL("#ddlMCompany");
    LoadSupplierDDL("#ddlMSupplier"); 
    LoadItemDDL("#ddlItem");
    LoadStyleDDL("#ddlStyle");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlRefNo");
    LoadCompanyUnitDDL("#ddlMCompanyunit");
    GetTransNoDDL();
});

function LoadReport() {
    debugger;

   // var OrRefNo = Mref;
    var OrdRefNo = "";
    var OrRefNo = $('select#ddlRefNo option:selected').val();

    if (OrRefNo == 0) {
        OrdRefNo == "";
    }
    else {

        OrdRefNo = Mref;
    }
    //var OrdNo = MOrd;
    var OrdNo = "";
    var ONo = $('select#ddlOrdNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = MOrd;
    }


    var compid = $('#ddlMCompany').val();
    var unitid = $('#ddlMCompanyunit').val();
    var Suppid = $('#ddlMSupplier').val();
    var styleid = $('#ddlStyle').val();
    var entryno = '';
    var entno = $('#ddlEntryNo option:selected').val();
    if (entno == 0) {
        entryno = '';
    } else {
        entryno = $('#ddlEntryNo option:selected').text();
    }

    var Fdt = $('#txtFromDate').val();
    var Tdt = $('#txtToDate').val();
    window.open("../Reports/Stores/SecondsSalesReport.aspx?UnitID=" + unitid + "&CmpID=" + compid + "&SuppID=" + Suppid + "&OrRefNo=" + OrdRefNo + "&OrdNo=" + OrdNo + "&StyID=" + styleid + "&Fdt=" + Fdt + "&Tdt=" + Tdt + "&Entry=" + entryno);
}
function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = Cmonth + "/" + day + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;
    $('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);

}


function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlMOrderNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        MOrd = MOrd + "," + foo[i];


    });

}
function myRef(Val) {
    debugger;
    var foo = [];
    Mref = 0;
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).text();

        Mref = Mref + "," + foo[i];


    });

}

function GetTransNoDDL() {

    $.ajax({
        url: "/SecondsSales/LoadSSentryno",
        //data: JSON.stringify({ FromDate: FDate, ToDate: TDate, OrderNo: 0, Refno: 0, Styid: 0, masid: 0, compid: cpId, Otype: Typ }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var data = result.Value;

            //JobNo
            $(ddlEntryNo).empty();
            $(ddlEntryNo).append($('<option/>').val('0').text('--Select EntryNo--'));
            $.each(data, function () {
                $(ddlEntryNo).append($('<option></option>').val(this.Fabmasid).text(this.Entryno));
            });
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}