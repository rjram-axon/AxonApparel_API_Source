var ItemStockList = [];
var status = 'P';

$(document).ready(function () {

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    DPurApp = $("#hdnPurAppid").data('value');
    LoginUserid = $("#hdnLoginUserid").data('value');

    LoadStockTransDetails();

    $(document).on('click', '.groupstatus', function () {
        debugger;
        var table = $('#tblStockTranItem').DataTable();
        var StkAppId = table.row($(this).parents('tr')).data()["StkAppId"];
        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < ItemStockList.length; f++) {
                if (ItemStockList[f].StkAppId == StkAppId) {
                    ItemStockList[f].AppStatus = 'A'
                    ItemStockList[f].Cancel = ''

                    var table = $('#tblStockTranItem').DataTable();
                    var data = table.rows().data();

                    $('input[id=groupcancel]').each(function (ig) {
                        if (data[ig].StkAppId == StkAppId) {
                            var row = $(this).closest('tr');
                            row.find('#groupcancel').prop("checked", false);
                        }
                    });
                }
            }
        }
        else {
            for (var f = 0; f < ItemStockList.length; f++) {
                if (ItemStockList[f].StkAppId == StkAppId) {
                    ItemStockList[f].AppStatus = 'P'
                }
            }
        }
       
     
    });



    $(document).on('click', '.groupcancel', function () {
        debugger;

        var table = $('#tblStockTranItem').DataTable();
        var StkAppId = table.row($(this).parents('tr')).data()["StkAppId"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < ItemStockList.length; f++) {
                if (ItemStockList[f].StkAppId == StkAppId) {
                    ItemStockList[f].AppStatus = 'P'
                    ItemStockList[f].Cancel = 'C'

                    var table = $('#tblStockTranItem').DataTable();
                    var data = table.rows().data();

                    $('input[id=groupstatus]').each(function (ig) {
                        if (data[ig].StkAppId == StkAppId) {
                            var row = $(this).closest('tr');
                            row.find('#groupstatus').prop("checked", false);
                        }
                    });

                }
            }
        }
        else {
            for (var f = 0; f < ItemStockList.length; f++) {
                if (ItemStockList[f].StkAppId == StkAppId) {
                    ItemStockList[f].Cancel = 'C'
                }
            }
        }

    });




});

function Pending() {
    status = 'P';

    LoadStockTransDetails();
}
function Approved() {
    status = 'A';

    LoadStockTransDetails();
}


function LoadStockTransDetails() {
    debugger;

    var Fdt = $('#txtFromDate').val();
    var Tdt = $('#txtToDate').val();

    $.ajax({
        url: "/StockTransfer/GetPurchaseStockDetApp",
        data: JSON.stringify({ Status: status, FromDate: Fdt, ToDate: Tdt }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = [];
            obj = result.Value;

            ItemStockList = obj;

            $.each(ItemStockList,function(k) {
                ItemStockList[k].Reqdate=moment(ItemStockList[k].Reqdate).format('DD/MM/YYYY');
                ItemStockList[k].Appdate=moment(ItemStockList[k].Appdate).format('DD/MM/YYYY');
            });
               
            loadStockTransTable(ItemStockList);
           
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}




function loadStockTransTable(ItemStockList) {
    $('#stktrans').attr('disabled', false);
    $('#tblStockTranItem').DataTable().destroy();
    debugger;

    var table = $('#tblStockTranItem').DataTable({

        data: ItemStockList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        "rowCallback": function (row, data, index) {
            if (status == 'P') {
                var tbl = $('#tblStockTranItem');
                tbl.DataTable().column(23).visible(true);
                tbl.DataTable().column(24).visible(false);
            } else {
                var tbl = $('#tblStockTranItem');
                tbl.DataTable().column(23).visible(false);
                tbl.DataTable().column(24).visible(true);
               
            }
        },
       
        columns: [
                { title: "StockType", data: "StockType" },
                { title: "TransNo", data: "TransNo" },
                { title: "FromOrder", data: "OrderNo" },
                { title: "RefNo", data: "RefNo" },
                 {
                     title: "Status", data: "OrderStatus",
                     render: function (data) {
                         if (data == 'Running') {
                             return '<label  style="width: 50px;text-align: center;color:green;"> Running <label>';
                         } else if (data == 'Depatched') {
                             return '<label  style="width: 50px;text-align: center;color:red;"> Closed <label>';
                         } else if (data == 'General') {
                             return '<label  style="text-align: center;color:brown;"> General <label>';
                         } else {
                             return '<label  style="text-align: center;">  <label>';
                         }

                     },
                 },
                { title: "WorkOrdNo", data: "WorkOrdNo", "visible": false },
                { title: "Supplier", data: "Supplier", "visible": false },
                { title: "Item", data: "Item" },
                { title: "Color", data: "Color" },
                { title: "Size", data: "Size" },
                { title: "Uom", data: "Uom" },
               { title: "Stkbal", data: "BalStkQtyval", "visible": false },
                { title: "prgbal", data: "Ordbalqtyval", "visible": false },

                 {
                     title: "Stock.Bal", data: "StkQty",
                     render: function (data) {
                         return '<input type="text" id="txtStockBal" class="txtStockBal form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                     },
                 },

                {
                    title: "Req.Qty", data: "TransQty",
                    render: function (data) {
                        return '<input type="text" id="txttransQty" class="txttransQty form-control"  style="width: 50px;text-align: center;"  value=' + data + ' disabled>';

                    },
                },

                {
                    title: "ToOrder", data: "ToOrderno",
                    render: function (data) {
                        return '<label  style="text-align: center;color:blue;">' + data + '<label>';
                    },
                },
                {
                    title: "ToStyle", data: "ToStyle",
                    render: function (data) {
                        return '<label  style="text-align: center;color:blue;">' + data + '<label>';

                    },
                },
                {
                    title: "BOM.Bal", data: "Ordbalqty", "visible": false, 
                    render: function (data) {
                        return '<input type="text" id="txtOrderBal" class="txtOrderBal form-control"  style="text-align: center;"  value=' + data + ' disabled>';

                    },
                },

                { title: "Req.By", data: "ReqBy" },
                { title: "Req.Dt", data: "Reqdate" },
                { title: "App.By", data: "Appby","visible": false, },
                { title: "App.Dt", data: "Appdate", "visible": false, },

                 {
                     title: "Approve", data: "AppStatus",
                     render: function (data, type, row) {
                         if (row.AppStatus == 'A' ) {
                             return '<input type="checkbox" id="groupstatus" class="groupstatus editor-active" style="margin-left: 20px;"   checked  value=' + data + ' >';
                         }
                         else {
                             return '<input type="checkbox" id="groupstatus" class="groupstatus editor-active" style="margin-left: 20px;"  unchecked  value=' + data + ' >';

                         }
                     }
                 },

                 {
                     title: "Reject", data: "Cancel",
                       render: function (data, type, row) {
                           return '<input type="checkbox" id="groupcancel" class="groupcancel editor-active" style="margin-left: 20px;" unchecked  value=' + data + ' >';
                       }
                 },


                { title: "ToTransferNo", data: "StkTransferNo" },
                { title: "Itemid", data: "ItemId", "visible": false },
                { title: "Colorid", data: "ColorId", "visible": false },
                { title: "Sizeid", data: "SizeId", "visible": false },
                { title: "Stockid", data: "StockId", "visible": false },
                { title: "NewStockid", data: "NewStockId", "visible": false },
                { title: "ToStyleid", data: "ToStyleid", "visible": false },
                { title: "StkAppId", data: "StkAppId", "visible": false },
        ]
    });


}


function Update() {
    debugger;
    var stkempty = [];
    stkempty = ItemStockList;
    stkempty = $.grep(stkempty, function (v) {
        return (v.TransQty > 0);
    });

    if (stkempty.length > 0) {
        ItemStockList = stkempty;
    }
    else {
        var msg = 'Please Fill anyone Transfer Quantity..';
        var flg = 4;
        AlartMessage(msg, flg);
        //alert('Please Fill anyone TransQty..');
        return true;
    }
    //var newArray = [];
    //$.each(ItemStockList, function (key, value) {
    //    var exists = false;
    //    var rate = 0;
    //    $.each(newArray, function (k, val2) {
    //        if (value.WorkOrdNo == val2.WorkOrdNo && value.StoreId == val2.StoreId) { exists = true; };
    //    });

    //    if (exists == false && value.WorkOrdNo != "" && value.StoreId != "" ) { newArray.push(value); }
    //});
    //$.each(newArray, function (i) {
    //    $.each(ItemStockList, function (j) {
    //        if (newArray[i].WorkOrdNo == ItemStockList[j].WorkOrdNo && newArray[i].StoreId == ItemStockList[j].StoreId) {
    //            ItemStockList[j].stktransno = i + 1;
    //        }
    //        });
    //});


    var rejcnt = 0;
    var appcnt = 0;

    $.each(ItemStockList, function (i) {
        if (ItemStockList[i].AppStatus == 'A') {
            appcnt = appcnt + 1;
        }
        if (ItemStockList[i].Cancel == 'C') {
            rejcnt = rejcnt + 1;
        }


    });



    if (ItemStockList.length > 0) {
        $('#stktrans').attr('disabled', true);
        $.ajax({
            url: "/StockTransfer/PurchaseStockTranferApp",
            data: JSON.stringify({ opj: ItemStockList }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (status == 'A') {

                    var msg = 'Stock Transfered Request Un Approved Successfully..';
                } else {

                    if (appcnt > 0 && rejcnt == 0) {
                        var msg = 'Stock Transfer Request Approved Successfully..';
                    }
                    else if (appcnt == 0 && rejcnt > 0) {
                        var msg = 'Stock Transfer Request Rejected Successfully..';
                    } else {

                        var msg = 'Stock Transfer Request Approved and Rejected Successfully..';
                    }
                }
                var flg = 1;
                AlartMessage(msg, flg);
               

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

}