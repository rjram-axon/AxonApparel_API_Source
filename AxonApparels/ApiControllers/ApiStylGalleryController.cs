using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{
    public class ApiStylGalleryController : ApiController
    {
        IApiStyleGalleryBusiness ApiStyle = new ApiStyleGalleryBusiness();
        // GET api/apistylgallery
        [HttpGet]
        public IQueryable<BuyOrdImg> Get()
        {
            return ApiStyle.GetStyleimagelist();
        }

        // GET api/apistylgallery/5
        [HttpGet]
        public string Get(int id)
        {
            return ApiStyle.GetStyledetails(id);
        }

        // POST api/apistylgallery
        public void Post([FromBody]string value)
        {
        }

        // PUT api/apistylgallery/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/apistylgallery/5
        public void Delete(int id)
        {
        }
    }
}
