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
    public class LotSplitUpEntryRepository : ILotSplitUpEntryRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<LotSplitUp> GetRepLotEntryLoad(string TransNo, string EType)
        {

            IQueryable<LotSplitUp> query = (from a in entities.Proc_Apparel_LotEntryShowStockDetail(TransNo, EType)
                                            select new LotSplitUp
                                              {
                                                  Company = a.Company,
                                                  Companyid = (int)a.CompanyId,
                                                  Supplier = a.Supplier,
                                                  SupplierId = (int)a.SupplierId,
                                                  OrderNo = a.Order_No,
                                                  OrderRefNo = a.Order_Ref_No,
                                                  TransType = a.TransType,
                                                  TransNo = a.TransNo,

                                              }).AsQueryable();

            return query;
        }


        public IList<LotSplitUpItem> GetRepLotItemLoad(string TransNo, string EType)
        {
            var query = (from ID in entities.Proc_Apparel_LotEntryShowStockDetail(TransNo, EType)
                         select new LotSplitUpItem
                         {
                             Orderno = ID.Order_No,
                             itemid = (int)ID.ItemId,
                             Color = ID.Color,
                             colorid = (int)ID.ColorId,
                             Size = ID.Size,
                             Sizeid = (int)ID.SizeId,
                             Item = ID.Item,
                             processid = ID.ProcessId,
                             ItemProcess = ID.Process,
                             Style = ID.Style,
                             Styleid = ID.StyleId,
                             BalQty = ID.BalQty,
                             Stockid = ID.StockId,
                             UomId = ID.UomId,
                             Uom = ID.Abbreviation,
                             Quantity = 0,
                             SNo = (int)ID.SNo,

                         }).AsQueryable();

            return query.ToList();
        }


        public int AddData(LotSplitMas objPLoEntry)
        {

            var id = entities.LotSplitMas.Add(objPLoEntry);
            entities.SaveChanges();
            return id.LotSplitMasId;

        }


        public bool AddDetData(LotSplitMas objPLoEntry, List<LotSplitDet> objPLoDet, string TransNo, DateTime EntryDate, string EntryNo, int CompId, int SuppId)
        {

            string Mode = "A";
            int StockId = 0;
            int NStockId = 0;

            int LMasId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objPLoEntry.LotSplitMasId == 0)
                    {
                        var id = entities.LotSplitMas.Add(objPLoEntry);
                        entities.SaveChanges();
                       
                    }
                    LMasId = objPLoEntry.LotSplitMasId;

                    foreach (var itemOrder in objPLoDet)
                    {


                        if (itemOrder.Quantity > 0)
                        {
                            //insert LotSplitTable
                            var Pg1 = entities.Proc_Apparel_GetLotInsertLotSplitDet(LMasId, itemOrder.itemid, itemOrder.colorid, itemOrder.Sizeid, itemOrder.Quantity, itemOrder.Stockid, itemOrder.Orderno, itemOrder.LSNo, itemOrder.Styleid, itemOrder.LotNo, itemOrder.processid);
                            entities.SaveChanges();

                            ////insert the ItemStock
                            var Pg2 = entities.Proc_Apparel_GetLotInsertItemstock(itemOrder.itemid, itemOrder.colorid, itemOrder.Sizeid, itemOrder.Quantity, itemOrder.Orderno, EntryNo, itemOrder.processid, itemOrder.LotNo, EntryDate, CompId, SuppId, itemOrder.Styleid,itemOrder.Stockid);
                            entities.SaveChanges();

                        }
                    }

                    foreach (var itemStock in objPLoDet)
                    {

                        StockId = itemStock.Stockid;

                        if (NStockId != itemStock.Stockid)
                        {
                            //Update ItemStock Alloted
                            var Pg3 = entities.Proc_Apparel_Sp_UpdateItemStock(itemStock.Stockid, EntryNo, Mode);
                            entities.SaveChanges();
                        }
                        NStockId = StockId;
                    }


                    var Pg4 = entities.Proc_Apparel_PostItemStockOutWard(EntryNo);
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "LotSplitUp-AddDetData");
                }
            }
            return reserved;

        }



        public IQueryable<LotSplitUp> GetRepLotEditEntryLoad(int LotSplitMasId, string EType)
        {
            IQueryable<LotSplitUp> query = (from a in entities.Proc_Apparel_LotEntryEditShowStockDetail(LotSplitMasId)
                                            select new LotSplitUp
                                            {
                                                Company = a.Company,
                                                Companyid = (int)a.CompanyId,
                                                Supplier = a.Supplier,
                                                SupplierId = (int)a.SupplierId,
                                                OrderNo = a.Order_No,
                                                OrderRefNo = a.Order_Ref_No,
                                                TransType = a.TransType,
                                                TransNo = a.TransNo,
                                                EntryNo = a.EntryNo,
                                                EntryDate = (DateTime)a.EntryDate,
                                                RefNo = a.RefNo,

                                            }).AsQueryable();

            return query;
        }

        public IList<LotSplitUpItem> GetRepLotEditItemLoad(int LotSplitMasId, string EType)
        {
            var query = (from ID in entities.Proc_Apparel_LotEntryEditShowStockDetail(LotSplitMasId)
                         select new LotSplitUpItem
                         {
                             Orderno = ID.Order_No,
                             itemid = (int)ID.ItemId,
                             Color = ID.Color,
                             colorid = (int)ID.ColorId,
                             Size = ID.Size,
                             Sizeid = (int)ID.SizeId,
                             Item = ID.Item,
                             processid = ID.ProcessId,
                             ItemProcess = ID.Process,
                             Style = ID.Style,
                             Styleid = ID.StyleId,
                             BalQty = (decimal)ID.BalQty,
                             Stockid = ID.StockId,
                             UomId = ID.UomId,
                             Uom = ID.Abbreviation,
                             Quantity = ID.LotQty,
                             SNo = (int)ID.SNo,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<LotSplitUpItem> GetRepLotEditSplitLoad(int? LotSplitMasId, int? StockId)
        {
            var query = (from ID in entities.Proc_Apparel_GetLotSplitEditDetails(LotSplitMasId == null ? 0 : LotSplitMasId, StockId == null ? 0 : StockId)
                         select new LotSplitUpItem
                         {
                             Orderno = ID.jobOrdNo,
                             itemid = (int)ID.itemid,
                             colorid = (int)ID.ColorId,
                             Sizeid = (int)ID.SizeId,
                             processid = ID.ProcessId,
                             Styleid = ID.StyleId,
                             Stockid = ID.stockId,
                             UomId = ID.UomId,
                             SplQty = ID.Qty,
                             LotSplitDetid = ID.lotsplitdetid,
                             LotSplitMasid = ID.LotSplitMasId,
                             LotNo = ID.LotNo,
                             LSno = ID.LsNo,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateData(LotSplitMas objPoEEntry)
        {
            var result = false;
            var App = entities.LotSplitMas.Where(c => c.LotSplitMasId == objPoEEntry.LotSplitMasId).FirstOrDefault();
            if (App != null)
            {
                App.RefNo = objPoEEntry.RefNo;
                App.EntryDate = objPoEEntry.EntryDate;
            }
            entities.SaveChanges();

            result = true;
            return result;
        }

        public bool UpdateDetData(LotSplitMas objPoEEntry, List<LotSplitDet> objPoEDet, int LotMasId, string TransNo, DateTime EntryDate, string EntryNo, int CompId)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    int StockId = 0;
                    int NStockId = 0;

                    var App = entities.LotSplitMas.Where(c => c.LotSplitMasId == objPoEEntry.LotSplitMasId).FirstOrDefault();
                    if (App != null)
                    {
                        App.RefNo = objPoEEntry.RefNo;
                        App.EntryDate = objPoEEntry.EntryDate;
                    }
                    entities.SaveChanges();


                    foreach (var k in objPoEDet)
                    {
                        var e = entities.LotSplitDet.Where(a => a.LotSplitDetId.Equals(k.LotSplitDetId)).FirstOrDefault();
                        if (e != null)
                        {


                            e.LotSplitMasId = objPoEEntry.LotSplitMasId;
                            e.LotSplitDetId = k.LotSplitDetId;
                            e.itemid = k.itemid;
                            e.Sizeid = k.Sizeid;
                            e.colorid = k.colorid;
                            e.Orderno = k.Orderno;
                            e.Styleid = k.Styleid;
                            e.LSNo = k.LSNo;
                            e.Quantity = k.Quantity;
                            e.processid = k.processid;
                            e.Stockid = k.Stockid;
                            e.LotNo = k.LotNo;
                        }
                    }

                    entities.SaveChanges();

                    foreach (var itemStockUp in objPoEDet)
                    {

                        //Update ItemStock Alloted and Qty
                        var Pg6 = entities.Proc_Apparel_GetLotEditUpdateItemstockQty(itemStockUp.LotSplitDetId);
                        entities.SaveChanges();

                    }


                    foreach (var itemStockAll in objPoEDet)
                    {

                        StockId = itemStockAll.Stockid;

                        if (NStockId != itemStockAll.Stockid)
                        {
                            //Update ItemStock Alloted
                            var Pg7 = entities.Proc_Apparel_GetLotEditAllotedItemstockQty(itemStockAll.LotSplitMasId, itemStockAll.Stockid);
                            entities.SaveChanges();
                        }
                        NStockId = StockId;
                    }


                    var Pg8 = entities.Proc_Apparel_PostItemStockOutWard(EntryNo);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "LotSplitUp-UpdateDetData");
                }
            }
            return reserved;
        }


        public bool DeleteData(List<LotSplitDet> objPoOrd, int Id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    string TransNo = "";
                    int StockId = 0;
                    int NStockId = 0;

                    foreach (var itemStockDel in objPoOrd)
                    {

                        StockId = itemStockDel.Stockid;

                        if (NStockId != itemStockDel.Stockid)
                        {
                            //Update ItemStock Alloted
                            var Pg9 = entities.Proc_Apparel_GetLotDeleteAllotedItemstockQty(itemStockDel.LotSplitMasId, itemStockDel.Stockid);
                            entities.SaveChanges();
                        }
                        NStockId = StockId;
                    }

                    //delete the itemstock  table
                    var OQuery = entities.LotSplitMas.Where(b => b.LotSplitMasId == Id).FirstOrDefault();
                    if (OQuery != null)
                    {
                        TransNo = OQuery.EntryNo;

                    }

                    entities.SaveChanges();
                    //ItemOutWard
                    var o = entities.Item_stock_outward.Where(u => u.TransNo == TransNo);

                    foreach (var i in o)
                    {
                        entities.Item_stock_outward.Remove(i);
                    }
                    entities.SaveChanges();

                    //ItemStock
                    var t = entities.ItemStock.Where(v => v.Transno == TransNo);

                    foreach (var s in t)
                    {
                        entities.ItemStock.Remove(s);
                    }


                    //Det 
                    var Det = entities.LotSplitDet.Where(u => u.LotSplitMasId == Id);

                    foreach (var d in Det)
                    {
                        entities.LotSplitDet.Remove(d);
                    }
                    entities.SaveChanges();


                    //Mas
                    var Mas = entities.LotSplitMas.Where(u => u.LotSplitMasId == Id);

                    foreach (var v in Mas)
                    {
                        entities.LotSplitMas.Remove(v);
                    }
                    entities.SaveChanges();



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "LotSplitUp-DeleteData");
                }
            }
            return reserved;
        }
    }
}