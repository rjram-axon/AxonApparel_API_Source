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
    public class ApiStockStatusController : ApiController
    {
        IApiStockStatusBusiness ApiStock = new ApiStockStatusBusines();
        // GET api/apistockstatus
        [HttpGet]
        public List<string> Get()
        {
            return ApiStock.GetFilterdetails();
        }

        [HttpGet]
        // GET api/apistockstatus/5
        public List<string> Get(string token,[FromBody] ApiStockFilter Filters)
        {
            return ApiStock.GetStockDetails(Filters);
        }
        [HttpPost]
        public List<string> Post(string token, [FromBody] ApiStockFilter Filters)
        {
            return ApiStock.GetStockDetails(Filters);
        }
        [HttpPost]
        // POST api/apistockstatus
        public List<string> Post([FromBody] ApiStockFilter Filters)
        {
            return ApiStock.GetStockorderdetails(Filters);
        }
        [HttpPut]
        // PUT api/apistockstatus/5
        public List<string> Put(int id, [FromBody] ApiStockFilter Filters)
        {
            return ApiStock.GetStockTrackingdetails(Filters);
        }

        // DELETE api/apistockstatus/5
        public void Delete(int id)
        {
        }
    }
}
