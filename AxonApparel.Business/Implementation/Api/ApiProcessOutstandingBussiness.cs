using AxonApparel.Business.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using AxonApparel.Repository.Interface.Api;
using AxonApparel.Repository.Implementation.Api;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiProcessOutstandingBussiness : IApiProcessOutstandingBussiness
    {
        IApiProcessOutstandingRepository Apipout = new ApiProcessOutstandingRepository();
        List<string> data = new List<string>();       

        public List<string> GetProcessoutstandingdetails()
        {
            data.Clear();
            data.Add(JsonConvert.SerializeObject(Apipout.GetProcessOutstandingdetails().ToList()));
            return data;
        }
        public List<string> Getoutstandingprocesswise(int supplierid)
        {
            data.Clear();
            data.Add(JsonConvert.SerializeObject(Apipout.GetSupplierprocesswise(supplierid).ToList()));
            return data;
        }

        public List<string> Getoutstandingprocesswisedetail(int supplierid, int processid)
        {
            data.Clear();
            data.Add(JsonConvert.SerializeObject(Apipout.GetProcesswisedetail(supplierid,processid).ToList()));
            return data;
        }
    }
}
