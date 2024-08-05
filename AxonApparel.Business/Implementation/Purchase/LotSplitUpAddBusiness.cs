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
    public class LotSplitUpAddBusiness:ILotSplitUpAddBusiness
    {

        ILotSplitUpAddRepository LRep = new LotSplitUpAddRepository();

        public Response<IList<LotSplitUp>> GetDataLotAddDetails(string OrderType, string StockType, int? SupplierId, int? Companyid, string TransNo, int? ProcessId)
        {
            try
            {
                var ProductWO = LRep.GetDataLotRepDetails(OrderType, StockType, SupplierId, Companyid, TransNo, ProcessId);

                return new Response<IList<LotSplitUp>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<LotSplitUp>> GetDataLotDropDetails(string OrderType, string StockType)
        {
            try
            {
                var ProductWO = LRep.GetDataLotDropRepDetails(OrderType, StockType);

                return new Response<IQueryable<LotSplitUp>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<LotSplitUp>> GetDataLotSuppDropDetails(string OrderType, string StockType)
        {
            try
            {
                var ProductWO = LRep.GetDataLotDropSuppRepDetails(OrderType, StockType);

                return new Response<IQueryable<LotSplitUp>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<LotSplitUp>> GetDataLotTransNoDropDetails(string OrderType, string StockType)
        {
            try
            {
                var ProductWO = LRep.GetDataLotDropTransNoRepDetails(OrderType, StockType);

                return new Response<IQueryable<LotSplitUp>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
