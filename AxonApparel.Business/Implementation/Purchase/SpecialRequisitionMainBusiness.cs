using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class SpecialRequisitionMainBusiness:ISpecialRequisitionMainBusiness
    {
        ISpecialRequisitionMainRepository stkRep = new SpecialRequisitionMainRepository();

        public Common.Response<IQueryable<Domain.SpecialReqMas>> GetDataMainList(int? companyId, string type, string orderno, string refno, string jobordno, int? reqid, string reqno, int? styleid, int? unitid, string unitrother, string fromDate, string todate)
        {
            try
            {
                var CurDetList = stkRep.GetDataMainList(companyId, type, orderno, refno, jobordno, reqid, reqno, styleid, unitid, unitrother, fromDate, todate);

                return new Response<IQueryable<Domain.SpecialReqMas>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.SpecialReqMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
