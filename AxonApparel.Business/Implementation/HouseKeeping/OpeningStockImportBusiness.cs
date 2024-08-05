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
   public  class OpeningStockImportBusiness :IOpeningStockImportBusiness
    {
       IOpeningStockImportRepository repo = new OpeningStockImportRepository();

       public Common.Response<Domain.ItmStkDet> GetListUserStatus(Domain.ItmStkDet data)
       {
           try
           {
               var ProductWO = repo.GetListUserStatus(data);

               return new Response<Domain.ItmStkDet>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<Domain.ItmStkDet>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }



    }
}
