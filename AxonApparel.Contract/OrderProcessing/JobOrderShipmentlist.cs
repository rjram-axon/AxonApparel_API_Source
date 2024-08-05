using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobOrderShipmentlist
    {
        public int shiprowid { get; set; }
        public int stylerowid { get; set; }
        public string buyordship { get; set; }
        public DateTime shipdate { get; set; }
        public string Country { get; set; }
        public decimal Ordqty { get; set; }
        public decimal Balance { get; set; }
        public decimal jobqty { get; set; }
        public decimal jobOrdqty { get; set; }
        public decimal Oldjobqty { get; set; }
        public DateTime deliverydate { get; set; }
        public DateTime olddeliverydate { get; set; }
        public decimal ExPer { get; set; }
    }
}
