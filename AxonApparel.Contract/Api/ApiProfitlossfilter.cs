using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
 
    public class ApiProfitlossdatafilter
    {
        public int Companyid { get; set; }
        public string Order_no { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public int Styleid { get; set; }
    }
    public class ApiProfitLossFilter
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
}
