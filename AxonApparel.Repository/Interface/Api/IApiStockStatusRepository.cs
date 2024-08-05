using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiStockStatusRepository
    {
        IQueryable<ApiStockListfilter> GetFilterDetails(string category);
        IQueryable<Proc_Apparel_ApiStockStatusMainSummary_Result> GetStockdetails(ApiStockFilter filter);
        IQueryable<Proc_Apparel_ApiStockStatusSummary_Result> GetStockordersummary(ApiStockFilter filter);
        IQueryable<Proc_Apparel_ApiStockStatusTrackdetail_Result> GetStockTracking(ApiStockFilter filter);
        IQueryable<Proc_Apparel_ApiGetItemStockCategory_Result> GetItemStockCategory(string otype);
        IQueryable<Proc_Apparel_ApiGetStockinTransaction_Result> GetItemStocktransactiondetails(string itemtype);
        IQueryable<Proc_Apparel_ApiGetStoreWiseStockdetails_Result> GetStockinItemwise(string itemtype, string transtype);


    }
}
