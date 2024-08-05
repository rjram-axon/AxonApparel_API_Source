using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class StockRequestRepository : IStockRequestRepository
    {
        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        FasoSCMEntities SCMentities = new FasoSCMEntities();

        //public IQueryable<Domain.StockRequestDet> Loadgrid(int Reqstno,int Entryno)
        //{      
        //    var query = (from YD in SCMentities.Proc_SCM_StockRequest(Reqstno, Entryno)
        //                 select new StockRequestDet
        //                 {
        //                     StockReqDetID = YD.StockReqDetID,
        //                     EntryDate = (DateTime)YD.EntryDate,
        //                     Quantity = (decimal)YD.Quantity,
        //                     EntryNo = YD.EntryNo,
        //                     SKUstkno = YD.SKUNO
        //                 }).AsQueryable();

        //    return query;
        //}
        public IQueryable<Domain.BoxDespatchMas> LoadMaingrid(int Companyid, int Despatchid, string fromdate, string Todate)
        {
            var query = (from YD in entities.Proc_Apparel_StockRequestMain(Companyid, Despatchid, fromdate, Todate)
                         select new BoxDespatchMas
                         {
                             Company = YD.Company,
                             Companyid = YD.CompanyId,
                             DespatchId = YD.despatchid,
                             DespatchNo = YD.despatchno,
                             DespatchDate = (DateTime)YD.despatchdate,
                             DespatchDetid = YD.despatchdetid,
                             DespatchStockid = YD.despatchstockid,
                             StockId = YD.stockid

                         }).AsQueryable();
            return query;
        }
        public IQueryable<Domain.StockRequestDet> GetitmRepEditGrid(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_StockRequestinputEdit(masid)
                         select new StockRequestDet
                         {
                             StockReqDetID = YD.StockReqDetID,
                             BalQuantity = (decimal)YD.Balqty + (decimal)YD.IssueQty,
                             Color = YD.Color,
                             Size = YD.Size,
                             IssuQuantity = (decimal)YD.IssueQty,
                             uom = YD.uom,
                             EntryNo = YD.EntryNo,
                             SKUstkno = YD.SKUstkno,
                             Quantity = (decimal)YD.qty

                         }).AsQueryable();
            return query;
        }

        public IQueryable<Domain.ItmStkDet> GetitmRepEditStockGrid(int masid)
        {
        IQueryable<Domain.ItmStkDet> query = (from YD in entities.Proc_Apparel_StockItemQntyEdit(masid)
                                                select new Domain.ItmStkDet
                                                {
                                                    Transno = YD.Transno,
                                                    transdate = (DateTime)YD.transdate,
                                                    qty = (decimal)YD.Qty,
                                                    IssueQty = (decimal)YD.issueQty,
                                                    StockId = YD.StockId,
                                                    companyid = YD.Companyid,
                                                    company = YD.Company,
                                                    skuno=YD.SkuNo,
                                                    OldQty=YD.OldQty

                                                }).ToList().AsQueryable();

            return query;
        }

        public bool Add(Box_Despatch_mas despmas, List<Box_Despatch_Det> stkreqList, List<Box_Despatch_Stock> ItmskList)
        {
            int despatchMasId = 0;
            int despatchDetId = 0;
            DateTime dt = (DateTime)despmas.DespatchDate;
            string Date = dt.ToString("yyyy-MM-dd HH:mm:ss.FFF");

            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (despmas.DespatchId == 0)
                    {
                        entities.Box_Despatch_mas.Add(despmas);
                        entities.SaveChanges();
                        despatchMasId = despmas.DespatchId;
                        foreach (var item in stkreqList)
                        {
                            item.DespatchId = despatchMasId;
                            entities.Box_Despatch_Det.Add(item);
                            entities.SaveChanges();
                            despatchDetId = item.DespatchDetid;

                            foreach (var itemStk in ItmskList)
                            {                                
                                itemStk.DespatchId = despatchMasId;
                                itemStk.DespatchDetid = despatchDetId;
                                itemStk.OldQty = itemStk.Qty;
                                entities.Box_Despatch_Stock.Add(itemStk);

                                ////Update the Old ItemStock 
                                var Pg3 = entities.Proc_Apparel_BoxDespatchUpdItmstk(itemStk.Qty, Date, despmas.DespatchNo,itemStk.StockId);
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
                    exceplogg.SendExcepToDB(ex, "PurchaseGrn-AddDetData");
                }

            }
            return reserved;
        }

        public bool UpdateDetData(Box_Despatch_mas despmas, List<Box_Despatch_Det> stkreqList, List<Box_Despatch_Stock> ItmskList)
        {
            int despatchMasId = 0;
            int despatchDetId = 0;
            DateTime dt = (DateTime)despmas.DespatchDate;
            string Date = dt.ToString("yyyy-MM-dd HH:mm:ss.FFF");
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (despmas.DespatchId > 0)
                    {

                        var CDet = entities.Box_Despatch_Stock.Where(u => u.DespatchId == despmas.DespatchId);

                        foreach (var v in CDet)
                        {
                            entities.Box_Despatch_Stock.Remove(v);
                        }

                        //BoxDet 
                        var Det = entities.Box_Despatch_Det.Where(u => u.DespatchId == despmas.DespatchId);

                        foreach (var d in Det)
                        {
                            entities.Box_Despatch_Det.Remove(d);
                        }
                        entities.SaveChanges();

                        //Mas
                        var Mas = entities.Box_Despatch_mas.Where(u => u.DespatchId == despmas.DespatchId);

                        foreach (var v in Mas)
                        {
                            entities.Box_Despatch_mas.Remove(v);
                        }
                        entities.SaveChanges();

                        foreach (var itemStk in ItmskList)
                        {
                            if (itemStk.Qty > 0)
                            {
                                ////Delete the Old ItemStock 
                                var Pg3 = entities.Proc_Apparel_BoxDespatchAllotEditUpdItmstk(itemStk.OldQty, despmas.DespatchNo, itemStk.StockId);
                                entities.SaveChanges();
                            }
                        }                       
                        entities.Box_Despatch_mas.Add(despmas);
                        entities.SaveChanges();
                        despatchMasId = despmas.DespatchId;
                        foreach (var item in stkreqList)
                        {
                            item.DespatchId = despatchMasId;
                            entities.Box_Despatch_Det.Add(item);
                            entities.SaveChanges();
                            despatchDetId = item.DespatchDetid;

                            foreach (var itemStk in ItmskList)
                            {
                                itemStk.DespatchId = despatchMasId;
                                itemStk.DespatchDetid = despatchDetId;
                                itemStk.OldQty = itemStk.Qty;
                                entities.Box_Despatch_Stock.Add(itemStk);

                                var Pg3 = entities.Proc_Apparel_BoxDespatchUpdItmstk(itemStk.Qty, Date, despmas.DespatchNo, itemStk.StockId);
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
                    exceplogg.SendExcepToDB(ex, "PurchaseGrn-AddDetData");
                }
            }
            return reserved;
        }

        public bool DeleteDetData(Box_Despatch_mas despmas, List<Box_Despatch_Det> stkreqList, List<Box_Despatch_Stock> ItmskList)
        {
            int despatchMasId = 0;
            int despatchDetId = 0;
            bool reserved = false;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (despmas.DespatchId > 0)
                    {
                        //Edit case
                        //BoxStock
                        var CDet = entities.Box_Despatch_Stock.Where(u => u.DespatchId == despmas.DespatchId);

                        foreach (var v in CDet)
                        {
                            entities.Box_Despatch_Stock.Remove(v);
                        }

                        //BoxDet 
                        var Det = entities.Box_Despatch_Det.Where(u => u.DespatchId == despmas.DespatchId);
                        foreach (var d in Det)
                        {
                            entities.Box_Despatch_Det.Remove(d);
                        }
                        entities.SaveChanges();
                        //Mas
                        var Mas = entities.Box_Despatch_mas.Where(u => u.DespatchId == despmas.DespatchId);

                        foreach (var v in Mas)
                        {
                            entities.Box_Despatch_mas.Remove(v);
                        }
                        entities.SaveChanges();
                        foreach (var itemStk in ItmskList)
                        {
                            if (itemStk.Qty > 0)
                            {
                                ////Delete the Old ItemStock 
                                var Pg3 = entities.Proc_Apparel_BoxDespatchAllotEditUpdItmstk(itemStk.OldQty, despmas.DespatchNo, itemStk.StockId);
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
                    exceplogg.SendExcepToDB(ex, "PurchaseGrn-AddDetData");
                }
            }
            return reserved;
        }

        public IQueryable<Domain.StockRequestDet> LoadQntygrid(string SkuNo)
        {
            var query = (from YD in SCMentities.Proc_SCM_StockRequestQnty(SkuNo)
                             select new StockRequestDet
                             {
                                 StockReqDetID=YD.StockReqDetID,
                                 BalQuantity = (decimal)YD.Balqty,
                                 Color = YD.Color,
                                 Size = YD.Size,
                                 IssuQuantity = (decimal)YD.IssueQty,
                                 uom = YD.uom,
                                 EntryNo = YD.EntryNo,
                                 SKUstkno = YD.SKUstkno,
                                 Quantity = (decimal)YD.qty
                             }).AsQueryable();         
            
            return query;
        }
        public IQueryable<Domain.ItmStkDet> LoadgridItmstock(string SkuNo)
        {
            IQueryable<Domain.ItmStkDet> query = (from YD in entities.Proc_StockItemQnty(SkuNo)
                                                  select new Domain.ItmStkDet
                         {
                             Transno = YD.Transno,
                             transdate = (DateTime)YD.transdate,
                             qty = (decimal)YD.Qty,
                             IssueQty = (decimal)YD.issueQty,
                             skuno = YD.SkuNo,
                             companyid = YD.Companyid,
                             company = YD.Company,
                             StockId = YD.StockId
                         }).ToList().AsQueryable();
            return query;
        }
        public IQueryable<StockRequestDet> GetRepSknDetails()
        {
            var query = (from YD in SCMentities.Proc_SCM_StockReqstSKUno()
                         select new StockRequestDet
                         {
                             StockReqDetID = YD.StockReqDetID,
                             SKUstkno = YD.SKUNO

                         }).AsQueryable();

            return query;
        }
        public IQueryable<BoxDespatchMas> GetRepDespatchNo()
        {
            IQueryable<BoxDespatchMas> query = (from YD in entities.Box_Despatch_mas
                         select new BoxDespatchMas
                         {
                             DespatchId = YD.DespatchId,
                             DespatchNo = YD.DespatchNo

                         }).ToList().AsQueryable();

            return query;
        }      
        public IQueryable<StockRequestDet> GetRepReqstDetails()
        {
            var query = (from YD in SCMentities.Proc_SCM_StockReqstReqstno()
                         select new StockRequestDet
                         {
                             StockReqMasID = YD.StockReqMasID,
                             EntryNo = YD.Reqstno

                         }).AsQueryable();

            return query;
        }

        public IQueryable<StockRequestDet> Loadgrid(int? Reqstno, int? Entryno)
        {
            var query = (from YD in SCMentities.Proc_SCM_StockRequest(Reqstno, Entryno)
                         select new StockRequestDet
                         {
                             StockReqDetID = YD.StockReqDetID,
                             EntryDate = (DateTime)YD.EntryDate,
                             Quantity = (decimal)YD.Quantity,
                             EntryNo = YD.EntryNo,
                             SKUstkno = YD.SKUNO
                         }).AsQueryable();

            return query;
        }
    }
}
