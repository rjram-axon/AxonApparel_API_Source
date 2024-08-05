using AxonApparel.Business.Interface.Api;
using AxonApparel.Contract.Api;
using AxonApparel.Repository.Implementation.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiConsCostBusiness : IApiConsCostBusiness
    {
        IApiConsCostRepository ApiCost = new ApiConsCostRepository();
        public List<string> GetFiltrationdetails()
        {
            List<string> data = new List<string>();
            var query = ApiCost.GetFiltrationdetails("COMPANY").ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            query = ApiCost.GetFiltrationdetails("ORDER").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            query = ApiCost.GetFiltrationdetails("REFNO").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            query = ApiCost.GetFiltrationdetails("STYLE").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
          
            return data;
        }
        public List<string> GetCostdetails(ApiConsDataFilter filter)
        {
            List<string> data = new List<string>();
            var query = ApiCost.GetConsolidatedCostingDetails(filter).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            return data;
        }
    }
}
