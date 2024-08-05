using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class SalesInvoiceBusiness : ISalesInvoiceBusiness
    {
        ISalesInvoiceRepository Rep = new SalesInvoiceRepository();

        public Response<IQueryable<Domain.Sales_Inv_mas>> GetInvMasDetails(int Id)
        {
            try
            {
                var ProductWO = Rep.GetInvMasDetails(Id);

                return new Response<IQueryable<Domain.Sales_Inv_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Sales_Inv_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Sales_Inv_Det>> GetInvDetails(int Id)
        {
            try
            {
                var ProductWO = Rep.GetInvDetails(Id);

                return new Response<IQueryable<Domain.Sales_Inv_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Sales_Inv_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Sales_Inv_mas>> GetInvMainDetails(int? CompanyID, int? Order_No, int? Ref_no, int? StyleID, string frmDate, string ToDate, int? Entryid, string Jobno)
        {
            try
            {
                var ProductWO = Rep.GetInvMainDetails(CompanyID, Order_No, Ref_no, StyleID, frmDate, ToDate, Entryid, Jobno);

                return new Response<IQueryable<Domain.Sales_Inv_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Sales_Inv_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.Sales_Inv_mas>> GetMainDDL()
        {
            try
            {
                var ProductWO = Rep.GetMainDDL();

                return new Response<IQueryable<Domain.Sales_Inv_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Sales_Inv_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateEntry(Domain.Sales_Inv_mas MEntry)
        {



            try
            {

                AxonApparel.Repository.Sales_Inv_mas Precostmas = new AxonApparel.Repository.Sales_Inv_mas
                {
                    SalesInvMasid = MEntry.SalesInvMasid,
                    Bmasid = MEntry.Bmasid,
                    EntryNo = MEntry.EntryNo,
                    Entrydate = MEntry.Entrydate,
                    Compid = MEntry.Compid,
                    Job_ord_no = MEntry.Job_ord_no,
                    Styleid = MEntry.Styleid,
                    Remarks = MEntry.Remarks,

                };

                var DetList = new List<Repository.Sales_Inv_Det>();
                if (MEntry.InvDet != null)
                {
                    foreach (var tm in MEntry.InvDet)
                    {


                        DetList.Add(new Repository.Sales_Inv_Det
                        {
                            SalesInvDetid = tm.SalesInvDetid,
                            SalesInvMasid = tm.SalesInvMasid,
                            SalesVal = tm.Sales,
                            SalesType = tm.Type,
                            InvoiceNo = tm.InvoiceNo,
                            InvoiceDate = tm.InvoiceDate,

                        });

                    }
                }



                var result = Rep.AddDetData(Precostmas, DetList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateEntry(Domain.Sales_Inv_mas MEntry)
        {



            try
            {

                AxonApparel.Repository.Sales_Inv_mas Precostmas = new AxonApparel.Repository.Sales_Inv_mas
                {
                    SalesInvMasid = MEntry.SalesInvMasid,
                    Bmasid = MEntry.Bmasid,
                    EntryNo = MEntry.EntryNo,
                    Entrydate = MEntry.Entrydate,
                    Compid = MEntry.Compid,
                    Job_ord_no = MEntry.Job_ord_no,
                    Styleid = MEntry.Styleid,
                    Remarks = MEntry.Remarks,

                };

                var DetList = new List<Repository.Sales_Inv_Det>();
                if (MEntry.InvDet != null)
                {
                    foreach (var tm in MEntry.InvDet)
                    {


                        DetList.Add(new Repository.Sales_Inv_Det
                        {
                            SalesInvDetid = tm.SalesInvDetid,
                            SalesInvMasid = tm.SalesInvMasid,
                            SalesVal = tm.Sales,
                            SalesType = tm.Type,
                            InvoiceNo = tm.InvoiceNo,
                            InvoiceDate = tm.InvoiceDate,

                        });

                    }
                }



                var result = Rep.UpdateDetData(Precostmas, DetList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEntry(Domain.Sales_Inv_mas MEntry)
        {



            try
            {

                AxonApparel.Repository.Sales_Inv_mas Precostmas = new AxonApparel.Repository.Sales_Inv_mas
                {
                    SalesInvMasid = MEntry.SalesInvMasid,
                    Bmasid = MEntry.Bmasid,
                    EntryNo = MEntry.EntryNo,
                    Entrydate = MEntry.Entrydate,
                    Compid = MEntry.Compid,
                    Job_ord_no = MEntry.Job_ord_no,
                    Styleid = MEntry.Styleid,
                    Remarks = MEntry.Remarks,

                };

                var DetList = new List<Repository.Sales_Inv_Det>();
                if (MEntry.InvDet != null)
                {
                    foreach (var tm in MEntry.InvDet)
                    {


                        DetList.Add(new Repository.Sales_Inv_Det
                        {
                            SalesInvDetid = tm.SalesInvDetid,
                            SalesInvMasid = tm.SalesInvMasid,
                            SalesVal = tm.Sales,
                            SalesType = tm.Type,
                            InvoiceNo = tm.InvoiceNo,
                            InvoiceDate = tm.InvoiceDate,

                        });

                    }
                }



                var result = Rep.DeleteDetData(Precostmas, DetList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
