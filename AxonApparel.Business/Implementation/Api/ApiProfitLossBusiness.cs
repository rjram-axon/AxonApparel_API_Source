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

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiProfitLossBusiness : IApiProfiLossBusiness
    {
        IApiProfitLossRepository IApiprofit = new ApiProfitLossRepository();
        IApiConsCostRepository IApiCons = new ApiConsCostRepository();
        public List<string> GetFiltrationdetails()
        {
            List<String> data = new List<String>();
            var query = IApiprofit.GetFilterdetails("COMPANY").ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = IApiprofit.GetFilterdetails("ORDER").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = IApiprofit.GetFilterdetails("STYLE").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = IApiprofit.GetFilterdetails("REFNO").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            return data;
        }
        public List<string> GetDetailCosting(ApiGetOrderfilter filter)       
        {
            List<String> data = new List<String>();
            var query = IApiprofit.Getorderdetails(filter).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            var query1 = IApiprofit.GetDetailcosting(filter).ToList();
            var result1 = JsonConvert.SerializeObject(query1.ToList());
            data.Add(result1);
            return data;            
        }

        
    }
}
