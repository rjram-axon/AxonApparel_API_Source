
var Targetlist = [];
var BMasid = 0;
var DCompid = 0;
var flg = 0;
var MainFDate = '';
$(document).ready(function () {
    debugger;
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    flg = 1;
    LoadCompanyDDL("#ddlMCompany");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadRefNoDDL("#ddlMRefNo"); 
    LoadBuyerDDL("#ddlMBuyer");
    LoadTargetList();
    DCompid = $("#hdnDCompid").data('value');
    
    $(document).on('click', '.btntargetedit', function () {
        debugger;
        // Mode = 1;

        Targetrowindex = $(this).closest('tr').index();

        var currentro12 = Targetlist.slice(Targetrowindex);

        var Targetmasid= currentro12[0]['Targetmasid'];
        BMasid = currentro12[0]['BMasid'];
        var Mode = 1;
        window.location.href = "/PrecostingTargetEntry/PrecostingTargetEntryIndex?OrdId=" + BMasid + "=&trMasId=" + Targetmasid + "=&Mode=" + Mode;
    });

    $(document).on('click', '.btntargetremove', function () {
        debugger;
        // Mode = 1;

        Targetrowindex = $(this).closest('tr').index();

        var currentro12 = Targetlist.slice(Targetrowindex);

        var Targetmasid = currentro12[0]['Targetmasid'];
        BMasid = currentro12[0]['BMasid'];
        var Mode = 2;
        window.location.href = "/PrecostingTargetEntry/PrecostingTargetEntryIndex?OrdId=" + BMasid + "=&trMasId=" + Targetmasid + "=&Mode=" + Mode;
    });
});

function getDate() {

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
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);

}

function LoadTargetAdd() {
    debugger;

    window.location.href = "/PrecostingTargetAdd/PrecostingTargetAddIndex";
    // }

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

        OrdNo = $('select#ddlOrderNo option:selected').val();
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

function LoadTargetList() {
    debugger;
    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {
        RefNo = $('select#ddlMRefNo option:selected').text();
    }

    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
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
    
    var Targetno = "";
    var tarNo = $('select#ddlTargetNo option:selected').val();

    if (tarNo == 0) {
        Targetno == "";
    }
    else {

        Targetno = $('select#ddlTargetNo option:selected').text();
    }

    
   

    $.ajax({
        url: "/PrecostingTarget/GetPrecostTargetListDetails/",
        data: JSON.stringify({ CmpId: cmpid, Order_No: OrdNo, Ref_No: RefNo, BuyId: buyid, frmDate: FDate, ToDate: TDate, TargetNo: Targetno }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            debugger;
            Targetlist = (result.Value);
            for (var r = 0; r < Targetlist.length; r++) {
                Targetlist[r].EntryDate = Targetlist[r].EntryDate == null ? EntryDate : moment(Targetlist[r].EntryDate).format('DD/MM/YYYY');
            }

            loadTargetListTable(Targetlist);
            if (flg == 1) {
                loadtargetDDL();
                flg = 0;
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadTargetListTable(targetListObj) {
    debugger;
    // $('#tblcompdetails').DataTable().destroy();
    var inputcount = 0;
    $('#tblTargetlistdetails tr').each(function () {
        inputcount++;
    });

    if (inputcount > 0) {
        $('#tblTargetlistdetails').DataTable().destroy();
    }
    $('#tblTargetlistdetails').empty();
    //Targetlist.sort(function (a, b) {
    //    return a.TargetNo - b.TargetNo;
    //})
    $('#tblTargetlistdetails').DataTable({
        //'bSortable': false,
        //'aTargets' : [ 7, 8 ],
        data: Targetlist,
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
            { title: "Targetmasid", data: "Targetmasid", "visible": false },            
            { title: "Target No", data: "TargetNo" },
            { title: "Entry Date", data: "EntryDate" },
            { title: "Bmasid", data: "BMasid", "visible": false },
          

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntargetedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btntargetremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
               }
        ]
    });


    $("#tblTargetlistdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblTargetlistdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}

function List() {
    LoadTargetList();

}

function loadtargetDDL() {

   
    var data = Targetlist;
    var tardet = {};
    var tar = [];

    $.each(data, function (i, el) {

        if (!tardet[el.Targetmasid]) {
            tardet[el.Targetmasid] = true;
            tar.push(el);
        }
        $(ddlTargetNo).empty();
        
        $(ddlTargetNo).append($('<option/>').val('0').text('--Select TargetNo--'));
        $.each(tar, function () {
            $(ddlTargetNo).append($('<option></option>').val(this.Targetmasid).text(this.TargetNo));
        });

    });
}