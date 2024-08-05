using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Sql;
using System.Data.SqlClient;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BitCuttingOrderRepository : IBitCuttingOrderRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<CuttingOrder> GetTrimsDetails(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo, int Buyerid,int Processid)
        {
            IQueryable<CuttingOrder> query = (from T in entities.proc_Apparel_BitCuttingOrderAddlistingforBulk(CompanyId, CompanyUnitId, OrderType, refno, styleid, ordo, Buyerid, Processid)
                                              select new CuttingOrder
                                              {
                                                  BuyOrdMasId = T.Buy_Ord_MasId,
                                                  Style = T.Style,
                                                  RefNo = T.Ref_No,
                                                  OrderNo = T.Order_No,
                                                  Qty = (decimal)T.Quantity,
                                                  WorkOrder = T.JobNo,
                                                  ProdPrgNo = T.ProdPrgNo,
                                                  ProdPrgId = T.ProdPrgId,
                                                  ProcessId=(int)T.ProcessId,
                                                  Process=T.Process
                                              }).AsQueryable();

            return query;
        }

        public IQueryable<CuttingOrder> GetCuttingOrderInf()
        {
            IQueryable<CuttingOrder> query = (from T in entities.Cutting_Order_Mas
                                              select new CuttingOrder
                                              {
                                                  CuttingOrdId = T.CuttingOrdid,
                                                  CuttingOrdNo = T.CuttingOrderNo
                                              }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingOrder> GetCuttingHeaderDet(string JobOrdNo)
        {
            IQueryable<CuttingOrder> query = (from T in entities.Proc_Apparel_CuttingHeaderDet(JobOrdNo)
                                              select new CuttingOrder
                                              {
                                                  Style = T.Style,
                                                  StyleId = T.StyleId,
                                                  RefNo = T.Ref_No,
                                                  OrderNo = T.Order_No,
                                                  Qty = (decimal)T.Quantity,
                                                  CompanyUnitId = T.Id,
                                                  BuyerId = (int)T.Buyerid,
                                              }).AsQueryable();
            return query.DefaultIfEmpty();
        }

        public IQueryable<CuttingOrderStockProperties> GetItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId, int Supplierid, string Processortype)
        {
            IQueryable<CuttingOrderStockProperties> query = (from T in entities.Proc_Apparel_InputItemStock(JobOrdNo, IssueStoreId, StyleId, ItemId, ColorId, SizeId, CompanyId, Supplierid, Processortype)
                                                             select new CuttingOrderStockProperties
                                                             {
                                                                 LotNo = T.LotNo,
                                                                 TransNo = T.Transno,
                                                                 TransDate = T.Transdate,
                                                                 Process = T.Process,
                                                                 Processid = T.Processid,
                                                                 Supplier = T.Supplier,
                                                                 Supplierid = T.SupplierId,
                                                                 Stockid = T.StockId,
                                                                 Rate = (decimal)T.Rate,
                                                                 MRate = (decimal)T.MRate,
                                                                 ItemId = (int)T.ItemId,
                                                                 ColorId = (int)T.ColorId,
                                                                 SizeId = (int)T.SizeId,
                                                                 BalQty = (decimal)T.BalQty,
                                                                 StockQty = (decimal)T.BalQty,
                                                             }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingOrderStockProperties> GetItemStockInfoEditMode(int CuttingOrdId, int ItemID, int ColorID, int SizeID)
        {
            int CuttingIssueId = 0;

            var CuttingIssue = entities.Cutting_Issue_Mas.Where(c => c.CuttingOrdid == CuttingOrdId).Select(d => d.CuttingIssueId).First();
            if (CuttingIssue > 0)
            {
                CuttingIssueId = CuttingIssue;
            }

            IQueryable<CuttingOrderStockProperties> query = (from T in entities.Proc_Apparel_CuttingIssueStkDetails(CuttingIssueId, ItemID, ColorID, SizeID)
                                                             select new CuttingOrderStockProperties
                                                             {
                                                                 LotNo = T.lotno,
                                                                 TransNo = T.Transno,
                                                                 TransDate = (DateTime)T.Transdate,
                                                                 Process = T.Process,
                                                                 Processid = T.Processid,
                                                                 Supplier = T.Supplier,
                                                                 IssStkid = T.IssStkid,
                                                                 itemstckid = T.itemstckid,
                                                                 Supplierid = T.Supplierid,
                                                                 Stockid = (int)T.Stockid,
                                                                 Rate = (decimal)T.Rate,
                                                                 MRate = (decimal)T.Mrate,
                                                                 ItemId = (int)T.ItemId,
                                                                 ColorId = (int)T.ColorId,
                                                                 SizeId = (int)T.SizeId,
                                                                 BalQty = (decimal)T.IssueQty,
                                                                 StockQty = (decimal)T.StkQty + (int)T.IssueQty,
                                                                 AllotedQty = (decimal)T.IssueQty,
                                                             }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingOrder> GetCuttingHeaderInfo(int CuttingOrdId)
        {
            IQueryable<CuttingOrder> query = (from T in entities.Proc_Apparel_CuttingOrderLoadDetails(CuttingOrdId)
                                              select new CuttingOrder
                                              {
                                                  CompanyId = (int)T.Companyid,
                                                  BuyerId = (int)T.Buyerid,
                                                  CompanyUnitId = (int)T.CompanyUnitid,
                                                  CuttingOrdNo = T.CuttingOrderNo,
                                                  CuttingOrdDate = (DateTime)T.CutDate,
                                                  DeliverDate = (DateTime)T.DeliveryDate,
                                                  EmployeeId = (int)T.Employeeid,
                                                  Remarks = T.Remarks,
                                                  WorkDivisionId = (int)T.WorkDivisionid,
                                                  WorkDivision = T.workdivision,
                                                  LossPer = (int)T.LossPer,
                                                  OrderCumIssue = T.OrderCumIssue,
                                                  OrderNo = T.OrderNo,
                                                  RefNo = T.RefNo,
                                                  InterExter = T.internalorexternal,
                                                  StyleId = (int)T.Styleid,
                                                  ProdPrgNo = T.ProdPrgNo,
                                                  ProdPrgId = T.Prodprgid,
                                                  WorkOrder = T.JobOrderNo,
                                                  OrderType = T.OrderType,
                                                  ProcessId = (int)T.ProcessId1
                                              }).AsQueryable();
            return query;
        }

        public IList<CuttingOrder> GetInputOutputDetails(int Prodprgid, string JobOrdNo, string Ordertype)
        {
            IQueryable<CuttingOrder> queryColor = (from T in entities.Proc_Apparel_GetCuttingOrderDetailForAdd(Prodprgid, JobOrdNo, Ordertype)
                                                   select new CuttingOrder
                                                   {
                                                       StockId = (int)T.StockId,
                                                       ProdPrgId = T.prodprgdetid,
                                                       Item = T.Item,
                                                       ItemId = (int)T.ItemId,
                                                       Color = T.Color,
                                                       ColorId = T.ColorId,
                                                       Size = T.Size,
                                                       SizeId = T.SizeId,
                                                       BUomId = (int)T.BUomId,
                                                       BaseUnit = T.Bas_Unit,
                                                       SUomId = (int)T.SUomId,
                                                       SecUnit = T.Sec_Unit,
                                                       InorOut = T.InOrOut,
                                                       ProcessId = (int)T.ProcessId,
                                                       ProdprgQty = (decimal)T.Prog_Op_Qty,
                                                       BalQty = (decimal)T.Bal_Qty,
                                                       ordqty = T.ordqty,
                                                       issqty = T.issqty,
                                                       secqty = T.secqty,
                                                       apprate = (decimal)T.Apprate,
                                                       rate = (decimal)T.Apprate,
                                                       weight = T.weight,
                                                       Grammage = T.Grammage,
                                                       CuttingOrdDetId = 0,
                                                       AllowBalQty = (decimal)T.Bal_Qty,
                                                   }).AsQueryable();

            return queryColor.ToList();
        }

        public IList<CuttingOrder> GetInputOutputEdit(int CuttingOrdMasId, int Prodprgid)
        {
            IQueryable<CuttingOrder> queryColor = (from T in entities.Proc_Apparel_CuttingOrderDetLoadDetails(CuttingOrdMasId, Prodprgid)
                                                   select new CuttingOrder
                                                   {
                                                       //StockId = (int)T.StockId,
                                                       CuttingOrdDetId = T.CuttingOrdDetid,
                                                       ProdPrgId = T.prodprgdetid,
                                                       Item = T.Item,
                                                       ItemId = (int)T.ItemId,
                                                       Color = T.Color,
                                                       ColorId = (int)T.ColorId,
                                                       Size = T.Size,
                                                       SizeId = (int)T.SizeId,
                                                       //BUomId = (int)T.BUomId,
                                                       BaseUnit = T.BaseUom,
                                                       //SUomId = (int)T.SUomId,
                                                       //SecUnit = T.Sec_Unit,
                                                       InorOut = T.InorOut,
                                                       //ProcessId = (int)T.ProcessId,
                                                       ProdprgQty = (decimal)T.Prog_Op_Qty,
                                                       BalQty = ((decimal)T.Bal_Qty + (decimal)T.IssueQty),
                                                       StockQty = (decimal)T.Bal_Qty,
                                                       ordqty = (decimal)T.ordqty,
                                                       issqty = (decimal)T.IssueQty,
                                                       secqty = (decimal)T.secqty,
                                                       apprate = (decimal)T.rate,
                                                       rate = (decimal)T.rate,
                                                       weight = T.Weight,
                                                       Grammage = (decimal)T.Grammage,
                                                       AllowBalQty = ((decimal)T.Bal_Qty + (decimal)T.IssueQty),
                                                   }).AsQueryable();

            return queryColor.ToList();
        }

        //public IList<CuttingOrder> GetMainData(int ID, string FromDate, string ToDate)
        //{
        //    var query = (from a in entities.proc_Apparel_GetCuttingOrderDetailsForJob(ID, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
        //                 select new CuttingOrder
        //                 {
        //                     CuttingOrdId = a.CuttingOrdid,
        //                     OrderNo = a.Order_no,
        //                     RefNo = a.Ref_No,
        //                     WorkOrder = a.joborderno,
        //                     CuttingOrdNo = a.CuttingOrderNo,
        //                     CuttingOrdDate = (DateTime)a.Cutdate,
        //                     WorkDivision = a.workdivision,
        //                     Incharger = a.Employee

        //                 }).AsQueryable();

        //    return query.ToList();
        //}

        public IList<CuttingOrder> GetMainData(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate, int supplierid,int processid)
        {
            var query = (from a in entities.proc_Apparel_GetBitCuttingOrderDetailsForJobMaingrid(compid, unitid, buyerid, masid, empid, refno, orderno, supptype, ordtype, cuttingordno, jobordno, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), supplierid, processid)
                         select new CuttingOrder
                         {

                             CuttingOrdId = a.CuttingOrdid,
                             OrderNo = a.Order_no,
                             RefNo = a.Ref_No,
                             WorkOrder = a.joborderno,
                             CuttingOrdNo = a.CuttingOrderNo,
                             CuttingOrdDate = (DateTime)a.Cutdate,
                             WorkDivision = a.workdivision,
                             Incharger = a.Employee,
                             InchargerId=(int)a.Employeeid,
                             company = a.Company,
                             CompanyId = (int)a.Companyid,
                             CompanyUnitId = (int)a.Companyunitid,
                             Supplier=a.unit,
                             SupplierId=(int)a.unitid,
                             EmployeeId = (int)a.Employeeid,
                             BuyerId = (int)a.buyerid,
                             Buyer=a.Buyer,
                             InorOut = a.InternalorExternal,
                             OrderType = a.OrderType,
                             BuyOrdMasId = a.Buy_Ord_MasId,
                             jmasid = a.ID,
                             Process=a.Process
                         }).AsQueryable();

            return query.ToList();
        }

        public bool UpdateData(CuttingOrder objUpd)
        {
            var result = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Update Cutting_Order_Mas and Cutting_Order_Det
                    var App = entities.Cutting_Order_Mas.Where(c => c.CuttingOrdid == objUpd.CuttingOrdId).FirstOrDefault();
                    if (App != null)
                    {
                        App.Employeeid = objUpd.EmployeeId;
                        App.Remarks = objUpd.Remarks;
                        App.LossPer = objUpd.LossPer;
                    }
                    entities.SaveChanges();



                    foreach (var stk in objUpd.cuttingordstckdet)
                    {
                        if (stk.AllotedQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_CuttingIssueItmStkUpdate(stk.Stockid, objUpd.CuttingOrdId);
                            entities.SaveChanges();
                        }
                    }

                    entities.SaveChanges();
                    

                    var cuttingList = new List<Cutting_Order_Det>();
                    var prodcuttingList = new List<Cutting_Order_Det>();
                    var CuttingdetProdPrgList = new List<ProductionProd_Prg_Det>();

                    cuttingList = entities.Cutting_Order_Det.Where(c => c.CuttingOrdId == objUpd.CuttingOrdId).ToList();
                    prodcuttingList = entities.Cutting_Order_Det.Where(c => c.CuttingOrdId == objUpd.CuttingOrdId).ToList();

                    // Update OrderQty in Prod_prg_Det Begin(Minus)
                    var ProdprgId = entities.Cutting_Order_Mas.Single(x => x.CuttingOrdid == objUpd.CuttingOrdId).ProdPrgid;

                    CuttingdetProdPrgList = entities.Prod_Prg_Det.Where(c => c.Prodprgid == ProdprgId).ToList();

                    foreach (var prod in prodcuttingList)
                    {
                        //Update OrderQty in Prod_Prg_Det
                        var PPD = entities.Prod_Prg_Det.Where(d => d.Prodprgid == ProdprgId && d.Itemid == prod.itemid && d.Sizeid == prod.sizeid && d.Colorid == prod.colorid && d.InorOut == prod.inp_op).FirstOrDefault();
                        if (PPD != null && PPD.InorOut == "O")
                        {
                            //CuttingdetProdPrgList.Add(new Repository.Prod_Prg_Det
                            //{
                            PPD.order_qty = (decimal)(PPD.order_qty) - (decimal)(prod.OrderQty);
                            //});
                        }
                        else if (PPD != null && PPD.InorOut == "I")
                        {
                            PPD.Issue_qty = (decimal)(PPD.Issue_qty) - (decimal)(prod.Issuedqty);
                            PPD.order_qty = (decimal)(PPD.order_qty) - (decimal)(prod.Issuedqty);
                        }
                        //entities.SaveChanges();
                        //foreach (var newitem in (CuttingdetProdPrgList.Where(e => e.Itemid == prod.itemid && e.Colorid == prod.colorid && e.Sizeid == prod.sizeid)))
                        //{
                        //    if (prod != null && prod.inp_op == "O")
                        //    {
                        //        newitem.order_qty = (decimal)(newitem.order_qty - prod.OrderQty);
                        //    }
                        //    else if (prod != null && prod.inp_op == "I")
                        //    {
                        //        newitem.order_qty = (decimal)(newitem.order_qty - prod.OrderQty);
                        //    }
                        //}
                    }
                    entities.SaveChanges();
                    // Update OrderQty in Prod_prg_Det End(Minus)

                    var deletecuttingorddet = entities.Cutting_Order_Det.Where(d => d.CuttingOrdId == objUpd.CuttingOrdId).ToList<Cutting_Order_Det>();
                    deletecuttingorddet.ForEach(c => entities.Cutting_Order_Det.Remove(c));
                    entities.SaveChanges();

                    var CuttingdetList = new List<Cutting_Order_Det>();

                    foreach (var item in objUpd.cuttingorddet)
                    {
                        if (item.ordqty > 0 || item.issqty > 0)
                        {
                            //entities.Job_Ord_Det.Add(item);
                            CuttingdetList.Add(new Repository.Cutting_Order_Det
                            {
                                CuttingOrdId = objUpd.CuttingOrdId,
                                itemid = item.Itemid,
                                colorid = item.Colorid,
                                sizeid = item.Sizeid,
                                PlannedSizeid = item.Sizeid,
                                inp_op = item.InOrOut,
                                Consumption = item.Grammage,
                                Weight = item.weight,
                                OrderQty = item.ordqty,
                                rate = item.rate,
                                Issuedqty = item.issqty,
                                receivedqty = 0,
                                Markup_Rate = item.MarkupRate,
                            });
                        }
                    }

                    foreach (var shiplst in CuttingdetList)
                    {
                        entities.Cutting_Order_Det.Add(shiplst);
                    }

                    entities.SaveChanges();




                    //if (cuttingList != null)
                    //{
                    //    foreach (var item in cuttingList)
                    //    {
                    //        //foreach (var newitem in objUpd.cuttingorddet.Where(e => e.CuttingOrderDetId == e.CuttingOrderDetId))
                    //        foreach (var newitem in (objUpd.cuttingorddet.Where(e => e.Itemid == item.itemid && e.Colorid == item.colorid && e.Sizeid == item.sizeid)))
                    //        {
                    //            item.OrderQty = (decimal)newitem.ordqty;
                    //            item.Issuedqty = (decimal)newitem.issqty;
                    //            item.Markup_Rate = newitem.MarkupRate;
                    //            item.rate = newitem.rate;
                    //        }
                    //    }
                    //}
                    //entities.SaveChanges();

                    //foreach (var prod in CuttingdetProdPrgList)
                    //{
                    //    if (prod != null && prod.InorOut == "O")
                    //    {
                    //        prod.order_qty = (decimal)(prod.order_qty-prod.order_qty);
                    //    }
                    //    else if (prod != null && prod.InorOut == "I")
                    //    {
                    //        prod.order_qty = (decimal)(prod.order_qty-prod.order_qty);
                    //    }
                    //}

                    // Update OrderQty in Prod_prg_Det Begin(Plus)
                    foreach (var prod in objUpd.cuttingorddet)
                    {
                        var PPD = entities.Prod_Prg_Det.Where(d => d.Prodprgid == ProdprgId && d.Itemid == prod.Itemid && d.Sizeid == prod.Sizeid && d.Colorid == prod.Colorid && d.InorOut == prod.InOrOut).FirstOrDefault();
                        if (PPD != null && PPD.InorOut == "O")
                        {
                            //CuttingdetProdPrgList.Add(new Repository.Prod_Prg_Det
                            //{
                            PPD.order_qty = (decimal)(PPD.order_qty) + (decimal)(prod.ordqty);
                            //});
                        }
                        else if (PPD != null && PPD.InorOut == "I")
                        {
                            PPD.Issue_qty = (decimal)(PPD.Issue_qty) + (decimal)(prod.issqty);
                            PPD.order_qty = (decimal)(PPD.order_qty) + (decimal)(prod.issqty);
                        }
                        //foreach (var newitem in (objUpd.cuttingorddet.Where(e => e.Itemid == prod.Itemid && e.Colorid == prod.Colorid && e.Sizeid == prod.Sizeid)))
                        //{
                        //    if (prod != null && prod.InorOut == "O")
                        //    {
                        //        prod.order_qty = (decimal)(prod.order_qty + newitem.ordqty);
                        //    }
                        //    else if (prod != null && prod.InorOut == "I")
                        //    {
                        //        prod.Issue_qty = (decimal)(prod.Issue_qty + newitem.issqty);
                        //    }
                        //}
                    }
                    entities.SaveChanges();
                    // Update OrderQty in Prod_prg_Det End(Plus)

                    //Update Cutting_Issue_Mas and Cutting_Issue_Det
                    int CuttingIssueId = 0;
                    var CuttingIssue = entities.Cutting_Issue_Mas.Where(c => c.CuttingOrdid == objUpd.CuttingOrdId).FirstOrDefault();
                    if (CuttingIssue != null)
                    {
                        CuttingIssue.Remarks = objUpd.Remarks;
                        CuttingIssueId = CuttingIssue.CuttingIssueId;
                    }
                    entities.SaveChanges();

                    var cuttingissueList = new List<Cutting_Issue_Det>();

                    cuttingissueList = entities.Cutting_Issue_Det.Where(c => c.CuttingIssueId == CuttingIssueId).ToList();

                    if (cuttingissueList != null)
                    {
                        foreach (var issueitem in cuttingissueList)
                        {
                            foreach (var issuedetitem in (objUpd.cuttingorddet.Where(e => e.Itemid == issueitem.itemid && e.Sizeid == issueitem.sizeid && e.Colorid == issueitem.colorid)))
                            {
                                issueitem.IssueQty = (decimal)issuedetitem.issqty;
                            }
                        }
                    }
                    entities.SaveChanges();

                    //Update Cutting_Issue_Stock and Item_Stock_Outward
                    if (objUpd.cuttingordstckdet != null)
                    {
                        int CuttingIssueDetId = 0;
                        var cuttingissuestockList = new List<Cutting_Issue_Stock>();
                        var cuttingissuestockListsecond = new List<Cutting_Issue_Stock>();
                        var itemstockoutwardListdiff = new List<ProductionItem_stock_outward>();
                        var itemstockupdList = new List<ProductionItem_stock_outward>();

                        cuttingissuestockList = entities.Cutting_Issue_Stock.Where(c => c.CuttingIssueId == CuttingIssueId).ToList();

                        foreach (var Cuttissueitem in cuttingissuestockList)
                        {
                            foreach (var issuedetitem in (objUpd.cuttingordstckdet.Where(e => e.IssStkid == Cuttissueitem.CuttingIssueStockId)))
                            {
                                Cuttissueitem.IssueQty = (decimal)issuedetitem.AllotedQty;
                                CuttingIssueDetId = (int)Cuttissueitem.CuttingIssueDetId;
                            }
                        }
                        entities.SaveChanges();


                        ///Update Itemstock
                        foreach (var stk in objUpd.cuttingordstckdet)
                        {
                            if (stk.AllotedQty > 0)
                            {
                                var Pg3 = entities.Proc_Apparel_UpdateItemStock(stk.Stockid, stk.AllotedQty, stk.AllotedQty);
                                entities.SaveChanges();

                                var mrupdate = entities.ItemStock.Where(a => a.StockId == stk.Stockid).FirstOrDefault();
                                mrupdate.Markup_Rate = stk.MRate;
                                entities.SaveChanges();

                            }
                        }


                        //Item_Stock_Outward
                        //itemstockoutwardListdiff = entities.Item_stock_outward.Where(c => c.ProdIssueDetID == CuttingIssueDetId).ToList();
                        cuttingissuestockListsecond = entities.Cutting_Issue_Stock.Where(c => c.CuttingIssueId == CuttingIssueId).ToList();
                        foreach (var Cuttissueitemstk in cuttingissuestockListsecond)
                        {
                            itemstockoutwardListdiff = entities.Item_stock_outward.Where(c => c.Itemstockid == Cuttissueitemstk.StockId).ToList();

                            itemstockupdList = itemstockoutwardListdiff.ToList();

                            //foreach (var Cuttissueitem in itemstockupdList)
                            //{
                            //    //Update alloted in ItemStock
                            //    var ITS = entities.ItemStock.Where(d => d.StockId == Cuttissueitem.Itemstockid).FirstOrDefault();
                            //    if (ITS != null)
                            //    {
                            //        ITS.alloted = (ITS.alloted - Cuttissueitem.Quantity);
                            //        ITS.balQty = (ITS.balQty + Cuttissueitem.Quantity);

                            //        entities.Proc_Apparel_UpdateItemStock(Cuttissueitem.Itemstockid, ITS.alloted, ITS.balQty);
                            //    }
                            //    //entities.SaveChanges();
                            //}

                            //foreach (var Cuttissueitem in itemstockoutwardList)
                            //{
                            //    foreach (var issuedetitem in (objUpd.cuttingordstckdet.Where(e => e.IssStkid == Cuttissueitem.Itemstockid)))
                            //    {
                            //        Cuttissueitem.Quantity = (decimal)issuedetitem.AllotedQty;
                            //    }
                            //}
                            //entities.SaveChanges();

                            //foreach (var Cuttissueitem in itemstockupdList)
                            //{
                            //    //Update alloted in ItemStock
                            //    var ITSA = entities.ItemStock.Where(d => d.StockId == Cuttissueitem.Itemstockid).FirstOrDefault();
                            //    if (ITSA != null)
                            //    {
                            //        foreach (var issuedetitemadd in (objUpd.cuttingordstckdet.Where(e => e.Stockid == Cuttissueitem.Itemstockid)))
                            //        {
                            //            ITSA.alloted = (ITSA.alloted + issuedetitemadd.AllotedQty);
                            //            ITSA.balQty = (ITSA.balQty - issuedetitemadd.AllotedQty);

                            //            entities.Proc_Apparel_UpdateItemStock(Cuttissueitem.Itemstockid, ITSA.alloted, ITSA.balQty);
                            //        }
                            //    }
                            //}

                            entities.SaveChanges();


                            foreach (var Cuttissueitemdiff in itemstockoutwardListdiff)
                            {
                                foreach (var issuedetitemstck in (objUpd.cuttingordstckdet.Where(e => e.itemstckid == Cuttissueitemdiff.ItemStockoutid)))
                                {
                                    Cuttissueitemdiff.Quantity = (decimal)issuedetitemstck.AllotedQty;

                                    entities.Proc_Apparel_UpdateItemStockOutward(issuedetitemstck.itemstckid, Cuttissueitemdiff.Quantity);
                                }
                                entities.SaveChanges();
                            }
                        }
                    }

                    //Update MarkUpRate
                    bool UCMR = MarkUpRateUpdation(objUpd.CuttingOrdId);
                    entities.SaveChanges();
                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool AddData(CuttingOrder objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_Apparel_CuttingOrderMasInsert(objAdd.CuttingOrdNo, objAdd.OrderNo, objAdd.OrderCumIssue, objAdd.CuttingOrdDate, objAdd.EmployeeId, objAdd.Remarks,
                                                                        objAdd.CompanyUnitId, objAdd.CompanyId, objAdd.InorOut, objAdd.OrderType,
                                                                        objAdd.WorkDivisionId, objAdd.LossPer, objAdd.ProdPrgId, objAdd.Convtype, objAdd.DeliverDate,
                                                                        objAdd.CreatedBy, 0, 0, 0, 0, 0, 0, 0, 0, objAdd.Saccode,objAdd.Type, objParam);

                    entities.SaveChanges();
                    id = Convert.ToInt16(objParam.Value);

                    //Insert into Cutting_Order_Det and Updating OrderQty in Prod_prg_Det
                    var cuttingList = new List<Domain.CuttingOrderDetail>();
                    if (objAdd.cuttingorddet != null)
                    {
                        if (objAdd.cuttingorddet.Count > 0)
                        {
                            foreach (var item in objAdd.cuttingorddet)
                            {
                                cuttingList.Add(new Domain.CuttingOrderDetail
                                {
                                    CuttingOrderId = id,
                                    Itemid = item.Itemid,
                                    Colorid = item.Colorid,
                                    Sizeid = item.Sizeid,
                                    PlannedSizeid = item.Sizeid,
                                    Inp_op = item.InOrOut,
                                    Consumption = item.Grammage,
                                    weight = item.weight,
                                    OrderQty = item.ordqty,
                                    Issuedqty = item.issqty,
                                    rate = item.rate,
                                    MarkupRate = item.MarkupRate,
                                });
                            }
                        }
                        var cuttingDetresult = AddCuttingOrdDet(cuttingList, "Add", objAdd.ProdPrgId);
                    }

                    //Insert into Cutting_Issue_Mas 
                    var CuttingIssueHeaderId = AddCuttingIssue(new Domain.CuttingOrder
                    {
                        CuttingOrdId = id,
                        OrderCumIssue = objAdd.OrderCumIssue,
                        CuttingOrdDate = objAdd.CuttingOrdDate,
                        FromStoreId = objAdd.FromStoreId,
                        Remarks = objAdd.Remarks,
                        CreatedBy = objAdd.CreatedBy,
                        IsApproved = 1,
                    });

                    //Insert into Cutting_Issue_Det
                    //Filtering in Arraylist
                    if (objAdd.cuttingorddet != null)
                    {
                        var cuttingdetList = new List<Domain.CuttingOrderDetail>(objAdd.cuttingorddet.Cast<CuttingOrderDetail>()
                                                                                                              .Where(d => d.InOrOut == "I").ToList());

                        var cuttingIssueList = new List<Domain.CuttingOrderDetail>();

                        if (cuttingdetList.Count > 0)
                        {
                            foreach (var item in cuttingdetList)
                            {
                                cuttingIssueList.Add(new Domain.CuttingOrderDetail
                                {
                                    CuttingOrderId = CuttingIssueHeaderId,
                                    Itemid = item.Itemid,
                                    Colorid = item.Colorid,
                                    Sizeid = item.Sizeid,
                                    Issuedqty = item.issqty,
                                    rate = item.rate,
                                    SecQty = item.SecQty,
                                });
                            }
                        }

                        var cuttingIssueDetresult = AddCuttingIssueDet(cuttingIssueList, "Add");
                    }

                    //Insert into Cutting_Issue_Stock
                    if (objAdd.cuttingordstckdet != null)
                    {
                        var CuttingIssueStckList = new List<Domain.CuttingOrderDetail>();

                        if (objAdd.cuttingordstckdet.Count > 0)
                        {
                            foreach (var item in objAdd.cuttingordstckdet)
                            {
                                CuttingIssueStckList.Add(new Domain.CuttingOrderDetail
                                {
                                    CuttingIssueId = CuttingIssueHeaderId,
                                    qty = item.AllotedQty,
                                    StockId = item.Stockid,
                                    Itemid = item.ItemId,
                                    Colorid = item.ColorId,
                                    Sizeid = item.SizeId,
                                });
                                if (item.AllotedQty > 0)
                                {

                                    var mrupdate = entities.ItemStock.Where(a => a.StockId == item.Stockid).FirstOrDefault();
                                    mrupdate.Markup_Rate = item.MRate;
                                    entities.SaveChanges();
                                }
                            }
                        }

                        var cuttingIssuesStock = AddCuttingIssueStock(CuttingIssueStckList, "Add");
                    }

                    //Insert into Item_Stock_Outward
                    var cuttingIssuestckoutwardList = new List<Domain.CuttingOrderDetail>();
                    if (objAdd.cuttingordstckdet != null)
                    {
                        if (objAdd.cuttingordstckdet.Count > 0)
                        {
                            foreach (var item in objAdd.cuttingordstckdet)
                            {
                                cuttingIssuestckoutwardList.Add(new Domain.CuttingOrderDetail
                                {
                                    CuttingIssueId = CuttingIssueHeaderId,
                                    Outwardate = objAdd.CuttingOrdDate,
                                    TransNo = objAdd.OrderCumIssue,
                                    TransType = "CIS",
                                    JobOrderNo = objAdd.OrderNo,
                                    CuttingOrderId = CuttingIssueHeaderId,
                                    UnitOrOther = "O",
                                    qty = item.AllotedQty,
                                    StockId = item.Stockid,
                                    CuttingIssueDetId = 0,
                                    Itemid = item.ItemId,
                                    Colorid = item.ColorId,
                                    Sizeid = item.SizeId,
                                });
                            }
                        }
                        var cuttingIssuestockoutward = AddCuttingStockOutward(cuttingIssuestckoutwardList, "Add");
                    }

                    //Update MarkUpRate
                    bool UCMR = MarkUpRateUpdation(id);

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public int AddCuttingIssue(CuttingOrder objAdd)
        {
            try
            {
                ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                var id = entities.Proc_Apparel_CuttingIssueMasInsert(objAdd.CuttingOrdId, objAdd.OrderCumIssue, objAdd.CuttingOrdDate,
                    null, objAdd.Remarks, objAdd.CreatedBy, objAdd.FromStoreId, objParam);

                entities.SaveChanges();
                return id = Convert.ToInt16(objParam.Value);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddCuttingIssueDet(List<CuttingOrderDetail> objCuttingissueDet, string Mode)
        {
            var CuttingdetList = new List<Cutting_Issue_Det>();

            foreach (var item in objCuttingissueDet)
            {
                if (item.Issuedqty > 0)
                {

                    CuttingdetList.Add(new Repository.Cutting_Issue_Det
                    {
                        CuttingIssueId = item.CuttingOrderId,
                        itemid = item.Itemid,
                        colorid = item.Colorid,
                        sizeid = item.Sizeid,
                        IssueQty = item.Issuedqty,
                        SecQty = item.SecQty,
                    });
                }
            }

            foreach (var issuelst in CuttingdetList)
            {
                entities.Cutting_Issue_Det.Add(issuelst);
            }

            entities.SaveChanges();

            return true;
        }

        public bool MarkUpRateUpdation(int CuttingOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateCuttingMarkUpRate(CuttingOrderId);
            return true;
        }

        public bool AddCuttingStockOutward(List<CuttingOrderDetail> objCuttingissueDet, string Mode)
        {
            var itemStckOutward = new List<ProductionItem_stock_outward>();
            var itemStckcheck = new List<CuttingOrderDetail>();

            itemStckcheck = objCuttingissueDet.ToList();


            foreach (var item in objCuttingissueDet)
            {
                if (item.qty > 0)
                {
                    var CuttingIssueDetId = entities.Cutting_Issue_Det.Where(c => c.itemid == item.Itemid && c.CuttingIssueId == item.CuttingIssueId
                                                            && c.colorid == item.Colorid && c.sizeid == item.Sizeid).Select(d => d.CuttingIssueDetId).First();


                    itemStckOutward.Add(new Repository.ProductionItem_stock_outward
                    {
                        outwarddate = (DateTime)item.Outwardate,
                        TransNo = item.TransNo,
                        TransType = item.TransType,
                        joborderno = item.JobOrderNo,
                        Quantity = item.qty,
                        Itemstockid = item.StockId,
                        Unit_Or_Other = item.UnitOrOther,
                        Unitid = 0,
                        rate = 0,
                        ProdIssueDetID = (CuttingIssueDetId == 0 ? 0 : CuttingIssueDetId),
                    });
                }
            }

            foreach (var issuelst in itemStckOutward)
            {
                entities.Item_stock_outward.Add(issuelst);
            }

            entities.SaveChanges();

            //foreach (var itemupd in itemStckcheck)
            //{
            //    //Update alloted in ItemStock
            //    var ITS = new ProductionItemStock();

            //    ITS = entities.ItemStock.Where(d => d.StockId == itemupd.StockId).FirstOrDefault();

            //    if (ITS != null)
            //    {
            //        ITS.alloted = (ITS.alloted + itemupd.qty);
            //        ITS.balQty = (ITS.balQty - itemupd.qty);

            //        entities.Proc_Apparel_UpdateItemStock(itemupd.StockId, ITS.alloted, ITS.balQty);

            //        //entities.SaveChanges();
            //    }
            //}


            foreach (var stk in itemStckcheck)
            {
                if (stk.qty > 0)
                {
                    var Pg3 = entities.Proc_Apparel_UpdateItemStock(stk.StockId, stk.qty, stk.qty);
                    entities.SaveChanges();
                }
            }

            entities.SaveChanges();

            return true;
        }

        public bool AddCuttingIssueStock(List<CuttingOrderDetail> objCuttingissueDet, string Mode)
        {
            var CuttingIssueStck = new List<Cutting_Issue_Stock>();

            foreach (var item in objCuttingissueDet)
            {
                if (item.qty > 0)
                {
                    var CuttingIssueDetId = entities.Cutting_Issue_Det.Where(c => c.itemid == item.Itemid && c.CuttingIssueId == item.CuttingIssueId
                                                            && c.colorid == item.Colorid && c.sizeid == item.Sizeid).Select(d => d.CuttingIssueDetId).First();

                    CuttingIssueStck.Add(new Repository.Cutting_Issue_Stock
                    {
                        CuttingIssueId = item.CuttingIssueId,
                        CuttingIssueDetId = (CuttingIssueDetId == null ? 0 : CuttingIssueDetId),
                        StockId = item.StockId,
                        IssueQty = item.qty,
                        MarkUp_Rate = 0,
                        ReturnQty = 0,
                        LossQty = 0,
                    });
                }
            }

            foreach (var issuelst in CuttingIssueStck)
            {
                entities.Cutting_Issue_Stock.Add(issuelst);
            }

            entities.SaveChanges();

            return true;
        }

        public bool AddCuttingOrdDet(List<CuttingOrderDetail> objCuttingDet, string Mode, int ProdprgId)
        {
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var CuttingdetList = new List<Cutting_Order_Det>();

                foreach (var item in objCuttingDet)
                {
                    if (item.OrderQty > 0 || item.Issuedqty > 0)
                    {
                        //entities.Job_Ord_Det.Add(item);
                        CuttingdetList.Add(new Repository.Cutting_Order_Det
                        {
                            CuttingOrdId = item.CuttingOrderId,
                            itemid = item.Itemid,
                            colorid = item.Colorid,
                            sizeid = item.Sizeid,
                            PlannedSizeid = item.Sizeid,
                            inp_op = item.Inp_op,
                            Consumption = item.Consumption,
                            Weight = item.weight,
                            OrderQty = item.OrderQty,
                            rate = item.rate,
                            Issuedqty = item.Issuedqty,
                            receivedqty = 0,
                            Markup_Rate = item.MarkupRate,
                        });
                    }
                }

                foreach (var shiplst in CuttingdetList)
                {
                    entities.Cutting_Order_Det.Add(shiplst);
                }

                entities.SaveChanges();

                // Update OrderQty in Prod_prg_Det Begin
                var CuttingdetProdPrgList = new List<Prod_Prg_Det>();

                foreach (var prod in objCuttingDet)
                {
                    var prodordqty = entities.Prod_Prg_Det.Where(c => c.Prodprgid == ProdprgId && c.Itemid == prod.Itemid &&
                        c.Sizeid == prod.Sizeid && c.Colorid == prod.Colorid && c.InorOut == prod.Inp_op).FirstOrDefault();

                    if (prodordqty != null && prodordqty.InorOut == "O")
                    {
                        //CuttingdetProdPrgList.Add(new Repository.Prod_Prg_Det
                        //{
                        prodordqty.order_qty = prodordqty.order_qty + prod.OrderQty;
                        //});
                    }
                    else if (prodordqty != null && prodordqty.InorOut == "I")
                    {
                        //prodordqty.order_qty = prodordqty.order_qty + prod.Issuedqty;
                        prodordqty.Issue_qty = prodordqty.Issue_qty + prod.Issuedqty;
                        prodordqty.order_qty = prodordqty.order_qty + prod.Issuedqty;
                    }
                }

                entities.SaveChanges();
                // Update OrderQty in Prod_prg_Det End

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteData(int id)
        {
            var result = false;
            var itemstockList = new List<ItemStock>();

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var addl = entities.Cutting_Order_Mas.Where(c => c.CuttingOrdid == id).FirstOrDefault();

                    if (addl != null)
                    {

                        var Stckupdates = (from COM in entities.Cutting_Order_Mas
                                           join CIM in entities.Cutting_Issue_Mas on COM.CuttingOrdid equals CIM.CuttingOrdid
                                           join CIS in entities.Cutting_Issue_Stock on CIM.CuttingIssueId equals CIS.CuttingIssueId
                                           where (COM.CuttingOrdid == id)
                                           select new { CIS.StockId, CIS.IssueQty }).ToList();

                        //delete Item_Stock_outward Many Rows table
                        var ItSout = entities.Item_stock_outward.Where(c => c.joborderno == addl.Joborderno).FirstOrDefault();
                        if (ItSout != null)
                        {
                            var deleteitemstckoutward = entities.Item_stock_outward.Where(d => d.joborderno == addl.Joborderno).ToList<ProductionItem_stock_outward>();
                            deleteitemstckoutward.ForEach(c => entities.Item_stock_outward.Remove(c));
                            entities.SaveChanges();
                        }


                        //ItemStock
                        foreach (var Cuttissuestckupdates in Stckupdates)
                        {
                            //Update alloted in ItemStock
                            //var ITS = entities.ItemStock.Where(d => d.StockId == Cuttissuestckupdates.StockId).FirstOrDefault();
                            //if (ITS != null)
                            //{
                            //    ITS.alloted = (ITS.alloted - Cuttissuestckupdates.IssueQty);
                            //    ITS.balQty = (ITS.balQty + Cuttissuestckupdates.IssueQty);

                            //    entities.Proc_Apparel_UpdateItemStock(Cuttissuestckupdates.StockId, ITS.alloted, ITS.balQty);
                            //}
                            ////entities.SaveChanges();

                            if (Cuttissuestckupdates.IssueQty > 0)
                            {
                                var Pg3 = entities.Proc_Apparel_CuttingIssueItmStkUpdate(Cuttissuestckupdates.StockId, id);
                                entities.SaveChanges();
                            }

                        }

                        
                        var cuttingissuemas = entities.Cutting_Issue_Mas.Where(c => c.CuttingOrdid == id).FirstOrDefault();

                        if (cuttingissuemas != null)
                        {
                            var CuttIssStck = entities.Cutting_Issue_Stock.Where(c => c.CuttingIssueId == cuttingissuemas.CuttingIssueId).FirstOrDefault();

                            if (CuttIssStck != null)
                            {
                                //delete Cutting_Issue_Stock Many Rows table
                                var deleteCuttingIssueStck = entities.Cutting_Issue_Stock.Where(d => d.CuttingIssueId == cuttingissuemas.CuttingIssueId).ToList<Cutting_Issue_Stock>();
                                deleteCuttingIssueStck.ForEach(c => entities.Cutting_Issue_Stock.Remove(c));
                                entities.SaveChanges();
                            }

                            //delete Cutting_Issue_Det Many Rows table
                            var deletecuttingissuedet = entities.Cutting_Issue_Det.Where(d => d.CuttingIssueId == cuttingissuemas.CuttingIssueId).ToList<Cutting_Issue_Det>();
                            deletecuttingissuedet.ForEach(c => entities.Cutting_Issue_Det.Remove(c));
                            entities.SaveChanges();

                            //delete Cutting_Issue_Mas Many Rows table
                            entities.Cutting_Issue_Mas.Remove(cuttingissuemas);
                        }

                        //delete Cutting_Order_Det Many Rows table and Reverse Order qty in Prod_Prg_Det                
                        var ProdprgId = entities.Cutting_Order_Mas.Single(x => x.CuttingOrdid == id).ProdPrgid;

                        var deletecuttingorddet = entities.Cutting_Order_Det.Where(d => d.CuttingOrdId == id).ToList<Cutting_Order_Det>();
                        foreach (var CuttOrderstckupdates in deletecuttingorddet)
                        {
                            //Update OrderQty in Prod_Prg_Det
                            var PPD = entities.Prod_Prg_Det.Where(d => d.Prodprgid == ProdprgId && d.Itemid == CuttOrderstckupdates.itemid && d.Sizeid == CuttOrderstckupdates.sizeid && d.Colorid == CuttOrderstckupdates.colorid && d.InorOut == CuttOrderstckupdates.inp_op).FirstOrDefault();
                            if (PPD != null && PPD.InorOut == "O")
                            {
                                //CuttingdetProdPrgList.Add(new Repository.Prod_Prg_Det
                                //{
                                PPD.order_qty = (decimal)(PPD.order_qty) - (decimal)(CuttOrderstckupdates.OrderQty);
                                //});
                            }
                            else if (PPD != null && PPD.InorOut == "I")
                            {
                                PPD.Issue_qty = (decimal)(PPD.Issue_qty) - (decimal)(CuttOrderstckupdates.Issuedqty);
                                PPD.order_qty = (decimal)(PPD.order_qty) - (decimal)(CuttOrderstckupdates.Issuedqty);
                            }
                            //entities.SaveChanges();
                        }
                        entities.SaveChanges();

                        deletecuttingorddet.ForEach(c => entities.Cutting_Order_Det.Remove(c));
                        entities.SaveChanges();

                        //delete Cutting_Order_Mas Many Rows table
                        entities.Cutting_Order_Mas.Remove(addl);
                        entities.SaveChanges();

                       
                    }

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

    }
}
