using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IJobInvoiceRepository
    {
        IQueryable<Domain.JobInvoice> Loadgrid(int cmpid, int suppid, string jobordno, int recptid, string recptno, string rrefno, string refno, string orderno);
        IQueryable<Domain.JobInvoiceDetail> ThirdPagHeader(string RecptId);
        IQueryable<Domain.GrnInvDet> ThirdPagFirstGrid(string RecptId);
        IQueryable<Domain.GrnItemDet> ThirdPagSecondGrid(string RecptId);
        bool AddData(Domain.JobInvoiceMas objAdd);
        IList<Domain.JobInvoiceMas> GetMainData(int CompanyId, int SupplierId, int InvoiceId, string InvRefNo, string FromDate, string ToDate, string JobOrdNo);
        IQueryable<Domain.GrnInvDet> ThirdPagFirstGridforEdit(int JobInvId);
        IQueryable<Domain.GrnItemDet> ThirdPagSecondGridforEdit(int JobInvId);
        bool DeleteJobInvoice(int id);
        bool UpdateData(Domain.JobInvoiceMas objUpd);
        IQueryable<Domain.AddorLess> LoadEditAddlessgrid(int InvId);
    }
}
