using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CSPReceiptRepository : ICSPReceiptRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.CSPReceiptDet> GetAddlist(string ordno, int styleid, int cmpid)
        {

            var query = (from YD in entities.Proc_Apparel_GetCspAddListdet(ordno, styleid, cmpid)
                         select new Domain.CSPReceiptDet
                         {

                             Itemid = (int)YD.ItemId,
                             item = YD.Item,
                             color = YD.Color,
                             Colorid = (int)YD.ColorId,
                             size = YD.Size,
                             Sizeid = (int)YD.SizeId,
                             RecvdQuantity = 0,
                             Balqty = (decimal)YD.BalQty,
                             UomId = YD.UomID,
                             uom = YD.BUom,
                             SecQty = 0,
                             SecUomID = YD.UomID,
                             secuom = YD.SUom,
                             buyordbomdetid = YD.Buy_Ord_BomDetID
                         }).AsQueryable();

            return query;
        }


        public bool AddDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    entities.CSPReceiptMas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.ReceiptID;
                    //var processid=0 ;
                    //var cmpid = 0;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Quantity > 0)
                            {
                                item.ReceiptID = Masid;
                                entities.CSPReceiptDet.Add(item);
                            }
                        }
                        entities.SaveChanges();
                    }



                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {

                            if (item.RecvdQuantity > 0)
                            {

                                var Pged = entities.Proc_Apparel_UpdRecvdqtybuydet(item.RecvdQuantity, item.buyordbomdetid);
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
                    exceplogg.SendExcepToDB(ex, "CSPReceipt-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.CSPReceiptMas> LoadMaingrid(int cmpid, int buyerid, int masid, string refno, string ordno, int styleid, string recptno, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_CSPRctLoadMainGrid(cmpid, buyerid, masid, refno, ordno, styleid, recptno, fromdate, todate)
                         select new Domain.CSPReceiptMas
                         {

                             ReceiptID = YD.ReceiptId,
                             CompanyId = YD.companyid,
                             company = YD.company,
                             Styleid = YD.styleid,
                             style = YD.style,
                             Buyerid = YD.buyerid,
                             buyer = YD.Buyer,
                             OrderNo = YD.order_no,
                             RefNo = YD.DCNo,
                             ReceiptNo = YD.ReceiptNo,
                             ReceiptDate = (DateTime)YD.ReceiptDate,
                             DCNo = YD.Ref_No,
                             Remarks = YD.Remarks,
                             //StoreUnitID = (int)YD.strunit,
                             bmasid = YD.bomid,
                             QltyMode = YD.QltyMode,
                             ParentUnitid = YD.Parentstoreid,
                             Storetype = YD.StoreType,
                             StoreName = YD.StoreName,
                             StoreUnitID = YD.StoreUnitId,
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.CSPReceiptDet> GetEditlist(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_GetCSPEditdetlist(masid)
                         select new Domain.CSPReceiptDet
                         {

                             Itemid = (int)YD.ItemId,
                             item = YD.Item,
                             color = YD.Color,
                             Colorid = (int)YD.ColorId,
                             size = YD.Size,
                             Sizeid = (int)YD.SizeId,
                             RecvdQuantity = YD.Quantity,
                             Balqty = (decimal)YD.BalQty,
                             UomId = YD.UomID,
                             uom = YD.BUom,
                             SecQty = YD.SecQty,
                             SecUomID = YD.UomID,
                             secuom = YD.sUom,
                             buyordbomdetid = YD.BomDetID,
                             AcceptQty=YD.AcceptQty,
                             RejectedQty=YD.RejectedQty,
                             Oldrejqty=YD.RejectedQty,
                             Oldaccpqty=YD.AcceptQty
                         }).AsQueryable();

            return query;
        }


        public bool UpdDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.CSPReceiptMas.Where(c => c.ReceiptID == obj.ReceiptID).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.ReceiptID = obj.ReceiptID;
                        Upd.ReceiptNo = obj.ReceiptNo;
                        Upd.ReceiptDate = obj.ReceiptDate;
                        Upd.RefNo = obj.RefNo;
                        Upd.Remarks = obj.Remarks;
                        Upd.CompanyId = obj.CompanyId;
                        Upd.Buyerid = obj.Buyerid;
                        Upd.Styleid = obj.Styleid;
                        Upd.OrderNo = obj.OrderNo;
                        Upd.StoreUnitID = obj.StoreUnitID;
                        Upd.Automated = obj.Automated;


                        entities.SaveChanges();

                    }





                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.ReceiptID;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.CSPReceiptDet.Where(d => d.ReceiptID == id).ToList<CSPReceiptDet>();

                    deletedet.ForEach(c => entities.CSPReceiptDet.Remove(c));
                    entities.SaveChanges();

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Quantity > 0)
                            {
                                item.ReceiptID = obj.ReceiptID;
                                entities.CSPReceiptDet.Add(item);
                            }
                        }
                        entities.SaveChanges();
                    }


                    //if (objrecdet != null && objrecdet.Count > 0)
                    //{
                    //    foreach (var item in objrecdet)
                    //    {

                    //        if (item.RecvdQuantity > 0)
                    //        {

                    //            //var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.RecvdQuantity, item.buyordbomdetid);
                    //            //entities.SaveChanges();

                    //            var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.AcceptQty, item.buyordbomdetid, "A");
                    //            entities.SaveChanges();


                    //        }
                    //    }

                    //}

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CSPReceipt-UpdDetData");
                }
            }
            return reserved;
        }


        public bool DelDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.ReceiptID;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.CSPReceiptDet.Where(d => d.ReceiptID == id).ToList<CSPReceiptDet>();

                    deletedet.ForEach(c => entities.CSPReceiptDet.Remove(c));
                    entities.SaveChanges();



                    var Mas = entities.CSPReceiptMas.Where(u => u.ReceiptID == id);

                    foreach (var v in Mas)
                    {
                        entities.CSPReceiptMas.Remove(v);
                    }
                    entities.SaveChanges();

                    int rcvd = 0;
                    //if (objrecdet != null && objrecdet.Count > 0)
                    //{
                    //    foreach (var item in objrecdet)
                    //    {

                    //        if (item.RecvdQuantity > 0)
                    //        {

                    //           // var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.AcceptQty, item.buyordbomdetid, "A");
                    //            //entities.SaveChanges();


                    //        }
                    //    }

                    //}

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CSPReceipt-DelDetData");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.CSPReceiptMas> GetQltyAddlist(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_CSPQltyAddHeader(masid)
                         select new Domain.CSPReceiptMas
                         {
                             ReceiptID = masid,
                             ReceiptNo = YD.Receiptno,
                             ReceiptDate = (DateTime)YD.Receiptdate,
                             CompanyId = YD.Companyid,
                             company = YD.Company,
                             Buyerid = YD.Buyerid,
                             buyer = YD.Buyer,
                             Styleid = YD.Styleid,
                             style = YD.Style,
                             RefNo = YD.Brefno,
                             OrderNo = YD.Orderno,
                             DCNo = YD.Refno,
                             StoreUnitID=YD.StoreUnitID,
                             Remarks=YD.Remarks
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.CSPReceiptDet> GetQltyAdddetlist(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_CSPQtyAdddetlist(masid)
                         select new Domain.CSPReceiptDet
                         {

                             Itemid = (int)YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             Colorid = (int)YD.Colorid,
                             size = YD.Size,
                             Sizeid = (int)YD.Sizeid,
                             RecvdQuantity = (decimal)YD.Quantity,
                             Balqty = (decimal)YD.Quantity,
                             UomId = YD.BUomid,
                             uom = YD.Uom,
                             SecQty = YD.SecQty,
                             SecUomID = (int)YD.secUOMID,
                             secuom = YD.sUom,
                             buyordbomdetid = YD.Buy_Ord_BomDetID,
                             AcceptQty = YD.AcceptQty,
                             RejectedQty = YD.RejectedQty,
                             Oldaccpqty=YD.AcceptQty,
                             Oldrejqty=YD.RejectedQty
                         }).AsQueryable();

            return query;
        }


        public bool AddQltyDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.AcceptQty > 0 || item.RejectedQty>0)
                            {
                                var Pged = entities.Proc_Apparel_UpdRecvdqtycspdet(item.AcceptQty, item.RejectedQty, item.ReceiptID, item.Itemid, item.Colorid, item.Sizeid);
                                entities.SaveChanges();
                            }
                        }
                        entities.SaveChanges();
                    }



                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {

                            if (item.AcceptQty > 0)
                            {

                                var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.AcceptQty, item.buyordbomdetid, "A",item.ReceiptDetId);
                                entities.SaveChanges();


                            }
                        }

                    }

                    var itmcat = "B";
                    int? allot = 0;
                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {

                            if (item.AcceptQty > 0)
                            {

                                var Pgede = entities.Proc_Apparel_CspInsertitemstock(item.unitid, item.Itemid, item.Colorid, item.Sizeid, item.AcceptQty, item.jobordno, item.recptno, itmcat, item.recptdate, item.cmpid, item.UomId, item.styleid, item.struntid);
                                entities.SaveChanges();


                            }
                            if (item.RejectedQty > 0)
                            {

                                var Pgede = entities.Proc_Apparel_CspInsertitemstock(item.unitid, item.Itemid, item.Colorid, item.Sizeid, item.RejectedQty, item.jobordno, item.recptno, itmcat, item.recptdate, item.cmpid, item.UomId, item.styleid, item.struntid);
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
                    exceplogg.SendExcepToDB(ex, "CSPReceipt-AddQltyDetData");
                }
            }
            return reserved;
        }


        public bool UpdQltyDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {
                            if (item.AcceptQty > 0)
                            {
                                var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.Oldaccpqty, item.buyordbomdetid, "D", item.ReceiptDetId);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.AcceptQty > 0 || item.RejectedQty > 0)
                            {
                                var Pged = entities.Proc_Apparel_UpdRecvdqtycspdet(item.AcceptQty, item.RejectedQty, item.ReceiptID, item.Itemid, item.Colorid, item.Sizeid);
                                entities.SaveChanges();
                            }
                        }
                        entities.SaveChanges();
                    }



                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {

                            if (item.AcceptQty > 0)
                            {

                                var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.AcceptQty, item.buyordbomdetid, "A",item.ReceiptDetId);
                                entities.SaveChanges();


                            }
                        }

                    }


                    var trans = obj.ReceiptNo;

                    var deletedet = entities.ItemStock.Where(d => d.Transno == trans).ToList<ItemStock>();

                    deletedet.ForEach(c => entities.ItemStock.Remove(c));
                    entities.SaveChanges();

                    var itmcat = "B";
                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {

                            if (item.AcceptQty > 0)
                            {

                                var Pgede = entities.Proc_Apparel_CspInsertitemstock(item.unitid, item.Itemid, item.Colorid, item.Sizeid, item.AcceptQty, item.jobordno, item.recptno, itmcat, item.recptdate, item.cmpid, item.UomId, item.styleid, item.struntid);
                                entities.SaveChanges();


                            }
                            if (item.RejectedQty > 0)
                            {

                                var Pgede = entities.Proc_Apparel_CspInsertitemstock(item.unitid, item.Itemid, item.Colorid, item.Sizeid, item.RejectedQty, item.jobordno, item.recptno, itmcat, item.recptdate, item.cmpid, item.UomId, item.styleid, item.struntid);
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
                    exceplogg.SendExcepToDB(ex, "CSPReceipt-UpdQltyDetData");
                }
            }
            return reserved;
        }


        public bool DeleteQltyDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.AcceptQty > 0 || item.RejectedQty > 0)
                            {
                                var Pged = entities.Proc_Apparel_UpdRecvdqtycspdet(0, 0, item.ReceiptID, item.Itemid, item.Colorid, item.Sizeid);
                                entities.SaveChanges();
                            }
                        }
                        entities.SaveChanges();
                    }


                    if (objrecdet != null && objrecdet.Count > 0)
                    {
                        foreach (var item in objrecdet)
                        {
                            if (item.AcceptQty > 0)
                            {
                                var Pged = entities.Proc_Apparel_UpdDelRecvdqtybuydet(item.AcceptQty, item.buyordbomdetid, "D", item.ReceiptDetId);
                                entities.SaveChanges();
                            }
                        }

                    }

                    var trans = obj.ReceiptNo;

                    var deletedet = entities.ItemStock.Where(d => d.Transno == trans).ToList<ItemStock>();

                    deletedet.ForEach(c => entities.ItemStock.Remove(c));
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CSPReceipt-DeleteQltyDetData");
                }
            }
            return reserved;
        }
    }
}
