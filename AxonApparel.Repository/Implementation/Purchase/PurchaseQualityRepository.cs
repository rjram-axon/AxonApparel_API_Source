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
    public class PurchaseQualityRepository : IPurchaseQualityRepository
    {
        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<PurchaseGrnMas> GetDataQualityRepDetails(int Id)
        {
            IQueryable<PurchaseGrnMas> query = (from a in entities.Proc_Apparel_GetPurQualityDetails(Id)
                                                select new PurchaseGrnMas
                                              {
                                                  Company = a.Comp,
                                                  companyid = (int)a.CompId,
                                                  supplierid = (int)a.Supplierid,
                                                  Supplier = a.supplier,
                                                  receipt_no = a.receipt_no,
                                                  Dc_no = a.DcNo,
                                                  StoreUnitID = (int)a.StoreUnitID

                                              }).AsQueryable();

            return query;
        }


        public IList<PurQltyDet> GetDataQltyRepItemDetails(int Id)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetQltyEntryItemDetails(Id)
                         select new PurQltyDet
                         {
                             Itemid = (int)YD1.itemid,
                             Colorid = (int)YD1.colorid,
                             Sizeid = (int)YD1.sizeid,
                             Uomid = (int)YD1.uomid,
                             Grn_detid = (int)YD1.grn_detid,
                             rate = (decimal)YD1.rate,
                             grnqty = (decimal)YD1.grnqty,
                             excess_qty = (decimal)YD1.excess_qty,
                             grnaccept = (decimal)YD1.grnqty,
                             grnreturn = (decimal)YD1.grnreturn,
                             grnreject = (decimal)YD1.grnreject,
                             grnreceivable = (decimal)YD1.grnreceivable,
                             grnshortage = (decimal)YD1.grnshortage,
                             qltyexcess = YD1.qltyexcess,

                             Eexcess_qty = (decimal)YD1.excess_qty,
                             Egrnaccept = (decimal)YD1.grnqty,
                             Egrnreturn = (decimal)YD1.grnreturn,
                             Egrnreject = (decimal)YD1.grnreject,
                             Egrnreceivable = (decimal)YD1.grnreceivable,
                             Egrnshortage = (decimal)YD1.grnshortage,
                             Egrndebit = (decimal)YD1.grndebit,
                             Eexcess_return = (decimal)YD1.excess_return,

                             QltyItemRemarks = YD1.QltyItemRemarks,
                             Debit = (decimal)YD1.grndebit,
                             Uom = YD1.uom,
                             Item = YD1.item,
                             Color = YD1.color,
                             Size = YD1.size,


                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurQltyOrder> GetDataQltyRepOrderDetails(int GrnDetId)
        {

            int Itemid = 0;
            int Colorid = 0;
            int SizeId = 0;
            int GrnId = 0;

            var query = (from YD2 in entities.Proc_Apparel_GetQltyEntryOrdDetails(GrnId, GrnDetId, Itemid, Colorid, SizeId)
                         select new PurQltyOrder
                         {
                             pur_ord_no = YD2.pur_ord_no,
                             purchase_type = YD2.purchase_type,
                             PurRecvdQty = YD2.PurRecvdQty,
                             porderqty = (decimal)YD2.PurRecvdQty,
                             refConversion = (decimal)YD2.refConversion,
                             grnordrate = YD2.grnordrate,
                             ExRate = YD2.ExRate,
                             grn_detid = YD2.grn_detid,
                             expmfrid = YD2.expmfrid,
                             expmfr = YD2.expmfr,
                             actmfrid = YD2.actmfrid,
                             PORemarks = YD2.PoRemarks,
                             POExcess_Qty = YD2.POExcess_Qty,
                             order_no = YD2.order_no,
                             style = YD2.Style,
                             styleid = YD2.StyleId,
                             orderqty = (decimal)YD2.orderqty,
                             pur_ord_buyjobid = YD2.pur_ord_buyjobid,
                             pur_ord_detid = (int)YD2.pur_ord_detid,
                             accept_qty = 0,//(decimal)YD2.PurRecvdQty,
                             debit_qty = YD2.debit_qty,
                             receivable_qty = YD2.receivable_qty,
                             itemcode = YD2.itemcode,
                             QltyExcessQty = YD2.QltyExcessQty,

                         }).AsQueryable();

            return query.ToList();


        }


        public IList<PurQltyOrder> GetDataQltyRepOrderSaveDetails(int GrnId)
        {
            int Itemid = 0;
            int Colorid = 0;
            int SizeId = 0;


            var query = (from YD2 in entities.Proc_Apparel_GetQltyEntryOrdSaveDetails(GrnId, Itemid, Colorid, SizeId)
                         select new PurQltyOrder
                         {
                             pur_ord_no = YD2.pur_ord_no,
                             purchase_type = YD2.purchase_type,
                             PurRecvdQty = YD2.PurRecvdQty,
                             porderqty = (decimal)YD2.PurRecvdQty,
                             refConversion = (decimal)YD2.refConversion,
                             grnordrate = YD2.grnordrate,
                             ExRate = YD2.ExRate,
                             grn_detid = YD2.grn_detid,
                             expmfrid = YD2.expmfrid,
                             expmfr = YD2.expmfr,
                             actmfrid = YD2.actmfrid,
                             PORemarks = YD2.PoRemarks,
                             POExcess_Qty = YD2.POExcess_Qty,
                             order_no = YD2.order_no,
                             style = YD2.Style,
                             styleid = YD2.StyleId,
                             orderqty = (decimal)YD2.orderqty,
                             pur_ord_buyjobid = YD2.pur_ord_buyjobid,
                             pur_ord_detid = (int)YD2.pur_ord_detid,
                             accept_qty = 0,//(decimal)YD2.PurRecvdQty,
                             debit_qty = YD2.debit_qty,
                             receivable_qty = YD2.receivable_qty,
                             itemcode = YD2.itemcode,
                             QltyExcessQty = YD2.QltyExcessQty,

                             Eaccept_qty = (decimal)YD2.accept_qty,
                             Edebit_qty = YD2.debit_qty,
                             Ereceivable_qty = YD2.receivable_qty,
                             EQltyExcessQty = YD2.QltyExcessQty,

                             ItemId = YD2.itemid,
                             ColorId = YD2.colorid,
                             SizeId = YD2.sizeid,
                             UomId = YD2.uomid,


                         }).AsQueryable();

            return query.ToList();
        }



        public bool AddDetData(List<pur_grn_qlty_det> objQltODet, DateTime QltDate, Pur_Grn_Mas objPQEntry, List<Pur_Grn_Det> objQltPurGDet, string PurIndType)
        {


            bool reserved = false;
            string OrdNo = "";
             string GrnNo = "";
            int StyId = 0;
            int Bomid = 0;
            string ConMode = "";
            decimal ToPurUom = 0;
            int CUomid = 0;
            decimal ConQty = 0;
            decimal ConRate = 0;
            string OType = "";
            string IndType = "";
            int BomDetId = 0;
            int BommasId = 0;
            string ChkExQtyOrd = "O";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var App = entities.Pur_Grn_Mas.Where(c => c.Grn_MasId == objPQEntry.Grn_MasId).FirstOrDefault();
                    if (App != null)
                    {

                        App.Qlty_date = objPQEntry.Qlty_date;
                        App.QCReport_No = objPQEntry.QCReport_No;
                        App.Qlty_No = objPQEntry.Qlty_No;
                        App.QltyRemarks = objPQEntry.QltyRemarks;
                    }
                    entities.SaveChanges();


                    var OQuery = entities.Pur_Grn_Mas.Where(c => c.Grn_MasId == objPQEntry.Grn_MasId).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OType = OQuery.pur_type;
                        GrnNo=OQuery.receipt_no;
                    }
                    entities.SaveChanges();

                    foreach (var item in objQltODet)
                    {

                        entities.pur_grn_qlty_det.Add(item);
                        entities.SaveChanges();


                        //itemstok and grn 
                        if (item.accept_qty > 0)
                        {
                            if (PurIndType == "Y")
                            {
                                var PjOQuery1 = entities.Pur_Ord_BuyJob.Where(b => b.Pur_Ord_BuyJobid == item.pur_ord_buyjobid).FirstOrDefault();
                                if (PjOQuery1 != null)
                                {
                                    BomDetId = (int)PjOQuery1.BomdetId;


                                }
                                var PjOQuery2 = entities.Buy_Ord_BOMDet.Where(b => b.Buy_Ord_BOMDetid == BomDetId).FirstOrDefault();
                                if (PjOQuery2 != null)
                                {
                                    BommasId = PjOQuery2.Buy_Ord_BOMid;

                                }
                                var PjOQuery3 = entities.Buy_Ord_BOMMas.Where(b => b.Buy_Ord_BOMid == BommasId).FirstOrDefault();
                                if (PjOQuery3 != null)
                                {
                                    OrdNo = PjOQuery3.Order_No;

                                }
                            }
                            else
                            {
                                var PjOQuery = entities.Pur_Ord_BuyJob.Where(b => b.Pur_Ord_BuyJobid == item.pur_ord_buyjobid).FirstOrDefault();
                                if (PjOQuery != null)
                                {
                                    OrdNo = PjOQuery.Order_No;
                                    //StyId = (int)PjOQuery.Styleid;

                                }

                            }
                            var PjOQuery4 = entities.buy_ord_style.Where(b => b.order_no == OrdNo).FirstOrDefault();
                            if (PjOQuery4 != null)
                            {
                                StyId = (int)PjOQuery4.Styleid;
                            }
                            if (OType == "O")
                            {
                                var dy = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == OrdNo && c.Styleid == StyId);

                                foreach (var dbSet in dy)
                                {
                                    var dyd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == dbSet.Buy_Ord_BOMid && c.Itemid == item.ItemID && c.Colorid == item.ColorID && c.Sizeid == item.SizeID);

                                    foreach (var dbBomSet in dyd)
                                    {
                                        ConMode = dbBomSet.Conv_Mode;
                                        ToPurUom = (decimal)dbBomSet.ToPurUOM;
                                        CUomid = dbBomSet.UOMid;

                                        if (ChkExQtyOrd == "O")
                                        {
                                            if (ConMode == "D")
                                            {
                                                ConQty = ((decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom)) + (decimal)item.Excess_Qty;//Against Order Excess
                                            }
                                            if (ConMode == "M")
                                            {
                                                ConQty = ((decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom)) + (decimal)item.Excess_Qty;
                                            }
                                        }
                                        else
                                        {
                                            if (ConMode == "D")
                                            {
                                                ConQty = (decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                            }
                                            if (ConMode == "M")
                                            {
                                                ConQty = (decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                            }
                                        }

                                        var Pg1 = entities.Proc_Apparel_GetQltyStockInsert(item.ItemID, item.ColorID, item.SizeID, ConQty, QltDate, CUomid, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                                        entities.SaveChanges();

                                    }

                                }
                            }
                            //For Sample Order
                            else if (OType == "SP")
                            {
                                //var dy = entities.buy_ord_style.Where(c => c.order_no == OrdNo && c.Styleid == StyId);

                                //foreach (var dbSet in dy)
                                //{
                                //    var dyd = entities.PlanBom.Where(c => c.Job_ord_no == dbSet.WORKORDER && c.itemid == item.ItemID && c.colorid == item.ColorID && c.sizeid == item.SizeID);

                                //    foreach (var dbBomSet in dyd)
                                //    {
                                //        ConMode = dbBomSet.Conv_Mode;
                                //        ToPurUom = (decimal)dbBomSet.ToPurUOM;
                                //        CUomid = (int)dbBomSet.Pur_UOMid;

                                //        if (ConMode == "D")
                                //        {
                                //            ConQty = (decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                //        }
                                //        if (ConMode == "M")
                                //        {
                                //            ConQty = (decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                //        }
                                //        var Pg1 = entities.Proc_Apparel_GetQltyStockInsert(item.ItemID, item.ColorID, item.SizeID, ConQty, QltDate, CUomid, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                                //        entities.SaveChanges();

                                //    }

                                //}
                                var dy = entities.Buy_Ord_BOMMas.Where(c => c.Order_No == OrdNo && c.Styleid == StyId);

                                foreach (var dbSet in dy)
                                {
                                    var dyd = entities.Buy_Ord_BOMDet.Where(c => c.Buy_Ord_BOMid == dbSet.Buy_Ord_BOMid && c.Itemid == item.ItemID && c.Colorid == item.ColorID && c.Sizeid == item.SizeID);

                                    foreach (var dbBomSet in dyd)
                                    {
                                        ConMode = dbBomSet.Conv_Mode;
                                        ToPurUom = (decimal)dbBomSet.ToPurUOM;
                                        CUomid = dbBomSet.UOMid;

                                        if (ChkExQtyOrd == "O")
                                        {
                                            if (ConMode == "D")
                                            {
                                                ConQty = ((decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom)) + (decimal)item.Excess_Qty;//Against Order Excess
                                            }
                                            if (ConMode == "M")
                                            {
                                                ConQty = ((decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom)) + (decimal)item.Excess_Qty;
                                            }
                                        }
                                        else
                                        {
                                            if (ConMode == "D")
                                            {
                                                ConQty = (decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                            }
                                            if (ConMode == "M")
                                            {
                                                ConQty = (decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                            }
                                        }

                                        var Pg1 = entities.Proc_Apparel_GetQltyStockInsert(item.ItemID, item.ColorID, item.SizeID, ConQty, QltDate, CUomid, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                                        entities.SaveChanges();

                                    }

                                }
                            }
                            //For General Order
                            else if (OType == "G")
                            {
                                //var dy = entities.buy_ord_style.Where(c => c.order_no == OrdNo && c.Styleid == StyId);

                                //foreach (var dbSet in dy)
                                //{
                                //    var dyd = entities.PlanBom.Where(c => c.Job_ord_no == dbSet.WORKORDER && c.itemid == item.ItemID && c.colorid == item.ColorID && c.sizeid == item.SizeID);

                                //    foreach (var dbBomSet in dyd)
                                //    {
                                //        ConMode = dbBomSet.Conv_Mode;
                                //        ToPurUom = (decimal)dbBomSet.ToPurUOM;
                                //        CUomid = (int)dbBomSet.Pur_UOMid;

                                //        if (ConMode == "D")
                                //        {
                                //            ConQty = (decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                //        }
                                //        if (ConMode == "M")
                                //        {
                                //            ConQty = (decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                //        }
                                //        var Pg1 = entities.Proc_Apparel_GetQltyStockInsert(item.ItemID, item.ColorID, item.SizeID, ConQty, QltDate, CUomid, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                                //        entities.SaveChanges();

                                //    }

                                //}
                                var Pg1 = entities.Proc_Apparel_GetQltyStockGenInsert(item.ItemID, item.ColorID, item.SizeID, item.accept_qty + item.Excess_Qty , QltDate, item.UOMId, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                                entities.SaveChanges();
                            }

                                            //For Special Order
                            else if (OType == "R")
                            {


                                var dy = entities.Special_Req_Mas.Where(c => c.Spl_Req_No == OrdNo );

                                foreach (var dbSet in dy)
                                {
                                    var dyd = entities.Special_Req_Det.Where(c => c.Spl_Reqid == dbSet.Spl_Reqid && c.Itemid == item.ItemID && c.Colorid == item.ColorID && c.Sizeid == item.SizeID);

                                    foreach (var dbBomSet in dyd)
                                    {
                                        ConMode = dbBomSet.Conv_Mode;
                                        ToPurUom = (decimal)dbBomSet.ToPurUOM;
                                        CUomid = (int)dbBomSet.UOMid;

                                        if (ConMode == "D")
                                        {
                                            ConQty = ((decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom)) + (decimal)item.Excess_Qty;//Against Order Excess
                                        }
                                        if (ConMode == "M")
                                        {
                                            ConQty = ((decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom)) + (decimal)item.Excess_Qty;
                                        }

                                        //if (ConMode == "D")
                                        //{
                                        //    ConQty = (decimal)item.accept_qty * ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                        //}
                                        //if (ConMode == "M")
                                        //{
                                        //    ConQty = (decimal)item.accept_qty / ((decimal)ToPurUom == 0 ? 1 : ToPurUom);
                                        //}
                                        var Pg1 = entities.Proc_Apparel_GetQltyStockInsert(item.ItemID, item.ColorID, item.SizeID, ConQty, QltDate, CUomid, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                                        entities.SaveChanges();

                                    }

                                }
                            }
                            //update Cost

                            if (OType == "O")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                                entities.SaveChanges();
                            }
                            if (OType == "R")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                                entities.SaveChanges();
                            }

                            if (OType == "O" && PurIndType == "Y")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyCostIndBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                                entities.SaveChanges();
                            }
                            else if (OType == "SP")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyCostSamBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                                entities.SaveChanges();
                            }

                        }

                        //ExcessQty For Bulk insert into General
                         //itemstok and grn 
                        if (item.Excess_Qty > 0 && ChkExQtyOrd=="G")
                        {
                            var Pggen = entities.Proc_Apparel_GetQltyStockGenInsert(item.ItemID, item.ColorID, item.SizeID, item.Excess_Qty, QltDate, item.UOMId, item.pur_ord_buyjobid, item.grn_detid, item.accept_qty);
                            entities.SaveChanges();
                        }
                        //Rece/Debit 
                        if (item.receivable_qty > 0 || item.debit_qty > 0)
                        {
                            //Update the receivable/debit in purorddet 
                            var Pg2 = entities.Proc_Apparel_GetQltyDebitOrReceUpdate(item.receivable_qty, item.debit_qty, item.pur_ord_detid);
                            entities.SaveChanges();

                        }


                    }



                    foreach (var k in objQltPurGDet)
                    {
                        var e = entities.Pur_Grn_Det.Where(a => a.Grn_DetId.Equals(k.Grn_DetId)).FirstOrDefault();
                        if (e != null)
                        {

                            e.Grn_DetId = k.Grn_DetId;
                            e.excess_qty = k.excess_qty;
                            e.rejected_qty = k.rejected_qty;
                            e.shortage_qty = k.shortage_qty;
                            e.accepted_qty = k.accepted_qty;
                            e.return_qty = k.return_qty;
                            e.debit_qty = k.debit_qty;
                            e.receivable_qty = k.receivable_qty;
                            e.Qlty_Excess = k.Qlty_Excess;
                            e.Excess_return = k.Excess_return;
                            e.QltyItemRemarks = k.QltyItemRemarks;
                            e.ReturnQty = k.ReturnQty;

                        }

                        //itemstok and grn 
                        if (k.rejected_qty > 0)
                        {
                            //insert the RejStock 
                            var Pg1 = entities.Proc_Apparel_GetQltyRejStockInsert(k.itemid, k.colorid, k.sizeid, k.rejected_qty, QltDate, k.uomId, k.Grn_DetId);
                            entities.SaveChanges();

                        }

                    }
                    if (OType != "G")
                    {
                        var Ik = entities.Proc_Apparel_GetQltyStockOrderInsert(GrnNo,QltDate);
                        entities.SaveChanges();
                    }

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


        public IQueryable<PurchaseGrnMas> GetDataQualityRepEditDetails(int Id)
        {
            IQueryable<PurchaseGrnMas> query = (from a in entities.Proc_Apparel_GetPurQualityEditDetails(Id)
                                                select new PurchaseGrnMas
                                                {
                                                    Company = a.Company,
                                                    companyid = (int)a.CompId,
                                                    supplierid = (int)a.SuppId,
                                                    Supplier = a.Supplier,
                                                    receipt_no = a.receipt_no,
                                                    Dc_no = a.DcNo,
                                                    StoreUnitID = (int)a.StoreUnitID,
                                                    Qlty_date = (DateTime)a.qlty_date,
                                                    Qlty_No = a.qlty_no,
                                                    QltyRemarks = a.QltyRemarks,
                                                    QCReport_No = a.QCReport_No,

                                                }).AsQueryable();

            return query;
        }


        public IList<PurQltyDet> GetDataQltyRepEditItemDetails(int Id)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetQltyEntryItemDetails(Id)
                         select new PurQltyDet
                         {
                             Itemid = (int)YD1.itemid,
                             Colorid = (int)YD1.colorid,
                             Sizeid = (int)YD1.sizeid,
                             Uomid = (int)YD1.uomid,
                             Grn_detid = (int)YD1.grn_detid,
                             rate = (decimal)YD1.rate,
                             grnqty = (decimal)YD1.grnqty,
                             excess_qty = (decimal)YD1.excess_qty,
                             grnaccept = (decimal)YD1.grnaccept,
                             grnreturn = (decimal)YD1.grnreturn,
                             grnreject = (decimal)YD1.grnreject,
                             grnreceivable = (decimal)YD1.grnreceivable,
                             grnshortage = (decimal)YD1.grnshortage,
                             qltyexcess = YD1.qltyexcess,
                             excess_return = (decimal)YD1.excess_return,
                             Eexcess_qty = (decimal)YD1.excess_qty,
                             Egrnaccept = (decimal)YD1.grnqty,
                             Egrnreturn = (decimal)YD1.grnreturn,
                             Egrnreject = (decimal)YD1.grnreject,
                             Egrnreceivable = (decimal)YD1.grnreceivable,
                             Egrnshortage = (decimal)YD1.grnshortage,
                             Egrndebit = (decimal)YD1.grndebit,
                             Eexcess_return = (decimal)YD1.excess_return,

                             QltyItemRemarks = YD1.QltyItemRemarks,
                             Debit = (decimal)YD1.grndebit,
                             Uom = YD1.uom,
                             Item = YD1.item,
                             Color = YD1.color,
                             Size = YD1.size,


                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurQltyOrder> GetDataQltyRepOrderEditDetails(int GrnDetId)
        {
            int Itemid = 0;
            int Colorid = 0;
            int SizeId = 0;
            int GrnId = 0;

            var query = (from YD2 in entities.Proc_Apparel_GetQltyEntryOrdDetails(GrnId, GrnDetId, Itemid, Colorid, SizeId)
                         select new PurQltyOrder
                         {
                             pur_ord_no = YD2.pur_ord_no,
                             purchase_type = YD2.purchase_type,
                             PurRecvdQty = YD2.PurRecvdQty,
                             porderqty = (decimal)YD2.PurRecvdQty,
                             refConversion = (decimal)YD2.refConversion,
                             grnordrate = YD2.grnordrate,
                             ExRate = YD2.ExRate,
                             grn_detid = YD2.grn_detid,
                             expmfrid = YD2.expmfrid,
                             expmfr = YD2.expmfr,
                             actmfrid = YD2.actmfrid,
                             PORemarks = YD2.PoRemarks,
                             POExcess_Qty = YD2.POExcess_Qty,
                             order_no = YD2.order_no,
                             style = YD2.Style,
                             styleid = YD2.StyleId,
                             //orderqty = (decimal)YD2.PurRecvdQty + (decimal)YD2.accept_qty,
                             orderqty = (decimal)YD2.orderqty + (decimal)YD2.accept_qty,
                             //orderqty = (decimal)YD2.PurRecvdQty,
                             pur_ord_buyjobid = YD2.pur_ord_buyjobid,
                             pur_ord_detid = (int)YD2.pur_ord_detid,
                             accept_qty = (decimal)YD2.accept_qty,
                             debit_qty = YD2.debit_qty,
                             receivable_qty = YD2.receivable_qty,
                             itemcode = YD2.itemcode,
                             QltyExcessQty = YD2.QltyExcessQty,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurQltyOrder> GetDataQltyRepEditOrderSaveDetails(int GrnId)
        {
            int Itemid = 0;
            int Colorid = 0;
            int SizeId = 0;


            var query = (from YD2 in entities.Proc_Apparel_GetQltyEntryOrdSaveDetails(GrnId, Itemid, Colorid, SizeId)
                         select new PurQltyOrder
                         {
                             pur_ord_no = YD2.pur_ord_no,
                             purchase_type = YD2.purchase_type,
                             PurRecvdQty = YD2.PurRecvdQty,
                             porderqty = (decimal)YD2.PurRecvdQty,
                             refConversion = (decimal)YD2.refConversion,
                             grnordrate = YD2.grnordrate,
                             ExRate = YD2.ExRate,
                             grn_detid = YD2.grn_detid,
                             expmfrid = YD2.expmfrid,
                             expmfr = YD2.expmfr,
                             actmfrid = YD2.actmfrid,
                             PORemarks = YD2.PoRemarks,
                             POExcess_Qty = YD2.POExcess_Qty,
                             order_no = YD2.order_no,
                             style = YD2.Style,
                             styleid = YD2.StyleId,
                             //orderqty = (decimal)YD2.PurRecvdQty + (decimal)YD2.accept_qty,
                             orderqty = (decimal)YD2.orderqty + (decimal)YD2.accept_qty,
                             pur_ord_buyjobid = YD2.pur_ord_buyjobid,
                             pur_ord_detid = (int)YD2.pur_ord_detid,
                             accept_qty = (decimal)YD2.accept_qty,
                             debit_qty = YD2.debit_qty,
                             receivable_qty = YD2.receivable_qty,
                             itemcode = YD2.itemcode,
                             QltyExcessQty = YD2.QltyExcessQty,

                             Eaccept_qty = (decimal)YD2.accept_qty,
                             Edebit_qty = YD2.debit_qty,
                             Ereceivable_qty = YD2.receivable_qty,
                             EQltyExcessQty = YD2.QltyExcessQty,


                             ItemId = YD2.itemid,
                             ColorId = YD2.colorid,
                             SizeId = YD2.sizeid,
                             UomId = YD2.uomid,


                         }).AsQueryable();

            return query.ToList();
        }



        public bool UpdateDetData(List<Pur_Grn_Det> objQltPurEGDet, List<pur_grn_qlty_det> objQltEODet, DateTime QltDate, string TransNo, string PurIndType)
        {

            bool reserved = false;
            string OType = "";

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var OQuery = entities.Pur_Grn_Mas.Where(c => c.receipt_no == TransNo).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OType = OQuery.pur_type;

                    }
                    entities.SaveChanges();


                    foreach (var k in objQltPurEGDet)
                    {

                        var Pg5 = entities.Proc_Apparel_GetQltyPurGrnUpdate(k.itemid, k.colorid, k.sizeid, k.uomId, k.Grn_DetId);
                        entities.SaveChanges();

                        //itemstok and grn 
                        if (k.accepted_qty > 0)
                        {
                            //insert the RejStock 
                            var Pg1 = entities.Proc_Apparel_GetQltyRejStockDelete(k.itemid, k.colorid, k.sizeid, k.accepted_qty, QltDate, k.uomId, k.Grn_DetId, TransNo);
                            entities.SaveChanges();

                        }

                    }

                    foreach (var item in objQltEODet)
                    {


                        //itemstok and grn 
                        if (item.accept_qty > 0)
                        {


                            if (OType == "O" && PurIndType == "Y")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostIndBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                                entities.SaveChanges();
                            }

                            //insert the Stock 
                            var Pg1 = entities.Proc_Apparel_GetQltyStockDelete(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, QltDate, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                            entities.SaveChanges();

                            //update Cost

                            if (OType == "O" && PurIndType == "N")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                                entities.SaveChanges();
                            }
                            if (OType == "R" )
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                                entities.SaveChanges();
                            }

                            else if (OType == "SP")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                                entities.SaveChanges();
                            }
                        }

                        //Rece/Debit 
                        if (item.receivable_qty > 0 || item.debit_qty > 0)
                        {
                            //Update the receivable/debit in purorddet 
                            var Pg2 = entities.Proc_Apparel_GetQltyEditDebitOrReceUpdate(item.receivable_qty, item.debit_qty, item.pur_ord_detid);
                            entities.SaveChanges();

                        }


                    }


                    foreach (var item in objQltEODet)
                    {

                        var Pg1 = entities.Proc_Apparel_GetQltyDeletePurQlty(item.grn_detid);

                        entities.SaveChanges();

                    }


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



        public bool DeleteDetData(Pur_Grn_Mas objPQDEntry, List<Pur_Grn_Det> objQltPurEGDet, List<pur_grn_qlty_det> objQltEODet, DateTime QltDate, string TransNo, string PurIndType)
        {
            bool reserved = false;
            string OType = "";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                  

                    var App = entities.Pur_Grn_Mas.Where(c => c.Grn_MasId == objPQDEntry.Grn_MasId).FirstOrDefault();
                    if (App != null)
                    {
                        App.Qlty_No = "";
                        App.QltyRemarks = "";
                        OType = App.pur_type;
                    }
                    entities.SaveChanges();

                    foreach (var k in objQltPurEGDet)
                    {


                        var Pg5 = entities.Proc_Apparel_GetQltyPurGrnUpdate(k.itemid, k.colorid, k.sizeid, k.uomId, k.Grn_DetId);
                        entities.SaveChanges();

                        //itemstok and grn 
                        if (k.accepted_qty > 0)
                        {
                            //insert the RejStock 
                            var Pg1 = entities.Proc_Apparel_GetQltyRejStockDelete(k.itemid, k.colorid, k.sizeid, k.accepted_qty, QltDate, k.uomId, k.Grn_DetId, TransNo);
                            entities.SaveChanges();

                        }

                    }

                    foreach (var item in objQltEODet)
                    {


                        //itemstok and grn 
                        if (item.accept_qty > 0)
                        {

                            //if (PurIndType == "Y")
                            //{
                            //    var Pg5 = entities.Proc_Apparel_GetQltyEditCostIndBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                            //    entities.SaveChanges();
                            //}

                            ////insert the Stock 
                            //var Pg1 = entities.Proc_Apparel_GetQltyStockDelete(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, QltDate, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                            //entities.SaveChanges();

                            ////update Cost
                            //if (PurIndType == "N")
                            //{
                            //    var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                            //    entities.SaveChanges();
                            //}


                            if (OType == "O" && PurIndType == "Y")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostIndBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid);
                                entities.SaveChanges();
                            }

                            //insert the Stock 
                            var Pg1 = entities.Proc_Apparel_GetQltyStockDelete(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, QltDate, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                            entities.SaveChanges();

                            //update Cost

                            if (OType == "O" && PurIndType == "N")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                                entities.SaveChanges();
                            }


                            if (OType == "R" )
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                                entities.SaveChanges();
                            }

                            else if (OType == "SP")
                            {
                                var Pg4 = entities.Proc_Apparel_GetQltyEditCostBomUpdate(item.ItemID, item.ColorID, item.SizeID, item.accept_qty, item.UOMId, item.pur_ord_buyjobid, item.grn_detid);
                                entities.SaveChanges();
                            }

                        }

                        //Rece/Debit 
                        if (item.receivable_qty > 0 || item.debit_qty > 0)
                        {
                            //Update the receivable/debit in purorddet 
                            var Pg2 = entities.Proc_Apparel_GetQltyEditDebitOrReceUpdate(item.receivable_qty, item.debit_qty, item.pur_ord_detid);
                            entities.SaveChanges();

                        }



                    }


                    foreach (var item in objQltEODet)
                    {

                        var Pg1 = entities.Proc_Apparel_GetQltyDeletePurQlty(item.grn_detid);

                        entities.SaveChanges();

                    }


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



        public IList<PurQltyDet> GetDataQltyRepEditCheckItemDetails(string TransNo)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPurchaseGrnEditChkDetails(TransNo)
                         select new PurQltyDet
                         {
                             CTransNo = YD1.OutTransNo,
                             CTransType = YD1.Ttype,


                         }).AsQueryable();

            return query.ToList();
        }
    }
}
