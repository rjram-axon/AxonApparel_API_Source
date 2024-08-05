var MainFDate = 0;
var BOrdID = 0;
var List = [];
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");  
    LoadBuyerDDL("#ddlMBuyer");  
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGrp");
    LoadStyleDDL("#ddlMStyle");
    LoadJobNoDDL("#ddlMJobno");
    LoadSeasonDDL("#ddlMSeason");
    LoadRefNoDDL("#ddlMRefno");
    getDate();

    $(document).on('click', '.chkrpt', function () {
        debugger;

        var table = $('#tblmaindetails').DataTable();
        var BMasID = table.row($(this).parents('tr')).data()["BMasID"];
        var StyleID = table.row($(this).parents('tr')).data()["StyleID"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < List.length; f++) {
                if (List[f].BMasID == BMasID && List[f].StyleID == StyleID) {
                    List[f].CheckFabReq = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < List.length; f++) {
                if (List[f].BMasID == BMasID && List[f].StyleID == StyleID) {
                    List[f].CheckFabReq = 'N';

                }
            }
        }

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
    //$('#txtFromDate').val(datestring);
    $('#txtToDate').val(Fdatestring);

}


function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var CmpID = $('#ddlMCompany').val();
    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }
    

    // var BOrdID = $('#ddlMOrderNo').val();


    BOrdID = 0;
    $(List).each(function (i) {
        if (List[i].CheckFabReq == 'Y')
            BOrdID = BOrdID + "," + List[i].BMasID;
    });

    if (BOrdID == 0) {
        //alert('Please select atleast any one order...');
        var msg = 'Please select atleast any one order...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var styid = 0;

    $(List).each(function (i) {
        if (List[i].CheckFabReq == 'Y')
            styid = List[i].StyleID;
    });

    if ($('#ddlMOrderNo').val() == 0) {
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    var type = 'G';
    if ($('#summary').prop('checked') == true) {
        type = 'S';
    }
    var stock = 'G';
    if ($('#stock').prop('checked') == true) {
        stock = 'T';
    }

    var Itemchecked = true;
    var Colorchecked = true;
    var Sizechecked = true;

    var i = 0;
    var c = 0;
    var s = 0;
    $(":checkbox").each(function () {
        Itemchecked = $('#ChkItem').is(":checked");
        Colorchecked = $('#ChkColor').is(":checked");
        Sizechecked = $('#ChkSize').is(":checked");
    });
    if (Itemchecked == true) {
        Itemchecked = false;
    }
    else {
        Itemchecked = true;
    }
    if (Colorchecked == true) {
        Colorchecked = false;
    }
    else {
        Colorchecked = true;
    }
    if (Sizechecked == true) {
        Sizechecked = false;
    } else {
        Sizechecked = true;
    }
    if (Itemchecked == true && Colorchecked == true && Sizechecked == true) {
        Itemchecked = false;
        Colorchecked = false;
        Sizechecked = false;
    }


    window.open("../Reports/Planning/PlannDetailCostingReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BOrdID=" + BOrdID + "&Type=" + type + "&Styleid=" + styid + "&ItemGrp=" + Itemchecked + "&ColorGrp=" + Colorchecked + "&SizeGrp=" + Sizechecked + "&Stock=" + stock);
}

function LoadReport1() {
    debugger;
    //var FDate = $('#txtFromDate').val();
    //var TDate = $('#txtToDate').val();

    //if ($('#ddlMCompany').val().trim() == 0) {
    //    $('#ddlMCompany').css('border-color', 'Red');
    //    return true;
    //}
    //else {
    //    $('#ddlMCompany').css('border-color', 'lightgrey');
    //}

    //if ($('#ddlMOrderNo option:selected').val().trim() == 0) {
    //    $('#ddlMOrderNo').css('border-color', 'Red');
    //    return true;
    //}
    //else {
    //    $('#ddlMOrderNo').css('border-color', 'lightgrey');
    //}

    //var CmpID = $('#ddlMCompany').val();
    //var OrdNo = $('#ddlMOrderNo option:selected').text();
    //var type = 'G';
    //if ($('#summary').prop('checked') == true) {
    //    type ='S';
    //}


    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var CmpID = $('#ddlMCompany').val();
    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }


    // var BOrdID = $('#ddlMOrderNo').val();


    BOrdID = 0;
    $(List).each(function (i) {
        if (List[i].CheckFabReq == 'Y')
            BOrdID = BOrdID + "," + List[i].BMasID;
    });

    if (BOrdID == 0) {
        //alert('Please select atleast any one order...');
        var msg = 'Please select atleast any one order...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }

    var styid = 0;

    $(List).each(function (i) {
        if (List[i].CheckFabReq == 'Y')
            styid = List[i].StyleID;
    });

    if ($('#ddlMOrderNo').val() == 0) {
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid red');
        return true;
    }
    else {
        $('#ddlMOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    var type = 'G';
    if ($('#summary').prop('checked') == true) {
        type = 'S';
    }
    var stock = 'G';
    if ($('#stock').prop('checked') == true) {
        stock = 'T';
    }

    var Itemchecked = true;
    var Colorchecked = true;
    var Sizechecked = true;

    var i = 0;
    var c = 0;
    var s = 0;
    $(":checkbox").each(function () {
        Itemchecked = $('#ChkItem').is(":checked");
        Colorchecked = $('#ChkColor').is(":checked");
        Sizechecked = $('#ChkSize').is(":checked");
    });
    if (Itemchecked == true) {
        Itemchecked = false;
    }
    else {
        Itemchecked = true;
    }
    if (Colorchecked == true) {
        Colorchecked = false;
    }
    else {
        Colorchecked = true;
    }
    if (Sizechecked == true) {
        Sizechecked = false;
    } else {
        Sizechecked = true;
    }
    if (Itemchecked == true && Colorchecked == true && Sizechecked == true) {
        Itemchecked = false;
        Colorchecked = false;
        Sizechecked = false;
    }

    window.open("../Reports/Planning/PlanDetailcosting2/PlannDetailCostingReport2.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BOrdID=" + BOrdID + "&Type=" + type + "&Styleid=" + styid + "&ItemGrp=" + Itemchecked + "&ColorGrp=" + Colorchecked + "&SizeGrp=" + Sizechecked + "&Stock=" + stock);

    //window.open("../Reports/Planning/PlanDetailcosting2/PlannDetailCostingReport2.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&OrdNo=" + OrdNo + "&Type=" + type);
}


function LoadMain() {
    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
        MainList();
    }
}
function MainList() {
    debugger;
    var CompId = $('#ddlMCompany').val();
    var OrdNo = "";
    var ONo = $('select#ddlMOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo == "";
    }
    else {

        OrdNo = $('select#ddlMOrderNo option:selected').text();
    }

    var BuyrNo = "";
    var BNo = $('select#ddlMRefno option:selected').val();

    if (BNo == 0) {
        BuyrNo == "";
    }
    else {

        BuyrNo = $('select#ddlMRefno option:selected').text();
    }

    var WrkNo = "";
    var WNo = $('select#ddlMJobno option:selected').val();

    if (WNo == 0) {
        WrkNo == "";
    }
    else {

        WrkNo = $('select#ddlMJobno option:selected').text();
    }


    var Buyerid = $('#ddlMBuyer').val();
    var seasonid = $('#ddlMSeason').val();
    var itmgrpid = $('#ddlMItemGrp').val();
   

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var Styleid = $('#ddlMStyle').val();

    var ortype = $('input[name="proctype"]:checked').attr('value');
    var itmtype='FABRIC';

    $.ajax({
        url: "/PlanningConsumption/DetailCostingRpt",
        data: JSON.stringify({ compid: CompId, buyerid: Buyerid, seasonid: seasonid, itmgrpid: itmgrpid, ordno: OrdNo, styleid: Styleid, ordtype: ortype, refno: BuyrNo, wrkord: WrkNo, itmtype: itmtype, fromdate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json;
            for (var t = 0; t < json.length; t++) {
                json[t].Order_date = moment(json[t]["Order_date"]).format('DD/MM/YYYY')
            }
            List = obj;
            LoadMaintab(List);

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function LoadMaintab(list) {
    $('#tblmaindetails').DataTable().destroy();


    $('#tblmaindetails').DataTable({

        //"order": [[1, "asc"]],
        data: list,
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
             { title: "Buyer", data: "buyer" },
            { title: "Order No", data: "Order_No" },
            { title: "Ref No", data: "Ref_no" },
           
            { title: "Style", data: "Style" },
            { title: "StyleID", data: "StyleID", visible: false },
             { title: "BMasID", data: "BMasID" ,visible:false },
           
            {
                title: "Report", data: "BMasID",
                render: function (data) {

                    return '<input type="checkbox" id="chkrpt" class="editor-active chkrpt"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },

        ]
    });

}
//function myfunc(Val) {
//    debugger;
//    BOrdID = BOrdID + "," + Val;

//}