using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IPlanningAddBusiness
    {
       Response<IQueryable<PlanningMain>> GetDataAddList(int StyRowId);
       Response<IQueryable<PlanningMain>> GetDataPlanDetails(int Id);
       Response<bool> DeletePlanCon(int Buy_Ord_MasId);
       Response<bool> DeletePlanFab(int PlanId);
       Response<bool> DeletePlanYarn(int PlanId);
       /// <summary>
       /// 
       /// </summary>
       /// <param name="Courier_MasId"></param>
       /// <returns></returns>

     //  Response<PlanningMain> GetDataById(int StyleRowId);
    }
}
