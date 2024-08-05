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
    public class ApiOrderStatusController : ApiController
    {
        IApiOrderStatusBussiness ApiStatus = new ApiOrderStatusBusiness();
        // GET api/apiorderstatus
        [HttpGet]
        public List<string> Get()
        {
            return ApiStatus.GetFiltrations();
        }

        // GET api/apiorderstatus/5
        [HttpGet]
        public string Get(string id)
        {
            return "";
        }


        // POST api/apiorderstatus
        public List<string> Post([FromBody] ApiOrderDilters filter)
        {
            return ApiStatus.Getorderstatusdetails(filter);
        }

        // PUT api/apiorderstatus/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE api/apiorderstatus/5
        public void Delete(int id)
        {
        }
    }
}
