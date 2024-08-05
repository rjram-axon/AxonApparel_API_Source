var MOrd = 0;
var MRef = 0;
$(document).ready(function () {
    LoadCompanyDDL("#ddlMFromCompany");
    LoadCompanyDDL("#ddlMToCompany");
    LoadItemDDL("#ddlFromItem,#ddlToItem");
    LoadColorDDL("#ddlFromColor,#ddlToColor");
    LoadSizeDDL("#ddlFromSize,#ddlToSize");
    LoadStyleDDL("#ddlStyle");
    LoadOrderNoDDL("#ddlOrdNo");
    LoadRefNoDDL("#ddlRefNo");
    getDate();
    loadEntryNo();
});
function myOrder(Val) {
    debugger;
    var foo = [];
    MOrd = 0;
    $('#ddlOrdNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MOrd = MOrd + "," + foo[i];


    });
}
function loadEntryNo()
{
    $.ajax({
        url: "/ItemTransferStatement/LoadItemtransStatementList",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                //var data = result.Value;


                //var stydet = {};
                //var sty = [];

                //var jobdet = {};
                //var job = [];

                //$.each(obj, function (i, el) {

                //    if (!stydet[el.StyleID]) {
                //        stydet[el.StyleID] = true;
                //        sty.push(el);
                //    }

                //    if (!jobdet[el.Job_Ord_No]) {
                //        jobdet[el.Job_Ord_No] = true;
                //        job.push(el);
                //    }

                //});

                $("#ddlEntryNo").empty();
                //$("").empty();

                $("#ddlEntryNo").append($('<option/>').val('0').text('--Select EntryNo--'));
                $.each(obj, function () {
                    $("#ddlEntryNo").append($('<option></option>').val(this.TransMasId).text(this.EntryNo));
                });

                //$(ddlMJobNo).append($('<option/>').val('0').text('--Select JobNo--'));
                //$.each(job, function () {
                //    $(ddlMJobNo).append($('<option></option>').text(this.Job_Ord_No));
                //});
            }
        }

    });
}
function myRef(Val) {
    debugger;
    var foo = [];
    MRef = 0;
    $('#ddlRefNo :selected').each(function (i, selected) {
        foo[i] = $(selected).val();

        MRef = MRef + "," + foo[i];


    });
}
function getDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#EntryDate').val(Fdatestring);
}
function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    var FCmpID = $('#ddlMFromCompany').val();
    var TCmpID = $('#ddlMToCompany').val();
    var FItem = $('#ddlFromItem').val();
    var TItem = $('#ddlToItem').val();
    var FColor = $('#ddlFromColor').val();
    var TColor = $('#ddlToColor').val();
    var FSize = $('#ddlFromSize').val();
    var TSize = $('#ddlToSize').val();
    var OrdNo = MOrd;
    var RefNo = MRef;
    var styleid = $('#ddlStyle').val();
    var EntryNoId = $('#ddlEntryNo').val();
    var EntryDate = $('#EntryDate').val();
    //var IGrp = $('#ddlItemGroup option:selected').text();

    //var IGrp = $('select#ddlItemGroup option:selected').val();

    //if (IGrp == 0) {
    //    IGrp = "";
    //}
    //else {

    //    IGrp = $('select#ddlItemGroup option:selected').text();
    //}

    var Ordtype = $('input[name="proctype"]:checked').attr('value');
    var frmdate = $('#txtFromDate').val();
    var todate = $('#txtToDate').val();
    //var ItemGroup = $('input[name="grouptype"]:checked').attr('value');

    window.open("../Reports/Stores/ItemTransferReport.aspx?FCmpID=" + FCmpID + "&FItem=" + FItem + "&TItem=" + TItem + "&FColor=" + FColor
             + "&TColor=" + TColor + "&FSize=" + FSize + "&TSize=" + TSize + "&OrdNo=" + OrdNo + "&RefNo=" + RefNo + "&styleid=" + styleid + "&EntryNoId=" + EntryNoId + "&EntryDate=" + EntryDate + "&Ordtype=" + Ordtype + "&FDate=" + FDate + "&TDate=" + TDate);

}