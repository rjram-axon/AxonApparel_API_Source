using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IPlanningYarnRepository
    {
        IQueryable<PlanningYarn> GetFabricItemDetails(int PId);
        IList<PlanningYarnDyeing> GetDyeingItemDetails(int PlanID, int StyleRowId, int ItemId, int BColorId, int FabricId, int YDSlNo, decimal Qty);
        bool AddDetData(List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet,PlanningYarn PlanYarnEnty);
        bool DeleteData(int Id);
        IList<PlanningYarnLoss> GetCompDetYarnLossDetails(int PId, int ComSNo);
        IList<PlanningYarnDet> GetEditYarnDetDetails(int YMID, string ODNo,int StyID);
        IList<PlanningYarnDyeing> GetYarnDyeingRepList(int PId, int IteID, int FabID, int bColorID, int StRowID, int YMaID, int YDeID, decimal Qty, int Dying, int YlNo);
        bool UpdateYLossData(List<Yarn_Plan_ProLoss> objAdLDet);
        //bool UpdateYMasData(List<Yarn_Plan_Mas> objAdMas);
        //bool UpdateYDetData(List<Yarn_Plan_Det> objAdDet);
        bool UpdateYDyeingData(List<Yarn_Plan_Mas> objAdMas, List<Yarn_Plan_Det> objAdDet, List<Yarn_Plan_Dyeing> objAdDyeing);

        bool AddDetLossData(List<Yarn_Plan_ProLoss> objPLossDet1, List<Yarn_Plan_Det> objPDet1);
        bool AddDetDyeData(List<Yarn_Plan_Dyeing> objPYDetDye, List<Yarn_Plan_Det> objPDetDye);
    }
}
