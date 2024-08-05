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
    public class PurchaseGrnEntryRepository : IPurchaseGrnEntryRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        int PGDetId = 0;

        string OrdType = "";
        public IList<PurchaseGrnItemDet> GetRepGrnItemLoad(string PoId, int? CompId, int? SuppId, string pur_type)
        {
            var query = (from ID in entities.Proc_Apparel_GetGrnEntryItemDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, PoId, pur_type)
                         select new PurchaseGrnItemDet
                         {
                             item = ID.Item,
                             itemid = (int)ID.Itemid,
                             color = ID.Color,
                             colorid = (int)ID.colorId,
                             size = ID.Size,
                             sizeid = (int)ID.SizeId,
                             uomId = ID.UnitId,
                             puom = ID.Unit,
                             suomId = ID.SUomId,
                             suom = ID.Suom,
                             excess_qty = 0,
                             Erate = ID.PoRate,
                             Amt = 0,
                             receivable_qty = 0,
                             Sec_Qty = 0,
                             Grn_MasId = 0,
                             Grn_DetId = 0,
                             balance = (decimal)ID.Balance,
                             rate = ID.PoRate,
                             SNo = (int)ID.SNo,
                             AllowValue = ID.AllowValue > 0 ? (decimal)(ID.Balance + ID.AllowValue) : (decimal)(((decimal)(Convert.ToDecimal(ID.Percentage) * ID.Balance) / 100) + ID.Balance),
                             RateSno=(int)ID.RateSno
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurchaseGrnOrder> GetRepEntryGrnOrderLoad(string MPurId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, string pur_type)
        {
            var query = (from GD in entities.Proc_Apparel_GetGrnEntryOrderDetails(MPurId, ItemId, ColorId, SizeId, Uomid, pur_type)
                         select new PurchaseGrnOrder
                         {
                             OItemid = (int)GD.Itemid,
                             OColorid = (int)GD.Colorid,
                             OSizeid = (int)GD.Sizeid,
                             OUomid = GD.Unitid,
                             Grn_DetOrdId = 0,
                             grn_detid = 0,
                             pur_ord_detid = GD.Pur_Ord_DetId,
                             GrnPurOrdNo = GD.Pur_ord_no,
                             Manufacturer = GD.mfr,
                             actual_mfrid = GD.mfrid,
                             PoDate = (DateTime)GD.Orddate,
                             //PoRate = GD.Rate,
                             Balance = (decimal)GD.Balance,
                             quantity = 0,
                             OldQty = 0,
                             BOldQty = 0,
                             //Rate = GD.Rate,
                             Rate_Diff = 0,
                             Excess_Qty = 0,
                             PoRate = (decimal)GD.MinRate,
                             Rate = (decimal)GD.MinRate,
                         }).AsQueryable();

            return query.ToList();
        }




        public bool AddDetData(Pur_Grn_Mas objPoEntry, List<Pur_Grn_Det> objPoDet, List<Pur_Grn_Order> objPoOrd)
        {

            int GrnMasId = 0;
            bool reserved = false;
            string PType = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objPoEntry.Grn_MasId == 0)
                    {
                        if (objPoEntry.Pur_ItemType == "L")
                        {
                            PType = "";
                        }
                        else
                        {
                            PType = objPoEntry.Pur_ItemType;
                        }

                        objPoEntry.Pur_ItemType = PType;
                        entities.Pur_Grn_Mas.Add(objPoEntry);
                        entities.SaveChanges();
                        GrnMasId = objPoEntry.Grn_MasId;
                        foreach (var item in objPoDet)
                        {
                            item.Grn_MasId = GrnMasId;
                            entities.Pur_Grn_Det.Add(item);
                            entities.SaveChanges();
                            PGDetId = item.Grn_DetId;

                            foreach (var itemOrder in objPoOrd)
                            {
                                if (itemOrder.quantity > 0)
                                {
                                    if (item.itemid == itemOrder.ItemID && item.colorid == itemOrder.ColorID && item.sizeid == itemOrder.SizeID && item.uomId == itemOrder.UOMId)
                                    {
                                        itemOrder.grn_detid = PGDetId;
                                        entities.Pur_Grn_Order.Add(itemOrder);



                                        ////Update the PurDet
                                        var Pg1 = entities.Proc_Apparel_GetPurchaseGrnDetUpdate(itemOrder.pur_ord_detid == null ? 0 : itemOrder.pur_ord_detid, itemOrder.quantity);
                                        entities.SaveChanges();



                                    }
                                }
                            }
                            string ordno = "";
                            var costid = 0;
                            foreach (var itemOrder in objPoOrd)
                            {
                                if (itemOrder.quantity > 0)
                                {
                                    var Purorddet = entities.Pur_Ord_BuyJob.Where(c => c.pur_ord_Detid == itemOrder.pur_ord_detid).FirstOrDefault();
                                    if (Purorddet != null)
                                    {
                                        ordno = Purorddet.Order_No;

                                    }
                                    var cstdefnmas = entities.Cost_Defn_Mas.Where(c => c.Order_No == ordno).FirstOrDefault();
                                    if (cstdefnmas != null)
                                    {
                                        costid = cstdefnmas.Cost_Defn_id;

                                    }
                                    var cstdefndet = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_id == costid && c.Itemid==itemOrder.ItemID && c.ColorID==itemOrder.ColorID && c.SizeID==itemOrder.SizeID).FirstOrDefault();
                                    if (cstdefndet != null)
                                    {
                                        cstdefndet.Actual_Qty = itemOrder.quantity;
                                        cstdefndet.Actual_Rate = itemOrder.Rate;

                                    }
                                    entities.SaveChanges();
                                }
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


        public IQueryable<PurchaseGrnMas> GetDataRepGrnEditDetails(int Id)
        {
            IQueryable<PurchaseGrnMas> query = (from a in entities.Proc_Apparel_GetPurchaseGrnEditMaindetails(Id)
                                                select new PurchaseGrnMas
                                               {
                                                   Supplier = a.Supplier,
                                                   supplierid = (int)a.SuppId,
                                                   companyid = a.CompId,
                                                   Company = a.Company,
                                                   receipt_no = a.GrnNo,
                                                   Dc_no = a.Dcno,
                                                   Dc_date = (DateTime)a.Dc_date,
                                                   receipt_date = (DateTime)a.receipt_date,
                                                   Inward_No = a.InwNo,
                                                   Supp_Inv_No = a.SupInvNo,
                                                   Remarks = a.Remarks,
                                                   CreatedBy = a.Createdby,
                                                   StoreName = a.StoreName,
                                                   StoreUnitID = a.StoreUnitId,
                                                   Qlty_No = a.QltyNo,
                                                   SuppInvdate = (DateTime)a.SuppInvDate,
                                                    ParentUnitid=a.Parentstoreid,
                                                   Storetype=a.StoreType

                                               }).AsQueryable();

            return query;
        }

        public IList<PurchaseGrnItemDet> GetRepGrnEntryEditItemLoad(int Id, int SupId, int CompId, string pur_type)
        {

            if (pur_type == "S")
            {
                OrdType = "SP";
            }
            else
            {
                OrdType = pur_type;
            }

            var query = (from EID in entities.Proc_Apparel_GetPurchaseGrnEditItemDetails(Id, SupId, CompId, OrdType)
                         select new PurchaseGrnItemDet
                         {
                             item = EID.item,
                             itemid = (int)EID.itemid,
                             color = EID.color,
                             colorid = (int)EID.colorid,
                             size = EID.size,
                             sizeid = (int)EID.sizeid,
                             uomId = EID.unitid,
                             puom = EID.unit,
                             suomId = EID.Suomid,
                             suom = EID.Suom,
                             excess_qty = EID.ExcessQty,
                             Erate = 0,
                             Amt = (decimal)EID.grnQty * EID.rate,
                             received_qty = (decimal)EID.grnQty,
                             Sec_Qty = EID.SecQty,
                             Grn_MasId = EID.GrnMasId,
                             Grn_DetId = EID.GrnDetId,
                             balance = (decimal)EID.Balance + (decimal)EID.grnQty,
                             rate = EID.rate,
                             SNo = (int)EID.SNo,
                             AllowValue = EID.allow_value > 0 ? (decimal)(EID.Balance + (decimal)EID.grnQty + EID.allow_value) : (decimal)(((decimal)(Convert.ToDecimal(EID.Percentage) * EID.Balance) / 100) + EID.Balance),
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PurchaseGrnOrder> GetRepGrnEditOrderLoad(string GrnMasId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, int SupId, int CompId, string pur_type)
        {

            if (pur_type == "S")
            {
                OrdType = "SP";
            }
            else
            {
                OrdType = pur_type;
            }

            var query = (from EIDO in entities.Proc_Apparel_GetPurchaseEditGrnOrderDetails(GrnMasId, SupId, CompId, ItemId, ColorId, SizeId, Uomid, OrdType)
                         select new PurchaseGrnOrder
                         {
                             OItemid = (int)EIDO.Itemid,
                             OColorid = (int)EIDO.Colorid,
                             OSizeid = (int)EIDO.Sizeid,
                             OUomid = EIDO.Unitid,
                             Grn_DetOrdId = EIDO.GrnOrdDetID,
                             grn_detid = EIDO.GrnDetID,
                             pur_ord_detid = EIDO.Pur_Ord_DetId,
                             GrnPurOrdNo = EIDO.Pur_ord_no,
                             Manufacturer = EIDO.mfr,
                             actual_mfrid = EIDO.mfrid,
                             PoDate = (DateTime)EIDO.Orddate,
                           //  PoRate = EIDO.Rate,
                             PoRate = EIDO.grnrate,
                             Balance = (decimal)EIDO.Balance + EIDO.grnqty,
                             quantity = EIDO.grnqty,
                             //Rate = EIDO.Rate,
                             Rate = EIDO.grnrate,
                             Rate_Diff = EIDO.rate_diff,
                             Excess_Qty = EIDO.Excess_Qty,
                         }).AsQueryable();

            return query.ToList();
        }

        public bool UpdateData(Pur_Grn_Mas objPoEEntry)
        {


            var result = false;
            var App = entities.Pur_Grn_Mas.Where(c => c.Grn_MasId == objPoEEntry.Grn_MasId).FirstOrDefault();
            if (App != null)
            {
                App.receipt_no = objPoEEntry.receipt_no;
                App.companyid = objPoEEntry.companyid;
                App.company_unitid = objPoEEntry.company_unitid;
                App.receipt_date = objPoEEntry.receipt_date;
                App.supplierid = objPoEEntry.supplierid;
                App.Dc_date = objPoEEntry.Dc_date;
                App.Dc_no = objPoEEntry.Dc_no;
                App.remarks = objPoEEntry.remarks;
                App.grncommit = false;
                App.grncancel = false;
                App.grnclose = false;
                App.pur_type = objPoEEntry.pur_type;
                App.Amend = objPoEEntry.Amend;
                App.Inward_No = objPoEEntry.Inward_No;
                //Pur_ItemType = POGEntry.Pur_ItemType,
                App.Pur_ItemType = (objPoEEntry.Pur_ItemType == null ? "" : objPoEEntry.Pur_ItemType);
                App.DebtRaised = "N";
                App.StoreUnitID = objPoEEntry.StoreUnitID;
                App.CreatedBy = objPoEEntry.CreatedBy;
                App.Supp_Inv_No = objPoEEntry.Supp_Inv_No;
                App.ExcludeInv = false;

            }
            entities.SaveChanges();

            result = true;
            return result;
        }



        public bool UpdateDetData(Pur_Grn_Mas objPoEEntry, List<Pur_Grn_Det> objPoEDet, List<Pur_Grn_Order> objPoEOrd)
        {


            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Pur_Grn_Mas.Where(c => c.Grn_MasId == objPoEEntry.Grn_MasId).FirstOrDefault();
                    if (App != null)
                    {
                        App.receipt_no = objPoEEntry.receipt_no;
                        App.companyid = objPoEEntry.companyid;
                        App.company_unitid = objPoEEntry.company_unitid;
                        App.receipt_date = objPoEEntry.receipt_date;
                        App.supplierid = objPoEEntry.supplierid;
                        App.Dc_date = objPoEEntry.Dc_date;
                        App.Dc_no = objPoEEntry.Dc_no;
                        App.remarks = objPoEEntry.remarks;
                        App.grncommit = false;
                        App.grncancel = false;
                        App.grnclose = false;
                        App.pur_type = objPoEEntry.pur_type;
                        App.Amend = objPoEEntry.Amend;
                        App.Inward_No = objPoEEntry.Inward_No;
                        //Pur_ItemType = POGEntry.Pur_ItemType,
                        App.Pur_ItemType = (objPoEEntry.Pur_ItemType == null ? "" : objPoEEntry.Pur_ItemType);
                        App.DebtRaised = "N";
                        App.StoreUnitID = objPoEEntry.StoreUnitID;
                        App.CreatedBy = objPoEEntry.CreatedBy;
                        App.Supp_Inv_No = objPoEEntry.Supp_Inv_No;
                        App.ExcludeInv = false;

                    }
                    entities.SaveChanges();

                    foreach (var k in objPoEDet)
                    {
                        var e = entities.Pur_Grn_Det.Where(a => a.Grn_DetId.Equals(k.Grn_DetId)).FirstOrDefault();
                        if (e != null)
                        {

                            e.Grn_MasId = k.Grn_MasId;
                            e.Grn_DetId = k.Grn_DetId;
                            e.itemid = k.itemid;
                            e.sizeid = k.sizeid;
                            e.colorid = k.colorid;
                            e.received_qty = k.received_qty;
                            e.uomId = k.uomId;
                            e.rate = k.rate;
                            e.balance = k.balance;
                            e.invoiced_qty = 0;
                            e.debit_id = k.debit_id;
                            e.excess_qty = k.excess_qty;
                            e.debit_rate = k.debit_rate;
                            e.MfrId = k.MfrId;
                            e.Sec_Qty = k.Sec_Qty;
                            e.Excess_Stockid = k.Excess_Stockid;
                            e.rejected_qty = k.rejected_qty;
                            e.shortage_qty = k.shortage_qty;
                            e.accepted_qty = k.accepted_qty;
                            e.return_qty = k.return_qty;
                            e.debit_qty = k.debit_qty;
                            e.receivable_qty = k.receivable_qty;
                            e.Qlty_Excess = k.Qlty_Excess;
                            e.Excess_return = k.Excess_return;
                            e.itemremarks = k.itemremarks;
                            e.Closed = false;
                            e.Short_stkid = k.Short_stkid;
                            e.Reject_stkid = k.Reject_stkid;
                            e.QltyItemRemarks = k.QltyItemRemarks;
                            e.ReturnQty = k.ReturnQty;
                            e.Grn_RtnId = k.Grn_RtnId;
                        }
                    }

                    foreach (var v in objPoEOrd)
                    {
                        if (v.Grn_DetOrdId > 0 && v.quantity == 0)
                        {
                            var result7 = entities.Proc_Apparel_GetPurchaseGrnDeleteGrnOrder(v.Grn_DetOrdId);
                            entities.SaveChanges();
                        }
                        if (v.Grn_DetOrdId > 0 && v.quantity > 0)
                        {

                            var result6 = entities.Proc_Apparel_GetPurchaseGrnDeleteDet(v.Grn_DetOrdId, v.quantity);
                            entities.SaveChanges();
                        }
                    }

                    foreach (var l in objPoEOrd)
                    {

                        

                        var e1 = entities.Pur_Grn_Order.Where(a => a.Grn_DetOrdId.Equals(l.Grn_DetOrdId)).FirstOrDefault();
                        if (e1 != null)
                        {


                            e1.pur_ord_detid = l.pur_ord_detid;
                            e1.actual_mfrid = l.actual_mfrid;//POrderDetails.actual_mfrid,
                            e1.quantity = l.quantity;
                            e1.Rate = l.Rate;
                            e1.Invoiced_Qty = l.Invoiced_Qty;
                            e1.Rate_Diff = l.Rate_Diff;
                            e1.Excess_Qty = l.Excess_Qty;
                            e1.ItemID = l.ItemID;
                            e1.ColorID = l.ColorID;
                            e1.SizeID = l.SizeID;
                            e1.UOMId = l.UOMId;
                            e1.grn_detid = l.grn_detid;
                            e1.Grn_DetOrdId = l.Grn_DetOrdId;
                        }
                    }



                    entities.SaveChanges();


                    //update Bomdet table
                    foreach (var ED in objPoEOrd)
                    {
                        if (ED.pur_ord_detid > 0 && ED.quantity > 0)
                        {

                            //var Pg1 = entities.Proc_Apparel_GetPurchaseGrnEditDetUpdate(ED.Grn_DetOrdId == null ? 0 : ED.Grn_DetOrdId, ED.quantity);
                            //entities.SaveChanges();

                            var Pg1 = entities.Proc_Apparel_GetPurchaseGrnDetUpdate(ED.pur_ord_detid == null ? 0 : ED.pur_ord_detid, ED.quantity);
                            entities.SaveChanges();
                        }
                    }
                    string ordno = "";
                    var costid = 0;
                    foreach (var itemOrder in objPoEOrd)
                    {
                        if (itemOrder.quantity > 0)
                        {
                            var Purorddet = entities.Pur_Ord_BuyJob.Where(c => c.pur_ord_Detid == itemOrder.pur_ord_detid).FirstOrDefault();
                            if (Purorddet != null)
                            {
                                ordno = Purorddet.Order_No;

                            }
                            var cstdefnmas = entities.Cost_Defn_Mas.Where(c => c.Order_No == ordno).FirstOrDefault();
                            if (cstdefnmas != null)
                            {
                                costid = cstdefnmas.Cost_Defn_id;

                            }
                            var cstdefndet = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_id == costid && c.Itemid == itemOrder.ItemID && c.ColorID == itemOrder.ColorID && c.SizeID == itemOrder.SizeID).FirstOrDefault();
                            if (cstdefndet != null)
                            {
                                cstdefndet.Actual_Qty = itemOrder.quantity;
                                cstdefndet.Actual_Rate = itemOrder.Rate;

                            }
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
                    exceplogg.SendExcepToDB(ex, "PurchaseGrn-UpdateDetData");
                }
            }
            return reserved;
        }


        public bool DeleteData(List<Pur_Grn_Order> objPoOrd, int Id)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var v in objPoOrd)
                    {
                        if (v.Grn_DetOrdId > 0)
                        {
                       
                            var result6 = entities.Proc_Apparel_GetPurchaseGrnDeleteDet(v.Grn_DetOrdId, v.quantity);
                            entities.SaveChanges();

                            var result7 = entities.Proc_Apparel_GetPurchaseGrnDeleteGrnOrder(v.Grn_DetOrdId);
                            entities.SaveChanges();
                        }

                    }
                    string ordno = "";
                    var costid = 0;
                    foreach (var itemOrder in objPoOrd)
                    {
                        if (itemOrder.quantity > 0)
                        {
                            var Purorddet = entities.Pur_Ord_BuyJob.Where(c => c.pur_ord_Detid == itemOrder.pur_ord_detid).FirstOrDefault();
                            if (Purorddet != null)
                            {
                                ordno = Purorddet.Order_No;

                            }
                            var cstdefnmas = entities.Cost_Defn_Mas.Where(c => c.Order_No == ordno).FirstOrDefault();
                            if (cstdefnmas != null)
                            {
                                costid = cstdefnmas.Cost_Defn_id;

                            }
                            var cstdefndet = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_id == costid && c.Itemid == itemOrder.ItemID && c.ColorID == itemOrder.ColorID && c.SizeID == itemOrder.SizeID).FirstOrDefault();
                            if (cstdefndet != null)
                            {
                                cstdefndet.Actual_Qty = 0;
                                cstdefndet.Actual_Rate = 0;

                            }
                            entities.SaveChanges();
                        }
                    }


                    //Det 
                    var Det = entities.Pur_Grn_Det.Where(u => u.Grn_MasId == Id);

                    foreach (var d in Det)
                    {
                        entities.Pur_Grn_Det.Remove(d);
                    }
                    entities.SaveChanges();


                    //Mas
                    var Mas = entities.Pur_Grn_Mas.Where(u => u.Grn_MasId == Id);

                    foreach (var v in Mas)
                    {
                        entities.Pur_Grn_Mas.Remove(v);
                    }
                    entities.SaveChanges();



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseGrn-DeleteData");
                }
            }
            return reserved;
        }


        public IQueryable<Pur_Grn_Mas> GetDataList()
        {
            return entities.Pur_Grn_Mas.OrderBy(c => c.Grn_MasId);
        }





        public Pur_Grn_Mas CheckRefRep(string DCNo, int supplierid, string CurrYear)
        {
            return entities.Pur_Grn_Mas.Where(c => c.Dc_no == DCNo && c.supplierid == supplierid && c.receipt_no.ToUpper().Substring(8, 4) == CurrYear).FirstOrDefault();
        }


        public IList<PurchaseGrnItemDet> GetPurchaseItemRemarks(int Detid, string Type)
        {
            var query = (from ID in entities.Proc_Apparel_GetPurchaseItemRem(Detid, Type)
                         select new PurchaseGrnItemDet
                         {
                             itemremarks = ID.ItemRemark
                             
                         }).AsQueryable();

            return query.ToList();
        }



    }
}
