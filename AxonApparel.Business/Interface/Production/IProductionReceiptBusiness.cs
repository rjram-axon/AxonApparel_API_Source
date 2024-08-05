using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IProductionReceiptBusiness
    {
       Response<IQueryable<Domain.ProductionRecptMas>> Getprocess(int cmpid, int cmunitid,string ordtype);
       Response< IQueryable<Domain.ProductionRecptMas>> Getprocessor();
       Response<IQueryable<Domain.ProductionRecptMas>> Getwrkdiv();
       Response<IQueryable<Domain.ProductionRecptMas>> Getissueno(int cmpid, int cmunitid, int processid,int processorid);
       Response<IQueryable<Domain.ProductionRecptMas>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int buyerid, string refno, string ordno, int clid, string procrtype);
       Response<IQueryable<Domain.ProductionRecptMas>> Loadorderno(int cmpid, int cmunitid, int processid, int processorid);
       Response<IQueryable<Domain.ProductionRecptMas>> Loadcolor(int cmpid, int cmunitid, int processid, int processorid);
       Response< IQueryable<Domain.ProductionRecptDet>> LoadItmgrid(string pid);
       Response<IQueryable<Domain.ProductionRecptJobdet>> Loadjobdetgrid(string pid);
       Response<bool> CreateUnitEntry(Domain.ProductionRecptMas MasEntry);
       Response<bool> UpdateData(Domain.ProductionRecptMas objupd);
       Response<bool> DeleteDelEntry(Domain.ProductionRecptMas DelDEntry);
       Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingrid(int? cmpid, int? processid,int? unitid,int? buyerid,int? masid,int? prodordid, string jobordno,string processortype,string type,string dcno,string recptno,string fromdate,string todate,int? processorid);
       Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid);
       Response<IQueryable<Domain.ProductionRecptDet>> LoadEdititemgrid(int pid);
       Response<IQueryable<Domain.ProductionRecptJobdet>> LoadEditjobdetgrid(int pid);
       Response<IQueryable<Domain.ProductionRecptDet>> ChkDC(string recpt,int pid);
    }
}
