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
    public class PurchaseInvoiceRepository : IPurchaseInvoiceRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<PurInvMas> GetDataOrderRepDetails(int? CompId, int? SuppId, string OType)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvAddDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, OType)
                                           select new PurInvMas
                                               {
                                                   BMasId = (int)cd.BMasId,
                                                   OrdNo = cd.OrdNo,
                                                   RefNo = cd.RefNo,
                                               }).AsQueryable();
            return query;
        }




        public IQueryable<PurInvMas> GetDataStyleRepDetails(int? CompId, int? SuppId, string OType, string OrdNo)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvAddStyleDropDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, OType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo)
                                           select new PurInvMas
                                           {
                                               Style = cd.Style,
                                               StyleId = (int)cd.StyleId,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<PurInvMas> GetDataGrnRepDetails(int? CompId, int? SuppId, string OType, string OrdNo, int? StyId)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvAddGrnDropDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, OType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, StyId == null ? 0 : StyId)
                                           select new PurInvMas
                                           {
                                               GrnNn = cd.Receipt_No,
                                               GrnMasId = (int)cd.Grn_MasId,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<PurInvMas> GetDataPoRepDetails(int? CompId, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvAddPoDropDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, OType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, StyId == null ? 0 : StyId, GrnMasId == null ? 0 : GrnMasId)
                                           select new PurInvMas
                                           {
                                               PoNo = cd.Pur_ord_No,
                                               PMasId = (int)cd.pur_ord_id,

                                           }).AsQueryable();
            return query;
        }




        public IList<PurInvMas> GetRepAddLoad(int? CompId, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId, int? PMasId, string FDate, string ToDate)
        {
            var query = (from YD in entities.Proc_Apparel_GetPurchaseInvAddGridDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, OType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, StyId == null ? 0 : StyId, GrnMasId == null ? 0 : GrnMasId, PMasId == null ? 0 : PMasId, FDate == null ? "" : FDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                         select new PurInvMas
                         {
                             GrnMasId = YD.Grn_masID,
                             GrnNn = YD.GrnNo,
                             supp_inv_date = (DateTime)YD.Dc_Date,
                             GrnDcNo = YD.Dc_No,
                             Supplier = YD.Supplier,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurInvDc> GetRepInvGrnItemLoad(string GMasId, int? CompId, int? SuppId)
        {
            var query = (from ID in entities.Proc_Apparel_GetPurchaseInvEntryGrnDetails(GMasId, CompId, SuppId)
                         select new PurInvDc
                         {
                             pur_grn_masid = ID.grn_masid,
                             DcNo = ID.Dc_no,
                             DCDate = (DateTime)ID.dc_date,
                             GrnNo = ID.Grnno,
                             Pur_Inv_DcId = 0,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurInvDet> GetRepInvItemLoad(string GMasId, int? CompId, int? SuppId)
        {
            var query = (from IM in entities.Proc_Apparel_GetPurchaseInvEntryItemDetails(GMasId, CompId, SuppId)
                         select new PurInvDet
                         {
                             Pur_inv_id = 0,
                             Pur_inv_Detid = 0,
                             Pur_grn_masid = IM.Grn_MasId,
                             ItemId = (int)IM.itemid,
                             ColorId = (int)IM.colorid,
                             SizeId = (int)IM.sizeid,
                             UomId = (int)IM.uomId,
                             Item = IM.item,
                             Color = IM.color,
                             Size = IM.size,
                             Uom = IM.uom,
                             Pur_grn_detid = IM.Grn_DetId,
                             InvoiceQty = 0,
                             InvAmt = 0,
                             InvRate = 0,
                             DiffRate = 0,
                             DiffAmt = 0,
                             DiffQty = 0,
                             DiffQtyAmt = 0,
                             balance_qty = (decimal)(IM.received_qty + IM.excess_qty - (IM.rejected_qty + IM.invoiced_qty  +IM.Excess_return == null ? 0 : IM.Excess_return)),
                          
                             Rate = (decimal)IM.rate,
                             CGST = IM.cgst,
                             CGSTAMt = (decimal)IM.cgstamt,
                             SGST = IM.sgst,
                             SGSTAMT = (decimal)IM.sgstamt,
                             IGST = IM.igst,
                             IGSTAMT = (decimal)IM.igstamt,
                             HSNCODE = IM.hsncode,
                             CAbb = IM.Abbreviation,
                             EXRate = (decimal)IM.ExChangeRate,
                             CurrId = (int)IM.CurrencyID,
                             AppRate=IM.AppRate,
                             DecimalPlace=(decimal)IM.DecimalPlace,
                             received_qty=(decimal)(IM.received_qty+IM.excess_qty)
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurInvOrdDet> GetRepInvOrdLoad(string GMasId, int? CompId, int? SuppId, int? itemid, int? colorid, int? sizeid, int? grndetid)
        {
            var query = (from IO in entities.Proc_Apparel_GetPurchaseInvEntryOrdDetails(GMasId, CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, itemid == null ? 0 : itemid, colorid == null ? 0 : colorid, sizeid == null ? 0 : sizeid, grndetid == null ? 0 : grndetid)
                         select new PurInvOrdDet
                         {
                             Pur_Inv_Ord_DetID = 0,
                             Order_No = IO.OrdNo,
                             OItemID = (int)IO.ItemID,
                             OColorID = (int)IO.colorid,
                             OSizeID = (int)IO.sizeid,
                             RefNo = IO.refno,
                             Style = IO.style,
                             StyleID = (int)IO.styleid,
                             Pur_Inv_DetID = IO.Grn_DetId,                         
                             InvoiceQty = 0,
                             ReceQty = (decimal)IO.received_qty,
                             Rate = (decimal)IO.rate,
                             Pur_invID = 0,
                             OSSNo = (int)IO.SNo,
                             ExcessQty = (decimal)IO.Excess_Qty,
                             debit_qty = (decimal)IO.debit_qty,
                             receivable_qty = (decimal)IO.receivable_qty

                         }).AsQueryable();

            return query.ToList();
        }




        public bool AddDetData(Pur_Inv_Mas objInvEntry, List<Pur_Inv_Dc> objPIDC, List<Pur_Inv_Det> objPIDet, List<Pur_Inv_Ord_det> objPIOrDet, List<Pur_Inv_Addless> objPIAdd, Pur_Inv_Debit_Credit objInvDebCreEntry)
        {
            int PurInvMasId = 0;
            int PurInvDcId = 0;
            int PurInvDetId = 0;
            int grndetid = 0;
            int Cgrndetid = 0;       
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    entities.Pur_Inv_Mas.Add(objInvEntry);
                    entities.SaveChanges();
                    PurInvMasId = objInvEntry.pur_invid;

                    //Invoice Ledger//                 
                    var PgI = entities.Proc_Apparel_GetInsertInvLedger(objInvEntry.supplierid, objInvEntry.company_id,objInvEntry.invoice_value,"Stores","Invoice",PurInvMasId);
                    entities.SaveChanges();
                    //


                    objInvDebCreEntry.Pur_Inv_id = PurInvMasId;
                    entities.Pur_Inv_Debit_Credit.Add(objInvDebCreEntry);
                    entities.SaveChanges();


                    foreach (var GI in objPIDC)
                    {
                        GI.pur_invid = PurInvMasId;
                        entities.Pur_Inv_Dc.Add(GI);
                        entities.SaveChanges();
                        PurInvDcId = GI.Pur_Inv_DcId;

                        foreach (var IM in objPIDet)
                        {

                            if (GI.pur_grn_masid == IM.pur_grn_masid)
                            {

                                if (Cgrndetid != IM.Pur_grn_detid)
                                {

                                    if (IM.InvoiceQty > 0)
                                    {
                                        IM.Pur_inv_id = PurInvMasId;
                                        IM.pur_inv_dcid = PurInvDcId;
                                        grndetid = (int)IM.Pur_grn_detid;
                                        entities.Pur_Inv_Det.Add(IM);
                                        entities.SaveChanges();
                                        PurInvDetId = IM.Pur_inv_Detid;

                                        //Update the grndet 
                                        var Pg1 = entities.Proc_Apparel_GetPurInvGrnDetUpdate(IM.Pur_grn_detid, IM.InvoiceQty);
                                        entities.SaveChanges();

                                        foreach (var IO in objPIOrDet)
                                        {
                                            if (IO.InvoiceQty > 0 && IM.Pur_grn_detid == IO.Pur_Inv_DetID)
                                            {
                                                IO.Pur_Inv_DetID = grndetid;
                                                IO.Pur_invID = PurInvMasId;
                                                entities.Pur_Inv_Ord_det.Add(IO);

                                            }

                                        }

                                        ////Update the bomdet 
                                        ////var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(itemOrder.Order_No, itemOrder.Styleid, itemOrder.ItemID, itemOrder.ColorID, itemOrder.SizeID, itemOrder.UOMId, itemOrder.quantity);
                                        //var Pg1 = entities.Proc_Apparel_GetPurchaseOrderBomDetUpdate(string.IsNullOrEmpty(itemOrder.Order_No) ? "" : itemOrder.Order_No, itemOrder.Styleid == null ? 0 : itemOrder.Styleid, itemOrder.ItemID == null ? 0 : itemOrder.ItemID, itemOrder.ColorID == null ? 0 : itemOrder.ColorID, itemOrder.SizeID == null ? 0 : itemOrder.SizeID, itemOrder.UOMId == null ? 0 : itemOrder.UOMId, itemOrder.quantity == null ? 0 : itemOrder.quantity, itemOrder.BomdetId, OType);
                                        //entities.SaveChanges();

                                    }
                                }

                                Cgrndetid = grndetid;
                            }
                        }
                    }



                    foreach (var Pay in objPIAdd)
                    {
                        Pay.pur_invid = PurInvMasId;
                        entities.Pur_Inv_Addless.Add(Pay);
                    }
                    entities.SaveChanges();


                    int Pg = entities.Proc_PostPurchaseInvoiceActuals(objInvEntry.invoice_no);
                    entities.SaveChanges();



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseInvoice-AddDetData");
                }
            }
            return reserved;
        }



        public IQueryable<PurInvMas> GetDataSuppRepDetails(string OType, int? company_id, string FromDate, string ToDate)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvMainDropSupp(OType, company_id == null ? 0 : company_id, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new PurInvMas
                                           {
                                               supplierid = (int)cd.SupplierID,
                                               Supplier = cd.Supplier,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<PurInvMas> GetDataOrderRepDetails(string OType, int? company_id, int? SuppId, string FromDate, string ToDate)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvMainDroOrdRef1(OType, company_id == null ? 0 : company_id, SuppId == null ? 0 : SuppId, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new PurInvMas
                                           {
                                               BMasId = (int)cd.MasID,
                                               OrdNo = cd.OrderNo,
                                               RefNo = cd.Ref_No
                                           }).AsQueryable();
            return query;
        }


        public IQueryable<PurInvMas> GetDataInvRepDetails(string OType, int? company_id, int? SuppId, string OrdNo, string FromDate, string ToDate)
        {
            IQueryable<PurInvMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvMainDroInvRef(OType, company_id == null ? 0 : company_id, SuppId == null ? 0 : SuppId, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new PurInvMas
                                           {
                                               pur_invid = (int)cd.PurInvMasID,
                                               invoice_no = cd.InvoiceNo,
                                               supp_inv_no = cd.SuppDc,
                                           }).AsQueryable();
            return query;
        }


        public IQueryable<PurInvMas> GetDataMainRepDetails(string OType, int? company_id, int? SuppId, string OrdNo, string InvNo, string SupDcno, string FromDate, string ToDate, string RefNo)
        {
            IQueryable<PurInvMas> query = (from cd1 in entities.Proc_Apparel_GetPurchaseInvLoadMain(OType, company_id == null ? 0 : company_id, SuppId == null ? 0 : SuppId, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(InvNo) ? "" : InvNo, string.IsNullOrEmpty(SupDcno) ? "" : SupDcno, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), string.IsNullOrEmpty(RefNo) ? "" : RefNo)
                                           select new PurInvMas
                                                {

                                                    pur_invid = cd1.PurInvMasID,
                                                    invoice_no = cd1.InvoiceNo,
                                                    supp_inv_no = cd1.SuppDc,
                                                    Supplier = cd1.supplier,
                                                    invoice_date = (DateTime)cd1.invoice_date,
                                                    Company = cd1.company,
                                                    Gross_amount = cd1.InvoiceAmount
                                                }).AsQueryable();
            return query;
        }


        public IQueryable<PurInvMas> GetDataRepEditInvDetails(int Id)
        {
            IQueryable<PurInvMas> query = (from a in entities.Proc_Apparel_GetPurchaseInvEditDetails(Id)
                                           select new PurInvMas
                                                {
                                                    company_id = a.company_id,
                                                    Company = a.company,
                                                    pur_invid = a.pur_invid,
                                                    invoice_no = a.invoice_no,
                                                    invoice_date = (DateTime)a.invoice_date,
                                                    supp_inv_no = a.supp_inv_no,
                                                    supp_inv_date = (DateTime)a.supp_inv_date,
                                                    supplierid = (int)a.supplierid,
                                                    Supplier = a.supplier,
                                                    CurrencyId = (int)(a.CurrencyId == null ? 0 : a.CurrencyId),
                                                    ExchangeRate = (decimal)a.ExchangeRate,
                                                    Gross_amount = (decimal)a.Gross_amount,
                                                    invoice_value = (decimal)a.invoice_value,
                                                    remarks = a.remarks,
                                                    DHead = a.Head,
                                                    DReason = a.Reason,
                                                    DRateDiff = a.DAmt,
                                                    CRateDiff = a.CAmt,
                                                    DebCreId = a.Debit_CreditID,
                                                    Passed = a.passedd
                                                }).AsQueryable();

            return query;
        }


        public IList<PurInvDc> GetRepInvGrnEditItemLoad(int? InvId, int? CompId, int? SuppId)
        {
            var query = (from ID in entities.Proc_Apparel_GetPurchaseInvEntryGrnEditDetails(InvId, CompId, SuppId)
                         select new PurInvDc
                         {
                             pur_grn_masid = ID.Grn_MasId,
                             DcNo = ID.Dc_no,
                             DCDate = (DateTime)ID.Dc_date,
                             GrnNo = ID.receipt_no,
                             Pur_Inv_DcId = ID.Pur_Inv_DcId,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurInvDet> GetRepInvEditItemLoad(int? InvId, int? GrnmasId, int? CompId, int? SuppId)
        {
            try
            {
                var query = (from IM in entities.Proc_Apparel_GetPurchaseInvEntryEditItemDetails(InvId, CompId, SuppId, GrnmasId)
                             select new PurInvDet
                             {
                                 Pur_inv_id = (int)IM.Pur_Inv_Id,
                                 Pur_inv_Detid = (int)IM.Pur_inv_Detid,
                                 Pur_grn_masid = IM.Grn_MasId,
                                 ItemId = (int)IM.itemid,
                                 ColorId = (int)IM.colorid,
                                 SizeId = (int)IM.sizeid,
                                 UomId = (int)IM.uomId,
                                 Item = IM.item,
                                 Color = IM.color,
                                 Size = IM.size,
                                 Uom = IM.uom,
                                 Pur_grn_detid = IM.Grn_DetId,
                                 InvoiceQty = (decimal)IM.InvQty,
                                 InvAmt = (decimal)IM.InvAmt,
                                 InvRate = (decimal)IM.InvRate,
                                 DiffRate = (decimal)IM.DiffRate,
                                 DiffAmt = (decimal)IM.DiffAmt,
                                 DiffQty = (decimal)IM.DiffQty,
                                 DiffQtyAmt = (decimal)IM.DiffQtyAmt,
                                 //balance_qty = (decimal)(IM.received_qty + IM.excess_qty - IM.Excess_return == null ? 0 : IM.Excess_return - (IM.rejected_qty == null ? 0 : IM.rejected_qty + IM.invoiced_qty == null ? 0 : IM.invoiced_qty)), //+ (decimal)IM.InvQty,
                                 balance_qty = (decimal)((IM.received_qty + IM.excess_qty - (IM.rejected_qty + IM.invoiced_qty + IM.Excess_return )) + IM.InvQty),

                                 Rate = (decimal)IM.rate,
                                 CGST = IM.cgst,
                                 CGSTAMt = (decimal)IM.cgstamt,
                                 SGST = IM.sgst,
                                 SGSTAMT = (decimal)IM.sgstamt,
                                 IGST = IM.igst,
                                 IGSTAMT = (decimal)IM.igstamt,
                                 HSNCODE = IM.hsncode,
                                 CAbb = (string)(IM.Abbreviation == null ? "" : IM.Abbreviation),
                                 EXRate = (decimal)(IM.ExchangeRate == null ? 0 : IM.ExchangeRate),
                                 CurrId = (int)(IM.CurrencyId == null ? 0 : IM.CurrencyId),
                                 AppRate = IM.AppRate,
                                 DecimalPlace = (decimal)IM.decimalplace,
                                 GrnNo = IM.receipt_no,
                                 received_qty=(decimal)(IM.received_qty + IM.excess_qty)
                             }).AsQueryable();

                return query.ToList();
            }
            catch (Exception ex) {
                List<PurInvDet> pur = new List<PurInvDet>();
                return pur;
            }
        }


        public IList<PurInvOrdDet> GetRepInvEditOrdLoad(int? InvId, int? CompId, int? SuppId, int? itemid, int? colorid, int? sizeid, int? grndetid)
        {
            var query = (from IO in entities.Proc_Apparel_GetPurchaseInvEntryEditOrdDetails(InvId == null ? 0 : InvId, CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, itemid == null ? 0 : itemid, colorid == null ? 0 : colorid, sizeid == null ? 0 : sizeid, grndetid == null ? 0 : grndetid)
                         select new PurInvOrdDet
                         {
                             Pur_Inv_Ord_DetID = (int)IO.Pur_Inv_Ord_DetID,
                             Order_No = IO.OrdNo,
                             OItemID = (int)IO.ItemID,
                             OColorID = (int)IO.colorid,
                             OSizeID = (int)IO.sizeid,
                             RefNo = IO.refno,
                             Style = IO.Style,
                             StyleID = (int)IO.styleid,
                             Pur_Inv_DetID = IO.grn_detid,
                             InvoiceQty = IO.InvoiceQty,
                             ReceQty = (decimal)IO.received_qty,
                             Rate = (decimal)IO.Rate,
                             Pur_invID = (int)IO.Pur_InvId,
                             OSSNo = (int)IO.SNo,
                             ExcessQty=(decimal)IO.Excess_Qty,
                             debit_qty = (decimal)IO.debit_qty,
                             receivable_qty = (decimal)IO.receivable_qty,
                             
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurInvAddless> GetRepInvEditAddLessLoad(int? InvId)
        {
            var query = (from IO in entities.Proc_Apparel_GetPurchaseInvEditAddlessDetails(InvId)
                         select new PurInvAddless
                         {
                             pur_invid = (int)IO.pur_invid,
                             Pur_Inv_AddlessId = (int)IO.Pur_Inv_AddlessId,
                             addless_id = (int)IO.addless_id,
                             Addless = IO.addless,
                             aorl = IO.aorl,
                             percentage = (decimal)IO.percentage,
                             amount = (decimal)IO.amount,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(Pur_Inv_Mas objEInvEntry, List<Pur_Inv_Dc> objPEIDC, List<Pur_Inv_Det> objPEIDet, List<Pur_Inv_Ord_det> objPEIOrDet, List<Pur_Inv_Addless> objPEIAdd, Pur_Inv_Debit_Credit objEInvDebCreEntry)
        {

            bool reserved = false;
            int PurInvMasId = 0;
            int PurInvDcId = 0;
            int PurInvDetId = 0;
            int grndetid = 0;
            int Cgrndetid = 0;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var IM in objPEIDet)
                    {

                        if (IM.InvoiceQty > 0)
                        {

                            var Pg1 = entities.Proc_Apparel_GetPurInvGrnEditDetUpdate(IM.Pur_grn_detid, IM.Pur_inv_Detid);
                            entities.SaveChanges();

                        }

                    }


                    var Pg4 = entities.Proc_Apparel_GetPurInvDetEditUpdate(objEInvEntry.pur_invid);
                    entities.SaveChanges();


                    var Pg5 = entities.Proc_DeletePurchaseInvoiceActuals(objEInvEntry.invoice_no);
                    entities.SaveChanges();

                    var Pg6 = entities.Proc_Apparel_GetPurInvDeleAllEdit(objEInvEntry.pur_invid);
                    entities.SaveChanges();


                    ////Add/////

                    entities.Pur_Inv_Mas.Add(objEInvEntry);
                    entities.SaveChanges();
                    PurInvMasId = objEInvEntry.pur_invid;


                    //Invoice Ledger//                 
                    var PgI = entities.Proc_Apparel_GetInsertInvLedger(objEInvEntry.supplierid, objEInvEntry.company_id, objEInvEntry.invoice_value, "Stores", "Invoice", PurInvMasId);
                    entities.SaveChanges();
                    //

                    objEInvDebCreEntry.Pur_Inv_id = PurInvMasId;
                    entities.Pur_Inv_Debit_Credit.Add(objEInvDebCreEntry);
                    entities.SaveChanges();


                    foreach (var GI in objPEIDC)
                    {
                        GI.pur_invid = PurInvMasId;
                        entities.Pur_Inv_Dc.Add(GI);
                        entities.SaveChanges();
                        PurInvDcId = GI.Pur_Inv_DcId;

                        foreach (var IM in objPEIDet)
                        {
                            if (GI.pur_grn_masid == IM.pur_grn_masid)
                            {
                                if (Cgrndetid != IM.Pur_grn_detid)
                                {

                                    if (IM.InvoiceQty > 0)
                                    {
                                        IM.Pur_inv_id = PurInvMasId;
                                        IM.pur_inv_dcid = PurInvDcId;
                                        grndetid = (int)IM.Pur_grn_detid;
                                        entities.Pur_Inv_Det.Add(IM);
                                        entities.SaveChanges();
                                        PurInvDetId = IM.Pur_inv_Detid;

                                        //Update the grndet 
                                        var Pg1 = entities.Proc_Apparel_GetPurInvGrnDetUpdate(IM.Pur_grn_detid, IM.InvoiceQty);
                                        entities.SaveChanges();

                                        foreach (var IO in objPEIOrDet)
                                        {

                                            if (IO.InvoiceQty > 0 && IM.Pur_grn_detid == IO.Pur_Inv_DetID)
                                            {
                                                IO.Pur_Inv_DetID = grndetid;
                                                IO.Pur_invID = PurInvMasId;
                                                entities.Pur_Inv_Ord_det.Add(IO);

                                            }
                                        }

                                    }
                                }

                                Cgrndetid = grndetid;
                            }
                        }
                    }



                    foreach (var Pay in objPEIAdd)
                    {
                        Pay.pur_invid = PurInvMasId;
                        entities.Pur_Inv_Addless.Add(Pay);
                    }
                    entities.SaveChanges();


                    int Pg = entities.Proc_PostPurchaseInvoiceActuals(objEInvEntry.invoice_no);
                    entities.SaveChanges();
                    ////////////

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseInvoice-UpdateDetData");
                }
            }
            return reserved;
        }


        public bool DeleteDetData(Pur_Inv_Mas objDInvEntry, List<Pur_Inv_Dc> objPDIDC, List<Pur_Inv_Det> objPDIDet, List<Pur_Inv_Ord_det> objPDIOrDet, List<Pur_Inv_Addless> objPDIAdd, Pur_Inv_Debit_Credit objDInvDebCreEntry)
        {
            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var IM in objPDIDet)
                    {

                        if (IM.InvoiceQty > 0)
                        {

                            var Pg1 = entities.Proc_Apparel_GetPurInvGrnEditDetUpdate(IM.Pur_grn_detid, IM.Pur_inv_Detid);
                            entities.SaveChanges();

                        }

                    }


                    var Pg4 = entities.Proc_Apparel_GetPurInvDetEditUpdate(objDInvEntry.pur_invid);
                    entities.SaveChanges();


                    var Pg5 = entities.Proc_DeletePurchaseInvoiceActuals(objDInvEntry.invoice_no);
                    entities.SaveChanges();

                    var Pg6 = entities.Proc_Apparel_GetPurInvDeleAllEdit(objDInvEntry.pur_invid);
                    entities.SaveChanges();

                    
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseInvoice-DeleteDetData");
                }
            }
            return reserved;
        }
    }
}
