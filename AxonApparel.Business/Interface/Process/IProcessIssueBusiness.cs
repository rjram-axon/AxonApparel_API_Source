using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public interface IProcessIssueBusiness
    {
        Response<IQueryable<Domain.ProcessIssueAddgrid>> Getprocess();
        Response<IQueryable<Domain.ProcessIssueAddgrid>> Getsupp();
        Response<IQueryable<Domain.ProcessIssueAddgrid>> Loadgrid(int cmpunitid, int procid, string ordertype, string processortype, int buyerid, string refno, string ordno, int procserid);
        Response<IQueryable<Domain.ProcessIssueDet>> Loaditmsgrid(int procid);
        Response<IQueryable<Domain.ProcessIssueJobdet>> LoadJobdetgrid(int procid);
        Response<IQueryable<Domain.ProcessIssueStock>> LoadStkdet(string jmasid, int cmpid);
        Response<bool> CreateIssUnitEntry(Domain.ProcessIssueMas MasEntry);
       Response<IQueryable<Domain.ProcessIssueAddgrid>> LoadMaingrid(int? cmpid, string issueno, int processid, string ordno, int? masid, string procordno, int? unitid, string refno, string ordtype, string fromdate, string todate);
       Response<bool> UpdateData(Domain.ProcessIssueMas objupd);
       Response<bool> DeleteDelEntry(Domain.ProcessIssueMas DelDEntry);
       Response<IQueryable<Domain.ProcessIssueDet>> Loadedititmsgrid(int procid);
       Response<IQueryable<Domain.ProcessIssueJobdet>> LoadeditJobdetgrid(int procid);
       Response<IQueryable<Domain.ProcessIssueStock>> LoadeditStkdet(string jmasid, int cmpid);
      

    }
}
