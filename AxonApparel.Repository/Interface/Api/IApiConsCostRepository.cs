using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiConsCostRepository
    {
        IQueryable<Proc_Apparel_ApiGetFilterations_Result> GetFiltrationdetails(string category);
        IQueryable<Proc_Apparel_ApiConsolidatedCostSummary_Result> GetConsolidatedCostingDetails(ApiConsDataFilter filter);
    }
}
