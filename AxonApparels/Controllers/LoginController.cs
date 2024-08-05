using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Web.Security;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/
        ILoginBusiness buslogin = new LoginBusiness();

        IRoleBusiness RoleObj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        string pcname = "";
        string usrname = "";
        string usrpasswrd = "";
        public ActionResult LoginIndex()
        {
            return View();
        }
        public ActionResult NewTestPage()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ValidateUser(UserName user, string returnUrl = "")
        {
            var loginuser = UserManager.ValidateUser(user, Response);
            if (loginuser)
            {
                var result = GetUserId(user.Username, user.Password);
            }
            return Json(loginuser, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUserId(string Username, string Password)
        {
            var result = buslogin.GetDataUserDetails(Username, Password);

            //userinfo = buslogin.GetDataUserDetails(Username, Password);

            if (result.Value != null)
            {
                var usn = result.Value;

                Session["UserID"] = usn.UserId;
                Session["EmployeeId"] = usn.EmployeeId;
                Session["RoleId"] = usn.Roleid;
                Session["UserName"] = usn.Username.ToString();
                Session["Password"] = Password.ToString();

                string SessionId = HttpContext.Session.SessionID;
                Session["SessionID"] = SessionId;
            }
            GetMenuNumber();

          //  string SessionId = HttpContext.Session.SessionID;

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSessionId() {

            string SessionId = HttpContext.Session.SessionID;
            try
            {
                string old = Session["SessionID"].ToString();

                if (old == SessionId)
                {

                    return Json(SessionId, JsonRequestBehavior.AllowGet);
                }

                else
                {
                    Logout();
                    return Json(SessionId, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Logout();
                return Json(SessionId, JsonRequestBehavior.AllowGet);
            }
        
        }

        public JsonResult GetLoginstatus(string UserName, string Password)
        {
          
            var result = buslogin.GetDataUserDetails(UserName, Password);

            //userinfo = buslogin.GetDataUserDetails(Username, Password);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateLoginunit(string Username, string Password, int Unitid,string unit) 
        {
            var result = buslogin.UpdateloginUnit(Username, Password, Unitid);
            Session["LoginUnitId"] = Unitid;
            Session["LoginUnit"] = unit;
            //string SessionId = HttpContext.Session.SessionID;
            //Session["SessionID"] = SessionId;
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateLoginStatus(string Username, string Password, string Loginstatus, string MachineName)
        {
            //if (String.IsNullOrEmpty(Username)) {
            //    Username = Session["UserName"].ToString();
            //}
            //if (String.IsNullOrEmpty(Password))
            //{
            //    Password = Session["Password"].ToString();
            //}
            //if (String.IsNullOrEmpty(MachineName))
            //{
            //    MachineName = Session["MachineName"].ToString();
            //}
            pcname = MachineName;
            usrpasswrd = Password;
            usrname = Username;

            if (String.IsNullOrEmpty(MachineName))
            {
                string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = Request.ServerVariables["REMOTE_ADDR"];
                    if (string.IsNullOrEmpty(ipAddress))
                    {
                        ipAddress = Request.UserHostAddress;
                    }
                }
                Session["IPaddress"] = ipAddress;
                MachineName = ipAddress;
            }



            var result = buslogin.UpdateLoginStatus(Username, Password, Loginstatus, MachineName);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TimeoutLoginStatus(string Username, string Password, string Loginstatus, string MachineName)
        {
           
            var result = buslogin.UpdateLoginStatus(Username, Password, Loginstatus, MachineName);
            Session.Abandon();
            Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckLicenceUser()
        {
            var result = buslogin.CheckLicenceUser();
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMenuList(string Menuname)
        {
            int roleid = Convert.ToInt16(Session["RoleId"]);
            var RolObj = RoleObj.GetRolebyIdAll(roleid);
            var res = RolObj.Value;

            string ADD = null;
            string EDIT = null;
            string DELETE = null;
            string PRINT = null;
            string RETVAL = null;

            

            foreach (var list in res.RoleDetList)
            {
                if (list.MenuName == Menuname)
                {
                    if (list.AddFlg != 0)
                    {
                        ADD = "Y";
                    }
                    else 
                    {
                        ADD = "N";
                    }
                    if (list.EditFlg != 0)
                    {
                        EDIT  = "Y";
                    }
                    else 
                    {
                        EDIT = "N";
                    }
                    if (list.DelFlg != 0)
                    {
                        DELETE = "Y";
                    }
                    else 
                    {
                        DELETE = "N";
                    }
                    if (list.PrintFlg != 0)
                    {
                        PRINT = "Y";
                    }
                    else
                    {
                        PRINT = "N";
                    }

                }
                if (ADD == "Y" || EDIT == "Y" || DELETE == "Y" || PRINT == "Y")
                {
                    RETVAL = "A";
                }
            }

          /*  if (ADD == "Y" || EDIT == "Y" || DELETE == "Y" || PRINT == "Y")
            {
                RETVAL = "A";
            }
            else
            {
                RETVAL = null;
            }
            */

            return Json(RETVAL, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMenuListDetails()
        {
            int roleid = Convert.ToInt16(Session["RoleId"]);
            var RolObj = RoleObj.GetRolebyIdAll(roleid);
            var res = RolObj.Value;

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMenuNumber()
        {
            var getMenuNumber = buslogin.GetMenuList().Value.ToList();

            if (getMenuNumber != null)
            {
                foreach (var r in getMenuNumber)
                {
                    if (r.MenuName == "CompanyMaster")
                    {
                        MenuNumber.MenuCompany = r.MenuId;
                    }
                    if (r.MenuName == "CompanyUnit")
                    {
                        MenuNumber.MenuCompanyUnit = r.MenuId;
                    }
                    if (r.MenuName == "WorkDivision")
                    {
                        MenuNumber.MenuWorkdivision = r.MenuId;
                    }
                    if (r.MenuName == "Store")
                    {
                        MenuNumber.MenuStore = r.MenuId;
                    }
                    if (r.MenuName == "StoreSection")
                    {
                        MenuNumber.MenuStoreSection = r.MenuId;
                    }
                    if (r.MenuName == "Agent")
                    {
                        MenuNumber.MenuAgent = r.MenuId;
                    }
                    if (r.MenuName == "Buyer")
                    {
                        MenuNumber.MenuBuyer = r.MenuId;
                    }

                    if (r.MenuName == "Consignee")
                    {
                        MenuNumber.MenuConsignee = r.MenuId;
                    }
                    if (r.MenuName == "Supplier")
                    {
                        MenuNumber.MenuSupplier = r.MenuId;
                    }
                    if (r.MenuName == "Courier")
                    {
                        MenuNumber.MenuCourier = r.MenuId;
                    }
                    if (r.MenuName == "Bank")
                    {
                        MenuNumber.MenuBank = r.MenuId;
                    }

                    if (r.MenuName == "ItemGroup")
                    {
                        MenuNumber.MenuItemGroup = r.MenuId;
                    }
                    if (r.MenuName == "ItemMaster")
                    {
                        MenuNumber.MenuItem = r.MenuId;
                    }
                    if (r.MenuName == "Color Group")
                    {
                        MenuNumber.MenuColorGroup = r.MenuId;
                    }
                    if (r.MenuName == "Color")
                    {
                        MenuNumber.MenuColor = r.MenuId;
                    }
                    if (r.MenuName == "ColorCode")
                    {
                        MenuNumber.MenuColorCode = r.MenuId;
                    }
                    if (r.MenuName == "Size")
                    {
                        MenuNumber.MenuSize = r.MenuId;
                    }
                    if (r.MenuName == "Style Group")
                    {
                        MenuNumber.MenuStyleGroup = r.MenuId;
                    }
                    if (r.MenuName == "Style")
                    {
                        MenuNumber.MenuStyle = r.MenuId;
                    }
                    if (r.MenuName == "UnitOfMeasurement")
                    {
                        MenuNumber.MenuUnitOfMeasurement = r.MenuId;
                    }
                    if (r.MenuName == "UnitConversion")
                    {
                        MenuNumber.MenuUnitConversion = r.MenuId;
                    }
                    if (r.MenuName == "GarmentUom")
                    {
                        MenuNumber.MenuGarmentUom = r.MenuId;
                    }
                    if (r.MenuName == "GST")
                    {
                        MenuNumber.MenuGST = r.MenuId;
                    }
                    if (r.MenuName == "HSN")
                    {
                        MenuNumber.MenuHSN = r.MenuId;
                    }
                    if (r.MenuName == "ShipmentMode")
                    {
                        MenuNumber.MenuShipmentMode = r.MenuId;
                    }
                    if (r.MenuName == "ShipmentSystem")
                    {
                        MenuNumber.MenuShipmentSystem = r.MenuId;
                    }
                    if (r.MenuName == "Season")
                    {
                        MenuNumber.MenuSeason = r.MenuId;
                    }
                    if (r.MenuName == "Approval")
                    {
                        MenuNumber.MenuApproval = r.MenuId;
                    }
                    if (r.MenuName == "ProcessMaster")
                    {
                        MenuNumber.MenuProcess = r.MenuId;
                    }
                    if (r.MenuName == "ProcessSetup")
                    {
                        MenuNumber.MenuProcessSetup = r.MenuId;
                    }
                    if (r.MenuName == "Reason")
                    {
                        MenuNumber.MenuReason = r.MenuId;
                    }

                    if (r.MenuName == "PaymentTerms")
                    {
                        MenuNumber.MenuPaymentTerms = r.MenuId;
                    }
                    if (r.MenuName == "Currency")
                    {
                        MenuNumber.MenuCurrency = r.MenuId;
                    }
                    if (r.MenuName == "Description")
                    {
                        MenuNumber.MenuDescription = r.MenuId;
                    }


                    if (r.MenuName == "AccountHeads")
                    {
                        MenuNumber.MenuAccountHeads = r.MenuId;
                    }
                    if (r.MenuName == "OverHeads")
                    {
                        MenuNumber.MenuOverHeads = r.MenuId;
                    }
                    if (r.MenuName == "Role")
                    {
                        MenuNumber.MenuRole = r.MenuId;
                    }
                    if (r.MenuName == "EmployeeEntry")
                    {
                        MenuNumber.MenuEmployee = r.MenuId;
                    }
                    if (r.MenuName == "UserGroup")
                    {
                        MenuNumber.MenuUserGroup = r.MenuId;
                    }
                    if (r.MenuName == "Department")
                    {
                        MenuNumber.MenuDepartment = r.MenuId;
                    }
                    if (r.MenuName == "Designation")
                    {
                        MenuNumber.MenuDesignation = r.MenuId;
                    }
                    if (r.MenuName == "Ledger")
                    {
                        MenuNumber.MenuLedger = r.MenuId;
                    }
                    if (r.MenuName == "Country")
                    {
                        MenuNumber.MenuCountry = r.MenuId;
                    }
                    if (r.MenuName == "State")
                    {
                        MenuNumber.MenuState = r.MenuId;
                    }
                    if (r.MenuName == "City")
                    {
                        MenuNumber.MenuCity = r.MenuId;
                    }
                    if (r.MenuName == "PortOfLoading") 
                    {
                        MenuNumber.MenuPortOfLoading = r.MenuId;
                    }
                    if (r.MenuName =="Pre Sales")
                    {
                        MenuNumber.MenuPreSales=r.MenuId ;
                    }
                    if(r.MenuName =="QuotationMain")
                    {
                        MenuNumber.MenuQuotationMain=r.MenuId ;  
                    }
                    if(r.MenuName =="FollowUp")
                    {
                            MenuNumber.MenuFollowUp=r.MenuId ;  
                    }
                    if(r.MenuName =="CourierEntry")
                    {
                        MenuNumber.MenuCourierEntry=r.MenuId;  
                    }
                    if(r.MenuName =="Communication")
                    { 
                        MenuNumber.MenuCommunication=r.MenuId ;
                    }
                    if(r.MenuName =="SampleOrder")
                    {
                        MenuNumber.MenuSampleOrder=r.MenuId ;
                    }
                   
                    if(r.MenuName=="BulkOrder")
                    {
                        MenuNumber.MenuBulkOrder=r.MenuId ;
                    }
                    if(r.MenuName =="JobOrder")
                    {
                        MenuNumber.MenuJobOrder=r.MenuId;
                    }
                    if(r.MenuName =="JobWork")
                    {
                        MenuNumber.MenuJobOrder=r.MenuId;
                    }
                    if(r.MenuName=="OrderCancellation")
                    {
                        MenuNumber.MenuOrderCancellation=r.MenuId; 
                    }
                    if (r.MenuName == "StyleTemplate")
                    {
                        MenuNumber.MenuStyleTemplate = r.MenuId;
                    }
                    if (r.MenuName == "SampleType")
                    {
                        MenuNumber.MenuSampleType = r.MenuId;
                    }
                    if (r.MenuName == "Testing Type")
                    {
                        MenuNumber.MenuTestingType = r.MenuId;
                    }
                    if (r.MenuName == "Order Approval")
                    {
                        MenuNumber.MenuOrderApproval = r.MenuId;
                    }
                    if (r.MenuName == "S1SampleEntry")
                    {
                        MenuNumber.S1SampleEntry = r.MenuId;
                    }
                    if (r.MenuName == "S2PhotoSuitEntry")
                    {
                        MenuNumber.S2PhotoSuitEntry = r.MenuId;
                    }
                    if (r.MenuName == "Testing DC Approval")
                    {
                        MenuNumber.MenuTestingDCApproval = r.MenuId;
                    }
                    if (r.MenuName == "Testing DC Cancel")
                    {
                        MenuNumber.MenuTestingDCCancel = r.MenuId;
                    }
                    if (r.MenuName == "TestingDC")
                    {
                        MenuNumber.MenuTestingDC = r.MenuId;
                    }
                    if (r.MenuName == "Testing DC Receipt")
                    {
                        MenuNumber.MenuTestingDCReceipt = r.MenuId;
                    }
                    if (r.MenuName == "TrimsTemplate")
                    {
                        MenuNumber.MenuTrimsTemplate = r.MenuId;
                    }

                    if (r.MenuName == "YarnFabTemp")
                    {
                        MenuNumber.MenuYarnFabTemp = r.MenuId;
                    }
                    if (r.MenuName == "OrderShipment")
                    {
                        MenuNumber.MenuOrderShipment = r.MenuId;
                    }
                    if (r.MenuName == "Measurment")
                    {
                        MenuNumber.MenuMeasurment = r.MenuId;
                    }
                    if (r.MenuName == "OrderApproval")
                    {
                        MenuNumber.MenuOrderApproval = r.MenuId;
                    }
                    if (r.MenuName == "Purchase")
                    {
                        MenuNumber.MenuPurchase = r.MenuId;
                    }
                    if (r.MenuName == "PurchaseOrder")
                    {
                        MenuNumber.MenuPurchaseOrder = r.MenuId;
                    }
                    if (r.MenuName == "PurchaseOrderYarn")
                    {
                        MenuNumber.MenuPurchaseOrderYarn = r.MenuId;
                    }
                    if (r.MenuName == "PurchaseOrderTrims")
                    {
                        MenuNumber.MenuPurchaseOrderTrims = r.MenuId;
                    }
                    if (r.MenuName == "GoodsReceipt")
                    {
                        MenuNumber.MenuGoodsReceipt = r.MenuId;
                    }
                    if (r.MenuName == "GoodsReceiptYarn")
                    {
                        MenuNumber.MenuGoodsReceiptYarn = r.MenuId;
                    }
                    if (r.MenuName == "GoodsReceiptTrims")
                    {
                        MenuNumber.MenuGoodsReceiptTrims = r.MenuId;
                    }
                    if (r.MenuName == "ReceiptQualityYarn")
                    {
                        MenuNumber.MenuReceiptQualityYarn = r.MenuId;
                    }
                    if (r.MenuName == "ReceiptQualityTrims")
                    {
                        MenuNumber.MenuReceiptQualityTrims = r.MenuId;
                    }
                    if (r.MenuName == "LotSplitUp")
                    {
                        MenuNumber.MenuLotSplitUp = r.MenuId;
                    }
                    if (r.MenuName == "PurchaseReturn")
                    {
                        MenuNumber.MenuPurchaseReturn = r.MenuId;
                    }
                    if (r.MenuName == "SpecialRequisition")
                    {
                        MenuNumber.MenuSpecialRequisition = r.MenuId;
                    }
                    if (r.MenuName == "CSPReceipt")
                    {
                        MenuNumber.MenuCSPReceipt = r.MenuId;
                    }
                    if (r.MenuName == "StoresDelivery")
                    {
                        MenuNumber.MenuStoresDelivery = r.MenuId;
                    }
                    if (r.MenuName == "StoresDeliveryReturn")
                    {
                        MenuNumber.MenuStoresDeliveryReturn = r.MenuId;
                    }
                    if (r.MenuName == "OpeningStock")
                    {
                        MenuNumber.MenuOpeningStock = r.MenuId;
                    }
                    if (r.MenuName == "StockInward")
                    {
                        MenuNumber.MenuStockInward = r.MenuId;
                    }
                    if (r.MenuName == "StockOutward")
                    {
                        MenuNumber.MenuStockOutward = r.MenuId;
                    }
                    if (r.MenuName == "StockTransfer")
                    {
                        MenuNumber.MenuStockTransfer = r.MenuId;
                    }
                    if (r.MenuName == "StockTransferApproval")
                    {
                        MenuNumber.MenuStockTransferApproval = r.MenuId;
                    }
                    if (r.MenuName == "StockAllocation")
                    {
                        MenuNumber.MenuStockAllocation = r.MenuId;
                    }
                    if (r.MenuName == "StockAuditAdjustment")
                    {
                        MenuNumber.MenuStockAuditAdjustment = r.MenuId;
                    }
                    if (r.MenuName == "Bills")
                    {
                        MenuNumber.MenuBills = r.MenuId;
                    }
                    if (r.MenuName == "Invoice")
                    {
                        MenuNumber.MenuInvoice = r.MenuId;
                    }
                    if (r.MenuName == "OpenDebitNote")
                    {
                        MenuNumber.MenuOpenDebitNote = r.MenuId;
                    }
                    if (r.MenuName == "GeneralMemo")
                    {
                        MenuNumber.MenuGeneralMemo = r.MenuId;
                    }
                    if (r.MenuName == "GeneralReturn")
                    {
                        MenuNumber.MenuGeneralReturn = r.MenuId;
                    }
                    if (r.MenuName == "OpenInvoice")
                    {
                        MenuNumber.MenuOpenInvoice = r.MenuId;
                    }
                    if (r.MenuName == "DebitCredit")
                    {
                        MenuNumber.MenuDebitCredit = r.MenuId;
                    }
                    if (r.MenuName == "ProcurementPurchase")
                    {
                        MenuNumber.MenuProcurementPurchase = r.MenuId;
                    }
                    if (r.MenuName == "ProcurementAccounts")
                    {
                        MenuNumber.MenuProcurementAccounts = r.MenuId;
                    }
                    if (r.MenuName == "Stores")
                    {
                        MenuNumber.MenuStores = r.MenuId;
                    }



                    if (r.MenuName == "ProcessOrder")
                    {
                        MenuNumber.MenuProcessOrder = r.MenuId;
                    }
                    if (r.MenuName == "ProcessIssue")
                    {
                        MenuNumber.MenuProcessIssue = r.MenuId;
                    }
                    if (r.MenuName == "ProcessReceipt")
                    {
                        MenuNumber.MenuProcessReceipt = r.MenuId;
                    }
                    if (r.MenuName == "ProcessReturn")
                    {
                        MenuNumber.MenuProcessReturn = r.MenuId;
                    }
                    if (r.MenuName == "GeneralProcessOrder")
                    {
                        MenuNumber.MenuGeneralProcessOrder = r.MenuId;
                    }
                    if (r.MenuName == "GeneralProcessReceipt")
                    {
                        MenuNumber.MenuGeneralProcessReceipt = r.MenuId;
                    }
                    if (r.MenuName == "GeneralProcessReturn")
                    {
                        MenuNumber.MenuGeneralProcessReturn = r.MenuId;
                    }
                    if (r.MenuName == "ProcessInvoice")
                    {
                        MenuNumber.MenuProcessInvoice = r.MenuId;
                    }
                    if (r.MenuName == "ProcessReceiptQuality")
                    {
                        MenuNumber.MenuProcessReceiptQuality = r.MenuId;
                    }


                    if (r.MenuName == "FlorProduction")
                    {
                        MenuNumber.MenuFlorProduction = r.MenuId;
                    }
                    if (r.MenuName == "Cutting")
                    {
                        MenuNumber.MenuCutting = r.MenuId;
                    }
                    if (r.MenuName == "Sewing")
                    {
                        MenuNumber.MenuSewing = r.MenuId;
                    }
                    if (r.MenuName == "CommonProduction")
                    {
                        MenuNumber.MenuCommonProduction = r.MenuId;
                    }
                    if (r.MenuName == "ProductionInvoice")
                    {
                        MenuNumber.MenuProductionInvoice = r.MenuId;
                    }
                    if (r.MenuName == "FlorJobOrder")
                    {
                        MenuNumber.MenuFlorJobOrder = r.MenuId;
                    }
                    if (r.MenuName == "FlorDespatch")
                    {
                        MenuNumber.MenuFlorDespatch = r.MenuId;
                    }
                    if (r.MenuName == "CuttingIssue")
                    {
                        MenuNumber.MenuCuttingIssue = r.MenuId;
                    }
                    if (r.MenuName == "CuttingReceipt")
                    {
                        MenuNumber.MenuCuttingReceipt = r.MenuId;
                    }
                    if (r.MenuName == "CuttingReturn")
                    {
                        MenuNumber.MenuCuttingReturn = r.MenuId;
                    }

                    if (r.MenuName == "PanelProcess")
                    {
                        MenuNumber.MenuPanelProcess = r.MenuId;
                    }
                    if (r.MenuName == "PanelProcessIssue")
                    {
                        MenuNumber.MenuPanelProcessIssue = r.MenuId;
                    }
                    if (r.MenuName == "PanelProcessReceipt")
                    {
                        MenuNumber.MenuPanelProcessReceipt = r.MenuId;
                    }

                    if (r.MenuName == "PanelProcessReturn")
                    {
                        MenuNumber.MenuPanelProcessReturn = r.MenuId;
                    }


                    if (r.MenuName == "SewingIssue")
                    {
                        MenuNumber.MenuSewingIssue = r.MenuId;
                    }
                    if (r.MenuName == "SewingReceipt")
                    {
                        MenuNumber.MenuSewingReceipt = r.MenuId;
                    }
                    if (r.MenuName == "SewingReturn")
                    {
                        MenuNumber.MenuSewingReturn = r.MenuId;
                    }
                    if (r.MenuName == "CommonIssue")
                    {
                        MenuNumber.MenuCommonIssue = r.MenuId;
                    }
                    if (r.MenuName == "CommonReceipt")
                    {
                        MenuNumber.MenuCommonReceipt = r.MenuId;
                    }
                    if (r.MenuName == "CommonReceiptQlty")
                    {
                        MenuNumber.MenuCommonReceiptQlty = r.MenuId;
                    }

                    if (r.MenuName == "CommonReturn")
                    {
                        MenuNumber.MenuCommonReturn = r.MenuId;
                    }
                    if (r.MenuName == "JobReceipt")
                    {
                        MenuNumber.MenuJobReceipt = r.MenuId;
                    }
                    if (r.MenuName == "JobInvoice")
                    {
                        MenuNumber.MenuJobInvoice = r.MenuId;
                    }
                    if (r.MenuName == "SkuConId")
                    {
                        MenuNumber.MenuSkuConId = r.MenuId;
                    }
                    if (r.MenuName == "StockdespatchId")
                    {
                        MenuNumber.MenuStockdespatchId = r.MenuId;
                    }
                    if (r.MenuName == "BuyerOrderDespatch")
                    {
                        MenuNumber.MenuBuyerOrderDespatch = r.MenuId;
                    }


                    if (r.MenuName == "SetupRegistration")
                    {
                        MenuNumber.MenuSetupRegistration = r.MenuId;
                    }
                    if (r.MenuName == "AllowanceSetup")
                    {
                        MenuNumber.MenuAllowanceSetup = r.MenuId;
                    }
                    if (r.MenuName == "MISSetting")
                    {
                        MenuNumber.MenuMISSetting = r.MenuId;
                    }
                    if (r.MenuName == "ProcessSequenceSetup")
                    {
                        MenuNumber.MenuProcessSequenceSetup = r.MenuId;
                    }
                    if (r.MenuName == "GrantRights")
                    {
                        MenuNumber.MenuGrantRights = r.MenuId;
                    }
                    if (r.MenuName == "DocumentSetup")
                    {
                        MenuNumber.MenuDocumentSetup = r.MenuId;
                    }

                    if (r.MenuName == "ProcessSequence")
                    {
                        MenuNumber.MenuProcessSequence = r.MenuId;
                    }
                    if (r.MenuName == "ProcessProgram")
                    {
                        MenuNumber.MenuProcessProgram = r.MenuId;
                    }


                    if (r.MenuName == "PreSales")
                    {
                        MenuNumber.MenuPreSales = r.MenuId;
                    }
                    if (r.MenuName == "Enquiry")
                    {
                        MenuNumber.MenuEnquiry = r.MenuId;
                    }
                    if (r.MenuName == "QuotationMain")
                    {
                        MenuNumber.MenuQuotationMain = r.MenuId;
                    }
                    if (r.MenuName == "Followup")
                    {
                        MenuNumber.MenuFollowup = r.MenuId;
                    }
                    if (r.MenuName == "CourierEntry")
                    {
                        MenuNumber.MenuCourierEntry = r.MenuId;
                    }
                    if (r.MenuName == "Communication")
                    {
                        MenuNumber.MenuCommunication = r.MenuId;
                    }
                    if (r.MenuName == "SampleOrder")
                    {
                        MenuNumber.MenuSampleOrder = r.MenuId;
                    }
                    if (r.MenuName == "P1entry")
                    {
                        MenuNumber.MenuP1entry = r.MenuId;
                    }
                    if (r.MenuName == "P2entry")
                    {
                        MenuNumber.MenuP2entry = r.MenuId;
                    }
                    if (r.MenuName == "P3entry")
                    {
                        MenuNumber.MenuP3entry = r.MenuId;
                    }
                    if (r.MenuName == "PostSales")
                    {
                        MenuNumber.MenuPostSales = r.MenuId;
                    }
                    if (r.MenuName == "OrderStyle")
                    {
                        MenuNumber.MenuOrderStyle = r.MenuId;
                    }
                    if (r.MenuName == "PostOrder")
                    {
                        MenuNumber.MenuPostOrder = r.MenuId;
                    }
                    if (r.MenuName == "WorkOrder")
                    {
                        MenuNumber.MenuWorkOrder = r.MenuId;
                    }
                    if (r.MenuName == "JobOrder")
                    {
                        MenuNumber.MenuJobOrder = r.MenuId;
                    }
                    if (r.MenuName == "OrderCancellation")
                    {
                        MenuNumber.MenuOrderCancellation = r.MenuId;
                    }
                    if (r.MenuName == "TestingDC")
                    {
                        MenuNumber.MenuTestingDC = r.MenuId;
                    }
                    if (r.MenuName == "TestingDCCancel")
                    {
                        MenuNumber.MenuTestingDCCancel = r.MenuId;
                    }
                    if (r.MenuName == "TestingDCReceipt")
                    {
                        MenuNumber.MenuTestingDCReceipt = r.MenuId;
                    }
                    if (r.MenuName == "TestingDCApproval")
                    {
                        MenuNumber.MenuTestingDCApproval = r.MenuId;
                    }
                    if (r.MenuName == "S1SamplePhotoEntry")
                    {
                        MenuNumber.MenuS1SamplePhotoEntry = r.MenuId;
                    }
                    if (r.MenuName == "S2PhotoSuitEntry")
                    {
                        MenuNumber.MenuS2PhotoSuitEntry = r.MenuId;
                    }

                    if (r.MenuName == "PurchaseOrderIndentApp")
                    {
                        MenuNumber.MenuPurchaseOrderIndentApp = r.MenuId;
                    }
                    if (r.MenuName == "PurchaseOrderApp")
                    {
                        MenuNumber.MenuPurchaseOrderApp = r.MenuId;
                    }

                    if (r.MenuName == "ProcessProcess")
                    {
                        MenuNumber.MenuProcessProcess = r.MenuId;
                    }
           
               
                    if (r.MenuName == "FabricReq")
                    {
                        MenuNumber.MenuFabricReq = r.MenuId;
                    }
                    if (r.MenuName == "PlanProgram")
                    {
                        MenuNumber.MenuPlanProgram = r.MenuId;
                    }
                    if (r.MenuName == "PlanComponent")
                    {
                        MenuNumber.MenuPlanComponent = r.MenuId;
                    }
                    if (r.MenuName == "PlanFabric")
                    {
                        MenuNumber.MenuPlanFabric = r.MenuId;
                    }
                    if (r.MenuName == "PlanYarn")
                    {
                        MenuNumber.MenuPlanYarn = r.MenuId;
                    }
                    if (r.MenuName == "PlanTrims")
                    {
                        MenuNumber.MenuPlanTrims = r.MenuId;
                    }
                    if (r.MenuName == "PgmBOM")
                    {
                        MenuNumber.MenuPgmBOM = r.MenuId;
                    }
                    if (r.MenuName == "PgmWorkFlow")
                    {
                        MenuNumber.MenuPgmWorkFlow = r.MenuId;
                    }
                    if (r.MenuName == "PgmBudget")
                    {
                        MenuNumber.MenuPgmBudget   = r.MenuId;
                    }




                    if (r.MenuName == "ProcessProgramApproval")
                    {
                        MenuNumber.MenuProcessProgramApproval = r.MenuId;
                    }
                    if (r.MenuName == "BudgetApproval")
                    {
                        MenuNumber.MenuBudgetApproval = r.MenuId;
                    }
                    if (r.MenuName == "SpecialReqApproval")
                    {
                        MenuNumber.MenuSpecialReqApproval = r.MenuId;
                    }
                    if (r.MenuName == "GoodsReceiptQuality")
                    {
                        MenuNumber.MenuGoodsReceiptQuality = r.MenuId;
                    }
                    if (r.MenuName == "CSPReceiptQuality")
                    {
                        MenuNumber.MenuCSPReceiptQuality = r.MenuId;
                    }


                    if (r.MenuName == "ItemTransfer")
                    {
                        MenuNumber.MenuItemTransfer = r.MenuId;
                    }
                    if (r.MenuName == "SubStoreIssue")
                    {
                        MenuNumber.MenuSubStoreIssue = r.MenuId;
                    }
                    if (r.MenuName == "SubStoreReceipt")
                    {
                        MenuNumber.MenuSubStoreReceipt = r.MenuId;
                    }
                    if (r.MenuName == "ProcessOrderApproval")
                    {
                        MenuNumber.MenuProcessOrderApproval = r.MenuId;
                    }
                    if (r.MenuName == "GroupProcessOrder")
                    {
                        MenuNumber.MenuGroupProcessOrder = r.MenuId;
                    }


                    if (r.MenuName == "ProductionOrder")
                    {
                        MenuNumber.MenuProductionOrder = r.MenuId;
                    }
                    if (r.MenuName == "ProductionReceipt")
                    {
                        MenuNumber.MenuProductionReceipt = r.MenuId;
                    }
                    if (r.MenuName == "ProductionReturn")
                    {
                        MenuNumber.MenuProductionReturn = r.MenuId;
                    }
                    if (r.MenuName == "SalesInvoice")
                    {
                        MenuNumber.MenuSalesInvoice = r.MenuId;
                    }
                    if (r.MenuName == "StoreSetup")
                    {
                        MenuNumber.MenuStoreSetup = r.MenuId;
                    }



                    if (r.MenuName == "ItemRate")
                    {
                        MenuNumber.MenuItemRate = r.MenuId;
                    }
                    if (r.MenuName == "BuyerwiseItemRate")
                    {
                        MenuNumber.MenuBuyerwiseItemRate = r.MenuId;
                    }
                    if (r.MenuName == "FabricMaster")
                    {
                        MenuNumber.MenuFabricMaster = r.MenuId;
                    }

                    if (r.MenuName == "BillPass")
                    {
                        MenuNumber.MenuBillPass = r.MenuId;
                    }
                    if (r.MenuName == "Payment")
                    {
                        MenuNumber.MenuPayment = r.MenuId;
                    }
                    if (r.MenuName == "SecondsSales")
                    {
                        MenuNumber.MenuSecondSales = r.MenuId;
                    }
                    if (r.MenuName == "CommercialInvoice")
                    {
                        MenuNumber.MenuCommercialInvoice = r.MenuId;
                    }
                    if (r.MenuName == "OrderSalesInvoice")
                    {
                        MenuNumber.MenuOrderSalesInvoice = r.MenuId;
                    }
                    if (r.MenuName == "FabricDeliveryIssue")
                    {
                        MenuNumber.MenuFabricDeliveryIssue = r.MenuId;
                    }
                 

                }
            }


        //public static int MenuStoreSection;
        //public static int MenuAgent;
        //public static int MenuBuyer;
        //public static int MenuConsignee;
        //public static int MenuSupplier;
        //public static int MenuCourier;          
        //public static int MenuBank;

            return Json(getMenuNumber, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Logout()
        {

            try
            {

                usrname = Session["UserName"].ToString();
                usrpasswrd = Session["Password"].ToString();
                pcname = Session["MachineName"].ToString();

                UpdateLoginStatus(usrname, usrpasswrd, "N", pcname);
                Session["UserID"] = null;
                Session["UserName"] = null;
                Session["RoleId"] = null;
                Session["Password"] = null;
                Session.Abandon();
                //return true;
                return Redirect("~/Login/LoginIndex");
            }
            catch (Exception ex)
            {
                return Redirect("~/Login/LoginIndex");

            }        
        }
    }
}
