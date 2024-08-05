using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IQuotationMainBusiness
    {
        Response<IQueryable<MarkQuoteMas>> GetDataMainList(int? companyId, int? buyerid, string quotetype, string quoteno, string enqno, int? styleid, string fromDate, string todate, string RefNo);
        Response<IQueryable<MarkQuoteMas>> GetDetRecNo(int id);
    }
}
