using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IStockAuditMainBusiness
    {
        Response<IQueryable<StockAudit>> AudBussDetails(int? Companyid, int? Audit_MasId, string FDate, string TDate);
        Response<IQueryable<StockAudit>> GetDataAMDropDetails(string FDate, string TDate);

    }
}
