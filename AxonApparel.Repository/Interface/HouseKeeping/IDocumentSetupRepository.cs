using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IDocumentSetupRepository
    {
       IList<Domain.ReportPrefix> GetRptOption();
       IQueryable<Domain.ReportFooterSetup> GetRptDet(string docname);
       IQueryable<Domain.Report_Footer_Email> GetRptEmpDet(string docname);
       bool UpdDetData(Report_Footer_Setup obj, List<Domain.ReportOption> objdet, List<Domain.Report_Footer_Email> objemaildet, List<Domain.Report_Footer_Process> objprocdet, string Mode, int unitmId = 0);
       

    }
}
