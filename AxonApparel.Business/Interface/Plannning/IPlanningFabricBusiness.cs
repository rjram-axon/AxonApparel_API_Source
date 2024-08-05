using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IPlanningFabricBusiness
    {
        Response<IEnumerable<PlanningFabric>> GetDataPlanFabricList(int PID);
        Response<IQueryable<PlanningFabricDetails>> Getcolor();
        Response<IQueryable<PlanningFabricDetails>> Getprintcolor();
        Response<IList<PlanningFabricDetails>> GetDataPlanFabricDetList(int PID, int ComSNo);
        Response<IList<PlanningFabricDetails>> GetDataPlanFabrictotDetList(int PID);
        Response<IList<PlanLoss>> GetDataPlanFabricLossList(int PID, int ComSNo);
        Response<bool> CreatePlanningFabricEntry(PlanningFabric PlanFabEnty);
        Response<IList<PlanningFabricDetails>> GetConFabricplanList(int PID, int ComSNo);
        Response<IList<PlanningFabricDetails>> GetConFabricplantotList(int PID);
        Response<bool> UpdateFabricEntry(PlanningFabric PUEntry);
        Response<bool> DeletePlanFabric(PlanningFabric PUEntry);
        Response<IQueryable<PlanningFabricDetails>> GSizeList();
        Response<IQueryable<PlanningFabricDetails>> BitItemList();
    }
}
