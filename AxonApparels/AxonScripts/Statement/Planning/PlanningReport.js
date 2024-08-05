var MainFDate = 0;
var BOrdID = 0;
var itemtype = '';
var prctype = '';
var MProc = 0;
$(document).ready(function () {

    MainFDate = $("#hdMainFromDate").data('value');
    LoadCompanyDDL("#ddlMCompany"); 
    LoadBuyerDDL("#ddlMBuyer"); 
    LoadStyleDDL("#ddlMStyle");
    LoadColorDDL("#ddlMColor");
    LoadItemDDL("#ddlMItem,#ddlMItem1");
    LoadSizeDDL("#ddlMSize");
    LoadBuyRefNoDDL("#ddlMBuyerRef");
    LoadProcessDDL("#ddlM");
    getDate();

    $(document).on('click', 'input[name="bomtype"]', function (e) {
        myfunctype();
    });

    $(document).on('click', 'input[name="Prctype"]', function (e) {
        myPrcfunctype();
    });


    $('#Trims').prop('checked',true);
    $('#Yarn').prop('checked',true);
    //$('#Proc').prop('checked',true);
    //$('#Prod').prop('checked',true);


});

function loadProc(Val) {
    debugger;
    var foo = [];
    MProc = 0;
    $('#ddlM :selected').each(function (i, selected) {
        foo[i] = $(selected).val();
        MProc = MProc + "," + foo[i];
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
    if (BOrdID == 0) {
        //alert('Please select atleast any one order...');
        var msg = 'Please select atleast any one order...';
        var flg = 4;
        var mod = 1;
        var ur = "";
        AlartMessage(msg, flg, mod, ur);
        return true;
    }
    var Itemtype = itemtype;

    var trims = 'N';
    if ($('#Trims').prop('checked') == true) {
        trims = 'Y';
    }
    var yarn = 'N';
    if ($('#Yarn').prop('checked') == true) {
        yarn = 'Y';
    }
    var process = 'N';
    if ($('#Proc').prop('checked') == true) {
        process = 'Y';
    }
    var Production = 'N';
    if ($('#Prod').prop('checked') == true) {
        Production = 'Y';
    }


    window.open("../Reports/Planning/PlanningReport.aspx?fdate=" + FDate + "&tdate=" + TDate + "&Compid=" + CmpID + "&BOrdID=" + BOrdID + "&itmtype=" + Itemtype + "&prctype=" + prctype + "&processid=" + MProc + "&trims=" + trims + "&yarn=" + yarn + "&process=" + process + "&Production=" + Production);
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
    var BuyrNo = "";
    var BNo = $('select#ddlMBuyerRef option:selected').val();

    if (BNo == 0) {
        BuyrNo == "";
    }
    else {

        BuyrNo = $('select#ddlMBuyerRef option:selected').text();
    }


    var Buyerid = $('#ddlMBuyer').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();
    var Styleid = $('#ddlMStyle').val();
    var ortype = $('input[name="ordtype"]:checked').attr('value');
    var itmtype = '';
    var dttyp = $('input[name="Dttype"]:checked').attr('value');
    $.ajax({
        url: "/PlanningConsumption/PlanningRpt",
        data: JSON.stringify({ compid: CompId, buyerid: Buyerid, ordno: OrdNo, styleid: Styleid, ordtype: ortype, buyrefno: BuyrNo, itmtype: itmtype , DtType: dttyp, fromdate: FDate, todate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger;
            var obj = json;
            for (var t = 0; t < json.length; t++) {
                json[t].Order_date = moment(json[t]["Order_date"]).format('DD/MM/YYYY')
            }
            LoadMaintab(obj);

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
             { title: "Style", data: "Style" },
            { title: "Date", data: "Order_date" },
           
            { title: "Buyer", data: "buyer" },
         
            {
                title: "Report", data: "StyleRowid",
                render: function (data) {

                    return '<input type="checkbox" id="chkrpt" class="editor-active chkrpt"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

                },
            },

        ]
    });

}
function myfunc(Val) {
    debugger;
    BOrdID = BOrdID + "," + Val;

}

function myfunctype() {
    debugger;
    itemtype = '';
    //$('input[name="bomtype"]').find('checkbox').each(function () {
        if ($('#yarn').prop('checked') == true) {
            itemtype = itemtype + "," + $('input[id="yarn"]:checked').attr('value');
        }
        if ($('#fab').prop('checked') == true) {
            itemtype = itemtype + "," + $('input[id="fab"]:checked').attr('value');
        }
        if ($('#acces').prop('checked') == true) {
            itemtype = itemtype + "," + $('input[id="acces"]:checked').attr('value');
        }
        if ($('#pack').prop('checked') == true) {
            itemtype = itemtype + "," + $('input[id="pack"]:checked').attr('value');
        }
    //});

 

}

function myPrcfunctype() {
    debugger;
    prctype = '';
    //$('input[name="bomtype"]').find('checkbox').each(function () {
    if ($('#OPTYK').prop('checked') == true) {
        prctype = prctype + "," + $('input[id="OPTYK"]:checked').attr('value');
    }
    if ($('#OPTKK').prop('checked') == true) {
        prctype = prctype + "," + $('input[id="OPTKK"]:checked').attr('value');
    }
    if ($('#OPTDK').prop('checked') == true) {
        prctype = prctype + "," + $('input[id="OPTDK"]:checked').attr('value');
    }
    if ($('#OPTGN').prop('checked') == true) {
        prctype = prctype + "," + $('input[id="OPTGN"]:checked').attr('value');
    }
    //});



}

function CMainAllClick() {

    var dttyp = $('input[name="proctype"]:checked').attr('value');

    if (dttyp == "AP") {

 
        $("#ddlM").prop("disabled", true);

    } else {
   
        $("#ddlM").prop("disabled", false);
        LoadProcessDDL("#ddlM");
    }
}