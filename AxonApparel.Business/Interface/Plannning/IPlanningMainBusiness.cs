using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IPlanningMainBusiness
    {
       Response<IQueryable<PlanningMain>> GetDataMainList(int? companyId, string orderNo, string refno, int? styleId, string fromDate, string toDate, string OType, string OrderType, string bud, string buystat, int empid, int buyerid, string Job_Ord_No, string DispatchClosed);
       Response<IQueryable<PlanningMain>> GetDataOrderDetails(string fromDate, string toDate, string OrderType);
       Response<IQueryable<PlanningMain>> GetDataStyleDetails(string fromDate, string toDate, string OrderType);
    }
}
