using AxonApparel.Contract.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation.Api
{
    public class ApiOrderStatusRepository : IApiOrderStatusRepository
    {
        OrderEntities entities = new OrderEntities();
        public IQueryable<Proc_Apparel_ApiGetFilterations_Result> GetFiltrationdetials(string category)
        {           
                var query = (from data in entities.Proc_Apparel_ApiGetFilterations(category)
                             select new Proc_Apparel_ApiGetFilterations_Result
                             {
                                 id = data.id,
                                 value = data.value
                             }).AsQueryable();
                return query;    
        }

        public IQueryable<Proc_Apparel_ApiGetOrderStatusDetails_Result> GetOrderstatusdetails(ApiOrderDilters filters)
        {
            var query = (from data in entities.Proc_Apparel_ApiGetOrderStatusDetails(filters.Buyerid,filters.Employeeid,filters.Styleid,filters.Ref_no,filters.Order_no,filters.Fromdate,filters.Todate)
                         select new Proc_Apparel_ApiGetOrderStatusDetails_Result
                         {
                             order_no = data.order_no,
                             ref_no = data.ref_no,
                             style = data.style,
                             Description =data.Description,
                             guom = data.guom,
                             imagepath = data.imagepath,
                             quantity = data.quantity,
                             livestage = data.livestage                            
                         }).AsQueryable();
            return query;
        }
    }
}
