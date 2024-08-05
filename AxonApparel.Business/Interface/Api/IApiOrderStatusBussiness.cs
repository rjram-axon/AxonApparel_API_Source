using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiOrderStatusBussiness
    {
        List<string> GetFiltrations();
        List<string> Getorderstatusdetails(ApiOrderDilters filters);

    }
}
