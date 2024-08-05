using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CommercialInvoiceRepository : ICommercialInvoiceRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.Commercial_Invdet> LoadAddDet(string Commercial, string Order, string Ref, string Style)
        {
            IQueryable<Domain.Commercial_Invdet> query = (from a in entities.Proc_Apparel_GetCommercialInv_Add(Commercial, Order, Ref, Style)
                                                          select new Domain.Commercial_Invdet
                                                 {
                                                     Invdetid = 0,
                                                     Invmasid = 0,
                                                     Commercialid = a.Particularid,
                                                     OrderNo = a.Order_No,
                                                     Styleid = a.StyleId,
                                                     Amount = a.balance,
                                                     Refno = a.Ref_No,
                                                     Style = a.Style,
                                                     Totalcost = a.Actual_Cost,
                                                     Balancecost = a.balance,
                                                     Commercial = a.Commercial
                                                 }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.commercial_invmas> GetDataMainList(int? compid, int? suppid, string orderno, int? invid, string fromDate, string todate, string refno, int? styleid)
        {
            IQueryable<Domain.commercial_invmas> query = (from a in entities.Proc_Apparel_GetCommercialInvMainlist(compid, orderno,suppid,invid, refno,styleid,fromDate, todate )
                                                          select new Domain.commercial_invmas
                                                          {
                                                             Invoiceno=a.Invoiceno,
                                                             Invoicedate=a.Invoicedate,
                                                             EntryNo=a.EntryNo,
                                                             Company=a.Company,
                                                             Supplier=a.Supplier,
                                                             Invmasid=a.Invmasid
                                                          }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.commercial_invmas> LoadMasedit(int Masid)
        {
            IQueryable<Domain.commercial_invmas> query = (from a in entities.Proc_Apparel_GetCommrecialInvMasedit(Masid)
                                                          select new Domain.commercial_invmas
                                                          {
                                                              Invoiceno = a.Invoiceno,
                                                              Invoicedate = a.Invoicedate,
                                                              EntryNo = a.EntryNo,
                                                              Companyid = a.Companyid,
                                                              Supplierid = a.Supplierid,
                                                              Invmasid = a.Invmasid,
                                                              EntryDate=a.EntryDate,
                                                              TotalAmt=a.TotalAmt,
                                                              NetAmt=a.NetAmt,
                                                              Remarks=a.Remarks
                                                          }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.Commercial_Invdet> LoadDetedit(int Masid)
        {
            IQueryable<Domain.Commercial_Invdet> query = (from a in entities.Proc_Apparel_GetCommercialinvdet(Masid)
                                                          select new Domain.Commercial_Invdet
                                                          {
                                                              Invdetid = a.Invdetid,
                                                              Invmasid = a.Invmasid,
                                                              Commercialid = a.Particularid,
                                                              OrderNo = a.Order_No,
                                                              Styleid = a.StyleId,
                                                              Amount = a.Invamt,
                                                              Refno = a.Ref_No,
                                                              Style = a.Style,
                                                              Totalcost = a.Actual_Cost,
                                                              Balancecost = a.balance+a.Invamt,
                                                              Commercial = a.Commercial
                                                          }).AsQueryable();
            return query;
        }

        public IQueryable<Domain.CommercialInvoice_Addless> LoadAddlessedit(int Masid)
        {
            var query = (from LADD in entities.Proc_Apparel_CommercialInvaddlessdet(Masid)
                         select new Domain.CommercialInvoice_Addless
                         {
                             Com_InvID = LADD.Invmasid,
                             Comiv_Addless_ID = LADD.Comiv_Addless_ID,
                             addlessid = LADD.addlessid,
                             AddLess = LADD.addless,
                             Amount = LADD.Amount,
                             AorL = LADD.AorL,
                             Percentage = LADD.Percentage,
                             SlNo = LADD.Comiv_Addless_ID

                         }).AsQueryable();

            return query;
        }


        public bool AddDetData(Commercial_Invmas obj, List<Commercial_Invdet> objdet, List<CommercialInvoice_Addless> objaddls, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    entities.Commercial_Invmas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Invmasid;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.Invmasid = Masid;
                            entities.Commercial_Invdet.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            item.Com_InvID = Masid;
                            entities.CommercialInvoice_Addless.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "CommercialInvoice-AddDetData");
                }


                return reserved;
            }
        }


        public bool UpdateDetData(Commercial_Invmas obj, List<Commercial_Invdet> objdet, List<CommercialInvoice_Addless> objaddls, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;

                    var masenty = entities.Commercial_Invmas.Where(s => s.Invmasid == obj.Invmasid).FirstOrDefault();
                    masenty.Invoicedate = obj.Invoicedate;
                    masenty.EntryDate = obj.EntryDate;
                    masenty.Invoiceno = obj.Invoiceno;
                    masenty.NetAmt = obj.NetAmt;
                    masenty.Remarks = obj.Remarks;
                    masenty.Supplierid = obj.Supplierid;
                    masenty.TotalAmt = obj.TotalAmt;
                    masenty.CreatedBy = obj.CreatedBy;
                    entities.SaveChanges();
                    Masid = obj.Invmasid;


                    var detlist = entities.Commercial_Invdet.Where(c => c.Invmasid == Masid).ToList();

                    foreach (var det in detlist) {
                        entities.Commercial_Invdet.Remove(det);
                        entities.SaveChanges();
                    }


                    var acclist = entities.CommercialInvoice_Addless.Where(c => c.Com_InvID == Masid).ToList();

                    foreach (var acc in acclist)
                    {
                        entities.CommercialInvoice_Addless.Remove(acc);
                        entities.SaveChanges();
                    }



                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.Invmasid = Masid;
                            entities.Commercial_Invdet.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            item.Com_InvID = Masid;
                            entities.CommercialInvoice_Addless.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "CommercialInvoice-UpdateDetData");
                }


                return reserved;
            }
        }


        public bool DeleteDetData(Commercial_Invmas obj, List<Commercial_Invdet> objdet, List<CommercialInvoice_Addless> objaddls, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;

                    Masid = obj.Invmasid;
                    var detlist = entities.Commercial_Invdet.Where(c => c.Invmasid == Masid).ToList();

                    foreach (var det in detlist)
                    {
                        entities.Commercial_Invdet.Remove(det);
                        entities.SaveChanges();
                    }


                    var acclist = entities.CommercialInvoice_Addless.Where(c => c.Com_InvID == Masid).ToList();

                    foreach (var acc in acclist)
                    {
                        entities.CommercialInvoice_Addless.Remove(acc);
                        entities.SaveChanges();
                    }


                    var masenty = entities.Commercial_Invmas.Where(s => s.Invmasid == obj.Invmasid).FirstOrDefault();
                    entities.Commercial_Invmas.Remove(masenty);
                    entities.SaveChanges();
                   


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CommercialInvoice-DeleteDetData");
                }


                return reserved;
            }
        }


        public IQueryable<Domain.commercial_invmas> LoadEntryddl()
        {
            IQueryable<Domain.commercial_invmas> query = (from a in entities.Commercial_Invmas.ToList()
                                                          select new Domain.commercial_invmas
                                                          {
                                                              Invoiceno = a.Invoiceno,
                                                              Invoicedate = a.Invoicedate,
                                                              EntryNo = a.EntryNo,
                                                              Invmasid = a.Invmasid,
                                                          }).AsQueryable();
            return query;
        }


    }
}
