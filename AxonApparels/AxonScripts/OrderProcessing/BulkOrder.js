var refNoDDL = "#";
var ordNoDDL = "#";
var tblname, ColName, CompanyID, Doc;
var supList = [];
var ItmList = [];
var SlNo = 0;
var SupSno = 0;
var SupId = 0;
var BuyMasId = 0;
var NItmList = [];
var GItemId = 0;
var Supp = 0;
var suppName = 0;
var Itemrowindex = -1;
var list = [];
var Gs = 0;
var GUserid = 0;
var UserName = 0;
var DCompid = 0;
var DCompUnitid = 0;
var MainFDate = 0;
var ConfigEmpId = 0;
var superuser = 0;
var OType = 0;
var OldQty = 0;
var repobj = [];
var RefN = '';
var AgentType = "";
var EnbTranDate = 0;
var Rev = 0;
var Roleid = 0;
var Menuid = 0;
var Submenuid = 0;
var rightsflg = 0;
var DEnbBuyDetails = 0;
var ChkRefno = true;
var ChkOrdno = true;
var DtChk = false;
var ChkBuyer = true;
var PlanLock = [];
var DispatchClosed = "N";

$(document).ready(function () {
    //GenerateNumber();
    debugger;
    //CheckRights("BulkOrder");
    GetDefault();

    GUserid = $("#hdnUserid").data('value');
    Roleid = $("#hdnRoleid").data('value');
    superuser = $("#hdnusername").data('value');
    UserName = $("#hdnusername").data('value');
    MainFDate = $("#hdMainFromDate").data('value');

    DCompid = $("#hdnDCompid").data('value');
    DCompUnitid = $("#hdnDCompUnitid").data('value');
    DEnbBuyDetails = $("#hdnCostBuyDetilsApp").data('value');
    //LoadCompanyDDL("#ddlMCompany");
    //$('#ddlMCompany').val(DCompid);

    if (EnbTranDate == "Y") {
        $("#dtOrderDate").prop("disabled", true);
        $("#dtRefDate").prop("disabled", true);
    } else {
        $("#dtOrderDate").prop("disabled", false);
        $("#dtRefDate").prop("disabled", false);
    }

    $('#txtFromDate').val(MainFDate);

    //if (Userid == null || Userid == "") {
    //    window.location.href = '/Login/LoginIndex';
    //}
    //else {
    LoadOrderNoDDL("#ddlCPOrderNo,#ddlParOrderNo");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    //LoadBuyerDDL("#ddlMBuyer");
    LoadCompanyDDL("#ddlMCompany,#ddlCompany");

    ///Want to check default comp,unit

    $('#ddlrevid').hide();
    //LoadCompanyDDL("#ddlMCompany");
    LoadGUomDDL("#ddlUom");
    LoadEmployeeDDL("#ddlManager,#ddlMerch");
    //LoadEmployeeDDL("#ddlMerch");

    //if (BuyMasId == 0) {

    LoadConsigneeDDL("#ddlConsignee");
    LoadAgentDDL("#ddlAgent");
    LoadSAgentDDL("#ddlShipAgent");
    LoadShipmodeDDL("#ddlShipMode");
    LoadShipsystemDDL("#ddlShipsystem");
    LoadPayTermsDDL("#ddlPayment");

    LoadShipmodeDDL("#ddlshipment");
    LoadShipsystemDDL("#ddlsystem");
    LoadPayTermsDDL("#ddlPayment2");
    LoadEmployeeDDL("#ddlManager2,#ddlMerch2");
    LoadCurrencyDDL("#ddlcurrency");
    LoadCountryDDL("#ddlPorddest");
    LoadPortOfLoadingDDL("#ddlPordload");


    //LoadQuotationNoDDL("#ddlQuoteNo");
    //}

    LoadBaseUnitAdd();
    //LoadGrid();

    getDate();
    //GetOrdNo();
    //GetRefNo();

    var Type = "Ord";

    var fill = localStorage.getItem('BulkOrderMenuFilter');
    if (fill != "null" && fill != null) {

        LoadMainGridFromBack(Type);
    } else {
        LoadMainGrid(Type);
    }

    if (superuser == "superuser") {

        if (GUserid == 0) {
            //alert("Configure Employee in Superuser..");
            var msg = 'Configure Employee in Superuser...';
            var flg = 4;
            var mod = 1;
            var url = "";
            AlartMessage(msg, flg, mod, url);
            return true;
        }
    }

    $('#tblSupdetails').on('keyup', 'tr', function () {

        var tr = $(this).closest("tr");
        var rowindexof = tr.index();
        Itemrowindex = rowindexof;
        //alert(Itemrowindex);
    });

    if (BuyMasId == 0) {
        $('#CList1').hide();
        $('#CList').hide();
    } else {
        $('#CList1').show();
        $('#CList').show();
    }
    //}
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

    $(document).on('click', '.btnaddbuyer', function () {
        debugger;
        Menuid = 24;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addbuyer();
        }

        //if (rightsflg == 1) {
        //    $('#BuyerID').val("");
        //    $('#Name').val("");
        //    $('#add1').val("");
        //    $('#add2').val("");
        //    $('#add3').val("");
        //    $('#ddlcity').empty();
        //    $('#zipcode').val("");
        //    $('#txtLookup').val("");
        //    $('#txtCountry').val("");
        //    $('#mobileno').val("");
        //    $('#Status').val("");

        //    $('#btnBuyerAdd').show();
        //    $('#BuyerID').css('border-color', 'lightgrey');
        //    $('#add1').css('border-color', 'lightgrey');
        //    $('#add2').css('border-color', 'lightgrey');
        //    $('#add3').css('border-color', 'lightgrey');
        //    $('#ddlcity').css('border-color', 'lightgrey');
        //    $('#Name').css('border-color', 'lightgrey');
        //    $('#zipcode').css('border-color', 'lightgrey');
        //    $('#mobileno').css('border-color', 'lightgrey');

        //    $('#Status').css('border-color', 'lightgrey');
        //    //$('#tbody').DataTable().destroy();
        //    LoadCityDDL("#ddlcity");
        //    $("#myModal3").modal('show');

        //}
        //else {
        //            alert("You don't have rights...");

        //        }
        //    } else {
        //        alert("You don't have rights...");

        //    }
        //    // $('#txtBuyAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);
        //    //$('#txtBuyAdd').val(obj.CityName + "," + obj.CountryName);

        //}
        // else {
        //        alert("You don't have rights...");

        //    }
        // }

        //});


        //$('#BuyerID').val("");
        //$('#Name').val("");
        //$('#add1').val("");
        //$('#add2').val("");
        //$('#add3').val("");
        //$('#ddlcity').empty();
        //$('#zipcode').val("");
        //$('#txtLookup').val("");
        //$('#txtCountry').val("");
        //$('#mobileno').val("");
        //$('#Status').val("");

        //$('#btnBuyerAdd').show();
        //$('#BuyerID').css('border-color', 'lightgrey');
        //$('#add1').css('border-color', 'lightgrey');
        //$('#add2').css('border-color', 'lightgrey');
        //$('#add3').css('border-color', 'lightgrey');
        //$('#ddlcity').css('border-color', 'lightgrey');
        //$('#Name').css('border-color', 'lightgrey');
        //$('#zipcode').css('border-color', 'lightgrey');
        //$('#mobileno').css('border-color', 'lightgrey');

        //$('#Status').css('border-color', 'lightgrey');
        ////$('#tbody').DataTable().destroy();
        //LoadCityDDL("#ddlcity");
        //$("#myModal3").modal('show');

    });
    $(document).on('click', '.btnaddconsignee', function () {
        debugger;
        Menuid = 25;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addconsignee();
        }

    });
    $(document).on('click', '.btnaddagent', function () {
        debugger;
        Menuid = 23;
        rightsflg = 0;
        AgentType = "B"
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addbuyeragent();
        }
    });
    $(document).on('click', '.btnaddshipagent', function () {
        debugger;
        Menuid = 23;
        rightsflg = 0;
        AgentType = "S"
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addshipagent();
        }
    });
    $(document).on('click', '.btnaddcompany', function () {
        debugger;
        Menuid = 18;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addexporter();
        }
    });
    $(document).on('click', '.btnadduom', function () {
        debugger;
        Menuid = 2440;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            adduom();
        }
    });
    $(document).on('click', '.btnaddemployee', function () {
        debugger;
        Menuid = 52;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addemployee();
        }
    });
    $(document).on('click', '.btnaddsystem', function () {
        debugger;
        Menuid = 1472;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addsystem();
        }
    });
    $(document).on('click', '.btnaddshipment', function () {
        debugger;
        Menuid = 1471;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addshipment();
        }
    });
    $(document).on('click', '.btnaddpayment', function () {
        debugger;
        Menuid = 1480;
        rightsflg = 0;
        if (superuser.toUpperCase() != "SUPERUSER") {
            Rolecheck();
        }
        else {
            rightsflg = 1;
            addpayment();
        }
    });




    $("#ddlBuyer").change(function () {
        if (DEnbBuyDetails == "Y") {
            debugger;
            var buyerid = this.value;
            if (buyerid > 0) {
                $.ajax({
                    url: "/Buyer/getbyID/" + buyerid,
                    typr: "GET",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    success: function (result) {
                        debugger;
                        var obj = result.Value;
                        // $('#ddlcurrency').val(obj.Currency).trigger('change');
                        $('#ddlShipsystem').val(obj.System).trigger('change');
                        $('#ddlShipMode').val(obj.Shipment).trigger('change');
                        $('#ddlPayment').val(obj.Paymode).trigger('change');
                        $('#ddlPordload').val(obj.PortLoad).trigger('change');
                        $('#ddlPorddest').val(obj.PortDestination).trigger('change');
                        //$('#txtAllowence').val(obj.Allowence);

                        if (obj.Manager == 0) {
                            $('#ddlManager').val("").trigger('change');
                        }
                        else {
                            $('#ddlManager').val(obj.Manager).trigger('change');
                        }
                        if (obj.Merch == 0) {
                            $('#ddlMerch').val("").trigger('change');
                        }
                        else {
                            $('#ddlMerch').val(obj.Merch).trigger('change');
                        }
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
            else {
                $('#ddlShipsystem').val(0).trigger('change');
                $('#ddlShipMode').val(0).trigger('change');
                $('#ddlPayment').val(0).trigger('change');
                $('#ddlManager').val("").trigger('change');
                $('#ddlMerch').val("").trigger('change');
                $('#ddlPordload').val(0).trigger('change');
                $('#ddlPorddest').val(0).trigger('change');
            }
        }
    });


    $(document).on('keyup', '#txtFromDate', function (e) {
        DtChk = true;
        LoadMainGrid(Gs);
    });
    $(document).on('keyup', '#txtToDate', function (e) {
        DtChk = true;
        LoadMainGrid(Gs);
    });
});

function termsvalidate() {
    var isValid = true;
    if ($('#termsName').val().trim() == "") {
        $('#termsName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#termsName').css('border-color', 'lightgrey');
    }

    return isValid;
}
function TermsAdd() {

    var ischecked = false;
    var res = termsvalidate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        ischecked = $('#termsStatus').is(":checked");

    });
    var payObj = {
        PaymentTermsId: $('#PaymentTermsID').val(),
        PaymentTermsName: $('#termsName').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/PaymentTerms/Add",
        data: JSON.stringify(payObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given PaymentTerms is Already Available...');
                var msg = 'Given PaymentTerms is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {
                $('#myModal11').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                LoadPayTermsDDL('#ddlPayment');
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function modevalidate() {
    var isValid = true;
    if ($('#modeName').val().trim() == "") {
        $('#modeName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#modeName').css('border-color', 'lightgrey');
    }

    return isValid;
}
function ModeAdd() {
    var isAct = false;
    var res = modevalidate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    $(":checkbox").each(function () {
        var ischecked = $('#modeStatus').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = true;
        }
        else {
            checkbox_value += "off";
        }
    });
    var freeOrcharge = $('input[name="FreeOrCharge"]:checked').attr('value');
    var shipmodeObj = {
        ShipmentModeId: $('#ShipementModeID').val(),
        ShipementMode: $('#modeName').val(),
        IsActive: isAct,
    };
    $.ajax({
        url: "/ShipmentMode/Add",
        data: JSON.stringify(shipmodeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given ShipmentMode is Already Available...');
                var msg = 'Given ShipmentMode is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {

                $('#myModal10').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                LoadShipmodeDDL('#ddlShipMode');
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function shipvalidate() {
    var isValid = true;
    if ($('#shipName').val().trim() == "") {
        $('#shipName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#shipName').css('border-color', 'lightgrey');
    }



    return isValid;
}
function ShipAdd() {
    var isAct = false;
    var res = shipvalidate();
    if (res == false) {
        return false;
    }
    var checkbox_value = "";
    debugger;
    $(":checkbox").each(function () {
        var ischecked = $('#shipStatus').is(":checked");
        if (ischecked) {
            checkbox_value += "on";
            isAct = true;
        }
        else {
            checkbox_value += "off";
        }
    });

    var freeOrcharge = $('input[name="FreeOrCharge"]:checked').attr('value');
    var shipsystemObj = {
        SystemId: $('#ShipmentSystemID').val(),
        System: $('#shipName').val(),
        FreeOrCharge: freeOrcharge,
        IsActive: isAct,

    };
    $.ajax({
        url: "/ShipmentSystem/Add",
        data: JSON.stringify(shipsystemObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given ShipmentSystem is Already Available...');
                var msg = 'Given ShipmentSystem is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {
                $('#myModal9').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                LoadShipsystemDDL('#ddlShipsystem');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Valdidation using jquery
function empvalidate() {
    var isValid = true;
    if ($('#txtName').val() == "") {
        $('#txtName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtName').css('border-color', 'lightgrey');
    }

    if ($('#txtempno').val() == "") {
        $('#txtempno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtempno').css('border-color', 'lightgrey');
    }


    var EmailId = $("#txtEmail").val();

    if ($.trim(EmailId).length > 0) {
        if (validateEmailAddress(EmailId)) {
            $('#txtempEmail').css('border-color', 'lightgrey');
        }
        else {
            //alert('Invalid Email Address.');
            var msg = 'Invalid Email Address...';
            var flg = 4;
            var md = 1;
            var ul = "";
            AlartMessage(msg, flg, md, ul);
            $('#txtempEmail').css('border-color', 'Red');
            isValid = false;
        }
    }
    else {
        $('#txtempEmail').css('border-color', 'lightgrey');
    }

    var a = $("#txtPhoneNo").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#txtPhoneNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPhoneNo').css('border-color', 'lightgrey');
    }

    var email = $("#txtempEmail").val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) {
        $('#txtempEmail').css('border-color', 'lightgrey');
    }
    else {
        $('#txtempEmail').css('border-color', 'Red');
        isValid = false;
    }

    return isValid;
}


//Add Data Function 
function EmpAdd() {
    var res = empvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    // var isStatuschecked = false;
    var isPieceRateChecked = false;
    var isProdEmpChecked = false;
    var isRelieved = false;
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#empStatus').is(":checked");
        isPieceRateChecked = $('#chkPieceRate').is(":checked");
        isProdEmpChecked = $('#chkprodemp').is(":checked");
        isRelieved = $('#chkrlvd').is(":checked");
    });

    var EmpObj = {
        EmpId: $('#txtEmployeeID').val(),
        EmpName: $('#txtName').val(),
        EmpNo: $('#txtempno').val(),
        Address1: $('#txtAdd1').val(),
        Address2: $('#txtAdd2').val(),
        Address3: $('#txtAdd3').val(),
        CompanyUnit: $('#ddlCompanyUnit').val(),
        DepartmentId: $('#ddlDepartment').val(),
        DesignationId: $('#ddlDesignation').val(),
        CityId: $('#ddlCity').val(),
        Email: $('#txtempEmail').val(),
        PhoneNo: $('#txtPhoneNo').val(),
        PieceRate: isPieceRateChecked,
        ProdEmployee: isProdEmpChecked,
        Relieved: isRelieved,
        IsActive: ischecked,
    };
    $.ajax({
        url: "/Employee/Add",
        data: JSON.stringify(EmpObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Employee is Already Available...');
                var msg = 'Given Employee is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {

                $('#myModal8').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                LoadEmployeeDDL('#ddlManager,#ddlMerch');
            }
            // clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function garvalidate() {
    var isValid = true;
    if ($('#txtGUom').val() == "") {
        $('#txtGUom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtGUom').css('border-color', 'lightgrey');
    }

    return isValid;
}


function GarAdd() {
    var res = garvalidate();
    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#garStatus').is(":checked");
    });
    debugger;
    var GarmObj = {
        GUomId: $('#txtGUomID').val(),
        GUom: $('#txtGUom').val(),
        GUom_Lookup: $('#txtGUomLookUp').val(),
        To_BUom: $('#txtToBUom').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: '/GarmentUom/Add/',
        data: JSON.stringify(GarmObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given GarmentUom is Already Available...');
                var msg = 'Given GarmentUom is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {

                $('#myModal7').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                LoadGUomDDL('#ddlUom');

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function compvalidate() {
    var isValid = true;
    if ($('#compName').val().trim() == "") {
        $('#compName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#compName').css('border-color', 'lightgrey');
    }

    if ($('#complookup').val().trim() == "") {
        $('#compName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#compName').css('border-color', 'lightgrey');
    }

    if ($('#mobno').val().trim() == "") {
        $('#mobno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobno').css('border-color', 'lightgrey');
    }

    if ($('#compadd1').val().trim() == "") {
        $('#compadd1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#compadd1').css('border-color', 'lightgrey');
    }
    if ($('#prefix').val().trim() == "") {
        $('#prefix').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#prefix').css('border-color', 'lightgrey');
    }

    if ($('#ddlcountry').val() == 0) {
        $('#ddlcountry').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcountry').css('border-color', 'lightgrey');
    }
    if ($('#ddlcompcity').val() == 0) {
        $('#ddlcompcity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcompcity').css('border-color', 'lightgrey');
    }


    var a = $("#mobno").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#mobno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobno').css('border-color', 'lightgrey');
    }

    var z = $("#compzipcode").val();
    if (z.length >= 8) {
        $('#compzipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#compzipcode').css('border-color', 'lightgrey');
    }

    var email = $("#email").val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) {
        $('#email').css('border-color', 'lightgrey');
    }
    else {
        $('#email').css('border-color', 'Red');
        isValid = false;
    }

    return isValid;
}

function CompAdd() {

    var res = compvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;
    $(":checkbox").each(function () {
        ischecked = $('#compStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var CompanyObj = {
        CompanyId: $('#CompanyId').val(),
        CompanyName: $('#compName').val(),
        Address1: $('#compadd1').val(),
        Address2: $('#compadd2').val(),
        Address3: $('#compadd3').val(),
        CityId: $('#ddlcompcity').val(),
        CountryId: $('#ddlcountry').val(),
        Zipcode: $('#compzipcode').val(),
        Fax: $('#fax').val(),
        Status: $('#compStatus').val(),
        Email: $('#email').val(),
        cstno: $('#cstno').val(),
        //new Date($('#txtdate').val())
        // cstdate: new Date($('#cstdate').val()),
        cstdate: $('#cstdate').val(),
        TinNo: $('#tinno').val(),
        TinDate: $('#tindate').val(),//new Date($('#tindate').val()),
        ContactName: $('#compcontactname').val(),
        MobNo: $('#mobno').val(),
        Complookup: $('#complookup').val(),
        Fax: $('#fax').val(),
        Telex: $('#telex').val(),
        Rbi_code_num: $('#rbicode').val(),
        Prefix: $('#prefix').val(),
        LogoName: $('#logoname').val(),
        RCMC_No: $('#rcmcno').val(),
        EAN_No: $('#eanno').val(),
        Range: $('#range').val(),
        Division: $('#division').val(),
        AEPC_No: $('#aepcno').val(),
        AEPC_Date: $('#aepcdate').val(),//new Date($('#aepcdate').val()),
        IEC_No: $('#iecno').val(),
        IE_code: $('#iecode').val(),
        TNGST_No: $('#tngstno').val(),
        IsActive: ischecked,

    };
    $.ajax({
        url: "/Company/Add",
        data: JSON.stringify(CompanyObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            } else if (result.Value == -1) {
                //alert('Given Company is Already Available...');
                var msg = 'Given Company is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {

                $('#myModal6').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                //LoadCompanyDDL("#ddlCompany");
            }

            //clearTextBox();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Add Data Function 
function AgentAdd() {
    var res = agentvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#agentStatus').is(":checked");
        //if (ischecked) {
        //    checkbox_value += "on";
        //}
        //else {
        //    checkbox_value += "off";
        //}
    });

    var agentObj = {
        // AgentId: $('#AgentID').val(),
        AgentName: $('#agentName').val(),
        Address1: $('#agentadd1').val(),
        Address2: $('#agentadd2').val(),
        Address3: $('#agentadd3').val(),
        CityId: $('#ddlagentcity').val(),
        Zipcode: $('#agentzipcode').val(),
        Type: AgentType,
        ContactName: $('#contactname').val(),
        CountryId: $('#txtagentCountryId').val(),
        MobNo: $('#mobileno').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/Agent/Add",
        data: JSON.stringify(agentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Agent is Already Available...');
                var msg = 'Given Agent is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {

                $('#myModal5').modal('hide');
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                LoadAgentDDL('#ddlAgent');
                LoadSAgentDDL("#ddlShipAgent");
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Valdidation using jquery
function agentvalidate() {
    debugger;
    var isValid = true;
    if ($('#agentName').val().trim() == "") {
        $('#agentName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#agentName').css('border-color', 'lightgrey');
    }

    if ($('#mobileno').val().trim() == "") {
        $('#mobileno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobileno').css('border-color', 'lightgrey');

    }
    if ($('#contactname').val().trim() == "") {
        $('#contactname').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#contactname').css('border-color', 'lightgrey');
    }
    if ($('#ddlagentType').val() == 0) {
        $('#ddlagentType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlagentType').css('border-color', 'lightgrey');
    }
    //if ($('#ddlcity').val() == 0) {

    var a = $("#mobileno").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#mobileno').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#mobileno').css('border-color', 'lightgrey');
    }
    var z = $("#agentzipcode").val();
    if (z.length >= 8) {
        $('#agentzipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#agentzipcode').css('border-color', 'lightgrey');
    }
    return isValid;
}

//Add Data Function 
function BuyAdd() {
    var res = buyvalidate();
    if (res == false) {
        return false;
    }
    debugger;
    var checkbox_value = "";
    var ischecked = false;

    $(":checkbox").each(function () {
        ischecked = $('#Status').is(":checked");
    });

    var BuyerObj = {
        BuyerId: $('#BuyerID').val(),
        BuyerName: $('#Name').val(),
        Address1: $('#add1').val(),
        Address2: $('#add2').val(),
        Address3: $('#add3').val(),
        CityId: $('#ddlcity').val(),
        Mobile: $('#mobileno').val(),
        Zipcode: $('#zipcode').val(),
        ContPerson: $('#txtConPer').val(),
        Designation: $('#txtDes').val(),
        Phone: $('#txtPhone').val(),
        Email: $('#txtEmail').val(),
        LookUp: $('#txtLookup').val(),
        CountryId: $('#txtCountryId').val(),
        IsActive: ischecked,

        Currency: $('#ddlcurrency').val(),
        System: $('#ddlsystem').val(),
        Shipment: $('#ddlshipment').val(),
        Paymode: $('#ddlPayment2').val(),
        Manager: $('#ddlManager2').val(),
        Merch: $('#ddlMerch2').val(),
        PortLoad: $('#ddlPordload').val(),
        PortDestination: $('#ddlPorddest').val(),
        Allowence: $('#txtAllowence').val(),
    };
    $.ajax({
        url: "/Buyer/Add",
        data: JSON.stringify(BuyerObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else if (result.Value == -1) {
                //alert('Given Buyer is Already Available...');
                var msg = 'Given Buyer is Already Available...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                return true;
            }
            else {

                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                $('#myModal3').modal('hide');
                LoadBuyerDDL("#ddlBuyer");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function buyvalidate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#txtLookup').val().trim() == "") {
        $('#txtLookup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtLookup').css('border-color', 'lightgrey');
    }

    if ($('#ddlcity').val() == 0) {
        $('#ddlcity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ddlcity').css('border-color', 'lightgrey');
    }

    if ($('#txtPhone').val() != "") {

        if ($('#txtPhone').val().trim() == "") {
            $('#txtPhone').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#txtPhone').css('border-color', 'lightgrey');
        }
    }

    var a = $("#txtPhone").val();
    //var filter = /^\d{15}$/;
    if (a.length >= 15) {
        $('#txtPhone').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtPhone').css('border-color', 'lightgrey');
    }

    var z = $("#zipcode").val();
    if (z.length >= 8) {
        $('#zipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#zipcode').css('border-color', 'lightgrey');
    }

    var email = $("#txtEmail").val();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)) {
        $('#txtEmail').css('border-color', 'lightgrey');
    }
    else {
        $('#txtEmail').css('border-color', 'Red');
        isValid = false;
    }
    return isValid;

}

function LoadcompCountry() {
    $('#txtcompCountry').val("");

    var CityID = $('#ddlcompcity').val();

    $.ajax({
        url: "/Company/GetCountDetails",
        data: JSON.stringify({ CityId: CityID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (obj != undefined) {

                $('#txtcompCountry').val(obj[0]["CountryName"]);
                $('#ddlcountry').val(obj[0]["CountryId"]);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}
function agentLoadCountry() {

    $('#txtagentCountry').val("");

    var CityID = $('#ddlagentcity').val();

    $.ajax({
        url: "/Company/GetCountDetails",
        data: JSON.stringify({ CityId: CityID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (obj != undefined) {

                $('#txtagentCountry').val(obj[0]["CountryName"]);
                $('#txtagentCountryId').val(obj[0]["CountryId"]);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function LoadCountry() {

    $('#txtCountry').val("");

    var CityID = $('#ddlcity').val();

    $.ajax({
        url: "/Company/GetCountDetails",
        data: JSON.stringify({ CityId: CityID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (obj != undefined) {

                $('#txtCountry').val(obj[0]["CountryName"]);
                $('#txtCountryId').val(obj[0]["CountryId"]);

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//Add Data Function 
function ConsAdd() {
    debugger;
    var res = consvalidate();
    if (res == false) {
        return false;
    }

    var checkbox_value = "";
    var ischecked = false;
    debugger;
    $(":checkbox").each(function () {
        ischecked = $('#conStatus').is(":checked");
        ////if (ischecked) {
        ////    checkbox_value += "on";
        ////}
        ////else {
        ////    checkbox_value += "off";
        ////}
    });

    var ConsigneeObj = {
        ConsigneeId: $('#ConsigneeID').val(),
        ConsigneeName: $('#conName').val(),
        Address1: $('#conadd1').val(),
        Address2: $('#conadd2').val(),
        Address3: $('#conadd3').val(),
        CityId: $('#ddlconscity').val(),
        Zipcode: $('#conzipcode').val(),
        Remarks: $('#remarks').val(),
        LookUp: $('#lookup').val(),
        IsActive: ischecked,
    };
    $.ajax({
        url: "/Consignee/Add",
        data: JSON.stringify(ConsigneeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            if (result.Value == 0) {
                window.location.href = "/Error/Index";
            }
            else {
                //alert('Data Saved Successfully');
                var msg = 'Data Saved Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                $('#myModal4').modal('hide');
                LoadConsigneeDDL('#ddlConsignee');

            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Valdidation using jquery
function consvalidate() {
    var isValid = true;
    if ($('#conName').val().trim() == "") {
        $('#conName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#conName').css('border-color', 'lightgrey');
    }

    if ($('#lookup').val().trim() == "") {
        $('#lookup').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#lookup').css('border-color', 'lightgrey');
    }
    if ($('#conadd1').val().trim() == "") {
        $('#conadd1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#conadd1').css('border-color', 'lightgrey');
    }
    if ($('#conzipcode').val().trim() == "") {
        $('#conzipcode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#conzipcode').css('border-color', 'lightgrey');
    }
    //citydropdown = $('#ddlcity');
    //if (citydropdown.length == 0 || $(citydropdown).val() == "") {
    //    $('#ddlcity').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#ddlcity').css('border-color', 'lightgrey');
    //}
    var z = $("#conzipcode").val();
    if (z.length >= 8) {
        $('#conzipcode').css('border-color', 'Red');
        isValid = false;
    }
    return isValid;
}
function GetDefault() {

    var MisSetId = 0;


    $.ajax({
        url: "/MISSetting/GetDefaultDetails",
        data: JSON.stringify({ MisId: MisSetId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.value;
            debugger;
            if (obj != undefined) {

                var DCompId = obj[0]["dCompanyId"];
                var DCompUnitId = obj[0]["dCompanyUnitId"];
                //$('#txtMainFDays').val(obj[0]["FromDays"]);
                //window.location.href = "/BulkOrder/BulkOrderIndex?UserId=" + UserId + "=&UserName=" + UserName;
                //window.location.href = "/BulkOrder/BulkOrderIndex";

            }
            else {

            }
        }
    });
}


function LoadBuyerAdd() {
    debugger;
    $('#txtBuyAdd').val("");
    var BuyID = $('#ddlBuyer').val();

    $.ajax({
        url: "/Buyer/GetbyId/" + BuyID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);
                //$('#txtBuyAdd').val(obj.CityName + "," + obj.CountryName);

            }
        }

    });

}

var table, column, compId, Docum;

function GenerateNumber(table, column, compId, Docum) {


    debugger;

    if (OType == "B") {

        table = "Buy_Ord_Mas",
        column = "Order_no",
        //  compId = $('#ddlCompany').val(),
         compId = $('#ddlCompany').val();

        if (compId == null) {
            compId = DCompid;
        } else {
            compId = $('#ddlCompany').val();
        }

        Docum = 'BUYER ORDER'
    } else if (OType == "S") {

        table = "Buy_Ord_Mas",
        column = "Order_no",
        //  compId = $('#ddlCompany').val(),
          compId = $('#ddlCompany').val();

        if (compId == null) {
            compId = DCompid;
        } else {
            compId = $('#ddlCompany').val();
        }
        Docum = 'SAMPLE ORDER'
    } else if (OType == "D") {

        table = "Buy_Ord_Mas",
        column = "Order_no",
        //compId = $('#ddlCompany').val(),
          compId = $('#ddlCompany').val();

        if (compId == null) {
            compId = DCompid;
        } else {
            compId = $('#ddlCompany').val();
        }
        Docum = 'DOMESTIC ORDER'
    }

    $.ajax({
        url: "/BulkOrder/GenerateNo",
        data: JSON.stringify({ tblname: table, ColName: column, CompanyID: compId, Doc: Docum }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $('#txtOrderNo').val(result.Value);
        }
    });


    LoadCurrencyRate();
}


function LoadGarmConAdd() {
    debugger;
    $('#txtGarmentConID').val("");
    var GUId = $('#ddlUom').val();

    $.ajax({
        url: "/GarmentUom/GetByID/" + GUId,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtGarmentConID').val(obj.To_BUom);

            }
        }

    });

}

function LoadConAdd() {

    $('#txtConAdd').val("");
    var ConID = $('#ddlConsignee').val();

    $.ajax({
        url: "/Consignee/GetbyId/" + ConID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtConAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}

function LoadBuyAgAdd() {

    $('#txtBuyAgAdd').val("");
    var BuyAgID = $('#ddlAgent').val();

    $.ajax({
        url: "/Agent/GetbyId/" + BuyAgID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadShipAgAdd() {

    $('#txtShipAgAdd').val("");
    var ShipAgID = $('#ddlShipAgent').val();

    $.ajax({
        url: "/Agent/GetbyId/" + ShipAgID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtShipAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });

}
function LoadBaseUnitAdd() {
    //   var ShipAgID = $('#ddlShipAgent').val();
    debugger;
    $.ajax({
        url: "/GarmentUom/GetBaseUom/",
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                debugger;
                //var test= obj.GUom;
                //alert(val(obj.GUom));
                $('#txtbasunit').val("PCS");

                $('#txtbasunitID').val("1");

            }
        }

    });

}

function LoadRefNoDDL(RefDDLName) {
    refNoDDL = RefDDLName;
    httpGet("/BulkOrder/GetRefNo", onRefNoSuccess, onRefNoFailure);
}

function LoadOrdNoDDL(OrdNoDDL) {
    ordNoDDL = OrdNoDDL;
    httpGet("/BulkOrder/GetOrderNo", onOrdNoSuccess, onOrdNoFailure);
}

function CheckCpyRefNo() {
    debugger;
    var RefNo = $('#txtRefNo').val();

    var isValid = true;
    $.ajax({
        url: "/BulkOrder/CheckRefno",
        data: JSON.stringify({ Ref_No: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                var RefNo = obj.Ref_No;
                RefN = obj.RefNo;
                if (RefNo != null) {
                    //alert("RefNo Already Exists...");
                    var msg = 'RefNo Already Exists...';
                    var flg = 4;
                    var md = 1;
                    var ul = "";
                    AlartMessage(msg, flg, md, ul);
                    $('#txtRefNo').val("");
                    $('#txtRefNo').focus();
                    isValid = false;
                }
                else {
                    isValid = true;
                }

            }

        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    return isValid;
}
function Add() {
    debugger;
    if (superuser == "superuser") {

        if (GUserid == 0) {
            //alert("Configure Employee in Superuser..");
            var msg = 'Configure Employee in Superuser...';
            var flg = 4;
            var md = 1;
            var ul = "";
            AlartMessage(msg, flg, md, ul);
            return true;
        }
    }
    // CheckRefNo();

    var oldordno = $('#txtOrderNo').val();
    GenerateNumber();
    var newordno = $('#txtOrderNo').val();
    if (oldordno != newordno) {
        //alert('OrderNo has been changed...');
        var msg = 'Order Number has been changed...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }

    var QuoteNo = $('#ddlQuoteNo').val();

    //if (QuoteNo == 0) {
    //    alert("Please Link Quotation Number..");
    //    return true;
    //    $('#ddlQuoteNo').focus();
    //}


    var res = validate();
    if (res == false) {
        return false;
    }

    var FQuoId = 0;
    if ($('#chk').is(":checked")) {
        var FQuoId = $('#ddlRevised').val();

    } else {
        var FQuoId = $('#ddlQuoteNo').val();
    }


    var ptype = $('input[name="PAType"]:checked').attr('value');
    var chkrev = $('input[name="revchk"]:checked').attr('value');

    var OPost = $('input[name="ordpostchk"]:checked').attr('value');
    var PPost = $('input[name="planpostchk"]:checked').attr('value');

    if (chkrev == "R") {
        chkrev = "R";
    } else {
        chkrev = "N"
    }
    var bukmasObj = {
        SeasonId: $('#ddlSeason').val(),
        ShipSystemId: $('ddlShipsystem').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        Order_Date: $('#dtOrderDate').val(),
        Order_No: $('#txtOrderNo').val(),
        buyerid: $('#ddlBuyer').val(),
        Buyer_Addid: $('#ddlBuyer').val(),
        Managerid: $('#ddlManager').val(),
        Merchandiserid: $('#ddlMerch').val(),
        Ref_no: $('#txtRefNo').val(),
        Ref_date: $('#dtRefDate').val(),
        //Ref_date: new Date($('#dtRefDate').val()),
        Pay_Systemid: $('#ddlPayment').val(),
        Systemid: $('#ddlShipsystem').val(),
        Payment_Modeid: $('#ddlShipMode').val(),
        AgentId: $('#ddlAgent').val(),
        agent_addid: $('#ddlAgent').val(),
        Shipagentid: $('#ddlShipAgent').val(),
        Shipagent_addid: $('#ddlShipAgent').val(),
        CurrencyId: null,
        Exchange: 1.0000,
        EnquiryId: $('#ddlenquiryno').val(),
        Cancel: 0,
        Comit: 0,
        Closed: "N",
        CloseDate: $('#dtOrderDate').val(),
        //CloseDate: new Date($('#dtOrderDate').val()),
        companyid: $('#ddlCompany').val(),
        Cost_def: "N",
        quantity: $('#txtQty').val(),
        GUOMid: $('#ddlUom').val(),
        GUOM_Conv: $('#txtGarmentConID').val(),
        Agency_Per: null,
        Bas_Unit: $('#ddlUom').val(),
        remarks: null,
        ClaimType: "R",
        NominatedForwarder: "N",
        CSP: "N",
        Buyer_Ref_No: $('#txtBuyRefNo').val(),
        TransAmend: "N",
        ConsigneeId: $('#ddlConsignee').val(),
        CreatedBy: GUserid,
        OrdType: $('#ddlOrderType').val(),
        Consignee_AddID: $('#ddlConsignee').val(),
        NSupplier: NItmList,
        ParentOrdId: $('#ddlParOrderNo').val(),
        QuoteId: $('#ddlQuoteNo').val(),
        RevQuoteId: $('#ddlRevised').val(),
        RevQuoteNo: $('#ddlRevised option:selected').text(),
        PA: ptype,
        Rev: chkrev,
        OrdPost: OPost,
        PlanPost: PPost,
        FOrderNo: $('#ddlCPOrderNo option:selected').text(),
    };
    $("#btnAdd").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BulkOrder/Add",
        data: JSON.stringify(bukmasObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.Value == true) {
                //AddUserEntryLog('Master', 'BulkOrder', 'ADD', $('#Name').val());
                // $('#tMbody').DataTable().destroy();
                //loadData();


                LoadOrderProcessingData();
                $('#myModal1').modal('hide');


                $('#ddlShipMode').val("");
                $('#ddlShipsystem').val("");
                $('#ddlPayment').val("");
                $('#txtRefNo').val("");
                $('#txtQty').val("");
                $('#txtShipAgAdd').val("");
                $('#txtBuyAgAdd').val("");
                $('#txtConAdd').val("");
                $('#txtBuyAdd').val("");
                $('#txtBuyRefNo').val("");
                $('#ddlOrderNo').val("");
                debugger;
                AddUserEntryLog('SalesManagement', 'Order Processing', 'ADD', $('#txtOrderNo').val());
                //alert('Data Saved Successfully');
                //window.location.reload();
                var msg = 'Data Saved Successfully...';
                var flg = 4;
                var md = 0;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
            } else {

                window.location.href = "/Error/Index";

            }

        },
        error: function (errormessage) {
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

    //alert(MainFDate + "1getdate");
    $('#txtFromDate').val(MainFDate);
    $('#txtToDate').val(Fdatestring);
    $('#dtOrderDate').val(Fdatestring);
    $('#dtRefDate').val(Fdatestring);

}
function AddNom() {


    var nomObj = {
        SupplierId: $('#ddlSupplier').val(),
        ItemId: $('#ddlItem').val(),
        NSOrderNo: $('#txtOrderNo').val(),
    };
    $.ajax({
        url: "/BulkOrder/AddNom",
        data: JSON.stringify(nomObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //   $('#tbody').DataTable().destroy();
            // loadData();
            $('#myModal').modal('hide');
            $('#ddlSupplier').val("");
            $('#ddlItem').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearTextBox() {



    $('#ddlItem').val("");
    $('#ddlSupplier').val("");
    $('#ddlManager').val("");
    $('#ddlMerch').val("");
    $('#ddlShipMode').val("");
    $('#ddlShipsystem').val("");
    $('#ddlPayment').val("");
    $('#ddlConsignee').val("");
    $('#ddlBuyer').val("");
    $('#ddlUom').val("");
    //$('#ddlCompany').val("");
    $('#ddlAgent').val("");
    $('#ddlItem').css('border-color', 'lightgrey');
    $('#ddlSupplier').css('border-color', 'lightgrey');
    $('#txtShipAgAdd').val("");
    $('#txtBuyAgAdd').val("");
    $('#txtConAdd').val("");
    $('#txtBuyAdd').val("");
    LoadOrderPrefix();
    LoadShipmodeDDL("#ddlShipMode");
    LoadShipsystemDDL("#ddlShipsystem");
    LoadPayTermsDDL("#ddlPayment");
    LoadBuyerDDL("#ddlBuyer,#ddlMBuyer");
    //LoadBuyerDDL("#ddlMBuyer");
    //LoadCompanyDDL("#ddlCompany");
    //LoadCompanyDDL("#ddlMCompany");
    LoadGUomDDL("#ddlUom");
    //LoadEmployeeDDL("#ddlManager,#ddlMerch");
    //LoadEmployeeDDL("#ddlMerch");
    LoadConsigneeDDL("#ddlConsignee");
    LoadAgentDDL("#ddlAgent");
    LoadSAgentDDL("#ddlShipAgent");
    LoadSupplierDDL("#ddlSupp");

    //LoadSupplierDDL("#ddlSuppTest");
    // LoadSupplierDDL("#ddlSuppTest,#ddlSuppTest1");
    LoadAccessoryItemDDL("#ddlIm");
    //LoadEmployeeDDL("#ddlManager");
    LoadEnquiryDDL("#ddlenquiryno");
    $('#ddlErevid').hide();

}



function loadData(BMasId) {




    debugger;

    $.ajax({
        url: "/BulkOrder/ListNomSuppDetails",
        data: JSON.stringify({ Buy_Ord_MasId: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            supList = result;
            loadSuppTable(supList);

            if (supList.length > 0) {
                $('#nom_model').show();
                var Sup = supList[0].Supplier;
                //var Sup = "";
                loadSuppItemData(Sup);
            }


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}



function loadSuppItemData(SupName) {
    debugger;
    var BMasId = $('#txtBuyOrdMasID').val();
    var SuppName = "";
    $.ajax({
        url: "/BulkOrder/ListNomSuppItemDetails",
        data: JSON.stringify({ Supplier: SupName, Buy_Ord_MasId: BMasId }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            ItmList = result;
            loadItemTable(ItmList);


        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadGrid() {


    $.ajax({
        type: "GET",
        url: '/BulkOrder/ListDetails/',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");
            $('#tMbody').DataTable({
                data: dataSet,

                columns: [
                         { title: "BuyOrdMasId", "visible": false },
                         { title: "ORDER NO" },
                         { title: "REF NO" },
                         { title: "DATE" },
                         { title: "QUANTITY" },
                         { title: "ACTION" },
                ]

            });
            //$(document).ready(function () {
            //    var table = $('#tMbody').DataTable();

            //    $('#tMbody tbody').on('click', 'tr', function () {
            //        if ($(this).hasClass('selected')) {
            //            $(this).removeClass('selected');
            //        }
            //        else {
            //            table.$('tr.selected').removeClass('selected');
            //            $(this).addClass('selected');
            //        }
            //    });


            //});

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCpyOrderNo() {
    debugger;
    var mid = $("#ddlCPOrderNo").val();
    if (mid != 0) {
        $('#ddlItem').val("");
        $('#ddlSupplier').val("");
        $('#ddlManager').val("");
        $('#ddlMerch').val("");
        $('#ddlShipMode').val("");
        $('#ddlShipsystem').val("");
        $('#ddlPayment').val("");
        $('#ddlConsignee').val("");
        $('#ddlBuyer').val("");
        $('#ddlUom').val("");
        $('#ddlCompany').val("");
        $('#ddlAgent').val("");
        $('#ddlItem').css('border-color', 'lightgrey');
        $('#ddlSupplier').css('border-color', 'lightgrey');
        $('#txtShipAgAdd').val("");
        $('#txtBuyAgAdd').val("");
        $('#txtConAdd').val("");
        $('#txtBuyAdd').val("");
        getbyCpyID(mid);
    }
    else {
        //alert('Please Select any OrderNo...');
        var msg = 'Please Select any Order Number...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}


function getbyCpyID(MasID) {
    debugger;
    LoadSupplierDDL("#ddlSupp");
    LoadAccessoryItemDDL("#ddlIm");

    $.ajax({
        url: "/BulkOrder/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                //$('#txtQty').val(obj.Quantity);
                $('#txtOldQty').val(obj.Quantity);
                $('#txtBuyOrdMasID').val(obj.Buy_Ord_MasId);
                // $('#txtOrderNo').val(obj.Order_No);

                $('#ddlShipMode').val(obj.Payment_ModeId).trigger('change');
                $('#ddlShipsystem').val(obj.SystemId).trigger('change');
                $('#ddlPayment').val(obj.Pay_SystemId).trigger('change');
                //
                $('#ddlAgent').val(obj.AgentId).trigger('change');
                $('#ddlConsignee').val(obj.ConsigneeId).trigger('change');
                $('#ddlMerch').val(obj.MerchandiserId).trigger('change');
                $('#ddlManager').val(obj.ManagerId).trigger('change');
                $('#ddlCompany').val(obj.CompanyId).trigger('change');
                $('#ddlSeason').val(obj.SeasonId).trigger('change');
                $('#ddlShipAgent').val(obj.ShipAgentId).trigger('change');
                $('#ddlBuyer').val(obj.BuyerId).trigger('change');
                $('#ddlUom').val(obj.GuomId).trigger('change');
                $('#ddlOrderType').val(obj.OrdType).trigger('change');
                $('#ddlQuoteNo').val(obj.QuoteId).trigger('change');

                OType = $('#ddlOrderType').val();
                //
                $('#txtBuyRefNo').val(obj.Buyer_Ref_No);
                //$('#dtOrderDate').val(moment(obj.Order_Date).format('DD/MM/YYYY'));
                //$('#dtRefDate').val(moment(obj.Ref_Date).format('DD/MM/YYYY'));
                //$('#txtRefNo').val(obj.Ref_No);

                var buyerid = $('#ddlBuyer').val();
                var AgnID = $('#ddlAgent').val();
                var ConID = $('#ddlConsignee').val();
                var ShipAgnID = $('#ddlShipAgent').val();
                var GUomID = $('#ddlUom').val();
                var BMasId = $('#txtBuyOrdMasID').val();
                OldQty = $('#txtOldQty').val();

                BuyMasId = BMasId;
                GenerateNumber();
                LoadBuyerEditAdd(buyerid);
                if (AgnID > 0) {
                    LoadAgnEditAdd(AgnID);
                }
                if (ConID > 0) {
                    LoadConEditAdd(ConID);
                }
                if (ShipAgnID > 0) {
                    LoadShipAgnEditAdd(ShipAgnID);
                }
                LoadGUomEditAdd(GUomID);
                //

                // alert(BuyMasId);

                if (BuyMasId == 0) {
                    $('#CList1').hide();
                    $('#CList').hide();
                } else {
                    $('#CList1').show();
                    $('#CList').show();
                }

                //LoadCheckBomJobDetails();

                LoadFullData();
                loadData(BMasId);

            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
}

function getbyID(MasID, BApproved) {
    debugger;
    if (superuser != "superuser") {
        if (BApproved == 1) {
            //alert("This order has been Approved,Please Contact Administrator..");
            var msg = 'This order has been Approved,Please Contact Administrator...';
            var flg = 4;
            var md = 1;
            var ul = "";
            AlartMessage(msg, flg, md, ul);
            return true;
        }

    }

    //$('#ddlShipMode').empty();
    //$('#ddlShipsystem').empty();
    //LoadShipmodeDDL("#ddlShipMode");
    // LoadShipsystemDDL("#ddlShipsystem");
    // LoadPayTermsDDL("#ddlPayment");
    //LoadBuyerDDL("#ddlBuyer");
    //  LoadSeasonDDL("#ddlSeason");
    //LoadCompanyDDL("#ddlCompany");
    //LoadEmployeeDDL("#ddlManager");
    //LoadEmployeeDDL("#ddlMerch");
    //LoadConsigneeDDL("#ddlConsignee");
    // LoadAgentDDL("#ddlAgent");
    //LoadSAgentDDL("#ddlShipAgent");
    // LoadGUomDDL("#ddlUom");
    LoadSupplierDDL("#ddlSupp");
    LoadAccessoryItemDDL("#ddlIm");
    //LoadEnquiryDDL("#ddlenquiryno");

    $.ajax({
        url: "/BulkOrder/EditMainList/" + MasID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtQty').val(obj.Quantity);
                $('#txtOldQty').val(obj.Quantity);
                $('#txtBuyOrdMasID').val(obj.Buy_Ord_MasId);
                $('#txtOrderNo').val(obj.Order_No);

                $('#ddlShipMode').val(obj.Payment_ModeId);
                $('#ddlShipsystem').val(obj.SystemId);
                $('#ddlPayment').val(obj.Pay_SystemId);
                //
                $('#ddlAgent').val(obj.AgentId);
                $('#ddlConsignee').val(obj.ConsigneeId);
                $('#ddlMerch').val(obj.MerchandiserId);
                $('#ddlManager').val(obj.ManagerId);
                $('#ddlCompany').val(obj.CompanyId);
                $('#ddlSeason').val(obj.SeasonId);
                $('#ddlShipAgent').val(obj.ShipAgentId);
                $('#ddlBuyer').val(obj.BuyerId);
                $('#ddlUom').val(obj.GuomId);
                $('#ddlOrderType').val(obj.OrdType);
                $('#ddlParOrderNo').val(obj.ParentOrdId).trigger('change');
                $('#ddlQuoteNo').val(obj.QuoteId);
                LockDet();
                OType = $('#ddlOrderType').val();
                //
                $('#txtBuyRefNo').val(obj.Buyer_Ref_No);
                $('#dtOrderDate').val(moment(obj.Order_Date).format('DD/MM/YYYY'));
                $('#dtRefDate').val(moment(obj.Ref_Date).format('DD/MM/YYYY'));
                $('#txtRefNo').val(obj.Ref_No);

                var buyerid = $('#ddlBuyer').val();
                var AgnID = $('#ddlAgent').val();
                var ConID = $('#ddlConsignee').val();
                var ShipAgnID = $('#ddlShipAgent').val();
                var GUomID = $('#ddlUom').val();
                var BMasId = $('#txtBuyOrdMasID').val();
                OldQty = $('#txtOldQty').val();

                Rev = (obj.Rev);
                var OPost = (obj.OrdPost);
                var PPost = (obj.PlanPost);

                if (OPost == 'P') {
                    $('#chkorderpost').prop("checked", true);
                }
                else {
                    $('#chkorderpost').prop("checked", false);
                }

                if (PPost == 'P') {
                    $('#chkplanpost').prop("checked", true);
                }
                else {
                    $('#chkplanpost').prop("checked", false);
                }


                $("#chkorderpost").attr("disabled", true);
                $("#chkplanpost").attr("disabled", true);
                $("#ddlParOrderNo").attr("disabled", true);

                BuyMasId = BMasId;

                LoadBuyerEditAdd(buyerid);
                if (AgnID > 0) {
                    LoadAgnEditAdd(AgnID);
                }
                if (ConID > 0) {
                    LoadConEditAdd(ConID);
                }
                if (ShipAgnID > 0) {
                    LoadShipAgnEditAdd(ShipAgnID);
                }
                LoadGUomEditAdd(GUomID);
                //

                // alert(BuyMasId);
                $("#BtnLoad").attr("disabled", true)
                if (BuyMasId == 0) {
                    $('#CList1').hide();
                    $('#CList').hide();
                } else {
                    $('#CList1').show();
                    $('#CList').show();
                }

                LoadCheckBomJobDetails();

                LoadFullData();
                loadData(BMasId);

                if (BuyMasId > 0) {
                    if (Rev == "R") {
                        $('#chk').prop("checked", true);
                        $('#unchklblid').show();
                        $('#ddlrevid').hide();
                        $('#txtERevNo').val(obj.RevQuoteNo);
                    }
                    else {
                        $('#chk').prop("checked", false);
                        $('#unchklblid').hide();
                        $('#ddlrevid').hide();
                        $('#ddlErevid').hide();
                    }
                }

                $('#myModal1').modal('show');
               
                var Dispatchchecked = $('#ChkDispatch').is(":checked");
                if (Dispatchchecked) {
                    DispatchClosed = "Y";
                }
                else {
                    DispatchClosed = "N";
                }

                if (DispatchClosed == "N") {
                    $('#btnUpdate').show();
                }
                else if (DispatchClosed == "Y") {
                    $('#btnUpdate').hide();
                }

                $('#btnAdd').hide();

            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
}


function LoadFullData() {
    var BMasId = $('#txtBuyOrdMasID').val();

    if (BMasId > 0) {
        var SupName = "";
        $.ajax({
            url: "/BulkOrder/ListNomSuppItemDetails",
            data: JSON.stringify({ Supplier: SupName, Buy_Ord_MasId: BMasId }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {


                NItmList = result;
                loadItemTableSave(NItmList);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }
}

function LoadBuyerEditAdd(BuyID) {


    $.ajax({
        url: "/Buyer/GetbyId/" + BuyID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);
                //$('#txtBuyAdd').val(obj.CityName + "," + obj.CountryName);
            }
        }

    });
}
function LoadAgnEditAdd(AgnID) {
    $.ajax({
        url: "/Agent/GetbyId/" + AgnID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtBuyAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}


function LoadConEditAdd(ConID) {

    $.ajax({
        url: "/Consignee/GetbyId/" + ConID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtConAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}

function LoadShipAgnEditAdd(ShipAgnID) {

    $.ajax({
        url: "/Agent/GetbyId/" + ShipAgnID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtShipAgAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);

            }
        }

    });
}
function LoadGUomEditAdd(GUomID) {


    $.ajax({
        url: "/GarmentUom/GetByID/" + GUomID,
        typr: "GET",

        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                $('#txtGarmentConID').val(obj.To_BUom);

            }
        }

    });

}

function Update() {

    if (PlanLock.length > 0) {
        if (PlanLock[0].LockOrder == 'Y') {
            //alert('Order has been Locked,Please Contact Administrator..');
            var msg = 'Order has been Locked,Please Contact Administrator...';
            var flg = 4;
            var md = 1;
            var ul = "";
            AlartMessage(msg, flg, md, ul);
            return true;
        }
    }

    var res = validate();
    if (res == false) {
        return false;
    }
    var OQty = 0;

    var NewQty = $('#txtQty').val();


    if (NewQty != OldQty) {
        var ans = confirm("Quantity has been changed, do you want to save the new quantity...")
        if (ans) {
            OQty = NewQty;
        } else {
            OQty = OldQty;
        }
    } else {
        OQty = OldQty;
    }

    var ptype = $('input[name="PAType"]:checked').attr('value');
    var chkrev = $('input[name="revchk"]:checked').attr('value');

    var FQuoId = 0;
    if ($('#chk').is(":checked")) {
        var FQuoId = $('#ddlRevised').val();

    } else {
        var FQuoId = $('#ddlQuoteNo').val();
    }

    var chkrev = $('input[name="revchk"]:checked').attr('value');

    if (chkrev == "R") {
        chkrev = "R";
    } else {
        chkrev = "N"
    }

    var bukObj = {
        SeasonId: $('#ddlSeason').val(),
        ShipSystemId: $('ddlShipsystem').val(),
        //Order_Date: new Date($('#dtOrderDate').val()),
        Order_Date: $('#dtOrderDate').val(),
        Order_No: $('#txtOrderNo').val(),
        buyerid: $('#ddlBuyer').val(),
        Buyer_Addid: $('#ddlBuyer').val(),
        ManagerId: $('#ddlManager').val(),
        MerchandiserId: $('#ddlMerch').val(),
        Ref_no: $('#txtRefNo').val(),
        Buy_Ord_MasId: $('#txtBuyOrdMasID').val(),
        Ref_date: $('#dtRefDate').val(),
        //Ref_date: new Date($('#dtRefDate').val()),
        Pay_Systemid: $('#ddlPayment').val(),
        Systemid: $('#ddlShipsystem').val(),
        Payment_Modeid: $('#ddlShipMode').val(),
        AgentId: $('#ddlAgent').val(),
        agent_addid: $('#ddlAgent').val(),
        Shipagentid: $('#ddlShipAgent').val(),
        Shipagent_addid: $('#ddlShipAgent').val(),
        CurrencyId: null,
        Exchange: 1.0000,
        EnquiryId: $('#ddlenquiryno').val(),
        Cancel: 0,
        Comit: 0,
        Closed: "N",
        CloseDate: $('#dtOrderDate').val(),
        //CloseDate: new Date($('#dtOrderDate').val()),
        companyid: $('#ddlCompany').val(),
        Cost_def: "N",
        quantity: OQty,//$('#txtQty').val(),
        GUOMid: $('#ddlUom').val(),
        GUOM_Conv: $('#txtGarmentConID').val(),
        Agency_Per: null,
        Bas_Unit: $('#ddlUom').val(),
        remarks: null,
        ClaimType: "R",
        NominatedForwarder: "N",
        CSP: "N",
        Buyer_Ref_No: $('#txtBuyRefNo').val(),
        TransAmend: "N",
        //ConsigneeID: null,
        CreatedBy: GUserid,
        OrdType: $('#ddlOrderType').val(),
        ConsigneeId: $('#ddlConsignee').val(),
        NSupplier: NItmList,
        ParentOrdId: $('#ddlParOrderNo').val(),
        QuoteId: $('#ddlQuoteNo').val(),
        RevQuoteId: $('#ddlRevised').val(),
        RevQuoteNo: $('#ddlRevised option:selected').text(),
        PA: ptype,
        Rev: chkrev,
    };
    $("#btnUpdate").attr("disabled", true);
    LoadingSymb();
    $.ajax({
        url: "/BulkOrder/Update",
        data: JSON.stringify(bukObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {


            if (result.Value == true) {

                // $('#tMbody').DataTable().destroy();
                LoadOrderProcessingData();
                $('#myModal1').modal('hide');
                $('#ddlShipMode').val("");
                $('#ddlShipsystem').val("");
                $('#ddlPayment').val("");
                $('#txtRefNo').val("");
                $('#txtQty').val("");
                $('#txtBuyRefNo').val("");
                $('#ddlOrderNo').val("");
                debugger;

                // $('#myModal1').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').show();
                AddUserEntryLog('SalesManagement', 'Order Processing', 'UPDATE', $('#txtOrderNo').val());
                //alert('Data Updated Successfully');

                //window.location.reload();
                var msg = 'Data Updated Successfully...';
                var flg = 1;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
            } else {

                window.location.href = "/Error/Index";


            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(ID, StyCno, BApproved) {
    debugger;

    if (superuser != "superuser") {
        if (BApproved == 1) {
            //alert("This order has been Approved,Please Contact Administrator..");
            var msg = 'This order has been Approved,Please Contact Administrator...';
            var flg = 4;
            var md = 1;
            var ul = "";
            AlartMessage(msg, flg, md, ul);
            return true;
        }

    }

    if (StyCno > 0) {

        //alert("Style has been made for this entry,Please Check it....")
        var msg = 'Style has been made for this entry,Please Check it...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
        return true;

    }

    var Dispatchchecked = $('#ChkDispatch').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    if (DispatchClosed == "Y") {

        var msg = 'Dispatch Closed,Please Check it...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
        return true;
    }

    $.ajax({
        url: "/BulkOrder/EditMainList/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {
                $('#txtOrderNo').val(obj.Order_No);
            }
            else {

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    var Type = "Ord";
    var ans = confirm("Are you sure want to delete this Record?");
    if (ans) {
        LoadingSymb();
        $.ajax({
            url: "/BulkOrder/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result.Value == true) {
                    AddUserEntryLog('SalesManagement', 'Order Processing', 'DELETE', $('#txtOrderNo').val());
                    //alert("Data Deleted Sucessfully");
                    var msg = 'Data Deleted Sucessfully...';
                    var flg = 2;
                    var md = 1;
                    var ul = "";
                    AlartMessage(msg, flg, md, ul);
                    // $('#tMbody').DataTable().destroy();
                    LoadMainGrid(Type);
                    //window.location.reload();
                } else {

                    window.location.href = "/Error/Index";

                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Valdidation using jquery
function validate() {
    var isValid = true;





    if ($('#txtQty').val().trim() == "") {
        $('#txtQty').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQty').css('border-color', 'lightgrey');
    }

    if ($('#txtOrderNo').val().trim() == "") {
        $('#txtOrderNo').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#txtOrderNo').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#txtRefNo').val().trim() == "") {
        $('#txtRefNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtRefNo').css('border-color', 'lightgrey');
    }
    //if ($('#txtBuyRefNo').val().trim() == "") {
    //    $('#txtBuyRefNo').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#txtBuyRefNo').css('border-color', 'lightgrey');
    //}
    if ($('#dtOrderDate').val().trim() == "") {
        $('#dtOrderDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#dtOrderDate').css('border-color', 'lightgrey');
    }
    if ($('#dtRefDate').val().trim() == "") {
        $('#dtRefDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#dtRefDate').css('border-color', 'lightgrey');
    }
    if ($('#ddlUom').val() == 0) {
        $('#ddlUom').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlUom').siblings(".select2-container").css('border', '1px solid lightgrey');
    }



    if (OType != "D") {
        if ($('#ddlPayment').val() == 0) {
            $('#ddlPayment').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlPayment').css('border-color', 'lightgrey');
        }
        if ($('#ddlShipsystem').val() == 0) {
            $('#ddlShipsystem').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlShipsystem').css('border-color', 'lightgrey');
        } if ($('#ddlShipMode').val() == 0) {
            $('#ddlShipMode').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlShipMode').siblings(".select2-container").css('border', '1px solid lightgrey');
        }

        if ($('#ddlBuyer').val() == 0) {
            $('#ddlBuyer').siblings(".select2-container").css('border', '1px solid red');
            isValid = false;
        }
        else {
            $('#ddlBuyer').siblings(".select2-container").css('border', '1px solid lightgrey');
        }
    }
    if ($('#ddlCompany').val() == 0) {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlCompany').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    if ($('#ddlManager').val() == 0) {
        $('#ddlManager').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlManager').siblings(".select2-container").css('border', '1px solid lightgrey');
    }
    if ($('#ddlMerch').val() == 0) {
        $('#ddlMerch').siblings(".select2-container").css('border', '1px solid red');
        isValid = false;
    }
    else {
        $('#ddlMerch').siblings(".select2-container").css('border', '1px solid lightgrey');
    }

    return isValid;
}

function GetRefNo() {


    $('#ddlRefNo').empty();
    LoadRefNoDDL("#ddlRefNo");

}

function GetOrdNo() {


    $('#ddlOrderNo').empty();
    LoadOrdNoDDL("#ddlOrderNo");

}


function MainList() {
    debugger;

    // $('#tMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    DtChk = true;
    LoadMainGrid(Gs);
}


function CMainList() {
    // $('#tMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = true;
    DtChk = false;
    LoadMainGrid(Gs);
}

function BMainList() {
    //$('#tMbody').DataTable().destroy();
    ChkRefno = true;
    ChkOrdno = true;
    ChkBuyer = false;
    DtChk = false;
    LoadMainGrid(Gs);
}

function OMainList() {
    // $('#tMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    DtChk = false;
    LoadMainGrid(Gs);
}

function RMainList() {
    // $('#tMbody').DataTable().destroy();
    ChkRefno = false;
    ChkOrdno = false;
    ChkBuyer = false;
    DtChk = false;
    LoadMainGrid(Gs);
}


function LoadMainGrid(Type) {

    var RefNo = "";
    var RNo = $('select#ddlRefNo option:selected').val();

    if (RNo == 0) {
        RefNo = "";
    }
    else {
        RefNo = $('select#ddlRefNo option:selected').val();
    }

    var OrdNo = "";
    var ONo = $('select#ddlOrderNo option:selected').val();

    if (ONo == 0) {
        OrdNo = "";
    }
    else {

        OrdNo = $('select#ddlOrderNo option:selected').val();
    }
    //if (DCompid == 0) {
    //    var cmpid = $('#ddlMCompany').val();
    //}
    //else {
    //    var cmpid = $('#ddlMCompany').val();
    //}

    var cmpid = $('#ddlMCompany').val();

    if (cmpid == null) {
        cmpid = DCompid;
    } else {
        cmpid = $('#ddlMCompany').val();
    }


    var buyid = $('#ddlMBuyer').val();
    // var OrdNo = $('#ddlOrderNo').val();
    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();


    Gs = Type;
    var OType = $('#ddlMOrderType').val();

    if (DtChk) {
        RefNo = "";
        OrdNo = "";
        buyid = 0;
    }

    var Dispatchchecked = false;    
    Dispatchchecked = $('#ChkDispatch').is(":checked");
    if (Dispatchchecked) {
        DispatchClosed = "Y";
    }
    else {
        DispatchClosed = "N";
    }

    var menufilter = cmpid + ',' + OrdNo + ',' + RefNo + ',' + buyid + ',' + FDate + ',' + TDate + ',' + Gs + ',' + OType + ',' + DispatchClosed;

    localStorage.setItem('BulkOrderMenuFilter', menufilter);

    $.ajax({
        url: "/BulkOrder/ListDetailsMain",
        data: JSON.stringify({ CmpId: cmpid, Order_No: OrdNo, Ref_No: RefNo, BuyId: buyid, frmDate: FDate, ToDate: TDate, OrderType: Gs, OrdType: OType, DispatchClosed: DispatchClosed }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlRefNo').empty();
                $('#ddlRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlOrderNo').empty();
                $('#ddlOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Buyerid: dataSet[i][10],
                        Buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Buyerid]) {
                        revdet[el.Buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                });


                //return true;
            }

            var inputcount = 0;
            $('#tMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tMbody').DataTable();
                var rows = table.clear().draw();
                $('#tMbody').DataTable().rows.add(dataSet);
                $('#tMbody').DataTable().columns.adjust().draw();
            }
            else {


                $('#tMbody').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    fixedHeader: true,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    select: {
                        style: 'single'
                    },
                    "bSort": false,
                    stateSave: true,
                    columns: [
                             { title: "BuyOrdMasId", "visible": false },
                             { title: "Company" },
                             { title: "Buyer" },
                             { title: "Order No" },
                             { title: "Ref No" },
                             { title: "Date" },
                             { title: "Quantity" },
                             { title: "StyleCount", "visible": false },
                             { title: "Approved", "visible": false },
                             { title: "GCount", "visible": false },
                              { title: "BuyerId", "visible": false },
                             { title: "Action" },



                    ]

                });
            }
            //$('#ddlMCompany').val(DCompid);


            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlRefNo').empty();
                $('#ddlRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

            }

            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlOrderNo').empty();
                $('#ddlOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

            }
            if (ChkBuyer) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Buyerid: dataSet[i][10],
                        Buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Buyerid]) {
                        revdet[el.Buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                });

            }

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });


    $("#AddnewOrd").prop("disabled", false);

    //$('#tMObody').DataTable().destroy();
}


function LoadMainGridFromBack(Type) {

    var fill = localStorage.getItem('BulkOrderMenuFilter');
    var fillobj = [];
    fillobj = fill.split(",");
    Gs = Type;
    $('#txtFromDate').val(fillobj[4]);
    $('#txtToDate').val(fillobj[5]);

    if (fillobj[1] == "undefined") {
        fillobj[1] = '';
    }
    if (fillobj[2] == "undefined") {
        fillobj[2] = '';
    }

    $.ajax({
        url: "/BulkOrder/ListDetailsMain",
        data: JSON.stringify({ CmpId: fillobj[0], Order_No: fillobj[1], Ref_No: fillobj[2], BuyId: fillobj[3], frmDate: fillobj[4], ToDate: fillobj[5], OrderType: Type, OrdType: fillobj[7], DispatchClosed: fillobj[8] }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {
            debugger
            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            if (DtChk) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][4]
                    }
                    refobj.push(obj);
                });
                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlRefNo').empty();
                $('#ddlRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });
             


                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });
                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlOrderNo').empty();
                $('#ddlOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Buyerid: dataSet[i][10],
                        Buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });
                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Buyerid]) {
                        revdet[el.Buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                });
                return true;
            }

            var inputcount = 0;
            $('#tMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tMbody').DataTable();
                var rows = table.clear().draw();
                $('#tMbody').DataTable().rows.add(dataSet);
                $('#tMbody').DataTable().columns.adjust().draw();
            }
            else {


                $('#tMbody').DataTable({
                    data: dataSet,
                    scrollY: 300,
                    scrollCollapse: true,
                    paging: false,
                    fixedColumns: false,
                    fixedHeader: true,
                    select: false,
                    scrollX: "100%",
                    scrollXInner: "100%",
                    scroller: false,
                    select: {
                        style: 'single'
                    },
                    "bSort": false,
                    stateSave: true,
                    columns: [
                             { title: "BuyOrdMasId", "visible": false },
                             { title: "Company" },
                             { title: "Buyer" },
                             { title: "Order No" },
                             { title: "Ref No" },
                             { title: "Date" },
                             { title: "Quantity" },
                             { title: "StyleCount", "visible": false },
                             { title: "Approved", "visible": false },
                             { title: "GCount", "visible": false },
                              { title: "BuyerId", "visible": false },
                             { title: "Action" },



                    ]

                });
            }
            //$('#ddlMCompany').val(DCompid);


            if (ChkRefno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Refno: dataSet[i][4]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Refno]) {
                        revdet[el.Refno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlRefNo').empty();
                $('#ddlRefNo').append($('<option/>').val('0').text('--Select Ref No--'));
                $.each(rev, function () {
                    $('#ddlRefNo').append($('<option></option>').val(this.Refno).text(this.Refno));
                });

            }

            if (ChkOrdno) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Ordno: dataSet[i][3]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Ordno]) {
                        revdet[el.Ordno] = true;
                        rev.push(el);
                    }
                });

                $('#ddlOrderNo').empty();
                $('#ddlOrderNo').append($('<option/>').val('0').text('--Select Order No--'));
                $.each(rev, function () {
                    $('#ddlOrderNo').append($('<option></option>').val(this.Ordno).text(this.Ordno));
                });

            }
            if (ChkBuyer) {
                var refobj = [];
                $.each(dataSet, function (i) {
                    var obj = {
                        Buyerid: dataSet[i][10],
                        Buyer: dataSet[i][2]
                    }
                    refobj.push(obj);
                });



                var revdet = {};
                var rev = [];

                $.each(refobj, function (i, el) {

                    if (!revdet[el.Buyerid]) {
                        revdet[el.Buyerid] = true;
                        rev.push(el);
                    }
                });

                $('#ddlMBuyer').empty();
                $('#ddlMBuyer').append($('<option/>').val('0').text('--Select Buyer--'));
                $.each(rev, function () {
                    $('#ddlMBuyer').append($('<option></option>').val(this.Buyerid).text(this.Buyer));
                });

            }

        },

        failure: function (errMsg) {
            debugger
            alert(errMsg);
        }
    });


    $("#AddnewOrd").prop("disabled", false);

    //$('#tMObody').DataTable().destroy();
}



function LoadOrderProcessingData() {

    var FDate = $('#txtFromDate').val();
    var TDate = $('#txtToDate').val();

    $.ajax({
        url: "/BulkOrder/ListDetailsMain",
        data: JSON.stringify({ frmDate: FDate, ToDate: TDate }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (json) {

            var tableload = json.data
            var dataSet = eval("[" + tableload + "]");

            var inputcount = 0;
            $('#tMbody tr').each(function () {
                inputcount++;
            });
            if (inputcount > 0) {
                //$('#tblYarndetails').DataTable().destroy();
                var table = $('#tMbody').DataTable();
                var rows = table.clear().draw();
                $('#tMbody').DataTable().rows.add(dataSet);
                $('#tMbody').DataTable().columns.adjust().draw();
            }
            else {

                $('#tMbody').DataTable({
                    data: dataSet,
                    columns: [
                              { title: "BuyOrdMasId", "visible": false },
                              { title: "Company" },
                             { title: "Buyer" },
                             { title: "Order No" },
                             { title: "Ref No" },
                             { title: "Date" },
                             { title: "Quantity" },
                             { title: "Action" },
                    ]

                });
            }
        },

        failure: function (errMsg) {

            alert(errMsg);

        }

    });
    //$('#tMObody').DataTable().destroy();
}

function onRefNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        $(refNoDDL).empty();
        $(refNoDDL).append($('<option/>').val('0').text('--Select Ref No--'));
        $.each(data, function () {
            $(refNoDDL).append($('<option></option>').text(this.Ref_No));
        });
    }
    else {
        //alert('RefNo loading failed');
        var msg = 'Refer Number loading failed...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}

function onRefNoFailure(result) {
    //alert('RefNo loading failed');
    var msg = 'Refer Number loading failed...';
    var flg = 4;
    var md = 1;
    var ul = "";
    AlartMessage(msg, flg, md, ul);
}


function onOrdNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ordNoDDL).empty();
        $(ordNoDDL).append($('<option/>').val('0').text('--Select Order No--'));
        $.each(data, function () {
            $(ordNoDDL).append($('<option></option>').text(this.Order_No));
        });
    }
    else {
        //alert('OrderNo loading failed');
        var msg = 'Order Number loading failed...';
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}

function onOrdNoFailure(result) {
    //alert('OrderNo loading failed');
    var msg = 'Order Number loading failed...';
    var flg = 4;
    var md = 1;
    var ul = "";
    AlartMessage(msg, flg, md, ul);
}

function LoadNom() {

}

////////////////////////nomi////////////////



$(document).ready(function () {

    //component details
    $('#btnSuppadd').click(function () {
        debugger;


        $('#CList1').show();

        var leng = 0;

        var isAllValid = true;


        debugger;
        if ($('#ddlSupp').val() == "0") {
            isAllValid = false;
            $('#ddlSupp').css('border-color', 'Red');
        }
        else {
            $('#ddlSupp').css('border-color', 'lightgrey');
        }

        var sid = $('#ddlSupp').val();
        for (var d = 0; d < supList.length; d++) {
            if (supList[d].SupplierId == sid) {
                //alert('Must be different supplier...');
                var msg = 'Must be different supplier...';
                var flg = 4;
                var md = 1;
                var ul = "";
                AlartMessage(msg, flg, md, ul);
                fnClearSupControls();
                return true;
            }
        }

        if (supList.length == 0) {
            leng = 1;
        }
        else {
            leng = supList.length + 1;
        }

        SupSno = leng;

        // SupId = $('#ddlSupp').val();
        Supp = $("#ddlSupp option:selected").text();



        if (isAllValid) {


            debugger;
            var supListObj = {
                Supplier: $("#ddlSupp option:selected").text(),
                SupplierId: $('#ddlSupp').val(),
                SlNo: leng,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            supList.push(supListObj);

            loadSuppTable(supListObj);

            fnClearSupControls();
        }
    });

    $(document).on('click', '.btnsupedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = supList.slice(rowindex);

        $('#ddlSupp').val(currentro12[0]['SupplierId']);



        $('#btnSuppadd').hide();
        $('#btnSuppupdate').show();
    });



    $('#btnSuppupdate').click(function () {
        debugger;
        var currentrowsel = supList.slice(rowindex);

        currentrowsel[0]['SupplierId'] = $("#ddlSupp").val();
        currentrowsel[0]['Supplier'] = $("#ddlSupp option:selected").text();


        supList[rowindex] = currentrowsel[0];

        loadSuppTable(supList);

        $('#btnSuppupdate').hide();
        $('#btnSuppadd').show();

        if (Mode == 0) {
            fnClearSupControls();
        }
        else {
            fnClearSupControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnsupremove', function () {
        rowindex = $(this).closest('tr').index();
        supList.splice(rowindex, 1);
        document.getElementById("tblSupdetails").deleteRow(rowindex + 1);
    });
    //

});

function loadSuppTable(supListObj) {
    debugger;
    $('#tblSupdetails').DataTable().destroy();

    supList.sort(function (a, b) {
        return a.SlNo - b.SlNo;
    });
    //PlanYarn1[0][2]
    $('#tblSupdetails').DataTable({
        // "order": [[8, "asc"]],
        data: supList,
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
            //{ title: "SlNo", data: "SlNo" },
            { title: "SupplierId", data: "SupplierId", "visible": false },
            { title: "Supplier", data: "Supplier", },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-warning btn-round"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button"data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button> '

                   //"sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupremove btn btn-round btn-danger"> <i class="fa fa-minus"> </button><button type="button" data-toggle="tooltip" data-placement="top" title="View Item" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnsupItemview btn btn-round btn-info"> <i class="fa fa-eye"> </button> '

               },

        ]
    });

    $("#tblSupdetails tr").click(function () {
        var selected = $(this).hasClass("selected");
        $("#tblSupdetails tr").removeClass("selected");
        if (!selected)
            $(this).addClass("selected");
    });
}


$(document).ready(function () {

    $('#tblSupdetails').on('click', 'tr', function (e) {
        debugger;

        var table = $('#tblSupdetails').DataTable();
        var row = $(this).closest('tr');
        var data = $('#tblSupdetails').dataTable().fnGetData(row);




        var FSupplierId = data.SupplierId;//currentro12[0]['SupplierId'];
        var FSupplier = data.Supplier;//currentro12[0]['Supplier'];


        SupId = FSupplierId;


        rowindex = $(this).closest('tr').index();

        var currentro12 = supList.slice(rowindex);
        var supplierid = currentro12[0].SupplierId;

        var supp = $(this).closest('tr').find('td:eq(0)').html();
        suppName = $(this).closest('tr').find('td:eq(0)').html();

        var FItmList = new Array();
        for (var d = 0; d < NItmList.length; d++) {
            if (NItmList[d].SupplierId == SupId) {

                FItmList.push(NItmList[d]);
            }
        }
        loadItemTableView(FItmList);

    });
});


function fnClearSupControls() {
    debugger;
    $('#ddlSupp').val('0');


}

////////nomi item

$(document).ready(function () {

    //component details
    $('#btnImadd').click(function () {
        debugger;
        $('#CList').show();

        if (SupId == 0) {
            //alert("Please select Supplier...")
            var msg = 'Please select Supplier...';
            var flg = 4;
            var md = 1;
            var ul = "";
            AlartMessage(msg, flg, md, ul);
            return true;
        }
        else {
            var itmid = $('#ddlIm').val();
            for (var t = 0; t < NItmList.length; t++) {
                if (NItmList[t].SupplierId == SupId && NItmList[t].ItemId == itmid) {
                    //alert('Must be different item for same supplier...');
                    var msg = 'Must be different item for same supplier...';
                    var flg = 4;
                    var md = 1;
                    var ul = "";
                    AlartMessage(msg, flg, md, ul);
                    $('#ddlIm').val('0');
                    return true;
                }
            }
        }

        if (BuyMasId == 0) {

            var cnt = $("#tblimdetails tr").length - 1;

            var Data = "";

            // PackItemList = [];
            for (var i = 1; i <= cnt; i++) {

                var OSupId = $("#tblimdetails tr:eq(" + i + ") td:eq(3)").html();
                var OItmId = $("#tblimdetails tr:eq(" + i + ") td:eq(1)").html();




            }

            if (ItmList.length > 0) {
                if (OSupId != SupId && OItmId != GItemId) {
                    ItmList = [];


                }
            }


        }


        var leng = 0;

        var isAllValid = true;


        debugger;
        //if ($('#ddlIm').val() == "0") {
        //    isAllValid = false;
        //    $('#ddlIm').siblings('span.error').css('visibility', 'visible');
        //}
        //else {
        //    $('#ddlIm').siblings('span.error').css('visibility', 'hidden');
        //}

        if ($('#ddlIm').val() == "0") {
            isAllValid = false;
            $('#ddlIm').css('border-color', 'Red');
        }
        else {
            $('#ddlIm').css('border-color', 'lightgrey');
        }

        var SSNo = SupSno;
        var SuppliId = SupId;
        var SName = suppName;
        GItemId = $('#ddlIm').val();
        if (isAllValid) {


            debugger;
            var itmListObj = {
                Item: $("#ddlIm option:selected").text(),
                ItemId: $('#ddlIm').val(),
                NomSupId: 0,
                SupplierId: SuppliId,
                Supplier: SName,

                Status: ['<img src="images/first.png" class="btnSave"><img src="images/delete.png" class="btnDelete"/>']
            };

            if (BuyMasId > 0) {
                NItmList.push(itmListObj);
                var filtered = [];
                filtered = NItmList;

                loadItemTableSave(filtered);

                filtered = $.grep(filtered, function (v) {
                    return v.SupplierId === SuppliId;
                });


                loadItemTableView(filtered);
                //    //loadItemTable(itmListObj);
            }
            if (BuyMasId == 0) {

                list.push(itmListObj);



                var filteredarr = [];
                filteredarr = list;

                filteredarr = $.grep(filteredarr, function (v) {
                    return v.SupplierId === SuppliId;
                });

                loadItemTableView(filteredarr);
            }


            if (BuyMasId == 0) {
                NItmList.push(itmListObj);
                loadItemTableSave(itmListObj);
            }

            fnClearItmControls();
        }

    });

    $(document).on('click', '.btnitmedit', function () {
        debugger;
        Mode = 1;

        rowindex = $(this).closest('tr').index();

        var currentro12 = ItmList.slice(rowindex);

        $('#ddlIm').val(currentro12[0]['ItemId']);



        $('#btnImadd').hide();
        $('#btnImupdate').show();
    });

    $('#btnImupdate').click(function () {
        debugger;
        var currentrowsel = ItmList.slice(rowindex);

        currentrowsel[0]['ItemId'] = $("#ddlIm").val();
        currentrowsel[0]['Item'] = $("#ddlIm option:selected").text();


        ItmList[rowindex] = currentrowsel[0];

        loadItemTable(ItmList);

        $('#btnImupdate').hide();
        $('#btnImadd').show();

        if (Mode == 0) {
            fnClearItmControls();
        }
        else {
            fnClearItmControls();

        }
        Mode = 0;
    });

    $(document).on('click', '.btnitmremove', function () {
        rowindex = $(this).closest('tr').index();
        ItmList.splice(rowindex, 1);
        document.getElementById("tblimdetails").deleteRow(rowindex + 1);
    });
    //






});


function fnClearItmControls() {
    debugger;
    $('#ddlIm').val('0');

}

function loadItemTable(itmListObj) {
    $('#tblimdetails').DataTable().destroy();
    debugger;

    $('#tblimdetails').DataTable({
        // "order": [[8, "asc"]],
        data: ItmList,
        //scrollY: 300,
        //scrollCollapse: true,
        //paging: false,
        //fixedColumns: false,
        //select: false,
        //scrollX: "100%",
        //scrollXInner: "100%",
        //scroller: false,

        columns: [
            { title: "NsupId", data: "NomSupId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "SuppId", data: "SupplierId", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button>'
               }
        ]
    });
}


function loadItemTableView(list) {
    $('#tblimdetails').DataTable().destroy();
    debugger;

    $('#tblimdetails').DataTable({
        // "order": [[8, "asc"]],

        data: list,
        bSort: false,

        columns: [
            { title: "NsupId", data: "NomSupId", "visible": false },
            { title: "ItemId", data: "ItemId", "visible": false },
            { title: "Item", data: "Item" },
            { title: "SuppId", data: "SupplierId", "visible": false },

               {
                   title: "ACTION", "mDataProp": null,
                   "sDefaultContent": '<button type="button" data-toggle="tooltip" data-placement="top" title="Edit" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmedit btn btn-round btn-warning"> <i class="fa fa-pencil-square-o"></i> </button> <button type="button" data-toggle="tooltip" data-placement="top" title="Remove" style="width: 20px;padding: 0px;height: 20px;border-radius:10px;" class="btnitmremove btn btn-round btn-danger"> <i class="fa fa-minus"></i> </button>'
               }
        ]
    });
}




function loadItemTableSave(itmListObj) {
    $('#tblimdetailsSave_wrapper').DataTable().destroy();
    debugger;

    $('#tblimdetailsSave_wrapper').DataTable({
        // "order": [[8, "asc"]],
        data: NItmList,

        columns: [
            { title: "NsupId", data: "NomSupId" },
            { title: "ItemId", data: "ItemId" },
            { title: "Item", data: "Item" },
            { title: "SuppId", data: "SupplierId" },
              { title: "Supplier", data: "Supplier" },


        ]
    });
}

function CClose() {

    window.location.href = "/BulkOrder/BulkOrderIndex";
}

function LOADSTYLE() {
    //  CheckRights("OrderStyle");
    var Prg = "Sty";
    Gs = Prg;
    var Type = "Sty";
    // $('#tMbody').DataTable().destroy

    var fill = localStorage.getItem('BulkOrderMenuFilter');
    if (fill != "null" && fill != null) {

        LoadMainGridFromBack(Type);
    } else {
        LoadMainGrid(Type);
    }
    //LoadMainGrid(Type);

}
function LOADORDER() {
    //  CheckRights("BulkOrder");
    var Prg = "Ord";
    Gs = Prg;
    var Type = "Ord";
    // $('#tMbody').DataTable().destroy();
    //LoadMainGrid(Type);

    var fill = localStorage.getItem('BulkOrderMenuFilter');
    if (fill != "null" && fill != null) {

        LoadMainGridFromBack(Type);
    } else {
        LoadMainGrid(Type);
    }

}
function LOADGARMENT_ITEM() {
    // CheckRights("TrimsTemplate");
    var Prg = "Gitm";
    Gs = Prg;
    var Type = "Gitm";
    // $('#tMbody').DataTable().destroy();
    LoadMainGrid(Type);

}
function LoadOrditmdet() {
    //  CheckRights("YarnFabTemp");
    var Prg = "oid";
    Gs = Prg;
    var Type = "oid";
    //$('#tMbody').DataTable().destroy();
    LoadMainGrid(Type);

}
function AddStyleEntry(Id) {
    var Mod = 0;
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + "B";
}
function EditStyEntry(Id) {
    debugger;
    var Mod = 1;

    var url = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + "B";
    //var encoded_url = encodeURIComponent(url);
    //var decoded_url = decodeURIComponent(encoded_url);

    //window.location.href = encoded_url;
    window.location.href = url;





}
function DeleteStyEntry(Id) {
    debugger;
    var Mod = 2;
    window.location.href = "/StyleEntry/StyleEntryIndex?BMasId=" + Id + "=&Mode=" + Mod + "=&type=" + "B";
}
function AddGarmentItemEntry(Id) {
    debugger;
    var Mod = 0;
    var url = "/GarmentItem/GarmentItemIndex?BMasId=" + Id + "=&Mode=" + Mod;
    window.location.href = url;
}
function EditGarmentItemEntry(Id) {
    debugger;
    var Mod = 1;
    var url = "/GarmentItem/GarmentItemIndex?BMasId=" + Id + "=&Mode=" + Mod;
    window.location.href = url;
}
function DeleteGarmentItemEntry(Id) {
    debugger;
    var Mod = 2;
    window.location.href = "/GarmentItem/GarmentItemIndex?BMasId=" + Id + "=&Mode=" + Mod;
}
function AddOrdItmDet(Id) {
    debugger;
    var Mod = 0;
    var url = "/OrderItemDetails/OrderItemDetailsIndex?BMasId=" + Id + "=&Mode=" + Mod;
    window.location.href = url;
}
function EditOrdItmDet(Id) {
    debugger;
    var Mod = 1;
    var url = "/OrderItemDetails/OrderItemDetailsIndex?BMasId=" + Id + "=&Mode=" + Mod;
    window.location.href = url;
}
function DeleteOrdItmDet(Id) {
    debugger;
    var Mod = 2;
    window.location.href = "/OrderItemDetails/OrderItemDetailsIndex?BMasId=" + Id + "=&Mode=" + Mod;
}
function CheckRefNo(RefNo) {
    $.ajax({
        url: "/BulkOrder/CheckRefno",
        data: JSON.stringify({ Ref_No: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {

                var RefNo = obj.Ref_No;

                //if (RefNo != "") {
                if (RefNo != null) {
                    //alert("RefNo Already Exists...");
                    var msg = 'Refer Number Already Exists...';
                    var flg = 4;
                    var md = 1;
                    var ul = "";
                    AlartMessage(msg, flg, md, ul);
                    $('#txtRefNo').val("");
                    $('#txtRefNo').focus();
                    return false;
                }

            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

//function Buy_ord_Print(Id) {
//    debugger;
//    var Mod = 1;
//    $('#myModal3').modal('show');
//    var src = '../Reports/BuyerOrderInlineReport.aspx?';
//    src = src + "ddlOrderNo=" + Id
//    //src = src + "txtFromDate=" + FDate
//    //src = src + "&txtToDate=" + TDate
//    var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
//    $("#divReport").html(iframe);
//    window.location.href = "../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + Id;
//}

function LoadOrderPrefix() {
    debugger;
    var OrderType = $('#ddlOrderType option:selected').val();

    var compId = $('#ddlCompany').val();

    if (compId > 0) {
        if (OrderType == "B") {
            OType = "B";
            GenerateNumber();
        }
        else if (OrderType == "S") {
            OType = "S";
            GenerateNumber();
        } else if (OrderType == "D") {
            OType = "D";
            GenerateNumber();
        }
    } else {
        if (OrderType == "B") {
            OType = "B";

        }
        else if (OrderType == "S") {
            OType = "S";

        } else if (OrderType == "D") {
            OType = "D";

        }
    }
}


function SubReport() {
    debugger;
    //$('#myModal3').modal('show');
    //var src = '../Reports/BuyerOrderInlineReport.aspx?';
    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //$("#divReport").html(iframe);
    //var opt = 0;
    //var opt = "13467";


    var MOrd = 0;

    var arr = [];
    var nam = [];
    var tet = [];
    $('#sbTwo :selected').each(function (i, sel) {
        //alert($(sel).text());
        MOrd = MOrd + "," + $(sel).val();
        arr.push($(sel).val());
        nam.push($(sel).text());
        //var obj = {
        //    optionname: $(sel).text(),
        //    optionid: $(sel).val(),
        //    optionval:1
        //}
        //tet.push(obj);
    });
    var res = [];
    var p = [];
    for (var r = 0; r < repobj.length; r++) {
        res.push(repobj[r].optionid);
        p.push(0);
        //var obj = {
        //    optionname: repobj[r].optionname,
        //    optionid: repobj[r].optionid,
        //    optionval: 0
        //}
        //tet.push(obj);
    }

    for (var y = 0; y < arr.length; y++) {
        for (var f = 0; f < res.length; f++) {
            if (arr[y] == res[f]) {
                p[f] = 1;
            }
        }
    }
    var compId = $('#ddlMCompany').val();
    // window.location.href = "../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + RepId + "&Multiopt=" + arr + "&Multinam=" + nam;

    window.open("../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + RepId + "&Multiopt=" + MOrd + "&Combodet=" + p[0] + "&MeasChart=" + p[1] + "&OrdIns=" + p[2] + "&Chklst=" + p[3] + "&Material=" + p[4] + "&Ratematrix=" + p[5] + "&Packing=" + p[6] + "&GSM=" + p[7] + "&INR=" + p[8] + "&Shipdet=" + p[9] + "&PrntImg=" + p[10] + "&Companyid=" + compId + "&OrdType=" + "B" + "&Mail=" + "N");//+ "&MultiOptionid=" + MOrd;

}

function Buy_ord_Print(Id) {
    debugger;
    RepId = Id;
    //var Mod = 1;
    //$('#myModal3').modal('show');
    //var src = '../Reports/BuyerOrderInlineReport.aspx?';
    //src = src + "ddlOrderNo=" + Id
    //src = src + "txtFromDate=" + FDate
    //src = src + "&txtToDate=" + TDate
    //var iframe = '<iframe id="reportFrame" align="center" width="100%" height="1000px" background-image="none" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    //$("#divReport").html(iframe);
    //window.location.href = "../Reports/BuyerOrderInlineReport.aspx?ddlOrderNo=" + Id;
    $('#myModal2').show();
    $('#myModal2').modal('show');
    $('#selectall').val("");
    GenerateReportItem();
}

function GenerateReportItem() {
    debugger;
    name = "BUYER ORDER"
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

function backtomain() {
    $("#myModal2").hide();
    $("#myModal2").modal('hide');
}

function LoadCheckBomJobDetails() {


    var OrderNo = $('#txtOrderNo').val();

    $.ajax({
        url: "/BulkOrder/CheckPlanJobDetails",
        data: JSON.stringify({ Order_No: OrderNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {


                var CBom = obj[0]["CheckBom"];
                var CJob = obj[0]["CheckJob"];

                if (CBom > 0) {

                    //alert("Planning has been made for this Order,Please Check it....")
                    var msg = 'Planning has been made for this Order,Please Check it...';
                    var flg = 4;
                    var md = 1;
                    var ul = "";
                    AlartMessage(msg, flg, md, ul);
                    $("#ddlBuyer").prop("disabled", true);
                    $("#ddlCompany").prop("disabled", true);
                    $("#ddlUom").prop("disabled", true);

                    $("#ddlOrderType").prop("disabled", true);
                    //$("#Update").attr('disabled', true);
                    //$('#Add').hide();
                    return true;
                }

                if (CJob > 0) {

                    //alert("Job Order has been made for this Order,Please Check it....")
                    var msg = 'Job Order has been made for this Order,Please Check it...';
                    var flg = 4;
                    var md = 1;
                    var ul = "";
                    AlartMessage(msg, flg, md, ul);
                    $("#ddlBuyer").prop("disabled", true);
                    $("#ddlCompany").prop("disabled", true);
                    $("#ddlUom").prop("disabled", true);
                    $("#ddlOrderType").prop("disabled", true);
                    return true;
                }
            }
            else {

            }
        },

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function LoadCurrencyRate() {
    debugger;
    var compid = $('#ddlCompany').val();

    //$.ajax({
    //    url: "/Login/GetExchangeRate",
    //    data: JSON.stringify({ companyid: compid }),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {

    //        var obj = result.Value;
    //        debugger;
    //        if (obj != undefined) {


    //            //var CBom = obj[0]["CheckBom"];
    //            //var CJob = obj[0]["CheckJob"];

    //            //if (CBom > 0) {

    //            //    alert("Planning has been made for this Order,Please Check it....")
    //            //    $("#ddlBuyer").prop("disabled", true);
    //            //    $("#ddlCompany").prop("disabled", true);
    //            //    $("#ddlUom").prop("disabled", true);

    //            //    $("#ddlOrderType").prop("disabled", true);
    //            //    //$("#Update").attr('disabled', true);
    //            //    //$('#Add').hide();
    //            //    return true;
    //            //}

    //            //if (CJob > 0) {

    //            //    alert("Job Order has been made for this Order,Please Check it....")
    //            //    $("#ddlBuyer").prop("disabled", true);
    //            //    $("#ddlCompany").prop("disabled", true);
    //            //    $("#ddlUom").prop("disabled", true);
    //            //    $("#ddlOrderType").prop("disabled", true);
    //            //    return true;
    //            //}
    //        }
    //        else {

    //        }
    //    },

    //    failure: function (errMsg) {
    //        alert(errMsg);
    //    }
    //});
    var link = document.URL;
    $.ajax({
        type: "POST",
        url: "/Login/GetExchangeRate",
        data: { companyid: compid },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

function OpenRevQuote() {

    var quoid = $('#ddlQuoteNo').val();
    //if (quoid == 0) {
    //    alert("Please select the Quotation no and then click the revised..");
    //    $("#chk").prop("checked", false);
    //    return true;

    //}
    //else {
    if ($('#chk').is(":checked")) {

        $('#ddlrevid').show();
        GetRevNo(quoid);
    } else {
        $('#ddlrevid').hide();
    }
    //}
}


function GetRevNo(QuotId) {
    debugger;

    $.ajax({
        url: "/QuotationMain/GetRevNumber/",
        data: JSON.stringify({ QuoteID: QuotId }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",

        success: function (result) {
            debugger;
            var obj = result.Value;

            var revdet = {};
            var rev = [];

            $.each(obj, function (i, el) {

                if (!revdet[el.RecID]) {
                    revdet[el.RecID] = true;
                    rev.push(el);
                }
            });

            $('#ddlRevised').empty();
            $('#ddlRevised').append($('<option/>').val('0').text('--Select Revised No--'));
            $.each(rev, function () {
                $('#ddlRevised').append($('<option></option>').val(this.RecID).text(this.RecQuoteNo));
            });


        },
        error: function (errormessage) {
            debugger;
            alert(errormessage.responseText);
        }
    });


}

function LoadBuyerAdd() {
    debugger;


    $.ajax({
        url: "/Role/GetMenu/",
        data: JSON.stringify({ roleid: GUserid, menuid: Menuid, submenuid: Submenuid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                // $('#txtBuyAdd').val(obj.Address1 + "," + obj.Address2 + "," + obj.Address3);
                //$('#txtBuyAdd').val(obj.CityName + "," + obj.CountryName);

            }
        }

    });

}

function Rolecheck() {
    debugger;
    $.ajax({
        url: "/Role/GetRolebyId",
        data: JSON.stringify({ roleid: Roleid, menuid: Menuid, submenuid: Submenuid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            debugger;

            if (result.Value.RoleDetList.length > 0) {
                var obj = result.Value.RoleDetList[0];
                if (obj.AddFlg == 1) {
                    //if (obj[0].AddFlg == 1) {
                    rightsflg = 1;
                    menurights();
                    // }
                }
                else {
                    rightsflg = 0;
                    menurights();
                }
            } else {
                rightsflg = 0;
                menurights();
            }
        }
    });
}

function menurights() {
    debugger;
    switch (Menuid) {
        case 24:
            addbuyer();
            break;
        case 25:
            addconsignee();
            break;
        case 23:
            if (AgentType == "B") {
                addbuyeragent();
            }
            if (AgentType == "S") {
                addshipagent();
            }
            break;
        case 18:
            addexporter();
            break;
        case 2440:
            adduom();
            break;
        case 1472:
            addsystem();
            break;
        case 1471:
            addshipment();
            break;
        case 1480:
            addpayment();
            break;
        case 52:
            addemployee();
            break;
    }


    //if (Menuid == 24) {
    //    addbuyer();
    //}
    //if (Menuid == 25) {
    //    addconsignee();
    //}
    //if (Menuid == 23 && AgentType == "B") {
    //    addbuyeragent();
    //}
    //if (Menuid == 23 && AgentType == "S") {
    //    addshipagent();
    //}
    //if (Menuid == 18) {
    //    addexporter();
    //}
    //if (Menuid == 2440) {
    //    adduom();
    //}
    //if (Menuid == 1472) {
    //    addsystem();
    //}
    //if (Menuid == 1471) {
    //    addshipment();
    //}
    //if (Menuid == 1480) {
    //    addpayment();
    //}
    //if (Menuid == 52) {
    //    addemployee();
    //}

}
function addbuyer() {
    debugger;
    if (rightsflg == 1) {
        $('#BuyerID').val("");
        $('#Name').val("");
        $('#add1').val("");
        $('#add2').val("");
        $('#add3').val("");
        $('#ddlcity').empty();
        $('#zipcode').val("");
        $('#txtLookup').val("");
        $('#txtCountry').val("");
        $('#mobileno').val("");
        $('#Status').val("");

        $('#btnBuyerAdd').show();
        $('#BuyerID').css('border-color', 'lightgrey');
        $('#add1').css('border-color', 'lightgrey');
        $('#add2').css('border-color', 'lightgrey');
        $('#add3').css('border-color', 'lightgrey');
        $('#ddlcity').css('border-color', 'lightgrey');
        $('#Name').css('border-color', 'lightgrey');
        $('#zipcode').css('border-color', 'lightgrey');
        $('#mobileno').css('border-color', 'lightgrey');

        $('#Status').css('border-color', 'lightgrey');
        //$('#tbody').DataTable().destroy();
        LoadCityDDL("#ddlcity");
        $("#myModal3").modal('show');

    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);

    }
}

function addconsignee() {
    debugger;
    if (rightsflg == 1) {
        $('#ConsigneeID').val("");
        $('#conName').val("");
        $('#conadd1').val("");
        $('#conadd2').val("");
        $('#conadd3').val("");
        $('#ddlconscity').empty();
        $('#conzipcode').val("");
        $('#conStatus').val("");
        $('#lookup').val("");
        $('#remarks').val("");

        $('#btnconsAdd').show();
        $('#ConsigneeID').css('border-color', 'lightgrey');
        $('#conadd1').css('border-color', 'lightgrey');
        $('#conadd2').css('border-color', 'lightgrey');
        $('#conadd3').css('border-color', 'lightgrey');
        $('#ddlconscity').css('border-color', 'lightgrey');
        $('#conName').css('border-color', 'lightgrey');
        $('#conzipcode').css('border-color', 'lightgrey');
        $('#conStatus').css('border-color', 'lightgrey');
        $('#lookup').css('border-color', 'lightgrey');
        $('#remarks').css('border-color', 'lightgrey');
        //$('#tbody').DataTable().destroy();
        LoadCityDDL("#ddlconscity");
        $("#myModal4").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);

    }
}
function addbuyeragent() {
    debugger;
    if (rightsflg == 1) {
        AgentType = "B";
        $('#AgentID').val("");
        $('#agentName').val("");
        $('#agentadd1').val("");
        $('#agentadd2').val("");
        $('#agentadd3').val("");
        $('#ddlagentcity').empty();
        $('#ddlagentType').val("B");
        $('#agentzipcode').val("");
        $('#mobileno').val("");
        $('#txtagentCountry').val("");
        $('#contactname').val("");
        $('#agentStatus').val("");


        $('#btnagentAdd').show();
        $('#AgentID').css('border-color', 'lightgrey');
        $('#agentadd1').css('border-color', 'lightgrey');
        $('#agentadd2').css('border-color', 'lightgrey');
        $('#agentadd3').css('border-color', 'lightgrey');
        $('#ddlagentcity').css('border-color', 'lightgrey');
        $('#agentName').css('border-color', 'lightgrey');
        $('#agentzipcode').css('border-color', 'lightgrey');
        $('#mobileno').css('border-color', 'lightgrey');
        $('#ddlagenttype').css('border-color', 'lightgrey');
        $('#contactname').css('border-color', 'lightgrey');
        $('#agentStatus').css('border-color', 'lightgrey');
        LoadCityDDL("#ddlagentcity");
        $("#myModal5").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);

    }
}

function addshipagent() {
    if (rightsflg == 1) {
        AgentType = "S";
        $('#AgentID').val("");
        $('#agentName').val("");
        $('#agentadd1').val("");
        $('#agentadd2').val("");
        $('#agentadd3').val("");
        $('#ddlagentcity').empty();
        $('#ddlagentType').val("S");
        $('#agentzipcode').val("");
        $('#mobileno').val("");
        $('#txtagentCountry').val("");
        $('#contactname').val("");
        $('#agentStatus').val("");


        $('#btnagentAdd').show();
        $('#AgentID').css('border-color', 'lightgrey');
        $('#agentadd1').css('border-color', 'lightgrey');
        $('#agentadd2').css('border-color', 'lightgrey');
        $('#agentadd3').css('border-color', 'lightgrey');
        $('#ddlagentcity').css('border-color', 'lightgrey');
        $('#agentName').css('border-color', 'lightgrey');
        $('#agentzipcode').css('border-color', 'lightgrey');
        $('#mobileno').css('border-color', 'lightgrey');
        $('#ddlagenttype').css('border-color', 'lightgrey');
        $('#contactname').css('border-color', 'lightgrey');
        $('#agentStatus').css('border-color', 'lightgrey');
        LoadCityDDL("#ddlagentcity");
        $("#myModal5").modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}

function addexporter() {
    debugger;
    if (rightsflg == 1) {
        $('#CompanyId').val("");
        $('#compName').val("");
        $('#complookup').val("");
        $('#compzipcode').val("");
        $('#email').val("");
        $('#fax').val("");
        $('#cstno').val("");
        $('#cstdate').val("");
        $('#tinno').val("");
        $('#tindate').val("");
        $('#compcontactname').val("");
        $('#mobno').val("");
        $('#compadd1').val("");
        $('#compadd2').val("");
        $('#compadd3').val("");
        $('#ddlcompcity').empty();
        $('#ddlcountry').empty();
        $('#compzipcode').val("");
        $('#compStatus').val("");
        $('#telex').val("");
        $('#rbicode').val("");
        $('#iecode').val("");
        $('#prefix').val("");
        $('#aepcno').val("");
        $('#aepcdate').val("");
        $('#logoname').val("");
        $('#eanno').val("");
        $('#iecno').val("");
        $('#rcmcno').val("");
        $('#tngstno').val("");
        $('#range').val("");
        $('#division').val("");
        $('#txtcompCountry').val("");

        $('#btncompAdd').show();
        $('#CompanyId').css('border-color', 'lightgrey');
        $('#complookup').css('border-color', 'lightgrey');
        $('#compzipcode').css('border-color', 'lightgrey');
        $('#email').css('border-color', 'lightgrey');
        $('#fax').css('border-color', 'lightgrey');
        $('#cstno').css('border-color', 'lightgrey');
        $('#cstdate').css('border-color', 'lightgrey');
        $('#tinno').css('border-color', 'lightgrey');
        $('#tindate').css('border-color', 'lightgrey');
        $('#contactname').css('border-color', 'lightgrey');
        $('#mobno').css('border-color', 'lightgrey');
        $('#compadd1').css('border-color', 'lightgrey');
        $('#compadd2').css('border-color', 'lightgrey');
        $('#compadd3').css('border-color', 'lightgrey');
        $('#ddlcompcity').css('border-color', 'lightgrey');
        $('#compName').css('border-color', 'lightgrey');

        $('#compStatus').css('border-color', 'lightgrey');
        $('#ddlcountry').css('border-color', 'lightgrey');
        $('#telex').css('border-color', 'lightgrey');
        $('#rbicode').css('border-color', 'lightgrey');
        $('#iecode').css('border-color', 'lightgrey');
        $('#prefix').css('border-color', 'lightgrey');
        $('#aepcno').css('border-color', 'lightgrey');
        $('#aepcdate').css('border-color', 'lightgrey');
        $('#logoname').css('border-color', 'lightgrey');
        $('#eanno').css('border-color', 'lightgrey');
        $('#rcmcno').css('border-color', 'lightgrey');
        $('#tngstno').css('border-color', 'lightgrey');
        $('#range').css('border-color', 'lightgrey');
        $('#division').css('border-color', 'lightgrey');

        //$('#tbody').DataTable().destroy();

        LoadCityDDL("#ddlcompcity");
        LoadCountryDDL("#ddlcountry");

        $('#tindate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#cstdate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#aepcdate').val(moment(new Date()).format('DD/MM/YYYY'));
        $('#myModal6').modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}
function adduom() {
    debugger;
    if (rightsflg == 1) {
        $('#txtGUomID').val("");
        $('#txtGUom').val("");
        $('#txtGUomLookUp').val("");
        $('#txtToBUom').val("");
        $('#garStatus').val("");

        $('#btngarAdd').show();
        $('#txtGUomID').css('border-color', 'lightgrey');
        $('#txtGUom').css('border-color', 'lightgrey');
        $('#txtGUomLookUp').css('border-color', 'lightgrey');
        $('#txtToBUom').css('border-color', 'lightgrey');
        $('#garStatus').css('border-color', 'lightgrey');
        $('#myModal7').modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}
function addsystem() {
    debugger;
    if (rightsflg == 1) {
        $('#ShipmentSystemID').val("");
        $('#shipName').val("");
        $('#shipStatus').val("");
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#ShipmentSystemID').css('border-color', 'lightgrey');
        $('#shipName').css('border-color', 'lightgrey');
        $('#shipStatus').css('border-color', 'lightgrey');
        $('#myModal9').modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}
function addshipment() {
    debugger;
    if (rightsflg == 1) {
        $('#ShipementModeID').val("");
        $('#modeName').val("");
        $('#modeStatus').val("");

        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#ShipementModeID').css('border-color', 'lightgrey');
        $('#modeName').css('border-color', 'lightgrey');
        $('#modeStatus').css('border-color', 'lightgrey');
        $('#myModal10').modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}
function addpayment() {
    debugger;
    if (rightsflg == 1) {
        $('#PaymentTermsID').val("");
        $('#termsName').val("");
        $('#termsStatus').val("");
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#PaymentTermsID').css('border-color', 'lightgrey');
        $('#termsName').css('border-color', 'lightgrey');
        $('#termsStatus').css('border-color', 'lightgrey');
        $('#myModal11').modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}
function addemployee() {
    if (rightsflg == 1) {
        $('#txtEmployeeID').val("");
        $('#txtName').val("");
        $('#txtempno').val("");
        $('#ddlCompanyUnit').empty();
        $('#ddlDepartment').empty();
        $('#ddlDesignation').empty();
        $('#txtAdd1').val("");
        $('#txtAdd2').val("");
        $('#txtAdd3').val("");
        $('#ddlCity').empty();
        $('#txtempEmail').val("");
        $('#txtempno').val("");
        $('#txtPhoneNo').val("");
        $('#chkPieceRate').val("");
        $('#chkprodemp').val("");
        $('#chkrlvd').val("");
        $('#empStatus').val("");

        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#txtEmployeeID').css('border-color', 'lightgrey');
        $('#txtempno').css('border-color', 'lightgrey');
        $('#ddlCompanyUnit').css('border-color', 'lightgrey');
        $('#ddlDepartment').css('border-color', 'lightgrey');
        $('#ddlDesignation').css('border-color', 'lightgrey');
        $('#txtAdd1').css('border-color', 'lightgrey');
        $('#txtAdd2').css('border-color', 'lightgrey');
        $('#txtAdd3').css('border-color', 'lightgrey');
        $('#ddlCity').css('border-color', 'lightgrey');
        $('#txtCityID').css('border-color', 'lightgrey');
        $('#txtempEmail').css('border-color', 'lightgrey');
        $('#txtempno').css('border-color', 'lightgrey');
        $('#txtPhoneNo').css('border-color', 'lightgrey');
        $('#chkPieceRate').css('border-color', 'lightgrey');
        $('#chkprodemp').css('border-color', 'lightgrey');
        $('#chkrlvd').css('border-color', 'lightgrey');
        $('#txtName').css('border-color', 'lightgrey');
        $('#empStatus').css('border-color', 'lightgrey');
        //$('#tbody').DataTable().destroy();

        LoadCityDDL("#ddlCity");
        LoadDesignationDDL("#ddlDesignation");
        LoadDepartmentDDL("#ddlDepartment");
        LoadCompanyUnitDDL("#ddlCompanyUnit");
        $('#myModal8').modal('show');
    }
    else {
        //alert("You don't have rights...");
        var msg = "You don't have rights...";
        var flg = 4;
        var md = 1;
        var ul = "";
        AlartMessage(msg, flg, md, ul);
    }
}

function LoadFOrdDropDetails() {


    var BMasId = $('#ddlCPOrderNo').val();
    var JbId = 0;
    var StyId = 0;
    var RefNo = "";
    var RNo = $('select#ddlCPRefNo option:selected').val();

    if (RNo == 0) {
        RefNo == "";
    }
    else {

        RefNo = $('select#ddlCPRefNo option:selected').val();
    }


    $.ajax({
        url: "/StockAuditEntry/GetDropNo",
        data: JSON.stringify({ BMasId: BMasId, JobId: JbId, Styleid: StyId, RefNo: RefNo }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var obj = result.Value;
            if (result.Status == 'SUCCESS') {

                var data = result.Value;


                //RefNo
                $(ddlCPRefNo).empty();
                $(ddlCPRefNo).append($('<option/>').val('0').text('--Select RefNo--'));
                $.each(data, function () {
                    $(ddlCPRefNo).append($('<option></option>').text(this.RefNo));
                });

            }


        }

    });

}

function LockDet() {
    var ord = $('#txtOrderNo').val();
    var sty = 1;

    $.ajax({
        url: "/BudgetApproval/LoadLockDet",
        data: JSON.stringify({ ordno: ord, styleid: sty, Type: 'O' }),
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            //var obj = result;
            PlanLock = result.Value;

        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}