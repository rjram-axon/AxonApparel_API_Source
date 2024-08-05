using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiConsCostBusiness
    {
        List<string> GetFiltrationdetails();
        List<string> GetCostdetails(ApiConsDataFilter filter);
    }
}
