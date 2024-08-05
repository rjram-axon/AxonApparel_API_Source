using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IProcessSeqRepository
    {
        IQueryable<ProcessSequenceMain> GetDataMainList(int? CompanyId, int? BuyerId, int? Styleid, string Order_No, string Ref_No, string JobNo, string FDate, string ToDate, string OrdType);
        bool DeleteData(int Id);
        IQueryable<ProcessSequenceMain> GetDataOrderRepDetails(string fromDate, string toDate);
    }
}
