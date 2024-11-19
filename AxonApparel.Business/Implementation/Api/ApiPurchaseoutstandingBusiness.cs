
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Business.Interface.Api;
using AxonApparel.Repository.Implementation.Api;
using AxonApparel.Repository.Interface.Api;
using Newtonsoft.Json;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiPurchaseoutstandingBusiness : IApiPurchaseoutstandingBusiness
    {
        IApiPurchaseoutstandingRepository IApipur = new ApiPurchaseoutstandingRepository();
        List<string> data = new List<string>();
       
        public List<string> GetPurchaseoutstangindetails()
        {
            data.Clear();
            data.Add(JsonConvert.SerializeObject(IApipur.GetPurchaseoutstanding()));
            return data;
        }

        public List<string> GetPurchaseoutstandingbasedupllier(int supplierid)
        {
            data.Clear();
            data.Add(JsonConvert.SerializeObject(IApipur.GetPurchasesupplierdetails(supplierid).ToList()));
            return data;
        }

    }
}
