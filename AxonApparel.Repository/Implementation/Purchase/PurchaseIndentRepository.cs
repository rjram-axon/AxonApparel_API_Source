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
    public class PurchaseIndentRepository : IPurchaseIndentRepository
    {
        PurchaseEntities entities = new PurchaseEntities();

        int PIndDetId = 0;

        public IList<PurchaseIndentMas> GetRepLoad(int? Companyid, int? BuyerId, string OrdNo, string RefNo, string JobNo, string Purchase_Type, string Purchase_itemType)
        {
            var query = (from Ad in entities.Proc_Apparel_GetPurchaseOrderIndAddDetails(Companyid == null ? 0 : Companyid, BuyerId == null ? 0 : BuyerId, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(JobNo) ? "" : JobNo, string.IsNullOrEmpty(Purchase_Type) ? "" : Purchase_Type, string.IsNullOrEmpty(Purchase_itemType) ? "" : Purchase_itemType)
                         select new PurchaseIndentMas
                         {
                             StyleRowId = (int)Ad.Stylerowid,
                             OrdNo = Ad.Order_No,
                             RefNo = Ad.Ref_No,
                             Style = Ad.Style,
                             OrderDate = (DateTime)Ad.Order_Date,
                             JobNo = Ad.Job_ord_No,
                             Buyer = Ad.Buyer,
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<PurchaseIndentMas> GetDataOrderRepDetails(int? CompId, string OType)
        {
            IQueryable<PurchaseIndentMas> query = (from cd1 in entities.Proc_Apparel_GetPurchaseIndAddOrderDropDown(CompId == null ? 0 : CompId, string.IsNullOrEmpty(OType) ? "" : OType)
                                                   select new PurchaseIndentMas
                                               {
                                                   OrdNo = cd1.OrderNo,
                                                   BMasId = (int)cd1.BmasId,
                                                   RefNo = cd1.RefNo,
                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentMas> GetDataBuyRepDetails(int? CompId, string OType)
        {
            IQueryable<PurchaseIndentMas> query = (from cd2 in entities.Proc_Apparel_GetPurchaseIndAddBuyerDropDown(CompId == null ? 0 : CompId, string.IsNullOrEmpty(OType) ? "" : OType)
                                                   select new PurchaseIndentMas
                                                   {
                                                       Buyer = cd2.Buyer,
                                                       BuyerId = (int)cd2.BuyerId,

                                                   }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentMas> GetDataWorkRepDetails(int? CompId, string OType)
        {
            IQueryable<PurchaseIndentMas> query = (from cd3 in entities.Proc_Apparel_GetPurchaseIndAddJobOrdDropDown(CompId == null ? 0 : CompId, string.IsNullOrEmpty(OType) ? "" : OType)
                                                   select new PurchaseIndentMas
                                                   {
                                                       JobId = (int)cd3.JobId,
                                                       JobNo = cd3.JobNo,

                                                   }).AsQueryable();
            return query;
        }


        public IList<PurchaseIndentDet> GetRepEntryIndItemLoad(string StyleRowId, string Purchase_Type, string Purchase_itemType)
        {
            var query = (from ID in entities.Proc_Apparel_GetPurchaseIndEntryItemDetails(StyleRowId, Purchase_Type, Purchase_itemType)
                         select new PurchaseIndentDet
                         {
                             Item = ID.Item,
                             Itemid = (int)ID.Itemid,
                             Color = ID.Color,
                             Colorid = (int)ID.colorid,
                             Size = ID.Size,
                             Sizeid = (int)ID.sizeid,
                             Unit = ID.Unit,
                             BalanceQty = (decimal)ID.Order_Qty,
                             BaseUnit = ID.BaseUnit,
                             BaseUomid = (int)ID.BaseUnitid,
                             PurUomid = (int)ID.Pur_UOMid,
                             AppRate = (decimal)ID.Apprate,
                             CGST = ID.CGST,
                             SGST = ID.SGST,
                             IGST = ID.IGST,
                             HSNCODE = ID.HsNCode,
                             Rate = (decimal)ID.Apprate,
                             ItemRemark = ID.itemremarks,
                             Amt = 0,
                             Quantity = 0,
                             Sec_Qty = 0,
                             SNo = (int)ID.SNo,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PurchaseIndentOrder> GetRepEntryIndOrderLoad(string StyleRowId, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string Purchase_Type)
        {
            var query = (from IDO in entities.Proc_Apparel_GetPurchaseEntryIndOrderDetails(StyleRowId, ItemID, ColorID, SizeID, PurUomId, Purchase_Type)
                         select new PurchaseIndentOrder
                         {
                             Item = IDO.Item,
                             ItemID = (int)IDO.Itemid,
                             Color = IDO.Color,
                             ColorID = (int)IDO.Colorid,
                             Size = IDO.Size,
                             SizeID = (int)IDO.Sizeid,
                             //Uom = IDO.,
                             OrderNo = IDO.Order_No,
                             ORefNo = IDO.Ref_No,
                             Styleid = IDO.Styleid,
                             OStyle = IDO.Style,
                             quantity = quantity,
                             BuyODetId = IDO.Buy_Ord_BOMDetid,
                             PurUomId = (int)IDO.Pur_UOMid,
                             BomQty = (decimal)IDO.BOM_Qty,
                             OBQty = (decimal)IDO.order_bal_qty,
                             Indent_BuyJobid = 0,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool AddDetData(Indent_Mas objPoIEntry, List<Indent_Det> objPoIDet, List<Indent_BuyJob> objPoIOrd)
        {
            int PurIndMasId = 0;
            bool reserved = false;
            int BomMasid = 0;
            int StyId = 0;
            int Buomid = 0;
            int Suomid = 0;
            int? IColID = 0;
            int? ISizID = 0;
            string Color = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    entities.Indent_Mas.Add(objPoIEntry);
                    entities.SaveChanges();
                    PurIndMasId = objPoIEntry.IndentMasid;
                    foreach (var item in objPoIDet)
                    {
                       

                        if (item.Colorid == 0)
                        {
                            var OQueryc = entities.Color.Where(b => b.Colorname == "-").FirstOrDefault();
                            if (OQueryc != null)
                            {
                                IColID = OQueryc.Colorid;                              
                            }
                            
                        }
                        else
                        {
                            IColID = item.Colorid;
                        }

                        if (item.Sizeid == 0)
                        {
                            var OQuerys = entities.Size.Where(b => b.size1 == "-").FirstOrDefault();
                            if (OQuerys != null)
                            {
                                ISizID = OQuerys.SizeId;
                            }
                        }
                        else
                        {
                            ISizID = item.Sizeid;
                        }
                        var OQueryg = entities.Item.Where(b => b.ItemId == item.Itemid).FirstOrDefault();
                        if (OQueryg != null)
                        {
                            Buomid = (int)OQueryg.Bas_Unit;
                            Suomid = (int)OQueryg.Sec_Unit;
                        }

                        item.Indentmasid = PurIndMasId;
                        item.UOMid = Buomid;
                        item.Sec_UOMid = Suomid;
                        item.Colorid = IColID;
                        item.Sizeid = ISizID;
                        entities.Indent_Det.Add(item);
                        entities.SaveChanges();
                        PIndDetId = item.Indentdetid;

                        if (objPoIEntry.Purchase_Type != "G")
                        {
                            foreach (var itemOrder in objPoIOrd)
                            {

                                var OQuery = entities.Buy_Ord_BOMDet.Where(b => b.Buy_Ord_BOMDetid == itemOrder.Buy_Ord_BomDetid).FirstOrDefault();
                                if (OQuery != null)
                                {
                                    BomMasid = OQuery.Buy_Ord_BOMid;

                                }

                                var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => b.Buy_Ord_BOMid == BomMasid).FirstOrDefault();
                                if (OQuery1 != null)
                                {
                                    StyId = (int)OQuery1.Styleid;

                                }


                                if (itemOrder.Quantity > 0)
                                {
                                    if (item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.Sec_UOMid == itemOrder.UOMId)
                                    {

                                        itemOrder.IndentMasid = PurIndMasId;
                                        itemOrder.IndentDetid = PIndDetId;
                                        entities.Indent_BuyJob.Add(itemOrder);


                                        var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomIndDetUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, StyId, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.Quantity == null ? 0 : itemOrder.Quantity, itemOrder.Buy_Ord_BomDetid, objPoIEntry.Purchase_Type);
                                        entities.SaveChanges();
                                    }
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


        public IQueryable<PurchaseIndentMas> GetDataIndMoRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentMas> query = (from cd in entities.Proc_Apparel_GetPurIndOrderLoadMainOrdRefDropDown(Companyid, Purchase_Type, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                   select new PurchaseIndentMas
                                               {
                                                   OrdNo = cd.OrdNo,
                                                   RefNo = cd.RefNo,
                                                   BMasId = cd.BMasId,

                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentMas> GetDataIndMIRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentMas> query = (from cd1 in entities.Proc_Apparel_GetPurIndOrderLoadMainIndentNoDropDown(Companyid, Purchase_Type, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                   select new PurchaseIndentMas
                                               {
                                                   IndentMasid = cd1.IndMasId,
                                                   IndentNo = cd1.IndNo,
                                                   EmployeeId = cd1.EmpId,
                                                   Employee = cd1.Employee,

                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentMas> GetDataIndMSRepDetails(int? Companyid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentMas> query = (from cd2 in entities.Proc_Apparel_GetPurIndMainStatusDropDown()
                                                   select new PurchaseIndentMas
                                                   {
                                                       Status = cd2.Status,
                                                       StatusId = cd2.statusID,

                                                   }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseIndentMas> GetDataPurIndMainDetails(string OrdNo, string RefNo, int? Company_unitid, int? Companyid, int? SectionID, int? EmployeeId, int? IndentMasid, string Purchase_Type, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseIndentMas> query = (from a in entities.Proc_Apparel_GetPurchaseIndentOrderLoadMain(string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, Company_unitid == null ? 0 : Company_unitid, Companyid == null ? 0 : Companyid, SectionID == null ? 0 : SectionID, EmployeeId == null ? 0 : EmployeeId, IndentMasid == null ? 0 : IndentMasid, Purchase_Type, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                   select new PurchaseIndentMas
                                               {
                                                   Company = a.Company,
                                                   CompUnit = a.companyunit,
                                                   IndentNo = a.IndentNo,
                                                   IndentDate = (DateTime)a.Indentdate,
                                                   IndentMasid = a.IndentMasid,
                                                   Section = a.Section,
                                                   Employee = a.employee,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseIndentMas> GetDataRepEditIndDetails(int Id)
        {
            IQueryable<PurchaseIndentMas> query = (from a in entities.Proc_Apparel_GetPurIndEditDetails(Id)
                                                   select new PurchaseIndentMas
                                                   {
                                                       Companyid = a.CompanyId,
                                                       Company = a.Company,
                                                       CompUnit = a.CompanyUnit,
                                                       Company_unitid = a.Company_unitid,
                                                       IndentDate = (DateTime)a.IndentDate,
                                                       IndentNo = a.IndentNo,
                                                       IndentMasid = a.IndentMasid,
                                                       IndentType = a.IndentType,
                                                       Purchase_itemType = a.Purchase_itemType,
                                                       Purchase_Type = a.Purchase_Type,
                                                       Remarks = a.Remarks,
                                                       Section = a.SectionName,
                                                       SectionID = a.SectionID,
                                                       Departmentid = a.Departmentid,
                                                       Department = a.Department,
                                                       Employee = a.Employee,
                                                       EmployeeId = (int)a.EmployeeId,


                                                   }).AsQueryable();

            return query;
        }


        public IList<PurchaseIndentDet> GetRepEntryEditIndItemLoad(string IndentMasid, string Purchase_Type)
        {
            var query = (from ID in entities.Proc_Apparel_GetPurchaseIndEntryEditItemDetails(IndentMasid, Purchase_Type)
                         select new PurchaseIndentDet
                         {
                             Item = ID.item,
                             Itemid = (int)ID.itemid,
                             Color = ID.color,
                             Colorid = (int)ID.colorid,
                             Size = ID.size,
                             Sizeid = (int)ID.sizeid,
                             Unit = ID.Unit,
                             BalanceQty = 0,//(decimal)ID.Order_Qty,
                             BaseUnit = ID.BaseUnit,
                             BaseUomid = (int)ID.BaseUnitid,
                             PurUomid = (int)ID.Pur_UOMid,
                             AppRate = 0,//(decimal)ID.Apprate,
                             CGST = 0,//(decimal)ID.CGST,
                             SGST = 0,//(decimal)ID.SGST,
                             IGST = 0,//(decimal)ID.IGST,
                             HSNCODE = ID.HsNCode,
                             Rate = (decimal)ID.Rate,
                             ItemRemark = ID.itemremarks,
                             Amt = (decimal)ID.Amt,
                             Quantity = ID.Qty,
                             Sec_Qty = ID.SecQty,
                             SNo = (int)ID.SNo,
                             Indentdetid = (int)ID.Indentdetid,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PurchaseIndentOrder> GetRepEntryEditIndOrderLoad(string IndentMasid, int OItemid, int OColorid, int OSizeid, int OUomid, string Purchase_Type)
        {
            var query = (from IDO in entities.Proc_Apparel_GetPurchaseIndEditOrderDetails(IndentMasid, OItemid, OColorid, OSizeid, OUomid, Purchase_Type)
                         select new PurchaseIndentOrder
                         {
                             Item = IDO.item,
                             ItemID = (int)IDO.itemid,
                             Color = IDO.Color,
                             ColorID = (int)IDO.colorid,
                             Size = IDO.size,
                             SizeID = (int)IDO.sizeid,
                             //Uom = IDO.,
                             OrderNo = IDO.Order_No,
                             ORefNo = IDO.Ref_No,
                             Styleid = IDO.Styleid,
                             OStyle = IDO.Style,
                             quantity = IDO.quantity,
                             BuyODetId = IDO.Buy_Ord_BOMDetid,
                             PurUomId = (int)IDO.Pur_UOMid,
                             BomQty = (decimal)IDO.BOM_Qty,
                             OBQty = (decimal)IDO.Order_Bal_Qty,
                             Indent_BuyJobid = IDO.Pur_Ord_BuyJobid,
                             IndentDetid = IDO.Indentdetid,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(Indent_Mas objPoEEntry, List<Indent_Det> objPoEDet, List<Indent_BuyJob> objPoEOrd)
        {
            bool reserved = false;

            int PurIndMasId = 0;
            int BomMasid = 0;
            int StyId = 0;

            int? CurID = 0;
            int? BillCId = 0;
            int? ToAppId = 0;
            int? AppById = 0;
            int? IsCrBy = 0;
            int? IPay = 0;
            int CmpId = 0;

            int Buomid = 0;
            int Suomid = 0;
            int? IColID = 0;
            int? ISizID = 0;
            //string OType = "";
            string PType = "";

            //var result = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Indent_Mas.Where(c => c.IndentMasid == objPoEEntry.IndentMasid).FirstOrDefault();
                    if (App != null)
                    {


                        App.IndentNo = objPoEEntry.IndentNo;
                        App.IndentDate = objPoEEntry.IndentDate;
                        App.Companyid = objPoEEntry.Companyid;
                        App.Company_unitid = objPoEEntry.Company_unitid;
                        App.Purchase_Type = objPoEEntry.Purchase_Type;
                        App.Purchase_itemType = objPoEEntry.Purchase_itemType;
                        App.Remarks = objPoEEntry.Remarks;
                        App.Cancel = objPoEEntry.Cancel;
                        App.Closed = "N";
                        App.Approved = objPoEEntry.Approved;
                        App.EmployeeId = objPoEEntry.EmployeeId;
                        App.Departmentid = objPoEEntry.Departmentid;
                        App.SectionID = objPoEEntry.SectionID;
                        //CurrencyId=POIEntry.CurrencyId,
                        App.CurrencyId = null;
                        App.IndentType = objPoEEntry.IndentType;
                        App.IndentMasid = objPoEEntry.IndentMasid;
                    }
                    entities.SaveChanges();

                    if (objPoEEntry.Purchase_Type != "G")
                    {
                        foreach (var itemOrd in objPoEOrd)
                        {
                            var OQuery = entities.Buy_Ord_BOMDet.Where(b => b.Buy_Ord_BOMDetid == itemOrd.Buy_Ord_BomDetid).FirstOrDefault();
                            if (OQuery != null)
                            {
                                BomMasid = OQuery.Buy_Ord_BOMid;

                            }

                            var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => b.Buy_Ord_BOMid == BomMasid).FirstOrDefault();
                            if (OQuery1 != null)
                            {
                                StyId = (int)OQuery1.Styleid;

                            }

                            foreach (var ED in objPoEOrd)
                            {
                                var result6 = entities.Proc_Apparel_GetPurchaseIndEditBomQty(ED.Order_No, StyId, ED.ItemID, ED.ColorID, ED.SizeID, ED.UOMId, ED.Quantity, ED.Buy_Ord_BomDetid, objPoEEntry.Purchase_Type, ED.IndentMasid);
                                entities.SaveChanges();
                            }
                        }
                    }

                    foreach (var k in objPoEDet)
                    {
                        if (k.Indentdetid > 0)
                        {
                            if (k.Colorid == 0)
                            {
                                //IColID = null;
                                var OQueryc = entities.Color.Where(b => b.Colorname == "-").FirstOrDefault();
                                if (OQueryc != null)
                                {
                                    IColID = OQueryc.Colorid;
                                }
                            }
                            else
                            {
                                IColID = k.Colorid;
                            }

                            if (k.Sizeid == 0)
                            {
                                var OQuerys = entities.Size.Where(b => b.size1 == "-").FirstOrDefault();
                                if (OQuerys != null)
                                {
                                    ISizID = OQuerys.SizeId;
                                }
                            }
                            else
                            {
                                ISizID = k.Sizeid;
                            }
                            var e = entities.Indent_Det.Where(a => a.Indentdetid.Equals(k.Indentdetid)).FirstOrDefault();
                            if (e != null)
                            {

                                e.Indentdetid = k.Indentdetid;
                                e.Indentmasid = k.Indentmasid;
                                e.Itemid = k.Itemid;
                                e.Colorid = IColID;
                                e.Sizeid = ISizID;
                                e.Quantity = k.Quantity;
                                e.UOMid = k.UOMid;
                                //e.PurOrderQty = 0;
                                //e.ReceivedQty = 0;
                                e.ItemRemark = k.ItemRemark;
                                e.Sec_Qty = k.Sec_Qty;
                                e.Sec_UOMid = k.Sec_UOMid;
                                e.Mfrid = null;
                                e.Cancel_Qty = 0;
                                e.Close_Qty = 0;
                                e.AppQty = 0;
                                e.AppRate = 0;
                                e.BalanceQty = 0;
                                e.ActualAppQty = 0;
                                e.Rate = k.Rate;
                            }
                        }
                        else
                        {
                            if (k.Colorid == 0)
                            {
                                IColID = null;
                            }
                            else
                            {
                                IColID = k.Colorid;
                            }

                            if (k.Sizeid == 0)
                            {
                                ISizID = null;
                            }
                            else
                            {
                                ISizID = k.Sizeid;
                            }
                            var OQueryg = entities.Item.Where(b => b.ItemId == k.Itemid).FirstOrDefault();
                            if (OQueryg != null)
                            {
                                Buomid = (int)OQueryg.Bas_Unit;
                                Suomid = (int)OQueryg.Sec_Unit;
                            }

                            k.Indentmasid = objPoEEntry.IndentMasid;
                            k.UOMid = Buomid;
                            k.Sec_UOMid = Suomid;
                            k.Colorid = IColID;
                            k.Sizeid = ISizID;
                            entities.Indent_Det.Add(k);
                            entities.SaveChanges();


                        }
                    }
                    entities.SaveChanges();
                    if (objPoEEntry.Purchase_Type != "G")
                    {
                        foreach (var l in objPoEOrd)
                        {
                            var e1 = entities.Indent_BuyJob.Where(a => a.Indent_BuyJobid.Equals(l.Indent_BuyJobid)).FirstOrDefault();
                            if (e1 != null)
                            {


                                e1.Indent_BuyJobid = l.Indent_BuyJobid;
                                e1.Order_No = l.Order_No;
                                e1.Quantity = l.Quantity;
                                e1.IndentDetid = l.IndentDetid;
                                e1.Buy_Ord_BomDetid = l.Buy_Ord_BomDetid;
                                e1.IndentMasid = l.IndentMasid;
                                e1.PurordQty = 0;//POrderDetails.ReceivedQty,
                                e1.Cancel_Qty = 0;
                                e1.ItemCode = "";//POrderDetails.ItemCode,
                                e1.ReceivedQty = 0;//POrderDetails.ReturnQty,
                                //ReqDate = POrderDetails.ReqDate,
                                e1.ItemRemarks = "";
                                e1.ItemID = l.ItemID;
                                e1.SizeID = l.SizeID;
                                e1.ColorID = l.ColorID;
                                e1.UOMId = l.UOMId;
                            }
                        }
                        entities.SaveChanges();

                        //update Bomdet table
                        foreach (var ED in objPoEOrd)
                        {
                            var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomIndDetUpdate(string.IsNullOrEmpty(ED.Order_No) ? "" : ED.Order_No, StyId, ED.ItemID == null ? 0 : ED.ItemID, ED.ColorID == null ? 0 : ED.ColorID, ED.SizeID == null ? 0 : ED.SizeID, ED.UOMId == null ? 0 : ED.UOMId, ED.Quantity == null ? 0 : ED.Quantity, ED.Buy_Ord_BomDetid, objPoEEntry.Purchase_Type);
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


        public bool DeleteData(List<Indent_BuyJob> objPoEOrd, int IndMasId, string OrdType)
        {
            int BomMasid = 0;
            int StyId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (OrdType == "G")
                    {

                        foreach (var ED in objPoEOrd)
                        {

                            var OQuery = entities.Buy_Ord_BOMDet.Where(b => b.Buy_Ord_BOMDetid == ED.Buy_Ord_BomDetid).FirstOrDefault();
                            if (OQuery != null)
                            {
                                BomMasid = OQuery.Buy_Ord_BOMid;

                            }

                            var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => b.Buy_Ord_BOMid == BomMasid).FirstOrDefault();
                            if (OQuery1 != null)
                            {
                                StyId = (int)OQuery1.Styleid;

                            }


                            var result6 = entities.Proc_Apparel_GetPurchaseIndEditBomQty(ED.Order_No, StyId, ED.ItemID, ED.ColorID, ED.SizeID, ED.UOMId, ED.Quantity, ED.Buy_Ord_BomDetid, OrdType, ED.IndentMasid);
                            entities.SaveChanges();
                        }


                        //Indjob
                        var CDet = entities.Indent_BuyJob.Where(u => u.IndentMasid == IndMasId);

                        foreach (var v in CDet)
                        {
                            entities.Indent_BuyJob.Remove(v);
                        }
                    }
                    //Det 
                    var Det = entities.Indent_Det.Where(u => u.Indentmasid == IndMasId);

                    foreach (var d in Det)
                    {
                        entities.Indent_Det.Remove(d);
                    }
                    entities.SaveChanges();


                    //Mas
                    var Mas = entities.Indent_Mas.Where(u => u.IndentMasid == IndMasId);

                    foreach (var v in Mas)
                    {
                        entities.Indent_Mas.Remove(v);
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
    }
}
