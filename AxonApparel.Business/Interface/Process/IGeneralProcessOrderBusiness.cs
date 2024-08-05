using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IGeneralProcessOrderBusiness
    {
       Response< IQueryable<Domain.GeneralProcOrdStk>> Getstkdet(int itmid, int clrid,int sizeid,int cmpid,int strunitid);
       Response<bool> CreateIss(Domain.ProcessOrdMas MasEntry);
       Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputitmsgrid(int prodid);
       Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputitmsgrid(int prodid);
       Response<IQueryable<Domain.GeneralProcOrdStk>> Getstkdetedit(int processordid);
       Response<bool> UpdateIss(Domain.ProcessOrdMas objupd);
       Response<bool> DeleteIssDelEntry(Domain.ProcessOrdMas DelDEntry);
       Response<IQueryable<Domain.GeneralProcOrdStk>> LoadProcess();
    }
}
