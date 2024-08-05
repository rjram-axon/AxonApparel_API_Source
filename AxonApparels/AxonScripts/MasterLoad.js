
var countryDDL = "#";
var cityDDL = "#";
var departmentDDL = "#";
var designationDDL = "#";
var itemDDL = "#";
var processDDL = "#";
var panelprocessDDL = "#";
var paytermsDDL = "#";
var TermConditionDDL = "#";
var buyerDDL = "#";
var seasonDDL = "#";
var shipmodeDDL = "#";
var shipsystemDDL = "#";
var companyDDL = "#";
var storesectionDDL = "#";
var storeunitDDL = "#";
var itemgroupDDL = "#";
var colorgroupDDL = "#";
var uomDDL = "#";
var CompanyUnitDDL = "#";
var employeeDDL = "#";
var consigneeDDL = "#";
var agentDDL = "#";
var agentSDDL = "#";
var guomDDL = "#";
var portofloadDDL = "#";
var DDL = "#";
var colorDDL = "#";
var ssizeDDL = "#";
var sizeDDL = "#";
var fsizeDDL = "#";
var ysizeDDL = "#";
var gsizeDDL = "#";
var supplierDDL = "#";
var processseqDDL = "#";
var courDDL = "#";
var currencyDDL = "#";
var addlessDDL = "#";
var componentDDL = "#";
var enquiryDDL = "#";
var yarnDDL = "#";
var fabricDDL = "#";
var RefNoDDL = "#";
var OverhdsDDL = "#";
var AccessoryDDL = "#";
var GarmentDDL = "#";
var workdivisionDDL = "#";
var CuttingRecptDDL = "#";
var CuttingOrderDDL = "#";
var JobOrdDDL = "#";
var BRefDDL = "#";
var PurOrdNoDDL = "#";
var GRNNoDDL = "#";
var ShiftDDL = "#";
var RefDDL = "#";
var GroupNameDDL = '#';
var stateDDL = '#';
var ReasonDDL = "#";
var RoleDDL = "#";
var StyleTemplateDDL = "#";
var OrderStyleTemplateDDL = "#";
var hsnDDL = "#";
var QuotationDDL = "#";
var SampleTypeDDL = "#";
var TestingTypeDDL = "#";
var TestingDCNoDDL = "#";
var BulkRefNoDDL = "#";
var SampleRefNoDDL = "#";
var BulkJobNoDDL = "#";
var SampleJobNoDDL = "#";
var TermsDDL = "#";
var OrderNoDDL = "#";
var MenuName = '';
var Addflg = 0;
var Editflg = 0;
var Printflg = 0;
var Deleteflg = 0;
var Allflg = 0
var genItemDDL = "#";
function LoadGroupNameDDL(GroupNameDDLName) {
    debugger;
    GroupNameDDL = GroupNameDDLName;
    httpGet("/UserGroup/GetGroupNames", onGroupNameSuccess, onGroupNameFailure);
}

//function LoadTestingDCDDL(TestingDCNoDDLName) {
//    debugger;
//    TestingDCNoDDL = TestingDCNoDDLName;
//    httpGet("/TestingDC/GetDCNO", onTestingDCNoSuccess, onTestingDCNoFailure);
//}

function LoadSampleTypeDDL(SampleTypeDDLName) {
    debugger;
    SampleTypeDDL = SampleTypeDDLName;
    httpGet("/SampleType/GetSampleType", onSampleTypeSuccess, onSampleTypeFailure);
}

function LoadStyleTemplateDDL(StyleTemplateDDLName) {
    debugger;
    StyleTemplateDDL = StyleTemplateDDLName;
    httpGet("/StyleTemplate/GetStyleTempLateDDL", onStyleTemplateSuccess, onStyleTempFailure);
}

function LoadOrderStyleTemplateDDL(OrderStyleTemplateDDLName) {
    debugger;
    OrderStyleTemplateDDL = OrderStyleTemplateDDLName;
    httpGet("/GarmentItem/GetOrderStyleTempLateDDL", onOrderStyleTemplateSuccess, onOrderStyleTempFailure);
}
function LoadShiftDDL(ShiftDDLName) {
    debugger;
    ShiftDDL = ShiftDDLName;
    httpGet("/Item/GetShift", onShiftSuccess, onShiftFailure);
}

//function LoadTestingDCDDL(TestingDCNoDDLName) {
//    debugger;
//    TestingDCNoDDL = TestingDCNoDDLName;
//    httpGet("/TestingDC/GetDCNO", onTestingDCNoSuccess, onTestingDCNoFailure);
//}

function LoadReasonDDL(ReasonDDLName) {
    debugger;
    ReasonDDL = ReasonDDLName;
    httpGet("/Reason/GetReason", onReasonSuccess, onReasonFailure);
}

//function LoadTestingTypeDDL(TestingTypeDDLName) {
//    debugger;
//    TestingTypeDDL = TestingTypeDDLName;
//    httpGet("/TestingType/GetTestingType", onTestingTypeSuccess, onTestingTypeFailure);
//}
function LoadCuttingOrderNoDDL(CuttingOrderDDLName) {
    debugger;
    CuttingOrderDDL = CuttingOrderDDLName;
    httpGet("/CuttingOrder/GetCuttingOrderNo", onCuttingOrderSuccess, onAccessoryFailure);
}

function LoadCuttingRecptNoDDL(CuttingRecptDDLName) {
    debugger;
    CuttingRecptDDL = CuttingRecptDDLName;
    httpGet("/CuttingOrderReceipt/GetCuttingReceiptNo", onCuttingRecptSuccess, onCuttingReceiptFailure);
}

function LoadBulkRefNoDDL(RefNoDDLName) {
    debugger;
    BulkRefNoDDL = RefNoDDLName;
    httpGet("/BulkOrder/GetRefNo", onBulkRefNoSuccess, onRefNoFailure);
}


function LoadSampleRefNoDDL(RefNoDDLName) {
    debugger;
    SampleRefNoDDL = RefNoDDLName;
    httpGet("/BulkOrder/GetRefNo", onSampleRefNoSuccess, onRefNoFailure);
}
function LoadJobNoDDL(JobOrdDDLName) {
    debugger;
    JobOrdDDL = JobOrdDDLName;
    httpGet("/WorkOrder/GetWorkNo", onJobSuccess, onJobFailure);
}
function LoadBuyRefNoDDL(BuyRefDDLName) {
    debugger;
    BRefDDL = BuyRefDDLName;
    httpGet("/BulkOrder/GetBuyRefNo", onBuyRefSuccess, onBuyRefFailure);
}
function LoadPurOrdNoDDL(PurOrdNoDDLName) {
    debugger;
    PurOrdNoDDL = PurOrdNoDDLName;
    httpGet("/PurchaseOrderEntry/GetPurOrdNo", onPoSuccess, onPoFailure);
}

function LoadBulkJobNoDDL(JobOrdDDLName) {
    debugger;
    BulkJobNoDDL = JobOrdDDLName;
    httpGet("/WorkOrder/GetWorkNo", onBulkJobSuccess, onJobFailure);
}

function LoadSampleJobNoDDL(JobOrdDDLName) {
    debugger;
    SampleJobNoDDL = JobOrdDDLName;
    httpGet("/WorkOrder/GetWorkNo", onSampleJobSuccess, onJobFailure);
}

function LoadTermDDL(TermDDLName) {
    debugger;
    TermsDDL = TermDDLName;
    httpGet("/Terms/GetTerms", onTermSuccess, onTermFailure);
}

function LoadQuotationNoDDL(QuotationNoDDLName) {
    debugger;
    QuotationDDL = QuotationNoDDLName;
    httpGet("/QuotationAdd/GetQuotationNoDDL", onQuotationNoSuccess, onQuotationNoFailure);
}
function LoadTermsConditionDDL(TermsConditionDDLName) {
    debugger;
    TermConditionDDL = TermsConditionDDLName;
    httpGet("/PaymentTerms/GetTermsCondition", onTermsConditionSuccess, onTermsConditionFailure);
}

function LoadGrnNoDDL(GRNNoDDLName) {
    debugger;
    GRNNoDDL = GRNNoDDLName;
    httpGet("/GRNEntry/GetGrnNo", onGrnNoSuccess, onGrnNoFailure);
}

function LoadAccessoryItemDDL(AccessoryDDLName) {
    debugger;
    AccessoryDDL = AccessoryDDLName;
    httpGet("/Item/GetAccessoryItem", onAccessorySuccess, onAccessoryFailure);
}
function LoadGarmentItemDDL(GarmentDDLName) {
    debugger;
    GarmentDDL = GarmentDDLName;
    httpGet("/Item/GetGarmentItem", onGarmentSuccess, onGarmentFailure);
}
function LoadOverhdsDDL(OverhdsDDLName) {
    debugger;
    OverhdsDDL = OverhdsDDLName;
    httpGet("/OverHeads/GetoverHeads", onOverhdsSuccess, onOverhdsFailure);
}
function LoadEnquiryDDL(EnquiryDDLName) {
    debugger;
    enquiryDDL = EnquiryDDLName;
    httpGet("/StyleEntry/GetenquiryNo", onEnquirysuccess, onEnquiryfailure);
}


function LoadGeneralItemDDL(generalItemDDLName) {
    genItemDDL = generalItemDDLName;
    httpGet("/Item/GetGeneralItem", onGeneralItemSuccess, onGeneralItemFailure);
}
function LoadRefNoDDL(RefNoDDLName) {
    debugger;
    RefNoDDL = RefNoDDLName;
    httpGet("/BulkOrder/GetRefNo", onRefNoSuccess, onRefNoFailure);
}

function LoadMultiRefNoDDL(RefNoDDLName) {
    debugger;
    RefNoDDL = RefNoDDLName;
    httpGet("/BulkOrder/GetRefNo", onMultiRefNoSuccess, onMultiRefNoFailure);
}
function LoadRefDDL(RefDDLName) {
    debugger;
    RefDDL = RefDDLName;
    httpGet("/BulkOrder/GetRefNo", onRefSuccess, onRefFailure);
}

function LoadSampleOrdRefNoDDL(RefNoDDLName) {
    debugger;
    RefNoDDL = RefNoDDLName;
    httpGet("/BulkOrder/GetSampleOrdRefNo", onRefNoSuccess, onRefNoFailure);
}

function LoadBulkOrdRefNoDDL(RefNoDDLName) {
    debugger;
    RefNoDDL = RefNoDDLName;
    httpGet("/BulkOrder/GetBulkOrdRefNo", onRefNoSuccess, onRefNoFailure);
}
function LoadRoleDDL(RoleDDLName) {
    debugger;
    RoleDDL = RoleDDLName;
    httpGet("/Role/GetRole", onRoleSuccess, onRoleFailure);
}
function LoadCompanyDDL(companyDDLName) {
    debugger;
    companyDDL = companyDDLName;
    httpGet("/Company/GetCompany", onCompanySuccess, onCompanyFailure);
}

function LoadAddlessDDL(addlessDDLName) {
    debugger;
    addlessDDL = addlessDDLName;
    httpGet("/AccountHeads/GetAccountHeads", onaddlessSuccess, onaddlessFailure);
}
function LoadCurrencyDDL(currencyDDLName) {
    debugger;
    currencyDDL = currencyDDLName;
    httpGet("/Currency/GetCurrency", onCurrencySuccess, onCurrencyFailure);
}
//function LoadCourDDL(courDDLName) {
//    debugger;
//    courDDL = courDDLName;
//    httpGet("/Courier/GetCourier", onCourSuccess, onCourFailure);
//}

function LoadGUomDDL(GuomDDLName) {
    debugger;
    guomDDL = GuomDDLName;
    httpGet("/GarmentUom/GetGUom", onGuomSuccess, onGuomFailure);
}
function LoadPortOfLoadingDDL(PortOfLoadingDDLName) {
    debugger;
    portofloadDDL = PortOfLoadingDDLName;
    httpGet("/PortOfLoading/GetPortOfLoading", onPortOfLoadingSuccess, onPortOfLoadingFailure);
}
function LoadEmployeeDDL(employeeDDLName) {
    debugger;
    employeeDDL = employeeDDLName;
    httpGet("/Employee/GetEmployee", onEmployeeSuccess, onEmployeeFailure);
}
function LoadColorDDL(colorDDLName) {
    debugger;

    colorDDL = colorDDLName;
    httpGet("/ColorMaster/GetColorMaster", onColorSuccess, onColorFailure);
}
function LoadSizeDDL(sizeDDLName) {
    debugger;

    sizeDDL = sizeDDLName;
    httpGet("/Size/GetSize", onSizeSuccess, onSizeFailure);
}

function LoadSizeSeqDDL(ssizeDDLName) {
    debugger;

    ssizeDDL = ssizeDDLName;
    httpGet("/Size/Getstores", onSizeSeqSuccess, onSizeSeqFailure);
}

function LoadGSizeDDL(gsizeDDLName) {
    gsizeDDL = gsizeDDLName;
    httpGet("/Size/GetGSize", onGSizeSuccess, onGSizeFailure);
}

function LoadWorkdivisionDDL(workdivisionDDLName) {
    workdivisionDDL = workdivisionDDLName;
    httpGet("/WorkDivision/GetWorkDivisions", onWorkdivisionSuccess, onWorkdivisionFailure);
}

function LoadFSizeDDL(fsizeDDLName) {
    fsizeDDL = fsizeDDLName;
    httpGet("/Size/GetFSize", onFSizeSuccess, onFSizeFailure);
}

function LoadYSizeDDL(ysizeDDLName) {
    ysizeDDL = ysizeDDLName;
    httpGet("/Size/GetYSize", onYSizeSuccess, onYSizeFailure);
}

function LoadConsigneeDDL(consigneeDDLName) {
    consigneeDDL = consigneeDDLName;
    httpGet("/Consignee/GetConsignee", onConsigneeSuccess, onConsigneeFailure);
}

function LoadAgentDDL(agentDDLName) {
    agentDDL = agentDDLName;
    httpGet("/Agent/GetAgent", onAgentSuccess, onAgentFailure);
}

function LoadSAgentDDL(agentSDDLName) {
    agentSDDL = agentSDDLName;
    httpGet("/Agent/GetSAgent", onSAgentSuccess, onSAgentFailure);
}

function LoadSupplierDDL(supplierDDLName) {
    supplierDDL = supplierDDLName;
    httpGet("/Supplier/Getsupp", onSupplierSuccess, onSupplierFailure);
}
function LoadCountryDDL(countryDDLName) {
    debugger;
    countryDDL = countryDDLName;
    httpGet("/Country/GetCountry", onCountrySuccess, onCountryFailure);
}


function LoadUomDDL(uomDDLName) {
    uomDDL = uomDDLName;
    httpGet("/Unit_of_measurement/Getuoms", onUomsuccess, onUomfailure);
}
function LoadItemGroupDDL(itemgroupDDLName) {
    itemgroupDDL = itemgroupDDLName;
    httpGet("/ItemGroup/GetItemGroup", onItemGroupsuccess, onItemGroupfailure);
}
function LoadMultipleItemGroupDDL(itemgroupDDLName) {
    itemgroupDDL = itemgroupDDLName;
    httpGet("/ItemGroup/GetItemGroup", onMultipleItemGroupsuccess, onMultipleItemGroupfailure);
}
function LoadColorGroupDDL(colorgroupDDLName) {
    colorgroupDDL = colorgroupDDLName;
    httpGet("/ColorGroup/Getstores", onColorGroupsuccess, onColorGroupfailure);
}

function LoadStoreUnitDDL(storeunitDDLName) {
    storeunitDDL = storeunitDDLName;
    httpGet("/StoreUnit/GetStores", onStoreUnitSuccess, onStoreUnitFailure);
}

function LoadStoreSectionDDL(storesectionDDLName) {
    storesectionDDL = storesectionDDLName;
    httpGet("/StoreSection/GetSections", onStoreSectionSuccess, onSectionStoreFailure);
}

function LoadItemDDL(ItemDDLName) {
    debugger;
    itemDDL = ItemDDLName;
    httpGet("/Item/GetItem", onItemSuccess, onItemFailure);
}
function LoadMultiItemDDL(ItemDDLName) {
    debugger;
    itemDDL = ItemDDLName;
    httpGet("/Item/GetItem", onMultiItemSuccess, onMultiItemFailure);
}

function LoadComponentDDL(componentDDLName) {
    componentDDL = componentDDLName;
    httpGet("/Item/GetComponent", onComponentSuccess, onComponentFailure);
}

function LoadYarnDDL(yarnDDLName) {
    yarnDDL = yarnDDLName;
    httpGet("/Item/GetYarn", onYarnSuccess, onYarnFailure);
}

function LoadHSNDDL(hsnDDLName) {
    hsnDDL = hsnDDLName;
    httpGet("/Item/GetHsn", onHsnSuccess, onHsnFailure);
}


function LoadFabricDDL(fabricDDLName) {
    fabricDDL = fabricDDLName;
    httpGet("/Item/GetFabric", onFabricSuccess, onFabricFailure);
}

function LoadCityDDL(cityDDLName) {
    cityDDL = cityDDLName;
    httpGet("/City/GetCities", onCitySuccess, onCityFailure);
}
function LoadDescriptionDDL(DescriptionDDLName) {
    debugger;
    DescriptionDDL = DescriptionDDLName;
    httpGet("/Description/GetListMain", onDescriptionSuccess, onDescriptionFailure);
}

function LoadDesignationDDL(DesignationDDLName) {
    designationDDL = DesignationDDLName;
    httpGet("/Designation/GetDesignation", onDesignationSuccess, onCountryFailure);
}

function LoadProcessDDL(ProcessDDLName) {
    processDDL = ProcessDDLName;
    httpGet("/Process/GetProcess", onProcessSuccess, onProcessFailure);
}

function LoadPanelProcessDDL(ProcessDDLName) {
    panelprocessDDL = ProcessDDLName;
    httpGet("/Process/GetPanelProcess", onPanelProcessSuccess, onPanelProcessFailure);
}


function LoadProcessSeqDDL(ProcessseqDDLName) {
    processseqDDL = ProcessseqDDLName;
    httpGet("/Process/GetProcess", onProcessSeqSuccess, onProcessSeqFailure);
}
function LoadPayTermsDDL(PaytermsDDLName) {
    paytermsDDL = PaytermsDDLName;
    httpGet("/PaymentTerms/GetPaymentTerms", onPaymentTermsSuccess, onPaymentTermsFailure);
}

function LoadBuyerDDL(BuyerDDLName) {
    buyerDDL = BuyerDDLName;
    httpGet("/Buyer/GetBuyers", onBuyerSuccess, onBuyerFailure);
}

function LoadSeasonDDL(SeasonDDLName) {
    seasonDDL = SeasonDDLName;
    httpGet("/Season/GetSeason", onSeasonSuccess, onSeasonFailure);
}

function LoadShipmodeDDL(ShipmodeDDLName) {
    shipmodeDDL = ShipmodeDDLName;
    httpGet("/ShipmentMode/GetShipMode", onShipmentModeSuccess, onShipmentModeFailure);
}
function LoadShipsystemDDL(ShipsystemDDLName) {
    shipsystemDDL = ShipsystemDDLName;
    httpGet("/ShipmentSystem/GetShipSystem", onShipmentSystemSuccess, onShipmentSystemFailure);
}

function LoadBuyerDDL(buyerDDLName) {
    buyerDDL = buyerDDLName;
    httpGet("/Buyer/GetBuyers", onBuyerSuccess, onBuyerFailure);
}

function LoadOrderNoDDL(OrderNoDDLName) {
    debugger;
    OrderNoDDL = OrderNoDDLName;
    httpGet("/BulkOrder/GetOrderNo", onOrderNoSuccess, onOrderNoFailure);
}

function LoadBulkOrderNoDDL(OrderNoDDLName) {
    debugger;
    OrderNoDDL = OrderNoDDLName;
    httpGet("/BulkOrder/GetBulkOrdNo", onOrderNoSuccess, onOrderNoFailure);
}

function LoadSampOrderNoDDL(OrderNoDDLName) {
    debugger;
    OrderNoDDL = OrderNoDDLName;
    httpGet("/BulkOrder/GetSampleOrdNo", onOrderNoSuccess, onOrderNoFailure);
}
function LoadMultiOrderNoDDL(OrderNoDDLName) {
    debugger;
    OrderNoDDL = OrderNoDDLName;
    httpGet("/BulkOrder/GetOrderNo", onMultiOrderNoSuccess, onMultiOrderNoFailure);
}

function LoadStyleDDL(styleDDLName) {
    styleDDL = styleDDLName;
    httpGet("/Style/GetStyle", onStyleSuccess, onStyleFailure);
}

function LoadMultiStyleDDL(styleDDLName) {
    styleDDL = styleDDLName;
    httpGet("/Style/GetStyle", onMultiStyleSuccess, onMultiStyleFailure);
}
function LoadSizeDDL(sizeDDLName) {
    sizeDDL = sizeDDLName;
    httpGet("/Size/Getstores", onSizeSuccess, onSizeFailure);
}
function LoadCompanyUnitDDL(CompanyUnitDDLName) {
    CompanyUnitDDL = CompanyUnitDDLName;
    httpGet("/CompanyUnit/GetCompanyUnits", onCompanyUnitSuccess, onCompanyUnitFailure);
}

function LoadDepartmentDDL(departmentDDLName) {
    debugger;
    departmentDDL = departmentDDLName;
    httpGet("/Department/GetDepartment", onDepartmentSuccess, onCountryFailure);
}

function LoadStateDDL(stateDDLName) {
    debugger;
    stateDDL = stateDDLName;
    httpGet("/State/GetState", onStateSuccess, onStateFailure);
}


function onStateSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(stateDDL).empty();
        $(stateDDL).append($('<option/>').val('0').text('--Select State--'));
        $.each(data, function () {
            $(stateDDL).append($('<option></option>').val(this.id).text(this.state));
        });
    }
    else {
        alert('State loading failed');
    }
}

function onBuyerSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(buyerDDL).empty();
        $(buyerDDL).append($('<option/>').val('0').text('--Select Buyer--'));
        $.each(data, function () {
            $(buyerDDL).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
        });
    }
    else {
        alert('Buyer loading failed');
    }
}


function onBulkJobSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(BulkJobNoDDL).empty();
        $(BulkJobNoDDL).append($('<option/>').val('0').text('--Select Job No--'));
        $.each(data, function () {
            if (this.JoborWork == 'W') {
                $(BulkJobNoDDL).append($('<option></option>').val(this.JobNoId).text(this.WorkOrder));
            }
        });
    }
    else {
        alert('JobNo loading failed');
    }
}

function onSampleJobSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(SampleJobNoDDL).empty();
        $(SampleJobNoDDL).append($('<option/>').val('0').text('--Select Job No--'));
        $.each(data, function () {
            if (this.JoborWork == 'S') {
                $(SampleJobNoDDL).append($('<option></option>').val(this.JobNoId).text(this.WorkOrder));
            }
        });
    }
    else {
        alert('JobNo loading failed');
    }
}


function onBulkRefNoSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(BulkRefNoDDL).append($('<option/>').val('0').text('--Select Ref No--'));
        $.each(data, function () {
            if (this.OrdType == "B") {
                $(BulkRefNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Ref_No));
            }
        });
    }
    else {
        alert('RefNo loading failed');
    }
}


function onSampleRefNoSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(SampleRefNoDDL).append($('<option/>').val('0').text('--Select Ref No--'));
        $.each(data, function () {
            if (this.OrdType == "S") {
                $(SampleRefNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Ref_No));
            }
        });
    }
    else {
        alert('RefNo loading failed');
    }
}

function onStyleTemplateSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(StyleTemplateDDL).empty();
        $(StyleTemplateDDL).append($('<option/>').val('0').text('--Select Template--'));
        $.each(data, function () {
            $(StyleTemplateDDL).append($('<option></option>').val(this.TemplateId).text(this.Template));
        });
    }
}
function onOrderStyleTemplateSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(OrderStyleTemplateDDL).empty();
        $(OrderStyleTemplateDDL).append($('<option/>').val('0').text('--Select Template--'));
        $.each(data, function () {
            $(OrderStyleTemplateDDL).append($('<option></option>').val(this.TemplateId).text(this.Template));
        });
    }
}


function onShiftSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ShiftDDL).empty();
        $(ShiftDDL).append($('<option/>').val('0').text('--Select Shift--'));
        $.each(data, function () {
            $(ShiftDDL).append($('<option></option>').val(this.shiftid).text(this.Shiftname));
        });
    }
    else {
        alert('Shift loading failed');
    }
}

function onRoleSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(RoleDDL).empty();
        $(RoleDDL).append($('<option/>').val('0').text('--Select Role--'));
        $.each(data, function () {
            $(RoleDDL).append($('<option></option>').val(this.RoleId).text(this.RoleName));
        });
    }
    else {
        alert('Role loading failed');
    }
}
function onCuttingRecptSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(CuttingRecptDDL).empty();
        $(CuttingRecptDDL).append($('<option/>').val('0').text('--Select Cutting Receipt--'));
        $.each(data, function () {
            $(CuttingRecptDDL).append($('<option></option>').val(this.CuttingReceiptId).text(this.CuttingReceiptNo));
        });
    }
    else {
        alert('Receipt loading failed');
    }
}

function onJobSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(JobOrdDDL).empty();
        $(JobOrdDDL).append($('<option/>').val('0').text('--Select Job No--'));
        $.each(data, function () {
            $(JobOrdDDL).append($('<option></option>').val(this.JobNoId).text(this.WorkOrder));
        });
    }
    else {
        alert('JobNo loading failed');
    }
}

function onBuyRefSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(BRefDDL).empty();
        $(BRefDDL).append($('<option/>').val('0').text('--Select Buy RefNo--'));
        $.each(data, function () {
            $(BRefDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Buyer_Ref_No));
        });
    }
    else {
        alert('BuyRefNo loading failed');
    }
}

function onPoSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(PurOrdNoDDL).empty();
        $(PurOrdNoDDL).append($('<option/>').val('0').text('--Select Po No--'));
        $.each(data, function () {
            $(PurOrdNoDDL).append($('<option></option>').val(this.pur_ord_id).text(this.pur_ord_no));
        });
    }
    else {
        alert('PoNo loading failed');
    }
}

function onReasonSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(ReasonDDL).empty();
        $(ReasonDDL).append($('<option/>').val('0').text('--Select Reason--'));
        $.each(data, function () {
            $(ReasonDDL).append($('<option></option>').val(this.ReasonId).text(this.ReasonName));
        });
    }
    else {
        alert('Reason loading failed');
    }
}

function onGrnNoSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(GRNNoDDL).empty();
        $(GRNNoDDL).append($('<option/>').val('0').text('--Select Grn No--'));
        $.each(data, function () {
            $(GRNNoDDL).append($('<option></option>').val(this.Grn_MasId).text(this.receipt_no));
        });
    }
    else {
        alert('GrnNo loading failed');
    }
}

function onProcessSeqSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(processseqDDL).empty();
        // $(processseqDDL).append($('<option/>').val('0').text('--Select Buyer--'));
        $.each(data, function () {
            $(processseqDDL).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
        });
    }
    else {
        alert('ProcessSequence loading failed');
    }
}

function onMultiRefNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;

        $.each(data, function () {
            $(RefNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Ref_No));
        });
    }
    else {
        alert('OrderNo loading failed');
    }
}
function onRefNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(RefNoDDL).append($('<option/>').val('0').text('--Select Ref No--'));
        $.each(data, function () {
            $(RefNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Ref_No));
        });
    }
    else {
        alert('OrderNo loading failed');
    }
}

function onRefSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(RefNoDDL).append($('<option/>').val('0').text('--Select Ref No--'));
        $.each(data, function () {
            $(RefNoDDL).append($('<option></option>').text(this.Ref_No));
        });
    }
    else {
        alert('RefNo loading failed');
    }
}
function onCuttingOrderSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(CuttingOrderDDL).empty();
        $(CuttingOrderDDL).append($('<option/>').val('0').text('--Select Cutting Order--'));
        $.each(data, function () {
            $(CuttingOrderDDL).append($('<option></option>').val(this.CuttingOrdId).text(this.CuttingOrdNo));
        });
    }
    else {
        alert('Receipt loading failed');
    }
}

function onWorkdivisionSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(workdivisionDDL).empty();
        $(workdivisionDDL).append($('<option/>').val('0').text('--Select WorkDivision--'));
        $.each(data, function () {
            $(workdivisionDDL).append($('<option></option>').val(this.WorkDivisionId).text(this.WorkDivisionName));
        });
    }
    else {
        alert('WorkDivision loading failed');
    }
}
function onEnquirysuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(enquiryDDL).append($('<option/>').val('0').text('--Select Enquiry No--'));
        $.each(data, function () {
            $(enquiryDDL).append($('<option></option>').val(this.EnquiryId).text(this.EnquiryNo));
        });
    }
    else {
        alert('Enquiry No loading failed');
    }
}

function onSupplierSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(supplierDDL).empty();
        $(supplierDDL).append($('<option/>').val('0').text('--Select Supplier--'));
        $.each(data, function () {
            $(supplierDDL).append($('<option></option>').val(this.SupplierId).text(this.SupplierName));
        });
    }
    else {
        alert('Supplier loading failed');
    }
}

function onOrderNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(OrderNoDDL).empty();
        $(OrderNoDDL).append($('<option/>').val('0').text('--Select Order No--'));
        $.each(data, function () {
            $(OrderNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Order_No));
        });
    }
    else {
        alert('OrderNo loading failed');
    }
}

function onMultiOrderNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(OrderNoDDL).empty();

        $.each(data, function () {
            $(OrderNoDDL).append($('<option></option>').val(this.Buy_Ord_MasId).text(this.Order_No));
        });
    }
    else {
        alert('OrderNo loading failed');
    }
}


function onGeneralItemSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(genItemDDL).empty();
        $(genItemDDL).append($('<option/>').val('0').text('--Select General--'));
        $.each(data, function () {
            $(genItemDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });

    }
    else {
        alert('GeneralItem loading failed');
    }
}

function onAccessorySuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(AccessoryDDL).empty();
        $(AccessoryDDL).append($('<option/>').val('0').text('--Select Accessory--'));
        $.each(data, function () {
            $(AccessoryDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
        //$(AccessoryDDL).html($(AccessoryDDL).find('option').sort(function (x, y) {
        //    // to change to descending order switch "<" for ">"

        //    return $(x).text() > $(y).text() ? 1 : -1;


        //}));

        //$(AccessoryDDL).val(0);
    }
    else {
        alert('AccessoryItem loading failed');
    }
}

function onGarmentSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        //$(GarmentDDL).empty();       
        //$(GarmentDDL).append($('<option/>').val('0').text('--Select Garment--'));

        //$.each(data, function () {
        //    $(GarmentDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        //});
        //$(GarmentDDL).html($(GarmentDDL).find('option').sort(function (x, y) {
        //    // to change to descending order switch "<" for ">"
        //    return $(x).text() > $(y).text() ? 1 : -1;
        //}));
        $(GarmentDDL).empty();
        $(GarmentDDL).append($('<option/>').val('0').text('--Select Garment--'));
        $.each(data, function () {
            $(GarmentDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
    }
    else {
        alert('GarmentItem loading failed');
    }
}
function onOverhdsSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(OverhdsDDL).empty();
        $(OverhdsDDL).append($('<option/>').val('0').text('--Select Commercial--'));
        $.each(data, function () {
            $(OverhdsDDL).append($('<option></option>').val(this.commercialid).text(this.commercial));
        });
    }
    else {
        alert('Commercial loading failed');
    }
}
function onStyleSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(styleDDL).empty();
        $(styleDDL).append($('<option/>').val('0').text('--Select Style--'));
        $.each(data, function () {
            $(styleDDL).append($('<option></option>').val(this.StyleId).text(this.StyleName));
        });
    }
    else {
        alert('Style loading failed');
    }
}
function onMultiStyleSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(styleDDL).empty();
        // $(styleDDL).append($('<option/>').val('0').text('--Select Style--'));
        $.each(data, function () {
            $(styleDDL).append($('<option></option>').val(this.StyleId).text(this.StyleName));
        });
    }
    else {
        alert('Style loading failed');
    }
}
//function onSizeSuccess(result) {
//    if (result.Status == "SUCCESS") {
//        debugger;
//        var data = result.Value;
//        $(sizeDDL).empty();
//        //$(sizeDDL).append($('<option/>').val('0').text('--Select Size--'));
//        $.each(data, function () {
//            if (this.SizeId == 7) {
//                $(sizeDDL).append($('<option></option>').val(this.SizeId).text(this.SizeName));
//            }
//        });
//    }
//    else {
//        alert('Size loading failed');
//    }
//}


//function LoadCompanyDDL(CompanyDDLName) {
//    companyDDL = CompanyDDLName;
//    httpGet("/ShipmentSystem/GetShipSystem", onCompanySuccess, onCompanyFailure);
//}


function onProcessSuccess(result) {
    //if (result.Status == "SUCCESS") {
    //    var data = result.Value;
    //    $(processDDL).empty();
    //    $.each(data, function (index, c) {
    //        $(processDDL).append($("<option> </option>").val(c.ProcessId).html(c.ProcessName));
    //        // $(processDDL).append($("<option></option>").attr("value", "0").text("--Select Department--"));
    //    });
    //}
    //else {
    //    alert('Process loading failed');
    //}
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(processDDL).empty();
        $(processDDL).append($('<option/>').val('0').text('--Select Process--'));
        $.each(data, function () {
            $(processDDL).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
        });
    }
    else {
        alert('Process loading failed');
    }
}

function onPanelProcessSuccess(result) {
   
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(panelprocessDDL).empty();
        $(panelprocessDDL).append($('<option/>').val('0').text('--Select Process--'));
        $.each(data, function () {
            $(panelprocessDDL).append($('<option></option>').val(this.ProcessId).text(this.ProcessName));
        });
    }
    else {
        alert('Process loading failed');
    }
}

function onUomsuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(uomDDL).empty();
        $(uomDDL).append($('<option/>').val('0').text('--Select UOM--'));
        $.each(data, function () {
            $(uomDDL).append($('<option></option>').val(this.UomId).text(this.Uom));
        });
    }
    else {
        alert('Uom loading failed');
    }
}


function onItemGroupsuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(itemgroupDDL).empty();
        $(itemgroupDDL).append($('<option/>').val('0').text('--Select Item Group--'));
        $.each(data, function () {
            $(itemgroupDDL).append($('<option></option>').val(this.ItemgroupId).text(this.ItemGroupName));
        });
    }
    else {
        alert('ItemGroup loading failed');
    }
}

function onMultipleItemGroupsuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(itemgroupDDL).empty();

        $.each(data, function () {
            $(itemgroupDDL).append($('<option></option>').val(this.ItemgroupId).text(this.ItemGroupName));
        });
    }
    else {
        alert('ItemGroup loading failed');
    }
}

function onColorGroupsuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(colorgroupDDL).empty();
        $(colorgroupDDL).append($('<option/>').val('0').text('--Select Color Group--'));
        $.each(data, function () {
            $(colorgroupDDL).append($('<option></option>').val(this.ColorGroupId).text(this.ColorGroupName));
        });
    }
    else {
        alert('ColorGroup loading failed');
    }
}

function onStoreSectionSuccess(result) {
    //if (result.Status == "SUCCESS") {
    //    var data = result.Value;
    //    $.each(data, function (index, c) {
    //        $(storesectionDDL).append($("<option> </option>").val(c.SectionId).html(c.SectionName));
    //    });
    //}
    //else {
    //    alert('City loading failed');
    //}
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(storesectionDDL).empty();
        $(storesectionDDL).append($('<option/>').val('0').text('--Select Store Section--'));
        $.each(data, function () {
            $(storesectionDDL).append($('<option></option>').val(this.SectionId).text(this.SectionName));
        });
    }
    else {
        alert('StoreSection loading failed');
    }
}

function onDesignationSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(designationDDL).empty();
        $(designationDDL).append($('<option/>').val('0').text('--Select Designation--'));
        $.each(data, function () {
            $(designationDDL).append($('<option></option>').val(this.Id).text(this.DesignationName));
        });
    }
    else {
        alert('Designation loading failed');
    }
}

function onDepartmentSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(departmentDDL).empty();
        $(departmentDDL).append($('<option/>').val('0').text('--Select Department--'));
        $.each(data, function () {
            $(departmentDDL).append($('<option></option>').val(this.DepartmentId).text(this.DepartmentName));
        });
    }
    else {
        alert('Department loading failed');
    }
}

function onEmployeeSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(employeeDDL).empty();
        $(employeeDDL).append($('<option/>').val('').text('--Select Employee--'));
        $.each(data, function () {
            $(employeeDDL).append($('<option></option>').val(this.EmpId).text(this.EmpName));
        });
    }
    else {
        alert('Employee loading failed');
    }
}
function onDescriptionSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(DescriptionDDL).empty();
        $(DescriptionDDL).append($('<option/>').val('').text('--Select Description--'));
        $.each(data, function () {
            $(DescriptionDDL).append($('<option></option>').val(this.DescriptionId).text(this.DescriptionName));
        });
    }
    else {
        alert('Description loading failed');
    }
}
function onCitySuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(cityDDL).empty();
        $(cityDDL).append($('<option/>').val('0').text('--Select City--'));
        $.each(data, function () {
            $(cityDDL).append($('<option></option>').val(this.CityId).text(this.CityName));
        });
        $(cityDDL).trigger("select2:updated");
    }
    else {
        alert('City loading failed');
    }
}


function onCompanySuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(companyDDL).empty();
        // $(companyDDL).append($('<option/>').val('0').text('--Select Company--'));
        $.each(data, function () {
            $(companyDDL).append($('<option></option>').val(this.CompanyId).text(this.CompanyName));
        });
        $(companyDDL).trigger("select2:updated");
    }
    else {
        alert('Company loading failed');
    }
}
function onaddlessSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(addlessDDL).empty();
        $(addlessDDL).append($('<option/>').val('0').text('--Select Addless--'));
        $.each(data, function () {
            $(addlessDDL).append($('<option></option>').val(this.addlessid).text(this.addless));
        });
    }
    else {
        alert('Addless loading failed');
    }
}
function onCurrencySuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(currencyDDL).empty();
        $(currencyDDL).append($('<option/>').val('0').text('--Select Currency--'));
        $.each(data, function () {
            $(currencyDDL).append($('<option></option>').val(this.CurrencyId).text(this.CurrencyName));
        });
    }
    else {
        alert('Currency loading failed');
    }
}
function onCourSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(courDDL).empty();
        $(courDDL).append($('<option/>').val('0').text('--Select Courier--'));
        $.each(data, function () {
            $(courDDL).append($('<option></option>').val(this.CourierId).text(this.CourierName));
        });
    }
    else {
        alert('Courier loading failed');
    }
}

function onGuomSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(guomDDL).empty();
        $(guomDDL).append($('<option/>').val('0').text('--Select GUom--'));
        $.each(data, function () {
            $(guomDDL).append($('<option></option>').val(this.GUomId).text(this.GUom));
        });
    }
    else {
        alert('GarmentUom loading failed');
    }
}

function onPortOfLoadingSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(portofloadDDL).empty();
        $(portofloadDDL).append($('<option/>').val('0').text('--Select PortOfLoading--'));
        $.each(data, function () {
            $(portofloadDDL).append($('<option></option>').val(this.PortOfLoadingId).text(this.PortOfLoading1));
        });
    }
    else {
        alert('PortOfLoading loading failed');
    }
}
function onCountrySuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(countryDDL).empty();
        $(countryDDL).append($('<option/>').val('0').text('--Select Country--'));
        $.each(data, function () {
            $(countryDDL).append($('<option></option>').val(this.CountryId).text(this.CountryName));
        });
    }
    else {
        alert('Country loading failed');
    }
}

function onCompanyUnitSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(CompanyUnitDDL).empty();
        //$(CompanyUnitDDL).append($('<option/>').val('0').text('--Select Company Unit--'));
        $.each(data, function () {
            $(CompanyUnitDDL).append($('<option></option>').val(this.Id).text(this.CompanyUnitName));
        });
    }
    else {
        alert('CompanyUnit loading failed');
    }
}

function onStoreUnitSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(storeunitDDL).empty();
        $(storeunitDDL).append($('<option/>').val('0').text('--Select Store--'));
        $.each(data, function () {
            $(storeunitDDL).append($('<option></option>').val(this.StoreUnitId).text(this.StoreName));
        });
    }
    else {
        alert('StoreUnit loading failed');
    }
}

function onPaymentTermsSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(paytermsDDL).empty();
        $(paytermsDDL).append($('<option/>').val('0').text('--Select Payment Terms--'));
        $.each(data, function () {
            $(paytermsDDL).append($('<option></option>').val(this.PaymentTermsId).text(this.PaymentTermsName));
        });
    }
    else {
        alert('PaymentTerms loading failed');
    }
}

function onAgentSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(agentDDL).empty();
        $(agentDDL).append($('<option/>').val('0').text('--Select Buyer Agent--'));
        $.each(data, function () {
            $(agentDDL).append($('<option></option>').val(this.AgentId).text(this.AgentName));
        });
    }
    else {
        alert('Agent loading failed');
    }
}
function onSAgentSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(agentSDDL).empty();
        $(agentSDDL).append($('<option/>').val('0').text('--Select Ship Agent--'));
        $.each(data, function () {
            $(agentSDDL).append($('<option></option>').val(this.AgentId).text(this.AgentName));
        });
    }
    else {
        alert('ShipAgent loading failed');
    }
}
function onConsigneeSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(consigneeDDL).empty();
        $(consigneeDDL).append($('<option/>').val('0').text('--Select Consignee--'));
        $.each(data, function () {
            $(consigneeDDL).append($('<option></option>').val(this.ConsigneeId).text(this.ConsigneeName));
        });
    }
    else {
        alert('Consignee loading failed');
    }
}
function onSizeSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(sizeDDL).empty();
        $(sizeDDL).append($('<option/>').val('0').text('--Select Size--'));
        $.each(data, function () {
            $(sizeDDL).append($('<option></option>').val(this.SizeId).text(this.SizeName));
        });
    }
    else {
        alert('Size loading failed');
    }

}
function onSizeSeqSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(ssizeDDL).empty();
        //$(sizeDDL).append($('<option/>').val('0').text('--Select Size--'));
        $.each(data, function () {
            $(ssizeDDL).append($('<option></option>').val(this.SizeId).text(this.SizeName));
        });
    }
    else {
        alert('SizeSSS loading failed');
    }

}
function onGSizeSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(gsizeDDL).empty();
        $(gsizeDDL).append($('<option/>').val('0').text('--Select Garment Size--'));
        $.each(data, function () {
            $(gsizeDDL).append($('<option></option>').val(this.SizeId).text(this.SizeName));
        });
    }
    else {
        alert('GarmentSize loading failed');
    }

}
function onFSizeSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(fsizeDDL).empty();
        $(fsizeDDL).append($('<option/>').val('0').text('--Select Fabric Size--'));
        $.each(data, function () {
            $(fsizeDDL).append($('<option></option>').val(this.SizeId).text(this.SizeName));
        });
    }
    else {
        alert('FabricSize loading failed');
    }

}
function onYSizeSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(ysizeDDL).empty();
        $(ysizeDDL).append($('<option/>').val('0').text('--Select Yarn Size--'));
        $.each(data, function () {
            $(ysizeDDL).append($('<option></option>').val(this.SizeId).text(this.SizeName));
        });
    }
    else {
        alert('YarnSize loading failed');
    }

}
function onColorSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(colorDDL).empty();
        $(colorDDL).append($('<option/>').val('0').text('--Select Color--'));
        $.each(data, function () {
            $(colorDDL).append($('<option></option>').val(this.ColorId).text(this.ColorName));
        });
    }
    else {
        alert('Color loading failed');
    }
}
function onSeasonSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(seasonDDL).empty();
        $(seasonDDL).append($('<option/>').val('0').text('--Select Season--'));
        $.each(data, function () {
            $(seasonDDL).append($('<option></option>').val(this.SeasonId).text(this.SeasonName));
        });
    }
    else {
        alert('Season loading failed');
    }
}
function onShipmentModeSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(shipmodeDDL).empty();
        $(shipmodeDDL).append($('<option/>').val('0').text('--Select Shipment Mode--'));
        $.each(data, function () {
            $(shipmodeDDL).append($('<option></option>').val(this.ShipmentModeId).text(this.ShipementMode));
        });
    }
    else {
        alert('ShipmentMode loading failed');
    }
}
function onBuyerSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(buyerDDL).empty();
        $(buyerDDL).append($('<option/>').val('0').text('--Select Buyer--'));
        $.each(data, function () {
            $(buyerDDL).append($('<option></option>').val(this.BuyerId).text(this.BuyerName));
        });
    }
    else {
        alert('Buyer loading failed');

    }
}
function onShipmentSystemSuccess(result) {

    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(shipsystemDDL).empty();
        debugger;
        $(shipsystemDDL).append($('<option/>').val('0').text('--Select Shipment System--'));
        $.each(data, function () {
            $(shipsystemDDL).append($('<option></option>').val(this.SystemId).text(this.System));
        });
    }
    else {
        alert('ShipmentMode loading failed');
    }
}

function onCountryFailure(result) {
    alert('Department loading failed');
}


function onItemSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(itemDDL).empty();
        $(itemDDL).append($('<option/>').val('0').text('--Select Item--'));
        $.each(data, function () {
            $(itemDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
        $(itemDDL).trigger("select2:updated");
    }
    else {
        alert('Item loading failed');
    }
}

function onMultiItemSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(itemDDL).empty();
        // $(itemDDL).append($('<option/>').val('0').text('--Select Item--'));
        $.each(data, function () {
            $(itemDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
        $(itemDDL).trigger("select2:updated");
    }
    else {
        alert('Item loading failed');
    }
}

function onSampleTypeSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(SampleTypeDDL).empty();
        $(SampleTypeDDL).append($('<option/>').val('0').text('--Select Sample Type--'));
        $.each(data, function () {
            $(SampleTypeDDL).append($('<option></option>').val(this.SampleTypeId).text(this.SampleType));
        });
    }
}

function onTestingTypeSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(TestingTypeDDL).empty();
        $(TestingTypeDDL).append($('<option/>').val('0').text('--Select Testing Type--'));
        $.each(data, function () {
            $(TestingTypeDDL).append($('<option></option>').val(this.TestingTypeId).text(this.TestingTypeName));
        });
    }
}
function onTermsConditionSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        debugger;
        $(TermConditionDDL).empty();
        $(TermConditionDDL).append($('<option/>').val('0').text('--Select Terms--'));
        $.each(data, function () {
            $(TermConditionDDL).append($('<option></option>').val(this.TermId).text(this.TermName));
        });
    }
    else {
        alert('Terms loading failed');
    }
}

function onTestingDCNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(TestingDCNoDDL).empty();
        $(TestingDCNoDDL).append($('<option/>').val('0').text('--Select DC No--'));
        $.each(data, function () {
            $(TestingDCNoDDL).append($('<option></option>').val(this.TestingDCId).text(this.DCNo));
        });
    }
}
function onComponentSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(componentDDL).empty();
        $(componentDDL).append($('<option/>').val('0').text('--Select Component--'));
        $.each(data, function () {
            $(componentDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
    }
    else {
        alert('Component loading failed');
    }
}
function onYarnSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(yarnDDL).empty();
        $(yarnDDL).append($('<option/>').val('0').text('--Select Yarn--'));
        $.each(data, function () {
            $(yarnDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
    }
    else {
        alert('Yarn loading failed');
    }
}
function onHsnSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(hsnDDL).empty();
        $(hsnDDL).append($('<option/>').val('0').text('--Select HsnCode--'));
        $.each(data, function () {
            //var txt = this.HSNCODE+"-"+this.
            $(hsnDDL).append($('<option></option>').val(this.HSNCODE).text(this.HSNCODEDesc));
        });
    }
    else {
        alert('Hsn loading failed');
    }
}
function onFabricSuccess(result) {
    debugger;
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(fabricDDL).empty();
        $(fabricDDL).append($('<option/>').val('0').text('--Select Fabric--'));
        $.each(data, function () {
            $(fabricDDL).append($('<option></option>').val(this.Itemid).text(this.ItemName));
        });
    }
    else {
        alert('Fabric loading failed');
    }
}
function onGroupNameSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(GroupNameDDL).empty();
        $(GroupNameDDL).append($('<option/>').val('0').text('--Select User Group--'));
        $.each(data, function () {
            $(GroupNameDDL).append($('<option></option>').val(this.GroupId).text(this.GroupName));
        });
    }
}

function onProcessFailure(result) {
    alert('Process loading failed');
}
function onPanelProcessFailure(result) {
    alert('Process loading failed');
}

function onPoFailure(result) {
    alert('PoNo loading failed');
}

function onMultiOrderNoFailure(result) {
    alert('PoNo loading failed');
}

function onComponentFailure(result) {
    alert('Componenet loading failed');
}
function onHsnFailure(result) {
    alert('Hsn loading failed');
}
function onFabricFailure(result) {
    alert('Fabric loading failed');
}
function onYarnFailure(result) {
    alert('Yarn loading failed');
}

function onItemGroupfailure(result) {
    alert('ItemGroup loading failed');
}
function onMultipleItemGroupfailure(result) {
    alert('ItemGroup loading failed');
}
function onyarnfailure(result) {
    alert('Yarn loading failed');
}
function onfabricfailure(result) {
    alert('Fabric loading failed');
}
function onTestingDCNoFailure(result) {
    alert('DC No loading failed');
}
function onColorGroupfailure(result) {
    alert('ColorGroup loading failed');
}
function onSupplierFailure(result) {
    alert('Supplier loading failed');
}
function onStoreSectionFailure(result) {
    alert('Section loading failed');
}
function onCityFailure(result) {
    alert('City loading failed');
}
function onCountryFailure(result) {
    alert('Country loading failed');
}
function onSectionStoreFailure(result) {
    alert('Section Store loading failed');
}
function onPaymentTermsFailure(result) {
    alert('PaymentTerms loading failed');
}
function onProcessSeqFailure(result) {
    alert('ProcessSequence loading failed');
}
function onSeasonFailure(result) {
    alert('Season loading failed');
}
function onShipmentModeFailure(result) {
    alert('ShipmentMode loading failed');
}
function onShipmentSystemFailure(result) {
    alert('ShipmentSystem loading failed');
}
function onStoreUnitFailure(result) {
    alert('Storeunit loading failed');
}

function onUomfailure(result) {

    alert('Uom loading failed');
}

function onTestingTypeFailure(result) {
    alert('TestingType loading failed');
}

function onSampleTypeFailure(result) {
    alert('SampleType loading failed');
}

function onShiftFailure(result) {
    alert('Shift loading failed');
}

function onCompanyFailure(result) {

    alert('Company loading failed');
}
function onItemFailure(result) {

    alert('Item loading failed');
}

function onMultiItemFailure(result) {
    alert('Item loading failed');
}
function onaddlessFailure(result) {

    alert('Addless loading failed');
}
function onCurrencyFailure(result) {

    alert('Currency loading failed');
}
function onCompanyUnitFailure(result) {
    alert('CompanyUnit loading failed');
}

function onReasonFailure(result) {
    alert('Reason loading failed');
}
function onDescriptionFailure(result) {
    alert('Description loading failed');
}
function onSizeFailure(result) {
    alert('Style loading failed');
}

function onFSizeFailure(result) {
    alert('FabricSize loading failed');
}
function onYSizeFailure(result) {
    alert('YarnSize loading failed');
}


function onAccessoryFailure(result) {
    alert('Accessory loading failed');
}
function onGarmentFailure(result) {
    alert('Garment loading failed');
}

function onJobFailure(result) {
    alert('JobNo loading failed');
}

function onGSizeFailure(result) {
    alert('GarmentSize loading failed');
}

function onBuyerFailure(result) {
    alert('Buyer loading failed');
}

function onOrderNoFailure(result) {
    alert('Order No loading failed');
}

function onStyleFailure(result) {
    alert('Style loading failed');
}
function onMultiStyleFailure(result) {
    alert('Style loading failed');
}
function onEmployeeFailure(result) {
    alert('Employee loading failed');
}
function onConsigneeFailure(result) {
    alert('Consignee loading failed');
}
function onAgentFailure(result) {
    alert('Agent loading failed');
}
function onSAgentFailure(result) {
    alert('ShipAgent loading failed');
}
function onSizeFailure(result) {
    alert('Size loading failed');
}
function onSizeSeqFailure(result) {
    alert('Sizesdsdss loading failed');
}
function onColorFailure(result) {
    alert('Color loading failed');
}
function onGuomFailure(result) {
    alert('Guom loading failed');
}
function onPortOfLoadingFailure(result) {
    alert('Port Of Loading loading failed');
}
function onCourFailure(result) {
    alert('Courier loading failed');
}

function onGeneralItemFailure(result) {
    alert('GeneralItem loading failed');
}


function onWorkdivisionFailure(result) {
    alert('Workdivision loading failed');
}

function onEnquiryfailure(result) {
    alert('Enquiry No loading failed');
}

function onRefNoFailure(result) {
    alert('Ref No loading failed');
}
function onMultiRefNoFailure(result) {
    alert('Ref No loading failed');
}
function onRefFailure(result) {
    alert('Ref No loading failed');
}

function onOverhdsFailure(result) {
    alert('Commercial loading failed');
}

function onCuttingReceiptFailure(result) {
    alert('Cutting Receipt loading failed');
}

function onGrnNoFailure(result) {
    alert('Grn Receipt loading failed');
}
function onPoFailure(result) {
    alert('PoNo loading failed');
}
function onGroupNameFailure(result) {
    alert('GroupName loading failed');
}
function onStateFailure(result) {
    alert('State loading failed');
}

function onBuyRefFailure(result) {
    alert('BuyRefNo loading failed');
}

function onStyleTempFailure(result) {
    alert('Template loading failed');
}
function onOrderStyleTempFailure(result) {
    alert('Template loading failed');
}

function onRoleFailure(result) {
    alert('Role loading failed');
}

function onTermsConditionFailure(result) {
    alert('Terms loading failed');
}


function onQuotationNoSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(QuotationDDL).empty();
        $(QuotationDDL).append($('<option/>').val('0').text('--Select Quotation No--'));
        $.each(data, function () {
            $(QuotationDDL).append($('<option></option>').val(this.QuoteID).text(this.QuoteNo));
        });
    }
}


function onTermSuccess(result) {
    if (result.Status == "SUCCESS") {
        var data = result.Value;
        $(TermsDDL).empty();
        $(TermsDDL).append($('<option/>').val('0').text('--Select Term No--'));
        $.each(data, function () {
            $(TermsDDL).append($('<option></option>').val(this.TermsId).text(this.TermsName));
        });
    }
}

function onQuotationNoFailure(result) {
    alert('Quotation loading failed');
}

function onTermFailure(result) {
    alert('Terms loading failed');
}

////Validation



function validateEmailAddress(EmailId) {
    var expr = /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    if (expr.test(EmailId)) {
        return true;
    }
    else {
        return false;
    }
}

function CheckRights(Menu) {
    MenuName = Menu;
    try {
        $.ajax({
            url: "/Role/GetMenuId",
            data: JSON.stringify({ MenuName: Menu }),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                debugger;
                var menuid = result;
                Addflg = 0;
                Editflg = 0;
                Printflg = 0;
                Deleteflg = 0;
                Allflg = 0
                var Roleid = $("#hdnRoleid").data('value');
                var UserName = $("#hdnusername").data('value').toUpperCase();
                UserName = UserName.toUpperCase();
                if ((UserName) != 'SUPERUSER')
                { CheckAcessFlg(Roleid, menuid, 0) }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    }
    catch (e) { }

}

function CheckAcessFlg(Roleid, Menuid, Submenuid) {
    debugger;
    $.ajax({
        url: "/Role/CheckRolebyId",
        data: JSON.stringify({ roleid: Roleid, menuid: Menuid, submenuid: Submenuid }),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            debugger;
            var obj = result.Value;
            if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].AllFlg == 1) {
                Allflg = 1;
            }
            if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].AddFlg == 1) {
                Addflg = 1;
            }
            if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].EditFlg == 1) {
                Editflg = 1;
            }
            if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].PrintFlg == 1) {
                Printflg = 1;
            }
            if (result.Status == 'SUCCESS' && obj.length > 0 && obj[0].DelFlg == 1) {
                Deleteflg = 1;
            }
            chkmenurights();
        }
    });
}
function chkmenurights() {
    debugger;
    switch (MenuName) {
        case "BulkOrder":
            fnBulkOrder();
            break;
        case "TrimsTemplate":
            fnTrimsTemplate();
            break;
        case "YarnFabTemp":
            fnYarnFabTemp();
            break;
        case "OrderShipment":
            fnOrderShipment();
            break;
        case "Measurment":
            fnMeasurment();
            break;
        case "OrderApproval":
            fnOrderApproval();
            break;
        case "OrderStyle":
            fnOrderStyle();
            break;
        case "JobOrder":
            fnJobOrder();
            break;
        case "WorkOrder":
            fnWorkOrder();
            break;
        case "PlanProgram":
            fnPlanProgram();
            break;
        case "PlanComponent":
            fnPlanComponent();
            break;
        case "PlanFabric":
            fnPlanFabric();
            break;
        case "PlanYarn":
            fnPlanYarn();
            break;
        case "PlanTrims":
            fnPlanTrims();
            break;
        case "PgmBOM":
            fnPgmBOM();
            break;
        case "PgmWorkFlow":
            fnPgmWorkFlow();
            break;
        case "PgmBudget":
            fnPgmBudget();
            break;
        case "ProcessSequence":
            fnProcessSequence();
            break;
        case "ProcessProgram":
            fnProcessProgram();
            break;
        case "PurchaseOrder":
            fnPurchaseOrder();
            break;
        case "PurchaseOrderYarn":
            fnPurchaseOrderYarn();
            break;
        case "PurchaseOrderTrims":
            fnPurchaseOrderTrims();
            break;
        case "GoodsReceipt":
            fnGoodsReceipt();
            break;
        case "GoodsReceiptYarn":
            fnGoodsReceiptYarn();
            break;
        case "GoodsReceiptTrims":
            fnGoodsReceiptTrims();
            break;
        case "ReceiptQualityYarn":
            fnReceiptQualityYarn();
            break;
        case "ReceiptQualityTrims":
            fnReceiptQualityTrims();
            break;
        case "LotSplitUp":
            fnLotSplitUp();
            break;
        case "PurchaseReturn":
            fnPurchaseReturn();
            break;
        case "SpecialRequisition":
            fnSpecialRequisition();
            break;
        case "CSPReceipt":
            fnCSPReceipt();
            break;
        case "StoresDelivery":
            fnStoresDelivery();
            break;
        case "StoresDeliveryReturn":
            fnStoresDeliveryReturn();
            break;
        case "OpeningStock":
            fnOpeningStock();
            break;
        case "StockInward":
            fnStockInward();
            break;
        case "StockOutward":
            fnStockOutward();
            break;
        case "StockTransfer":
            fnStockTransfer();
            break;
        case "StockAllocation":
            fnStockAllocation();
            break;
        case "StockAuditAdjustment":
            fnStockAuditAdjustment();
            break;
        case "OpeningStock":
            fnOpeningStock();
            break;
        case "Invoice":
            fnInvoice();
            break;
        case "OpenDebitNote":
            fnOpenDebitNote();
            break;
        case "GeneralMemo":
            fnGeneralMemo();
            break;
        case "GeneralReturn":
            fnGeneralReturn();
            break;
        case "OpenInvoice":
            fnOpenInvoice();
            break;
        case "DebitCredit":
            fnDebitCredit();
            break;
        case "ProcessOrder":
            fnProcessOrder();
            break;
        case "ProcessIssue":
            fnProcessIssue();
            break;
        case "ProcessReceipt":
            fnProcessReceipt();
            break;
        case "ProcessReturn":
            fnProcessReturn();
            break;
        case "GeneralProcessOrder":
            fnGeneralProcessOrder();
            break;
        case "GeneralProcessReceipt":
            fnGeneralProcessReceipt();
            break;
        case "GeneralProcessReturn":
            fnGeneralProcessReturn();
            break;
        case "ProcessInvoice":
            fnProcessInvoice();
            break;
        case "FabricReq":
            fnFabricReq();
            break;
        case "ProcessReceiptQuality":
            fnProcessReceiptQuality();
            break;
    }
}

function fnBulkOrder() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#AddnewOrd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#Editbtn').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#Prntbtn').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#Delbtn').prop('disabled', 'disabled');
        });
    }
}
function fnTrimsTemplate() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#AddbtnG').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#EditbtnG').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#PrntbtnG').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#DelbtnG').prop('disabled', 'disabled');
        });
    }
}
function fnYarnFabTemp() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#AddbtnO').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#EditbtnO').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#PrntbtnO').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#DelbtnO').prop('disabled', 'disabled');
        });
    }
}
function fnOrderShipment() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#Addbtnship').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#Editbtnship').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#Delbtnship').prop('disabled', 'disabled');
        });
    }
}
function fnMeasurment() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#AddbtnMes').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#EditbtnMes').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#Delbtnship').prop('disabled', 'disabled');
        });
    }
}
function fnOrderApproval() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#AddbtnApp').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#EditbtnApp').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#DelbtnApp').prop('disabled', 'disabled');
        });
    }
}
function fnOrderStyle() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tMbody tbody tr").each(function () {
            $(this).find('#addsty').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#EditbtnSty').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmain tbody tr").each(function () {
            $(this).find('#Delbtnship').prop('disabled', 'disabled');
        });
    }
}
function fnJobOrder() {
    debugger;
    if (Printflg == 0 && Allflg == 0) {
        $("#tbljoborderdetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tbljoborderdetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tbljoborderdetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnWorkOrder() {
    debugger;
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPlanProgram() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tPAbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tPAbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPgmBOM() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPgmWorkFlow() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPgmBudget() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPlanTrims() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tPAbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tPAbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tPAbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tPAbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPlanComponent() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#ConAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#ConUpdate").prop("disabled", true);
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#ConDelete").prop("disabled", true);
    }
}
function fnPlanFabric() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#FabAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#FabUpdate").prop("disabled", true);
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#FabDelete").prop("disabled", true);
    }
}
function fnPlanYarn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#YarnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#YarnUpdate").prop("disabled", true);
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#YarnDelete").prop("disabled", true);
    }
}
function fnProcessSequence() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tPMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessProgram() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblprodprgfst tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblprodprgfst tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblprodprgfst tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPurchaseOrder() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPurchaseOrderYarn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnPurchaseOrderTrims() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGoodsReceipt() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGoodsReceiptYarn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGoodsReceiptTrims() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnReceiptQualityYarn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnReceiptQualityTrims() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tGMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnSpecialRequisition() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tOMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStoresDelivery() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblMainDelidetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblMainDelidetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblMainDelidetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStoresDeliveryReturn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblDeliRetmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblDeliRetmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblDeliRetmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnOpeningStock() {
    debugger; 
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblitmmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblitmmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblitmmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStockInward() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStockOutward() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStockTransfer() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblMainStockTransfer tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblMainStockTransfer tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblMainStockTransfer tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStockAllocation() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddComp").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnStockAuditAdjustment() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tAMbody tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tAMbody tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tAMbody tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnInvoice() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAdd").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblInvmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblInvmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblInvmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnOpenDebitNote() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblDebitmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblDebitmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblDebitmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGeneralMemo() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGeneralReturn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnOpenInvoice() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblbillmaingrid tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnDebitCredit() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaincredeb tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaincredeb tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaincredeb tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessOrder() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessIssue() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessReceipt() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessReceiptQuality() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnAdd').prop('disabled', 'disabled');
        });
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessReturn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnFabricReq() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
//function fnFabricReq() {
//    debugger;
//    if (Addflg == 0 && Allflg == 0) {
//        $("#btnAddO").prop("disabled", true);
//    }
//    if (Editflg == 0 && Allflg == 0) {
//        $("#tblitmmaingrid tbody tr").each(function () {
//            $(this).find('#btnEdit').prop('disabled', 'disabled');
//        });
//    }
//    if (Printflg == 0 && Allflg == 0) {
//        $("#tblitmmaingrid tbody tr").each(function () {
//            $(this).find('#btnPrint').prop('disabled', 'disabled');
//        });
//    }
//    if (Deleteflg == 0 && Allflg == 0) {
//        $("#tblitmmaingrid tbody tr").each(function () {
//            $(this).find('#btnDelete').prop('disabled', 'disabled');
//        });
//    }
//}
function fnGeneralProcessOrder() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnAddO").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGeneralProcessReceipt() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnGeneralProcessReturn() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}
function fnProcessInvoice() {
    debugger;
    if (Addflg == 0 && Allflg == 0) {
        $("#btnaddnew").prop("disabled", true);
    }
    if (Editflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnEdit').prop('disabled', 'disabled');
        });
    }
    if (Printflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnPrint').prop('disabled', 'disabled');
        });
    }
    if (Deleteflg == 0 && Allflg == 0) {
        $("#tblmaindetails tbody tr").each(function () {
            $(this).find('#btnDelete').prop('disabled', 'disabled');
        });
    }
}