using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IProcessReturnBusiness
    {
       Response<IQueryable<Domain.ProcessReturn>> Getprocess(int cmpid, int cmunitid);
       Response<IQueryable<Domain.ProcessReturn>> Getsupp();
       Response<IQueryable<Domain.ProcessReturn>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int colorid, string ordtype, string ProcessorType, string OrderNo, string ReferNo, int StyleId, int BuyerId);
        Response<IQueryable<Domain.ProcessReturnItemDet>> LoadItmdet(string prodord);
       Response<IQueryable<Domain.ProcessReturnItemDet>> LoadOpItmdet(string prodord);
        Response<bool> CreateUnitEntry(Domain.ProcessReceiptMas MasEntry);
        Response<bool> CreateCancelEntry(Domain.ProcessCancelMas MasEntry);

        Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid, int Userid);
        Response<IQueryable<Domain.ProcessReturnItemDet>> LoadEditItmdet(int masid, string prodord);
        Response<IQueryable<Domain.ProcessReturnItemDet>> GetOutProcCan(int masid);
        Response<bool> UpdateData(Domain.ProcessReceiptMas objupd);
        Response<bool> DeleteDelEntry(Domain.ProcessReceiptMas DelDEntry);
        Response<bool> UpdateCancelEntry(Domain.ProcessCancelMas UpdateEntry);
        Response<bool> DeleteCancelEntry(Domain.ProcessCancelMas DelEntry);
    }
}
