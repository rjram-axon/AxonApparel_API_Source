var OrderList = [];
var Style = '';
$(document).ready(function () {
    debugger;
    load();

    //$('#stylename').click(function () {
    //    debugger;
    //    var sty = this.innerText;
    //    $('#myModal').modal('show');
    //    GetOrderDet(sty);
    //    //var url = "/StyleEntry/GetFiles";
    //    ////var Id = $('input#ID').val();
    //    //url = url + "?Style=" + sty
    //    //$.get(url, function (response) {
    //    //    $('#uploadsContainer').html(response);
    //    //});


    //});

    //var url = "/AlertMsg/test";
    ////var Id = $('input#ID').val();
    ////url = url + "?Style=" + Style + "&Orderno=" + Ordno
    //$.get(url, function (response) {
    //   // $('#uploadsContainer').html(response);
    //});


    $('#tblOrderdetails').on('click', 'tr', function (e) {
        debugger;
        var table = $('#tblOrderdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblOrderdetails').dataTable().fnGetData(row);
        var Order = data.order_no;
        var desc = data.Description;
        var fabdet = data.FabricDet;

        var exrate = data.ExRate;
        var qty = data.StyQty;
        var price = data.price;
        var currency = data.Currency;

        var value = parseFloat(qty) * parseFloat(price);

        var inrvalue = parseFloat(qty) * (parseFloat(price) * parseFloat(exrate));


        $('#stydesc').text(desc);
        $('#fabdet').text(fabdet);

        $('#cursum').text('VALUE :' + parseFloat(value).toFixed(5) + ' ' + currency + '                                ' + 'INR VALUE :' + inrvalue);

        GetImgDet(Order);
    });

});

function load() {

    //$(document).ready(function () {

    $.ajax({
        url: "/StyleEntry/GetStlyeImglist",
        //data: JSON.stringify({ buyormasid: BMasId }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;

            //$.ajax({
            //    type: "POST",
            //    contentType: "application/json; charset=utf-8",
            //    url: "StyleEntry/GetStlyeImglist",
            //    dataType: "json",
            //    success: function (result) {

            var response = '';
            var indicator = '';
            for (var i = 0; i < obj.length; i++) {
                response += '<divclass="demo">' +
                '<img src="data:image/jpg;base64,' + obj[i].Imgpath + '" width="460px" height="100px">' +
                 '</div>';
                indicator += '<li data-target="#demo" data-slide-to="' + i + '"></li>';
            }
            $('#dvBinary #items').append(response);
            $('#dvBinary #indicators').append(indicator);
            $('#dvBinary .item').first().addClass('active');
            $('#dvBinary .carousel-indicators > li').first().addClass('active');
            $("#dvBinary #demo").carousel();
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
    //});


}

function GetOrderDet(Sty) {


    $.ajax({
        url: "/StyleGallery/GetStlyeImgOrder",
        data: JSON.stringify({ Style: Sty }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            OrderList = result.Value;

            var ord = OrderList[0].order_no;


            //var Order = data.order_no;
            var desc = OrderList[0].Description;
            var fabdet = OrderList[0].FabricDet;

            var exrate = OrderList[0].ExRate;
            var qty = OrderList[0].StyQty;
            var price = OrderList[0].price;
            var currency = OrderList[0].Currency;

            var value = parseFloat(qty) * parseFloat(price);

            var inrvalue = parseFloat(qty) * (parseFloat(price) * parseFloat(exrate));


            $('#stydesc').text(desc);
            $('#fabdet').text(fabdet);

            $('#cursum').text('VALUE :' + parseFloat(value).toFixed(5) + ' ' + currency + '                                ' + 'INR VALUE :' + inrvalue);


            GetImgDet(ord);

            loadsizeTable(OrderList);

        }
    });

}



function loadsizeTable(OrderList) {
    $('#tblOrderdetails').DataTable().destroy();
    debugger;
    $('#tblOrderdetails').DataTable({
        data: OrderList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        columns: [

            { title: "Buyer", data: "BuyerName" },
             { title: "OrderNo", data: "order_no" },
              { title: "RefNo", data: "Ref_No" },
               { title: "Rate", data: "price" },
                { title: "Currency", data: "Currency" },
                 { title: "Ord Qty", data: "StyQty" },
               { title: "Desp Qty", data: "despatch_qty" },

        ]
    });



    var table = $('#tblOrderdetails').DataTable();
    $("#tblOrderdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblOrderdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });

}

function Loadord(Order) {
    debugger;
    var sty = Order;
    Style = sty;
    $('#myModal').modal('show');
    GetOrderDet(sty);

}

function GetImgDet(Ordno) {
    debugger;

    //$.ajax({
    //    url: "/StyleGallery/StyleGalleryPartial",
    //    data: JSON.stringify({ Style: Style, Orderno: Ordno }),
    //    type: "POST",
    //    //contentType: "application/json;charset=UTF-8",
    //    //dataType: "json",
    //    success: function (response) {
    //        $('#uploadsContainer').html(response);

    //    }
    //});

    $('#lblstyle').text('STYLE : '+Style);
    $('#lblOrder').text('ORDERNO : '+Ordno);

    var url = "/StyleGallery/StyleGalleryPartial";
    //var Id = $('input#ID').val();
    url = url + "?Style=" + Style + "&Orderno=" + Ordno
    $.get(url, function (response) {
        $('#uploadsContainer').html(response);
    });



}
