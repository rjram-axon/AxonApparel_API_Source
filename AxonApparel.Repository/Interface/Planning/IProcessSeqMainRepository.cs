using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IProcessSeqMainRepository
    {
        IQueryable<ProcessSequenceMain> GetAddDataMainList(int? CompanyId, int? BuyerId, string Order_No, string Ref_No, string FDate, string ToDate, string OrdType);
        IQueryable<ProcessSequenceMain> GetDataOrderRepDetails(string fromDate, string toDate);
    }
}
