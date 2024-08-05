var JobOrdShipList = [];
var JobOrdItemList = [];
var JobNo = 0;
var Mid = 0;
var comp = [];
var compid = 0;
$(document).ready(function () {
    loadData();
    CheckRights("JobOrder");
});

function loadData() {

    $.ajax({
        type: "GET",
        url: '/JobOrder/ListDetails/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            debugger;
            var dataSet = eval("[" + tableload + "]");

            var refobj = [];
            $.each(dataSet, function (i) {
                var obj = {
                    JobOrderID: dataSet[i][0],
                    Companyid: dataSet[i][8]
                }
                refobj.push(obj);
            });
            comp = refobj;

            $('#tbljoborderdetails').DataTable({
                data: dataSet,
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
                         { title: "JobOrderID", "visible": false },
                         { title: "Order No" },
                         { title: "Buyer"},
                         { title: "Job Order No"},
                         { title: "Style Name"},
                         { title: "Ref No"},
                         { title: "Job Order Date"},
                         { title: "Quantity" },
                         { title: "compid", "visible": false },
                         { title: "Action" },
                         //{
                         //    title: "Action", "mDataProp": null,
                         //    "sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                         //    //"sDefaultContent": '<button type="button" class="btnshipedit"> Edit </button><button type="button" class="btnshipView"> View Item </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
                         //},
                ]
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getbyID(ID) {
    
    LoadCompanyUnitDDL("#ddlcompanyunit");
    LoadEmployeeDDL("#ddlmerch,#ddlqc,#ddlmanager");
    
    $('#txtsubcategory').val('');
    $('#txtcategory').val('');
    $('#txtimageupl').val('');
    $('#imgupload').attr('src', '');
    //var input = $("#imgupload");

    //function something_happens() {
    //    input.replaceWith(input.val('').clone(true));
    //};
    
    $('#myModal1').modal('show');

    $.ajax({
        url: "/JobOrder/GetJobOrder/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;

            debugger;
            if (obj != undefined && obj.length >0) {
                $('#txtjoborderno').val(obj[0]["JobOrderNo"]);
                $('#txtorderdate').val(moment(obj[0]["OrderDate"]).format('DD/MM/YYYY'));                                
                $('#txtissuedate').val(moment(obj[0]["Issuedate"]).format('DD/MM/YYYY'));
                $('#txtbuyer').val(obj[0]["Buyer"]);
                $('#txtorderno').val(obj[0]["OrderNo"]);
                $('#txtorderrefno').val(obj[0]["Job_Order_RefNo"]);
                $('#txtstyle').val(obj[0]["StyleName"]);
                $('#txtqty').val(obj[0]["ProductionQty"]);
                //$('#txtapproval').val(obj[0]["ToApprove"]);
                $('#ddlmanager').val(obj[0]["ManagerId"]);
                $('#ddlmerch').val(obj[0]["MerchandiserId"]);
                $('#ddlqc').val(obj[0]["QCId"]);
                $('#txtconsumption').val(obj[0]["Consumption"]);
                $('#ddlcompanyunit').val(obj[0]["CompanyUnitId"]);
                $('#txtrate').val(obj[0]["Rate"]);
                $('#txtcurrency').val(obj[0]["Currency"]);
                $('#txtstage').val(obj[0]["Stage"]);
                $('#txtexcessper').val(obj[0]["ExcessPer"]);
                $('#txtratedesc').val(obj[0]["RateDesc"]);
                $('#txtexcrate').val(obj[0]["Exchange"]);
                $('#txtmessage').val(obj[0]["CompanyUnitAddress"]);
                debugger;
                if (obj[0]["JobOrdType"] == "I") {                    
                    $("#chkitem").prop("checked", true)
                }
                else { $('#chkstyle').checked = true; }
                if (obj[0]["UnitorOther"] == "P") {                    
                    $('#optProduct').prop("checked", true)
                }
                else { $('#optsub').checked = true; }
       
              
                JobNo = obj[0]["JobOrderNo"];
                //alert(JobNo);
            }

            var param = {};
            param.Orderno = (obj.length>0? obj[0]["OrderNo"]:null);
            param.StyleId = (obj.length > 0 ? obj[0]["StyleId"] : 0);
            param.JobOrderNo = (obj.length > 0 ? obj[0]["JobOrderNo"] : 0);

           $.ajax({
               url: "/JobOrder/GetJobOrderShipmentList/",
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({ OrderNo: param.Orderno, StyleId: param.StyleId }),//{ "OrderNo": obj[0]["OrderNo"], "StyleId": obj[0]["StyleId"] },
                dataType: "json",
                success: function (result) {
                    debugger;
                    JobOrdShipList = result;
                    loadJobOrderShip(JobOrdShipList);

                    $.ajax({
                        url: "/JobOrder/GetJobOrderItemList/",
                        type: "POST",
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify({ JobOrderNo: JobNo }),//{ "OrderNo": obj[0]["OrderNo"], "StyleId": obj[0]["StyleId"] },
                        dataType: "json",
                        success: function (result) {
                            debugger;
                            JobOrdItemList = result;
                            loadJobOrderItem(JobOrdItemList);                            
                        }
                    });
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
             });

            //$.ajax({
            //    url: "/JobOrder/GetJobOrderShipmentList",
            //    data: JSON.stringify({ ONo: OrderNo, StyId: StyleId }),
            //    type: "POST",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    success: function (result) {

            //        //LoadCompFabricDetails(result);
            //    },
            //    failure: function (errMsg) {
            //        alert(errMsg);
            //    }
            //});
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadJobOrderShip(JobOrderShip) {
    $('#tblshipmentdetails').DataTable().destroy();
    debugger;
    $('#tblshipmentdetails').DataTable({
        data: JobOrderShip,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
            { title: "ID", data: "shiprowid", "visible": false },
            { title: "Buy Order Ship", data: "buyordship" },
            //{ title: "Shipment Date", data: "shipdate" },
             {
                 title: "Shipment Date", data: "shipdate",
                 //render: function (data) {
                 //    //return (moment(data).format("DD/MM/YYYY"));
                 //    return (moment(new Date()).format('YYYY/MM/DD'));
                 //}
                 render: function (data, type, row) {
                     return (moment(data).format("DD/MM/YYYY"));
                 }
             },
            { title: "Country", data: "Country" },
            { title: "Order Qty", data: "Ordqty" },
            { title: "Job Qty", data: "jobqty" },
            //{ title: "Delivery Date", data: "deliverydate" },

             {
                 title: "Delivery Date", data: "deliverydate",
                 //render: function (data) {
                 //    //return (moment(data).format("DD/MM/YYYY"));
                 //    return (moment(new Date()).format('YYYY/MM/DD'));
                 //}
                 render: function (data, type, row) {
                     return (moment(data).format("DD/MM/YYYY"));
                 }
             },
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" class="btnitemedit btn btn_round btn-warning" data-toggle="tooltip" data-placement="top" title="Edit"  style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class=\"fa fa-pencil-square-o\"></i>  </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
               }
        ]
    });
}

function loadJobOrderItem(JobOrderItem) {
    $('#tblItemdetails').DataTable().destroy();
    debugger;
    $('#tblItemdetails').DataTable({
        data: JobOrderItem,
        scrollY: 100,
        scrollCollapse: true,
        paging: false,
        fixedColumns: false,
        select: false,
        scrollX: "100%",
        scrollXInner: "100%",
        scroller: false,
        "bSort": false,
        columns: [
            { title: "Job Ord No", data: "JobOrderNo" },
            { title: "Buy Ord Ship", data: "BuyOrdShip" },
            { title: "Job QTY", data: "JobQuantity" },            
             {
                 title: "Del.Date", data: "DeliveryDate",
                 //render: function (data) {
                 //    //return (moment(data).format("DD/MM/YYYY"));
                 //    return (moment(new Date()).format('YYYY/MM/DD'));
                 //}
                 render: function (data, type, row) {
                     return (moment(data).format("DD/MM/YYYY"));
                 }
             },
            { title: "Item", data: "Item" },
            { title: "Color", data: "Color" },
            { title: "Size", data: "Size" },
            { title: "QTY", data: "JQuantity" },
            { title: "Job Ord QTY", data: "ActualJobQuantity" },
            { title: "Rate", data: "Rate" },            
               {
                   title: "ACTION", "mDataProp": null,
                   //"sDefaultContent": '<button type="button" class="btnedit"> Edit </button> <a id=" 1 " onclick="return DeleteChild(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="1"><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>'
                   "sDefaultContent": '<button type="button" class="btnitemedit btn btn_round btn-warning" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;">  <i class=\"fa fa-pencil-square-o\"></i>  </button>'//<button type="button" class="btnremove"> Remove </button><i class="fa fa-trash-o" style="cursor: pointer;"></i></a>
               }
        ]
    });
}


function Job_ord_Print(Id) {
    debugger;
    var cnt = 0;
    $.each(comp, function (i) {
        if (comp[i].JobOrderID == Id && cnt ==0) {
            compid = comp[i].Companyid;
            cnt++;
        }

    })

    var Mod = 1;
    $('#myModal5').show();
    $('#myModal5').modal('show');
    $('#selectall').val("");
    GenerateReportItem();

    Mid = Id;
    //$('#myModal3').modal('show');
    //var src = '../Reports/WorkOrderInlineReport.aspx?';
    //src = src + "JobOrderID=" + Id
   // window.open("../Reports/WorkOrderInlineReport.aspx?JobOrderID=" + Id);
}

function GenerateReportItem() {
    debugger;
    name = "JOB ORDER"
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
            $("#sbTwo").empty();
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
  
    var MOrd = 0;

    var arr = [];
    var nam = [];
    var tet = [];
    $('#sbTwo :selected').each(function (i, sel) {
       
        MOrd = MOrd + "," + $(sel).val();
        arr.push($(sel).val());
        nam.push($(sel).text());
      
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
   // var compid = compid;
    window.open("../Reports/WorkOrderInlineReport.aspx?JobOrderID=" + Mid + "&Multiopt=" + MOrd + "&Yarn=" + p[0] + "&Fabric=" + p[1] + "&Accessories=" + p[2] + "&PackingMaterial=" + p[3] + "&MeasurementChart=" + p[4] + "&OrderInstructions=" + p[5] + "&Assortment=" + p[6] + "&ComboDetails=" + p[7] + "&StyleRate=" + p[8] + "&JobRate=" + p[9] + "&BuyerRefNo=" + p[10] + "&ShowShipNo=" + p[11] + "&ShowShipDate=" + p[12] + "&ShowShipDestination=" + p[13] + "&ShowStyleImage=" + p[14] + "&ShowItemDetails=" + p[15] + "&BOMSummary=" + p[16] + "&Approval=" + p[17] + "&Swatch=" + p[18] + "&Companyid=" + compid);//+ "&MultiOptionid=" + MOrd;

}
function backtomain() {

    $("#myModal5").hide();
    $("#myModal5").modal('hide');
}