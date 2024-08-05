using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiOrderStatusRepository
    {
        IQueryable<Proc_Apparel_ApiGetFilterations_Result> GetFiltrationdetials(string category);
        IQueryable<Proc_Apparel_ApiGetOrderStatusDetails_Result> GetOrderstatusdetails(ApiOrderDilters filters) ;

    }
}
