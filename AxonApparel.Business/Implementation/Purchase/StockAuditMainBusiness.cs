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
    public class StockAuditMainBusiness:IStockAuditMainBusiness
    {
        IStockAuditMainRepository ARep = new StockAuditMainRepository();

        public Response<IQueryable<StockAudit>> AudBussDetails(int? Companyid, int? Audit_MasId, string FDate, string TDate)
        {
            try
            {
                var PWO = ARep.GetDataPurAudRepDetails(Companyid, Audit_MasId, FDate, TDate);

                return new Response<IQueryable<StockAudit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<StockAudit>> GetDataAMDropDetails(string FDate, string TDate)
        {
            try
            {
                var ProductWO = ARep.GetDataDropAMRepDetails(FDate, TDate);

                return new Response<IQueryable<StockAudit>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
