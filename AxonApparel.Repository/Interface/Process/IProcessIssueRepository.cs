using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IProcessIssueRepository
    {
       IQueryable<Domain.ProcessIssueAddgrid> Getprocess();
       IQueryable<Domain.ProcessIssueAddgrid> Getsupp();
       IQueryable<Domain.ProcessIssueAddgrid> Loadgrid(int cmpunitid, int procid, string ordertype,string processortype,int buyerid,string refno,string ordno,int procserid);
       IQueryable<Domain.ProcessIssueDet> Loaditmsgrid(int procid);
       IQueryable<Domain.ProcessIssueJobdet> LoadJobdetgrid(int procid);
       IQueryable<Domain.ProcessIssueStock> LoadStkdet(string jmasid,int cmpid);
       int AddIssData(Process_Issue_Mas objEntry);
       bool AddIssDetData(Process_Issue_Mas obj,DateTime transdate, List<Domain.ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objstkdet, string Mode, int unitmId = 0);
       bool UpdIssDetData(Process_Issue_Mas obj, DateTime transdate, List<Domain.ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objstkdet, string Mode, int unitmId = 0);

       IQueryable<Domain.ProcessIssueAddgrid> LoadMaingrid(int? cmpid, string issueno, int processid, string ordno, int? masid, string procordno, int? unitid, string refno, string ordtype, string fromdate, string todate);
       bool UpdateData(Process_Issue_Mas objupd);
       bool DeleteDetData(DateTime transdate, List<Domain.ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objadlsdet, string Mode, int unitmId = 0);
       IQueryable<Domain.ProcessIssueDet> Loadedititmsgrid(int procid);
       IQueryable<Domain.ProcessIssueJobdet> LoadeditJobdetgrid(int procid);
       IQueryable<Domain.ProcessIssueStock> LoadeditStkdet(string jmasid, int cmpid);
       bool MarkUpRateOrdUpdation(int ProcOrderId);
       bool MarkUpRateIssUpdation(int ProcOrderId);
    }
}
