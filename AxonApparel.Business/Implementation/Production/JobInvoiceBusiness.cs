using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class JobInvoiceBusiness : IJobInvoiceBusiness
    {
        IJobInvoiceRepository repo = new JobInvoiceRepository();

        public Response<IQueryable<Domain.JobInvoice>> Loadgrid(int cmpid, int suppid, string jobordno, int recptid, string recptno, string rrefno, string refno, string orderno)
        {
            try
            {
                var getmaindt = repo.Loadgrid(cmpid, suppid, jobordno, recptid, recptno, rrefno, refno, orderno);

                return new Response<IQueryable<Domain.JobInvoice>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.JobInvoice>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.JobInvoiceDetail>> ThirdPageHeader(string ReceptNo)
        {
            try
            {
                var getthirdheaderInfo = repo.ThirdPagHeader(ReceptNo);

                return new Response<IQueryable<Domain.JobInvoiceDetail>>(getthirdheaderInfo, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.JobInvoiceDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.GrnInvDet>> ThirdPageFirstGrid(string ReceptNo)
        {
            try
            {
                var getthirdPageFirstGridInfo = repo.ThirdPagFirstGrid(ReceptNo);

                return new Response<IQueryable<Domain.GrnInvDet>>(getthirdPageFirstGridInfo, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GrnInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.GrnInvDet>> ThirdPageFirstGridforEdit(int JobInvId)
        {
            try
            {
                var getthirdPageFirstGridInfo = repo.ThirdPagFirstGridforEdit(JobInvId);

                return new Response<IQueryable<Domain.GrnInvDet>>(getthirdPageFirstGridInfo, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GrnInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.GrnItemDet>> ThirdPageScndGrid(string ReceptNo)
        {
            try
            {
                var getthirdPageScndGridInfo = repo.ThirdPagSecondGrid(ReceptNo);

                return new Response<IQueryable<Domain.GrnItemDet>>(getthirdPageScndGridInfo, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GrnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.GrnItemDet>> ThirdPageScndGridforEdit(int JobInvId)
        {
            try
            {
                var getthirdPageScndGridInfo = repo.ThirdPagSecondGridforEdit(JobInvId);

                return new Response<IQueryable<Domain.GrnItemDet>>(getthirdPageScndGridInfo, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GrnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateJobInvoice(Domain.JobInvoiceMas JobInvAdd)
        {
            try
            {
                //Insert into Job_Inv_Mas
                var JobInvoiceId = repo.AddData(new Domain.JobInvoiceMas
                {
                    Job_Inv_No = JobInvAdd.Job_Inv_No,
                    Sup_Inv_No = JobInvAdd.Sup_Inv_No,
                    Job_Inv_Date = JobInvAdd.Job_Inv_Date,
                    Sup_Inv_Date = JobInvAdd.Sup_Inv_Date,
                    SupplierId = JobInvAdd.SupplierId,
                    Unit_or_Other = JobInvAdd.Unit_or_Other,
                    Passed = JobInvAdd.Passed,
                    Remarks = JobInvAdd.Remarks,
                    Gross_Amount = JobInvAdd.Gross_Amount,
                    Addless_Amount = JobInvAdd.Addless_Amount,
                    Invoice_value = JobInvAdd.Invoice_value,
                    Payment_Amt = JobInvAdd.Payment_Amt,
                    CreatedBy = JobInvAdd.CreatedBy,
                    JobinvDet = JobInvAdd.JobinvDet,
                    JobinvAorL = JobInvAdd.JobinvAorL
                });

                return new Response<bool>(JobInvoiceId, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception ex)
            {
                return new Response<bool>(false, Status.ERROR, "Record saved failed...");
            }
        }

        public Response<IList<Domain.JobInvoiceMas>> GetMaindt(int CompanyId, int SupplierId, int InvoiceId, string InvRefNo, string FromDate, string ToDate, string JobOrdNo)
        {
            try
            {
                var getmaindt = repo.GetMainData(CompanyId, SupplierId, InvoiceId, InvRefNo, FromDate, ToDate, JobOrdNo);

                return new Response<IList<Domain.JobInvoiceMas>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.JobInvoiceMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteJobInv(int InvId)
        {
            try
            {
                return new Response<bool>(repo.DeleteJobInvoice(InvId), Status.SUCCESS, "Deleted Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "Delete failed...");
            }
        }

        public Response<bool> UpdateJobInv(Domain.JobInvoiceMas JobInvUpd)
        {
            try
            {
                var JobInvoiceId = repo.UpdateData(new Domain.JobInvoiceMas
                {
                    JobInvId = JobInvUpd.JobInvId,
                    Job_Inv_No = JobInvUpd.Job_Inv_No,
                    Sup_Inv_No = JobInvUpd.Sup_Inv_No,
                    Job_Inv_Date = JobInvUpd.Job_Inv_Date,
                    Sup_Inv_Date = JobInvUpd.Sup_Inv_Date,
                    SupplierId = JobInvUpd.SupplierId,
                    Unit_or_Other = JobInvUpd.Unit_or_Other,
                    Passed = JobInvUpd.Passed,
                    Remarks = JobInvUpd.Remarks,
                    Gross_Amount = JobInvUpd.Gross_Amount,
                    Addless_Amount = JobInvUpd.Addless_Amount,
                    Invoice_value = JobInvUpd.Invoice_value,
                    Payment_Amt = JobInvUpd.Payment_Amt,
                    CreatedBy = JobInvUpd.CreatedBy,
                    JobinvDet = JobInvUpd.JobinvDet,
                    JobinvAorL = JobInvUpd.JobinvAorL
                });

                return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception ex)
            {
                return new Response<bool>(true, Status.ERROR, "Record updated failed...");
            }
        }

        public Response<IQueryable<Domain.AddorLess>> LoadEditAddlessgrid(int Invid)
        {
            try
            {
                var ProductWO = repo.LoadEditAddlessgrid(Invid);

                return new Response<IQueryable<Domain.AddorLess>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.AddorLess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
