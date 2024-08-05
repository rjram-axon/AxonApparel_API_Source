using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiProfitLossRepository
    {
        IQueryable<Proc_Apparel_ApiGetFilterations_Result> GetFilterdetails(string category);
        IQueryable<Proc_Apparel_ApiPlannDetailCostingCostSummaryStatement_Result> GetDetailcosting(ApiGetOrderfilter filter);
        IQueryable<Proc_Apparel_ApiGetOrderDetails_Result> Getorderdetails(ApiGetOrderfilter filter);

    }
}
