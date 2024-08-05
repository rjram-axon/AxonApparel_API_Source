using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiPurchaseoutstandingBusiness
    {
        List<string> GetPurchaseoutstangindetails(int supplierid,string orderno,int styleid,string fromdate,string todate);
        List<string> GetPurchaseoutstandingbasedupllier(int supplierid);

    }
}
