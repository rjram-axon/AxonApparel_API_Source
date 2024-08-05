using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface ISpecialRequisitionMainBusiness
    {
       Response<IQueryable<Domain.SpecialReqMas>> GetDataMainList(int? companyId, string type, string orderno, string refno, string jobordno, int? reqid, string reqno, int? styleid, int? unitid, string unitrother, string fromDate, string todate);

    }
}
