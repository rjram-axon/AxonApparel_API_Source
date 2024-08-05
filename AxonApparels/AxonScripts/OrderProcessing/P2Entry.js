$(document).ready(function () {
    //GenerateNumber();
    debugger;
    loadData();
    LoadBulkOrdRefNoDDL("#ddlRefNo");
    getDate();
});


function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();


    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;

    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;

    //alert(MainFDate + "1getdate");

    $('#txtP1Date').val(Fdatestring);
    $('#txtP2Date').val(Fdatestring);


}


function GetDescripton() {
    debugger;
    var id = $("#ddlRefNo").val();
    if (id == 0) {
        alert('Please select any one RefNo...');
        return true;
    }

    $.ajax({
        url: "/P1Entry/GetbyId/" + id,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (obj.length > 0) {
                $("#txtdesc").val(obj[0].Description);
            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}


function clearTextBox() {
    debugger;
    $('#EntryID').val("");
    $('#txtdesc').val("");
    $('#ddlRefNo').empty();
    $('#txtRemrks').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#EntryID').css('border-color', 'lightgrey');
    $('#txtdesc').css('border-color', 'lightgrey');
    $('#ddlRefNo').css('border-color', 'lightgrey');
    $('#txtRemrks').css('border-color', 'lightgrey');

    LoadBulkOrdRefNoDDL("#ddlRefNo");
    getDate();
}


function Add() {

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        //if (ischecked) {

    });
    debugger;
    var Obj = {
        Buy_Ord_MasId: $('#ddlRefNo').val(),
        Description: $('#txtdesc').val(),
        Remarks: $('#txtRemrks').val(),
        P1Date: $('#txtP1Date').val(),
        P2Date: $('#txtP2Date').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/P2Entry/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }

            else {
                alert('Data Saved Successfully');
                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();
                loadData();
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Load Data function
function loadData() {
    $.ajax({
        type: "GET",
        url: '/P2Entry/List/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tbody').DataTable({
                data: dataSet,
                scrollY: 300,
                scrollCollapse: true,
                paging: false,
                fixedColumns: false,
                select: false,
                scrollX: "100%",
                scrollXInner: "100%",
                scroller: false,
                select: {
                    style: 'single'
                },
                "bSort": false,
                columns: [
                         { title: "ID", "visible": false },
                         { title: "RefNo" },
                         { title: "Description" },
                         { title: "Remarks" },
                         { title: "Action" },
                ]

            });

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function getbyID(ID) {
    debugger;

    $.ajax({
        url: "/P2Entry/GetbyEditID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#EntryID').val(obj.P2EntryId);
                $('#ddlRefNo').val(obj.Buy_Ord_MasId);
                $('#txtdesc').val(obj.Description);
                $('#txtRemrks').val(obj.Remarks);
                $('#txtP1Date').val(moment(obj.P1Date).format('DD/MM/YYYY'));
                $('#txtP2Date').val(moment(obj.P2Date).format('DD/MM/YYYY'));

                debugger;
                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
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


function Update() {

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        //if (ischecked) {

    });
    debugger;
    var Obj = {
        P2EntryId: $('#EntryID').val(),
        Buy_Ord_MasId: $('#ddlRefNo').val(),
        Description: $('#txtdesc').val(),
        Remarks: $('#txtRemrks').val(),
        P1Date: $('#txtP1Date').val(),
        P2Date: $('#txtP2Date').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/P2Entry/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";

            }

            else {
                alert('Data Updated Successfully');
                $('#myModal').modal('hide');
                $('#tbody').DataTable().destroy();
                loadData();
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function Delete(ID) {

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/P2Entry/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == 1) {
                    alert('Data Deleted Successfully...')
                    $('#myModal').modal('hide');
                    $('#tbody').DataTable().destroy();
                    loadData();
                }
                else {
                    window.location.href = "/Error/Index";
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
