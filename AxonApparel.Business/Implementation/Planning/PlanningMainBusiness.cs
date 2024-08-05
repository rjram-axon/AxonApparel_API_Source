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
    public class PlanningMainBusiness:IPlanningMainBusiness
    {
        IPlanningMainRepository PlanRep = new PlanningMainRepository();

        public Response<IQueryable<PlanningMain>> GetDataMainList(int? companyId, string orderNo, string refno, int? styleId, string fromDate, string toDate, string OType, string OrderType, string bud, string buystat, int empid, int buyerid, string Job_Ord_No, string DispatchClosed)
        {
            try
            {
                var CurDetList = PlanRep.GetDataMainList(companyId, orderNo, refno, styleId, fromDate, toDate, OType, OrderType, bud, buystat, empid, buyerid, Job_Ord_No, DispatchClosed);

                return new Response<IQueryable<PlanningMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanningMain>> GetDataOrderDetails(string fromDate, string toDate, string OrderType)
        {
            try
            {
                var ProductWO = PlanRep.GetDataOrderRepDetails(fromDate, toDate, OrderType);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<IQueryable<PlanningMain>> GetDataStyleDetails(string fromDate, string toDate, string OrderType)
        {
            try
            {
                var ProductWO = PlanRep.GetDataStyleRepDetails(fromDate, toDate, OrderType);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
