$(document).ready(function () {

    debugger;
    LoadBuyerDDL("#ddlBBuy");
    LoadGarmentItemDDL('#ddlBIte');
    LoadColorDDL('#ddlBCol');
    LoadSizeDDL('#ddlBSiz');
    LoadSupplierDDL('#ddlBSup');
    clearTextbox();    
    //$('#tblSupdetails').on('keyup', 'tr', function () {

    //    var tr = $(this).closest("tr");
    //    var rowindexof = tr.index();
    //    Itemrowindex = rowindexof;
    //});
   
});
function clearTextbox()
{
    $('#ddlBBuy').val(0);
    $('#ddlBIte').val(0)
    $('#ddlBCol').val(0)
    $('#ddlBSiz').val(0)
    $('#ddlBSup').val(0)
   

}
function LoadBuyerItemGrid() {

    var BuyerId = 0;
    var BuyerName = '';
    if ($('#ddlBBuy').val() == "0") {
        BuyerId = 0;
        BuyerName = '';
    }
    else {
        BuyerId = $('#ddlBBuy').val(),
        BuyerName = $("#ddlBBuy option:selected").text()
    }
    var ItemId = 0;
    var Item = '';
    if ($('#ddlBIte').val() == "0") {
        ItemId = 0;
        Item = '';
    }
    else {
        ItemId = $('#ddlBIte').val(),
        Item = $("#ddlBIte option:selected").text()
    }
    var ColorId = 0;
    var Color = '';
    if ($('#ddlBCol').val() == "0") {
        ColorId = 0;
        Color = '';
    }
    else {
        ColorId = $('#ddlBCol').val(),
        Color = $("#ddlBCol option:selected").text()
    }

    var SizeId = 0;
    var Size = '';
    if ($('#ddlBSiz').val() == "0") {
        SId = 0;
        Size = '';
    }
    else {
        SizeId = $('#ddlBSiz').val(),
        Size = $("#ddlBSiz option:selected").text()
    }

    var SupplierId = 0;
    var Supplier = '';
    if ($('#ddlBSup').val() == "0") {
        SupplierId = 0;
        Supplier = '';
    }
    else {
        SupplierId = $('#ddlBSup').val(),
        Supplier = $("#ddlBSup option:selected").text()
    }
    isAllValid = true;  
        $.ajax({
            url: "/BuyerItemRate/ListMainDetails",
            data: JSON.stringify({ BuyerId: BuyerId, ItemId: ItemId, ColorId: ColorId, SizeId: SizeId, SupplierId: SupplierId, }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger
                var tableload = json.data
                var dataSet = eval("[" + tableload + "]");
                $('#tMbody').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    fixedHeader: true,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    select: {
                        style: 'single'
                    },
                    "bSort": false,
                    columns: [
                             //{ title: "BuyOrdMasId", "visible": false },
                             { title: "Buyerid", "visible": false },
                             { title: "Buyer" },
                             { title: "itemid", "visible": false },
                             { title: "Item" },
                             { title: "colorid", "visible": false },
                             { title: "Color" },
                             { title: "sizeid", "visible": false },
                             { title: "Size" },
                             { title: "Rate" },
                             { title: "supplierid", "visible": false },
                             { title: "Supplier" },                           
                    ]

                });
                $('#ddlMCompany').val(DCompid);
            },

            failure: function (errMsg) {
                debugger
                alert(errMsg);
            }
        });
 
   
}
function CMainList() {
    LoadBuyerItemGrid();
}