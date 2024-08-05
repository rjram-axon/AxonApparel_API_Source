var LAddItemList = [];

$(document).ready(function () {
    debugger;

    LoadAddLotGridDetails();
    LoadSupLotAddDetails();
    LoadCompEntryNoAddDetails();
    LoadCompLotAddDetails();
    LoadProcessDDL("#ddlAProcess");
});

function LoadAddLotGridDetails() {
    debugger;

    var CompId = $('#ddlACompany').val();
    var SupId = $('#ddlASupplier').val();
   // var TranNo = $("#ddlATransNo option:selected").text();//$('#ddlATransNo').val();
    var ProceId = $('#ddlAProcess').val();


    var TOrdNo = "";
    var TONo = $('select#ddlATransNo option:selected').val();

    if (TONo == 0) {
        TOrdNo == "";
    }
    else {

        TOrdNo = $('select#ddlATransNo option:selected').text();
    }


    var OType = $('input[name="AOType"]:checked').attr('value');
    var SType = $('input[name="ASType"]:checked').attr('value');


    $.ajax({
        url: "/LotsplitupAdd/GetAddLotdetails",
        data: JSON.stringify({ OrderType: OType, StockType: SType, SupplierId: SupId, Companyid: CompId, TransNo: TOrdNo, ProcessId: ProceId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            LAddItemList = result;
            loadLAddItemTable(LAddItemList);

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function loadLAddItemTable(LAddItemList) {
    debugger;
    $('#tblLotAddItemdetails').DataTable().destroy();

    $('#tblLotAddItemdetails').DataTable({

        data: LAddItemList,

        columns: [


            { title: "Trans No", data: "TransNo" },
            {
                title: "Trans Date", data: "EntryDate",
                render: function (data) {
                    return (moment(data).format("DD/MM/YYYY"));
                }
            },
            { title: "Supplier", data: "Supplier" },
              { title: "Stock Qty", data: "Quantity" },

            {
                title: "Split", data: "TransNo",
                render: function (data) {

                    return '<button type="button" id="txtExRate" data-toggle="tooltip" data-placement="top" title="Add" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="editor-active btn btn-round btn-success"  style="width: 50px;text-align: center;"  value=' + data + ' onclick="LoadLotEntry(this.value);"><i class="fa fa-plus"></i></button>';


                },
            },
        ]
    });
}
function LoadSupLotAddDetails() {

    var OType = $('input[name="AOType"]:checked').attr('value');
    var SType = $('input[name="ASType"]:checked').attr('value');


    $.ajax({
        url: "/LotsplitupAdd/GetSuppNo",
        data: JSON.stringify({ OrderType: OType, StockType: SType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;         
   
                $(ddlASupplier).empty();
                $(ddlASupplier).append($('<option/>').val('0').text('--Select Supplier--'));
                $.each(data, function () {
                    $(ddlASupplier).append($('<option></option>').val(this.SupplierId).text(this.Supplier));
                });
               
            }
        }

    });
}



function LoadCompLotAddDetails() {

    var OType = $('input[name="AOType"]:checked').attr('value');
    var SType = $('input[name="ASType"]:checked').attr('value');


    $.ajax({
        url: "/LotsplitupAdd/GetCompNo",
        data: JSON.stringify({ OrderType: OType, StockType: SType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
                //Comp
                $(ddlACompany).empty();
             
                $(ddlACompany).append($('<option/>').val('0').text('--Select Company--'));
                $.each(data, function () {
                    $(ddlACompany).append($('<option></option>').val(this.Companyid).text(this.Company));
                });
             
            }
        }

    });
}
function LoadCompEntryNoAddDetails() {

    var OType = $('input[name="AOType"]:checked').attr('value');
    var SType = $('input[name="ASType"]:checked').attr('value');


    $.ajax({
        url: "/LotsplitupAdd/GetTransNo",
        data: JSON.stringify({ OrderType: OType, StockType: SType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;
           
                //TransNo

                $(ddlATransNo).empty();
                $(ddlATransNo).append($('<option/>').val('0').text('--Select TransNo--'));
                $.each(data, function () {
                    $(ddlATransNo).append($('<option></option>').val(this.Companyid).text(this.TransNo));
                });
             
            }
        }

    });
}
function RadioAOClick() {
    $('#tblLotAddItemdetails').DataTable().destroy();
    LoadAddLotGridDetails();
    LoadSupLotAddDetails();
    LoadCompEntryNoAddDetails();
    LoadCompLotAddDetails();
}
function RadioASClick() {
    $('#tblLotAddItemdetails').DataTable().destroy();
    LoadAddLotGridDetails();
    LoadSupLotAddDetails();
    LoadCompEntryNoAddDetails();
    LoadCompLotAddDetails();
}

function LoadLotEntry(TransNo) {
    var Mode = 0;
    window.location.href = "/LotsplitupEntry/LotsplitupEntryIndex?TransNo=" + TransNo + "=&Mode=" + Mode;
}
function LoadLotAddComp() {
    LoadAddLotGridDetails();
}
function LoadLotAddSupp() {
    LoadAddLotGridDetails();
}
function LoadLotAddTransNo() {
    LoadAddLotGridDetails();
}