using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;
using AxonApparel.Contract.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{
    public class ApiProfitLossController : ApiController
    {
        IApiProfiLossBusiness ApiProfit = new ApiProfitLossBusiness();
        [HttpGet]
        // GET api/apiprofitloss
        public List<string> Get()
        {
            return ApiProfit.GetFiltrationdetails();
        }

        [HttpGet]
        // GET api/apiprofitloss/5
        public void Get(string id)
        {
           
        }

        // POST api/apiprofitloss
        [HttpPost]
        public List<string> Post([FromBody] ApiGetOrderfilter filter)
        {
            return ApiProfit.GetDetailCosting(filter);
        }

        // PUT api/apiprofitloss/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apiprofitloss/5
        public void Delete(int id)
        {
        }
    }
}
