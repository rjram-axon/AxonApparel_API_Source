using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class MisSettingRepository : IMisSettingRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public bool UpdateDetData(MisPath objMisEntry)
        {
            bool reserved = false;
            string ETDate = "";
            string ChkInvBill = "";
            string validatestore = "";
            string validateprocstore = "";
            string validateprodstore = "";
            string ChkComInvBill = "";
            string chkValidateProgramQtyinTransfer = "";
            string validateprocissloc = "";
            string validateprocApp = "";
            string validateSupplierproc = "";

            if (objMisEntry.EnableTransactionDate == true)
            {
                ETDate = "1";
            }
            else
            {
                ETDate = "0";
            }

            if (objMisEntry.checkBillsToInvoiceEntry == true)
            {
                ChkInvBill = "1";
            }
            else
            {
                ChkInvBill = "0";
            }
            if (objMisEntry.checkBillsToComInvoiceEntry == true)
            {
                ChkComInvBill = "1";
            }
            else
            {
                ChkComInvBill = "0";
            }

            if (objMisEntry.chkValidateProgramQtyinTransfer == true)
            {
                chkValidateProgramQtyinTransfer = "1";
            }
            else
            {
                chkValidateProgramQtyinTransfer = "0";
            }


            if (objMisEntry.ValidateStore == true)
            {
                validatestore = "1";
            }
            else
            {
                validatestore = "0";
            }
            if (objMisEntry.ValidateProcessStore == true)
            {
                validateprocstore = "1";
            }
            else
            {
                validateprocstore = "0";
            }
            if (objMisEntry.ValidateProcessIssueLoc == true)
            {
                validateprocissloc = "1";
            }
            else
            {
                validateprocissloc = "0";
            }

            if (objMisEntry.validateProcessOrderApp == true)
            {
                validateprocApp = "1";
            }
            else
            {
                validateprocApp = "0";
            }

            if (objMisEntry.SupplierSetup == true)
            {
                validateSupplierproc = "1";
            }
            else
            {
                validateSupplierproc = "0";
            }


            if (objMisEntry.ValidateProductionStore == true)
            {
                validateprodstore = "1";
            }
            else
            {
                validateprodstore = "0";
            }

            var ValidateBudRateinPurinvBulk = "0";
            if (objMisEntry.ValidateBudRateinPurinvBulk == true)
            {
                ValidateBudRateinPurinvBulk = "1";
            }
            else
            {
                ValidateBudRateinPurinvBulk = "0";
            }

            var ValidatePurchaseGRNqty = "0";
            if (objMisEntry.ValidatePurchaseGRNqty == true)
            {
                ValidatePurchaseGRNqty = "1";
            }
            else
            {
                ValidatePurchaseGRNqty = "0";
            }

            var ValidateProcessGRNqty = "0";
            if (objMisEntry.ValidateProcessGRNqty == true)
            {
                ValidateProcessGRNqty = "1";
            }
            else
            {
                ValidateProcessGRNqty = "0";
            }


            var ValidateBudRateinPurinvSample = "0";
            if (objMisEntry.ValidateBudRateinPurinvSample == true)
            {
                ValidateBudRateinPurinvSample = "1";
            }
            else
            {
                ValidateBudRateinPurinvSample = "0";
            }


            var ValidateBudRateinProinvBulk = "0";
            if (objMisEntry.ValidateBudRateinProinvBulk == true)
            {
                ValidateBudRateinProinvBulk = "1";
            }
            else
            {
                ValidateBudRateinProinvBulk = "0";
            }
            var ValidateBudRateinProinvSample = "0";
            if (objMisEntry.ValidateBudRateinProinvSample == true)
            {
                ValidateBudRateinProinvSample = "1";
            }
            else
            {
                ValidateBudRateinProinvSample = "0";
            }




            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var Pg6 = entities.Proc_Apparel_GetMisPathUpdate(objMisEntry.MispathId, objMisEntry.dCompanyId, objMisEntry.dCompanyUnitId, objMisEntry.CostAppCheck, objMisEntry.FromDays, objMisEntry.FINYEAR, objMisEntry.ASSTYEAR, objMisEntry.dCurrencyId, objMisEntry.ValidateBudgetRateInCuttingOrder, objMisEntry.ValidateBudgetRateSewing, objMisEntry.ValidateBudgetRateGenProdIssue, objMisEntry.ValidatePOApproval, objMisEntry.chkPoAgainstIndent, objMisEntry.ValidateGafiCharges, objMisEntry.chkGSTAgainstHSNCode, ETDate, objMisEntry.EnableAssortDetailsRate, objMisEntry.BuyerWiseCosting, objMisEntry.CostProCheckWork, objMisEntry.EnableJobOrderRate
                        , objMisEntry.BuyerWiseDetailsList, objMisEntry.ValidateAppForOpenPrg, ChkInvBill, objMisEntry.ApplicationPath, objMisEntry.BaseColorid, validatestore, validateprocstore, validateprodstore, ValidateBudRateinPurinvBulk, ValidateBudRateinPurinvSample, ValidateBudRateinProinvBulk, ValidateBudRateinProinvSample, objMisEntry.CuttingTolerance, objMisEntry.ValidateBudgetRateInCuttingOrderSample, objMisEntry.ValidateBudgetRateSewingSample, objMisEntry.ValidateBudgetRateGenProdIssueSample, objMisEntry.checkBillsToInvoiceEntryProduction, objMisEntry.CostAppSamPurCheck, objMisEntry.CostAppSamProCheck, objMisEntry.chkSalesInvoiceDespatch, objMisEntry.Avatar, ChkComInvBill,
                            ValidatePurchaseGRNqty, ValidateProcessGRNqty, objMisEntry.chkFabricDeliveryIssue, chkValidateProgramQtyinTransfer, validateprocissloc, validateprocApp, validateSupplierproc, objMisEntry.chkBarcode, objMisEntry.chkQRcode);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete(); 

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public IEnumerable<MisSetting> GetDataRepMisDetails()
        {
            //IQueryable<MisSetting> query = (from a in entities.Proc_Apparel_GetMisPathDetails()
            //                                select new MisSetting
            //                                  {
            //                                      dCompanyId = (int)(a.CompId == null ? 0 : a.CompId),//a.CompId,
            //                                      dCompanyUnitId = (int)(a.UnitId == null ? 0 : a.UnitId),//a.UnitId,
            //                                      CompanyUnit = (a.Unit == null ? "" : a.Unit),//a.Unit,
            //                                      Company = (a.Company == null ? "" : a.Company),//a.Company,
            //                                      MisId = a.MispathId,
            //                                      CostAppCheck = a.PurBudApp,
            //                                      FromDays = a.FromDays,
            //                                      FINYEAR = a.FINYEAR,
            //                                      ASSTYEAR = a.ASSTYEAR,
            //                                      dCurrenyId = (int)(a.dCurrencyId == null ? 0 : a.dCurrencyId),//(int)a.dCurrencyId,                                                
            //                                      dCAbs = entities.Currencies.Where(cu => cu.CurrencyId == a.dCurrencyId).Select(e => e.Abbreviation).FirstOrDefault(),
            //                                      ValidateBudgetRateInCuttingOrder = a.ValidateBudgetRateInCuttingOrder,
            //                                      ValidateBudgetRateSewing = a.SewBudApp,
            //                                      ValidateBudgetRateGenProdIssue = a.GenProdIssBudApp,
            //                                      ValidatePOApproval = a.ValidatePOApproval,
            //                                      ValidatePOAgIndent = a.chkPoAgainstIndent,
            //                                      ValidateGafiCharges = a.ValidateGafiCharges,
            //                                      chkGstPerAgainstHsncode = a.ChkGstHsn,
            //                                      chkEnbTransDate = a.ETransDate,
            //                                      chkEnbAssortRate = a.EnbAssortDetRate,
            //                                      chkBuyerWiseCosting = a.BuyerWiseCosting,
            //                                      CostProCheckWork = Convert.ToChar(a.CostProCheckWork),
            //                                      ChkJobOrderRate = a.EnableJobOrderRate,

            //                                  }).AsQueryable();

            //return query;

            List<MisSetting> lstemployee = new List<MisSetting>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMisPathDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    MisSetting employee = new MisSetting();
                    employee.dCompanyId = Convert.ToInt32(rdr["CompId"]);
                    employee.dCompanyUnitId = Convert.ToInt32(rdr["UnitId"]);
                    employee.MisId = Convert.ToInt32(rdr["MispathId"]);
                    employee.CompanyUnit = rdr["Unit"].ToString();
                    employee.CostAppCheck = rdr["PurBudApp"].ToString();
                    employee.FromDays = Convert.ToInt32(rdr["FromDays"]);
                    employee.FINYEAR = rdr["FINYEAR"].ToString();
                    employee.ASSTYEAR = rdr["ASSTYEAR"].ToString();
                    employee.dCurrenyId = Convert.ToInt32(rdr["dCurrId"]);
                    employee.ValidateBudgetRateInCuttingOrder = rdr["ValidateBudgetRateInCuttingOrder"].ToString();
                    employee.ValidateBudgetRateSewing = rdr["SewBudApp"].ToString();
                    employee.ValidateBudgetRateGenProdIssue = rdr["GenProdIssBudApp"].ToString();
                    employee.ValidatePOApproval = rdr["ValidatePOApproval"].ToString();
                    employee.ValidatePOAgIndent = rdr["chkPoAgainstIndent"].ToString();
                    employee.ValidateGafiCharges = rdr["ValidateGafiCharges"].ToString();
                    employee.chkGstPerAgainstHsncode = rdr["ChkGstHsn"].ToString();
                    employee.chkEnbTransDate = Convert.ToBoolean(rdr["ETransDate"]);
                    employee.chkEnbAssortRate = rdr["EnbAssortDetRate"].ToString();
                    employee.chkBuyerWiseCosting = rdr["BuyerWiseCosting"].ToString();
                    employee.CostProCheckWork = Convert.ToChar(rdr["CostProCheckWork"]);
                    employee.ChkJobOrderRate = rdr["EnableJobOrderRate"].ToString();
                    employee.CostBudDetailsCheck = rdr["BuyWiseDetailsList"].ToString();
                    employee.Company = rdr["Company"].ToString();
                    employee.ValidateAppForOpenPrg = Convert.ToChar(rdr["ValidateAppForOpenPrgRaise"]);
                    employee.checkBillsToInvoiceEntry = Convert.ToBoolean(rdr["ValidatecheckBillsToInvoiceEntry"]);
                    employee.ApplicationPath = rdr["DbApplicationPath"].ToString();
                    employee.BaseColorid = String.IsNullOrEmpty(rdr["BaseColorid"].ToString()) ? 0 : Convert.ToInt32(rdr["BaseColorid"]);
                    employee.ValidateStore = Convert.ToBoolean(rdr["ValidateStore"]);
                    employee.ValidateProcessStore = Convert.ToBoolean(rdr["ValidateProcessStore"]);
                    employee.ValidateProductionStore = Convert.ToBoolean(rdr["ValidateProductionStore"]);
                    employee.ValidateBudRateinPurinvBulk = String.IsNullOrEmpty(rdr["ValidateBudRateinPurinvBulk"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinPurinvBulk"]);
                    employee.ValidateBudRateinPurinvSample = String.IsNullOrEmpty(rdr["ValidateBudRateinPurinvSample"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinPurinvSample"]);
                    employee.ValidateBudRateinProinvBulk = String.IsNullOrEmpty(rdr["ValidateBudRateinProinvBulk"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinProinvBulk"]);
                    employee.ValidateBudRateinProinvSample = String.IsNullOrEmpty(rdr["ValidateBudRateinProinvSample"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinProinvSample"]);
                    employee.CuttingTolerance = String.IsNullOrEmpty(rdr["CuttingTolerance"].ToString()) ? 0 : (decimal)(rdr["CuttingTolerance"]);
                    employee.ValidateBudgetRateGenProdIssueSample = String.IsNullOrEmpty(rdr["ValidateBudgetRateGenProdIssueSample"].ToString()) ? "N" : rdr["ValidateBudgetRateGenProdIssueSample"].ToString();
                    employee.ValidateBudgetRateSewingSample = String.IsNullOrEmpty(rdr["ValidateBudgetRateSewingSample"].ToString()) ? "N" : (rdr["ValidateBudgetRateSewingSample"]).ToString();
                    employee.ValidateBudgetRateInCuttingOrderSample = String.IsNullOrEmpty(rdr["ValidateBudgetRateInCuttingOrderSample"].ToString()) ? "N" : rdr["ValidateBudgetRateInCuttingOrderSample"].ToString();
                    employee.checkBillsToInvoiceEntryProduction = String.IsNullOrEmpty(rdr["checkBillsToInvoiceEntryProduction"].ToString()) ? "N" : rdr["checkBillsToInvoiceEntryProduction"].ToString();
                    employee.CostAppSamPurCheck = rdr["CostAppSamPurCheck"].ToString();
                    employee.CostAppSamProCheck = rdr["CostAppSamProCheck"].ToString();
                    employee.chkSalesInvoiceDespatch = String.IsNullOrEmpty(rdr["chkSalesInvoiceDespatch"].ToString()) ? "N" : rdr["chkSalesInvoiceDespatch"].ToString();
                    employee.Avatar_Gender = rdr["Avatar"].ToString();
                    employee.checkBillsToComInvoiceEntry = String.IsNullOrEmpty(rdr["checkBillsToComInvoiceEntry"].ToString()) ? false : Convert.ToBoolean(rdr["checkBillsToComInvoiceEntry"]);
                    employee.ValidatePurchaseGRNqty = String.IsNullOrEmpty(rdr["ValidatePurchaseGRNqty"].ToString()) ? false : Convert.ToBoolean(rdr["ValidatePurchaseGRNqty"]);
                    employee.ValidateProcessGRNqty = String.IsNullOrEmpty(rdr["ValidateProcessGRNqty"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateProcessGRNqty"]);
                    employee.chkFabricDeliveryIssue = String.IsNullOrEmpty(rdr["chkFabricDeliveryIssue"].ToString()) ? "N" : rdr["chkFabricDeliveryIssue"].ToString();
                    employee.chkValidateProgramQtyinTransfer = String.IsNullOrEmpty(rdr["chkValidateProgramQtyinTransfer"].ToString()) ? false : Convert.ToBoolean(rdr["chkValidateProgramQtyinTransfer"]);
                    employee.LicencecompanyID = String.IsNullOrEmpty(rdr["LicencecompanyID"].ToString()) ? 0 : Convert.ToInt32(rdr["LicencecompanyID"]);
                    employee.ValidateProcessIssueLoc = String.IsNullOrEmpty(rdr["ValidateProcessIssueLoc"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateProcessIssueLoc"]);
                    employee.validateProcessOrderApp = String.IsNullOrEmpty(rdr["validateProcessOrderApp"].ToString()) ? false : Convert.ToBoolean(rdr["validateProcessOrderApp"]);
                    employee.SupplierSetup = String.IsNullOrEmpty(rdr["SupplierSetup"].ToString()) ? false : Convert.ToBoolean(rdr["SupplierSetup"]);

                    employee.chkBarcode = String.IsNullOrEmpty(rdr["chkBarcode"].ToString()) ? "N" : rdr["chkBarcode"].ToString();
                    employee.chkQRcode = String.IsNullOrEmpty(rdr["chkQRcode"].ToString()) ? "N" : rdr["chkQRcode"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public MisSetting GetMisDefalutRep(int MisId)
        {
            //string strDCurAbs = string.Empty;
            //var OQuery = entities.MisPath.Where(c => 1 == 1).FirstOrDefault();
            //if (OQuery != null)
            //{
            //    var DCurAbs = entities.Currencies.Where(cu => cu.CurrencyId == OQuery.dCurrencyId).FirstOrDefault();

            //    if (DCurAbs != null)
            //    {
            //        strDCurAbs = DCurAbs.Abbreviation == null ? "" : DCurAbs.Abbreviation;
            //    }


            //}

            //var user = entities.MisPath.Where(c => 1 == 1).FirstOrDefault();
            //return user == null ? null : new Domain.MisSetting
            //{
            //    dCompanyId = Convert.ToInt32(user.dCompanyId),
            //    dCompanyUnitId = Convert.ToInt32(user.dCompanyUnitId),
            //    CostAppCheck = user.CostAppCheck,
            //    ValidateBudgetRateInCuttingOrder = user.ValidateBudgetRateInCuttingOrder,
            //    ValidateBudgetRateSewing = user.ValidateBudgetRateSewing,
            //    ValidateBudgetRateGenProdIssue = user.ValidateBudgetRateGenProdIssue,
            //    ValidatePOApproval = user.ValidatePOApproval,
            //    ValidatePOAgIndent = user.chkPoAgainstIndent,
            //    FromDays = user.FromDays,
            //    FINYEAR = user.FINYEAR,
            //    ASSTYEAR = user.ASSTYEAR,
            //    dCurrenyId = Convert.ToInt32(user.dCurrencyId),
            //    dCAbs = strDCurAbs,
            //    ValidateGafiCharges = user.ValidateGafiCharges,
            //    chkGstPerAgainstHsncode = user.chkGSTAgainstHSNCode,
            //    chkEnbTransDate = (bool)user.EnableTransactionDate,
            //    chkEnbAssortRate = user.EnableAssortDetailsRate,
            //    chkBuyerWiseCosting = user.BuyerWiseCosting,
            //    CostProCheckWork = Convert.ToChar(user.CostProCheckWork),
            //    ChkJobOrderRate = user.EnableJobOrderRate,
            //};


            //var user1 = (from Lg in entities.Proc_Apparel_GetMisPathDetails()
            //             select new Domain.MisSetting
            //            {
            //                dCompanyId = Convert.ToInt32(Lg.dCompanyId),
            //                dCompanyUnitId = Convert.ToInt32(Lg.dCompanyUnitId),
            //                CostAppCheck = Lg.CostAppCheck,
            //                ValidateBudgetRateInCuttingOrder = Lg.ValidateBudgetRateInCuttingOrder,
            //                ValidateBudgetRateSewing = Lg.ValidateBudgetRateSewing,
            //                ValidateBudgetRateGenProdIssue = Lg.ValidateBudgetRateGenProdIssue,
            //                ValidatePOApproval = Lg.ValidatePOApproval,
            //                ValidatePOAgIndent = Lg.chkPoAgainstIndent,
            //                FromDays = Lg.FromDays,
            //                FINYEAR = Lg.FINYEAR,
            //                ASSTYEAR = Lg.ASSTYEAR,
            //                dCurrenyId = Convert.ToInt32(Lg.dCurrencyId),
            //                dCAbs = "",//strDCurAbs,
            //                ValidateGafiCharges = Lg.ValidateGafiCharges,
            //                chkGstPerAgainstHsncode = Lg.chkGSTAgainstHSNCode,
            //                chkEnbTransDate = (bool)Lg.EnableTransactionDate,
            //                chkEnbAssortRate = Lg.EnableAssortDetailsRate,
            //                chkBuyerWiseCosting = Lg.BuyerWiseCosting,
            //                CostProCheckWork = Convert.ToChar(Lg.CostProCheckWork),
            //                ChkJobOrderRate = Lg.EnableJobOrderRate,
            //            }).FirstOrDefault();


            ////return user1 == null ? null : new Domain.UserName { UserId = Convert.ToInt32((user1.dCompanyId == null ? 0 : user1.UserId)), EmployeeId = Convert.ToInt32((user.EmployeeId == null ? 0 : user.EmployeeId)), Username = user.Username, Roleid = (int)(user.Roleid == null ? 0 : user.Roleid), LoginStatus = (user.LoginStatus == null ? "N" : user.LoginStatus), LoginPC = (user.LoginPC == null ? "" : user.LoginPC) };
            //return user1;

            MisSetting employee = new MisSetting();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMisPathDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.dCompanyId = Convert.ToInt32(rdr["CompId"]);
                    employee.dCompanyUnitId = Convert.ToInt32(rdr["UnitId"]);
                    employee.MisId = Convert.ToInt32(rdr["MispathId"]);
                    employee.CompanyUnit = rdr["Unit"].ToString();
                    employee.CostAppCheck = rdr["PurBudApp"].ToString();
                    employee.FromDays = Convert.ToInt32(rdr["FromDays"]);
                    employee.FINYEAR = rdr["FINYEAR"].ToString();
                    employee.ASSTYEAR = rdr["ASSTYEAR"].ToString();
                    employee.dCurrenyId = Convert.ToInt32(rdr["dCurrId"]);
                    employee.ValidateBudgetRateInCuttingOrder = rdr["ValidateBudgetRateInCuttingOrder"].ToString();
                    employee.ValidateBudgetRateSewing = rdr["SewBudApp"].ToString();
                    employee.ValidateBudgetRateGenProdIssue = rdr["GenProdIssBudApp"].ToString();
                    employee.ValidatePOApproval = rdr["ValidatePOApproval"].ToString();
                    employee.ValidatePOAgIndent = rdr["chkPoAgainstIndent"].ToString();
                    employee.ValidateGafiCharges = rdr["ValidateGafiCharges"].ToString();
                    employee.chkGstPerAgainstHsncode = rdr["ChkGstHsn"].ToString();
                    employee.chkEnbTransDate = Convert.ToBoolean(rdr["ETransDate"]);
                    employee.chkEnbAssortRate = rdr["EnbAssortDetRate"].ToString();
                    employee.chkBuyerWiseCosting = rdr["BuyerWiseCosting"].ToString();
                    employee.CostProCheckWork = Convert.ToChar(rdr["CostProCheckWork"]);
                    employee.ChkJobOrderRate = rdr["EnableJobOrderRate"].ToString();
                    employee.CostBudDetailsCheck = rdr["BuyWiseDetailsList"].ToString();
                    employee.ValidateAppForOpenPrg = Convert.ToChar(rdr["ValidateAppForOpenPrgRaise"]);
                    employee.checkBillsToInvoiceEntry = Convert.ToBoolean(rdr["ValidatecheckBillsToInvoiceEntry"]);
                    employee.ApplicationPath = rdr["DbApplicationPath"].ToString();
                    employee.ScriptUpdatedOn = Convert.ToDateTime(rdr["ScriptUpdatedOn"]);
                    employee.BaseColorid = String.IsNullOrEmpty(rdr["BaseColorid"].ToString()) ? 0 : Convert.ToInt32(rdr["BaseColorid"]);
                    employee.ValidateStore = Convert.ToBoolean(rdr["ValidateStore"]);
                    employee.ValidateProcessStore = Convert.ToBoolean(rdr["ValidateProcessStore"]);
                    employee.ValidateProductionStore = Convert.ToBoolean(rdr["ValidateProductionStore"]);
                    employee.ValidateBudRateinPurinvBulk = String.IsNullOrEmpty(rdr["ValidateBudRateinPurinvBulk"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinPurinvBulk"]);
                    employee.ValidateBudRateinPurinvSample = String.IsNullOrEmpty(rdr["ValidateBudRateinPurinvSample"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinPurinvSample"]);
                    employee.ValidateBudRateinProinvBulk = String.IsNullOrEmpty(rdr["ValidateBudRateinProinvBulk"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinProinvBulk"]);
                    employee.ValidateBudRateinProinvSample = String.IsNullOrEmpty(rdr["ValidateBudRateinProinvSample"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateBudRateinProinvSample"]);
                    employee.CuttingTolerance = String.IsNullOrEmpty(rdr["CuttingTolerance"].ToString()) ? 0 : (decimal)(rdr["CuttingTolerance"]);
                    employee.ValidateBudgetRateGenProdIssueSample = String.IsNullOrEmpty(rdr["ValidateBudgetRateGenProdIssueSample"].ToString()) ? "N" : rdr["ValidateBudgetRateGenProdIssueSample"].ToString();
                    employee.ValidateBudgetRateSewingSample = String.IsNullOrEmpty(rdr["ValidateBudgetRateSewingSample"].ToString()) ? "N" : (rdr["ValidateBudgetRateSewingSample"]).ToString();
                    employee.ValidateBudgetRateInCuttingOrderSample = String.IsNullOrEmpty(rdr["ValidateBudgetRateInCuttingOrderSample"].ToString()) ? "N" : rdr["ValidateBudgetRateInCuttingOrderSample"].ToString();
                    employee.checkBillsToInvoiceEntryProduction = String.IsNullOrEmpty(rdr["checkBillsToInvoiceEntryProduction"].ToString()) ? "N" : rdr["checkBillsToInvoiceEntryProduction"].ToString();
                    employee.CostAppSamPurCheck = String.IsNullOrEmpty(rdr["CostAppSamPurCheck"].ToString()) ? "N" : rdr["CostAppSamPurCheck"].ToString();
                    employee.CostAppSamProCheck = String.IsNullOrEmpty(rdr["CostAppSamProCheck"].ToString()) ? "N" : rdr["CostAppSamProCheck"].ToString();
                    employee.chkSalesInvoiceDespatch = String.IsNullOrEmpty(rdr["chkSalesInvoiceDespatch"].ToString()) ? "N" : rdr["chkSalesInvoiceDespatch"].ToString();
                    employee.Avatar_Gender = rdr["Avatar"].ToString();
                    employee.checkBillsToComInvoiceEntry = String.IsNullOrEmpty(rdr["checkBillsToComInvoiceEntry"].ToString()) ? false : Convert.ToBoolean(rdr["checkBillsToComInvoiceEntry"]);
                    employee.ValidatePurchaseGRNqty = String.IsNullOrEmpty(rdr["ValidatePurchaseGRNqty"].ToString()) ? false : Convert.ToBoolean(rdr["ValidatePurchaseGRNqty"]);
                    employee.ValidateProcessGRNqty = String.IsNullOrEmpty(rdr["ValidateProcessGRNqty"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateProcessGRNqty"]);
                    employee.chkFabricDeliveryIssue = String.IsNullOrEmpty(rdr["chkFabricDeliveryIssue"].ToString()) ? "N" : rdr["chkFabricDeliveryIssue"].ToString();
                    employee.chkValidateProgramQtyinTransfer = String.IsNullOrEmpty(rdr["chkValidateProgramQtyinTransfer"].ToString()) ? false : Convert.ToBoolean(rdr["chkValidateProgramQtyinTransfer"]);
                    employee.LicencecompanyID = String.IsNullOrEmpty(rdr["LicencecompanyID"].ToString()) ? 0 : Convert.ToInt32(rdr["LicencecompanyID"]);
                    employee.ValidateProcessIssueLoc = String.IsNullOrEmpty(rdr["ValidateProcessIssueLoc"].ToString()) ? false : Convert.ToBoolean(rdr["ValidateProcessIssueLoc"]);
                    employee.validateProcessOrderApp = String.IsNullOrEmpty(rdr["validateProcessOrderApp"].ToString()) ? false : Convert.ToBoolean(rdr["validateProcessOrderApp"]);
                    employee.SupplierSetup = String.IsNullOrEmpty(rdr["SupplierSetup"].ToString()) ? false : Convert.ToBoolean(rdr["SupplierSetup"]);
                }
            }
            return employee; 
        }
    }
}
