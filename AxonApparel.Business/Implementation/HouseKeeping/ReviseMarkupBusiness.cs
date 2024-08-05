using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class ReviseMarkupBusiness:IReviseMarkupBusiness
    {

        IReviseMarkupRepository repo = new ReviseMarkupRepository();

        public Common.Response<IQueryable<Domain.ItmStkDet>> LoadMaingrid(string OrdNo, string RefNo, string Tranno, int ItemId, int PrdId, int CompId, string tyid)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(OrdNo, RefNo, Tranno, ItemId, PrdId, CompId, tyid);

                return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateReviseEntry(ItmStkDet AllUPEntry)
        {
            try
            {

                var AllowItmList = new List<Repository.ItemStock>();

                foreach (var GItem in AllUPEntry.ReStkDet)
                {

                    AllowItmList.Add(new Repository.ItemStock
                    {
                        StockId = GItem.StockId,                  
                        Markup_Rate = GItem.Markup_Rate,

                    });

                }

                var result = repo.UpdateDetData(AllowItmList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
