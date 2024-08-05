var OrderCloseList = [];
var rowindex = -1;
var refNoDDL = "#";
var ItemList = [];
var OrderCancelAddFlg = "disabled";
var OrderCancelDelete = "disabled";
$(document).ready(function () {

    LoadBuyerDDL("#ddlMBuyer");
    LoadCompanyDDL("#ddlMCompany");

    GetRefNo();
    LoadOrderNoDDL("#ddlOrderNo");
    LoadStyleDDL("#ddlMStyle");

    LoadGrid();
    getDate();
    $('#myModal').modal('show');
   
});

function List() {
    $('#tOCbody').DataTable().destroy();

    var otype = $('input[name="Revert"]:checked').attr('value');

    if (otype == "N") {
        LoadGrid();
    }
    else if (otype == "Y") {
        LoadGridRevert();
    }
}

function getDate() {
    debugger;
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

    $('#txtToDate').val(Fdatestring);
    $('#txtFromDate').val(datestring);

}

function GetRefNo() {


    $('#ddlRefNo').empty();
    LoadRefNoDDL("#ddlRefNo");

}

function LoadRefNoDDL(RefDDLName) {
    refNoDDL = RefDDLName;
    httpGet("/BulkOrder/GetRefNo", onRefNoSuccess, onRefNoFailure);
}

function onRefNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        $(ddlRefNo).empty();
        $(ddlRefNo).append($('<option/>').val('0').text('--Select Refno--'));
        $.each(data, function () {
            $(ddlRefNo).append($('<option></option>').text(this.Ref_No));
        });
    }
    else {
        //alert('RefNo loading failed');
        var msg = 'Refer Number loading failed...';
        var flg = 4;
        var mode = 1;
        AlartMessage(msg, flg, mode);
    }
}

function onRefNoFailure(result) {
    //alert('RefNo loading failed');
    var msg = 'Refer Number loading failed...';
    var flg = 4;
    var mode = 1;
    AlartMessage(msg, flg, mode);
}
function LoadGrid() {

    var otype = $('input[name="Revert"]:checked').attr('value');

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }



    var cmpid = $('#ddlMCompany').val();
    var buyid = $('#ddlMBuyer').val();
    var styid = $('#ddlMStyle').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrdNo = $('#ddlOrderNo').val();


    $.ajax({
        url: "/OrderCancellation/ListOrderClose",
        data: JSON.stringify({ CCompId: cmpid, CBmasId: OrdNo, CRefNo: RefNo, CBuyId: buyid, StyleId: styid, FmDate: FDate, ToDate: TDate, COrderType: otype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadcancelItemTable(ItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function loadcancelItemTable(ItemList) {

    $('#tblEntryCancelItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryCancelItemdetails').DataTable({
        "order": [[1, "asc"]],
        data: ItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "BuyOrdMasId", data: "CBmasId", "visible": false },
            { title: "StyleId", data: "StyleId", "visible": false },
            { title: "Buyer", data: "Buyer" },
            { title: "OrderNo", data: "COrdNo" },
            { title: "RefNo", data: "CRefNo" },
            { title: "Merchandiser", data: "Employee" },
            { title: "Style", data: "Style" },
                 {
                     title: "ACTION", "mDataProp": null,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Closed" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" '+OrderCancelAddFlg+' class="btnCItemview btn btn-round btn-danger"> <i class="fa fa-times-circle "></i> </button></div>'
                 },
        ]
    });




    var table = $('#tblEntryCancelItemdetails').DataTable();
    $("#tblEntryCancelItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryCancelItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

   
}

function getbyID(MasID) {
    debugger;


    $.ajax({
        url: "/OrderCancellation/EditOrderCloseList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var StyleId = obj.StyleId;
                var OrderNo = obj.COrdNo;

                UpdateWithHeld(StyleId, OrderNo);


                debugger;


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
function getbycancelID(MasID) {
    debugger;


    $.ajax({
        url: "/OrderCancellation/EditOrderCloseList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var StyleId = obj.StyleId;
                var OrderNo = obj.COrdNo;

                UpdateCancelOrder(StyleId, OrderNo);


                debugger;


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
function getbyclosureID(MasID) {
    debugger;


    $.ajax({
        url: "/OrderCancellation/EditOrderCloseList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var StyleId = obj.StyleId;
                var OrderNo = obj.COrdNo;

                UpdateClosureOrder(StyleId, OrderNo);


                debugger;


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
function getbyRevertID(MasID) {
    debugger;


    $.ajax({
        url: "/OrderCancellation/EditOrderCloseList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var StyleId = obj.StyleId;
                var OrderNo = obj.COrdNo;

                UpdateRevertOrder(StyleId, OrderNo);


                debugger;


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
function UpdateWithHeld(StyleId, OrderNo) {

    var nomObj = {

        StyleId: StyleId,
        COrdNo: OrderNo,
        OrderType: 'W',
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderCancellation/UpdateOrderWithHeld",
        data: JSON.stringify(nomObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function UpdateCancelOrder(StyleId, OrderNo) {

    var cObj = {
        StyleId: StyleId,
        COrdNo: OrderNo,
        OrderType: 'C',
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderCancellation/UpdateOrderCancel",
        data: JSON.stringify(cObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function UpdateClosureOrder(StyleId, OrderNo) {

    var cObj = {
        StyleId: StyleId,
        COrdNo: OrderNo,
        OrderType: 'Y',
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderCancellation/UpdateOrderWithHeld",
        data: JSON.stringify(cObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tOCbody').DataTable().destroy();
            LoadGrid();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function UpdateRevertOrder(StyleId, OrderNo) {

    var cObj = {
        StyleId: StyleId,
        COrdNo: OrderNo,
        OrderType: 'N',
    };
    LoadingSymb();
    $.ajax({
        url: "/OrderCancellation/UpdateOrderWithHeld",
        data: JSON.stringify(cObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tOCbody').DataTable().destroy();
            LoadGrid();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function RadioPClick() {

    $('#tOCbody').DataTable().destroy();
    LoadGrid();
}
function RadioCClick() {

    $('#tOCbody').DataTable().destroy();
    LoadGridRevert();
}
function LoadGridRevert() {
    var otype = $('input[name="Revert"]:checked').attr('value');

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlRefNo option:selected').val();
    }


    var cmpid = $('#ddlMCompany').val();
    var buyid = $('#ddlMBuyer').val();
    var styid = $('#ddlMStyle').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OrdNo = $('#ddlOrderNo').val();


    $.ajax({
        url: "/OrderCancellation/ListOrderCloseRevert",
        data: JSON.stringify({ CCompId: cmpid, CBmasId: OrdNo, CRefNo: RefNo, CBuyId: buyid, StyleId: styid, FmDate: FDate, ToDate: TDate, COrderType: otype }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItemList = result;
            loadRevItemTable(ItemList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function loadRevItemTable(ItemList) {

    $('#tblEntryCancelItemdetails').DataTable().destroy();
    debugger;

    var table = $('#tblEntryCancelItemdetails').DataTable({
        "order": [[1, "asc"]],
        data: ItemList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        //"bSort": false,
        columns: [

             { title: "BuyOrdMasId", data: "CBmasId", "visible": false },
            { title: "StyleId", data: "StyleId", "visible": false },
            { title: "Buyer", data: "Buyer" },
            { title: "OrderNo", data: "COrdNo" },
            { title: "RefNo", data: "CRefNo" },
            { title: "Merchandiser", data: "Employee" },
            { title: "Style", data: "Style" },
                 {
                     title: "ACTION", "mDataProp": null,
                     "sDefaultContent": '<div style="display:inline-flex;"><button type="button" data-toggle="tooltip" data-placement="top" title="Revert" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;"  ' + OrderCancelDelete + ' class="btnRItemview btn btn-round btn-info"> <i class="fa fa-repeat "></i> </button></div>'
                 },
        ]
    });




    var table = $('#tblEntryCancelItemdetails').DataTable();
    $("#tblEntryCancelItemdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblEntryCancelItemdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function Grid() {

    $('#tOCbody').DataTable().destroy();
    LoadGrid();
}

$(document).on('click', '.btnCItemview', function () {
    debugger;

    rowindex = $(this).closest('tr').index();
    var curentro1 = ItemList.slice(rowindex);

    var StyId = curentro1[0]['StyleId'];
    var OrdNo = curentro1[0]['COrdNo'];
  
    AddUserEntryLog('SalesManagement', 'Order Cancellation', 'CANCEL', OrdNo);
    UpdateCancelOrder(StyId, OrdNo);




});

$(document).on('click', '.btnRItemview', function () {
    debugger;

    rowindex = $(this).closest('tr').index();
    var curentro1 = ItemList.slice(rowindex);

    var StyId = curentro1[0]['StyleId'];
    var OrdNo = curentro1[0]['COrdNo'];

    AddUserEntryLog('SalesManagement', 'Order Cancellation', 'REVERT', OrdNo);
    UpdateWithHeld(StyId, OrdNo);


});
function Close() {
    window.location.href = "/DefaultPage/DefaultPage";
}
//function Close() {
//    $('#myModal').modal('hide');
//     window.location.reload();
//    LoadBuyerDDL("#ddlMBuyer");
//    LoadCompanyDDL("#ddlMCompany");

//    GetRefNo();
//    LoadOrderNoDDL("#ddlOrderNo");
//    LoadStyleDDL("#ddlMStyle");

//    LoadGrid();
//    getDate();

//}