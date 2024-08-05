
var PItemList = [];
var Chk = 0;
var Pindex = -1;
var Rindex = 0;
var PCItemList = [];
var RItemList = [];
$(document).ready(function () {
    debugger;
    LoadItemGroupDDL("#ddlItemGrp");
    LoadItemDDL("#ddlItem");
    LoadProcessDDL("#ddlProcess");
    $('#PrId').hide();
    var protype = $('input[name="PType"]:checked').attr('value');
    if (protype == 'P') {

        $('#tblPur').show();
        $("#tblProc").hide();
    }
    else if (protype == 'R') {
        $('#tblPur').hide();
        $("#tblProc").show();
    }
    LoadPurchaseAItemDetails();
    LoadProcessItemDetails();
    //$('#tblProc').hide();
    $('#Update').show();
    $('#ProcessUpdate').hide();
    $(document).on('keyup', '.txtProcessQty', function (e) {
        var table = $('#tblProcessgrid').DataTable();
        var pid = table.row($(this).parents('tr')).data()["ProcessId"];
        var Chkper = table.row($(this).parents('tr')).data()["CheckPer"];
        var Val = $(this).val();
        var qt = 0;
        var per = 0;
        var table = $('#tblProcessgrid').DataTable();
        var data = table.rows().data();
        if (Chkper == true) { }
        else {
            $('input[id=txtProcess]').each(function (ig) {
                if (data[ig].ProcessId == pid) {
                    var row = $(this).closest('tr');
                    row.find('#txtProcessQty').removeAttr('disabled');
                    row.find('#txtProcessper').attr('disabled', 'disabled');
                    qt = row.find('#txtProcessQty').val();
                    row.find('#txtProcessper').val(0);
                }
            });
            if (qt >= 0) {

                for (var v = 0; v < RItemList.length; v++) {
                    if (RItemList[v].ProcessId == pid) {

                        var IQty = 0;

                        if (qt == 0) {
                            IQty = 0;
                        }
                        else {
                            IQty = qt;
                        }


                        var field = qt;
                        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
                            // alert("Enter only Numerics");


                            $.each(RItemList, function () {
                                if (this.ProcessId == pid) {
                                    this.PQuantity = 0;
                                    //this.Percentage = 0;
                                }
                            });
                            //loadPurchaseAllItemTable(PItemList);
                            return false;
                        }

                        $.each(RItemList, function () {
                            if (this.ProcessId == pid) {
                                this.PQuantity = IQty;
                                this.Percentage = 0;
                            }
                        });

                        //loadPurchaseAllItemTable(PItemList);
                    }
                }
            }
        }
    });
    $(document).on('keyup', '.txtProcessper', function (e) {
        var table = $('#tblProcessgrid').DataTable();
        var pid = table.row($(this).parents('tr')).data()["ProcessId"];
        var Chkper = table.row($(this).parents('tr')).data()["CheckPer"];
        var Val = $(this).val();
        var qt = 0;
        var per = 0;
        var table = $('#tblProcessgrid').DataTable();
        var data = table.rows().data();
        if (Chkper == true) {
            $('input[id=txtProcess]').each(function (ig) {
                if (data[ig].ProcessId == pid) {
                    var row = $(this).closest('tr');
                    row.find('#txtProcessper').removeAttr('disabled');
                    row.find('#txtProcessQty').attr('disabled', 'disabled');
                    per = row.find('#txtProcessper').val();
                    row.find('#txtProcessQty').val(0);
                }
            });
            if (per >= 0) {
                var prid = $(this).val();

                for (var v = 0; v < RItemList.length; v++) {
                    if (RItemList[v].ProcessId == pid) {

                        var PerQty = 0;

                        if (per == 0) {
                            PerQty = 0;
                        }
                        else {
                            PerQty = per;
                        }


                        var field = per;
                        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
                            // alert("Enter only Numerics");


                            $.each(RItemList, function () {
                                if (this.ProcessId == pid) {
                                    this.ProPercentage = 0;
                                    //this.PQuantity = 0;
                                }
                            });
                            // loadPurchaseAllItemTable(PItemList);
                            return false;
                        }

                        $.each(RItemList, function () {
                            if (this.ProcessId == pid) {
                                this.ProPercentage = PerQty;
                                this.PQuantity = 0;
                            }
                        });

                        //loadPurchaseAllItemTable(PItemList);
                    }
                }
            }
            else {

            }
        }
        });
        $(document).on('keyup', '.txtPurchaseQty', function (e) {
            var table = $('#tblPurchasegrid').DataTable();
            var Itmid = table.row($(this).parents('tr')).data()["ItemId"];
            var Chkper = table.row($(this).parents('tr')).data()["CheckPer"];
            var Val = $(this).val();
            var qt = 0;
            var per = 0;
            var table = $('#tblPurchasegrid').DataTable();
            var data = table.rows().data();


            if (Chkper == true) {
                $('input[id=txtPurchaseQty]').each(function (ig) {
                    if (data[ig].ItemId == Itmid) {
                        var row = $(this).closest('tr');
                        row.find('#Purchs').removeAttr('disabled');
                        row.find('#txtPurchaseQty').attr('disabled', 'disabled');
                        per = row.find('#Purchs').val();
                        row.find('#txtPurchaseQty').val(0);

                    }
                });
            }
            else {
                $('input[id=Purchs]').each(function (ig) {
                    if (data[ig].ItemId == Itmid) {
                        var row = $(this).closest('tr');
                        row.find('#txtPurchaseQty').removeAttr('disabled');
                        row.find('#Purchs').attr('disabled', 'disabled');
                        qt = row.find('#txtPurchaseQty').val();
                        row.find('#Purchs').val(0);

                    }
                });
                if (qt >= 0) {

                    for (var v = 0; v < PItemList.length; v++) {
                        if (PItemList[v].ItemId == Itmid) {

                            var IQty = 0;

                            if (qt == 0) {
                                IQty = 0;
                            }
                            else {
                                IQty = qt;
                            }
                            var field = qt;
                            if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {


                                $.each(PItemList, function () {
                                    if (this.ItemId == Itmid) {
                                        this.Quantity = 0;
                                        //this.Percentage = 0;
                                    }
                                });

                                return false;
                            }

                            $.each(PItemList, function () {
                                if (this.ItemId == Itmid) {
                                    this.Quantity = IQty;
                                    this.Percentage = 0;
                                }
                            });

                        }
                    }
                }
            }
        });
        $(document).on('keyup', '.Purchs', function (e) {
            var table = $('#tblPurchasegrid').DataTable();
            var Itmid = table.row($(this).parents('tr')).data()["ItemId"];
            var Chkper = table.row($(this).parents('tr')).data()["CheckPer"];
            var Val = $(this).val();
            var qt = 0;
            var per = 0;
            var table = $('#tblPurchasegrid').DataTable();
            var data = table.rows().data();


            if (Chkper == true) {
                $('input[id=txtPurchaseQty]').each(function (ig) {
                    if (data[ig].ItemId == Itmid) {
                        var row = $(this).closest('tr');
                        row.find('#Purchs').removeAttr('disabled');
                        row.find('#txtPurchaseQty').attr('disabled', 'disabled');
                        per = row.find('#Purchs').val();
                        row.find('#txtPurchaseQty').val(0);

                    }
                });
                if (per >= 0) {


                    for (var v = 0; v < PItemList.length; v++) {
                        if (PItemList[v].ItemId == Itmid) {
                            var PerQty = 0;

                            if (per == 0) {
                                PerQty = 0;
                            }
                            else {
                                PerQty = per;
                            }


                            var field = per;
                            if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
                                // alert("Enter only Numerics");


                                $.each(PItemList, function () {
                                    if (this.ItemId == Itmid) {
                                        this.Percentage = 0;
                                        //this.Quantity = 0;
                                    }
                                });
                                // loadPurchaseAllItemTable(PItemList);
                                return false;
                            }

                            $.each(PItemList, function () {
                                if (this.ItemId == Itmid) {
                                    this.Percentage = PerQty;
                                    this.Quantity = 0;
                                }
                            });
                        }
                    }
                }
                else {
                    $('input[id=Purchs]').each(function (ig) {
                        if (data[ig].ItemId == Itmid) {
                            var row = $(this).closest('tr');
                            row.find('#txtPurchaseQty').removeAttr('disabled');
                            row.find('#Purchs').attr('disabled', 'disabled');
                            qt = row.find('#txtPurchaseQty').val();
                            row.find('#Purchs').val(0);

                        }
                    });
                }
            }
        });

        $("#tblPurchasegrid").dataTable().find("tbody").on('click', 'tr', function () {
            debugger;

            $('input[id=txtPurchase]').each(function () {
                var row = $(this).closest('tr');
                if ($(this).is(':checked')) {
                    debugger;

                    row.find('#Purchs').removeAttr('disabled');
                    row.find('#txtPurchaseQty').attr('disabled', 'disabled');
                    per = row.find('#Purchs').val();
                    row.find('#txtPurchaseQty').val(0);
                    var itmid = $(this).val();
                    $.each(PItemList, function () {
                        if (this.ItemId == itmid) {
                            this.CheckPer = true;
                        }
                    });
                }
                else {

                    row.find('#txtPurchaseQty').removeAttr('disabled');
                    row.find('#Purchs').attr('disabled', 'disabled');
                    qt = row.find('#txtPurchaseQty').val();
                    row.find('#Purchs').val(0);
                    var itmid = $(this).val();
                    $.each(PItemList, function () {
                        if (this.ItemId == itmid) {
                            this.CheckPer = false;
                        }
                    });
                }
            });


        });


    $("#tblProcessgrid").dataTable().find("tbody").on('click', 'tr', function () {
        debugger;      

        $('input[id=txtProcess]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                debugger;
                
                row.find('#txtProcessper').removeAttr('disabled');
                row.find('#txtProcessQty').attr('disabled', 'disabled');
                per = row.find('#txtProcessper').val();
                row.find('#txtProcessQty').val(0);
                var pid = $(this).val();
                $.each(RItemList, function () {
                    if (this.ProcessId == pid) {
                        this.CheckPer = true;
                    }
                });
            }
            else {

                row.find('#txtProcessQty').removeAttr('disabled');
                row.find('#txtProcessper').attr('disabled', 'disabled');
                qt = row.find('#txtProcessQty').val();
                row.find('#txtProcessper').val(0);
                var pid = $(this).val();
                $.each(RItemList, function () {
                    if (this.ProcessId == pid) {
                        this.CheckPer = false;
                    }
                });
            }
        });
    });


        //$(document).on('onclick', '.txtPurchase', function (e) {
        //    debugger;
        //});
        //$("#tblPurchasegrid").dataTable().find("tbody").on('click', 'tr', function () {
        //    debugger;
        //    Pindex = (this.rowIndex) - 1;
        //    var table = $('#tblPurchasegrid').DataTable();
        //    var colAchange = table.cell(Pindex, 2).data();
        //    var qt = 0;
        //    var per = 0;

        //    $('input[id=txtPurchase]').each(function () {
        //        var row = $(this).closest('tr');
        //        if ($(this).is(':checked')) {
        //            debugger;
        //            //alert(this.id + ' is checked');
        //            row.find('#Purchs').removeAttr('disabled');
        //            row.find('#txtPurchaseQty').attr('disabled', 'disabled');
        //            per = row.find('#Purchs').val();
        //            row.find('#txtPurchaseQty').val(0);
        //            if (per >= 0) {
        //                var itmid = $(this).val();

        //                for (var v = 0; v < PItemList.length; v++) {
        //                    if (PItemList[v].ItemId == itmid) {
        //                        var PerQty = 0;

        //                        if (per == 0) {
        //                            PerQty = 0;
        //                        }
        //                        else {
        //                            PerQty = per;
        //                        }


        //                        var field = per;
        //                        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
        //                            // alert("Enter only Numerics");


        //                            $.each(PItemList, function () {
        //                                if (this.ItemId == itmid) {
        //                                    this.Percentage = 0;
        //                                    //this.Quantity = 0;
        //                                }
        //                            });
        //                            // loadPurchaseAllItemTable(PItemList);
        //                            return false;
        //                        }

        //                        $.each(PItemList, function () {
        //                            if (this.ItemId == itmid) {
        //                                this.Percentage = PerQty;
        //                                this.Quantity = 0;
        //                            }
        //                        });
        //                    }
        //                }                   
        //            }
        //        }
        //        else {

        //            row.find('#txtPurchaseQty').removeAttr('disabled');
        //            row.find('#Purchs').attr('disabled', 'disabled');
        //            qt = row.find('#txtPurchaseQty').val();
        //            row.find('#Purchs').val(0);

        //            if (qt >= 0) {
        //                var itmid = $(this).val();

        //                for (var v = 0; v < PItemList.length; v++) {
        //                    if (PItemList[v].ItemId == itmid) {

        //                        var IQty = 0;

        //                        if (qt == 0) {
        //                            IQty = 0;
        //                        }
        //                        else {
        //                            IQty = qt;
        //                        }
        //                        var field = qt;
        //                        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {              


        //                            $.each(PItemList, function () {
        //                                if (this.ItemId == itmid) {
        //                                    this.Quantity = 0;
        //                                    //this.Percentage = 0;
        //                                }
        //                            });

        //                            return false;
        //                        }

        //                        $.each(PItemList, function () {
        //                            if (this.ItemId == itmid) {
        //                                this.Quantity = IQty;
        //                                this.Percentage = 0;
        //                            }
        //                        });

        //                    }
        //                }
        //            }

        //        }
        //    });


        //});

        //$("#tblProcessgrid").dataTable().find("tbody").on('click', 'tr', function () {
        //    debugger;
        //    Rindex = (this.rowIndex) - 1;
        //    var table = $('#tblProcessgrid').DataTable();
        //    var colAchange = table.cell(Rindex, 2).data();

        //    var qt = 0;
        //    var per = 0;

        //    $('input[id=txtProcess]').each(function () {
        //        var row = $(this).closest('tr');
        //        if ($(this).is(':checked')) {
        //            debugger;
        //            //alert(this.id + ' is checked');
        //            row.find('#txtProcessper').removeAttr('disabled');
        //            row.find('#txtProcessQty').attr('disabled', 'disabled');
        //            per = row.find('#txtProcessper').val();
        //            row.find('#txtProcessQty').val(0);
        //            if (per >= 0) {
        //                var prid = $(this).val();

        //                for (var v = 0; v < RItemList.length; v++) {
        //                    if (RItemList[v].ProcessId == prid) {

        //                        var PerQty = 0;

        //                        if (per == 0) {
        //                            PerQty = 0;
        //                        }
        //                        else {
        //                            PerQty = per;
        //                        }


        //                        var field = per;
        //                        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
        //                            // alert("Enter only Numerics");


        //                            $.each(RItemList, function () {
        //                                if (this.ProcessId == prid) {
        //                                    this.ProPercentage = 0;
        //                                    //this.PQuantity = 0;
        //                                }
        //                            });
        //                            // loadPurchaseAllItemTable(PItemList);
        //                            return false;
        //                        }

        //                        $.each(RItemList, function () {
        //                            if (this.ProcessId == prid) {
        //                                this.ProPercentage = PerQty;
        //                                this.PQuantity = 0;
        //                            }
        //                        });

        //                        //loadPurchaseAllItemTable(PItemList);
        //                    }
        //                }
        //            }
        //            //$('#Purchs').attr("disabled", false)[Pindex];
        //            //$('#txtPurchaseQty').attr("disabled", true)[Pindex];


        //            //$(this).find('#Purchs').attr("disabled", $(this).is(":checked"));
        //            //$(this).find("#Purchs").removeAttr("disabled");

        //            //$(this).find("#txtPurchaseQty").attr('disabled', 'disabled');

        //        }
        //        else {

        //            row.find('#txtProcessQty').removeAttr('disabled');
        //            row.find('#txtProcessper').attr('disabled', 'disabled');
        //            qt = row.find('#txtProcessQty').val();
        //            row.find('#txtProcessper').val(0);
        //            //$(this).find("#Purchs").attr('disabled', 'disabled');

        //            //$(this).find("#txtPurchaseQty").removeAttr("disabled");

        //            //$('#Purchs').attr("disabled", true)[Pindex];
        //            //$('#txtPurchaseQty').attr("disabled", false)[Pindex];

        //            if (qt >= 0) {
        //                var prid = $(this).val();
        //                for (var v = 0; v < RItemList.length; v++) {
        //                    if (RItemList[v].ProcessId == prid) {

        //                        var IQty = 0;

        //                        if (qt == 0) {
        //                            IQty = 0;
        //                        }
        //                        else {
        //                            IQty = qt;
        //                        }


        //                        var field = qt;
        //                        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
        //                            // alert("Enter only Numerics");


        //                            $.each(RItemList, function () {
        //                                if (this.ProcessId == prid) {
        //                                    this.PQuantity = 0;
        //                                    //this.Percentage = 0;
        //                                }
        //                            });
        //                            //loadPurchaseAllItemTable(PItemList);
        //                            return false;
        //                        }

        //                        $.each(RItemList, function () {
        //                            if (this.ProcessId == prid) {
        //                                this.PQuantity = IQty;
        //                                this.Percentage = 0;
        //                            }
        //                        });

        //                        //loadPurchaseAllItemTable(PItemList);
        //                    }
        //                }
        //            }

        //        }
        //    });
        //});
    });


    function chk() {
        debugger;



        $('input[id=Purchs]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            if ($(this).val() > 0) {
                row.find('#txtPurchase').prop('checked', true);
            }
        });

        $('input[id=txtPurchase]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                debugger;
                //alert(this.id + ' is checked');
                row.find('#Purchs').removeAttr('disabled');
                row.find('#txtPurchaseQty').attr('disabled', 'disabled');


            }
            else {

                row.find('#txtPurchaseQty').removeAttr('disabled');
                row.find('#Purchs').attr('disabled', 'disabled');


            }
        });



    }




    function chkprocess() {
        debugger;



        $('input[id=txtProcessper]').each(function () {
            debugger;
            var row = $(this).closest('tr');
            if ($(this).val() > 0) {
                row.find('#txtProcess').prop('checked', true);
            }
        });

        $('input[id=txtProcess]').each(function () {
            var row = $(this).closest('tr');
            if ($(this).is(':checked')) {
                debugger;
                //alert(this.id + ' is checked');
                row.find('#txtProcessper').removeAttr('disabled');
                row.find('#txtProcessQty').attr('disabled', 'disabled');


            }
            else {

                row.find('#txtProcessQty').removeAttr('disabled');
                row.find('#txtProcessper').attr('disabled', 'disabled');


            }
        });



    }

    function LoadPurchaseDetails() {
        $('#IgId').show();
        $('#IId').show();
        $('#PrId').hide();
        $('#tblPur').show();
        $('#tblProc').hide();
        $('#Update').show();
        $('#ProcessUpdate').hide();
        //LoadPurchaseAItemDetails();
    }

    function LoadProcessDetails() {
        $('#IgId').hide();
        $('#IId').hide();
        $('#PrId').show();
        $('#tblPur').hide();
        $('#tblProc').show();
        $('#Update').hide();
        $('#ProcessUpdate').show();
        //LoadProcessItemDetails();
    }

    function LoadProcessDropDetails() {
        $('#tblProcessgrid').DataTable().destroy();
        LoadProcessItemDetails();

    }

    function LoadPurchaseAItemDetails() {

        debugger;
        var IgId = $('#ddlItemGrp').val();
        var ImId = $('#ddlItem').val();

        $.ajax({
            url: "/Allowance/LoadDataAlloPurchaseDetails",
            data: JSON.stringify({ ItemGroupId: IgId, ItemId: ImId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                PItemList = result;
                loadPurchaseAllItemTable(PItemList);
                chk();

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

    }
    function LoadProcessItemDetails() {

        debugger;

        var ProId = $('#ddlProcess').val();

        $.ajax({
            url: "/Allowance/LoadDataAlloProcessDetails",
            data: JSON.stringify({ ProcessId: ProId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                RItemList = result;
                loadProcessAllItemTable(RItemList);
                chkprocess();

            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

    }

    function loadPurchaseAllItemTable(PItemList) {

        $('#tblPurchasegrid').DataTable().destroy();
        debugger;

        PItemList.sort(function (a, b) {
            return a.ItemId - b.ItemId;
        });

        $('#tblPurchasegrid').DataTable({
            data: PItemList,
            scrollY: 400,
            scrollCollapse: true,
            paging: false,
            fixedColumns: false,
            select: false,
            scrollX: "100%",
            scrollXInner: "100%",
            scroller: false,
            //"bSort": false,
            columns: [

                { title: "ItemId", data: "ItemId", "visible": false },
                { title: "Item", data: "Item" },
                {

                    title: "%", data: "ItemId",
                    render: function (data) {

                        return '<input type="checkbox" id="txtPurchase" class="editor-active txtPurchase"  style="width: 50px;text-align: center;"  value=' + data + ' >';
                    },
                },
                 {
                     title: "Percentage", data: "Percentage",
                     render: function (data) {
                         //if (Chk == true) {
                         return '<input type="text" id="Purchs" class="form-control Purchs"  style="width: 50px;text-align: center;" value=' + data + ' >';
                         //} else {
                         //    return '<input type="text" id=""class="editor-active"  style="width: 50px;text-align: center;" disabled  value=' + data + ' onkeyup="LoadPerqty(this.value);">';

                         //}
                     },
                 },

                {
                    title: "Quantity", data: "Quantity",
                    render: function (data) {

                        return '<input type="text" id="txtPurchaseQty"class="form-control txtPurchaseQty"  style="width: 50px;text-align: center;"  value=' + data + ' ">';

                    },
                },
                { title: "Uom", data: "Uom" },

            ]
        });
    }


    function loadProcessAllItemTable(RItemList) {

        $('#tblProcessgrid').DataTable().destroy();
        debugger;

        $('#tblProcessgrid').DataTable({
            data: RItemList,
            scrollY: 400,
            scrollCollapse: true,
            paging: false,
            fixedColumns: false,
            select: false,
            scrollX: "100%",
            scrollXInner: "100%",
            scroller: false,
            //"bSort": false,
            columns: [

                 { title: "ToleId", data: "TolerId", "visible": false },
                { title: "ProcessId", data: "ProcessId", "visible": false },
                { title: "Process", data: "Process" },
                {

                    title: "%", data: "ProcessId",
                    render: function (data) {

                        return '<input type="checkbox" id="txtProcess" class="txtProcess editor-active"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                    },
                },
                 {
                     title: "Percentage", data: "ProPercentage",
                     render: function (data) {
                         //if (Chk == true) {
                         return '<input type="text" id="txtProcessper"class="form-control txtProcessper"  style="width: 50px;text-align: center;" disabled value=' + data + '>';
                         //} else {
                         //    return '<input type="text" id=""class="editor-active"  style="width: 50px;text-align: center;" disabled  value=' + data + ' onkeyup="LoadPerqty(this.value);">';

                         //}
                     },
                 },

                {
                    title: "Quantity", data: "PQuantity",
                    render: function (data) {

                        return '<input type="text" id="txtProcessQty"class="form-control txtProcessQty"  style="width: 50px;text-align: center;"  value=' + data + ' >';

                    },
                },


            ]
        });
    }
    function myPurfunc(val) {

        debugger;

        Pindex;

        //var currentrowoftcpi = PItemList.slice(Pindex);



        //$.ajax({
        //    url: "/Allowance/LoadDataAlloCheckPurchaseDetails",
        //    data: JSON.stringify({ ItemId: val }),
        //    type: "POST",
        //    contentType: "application/json;charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {

        //        PCItemList = result;
        //        loadPurchaseAllCheckItemTable(PCItemList);

        //    },
        //    failure: function (errMsg) {
        //        alert(errMsg);
        //    }
        //});

        //Pindex;

        //var currentrowoftcpi = PItemList.slice(Pindex);

        //var IId = currentrowoftcpi[0].ItemId;

        //var IQty = val;


        //$.each(PItemList, function () {
        //    if (this.ItemId == IId) {
        //        this.Percentage = "123";
        //    }
        //});

        //loadPurchaseAllItemTable(PItemList);

    }

    //function loadPurchaseAllCheckItemTable(PCItemList) {

    //    $('#tblPurchasegrid').DataTable().destroy();
    //    debugger;

    //    $('#tblPurchasegrid').DataTable({
    //        data: PCItemList,
    //        scrollY: 100,
    //        scrollCollapse: true,
    //        paging: false,
    //        fixedColumns: false,
    //        select: false,
    //        scrollX: "100%",
    //        scrollXInner: "100%",
    //        scroller: false,
    //        "bSort": false,
    //        columns: [

    //            { title: "ItemId", data: "ItemId", "visible": false },
    //            { title: "Item", data: "Item" },
    //            {

    //                title: "CheckPer", data: "CheckPer",
    //                render: function (data) {

    //                    return '<input type="checkbox"  class="editor-active"  checked style="width: 50px;text-align: center;"  value=' + data + ' onclick="myfunc(this.value);">';

    //                },
    //            },
    //             {
    //                 title: "Percentage", data: "Percentage",
    //                 render: function (data) {
    //                     //if (Chk == true) {
    //                     return '<input type="text" id=""class="editor-active"  style="width: 50px;text-align: center;" value=' + data + ' onkeyup="LoadPerqty(this.value);">';
    //                     //} else {
    //                     //    return '<input type="text" id=""class="editor-active"  style="width: 50px;text-align: center;" disabled  value=' + data + ' onkeyup="LoadPerqty(this.value);">';

    //                     //}
    //                 },
    //             },

    //            {
    //                title: "Quantity", data: "Quantity",
    //                render: function (data) {

    //                    return '<input type="text" id=""class="editor-active"  style="width: 50px;text-align: center;" disabled value=' + data + ' onkeyup="calcqty(this.value);">';

    //                },
    //            },
    //            { title: "Uom", data: "Uom" },

    //        ]
    //    });
    //}

    function calcqty(Val) {
        debugger;

        Pindex;

        var currentrowoftcpi = PItemList.slice(Pindex);

        var IId = currentrowoftcpi[0].ItemId;

        var IQty = 0;

        if (Val == 0) {
            IQty = 0;
        }
        else {
            IQty = Val;
        }


        var field = Val;
        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
            // alert("Enter only Numerics");


            $.each(PItemList, function () {
                if (this.ItemId == IId) {
                    this.Quantity = 0;
                }
            });
            loadPurchaseAllItemTable(PItemList);
            return false;
        }

        $.each(PItemList, function () {
            if (this.ItemId == IId) {
                this.Quantity = IQty;
            }
        });

        loadPurchaseAllItemTable(PItemList);



    }
    function calcpqty(Val) {
        debugger;

        Rindex;

        var currentrowoftcpi = RItemList.slice(Rindex);

        var PId = currentrowoftcpi[0].ProcessId;

        var PQty = Val;


        $.each(RItemList, function () {
            if (this.ProcessId == PId) {
                this.PQuantity = PQty;
            }
        });

        loadProcessAllItemTable(RItemList);



    }

    function LoadPerqty(Val) {
        debugger;
        Pindex;
        //alert(Pindex);
        var currentrowoftcpi = PItemList.slice(Pindex);

        var IId = currentrowoftcpi[0].ItemId;

        var PerQty = 0;

        if (Val == 0) {
            PerQty = 0;
        }
        else {
            PerQty = Val;
        }


        var field = Val;
        if (!field.match(/^[\-\+]?[\d\,]*\.?[\d]*$/)) {
            // alert("Enter only Numerics");


            $.each(PItemList, function () {
                if (this.ItemId == IId) {
                    this.Percentage = 0;
                }
            });
            loadPurchaseAllItemTable(PItemList);
            return false;
        }

        $.each(PItemList, function () {
            if (this.ItemId == IId) {
                this.Percentage = PerQty;
            }
        });

        loadPurchaseAllItemTable(PItemList);


    }
    function AllowUpdate() {
        debugger;


        if (PItemList.length == 0) {
            //alert("Please Enter the Item Details..");
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }


        var objPurSubmit = {

            AllowSetUp: PItemList,

        };
        debugger;
        LoadingSymb();
        $.ajax({
            url: "/Allowance/Update",
            data: JSON.stringify(objPurSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {

                    //alert("Data Updated Sucessfully");
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);

                    $('#myModal1').modal('hide');
                    //window.location.reload();
                    // ClearAddData();

                } else {

                    window.location.href = "/Error/Index";

                }


            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    function LoadItemGroupDetails() {
        $('#tblPurchasegrid').DataTable().destroy();
        LoadPurchaseAItemDetails();
    }

    function LoadItemDetails() {
        $('#tblPurchasegrid').DataTable().destroy();
        LoadPurchaseAItemDetails();
    }
    function AllowProcessUpdate() {

        if (RItemList.length == 0) {
            //alert("Please Enter the Item Details..");
            var msg = 'Please Enter the Item Details...';
            var flg = 4;
            var mod = 1;
            var ur = "";
            AlartMessage(msg, flg, mod, ur);
            return true;
        }


        var objPurSubmit = {

            AllowSetUp: RItemList,

        };
        debugger;
        LoadingSymb();
        $.ajax({
            url: "/Allowance/ProcessUpdate",
            data: JSON.stringify(objPurSubmit),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                if (result.Value == true) {

                    //alert("Data Updated Sucessfully");
                    var msg = 'Data Updated Sucessfully...';
                    var flg = 1;
                    var mod = 0;
                    var ur = "";
                    AlartMessage(msg, flg, mod, ur);

                    $('#myModal1').modal('hide');
                    //window.location.reload();
                    // ClearAddData();

                } else {

                    window.location.href = "/Error/Index";

                }


            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    function ClearAllowData() {
        window.location.reload();
    }