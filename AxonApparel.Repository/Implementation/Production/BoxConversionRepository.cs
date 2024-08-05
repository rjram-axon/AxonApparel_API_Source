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

namespace AxonApparel.Repository
{
    public class BoxConversionRepository : IBoxConversionRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        FasoSCMEntities SCMentities = new FasoSCMEntities();

        public IQueryable<BoxConversionMas> GetRepSknDetails()
        {
            var query = (from YD in SCMentities.Proc_SCM_LoadSKNNo()
                         select new BoxConversionMas
                         {
                             SKUMasID = YD.SKUMasID,
                             SKUNo = YD.SKUNo,

                         }).AsQueryable();

            return query;

        }
        public IQueryable<BoxConversionDet> Loaditmsgrid(int masid)
        {
            var query = (from YD in SCMentities.Proc_SCM_LoadSKNItemDetails(masid)
                         select new BoxConversionDet
                         {
                             StyleId = (int)YD.StyleID,
                             ColorId = (int)YD.ColorID,
                             SizeId = (int)YD.SizeID,
                             Style = YD.Style,
                             Size = YD.size,
                             Color = YD.Color,
                             BoxQty = YD.Box,
                             OldBoxQty = 0,
                             PcsQty = (decimal)YD.pcs,

                         }).AsQueryable();

            return query;
        }


        public IQueryable<BulkOrder> GetDataRepRefNoDetails(int OrdNo)
        {
            IQueryable<BulkOrder> query = (from a in entities.Proc_Apparel_GetBulkOrderRefNo(OrdNo)
                                           select new BulkOrder
                                           {
                                               Buy_Ord_MasId = (int)a.Buy_Ord_MasId,
                                               Ref_No = a.Ref_No,

                                           }).AsQueryable();

            return query;
        }


        public IQueryable<BulkOrder> GetDataRepOrdNoDetails(int OrdNo)
        {
            IQueryable<BulkOrder> query = (from a in entities.Proc_Apparel_GetBulkOrderOrderNo(OrdNo)
                                           select new BulkOrder
                                           {
                                               Buy_Ord_MasId = (int)a.Buy_Ord_MasId,
                                               Order_No = a.order_no,

                                           }).AsQueryable();

            return query;
        }


        public IQueryable<BoxConversionStock> LoadRepitmStockgrid(int masid, int SknMasId)
        {
            int ColorId = 0;
            int SizeId = 0;
            var query = (from YD in entities.Proc_Apparel_LoadSKNStockDetails(masid, SizeId, ColorId, SknMasId)
                         select new BoxConversionStock
                         {
                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.sizeid,
                             ItemStockId = (int)YD.stockid,
                             Size = YD.size,
                             Color = YD.color,
                             Item = YD.item,
                             StockQty = (decimal)(YD.balqty),
                             TransNo = YD.transno,
                             AllotedQty = 0,
                             OldPcsQty = 0,
                             PcsQty = (decimal)YD.pcsqty,
                             Rate = (decimal)YD.rate,

                         }).AsQueryable();

            return query;
        }
        public bool AddDetData(Box_Con_Mas objPoEntry, List<Box_Con_Det> objPoDet, List<Box_Con_Stock> objPoStk, decimal Brate)
        {

            int BxMasId = 0;
            int BxDetId = 0;

            DateTime dt = (DateTime)objPoEntry.BoxConDate;
            string Date = dt.ToString("yyyy-MM-dd HH:mm:ss.FFF");

            bool reserved = false;


            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objPoEntry.BoxConMasId == 0)
                    {




                        entities.Box_Con_Mas.Add(objPoEntry);
                        entities.SaveChanges();
                        BxMasId = objPoEntry.BoxConMasId;
                        foreach (var item in objPoDet)
                        {
                            item.BoxConMasId = BxMasId;
                            entities.Box_Con_Det.Add(item);
                            entities.SaveChanges();
                            BxDetId = item.BoxConDetId;

                            foreach (var itemStk in objPoStk)
                            {
                                if (itemStk.AllotedQty > 0)
                                {
                                    itemStk.BoxConMasId = BxMasId;
                                    itemStk.BoxConDetId = BxDetId;
                                    itemStk.OldAllotedQty = itemStk.AllotedQty;
                                    entities.Box_Con_Stock.Add(itemStk);


                                    ////Update the Old ItemStock 
                                    var Pg3 = entities.Proc_Apparel_BoxIssAllotUpdItmstk(itemStk.AllotedQty, Date, objPoEntry.BoxConNo, itemStk.Rate, itemStk.ItemStockId);
                                    entities.SaveChanges();

                                }
                            }


                        }


                        foreach (var stk in objPoDet)
                        {
                            if (stk.BoxQty > 0)
                            {
                                var Pg8 = entities.Proc_Apparel_BoxIssInsertItemStk(objPoEntry.OrderNo, stk.BoxQty, stk.PcsQty, stk.ColorId, stk.SizeId, Brate, objPoEntry.BoxConNo, Date, objPoEntry.CompanyId, objPoEntry.StoreId);
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



        public IQueryable<BoxConversionMas> LoadMaingrid(int? CompanyId, int? StoreId, string BoxConNo, string OrderNo, string FromDate, string ToDate, int? BoxMasId)
        {
            var query = (from YD in entities.Proc_Apparel_BoxLoadMainGrid(CompanyId, StoreId, BoxConNo, OrderNo, FromDate, ToDate)
                         select new BoxConversionMas
                         {
                             Company = YD.Company,
                             CompanyId = YD.CompanyId,
                             Store = YD.StoreName,
                             StoreId = YD.StoreId,
                             BoxConNo = YD.BoxConNo,
                             BoxConMasId = YD.BoxMasId,
                             BMasId = YD.BMasId,
                             RefNo = YD.RefNo,
                             OrderNo = YD.OrdNo,
                             Remarks = YD.Remarks,
                             SKUNo = YD.StkConNo,
                             BoxConDate = (DateTime)YD.BoxConDate,
                             BoxConDcDate = (DateTime)YD.BoxConDate,
                             OType = YD.OType,
                             SKUMasID = YD.SktConMasId,

                         }).AsQueryable();

            return query;
        }


        public IQueryable<BoxConversionDet> GetitmRepEditGrid(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_BoxLoadEditItemGrid(masid)
                         select new BoxConversionDet
                         {
                             StyleId = (int)YD.StyleID,
                             ColorId = (int)YD.ColorID,
                             SizeId = (int)YD.SizeID,
                             Style = YD.Style,
                             Size = YD.Size,
                             Color = YD.Color,
                             BoxQty = YD.Box,
                             //OldBoxQty = YD.OldBoxQty,
                             PcsQty = (decimal)YD.pcsqty,
                             BoxConDetId = YD.BoxConDetId,
                             BoxConMasId = YD.BoxConMasId,

                         }).AsQueryable();

            return query;
        }

        public IQueryable<BoxConversionStock> GetitmRepEditStockGrid(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_LoadSKNStockEditDetails(masid)
                         select new BoxConversionStock
                         {
                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.sizeid,
                             ItemStockId = (int)YD.stockid,
                             Size = YD.size,
                             Color = YD.color,
                             Item = YD.item,
                             StockQty = (decimal)(YD.balqty),
                             TransNo = YD.transno,
                             AllotedQty = (decimal)(YD.allotedQty),
                             OldPcsQty = (decimal)(YD.OldallotedQty),
                             PcsQty = (decimal)YD.pcsqty,
                             Rate = (decimal)YD.rate,
                             BoxConDetId = (int)YD.BoxConDetId,
                             BoxConMasId = (int)YD.BoxConMasId,
                             BoxConStockId = YD.BoxConStockId,
                         }).AsQueryable();

            return query;
        }


        public bool UpdateDetData(Box_Con_Mas objEPoEntry, List<Box_Con_Det> objEPoDet, List<Box_Con_Stock> objEPoStk, decimal Brate)
        {
            int BxMasId = 0;
            int BxDetId = 0;

            DateTime dt = (DateTime)objEPoEntry.BoxConDate;
            string Date = dt.ToString("yyyy-MM-dd HH:mm:ss.FFF");

            bool reserved = false;


            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objEPoEntry.BoxConMasId > 0)
                    {


                        //Edit case
                        //BoxStock
                        var CDet = entities.Box_Con_Stock.Where(u => u.BoxConMasId == objEPoEntry.BoxConMasId);

                        foreach (var v in CDet)
                        {
                            entities.Box_Con_Stock.Remove(v);
                        }

                        //BoxDet 
                        var Det = entities.Box_Con_Det.Where(u => u.BoxConMasId == objEPoEntry.BoxConMasId);

                        foreach (var d in Det)
                        {
                            entities.Box_Con_Det.Remove(d);
                        }
                        entities.SaveChanges();

                        //Mas
                        var Mas = entities.Box_Con_Mas.Where(u => u.BoxConMasId == objEPoEntry.BoxConMasId);

                        foreach (var v in Mas)
                        {
                            entities.Box_Con_Mas.Remove(v);
                        }
                        entities.SaveChanges();

                        foreach (var stk in objEPoDet)
                        {
                            if (stk.BoxQty > 0)
                            {
                                var Pg8 = entities.Proc_Apparel_BoxIssDeleteItemStk(objEPoEntry.BoxConNo);
                                entities.SaveChanges();

                            }

                        }

                        foreach (var itemStk in objEPoStk)
                        {
                            if (itemStk.AllotedQty > 0)
                            {

                                ////Delete the Old ItemStock 
                                var Pg3 = entities.Proc_Apparel_BoxIssAllotEditUpdItmstk(itemStk.OldAllotedQty, objEPoEntry.BoxConNo, itemStk.ItemStockId);
                                entities.SaveChanges();

                            }
                        }
                        //

                        entities.Box_Con_Mas.Add(objEPoEntry);
                        entities.SaveChanges();
                        BxMasId = objEPoEntry.BoxConMasId;
                        foreach (var item in objEPoDet)
                        {
                            item.BoxConMasId = BxMasId;
                            entities.Box_Con_Det.Add(item);
                            entities.SaveChanges();
                            BxDetId = item.BoxConDetId;

                            foreach (var itemStk in objEPoStk)
                            {
                                if (itemStk.AllotedQty > 0)
                                {
                                    itemStk.BoxConMasId = BxMasId;
                                    itemStk.BoxConDetId = BxDetId;
                                    itemStk.OldAllotedQty = itemStk.AllotedQty;
                                    entities.Box_Con_Stock.Add(itemStk);


                                    ////Update the Old ItemStock 
                                    var Pg3 = entities.Proc_Apparel_BoxIssAllotUpdItmstk(itemStk.AllotedQty, Date, objEPoEntry.BoxConNo, itemStk.Rate, itemStk.ItemStockId);
                                    entities.SaveChanges();

                                }
                            }


                        }


                        foreach (var stk in objEPoDet)
                        {
                            if (stk.BoxQty > 0)
                            {
                                var Pg8 = entities.Proc_Apparel_BoxIssInsertItemStk(objEPoEntry.OrderNo, stk.BoxQty, stk.PcsQty, stk.ColorId, stk.SizeId, Brate, objEPoEntry.BoxConNo, Date, objEPoEntry.CompanyId, objEPoEntry.StoreId);
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


        public bool DeleteDetData(Box_Con_Mas objDPoEntry, List<Box_Con_Det> objDPoDet, List<Box_Con_Stock> objDPoStk, decimal Brate)
        {
            int BxMasId = 0;
            int BxDetId = 0;

            DateTime dt = (DateTime)objDPoEntry.BoxConDate;
            string Date = dt.ToString("yyyy-MM-dd HH:mm:ss.FFF");

            bool reserved = false;


            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objDPoEntry.BoxConMasId > 0)
                    {


                        //Delete case
                        //BoxStock
                        var CDet = entities.Box_Con_Stock.Where(u => u.BoxConMasId == objDPoEntry.BoxConMasId);

                        foreach (var v in CDet)
                        {
                            entities.Box_Con_Stock.Remove(v);
                        }

                        //BoxDet 
                        var Det = entities.Box_Con_Det.Where(u => u.BoxConMasId == objDPoEntry.BoxConMasId);

                        foreach (var d in Det)
                        {
                            entities.Box_Con_Det.Remove(d);
                        }
                        entities.SaveChanges();

                        //Mas
                        var Mas = entities.Box_Con_Mas.Where(u => u.BoxConMasId == objDPoEntry.BoxConMasId);

                        foreach (var v in Mas)
                        {
                            entities.Box_Con_Mas.Remove(v);
                        }
                        entities.SaveChanges();

                        foreach (var stk in objDPoDet)
                        {
                            if (stk.BoxQty > 0)
                            {
                                var Pg8 = entities.Proc_Apparel_BoxIssDeleteItemStk(objDPoEntry.BoxConNo);
                                entities.SaveChanges();

                            }

                        }

                        foreach (var itemStk in objDPoStk)
                        {
                            if (itemStk.AllotedQty > 0)
                            {

                                ////Delete the Old ItemStock 
                                var Pg3 = entities.Proc_Apparel_BoxIssAllotEditUpdItmstk(itemStk.OldAllotedQty, objDPoEntry.BoxConNo, itemStk.ItemStockId);
                                entities.SaveChanges();

                            }
                        }
                        //

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
    }
}
