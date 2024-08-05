using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class PlanningApprovalBusiness:IPlanningApprovalBusiness
    {

        IPlanningApprovalRepository repo = new PlanningApprovalRepository();

        public Response<IQueryable<Domain.PlanningApproval>> LoadMaingrid(int? cmpid, int? styleid, string ordno, string refno, string type, string ordtype, string fromdate, string todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, styleid, ordno, refno, type, ordtype, fromdate, todate);

                return new Response<IQueryable<Domain.PlanningApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PlanningApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.PlanningBomApproval>> LoadBomdet(string ordno, int styleid, int Itemid)
        {
            try
            {
                var ProductWO = repo.LoadBomdet(ordno, styleid, Itemid);

                return new Response<IQueryable<Domain.PlanningBomApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PlanningBomApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateAppEntry(Domain.PlanningApproval MasEntry)
        {
            try
            {

                var Maslist = new List<Domain.PlanningBomApproval>();
                foreach (var mas in MasEntry.PlanningBomDet)
                {
                    Maslist.Add(new Domain.PlanningBomApproval
                    {
                        AccreqId = mas.AccreqId,
                        Actual_Qty = mas.Actual_Qty,
                        IsApproved = mas.IsApproved,
                        AppDate = mas.AppDate,       
                        Itemid=mas.Itemid,

                    });
                }


                var result = repo.AddDetData(Maslist, MasEntry.MLockAcc, MasEntry.MLockCon, MasEntry.MLockFabric, MasEntry.MLockOrder, MasEntry.MLockPlanning, MasEntry.MLockPrgSeq, MasEntry.MLockYarn,MasEntry.orderno,MasEntry.styleid);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Response<IQueryable<Domain.PlanningBomApproval>> LoadBomdetEdit(string ordno, int styleid, int Itemid)
        {
            try
            {
                var ProductWO = repo.LoadBomdetEdit(ordno, styleid, Itemid);

                return new Response<IQueryable<Domain.PlanningBomApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PlanningBomApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
