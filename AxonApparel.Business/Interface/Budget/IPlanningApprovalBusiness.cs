using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IPlanningApprovalBusiness
    {
        Response<IQueryable<Domain.PlanningApproval>> LoadMaingrid(int? cmpid, int? styleid, string ordno, string refno, string type, string ordtype, string fromdate, string todate);
        Response<IQueryable<Domain.PlanningBomApproval>> LoadBomdet(string ordno, int styleid, int Itemid);
        Response<bool> CreateAppEntry(Domain.PlanningApproval MasEntry);
        Response<IQueryable<Domain.PlanningBomApproval>> LoadBomdetEdit(string ordno, int styleid, int Itemid);
    }
}
