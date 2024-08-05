using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPlanningMainRepository
    {
        IQueryable<PlanningMain> GetDataMainList(int? companyId, string orderNo, string refno, int? styleId, string fromDate, string toDate, string OType, string OrderType, string bud, string buystat, int empid, int buyerid, string Job_Ord_No, string DispatchClosed);
        IQueryable<PlanningMain> GetDataOrderRepDetails(string fromDate, string toDate, string OrderType);
        IQueryable<PlanningMain> GetDataStyleRepDetails(string fromDate, string toDate, string OrderType);
    }
}
