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
    public class ProcessSeqMainBusiness : IProcessSeqMainBusiness
    {
        IProcessSeqMainRepository repo = new ProcessSeqMainRepository();


        public Response<IQueryable<ProcessSequenceMain>> GetDataMainList(int? CompanyId, int? BuyerId, string Order_No, string Ref_No, string FDate, string ToDate, string OrdType)
        {
            try
            {
                var CurDetList = repo.GetAddDataMainList(CompanyId, BuyerId, Order_No, Ref_No, FDate, ToDate, OrdType);

                return new Response<IQueryable<ProcessSequenceMain>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProcessSequenceMain>> GetDataOrderDetails(string fromDate, string toDate)
        {
            try
            {
                var ProductWO = repo.GetDataOrderRepDetails(fromDate, toDate);

                return new Response<IQueryable<ProcessSequenceMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessSequenceMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
      
    }
   
}
