using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BudgetRepository : IBudgetRepository
    {
        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.Budget> DisplayBuyerOrderBom(string order_no, int styleid)
        {

            string OType = "";

            var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == order_no).FirstOrDefault();
            if (OQuery != null)
            {
                OType = OQuery.OrdType;
            }

            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_DisplayBuyerOrderBom(order_no, styleid, OType)
                                        select new Budget
                                        {
                                            Category1 = cd.ColorName,
                                            Category2 = cd.size,
                                            Category3 = cd.Category3,
                                            Colorid = (int)cd.colorid,
                                            Color = cd.ColorName,
                                            Itemid = (int)cd.itemid,
                                            Itemname = cd.item,
                                            Itemgroupid = (int)cd.ItemGroupId,
                                            Itemgroup = cd.ItemGroup,
                                            Itmrate = (int)cd.Itemrate,
                                            Quantity = (decimal)cd.prg_qty,
                                            Sizeid = (int)cd.sizeid,
                                            Snumb = (long)cd.Snumb,
                                            Amnt = (decimal)cd.Amount,
                                            sno = cd.Sno,
                                            itmtype = cd.ItemType,
                                            uomid = (int)cd.uomid,
                                            AccessType = cd.Access_Type,
                                            apprate = 0,
                                            TransferinQuantity=(decimal)cd.Transferin

                                        }).AsQueryable();
            return query;
        }


        public IQueryable<Budget> GetBudgetDetailscommdet(string type, int costid, string orderno, int mode, int styleid)
        {

            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var Query = entities.Cost_Defn_Mas.Where(b => b.Order_No == orderno && b.styleid == styleid).FirstOrDefault();
                if (Query != null)
                {
                    cid = Query.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }
            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBudgetDetailsCommerEdit(type, cid)
                                        select new Budget
                                        {
                                            costdefnid = (int)cd.Cost_Defn_id,
                                            costdefncomid = cd.Cost_Defn_COMid,
                                            particularid = (int)cd.Particularid,
                                            particular = cd.Commercial,
                                            remarks = cd.Remarks,
                                            cost = (decimal)cd.Cost,
                                            Value = (decimal)cd.Actual_Cost,
                                            CostType=cd.CostType,


                                        }).AsQueryable();
            return query;
        }



        public IQueryable<Budget> GetBudgetOrderDetails(string orderno, int styleid) 
        {
            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBudgetOrderDetails(orderno, styleid)
                                        select new Budget
                                        {
                                            Orderno = cd.order_no,
                                            decimalplace = cd.decimalplace,
                                            Value = cd.Value,
                                            style = cd.style,
                                            stylerowid = cd.stylerowid,
                                            Exchange = cd.Exchange,
                                            //buyer=cd.buyer,
                                            //refno=cd.ref_no,


                                        }).AsQueryable();
            return query;
        }




        public IQueryable<Budget> GetBOMCopy(string OrderNo, int Styleid)
        {
            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBudgetcopyFrom(OrderNo, Styleid)
                                        select new Budget
                                        {
                                            Orderno = cd.Order_No,
                                            styleid=(int)cd.styleid,
                                            Itemid = (int)cd.itemid,
                                            Colorid = (int)cd.Colorid,
                                            Sizeid = (int)cd.Sizeid,
                                            Itmrate = cd.Rate,
                                            bomcurrencyid = (int)cd.CurrencyID,
                                            bomexrate = cd.exrate,
                                            bomcurrate = (decimal)cd.CurrencyRate

                                        }).AsQueryable();
            return query;
        }




        public bool AddDetData(Cost_Defn_Mas objAd, List<Cost_Defn_BOM> objCDet, List<Cost_Defn_Com> objcom, string Mode, int ProdId = 0)
        {

            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int id = 0;
                    int CostMasId = 0;


                    var Costid = entities.Cost_Defn_Mas.Add(objAd);
                    entities.SaveChanges();
                    CostMasId = objAd.Cost_Defn_id;

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            item.Cost_Defn_id = CostMasId;
                            entities.Cost_Defn_BOM.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (objcom != null && objcom.Count > 0)
                    {
                        foreach (var item in objcom)
                        {
                            item.Cost_Defn_id = CostMasId;
                            entities.Cost_Defn_Com.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    var res = AmendData(objAd, objCDet, objcom, "Add");

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Budget-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<Budget> GetBuyerOrder_valuess1(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var Query = entities.Cost_Defn_Mas.Where(b => b.Order_No == order_no && b.styleid == styleid).FirstOrDefault();
                if (Query != null)
                {
                    cid = Query.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }


            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBuyerOrder_S1values(type, order_no, styleid, cid)
                                        select new Budget
                                        {
                                            Snumb = (long)cd.Snumb,
                                            processid = cd.Processid,
                                            processname = cd.process,
                                            Amnt = cd.amount,
                                            stageschedule = (byte)cd.Stage_Schedule
                                        }).AsQueryable();
            return query;
        }






        public bool UpdateData(Cost_Defn_Mas objupd, List<Cost_Defn_BOM> objCDet, List<Cost_Defn_Com> objcom, string Mode, int ProdId = 0)
        {

            bool reserved = false;
            int id = 0;
            var CostMasId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var Upd = entities.Cost_Defn_Mas.Where(c => c.Cost_Defn_id == objupd.Cost_Defn_id).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Cost_Defn_id = objupd.Cost_Defn_id;
                        Upd.Cost_Defn_No = objupd.Cost_Defn_No;
                        Upd.Cost_Defn_date = objupd.Cost_Defn_date;
                        Upd.Order_No = objupd.Order_No;
                        Upd.Currencyid = objupd.Currencyid;
                        Upd.ExchangeRate = objupd.ExchangeRate;
                        Upd.Remarks = objupd.Remarks;
                        Upd.Companyid = objupd.Companyid;
                        Upd.styleid = objupd.styleid;
                        Upd.SalePrice = objupd.SalePrice;
                        Upd.sale_Profit = objupd.sale_Profit;
                        Upd.sale_Profit_percent = objupd.sale_Profit_percent;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.ApprovedBy = objupd.ApprovedBy;
                        Upd.ProfitPercent = objupd.ProfitPercent;
                        Upd.CostArrived = objupd.CostArrived;
                        Upd.Approved = objupd.Approved;
                        Upd.AppDate = objupd.AppDate;
                        Upd.AppRemarks = objupd.AppRemarks;
                        Upd.Amend = objupd.Amend;
                        Upd.Amend_Reason = objupd.Amend_Reason;
                        Upd.first_budget = objupd.first_budget;
                        Upd.Drawback_Percent = objupd.Drawback_Percent;
                        Upd.CMCost = objupd.CMCost;
                        Upd.FinPer = objupd.FinPer;
                        Upd.MarkUpvalue = objupd.MarkUpvalue;
                        Upd.Gaficharges = objupd.Gaficharges;
                        Upd.Qizcharges = objupd.Qizcharges;
                        Upd.ImpCharges = objupd.ImpCharges;
                        Upd.ExpCharges = objupd.ExpCharges;

                        Upd.FinPerValue = objupd.FinPerValue;
                        Upd.QizchargesValue = objupd.QizchargesValue;
                        Upd.GafichargesValue = objupd.GafichargesValue;
                        Upd.ImpChargesValue = objupd.ImpChargesValue;
                        Upd.ExpChargesValue = objupd.ExpChargesValue;
                        Upd.ShipRate = objupd.ShipRate;
                        Upd.OrdValue = objupd.OrdValue;

                        Upd.BuyerMerchendiser = (objupd.BuyerMerchendiser == "1" ? "B" : objupd.BuyerMerchendiser == "2" ? "M" : null);
                        Upd.ModifyBy = objupd.CreatedBy;
                        Upd.Modify_Date = DateTime.Now;
                        Upd.PA = objupd.PA;
                        Upd.Salesratemargin = objupd.Salesratemargin;
                            

                        entities.SaveChanges();


                        //if (objCDet != null && objCDet.Count > 0)
                        //{
                        //    foreach (var item in objCDet)
                        //    {
                        //        id = (int)item.Cost_Defn_id;

                        //    }
                        //}
                        //else if (ProdId > 0)
                        //{
                        //    id = ProdId;
                        //}

                        //var deletedet = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == id).ToList<Cost_Defn_BOM>();

                        //deletedet.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                        //entities.SaveChanges();


                        if (objcom != null && objcom.Count > 0)
                        {
                            foreach (var item in objcom)
                            {
                                id = (int)item.Cost_Defn_id;

                            }
                        }
                        else if (ProdId > 0)
                        {
                            id = ProdId;
                        }

                        var delete = entities.Cost_Defn_Com.Where(d => d.Cost_Defn_id == objupd.Cost_Defn_id).ToList<Cost_Defn_Com>();

                        delete.ForEach(c => entities.Cost_Defn_Com.Remove(c));
                        entities.SaveChanges();


                        CostMasId = id;


                        if (objCDet != null && objCDet.Count > 0)
                        {
                            //var DetUpd = entities.Cost_Defn_BOM.Where(c => c.Cost_Defn_id == objupd.Cost_Defn_id).ToList();

                            foreach (var item in objCDet)
                            {

                                //if (item.Cost_Defn_BOMid > 0 && item.Rate > 0)
                                //{
                                //    foreach (var det in DetUpd)
                                //    {
                                //        if (det.Cost_Defn_BOMid == item.Cost_Defn_BOMid)
                                //        {
                                //            det.Rate = item.Rate;
                                //            det.Quantity = item.Quantity;
                                //            det.CurrencyID = item.CurrencyID;
                                //            det.CurrencyRate = item.CurrencyRate;
                                //            det.ExRate = item.ExRate;
                                //        }
                                //        entities.SaveChanges();
                                //    }

                                //}
                                //if (item.Cost_Defn_BOMid > 0 && item.Rate == 0)
                                //{
                                //    var deletead = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_BOMid == item.Cost_Defn_BOMid).ToList<Cost_Defn_BOM>();

                                //    deletead.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                                //    entities.SaveChanges();
                                //}

                                //if (item.Cost_Defn_BOMid == 0 && item.Rate > 0)
                                //{
                                //    item.Cost_Defn_id = objupd.Cost_Defn_id;
                                //    entities.Cost_Defn_BOM.Add(item);
                                //}
                                int Pgc = entities.Proc_Apparel_InsertUpdateBudget(objupd.Cost_Defn_id, item.Cost_Defn_BOMid, item.Rate, item.Quantity, item.CurrencyID, item.CurrencyRate, item.ExRate, item.Processid, item.Itemid, item.Colorid, item.Sizeid, item.UOMid, item.Access_Type,item.DisplayOption);
                                entities.SaveChanges();
                            }
                            entities.SaveChanges();
                        }

                        if (objcom != null && objcom.Count > 0)
                        {
                            foreach (var item in objcom)
                            {
                                item.Cost_Defn_id = objupd.Cost_Defn_id;
                                entities.Cost_Defn_Com.Add(item);
                            }
                            entities.SaveChanges();
                        }

                        //var res = AmendData(objupd, objCDet, objcom, "Upd");
                        reserved = true;
                        //The Transaction will be completed
                        txscope.Complete();

                    }
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Budget-UpdateData");
                }
            }
            return reserved;
        }



        public IQueryable<Budget> GetBuyerOrder_valuess2(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var Query = entities.Cost_Defn_Mas.Where(b => b.Order_No == order_no && b.styleid == styleid).FirstOrDefault();
                if (Query != null)
                {
                    cid = Query.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }
            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBuyerOrder_S2values(type, order_no, styleid, cid)
                                        select new Budget
                                        {
                                            Snumb = (long)cd.Snumb,
                                            processid = cd.Processid,
                                            processname = cd.process,
                                            Amnt = cd.amount,
                                            stageschedule = (byte)cd.Stage_Schedule
                                        }).AsQueryable();
            return query;
        }

        public IQueryable<Budget> GetPreProcessdet(int Proessid, int Itemid, int Colorid, int sizeid)
        {
            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_PreProcessrate(Proessid, Itemid, Colorid, sizeid)
                                        select new Budget
                                        {
                                            Orderno = cd.Order_No,
                                            refno = cd.Ref_No,
                                            style = cd.Style,
                                            Supplier = cd.Supplier,
                                            rate = cd.rate,
                                            POno=cd.POno,
                                            PoDate=cd.processordate
                                        }).AsQueryable(); 
            return query;
        }

        public IQueryable<Budget> GetBuyerOrder_Store_valuesforproc(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {

            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var YDQuery = entities.Cost_Defn_Mas.Where(b => b.Order_No == order_no && b.styleid == styleid).FirstOrDefault();
                if (YDQuery != null)
                {
                    cid = YDQuery.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }



            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBuyerOrder_Store_processvalues(type, order_no, styleid, cid)
                                        select new Budget
                                        {
                                            Snumb = (long)cd.Snumb,
                                            Colorid = (int)cd.colorid,
                                            Color = cd.ColorName,
                                            Itemid = (int)cd.itemid,
                                            Itemname = cd.Item,
                                            Itemgroupid = (int)cd.ItemGroupId,
                                            Itemgroup = cd.ItemGroup,
                                            processid = cd.Processid,
                                            processname = cd.process,
                                            Sizeid = (int)cd.sizeid,
                                            Size = cd.Size,
                                            itemgrpid = (int)cd.ItemGroupId,
                                            itemgrp = cd.ItemGroup,
                                            componentid = 0,//cd.ComponentId,
                                            component = "test",//cd.Component,
                                            secqnt = (decimal)cd.SecQty,
                                            issecqnt = cd.IsSecQty,
                                            Amnt = cd.amount,
                                            Itmrate = (decimal)cd.rate,
                                            Quantity = (decimal)cd.Qty,
                                            stageschedule = (byte)cd.stage_schedule,
                                            Cost_Defn_BOMid = cd.Cost_Defn_BOMid,
                                            apprate = cd.apprate,
                                            DispOpt = cd.DisplayOption

                                        }).AsQueryable();

            return query;


        }

        public IQueryable<Budget> GetBuyerOrder_Store_valuesforprodtn(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var YDQuery = entities.Cost_Defn_Mas.Where(b => b.Order_No == order_no && b.styleid == styleid).FirstOrDefault();
                if (YDQuery != null)
                {
                    cid = YDQuery.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }


            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBuyerOrder_Store_prodctnvalues(type, order_no, styleid, cid)
                                        select new Budget
                                        {
                                            Snumb = (long)cd.Snumb,
                                            Colorid = (int)cd.colorid,
                                            Color = cd.ColorName,
                                            Itemid = (int)cd.itemid,
                                            Itemname = cd.Item,
                                            Itemgroupid = (int)cd.ItemGroupId,
                                            Itemgroup = cd.ItemGroup,
                                            processid = cd.Processid,
                                            processname = cd.process,
                                            Sizeid = (int)cd.sizeid,
                                            Size = cd.Size,
                                            itemgrpid = (int)cd.ItemGroupId,
                                            itemgrp = cd.ItemGroup,
                                            componentid = 0,//cd.ComponentId,
                                            component = "test",//cd.Component,
                                            secqnt = (decimal)cd.SecQty,
                                            issecqnt = cd.IsSecQty,
                                            Amnt = cd.amount,
                                            Itmrate = (decimal)cd.rate,
                                            Quantity = (decimal)cd.Qty,
                                            stageschedule = (byte)cd.stage_schedule,
                                            Cost_Defn_BOMid = cd.Cost_Defn_BOMid,
                                            DispOpt = cd.DisplayOption,
                                            apprate = cd.apprate
                                        }).AsQueryable();
            return query;
        }




        public IQueryable<Budget> GetBudgetDetailsBomedit(string type, int costid, string orderno, int mode, int styleid)
        {
            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var YDQuery = entities.Cost_Defn_Mas.Where(b => b.Order_No == orderno && b.styleid == styleid).FirstOrDefault();
                if (YDQuery != null)
                {
                    cid = YDQuery.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }


            IQueryable<Budget> query = (from cd1 in entities.Proc_Apparel_GetBudgetDetailsBomEdit(type, cid, orderno, styleid)
                                        select new Budget
                                        {
                                            Itemid = (int)cd1.itemid,
                                            Itemname = cd1.item,
                                            Colorid = (int)cd1.colorid,
                                            Color = cd1.ColorName,
                                            Size = cd1.size,
                                            Sizeid = cd1.sizeid,
                                            //itemgrpid=(int)cd1.ItemGroupId,
                                            //itemgrp=cd1.ItemGroup,
                                            Itemgroupid = (int)cd1.ItemGroupId,
                                            Itemgroup = cd1.ItemGroup,
                                            Itmrate = cd1.rate,
                                            Category1 = cd1.ColorName,
                                            Category2 = cd1.size,
                                            Snumb = (long)cd1.Snumb,
                                            Quantity = (decimal)cd1.prg_qty,
                                            Amnt = (decimal)cd1.Amount,
                                            Cost_Defn_BOMid = cd1.Cost_Defn_BOMid,
                                            itmtype = cd1.ItemType,
                                            uomid = (int)(cd1.uomid == null ? 0 : cd1.uomid),
                                            bomcurrencyid = (int)(cd1.currencyid == null ? 0 : cd1.currencyid),
                                            bomexrate = cd1.exrate,
                                            bomcurrate = cd1.currencyrate,
                                            AccessType = cd1.Access_Type,
                                            apprate = cd1.AppRate,
                                            decimalplace=cd1.decimalplace

                                        }).AsQueryable();
            return query;
        }


        public IQueryable<Budget> GetBudgetDetailsmasteredit(string type, int costid, string orderno, int mode, int styleid)
        {
            int cid = 0;
            if (mode == 2 || mode == 3)
            {
                var YDQuery = entities.Cost_Defn_Mas.Where(b => b.Order_No == orderno && b.styleid == styleid).FirstOrDefault();
                if (YDQuery != null)
                {
                    cid = YDQuery.Cost_Defn_id;
                }

            }
            else
            {
                cid = 0;

            }


            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_GetBudgetDetailsMaster(type, cid)
                                        select new Budget
                                        {
                                            costdefnid = cd.Cost_Defn_id,
                                            costdefnno = cd.Cost_Defn_No,
                                            currencyid = (int)cd.Currencyid,
                                            currency = cd.currency,
                                            Exchange = (decimal)(cd.ExchangeRate == null ? 0 : cd.ExchangeRate),
                                            Orderno = cd.Order_No,
                                            companyid = (int)cd.Companyid,
                                            styleid = (int)cd.styleid,
                                            salesprice = (decimal)cd.salepri == null ? 0 : cd.salepri,
                                            saleper = (decimal)cd.sale_Profit_percent,
                                            drawbackper = cd.drawback_per,
                                            saleprofit = (decimal)(cd.sale_Profit == null ? 0 : cd.sale_Profit),
                                            ProfitPercent = (decimal)(cd.ProfitPercent == null ? 0 : cd.ProfitPercent),
                                            remarks = cd.Remarks,
                                            //currid=cd.currencyid1
                                            CMCost = (decimal)(cd.CMCost == null ? 0 : cd.CMCost),
                                            FinPer = (decimal)(cd.FinPer == null ? 0 : cd.FinPer),
                                            MarkUpvalue = (decimal)(cd.MarkUpvalue == null ? 0 : cd.MarkUpvalue),
                                            Gaficharges = (decimal)(cd.Gaficharges == null ? 0 : cd.Gaficharges),
                                            Qizcharges = (decimal)(cd.Qizcharges == null ? 0 : cd.Qizcharges),
                                            ImpCharges = (decimal)(cd.ImpCharges == null ? 0 : cd.ImpCharges),
                                            ExpCharges = (decimal)(cd.ExpCharges == null ? 0 : cd.ExpCharges),

                                            FinPerValue = (decimal)(cd.FinPerValue == null ? 0 : cd.FinPerValue),
                                            ImpChargesValue = (decimal)(cd.ImpChargesValue == null ? 0 : cd.ImpChargesValue),
                                            ExpChargesValue = (decimal)(cd.ExpChargesValue == null ? 0 : cd.ExpChargesValue),
                                            QizchargesValue = (decimal)(cd.QizchargesValue == null ? 0 : cd.QizchargesValue),
                                            GafichargesValue = (decimal)(cd.GafichargesValue == null ? 0 : cd.GafichargesValue),
                                            ShipRate = (decimal)(cd.ShipRate == null ? 0 : cd.ShipRate),
                                            OrderValue = (decimal)(cd.OrdValue == null ? 0 : cd.OrdValue),

                                            BuyerMerchendiser = (cd.BuyerMerchendiser == null ? "" : cd.BuyerMerchendiser),
                                            Salesratemargin = (decimal)(cd.Salesratemargin == null ? 0 : cd.Salesratemargin),


                                        }).AsQueryable();
            return query;
        }


        public bool DeleteData(int id)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    string OrderNo = "";
                    int StyId = 0;
                    int CostDefId = 0;
                    var OrdNo = entities.buy_ord_style.Where(b => b.StyleRowid == id).FirstOrDefault();
                    if (OrdNo != null)
                    {
                        OrderNo = OrdNo.order_no;
                        StyId = OrdNo.Styleid;
                    }

                    var CostId = entities.Cost_Defn_Mas.Where(b => (b.Order_No == OrderNo && b.styleid == StyId)).FirstOrDefault();
                    if (CostId != null)
                    {
                        CostDefId = CostId.Cost_Defn_id;
                    }

                    //var addl = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();

                    //delete Pro_Prg_Det Many Rows table
                    var deletecomdet = entities.Cost_Defn_Com.Where(d => d.Cost_Defn_id == CostDefId).ToList<Cost_Defn_Com>();
                    deletecomdet.ForEach(c => entities.Cost_Defn_Com.Remove(c));
                    entities.SaveChanges();

                    //delete Prod_Prg_Mas Many Rows table
                    var deletebomdet = entities.Cost_Defn_BOM.Where(d => d.Cost_Defn_id == CostDefId).ToList<Cost_Defn_BOM>();
                    deletebomdet.ForEach(c => entities.Cost_Defn_BOM.Remove(c));
                    entities.SaveChanges();

                    var deletemasdet = entities.Cost_Defn_Mas.Where(d => d.Cost_Defn_id == CostDefId).ToList<Cost_Defn_Mas>();
                    deletemasdet.ForEach(c => entities.Cost_Defn_Mas.Remove(c));
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Budget-DeleteData");
                }
            }
            return reserved;
        }

        public IQueryable<Budget> GetShipmentwiserate(int stylerowid)
        {
            IQueryable<Budget> query = (from cd in entities.Proc_Apparel_Getshipmentwiserate(stylerowid)
                                        select new Budget
                                        {
                                            Quantity = (decimal)cd.Quantity,
                                            rate = (decimal)cd.rate,
                                            Snumb = cd.Buy_Ord_OrderDetId,
                                            Amnt = (decimal)cd.amnt
                                        }).AsQueryable();
            return query;
        }


        public bool AmendData(Cost_Defn_Mas objAd, List<Cost_Defn_BOM> objCDet, List<Cost_Defn_Com> objcom, string Mode)
        {
            bool reserved = false;

            try
            {
                Repository.Cost_Defn_Mas_Amend masamd = new Repository.Cost_Defn_Mas_Amend();
                if (objAd != null)
                {

                    masamd.Cost_Defn_id = objAd.Cost_Defn_id;
                    masamd.Cost_Defn_No = objAd.Cost_Defn_No;
                    if (Mode == "Add")
                    {
                        masamd.Cost_Defn_date = objAd.Cost_Defn_date;
                    }
                    if (Mode == "Upd")
                    {
                        masamd.Cost_Defn_date = DateTime.Now;
                    }

                    masamd.Order_No = objAd.Order_No;
                    masamd.Currencyid = objAd.Currencyid;
                    masamd.ExchangeRate = objAd.ExchangeRate;
                    masamd.Remarks = objAd.Remarks;
                    masamd.Companyid = objAd.Companyid;
                    masamd.ProfitPercent = objAd.ProfitPercent;
                    masamd.CostArrived = objAd.CostArrived;
                    masamd.styleid = objAd.styleid;
                    masamd.Approved = objAd.Approved;
                    masamd.AppDate = objAd.AppDate;
                    masamd.AppRemarks = objAd.AppRemarks;
                    masamd.AppCostArrived = objAd.AppCostArrived;
                    masamd.SalePrice = objAd.SalePrice;
                    masamd.Drawback_Percent = objAd.Drawback_Percent;
                    masamd.sale_Profit = objAd.sale_Profit;
                    masamd.sale_Profit_percent = objAd.sale_Profit_percent;
                    masamd.PcsWt = objAd.PcsWt;
                    masamd.Amend_Reason = objAd.Amend_Reason;
                    masamd.Amend = objAd.Amend;
                    masamd.first_budget = objAd.first_budget;
                    masamd.CreatedBy = objAd.CreatedBy;
                    masamd.ApprovedBy = objAd.ApprovedBy;
                    masamd.Verify = objAd.Verify;
                    masamd.CMCost = objAd.CMCost;
                    masamd.FinPer = objAd.FinPer;
                    masamd.MarkUpvalue = objAd.MarkUpvalue;
                    masamd.Gaficharges = objAd.Gaficharges;
                    masamd.Qizcharges = objAd.Qizcharges;
                    masamd.ImpCharges = objAd.ImpCharges;
                    masamd.ExpCharges = objAd.ExpCharges;

                    masamd.FinPerValue = objAd.FinPerValue;
                    masamd.QizchargesValue = objAd.QizchargesValue;
                    masamd.GafichargesValue = objAd.GafichargesValue;
                    masamd.ImpChargesValue = objAd.ImpChargesValue;
                    masamd.ExpChargesValue = objAd.ExpChargesValue;
                    masamd.ShipRate = objAd.ShipRate;
                    masamd.OrdValue = objAd.OrdValue;
                    masamd.BuyerMerchendiser = objAd.BuyerMerchendiser;
                    masamd.PA = objAd.PA;
                  
                }

                entities.Cost_Defn_Mas_Amend.Add(masamd);

                entities.SaveChanges();

                var List = new List<Repository.Cost_Defn_BOM_Amend>();
                foreach (var ad in objCDet)
                {
                    List.Add(new Repository.Cost_Defn_BOM_Amend
                    {

                        Cost_Defn_id = ad.Cost_Defn_id,
                        Cost_Defn_BOMid = ad.Cost_Defn_BOMid,
                        Processid = ad.Processid,
                        Itemid = ad.Itemid,
                        Colorid = ad.Colorid,
                        Sizeid = ad.Sizeid,
                        Quantity = ad.Quantity,
                        Rate = ad.Rate,
                        UOMid = ad.UOMid,
                        Access_Type = ad.Access_Type,
                        Actual_Qty = ad.Actual_Qty,
                        Actual_Rate = ad.Actual_Rate,
                        CurrencyID = ad.CurrencyID,
                        ExRate = ad.ExRate,
                        CurrencyRate = ad.CurrencyRate,
                        AppRate = ad.AppRate,
                        AppCurrencyRate = ad.AppCurrencyRate,
                        DisplayOption = ad.DisplayOption,
                        AppQty = ad.AppQty,
                        lUpdateDate = ad.lUpdateDate,
                        FirstRate = ad.FirstRate,
                        IsSecQty = ad.IsSecQty,
                        SecQty = ad.SecQty,
                        AppSecQty = ad.AppSecQty,
                        ActualSecQty = ad.ActualSecQty,
                        Invoice_Qty = ad.Invoice_Qty,
                        Invoice_Rate = ad.Invoice_Rate,
                        Invoice_SecQty = ad.Invoice_SecQty,
                        ReturnQty = ad.ReturnQty
                    });
                }

                foreach (var item in List)
                {
                    entities.Cost_Defn_BOM_Amend.Add(item);
                }
                entities.SaveChanges();



                var CList = new List<Repository.Cost_Defn_Com_Amend>();
                foreach (var cad in objcom)
                {
                    CList.Add(new Repository.Cost_Defn_Com_Amend
                    {

                        Cost_Defn_id = cad.Cost_Defn_id,
                        Cost_Defn_COMid = cad.Cost_Defn_COMid,
                        Particularid = cad.Particularid,
                        Cost = cad.Cost,
                        Type = cad.Type,
                        Remarks = cad.Remarks,
                        CostType = cad.CostType,
                        AppCost = cad.AppCost,
                        Actual_Cost = cad.Actual_Cost,
                        FirstRate = cad.FirstRate
                    });
                }

                foreach (var item1 in CList)
                {

                    entities.Cost_Defn_Com_Amend.Add(item1);
                }
                entities.SaveChanges();


                reserved = true;


            }
            catch (Exception ex)
            {

                exceplogg.SendExcepToDB(ex, "Budget-AddDetData");
            }

            return reserved;
        }
        public IQueryable<ProcessQuote> GetProcQuoteDet(int ProcId, string WorkOrdno)
        {
            IQueryable<ProcessQuote> List = (from d in entities.Proc_Apparel_GetProcQuoteDetails(ProcId, WorkOrdno)
                                             select new ProcessQuote
                                             {
                                                 Process_Quoteid=d.Process_Quoteid,
                                                 Process_QuoteNo=d.Process_QuoteNo,
                                                 Processorid=(int)d.Processorid,
                                                 Supplier=d.Supplier,
                                                 Rate=(int)d.rate,
                                                 MinQty=(int)d.MinQty
                                             }).AsQueryable();
            return List;
        }
        public IQueryable<Vendor> GetPurchaseQuoteDet(string OrdNo,int ItemId,int colorId,int SizeId )
        {
            IQueryable<Vendor> List = (from d in entities.Proc_Apparel_GetPurchaseQuoteDet(OrdNo, ItemId, colorId, SizeId)
                                       select new Vendor
                                             {
                                                 Quoteid = d.Quoteid,
                                                 EntryNo = d.EntryNo,
                                                 MinQty = (int)d.MinQty,
                                                 MaxQty=(int)d.MaxQty,
                                                 Supplier = d.Supplier,
                                                 Rate = (int)d.Rate,
                                             }).AsQueryable();
            return List;
        }
    }
}
