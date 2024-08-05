using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiStockFilter
    {
        public int companyid { get; set; }
        public string Order_no { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public int Styleid { get; set; }
        public string Item { get; set; }
        public int Itemid { get; set; }
        public string Color { get; set; }
        public int Colorid { get; set; }
        public string Size { get; set; }
        public int Sizeid { get; set; }
        public string Storename { get; set; }
        public int Storeid { get; set; }        
        public DateTime? Fromdate { get; set; }
        public DateTime? Todate { get; set; }
       

    }
    public class ApiStockListfilter
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }
}
