using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IGeneralProcessReturnBusiness
    {
        Response<IQueryable<Domain.ProcessReturn>> Getprocess(int cmpid, int cmunitid);
        Response<IQueryable<Domain.ProcessReturn>> Getsupp();
        Response<IQueryable<Domain.ProcessReturn>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProcessReturnItemDet>> LoadItmdet(string prodord);
        Response<bool> CreateUnitEntry(Domain.ProcessReceiptMas MasEntry);
        Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate);
        Response<IQueryable<Domain.ProcessReturnItemDet>> LoadEditItmdet(int masid, string prodord);
        Response<bool> UpdateData(Domain.ProcessReceiptMas objupd);
        Response<bool> DeleteDelEntry(Domain.ProcessReceiptMas DelDEntry);
    }
}
