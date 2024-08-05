using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiConsDataFilter
    {
        public int Companyid { get; set; }
        public string Order_no { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public int Styleid { get; set; }
    }
    public class ApiConsCostFiler
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
}
