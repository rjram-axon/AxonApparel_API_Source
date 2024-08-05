using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.HouseKeeping
{
    public class MISSettingController : Controller
    {
        //
        // GET: /MISSetting/
        IMisSettingBusines MObj = new MisSettingBusiness();

        public ActionResult MISSettingIndex()
        {
            return View();
        }
        public JsonResult Update(MisSetting ObjMis)
        {
            return Json(MObj.UpdateMisEntry(ObjMis), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMisDetails()
        {
            return Json(MObj.GetDataMisDetails(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDefaultDetails(int MisId)
        {
            string ETDate = "";
            var result = MObj.GetBusMisDetails(MisId);

            if (result.Value != null)
            {
                var usn = result.Value;
                if (usn.chkEnbTransDate == true)
                {
                    ETDate = "Y";
                }
                else
                {
                    ETDate = "N";
                }
                Session["DCompId"] = usn.dCompanyId;
                Session["DCompUnitId"] = usn.dCompanyUnitId;
                Session["CostBudPurApp"] = usn.CostAppCheck;
                Session["CostBudCutApp"] = usn.ValidateBudgetRateInCuttingOrder;
                Session["CostBudSewingApp"] = usn.ValidateBudgetRateSewing;
                Session["CostBudComProdIssApp"] = usn.ValidateBudgetRateGenProdIssue;
                Session["FINYEAR"] = usn.FINYEAR;
                Session["DCurrencyId"] = usn.dCurrenyId;
                Session["DCurrAbs"] = usn.dCAbs;
                Session["PurApp"] = usn.ValidatePOApproval;
                Session["PurAgnInd"] = usn.ValidatePOAgIndent;
                Session["GafiChrg"] = usn.ValidateGafiCharges;
                Session["HsnAgGst"] = usn.chkGstPerAgainstHsncode;               
                Session["BuyerWiseCost"] = usn.chkBuyerWiseCosting;
                var dateAsString = DateTime.Now.ToString("yyyy-MM-dd");
                var FDays = usn.FromDays;
                Session["MainFromDate"] = DateTime.Today.AddDays(-FDays).ToString("dd/MM/yyyy");
                Session["EnTransDate"] = ETDate;
                Session["EnAssDetRate"] = usn.chkEnbAssortRate;
                Session["CostBudProcessApp"] = usn.CostProCheckWork;
                Session["EnJobOrderRate"] = usn.ChkJobOrderRate;
                Session["CostBuyDetilsApp"] = usn.CostBudDetailsCheck;
                Session["ValidateAppForOpenPrg"] = usn.ValidateAppForOpenPrg;
                Session["checkBillsToInvoiceEntry"] = usn.checkBillsToInvoiceEntry;
                Session["ScriptUpdatedOn"] = usn.ScriptUpdatedOn;

                Session["BaseColorid"] = usn.BaseColorid;
                Session["ValidateStore"] = usn.ValidateStore;
                Session["ValidateProcessStore"] = usn.ValidateProcessStore;
                Session["ValidateProductionStore"] = usn.ValidateProductionStore;
                Session["ValidateBudRateinPurinvBulk"] = usn.ValidateBudRateinPurinvBulk;
                Session["ValidateBudRateinPurinvSample"] = usn.ValidateBudRateinPurinvSample;
                Session["ValidateBudRateinProinvBulk"] = usn.ValidateBudRateinProinvBulk;
                Session["ValidateBudRateinProinvSample"] = usn.ValidateBudRateinProinvSample;
                Session["ValidateCuttingTolerance"] = usn.CuttingTolerance;

                Session["CostBudCutAppSam"] = usn.ValidateBudgetRateInCuttingOrderSample;
                Session["CostBudSewingAppSam"] = usn.ValidateBudgetRateSewingSample;
                Session["CostBudComProdIssAppSam"] = usn.ValidateBudgetRateGenProdIssueSample;
                Session["CostBilltoInvProd"] = usn.checkBillsToInvoiceEntryProduction;
                Session["CostAppSamPurCheck"] = usn.CostAppSamPurCheck;
                Session["CostAppSamProCheck"] = usn.CostAppSamProCheck;
                Session["ChkInvDesp"] = usn.chkSalesInvoiceDespatch;
                Session["AvatarGender"] = usn.Avatar_Gender;
                Session["checkBillsToComInvoiceEntry"] = usn.checkBillsToComInvoiceEntry;
                Session["ValidatePurchaseGRNqty"] = usn.ValidatePurchaseGRNqty;
                Session["ValidateProcessGRNqty"] = usn.ValidateProcessGRNqty;
                Session["ValidateProgramQtyinTransfer"] = usn.chkValidateProgramQtyinTransfer;
                Session["LicenseCompanyid"] = usn.LicencecompanyID;
                Session["ValidateProcessIssueLoc"] = usn.ValidateProcessIssueLoc;
                Session["validateProcessOrderApp"] = usn.validateProcessOrderApp;
                Session["SupplierSetup"] = usn.SupplierSetup;

            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
