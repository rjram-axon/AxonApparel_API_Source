using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IPlanningFabricRepository
    {
        IEnumerable<PlanningFabric> GetCompFabricItemDetails(int PId);
        IQueryable<PlanningFabricDetails> GetColor();
        IQueryable<PlanningFabricDetails> GetPrintColor();
        IList<PlanningFabricDetails> GetCompDetFabricItemDetails(int PId, int ComSNo);
        IList<PlanningFabricDetails> GetCompDetFabricTotItemDetails(int PId);
        IList<PlanLoss> GetCompDetFabricLossDetails(int PId, int ComSNo);
        bool AddDetData(List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet,PlanningFabric Fplan);
        //int AddDetData(List<Fabric_Plan> objPDet);
        bool AddDetLossData(List<Fab_Plan_ProLoss> objPLossDet, List<Fabric_Plan> objPDet);
        IList<PlanningFabricDetails> GetConFabricPlanList(int PId, int ComSNo);
        IList<PlanningFabricDetails> GetConFabricPlantotList(int PId);
        //bool UpdateDetData(List<Fab_Plan_ProLoss> objAdDet);
        bool UpdateConDetData(List<Fab_Plan_ProLoss> objAdDet,List<Fabric_Plan> objAdConDet, PlanningFabric Fplan);
        bool DeleteData(List<Fabric_Plan> objAdConDet, PlanningFabric Fplan);

        IQueryable<PlanningFabricDetails> GSizeList();

        IQueryable<PlanningFabricDetails> BitItemList();
    }
}
