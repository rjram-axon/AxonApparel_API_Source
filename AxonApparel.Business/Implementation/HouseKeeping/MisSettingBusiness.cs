using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;


namespace AxonApparel.Business
{
    public class MisSettingBusiness : IMisSettingBusines
    {
        IMisSettingRepository MisRep = new MisSettingRepository();

        public Response<bool> UpdateMisEntry(MisSetting MisEntry)
        {
            try
            {

                AxonApparel.Repository.MisPath MisEdit = new AxonApparel.Repository.MisPath
                {

                    //pur_ord_no = PoEEntry.pur_ord_no,
                    //pur_ord_id = PoEEntry.pur_ord_id,
                    //companyid = PoEEntry.companyid,
                    //orddate = PoEEntry.orddate,
                    //supplierid = PoEEntry.SupplierId,
                    //Purchase_Type = PoEEntry.Purchase_Type,
                    //Purchase_ItemType = PoEEntry.Purchase_ItemType,
                    //remarks = PoEEntry.remarks,
                    //ord_commit = PoEEntry.ord_commit,
                    //cancel = false,
                    //Unit_Supplier_Self = PoEEntry.Unit_Supplier_Self,
                    //Unit_Supplier = PoEEntry.Unit_Supplier,
                    //Amount = PoEEntry.Amount,
                    //ord_close = false,
                    //unit_or_other = PoEEntry.unit_or_other,
                    //Amend = PoEEntry.Amend,
                    //currencyid = PoEEntry.currencyid,
                    //exchange_rate = 1,
                    //LocalImport = PoEEntry.LocalImport,
                    //ReqDate = PoEEntry.orddate,
                    //BillCompany = PoEEntry.BillCompany,
                    //Closed = "N",
                    //remainderid = PoEEntry.remainderid,
                    //ReqNo = PoEEntry.ReqNo,
                    //BillCompType = PoEEntry.BillCompType,
                    //TaxPercent = PoEEntry.TaxPercent,
                    //TaxAmount = PoEEntry.TaxAmount,
                    //WITH_ANNEXURE = PoEEntry.WITH_ANNEXURE,
                    //AddLessType = PoEEntry.AddLessType,
                    //AddLessManualOrFormula = PoEEntry.AddLessManualOrFormula,
                    //IsApproved = PoEEntry.IsApproved,
                    //ToApprove = PoEEntry.ToApprove,
                    //ApprovedBY = AppById,
                    //ApproveDate = PoEEntry.orddate,

                    //CreatedBy = IsCrBy,
                    //Paytermid = PoEEntry.Paytermid,
                    //Potype = PoEEntry.Potype,
                    //TOTCGSTAMT = PoEEntry.TOTCGSTAMT,
                    //TOTSGSTAMT = PoEEntry.TOTSGSTAMT,
                    //TOTIGSTAMT = PoEEntry.TOTIGSTAMT,
                    //chequeno = PoEEntry.chequeno,
                    ////chequedate = POEntry.chequedate,
                    //advance = (decimal)Adv,
                    //paymode = PayMode,
                    dCompanyId = MisEntry.dCompanyId,
                    dCompanyUnitId = MisEntry.dCompanyUnitId,
                    MispathId = MisEntry.MisId,
                    CostAppCheck = MisEntry.CostAppCheck,
                    FromDays = MisEntry.FromDays,
                    FINYEAR = MisEntry.FINYEAR,
                    ASSTYEAR = MisEntry.ASSTYEAR,
                    dCurrencyId = (int)(MisEntry.dCurrenyId == null ? 0 : MisEntry.dCurrenyId),//MisEntry.dCurrenyId,
                    ValidateBudgetRateInCuttingOrder = MisEntry.ValidateBudgetRateInCuttingOrder,
                    ValidateBudgetRateGenProdIssue = MisEntry.ValidateBudgetRateGenProdIssue,
                    ValidateBudgetRateSewing = MisEntry.ValidateBudgetRateSewing,
                    ValidatePOApproval = MisEntry.ValidatePOApproval,
                    chkPoAgainstIndent = MisEntry.ValidatePOAgIndent,
                    ValidateGafiCharges = MisEntry.ValidateGafiCharges,
                    chkGSTAgainstHSNCode = MisEntry.chkGstPerAgainstHsncode,
                    EnableTransactionDate = MisEntry.chkEnbTransDate,
                    EnableAssortDetailsRate = MisEntry.chkEnbAssortRate,
                    BuyerWiseCosting = MisEntry.chkBuyerWiseCosting,
                    CostProCheckWork = Convert.ToString(MisEntry.CostProCheckWork),
                    EnableJobOrderRate = MisEntry.ChkJobOrderRate,
                    BuyerWiseDetailsList = MisEntry.CostBudDetailsCheck,
                    ValidateAppForOpenPrg = Convert.ToString(MisEntry.ValidateAppForOpenPrg),
                    checkBillsToInvoiceEntry = MisEntry.checkBillsToInvoiceEntry,
                    ApplicationPath = MisEntry.ApplicationPath,
                    BaseColorid = MisEntry.BaseColorid,
                    ValidateStore = MisEntry.ValidateStore,
                    ValidateProcessStore = MisEntry.ValidateProcessStore,
                    ValidateProductionStore = MisEntry.ValidateProductionStore,
                    ValidateBudRateinPurinvBulk = MisEntry.ValidateBudRateinPurinvBulk,
                    ValidateBudRateinPurinvSample = MisEntry.ValidateBudRateinPurinvSample,
                    ValidateBudRateinProinvBulk = MisEntry.ValidateBudRateinProinvBulk,
                    ValidateBudRateinProinvSample = MisEntry.ValidateBudRateinProinvSample,
                    CuttingTolerance = MisEntry.CuttingTolerance,
                    ValidateBudgetRateInCuttingOrderSample = MisEntry.ValidateBudgetRateInCuttingOrderSample,
                    ValidateBudgetRateGenProdIssueSample = MisEntry.ValidateBudgetRateGenProdIssueSample,
                    ValidateBudgetRateSewingSample = MisEntry.ValidateBudgetRateSewingSample,
                    checkBillsToInvoiceEntryProduction = MisEntry.checkBillsToInvoiceEntryProduction,
                    CostAppSamPurCheck = MisEntry.CostAppSamPurCheck,
                    CostAppSamProCheck = MisEntry.CostAppSamProCheck,
                    chkSalesInvoiceDespatch = MisEntry.chkSalesInvoiceDespatch,
                    chkFabricDeliveryIssue = MisEntry.chkFabricDeliveryIssue,
                    Avatar = MisEntry.Avatar_Gender,
                    checkBillsToComInvoiceEntry = MisEntry.checkBillsToComInvoiceEntry,
                    ValidatePurchaseGRNqty = MisEntry.ValidatePurchaseGRNqty,
                    ValidateProcessGRNqty = MisEntry.ValidateProcessGRNqty,
                    chkValidateProgramQtyinTransfer = MisEntry.chkValidateProgramQtyinTransfer,
                    ValidateProcessIssueLoc = MisEntry.ValidateProcessIssueLoc,
                    validateProcessOrderApp = MisEntry.validateProcessOrderApp,
                    SupplierSetup = MisEntry.SupplierSetup,

                    chkBarcode = MisEntry.chkBarcode,
                    chkQRcode = MisEntry.chkQRcode,
                };

                var result = MisRep.UpdateDetData(MisEdit);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<MisSetting>> GetDataMisDetails()
        {
            try
            {
                var ProductWO = MisRep.GetDataRepMisDetails();

                return new Response<IEnumerable<MisSetting>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<MisSetting>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<MisSetting> GetBusMisDetails(int MisId)
        {
            try
            {
                var CurDetList = MisRep.GetMisDefalutRep(MisId);

                return new Response<MisSetting>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<MisSetting>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
