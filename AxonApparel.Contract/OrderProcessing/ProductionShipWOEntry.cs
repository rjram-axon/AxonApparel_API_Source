using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionShipWOEntry
    {
        public string JobOrderNo { get; set; }
        public int ShiprowID { get; set; }
        public String Buy_Ord_Ship { get; set; }
        public String ItemMode { get; set; }
        public int JobQty { get; set; }
        public string Lotno { get; set; }
        public string fguom { get; set; }
        public string sguom { get; set; }
        public DateTime ShipDate { get; set; }
        public string Destination { get; set; }
        public int DestinationId { get; set; }
        public string PortofLoading { get; set; }
        public int PortofLoadingId { get; set; }
        public int Qty { get; set; }
        public int Quantity { get; set; }
        public int OQty { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal AllowancePer { get; set; }
    }
}
