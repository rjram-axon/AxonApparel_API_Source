using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AxonApparel.Business.Interface;
using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;

namespace AxonApparels.ApiControllers
{
    public class ApiProcessoutstandingController : ApiController
    {
        IApiProcessOutstandingBussiness ApiProcess =new ApiProcessOutstandingBussiness();
        // GET api/apiprocessoutstanding
        [HttpGet]  
        public List<string> Get()
        {
            return ApiProcess.GetProcessoutstandingdetails();
        }

        [HttpGet]
        // GET api/apiprocessoutstanding/5
        public List<string> Get(int id)
        {
            return ApiProcess.Getoutstandingprocesswise(id);
        }

        [HttpGet]
        public List<string> Get(int supplierid, int processid)
        {
            return ApiProcess.Getoutstandingprocesswisedetail(supplierid,processid);
        }

        // POST api/apiprocessoutstanding
        public void Post([FromBody]string value)
        {
        }

        // PUT api/apiprocessoutstanding/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apiprocessoutstanding/5
        public void Delete(int id)
        {
        }
    }
}
