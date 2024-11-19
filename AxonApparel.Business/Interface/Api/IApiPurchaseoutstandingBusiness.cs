using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiPurchaseoutstandingBusiness
    {
        List<string> GetPurchaseoutstangindetails();
        List<string> GetPurchaseoutstandingbasedupllier(int supplierid);

    }
}
