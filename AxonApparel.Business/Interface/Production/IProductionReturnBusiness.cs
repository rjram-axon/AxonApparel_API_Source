using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IProductionReturnBusiness
    {
        Response<IQueryable<Domain.ProductionReturn>> Getprocess(int cmpid, int cmunitid);
        Response<IQueryable<Domain.ProductionReturn>> Getsupp();
        Response<IQueryable<Domain.ProductionReturn>> Getbuyer(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProductionReturn>> Getorder(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProductionReturn>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int buyerid, string refno, string ordno, string ordtype, string procordtype);
       Response<IQueryable<Domain.ProductionReturnItemDet>> LoadItmdet(string prodord);
       Response<bool> CreateUnitEntry(Domain.ProductionRecptMas MasEntry);
       Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid, string ordno);
       Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid);
       Response<IQueryable<Domain.ProductionReturnItemDet>> LoadEditItmdet(int masid, string prodord);
       Response<bool> UpdateData(Domain.ProductionRecptMas objupd);
       Response<bool> DeleteDelEntry(Domain.ProductionRecptMas DelDEntry);
    }
}
