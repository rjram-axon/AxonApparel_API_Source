
$(document).ready(function () {

    gettodayDate();

})

function gettodayDate() {

    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    entrydate = Fdatestring;
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

function finyrclose() {

    $('#myModal2').modal('hide');

}

function finyrAdd() {
    var res = validate();

    if (res == false) {
        return false;
    }
    var avggram = $("#txtDescp").val();
    var avggram = $("#txtavggarm").val();
    var avggram = $("#txtavggarm").val();
    var avggram = $("#txtavggarm").val();
}