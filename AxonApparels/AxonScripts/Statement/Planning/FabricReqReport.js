var MainFDate = 0;
var BOrdID = 0;
var StyID = 0;
var List = [];
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany");
    LoadCompanyUnitDDL("#ddlMUnit");
    LoadSupplierDDL("#ddlMSupplier");
    LoadBuyerDDL("#ddlMBuyer");
    LoadEmployeeDDL("#ddlMerchandise,#ddlMerchan");
    LoadOrderNoDDL("#ddlMOrderNo");
    LoadItemGroupDDL("#ddlMItemGroup");
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");

    getDate();


    $(document).on('click', '.chkrpt', function () {
        debugger;

        var table = $('#tblmaindetails').DataTable();
        var BMasID = table.row($(this).parents('tr')).data()["BMasID"];
        var StyID = table.row($(this).parents('tr')).data()["StyleID"];

        var val = $(this).is(":checked");
        if (val == true) {
            for (var f = 0; f < List.length; f++) {
                if (List[f].StyleID == StyID && List[f].BMasID == BMasID) {
                    List[f].CheckFabReq = 'Y';

                }
            }
        }
        else {
            for (var f = 0; f < List.length; f++) {
                if (List[f].StyleID == StyID && List[f].BMasID == BMasID) {
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
    $('#txtToDate').val(Fdatestring);

}


function LoadReport() {
    debugger;
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    //var SuppID = $('#ddlMSupplier').val();

    if ($('#ddlMCompany').val().trim() == 0) {
        $('#ddlMCompany').css('border-color', 'Red');
        return true;
    }
    else {
        $('#ddlMCompany').css('border-color', 'lightgrey');
    }
    var CmpID = $('#ddlMCompany').val();


    StyID = 0;
    $(List).each(function (i) {
        if (List[i].CheckFabReq == 'Y')
            StyID = StyID + "," + List[i].StyleID;
    });

    BmID = 0;
    $(List).each(function (i) {
        if (List[i].CheckFabReq == 'Y')
            BmID = BmID + "," + List[i].BMasID;
    });

    if (StyID == 0) {
        //alert('Please select atleast any one order...'); 
        var msg = 'Please select atleast any one order...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var yarn = 0;
    if ($('#yarn').prop('checked') == true) {
        yarn = 1;
    }

    window.open("../Reports/Planning/FabricRequirementReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BOrdID=" + BmID + "&StyleID=" + StyID + "&Yarn=" + yarn);
    //?CompanyID=" + CmpID + "&SupplierID=" + SuppID + "&BuyerID=" + BuyID + "&ColorID=" + ClrID + "&OrderNo=" + OrdNo + "&StyleID=" + StyID + "&FromDate=" + FDate + "&ToDate=" + TDate;
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


    var Buyerid = $('#ddlMBuyer').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var Styleid = $('#ddlMStyle').val();

   

    $.ajax({
        url: "/PlanningConsumption/FabRequirementRpt",
        data: JSON.stringify({ compid: CompId, buyerid: Buyerid, ordno: OrdNo, styleid: Styleid, fromdate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json;
            for (var t = 0; t < json.length;t++){
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
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        

        columns: [
           
            { title: "Order No", data: "Order_No" },
            { title: "Ref No", data: "Ref_no" },
            { title: "Date", data: "Order_date" },
            { title: "Style", data: "Style" },
            { title: "Buyer", data: "buyer" },
            { title: "Quantity", data: "Quantity" },
             { title: "BMasID", data: "BMasID" },
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