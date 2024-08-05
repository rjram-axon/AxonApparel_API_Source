using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IPlanningYarnBusiness
    {
        Response<IQueryable<PlanningYarn>> GetDataPlanYarnList(int PID);
        Response<IList<PlanningYarnDyeing>> GetDataPlanDyeDetList(int PlanID, int StyleRowId, int ItemId, int BColorId, int FabricId, int YDSlNo, decimal Qty);
        Response<bool> CreatePlanningYarnEntry(PlanningYarn PlanYarnEnty);
        Response<bool> DeletePlanYarn(int PID);
        Response<IList<PlanningYarnLoss>> GetDataPlanYarnLossList(int PID, int ComSNo);
        Response<IList<PlanningYarnDet>> GetDataPlanYarnEditList(int YMasID, string OrdNo, int StyleId);
        Response<IList<PlanningYarnDyeing>> GetYarnDyeingplanList(int PlId, int ItemID, int FabricID, int baseColorID, int StyleRowID, int YMasID, int YDetID, decimal Qty, int Dying, int YlNo);
        Response<bool> UpdateYarnEntry(PlanningYarn PYEntry);
    }
}
