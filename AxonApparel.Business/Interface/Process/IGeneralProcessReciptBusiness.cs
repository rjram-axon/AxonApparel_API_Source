using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IGeneralProcessReciptBusiness
    {
        Response<IQueryable<Domain.ProcessReceiptMas>> Getprocess(int cmpid, int cmunitid, string ordtype);
        Response<IQueryable<Domain.ProcessReceiptMas>> Getprocessor();
        Response<IQueryable<Domain.ProcessReceiptMas>> Getwrkdiv();
        Response<IQueryable<Domain.ProcessReceiptMas>> Getissueno(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProcessReceiptMas>> Loadcolor(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProcessReceiptMas>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed);
        Response<IQueryable<Domain.ProcessReceiptDet>> LoadItmgrid(string pid);
        Response<IQueryable<Domain.ProcessReceiptJobdet>> Loadjobdetgrid(string pid);
        Response<bool> CreateUnitEntry(Domain.ProcessReceiptMas MasEntry);
        Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int processorid);
        Response<IQueryable<Domain.ProcessReceiptDet>> LoadEditItmgrid(int pid);
        Response<IQueryable<Domain.ProcessReceiptJobdet>> LoadEditjobdetgrid(int pid);
        Response<IQueryable<Domain.ProcessReceiptDet>> ChkDC(string recpt, int pid);
        Response<bool> DeleteDelEntry(Domain.ProcessReceiptMas DelDEntry);
        Response<bool> UpdateData(Domain.ProcessReceiptMas objupd);
    }
}
