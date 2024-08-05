using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;


namespace AxonApparel.Repository
{
    public class ReviseMarkupRepository : IReviseMarkupRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        PurchaseEntities skentities = new PurchaseEntities();
        public IQueryable<ItmStkDet> LoadMaingrid(string OrdNo, string RefNo, string Tranno, int ItemId, int PrdId, int CompId, string tyid)
        {
            try
            {
                var query = (from YD in entities.Proc_Apparel_ReviseRateMainGrid(string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Tranno) ? "" : Tranno, ItemId == null ? 0 : ItemId, PrdId == null ? 0 : PrdId, CompId == null ? 0 : CompId, string.IsNullOrEmpty(tyid) ? "" : tyid)
                             select new ItmStkDet
                             {
                                 item = YD.item,
                                 Itemid = (int)YD.itemid,
                                 color = YD.color,
                                 size = YD.size,
                                 StockId = YD.stockid,
                                 Transno = YD.TransNo,
                                 uom = YD.Uom,
                                 Markup_Rate = YD.MarkUp_Rate,
                                 qty = YD.Qty,
                                 refno = YD.refno,
                                 joborderNo = YD.OrdNo,
                                 supplier = YD.Supp,
                                 supplierid = YD.supplierId,
                                 ProcessName=YD.process,
                             }).AsQueryable();

                return query;
            }
            catch (Exception ex)
            {
                var query = (from YD in entities.Proc_Apparel_ReviseRateMainGrid(string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Tranno) ? "" : Tranno, ItemId == null ? 0 : ItemId, PrdId == null ? 0 : PrdId, CompId == null ? 0 : CompId, string.IsNullOrEmpty(tyid) ? "" : tyid)
                             select new ItmStkDet
                             {

                                 item = YD.item,
                                 Itemid = (int)YD.itemid,
                                 color = YD.color,
                                 size = YD.size,
                                 StockId = YD.stockid,
                                 Transno = YD.TransNo,
                                 uom = YD.Uom,
                                 Markup_Rate = YD.MarkUp_Rate,
                                 qty = YD.Qty,
                             }).AsQueryable();

                return query;

            }
        }


        public bool UpdateDetData(List<ItemStock> objPEID)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {                                        
                    foreach (var k in objPEID)
                    {
                        var e = skentities.ItemStock.Where(a => a.StockId.Equals(k.StockId)).FirstOrDefault();
                        if (e != null)
                        {
                            e.Markup_Rate = k.Markup_Rate;

                        }
                    }
                    skentities.SaveChanges();                                        

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
    }
}
