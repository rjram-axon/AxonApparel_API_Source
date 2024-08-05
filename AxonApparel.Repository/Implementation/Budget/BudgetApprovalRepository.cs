using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BudgetApprovalRepository : IBudgetApprovalRepository
    {
        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.BudgetApproval> LoadMaingrid( string type,string ordtype, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppApprovalLoadMainGrid( type,ordtype, fromdate, todate)
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
                             StyleAmnt=(decimal)YD.value,
                             GUOM=YD.Guom

                         }).AsQueryable();

            return query;
        }


        public IQueryable<BudgetApproval> LoadPcsWt(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppLoadPWt(ordno, styleid)
                         select new BudgetApproval
                         {
                             costdefnid = YD.Cost_Defn_id,
                             costdefnno = YD.Cost_Defn_No,
                             pcswt = YD.PcsWt,
                             profitper = YD.ProfitPercent

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
                             Access_Type=YD.Access_Type,
                             Lock="false"
                         }).AsQueryable();

            return query;
        }


        public bool AddDetData(List<Domain.CostDefnBomFirst> objmas, List<Cost_Defn_Bom_First> objfirstmas, string Mode, int ProdId = 0)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (Mode == "Revert")
                    {
                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                if (item.Rate > 0)
                                {
                                    var Pged = entities.Proc_Apparel_BudgetApprovalUpdBomRevert(item.Cost_Defn_id, item.Itemid, item.ColorID, item.Cost_Defn_BOMid, item.Rate, item.Quantity);
                                    entities.SaveChanges();
                                }
                            }
                        }
                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                if (item.SizeID != 0)
                                {

                                    var Pge = entities.Proc_Apparel_BudgetAppUpdProcProdRevert(item.Cost_Defn_id, item.Cost_Defn_BOMid, item.Itemid, item.ColorID, item.SizeID, item.Processid, item.Rate, item.Quantity);
                                    entities.SaveChanges();

                                }
                            }
                        }
                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                var Pty = entities.Proc_Apparel_BudgetAppUpdCostBomFrstRevert(item.Cost_Defn_id);
                                entities.SaveChanges();

                            }
                        }
                    }


                    if (Mode == "Add")
                    {

                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                entities.Cost_Defn_Bom_First.Add(item);
                            }
                            entities.SaveChanges();
                        }


                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                if (item.Rate > 0)
                                {
                                    var Pged = entities.Proc_Apparel_BudgetApprovalUpdBom(item.Cost_Defn_id, item.Itemid, item.ColorID, item.Cost_Defn_BOMid, item.Rate, item.Quantity,item.CurrencyRate);
                                    entities.SaveChanges();
                                }
                            }
                        }

                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                if (item.SizeID != 0)
                                {
                                    var Pge = entities.Proc_Apparel_BudgetAppUpdProcProd(item.Cost_Defn_id, item.Itemid, item.ColorID, item.SizeID, item.Processid, item.Rate, item.Quantity);
                                    entities.SaveChanges();



                                }
                            }
                        }

                        //if (objmas != null && objmas.Count > 0)
                        //{
                        //    foreach (var ms in objmas)
                        //    {
                        //        var Pgefg = entities.Proc_Apparel_BudgetApprovalUpdCostdefnMas(ms.Cost_Defn_id, ms.styleid, ms.Order_No, ms.CurrencyId, ms.ExRate, ms.Profitper, ms.CostArrive, ms.SalePrice, ms.Drawback_Percent, ms.sale_Profit, ms.sale_prf_per, ms.pcswt);
                        //        entities.SaveChanges();

                        //    }
                        //}


                    }
                    if (Mode == "Update")
                    {
                        if (objmas != null && objmas.Count > 0)
                        {
                            foreach (var item in objmas)
                            {
                                var Upd = entities.Cost_Defn_Mas.Where(c => c.Cost_Defn_id == item.Cost_Defn_id).FirstOrDefault();
                                if (Upd != null)
                                {

                                    Upd.SalePrice = item.SalePrice;
                                    Upd.sale_Profit = item.sale_Profit;
                                    Upd.sale_Profit_percent = item.sale_prf_per;
                                    Upd.ApprovedBy = item.ApprovedBy;
                                    Upd.ProfitPercent = item.Profitper;
                                    Upd.PcsWt = item.pcswt;
                                    Upd.Drawback_Percent = item.Drawback_Percent;
                                    Upd.AppDate = DateTime.Now;
                                    Upd.Salesratemargin = item.Salesratemargin;
                                    entities.SaveChanges();
                                }

                            }
                        }


                        ////delete bomfirst
                        //if (objfirstmas != null && objfirstmas.Count > 0)
                        //{
                        //    foreach (var item in objfirstmas)
                        //    {
                        //        var Pty = entities.Proc_Apparel_BudgetAppUpdCostBomFrstRevert(item.Cost_Defn_id);
                        //        entities.SaveChanges();

                        //    }
                        //}
                        ////Add bom
                        //if (objfirstmas != null && objfirstmas.Count > 0)
                        //{
                        //    foreach (var item in objfirstmas)
                        //    {
                        //        entities.Cost_Defn_Bom_First.Add(item);
                        //    }
                        //    entities.SaveChanges();
                        //}

                        //Upd

                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                
                                if (item.Cost_defn_bom_firstid == 0 && item.AppRate>0)
                                {
                                    entities.Cost_Defn_Bom_First.Add(item);
                                }
                                else if (item.Cost_defn_bom_firstid > 0 && item.Rate == 0) {
                                    var cou = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_BOMid == item.Cost_Defn_BOMid).FirstOrDefault();
                                    if (cou != null)
                                    {
                                        entities.Cost_Defn_Bom_First.Remove(cou);
                                    }
                                    entities.SaveChanges();
                                }
                                else
                                {
                                    var deletead = entities.Cost_Defn_Bom_First.Where(d => d.Cost_Defn_BOMid == item.Cost_Defn_BOMid).ToList<Cost_Defn_Bom_First>();
                                    foreach (var det in deletead)
                                    {
                                        if (det.Cost_Defn_BOMid == item.Cost_Defn_BOMid)
                                        {
                                            det.Rate = item.Rate;
                                        }
                                    }

                                    entities.SaveChanges();
                                }
                            }
                        }

                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                //if (item.Rate > 0)
                                //{
                                    var Pged = entities.Proc_Apparel_BudgetApprovalUpdBom(item.Cost_Defn_id, item.Itemid, item.ColorID, item.Cost_Defn_BOMid, item.Rate, item.Quantity,item.AppCurrencyRate);
                                    entities.SaveChanges();
                                //}
                            }
                            
                        }

                        if (objfirstmas != null && objfirstmas.Count > 0)
                        {
                            foreach (var item in objfirstmas)
                            {
                                if (item.SizeID != 0)
                                {
                                    var Pge = entities.Proc_Apparel_BudgetAppUpdProcProd(item.Cost_Defn_id, item.Itemid, item.ColorID, item.SizeID, item.Processid, item.Rate, item.Quantity);
                                    entities.SaveChanges();


                                }
                            }
                        }
                    }
                    //Proc_Apparel_BudgetAppUpdCostdefnMas

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BudgetApproval-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<Cost_defn_Bom> LoadProcessdet(string ordno, int styleid)
        {

            var query = (from YD in entities.Proc_Apparel_BudgetApploadProcessdet(ordno, styleid)
                         select new Cost_defn_Bom
                         {
                             Cost_Defn_id = YD.Cost_Defn_Id,
                             Itemid = YD.Itemid,
                             Item = YD.Item,
                             Colorid = YD.ColorId,
                             color = YD.Color,
                             Sizeid = YD.sizeid,
                             size = YD.Size,
                             Rate = YD.Rate,
                             Quantity = (decimal)YD.prg_qty,
                             curr = "",
                             exchgerate = 0,
                             amount = YD.Amount,
                             //itmgrpid = (int)YD.ItemGroupId,
                             //itmgrp = YD.ItemGroup,
                             sno = (long)YD.Snumb,
                             check = "false",
                             Processid = YD.ProcessID,
                             process = YD.Process,
                             Actual_Rate = 0,
                             Actual_Qty = 0,
                             Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             Lock = "false"
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Cost_defn_Bom> LoadProductndet(string ordno, int styleid)
        {

            var query = (from YD in entities.Proc_Apparel_BudgetApploadProdtiondet(ordno, styleid)
                         select new Cost_defn_Bom
                         {
                             Cost_Defn_id = YD.Cost_Defn_Id,
                             Itemid = YD.Itemid,
                             Item = YD.Item,
                             Colorid = YD.ColorId,
                             color = YD.Color,
                             Sizeid = YD.sizeid,
                             size = YD.Size,
                             Rate = YD.Rate,
                             Quantity = (decimal)YD.prg_qty,
                             curr = "",
                             exchgerate = 0,
                             amount = YD.Amount,
                             //itmgrpid = (int)YD.ItemGroupId,
                             //itmgrp = YD.ItemGroup,
                             sno = (long)YD.Snumb,
                             check = "false",
                             Processid = YD.ProcessID,
                             process = YD.Process,
                             Actual_Rate = 0,
                             Actual_Qty = 0,
                             Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             Lock="false"
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Cost_defn_Bom> LoadBomdetEdit(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_GetBomDetailsforBudgetApprovalEdit(ordno, styleid)
                         select new Cost_defn_Bom
                         {
                             Cost_Defn_id = YD.Cost_Defn_Id,
                             Itemid = YD.Itemid,
                             Item = YD.Item,
                             Colorid = (int)YD.colorid,
                             color = YD.color,
                             Sizeid = (int)YD.sizeid,
                             size = YD.size,
                             //Rate = (YD.CurID == null ? YD.FinRate : YD.AppCurRate),
                             Rate = YD.FinRate,
                             Quantity = (decimal)YD.Qty,
                             curr = YD.Currency,
                             exchgerate = YD.ExRate,
                             CurrencyID=(int)(YD.CurID==null?0:YD.CurID),
                             amount = YD.Amount,
                             itmgrpid = (int)YD.Itemgroupid,
                             itmgrp = YD.Itemgroup,
                             sno = (long)YD.Snumb,
                             check = YD.FinCheck,
                             Actual_Rate = YD.Actual_Rate,
                             Actual_Qty = (decimal)YD.actual_qty,
                             Processid = 0,
                             Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             Itmtype=YD.Itemtype,
                             CMCost=(decimal)YD.cmcost,
                             FinPer = (decimal)YD.finper,
                             MarkUpvalue = (decimal)YD.markupvalue,
                             Gaficharges=(decimal)(YD.Gaficharges==null?0:YD.Gaficharges),
                             Qizcharges=(decimal)(YD.Qizcharges==null?0:YD.Qizcharges),
                             Cost_defn_bom_firstid = YD.cost_defn_bom_firstid,
                             AppCurrencyRate=YD.AppCurRate,
                             CurrencyRate=YD.CurRate,
                             PoRate=YD.PoRate,

                             salesprice = (decimal)YD.SalePrice == null ? 0 : YD.SalePrice,
                             saleper = (decimal)YD.sale_Profit_percent,
                             saleprofit = (decimal)(YD.sale_Profit == null ? 0 : YD.sale_Profit),
                             ProfitPercent = (decimal)(YD.ProfitPercent == null ? 0 : YD.ProfitPercent),
                             DecimalPlace=YD.DecimalPlace,
                             Lock = YD.Lock,
                             LockOrder = YD.OrdLock == true ? "Y" : "N",
                             LockPlanning =YD.LockPlanning == true?"Y":"N",
                             LockConsumption = YD.LockCon >0 ? "Y" : "N",
                             LockFabric = YD.LockFab > 0 ? "Y" : "N",
                             LockYarn = YD.LockYarn > 0 ? "Y" : "N",
                             LockAccesories = YD.LockAccs > 0 ? "Y" : "N",
                             LockPacking = YD.LockPack > 0 ? "Y" : "N",
                             Salesratemargin = (decimal)YD.Salesratemargin,

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Cost_defn_Bom> LoadProcessdetEdit(string ordno, int styleid)
        {

            var query = (from YD in entities.Proc_Apparel_BudgetApploadProcessdetEdit(ordno, styleid)
                         select new Cost_defn_Bom
                         {
                             Cost_Defn_id = YD.Cost_Defn_Id,
                             Itemid = YD.Itemid,
                             Item = YD.Item,
                             Colorid = (int)YD.ColorId,
                             color = YD.Color,
                             Sizeid = (int)YD.sizeid,
                             size = YD.Size,
                             Rate = YD.FinRate,
                             Quantity = (decimal)YD.Qty,
                             curr = "",
                             exchgerate =0,
                             amount = YD.Amount,
                             //itmgrpid = (int)YD.Itemgroupid,
                             //itmgrp = YD.Itemgroup,
                             sno = (long)YD.Snumb,
                             check = YD.FinCheck,
                             Actual_Rate = YD.Actual_Rate,
                             Actual_Qty = (decimal)YD.actual_qty,
                             Processid = YD.ProcessID,
                             process = YD.Process,
                             Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             Cost_defn_bom_firstid = YD.cost_defn_bom_firstid,
                             Lock = YD.Lock,
                            
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Cost_defn_Bom> LoadProductndetEdit(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppProdBudgetDetforEdit(ordno, styleid)
                         select new Cost_defn_Bom
                         {
                             Cost_Defn_id = YD.Cost_Defn_Id,
                             Itemid = YD.Itemid,
                             Item = YD.Item,
                             Colorid = (int)YD.ColorId,
                             color = YD.Color,
                             Sizeid = (int)YD.sizeid,
                             size = YD.Size,
                             Rate = YD.FinRate,
                             FirstRate = YD.FinRate,
                             Quantity = (decimal)YD.Qty,
                             curr = "",
                             exchgerate = 0,
                             amount = YD.Amount,
                             //itmgrpid = (int)YD.Itemgroupid,
                             //itmgrp = YD.Itemgroup,
                             sno = (long)YD.Snumb,
                             check = YD.FinCheck,
                             Actual_Rate = YD.Actual_Rate,
                             Actual_Qty = (decimal)YD.actual_qty,
                             Processid = YD.ProcessID,
                             process = YD.Process,
                             Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             Cost_defn_bom_firstid = YD.cost_defn_bom_firstid,
                             Lock = YD.Lock,
                         }).AsQueryable();

            return query;
        }


        public IQueryable<BudgetApproval> LoadChkbom(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppchkBom(ordno, styleid)
                         select new BudgetApproval
                         {
                             purjobid = YD.Pur_Ord_BuyJobid,
                             qty = YD.quantity,
                             bomdetid = (int)YD.BomdetId,


                         }).AsQueryable();

            return query;
        }

        public IQueryable<BudgetApproval> LoadChkProcess(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppchkProcess(ordno, styleid)
                         select new BudgetApproval
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = (int)YD.ProcessOrddetid,
                             procordid = (int)YD.ProcessOrdid,


                         }).AsQueryable();

            return query;
        }

        public IQueryable<BudgetApproval> LoadChkProdutnOrd(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppchkProdforprodord(ordno, styleid)
                         select new BudgetApproval
                         {
                             procjobdetid = YD.ProductionJobDetid,
                             procorddetid = (int)YD.ProductionOrddetid,
                             procordid = (int)YD.ProductionOrdid,


                         }).AsQueryable();

            return query;
        }

        public IQueryable<BudgetApproval> LoadChkprod(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppchkProdforprod(ordno, styleid)
                         select new BudgetApproval
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = (int)YD.ProdOrddetid,
                             procordid = (int)YD.ProdOrdid,


                         }).AsQueryable();

            return query;
        }

        public IQueryable<BudgetApproval> LoadChkCutting(string ordno, int styleid)
        {

            var query = (from YD in entities.Proc_Apparel_BudgetAppchkProdforcutting(ordno, styleid)
                         select new BudgetApproval
                         {
                             cuttingordid = (int)YD.CuttingOrdId,
                             cuttingorddetid = (int)YD.CuttingOrdDetid,
                             itemid = (int)YD.itemid,


                         }).AsQueryable();

            return query;
        }


        public IQueryable<CostDefnCom> LoadCommdet(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppLoadBudgetAppCommdet(ordno, styleid)
                         select new CostDefnCom
                         {
                             Particularid = YD.CommercialID,
                             cost_defn_no = YD.Cost_Defn_No,
                             Cost_Defn_id = YD.Cost_Defn_id,
                             CostType = YD.CostType,
                             Cost = YD.Cost,
                             Cost_Defn_COMid = YD.Cost_Defn_COMid

                         }).AsQueryable();

            return query;
        }

        public IQueryable<CostDefnCom> LoadCommdetEdit(string ordno, int styleid)
        {
            var query = (from YD in entities.Proc_Apparel_BudgetAppLoadBudgetAppCommdetEdit(ordno, styleid)
                         select new CostDefnCom
                         {
                             Particularid = YD.CommercialID,
                             cost_defn_no = YD.Cost_Defn_No,
                             Cost_Defn_id = YD.Cost_Defn_id,
                             CostType = YD.CostType,
                             Cost = (decimal)YD.Cost,
                             Cost_Defn_COMid = YD.Cost_Defn_COMid,
                             Value=(decimal)YD.Actual_Cost
                         }).AsQueryable();

            return query;
        }


        public IQueryable<CostDefnBomFirst> LoadLockDet(string ordno, int styleid,string Type)
        {
            var query = (from YD in entities.Proc_Apparel_GetLockDetails(ordno, styleid,Type)
                         select new CostDefnBomFirst
                         {

                             Itemid = YD.ItemID,
                             Processid = YD.ProcessId,
                             LockPlanning = YD.LockPlanning == true ? "Y" : "N",
                             LockConsumption = YD.LockCon > 0 ? "Y" : "N",
                             LockFabric = YD.LockFab > 0 ? "Y" : "N",
                             LockYarn = YD.LockYarn > 0 ? "Y" : "N",
                             LockAccesories = YD.LockAccs > 0 ? "Y" : "N",
                             LockPacking = YD.LockPack > 0 ? "Y" : "N",
                              LockOrder = YD.LockOrder == true ? "Y" : "N",
                         }).AsQueryable();

            return query;
        }



        public bool LockDetData(List<Domain.CostDefnBomFirst> objmas, List<Domain.CostDefnBomFirst> AItemlist, List<Domain.CostDefnBomFirst> PItemlist, string Mode, int ProdId = 0)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (objmas != null && objmas.Count > 0)
                    {
                        //foreach (var item in objmas)
                        //{
                        var item = objmas.Where(n => n.LockOrder == n.LockOrder).FirstOrDefault();
                            var Planlist = entities.Planning_Mas.Where(c => c.Order_No == item.Order_No && c.StyleID==item.styleid).ToList();
                            if (Planlist != null && Planlist.Count>0)
                            {

                                foreach (var plan in Planlist)
                                {
                                    bool LckPlan=false;
                                    int LckCon=0;
                                    int LckFab=0;
                                    int LckYrn=0;
                                    int LckAcc=0;
                                    int LckPak=0;

                                     if (item.LockPlanning == "Y") {
                                         LckPlan = true;
                                     }
                                     if (item.LockConsumption == "Y")
                                     {
                                         LckCon = 1;
                                     }
                                     if (item.LockFabric == "Y")
                                     {
                                         LckFab = 1;
                                     }
                                     if (item.LockYarn == "Y")
                                     {
                                         LckYrn = 1;
                                     }
                                     if (item.LockAccesories == "Y")
                                     {
                                         LckAcc = 1;
                                     }
                                     if (item.LockPacking == "Y")
                                     {
                                         LckPak = 1;
                                     }

                                     plan.LockPlanning = LckPlan;
                                     plan.LockCon = LckCon;
                                     plan.LockFab = LckFab;
                                     plan.LockYarn = LckYrn;
                                     plan.LockAccs = LckAcc;
                                     plan.LockPack = LckPak;
                                     entities.SaveChanges();
                                
                                }

                                entities.SaveChanges();
                            }


                            var OrderStyle = entities.buy_ord_style.Where(c => c.order_no == item.Order_No && c.Styleid == item.styleid).ToList();
                            if (OrderStyle != null && OrderStyle.Count > 0)
                            {

                                foreach (var sty in OrderStyle)
                                {
                                    bool Lckord = false;

                                    if (item.LockOrder == "Y")
                                    {
                                        Lckord = true;
                                    }
                                    else {
                                        Lckord = false;
                                    }

                                    sty.IsSeQPrgmLock = Lckord;
                                  
                                    entities.SaveChanges();

                                }

                                entities.SaveChanges();
                            }



                       // }
                    }


                    if (objmas != null && objmas.Count > 0)
                    {
                        var item = objmas.Where(n => n.LockOrder == n.LockOrder).FirstOrDefault();

                        var AccStylist = entities.Acc_Req_Style.Where(c => c.Order_No == item.Order_No && c.StyleID == item.styleid).ToList();

                        foreach (var AccSty in AccStylist)
                        {
                            
                                var accmas = entities.Acc_Req_Mas.Where(h => h.AccReqID == AccSty.AccReqID ).ToList();

                                foreach (var mas in accmas)
                                {
                                    mas.LockRow = "N";
                                    entities.SaveChanges();
                                }
                                entities.SaveChanges();
                           
                        }

                    }




                    if (objmas != null && objmas.Count > 0)
                    {
                        var item = objmas.Where(n => n.LockOrder == n.LockOrder).FirstOrDefault();
                      
                            var AccStylist = entities.Acc_Req_Style.Where(c => c.Order_No == item.Order_No && c.StyleID == item.styleid).ToList();

                            foreach (var AccSty in AccStylist) {
                                if (AItemlist != null && AItemlist.Count > 0)
                                {

                                    foreach (var Aitem in AItemlist)
                                    {

                                        var accmas = entities.Acc_Req_Mas.Where(h => h.AccReqID == AccSty.AccReqID && Aitem.Itemid == h.ItemID).ToList();

                                        foreach (var mas in accmas)
                                        {

                                            mas.LockRow = "Y";
                                            entities.SaveChanges();
                                        }
                                        entities.SaveChanges();
                                    }
                                }
                            
                            }

                    }



                    if (objmas != null && objmas.Count > 0)
                    {
                        var item = objmas.Where(n => n.LockOrder == n.LockOrder).FirstOrDefault();

                        var job = entities.Job_Ord_Mas.Where(c => c.Order_No == item.Order_No && c.Styleid == item.styleid).FirstOrDefault();

                            var prodprg = entities.Prod_Prg_Mas.Where(d => d.Job_ord_no == job.Job_Ord_No).ToList();

                            foreach (var prg in prodprg)
                            {

                                prg.LockRow ="N";
                                entities.SaveChanges();
                            }
                            entities.SaveChanges();
                       

                    }


                    if (objmas != null && objmas.Count > 0)
                    {
                        var item = objmas.Where(n => n.LockOrder == n.LockOrder).FirstOrDefault();

                        var job = entities.Job_Ord_Mas.Where(c => c.Order_No == item.Order_No && c.Styleid == item.styleid).FirstOrDefault();

                        if (PItemlist != null && PItemlist.Count > 0)
                        {
                            foreach (var Pitem in PItemlist)
                            {

                                var prodprg = entities.Prod_Prg_Mas.Where(d => d.Job_ord_no == job.Job_Ord_No && d.ProcessId == Pitem.Processid).ToList();

                                foreach (var prg in prodprg)
                                {

                                    prg.LockRow = "Y";
                                    entities.SaveChanges();
                                }
                                entities.SaveChanges();
                            }
                        }

                    }

                    

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BudgetApproval-LockDetData");
                }
            }
            return reserved;
        }



    }
}
