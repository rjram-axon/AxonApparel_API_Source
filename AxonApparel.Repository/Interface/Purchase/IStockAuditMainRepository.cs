using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IStockAuditMainRepository
    {
        IQueryable<StockAudit> GetDataPurAudRepDetails(int? Companyid, int? Audit_MasId, string FDate, string TDate);
        IQueryable<StockAudit> GetDataDropAMRepDetails(string FDate, string TDate);
    }
}
