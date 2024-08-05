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
    public class LotSplitUpMainBusiness:ILotSplitUpMainBusiness
    {

        ILotSplitUpMainRepository LRep = new LotSplitUpMainRepository();

        public Response<IQueryable<LotSplitUp>> GetDataLotMainDetails(int? Companyid, int? SupplierId, string TransNo, string EntryNo, string MLotNo, string FromDate, string ToDate)
        {
            try
            {
                var PWO = LRep.GetDataLotMainRepDetails(Companyid, SupplierId, TransNo, EntryNo, MLotNo, FromDate, ToDate);

                return new Response<IQueryable<LotSplitUp>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<LotSplitUp>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<LotSplitUp>> GetDataOrderDetails(string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = LRep.GetDataOrderRepDetails(FrmDate, ToDate);

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
