using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IGeneralProcessOrderRepository
    {
       IQueryable<Domain.GeneralProcOrdStk> Getstkdet(int itmid, int clrid,int sizeid,int cmpid,int strunitid);
       int AddData(Process_Ord_Mas objEntry);
       bool AddIss(Process_Ord_Mas obj,List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0);
       bool UpdIss(Process_Ord_Mas obj, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0);
       IQueryable<Domain.ProcessOrderAddScreen> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate);
       IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputitmsgrid(int prodid);
       IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputitmsgrid(int prodid);
       IQueryable<Domain.GeneralProcOrdStk> Getstkdetedit(int processordid);
       bool UpdateData(Process_Ord_Mas objupd);
       bool DeleteIssueDetData(List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0);
       IQueryable<Domain.GeneralProcOrdStk> LoadProcess();
    }
}
