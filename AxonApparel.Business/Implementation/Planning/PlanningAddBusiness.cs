using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparel.Business
{
   public class PlanningAddBusiness:IPlanningAddBusiness

    {
        IPlanningAddRepository PlanAddRep = new PlanningAddRepository();

        public Response<IQueryable<PlanningMain>> GetDataAddList(int StyleRowId)
        {
            try
            {
                var CurDetList = PlanAddRep.GetDataAddList(StyleRowId);

                return new Response<IQueryable<PlanningMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PlanningMain>> GetDataPlanDetails(int Id)
        {
            try
            {
                var ProductWO = PlanAddRep.GetDataPlanDetails(Id);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> DeletePlanCon(int Courier_MasId)
        {
            return new Response<bool>(PlanAddRep.DeleteData(Courier_MasId), Status.SUCCESS, "Deleted Successfully");
        }



        public Response<bool> DeletePlanFab(int PlanId)
        {
            return new Response<bool>(PlanAddRep.DeleteFabData(PlanId), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<bool> DeletePlanYarn(int PlanId)
        {
            return new Response<bool>(PlanAddRep.DeleteYarnData(PlanId), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
