using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiOrderStatusDetails
    {
        public string order_no { get; set; }
        public string ref_no { get; set; }
        public string style { get; set; }
        public string quantity { get; set; }
        public string guom { get; set; }
        public string Description { get; set; }
        public string livestage { get; set; }
        public string imagepath { get; set; }
    }

    public class ApiOrderDilters
    {
        public int Buyerid { get; set; }
        public int Buyer { get; set; }
        public string Order_no { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public int Styleid { get; set; }
        public string Employee { get; set; }
        public int Employeeid { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime Todate { get; set; }
    }

}
