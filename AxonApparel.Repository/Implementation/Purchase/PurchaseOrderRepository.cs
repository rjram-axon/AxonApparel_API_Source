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
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        HouseKeepingEntities Misentities = new HouseKeepingEntities();

        int PDetId = 0;

        public IList<PurchaseOrder> GetRepLoad(int? companyId, int? BuyId, string BMasId, string RefNo, string StyId, string OType, string PType, string LocalImport, string PurIndType, string Itype, string Igroup)
        {


            string BMId = "";
            if (BMasId != "")
            {
                BMId = BMasId;
            }
            else
            {
                BMId = "";
            }


            var query = (from YD in entities.Proc_Apparel_GetPurchaseOrderAddDetails(companyId == null ? 0 : companyId, BuyId == null ? 0 : BuyId, string.IsNullOrEmpty(BMId) ? "" : BMId, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(StyId) ? "" : StyId, string.IsNullOrEmpty(OType) ? "" : OType, string.IsNullOrEmpty(PType) ? "" : PType, string.IsNullOrEmpty(LocalImport) ? "" : LocalImport, PurIndType, string.IsNullOrEmpty(Itype) ? "" : Itype, string.IsNullOrEmpty(Igroup) ? "" : Igroup)
                         select new PurchaseOrder
                         {
                             Buyer = YD.buyer,
                             OrderNo = YD.Order_No,
                             orddate = (DateTime)YD.Order_Date,
                             RefNo = YD.Ref_No,
                             Style = YD.Style,
                             StyleRowId = YD.Stylerowid,
                         }).AsQueryable();

            return query.ToList();
        }
        public IList<PurchaseOrder> GetRepLoadIndentord(int? companyId, int? BuyId, string BMasId, string RefNo, int? StyId, string OType, string PType, string LocalImport, string PurIndType)
        {


            string BMId = "";
            if (BMasId != "")
            {
                BMId = BMasId;
            }
            else
            {
                BMId = "";
            }


            var query = (from YD in entities.Proc_Apparel_GetPurchaseOrderAddDetailsIndent(companyId == null ? 0 : companyId, BuyId == null ? 0 : BuyId, string.IsNullOrEmpty(BMId) ? "" : BMId, string.IsNullOrEmpty(RefNo) ? "" : RefNo, StyId == null ? 0 : StyId, string.IsNullOrEmpty(OType) ? "" : OType, string.IsNullOrEmpty(PType) ? "" : PType, string.IsNullOrEmpty(LocalImport) ? "" : LocalImport, PurIndType)
                         select new PurchaseOrder
                         {
                             Buyer = YD.buyer,
                             OrderNo = YD.Order_No,
                             orddate = (DateTime)YD.Order_Date,
                             RefNo = YD.Ref_No,
                             Style = YD.Style,
                             StyleRowId = YD.Stylerowid,
                         }).AsQueryable();

            return query.ToList();
        }
        public IList<PurchaseOrder> GetSRRepLoad(int? companyId, int? BuyId, string OrdNo, string RefNo, int? StyId, string OType, string PType)
        {





            var query = (from SYD in entities.Proc_Apparel_GetPurchaseSplOrderAddDetails(companyId == null ? 0 : companyId, BuyId == null ? 0 : BuyId, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, StyId == null ? 0 : StyId, string.IsNullOrEmpty(OType) ? "" : OType, string.IsNullOrEmpty(PType) ? "" : PType)
                         select new PurchaseOrder
                         {
                             SplMasId = SYD.SpReqId,
                             OrderNo = SYD.OrderNo,
                             RefNo = SYD.RefNo,
                             Style = SYD.Style,
                             SplEntryNo = SYD.SpReqNo,
                             job_ord_no = SYD.JobNo,
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<TermsCondition> GetTermsCondLoad(int Id)
        {
            try
            {
                var query = (from TC in entities.Pur_Ord_Term.Where(e => e.PurOrdId == Id)
                             select new TermsCondition
                             {
                                 TermId = TC.TermId,
                                 Description = TC.Descriptions,
                                 TermsSeq = 0,
                                 TermName = entities.TermMas.Where(w => w.TermId == TC.TermId).Select(s => s.TermName).FirstOrDefault(),
                             }).AsQueryable();

                return query.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList<PurchaseOrderItemDet> GetRepEntryItemLoad(string StyleRowId, string OType, string Purchase_ItemType, string LocalImport, string IGId, string PurIndType, int supplierid, string UserName)
        {
            int curid = 0;

            int? Currencyid = Misentities.MisPath.Where(c => c.MispathId == c.MispathId).Select(c => c.dCurrencyId).FirstOrDefault();


            var query = (from ID in entities.Proc_Apparel_GetPurchaseEntryItemDetails(StyleRowId, OType, Purchase_ItemType, LocalImport, IGId, PurIndType, supplierid, UserName)
                         select new PurchaseOrderItemDet
                         {
                             Item = ID.item,
                             ItemID = (int)ID.itemid,
                             Color = ID.color,
                             ColorID = (int)ID.colorid,
                             Size = ID.size,
                             SizeID = (int)ID.sizeid,
                             Unit = ID.Unit,
                             OrdBal = (decimal)ID.Order_Qty,
                             BaseUnit = ID.BaseUnit,
                             BaseUnitId = (int)ID.BaseUnitid,
                             PurUomId = (int)ID.Pur_UOMid,
                             AppRate = (decimal)ID.Apprate,                             
                             CGST = ID.CGST,
                             SGST = ID.SGST,
                             IGST = ID.IGST,
                             HSNCODE = ID.HsNCode,
                             Rate = (decimal)ID.Apprate,
                             ItemRemarks = ID.itemremarks,
                             Amt = 0,
                             quantity = 0,
                             Sec_Qty = 0,
                             //StyleRowId = ID.StyleRowid,
                             SNo = (int)ID.SNo,
                             Reqdate=System.DateTime.Now,
                             gsttaxcode=ID.gsttaxcode,
                             IndDetId=ID.IndDetId,
                             currencyid=ID.currencyid,
                             DCurrencyid = Currencyid
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurchaseOrderDet> GetRepEntryOrderLoad(string StyleRowId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, string OType, string LocalImport, string PurIndType)
        {
            var query = (from IDO in entities.Proc_Apparel_GetPurchaseEntryOrderDetails(StyleRowId, ItemId, ColorId, SizeId, Uomid, OType, LocalImport, PurIndType)
                         select new PurchaseOrderDet
                         {
                             Item = IDO.item,
                             ItemID = (int)IDO.itemid,
                             Color = IDO.color,
                             ColorID = (int)IDO.colorid,
                             Size = IDO.size,
                             SizeID = (int)IDO.sizeid,
                             Uom = IDO.Unit,
                             OrderNo = IDO.Order_No,
                             ORefNo = IDO.Ref_No,
                             Styleid = IDO.Styleid,
                             OStyle = IDO.Style,
                             quantity = quantity,
                             BuyODetId = IDO.Buy_Ord_BOMDetid,
                             PurUomId = (int)IDO.Pur_UOMid,
                             BomQty = (decimal)IDO.BOM_Qty,
                             OBQty = (decimal)IDO.Order_Bal_Qty,
                             Pur_Ord_BuyJobid = 0,
                             IndBuyJobId = IDO.Indentdetid,
                             PlanItmRmks=IDO.PlanImRemarks,
                             IndDetId=IDO.Indentdetid,

                         }).AsQueryable();

            return query.ToList();
        }



        public bool AddDetData(Pur_Ord_Mas objPoEntry, List<Pur_Ord_Det> objPoDet, List<Pur_Ord_BuyJob> objPoOrd, List<Pur_Ord_AddLess> objPoAddDet, string OType, List<TermsCondition> objPoTerm, string PurIndType)
        {
            int PurMasId = 0;
            bool reserved = false;
            string PType = "";
            int OrgBomDetId = 0;
            int OrgIndbuyJobId = 0;
            int? IStyID = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (objPoEntry.pur_ord_id == 0)
                    {
                        if (objPoEntry.Purchase_ItemType == "L")
                        {
                            PType = "";
                        }
                        else
                        {
                            PType = objPoEntry.Purchase_ItemType;
                        }

                        objPoEntry.Purchase_ItemType = PType;
                        entities.Pur_Ord_Mas.Add(objPoEntry);
                        entities.SaveChanges();
                        PurMasId = objPoEntry.pur_ord_id;
                        foreach (var item in objPoDet)
                        {
                                                        

                            item.Pur_ord_id = PurMasId;
                            entities.Pur_Ord_Det.Add(item);
                            entities.SaveChanges();
                            PDetId = item.Pur_Ord_DetId;

                            foreach (var itemOrder in objPoOrd)
                            {


                                if (itemOrder.Styleid == 0)
                                {
                                    IStyID = null;
                                }
                                else
                                {
                                    IStyID = itemOrder.Styleid;
                                }

                                if (PurIndType == "Y")
                                {
                                    if (itemOrder.quantity > 0)
                                    {
                                        if (item.ItemID == itemOrder.ItemID && item.ColorID == itemOrder.ColorID && item.SizeID == itemOrder.SizeID && item.UOMId == itemOrder.UOMId)
                                        {

                                            if (objPoEntry.Purchase_Type != "G")
                                            {

                                                if (PurIndType == "Y")
                                                {
                                                    OrgBomDetId = (int)itemOrder.IndBuyJobId;
                                                    OrgIndbuyJobId = (int)itemOrder.BomdetId;
                                                }
                                                else
                                                {
                                                    OrgBomDetId = (int)itemOrder.BomdetId;
                                                    OrgIndbuyJobId = (int)itemOrder.IndBuyJobId;
                                                }
                                            }
                                            else
                                            {
                                                if (PurIndType == "Y")
                                                {
                                                    OrgBomDetId = (int)itemOrder.BomdetId;
                                                    OrgIndbuyJobId = (int)itemOrder.IndBuyJobId;
                                                }
                                            }
                                            itemOrder.BomdetId = OrgBomDetId;
                                            itemOrder.IndBuyJobId = OrgIndbuyJobId;
                                            itemOrder.pur_ord_id = PurMasId;
                                            itemOrder.pur_ord_Detid = PDetId;
                                            itemOrder.Styleid = IStyID;
                                            entities.Pur_Ord_BuyJob.Add(itemOrder);

                                            //Update the bomdet 
                                            //var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(itemOrder.Order_No, itemOrder.Styleid, itemOrder.ItemID, itemOrder.ColorID, itemOrder.SizeID, itemOrder.UOMId, itemOrder.quantity);
                                            if (PurIndType == "Y")
                                            {
                                                //var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, itemOrder.Styleid == null ? 0 : itemOrder.Styleid, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.quantity == null ? 0 : itemOrder.quantity, itemOrder.IndBuyJobId, OType);
                                                //entities.SaveChanges();


                                                var Pg2 = entities.Proc_Apparel_GetPurchaseOrderIndBomOrdUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, itemOrder.Styleid == null ? 0 : itemOrder.Styleid, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.quantity == null ? 0 : itemOrder.quantity, itemOrder.BomdetId, itemOrder.IndBuyJobId, itemOrder.IndBuyJobId, OType);
                                                entities.SaveChanges();
                                            }
                                        }

                                       
                                    }
                                }
                                else
                                {
                                    if (itemOrder.quantity > 0)
                                    {
                                        if (item.ItemID == itemOrder.ItemID && item.ColorID == itemOrder.ColorID && item.SizeID == itemOrder.SizeID && item.UOMId == itemOrder.UOMId)
                                        {

                                            if (objPoEntry.Purchase_Type != "G")
                                            {

                                                if (PurIndType == "Y")
                                                {
                                                    OrgBomDetId = (int)itemOrder.IndBuyJobId;
                                                    OrgIndbuyJobId = (int)itemOrder.BomdetId;
                                                }
                                                else
                                                {
                                                    OrgBomDetId = (int)itemOrder.BomdetId;
                                                    OrgIndbuyJobId = (int)itemOrder.IndBuyJobId;
                                                }
                                            }
                                            else
                                            {
                                                if (PurIndType == "Y")
                                                {
                                                    OrgBomDetId = (int)itemOrder.BomdetId;
                                                    OrgIndbuyJobId = (int)itemOrder.IndBuyJobId;
                                                }
                                            }
                                            itemOrder.BomdetId = OrgBomDetId;
                                            itemOrder.IndBuyJobId = OrgIndbuyJobId;
                                            itemOrder.pur_ord_id = PurMasId;
                                            itemOrder.pur_ord_Detid = PDetId;
                                            itemOrder.Styleid = IStyID;
                                            entities.Pur_Ord_BuyJob.Add(itemOrder);

                                            //Update the bomdet 
                                            //var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(itemOrder.Order_No, itemOrder.Styleid, itemOrder.ItemID, itemOrder.ColorID, itemOrder.SizeID, itemOrder.UOMId, itemOrder.quantity);
                                            if (PurIndType == "N")
                                            {

                                                var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, itemOrder.Styleid == null ? 0 : itemOrder.Styleid, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.quantity == null ? 0 : itemOrder.quantity, itemOrder.BomdetId, OType);
                                                entities.SaveChanges();
                                            }
                                        }

                                        if (PurIndType == "Y")
                                        {
                                            //var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, itemOrder.Styleid == null ? 0 : itemOrder.Styleid, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.quantity == null ? 0 : itemOrder.quantity, itemOrder.IndBuyJobId, OType);
                                            //entities.SaveChanges();


                                            var Pg2 = entities.Proc_Apparel_GetPurchaseOrderIndBomOrdUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, itemOrder.Styleid == null ? 0 : itemOrder.Styleid, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.quantity == null ? 0 : itemOrder.quantity, itemOrder.BomdetId, itemOrder.IndBuyJobId, itemOrder.IndBuyJobId, OType);
                                            entities.SaveChanges();
                                        }
                                    }
                                }
                            }

                        }


                    }
                    //General new item add in Edit mode

                    if (objPoEntry.Purchase_Type == "G")
                    {
                        foreach (var item in objPoDet)
                        {
                            if (item.Pur_Ord_DetId == 0)
                            {
                                entities.Pur_Ord_Det.Add(item);
                            }
                        }
                        entities.SaveChanges();
                    }
                    //
                    foreach (var Pay in objPoAddDet)
                    {
                        if (Pay.Pur_Ord_id == 0)
                        {

                            Pay.Pur_Ord_id = PurMasId;
                            entities.Pur_Ord_AddLess.Add(Pay);
                        }
                        else
                        {
                            entities.Pur_Ord_AddLess.Add(Pay);
                        }
                    }
                    entities.SaveChanges();

                    var TermSCondDetails = new List<Pur_Ord_Term>();
                    if (objPoTerm.Count > 0)
                    {
                        foreach (var item in objPoTerm)
                        {
                            TermSCondDetails.Add(new Repository.Pur_Ord_Term
                            {
                                TermId = item.TermId,
                                Descriptions = item.Description,
                                PurOrdId = PurMasId
                            });
                        }
                    }

                    foreach (var termscondi in TermSCondDetails)
                    {
                        entities.Pur_Ord_Term.Add(termscondi);
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

        public bool AddDetAccData(List<Pur_Ord_AddLess> objPoAddDet)
        {
            foreach (var Pay in objPoAddDet)
            {
                entities.Pur_Ord_AddLess.Add(Pay);
            }
            entities.SaveChanges();
            return true;
        }


        public int AddData(Pur_Ord_Mas objPoEntry)
        {
            var id = entities.Pur_Ord_Mas.Add(objPoEntry);
            entities.SaveChanges();
            return id.pur_ord_id;

        }


        public IQueryable<PurchaseOrder> GetDataRepEditDetails(int Id)
        {
            IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurchaseOrderEditMaindetails(Id)
                                               select new PurchaseOrder
                                              {
                                                  Supplier = a.Supplier,
                                                  SupplierId = (int)a.Supplierid,
                                                  Unit_Supplier = a.Unit_Supplier,
                                                  pur_ord_id = a.Pur_Ord_Id,
                                                  pur_ord_no = a.PoNo,
                                                  Unit_Supplier_Self = a.Unit_Supplier_Self,
                                                  BillCompany = a.BillCompany,
                                                  BillCompType = a.BillCompType,
                                                  Paytermid = a.Pay_termid,
                                                  TaxAmount = a.taxamount,
                                                  TaxPercent = a.taxpercent,
                                                  ReqNo = a.ReqNo,
                                                  RateMode = a.Paymode,
                                                  ToApprove = a.ToApprove,
                                                  advance = a.advance,
                                                  chequeno = a.chequeno,
                                                  currencyid = a.Currencyid,
                                                  exchange_rate = a.ExchangeRate,
                                                  LocalImport=a.LocalImport,
                                                  CPDetId = (decimal)(a.PDetId == null ? 0 : a.PDetId),
                                                  remarks=a.Remarks,
                                                  IsApproved=a.IsApproved



                                              }).AsQueryable();

            return query;
        }


        public IList<PurchaseOrderItemDet> GetRepEntryEditItemLoad(int Id, string OType, string LocalImport, string PurIndType)
        {
           // int? Currencyid = Misentities.MisPath.Where(c => c.MispathId == c.MispathId).Select(c => c.dCurrencyId).FirstOrDefault();

            var query = (from EID in entities.Proc_Apparel_GetPurchaseEditItemDetails(Id, OType, LocalImport, PurIndType)
                         select new PurchaseOrderItemDet
                         {
                             Item = EID.item,
                             ItemID = (int)EID.itemid,
                             Color = EID.color,
                             ColorID = (int)EID.colorid,
                             Size = EID.size,
                             SizeID = (int)EID.sizeid,
                             Unit = EID.Unit,
                             OrdBal = (decimal)EID.Order_Qty,
                             BaseUnit = EID.BaseUnit,
                             BaseUnitId = (int)EID.BaseUnitid,
                             PurUomId = (int)EID.Pur_UOMid,
                             AppRate = (decimal)EID.Apprate,
                             CGST = EID.CGST,
                             ItemRemarks = EID.itemremarks,
                             SGST = EID.SGST,
                             IGST = EID.IGST,
                             HSNCODE = EID.HsNCode,
                             Rate = EID.Rate,
                             Amt = (decimal)EID.Amt,
                             quantity = EID.Qty,
                             Sec_Qty = EID.SecQty,
                             //StyleRowId = ID.StyleRowid,
                             SNo = (int)EID.SNo,
                             CGSTAMt = EID.CGSTAMT,
                             SGSTAMT = EID.SGSTAMT,
                             IGSTAMT = EID.IGSTAMT,
                             //Pur_Ord_DetId = (int)EID.Pur_Ord_DetId,
                             Pur_Ord_DetId = (int)(EID.Pur_Ord_DetId == null ? 0 : EID.Pur_Ord_DetId),
                             Reqdate=(DateTime)EID.Reqdate,
                             gsttaxcode = EID.GSTtaxcode,
                            // currencyid = EID.currencyid,
                             //DCurrencyid = Currencyid
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurchaseOrderDet> GetRepEditOrderLoad(string PurOrdId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, string OType, string LocalImport, string PurIndType)
        {
            var query = (from EIDO in entities.Proc_Apparel_GetPurchaseEditOrderDetails(PurOrdId, ItemId, ColorId, SizeId, Uomid, OType, LocalImport, PurIndType)
                         select new PurchaseOrderDet
                         {
                             Item = EIDO.item,
                             ItemID = (int)EIDO.itemid,
                             Color = EIDO.Color,
                             ColorID = (int)EIDO.colorid,
                             Size = EIDO.size,
                             SizeID = (int)EIDO.sizeid,
                             Uom = EIDO.Unit,
                             OrderNo = EIDO.Order_No,
                             ORefNo = EIDO.Ref_No,
                             Styleid = EIDO.Styleid,
                             OStyle = EIDO.Style,
                             quantity = EIDO.quantity,//(decimal)EIDO.quantity,
                             //quantity = (decimal)(quantity == 0 ? quantity : EIDO.quantity),
                             BuyODetId = EIDO.Buy_Ord_BOMDetid,
                             PurUomId = (int)EIDO.Pur_UOMid,
                             BomQty = (decimal)EIDO.BOM_Qty,
                             OBQty = (decimal)EIDO.Order_Bal_Qty,
                             Pur_Ord_BuyJobid = (int)EIDO.Pur_Ord_BuyJobid,
                             IndBuyJobId=EIDO.Indent_BuyJobid,
                             PlanItmRmks=EIDO.Plan_ItmRemarks,
                             IndDetId=EIDO.Indentdetid,
                         }).AsQueryable();

            return query.ToList();
        }



        public bool UpdateDetData(Pur_Ord_Mas objPoEEntry, List<Pur_Ord_Det> objPoEDet, List<Pur_Ord_BuyJob> objPoEOrd, List<Pur_Ord_AddLess> objPoEADet, string OType,string PurIndType)
        {
            bool reserved = false;

            int? CurID = 0;
            int? BillCId = 0;
            int? ToAppId = 0;
            int? AppById = 0;
            int? IsCrBy = 0;
            int? IPay = 0;
            int CmpId = 0;
            //string OType = "";
            string PType = "";
            int OrgPurJobId = 0;
            int OrgBomDetId = 0;
            int? IStyID = 0;
            //delete the programm summary table
            var OQuery = entities.Pur_Ord_Mas.Where(b => b.pur_ord_id == objPoEEntry.pur_ord_id).FirstOrDefault();
            if (OQuery != null)
            {
                CmpId = OQuery.companyid;
                OType = OQuery.Purchase_Type;
                PType = OQuery.Purchase_ItemType;

            }

            //Delete record of TermsandCondition
            var TermsCondQuery = entities.Pur_Ord_Term.Where(b => b.PurOrdId == objPoEEntry.pur_ord_id).ToList();
            if (TermsCondQuery != null)
            {
                var deletetermscondition = entities.Pur_Ord_Term.Where(d => d.PurOrdId == objPoEEntry.pur_ord_id).ToList<Pur_Ord_Term>();
                deletetermscondition.ForEach(c => entities.Pur_Ord_Term.Remove(c));
                entities.SaveChanges();
            }

            if (objPoEEntry.currencyid == 0)
            {
                CurID = null;
            }
            else
            {
                CurID = objPoEEntry.currencyid;
            }


            if (objPoEEntry.Paytermid == 0)
            {
                IPay = null;
            }
            else
            {
                IPay = objPoEEntry.Paytermid;
            }

            if (objPoEEntry.BillCompany == 0)
            {
                BillCId = null;
            }
            else
            {
                BillCId = objPoEEntry.BillCompany;
            }

            if (objPoEEntry.ToApprove == 0)
            {
                ToAppId = null;
            }
            else
            {
                ToAppId = objPoEEntry.ToApprove;
            }
            if (objPoEEntry.ApprovedBY == 0)
            {
                AppById = null;
            }
            else
            {
                AppById = objPoEEntry.ApprovedBY;
            }
            if (objPoEEntry.CreatedBy == 0)
            {
                IsCrBy = null;
            }
            else
            {
                IsCrBy = objPoEEntry.CreatedBy;
            }

            //var result = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var App = entities.Pur_Ord_Mas.Where(c => c.pur_ord_id == objPoEEntry.pur_ord_id).FirstOrDefault();
                    if (App != null)
                    {


                        App.pur_ord_no = objPoEEntry.pur_ord_no;
                        App.companyid = CmpId;
                        App.orddate = objPoEEntry.orddate;
                        App.supplierid = objPoEEntry.supplierid;
                        App.Purchase_Type = OType;
                        App.Purchase_ItemType = PType;
                        App.remarks = objPoEEntry.remarks;
                        App.ord_commit = objPoEEntry.ord_commit;
                        App.cancel = false;
                        App.Unit_Supplier_Self = objPoEEntry.Unit_Supplier_Self;
                        App.Unit_Supplier = objPoEEntry.Unit_Supplier;
                        App.Amount = objPoEEntry.Amount;
                        App.ord_close = false;
                        App.unit_or_other = objPoEEntry.unit_or_other;
                        App.Amend = objPoEEntry.Amend;
                        App.currencyid = CurID;
                        App.exchange_rate = objPoEEntry.exchange_rate;
                        App.LocalImport = objPoEEntry.LocalImport;
                        App.ReqDate = objPoEEntry.orddate;
                        App.BillCompany = BillCId;
                        App.Closed = "N";
                        App.remainderid = objPoEEntry.remainderid;
                        App.Paytermid = IPay;
                        App.ReqNo = objPoEEntry.ReqNo;
                        App.BillCompType = objPoEEntry.BillCompType;
                        App.TaxPercent = objPoEEntry.TaxPercent;
                        App.TaxAmount = objPoEEntry.TaxAmount;
                        App.WITH_ANNEXURE = objPoEEntry.WITH_ANNEXURE;
                        App.AddLessType = objPoEEntry.AddLessType;
                        App.AddLessManualOrFormula = objPoEEntry.AddLessManualOrFormula;
                        App.IsApproved = objPoEEntry.IsApproved;
                        App.ToApprove = ToAppId;
                        App.ApprovedBY = AppById;
                        App.ApproveDate = objPoEEntry.IsApproved=="N"?null:objPoEEntry.ApproveDate;
                        App.RateMode = "O";
                        App.CreatedBy = IsCrBy;
                        App.Potype = objPoEEntry.Potype;
                        App.TOTCGSTAMT = objPoEEntry.TOTCGSTAMT;
                        App.TOTSGSTAMT = objPoEEntry.TOTSGSTAMT;
                        App.TOTIGSTAMT = objPoEEntry.TOTIGSTAMT;
                        App.chequeno = objPoEEntry.chequeno;
                        App.advance = objPoEEntry.advance;
                        App.paymode = objPoEEntry.paymode;
                    }
                    entities.SaveChanges();

                    foreach (var ED in objPoEOrd)
                    {
                        if (PurIndType == "N")
                        {
                            var result6 = entities.Proc_Apparel_GetPurchaseEditBomQty(ED.Order_No, ED.Styleid, ED.ItemID, ED.ColorID, ED.SizeID, ED.UOMId, ED.quantity, ED.BomdetId, OType, ED.pur_ord_id);
                            entities.SaveChanges();
                        }

                        if (PurIndType == "Y")
                        {
                            var ED2 = entities.Proc_Apparel_GetPurchaseEditIndBomQty(ED.Order_No, ED.Styleid, ED.ItemID, ED.ColorID, ED.SizeID, ED.UOMId, ED.quantity, ED.Pur_Ord_BuyJobid, ED.Pur_Ord_BuyJobid, OType, ED.pur_ord_id);
                            entities.SaveChanges();
                        }
                    }

                    foreach (var k in objPoEDet)
                    {
                        var e = entities.Pur_Ord_Det.Where(a => a.Pur_Ord_DetId.Equals(k.Pur_Ord_DetId)).FirstOrDefault();
                        if (e != null)
                        {
                            e.Pur_Ord_DetId = k.Pur_Ord_DetId;
                            e.Pur_ord_id = k.Pur_ord_id;
                            e.ItemID = k.ItemID;
                            e.SizeID = k.SizeID;
                            e.ColorID = k.ColorID;
                            e.UOMId = k.UOMId;
                            e.quantity = k.quantity;
                            e.ReceivedQty = 0;
                            e.Rate = k.Rate;
                            e.Reqdate = k.Reqdate;
                            e.ItemRemark = k.ItemRemark;
                            e.Sec_Qty = k.Sec_Qty;
                            e.Sec_UOMid = k.Sec_UOMid;
                            //Mfrid = PItem.Mfrid,
                            e.Cancel_Qty = 0;//PItem.Cancel_Qty,
                            e.Close_Qty = 0;//PItem.Close_Qty,
                            e.Amend = k.Amend;
                            e.currencyid = k.currencyid;
                            e.exchangerate = 0;//PItem.exchangerate,
                            e.receivable_qty = k.receivable_qty;
                            e.Debit_qty = k.Debit_qty;
                            e.RefConversion = k.RefConversion;
                            e.ReturnQty = k.ReturnQty;
                            e.CGSTAMt = k.CGSTAMt;
                            e.SGSTAMT = k.SGSTAMT;
                            e.IGSTAMT = k.IGSTAMT;
                            e.CGST = k.CGST;
                            e.SGST = k.SGST;
                            e.IGST = k.IGST;
                            e.HSNCODE = k.HSNCODE;
                            e.TOTCGSTAMT = k.TOTCGSTAMT;
                            e.TOTSGSTAMT = k.TOTSGSTAMT;
                            e.TOTIGSTAMT = k.TOTIGSTAMT;
                            e.GSTtaxcode = k.GSTtaxcode;
                        }
                    }
                    entities.SaveChanges();

                    foreach (var l in objPoEOrd)
                    {

                        if (l.Styleid == 0)
                        {
                            IStyID = null;
                        }
                        else
                        {
                            IStyID = l.Styleid;
                        }

                        if (objPoEEntry.Purchase_Type != "G")
                        {

                            if (PurIndType == "Y")
                            {
                                OrgBomDetId = (int)l.IndBuyJobId;
                                OrgPurJobId = (int)l.BomdetId;
                            }
                            else
                            {
                                OrgBomDetId = (int)l.BomdetId;
                                OrgPurJobId = (int)l.Pur_Ord_BuyJobid;
                            }
                        }
                        else
                        {
                            if (PurIndType == "Y")
                            {
                                OrgBomDetId = (int)l.BomdetId;
                                OrgPurJobId = (int)l.Pur_Ord_BuyJobid;
                            }
                        }


                        l.Pur_Ord_BuyJobid = OrgPurJobId;

                        var e1 = entities.Pur_Ord_BuyJob.Where(a => a.Pur_Ord_BuyJobid.Equals(l.Pur_Ord_BuyJobid)).FirstOrDefault();
                        if (e1 != null)
                        {

                            e1.Pur_Ord_BuyJobid = l.Pur_Ord_BuyJobid;
                            e1.Order_No = l.Order_No;
                            e1.Styleid = IStyID;
                            e1.quantity = l.quantity;
                            //pur_ord_Detid = POrderDetails.pur_ord_Detid,
                            e1.pur_ord_id = l.pur_ord_id;
                            e1.ReceivedQty = 0;//POrderDetails.ReceivedQty,
                            e1.Cancel_Qty = 0;
                            e1.ItemCode = "";//POrderDetails.ItemCode,
                            e1.ReturnQty = 0;//POrderDetails.ReturnQty,
                            //ReqDate = POrderDetails.ReqDate,
                            e1.ItemID = l.ItemID;
                            e1.SizeID = l.SizeID;
                            e1.ColorID = l.ColorID;
                            e1.UOMId = l.UOMId;
                            e1.Plan_ItmRemarks = l.Plan_ItmRemarks;
                        }
                    }
                    entities.SaveChanges();
                    //Update Addless

                    foreach (var j in objPoEADet)
                    {
                        var d = entities.Pur_Ord_AddLess.Where(a => a.Pur_Ord_Discountid.Equals(j.Pur_Ord_Discountid)).FirstOrDefault();
                        if (d != null)
                        {
                            d.Pur_Ord_Discountid = j.Pur_Ord_Discountid;
                            d.Pur_Ord_id = j.Pur_Ord_id;
                            d.Addlessid = j.Addlessid;
                            d.Percentage = j.Percentage;
                            d.PlusOrMinus = j.PlusOrMinus;
                            d.Amount = j.Amount;
                        }
                    }
                    entities.SaveChanges();
                    //update Bomdet table
                    foreach (var ED in objPoEOrd)
                    {
                        if (PurIndType == "N")
                        {
                            var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(string.IsNullOrEmpty(ED.Order_No) ? "" : ED.Order_No, ED.Styleid == null ? 0 : ED.Styleid, ED.ItemID == null ? 0 : ED.ItemID, ED.ColorID == null ? 0 : ED.ColorID, ED.SizeID == null ? 0 : ED.SizeID, ED.UOMId == null ? 0 : ED.UOMId, ED.quantity == null ? 0 : ED.quantity, ED.BomdetId, OType);
                            entities.SaveChanges();
                        }

                        if (PurIndType == "Y")
                        {
                            var Pg2 = entities.Proc_Apparel_GetPurchaseOrderIndBomOrdUpdate(string.IsNullOrEmpty(ED.Order_No) ? "" : ED.Order_No, ED.Styleid == null ? 0 : ED.Styleid, ED.ItemID == null ? 0 : ED.ItemID, ED.ColorID == null ? 0 : ED.ColorID, ED.SizeID == null ? 0 : ED.SizeID, ED.UOMId == null ? 0 : ED.UOMId, ED.quantity == null ? 0 : ED.quantity, OrgBomDetId, ED.IndBuyJobId, ED.IndBuyJobId, OType);
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

        public bool UpdateAccData(List<Pur_Ord_AddLess> objPoEADet)
        {
            var result = false;

            foreach (var j in objPoEADet)
            {
                var d = entities.Pur_Ord_AddLess.Where(a => a.Pur_Ord_Discountid.Equals(j.Pur_Ord_Discountid)).FirstOrDefault();
                if (d != null)
                {
                    d.Pur_Ord_Discountid = j.Pur_Ord_Discountid;
                    d.Pur_Ord_id = j.Pur_Ord_id;
                    d.Addlessid = j.Addlessid;
                    d.Percentage = j.Percentage;
                    d.PlusOrMinus = j.PlusOrMinus;
                    d.Amount = j.Amount;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }
        
        public IList<PurchaseOrderAccount> GetRepEditAccLoad(int Id)
        {
            var query = (from AC in entities.Proc_Apparel_GetPurchaseEditAcDetails(Id)
                         select new PurchaseOrderAccount
                         {
                             Pur_Ord_Discountid = AC.Pur_Ord_DiscountID,
                             Pur_Ord_id = AC.Pur_Ord_ID,
                             Addlessid = (int)AC.AddLessID,
                             Percentage = AC.Percentage,
                             PlusOrMinus = AC.PlusOrMinus,
                             Amount = AC.Amount,
                             Addless = AC.AddLess,

                         }).AsQueryable();

            return query.ToList();
        }



        public bool DeleteData(List<Pur_Ord_BuyJob> objPoOrd, int Id, string OType, string PurIndType)
        {


            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //foreach (var v in objPoOrd)
                    //{
                    //    var result6 = entities.Proc_Apparel_GetPurchaseEditBomQty(v.Order_No, v.Styleid, v.ItemID, v.ColorID, v.SizeID, v.UOMId, v.quantity, v.BomdetId, OType, Id);
                    //    entities.SaveChanges();

                    //    if (PurIndType == "Y")
                    //    {
                    //        var ED2 = entities.Proc_Apparel_GetPurchaseEditIndBomQty(v.Order_No, v.Styleid, v.ItemID, v.ColorID, v.SizeID, v.UOMId, v.quantity, v.BomdetId,v.IndBuyJobId, OType, v.pur_ord_id);
                    //        entities.SaveChanges();
                    //    }
                    //}

                    foreach (var v in objPoOrd)
                    {
                        if (PurIndType == "N")
                        {
                            var result6 = entities.Proc_Apparel_GetPurchaseEditBomQty(v.Order_No, v.Styleid, v.ItemID, v.ColorID, v.SizeID, v.UOMId, v.quantity, v.BomdetId, OType, v.pur_ord_id);
                            entities.SaveChanges();
                        }

                        if (PurIndType == "Y")
                        {
                            var ED2 = entities.Proc_Apparel_GetPurchaseEditIndBomQty(v.Order_No, v.Styleid, v.ItemID, v.ColorID, v.SizeID, v.UOMId, v.quantity, v.Pur_Ord_BuyJobid, v.Pur_Ord_BuyJobid, OType, v.pur_ord_id);
                            entities.SaveChanges();
                        }
                    }

                    //Puyjob
                    var CDet = entities.Pur_Ord_BuyJob.Where(u => u.pur_ord_id == Id);

                    foreach (var v in CDet)
                    {
                        entities.Pur_Ord_BuyJob.Remove(v);
                    }

                    //Det 
                    var Det = entities.Pur_Ord_Det.Where(u => u.Pur_ord_id == Id);

                    foreach (var d in Det)
                    {
                        entities.Pur_Ord_Det.Remove(d);
                    }
                    entities.SaveChanges();
                    //Addless
                    var AddLess = entities.Pur_Ord_AddLess.Where(u => u.Pur_Ord_id == Id);

                    foreach (var Add in AddLess)
                    {
                        entities.Pur_Ord_AddLess.Remove(Add);
                    }
                    entities.SaveChanges();

                    //Mas
                    var Mas = entities.Pur_Ord_Mas.Where(u => u.pur_ord_id == Id);

                    foreach (var v in Mas)
                    {
                        entities.Pur_Ord_Mas.Remove(v);
                    }
                    entities.SaveChanges();

                    //Delete record of TermsandCondition
                    var TermsCondQuery = entities.Pur_Ord_Term.Where(b => b.PurOrdId == Id).ToList();
                    if (TermsCondQuery != null)
                    {
                        var deletetermscondition = entities.Pur_Ord_Term.Where(d => d.PurOrdId == Id).ToList<Pur_Ord_Term>();
                        deletetermscondition.ForEach(c => entities.Pur_Ord_Term.Remove(c));
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


        public IList<PurchaseOrderItemDet> GetRepEntryEditItemLoad(int Id)
        {
            throw new NotImplementedException();
        }


        public IQueryable<Pur_Ord_Mas> GetDataList()
        {
            return entities.Pur_Ord_Mas.OrderBy(c => c.pur_ord_id);
        }


        public IQueryable<PurchaseOrder> GetDataOrderRepDetails(int? CompId, string OType)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseAddOrderDropDown(CompId == null ? 0 : CompId, OType)
                                               select new PurchaseOrder
                                               {
                                                   BMasId = cd.Buy_Ord_MasId,
                                                   OrderNo = cd.ordno,
                                                   RefNo = cd.ref_no,
                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseOrder> GetDataStyleRepDetails(int? CompId, string OType)
        {
            IQueryable<PurchaseOrder> query = (from cd1 in entities.Proc_Apparel_GetPurchaseAddStyleDropDown(CompId == null ? 0 : CompId, OType)
                                               select new PurchaseOrder
                                               {
                                                   Style = cd1.Style,
                                                   StyleId = (int)cd1.Styleid,
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetRepDataPurNomDetails(string StyrowId, string IgId)
        {
            IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurchaseOrderNomDetails(StyrowId, IgId)
                                               select new PurchaseOrder
                                              {
                                                  SupplierId = a.SupplierID,
                                                  Supplier = a.Supplier,
                                                  OrderNo = a.Order_No,
                                                  NomItemId = (int)a.ItemID,
                                              }).AsQueryable();

            return query;
        }

        public IList<TermsCondition> GetLoadTerms(int Id)
        {
            try
            {
                var query = (from TC in entities.TermDet.Where(e => e.TermDetId == Id)
                             select new TermsCondition
                             {
                                 TermId = (int)TC.Termid,
                                 TermName = entities.TermMas.Where(w => w.TermId == TC.Termid).Select(s => s.TermName).FirstOrDefault(),
                             }).AsQueryable();

                return query.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IQueryable<Domain.TermDet> GetTermDesc(int Id)
        {
            try
            {
                var query = (from TC in entities.TermDet.Where(e => e.TermDetId == Id)
                             select new Domain.TermDet
                             {
                                 TermDesc = TC.TermDesc
                             }).AsQueryable();

                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IQueryable<Domain.PurchaseOrder> GetStateGST(int Supplierid, int Companyid)
        {
            try
            {
                var query = (from TC in entities.Proc_Apparel_GetSupplierGstState(Supplierid, Companyid)
                             select new Domain.PurchaseOrder
                             {
                                 chkSGST = (int)TC.SGST,
                                 chkCGST = (int)TC.CGST,
                                 chkIGST = (int)TC.IGST,

                             }).AsQueryable();

                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}
