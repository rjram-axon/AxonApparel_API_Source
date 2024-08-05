var dcompany = "";
$(document).ready(function () {

    LoadCompanyDDL("#ddlCompany");
    LoadCompanyUnitDDL("#ddlCompUnit");
    LoadCurrencyDDL("#ddlCurrency");
    LoadColorDDL("#ddlbasecolor");
    LoadMisDetails();

});
function SelectAvatar() {
    var avatar = $('#ddlMaleFemale').val();
    if (avatar == 'F') {
        $('#SetFemale').show();
        $('#SetMale').hide();
    } else {
        $('#SetFemale').hide();
        $('#SetMale').show();
    }
}
function LoadMisDetails() {

    $.ajax({
        url: "/MisSetting/GetMisDetails",
        data: JSON.stringify({}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var obj = result.Value;
            debugger;
            if (obj != undefined) {
                $('#ddlCompany').val(obj[0]["dCompanyId"]);
                $('#ddlCompUnit').val(obj[0]["dCompanyUnitId"]);
                $('#txtMisId').val(obj[0]["MisId"]);
                $('#txtMainFDays').val(obj[0]["FromDays"]);
                $('#txtFinYear').val(obj[0]["FINYEAR"]);
                $('#txtAssYear').val(obj[0]["ASSTYEAR"]);
                $('#ddlCurrency').val(obj[0]["dCurrenyId"]);
                $('#ddlbasecolor').val(obj[0]["BaseColorid"]);
                $('#txtDbPath').val(obj[0]["ApplicationPath"]);
                $('#txtCuttTole').val(obj[0]["CuttingTolerance"]);
                dcompany = obj[0]["Company"];
                $('#ddlMaleFemale').val(obj[0]["Avatar_Gender"]).trigger('change');
                var AvatarChk = obj[0]["Avatar_Gender"];
                if (AvatarChk == 'F') {
                    $('#SetFemale').show();
                    $('#SetMale').hide();
                } else {
                    $('#SetFemale').hide();
                    $('#SetMale').show();
                }
                var MisId = obj[0]["MisId"];

                if (obj[0]["CostAppCheck"] == "Y") {
                    $('#chkPurBudApp').prop("checked", true);
                } else {
                    $('#chkPurBudApp').prop("checked", false);
                }

                if (obj[0]["CostAppSamPurCheck"] == "Y") {
                    $('#chkPurBudAppSam').prop("checked", true);
                } else {
                    $('#chkPurBudAppSam').prop("checked", false);
                }

                if (obj[0]["CostAppSamProCheck"] == "Y") {
                    $('#chkProcessBudAppSam').prop("checked", true);
                } else {
                    $('#chkProcessBudAppSam').prop("checked", false);
                }
                
                if (obj[0]["CostBudDetailsCheck"] == "Y") {
                    $('#chkBuyerDetAtm').prop("checked", true);
                } else {
                    $('#chkBuyerDetAtm').prop("checked", false);
                }
                if (obj[0]["ValidateBudgetRateInCuttingOrder"] == "Y") {
                    $('#chkCutBudApp').prop("checked", true);
                } else {
                    $('#chkCutBudApp').prop("checked", false);
                }

                if (obj[0]["ValidateBudgetRateSewing"] == "Y") {
                    $('#chkSewingBudApp').prop("checked", true);
                } else {
                    $('#chkSewingBudApp').prop("checked", false);
                }

                if (obj[0]["ValidateBudgetRateGenProdIssue"] == "Y") {
                    $('#chkComProdIssBudApp').prop("checked", true);
                } else {
                    $('#chkComProdIssBudApp').prop("checked", false);
                }

                if (obj[0]["ValidateBudgetRateInCuttingOrderSample"] == "Y") {
                    $('#chkCutBudAppSam').prop("checked", true);
                } else {
                    $('#chkCutBudAppSam').prop("checked", false);
                }

                if (obj[0]["ValidateBudgetRateSewingSample"] == "Y") {
                    $('#chkSewingBudAppSam').prop("checked", true);
                } else {
                    $('#chkSewingBudAppSam').prop("checked", false);
                }

                if (obj[0]["ValidateBudgetRateGenProdIssueSample"] == "Y") {
                    $('#chkComProdIssBudAppSam').prop("checked", true);
                } else {
                    $('#chkComProdIssBudAppSam').prop("checked", false);
                }


                if (obj[0]["checkBillsToInvoiceEntryProduction"] == "Y") {
                    $('#chkInvoiceBillProducion').prop("checked", true);
                } else {
                    $('#chkInvoiceBillProducion').prop("checked", false);
                }


                if (obj[0]["chkSalesInvoiceDespatch"] == "Y") {
                    $('#chkSalesInvoiceDespatch').prop("checked", true);
                } else {
                    $('#chkSalesInvoiceDespatch').prop("checked", false);
                }

                if (obj[0]["chkFabricDeliveryIssue"] == "Y") {
                    $('#chkFabricDeliveryIssue').prop("checked", true);
                } else {
                    $('#chkFabricDeliveryIssue').prop("checked", false);
                }


                if (obj[0]["ValidatePOApproval"] == "Y") {
                    $('#chkPurOrdApp').prop("checked", true);
                } else {
                    $('#chkPurOrdApp').prop("checked", false);
                }
                if (obj[0]["ValidatePOAgIndent"] == "Y") {
                    $('#chkPurOrdInd').prop("checked", true);
                } else {
                    $('#chkPurOrdInd').prop("checked", false);
                }

                if (obj[0]["ValidateGafiCharges"] == "Y") {
                    $('#chkgaficharges').prop("checked", true);
                } else {
                    $('#chkgaficharges').prop("checked", false);
                }


                if (obj[0]["chkGstPerAgainstHsncode"] == "Y") {
                    $('#chkHsnCode').prop("checked", true);
                } else {
                    $('#chkHsnCode').prop("checked", false);
                }

                if (obj[0]["chkEnbAssortRate"] == "Y") {
                    $('#chkEnableAssortRate').prop("checked", true);
                } else {
                    $('#chkEnableAssortRate').prop("checked", false);
                }

                if (obj[0]["chkEnbTransDate"] == true) {
                    $('#chkEnableTransDate').prop("checked", true);
                } else {
                    $('#chkEnableTransDate').prop("checked", false);
                }

                if (obj[0]["chkBuyerWiseCosting"] == "Y") {
                    $('#chkbuyerwisecosting').prop("checked", true);
                } else {
                    $('#chkbuyerwisecosting').prop("checked", false);
                }


                if (obj[0]["CostProCheckWork"] == "Y") {
                    $('#chkProcessBudApp').prop("checked", true);
                } else {
                    $('#chkProcessBudApp').prop("checked", false);
                }

                if (obj[0]["ChkJobOrderRate"] == "Y") {
                    $('#chkEnbJobRate').prop("checked", true);
                } else {
                    $('#chkEnbJobRate').prop("checked", false);
                }

                if (obj[0]["ValidateAppForOpenPrg"] == "Y") {
                    $('#chkOpenProgRaiseDc').prop("checked", true);
                } else {
                    $('#chkOpenProgRaiseDc').prop("checked", false);
                }

                if (obj[0]["checkBillsToInvoiceEntry"] == 1) {
                    $('#OptchkBillsToInvoiceEntry').prop("checked", true);
                } else {
                    $('#OptchkBillsToInvoiceEntry').prop("checked", false);
                }

                if (obj[0]["checkBillsToComInvoiceEntry"] == 1) {
                    $('#OptchkBillsToComInvoiceEntry').prop("checked", true);
                } else {
                    $('#OptchkBillsToComInvoiceEntry').prop("checked", false);
                }

                if (obj[0]["ValidateStore"] == true) {
                    $('#OptchkStoreEntry').prop("checked", true);
                } else {
                    $('#OptchkStoreEntry').prop("checked", false);
                }

                if (obj[0]["chkValidateProgramQtyinTransfer"] == true) {
                    $('#chkValidateProgramQtyinTransfer').prop("checked", true);
                } else {
                    $('#chkValidateProgramQtyinTransfer').prop("checked", false);
                }


                if (obj[0]["ValidateProcessStore"] == true) {
                    $('#chkStoreinProcess').prop("checked", true);
                } else {
                    $('#chkStoreinProcess').prop("checked", false);
                }

                if (obj[0]["ValidateProcessIssueLoc"] == true) {
                    $('#chkProcessIssueLocation').prop("checked", true);
                } else {
                    $('#chkProcessIssueLocation').prop("checked", false);
                }

                if (obj[0]["validateProcessOrderApp"] == true) {
                    $('#chkProcessOrderApproval').prop("checked", true);
                } else {
                    $('#chkProcessOrderApproval').prop("checked", false);
                }

                if (obj[0]["SupplierSetup"] == true) {
                    $('#chkSupplierProcessSetup').prop("checked", true);
                } else {
                    $('#chkSupplierProcessSetup').prop("checked", false);
                }

                if (obj[0]["chkBarcode"] == "Y") {
                    $('#chkBarcode').prop("checked", true);
                } else {
                    $('#chkBarcode').prop("checked", false);
                }

                if (obj[0]["chkQRcode"] == "Y") {
                    $('#chkQRcode').prop("checked", true);
                } else {
                    $('#chkQRcode').prop("checked", false);
                }


                if (obj[0]["ValidateProductionStore"] == true) {
                    $('#chkStoreinProduction').prop("checked", true);
                } else {
                    $('#chkStoreinProduction').prop("checked", false);
                }

                if (obj[0]["ValidateBudRateinPurinvBulk"] == 1) {
                    $('#chkValidateBudgetrateBulk').prop("checked", true);
                } else {
                    $('#chkValidateBudgetrateBulk').prop("checked", false);
                }
                if (obj[0]["ValidatePurchaseGRNqty"] == 1) {
                    $('#chkValidatePurchaseGRNqty').prop("checked", true);
                } else {
                    $('#chkValidatePurchaseGRNqty').prop("checked", false);
                }
                if (obj[0]["ValidateProcessGRNqty"] == 1) {
                    $('#chkValidateProcessGRNqty').prop("checked", true);
                } else {
                    $('#chkValidateProcessGRNqty').prop("checked", false);
                }

                if (obj[0]["ValidateBudRateinPurinvSample"] == 1) {
                    $('#chkValidateBudgetrateSample').prop("checked", true);
                } else {
                    $('#chkValidateBudgetrateSample').prop("checked", false);
                }
                if (obj[0]["ValidateBudRateinProinvBulk"] == 1) {
                    $('#chkValidateBudgetrateProcBulk').prop("checked", true);
                } else {
                    $('#chkValidateBudgetrateProcBulk').prop("checked", false);
                }

                if (obj[0]["ValidateBudRateinProinvSample"] == 1) {
                    $('#chkValidateBudgetrateProcSample').prop("checked", true);
                } else {
                    $('#chkValidateBudgetrateProcSample').prop("checked", false);
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

function GetDefault() {

    var MisSetId = $('#txtMisId').val();


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
                $('#txtMainFDays').val(obj[0]["FromDays"]);
                //window.location.href = "/BulkOrder/BulkOrderIndex?UserId=" + UserId + "=&UserName=" + UserName;
                //window.location.href = "/BulkOrder/BulkOrderIndex";

            }
            else {

            }
        }
    });
}

function Update() {
    debugger;
    var ChkPurBud = 0;
    var ChkPurBudSam = 0;
    var ChkProBudSam = 0;
    var ChkCutBud = 0;
    var ChkSewBud = 0;
    var ChkProdIssBud = 0;
    var ChkCutBudSam = 0;
    var ChkSewBudSam = 0;
    var ChkProdIssBudSam = 0;
    var ChkProdbill = 0;
    var ChkPOApp = 0;
    var ChkPOAgInd = 0;
    var ChkGafiChrges = 0;
    var ChkHsncode = 0;
    var ChkEnbTran = 0;
    var ChkEnbAssort = 0;
    var ChkBuyerWiseCosting = 0;
    var checkbox_value = "";
    var ChkProBud = 0;
    var ChkEnbJobRate = 0;
    var ChkBuyDet = 0;
    var ChkOpenPrgRaiseDc = 0;
    var ChkBillsToInvoice = 0;
    var ChkBillsToComInvoice = 0;
    var chkValidateProgramQtyinTransfer = 0;
    var ChkValidateStore = 0;
    var ChkValidateProcessStore = 0;
    var ChkValidateProdStore = 0;
    var ChkInvDesp = 0;
    var chkProcessIssueLocation = 0;
    var chkProcessOrderApproval = 0;
    var chkSupplierProcessSetup = 0;

    var isChkValidateStore = false;
    isChkValidateStore = $('#OptchkStoreEntry').is(":checked");
    if (isChkValidateStore == true) {
        ChkValidateStore = true;
    } else {
        ChkValidateStore = false;
    }

    var isChkValidateStore = false;
    isChkValidateStore = $('#chkStoreinProcess').is(":checked");
    if (isChkValidateStore == true) {
        ChkValidateProcessStore = true;
    } else {
        ChkValidateProcessStore = false;
    }

    var ischkProcessIssueLocation = false;
    ischkProcessIssueLocation = $('#chkProcessIssueLocation').is(":checked");
    if (ischkProcessIssueLocation == true) {
        chkProcessIssueLocation = true;
    } else {
        chkProcessIssueLocation = false;
    }

    var ischkProcessOrderApproval = false;
    ischkProcessOrderApproval = $('#chkProcessOrderApproval').is(":checked");
    if (ischkProcessOrderApproval == true) {
        chkProcessOrderApproval = true;
    } else {
        chkProcessOrderApproval = false;
    }


    var ischkSupplierProcessSetup = false;
    ischkSupplierProcessSetup = $('#chkSupplierProcessSetup').is(":checked");
    if (ischkSupplierProcessSetup == true) {
        chkSupplierProcessSetup = true;
    } else {
        chkSupplierProcessSetup = false;
    }

    var ChkBarcode = 0;
    var ChkQRcode = 0;

    var IsChkBarcode = false;
    IsChkBarcode = $('#chkBarcode').is(":checked");
    if (IsChkBarcode == true) {
        ChkBarcode = "Y";
    } else {
        ChkBarcode = "N";
    }

    var IsChkQRcode = false;
    IsChkQRcode = $('#chkQRcode').is(":checked");
    if (IsChkQRcode == true) {
        ChkQRcode = "Y";
    } else {
        ChkQRcode = "N";
    }

    var isChkValidateStore = false;
    isChkValidateStore = $('#chkStoreinProduction').is(":checked");
    if (isChkValidateStore == true) {
        ChkValidateProdStore = true;
    } else {
        ChkValidateProdStore = false;
    }

    var isGafiChgchecked = false;
    isGafiChgchecked = $('#chkgaficharges').is(":checked");
    if (isGafiChgchecked == true) {
        ChkGafiChrges = "Y";
    } else {
        ChkGafiChrges = "N";
    }

    var ishsncodechecked = false;
    ishsncodechecked = $('#chkHsnCode').is(":checked");
    if (ishsncodechecked == true) {
        ChkHsncode = "Y";
    } else {
        ChkHsncode = "N";
    }

    var isBudAppchecked = false;
    isBudAppchecked = $('#chkPurBudApp').is(":checked");
    if (isBudAppchecked == true) {
        ChkPurBud = "Y";
    } else {
        ChkPurBud = "N";
    }

    var isBudAppSamchecked = false;
    isBudAppSamchecked = $('#chkPurBudAppSam').is(":checked");
    if (isBudAppSamchecked == true) {
        ChkPurBudSam = "Y";
    } else {
        ChkPurBudSam = "N";
    }

    var isProcBudAppSamchecked = false;
    isProcBudAppSamchecked = $('#chkProcessBudAppSam').is(":checked");
    if (isProcBudAppSamchecked == true) {
        ChkProBudSam = "Y";
    } else {
        ChkProBudSam = "N";
    }

    var IsCutAppchecked = false;
    IsCutAppchecked = $('#chkCutBudApp').is(":checked");
    if (IsCutAppchecked == true) {
        ChkCutBud = "Y";
    } else {
        ChkCutBud = "N";
    }

    var IsSewAppchecked = false;
    IsSewAppchecked = $('#chkSewingBudApp').is(":checked");
    if (IsSewAppchecked == true) {
        ChkSewBud = "Y";
    } else {
        ChkSewBud = "N";
    }

    var IsProdIssAppchecked = false;
    IsProdIssAppchecked = $('#chkComProdIssBudApp').is(":checked");
    if (IsProdIssAppchecked == true) {
        ChkProdIssBud = "Y";
    } else {
        ChkProdIssBud = "N";
    }


    var IsCutAppcheckedSam = false;
    IsCutAppcheckedSam = $('#chkCutBudAppSam').is(":checked");
    if (IsCutAppcheckedSam == true) {
        ChkCutBudSam= "Y";
    } else {
        ChkCutBudSam = "N";
    }

    var IsSewAppcheckedSam = false;
    IsSewAppcheckedSam = $('#chkSewingBudAppSam').is(":checked");
    if (IsSewAppcheckedSam == true) {
        ChkSewBudSam = "Y";
    } else {
        ChkSewBudSam = "N";
    }

    var IsProdIssAppcheckedSam = false;
    IsProdIssAppcheckedSam = $('#chkComProdIssBudApp').is(":checked");
    if (IsProdIssAppcheckedSam == true) {
        ChkProdIssBudSam = "Y";
    } else {
        ChkProdIssBudSam = "N";
    }

    var IsChkProdbill = false;
    IsChkProdbill = $('#chkInvoiceBillProducion').is(":checked");
    if (IsChkProdbill == true) {
        ChkProdbill = "Y";
    } else {
        ChkProdbill = "N";
    }

    var IsChkInvDes = false;
    IsChkInvDes = $('#chkSalesInvoiceDespatch').is(":checked");
    if (IsChkInvDes == true) {
        ChkInvDesp = "Y";
    } else {
        ChkInvDesp = "N";
    }

    var IsChkFabDelyIssue = false;
    IsChkFabDelyIssue = $('#chkFabricDeliveryIssue').is(":checked");
    if (IsChkFabDelyIssue == true) {
        ChkFabDelyIssue = "Y";
    } else {
        ChkFabDelyIssue = "N";
    }

    var IsPOAppchecked = false;
    IsPOAppchecked = $('#chkPurOrdApp').is(":checked");
    if (IsPOAppchecked == true) {
        ChkPOApp = "Y";
    } else {
        ChkPOApp = "N";
    }


    var IsPOAgnIndchecked = false;
    IsPOAgnIndchecked = $('#chkPurOrdInd').is(":checked");
    if (IsPOAgnIndchecked == true) {
        ChkPOAgInd = "Y";
    } else {
        ChkPOAgInd = "N";
    }


    var IschkEnTranschecked = false;
    IschkEnTranschecked = $('#chkEnableTransDate').is(":checked");
    if (IschkEnTranschecked == true) {
        ChkEnbTran = true;
    } else {
        ChkEnbTran = false;
    }

    var IschkEnAssortRatechecked = false;
    IschkEnAssortRatechecked = $('#chkEnableAssortRate').is(":checked");
    if (IschkEnAssortRatechecked == true) {
        ChkEnbAssort = "Y";
    } else {
        ChkEnbAssort = "N";
    }

    var IsBuyerWiseCostingchecked = false;
    IsBuyerWiseCostingchecked = $('#chkbuyerwisecosting').is(":checked");
    if (IsBuyerWiseCostingchecked == true) {
        ChkBuyerWiseCosting = "Y";
    } else {
        ChkBuyerWiseCosting = "N";
    }

    var isBudAppProchecked = false;
    isBudAppProchecked = $('#chkProcessBudApp').is(":checked");
    if (isBudAppProchecked == true) {
        ChkProBud = "Y";
    } else {
        ChkProBud = "N";
    }

    var IschkEnJobRatechecked = false;
    IschkEnJobRatechecked = $('#chkEnbJobRate').is(":checked");
    if (IschkEnJobRatechecked == true) {
        ChkEnbJobRate = "Y";
    } else {
        ChkEnbJobRate = "N";
    }


    var IsBuyDetchecked = false;
    IsBuyDetchecked = $('#chkBuyerDetAtm').is(":checked");
    if (IsBuyDetchecked == true) {
        ChkBuyDet = "Y";
    } else {
        ChkBuyDet = "N";
    }


    var IsChkOpenPrgRaiseDcchecked = false;
    IsChkOpenPrgRaiseDcchecked = $('#chkOpenProgRaiseDc').is(":checked");
    if (IsChkOpenPrgRaiseDcchecked == true) {
        ChkOpenPrgRaiseDc = "Y";
    } else {
        ChkOpenPrgRaiseDc = "N";
    }


    var IsChChkBillsToInvoicechecked = false;
    IsChChkBillsToInvoicechecked = $('#OptchkBillsToInvoiceEntry').is(":checked");
    if (IsChChkBillsToInvoicechecked == true) {
        ChkBillsToInvoice = 1;
    } else {
        ChkBillsToInvoice = 0;
    }

    var IsChChkBillsToComInvoicechecked = false;
    IsChChkBillsToComInvoicechecked = $('#OptchkBillsToComInvoiceEntry').is(":checked");
    if (IsChChkBillsToComInvoicechecked == true) {
        ChkBillsToComInvoice = 1;
    } else {
        ChkBillsToComInvoice = 0;
    }

    var IschkValidateProgramQtyinTransfer = false;
    IschkValidateProgramQtyinTransfer = $('#chkValidateProgramQtyinTransfer').is(":checked");
    if (IschkValidateProgramQtyinTransfer == true) {
        chkValidateProgramQtyinTransfer = 1;
    } else {
        chkValidateProgramQtyinTransfer = 0;
    }


    var chkbudratepurinvbulk = 0;
    var chkbudratepurinvsample = 0;
    var chkValidatePurchaseGRNqty = 0;
    var chkValidateProcessGRNqty = 0;

    var IsChkBudratePurinvBulk = false;
    IsChkBudratePurinvBulk = $('#chkValidateBudgetrateBulk').is(":checked");
    if (IsChkBudratePurinvBulk == true) {
        chkbudratepurinvbulk = 1;
    } else {
        chkbudratepurinvbulk = 0;
    }

    var IsChkBudratePurinvSample = false;
    IsChkBudratePurinvSample = $('#chkValidateBudgetrateSample').is(":checked");
    if (IsChkBudratePurinvSample == true) {
        chkbudratepurinvsample = 1;
    } else {
        chkbudratepurinvsample = 0;
    }


    var IschkValidatePurchaseGRNqty = false;
    IschkValidatePurchaseGRNqty = $('#chkValidatePurchaseGRNqty').is(":checked");
    if (IschkValidatePurchaseGRNqty == true) {
        chkValidatePurchaseGRNqty = 1;
    } else {
        chkValidatePurchaseGRNqty = 0;
    }

    var IschkValidateProcessGRNqty = false;
    IschkValidateProcessGRNqty = $('#chkValidateProcessGRNqty').is(":checked");
    if (IschkValidateProcessGRNqty == true) {
        chkValidateProcessGRNqty = 1;
    } else {
        chkValidateProcessGRNqty = 0;
    }


    var chkbudrateproinvbulk = 0;
    var chkbudrateproinvsample = 0;

    var IsChkBudrateProinvBulk = false;
    IsChkBudrateProinvBulk = $('#chkValidateBudgetrateProcBulk').is(":checked");
    if (IsChkBudrateProinvBulk == true) {
        chkbudrateproinvbulk = 1;
    } else {
        chkbudrateproinvbulk = 0;
    }

    var IsChkBudrateProinvSample = false;
    IsChkBudrateProinvSample = $('#chkValidateBudgetrateProcSample').is(":checked");
    if (IsChkBudrateProinvSample == true) {
        chkbudrateproinvsample = 1;
    } else {
        chkbudrateproinvsample = 0;
    }
    var AVgender = $('#ddlMaleFemale').val();



    var objSubmit = {

        MisId: $('#txtMisId').val(),
        dCompanyId: $('#ddlCompany').val(),
        dCompanyUnitId: $('#ddlCompUnit').val(),
        FromDays: $('#txtMainFDays').val(),
        FINYEAR: $('#txtFinYear').val(),
        ASSTYEAR: $('#txtAssYear').val(),
        dCurrenyId: $('#ddlCurrency').val(),
        CostAppCheck: ChkPurBud,
        ValidateBudgetRateInCuttingOrder: ChkCutBud,
        ValidateBudgetRateSewing: ChkSewBud,
        ValidateBudgetRateGenProdIssue: ChkProdIssBud,
        ValidatePOApproval: ChkPOApp,
        ValidatePOAgIndent: ChkPOAgInd,
        ValidateGafiCharges: ChkGafiChrges,
        chkGstPerAgainstHsncode: ChkHsncode,
        chkEnbTransDate: ChkEnbTran,
        chkEnbAssortRate: ChkEnbAssort,
        chkBuyerWiseCosting: ChkBuyerWiseCosting,
        CostProCheckWork: ChkProBud,
        ChkJobOrderRate: ChkEnbJobRate,
        CostBudDetailsCheck: ChkBuyDet,
        ValidateAppForOpenPrg: ChkOpenPrgRaiseDc,
        checkBillsToInvoiceEntry: ChkBillsToInvoice,
        ApplicationPath: $('#txtDbPath').val(),
        BaseColorid: $('#ddlbasecolor').val(),
        ValidateStore:ChkValidateStore,
        ValidateProcessStore:ChkValidateProcessStore,
        ValidateProductionStore: ChkValidateProdStore,
        ValidateBudRateinPurinvBulk: chkbudratepurinvbulk,
        ValidateBudRateinPurinvSample: chkbudratepurinvsample,
        ValidateBudRateinProinvBulk: chkbudrateproinvbulk,
        ValidateBudRateinProinvSample: chkbudrateproinvsample,
        CuttingTolerance: $('#txtCuttTole').val(),
        ValidateBudgetRateInCuttingOrderSample: ChkCutBudSam,
        ValidateBudgetRateSewingSample: ChkSewBudSam,
        ValidateBudgetRateGenProdIssueSample: ChkProdIssBudSam,
        checkBillsToInvoiceEntryProduction: ChkProdbill,
        chkSalesInvoiceDespatch: ChkInvDesp,

        chkFabricDeliveryIssue: ChkFabDelyIssue,

        CostAppSamPurCheck: ChkPurBudSam,
        CostAppSamProCheck: ChkProBudSam,
        Avatar_Gender: AVgender,
        checkBillsToComInvoiceEntry: ChkBillsToComInvoice,
        ValidatePurchaseGRNqty: chkValidatePurchaseGRNqty,
        ValidateProcessGRNqty: chkValidateProcessGRNqty,
        chkValidateProgramQtyinTransfer: chkValidateProgramQtyinTransfer,
        ValidateProcessIssueLoc: chkProcessIssueLocation,
        validateProcessOrderApp: chkProcessOrderApproval,
        SupplierSetup: chkSupplierProcessSetup,

        ChkBarcode: ChkBarcode,
        ChkQRcode: ChkQRcode,
    };
    LoadingSymb();
    $.ajax({
        url: "/MisSetting/Update",
        data: JSON.stringify(objSubmit),
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
                //location.reload();

                GetDefault();
                //LoadMisDetails();
            } else {
                window.location.href = "/Error/Index";
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}