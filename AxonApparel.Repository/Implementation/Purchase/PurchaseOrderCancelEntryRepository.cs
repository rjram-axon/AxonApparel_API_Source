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
    public class PurchaseOrderCancelEntryRepository : IPurchaseCancelEntryRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<PurchaseOrder> GetDataRepCanEditDetails(int Id)
        {
            IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurchaseOrderCanceldetails(Id)
                                               select new PurchaseOrder
                                               {
                                                   Supplier = a.Supplier,
                                                   SupplierId = (int)a.SupplierID,
                                                   companyid = (int)a.CompId,
                                                   company = a.Company,
                                                   pur_ord_no = a.Pur_Ord_No,
                                                   pur_ord_id = a.Pur_Ord_Id,
                                                   CreatedBy = a.CreatedBy,
                                                   CEmpName = a.Employee,
                                                   orddate = (DateTime)a.orddate,



                                               }).AsQueryable();

            return query;
        }

        public IList<PurchaseOrderItemDet> GetRepEntryCanEditItemLoad(int Id)
        {
            var query = (from EID in entities.Proc_Apparel_GetPurchaseCancelItemDetails(Id)
                         select new PurchaseOrderItemDet
                         {
                             Item = EID.Item,
                             ItemID = (int)EID.ItemID,
                             Color = EID.Color,
                             ColorID = (int)EID.ColorID,
                             Size = EID.Size,
                             SizeID = (int)EID.SizeId,
                             Unit = EID.Uom,
                             PurUomId = (int)EID.UomId,
                             OrdBal = (decimal)EID.OrderQty,
                             Cancel_Qty = 0,
                             Pur_Ord_DetId = EID.DetID,
                             Pur_ord_id = EID.pur_ord_id,
                             CancelId = 0,
                             CancelDetId = 0,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PurchaseOrderDet> GetRepCanEditOrderLoad(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId)
        {
            var query = (from EIDO in entities.Proc_Apparel_GetPurchaseCancelOrDetails(pur_ord_id == null ? 0 : pur_ord_id, ItemID == null ? 0 : ItemID, ColorID == null ? 0 : ColorID, SizeID == null ? 0 : SizeID, PurUomId == null ? 0 : PurUomId)
                         select new PurchaseOrderDet
                         {
                             OrderNo = EIDO.OrderNo,
                             ORefNo = EIDO.RefNo,
                             OStyle = EIDO.Style,
                             Styleid = (int)EIDO.StyleID,
                             quantity = (int)EIDO.OrderQty,
                             Cancel_Qty = 0,
                             pur_ord_Detid = EIDO.DetId,
                             Pur_Ord_BuyJobid = EIDO.OrdDetId,
                             CancelDetId = 0,
                             CancelOrdId = 0,
                             CancelId = 0,
                             ItemID = EIDO.ItemId,
                             ColorID = EIDO.ColorId,
                             SizeID = EIDO.SizeId,
                             PurUomId = EIDO.UomId,
                         }).AsQueryable();

            return query.ToList();
        }


        public int AddData(Pur_Cancel_Mas objPoEntry)
        {

            ////Update the buybom
            var Pg1 = entities.Proc_Apparel_GetPurchaseCancelOrderMasUpdate(objPoEntry.Pur_Ord_Id);
            entities.SaveChanges();

            var id = entities.Pur_Cancel_Mas.Add(objPoEntry);
            entities.SaveChanges();
            return id.CancelId;




        }

        public bool AddDetData(Pur_Cancel_Mas objPoCanEntry, List<Pur_Cancel_Det> objPoDet, List<Pur_Cancel_Order> objPoOrd)
        {

            int PGCDetId = 0;
            int CanId = 0;
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var Pgc = entities.Proc_Apparel_GetPurchaseCancelOrderMasUpdate(objPoCanEntry.Pur_Ord_Id);
                    entities.SaveChanges();

                    var id = entities.Pur_Cancel_Mas.Add(objPoCanEntry);
                    entities.SaveChanges();
                    entities.SaveChanges();
                    CanId = objPoCanEntry.CancelId;

                    foreach (var item in objPoDet)
                    {
                        item.CancelId = CanId;
                        entities.Pur_Cancel_Det.Add(item);
                        entities.SaveChanges();
                        PGCDetId = item.CancelDetID;

                        ////Update the PurDet

                        foreach (var k in objPoDet)
                        {
                            var e = entities.Pur_Ord_Det.Where(a => a.Pur_Ord_DetId.Equals(k.Pur_Ord_DetId)).FirstOrDefault();
                            if (e != null)
                            {

                                e.Cancel_Qty = k.CancelQty;

                            }
                        }
                        entities.SaveChanges();

                        //

                        foreach (var itemOrder in objPoOrd)
                        {
                            if (itemOrder.CancelQty > 0)
                            {

                                if (item.ItemId == itemOrder.ItemID && item.ColorId == itemOrder.ColorID && item.SizeId == itemOrder.SizeID && item.UomId == itemOrder.UOMid)
                                {

                                    itemOrder.CancelId = CanId;
                                    itemOrder.CancelDetID = PGCDetId;
                                    entities.Pur_Cancel_Order.Add(itemOrder);

                                    ////Update the buybom
                                    var Pg1 = entities.Proc_Apparel_GetPurchaseCancelOrderbomDetUpdate(itemOrder.Pur_Ord_BuyJobid == null ? 0 : itemOrder.Pur_Ord_BuyJobid, itemOrder.CancelQty, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMid == null ? 0 : itemOrder.UOMid, itemOrder.OrderNo, itemOrder.StyleId);
                                    entities.SaveChanges();
                                }
                            }
                        }



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


        public IList<PurchaseOrderDet> EditCanOrderRep(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId)
        {
            var query = (from EIDO in entities.Proc_Apparel_GetPurchaseCancelEditOrDetails(pur_ord_id == null ? 0 : pur_ord_id, ItemID == null ? 0 : ItemID, ColorID == null ? 0 : ColorID, SizeID == null ? 0 : SizeID, PurUomId == null ? 0 : PurUomId)
                         select new PurchaseOrderDet
                         {
                             OrderNo = EIDO.OrderNo,
                             ORefNo = EIDO.RefNo,
                             OStyle = EIDO.Style,
                             Styleid = (int)EIDO.StyleID,
                             quantity = (int)EIDO.OrderQty,
                             Cancel_Qty = EIDO.CancelQty,
                             pur_ord_Detid = EIDO.DetId,
                             Pur_Ord_BuyJobid = EIDO.OrdDetId,
                             CancelDetId = EIDO.CancelDetID,
                             CancelOrdId = EIDO.CancelOrdId,
                             CancelId = EIDO.CancelId,
                             ItemID = EIDO.ItemId,
                             ColorID = EIDO.ColorID,
                             SizeID = EIDO.SizeID,
                             PurUomId = EIDO.UomID,
                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<PurchaseOrder> EditCanLoadRep(int Id)
        {
            IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurchaseOrderEditCanceldetails(Id)
                                               select new PurchaseOrder
                                               {
                                                   Supplier = a.Supplier,
                                                   SupplierId = (int)a.SupplierID,
                                                   companyid = (int)a.CompanyId,
                                                   company = a.Company,
                                                   pur_ord_no = a.Pur_Ord_No,
                                                   pur_ord_id = a.Pur_Ord_Id,
                                                   CreatedBy = a.EmployeeID,
                                                   CEmpName = a.Employee,
                                                   CancelNo = a.CancelNo,
                                                   CancelDate = (DateTime)a.CancelDate,
                                                   orddate = (DateTime)a.orddate,
                                                   CancelID = a.CancelId,
                                                   remarks = a.Remarks,


                                               }).AsQueryable();

            return query;
        }

        public IList<PurchaseOrderItemDet> EditCanItemRep(int Id)
        {
            var query = (from EID in entities.Proc_Apparel_GetPurchaseCancelEditItemDetails(Id)
                         select new PurchaseOrderItemDet
                         {
                             Item = EID.Item,
                             ItemID = (int)EID.ItemID,
                             Color = EID.Color,
                             ColorID = (int)EID.ColorId,
                             Size = EID.Size,
                             SizeID = (int)EID.SizeId,
                             Unit = EID.Uom,
                             PurUomId = (int)EID.UomId,
                             OrdBal = (decimal)EID.OrderQty,
                             Cancel_Qty = (decimal)EID.CancelQty,
                             Pur_Ord_DetId = EID.DetID,
                             CancelId = EID.CancelId,
                             CancelDetId = EID.CancelDetID,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateData(Pur_Cancel_Mas objPoEEntry)
        {
            var result = false;
            var App = entities.Pur_Cancel_Mas.Where(c => c.Pur_Ord_Id == objPoEEntry.Pur_Ord_Id).FirstOrDefault();
            if (App != null)
            {
                App.Remarks = objPoEEntry.Remarks;
                App.CancelDate = objPoEEntry.CancelDate;

            }
            entities.SaveChanges();

            result = true;
            return result;
        }



        public bool UpdateDetData(Pur_Cancel_Mas objPoCanEditEntry, List<Pur_Cancel_Det> objPoDet, List<Pur_Cancel_Order> objPoOrd)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var App = entities.Pur_Cancel_Mas.Where(c => c.Pur_Ord_Id == objPoCanEditEntry.Pur_Ord_Id).FirstOrDefault();
                    if (App != null)
                    {
                        App.Remarks = objPoCanEditEntry.Remarks;
                        App.CancelDate = objPoCanEditEntry.CancelDate;

                    }
                    entities.SaveChanges();


                    foreach (var itemOrder in objPoOrd)
                    {
                        if (itemOrder.CancelQty > 0 && itemOrder.CancelOrdID > 0)
                        {

                            ////Update the buybom
                            var Pg1 = entities.Proc_Apparel_GetPurchaseCancelOrderbomDetEditUpdate(itemOrder.Pur_Ord_BuyJobid == null ? 0 : itemOrder.Pur_Ord_BuyJobid, itemOrder.CancelQty, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMid == null ? 0 : itemOrder.UOMid, itemOrder.OrderNo, itemOrder.StyleId);
                            entities.SaveChanges();

                        }
                    }


                    foreach (var k in objPoDet)
                    {
                        var e = entities.Pur_Cancel_Det.Where(a => a.CancelDetID.Equals(k.CancelDetID)).FirstOrDefault();
                        if (e != null)
                        {


                            e.CancelId = k.CancelId;
                            e.CancelDetID = k.CancelDetID;
                            e.ItemId = k.ItemId;
                            e.ColorId = k.ColorId;
                            e.SizeId = k.SizeId;
                            e.UomId = k.UomId;
                            e.CancelQty = k.CancelQty;
                            e.Pur_Ord_DetId = k.Pur_Ord_DetId;
                        }

                        ////Update the PurDet

                        foreach (var k1 in objPoDet)
                        {
                            var e1 = entities.Pur_Ord_Det.Where(a => a.Pur_Ord_DetId.Equals(k1.Pur_Ord_DetId)).FirstOrDefault();
                            if (e1 != null)
                            {

                                e1.Cancel_Qty = k1.CancelQty;

                            }
                        }
                        entities.SaveChanges();
                    }

                    foreach (var l in objPoOrd)
                    {



                        var e1 = entities.Pur_Cancel_Order.Where(a => a.CancelOrdID.Equals(l.CancelOrdID)).FirstOrDefault();
                        if (e1 != null)
                        {

                            e1.CancelOrdID = l.CancelOrdID;
                            e1.CancelDetID = l.CancelDetID;
                            e1.CancelId = l.CancelId;
                            e1.Pur_Ord_BuyJobid = l.Pur_Ord_BuyJobid;
                            e1.OrderNo = l.OrderNo;
                            e1.StyleId = l.StyleId;
                            e1.ColorID = l.ColorID;
                            e1.SizeID = l.SizeID;
                            e1.ItemID = l.ItemID;
                            e1.UOMid = l.UOMid;
                            e1.CancelQty = l.CancelQty;
                        }

                    }


                    entities.SaveChanges();



                    foreach (var itemOrder in objPoOrd)
                    {
                        if (itemOrder.CancelQty > 0 && itemOrder.CancelOrdID > 0)
                        {



                            ////Update the buybom
                            var Pg1 = entities.Proc_Apparel_GetPurchaseCancelOrderbomDetUpdate(itemOrder.Pur_Ord_BuyJobid == null ? 0 : itemOrder.Pur_Ord_BuyJobid, itemOrder.CancelQty, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMid == null ? 0 : itemOrder.UOMid, itemOrder.OrderNo, itemOrder.StyleId);
                            entities.SaveChanges();

                        }
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


        public bool DeleteData(List<Pur_Cancel_Order> objPoOrd, int Id)
        {

            int PoMasId = 0;
            int PCanId = 0;
            int POrdDetId = 0;
            var result = false;

            foreach (var itemOrder in objPoOrd)
            {
                if (itemOrder.CancelQty > 0 && itemOrder.CancelOrdID > 0)
                {

                    ////Update the buybom
                    var Pg1 = entities.Proc_Apparel_GetPurchaseCancelOrderbomDetEditUpdate(itemOrder.Pur_Ord_BuyJobid == null ? 0 : itemOrder.Pur_Ord_BuyJobid, itemOrder.CancelQty, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMid == null ? 0 : itemOrder.UOMid, itemOrder.OrderNo, itemOrder.StyleId);
                    entities.SaveChanges();

                }


            }



            //get data
            var OQuery = entities.Pur_Cancel_Mas.Where(b => b.CancelId == Id).FirstOrDefault();
            if (OQuery != null)
            {

                PoMasId = OQuery.Pur_Ord_Id;
                PCanId = OQuery.CancelId;

            }

            entities.SaveChanges();

            var PDEt = entities.Pur_Cancel_Det.Where(u => u.CancelId == Id);

            foreach (var d in PDEt)
            {
                POrdDetId = d.Pur_Ord_DetId;

                var e1 = entities.Pur_Ord_Det.Where(a => a.Pur_Ord_DetId.Equals(POrdDetId)).FirstOrDefault();
                if (e1 != null)
                {

                    e1.Cancel_Qty = 0;

                }

            }
            entities.SaveChanges();


            var App = entities.Pur_Ord_Mas.Where(c => c.pur_ord_id == PoMasId).FirstOrDefault();
            if (App != null)
            {
                App.cancel = false;


            }
            entities.SaveChanges();


            //Ord 
            var Det = entities.Pur_Cancel_Order.Where(u => u.CancelId == Id);

            foreach (var d in Det)
            {
                entities.Pur_Cancel_Order.Remove(d);
            }
            entities.SaveChanges();


            //det
            var Mas = entities.Pur_Cancel_Det.Where(u => u.CancelId == Id);

            foreach (var v in Mas)
            {
                entities.Pur_Cancel_Det.Remove(v);
            }
            entities.SaveChanges();

            //mas
            var M = entities.Pur_Cancel_Mas.Where(u => u.CancelId == Id);

            foreach (var v in M)
            {
                entities.Pur_Cancel_Mas.Remove(v);
            }
            entities.SaveChanges();


            result = true;
            return result;
        }
    }
}
