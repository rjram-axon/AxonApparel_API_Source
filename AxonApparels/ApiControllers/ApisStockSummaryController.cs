using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AxonApparel.Business.Implementation.Api;
using AxonApparel.Business.Interface.Api;

namespace AxonApparels.ApiControllers
{
    public class ApisStockSummaryController : ApiController
    {
        IApiStockStatusBusiness ApiStock = new ApiStockStatusBusines();

        // GET api/apisstocksummary
       
        [HttpGet]
        public List<string> Get(int id,string itemtype,string transtype)
        {
            return ApiStock.Getstockdetails(id,itemtype,transtype);
        }
        [HttpGet]
        public List<string> Get(string otype) {
            return ApiStock.GetStockcategory(otype);
        }

        // POST api/apisstocksummary
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/apisstocksummary/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE api/apisstocksummary/5
        [HttpDelete]
        public void Delete(int id)
        {
        }
    }
}
