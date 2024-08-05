$(document).ready(function () {
    //GenerateNumber();
    debugger;
    loadData();
    LoadSampleOrdRefNoDDL("#ddlRefNo");
});

function clearTextBox() {
    debugger;
    $('#EntryID').val("");
    $('#txtfabric').val("");
    $('#ddlRefNo').val(0);
    $('#txtelastic').val("");
    $('#txtprotosubmit').val("");
    $('#txtphotosuitsamsew').val("");    
    $('#txtremarks').val("");
    $("#ddlRefNo").empty();

    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#EntryID').css('border-color', 'lightgrey');
    $('#ddlRefNo').css('border-color', 'lightgrey');
    $('#txtremarks').css('border-color', 'lightgrey');

    LoadSampleOrdRefNoDDL("#ddlRefNo");
}

function Add() {

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });
    debugger;
    var Obj = {
        Buy_Ord_MasId: $('#ddlRefNo').val(),
        Fabric: $('#txtfabric').val(),
        Elastic: $('#txtelastic').val(),
        PhotoSuitSmpleSew: $('#txtphotosuitsamsew').val(),
        PhotoSuitSmpleSubmit: $('#txtprotosubmit').val(),
        Remarks: $('#txtremarks').val(),
        IsActive: ischecked,
    };
    LoadingSymb();
    $.ajax({
        url: "/S2PhotoSuit/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                //window.location.href = "/Error/Index";
                alert("Record saved failed...");
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
        url: '/S2PhotoSuit/List/',
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
                         { title: "Ref No" },
                         { title: "Remarks" },
                         { title: "Status" },
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
        url: "/S2PhotoSuit/GetbyEditID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
               
                $('#EntryID').val(obj.S2EntryId);
                $('#ddlRefNo').val(obj.Buy_Ord_MasId);
                $('#txtfabric').val(obj.Fabric);
                $('#txtelastic').val(obj.Elastic);
                $('#txtphotosuitsamsew').val(obj.PhotoSuitSmpleSew),
                $('#txtprotosubmit').val(obj.PhotoSuitSmpleSubmit);
                $('#txtremarks').val(obj.Remarks);

                if (obj.IsActive == "TRUE") {
                    $('#Status').prop("checked", true);
                } else {
                    $('#Status').prop("checked", false);
                }

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
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
        //if (ischecked) {
    });

    debugger;
    var Obj = {
        S2EntryId: $('#EntryID').val(),
        Buy_Ord_MasId: $('#ddlRefNo').val(),
        Fabric: $('#txtfabric').val(),
        Elastic: $('#txtelastic').val(),
        PhotoSuitSmpleSew: $('#txtphotosuitsamsew').val(),
        PhotoSuitSmpleSubmit: $('#txtprotosubmit').val(),
        Remarks: $('#txtremarks').val(),
        IsActive: ischecked,
    };

    LoadingSymb();
    $.ajax({
        url: "/S2PhotoSuit/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                //window.location.href = "/Error/Index";
                alert('Data Updated Failed...');
            }

            else {
                alert('Data Updated Successfully...');
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
    debugger;
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/S2PhotoSuit/Delete/" + ID,
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
                    //window.location.href = "/Error/Index";
                    alert('Data delete failed...');
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
