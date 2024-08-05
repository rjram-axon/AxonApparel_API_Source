using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{
    public class ApiCompanyController : ApiController
    {
        // GET api/apicompany
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/apicompany/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/apicompany
        public void Post([FromBody]string value)
        {
        }

        // PUT api/apicompany/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apicompany/5
        public void Delete(int id)
        {
        }
    }
}
