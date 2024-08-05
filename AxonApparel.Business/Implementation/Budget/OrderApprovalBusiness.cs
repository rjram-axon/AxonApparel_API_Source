using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class OrderApprovalBusiness:IOrderApprovalBusiness
    {
       IOrderApprovalRepository repo = new OrderApprovalRepository();



       public Response<bool> Update(string OrderNo, int Bmasid, string PA, string PType)
       {
          try{

              var result = repo.Update(OrderNo, Bmasid, PA,PType);

              return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
              // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
          }
          catch (Exception)
          {
              return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

          }
       }


       public Response<IList<Domain.BulkOrder>> GetPAStatus(int bmasid)
       {
           try
           {
               var ProductWO = repo.GetPAStatus(bmasid);

               return new Response<IList<Domain.BulkOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IList<Domain.BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<Domain.BuyOrderStyle>> GetStyleRowid(string ordno)
       {
           try
           {
               var ProductWO = repo.GetStyleRowid(ordno);

               return new Response<IList<Domain.BuyOrderStyle>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IList<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
