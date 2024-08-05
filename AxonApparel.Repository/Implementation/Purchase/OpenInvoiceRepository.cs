using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class OpenInvoiceRepository : IOpenInvoiceRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public int AddData(OpenInvoice_Mas objEntry)
        {
            var id = entities.OpenInvoice_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.Open_InvID;
        }

        public bool AddDetData(OpenInvoice_Mas obj, List<OpenInvoice_Det> objdet, List<OpenInvoice_Addless> objaddls, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;

                    entities.OpenInvoice_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Open_InvID;


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.Open_InvID = Masid;
                            entities.OpenInvoice_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            item.Open_InvID = Masid;
                            entities.OpenInvoice_Addless.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpenInvoice-AddDetData");
                }


                return reserved;
            }
        }


        public IQueryable<Domain.OpenInvoiceMas> GetDataMainList(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate, string IorE, string refno)
        {
            var query = (from LADD in entities.Proc_Apparel_OpenInvLoadMainGrid(compid, suppid, unitid, orderno, opinvid, entryno, otype, fromDate, todate, IorE, refno)
                         select new Domain.OpenInvoiceMas
                         {
                             Open_InvID = LADD.Open_InvID,
                             CompanyID = (int)LADD.CompanyID,
                             company = LADD.company,
                             SupplierID = (int)LADD.SupplierID,
                             supplier = LADD.Supplier,
                             Company_UnitID = (int)LADD.Company_UnitID,
                             companyunit = LADD.CompanyUnit,
                             InvoiceNo = LADD.InvoiceNo,
                             InvoiceDate = (DateTime)LADD.InvoiceDate,
                             Order_Type = LADD.Order_Type,
                             EntryNo = LADD.EntryNo,
                             Gross_amount = LADD.Invoice_amount
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.OpenInvoiceMas> GetDataMainListddl(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate)
        {
            var query = (from LADD in entities.Proc_Apparel_OpenInvDDl(compid, suppid, unitid, orderno, opinvid, entryno, otype, fromDate, todate)
                         select new Domain.OpenInvoiceMas
                         {
                             Open_InvID = LADD.Open_InvID,

                             SupplierID = (int)LADD.SupplierID,
                             supplier = LADD.Supplier,
                             Company_UnitID = (int)LADD.Company_UnitID,
                             companyunit = LADD.CompanyUnit,
                             ordid = LADD.Orderid,
                             orderno = LADD.order_no,
                             EntryNo = LADD.EntryNo,
                             refNo=LADD.ref_no

                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.OpenInvoiceMas> Getheaderdet(int invid)
        {
            var query = (from LADD in entities.Proc_Apparel_OpenInvGeteditdet(invid)
                         select new Domain.OpenInvoiceMas
                         {
                             Open_InvID = LADD.Open_InvID,
                             SupplierID = (int)LADD.SupplierID,
                             Company_UnitID = (int)LADD.Company_UnitID,
                             EntryNo = LADD.EntryNo,
                             InvoiceNo = LADD.InvoiceNo,
                             InvoiceDate = (DateTime)LADD.InvoiceDate,
                             Order_Type = LADD.Order_Type,
                             Gross_amount = (decimal)LADD.Gross_amount,
                             Remarks = LADD.Remarks,
                             CurrencyID = (int)LADD.CurrencyID,
                             ExchangeRate = (int)LADD.ExchangeRate,
                             EntryDate = (DateTime)LADD.EntryDate,
                             CompanyID = (int)LADD.CompanyID,
                             Addless_amount = (decimal)LADD.Addless_amount,
                             InOrEx = LADD.IntorExt,
                             passed = (int)LADD.passed
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.OpenInvoiceDet> GetItmeditdet(int invid)
        {
            var query = (from LADD in entities.Proc_Apparel_OpenInvGeteditdet(invid)
                         select new Domain.OpenInvoiceDet
                         {
                             Open_InvID = LADD.Open_InvID,
                             ordid = (int)LADD.bmasid,
                             Order_No = LADD.Order_No,
                             jobid = (int)LADD.jmasid,
                             Job_Ord_No = LADD.Job_Ord_No,
                             refid = (int)LADD.refid,
                             Refno = LADD.Refno,
                             UOMID = (int)LADD.UOMID,
                             uom = LADD.uom,
                             CostHead = LADD.CostHead,
                             CostHeadID=LADD.itemid,
                             Qty = LADD.Qty,
                             Rate = LADD.Rate,
                             Amount = LADD.Amount,
                             Open_Inv_DetID = LADD.Open_Inv_DetID
                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(OpenInvoice_Mas objUpd)
        {
            try
            {
                var result = false;
                var Upd = entities.OpenInvoice_Mas.Where(c => c.Open_InvID == objUpd.Open_InvID).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.Open_InvID = objUpd.Open_InvID;
                    Upd.InvoiceNo = objUpd.InvoiceNo;
                    Upd.InvoiceDate = objUpd.InvoiceDate;
                    Upd.Gross_amount = objUpd.Gross_amount;
                    Upd.ExchangeRate = objUpd.ExchangeRate;
                    Upd.EntryDate = objUpd.EntryDate;
                    Upd.EntryNo = objUpd.EntryNo;
                    Upd.CompanyID = objUpd.CompanyID;
                    Upd.Company_UnitID = objUpd.Company_UnitID;
                    Upd.SupplierID = objUpd.SupplierID;
                    Upd.Order_Type = objUpd.Order_Type;
                    Upd.Addless_amount = objUpd.Addless_amount;
                    Upd.CurrencyID = objUpd.CurrencyID;
                    Upd.Remarks = objUpd.Remarks;

                    Upd.CreatedBy = objUpd.CreatedBy;

                    entities.SaveChanges();
                    result = true;
                }
                else { result = false; }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IQueryable<Domain.OpenInvoiceAddless> Getaddlesdet(int invid)
        {
            var query = (from LADD in entities.Proc_Apparel_OpenInvaddlessdet(invid)
                         select new Domain.OpenInvoiceAddless
                         {
                             Open_InvID = LADD.Open_InvID,
                             openiv_Addless_ID = LADD.Openiv_Addless_ID,
                             addlessid = LADD.addlessid,
                             addless = LADD.addless,
                             Amount = LADD.Amount,
                             AorL = LADD.AorL,
                             Percentage = LADD.Percentage,
                             SlNo = LADD.Openiv_Addless_ID

                         }).AsQueryable();

            return query;
        }


        public bool DeleteData(int id)
        {
            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var deletestk = entities.OpenInvoice_Addless.Where(d => d.Open_InvID == id).ToList<OpenInvoice_Addless>();
                    deletestk.ForEach(c => entities.OpenInvoice_Addless.Remove(c));
                    entities.SaveChanges();

                    var deletedel = entities.OpenInvoice_Det.Where(d => d.Open_InvID == id).ToList<OpenInvoice_Det>();
                    deletedel.ForEach(c => entities.OpenInvoice_Det.Remove(c));
                    entities.SaveChanges();

                    var deleteMas = entities.OpenInvoice_Mas.Where(d => d.Open_InvID == id).ToList<OpenInvoice_Mas>();
                    deleteMas.ForEach(c => entities.OpenInvoice_Mas.Remove(c));
                    entities.SaveChanges();

                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpenInvoice-DeleteData");
                }


                return reserved;
            }
        }


        public bool UpdDetData(OpenInvoice_Mas objUpd, List<OpenInvoice_Det> objdet, List<OpenInvoice_Addless> objaddls, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.OpenInvoice_Mas.Where(c => c.Open_InvID == objUpd.Open_InvID).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Open_InvID = objUpd.Open_InvID;
                        Upd.InvoiceNo = objUpd.InvoiceNo;
                        Upd.InvoiceDate = objUpd.InvoiceDate;
                        Upd.Gross_amount = objUpd.Gross_amount;
                        Upd.ExchangeRate = objUpd.ExchangeRate;
                        Upd.EntryDate = objUpd.EntryDate;
                        Upd.EntryNo = objUpd.EntryNo;
                        Upd.CompanyID = objUpd.CompanyID;
                        Upd.Company_UnitID = objUpd.Company_UnitID;
                        Upd.SupplierID = objUpd.SupplierID;
                        Upd.Order_Type = objUpd.Order_Type;
                        Upd.Addless_amount = objUpd.Addless_amount;
                        Upd.CurrencyID = objUpd.CurrencyID;
                        Upd.Remarks = objUpd.Remarks;

                        Upd.CreatedBy = objUpd.CreatedBy;


                        entities.SaveChanges();

                    }



                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Open_InvID;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.OpenInvoice_Det.Where(d => d.Open_InvID == objUpd.Open_InvID).ToList<OpenInvoice_Det>();

                    deletedet.ForEach(c => entities.OpenInvoice_Det.Remove(c));
                    entities.SaveChanges();

                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            id = (int)item.Open_InvID;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletestkdet = entities.OpenInvoice_Addless.Where(d => d.Open_InvID == objUpd.Open_InvID).ToList<OpenInvoice_Addless>();

                    deletestkdet.ForEach(c => entities.OpenInvoice_Addless.Remove(c));
                    entities.SaveChanges();




                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            entities.OpenInvoice_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            entities.OpenInvoice_Addless.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpenInvoice-UpdDetData");
                }


                return reserved;
            }
        }
    }
}
