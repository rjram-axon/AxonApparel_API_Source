using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class RoleController : Controller
    {
        //
        // GET: /Role/
        IRoleBusiness roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult RoleIndex()
        {

            return View();
        }

        public JsonResult GetRole()
        {
            return Json(roleobj.GetRoleMainDetailsBuss(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRolebyId(int roleid, int menuid, int submenuid)
        {
            return Json(roleobj.GetRolebyId(roleid, menuid, submenuid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRolebyIdAll(int roleid)
        {
            return Json(roleobj.GetRolebyIdAll(roleid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMenu(int roleid, int menuid, int submenuid)
        {
            return Json(roleobj.GetMenuList(roleid, menuid,submenuid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMenuDetail()
        {
            var getmenuDetails = roleobj.LoadMenuDetail();
            return Json(getmenuDetails, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(Role str)
        {
            var result = roleobj.CreateRole(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Role str)
        {
            var result = roleobj.UpdateRole(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckRole(int id)
        {
            return Json(roleobj.CheckRoleinUser(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int Id)
        {
            return Json(roleobj.Delete(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSubMenuDetail(int parentid)
        {
            var getsubmenuDetails = roleobj.LoadSubMenuDetail(parentid);
            return Json(getsubmenuDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRolebyIdEdit(int roleid, int menuid, int submenuid)
        {
            return Json(roleobj.GetRolebyIdEdit(roleid, menuid, submenuid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMenuId(string MenuName)
        {
            int MenuId = 0;
            if (MenuName == "CompanyMaster")
            {
                MenuId = MenuNumber.MenuCompany;
            }
            if (MenuName == "CompanyUnit")
            {
                MenuId = MenuNumber.MenuCompanyUnit;
            }
            if (MenuName == "WorkDivision")
            {
                MenuId = MenuNumber.MenuWorkdivision;
            }
            if (MenuName == "Store")
            {
                MenuId = MenuNumber.MenuStore;
            }
            if (MenuName == "StoreSection")
            {
                MenuId = MenuNumber.MenuStoreSection;
            }
            if (MenuName == "Agent")
            {
                MenuId = MenuNumber.MenuAgent;
            }
            if (MenuName == "Buyer")
            {
                MenuId = MenuNumber.MenuBuyer;
            }

            if (MenuName == "Consignee")
            {
                MenuId = MenuNumber.MenuConsignee;
            }
            if (MenuName == "Supplier")
            {
                MenuId = MenuNumber.MenuSupplier;
            }
            if (MenuName == "Courier")
            {
                MenuId = MenuNumber.MenuCourier;
            }
            if (MenuName == "Bank")
            {
                MenuId = MenuNumber.MenuBank;
            }

            if (MenuName == "ItemGroup")
            {
                MenuId = MenuNumber.MenuItemGroup;
            }
            if (MenuName == "ItemMaster")
            {
                MenuId = MenuNumber.MenuItem;
            }
            if (MenuName == "Color Group")
            {
                MenuId = MenuNumber.MenuColorGroup;
            }
            if (MenuName == "Color")
            {
                MenuId = MenuNumber.MenuColor;
            }
            if (MenuName == "ColorCode")
            {
                MenuId = MenuNumber.MenuColorCode;
            }
            if (MenuName == "Size")
            {
                MenuId = MenuNumber.MenuSize;
            }
            if (MenuName == "Style Group")
            {
                MenuId = MenuNumber.MenuStyleGroup;
            }
            if (MenuName == "Style")
            {
                MenuId = MenuNumber.MenuStyle;
            }
            if (MenuName == "UnitOfMeasurement")
            {
                MenuId = MenuNumber.MenuUnitOfMeasurement;
            }
            if (MenuName == "UnitConversion")
            {
                MenuId = MenuNumber.MenuUnitConversion;
            }
            if (MenuName == "GarmentUom")
            {
                MenuId = MenuNumber.MenuGarmentUom;
            }
            if (MenuName == "GST")
            {
                MenuId = MenuNumber.MenuGST;
            }
            if (MenuName == "HSN")
            {
                MenuId = MenuNumber.MenuHSN;
            }
            if (MenuName == "ShipmentMode")
            {
                MenuId = MenuNumber.MenuShipmentMode;
            }
            if (MenuName == "ShipmentSystem")
            {
                MenuId = MenuNumber.MenuShipmentSystem;
            }
            if (MenuName == "Season")
            {
                MenuId = MenuNumber.MenuSeason;
            }
            if (MenuName == "Approval")
            {
                MenuId = MenuNumber.MenuApproval;
            }
            if (MenuName == "ProcessMaster")
            {
                MenuId = MenuNumber.MenuProcess;
            }
            if (MenuName == "ProcessSetup")
            {
                MenuId = MenuNumber.MenuProcessSetup;
            }
            if (MenuName == "Reason")
            {
                MenuId = MenuNumber.MenuReason;
            }
            if (MenuName == "Description")
            {
                MenuId = MenuNumber.MenuDescription;
            }
            if (MenuName == "PaymentTerms")
            {
                MenuId = MenuNumber.MenuPaymentTerms;
            }
            if (MenuName == "Currency")
            {
                MenuId = MenuNumber.MenuCurrency;
            }
            if (MenuName == "AccountHeads")
            {
                MenuId = MenuNumber.MenuAccountHeads;
            }
            if (MenuName == "OverHeads")
            {
                MenuId = MenuNumber.MenuOverHeads;
            }
            if (MenuName == "Role")
            {
                MenuId = MenuNumber.MenuRole;
            }
            if (MenuName == "Employee")
            {
                MenuId = MenuNumber.MenuEmployee;
            }
            if (MenuName == "UserGroup")
            {
                MenuId = MenuNumber.MenuUserGroup;
            }
            if (MenuName == "Department")
            {
                MenuId = MenuNumber.MenuDepartment;
            }
            if (MenuName == "Designation")
            {
                MenuId = MenuNumber.MenuDesignation;
            }
            if (MenuName == "Ledger")
            {
                MenuId = MenuNumber.MenuLedger;
            }
            if (MenuName == "Country")
            {
                MenuId = MenuNumber.MenuCountry;
            }
            if (MenuName == "State")
            {
                MenuId = MenuNumber.MenuState;
            }
            if (MenuName == "City")
            {
                MenuId = MenuNumber.MenuCity;
            }
            if (MenuName == "PortOfLoading")
            {
                MenuId = MenuNumber.MenuPortOfLoading;
            }
            if (MenuName == "Pre Sales")
            {
                MenuId = MenuNumber.MenuPreSales ;
            }
            if (MenuName == "QuotationMain")
            {
                MenuId = MenuNumber.MenuQuotationMain ;
            }
            if (MenuName == "FollowUp")
            {
                MenuId = MenuNumber.MenuFollowUp ;
            }
            if (MenuName == "CourierEntry")
            {
                MenuId = MenuNumber.MenuCourierEntry;
            }
            if (MenuName == "Communication")
            {
                MenuId = MenuNumber.MenuCommunication ;
            }
            if (MenuName == "SampleOrder")
            {
                MenuId = MenuNumber.MenuSampleOrder ;
            }
            if (MenuName == "Post Sales")
            {
                MenuId = MenuNumber.MenuPostSales ;
            }
            if (MenuName == "BulkOrder")
            {
                MenuId = MenuNumber.MenuBulkOrder ;
            }
            if (MenuName == "JobOrder")
            {
                MenuId = MenuNumber.MenuJobOrder ;
            }
            if (MenuName == "JobWork")
            {
                MenuId = MenuNumber.MenuJobOrder ;
            }
            if (MenuName == "OrderCancellation")
            {
                MenuId = MenuNumber.MenuOrderCancellation ;
            }
            if (MenuName == "StyleTemplate")
            {
                MenuId = MenuNumber.MenuStyleTemplate;
            }
            if (MenuName == "SampleType")
            {
                MenuId = MenuNumber.MenuSampleType;
            }
            if (MenuName == "Testing Type")
            {
                MenuId = MenuNumber.MenuTestingType;
            }
            if (MenuName == "Order Approval")
            {
                MenuId = MenuNumber.MenuOrderApproval;
            }
            if (MenuName == "S1SampleEntry")
            {
                MenuId = MenuNumber.S1SampleEntry;
            }
            if (MenuName == "S2PhotoSuitEntry")
            {
                MenuId = MenuNumber.S2PhotoSuitEntry;
            }
            if (MenuName == "Testing DC Approval")
            {
                MenuId = MenuNumber.MenuTestingDCApproval;
            }
            if (MenuName == "Testing DC Cancel")
            {
                MenuId = MenuNumber.MenuTestingDCCancel;
            }
            if (MenuName == "TestingDC")
            {
                MenuId = MenuNumber.MenuTestingDC;
            }
            if (MenuName == "Testing DC Receipt")
            {
                MenuId = MenuNumber.MenuTestingDCReceipt;
            }



            if (MenuName == "Purchase")
            {
                MenuId = MenuNumber.MenuPurchase;
            }
            if (MenuName == "PurchaseOrder")
            {
                MenuId = MenuNumber.MenuPurchaseOrder;
            }
            if (MenuName == "PurchaseOrderYarn")
            {
                MenuId = MenuNumber.MenuPurchaseOrderYarn;
            }
            if (MenuName == "PurchaseOrderTrims")
            {
                MenuId = MenuNumber.MenuPurchaseOrderTrims;
            }
            if (MenuName == "GoodsReceiptYarn")
            {
                MenuId = MenuNumber.MenuGoodsReceiptYarn;
            }
            if (MenuName == "GoodsReceiptTrims")
            {
                MenuId = MenuNumber.MenuGoodsReceiptTrims;
            }
            if (MenuName == "ReceiptQualityYarn")
            {
                MenuId = MenuNumber.MenuReceiptQualityYarn;
            }
            if (MenuName == "ReceiptQualityTrims")
            {
                MenuId = MenuNumber.MenuReceiptQualityTrims;
            }
            if (MenuName == "GoodsReceipt")
            {
                MenuId = MenuNumber.MenuGoodsReceipt;
            }
            if (MenuName == "LotSplitUp")
            {
                MenuId = MenuNumber.MenuLotSplitUp;
            }
            if (MenuName == "PurchaseReturn")
            {
                MenuId = MenuNumber.MenuPurchaseReturn;
            }
            if (MenuName == "SpecialRequisition")
            {
                MenuId = MenuNumber.MenuSpecialRequisition;
            }
            if (MenuName == "CSPReceipt")
            {
                MenuId = MenuNumber.MenuCSPReceipt;
            }
            if (MenuName == "StoresDelivery")
            {
                MenuId = MenuNumber.MenuStoresDelivery;
            }
            if (MenuName == "StoresDeliveryReturn")
            {
                MenuId = MenuNumber.MenuStoresDeliveryReturn;
            }
            if (MenuName == "OpeningStock")
            {
                MenuId = MenuNumber.MenuOpeningStock;
            }
            if (MenuName == "StockInward")
            {
                MenuId = MenuNumber.MenuStockInward;
            }
            if (MenuName == "StockOutward")
            {
                MenuId = MenuNumber.MenuStockOutward;
            }
            if (MenuName == "StockTransfer")
            {
                MenuId = MenuNumber.MenuStockTransfer;
            }
            if (MenuName == "StockTransferApproval")
            {
                MenuId = MenuNumber.MenuStockTransferApproval;
            }
            if (MenuName == "StockAllocation")
            {
                MenuId = MenuNumber.MenuStockAllocation;
            }
            if (MenuName == "StockAuditAdjustment")
            {
                MenuId = MenuNumber.MenuStockAuditAdjustment;
            }
            if (MenuName == "Bills")
            {
                MenuId = MenuNumber.MenuBills;
            }
            if (MenuName == "Invoice")
            {
                MenuId = MenuNumber.MenuInvoice;
            }
            if (MenuName == "OpenDebitNote")
            {
                MenuId = MenuNumber.MenuOpenDebitNote;
            }
            if (MenuName == "GeneralMemo")
            {
                MenuId = MenuNumber.MenuGeneralMemo;
            }
            if (MenuName == "GeneralReturn")
            {
                MenuId = MenuNumber.MenuGeneralReturn;
            }
            if (MenuName == "OpenInvoice")
            {
                MenuId = MenuNumber.MenuOpenInvoice;
            }
            if (MenuName == "DebitCredit")
            {
                MenuId = MenuNumber.MenuDebitCredit;
            }
            if (MenuName == "ProcurementPurchase")
            {
                MenuId = MenuNumber.MenuProcurementPurchase;
            }
            if (MenuName == "ProcurementAccounts")
            {
                MenuId = MenuNumber.MenuProcurementAccounts;
            }
            if (MenuName == "Stores")
            {
                MenuId = MenuNumber.MenuStores;
            }



            if (MenuName == "ProcessOrder")
            {
                MenuId = MenuNumber.MenuProcessOrder;
            }

            if (MenuName == "ProcessOrderApproval")
            {
                MenuId = MenuNumber.MenuProcessOrderApproval;
            }

            if (MenuName == "ProcessIssue")
            {
                MenuId = MenuNumber.MenuProcessIssue;
            }
            if (MenuName == "ProcessReceipt")
            {
                MenuId = MenuNumber.MenuProcessReceipt;
            }
            if (MenuName == "ProcessReturn")
            {
                MenuId = MenuNumber.MenuProcessReturn;
            }
            if (MenuName == "GeneralProcessOrder")
            {
                MenuId = MenuNumber.MenuGeneralProcessOrder;
            }
            if (MenuName == "GeneralProcessReceipt")
            {
                MenuId = MenuNumber.MenuGeneralProcessReceipt;
            }
            if (MenuName == "GeneralProcessReturn")
            {
                MenuId = MenuNumber.MenuGeneralProcessReturn;
            }
            if (MenuName == "ProcessInvoice")
            {
                MenuId = MenuNumber.MenuProcessInvoice;
            }
            if (MenuName == "ProcessReceiptQuality")
            {
                MenuId = MenuNumber.MenuProcessReceiptQuality;
            }


            if (MenuName == "FlorProduction")
            {
                MenuId = MenuNumber.MenuFlorProduction;
            }
            if (MenuName == "Cutting")
            {
                MenuId = MenuNumber.MenuCutting;
            }
            if (MenuName == "Sewing")
            {
                MenuId = MenuNumber.MenuSewing;
            }
            if (MenuName == "CommonProduction")
            {
                MenuId = MenuNumber.MenuCommonProduction;
            }
            if (MenuName == "ProductionInvoice")
            {
                MenuId = MenuNumber.MenuProductionInvoice;
            }
            if (MenuName == "FlorJobOrder")
            {
                MenuId = MenuNumber.MenuFlorJobOrder;
            }
            if (MenuName == "FlorDespatch")
            {
                MenuId = MenuNumber.MenuFlorDespatch;
            }
            if (MenuName == "CuttingIssue")
            {
                MenuId = MenuNumber.MenuCuttingIssue;
            }
            if (MenuName == "CuttingReceipt")
            {
                MenuId = MenuNumber.MenuCuttingReceipt;
            }
            if (MenuName == "CuttingReturn")
            {
                MenuId = MenuNumber.MenuCuttingReturn;
            }
            if (MenuName == "SewingIssue")
            {
                MenuId = MenuNumber.MenuSewingIssue;
            }
            if (MenuName == "SewingReceipt")
            {
                MenuId = MenuNumber.MenuSewingReceipt;
            }
            if (MenuName == "SewingReturn")
            {
                MenuId = MenuNumber.MenuSewingReturn;
            }
            if (MenuName == "CommonIssue")
            {
                MenuId = MenuNumber.MenuCommonIssue;
            }
            if (MenuName == "CommonReceipt")
            {
                MenuId = MenuNumber.MenuCommonReceipt;
            }
            if (MenuName == "CommonReceiptQlty")
            {
                MenuId = MenuNumber.MenuCommonReceiptQlty;
            }

            if (MenuName == "CommonReturn")
            {
                MenuId = MenuNumber.MenuCommonReturn;
            }
            if (MenuName == "JobReceipt")
            {
                MenuId = MenuNumber.MenuJobReceipt;
            }
            if (MenuName == "JobInvoice")
            {
                MenuId = MenuNumber.MenuJobInvoice;
            }
            if (MenuName == "SkuConId")
            {
                MenuId = MenuNumber.MenuSkuConId;
            }
            if (MenuName == "StockdespatchId")
            {
                MenuId = MenuNumber.MenuStockdespatchId;
            }
            if (MenuName == "BuyerOrderDespatch")
            {
                MenuId = MenuNumber.MenuBuyerOrderDespatch;
            }
            if (MenuName == "PanelProcess")
            {
                MenuId = MenuNumber.MenuPanelProcess;
            }
            if (MenuName == "PanelProcessIssue")
            {
                MenuId = MenuNumber.MenuPanelProcessIssue;
            }
            if (MenuName == "PanelProcessReceipt")
            {
                MenuId = MenuNumber.MenuPanelProcessReceipt;
            }

            if (MenuName == "PanelProcessReturn")
            {
                MenuId = MenuNumber.MenuPanelProcessReturn;
            }

            if (MenuName == "SetupRegistration")
            {
                MenuId = MenuNumber.MenuSetupRegistration;
            }
            if (MenuName == "AllowanceSetup")
            {
                MenuId = MenuNumber.MenuAllowanceSetup;
            }
            if (MenuName == "MISSetting")
            {
                MenuId = MenuNumber.MenuMISSetting;
            }
            if (MenuName == "ProcessSequenceSetup")
            {
                MenuId = MenuNumber.MenuProcessSequenceSetup;
            }
            if (MenuName == "GrantRights")
            {
                MenuId = MenuNumber.MenuGrantRights;
            }
            if (MenuName == "DocumentSetup")
            {
                MenuId = MenuNumber.MenuDocumentSetup;
            }
            if (MenuName == "TrimsTemplate")
            {
                MenuId = MenuNumber.MenuTrimsTemplate;
            }
            if (MenuName == "YarnFabTemp")
            {
                MenuId = MenuNumber.MenuYarnFabTemp;
            }
            if (MenuName == "OrderShipment")
            {
                MenuId = MenuNumber.MenuOrderShipment;
            }
            if (MenuName == "Measurment")
            {
                MenuId = MenuNumber.MenuMeasurment;
            }
            if (MenuName == "OrderApproval")
            {
                MenuId = MenuNumber.MenuOrderApproval;
            }
            if (MenuName == "OrderStyle")
            {
                MenuId = MenuNumber.MenuOrderStyle;
            }
            if (MenuName == "PreSales")
            {
                MenuId = MenuNumber.MenuPreSales;
            }
            if (MenuName == "Enquiry")
            {
                MenuId = MenuNumber.MenuEnquiry;
            }
            if (MenuName == "QuotationMain")
            {
                MenuId = MenuNumber.MenuQuotationMain;
            }
            if (MenuName == "Followup")
            {
                MenuId = MenuNumber.MenuFollowup;
            }
            if (MenuName == "CourierEntry")
            {
                MenuId = MenuNumber.MenuCourierEntry;
            }
            if (MenuName == "Communication")
            {
                MenuId = MenuNumber.MenuCommunication;
            }
            if (MenuName == "SampleOrder")
            {
                MenuId = MenuNumber.MenuSampleOrder;
            }
            if (MenuName == "P1entry")
            {
                MenuId = MenuNumber.MenuP1entry;
            }
            if (MenuName == "P2entry")
            {
                MenuId = MenuNumber.MenuP2entry;
            }
            if (MenuName == "P3entry")
            {
                MenuId = MenuNumber.MenuP3entry;
            }
            if (MenuName == "PostSales")
            {
                MenuId = MenuNumber.MenuPostSales;
            }
            if (MenuName == "PostOrder")
            {
                MenuId = MenuNumber.MenuPostOrder;
            }
            if (MenuName == "WorkOrder")
            {
                MenuId = MenuNumber.MenuWorkOrder;
            }
            if (MenuName == "JobOrder")
            {
                MenuId = MenuNumber.MenuJobOrder;
            }
            if (MenuName == "OrderCancellation")
            {
                MenuId = MenuNumber.MenuOrderCancellation;
            }
            if (MenuName == "TestingDC")
            {
                MenuId = MenuNumber.MenuTestingDC;
            }
            if (MenuName == "TestingDCCancel")
            {
                MenuId = MenuNumber.MenuTestingDCCancel;
            }
            if (MenuName == "TestingDCReceipt")
            {
                MenuId = MenuNumber.MenuTestingDCReceipt;
            }
            if (MenuName == "TestingDCApproval")
            {
                MenuId = MenuNumber.MenuTestingDCApproval;
            }
            if (MenuName == "S1SamplePhotoEntry")
            {
                MenuId = MenuNumber.MenuS1SamplePhotoEntry;
            }
            if (MenuName == "S2PhotoSuitEntry")
            {
                MenuId = MenuNumber.MenuS2PhotoSuitEntry;
            }

            if (MenuName == "PurchaseOrderIndentApp")
            {
                MenuId = MenuNumber.MenuPurchaseOrderIndentApp;
            }
            if (MenuName == "PurchaseOrderApp")
            {
                MenuId = MenuNumber.MenuPurchaseOrderApp;
            }

            if (MenuName == "ProcessProcess")
            {
                MenuId = MenuNumber.MenuProcessProcess;
            }


            if (MenuName == "FabricReq")
            {
                MenuId = MenuNumber.MenuFabricReq;
            }

            if (MenuName == "PlanProgram")
            {
                MenuId = MenuNumber.MenuPlanProgram;
            }
            if (MenuName == "PlanComponent")
            {
                MenuId = MenuNumber.MenuPlanComponent;
            }
            if (MenuName == "PlanFabric")
            {
                MenuId = MenuNumber.MenuPlanFabric;
            }
            if (MenuName == "PlanYarn")
            {
                MenuId = MenuNumber.MenuPlanYarn;
            }
            if (MenuName == "PlanTrims")
            {
                MenuId = MenuNumber.MenuPlanTrims;
            }
            if (MenuName == "PgmBOM")
            {
                MenuId = MenuNumber.MenuPgmBOM;
            }
            if (MenuName == "PgmWorkFlow")
            {
                MenuId = MenuNumber.MenuPgmWorkFlow;
            }
            if (MenuName == "PgmBudget")
            {
                MenuId = MenuNumber.MenuPgmBudget;
            }
            if (MenuName == "ProcessSequence")
            {
                MenuId = MenuNumber.MenuProcessSequence;
            }
            if (MenuName == "ProcessProgram")
            {
                MenuId = MenuNumber.MenuProcessProgram;
            }

            if (MenuName == "BillPass")
            {
                MenuId=MenuNumber.MenuBillPass;
            }
            if (MenuName == "Payment")
            {
                MenuId=MenuNumber.MenuPayment;
            }
            if (MenuName == "SecondsSales")
            {
                MenuId=MenuNumber.MenuSecondSales;
            }
            if (MenuName == "CommercialInvoice")
            {
                MenuId=MenuNumber.MenuCommercialInvoice;
            }
            if (MenuName == "OrderSalesInvoice")
            {
                MenuId=MenuNumber.MenuOrderSalesInvoice;
            }


            return Json(MenuId, JsonRequestBehavior.AllowGet);
        }
    }
}
