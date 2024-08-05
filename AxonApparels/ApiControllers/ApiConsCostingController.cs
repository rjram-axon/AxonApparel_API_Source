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
    public class ApiConsCostingController : ApiController
    {
        IApiConsCostBusiness ApiCost = new ApiConsCostBusiness();
             [HttpGet]
        // GET api/apiconscosting
        public List<string> Get()
        {
            return ApiCost.GetFiltrationdetails();
        }

        [HttpGet]
        // GET api/apiconscosting/5
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        // POST api/apiconscosting
        public List<string> Post([FromBody]ApiConsDataFilter filter)
        {
            return ApiCost.GetCostdetails(filter);
        }

        // PUT api/apiconscosting/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apiconscosting/5
        public void Delete(int id)
        {
        }
    }
}
