using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IPlanningApprovalRepository
    {
        IQueryable<Domain.PlanningApproval> LoadMaingrid(int? cmpid, int? styleid, string ordno, string refno, string type, string ordtype, string fromdate, string todate);
        IQueryable<Domain.PlanningBomApproval> LoadBomdet(string ordno, int styleid, int Itemid);
        bool AddDetData(List<Domain.PlanningBomApproval> objmas, int MLockAcc, int MLockCon, int MLockFabric, char MLockOrder, bool MLockPlanning, bool MLockPrgSeq, int MLockYarn, string Ordno, int styleid);
        IQueryable<Domain.PlanningBomApproval> LoadBomdetEdit(string ordno, int styleid, int Itemid);
    
    }
}
