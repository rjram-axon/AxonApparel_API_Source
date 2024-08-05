using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPlanningSampleBusiness
    {
        Response<IQueryable<PlanningSampleMain>> GetDataSamPlanDetails(int StyRowId);
        Response<IQueryable<PlanningSampleMain>> GetDataEditSamPlanDetails(int StyRowId);
        Response<bool> CreatePlanningSamEntry(PlanningSampleMain PlanSamEnty);
        Response<IList<PlanningSampleFabricDet>> GetFabEditDetails(int StyleRowId, string OType);
        Response<IList<PlanningSampleFabricDet>> GetYarnEditDetails(int StyleRowId, string OType);

        Response<bool> UpdateSPlanEntry(PlanningSampleMain SEEntry);
        Response<bool> DeleteSPlanEntry(PlanningSampleMain SDEntry);
    }
}
