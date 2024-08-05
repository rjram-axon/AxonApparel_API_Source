using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public class BuyerItemRateBusiness:IBuyerItemRateBusiness
    {
       private IBuyerItemRateRepository BWIRRep = new BuyerItemRateRepository();
       public Response<IQueryable<BuyerItemRate>> GetListDetails(int? BuyerId, int? ItemId, int? ColorId, int? SizeId, int? SupplierId)
       {

          
            try
            {
                var CurDetList = BWIRRep.GetItemrateMainList(BuyerId, ItemId, ColorId, SizeId, SupplierId);

                return new Response<IQueryable<BuyerItemRate>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<BuyerItemRate>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
      
       }

      
    }
}
