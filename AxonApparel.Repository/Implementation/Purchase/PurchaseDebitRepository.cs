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
    public class PurchaseDebitRepository : IPurchaseDebitRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        ProductionEntities Prodentities = new ProductionEntities();

        public IList<PurDebitMas> GetRepAddDebLoad(int? CompId, int? SuppId, string DocType, string EntryType)
        {
            var query = (from YD in entities.Proc_Apparel_GetPurchaseDebAddDetails(CompId == null ? 0 : CompId, SuppId == null ? 0 : SuppId, DocType, EntryType)
                         select new PurDebitMas
                         {
                             DocuID = YD.DocuID,
                             DocuNo = YD.DocuNo,
                             DocuDate = (DateTime)YD.DocuDate,
                             DcNo = YD.refno,
                             DcDate = (DateTime)YD.refdate,
                             Supplier = YD.Supplier,
                             companyid = (int)YD.Companyid,
                             company = YD.Company,
                             supplierid = YD.supplierid,


                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurDebitItemdet> GetRepItemDebLoad(int? InvId, string DocType, string EntryType)
        {
            var query = (from YD in entities.Proc_Apparel_GetPurchaseDebItemDetails(InvId == null ? 0 : InvId, DocType, EntryType)
                         select new PurDebitItemdet
                         {
                             Itemid = YD.Itemid,
                             colorid = YD.Colorid,
                             Sizeid = YD.SizeId,
                             uomid = YD.UomId,
                             Item = YD.Item,
                             color = YD.Color,
                             Size = YD.Size,
                             uom = YD.Abbreviation,
                             Qty = YD.InvoiceQty,
                             PoRate = YD.purrate,
                             dRate = Math.Abs((decimal)YD.DebitRate),
                             Rate = YD.InvRate,
                             //dQty = (decimal)YD.received_qty,
                             dQty = (decimal)YD.debit_qty,
                             Amount = Math.Abs((decimal)YD.amount),
                             Debit_detid = 0,
                             Debit_id = 0,
                             Invid = (int)YD.inv_id,
                             grn_detid = (int)YD.Detid,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<DebitOrdDetails> GetRepOrdDebLoad(int? GdetId, string Mode, string EType)
        {
            var query = (from OD in entities.Proc_Apparel_GetPurchaseDebOrdDetails(GdetId == null ? 0 : GdetId, Mode, EType)
                         select new DebitOrdDetails
                         {
                             OrderNo = OD.order_no,
                             Styleid = (int)OD.styleid,
                             DebitQty = (decimal)OD.debitqty,
                             GrnDetId = OD.detid,
                             Mode = OD.Mode,
                             //InvQty = (decimal)(OD.invoiced_qty),
                             InvQty = (decimal)(OD.debitqty),
                             Sno = (int)OD.SNo,
                             Rate = OD.Rate,
                             Amount = (decimal)OD.Amount,
                             OItemid = (int)OD.itemid,
                             OColorid = (int)OD.colorid,
                             OSizeid = (int)OD.sizeid,
                             OUomid = (int)OD.uomId,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PurDebitOthers> GetRepRateDebLoad(int? InvId, string EType,string Stype)
        {
            var query = (from RD in entities.Proc_Apparel_GetPurchaseDebRateDetails(InvId == null ? 0 : InvId, EType, Stype)
                         select new PurDebitOthers
                         {
                             Reason = RD.Reason,
                             Debit_id = (int)RD.Debit_CreditID,
                             DAmount = (decimal)RD.DebitAmount,
                             CAmount = RD.CreditAmount,
                             InvId = (int)RD.Pur_Inv_id,
                             Head = RD.Head,
                             sDesc = RD.Head
                         }).AsQueryable();

            return query.ToList();
        }


        public bool AddDetData(Pur_Debit_Mas objInvDebEntry, List<Pur_Debit_ItemDet> objPID, List<DebitOrderDetail> objPODet, List<Pur_Debit_Others> objPIOt)
        {
            int PurDebMasId = 0;
            int PurDebDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objInvDebEntry.EntryType == "GI")
                    {
                        var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == objInvDebEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "Y";

                        }
                        entities.SaveChanges();
                    }
                    else if (objInvDebEntry.EntryType == "PI")
                    {
                        var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == objInvDebEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "Y";

                        }
                        entities.SaveChanges();
                    }
                    else if (objInvDebEntry.EntryType == "DI")
                    {
                        var App = Prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == objInvDebEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "Y";

                        }
                        entities.SaveChanges();
                    }



                    entities.Pur_Debit_Mas.Add(objInvDebEntry);
                    entities.SaveChanges();
                    PurDebMasId = objInvDebEntry.Debit_id;



                    foreach (var IM in objPID)
                    {
                        IM.Debit_id = PurDebMasId;
                        entities.Pur_Debit_ItemDet.Add(IM);
                        entities.SaveChanges();
                        PurDebDetId = IM.Debit_detid;

                        foreach (var OM in objPODet)
                        {


                            if (OM.DebitQty > 0 && IM.Itemid == OM.ItemID && IM.colorid == OM.ColorID && IM.Sizeid == OM.SizeID && IM.uomid == OM.UOMId)
                            {
                                OM.Debit_id = PurDebMasId;
                                OM.Debit_detid = PurDebDetId;
                                entities.DebitOrderDetail.Add(OM);
                                entities.SaveChanges();
                            }

                        }
                    }



                    foreach (var Rate in objPIOt)
                    {
                        Rate.Debit_id = PurDebMasId;
                        entities.Pur_Debit_Others.Add(Rate);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseDebit-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<PurDebitMas> GetDataMainDebRepDetails(int? companyid, int? supplierid, string DocType, string EntryType, string DocumentNo, string FromDate, string ToDate)
        {
            IQueryable<PurDebitMas> query = (from cd1 in entities.Proc_Apparel_GetPurchaseInvDebLoadMain(companyid == null ? 0 : companyid, supplierid == null ? 0 : supplierid, DocType, EntryType, string.IsNullOrEmpty(DocumentNo) ? "" : DocumentNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                             select new PurDebitMas
                                             {
                                                 Debit_id = cd1.debit_id,
                                                 Debit_no = cd1.debit_no,
                                                 company = cd1.Company,
                                                 Supplier = cd1.supplier,
                                                 Debit_date = (DateTime)cd1.debit_date,
                                                 DocType = cd1.doctype,
                                                 EntryType = cd1.NoteType

                                             }).AsQueryable();
            return query;
        }


        public IQueryable<PurDebitMas> GetDataMainDebEntryRepDetails(int? companyid, int? supplierid, string DocType, string EntryType, string FromDate, string ToDate)
        {
            string EntryNo = "";
            IQueryable<PurDebitMas> query = (from cd in entities.Proc_Apparel_GetPurchaseInvDebLoadEntryDropMain(companyid == null ? 0 : companyid, supplierid == null ? 0 : supplierid, DocType, EntryType, EntryNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                             select new PurDebitMas
                                           {
                                               Debit_id = (int)cd.DebitId,
                                               Debit_no = cd.DebitNo,
                                           }).AsQueryable();
            return query;
        }




        public IQueryable<PurDebitMas> LoadMailDetails(int Id)
        {
            IQueryable<PurDebitMas> query = (from a in entities.Proc_Apparel_GetCreditDebit_MailDet(Id)
                                             select new PurDebitMas
                                           {
                                               Debit_no = a.Debit_no,
                                               Supplier = a.Supplier,
                                               mail = a.E_Mail

                                           }).AsQueryable();

            return query;
        }

        public IQueryable<PurDebitMas> GetDataRepEditDebDetails(int Id)
        {
            IQueryable<PurDebitMas> query = (from a in entities.Proc_Apparel_GetPurchaseDebEditDetails(Id)
                                             select new PurDebitMas
                                           {
                                               companyid = (int)a.companyid,
                                               company = a.company,
                                               DocumentNo = a.DocumentNo,
                                               Debit_date = (DateTime)a.Debit_date,
                                               Debit_no = a.Debit_no,
                                               Debit_id = (int)a.Debit_id,
                                               Supplier = a.supplier,
                                               supplierid = (int)(a.supplierid == null ? 0 : a.supplierid),
                                               InvMasId = (int)a.DocuID,
                                               DcNo = a.supp_inv_no,
                                               remarks = a.remarks,
                                               DocType = a.DocType,
                                               DocPrefix = a.DocPrefix,
                                               EntryType = a.EntryType,
                                               CreatedBy = (int)a.CreatedBy,

                                           }).AsQueryable();

            return query;
        }


        public IList<PurDebitItemdet> GetRepEditItemDebLoad(int? InvId)
        {
            var query = (from YD in entities.Proc_Apparel_GetPurchaseDebEditItemDetails(InvId == null ? 0 : InvId)
                         select new PurDebitItemdet
                         {
                             Itemid = YD.Itemid,
                             colorid = YD.Colorid,
                             Sizeid = YD.SizeId,
                             uomid = YD.UomId,
                             Item = YD.Item,
                             color = YD.Color,
                             Size = YD.Size,
                             uom = YD.Abbreviation,
                             Qty = YD.InvoiceQty,
                             PoRate = YD.purrate,
                             dRate = (decimal)YD.DebitRate,
                             Rate = YD.InvRate,
                             dQty = (decimal)YD.debit_qty,
                             Amount = (decimal)YD.amount,
                             Debit_detid = 0,
                             Debit_id = 0,
                             Invid = (int)YD.inv_id,
                             grn_detid = (int)YD.Detid,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<DebitOrdDetails> GetRepEditOrdDebLoad(int? Debit_id, int? GrnDetId, string Mode)
        {
            var query = (from OD in entities.Proc_Apparel_GetPurchaseDebEditOrdDetails(Debit_id == null ? 0 : Debit_id, GrnDetId == null ? 0 : GrnDetId, Mode)
                         select new DebitOrdDetails
                         {
                             OrderNo = OD.order_no,
                             Styleid = (int)OD.styleid,
                             DebitQty = (decimal)OD.debitqty,
                             GrnDetId = OD.detid,
                             Mode = OD.Mode,
                             //InvQty = (decimal)(OD.invoiced_qty),
                             InvQty = (decimal)(OD.debitqty),
                             Sno = (int)OD.SNo,
                             Rate = OD.Rate,
                             Amount = (decimal)OD.Amount,
                             OItemid = (int)OD.itemid,
                             OColorid = (int)OD.colorid,
                             OSizeid = (int)OD.sizeid,
                             OUomid = (int)OD.uomId,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(Pur_Debit_Mas objInvDebEEntry, List<Pur_Debit_ItemDet> objPEID, List<DebitOrderDetail> objPEODet, List<Pur_Debit_Others> objPIEOt)
        {

            int PurDebDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objInvDebEEntry.EntryType == "GI")
                    {
                        var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == objInvDebEEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "Y";
                        }
                        entities.SaveChanges();
                    }
                    else if (objInvDebEEntry.EntryType == "PI")
                    {
                        var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == objInvDebEEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "Y";
                        }
                        entities.SaveChanges();
                    }

                    else if (objInvDebEEntry.EntryType == "DI")
                    {
                        var App = Prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == objInvDebEEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "Y";

                        }
                        entities.SaveChanges();
                    }

                    //Order
                    var Mas = entities.DebitOrderDetail.Where(u => u.Debit_id == objInvDebEEntry.Debit_id);

                    foreach (var v in Mas)
                    {
                        entities.DebitOrderDetail.Remove(v);
                    }
                    entities.SaveChanges();

                    //det
                    var Det = entities.Pur_Debit_ItemDet.Where(u => u.Debit_id == objInvDebEEntry.Debit_id);

                    foreach (var D in Det)
                    {
                        entities.Pur_Debit_ItemDet.Remove(D);
                    }
                    entities.SaveChanges();

                    //other
                    var oth = entities.Pur_Debit_Others.Where(u => u.Debit_id == objInvDebEEntry.Debit_id);

                    foreach (var o in oth)
                    {
                        entities.Pur_Debit_Others.Remove(o);
                    }
                    entities.SaveChanges();

                    var App1 = entities.Pur_Debit_Mas.Where(c => c.Debit_id == objInvDebEEntry.Debit_id).FirstOrDefault();
                    if (App1 != null)
                    {
                        App1.Debit_date = objInvDebEEntry.Debit_date;
                        App1.remarks = objInvDebEEntry.remarks;

                    }
                    entities.SaveChanges();

                    foreach (var IM in objPEID)
                    {
                        IM.Debit_id = objInvDebEEntry.Debit_id;
                        entities.Pur_Debit_ItemDet.Add(IM);
                        entities.SaveChanges();
                        PurDebDetId = IM.Debit_detid;

                        foreach (var OM in objPEODet)
                        {

                            if (OM.DebitQty > 0 && IM.Itemid == OM.ItemID && IM.colorid == OM.ColorID && IM.Sizeid == OM.SizeID && IM.uomid == OM.UOMId)
                            {
                                OM.Debit_id = objInvDebEEntry.Debit_id;
                                OM.Debit_detid = PurDebDetId;
                                entities.DebitOrderDetail.Add(OM);
                                entities.SaveChanges();
                            }

                        }
                    }


                    foreach (var Rate in objPIEOt)
                    {
                        Rate.Debit_id = objInvDebEEntry.Debit_id;
                        entities.Pur_Debit_Others.Add(Rate);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseDebit-UpdateDetData");
                }
            }
            return reserved;
        }


        public bool DeleteDetData(Pur_Debit_Mas objInvDebDEntry, List<Pur_Debit_ItemDet> objPDID, List<DebitOrderDetail> objPDODet, List<Pur_Debit_Others> objPIDOt)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objInvDebDEntry.EntryType == "GI")
                    {
                        var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == objInvDebDEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "N";
                        }
                        entities.SaveChanges();
                    }
                    else if (objInvDebDEntry.EntryType == "PI")
                    {
                        var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == objInvDebDEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "N";
                        }
                        entities.SaveChanges();
                    }
                    else if (objInvDebDEntry.EntryType == "DI")
                    {
                        var App = Prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == objInvDebDEntry.DocuID).FirstOrDefault();
                        if (App != null)
                        {
                            App.DebtRaised = "N";

                        }
                        entities.SaveChanges();
                    }

                    //Order
                    var Mas = entities.DebitOrderDetail.Where(u => u.Debit_id == objInvDebDEntry.Debit_id);

                    foreach (var v in Mas)
                    {
                        entities.DebitOrderDetail.Remove(v);
                    }
                    entities.SaveChanges();

                    //det
                    var Det = entities.Pur_Debit_ItemDet.Where(u => u.Debit_id == objInvDebDEntry.Debit_id);

                    foreach (var D in Det)
                    {
                        entities.Pur_Debit_ItemDet.Remove(D);
                    }
                    entities.SaveChanges();

                    //other
                    var oth = entities.Pur_Debit_Others.Where(u => u.Debit_id == objInvDebDEntry.Debit_id);

                    foreach (var o in oth)
                    {
                        entities.Pur_Debit_Others.Remove(o);
                    }
                    entities.SaveChanges();

                    //Mas
                    var DMas = entities.Pur_Debit_Mas.Where(u => u.Debit_id == objInvDebDEntry.Debit_id);

                    foreach (var M in DMas)
                    {
                        entities.Pur_Debit_Mas.Remove(M);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PurchaseDebit-DeleteDetData");
                }
            }
            return reserved;
        }
    }
}
