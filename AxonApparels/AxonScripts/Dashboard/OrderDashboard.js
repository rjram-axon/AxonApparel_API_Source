
var EItemList = [];
var REItemList = [];
var UserName = 0;
var MainFDate = 0;
var TDesQty = 0;
var TPrdQty = 0;

var IsContactsShow = false;
var IsComposeMsgShow = false;
var IsNewMsgShow = false;

var SelFromUserId = 0;
var SelToUserId = 0;

$(document).ready(function () {
    debugger;

    $('#OrderStatus2').hide();
    $('#ProductionStatus2').hide(); 
    $('#DispatchedStatus2').hide();
    $('#ItemStatus2').hide();

    //$('#MsgModal').modal('show');

    $('#OrderStatus1').click(function () {
        debugger;
        $('#OrderStatus1').hide();
        $('#OrderStatus2').show();
    });
    $('#ProductionStatus1').click(function () {
        debugger;
        $('#ProductionStatus1').hide();
        $('#ProductionStatus2').show();
    });
    $('#DispatchedStatus1').click(function () {
        debugger;
        $('#DispatchedStatus1').hide();
        $('#DispatchedStatus2').show();
    });
    $('#ItemStatus1').click(function () {
        debugger;
        $('#ItemStatus1').hide();
        $('#ItemStatus2').show();
    });
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    LCompid = $("#hdnLicenseComapnyid").data('value');

    userid = $("#hdnLoginUserid").data('value');

    getDate();
    fnGetDashboardRunDetails();
    fnGetDashboardDetails();
    fnGetOrderDetails();
    fnGetDesDetails();
    fnGetPlanDetails();
    fnGetPurDetails();
    fnGetProcessDetails();
    fnGetProdDetails();
    //CheckUserLicence();
    
    //fnGetProd1Details();

    //LoadChatUsers_NewMessageCount(userid);
    //LoadChatUsers(userid);
    //LoadChatUsers_NewMessage(userid);
    //LoadAllMsg(userid);

    $("#divMsg a").on('click', function () {
        debugger;

        $('#MsgModal').modal('show');
    });

    $('#btnRefresh').on('click', function () {
        //divChatContacts

        debugger;

        $('#divNewMessages').css('display', 'none');
        $('#divContacts').css('display', 'none');
        $('#divCompose').css('display', 'none');

        $("#idContact").val('');

        LoadAllMsg(userid);
    });
});


//function OpenContacts() {
//    debugger;

//    $('#divNewMessages').hide();
//    $('#divNewMessages').css('display', 'none');
//    $('#divCompose').css('display', 'none');
//    $('#divChatMsgs').css('display', 'none');

//    IsNewMsgShow = false;

//    if (!IsContactsShow) {
//        $("#divContacts").slideDown(1000);
//        IsContactsShow = true;
//    }
//    else {
//        $("#divContacts").hide(800);
//        IsContactsShow = false;
//    }
//}

//function NewMessage() {
//    debugger;

//    debugger;

//    $('#divContacts').hide();
//    IsContactsShow = false;
//    $('#divChatMsgs').css('display', 'none');
//    $('#divNewMessages').css('display', 'none');
//    $('#divCompose').css('display', 'none');   

//    //$('#divNewMessages').show();    

//    if (!IsNewMsgShow) {
//        $("#divNewMessages").slideDown(1000);
//        IsNewMsgShow = true;
//    }
//    else {
//        $("#divNewMessages").hide(800);
//        IsNewMsgShow = false;
//    }

//    //$('#divChatMsgs').css('display', 'block');
//}


function getDate() {
    debugger;
   var curr = new Date();
   var first = curr.getDate() ; 
   var GetTodayDate = new Date(curr.setDate(first));
   var GetPassDate = new Date(curr.setDate(GetTodayDate.getDate() - 6));
   var PassDate = GetPassDate.getDate();
   var Pmonth = GetPassDate.getMonth() + 1;
   var Pyear = GetPassDate.getFullYear();
   var TodayDate = GetTodayDate.getDate();
   var Tmonth = GetTodayDate.getMonth() + 1;
   var Tyear = GetTodayDate.getFullYear();
   var FDate = PassDate + "/" + Pmonth + "/" + Pyear;
   var TDate = TodayDate + "/" + Tmonth + "/" + Tyear;

   $('#OrdertxtFromDate').val(FDate);
   $('#OrdertxtToDate').val(TDate);
   $('#ProdtxtFromDate').val(FDate);
   $('#ProdtxtToDate').val(TDate);
   $('#DisptxtToDate').val(TDate);
   $('#ItemtxtToDate').val(TDate);

   var GetPassMDate = new Date(curr.setDate(GetTodayDate.getDate() -30));
   var PassMDate = GetPassMDate.getDate();
   var PMmonth = GetPassMDate.getMonth() +1;
   var PMyear = GetPassMDate.getFullYear();
   var FMDate = PassMDate + "/" + PMmonth + "/" + PMyear;
   $('#ItemtxtFromDate').val(FMDate);
   $('#DisptxtFromDate').val(FMDate);
}
function fnGetDashboardDetails() {


    $.ajax({
        url: "/DefaultPage/LoadDashboard",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {

            EItemList = result;
            TDesQty = EItemList[0].TotDesQty;

            $("#cntTotDes").text(TDesQty);
            WorkInPrograss();

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function fnGetDashboardRunDetails() {


    $.ajax({
        url: "/DefaultPage/LoadDashboardRunDetails",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {

            REItemList = result;

            TPrdQty = REItemList[0].TotProdRunQty;
            $("#cntTotOrder").text(TPrdQty);
            WorkInPrograss();
            
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function WorkInPrograss() {
    var InPrograss = TPrdQty - TDesQty;
    $("#cntInProgress").text(InPrograss);
}
function fnGetOrderDetails() {
    var fromdt = $('#OrdertxtFromDate').val();
    var todt = $('#OrdertxtToDate').val();

    $.ajax({
        type: "POST",
        url: '/DefaultPage/OrderDetails/',
        data: JSON.stringify({ frmDate: fromdt, ToDate: todt }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            $('#OrderStatus1').show();
            $('#OrderStatus2').hide();
            var dataArray = json.split("##");



            //////////////////////////////////

            //var myChart = Highcharts.chart('container', {
            //    chart: {
            //        type: 'column'
            //    },
            //    title: {
            //        text: 'Top 10 Priority Shipment Order'
            //    },

            //    xAxis: {
            //        type: 'category'
            //    },
            //    yAxis: {
            //        title: {
            //            text: 'Total Order Completed Percentage'
            //        }

            //    },
            //    legend: {
            //        enabled: false
            //    },
            //    plotOptions: {
            //        series: {
            //            borderWidth: 0,
            //            dataLabels: {
            //                enabled: true,
            //                format: '{point.y:.1f}%'
            //            }
            //        }
            //    },

            //    tooltip: {
            //        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            //    },

            //    series: [
            //        {
            //            name: "Order No",
            //            colorByPoint: true,               
            //            data: eval(dataArray[1])
            //        }
            //    ],
            //    drilldown: {
            //        series: eval(dataArray[0])

            //    }
            //});


            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Priority Shipment Order'
                },

                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Completation Percentage'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [
                        {
                            name: "Order No",
                            colorByPoint: true,               
                            data: eval(dataArray[1])
                        }
                    ],
                drilldown: {
                            series: eval(dataArray[0])

                        }
            });
            /////////////////////////////////

           
        }
    });
}

function fnGetDesDetails() {
    var fromdt = $('#ProdtxtFromDate').val();
    var todt = $('#ProdtxtToDate').val();

    $.ajax({
        type: "POST",
        url: '/DefaultPage/StyleOrderDetails/',
        data: JSON.stringify({ frmDate: fromdt, ToDate: todt }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            $('#ProductionStatus1').show();
            $('#ProductionStatus2').hide();
            var dataArray = json.split("##");



            //////////////////////////////////

            var myChart = Highcharts.chart('container1', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Style Wise Production Status'
                },
                //subtitle: {
                //    text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                //},
                xAxis: {
                    //categories: ['CUTTING', 'SEWING', 'IRONING', 'CHECKING', 'PACKING'],

                    categories: eval(dataArray[1]),
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Garments (Pieces)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                //series: [{
                //    name: 'Cutting',
                //    data: [107, 31, 635, 203, 2]
                //}, {
                //    name: 'Sewing',
                //    data: [133, 156, 947, 408, 6]
                //}, {
                //    name: 'Ironing',
                //    data: [814, 841, 3714, 727, 31]
                //}, {
                //    name: 'Packing',
                //    data: [1216, 1001, 4436, 738, 40]
                //}]
                series: eval(dataArray[0])
          
            });


        }
    });
}

function fnGetPlanDetails() {
 

    $.ajax({
        type: "POST",
        url: '/DefaultPage/BuyOrderDetails/',
        data: JSON.stringify({ frmDate: '29/05/2020', ToDate: '29/05/2022' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            var dataArray = json.split("##");



            //////////////////////////////////

            var myChart = Highcharts.chart('container2', {

                title: {
                    text: 'Buyer Growth by Year'
                },

                //subtitle: {
                //    text: 'Source: thesolarfoundation.com'
                //},

                yAxis: {
                    title: {
                        text: 'Number of Pieces'
                    }
                },

                xAxis: {
                    accessibility: {
                        rangeDescription: 'Range: 2015 to 2025'
                    }
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2020
                    }
                },

                //series: [{
                //    name: 'Bala',
                //    data: [13934, 22503,27177, 49658, 17031, 29931, 27133, 44175]
                //}, {
                //    name: 'Ganesh',
                //    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                //}, {
                //    name: 'Raja',
                //    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                //}, {
                //    name: 'Raghul',
                //    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                //}, {
                //    name: 'Other',
                //    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                //}],



                series: eval(dataArray[0]),

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });


        }
    });
}

function fnGetPurDetails() {
    var fromdt = $('#DisptxtFromDate').val();
    var todt = $('#DisptxtToDate').val();

    $.ajax({
        type: "POST",
        url: '/DefaultPage/OrderDesDetails/',
        data: JSON.stringify({ frmDate: fromdt, ToDate: todt }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            $('#DispatchedStatus1').show();
            $('#DispatchedStatus2').hide();
            var dataArray = json.split("##");



            //////////////////////////////////

            var myChart = Highcharts.chart('container3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Order Wise Dispatched Details'
                },
                xAxis: {
                    categories: eval(dataArray[1])
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Ord Qty Vs Dis Qty'
                    },
                    //stackLabels: {
                    //    enabled: true,
                    //    style: {
                    //        fontWeight: 'bold',
                    //        color: ( // theme
                    //            Highcharts.defaultOptions.title.style &&
                    //            Highcharts.defaultOptions.title.style.color
                    //        ) || 'gray'
                    //    }
                    //}
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    //headerFormat: '<b>{point.x}</b><br/>',
                    //pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    pointFormat: '{series.name}: {point.y}<br/>'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                //series: [{
                //    name: 'OD QTY',
                //    data: [5, 3, 4, 7, 2]
                //}, {
                //    name: 'DIS QTY',
                //    data: [2, 2, 3, 2, 1]
                //}, {
                //    name: 'BAL QTY',
                //    data: [3, 4, 4, 2, 5]
                //}]
                series: eval(dataArray[0])
            });


        }
    });
}

function fnGetProcessDetails() {


    $.ajax({
        type: "POST",
        url: '/DefaultPage/YarnStockDetails/',
        data: JSON.stringify({ frmDate: '29/05/2020', ToDate: '29/05/2022' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            var dataArray = json.split("##");



            //////////////////////////////////

            var myChart = Highcharts.chart('container7', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Yarn Stock Details'
                },
                tooltip: {
                    //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    pointFormat: '{series.name}: {point.y}<br/>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}<br/>KGS'
                            //pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    //data: [{
                    //    name: '40 DNR',
                    //    y: 22.41,
                    //    sliced: true,
                    //    selected: true
                    //}, {
                    //    name: '40S SUPER COMBED',
                    //    y: 11.84
                    //}, {
                    //    name: '20 DNR LYCRA',
                    //    y: 10.85
                    //}, {
                    //    name: '34S SUPER COMBED',
                    //    y: 4.67
                    //}, {
                    //    name: '50S COMPACT REGULAR',
                    //    y: 4.18
                    //}, {
                    //    name: '20DNR FILAMENT',
                    //    y: 1.64
                    //}, {
                    //    name: '40S COMPACT REGULAR',
                    //    y: 1.6
                    //}, {
                    //    name: '40S COMPACT MICRO MODAL',
                    //    y: 1.2
                    //}, {
                    //    name: '40 DNR LYCRA',
                    //    y: 2.61
                    //}]
                    data: eval(dataArray[0])
                }]
            });


        }
    });
}

function fnGetProdDetails() {
    debugger;
    var fromdate = $('#ItemtxtFromDate').val();
    var todate = $('#ItemtxtToDate').val();
    $.ajax({
        type: "POST",
        url: '/DefaultPage/OrderWiseStockDetails/',
        data: JSON.stringify({ frmDate: fromdate, ToDate: todate }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            $('#ItemStatus1').show();
            $('#ItemStatus2').hide();
            var dataArray = json.split("##");

            debugger;

            //////////////////////////////////

            var myChart = Highcharts.chart('container8', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Order Wise Item Stock'
                },


                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}'

                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>:<b>{point.y}</b> of Stock<br/>'
                },

                //series: [
                //    {
                //        name: "Browsers",
                //        colorByPoint: true,
                //        data: [
                //            {
                //                name: "100452",
                //                y: 62.74,
                //                drilldown: "100452"
                //            },
                //            {
                //                name: "100554",
                //                y: 10.57,
                //                drilldown: "100554"
                //            },
                //            {
                //                name: "100560",
                //                y: 7.23,
                //                drilldown: "100560"
                //            },
                //            {
                //                name: "100558",
                //                y: 5.58,
                //                drilldown: "100558"
                //            },

                //            {
                //                name: "Other",
                //                y: 7.62,
                //                drilldown: null
                //            }
                //        ]
                //    }
                //],
                //drilldown: {
                //    series: [
                //        {
                //            name: "100452",
                //            id: "100452",
                //            data: [
                //                [
                //                    "MAIN LABEL",
                //                    0.1
                //                ],
                //                [
                //                    "SIZE LABEL",
                //                    1.3
                //                ],
                //                [
                //                    "ZIPPER",
                //                    53.02
                //                ],
                //                [
                //                    "LACE",
                //                    1.4
                //                ],
                //                [
                //                    "NECK BUTTON",
                //                    0.88
                //                ]

                //            ]
                //        },
                //        {
                //            name: "100554",
                //            id: "100554",
                //            data: [
                //                  [
                //                    "MAIN LABEL",
                //                    0.1
                //                  ],
                //                [
                //                    "SIZE LABEL",
                //                    1.3
                //                ],
                //                [
                //                    "ZIPPER",
                //                    53.02
                //                ],
                //                [
                //                    "LACE",
                //                    1.4
                //                ],
                //                [
                //                    "NECK BUTTON",
                //                    0.88
                //                ]
                //            ]
                //        },
                //        {
                //            name: "100560",
                //            id: "100560",
                //            data: [
                //                 [
                //                    "MAIN LABEL",
                //                    0.1
                //                 ],
                //                [
                //                    "SIZE LABEL",
                //                    1.3
                //                ],
                //                [
                //                    "ZIPPER",
                //                    53.02
                //                ],
                //                [
                //                    "LACE",
                //                    1.4
                //                ],
                //                [
                //                    "NECK BUTTON",
                //                    0.88
                //                ]
                //            ]
                //        },
                //        {
                //            name: "100558",
                //            id: "100558",
                //            data: [
                //                  [
                //                    "MAIN LABEL",
                //                    0.1
                //                  ],
                //                [
                //                    "SIZE LABEL",
                //                    1.3
                //                ],
                //                [
                //                    "ZIPPER",
                //                    53.02
                //                ],
                //                [
                //                    "LACE",
                //                    1.4
                //                ],
                //                [
                //                    "NECK BUTTON",
                //                    0.88
                //                ]
                //            ]
                //        },


                //    ]
                //}

                series: [
                        {
                            name: "Order No",
                            colorByPoint: true,
                            data: eval(dataArray[1])
                        }
                ],
                drilldown: {
                    series: eval(dataArray[0])

                }
            });

        }
    });
}
function fnGetProd1Details() {


    $.ajax({
        type: "POST",
        url: '/DefaultPage/OrderDetails/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            var dataArray = json.split("##");



            //////////////////////////////////

            var myChart = Highcharts.chart('container6', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: 'Buyer<br>Sales<br>2021',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 60
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '110%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '50%',
                    data: [
                        ['H&M', 58.9],
                        ['Tesco', 13.29],
                        ['Mother Care', 13],
                        ['Puma', 3.78],
                        ['Ramraj', 3.42],
                        {
                            name: 'Other',
                            y: 7.61,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    ]
                }]
            });



        }
    });
}

function CheckUserLicence() {
    try {
        $.ajax({
            url: "/AMC/CheckUserLicence",
            data: JSON.stringify({ dcompanyid: LCompid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var obj = result.Value;
                if (obj.length > 0) {
                    if (obj[0].ChkLicenceexpiry > 0) {
                        var msg = 'AMC Expired !!!';
                        var flg = 3;
                        var mod = 1;
                        var ur = "";
                        AlartMessage(msg, flg, mod, ur);
                    }
                } else {
                    var msg = 'AMC Expired !!!';
                    var flg = 3;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                }
            },
            error: function (errormessage) {
                //alert(errormessage.responseText);
            }
        });

    }
    catch (e) { }
}


function LoadChatUsers(FromUserId) {
    debugger;

    $.ajax({
        url: "/DefaultPage/LoadChatUsers",
        data: JSON.stringify({ FromUserId: FromUserId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (json) {
            debugger;
            if (json.Status == 'SUCCESS') {

                // var data = result.Value;

                var UserList = [];
                UserList = json.Value;
                var Str = "";

                //Str += " <ul class='contacts-list'>";
                for (var d = 0; d < UserList.length; d++) {

                    var touserid = UserList[d].Chat_UserId;
                    var tousername = UserList[d].Chat_Username;
                    //  var touserimg = UserList[d].userimg;
                    var touserlastmsgdate = UserList[d].Chat_Time;
                    var touserlastmsg = UserList[d].Chat_Message;

                    Str += "<ul style='border-bottom: 1px solid #555;'><a href='#' onclick='LoadChatMsg(" + FromUserId + "," + touserid + "," + "1" + ")'>"  //<img class='contacts-list-img' src='" + touserimg + "' alt='User Avatar'>

                        + "<div id='" + touserid + "' style='color:#ffffffe8;height:40px;font-family:sans-serif;'>"
                        + "<h2><i class='fa fa-user fa-1' id='li0'></i><span style='font-weight: 600;font-size: 13px;color:#eeeeee;'>&nbsp;&nbsp;&nbsp;" + tousername
                        //+ "</div></div><div class='' style='padding-left:35px;'><span class=''>" + touserlastmsg + "</span>"
                        + "<br><span style='font-size:11px;color:#b1bbc4;padding-left:16px;'>&nbsp;&nbsp;&nbsp;" + touserlastmsg
                        + "</span></span>"
                        + "<span style='float:right;font-size: 10px;color:#eeeeee;padding-right:10px;'>" + touserlastmsgdate + "</span></h2>"
                        + "</div></a></ul>";

                    //+ "<div id='" + touserid + "'>"
                    //+ "<h5><i class='fa fa-user fa-5' id='li0'></i></h5>&nbsp;&nbsp;&nbsp;" + tousername
                    //+ "<small style='float-right'>" + touserlastmsgdate + "</small></span>"
                    //+ "</div><div class='' style='padding-left:35px;'><span class=''>" + touserlastmsg + "</span>"
                    //+ "</div></a>";
                }

                //Str += "</ul>";
                $('#divContacts').append(Str);

                //Str += " <ul class='contacts - list'>";

                //for (var d = 0; d < UserList.length; d++) {
                //    Str += "<li><a href='#'><img class='contacts-list-img' src='~/Content/dist/img/user1-128x128.jpg' alt='User Avatar'>"
                //           +"<div class='contacts-list-info' > <span class='contacts-list-name'>Count Dracula<small class='contacts-list-date float-right'>2/28/2015</small></span>"
                //           +"<span class='contacts-list-msg'>How have you been? I was...</span>"
                //           +"</div></a></li>";
                //}

                //Str += "</ul>";
                //$('#divContacts').append(Str);

            }
        }
    }).done(function () {

    });
}

function LoadChatUsers_NewMessageCount(FromUserId) {
    debugger;

    $.ajax({
        url: "/DefaultPage/LoadChatUsers_GetNewMessageCount",
        data: JSON.stringify({ FromUserId: FromUserId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (json) {
            debugger;
            if (json.Status == 'SUCCESS') {

                // var data = result.Value;

                var UserList = [];
                UserList = json.Value;
                var Str = 0;
                Str = UserList[0].Chat_NewMsgCnt;

                if (Str > 0) {
                    $('#spnNewMessages').css('display', 'block');
                    $('#spnNewMessages').html(Str);

                    $('#spnmainNewMessages').css('display', 'block');
                    $('#spnmainNewMessages').html(Str);
                }
                else {
                    $('#spnNewMessages').css('display', 'none');
                    $('#spnmainNewMessages').css('display', 'none');
                }

                //$('spnNewMessages').html(Str);

            }
        }
    }).done(function () {

    });
}

function LoadChatUsers_NewMessage(FromUserId) {
    debugger;

    $.ajax({
        url: "/DefaultPage/LoadChatUsers_NewMessage",
        data: JSON.stringify({ FromUserId: FromUserId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (json) {
            debugger;
            if (json.Status == 'SUCCESS') {

                // var data = result.Value;

                var UserList = [];
                UserList = json.Value;
                var Str = "";

                //  Str += " <ul class='contacts-list'>"; //style = 'width:40%;float:right;border-radius:5px;border-left:1px solid;border-color:#9696974d;'
                for (var d = 0; d < UserList.length; d++) {

                    var touserid = UserList[d].Chat_UserId;
                    var tousername = UserList[d].Chat_Username;
                    //  var touserimg = UserList[d].userimg;
                    var touserlastmsgdate = UserList[d].Chat_Time;
                    var touserlastmsg = UserList[d].Chat_Message;
                    var TimeTaken = UserList[d].TimeTaken;

                    //Str += "<li><a href='#' onclick='LoadChatMsg(" + FromUserId + "," + touserid + "," + "0" + ")'>"  //<img class='contacts-list-img' src='" + touserimg + "' alt='User Avatar'>
                    //    + "<div class='contacts-list-info' id='" + touserid + "'>"    //style='color:#343a40;display: flex;align-content: center;justify-content: flex-start;align-items: center;'
                    //    //+ "<i class='material-icons' id='li0'>person</i>&nbsp;&nbsp;&nbsp;<span class='contacts-list-name'>" + tousername
                    //      + "<span class='contacts-list-name'><i class='material-icons' id='li0'>person</i>&nbsp;&nbsp;&nbsp;" + tousername
                    //    + "<small class='contacts-list-date float-right'>" + touserlastmsgdate + "</small></span>"
                    //    + "</div><div class='contacts-list-info' style='padding-left:35px;'><span class='contacts-list-msg'>" + touserlastmsg + "</span>"
                    //    + "</div><div class='contacts-list-info' style='padding-left:35px;'><i class='far fa-clock mr-1'></i><span class='contacts-list-msg' style='font-size:11px;font-weight:600;'>" + TimeTaken + "</span>"
                    //    + "</div></a></li>";

                    Str += "<ul style='border-bottom: 1px solid #555;height: 60px;'><a href='#' onclick='LoadChatMsg(" + FromUserId + "," + touserid + "," + "0" + ")'>"  //<img class='contacts-list-img' src='" + touserimg + "' alt='User Avatar'>

                      + "<div id='" + touserid + "' style='color:#ffffffe8;height:40px;font-family:sans-serif;'>"
                      + "<h2><i class='fa fa-user fa-1' id='li0'></i><span style='font-weight: 600;font-size: 13px;color:#eeeeee;'>&nbsp;&nbsp;&nbsp;" + tousername
                      //+ "</div></div><div class='' style='padding-left:35px;'><span class=''>" + touserlastmsg + "</span>"
                      + "<br><span style='font-size:11px;color:#b1bbc4;padding-left:16px;'>&nbsp;&nbsp;&nbsp;" + touserlastmsg
                      + "<br><i class='fa fa-clock-o' style='font-size:15px;padding-left:26px;'></i><span style='font-size:11px;color:#b1bbc4;font-weight:600;'>&nbsp;&nbsp;&nbsp;" + TimeTaken
                      + "</span></span>"
                      + "</span>"
                      + "<span style='float:right;font-size: 10px;color:#eeeeee;padding-right:10px;'>" + touserlastmsgdate + "</span></h2>"
                      + "</div></a></ul>";


                    //Str += "<li><a href='#' onclick='LoadChatMsg(" + FromUserId + "," + touserid + ")'>"  //<img class='contacts-list-img' src='" + touserimg + "' alt='User Avatar'>
                    //    + "<div id='" + touserid + "' class='contacts-list-info' style='display: flex;align-content: center;justify-content: flex-start;align-items: center;'><i class='material-icons' id='li0'>person</i><span class='contacts-list-name'>" + tousername + "<small class='contacts-list-date float-right'>" + touserlastmsgdate + "</small></span>"
                    //    + "<span class='contacts-list-msg'>" + touserlastmsg + "</span>"
                    //    + "</div></a></li>";

                    //+ "<li><a href='#'><img class='contacts-list-img' src='/Content/dist/img/user5-128x128.jpg' alt='User Avatar'>"
                    //+ "<div class='contacts-list-info' > <span class='contacts-list-name'>AAA<small class='contacts-list-date float-right'>18/04/2022</small></span>"
                    //+ "<span class='contacts-list-msg'>How have you been? I was...</span>"
                    //+ "</div></a></li>";
                }

                //Str += "</ul>";
                $('#divNewMessages').append(Str);

                //Str += " <ul class='contacts - list'>";

                //for (var d = 0; d < UserList.length; d++) {
                //    Str += "<li><a href='#'><img class='contacts-list-img' src='~/Content/dist/img/user1-128x128.jpg' alt='User Avatar'>"
                //           +"<div class='contacts-list-info' > <span class='contacts-list-name'>Count Dracula<small class='contacts-list-date float-right'>2/28/2015</small></span>"
                //           +"<span class='contacts-list-msg'>How have you been? I was...</span>"
                //           +"</div></a></li>";
                //}

                //Str += "</ul>";
                //$('#divContacts').append(Str);

            }
        }
    }).done(function () {

    });
}

function LoadChatMsg(FromUserId, ToUserId, IsRead) {
    debugger;

    var StrOpen = "";
    var StrClose = "";
    var StrLeft = "";
    var StrRight = "";

    SelFromUserId = FromUserId;
    SelToUserId = ToUserId;
    //  SelToUserName = ToUserName;

    $('#divChatMsgs').empty();

    $.ajax({
        url: "/DefaultPage/LoadChatMsg",
        data: JSON.stringify({ FromUserId: FromUserId, ToUserId: ToUserId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (json) {
            debugger;

            // var data = result.Value;

            var UserList = [];
            UserList = json.Value;

            $('#divChatMsgs').css('display', 'block');

            for (var d = 0; d < UserList.length; d++) {

                var userid = UserList[d].Chat_UserId;
                var username = UserList[d].Chat_Username;
                // var userimg = UserList[d].userimg;
                var userlastmsgdate = UserList[d].Chat_Time;
                var userlastmsg = UserList[d].Chat_Message;

                var ToUsername = UserList[d].Chat_ToUsername;

                if (d == 0) {
                    $("#idContact").css('display', 'block');
                    $("#idContact").val(ToUsername);
                }

                if (UserList[d].Chat_Isfromuser == 1) {  // && UserList[d].to == 0

                    //StrLeft = "<div>";
                    //+ "<span>15 Feb 03:36 PM</span>"
                    //+ "<span>THENMOZHI - superuser</span>"
                    //+ "</div>";
                    //+ "<br>";
                    //+ " <div style='background-color:#1f2d3d61;border-color:#1f2d3d00;position:inherit;margin:5px 0px 0px 50px;'>";
                    //+ "<span>Hi</span>"                    
                    //+ "</div>";

                    StrLeft = " <div class='' style='padding-top: 10px;' id = " + userid + "><div class='clearfix' style='font-size:12px;'>"
                        + "<span class='' style='padding-left:10px;color:#73879C;font-weight:600;'>" + username + " - " + ToUsername + "</span>"
                        + "<span class='' style='float:right;padding-right:15px;'>" + userlastmsgdate + "</span>"
                        + "</div>"
                        //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                        + "<div class='' style='margin: 5px 50px 0px 10px;height: 30px;background-color: #d2d6de;border: 1px solid #d2d6de;color: #444;padding-left: 10px;padding-top: 5px;border-radius: 5px;position: relative;'>" + userlastmsg + "</div></div>"; //position: inherit;

                    //StrLeft = " <div class='direct-chat-msg' id = " + userid + "><div class='direct-chat-infos clearfix' style='font-size:12px;'>"
                    //    + "<span class='direct-chat-name float-left'>" + username + " - " + ToUsername + "</span>"
                    //    + "<span class='direct-chat-timestamp float-right'>" + userlastmsgdate + "</span>"
                    //    + "</div>"
                    //    //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                    //    + "<div class='direct-chat-text' style='margin:5px 50px 0px 0px;'>" + userlastmsg + "</div></div>"; //position: inherit;

                    $('#divChatMsgs').append(StrLeft);
                }
                else if (UserList[d].Chat_Isfromuser == 0) {  // && UserList[d].to == 1
                    StrRight = " <div class='' style='padding-top: 10px;' id = " + userid + "><div class='clearfix' style='font-size:12px;'>"
                        + "<span class='' style='float: right;padding-right: 15px;color: #73879C;font-weight: 600;'>" + username + " - " + ToUsername + "</span>"
                        + "<span class='' style='float: left;padding-left: 10px;'>" + userlastmsgdate + "</span>"
                        + "</div>"
                        //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                        + "<div class='' style='background-color:#1f2d3d61;border-color:#1f2d3d00;position:inherit;margin:5px 0px 0px 50px;height: 30px;border-radius: 5px;padding-left: 10px;padding-top: 5px;color: white;width: 89%;'>" + userlastmsg + "</div></div>";

                    $('#divChatMsgs').append(StrRight);
                }
            }

            if (IsRead == "0") {

                var Obj = {
                    Add_From_Id: FromUserId,
                    Add_To_Id: ToUserId
                }

                $.ajax({
                    url: "/DefaultPage/Update_IsRead",
                    data: JSON.stringify(Obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;

                        if (result.Value == 1) {
                            LoadChatUsers_NewMessageCount(userid);
                            LoadChatUsers_NewMessage(userid);

                            $('#divNewMessages').empty();
                        }
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }

            //if (StrLeft != "" || StrRight != "") {
            //    $('#divChatMsgs').append(StrLeft + StrRight);
            //}
        }

    }).done(function () {
        //   $('#divContacts').hide();

        //$('#divContacts').removeClass('card direct-chat direct-chat-primary direct-chat-contacts-open');
        //$('#divContacts').addClass('card direct-chat direct-chat-primary');

        $('#divContacts').hide();
        $('#divNewMessages').hide();
    });
}

function LoadAllMsg(FromUserId) {
    debugger;

    var StrOpen = "";
    var StrClose = "";
    var StrLeft = "";
    var StrRight = "";

    SelFromUserId = FromUserId;
    //  SelToUserId = ToUserId;

    $('#divChatMsgs').css('display', 'block');
    $('#divChatMsgs').empty();

    $.ajax({
        url: "/DefaultPage/LoadAllMsg",
        data: JSON.stringify({ FromUserId: FromUserId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (json) {
            debugger;

            // var data = result.Value;

            var UserList = [];
            UserList = json.Value;

            for (var d = 0; d < UserList.length; d++) {

                var userid = UserList[d].Chat_UserId;
                var username = UserList[d].Chat_Username;
                // var userimg = UserList[d].userimg;
                var userlastmsgdate = UserList[d].Chat_Time;
                var userlastmsg = UserList[d].Chat_Message;

                var ToUsername = UserList[d].Chat_ToUsername;

                if (UserList[d].Chat_Isfromuser == 1) {  // && UserList[d].to == 0

                    StrLeft = " <div class='' style='padding-top: 10px;' id = " + userid + "><div class='clearfix' style='font-size:12px;'>"
                      + "<span class='' style='padding-left:10px;color:#73879C;font-weight:600;'>" + username + " - " + ToUsername + "</span>"
                      + "<span class='' style='float:right;padding-right:15px;'>" + userlastmsgdate + "</span>"
                      + "</div>"
                      //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                      + "<div class='' style='margin: 5px 50px 0px 10px;height: 30px;background-color: #d2d6de;border: 1px solid #d2d6de;color: #444;padding-left: 10px;padding-top: 5px;border-radius: 5px;position: relative;'>" + userlastmsg + "</div></div>"; //position: inherit;

                    //StrLeft = " <div class='direct-chat-msg' id = " + userid + "><div class='direct-chat-infos clearfix' style='font-size:12px;'>"
                    //    + "<span class='direct-chat-name float-left'>" + username + " - " + ToUsername + "</span>"
                    //    + "<span class='direct-chat-timestamp float-right'>" + userlastmsgdate + "</span>"
                    //    + "</div>"
                    //    //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                    //    + "<div class='direct-chat-text' style='margin:5px 50px 0px 0px;'>" + userlastmsg + "</div></div>"; //position: inherit;

                    $('#divChatMsgs').append(StrLeft);
                }
                else if (UserList[d].Chat_Isfromuser == 0) {  // && UserList[d].to == 1

                    StrRight = " <div class='' style='padding-top: 10px;' id = " + userid + "><div class='clearfix' style='font-size:12px;'>"
                      + "<span class='' style='float: right;padding-right: 15px;color: #73879C;font-weight: 600;'>" + username + " - " + ToUsername + "</span>"
                      + "<span class='' style='float: left;padding-left: 10px;'>" + userlastmsgdate + "</span>"
                      + "</div>"
                      //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                      + "<div class='' style='background-color:#1f2d3d61;border-color:#1f2d3d00;position:inherit;margin:5px 0px 0px 50px;height: 30px;border-radius: 5px;padding-left: 10px;padding-top: 5px;color: white;width: 89%;'>" + userlastmsg + "</div></div>";

                    //StrRight = " <div class='direct-chat-msg right' id = " + userid + "><div class='direct-chat-infos clearfix' style='font-size:12px;'>"
                    //    + "<span class='direct-chat-name float-right'>" + username + " - " + ToUsername + "</span>"
                    //    + "<span class='direct-chat-timestamp float-left'>" + userlastmsgdate + "</span>"
                    //    + "</div>"
                    //    //+ "<img class='direct-chat-img' src='" + userimg + "' alt='message user image'>"
                    //    + "<div class='direct-chat-text' style='background-color:#1f2d3d61;border-color:#1f2d3d00;position:inherit;margin:5px 0px 0px 50px;'>" + userlastmsg + "</div></div>";

                    $('#divChatMsgs').append(StrRight);
                }
            }

            //if (StrLeft != "" || StrRight != "") {
            //    $('#divChatMsgs').append(StrLeft + StrRight);
            //}
        }

    }).done(function () {
        //   $('#divContacts').hide();

        //$('#divContacts').removeClass('card direct-chat direct-chat-primary direct-chat-contacts-open');
        //$('#divContacts').addClass('card direct-chat direct-chat-primary');
        $('#divContacts').hide();

    });
}

function ComposeMessages() {
    debugger;

    if (!IsComposeMsgShow) {
        $("#divCompose").slideDown(500);
        IsComposeMsgShow = true;
    }
    else {
        $("#divCompose").hide(500);
        IsComposeMsgShow = false;
    }
}

function SendMsg() {
    debugger;

    if (SelToUserId == 0) {
        // alert("Please select Contact to send message!");

        speechSynthesis.cancel();
        //clearInterval(interval);

        var msg = "Please select CONTACTS to send message!";

        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);

        //$("#AlertlabelFR").html(msg);
        //$("#myModal").modal('show');
        //texttospeak(msg);
        SaveAlert = false;

        $('#divContacts').show();
        return false;
    }

    var FromUserId = SelFromUserId;
    var ToUserId = SelToUserId;

    var Message = $('#txtChatMsg').val();
    if (Message == "") {
        //  alert('Please Enter Message..');

        speechSynthesis.cancel();
        //clearInterval(interval);

        var msg = "Please Enter Message..";

        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);

        //$("#AlertlabelFR").html(msg);
        //$("#myModal").modal('show');
        //texttospeak(msg);
        SaveAlert = false;

        return false;
    }

    var todaydate = new Date();

    var Obj = {
        Add_Id: 0,
        Add_From_Id: FromUserId,
        Add_To_Id: ToUserId,
        Add_Chat_Message: $("#txtChatMsg").val(),
        Add_Chat_Time: todaydate
    }

    $.ajax({
        url: "/DefaultPage/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;

            if (result.Value == 1) {

                //alert('Message Send Successfully');
                //// window.location.href = "/MainTandATemplate/MainTandATemplateIndex";

                speechSynthesis.cancel();
                //clearInterval(interval);

                var msg = "Message Send Successfully";

                // var msg = "Message Send to " + SelToUserName + "Successfully";

                var flg = 1;
                var mod = 1; //1 - not reload page
                var ur = "";
                AlartMessage(msg, flg, mod, ur);

                //$("#AlertlabelFR").html(msg);
                //$("#myModal").modal('show');
                //texttospeak(msg);
                SaveAlert = false;

                LoadChatMsg(FromUserId, ToUserId);
                $('#txtChatMsg').val("");
            }
            if (result.Value == 0) {

                // alert('Message not Send properly');

                speechSynthesis.cancel();
                //clearInterval(interval);

                var msg = "Message not Send properly";

                var flg = 5;
                var mod = 1;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);

                SaveAlert = false;
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}