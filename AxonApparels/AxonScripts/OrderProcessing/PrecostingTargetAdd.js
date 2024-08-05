var Orderlist = [];
var POrdID = 0;
$(document).ready(function () {
    debugger;
    GUserid = $("#hdnUserid").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    DCompid = $("#hdnDCompid").data('value');
    DCompUnitid = $("#hdnDCompUnitid").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    //LoadRefNoDDL("#ddlRefNo");
    //LoadOrdNoDDL("#ddlOrderNo");
    LoadOrderNoDDL("#ddlOrderNo");
    GetRefNo();
    //GetOrdNo();
    var Type = "precost";
    LoadMainGrid(Type);
   
    $("#tblAddDetails").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < Orderlist.length; d++) {
                    if (Orderlist[d].Buy_Ord_MasId == val) {
                        Orderlist[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < Orderlist.length; d++) {
                    if (Orderlist[d].Buy_Ord_MasId == val) {
                        Orderlist[d].CheckLoad = "N";
                    }

                }
            }

        });

    });

    $(document).on('click', '#btnReset', function () {
        debugger;
        // Mode = 1;
        LoadMainGrid(Type);
    });

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
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#dtOrderDate').val(Fdatestring);
    $('#dtRefDate').val(Fdatestring);

}
function GetRefNo() {


    $('#ddlRefNo').empty();
    LoadRefNoDDL("#ddlRefNo");

}

function LoadMainGrid(Type) {

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {
        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').text();
    }
    if (DCompid == 0) {
        var cmpid = $('#ddlMCompany').val();
    }
    else {
        var cmpid = DCompid;
    }
    var buyid = $('#ddlMBuyer').val();
    // var OrdNo = $('#ddlOrderNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    Gs = Type;
    var OType = $('#ddlMOrderType').val();

    $.ajax({
        url: "/BulkOrder/ListordDetailsMain",
        data: JSON.stringify({ CmpId: cmpid, Order_No: OrdNo, Ref_No: RefNo, BuyId: buyid, frmDate: FDate, ToDate: TDate, OrderType: Gs, OrdType: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger
            var tableload = result

            Orderlist = tableload;
            for (var r = 0; r < Orderlist.length; r++) {
                Orderlist[r].Order_Date = Orderlist[r].Order_Date == null ? EntryDate : moment(Orderlist[r].Order_Date).format('DD/MM/YYYY');
            }

            $('#tblAddDetails').DataTable().destroy();

            $('#tblAddDetails').DataTable({
                data: Orderlist,
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
                         { title: "BuyOrdMasId", data: "Buy_Ord_MasId", "visible": false },
                         { title: "Company", data: "Company" },
                         { title: "Buyer", data: "Buyer" },
                         { title: "Order No", data: "Order_No" },
                         { title: "Ref No", data: "Ref_No" },
                         { title: "Date", data: "Order_Date" },
                         { title: "Quantity", data: "Quantity" },
                         { title: "StyleCount", data: "StyleCount", "visible": false },
                         { title: "Approved", data: "OrdApp", "visible": false },
                          {
                              title: "Include", data: "Buy_Ord_MasId",
                              render: function (data, type, row) {

                                  return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';


                              }
                          },
                ]

            });
            var table = $('#tblAddDetails').DataTable();
            $("#tblAddDetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblAddDetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
            $('#ddlMCompany').val(DCompid);
        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });
    //$('#tMObody').DataTable().destroy();
}

function LoadPrecostDetails() {
    debugger;
    var list = [];

    for (var j = 0; j < Orderlist.length; j++) {
        if (Orderlist[j].CheckLoad == "Y") {

            POrdID = POrdID + "," + Orderlist[j].Buy_Ord_MasId;

            list.push(Orderlist[j]);
        }
    }


    if (list.length == 0) {
        alert('Please select checkboxes for any one row..');
        return true;
    }
    var Mode = 0;
    var Id = 0;
    window.location.href = "/PrecostingTargetEntry/PrecostingTargetEntryIndex?OrdId=" + POrdID + "=&trMasId=" + Id + "=&Mode=" + Mode;

}

function MainList() {

    var Type = "precost";
    LoadMainGrid(Type);
}
