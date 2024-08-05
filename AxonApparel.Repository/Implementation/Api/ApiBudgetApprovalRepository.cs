using AxonApparel.Contract.Api;
using AxonApparel.Domain;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiBudgetApprovalRepository : IApiBudgetApprovalRepository
    {
        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        public IQueryable<BudgetApproval> LoadMaingrid ( string type, string ordtype, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppApprovalLoadMainGrid( type, ordtype, fromdate, todate)
                         select new BudgetApproval
                         {
                             cmpid = (int)YD.companyid,
                             cmp = YD.Company,
                             buyerid = (int)YD.buyerid,
                             buyer = YD.buyer,
                             orderno = YD.order_no,
                             date = (DateTime)YD.Order_date,
                             refno = YD.Ref_no,
                             qty = (decimal)YD.Quantity,
                             stylerwid = YD.StyleRowid,
                             styleid = YD.Styleid,
                             style = YD.Style,
                             type = YD.type,
                             StyleAmnt = (decimal)YD.value,
                             GUOM = YD.Guom

                         }).AsQueryable();

            return query;
        }
        public IQueryable<Cost_defn_Bom> LoadBomdet(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppLoadBomdet(ordno, styleid)
                         select new Cost_defn_Bom
                         {
                             Cost_Defn_id = YD.Cost_Defn_Id,
                             Itemid = YD.Itemid,
                             Item = YD.Item,
                             Colorid = YD.Colorid,
                             color = YD.Color,
                             Sizeid = YD.Sizeid,
                             size = YD.Size,
                             Rate = YD.Rate,
                             Quantity = (decimal)YD.prg_qty,
                             curr = "",
                             exchgerate = 0,
                             amount = YD.Amount,
                             itmgrpid = (int)YD.ItemGroupId,
                             itmgrp = YD.ItemGroup,
                             sno = (long)YD.Snumb,
                             check = "false",
                             Actual_Rate = 0,
                             Actual_Qty = 0,
                             Processid = 0,
                             Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             Itmtype = YD.ItemType,
                             Access_Type = YD.Access_Type,
                             Lock = "false"
                         }).AsQueryable();

            return query;
        }

        public bool UpdateBudgetDetails(BudgetApproveMaster budget)
        {
            bool result = false;

            if (budget.budgetdet != null && budget.budgetdet.Count > 0)
            {
                var data = entities.Cost_Defn_Mas.Where(c => c.Cost_Defn_id == budget.cost_defn_id).FirstOrDefault();

                if (data != null)
                {
                    data.ProfitPercent = budget.ProfitPercent;
                    data.Approved = budget.Approved;
                    data.SalePrice = budget.SalePrice;
                    data.AppDate = DateTime.Today;
                    data.Drawback_Percent = budget.Drawback_Percent;
                    data.sale_Profit = budget.sale_Profit;
                    data.sale_Profit_percent = budget.sale_Profit_percent;
                    data.ApprovedBy = budget.ApprovedBy;
                    entities.SaveChanges();

                }

                foreach (var item in budget.budgetdet)
                {
                    if (item.AppRate > 0)
                    {
                        entities.Proc_Apparel_APIBudgetApprovalUpdate(item.cost_defn_bomid, item.AppRate, item.AppQty, "B", "A");
                        entities.SaveChanges();
                    }
                }

                foreach (var item in budget.commdet)
                {
                    if (item.AppRate > 0)
                    {
                        entities.Proc_Apparel_APIBudgetApprovalUpdate(item.cost_defn_bomid, item.AppRate, item.AppQty, "O", "A");
                        entities.SaveChanges();
                    }
                }
                result = true;
            }
            return result;
        }

        public bool updateitembudgetdetails(BudgetApprovedetails budget)
        {
            bool result = false;
            if (budget != null)
            {                
                    if (budget.AppRate > 0)
                    {
                        entities.Proc_Apparel_APIBudgetApprovalUpdate(budget.cost_defn_bomid, budget.AppRate, budget.AppQty, "B", "R");
                        entities.SaveChanges();

                        entities.Proc_Apparel_APIBudgetApprovalUpdate(budget.cost_defn_bomid, budget.AppRate, budget.AppQty, "C", "R");
                        entities.SaveChanges();

                        entities.Proc_Apparel_APIBudgetApprovalUpdate(budget.cost_defn_bomid, budget.AppRate, budget.AppQty, "O", "R");
                        entities.SaveChanges();
                    }       

                result = true;
            }
            return result;
        }

        public bool Revertitembudgetdetails(BudgetApprovedetails budget)
        {
            bool result = false;
            if (budget != null)
            {
                if (budget.AppRate > 0)
                {
                    entities.Proc_Apparel_APIBudgetApprovalUpdate(budget.cost_defn_bomid, budget.AppRate, budget.AppQty, "B", "R");
                    entities.SaveChanges();

                    entities.Proc_Apparel_APIBudgetApprovalUpdate(budget.cost_defn_bomid, budget.AppRate, budget.AppQty, "C", "R");
                    entities.SaveChanges();

                    entities.Proc_Apparel_APIBudgetApprovalUpdate(budget.cost_defn_bomid, budget.AppRate, budget.AppQty, "O", "R");
                    entities.SaveChanges();
                }

                result = true;
            }
            return result;
        }

        public IQueryable<ApiBudgetDetails> LoadBomDetails(string orderno, int styleid)
        {
            try
            {
                var query = (from data in entities.Proc_Apparel_ApiBudgetApprovalDeails(orderno, styleid)
                             select new ApiBudgetDetails
                             {
                                 Seqno = data.Seqno,
                                 Access_Type = data.Access_Type,
                                 Order_no = data.Order_no,
                                 style = data.style,
                                 styleid = data.styleid,
                                 Process = data.Process,
                                 Component = data.Component,
                                 item = data.item,
                                 color = data.color,
                                 size = data.size,
                                 uom = data.uom,
                                 AppRate = data.AppRate,
                                 Actual_Rate = data.Actual_Rate,
                                 Quantity = data.Quantity,
                                 Amount = data.Amount,
                                 Exrate = data.Exrate,
                                 CurrencyRate = data.CurrencyRate,
                                 AppCurrencyRate = data.AppCurrencyRate,
                                 IsSecQty = data.IsSecQty,
                                 status = data.status,
                                 ItemType = data.ItemType,
                                 porate = data.porate,
                                 Processid = data.Processid,
                                 itemid = data.itemid,
                                 colorid = data.colorid,
                                 sizeid = data.sizeid,
                                 uomid = data.uomid,
                                 Currencyid = data.Currencyid,
                                 cost_defn_bomid = data.cost_defn_bomid

                             }).AsQueryable();
                return query;
            }
            catch {
                throw new NotImplementedException();
            }
            
        }
        public IQueryable<Commercialdetials> LoadCommericaldetails(string orderno, int styleid)
        {
            try
            {
                var query = (from data in entities.Proc_ApiBudget_Commercial_details(orderno, styleid)
                             select new Commercialdetials
                             {
                                 Amount = data.Amount,
                                 Commercial = data.Commercial,
                                 CommercialID = data.CommercialID,
                                 Cost = data.Cost,
                                 CostType = data.CostType,
                                 Cost_Defn_COMid = data.Cost_Defn_COMid,
                                 Cost_Defn_id = data.Cost_Defn_id,
                                 Cost_Defn_No = data.Cost_Defn_No
                             }).AsQueryable();
                return query;

            }
            catch {
                throw new NotImplementedException();
            }
        }

        public IQueryable<Budegetorderdetails> LoadOrderdetails(string orderno, int styleid)
        {
            try
            {
                var query = (from data in entities.Proc_ApiBudget_Orderdetails(orderno, styleid)
                             select new Budegetorderdetails
                             {
                                 company = data.company,
                                 style = data.style,
                                 buyer = data.buyer,
                                 order_no = data.order_no,
                                 ref_no = data.ref_no,
                                 style1 = data.style1,
                                 shipdate = data.shipdate,
                                 quantity = data.quantity,
                                 price = data.price,
                                 value = data.value,
                                 Abbreviation = data.Abbreviation,
                                 Exchangerate = data.Exchangerate,
                                 decimalplace = data.decimalplace,
                                 guom = data.guom,
                                 cost_defn_id = data.cost_defn_id,
                                 styleid = data.styleid,
                                 cost_defn_id1 = data.cost_defn_id1,
                                 saleprice = data.saleprice,
                                 Drawback_Percent = data.Drawback_Percent,
                                 sale_profit = data.sale_profit,
                                 sale_Profit_percent = data.sale_Profit_percent,
                                 Salesratemargin = data.Salesratemargin
                             }).AsQueryable();
                return query;
             
            }
            catch (Exception ex)
            {
                var exc = ex.Message;
                throw new NotImplementedException();
            }
        }

        
    }
}
