using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public class OpenInvoiceBusiness : IOpenInvoiceBusiness
    {
        IOpenInvoiceRepository repo = new OpenInvoiceRepository();

        public Common.Response<bool> CreateUnitEntry(Domain.OpenInvoiceMas Entry)
        {
            int? suppid = 0;
            int? unitid = 0;
            int? currid = 0;
            if (Entry.SupplierID == 0)
            {
                suppid = null;
            }
            else
            {
                suppid = Entry.SupplierID;
            }
            if (Entry.Company_UnitID == 0)
            {
                unitid = null;
            }
            else
            {
                unitid = Entry.Company_UnitID;
            }
            if (Entry.CurrencyID == 0)
            {
                currid = null;
            }
            else
            {
                currid = Entry.CurrencyID;
            }
            try
            {
                AxonApparel.Repository.OpenInvoice_Mas Insobj = new AxonApparel.Repository.OpenInvoice_Mas


                 //var ID = repo.AddData(new AxonApparel.Repository.OpenInvoice_Mas
                 {
                     Open_InvID = Entry.Open_InvID,
                     CompanyID = Entry.CompanyID,
                     Company_UnitID = unitid,// Entry.Company_UnitID,
                     EntryNo = Entry.EntryNo,
                     EntryDate = Entry.EntryDate,
                     InvoiceDate = Entry.InvoiceDate,
                     InvoiceNo = Entry.InvoiceNo,
                     CurrencyID = currid,//Entry.CurrencyID,
                     Remarks = Entry.Remarks,
                     ExchangeRate = Entry.ExchangeRate,
                     Gross_amount = Entry.Gross_amount,
                     SupplierID = suppid,//Entry.SupplierID,
                     Order_Type = Entry.Order_Type,
                     paid = Entry.paid,
                     passed = Entry.passed,
                     Payment_Amt = Entry.Payment_Amt,
                     Addless_amount = Entry.Addless_amount,
                     AddLessManualOrFormula = (Entry.AddLessManualOrFormula == null ? "" : Entry.AddLessManualOrFormula),
                     InternalOrExternal = Entry.InOrEx,
                     CreatedBy = Entry.CreatedBy,



                 };

                var ItmList = new List<OpenInvoice_Det>();

                foreach (var PItem in Entry.OpeninvDet)
                {
                    ItmList.Add(new OpenInvoice_Det
                    {
                        Open_InvID = PItem.Open_InvID,
                        Open_Inv_DetID = PItem.Open_Inv_DetID,
                        Rate = PItem.Rate,
                        Qty = PItem.Qty,
                        Amount = PItem.Amount,
                        CostHead = PItem.CostHead,
                        Order_No = PItem.Order_No,
                        Job_Ord_No = PItem.Job_Ord_No,
                        Refno = PItem.Refno,
                        UOMID = PItem.UOMID,
                        ItemId = PItem.CostHeadID,


                    });

                }

                var List = new List<OpenInvoice_Addless>();

                if (Entry.Openinvadless != null)
                {
                    foreach (var li in Entry.Openinvadless)
                    {
                        List.Add(new OpenInvoice_Addless
                        {
                            Open_InvID = li.Open_InvID,
                            Openiv_Addless_ID = li.openiv_Addless_ID,
                            addlessid = li.addlessid,
                            AorL = li.AorL,
                            Percentage = li.Percentage,
                            Amount = li.Amount


                        });

                    }
                }

                var result = repo.AddDetData(Insobj, ItmList, List, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }


        public Response<IQueryable<Domain.OpenInvoiceMas>> GetDataMainList(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate, string IorE, string refno)
        {
            try
            {
                var ProductWO = repo.GetDataMainList(compid, suppid, unitid, orderno, opinvid, entryno, otype, fromDate, todate, IorE, refno);

                return new Response<IQueryable<Domain.OpenInvoiceMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenInvoiceMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenInvoiceMas>> GetDataMainListddl(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate)
        {
            try
            {
                var ProductWO = repo.GetDataMainListddl(compid, suppid, unitid, orderno, opinvid, entryno, otype, fromDate, todate);

                return new Response<IQueryable<Domain.OpenInvoiceMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenInvoiceMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenInvoiceMas>> Getheaderdet(int invid)
        {
            try
            {
                var ProductWO = repo.Getheaderdet(invid);

                return new Response<IQueryable<Domain.OpenInvoiceMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenInvoiceMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenInvoiceDet>> GetItmeditdet(int invid)
        {
            try
            {
                var ProductWO = repo.GetItmeditdet(invid);

                return new Response<IQueryable<Domain.OpenInvoiceDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenInvoiceDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Update(Domain.OpenInvoiceMas obj)
        {
            int? suppid = 0;
            int? unitid = 0;
            int? currid = 0;
            if (obj.SupplierID == 0)
            {
                suppid = null;
            }
            else
            {
                suppid = obj.SupplierID;
            }
            if (obj.Company_UnitID == 0)
            {
                unitid = null;
            }
            else
            {
                unitid = obj.Company_UnitID;
            }
            if (obj.CurrencyID == 0)
            {
                currid = null;
            }
            else
            {
                currid = obj.CurrencyID;
            }
            try
            {
                AxonApparel.Repository.OpenInvoice_Mas Updobj = new AxonApparel.Repository.OpenInvoice_Mas


                 //var ID = repo.UpdateData(new AxonApparel.Repository.OpenInvoice_Mas
                 {
                     Open_InvID = obj.Open_InvID,
                     CompanyID = obj.CompanyID,
                     Company_UnitID = unitid,//obj.Company_UnitID,
                     EntryNo = obj.EntryNo,
                     EntryDate = obj.EntryDate,
                     InvoiceDate = obj.InvoiceDate,
                     InvoiceNo = obj.InvoiceNo,
                     CurrencyID = currid,//obj.CurrencyID,
                     Remarks = obj.Remarks,
                     ExchangeRate = obj.ExchangeRate,
                     Gross_amount = obj.Gross_amount,
                     SupplierID = suppid,// obj.SupplierID,
                     Order_Type = obj.Order_Type,
                     paid = obj.paid,
                     passed = obj.passed,
                     Payment_Amt = obj.Payment_Amt,
                     Addless_amount = obj.Addless_amount,
                     AddLessManualOrFormula = (obj.AddLessManualOrFormula == null ? "" : obj.AddLessManualOrFormula),

                     CreatedBy = obj.CreatedBy,


                 };

                var ItmList = new List<OpenInvoice_Det>();

                foreach (var PItem in obj.OpeninvDet)
                {
                    ItmList.Add(new OpenInvoice_Det
                    {
                        Open_InvID = PItem.Open_InvID,
                        Open_Inv_DetID = PItem.Open_Inv_DetID,
                        Rate = PItem.Rate,
                        Qty = PItem.Qty,
                        Amount = PItem.Amount,
                        CostHead = PItem.CostHead,
                        Order_No = PItem.Order_No,
                        Job_Ord_No = PItem.Job_Ord_No,
                        Refno = PItem.Refno,
                        UOMID = PItem.UOMID,
                        ItemId = PItem.CostHeadID,

                    });

                }

                var List = new List<OpenInvoice_Addless>();

                if (obj.Openinvadless != null)
                {
                    foreach (var li in obj.Openinvadless)
                    {
                        List.Add(new OpenInvoice_Addless
                        {
                            Open_InvID = li.Open_InvID,
                            Openiv_Addless_ID = li.openiv_Addless_ID,
                            addlessid = li.addlessid,
                            AorL = li.AorL,
                            Percentage = li.Percentage,
                            Amount = li.Amount


                        });

                    }
                }

                var result = repo.UpdDetData(Updobj, ItmList, List, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }


        public Response<IQueryable<Domain.OpenInvoiceAddless>> Getaddlesdet(int invid)
        {
            try
            {
                var ProductWO = repo.Getaddlesdet(invid);

                return new Response<IQueryable<Domain.OpenInvoiceAddless>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenInvoiceAddless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Delete(int id)
        {
            return new Response<bool>(repo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
