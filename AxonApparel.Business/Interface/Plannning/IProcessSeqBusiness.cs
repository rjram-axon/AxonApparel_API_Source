using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public interface IProcessSeqBusiness
    {
        Response<IQueryable<ProcessSequenceMain>> GetDataMainList(int? CompanyId, int? BuyerId, int? Styleid, string Order_No, string Ref_No, string JobNo, string FDate, string ToDate, string OrdType);
        Response<bool> DeletePlanCon(int Buy_Ord_MasId);
        Response<IQueryable<ProcessSequenceMain>> GetDataOrderDetails(string fromDate, string toDate);
    }
}
