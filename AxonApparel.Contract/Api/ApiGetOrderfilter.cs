using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiGetOrderfilter
    {
        public string Buy_ord_masid { get; set; }
        public int Styleid { get; set; }
        public string Refno { get; set; }
        public string Fromdate { get; set;}
        public string Todate { get; set; }  
    }    

}
