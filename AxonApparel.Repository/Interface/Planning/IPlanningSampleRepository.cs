using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPlanningSampleRepository
    {
        IQueryable<PlanningSampleMain> GetDataSamRepPlanDetails(int StyleRowId);
        IQueryable<PlanningSampleMain> GetDataEditSamRepPlanDetails(int StyleRowId);
        bool AddDetItemData(List<Sample_FabricPlan> objPFDet, List<Sample_FabricPlan> objPYDet, int CompId, int UnitId, DateTime Date, string OrdNo, string JobNo);
        IList<PlanningSampleFabricDet> GetRepFabDetList(int StyleRowId, string OType);
        IList<PlanningSampleFabricDet> GetRepYarnDetList(int StyleRowId, string OType);
        bool UpdateDetItemData(List<Sample_FabricPlan> objEPFDet, List<Sample_FabricPlan> objEPYDet, int CompId, int UnitId, DateTime Date, string OrdNo, string JobNo);
        bool DeleteDetItemData(List<Sample_FabricPlan> objDPFDet, List<Sample_FabricPlan> objDPYDet, int CompId, int UnitId, DateTime Date, string OrdNo, string JobNo);
    
    }
}
