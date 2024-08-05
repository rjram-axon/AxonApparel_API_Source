var StyleRowId = 0;
var TrimsList = [];
var mod = 0;
var BMasId = 0;
var OrdNo = 0;
var Buyerid = 0;
var Styleid = 0;
var precostmasid = 0;
var trimsrowindex = -1;
$(document).ready(function () {
    debugger;

    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');


    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRowId = queryvalue[1];
    Mod = queryvalue[3];
    getDate();

    //LoadColorDDL("#ddlColor");
    //LoadSizeDDL("#ddlCount");
    //LoadProcessDDL("#dllProcess");
    //LoadYarnDDL("#ddlYarnlist");
    getbyID(StyleRowId);

    $(document).ready(function () {
        $("#tblEntryCompItemdetails ").dataTable().find("tbody").on('click', 'tr', function () {
            index = (this.rowIndex) - 1;
        });
    });
    $(document).on('keyup', '#txtconsumption', function (e) {
        debugger;
        var table = $('#tblTrimsdetails').DataTable();
        var Trimmasid = table.row($(this).parents('tr')).data()["PrecostTrimmasid"];
        var Val = $(this).val();
        $.each(TrimsList, function () {
            if (this.PrecostTrimmasid == Trimmasid) {
                this.Consumption = Val;

            }
        });

    });
});

function getDate() {
    debugger;
    var todaydate = new Date();
    var day = todaydate.getDate();
    var Pmonth = todaydate.getMonth() - 2;
    var Cmonth = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = Pmonth + "/" + day + "/" + year;
    var Fdatestring = day + "/" + Cmonth + "/" + year;
    Reqdate = Fdatestring;
    var day = new Date(),
        year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
        month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
        date = month + '/' + day.getDate() + '/' + year;


    $('#txtEntryDate').val(Fdatestring);
    $('#txtBReqDate').val(Fdatestring);


}

function getbyID(ID) {
    debugger;

    $.ajax({
        url: "/Precosting/GetPrecostingDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            if (obj != undefined && obj != null && obj.length > 0) {

                $('#txtOrderNo').val(obj[0]["Orderno"]);
                $('#txtBuyer').val(obj[0]["Buyer"]);
                $('#txtRefNo').val(obj[0]["Style"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtRemark').val(obj[0]["Remarks"]);
                $('#txtBuyerOrderDate').val(moment(obj[0]["Orderdate"]).format('DD/MM/YYYY'));
                $('#txtEntryDate').val(moment(obj[0]["ConsumptionEntrydate"]).format('DD/MM/YYYY'));
                OrdNo = obj[0]["Orderno"];
                BMasId = obj[0]["Bmasid"];
                Buyerid = obj[0]["Buyerid"];
                Styleid = obj[0]["Styleid"];
                precostmasid = obj[0]["PrecostFabTrimmasid"];

                if (Mod == 0) {
                    LoadAddTrims(precostmasid)
                }
                else if (Mod == 1) {
                    $('#btnDelete').hide();
                    $('#btnAdd').hide();
                    $('#btnUpdate').show();
                    LoadEditTrims(precostmasid);
                    
                }
                else {
                    $('#btnDelete').show();
                    $('#btnAdd').hide();
                    $('#btnUpdate').hide();
                    LoadEditTrims(precostmasid);
                   
                }

            }

            $('#myModal1').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadTrimsTable(trimsListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblTrimsdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblTrimsdetails').DataTable().destroy();
    }
    $('#tblTrimsdetails').empty();
    TrimsList.sort(function (a, b) {
        return a.TrimsSlNo - b.TrimsSlNo;
    })
    $('#tblTrimsdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: TrimsList,
        scrollY: 300,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
             //{ title: "Trims SlNo", data: "TrimsSlNo", "visible": false },
            { title: "Trims_MasID", data: "PrecostTrimmasid", "visible": false },
            { title: "Itemid", data: "GItemid", "visible": false },
            { title: "Item", data: "GItem" },
            { title: "Trimsid", data: "Itemid", "visible": false },
            { title: "Trims", data: "Item" },
            { title: "Colorid", data: "Colorid", "visible": false },
            { title: "Color", data: "Color" },
            { title: "Sizeid", data: "Sizeid", "visible": false },
            { title: "Size", data: "Size" },
            { title: "Uomid", data: "UOMid", "visible": false },
            { title: "UOM", data: "UOM" },
             {
                 title: "Consumption", data: "Consumption",
                 render: function (data) {

                     return '<input type="text" id="txtconsumption" class="calcgsm form-control"  style="width: 50px;text-align: center;" value=' + data + ' >';

                 },
             },
               //{
               //    title: "ACTION", "mDataProp": null,
               //    "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntrimsremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               //}
        ]
    });


    $("#tblTrimsdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblTrimsdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function LoadAddTrims(ID) {
    debugger;

    $.ajax({
        url: "/Precosting/GetPrecostTrimsEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList = (result.Value);

            loadTrimsTable(TrimsList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function LoadEditTrims(ID) {
    debugger;

    $.ajax({
        url: "/Precosting/GetPrecostTrimsEditDetails/" + ID,
        type: "GET",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            TrimsList = (result.Value);

            loadTrimsTable(TrimsList);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Save() {

    var isAllValid = true;
    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if ($('#txtconsumption').val() == "") {
        isAllValid = false;
        $('#txtconsumption').css('border-color', 'Red');
    }
    else {
        $('#txtconsumption').css('border-color', 'lightgrey');
    }
    if (isAllValid) {
    var objSubmit = {
        OrderNo: $('#txtOrderNo').val(),
        Bmasid: BMasId,
        Styleid: Styleid,
        Buyerid: Buyerid,
        ConsumptionEntrydate: $('#txtEntryDate').val(),
        Stylerowid: StyleRowId,
        TrimsDet: TrimsList,
        PrecostFabTrimmasid: precostmasid
    };
    //$("#ConAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/PrecostingTrimsConsumption/Add",
        data: JSON.stringify(objSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("PrecostingTrims Saved Sucessfully");
                window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {

            alert(errormessage.responseText);
        }
    });
}
}

function Update() {

    var isAllValid = true;
    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if ($('#txtconsumption').val() == "") {
        isAllValid = false;
        $('#txtconsumption').css('border-color', 'Red');
    }
    else {
        $('#txtconsumption').css('border-color', 'lightgrey');
    }
    if (isAllValid) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            ConsumptionEntrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            TrimsDet: TrimsList,
            PrecostFabTrimmasid: precostmasid
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingTrimsConsumption/Update",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingTrims Updated Sucessfully");
                    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
                } else {

                    window.location.href = "/Error/Index";


                }

            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}

function Delete() {

    var isAllValid = true;
    if (TrimsList.length == 0) {

        alert("Please Check Trims Details..");
        return true;
    }

    if ($('#txtconsumption').val() == "") {
        isAllValid = false;
        $('#txtconsumption').css('border-color', 'Red');
    }
    else {
        $('#txtconsumption').css('border-color', 'lightgrey');
    }
    if (isAllValid) {
        var objSubmit = {
            OrderNo: $('#txtOrderNo').val(),
            Bmasid: BMasId,
            Styleid: Styleid,
            Buyerid: Buyerid,
            ConsumptionEntrydate: $('#txtEntryDate').val(),
            Stylerowid: StyleRowId,
            TrimsDet: TrimsList,
            PrecostFabTrimmasid: precostmasid
        };
        //$("#ConAdd").attr("disabled", true);
        LoadingSymb();
        $.ajax({
            url: "/PrecostingTrimsConsumption/Delete",
            data: JSON.stringify(objSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    alert("PrecostingTrims Deleted Sucessfully");
                    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
                } else {

                    window.location.href = "/Error/Index";


                }

            },
            error: function (errormessage) {

                alert(errormessage.responseText);
            }
        });
    }
}

function Close() {
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + BMasId + "=&Mode=" + 1;
}