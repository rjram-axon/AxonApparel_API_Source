using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;


namespace AxonApparel.Business
{
    public class CommercialInvoiceBusiness : ICommercialInvoiceBusiness
    {
        ICommercialInvoiceRepository repo = new CommercialInvoiceRepository();



        public Response<IQueryable<Domain.Commercial_Invdet>> LoadAddDet(string Commercial, string Order, string Ref, string Style)
        {
            try
            {
                var ProductWO = repo.LoadAddDet(Commercial, Order, Ref, Style);

                return new Response<IQueryable<Domain.Commercial_Invdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Commercial_Invdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.commercial_invmas>> GetDataMainList(int? compid, int? suppid, string orderno, int? invid, string fromDate, string todate, string refno, int? styleid)
        {
            try
            {
                var ProductWO = repo.GetDataMainList(compid, suppid, orderno, invid, fromDate, todate, refno, styleid);

                return new Response<IQueryable<Domain.commercial_invmas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.commercial_invmas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.commercial_invmas>> LoadMasedit(int Masid)
        {
            try
            {
                var ProductWO = repo.LoadMasedit(Masid);

                return new Response<IQueryable<Domain.commercial_invmas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.commercial_invmas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Commercial_Invdet>> LoadDetedit(int Masid)
        {
            try
            {
                var ProductWO = repo.LoadDetedit(Masid);

                return new Response<IQueryable<Domain.Commercial_Invdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Commercial_Invdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.CommercialInvoice_Addless>> LoadAddlessedit(int Masid)
        {
            try
            {
                var ProductWO = repo.LoadAddlessedit(Masid);

                return new Response<IQueryable<Domain.CommercialInvoice_Addless>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.CommercialInvoice_Addless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> Add(Domain.commercial_invmas Entry)
        {
            try
            {
                AxonApparel.Repository.Commercial_Invmas Insert = new AxonApparel.Repository.Commercial_Invmas
                {
                    Invmasid = Entry.Invmasid,
                    Companyid = Entry.Companyid,
                    EntryNo = Entry.EntryNo,
                    EntryDate = Entry.EntryDate,
                    Invoiceno = Entry.Invoiceno,
                    Invoicedate = Entry.Invoicedate,
                    TotalAmt = Entry.TotalAmt,
                    Supplierid=Entry.Supplierid,
                    Remarks=Entry.Remarks,
                    NetAmt = Entry.NetAmt,
                    CreatedBy=Entry.CreatedBy,
                };

                var ItmList = new List<Commercial_Invdet>();

                foreach (var PItem in Entry.Commercial_Invdet)
                {
                    ItmList.Add(new Commercial_Invdet
                    {
                        Invdetid = PItem.Invdetid,
                        Invmasid = PItem.Invmasid,
                        Commercialid = PItem.Commercialid,
                        OrderNo = PItem.OrderNo,
                        Styleid = PItem.Styleid,
                        Amount = PItem.Amount
                    });

                }

                var List = new List<CommercialInvoice_Addless>();

                if (Entry.CommercialInvoice_Addless != null)
                {
                    foreach (var li in Entry.CommercialInvoice_Addless)
                    {
                        List.Add(new CommercialInvoice_Addless
                        {
                            Com_InvID = li.Com_InvID,
                            Comiv_Addless_ID = li.Comiv_Addless_ID,
                            addlessid = li.addlessid,
                            AorL = li.AorL,
                            Percentage = li.Percentage,
                            Amount = li.Amount


                        });

                    }
                }

                var result = repo.AddDetData(Insert, ItmList,List, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }

        public Common.Response<bool> Update(Domain.commercial_invmas Entry)
        {
            try
            {
                AxonApparel.Repository.Commercial_Invmas Insert = new AxonApparel.Repository.Commercial_Invmas
                {
                    Invmasid = Entry.Invmasid,
                    Companyid = Entry.Companyid,
                    EntryNo = Entry.EntryNo,
                    EntryDate = Entry.EntryDate,
                    Invoiceno = Entry.Invoiceno,
                    Invoicedate = Entry.Invoicedate,
                    TotalAmt = Entry.TotalAmt,
                    Supplierid = Entry.Supplierid,
                    Remarks = Entry.Remarks,
                    NetAmt = Entry.NetAmt,
                    CreatedBy = Entry.CreatedBy,
                };

                var ItmList = new List<Commercial_Invdet>();

                foreach (var PItem in Entry.Commercial_Invdet)
                {
                    ItmList.Add(new Commercial_Invdet
                    {
                        Invdetid = PItem.Invdetid,
                        Invmasid = PItem.Invmasid,
                        Commercialid = PItem.Commercialid,
                        OrderNo = PItem.OrderNo,
                        Styleid = PItem.Styleid,
                        Amount = PItem.Amount
                    });

                }

                var List = new List<CommercialInvoice_Addless>();

                if (Entry.CommercialInvoice_Addless != null)
                {
                    foreach (var li in Entry.CommercialInvoice_Addless)
                    {
                        List.Add(new CommercialInvoice_Addless
                        {
                            Com_InvID = li.Com_InvID,
                            Comiv_Addless_ID = li.Comiv_Addless_ID,
                            addlessid = li.addlessid,
                            AorL = li.AorL,
                            Percentage = li.Percentage,
                            Amount = li.Amount


                        });

                    }
                }

                var result = repo.UpdateDetData(Insert, ItmList, List, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }

        public Common.Response<bool> Delete(Domain.commercial_invmas Entry)
        {
            try
            {
                AxonApparel.Repository.Commercial_Invmas Insert = new AxonApparel.Repository.Commercial_Invmas
                {
                    Invmasid = Entry.Invmasid,
                    Companyid = Entry.Companyid,
                    EntryNo = Entry.EntryNo,
                    EntryDate = Entry.EntryDate,
                    Invoiceno = Entry.Invoiceno,
                    Invoicedate = Entry.Invoicedate,
                    TotalAmt = Entry.TotalAmt,
                    Supplierid = Entry.Supplierid,
                    Remarks = Entry.Remarks,
                    NetAmt = Entry.NetAmt,
                };

                var ItmList = new List<Commercial_Invdet>();

                foreach (var PItem in Entry.Commercial_Invdet)
                {
                    ItmList.Add(new Commercial_Invdet
                    {
                        Invdetid = PItem.Invdetid,
                        Invmasid = PItem.Invmasid,
                        Commercialid = PItem.Commercialid,
                        OrderNo = PItem.OrderNo,
                        Styleid = PItem.Styleid,
                        Amount = PItem.Amount
                    });

                }

                var List = new List<CommercialInvoice_Addless>();

                if (Entry.CommercialInvoice_Addless != null)
                {
                    foreach (var li in Entry.CommercialInvoice_Addless)
                    {
                        List.Add(new CommercialInvoice_Addless
                        {
                            Com_InvID = li.Com_InvID,
                            Comiv_Addless_ID = li.Comiv_Addless_ID,
                            addlessid = li.addlessid,
                            AorL = li.AorL,
                            Percentage = li.Percentage,
                            Amount = li.Amount


                        });

                    }
                }

                var result = repo.DeleteDetData(Insert, ItmList, List, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }

        public Response<IQueryable<Domain.commercial_invmas>> LoadEntryddl()
        {
            try
            {
                var ProductWO = repo.LoadEntryddl();

                return new Response<IQueryable<Domain.commercial_invmas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.commercial_invmas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
