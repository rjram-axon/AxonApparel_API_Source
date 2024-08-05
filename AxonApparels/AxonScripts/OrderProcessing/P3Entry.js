$(document).ready(function () {
    //GenerateNumber();
    debugger;
    loadData();
    LoadBulkOrdRefNoDDL("#ddlRefNo");
  
});


function clearTextBox() {
    debugger;
    $('#EntryID').val("");
    $('#txtyarnpo').val("");
    $('#ddlRefNo').empty();
    $('#txtyarnih').val("");
    $('#txtfabih').val("");
    $('#txtRemrks').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#EntryID').css('border-color', 'lightgrey');
    $('#txtdesc').css('border-color', 'lightgrey');
    $('#ddlRefNo').css('border-color', 'lightgrey');
    $('#txtRemrks').css('border-color', 'lightgrey');

    LoadBulkOrdRefNoDDL("#ddlRefNo");
  
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
        Yarn_PO: $('#txtyarnpo').val(),
        Yarn_IH: $('#txtyarnih').val(),
        Fab_IH: $('#txtfabih').val(),
        Remarks: $('#txtRemrks').val(),      
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/P3Entry/Add",
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
        url: '/P3Entry/List/',
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
        url: "/P3Entry/GetbyEditID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#EntryID').val(obj.P3EntryId);
                $('#ddlRefNo').val(obj.Buy_Ord_MasId);
                $('#txtyarnpo').val(obj.Yarn_PO);
                $('#txtRemrks').val(obj.Remarks);
                $('#txtyarnih').val(obj.Yarn_IH);
                $('#txtfabih').val(obj.Fab_IH);

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
        P3EntryId: $('#EntryID').val(),
        Buy_Ord_MasId: $('#ddlRefNo').val(),
        Yarn_PO: $('#txtyarnpo').val(),
        Yarn_IH: $('#txtyarnih').val(),
        Fab_IH: $('#txtfabih').val(),
        Remarks: $('#txtRemrks').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/P3Entry/Update",
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
            url: "/P3Entry/Delete/" + ID,
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
