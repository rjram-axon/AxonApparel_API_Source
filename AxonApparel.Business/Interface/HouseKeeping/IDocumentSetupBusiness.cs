using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
  public interface IDocumentSetupBusiness
    {
      Response<IList<Domain.ReportPrefix>> GetRptOption();
      Response<IQueryable<Domain.ReportFooterSetup>> GetRptDet(string docname);
      Response<bool> UpdateData(Domain.ReportFooterSetup objupd);
      Response<IQueryable<Domain.Report_Footer_Email>> GetRptEmpDet(string docname);
    }
}
