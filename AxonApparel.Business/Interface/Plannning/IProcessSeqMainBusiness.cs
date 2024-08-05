using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IProcessSeqMainBusiness
    {
        Response<IQueryable<ProcessSequenceMain>> GetDataMainList(int? CompanyId, int? BuyerId, string Order_No, string Ref_No, string FDate, string ToDate, string OrdType);
        Response<IQueryable<ProcessSequenceMain>> GetDataOrderDetails(string fromDate, string toDate);

    }
}
