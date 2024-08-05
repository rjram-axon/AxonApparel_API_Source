using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IProductionOrderBusiness
    {
       Response<IQueryable<Domain.ProcessOrderAddScreen>> Getrefno(int cmpid,int cmunitid);
       Response<IQueryable<Domain.ProcessOrderAddScreen>> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int styleid, string ordo);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputitmsgrid( string closed, string jobordno,int procid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputjoborddetgrid(string closed, string jobordno, int procid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputitmsgrid(string closed, string jobordno, int procid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputjoborddetgrid(string closed, string jobordno, int procid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid, int Storeid);
       Response<bool> CreateUnitEntry(Domain.ProductionOrdMas MasEntry);
       Response<bool> UpdateData(Domain.ProductionOrdMas objupd);
       Response<bool> Delete(int id);
       Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingrid(int? cmpid, string closed,string buyrsamp,string processortype,int? prodordid,string prodord,string type,int? processorid,int? unitid,int? processid,string fromdate,string todate,int? buyerid,string orderno);
       Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingridord(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputitmsgrid(int prodid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputitmsgrid(int prodid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputJobDetgrid(int prodid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputJobDetgrid(int prodid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputStkdet(int cmpid,int prodid,string prodordno);
       Response<bool> DeleteDelEntry(Domain.ProductionOrdMas DelDEntry);
       Response<IQueryable<Domain.ProductionOrdAddLess>> LoadEditAddlessgrid(int prodid);
    }
}
