using AxonApparel.Business.Interface.Api;
using AxonApparel.Contract.Api;
using AxonApparel.Repository.Implementation.Api;
using AxonApparel.Repository.Interface.Api;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiOrderStatusBusiness : IApiOrderStatusBussiness
    {
        IApiOrderStatusRepository ApiOrder = new ApiOrderStatusRepository();
        public List<string> GetFiltrations()
        {
         
            //ApiOrderStatusdetails datalist = new ApiOrderStatusdetails();
            List<String> data = new List<String>();
             var query = ApiOrder.GetFiltrationdetials("COMPANY").ToList();
             var result = JsonConvert.SerializeObject(query.ToList());
                data.Add(result);
             query = ApiOrder.GetFiltrationdetials("BUYER").ToList();            
             result = JsonConvert.SerializeObject(query.ToList());
                data.Add(result);
             query = ApiOrder.GetFiltrationdetials("EMPLOYEE").ToList();
             result = JsonConvert.SerializeObject(query.ToList());
                data.Add(result);
             query = ApiOrder.GetFiltrationdetials("ORDER").ToList();
             result = JsonConvert.SerializeObject(query.ToList());
                data.Add(result);
             query = ApiOrder.GetFiltrationdetials("STYLE").ToList();
             result = JsonConvert.SerializeObject(query.ToList());
                data.Add(result);           
            return data;
        }

        public List<string> Getorderstatusdetails(ApiOrderDilters filters)
        {
            List<String> data = new List<String>();          
            var result  = JsonConvert.SerializeObject(ApiOrder.GetOrderstatusdetails(filters).ToList());
            data.Add(result);
            return data;
        }
    }
}
