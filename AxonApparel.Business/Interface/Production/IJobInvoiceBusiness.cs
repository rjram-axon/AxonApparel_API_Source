using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IJobInvoiceBusiness
    {
        Response<IQueryable<Domain.JobInvoice>> Loadgrid(int cmpid, int suppid, string jobordno, int recptid, string recptno, string rrefno, string refno, string orderno);
        Response<IQueryable<Domain.JobInvoiceDetail>> ThirdPageHeader(string ReceptNo);
        Response<IQueryable<Domain.GrnInvDet>> ThirdPageFirstGrid(string ReceptNo);
        Response<IQueryable<Domain.GrnItemDet>> ThirdPageScndGrid(string ReceptNo);
        Response<bool> CreateJobInvoice(Domain.JobInvoiceMas JobInvAdd);
        Response<IList<Domain.JobInvoiceMas>> GetMaindt(int CompanyId, int SupplierId, int InvoiceId, string InvRefNo, string FromDate, string ToDate, string JobOrdNo);
        Response<IQueryable<Domain.GrnInvDet>> ThirdPageFirstGridforEdit(int JobInvId);
        Response<IQueryable<Domain.GrnItemDet>> ThirdPageScndGridforEdit(int JobInvId);
        Response<bool> DeleteJobInv(int InvId);
        Response<bool> UpdateJobInv(Domain.JobInvoiceMas JobInvUpd);
        Response<IQueryable<Domain.AddorLess>> LoadEditAddlessgrid(int Invid);
    }
}
