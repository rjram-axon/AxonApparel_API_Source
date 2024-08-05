using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiStockStatusBusiness
    {
        List<string> GetFilterdetails();
        List<string> GetStockDetails(ApiStockFilter filter);
        List<string> GetStockorderdetails(ApiStockFilter filter);
        List<string> GetStockTrackingdetails(ApiStockFilter filter);
        List<string> GetStockcategory(string otype);
        List<string> Getstocktransaction(string itemtype);
        List<string> Getstockitemwise(string itemtype, string trannstype);
        List<string> Getstockdetails(int id,string itemtype,string transtype);
        
    }
}
