using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsAccessory
    {
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public int BuyerId { get; set; }        
        public string Buyer { get; set; }        
        public string Style { get; set; }
        public int StyleId { get; set; }
        public string RefNo { get; set; }
        public string OrderNo { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }        
    }
}
