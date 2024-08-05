var Gp = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var PurAgnInd = 0;
var PurAppId = 0;
var Rpt = '';
var PurOrdId = 0;
var DCompid = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkSupplier = true;
var ChkStyle = true;
var ChkPONo = true;
var ChkComp = false;
var DPurApp = 0;
var PlanFabric = [];
var UserName = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    PurAppId = $("#hdnPurAppid").data('value');
    DCompid = $("#hdnDCompid").data('value');
    DPurApp = $("#hdnPurAppid").data('value');
    UserName = $("#hdnusername").data('value');
    getDate();


    LoadCompanyDDL("#ddlMCompany");
    LoadProcessDDL("#ddlMProcess");

    LoadMaingrid();


    $('#tblEntryItemdetails').on('click', 'tr', function (e) {


        var table = $('#tblEntryItemdetails').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tblEntryItemdetails').dataTable().fnGetData(row);

        var trno = data.Transno;
        var supp = data.supplier;
        var ordno = data.joborderNo;
        var proc = data.ProcessName;
        $('#txtmaincomp').val(supp);
        $('#txtmaintranno').val(trno);
        $('#txtmainordno').val(ordno);
        $('#txtmainprocess').val(proc);



    });

    $(document).on('keyup', '.txtPurchaseQty', function (e) {
        var table = $('#tblEntryItemdetails').DataTable();
        var Skid = table.row($(this).parents('tr')).data()["StockId"];
        var Val = $(this).val();



        $.each(PlanFabric, function () {
            if (this.StockId == Skid) {
                this.Markup_Rate = Val;
               
            }
        });


       
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





///////////////////////
function LoadMaingrid() {
    debugger;



    var OrdNo = "";
    var ONo = $('select#ddlMOrdNo option:selected').val();

    if (ONo == 0 || "undefined") {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrdNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || "undefined") {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }



    var Tranno = "";
    var TRNo = $('select#ddlMTransno option:selected').val();

    if (TRNo == 0 || "undefined") {
        Tranno == "";
    }
    else {

        Tranno = $('select#ddlMTransno option:selected').val();
    }


    var ItemId = $('#ddlMItem').val();

    if (ItemId == null) {
        ItemId = 0;
    } else {
        ItemId = $('#ddlMItem').val();
    }

    var PrdId = $('#ddlMProcess').val();

    if (PrdId == null) {
        PrdId = 0;
    } else {
        PrdId = $('#ddlMProcess').val();
    }


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    //var tyid = $('#ddlMSupplierType').val();

    //if (tyid == null) {
    //    tyid = 0;
    //} else {
    //    tyid = $('#ddlMSupplierType').val();
    //}


    var SuppTyp = "";
    var sup = $('select#ddlMSupplierType option:selected').val();

    if (sup == 0 || "undefined") {
        SuppTyp == "";
    }
    else {

        SuppTyp = $('select#ddlMSupplierType option:selected').val();
    }

    $.ajax({
        url: "/ReviseMarkup/LoadMaingriddet",
        data: JSON.stringify({ OrdNo: OrdNo, RefNo: RefNo, Tranno: Tranno, ItemId: ItemId, PrdId: PrdId, CompId: CompId, tyid: SuppTyp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var data = json.Value;

            PlanFabric = data;

            var revdet = {};
            var rev = [];

            $.each(data, function (i, el) {

                if (!revdet[el.refno]) {
                    revdet[el.refno] = true;
                    rev.push(el);
                }
            });

            $('#ddlMRefNo').empty();
            $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
            $.each(rev, function () {
                $('#ddlMRefNo').append($('<option></option>').text(this.refno));
            });

     

            var orddet = {};
            var ord = [];

            $.each(data, function (i, el) {

                if (!orddet[el.Transno]) {
                    orddet[el.Transno] = true;
                    ord.push(el);
                }
            });

            $('#ddlMTransno').empty();
            $('#ddlMTransno').append($('<option/>').val('0').text('--Select Trans No--'));
            $.each(ord, function () {
                $('#ddlMTransno').append($('<option></option>').text(this.Transno));
            });

             var itmdet = {};
            var itm = [];

            $.each(data, function (i, el) {

                if (!itmdet[el.Itemid]) {
                    itmdet[el.Itemid] = true;
                    itm.push(el);
                }
            });

            $('#ddlMItem').empty();
            $('#ddlMItem').append($('<option/>').val('0').text('--Select Item--'));
            $.each(itm, function () {
                $('#ddlMItem').append($('<option></option>').val(this.Itemid).text(this.item));
            });

      

            var oodet = {};
            var ood = [];

            $.each(data, function (i, el) {

                if (!oodet[el.joborderNo]) {
                    oodet[el.joborderNo] = true;
                    ood.push(el);
                }
            });

            $('#ddlMOrdNo').empty();
            $('#ddlMOrdNo').append($('<option/>').val('0').text('--Select Ord No--'));
            $.each(ood, function () {
                $('#ddlMOrdNo').append($('<option></option>').text(this.joborderNo));
            });

  

            var suppdet = {};
            var supp = [];

            $.each(data, function (i, el) {

                if (!suppdet[el.supplierid]) {
                    suppdet[el.supplierid] = true;
                    supp.push(el);
                }
            });

            $('#ddlMAll').empty();
            $('#ddlMAll').append($('<option/>').val('0').text('--Select Supplier--'));
            $.each(supp, function () {
                $('#ddlMAll').append($('<option></option>').val(this.supplierid).text(this.supplier));
            });

               
            var inputcount = 0;
            $('#tblEntryItemdetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tblEntryItemdetails').DataTable().destroy();
                //var table = $('#tblEntryItemdetails').DataTable();
                //var rows = table.clear().draw();
                //$('#tblEntryItemdetails').DataTable().rows.add(data);
                //$('#tblEntryItemdetails').DataTable().columns.adjust().draw();
            }
           

                $('#tblEntryItemdetails').DataTable({
                    data: data,
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

                             { title: "StockId", data: "StockId", "visible": false },
                             { title: "Item", data: "item" },
                             { title: "Color", data: "color" },
                             { title: "Size", data: "size" },
                             { title: "Uom", data: "uom" },
                             { title: "Qty", data: "qty" },
                             //{ title: "Markup Rate", data: "Markup_Rate" },
                               {
                                   title: "Markup Rate", data: "Markup_Rate",
                                   render: function (data) {

                                       return '<input type="text" id="txtPurchaseQty"class="form-control txtPurchaseQty"  style="width: 50px;text-align: center;"  value=' + data + ' ">';

                                   },
                               },
                             { title: "Itemid", data: "Itemid", "visible": false },



                    ]

                });

          


            var table = $('#tblEntryItemdetails').DataTable();
            $("#tblEntryItemdetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblEntryItemdetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });




        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CMainList() {

   
    LoadMaingrid();
    SMainList();
}
function SMainList() {
    LoadDropMaingrid();
}

function LoadDropMaingrid() {
    debugger;



    var OrdNo = "";
    var ONo = $('select#ddlMOrdNo option:selected').val();

    if (ONo == 0 || ONo == "undefined") {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrdNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0 || RNo == "undefined") {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }



    var Tranno = "";
    var TRNo = $('select#ddlMTransno option:selected').val();

    if (TRNo == 0 || TRNo =="undefined") {
        Tranno == "";
    }
    else {

        Tranno = $('select#ddlMTransno option:selected').val();
    }


    var ItemId = $('#ddlMItem').val();

    if (ItemId == null) {
        ItemId = 0;
    } else {
        ItemId = $('#ddlMItem').val();
    }

    var PrdId = $('#ddlMProcess').val();

    if (PrdId == null) {
        PrdId = 0;
    } else {
        PrdId = $('#ddlMProcess').val();
    }


    var CompId = $('#ddlMCompany').val();

    if (CompId == null) {
        CompId = DCompid;
    } else {
        CompId = $('#ddlMCompany').val();
    }

    //var tyid = $('#ddlMSupplierType').val();

    //if (tyid == null) {
    //    tyid = 0;
    //} else {
    //    tyid = $('#ddlMSupplierType').val();
    //}


    var SuppTyp = "";
    var sup = $('select#ddlMSupplierType option:selected').val();

    if (sup == 0 || sup == "undefined") {
        SuppTyp == "";
    }
    else {

        SuppTyp = $('select#ddlMSupplierType option:selected').val();
    }

    $.ajax({
        url: "/ReviseMarkup/LoadMaingriddet",
        data: JSON.stringify({ OrdNo: OrdNo, RefNo: RefNo, Tranno: Tranno, ItemId: ItemId, PrdId: PrdId, CompId: CompId, tyid: SuppTyp }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var data = json.Value;

            PlanFabric = data;

          
            var inputcount = 0;
            $('#tblEntryItemdetails tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                $('#tblEntryItemdetails').DataTable().destroy();
                //var table = $('#tblEntryItemdetails').DataTable();
                //var rows = table.clear().draw();
                //$('#tblEntryItemdetails').DataTable().rows.add(data);
                //$('#tblEntryItemdetails').DataTable().columns.adjust().draw();
            }


            $('#tblEntryItemdetails').DataTable({
                data: data,
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

                         { title: "StockId", data: "StockId", "visible": false },
                         { title: "Item", data: "item" },
                         { title: "Color", data: "color" },
                         { title: "Size", data: "size" },
                         { title: "Uom", data: "uom" },
                         { title: "Qty", data: "qty" },
                         //{ title: "Markup Rate", data: "Markup_Rate" },
                           {
                               title: "Markup Rate", data: "Markup_Rate",
                               render: function (data) {

                                   return '<input type="text" id="txtPurchaseQty"class="form-control txtPurchaseQty"  style="width: 50px;text-align: center;"  value=' + data + ' ">';

                               },
                           },
                         { title: "Itemid", data: "Itemid", "visible": false },



                ]

            });




            var table = $('#tblEntryItemdetails').DataTable();
            $("#tblEntryItemdetails tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tblEntryItemdetails tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });



            var revdet = {};
            var rev = [];

            $.each(data, function (i, el) {

                if (!revdet[el.refno]) {
                    revdet[el.refno] = true;
                    rev.push(el);
                }
            });

            $('#ddlMRefNo').empty();
            $('#ddlMRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
            $.each(rev, function () {
                $('#ddlMRefNo').append($('<option></option>').text(this.refno));
            });



            var orddet = {};
            var ord = [];

            $.each(data, function (i, el) {

                if (!orddet[el.Transno]) {
                    orddet[el.Transno] = true;
                    ord.push(el);
                }
            });

            $('#ddlMTransno').empty();
            $('#ddlMTransno').append($('<option/>').val('0').text('--Select Trans No--'));
            $.each(ord, function () {
                $('#ddlMTransno').append($('<option></option>').text(this.Transno));
            });

            var itmdet = {};
            var itm = [];

            $.each(data, function (i, el) {

                if (!itmdet[el.Itemid]) {
                    itmdet[el.Itemid] = true;
                    itm.push(el);
                }
            });

            $('#ddlMItem').empty();
            $('#ddlMItem').append($('<option/>').val('0').text('--Select Item--'));
            $.each(itm, function () {
                $('#ddlMItem').append($('<option></option>').val(this.Itemid).text(this.item));
            });



            var oodet = {};
            var ood = [];

            $.each(data, function (i, el) {

                if (!oodet[el.joborderNo]) {
                    oodet[el.joborderNo] = true;
                    ood.push(el);
                }
            });

            $('#ddlMOrdNo').empty();
            $('#ddlMOrdNo').append($('<option/>').val('0').text('--Select Ord No--'));
            $.each(ood, function () {
                $('#ddlMOrdNo').append($('<option></option>').text(this.joborderNo));
            });



            var suppdet = {};
            var supp = [];

            $.each(data, function (i, el) {

                if (!suppdet[el.supplierid]) {
                    suppdet[el.supplierid] = true;
                    supp.push(el);
                }
            });

            $('#ddlMAll').empty();
            $('#ddlMAll').append($('<option/>').val('0').text('--Select Supplier--'));
            $.each(supp, function () {
                $('#ddlMAll').append($('<option></option>').val(this.supplierid).text(this.supplier));
            });
















        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function save() {

    if (PlanFabric.length == 0) {
        //alert("Please Enter the Item Details..");
        var msg = 'Please enter the item details...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }


    var objPurSubmit = {

        ReStkDet: PlanFabric,

    };
    debugger;
    LoadingSymb();
    $.ajax({
        url: "/ReviseMarkup/Update",
        data: JSON.stringify(objPurSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                //alert("Data Updated Sucessfully");
                   
                //window.location.reload();
                var msg = 'Data Updated Sucessfully...';
                var flg = 1;
                var mod = 0;
                var ur = "";
                AlartMessage(msg, flg, mod, ur);
            } else {

                window.location.href = "/Error/Index";

            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Close() {

    window.location.href = "/DefaultPage/DefaultPage?UserName=" + UserName;
}