using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiOrderStatus
    {
        public int id { get; set; }
        public string value { get; set; }
    }
   
    public class ApiOrderStatusdetails
    { 
        public string name { get; set; }
        public List<ApiOrderStatus> datalist { get; set; }
    }

    public class ApiOrderfilter
    { 
        public string id { get; set; }
        public string value { get; set; }
    }

}
