var Gs = 0;
var repobj = [];
var Repid = 0;
var MainFDate = 0;
var PurAgnInd = 0;
$(document).ready(function () {
    debugger;
    PurAgnInd = $("#hdnPurAgnIndid").data('value');
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    // LOADGRN();
    LoadMainGrid();
    ListOrderRefNo();
    ListGrnPoNo();
    ListGrnSupp();
    ListGrnDc();
    ListGrn();
    LoadCompanyDDL("#ddlMCompany");
    $('#SplId').hide();

    $("#selectall").change(function () {
        debugger;
        if (this.checked == true) {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', true);
            });
        } else {
            $('#sbTwo option').each(function () {
                $(this).prop('selected', false);
            });
        }
    });
    $('#tGMbody').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tGMbody').DataTable();

        var row = $(this).closest('tr');
        var data = $('#tGMbody').dataTable().fnGetData(row);


        var ItmId = data[0];
        var accpos = data[10];
        LoadMainOrderDetails(ItmId);
        LoadMainOrderStkDetails(ItmId);
       

    });
});


function LoadMainOrderDetails(Pid) {

    debugger;

    $.ajax({
        url: "/GRNMain/LoadMainOrderdet",
        data: JSON.stringify({ pid: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var ord = "";
            var ref = "";
            var sty = "";
            for (var t = 0; t < obj.length; t++) {
                var od = obj[t].OrderNo;
                var re = obj[t].RefNo;
                var st = obj[t].style;
                if (ord == '') {
                    ord = od;
                }
                else {
                    ord = ord + "," + od;
                }

                if (ref == '') {
                    ref = re;
                }
                else {
                    ref = ref + "," + re;
                }

                if (sty == '') {
                    sty = st;
                }
                else {
                    sty = sty + "," + st;
                }

            }
            $('#txtmainOrdno').val(ord);
            $('#txtmainrefno').val(ref);
            $('#txtmainstyle').val(sty);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}



function LoadMainOrderStkDetails(Pid) {

    debugger;

    $.ajax({
        url: "/GRNMain/LoadMainOrderstkdet",
        data: JSON.stringify({ pid: Pid }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;

            var trans = "";

            for (var t = 0; t < obj.length; t++) {
                var tr = obj[t].transno;

                if (trans == '') {
                    trans = tr;
                }
                else {
                    trans = trans + "," + tr;
                }



            }
            $('#txtmaintrans').val(trans);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
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


function LoadGrnOrderAdd() {
    debugger;
    PGMID = 0;

    var OrderType = $("input[name='MOType']:checked").val();
    var IType = "A";
    //if (OrderType == "B") {
    var OTy = "B";
    window.location.href = "/GRNAdd/GRNAddIndex?PGMasId=" + PGMID + "=&OrderType=" + OrderType + "=&PType=" + IType;
    // }

}
function LoadMainGrid() {

    debugger;



    if (Gs == 0) {
        Gs = "GRN";
    } else {
        Gs = Gs;
    }


    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').val();
    }

    var RefNo = "";
    var RNo = $('select#ddlMRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlMRefNo option:selected').val();
    }

    var DcNo = "";
    var DNo = $('select#ddlMDcNo option:selected').val();

    if (DNo == 0) {
        DcNo == "";
    }
    else {

        DcNo = $('select#ddlMDcNo option:selected').val();
    }

    var CompId = $('#ddlMCompany').val();
    var SuppId = $('#ddlMSupplier').val();
    var GrnId = $('#ddlMGrnNo').val();
    var PoId = $('#ddlMPoNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var POType = $('input[name="MIType"]:checked').attr('value');

    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }

    $.ajax({
        url: "/GRNMain/GetPurGrnMainDetails",
        data: JSON.stringify({ OrderNo: OrdNo, RefNo: RefNo, Dc_no: DcNo, supplierid: SuppId, companyid: CompId, PurOrdId: PoId, Grn_MasId: GrnId, pur_type: OrdeType, Pur_ItemType: POType, FromDate: FDate, ToDate: TDate, MEntryType: Gs, PurIndType: PurAgnInd }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tGMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tGMbody').DataTable();
                var rows = table.clear().draw();
                $('#tGMbody').DataTable().rows.add(dataSet);
                $('#tGMbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tGMbody').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    bSort: false,
                    columns: [
                             { title: "GrnMasId", "visible": false },
                             { title: "Company" },
                             { title: "CompanyId", "visible": false },
                             { title: "Supplier" },
                             { title: "SupplierId", "visible": false },
                             { title: "Grn No" },
                             { title: "Dc No" },
                             { title: "Date" },
                             { title: "Item Type" },
                             { title: "Qlc No", "visible": false },
                                { title: "ChkAccPos", "visible": false },
                             { title: "Action" },

                    ]

                });
            }
            var table = $('#tGMbody').DataTable();
            $("#tGMbody tr").click(function () {
                var selected = $(this).hasClass("selected");
                $("#tGMbody tr").removeClass("selected");
                if (!selected)
                    $(this).addClass("selected");
            });
            CheckRights("GoodsReceiptTrims");
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function ListOrderRefNo() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }

    $.ajax({
        url: "/GRNMain/GetOrderNo",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMOrderNo).empty();
                $(ddlMRefNo).empty();
                //$(ddlMPoNo).empty();
                //$(ddlMSupplier).empty();
                //$(ddlMDcNo).empty();
                //$(ddlMGrnNo).empty();

                //OrdNo
                $(ddlMOrderNo).append($('<option/>').val('0').text('--Select OrdNo--'));
                $.each(data, function () {
                    $(ddlMOrderNo).append($('<option></option>').text(this.OrderNo));

                });
                //RefNo
                $(ddlMRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlMRefNo).append($('<option></option>').text(this.RefNo));
                });
                //PoNo
                //$(ddlMPoNo).append($('<option/>').val('0').text('--Select PurOrdNo--'));
                //$.each(data, function () {
                //    $(ddlMPoNo).append($('<option></option>').val(this.PurOrdId).text(this.PurOrdNo));
                //});
                ////Supplier
                //$(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                //$.each(data, function () {
                //    $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.Supplier));
                //});
                ////Dc No
                //$(ddlMDcNo).append($('<option/>').val('0').text('--Select DcNo--'));
                //$.each(data, function () {
                //    $(ddlMDcNo).append($('<option></option>').text(this.Dc_no));
                //});
                ////Grn No

                //$(ddlMGrnNo).append($('<option/>').val('0').text('--Select GrnNo--'));
                //$.each(data, function () {
                //    $(ddlMGrnNo).append($('<option></option>').val(this.Grn_MasId).text(this.receipt_no));
                //});
            }
        }

    });
}

function ListGrnPoNo() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }


    $.ajax({
        url: "/GRNMain/GetGrnPoNo",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;

                $(ddlMPoNo).empty();

                //PoNo
                $(ddlMPoNo).append($('<option/>').val('0').text('--Select PurOrdNo--'));
                $.each(data, function () {
                    $(ddlMPoNo).append($('<option></option>').val(this.PurOrdId).text(this.PurOrdNo));
                });

            }
        }

    });
}




function ListGrnSupp() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }

    $.ajax({
        url: "/GRNMain/GetGrnSupp",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMSupplier).empty();

                ////Supplier
                $(ddlMSupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlMSupplier).append($('<option></option>').val(this.supplierid).text(this.Supplier));
                });

            }
        }

    });
}

function ListGrnDc() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }


    $.ajax({
        url: "/GRNMain/GetGrnDc",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMDcNo).empty();

                $(ddlMDcNo).append($('<option/>').val('0').text('--Select DcNo--'));
                $.each(data, function () {
                    $(ddlMDcNo).append($('<option></option>').text(this.Dc_no));
                });

            }
        }

    });
}
function ListGrn() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var OType = $('input[name="MOType"]:checked').attr('value');
    var PIType = $('input[name="MIType"]:checked').attr('value');



    var OrderType = OType;

    if (OrderType == "B") {
        var OrdeType = "O";
    } else if (OrderType == "G") {
        var OrdeType = "G";
    } else if (OrderType == "R") {
        var OrdeType = "R";
    } else if (OrderType == "S") {
        var OrdeType = "SP";
    }


    $.ajax({
        url: "/GRNMain/GetGrn",
        data: JSON.stringify({ pur_type: OrdeType, Pur_ItemType: PIType, FromDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                $(ddlMGrnNo).empty();

                ////Grn No

                $(ddlMGrnNo).append($('<option/>').val('0').text('--Select GrnNo--'));
                $.each(data, function () {
                    $(ddlMGrnNo).append($('<option></option>').val(this.Grn_MasId).text(this.receipt_no));
                });

            }
        }

    });
}
function List() {
  //  $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
    ListGrnPoNo();
    ListGrnSupp();
    ListGrnDc();
    ListGrn();
}
function RadioMLClick() {

   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
    ListGrnPoNo();
    ListGrnSupp();
    ListGrnDc();
    ListGrn();
}
function RadioMBClick() {
    $('#SplId').hide();
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
    ListGrnPoNo();
    ListGrnSupp();
    ListGrnDc();
    ListGrn();
}

function RadioSLClick() {
    $('#SplId').show();
  //  $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
    ListOrderRefNo();
    ListGrnPoNo();
    ListGrnSupp();
    ListGrnDc();
    ListGrn();
}

function CMainList() {
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}

function GRnMainList() {
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}

function SuppMainList() {
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}

function OMainList() {
  //  $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}

function POMainList() {
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}
function REFMainList() {
  //  $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}
function PoMainList() {
  //  $('#tGMbody').DataTable().destroy();
    LoadMainGrid();

}

function DcMainList() {
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();

}
function getbyID(Id, CpmId, SupId, accpos) {
    debugger;

   
    var CompId = $('#ddlMCompany').val();

    if (CompId == 0) {
        alert("Please Select the Company..")
        return true;
    }

    if (accpos == 1) {
        alert("Accounts Posted,Please Contact Administrator..");
        return true;
    }

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 1;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/GRNEntry/GRNEntryIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}


function AddQltyID(Id, CpmId, SupId) {
    debugger;



    var CompId = $('#ddlMCompany').val();

    if (CompId == 0) {
        alert("Please Select the Company..")
        return true;
    }

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 0;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/PurchaseQuality/PurchaseQualityIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}



function EditQltyID(Id, CpmId, SupId) {
    debugger;



    var CompId = $('#ddlMCompany').val();

    if (CompId == 0) {
        alert("Please Select the Company..")
        return true;
    }

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 1;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/PurchaseQuality/PurchaseQualityIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}

function QltyDelete(Id, CpmId, SupId) {
    debugger;



    var CompId = $('#ddlMCompany').val();

    if (CompId == 0) {
        alert("Please Select the Company..")
        return true;
    }

    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 2;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/PurchaseQuality/PurchaseQualityIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;


}

function Delete(Id, CpmId, SupId,accpos) {
    debugger;


    var CompId = $('#ddlMCompany').val();

    if (CompId == 0) {
        alert("Please Select the Company..")
        return true;
    }
    if (accpos == 1) {
        alert("Accounts Posted,Please Contact Administrator..");
        return true;
    }
    var AOType = $('input[name="MOType"]:checked').attr('value');
    var AItemType = $('input[name="MIType"]:checked').attr('value');
    var Mode = 2;
    var SuppId = SupId;
    var POrdID = 0;
    window.location.href = "/GRNEntry/GRNEntryIndex?POrdId=" + POrdID + "=&OrderType=" + AOType + "=&PurItemType=" + AItemType + "=&CompId=" + CompId + "=&SuppId=" + SuppId + "=&GrnMasId=" + Id + "=&Mode=" + Mode;

}

function LOADQLTY() {

    var Prg = "Qlty";
    Gs = Prg;
    var Type = "Qlty";
   // $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}
function LOADGRN() {

    var Prg = "GRN";
    Gs = Prg;
    var Type = "GRN";
  //  $('#tGMbody').DataTable().destroy();
    LoadMainGrid();
}

function Pur_Grn_Print(ID) {
    debugger;
    // window.location.href = "../ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInline.aspx?GrnMasId=" + ID;
    Repid = ID;
    $('#myModal2').modal('show');

    docname = "PURCHASE GOODS RECEIPT";
    GenerateReportItem(docname);
}



function GenerateReportItem(name) {
    debugger;
    $("#sbTwo").empty();
    $.ajax({
        url: "/BulkOrder/GetReportOption",
        data: JSON.stringify({ docname: name }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //document.getElementById('sbTwo');
            var obj = result.Value;
            repobj = obj;
            $.each(obj, function () {
                $("#sbTwo").append($("<option></option>").val(this.optionid).html(this.option));

            });

            i = 0, size = obj.length;
            for (i; i < size; i++) {
                //$("#sbTwo").multiselect("widget").find(":checkbox[value='" + obj[i][optionid] + "']").attr("checked", "checked");
                if (obj[i].optionvalue == true) {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", true);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", true);
                    //$("#sbTwo").multiselect("refresh");
                }
                else {
                    $("#sbTwo").find(":checkbox[value='" + obj[i].optionid + "']").attr("checked", false);
                    $("#sbTwo option[value='" + obj[i].optionid + "']").attr("selected", false);
                }
            }
        }
    });
}



function SubReport() {
    debugger;
    var ReportType = $('input[name="BudPrintPreviewPlanned"]:checked').attr('value');
    var RType = 0;
    var TType = $('input[name="MIType"]:checked').attr('value');

    if (TType == "Y") {
        RType = "YARN RECEIPT";
    } else if (TType == "A") {
        RType = "TRIMS RECEIPT";
    }


    // if (TType == "Y") {
    var FType = $('input[name="FabType"]:checked').attr('value');
    if (FType == "G") {
        var src = '../ReportInline/Purchase/PurchaseGrnGreyInlineReport/PurchaseGrnGreyInlineReport.aspx?';
        src = src + "PurOrdId=" + Repid;
        var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
        $("#divReport").html(iframe);
        window.open("../ReportInline/Purchase/PurchaseGrnGreyInlineReport/PurchaseGrnGreyInlineReport.aspx?PurOrdId=" + Repid);

    } else if (FType == "F") {
        var src = '../ReportInline/Purchase/PurchaseGrnFinishInlineReport/PurchaseGrnFinishInlineReport.aspx?';
        src = src + "PurOrdId=" + Repid;
        var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
        $("#divReport").html(iframe);
        window.open("../ReportInline/Purchase/PurchaseGrnFinishInlineReport/PurchaseGrnFinishInlineReport.aspx?PurOrdId=" + Repid);
    } else {
        var arr = [];
        $('#sbTwo :selected').each(function (i, sel) {
            arr.push($(sel).val());
        });
        var res = [];
        var p = [];
        for (var r = 0; r < repobj.length; r++) {
            res.push(repobj[r].optionid);
            p.push(0);
        }
        for (var y = 0; y < arr.length; y++) {
            for (var f = 0; f < res.length; f++) {
                if (arr[y] == res[f]) {
                    p[f] = 1;
                }
            }
        }

        window.open("../ReportInline/Purchase/PurchaseGrnInlineReport/PurGrnReportInline.aspx?GrnMasId=" + Repid + "&Orderno=" + p[0] + "&Remarks=" + p[1] + "&Shortqty=" + p[2] + "&Rejqty=" + p[3] + "&Returnqty=" + p[4] + "&Recvqty=" + p[5] + "&Debitqty=" + p[6] + "&Excsqty=" + p[7] + "&Return=" + p[8] + "&Itmcode=" + p[9] + "&Amnt=" + p[10] + "&Rate=" + p[11] + "&Qty2=" + p[12] + "&Exqty=" + p[13] + "&POdet=" + p[14] + "&Grn=" + p[15] + "&Freight=" + p[16] + "&Ewaybill=" + p[17] + "&Ewaydate=" + p[18] + "&ItemType=" + RType + "&RptTyp=" + ReportType);
    }
    // }
}

function backtomain() {

    $('#myModal2').modal('hide');
}
