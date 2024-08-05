
var StyleRId = 0;
var Mod = 0;
var FabList = [];
var YarnList = [];
var FabId=0;
var FSerNo = 0;
var MainFDate = 0;
$(document).ready(function () {
    debugger;
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('?');

    for (var i = 0; i < arr.length; i++) {
        var queryvalue = arr[i].split('=');
    }

    StyleRId = queryvalue[1];
    Mod = queryvalue[3];
    MainFDate = $("#hdMainFromDate").data('value');
    getDate();
    $('#myModal').modal('show');

    if (Mod == 0) {
        LoadPlanSampleDetails(StyleRId);
    }
    if (Mod == 1) {
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#btnDelete').hide();
        LoadPlanEditSampleDetails(StyleRId);
    }
    if (Mod == 2) {
        $('#btnUpdate').hide();
        $('#btnAdd').hide();
        $('#btnDelete').show();
        LoadPlanEditSampleDetails(StyleRId);
    }
    LoadFabricDDL("#ddlItem");
    LoadFSizeDDL("#ddlSize");
    LoadColorDDL("#ddlBaseColor,#ddlDyeColor,#ddlPrintColor,#ddlIpGColor,#ddlIpDColor");
    LoadYSizeDDL("#ddlIpSize");
    LoadYarnDDL("#ddlIpItem");

});

function LoadPlanSampleDetails(StyleRId) {
    $.ajax({
        url: "/SamplePlanningFabric/GetPlanSampleDetails",
        data: JSON.stringify({ StyleRowid: StyleRId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtOrderno').val(obj[0]["Order_No"]);
                $('#txtBuyRefNo').val(obj[0]["Ref_no"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtProdQty').val(obj[0]["Quantity"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                $('#txtPlanId').val(obj[0]["PlanID"]);
                $('#txtJobNo').val(obj[0]["Job_Ord_No"]);
                $('#txtCompUnit').val(obj[0]["CompanyUnit"]);

                $('#txtHCompanyId').val(obj[0]["CompanyID"]);

                $('#txtCompUnitId').val(obj[0]["CompanyUnitID"]);

                StyleRowId = $("#txtStyleRowId").val();
                var Planid = $("#txtPlanId").val();


            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function LoadPlanEditSampleDetails(StyleRId) {
    $.ajax({
        url: "/SamplePlanningFabric/GetPlanEditSampleDetails",
        data: JSON.stringify({ StyleRowid: StyleRId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#txtOrderno').val(obj[0]["Order_No"]);
                $('#txtBuyRefNo').val(obj[0]["Ref_no"]);
                $('#txtCompany').val(obj[0]["Company"]);
                $('#txtStyle').val(obj[0]["Style"]);
                $('#txtProdQty').val(obj[0]["Quantity"]);
                $('#txtBuyer').val(obj[0]["buyer"]);
                $('#txtStyleRowId').val(obj[0]["StyleRowid"]);
                $('#txtPlanId').val(obj[0]["PlanID"]);
                $('#txtJobNo').val(obj[0]["Job_Ord_No"]);
                $('#txtCompUnit').val(obj[0]["CompanyUnit"]);
                $('#txtHCompanyId').val(obj[0]["CompanyID"]);

                $('#txtCompUnitId').val(obj[0]["CompanyUnitID"]);

                $('#txtEntryDate').val(moment(obj[0]["EDate"]).format('DD/MM/YYYY'));

                //StyleRowId = $("#txtStyleRowId").val();
                //var Planid = $("#txtPlanId").val();
                var OType = obj[0]["Type"];;

                EditDetPlanFabList(StyleRId, OType);
                EditDetPlanYanList(StyleRId, OType);
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function EditDetPlanFabList(StyleRowId, OType) {
    debugger;
    $.ajax({
        url: "/SamplePlanningFabric/ListEditFabDetDetails",
        data: JSON.stringify({ StyleRowid: StyleRowId, Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            FabList = result;
            loadFabricTable(FabList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function EditDetPlanYanList(StyleRowId, OType) {
    debugger;
    $.ajax({
        url: "/SamplePlanningFabric/ListEditYarnDetDetails",
        data: JSON.stringify({ StyleRowid: StyleRowId, Type: OType }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            YarnList = result;
            loadYarnTable(YarnList);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}

function Close() {

    window.location.href = "/PlanningMain/PlanningMainIndex";
}


$(document).ready(function () {


    $('#btnFabitmadd').click(function () {
        debugger;
        //$("#CompList").show();
        //var d = $("#ddlComponent option:selected").text();
        //if (compList.length > 0) {
        //    for (var q = 0; q < compList.length; q++) {
        //        if (compList[q].ComponentName == d) {
        //            alert('Must be different Component...');
        //            return true;
        //        }
        //    }
        //}
        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlItem').val() == "0") {


            $('#ddlItem').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlItem').css('border-color', 'lightgrey');
        }

        if ($('#ddlSize').val() == "0") {


            $('#ddlSize').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlSize').css('border-color', 'lightgrey');
        }

        if ($('#ddlBaseColor').val() == "0") {


            $('#ddlBaseColor').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlBaseColor').css('border-color', 'lightgrey');
        }

        if ($('#txtProgQty').val() == "") {
            isAllValid = false;
            $('#txtProgQty').css('border-color', 'Red');
        }
        else {
            $('#txtProgQty').css('border-color', 'lightgrey');
        }



        if (FabList.length == 0) {
            leng = 1;
            Yarnid = 1;
            FSerNo=leng;
        }
        else {
            leng = FabList.length + 1;
            Yarnid = FabList.length + 1;
            FSerNo=leng;
        }


        FabId = $('#ddlItem').val();

        var DColorId=$('#ddlDyeColor').val();
        if (DColorId == 0) {
            var Dcolor = "";
        } else {
            var Dcolor = $("#ddlDyeColor option:selected").text();
        }

        var PColorId = $('#ddlPrintColor').val();
        if (PColorId == 0) {
            var Pcolor = "";
        } else {
            var Pcolor = $("#ddlPrintColor option:selected").text();
        }

        if (isAllValid) {


            debugger;
            var FabListObj = {
                FabItem: $("#ddlItem option:selected").text(),
                FabItemID: $('#ddlItem').val(),

                BColor: $("#ddlBaseColor option:selected").text(),
                BColorID: $('#ddlBaseColor').val(),

                FColor: Dcolor,
                FColorID: $('#ddlDyeColor').val(),

                Size: $("#ddlSize option:selected").text(),
                SizeID: $('#ddlSize').val(),


                PColor: Pcolor,
                PrintColorID: $('#ddlPrintColor').val(),

                ProgramQty: $('#txtProgQty').val(),
                BPurQty: $('#txtBasePurQty').val(),
                FPurQty: $('#txtFinPurQty').val(),
                SNo: leng,
                SFDetID:0,
                // Entry_Date: new Date($('#txtEntryDate').val()),

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            FabList.push(FabListObj);

            loadFabricTable(FabListObj);


            fnClearCompControls();




        }
    });

    $(document).on('click', '.btnfabedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = FabList.slice(rowindex);

        $('#ddlItem').val(currentro12[0]['FabItemID']);
        $('#ddlBaseColor').val(currentro12[0]['BColorID']);
        $('#ddlDyeColor').val(currentro12[0]['FColorID']);
        $('#ddlSize').val(currentro12[0]['SizeID']);
        $('#ddlPrintColor').val(currentro12[0]['PrintColorID']);
        $('#txtProgQty').val(currentro12[0]['ProgramQty']);
        $('#txtBasePurQty').val(currentro12[0]['BPurQty']);
        $('#txtFinPurQty').val(currentro12[0]['FPurQty']);


        $('#btnFabitmadd').hide();
        $('#btnFabitmupdate').show();
    });

    $('#btnFabitmupdate').click(function () {
        debugger;
        var currentrowsel = FabList.slice(rowindex);

        currentrowsel[0]['FabItemID'] = $("#ddlItem").val();
        currentrowsel[0]['FabItem'] = $("#ddlItem option:selected").text();
        currentrowsel[0]['BColorID'] = $("#ddlBaseColor").val();
        currentrowsel[0]['BColor'] = $("#ddlBaseColor option:selected").text();
        currentrowsel[0]['FColorID'] = $("#ddlDyeColor option:selected").val();
        currentrowsel[0]['FColor'] = $("#ddlDyeColor option:selected").text();
        currentrowsel[0]['SizeID'] = $("#ddlSize option:selected").val();
        currentrowsel[0]['Size'] = $("#ddlSize option:selected").text();

        currentrowsel[0]['PrintColorID'] = $("#ddlPrintColor option:selected").val();
        currentrowsel[0]['PColor'] = $("#ddlPrintColor option:selected").text();
              
        currentrowsel[0]['ProgramQty'] = $("#txtProgQty").val();
        currentrowsel[0]['BPurQty'] = $("#txtBasePurQty").val();
        currentrowsel[0]['FPurQty'] = $("#txtFinPurQty").val();

        //var comps = currentrowsel[0]['CompSlNo'];
        //compList[rowindex] = currentrowsel[0];
        //CompSlNo = comps;
        //ComSNo = comps;
        //Yarnid = comps;
        loadFabricTable(FabList);
        fnClearCompControls();
        $('#btnFabitmupdate').hide();
        $('#btnFabitmadd').show();




    });
    $(document).on('click', '.btnfabremove', function () {
        rowindex = $(this).closest('tr').index();
        FabList.splice(rowindex, 1);
        document.getElementById("tblFabitemdetails").deleteRow(rowindex + 1);
    });

});


function loadFabricTable(list) {
    $('#tblFabitemdetails').DataTable().destroy();
    debugger;

    $('#tblFabitemdetails').DataTable({
        data: FabList,
        "bSort": false,
        columns: [
            { title: "Sno", data: "SNo" },
            { title: "Detid", data: "SFDetID", "visible": false },
            { title: "Itemid", data: "FabItemID", "visible": false },
             { title: "Item", data: "FabItem" },
               { title: "Sizeid", data: "SizeID", "visible": false },
             { title: "Size", data: "Size" },
               { title: "BColorid", data: "BColorID", "visible": false },
             { title: "Base Color", data: "BColor" },
               { title: "DColorid", data: "FColorID", "visible": false },
             { title: "Dye Color", data: "FColor" },
             { title: "PColorid", data: "PrintColorID", "visible": false },
             { title: "Print Color", data: "PColor" },
            { title: "Qty", data: "ProgramQty" },
            { title: "Grey PurQty", data: "BPurQty" },
            { title: "Finish PurQty", data: "FPurQty" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnfabremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btncomItemview btn btn-round btn-info"> <i class="fa fa-eye"></i> </button></div>'
            }
        ]
    });
}

function fnClearCompControls() {
    debugger;
    $('#ddlItem').val('0');
    $('#ddlSize').val('0');
    $('#txtProgQty').val('');
    $('#txtBasePurQty').val('');
    $('#txtFinPurQty').val('');
    $('#ddlDyeColor').val('0');
    $('#ddlBaseColor').val('0');
    $('#ddlPrintColor').val('0');

}

/////////////////YARN DETAILS////////////////////////////

$(document).ready(function () {


    $('#btnipitmadd').click(function () {
        debugger;
        //$("#CompList").show();
        //var d = $("#ddlComponent option:selected").text();
        //if (compList.length > 0) {
        //    for (var q = 0; q < compList.length; q++) {
        //        if (compList[q].ComponentName == d) {
        //            alert('Must be different Component...');
        //            return true;
        //        }
        //    }
        //}
        var leng = 0;

        var isAllValid = true;


        if (FabId == 0) {
            alert("Please Select Any One Row...");
            return true;
        }

        debugger;
        if ($('#ddlIpItem').val() == "0") {


            $('#ddlIpItem').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlIpItem').css('border-color', 'lightgrey');
        }

        if ($('#ddlIpSize').val() == "0") {


            $('#ddlIpSize').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlIpSize').css('border-color', 'lightgrey');
        }

        if ($('#ddlIpGColor').val() == "0") {


            $('#ddlIpGColor').css('border-color', 'Red');
            isAllValid = false;
        }
        else {

            $('#ddlIpGColor').css('border-color', 'lightgrey');
        }

        if ($('#txtIpQty').val() == "") {
            isAllValid = false;
            $('#txtIpQty').css('border-color', 'Red');
        }
        else {
            $('#txtIpQty').css('border-color', 'lightgrey');
        }



        if (YarnList.length == 0) {
            leng = 1;
            Yarnid = 1;
        }
        else {
            leng = YarnList.length + 1;
            Yarnid = YarnList.length + 1;
        }



        var GColorId = $('#ddlIpGColor').val();
        if (GColorId == 0) {
            var Gcolor = "";
        } else {
            var Gcolor = $("#ddlIpGColor option:selected").text();
        }

        var DColorId = $('#ddlIpDColor').val();
        if (DColorId == 0) {
            var Dcolor = "";
        } else {
            var Dcolor = $("#ddlIpDColor option:selected").text();
        }

        if (isAllValid) {


            debugger;
            var YarnListObj = {
                Yarn: $("#ddlIpItem option:selected").text(),
                YItemID: $('#ddlIpItem').val(),

                BColor: Gcolor,
                BColorID: $('#ddlIpGColor').val(),

                FColor: Dcolor,
                FColorID: $('#ddlIpDColor').val(),

                Size: $("#ddlIpSize option:selected").text(),
                SizeID: $('#ddlIpSize').val(),


            

                ProgramQty: $('#txtIpQty').val(),
                BPurQty: $('#txtIpGreyQty').val(),
                FPurQty: $('#txtIpDyeQty').val(),
                SNo: FSerNo,
                SFDetID: 0,
                YSNo: leng,
                FabItemID:FabId,
                 
                // Entry_Date: new Date($('#txtEntryDate').val()),

                    Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
        };

        YarnList.push(YarnListObj);

        loadYarnTable(YarnListObj);


        fnClearYarnControls();




    }
    });

$(document).on('click', '.btnyarnedit', function () {
    debugger;
    Mode = 1;

    rowindex = $(this).closest('tr').index();

    var currentro12 = YarnList.slice(rowindex);

    $('#ddlIpItem').val(currentro12[0]['YItemID']);
    $('#ddlIpGColor').val(currentro12[0]['BColorID']);
    $('#ddlIpDColor').val(currentro12[0]['FColorID']);
    $('#ddlIpSize').val(currentro12[0]['SizeID']);
   
    $('#txtIpQty').val(currentro12[0]['ProgramQty']);
    $('#txtIpGreyQty').val(currentro12[0]['BPurQty']);
    $('#txtIpDyeQty').val(currentro12[0]['FPurQty']);


    $('#btnipitmadd').hide();
    $('#btnipitmupdate').show();
});

$('#btnipitmupdate').click(function () {
    debugger;
    var currentrowsel = YarnList.slice(rowindex);

    currentrowsel[0]['YItemID'] = $("#ddlIpItem").val();
    currentrowsel[0]['Yarn'] = $("#ddlIpItem option:selected").text();
    currentrowsel[0]['BColorID'] = $("#ddlIpGColor").val();
    currentrowsel[0]['BColor'] = $("#ddlIpGColor option:selected").text();
    currentrowsel[0]['FColorID'] = $("#ddlIpDColor option:selected").val();
    currentrowsel[0]['FColor'] = $("#ddlIpDColor option:selected").text();
    currentrowsel[0]['SizeID'] = $("#ddlIpSize option:selected").val();
    currentrowsel[0]['Size'] = $("#ddlIpSize option:selected").text();


    currentrowsel[0]['ProgramQty'] = $("#txtIpQty").val();
    currentrowsel[0]['BPurQty'] = $("#txtIpGreyQty").val();
    currentrowsel[0]['FPurQty'] = $("#txtIpDyeQty").val();

    //var comps = currentrowsel[0]['CompSlNo'];
    //compList[rowindex] = currentrowsel[0];
    //CompSlNo = comps;
    //ComSNo = comps;
    //Yarnid = comps;
    loadYarnTable(YarnList);
    fnClearYarnControls();
    $('#btnipitmupdate').hide();
    $('#btnipitmadd').show();




});
$(document).on('click', '.btnyarnremove', function () {
    rowindex = $(this).closest('tr').index();
    YarnList.splice(rowindex, 1);
    document.getElementById("tblinpdetails").deleteRow(rowindex + 1);
});

});


function loadYarnTable(list) {
    $('#tblinpdetails').DataTable().destroy();
    debugger;

    $('#tblinpdetails').DataTable({
        data: YarnList,
        "bSort": false,
        columns: [
            { title: "Sno", data: "YSNo" },
              { title: "FSno", data: "SNo" },
            { title: "Detid", data: "SFDetID", "visible": false },
                { title: "FItemid", data: "FabItemID" },
            { title: "Itemid", data: "YItemID", "visible": false },
             { title: "Item", data: "Yarn" },
               { title: "Sizeid", data: "SizeID", "visible": false },
             { title: "Size", data: "Size" },
               { title: "BColorid", data: "BColorID", "visible": false },
             { title: "Base Color", data: "BColor" },
               { title: "DColorid", data: "FColorID", "visible": false },
             { title: "Dye Color", data: "FColor" },
            
            { title: "Qty", data: "ProgramQty" },
            { title: "Grey PurQty", data: "BPurQty" },
            { title: "Dye PurQty", data: "FPurQty" },
            {
                title: "ACTION", "mDataProp": null,
                "sDefaultContent": '<div style="display:inline-flex"><button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnyarnremove btn btn-round btn-danger"> <i class="fa fa-times"></i> </button></div>'
            }
        ]
    });
}

function fnClearYarnControls() {
    $('#ddlIpItem').val('0');
    $('#ddlIpGColor').val('0');
    $('#txtIpQty').val('');
    $('#txtIpGreyQty').val('');
    $('#txtIpDyeQty').val('');
    $('#ddlIpDColor').val('0');
    $('#ddlIpSize').val('0');
    
}
/////////////////////////////////////////////////////////
function save() {

    debugger;

    if (FabList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }
          


    var objConSubmit = {

        //
        CompanyID: $('#txtHCompanyId').val(),
        CompanyUnitID: $('#txtCompUnitId').val(),
        Order_No: $('#txtOrderno').val(),
        Job_Ord_No: $('#txtJobNo').val(),    
       // EDate: new Date($('#txtEntryDate').val()),
        EDate: $('#txtEntryDate').val(),
        SamFabricItemDet: FabList,
        SamYarnItemDet: YarnList
    };
    LoadingSymb();
    $.ajax({
        url: "/SamplePlanningFabric/Add",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Data Saved Sucessfully");              
                window.location.href = "/PlanningMain/PlanningMainIndex";

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}

function getDate() {
    debugger;

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();


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
    $('#txtEntryDate').val(Fdatestring);


}

function Update() {

    debugger;

    if (FabList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }



    var objConSubmit = {

        //
        CompanyID: $('#txtHCompanyId').val(),
        CompanyUnitID: $('#txtCompUnitId').val(),
        Order_No: $('#txtOrderno').val(),
        Job_Ord_No: $('#txtJobNo').val(),
        EDate: $('#txtEntryDate').val(),//new Date($('#txtEntryDate').val()),

        SamFabricItemDet: FabList,
        SamYarnItemDet: YarnList
    };
    LoadingSymb();
    $.ajax({
        url: "/SamplePlanningFabric/Update",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Data Updated Sucessfully");
                window.location.href = "/PlanningMain/PlanningMainIndex";

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}
function Delete() {

    debugger;

    if (FabList.length == 0) {

        alert("Please Check Fabric Details..");
        return true;
    }



    var objConSubmit = {

        //
        CompanyID: $('#txtHCompanyId').val(),
        CompanyUnitID: $('#txtCompUnitId').val(),
        Order_No: $('#txtOrderno').val(),
        Job_Ord_No: $('#txtJobNo').val(),
        //EDate: new Date($('#txtEntryDate').val()),
        EDate: $('#txtEntryDate').val(),
        SamFabricItemDet: FabList,
        SamYarnItemDet: YarnList
    };
    LoadingSymb();
    $.ajax({
        url: "/SamplePlanningFabric/Delete",
        data: JSON.stringify(objConSubmit),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {

                alert("Data Deleted Sucessfully");
                window.location.href = "/PlanningMain/PlanningMainIndex";

            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });
}