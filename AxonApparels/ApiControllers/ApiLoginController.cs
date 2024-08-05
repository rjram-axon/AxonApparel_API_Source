using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Web.Http.Cors;

namespace AxonApparels.ApiControllers
{
    public class ApiLoginController : ApiController
    {
        IApiLoginBusiness Idata = new ApiLoginBusiness();
        // GET api/apilogin
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}
        //// GET api/apilogin/       

        //public string  Get(int id)
        //{
        //    return "";
        //}


        // POST api/apilogin
        //[HttpPost]
        //[EnableCors(origins: "*", headers: "*", methods: "*")] // Apply CORS to the action
        //public UserName Post([FromBody]UserName user)
        //{
        //    var result = Idata.GetUserdetails(user);
        //    return result;

        //}

        // GET api/apilogin?username=xxx&password=xxx
        [HttpGet]
        [Route("api/apilogin")]
        [EnableCors(origins: "*", headers: "*", methods: "*")] // Apply CORS to the action
        public UserName Get(string username, string password)
        {
            // Assuming GetUserdetails returns a UserName object based on username and password
            var user = new UserName { Username = username, Password = password };
            var result = Idata.GetUserdetails(user);
            return result;
        }

        // PUT api/apilogin/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apilogin/5
        public void Delete(int id)
        {
        }
    }
}
