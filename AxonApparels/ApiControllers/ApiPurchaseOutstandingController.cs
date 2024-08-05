using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{

    public class ApiPurchaseOutstandingController : ApiController
    {
        IApiPurchaseoutstandingBusiness IApipur = new ApiPurchaseoutstandingBusiness();
        // GET api/apipurchaseoutstanding
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        // GET api/apipurchaseoutstanding/5
        public List<string> Get(int id)
        {
            return IApipur.GetPurchaseoutstandingbasedupllier(id);
        }

        [HttpGet]
        public List<string> Get(int supplierid, string orderno, int styleid, string fromdate, string todate)
        {
            return IApipur.GetPurchaseoutstangindetails(supplierid,orderno,styleid,fromdate,todate);
        }

        // POST api/apipurchaseoutstanding
        public void Post([FromBody]string value)
        {

        }

        // PUT api/apipurchaseoutstanding/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apipurchaseoutstanding/5
        public void Delete(int id)
        {
        }
    }
}
