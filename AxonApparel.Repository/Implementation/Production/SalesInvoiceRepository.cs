using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Sql;
using System.Data.SqlClient;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class SalesInvoiceRepository : ISalesInvoiceRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<Domain.Sales_Inv_mas> GetInvMasDetails(int Id)
        {
            IQueryable<Domain.Sales_Inv_mas> query = (from a in entities.Proc_Apparel_GetMasdetforSalesInvMas(Id)
                                                      select new Domain.Sales_Inv_mas
                                                              {
                                                                  Bmasid = a.Bmasid,
                                                                  Compid = a.asCompid,
                                                                  EntryNo = a.EntryNo,
                                                                  Job_ord_no = a.Job_ord_no,
                                                                  Remarks = a.Remarks,
                                                                  Entrydate=a.Entrydate,
                                                                  SalesInvMasid = a.SalesInvMasid,
                                                                  Styleid = a.Styleid,
                                                                  Jobmasid=a.Jobmasid
                                                              }).AsQueryable();



            return query;
        }
        public IQueryable<Domain.Sales_Inv_Det> GetInvDetails(int Id)
        {
            IQueryable<Domain.Sales_Inv_Det> query = (from a in entities.Proc_Apparel_GetMasdetforSalesInvDet(Id)
                                                      select new Domain.Sales_Inv_Det
                                                      {
                                                          InvoiceDate = a.InvoiceDate,
                                                          InvoiceNo = a.InvoiceNo,
                                                          Sales = a.Sales,
                                                          SalesInvDetid = a.SalesInvDetid,
                                                          SalesInvMasid = a.SalesInvMasid,
                                                          Type = a.SecondSales,
                                                          SalesType=a.SecondSales =="O"?"OrderSales":"SecondSales"
                                                      }).AsQueryable();



            return query;
        }
        public IQueryable<Domain.Sales_Inv_mas> GetInvMainDetails(int? CompanyID, int? Order_No, int? Ref_no, int? StyleID, string frmDate, string ToDate, int? Entryid, string Jobno)
        {
            try
            {
                IQueryable<Domain.Sales_Inv_mas> query = (from a in entities.Proc_Apparel_GetMasdetforSalesInvMain(CompanyID, Order_No, Ref_no, StyleID, frmDate, ToDate, Entryid, Jobno)
                                                          select new Domain.Sales_Inv_mas
                                                          {
                                                              Bmasid = a.Bmasid,
                                                              Compid = a.asCompid,
                                                              EntryNo = a.EntryNo,
                                                              Job_ord_no = a.Job_ord_no,
                                                              Remarks = a.Remarks,
                                                              Entrydate = a.Entrydate,
                                                              SalesInvMasid = a.SalesInvMasid,
                                                              Styleid = a.Styleid,
                                                              Style = a.Style,
                                                              OrderNo = a.Order_No,
                                                              RefNo = a.Ref_No

                                                          }).AsQueryable();



                return query;
            }
            catch (Exception ex) {
                IQueryable<Domain.Sales_Inv_mas> query = (from a in entities.Proc_Apparel_GetMasdetforSalesInvMain(CompanyID, Order_No, Ref_no, StyleID, frmDate, ToDate, Entryid, Jobno)
                                                          select new Domain.Sales_Inv_mas
                                                          {
                                                              Bmasid = a.Bmasid,
                                                              Compid = a.asCompid,
                                                              EntryNo = a.EntryNo,
                                                              Job_ord_no = a.Job_ord_no,
                                                              Remarks = a.Remarks,
                                                              Entrydate = a.Entrydate,
                                                              SalesInvMasid = a.SalesInvMasid,
                                                              Styleid = a.Styleid,
                                                              Style = a.Style,
                                                              OrderNo = a.Order_No,
                                                              RefNo = a.Ref_No

                                                          }).AsQueryable();



                return query;            
            }
        }

        public IQueryable<Domain.Sales_Inv_mas> GetMainDDL()
        {
            IQueryable<Domain.Sales_Inv_mas> query = (from a in entities.Proc_Apparel_GetMasdetforSalesInvMainDDL()
                                                      select new Domain.Sales_Inv_mas
                                                      {
                                                          EntryNo = a.EntryNo,
                                                          SalesInvMasid = a.SalesInvMasid,
                                                      }).AsQueryable();



            return query;
        }


        public bool AddDetData(Sales_Inv_mas masEntry, List<Sales_Inv_Det> det)
        {
            int Masid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (masEntry.SalesInvMasid == 0)
                    {

                        entities.Sales_Inv_mas.Add(masEntry);
                        entities.SaveChanges();
                        Masid = masEntry.SalesInvMasid;
                        foreach (var ts in det)
                        {
                            ts.SalesInvMasid = Masid;
                            entities.Sales_Inv_Det.Add(ts);

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
                }
            }
            return reserved;
        }

        public bool UpdateDetData(Sales_Inv_mas masEntry, List<Sales_Inv_Det> det)
        {
            int Masid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (masEntry.SalesInvMasid != 0)
                    {
                        var App = entities.Sales_Inv_mas.Where(c => c.SalesInvMasid == masEntry.SalesInvMasid).FirstOrDefault();
                        if (App != null)
                        {
                            App.Entrydate = masEntry.Entrydate;
                            App.Compid = masEntry.Compid;
                            App.Remarks = masEntry.Remarks;
                            App.Bmasid = masEntry.Bmasid;
                            App.Job_ord_no = masEntry.Job_ord_no;
                            App.Styleid = masEntry.Styleid;
                        }
                        entities.SaveChanges();
                        Masid = masEntry.SalesInvMasid;

                        var TDet = entities.Sales_Inv_Det.Where(u => u.SalesInvMasid == masEntry.SalesInvMasid);

                        foreach (var t in TDet)
                        {
                            entities.Sales_Inv_Det.Remove(t);
                        }
                        entities.SaveChanges();

                        foreach (var trs in det)
                        {
                            trs.SalesInvMasid = masEntry.SalesInvMasid;
                            entities.Sales_Inv_Det.Add(trs);

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
                }
            }
            return reserved;
        }

        public bool DeleteDetData(Sales_Inv_mas masEntry, List<Sales_Inv_Det> det)
        {
            int Masid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (masEntry.SalesInvMasid != 0)
                    {
                        Masid = masEntry.SalesInvMasid;

                        var TDet = entities.Sales_Inv_Det.Where(u => u.SalesInvMasid == masEntry.SalesInvMasid);

                        foreach (var t in TDet)
                        {
                            entities.Sales_Inv_Det.Remove(t);
                        }
                        entities.SaveChanges();

                        var MDet = entities.Sales_Inv_mas.Where(u => u.SalesInvMasid == masEntry.SalesInvMasid);

                        foreach (var t in MDet)
                        {
                            entities.Sales_Inv_mas.Remove(t);
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
                }
            }
            return reserved;
        }

    }
}
