var entrygriddet = [];
var SkuNo = 0;
var UserName = 0;
var MainFDate = 0;
var Guserid = 0;
var DCompid = 0;
var OpItmList = [];
var IpItmList = [];
var GBoxDesId = 0;

$(document).ready(function () {
    debugger;
    DCompid = $("#hdnDCompid").data('value');
    superuser = $("#hdnusername").data('value');
    Guserid = $("#hdnUserid").data('value');
    UserName = $("#hdnusername").data('value');
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");
    MainFDate = $("#hdMainFromDate").data('value');
    ChkBudProApp = $("#hdnCostBudProcessAppid").data('value');
    getDate();
    ddlmain();
    
    $("#entrygridtab").dataTable().find("tbody").on('click', 'td', function () {
        debugger;
        $('input[id=groupbom]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].StockReqDetID == val) {
                        entrygriddet[d].CheckLoad = "Y";
                    }
                }

            }
            else {
                var val = $(this).val();
                for (var d = 0; d < entrygriddet.length; d++) {
                    if (entrygriddet[d].StockReqDetID == val) {
                        entrygriddet[d].CheckLoad = "N";
                    }

                }
            }

        });

    });

    $('#inputitmtab').on('click', 'tr', function (e) {
        debugger;

        var table = $('#inputitmtab').DataTable();
        var row = $(this).closest('tr');
        var data = $('#inputitmtab').dataTable().fnGetData(row);
        var oplist = [];
        var SKUstkno = data.SKUstkno;

        for (var i = 0; i < OpItmList.length; i++) {
            if (OpItmList[i].skuno == SKUstkno) {

                oplist.push(OpItmList[i]);

            }
        }
        OutputitmTab(oplist);

    });

    $(document).on('keyup', '.calcipAmt', function () {
        debugger;
        var table = $('#outputitmtab').DataTable();

        var opTransno = table.row($(this).parents('tr')).data()["Transno"];
        var transdate = table.row($(this).parents('tr')).data()["transdate"];
        var qty = table.row($(this).parents('tr')).data()["qty"];
        var IssueQty = table.row($(this).parents('tr')).data()["IssueQty"];
        var opskuno = table.row($(this).parents('tr')).data()["skuno"];
        var companyid = table.row($(this).parents('tr')).data()["companyid"];
        var company = table.row($(this).parents('tr')).data()["company"];
        var opStockId = table.row($(this).parents('tr')).data()["StockId"];
        IssueQty = 0;
        var Val = $(this).val();
        totalissueQty = 0;
        if (Val == "" || Val == 0) {
            Val = 0;
            for (var i = 0; i < OpItmList.length; i++) {
                if (OpItmList[i].StockId == opStockId) {
                    var preqty = OpItmList[i].IssueQty;
                }
            }
        }
        var IssQty = parseInt(Val);
        if (Val > qty) {
            //alert('Issue Qty should not exceed Qty...');
            var msg = 'Issue quantity should not exceed quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            $(this, '#txtipIssuQty').val(0);
            for (var i = 0; i < OpItmList.length; i++) {
                if (OpItmList[i].StockId == opStockId) {
                    var preqty = OpItmList[i].IssueQty;
                }
            }
            for (var i = 0; i < IpItmList.length; i++) {
                if (IpItmList[i].SKUstkno == opskuno) {

                    IpItmList[i].IssuQuantity = IpItmList[i].IssuQuantity - preqty;
                    IpItmList = IpItmList;

                }
            }
            for (var i = 0; i < OpItmList.length; i++) {
                if (OpItmList[i].StockId == opStockId) {
                    OpItmList[i].IssueQty = 0;
                    OpItmList = OpItmList;

                }
            }
            InputitmTab(IpItmList);
            return false;
        }
        for (var i = 0; i < OpItmList.length; i++) {
            if (OpItmList[i].StockId == opStockId) {
                OpItmList[i].IssueQty = IssQty;
                OpItmList = OpItmList;

            }
        }
        for (var i = 0; i < IpItmList.length; i++) {
            if (IpItmList[i].SKUstkno == opskuno) {
                totalissueQty = IpItmList[i].IssuQuantity + IssQty;
                totalissueQty = IssQty;
                if (totalissueQty <= IpItmList[i].BalQuantity) {
                    if (IssQty > 0) {
                        var totqty = 0;
                        for (var j = 0; j < OpItmList.length; j++) {
                            if (OpItmList[j].skuno == opskuno) {
                                totqty = totqty + OpItmList[j].IssueQty;
                                // OpItmList = OpItmList;
                            }
                        }


                        //IpItmList[i].IssuQuantity = IpItmList[i].IssuQuantity + IssQty;
                        IpItmList[i].IssuQuantity = totqty;
                        IpItmList = IpItmList;
                    }
                    else {
                        if (IpItmList[i].IssuQuantity > 0) {
                            IpItmList[i].IssuQuantity = IpItmList[i].IssuQuantity - preqty;
                            IpItmList = IpItmList;
                        }
                    }
                }
                else {
                    //alert('Issue Qty should not exceed BalQty...');
                    var msg = 'Issue quantity should not exceed Balance quantity...';
                    var flg = 4;
                    var mod = 1;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);
                    $(this, '#txtipIssuQty').val(0);

                    for (var i = 0; i < OpItmList.length; i++) {
                        if (OpItmList[i].StockId == opStockId) {
                            OpItmList[i].IssueQty = 0;
                            OpItmList = OpItmList;

                        }
                    }

                    for (var i = 0; i < IpItmList.length; i++) {
                        if (IpItmList[i].SKUstkno == opskuno) {
                            var preqty = IpItmList[i].IssuQuantity;
                            if (IpItmList[i].IssuQuantity > 0) {
                                IpItmList[i].IssuQuantity = IpItmList[i].IssuQuantity - preqty;
                                IpItmList = IpItmList;
                                InputitmTab(IpItmList);
                            }
                        }
                    }
                    return false;
                }
            }

        }

        InputitmTab(IpItmList);
        //OutputitmTab(OpItmList);

    });

});


    function ClearTextbox() {
        debugger;
        LoadCompanyUnitDDL("#ddlUnit");
        $('#ddlSkuno').val("0");
        $('#ddlReqstno').val("0");
        GenerateNumber(DCompid);
        LoadSKUNo();
        LoadReqstNo();
       
       
        Loadgridddl();
       
    }



    function Loadgrid() {
        debugger;

        var Reqstnoid = "";
        var Reqstnoid = $('select#ddlSkuno option:selected').val();

        if (Reqstnoid == 0 || Entrynoid == undefined) {
            Reqstnoid == "";
        }
        else {

            Reqstnoid = $('select#ddlSkuno option:selected').val();
        }

        var Entrynoid = "";
        var Entrynoid = $('select#ddlReqstno option:selected').val();

        if (Entrynoid == 0 || Entrynoid == undefined) {
            Entrynoid == "";
        }
        else {

            Entrynoid = $('select#ddlReqstno option:selected').val();
        }

        $.ajax({
            url: "/StockRequest/Loadgrid",
            data: JSON.stringify({ Reqstno: Reqstnoid, Entryno: Entrynoid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                entrygriddet = result.Value;
                LoadEntrytab(entrygriddet);


            }

        });
    }

    function ddlmain() {


        var CompId = $('#ddlMCompany').val();
        if (CompId == null || CompId == "0") {
            CompId = 0;
        }

        var Despatchid = "";
        var Despatchid = $('select#ddlDespatchNo option:selected').val();

        if (Despatchid == 0 || Despatchid == undefined) {
            Despatchid == "";
        }
        else {

            Despatchid = $('select#ddlDespatchNo option:selected').val();
        }
        var fromdate = $('#txtFromDate').val();
        var Todate = $('#txtToDate').val();
        var BoxDesId = 0;


        $.ajax({
            url: "/StockRequest/LoadMaingriddet",
            data: JSON.stringify({ Companyid: CompId, DespatchId: BoxDesId, Despfromdate: fromdate, DespTodate: Todate }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;

                var Obj = json.Value;
                if (json.Status == 'SUCCESS') {
                  
                    var compdet = {};
                    var comp = [];
                    var desdet = {};
                    var des = [];

                    $.each(Obj, function (i, el) {

                        if (!compdet[el.Companyid]) {
                            compdet[el.Companyid] = true;
                            comp.push(el);
                        }

                        if (!desdet[el.DespatchId]) {
                            desdet[el.DespatchId] = true;
                            des.push(el);
                        }
                    });

                    $(ddlMCompany).empty();
                    $(ddlDespatchNo).empty();

                    $(ddlMCompany).append($('<option/>').val('0').text('--Select Company--'));
                    $.each(comp, function () {
                        $(ddlMCompany).append($('<option></option>').val(this.Companyid).text(this.Company));
                    });

                    $(ddlDespatchNo).append($('<option/>').val('0').text('--Select Despatch No--'));
                    $.each(des, function () {
                        $(ddlDespatchNo).append($('<option></option>').val(this.DespatchId).text(this.DespatchNo));
                    });

                    LoadMaingrid();
                }
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadMaingrid() {
        debugger;

        var Companyid = "";
        var Companyid = $('select#ddlMCompany option:selected').val();

        if (Companyid == 0 || Companyid == undefined) {
            Companyid == "";
        }
        else {

            Companyid = $('select#ddlMCompany option:selected').val();
        }

        var Despatchid = "";
        var Despatchid = $('select#ddlDespatchNo option:selected').val();

        if (Despatchid == 0 || Despatchid == undefined) {
            Despatchid == "";
        }
        else {

            Despatchid = $('select#ddlDespatchNo option:selected').val();
        }
        
        var fromdate = $('#txtFromDate').val();
        var Todate = $('#txtToDate').val();

        $.ajax({
            url: "/StockRequest/LoadMaingrid",
            data: JSON.stringify({ Companyid: Companyid, DespatchId: Despatchid, Despfromdate: fromdate, DespTodate: Todate }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
               

                var tableload = json.data
                var dataSet = eval("[" + tableload + "]");
                $('#tblmaindetails').DataTable({
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
                             { title: "DespatchId", "visible": false },
                             { title: "Company",  },                             
                             { title: "DespatchNo" },
                             { title: "DespatchDate" },
                             { title: "Action" }
                    ]

                });

                var table = $('#tblmaindetails').DataTable();
                $("#tblmaindetails tr").click(function () {
                    var selected = $(this).hasClass("selected");
                    $("#tblmaindetails tr").removeClass("selected");
                    if (!selected)
                        $(this).addClass("selected");
                });

            },

            failure: function (errMsg) {
                alert(errMsg);
            }

        });
    }

    function Loadgridddl() {
        debugger;
        var Reqstnoid = $('select#ddlSkuno option:selected').val();
        if (Reqstnoid == null || Reqstnoid == "0") {
            Reqstnoid = 0;
        }
        var Entrynoid = $('select#ddlReqstno option:selected').val();
        if (Entrynoid == null || Entrynoid == "0") {
            Entrynoid = 0;
        }
        $.ajax({
            url: "/StockRequest/Loadgrid",
            data: JSON.stringify({ Reqstno: Reqstnoid, Entryno: Entrynoid }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                entrygriddet = result.Value;
                LoadEntrytab(entrygriddet);

                if (result.Status == 'SUCCESS') {

                    var data = result.Value;
                    var compdet = {};
                    var comp = [];

                    $.each(data, function (i, el) {
                        if (!compdet[el.cmpid]) {
                            compdet[el.cmpid] = true;
                            comp.push(el);
                        }                      
                    });
                }
            }
        });
    }

    function LoadEntrytab(list) {
        $('#entrygridtab').DataTable().destroy();

        $('#entrygridtab').DataTable({
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
                       { title: "Request No", data: "EntryNo" },
                       //{ title: "Request Date", data: "EntryDate" },

                       {
                           title: "Request Date", data: "EntryDate",
                           render: function (data, type, row) {
                               return (moment(data).format("DD/MM/YYYY"));
                           }
                       },

                       { title: "Stock No", data: "SKUstkno" },
                       { title: "Quantity", data: "Quantity" },

                       {
                           title: "Group", data: "StockReqDetID",
                           render: function (data, type, row) {

                               return '<input type="checkbox" id="groupbom" class="groupbom editor-active" unchecked  value=' + data + ' >';

                           }
                       }
            ]

        });
    }

    
    function LoadSKUNo() {

        debugger;
        $.ajax({
            url: "/StockRequest/GetSknDetails",
            data: JSON.stringify({}),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;


                var obj = json.Value;
                if (json.Status == 'SUCCESS') {

                    var data = json.Value;

                    var skndet = {};
                    var skn = [];

                    $.each(obj, function (i, el) {

                        if (!skndet[el.StockReqDetID]) {
                            skndet[el.StockReqDetID] = true;
                            skn.push(el);
                        }
                    });

                    $(ddlSkuno).empty();


                    $(ddlSkuno).append($('<option/>').val('0').text('--Select Sku No--'));
                    $.each(skn, function () {
                        $(ddlSkuno).append($('<option></option>').val(this.StockReqDetID).text(this.SKUstkno));
                    });
                }
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadReqstNo() {

        debugger;
        $.ajax({
            url: "/StockRequest/GetReqstDetails",
            data: JSON.stringify({}),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;
                var obj = json.Value;
                if (json.Status == 'SUCCESS') {

                    var data = json.Value;

                    var skndet = {};
                    var skn = [];

                    $.each(obj, function (i, el) {

                        if (!skndet[el.StockReqMasID]) {
                            skndet[el.StockReqMasID] = true;
                            skn.push(el);
                        }
                    });

                    $(ddlReqstno).empty();
                    $(ddlReqstno).append($('<option/>').val('0').text('--Select Reqst No--'));
                    $.each(skn, function () {
                        $(ddlReqstno).append($('<option></option>').val(this.StockReqMasID).text(this.EntryNo));
                    });
                }
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadData() {
        debugger;
        var list = [];

        for (var j = 0; j < entrygriddet.length; j++) {
            if (entrygriddet[j].CheckLoad == "Y") {

                SkuNo = SkuNo + "," + entrygriddet[j].SKUstkno;

                list.push(entrygriddet[j]);
            }
        }
        if (list.length == 0) {
            //alert('Please select checkboxes for any one row..');
            var msg = 'Please select checkboxes for any one row...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        debugger;
        Loadgriddet();
        CompanyId = $('select#ddlCompany option:selected').val();
        if (CompanyId == 0) {
            //alert('Please select any company...');
            var msg = 'Please select any company...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
      
        var Comp = $('select#ddlCompany option:selected').text();

        $('#txtCompany').val(Comp);

        OpItmList = [];      
        IpItmList = [];
      
        $('#myModal').modal('hide');
        $('#myModal1').modal('show');

        $('#btnUpdate').hide();
        $('#btnDel').hide();
        $('#btnAdd').show();

    }

    function Loadgriddet() {
        debugger;
        $.ajax({
            url: "/StockRequest/LoadQntygrid",
            data: JSON.stringify({ SkuNo: SkuNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var List2 = [];
                List2 = result.Value;
                debugger;
                IpItmList = List2;
                InputitmTab(IpItmList);
                LoadgridItmstock();
            }
        });
    }

    function LoadgridItmstock() {
        debugger;
        $.ajax({
            url: "/StockRequest/LoadgridItmstock",
            data: JSON.stringify({ SkuNo: SkuNo }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var List2 = [];
                List2 = result.Value;
                debugger;
                OpItmList = List2;
                OutputitmTab(OpItmList);
            }
        });
    }


    function InputitmTab(list) {
        debugger;
        $('#inputitmtab').DataTable().destroy();
        $('#inputitmtab').DataTable({
            data: list,
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
                       { title: "Request No", data: "EntryNo" },
                       { title: "Stock No", data: "SKUstkno" },
                       { title: "Color", data: "Color" },
                       { title: "Size", data: "Size" },
                       { title: "UOM", data: "uom" },
                       { title: "Qty", data: "Quantity" },
                       { title: "Bal.Qty", data: "BalQuantity", },
                       { title: "Issue Qty", data: "IssuQuantity", },
            ]

        });

        var table = $('#inputitmtab').DataTable();
        $("#inputitmtab tr").click(function () {
            var selected = $(this).hasClass("selected");
            $("#inputitmtab tr").removeClass("selected");
            if (!selected)
                $(this).addClass("selected");
        });

    }

    function OutputitmTab(list) {
        debugger;
        $('#outputitmtab').DataTable().destroy();
        $('#outputitmtab').DataTable({
            data: list,
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
                       { title: "Transaction No", data: "Transno" },
                       {
                           title: "Transaction Date", data: "transdate",
                           render: function (data, type, row) {
                               return (moment(data).format("DD/MM/YYYY"));
                           }
                       },

                       { title: "Quantity", data: "qty" },

                       {
                           title: "Issue Quantity", data: "IssueQty",
                           render: function (data) {

                               return '<input type="text" id="txtipIssuQty" class="calcipAmt form-control"  style="width: 50px;text-align: center;"  value=' + data + '>';

                           },
                       },
                       { title: "Skuno", data: "skuno", "visible": false },
                       { title: "StockId", data: "StockId", "visible": false },
                       { title: "OldQty", data: "OldQty", "visible": false }
            ]

        });


        var table = $('#outputitmtab').DataTable();
        $("#outputitmtab tr").click(function () {
            var selected = $(this).hasClass("selected");
            $("#outputitmtab tr").removeClass("selected");
            if (!selected)
                $(this).addClass("selected");
        });
    }

    $(document).ready(function () {
        $("#outputitmtab ").dataTable().find("tbody").on('click', 'tr', function () {
            indexop = (this.rowIndex) - 1;
        });
    });


    $(document).ready(function () {
        $("#inputitmtab ").dataTable().find("tbody").on('click', 'tr', function () {
            indiptitm = (this.rowIndex) - 1;
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

        var day = new Date(),
            year = ((day.getMonth() - 2) < 0) ? (day.getFullYear() - 1) : day.getFullYear(),
            month = ((day.getMonth() - 2) < 0) ? (12 + (day.getMonth() - 2)) : (day.getMonth() + 1),
            date = month + '/' + day.getDate() + '/' + year;

        $('#txtFromDate').val(MainFDate);
        $('#txtToDate').val(Fdatestring);
        $('#txtDcDate').val(Fdatestring);
        $('#txtDespatchDate').val(Fdatestring);
    }


    function GenerateNumber(DCompid) {
        debugger;

        table = "Box_Despatch_mas",
        column = "DespatchNo",
        compId = DCompid,
        Docum = 'BOX DESPATCH'

        $.ajax({
            url: "/BulkOrder/GenerateNo",
            data: JSON.stringify({ tblname: table, ColName: column, CompanyID: DCompid, Doc: Docum }),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                debugger;
                $('#txtDespatch').val(result.Value);
            }
        });
    }


    function Check() {
        debugger;
        var iplist = [];
        var oplist = [];

        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                if (OpItmList[r].IssueQty > 0) {
                    oplist.push(OpItmList[r]);
                }
            }
        }

        if (IpItmList.length > 0) {
            for (var s = 0; s < IpItmList.length; s++) {
                if (IpItmList[s].IssuQuantity > 0) {
                    iplist.push(IpItmList[s]);
                }
            }
        }
        if (iplist.length == 0) {
            //alert('Please fill atleast any one qty...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }
        else {
            Add(iplist, oplist);
        }

    }


    function Add(iplist, oplist) {
        debugger;
        var Obj = {
            Companyid: DCompid,
            CreatedBy: Guserid,
            DespatchNo: $("#txtDespatch").val(),
            DespatchDate: $("#txtDespatchDate").val(),
            stockreqdetail: iplist,
            itmstkdetail: oplist
        }
        $("#btnAdd").attr("disabled", true);

        $.ajax({
            url: "/StockRequest/Add",
            data: JSON.stringify(Obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                if (result.Value == true) {

                    //alert("Data Saved Sucessfully");
                    var msg = 'Data Saved Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "/StockRequest/StockRequestIndex";
                    AlartMessage(msg, flg, mod, ur);
                    //window.location.href = "/StockRequest/StockRequestIndex";
                } else {

                    window.location.href = "/Error/Index";
                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });
    }

    function getbyID(despatchid) {
        debugger;
        var Despatchid = "";
        var Despatchid = $('select#ddlDespatchNo option:selected').val();

        if (Despatchid == 0 || Despatchid == undefined) {
            Despatchid == "";
        }
        else {

            Despatchid = $('select#ddlDespatchNo option:selected').val();
        }
        var fromdate = $('#txtFromDate').val();
        var Todate = $('#txtToDate').val();
        var BoxDesId = despatchid;

        $.ajax({
            url: "/StockRequest/LoadMaingriddet",
            data: JSON.stringify({ Companyid: DCompid, DespatchId: BoxDesId, Despfromdate: fromdate, DespTodate: Todate }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;

                $('#myModal1').show();
                $('#myModal1').modal('show');
                $('#btnUpdate').show();
                $('#btnDel').hide();
                $('#btnAdd').hide();
                var obj = json.Value;

                $('#txtCompany').val(obj[0].Company);
                $('#txtDespatch').val(obj[0].DespatchNo);
                $('#txtDespatchDate').val(moment(obj[0].DespatchDate).format("DD/MM/YYYY"));

                GBoxDesId = obj[0].DespatchId;

                LoadEditItm(GBoxDesId);
                LoadStockEditDetails(GBoxDesId);
            },

            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function getDeleteID(despatchid) {
        debugger;
        var Despatchid = "";
        var Despatchid = $('select#ddlDespatchNo option:selected').val();

        if (Despatchid == 0 || Despatchid == undefined) {
            Despatchid == "";
        }
        else {

            Despatchid = $('select#ddlDespatchNo option:selected').val();
        }
        var fromdate = $('#txtFromDate').val();
        var Todate = $('#txtToDate').val();
        var BoxDesId = despatchid;

        $.ajax({
            url: "/StockRequest/LoadMaingriddet",
            data: JSON.stringify({ Companyid: DCompid, DespatchId: BoxDesId, Despfromdate: fromdate, DespTodate: Todate }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (json) {
                debugger;


                $('#myModal1').show();
                $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnDel').show();
                $('#btnAdd').hide();
                var obj = json.Value;

                $('#txtCompany').val(obj[0].Company);
                $('#txtDespatch').val(obj[0].DespatchNo);
                $('#txtDespatchDate').val(moment(obj[0].DespatchDate).format("DD/MM/YYYY"));
                GBoxDesId = obj[0].DespatchId;
                LoadEditItm(GBoxDesId);
                LoadStockEditDetails(GBoxDesId);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    function LoadEditItm(MasID) {
        debugger;
        $.ajax({
            url: "/StockRequest/LoaditmEditgrid",
            data: JSON.stringify({ BoxConMasId: MasID }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                IpItmList = result.Value;
                InputitmTab(IpItmList);           
            }
        });
    }

    function LoadStockEditDetails(MasID) {
        debugger;

        $.ajax({
            url: "/StockRequest/LoaditmEditstockgrid",
            data: JSON.stringify({ BoxConMasId: MasID }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {
                debugger;
                OpItmList = result.Value;
                OutputitmTab(OpItmList);
            }
        });
    }

    function ChkUpdate() {

        debugger;

        var res = validate();
        if (res == false) {
            return false;
        }

        var iplist = [];
        var oplist = [];

        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                if (OpItmList[r].IssueQty > 0) {
                    oplist.push(OpItmList[r]);
                }
            }
        }

        if (IpItmList.length > 0) {
            for (var s = 0; s < IpItmList.length; s++) {
                if (IpItmList[s].IssuQuantity > 0) {
                    iplist.push(IpItmList[s]);
                }
            }
        }
        if (iplist.length == 0) {
            //alert('Please fill atleast any one qty...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        var Opj = {
            Companyid: DCompid,
            CreatedBy: Guserid,
            DespatchNo: $("#txtDespatch").val(),
            DespatchDate: $("#txtDespatchDate").val(),
            stockreqdetail: iplist,
            itmstkdetail: oplist,
            DespatchId: GBoxDesId
        };

        
        debugger;
        $("#btnAdd").attr("disabled", true);
        $.ajax({
            url: "/StockRequest/Update",
            data: JSON.stringify(Opj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    //alert("Data Updated Sucessfully");
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "/StockRequest/StockRequestIndex";
                    AlartMessage(msg, flg, mod, ur);
                    //window.location.href = "/StockRequest/StockRequestIndex";
                } else {

                    window.location.href = "/Error/Index";

                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    function ChkDelete() {

        debugger;
        var res = validate();
        if (res == false) {
            return false;
        }

        var iplist = [];
        var oplist = [];

        if (OpItmList.length > 0) {
            for (var r = 0; r < OpItmList.length; r++) {
                if (OpItmList[r].IssueQty > 0) {
                    oplist.push(OpItmList[r]);
                }
            }
        }

        if (IpItmList.length > 0) {
            for (var s = 0; s < IpItmList.length; s++) {
                if (IpItmList[s].IssuQuantity > 0) {
                    iplist.push(IpItmList[s]);
                }
            }
        }
        if (iplist.length == 0) {
            //alert('Please fill atleast any one qty...');
            var msg = 'Please fill atleast any one quantity...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }

        var Opj = {
            Companyid: DCompid,
            CreatedBy: Guserid,
            DespatchNo: $("#txtDespatch").val(),
            DespatchDate: $("#txtDespatchDate").val(),
            stockreqdetail: iplist,
            itmstkdetail: oplist,
            DespatchId: GBoxDesId
        };

        debugger;
        $("#btnAdd").attr("disabled", true);
        $.ajax({
            url: "/StockRequest/Delete",
            data: JSON.stringify(Opj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.Value == true) {

                    //alert("Data Deleted Sucessfully");
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var mod = 0;
                    var ur = "/StockRequest/StockRequestIndex";
                    AlartMessage(msg, flg, mod, ur);
                    //window.location.href = "/StockRequest/StockRequestIndex";
                } else {

                    window.location.href = "/Error/Index";


                }

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    function validate() {
        var isValid = true;

        if ($('#txtCompany').val() == '') {

            $('#txtCompany').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#txtCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtDespatch').val() == '') {

            $('#txtDespatch').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#txtDespatch').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#txtDespatchDate').val() == '') {

            $('#txtDespatchDate').siblings(".select2-container").css('border', '1px solid red');

            isValid = false;
        }
        else {
            $('#txtDespatchDate').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        return isValid;
    }

    function CMainlist() {
        $('#tblmaindetails').DataTable().destroy();
        LoadMaingrid();
    }






