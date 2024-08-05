using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CourierItem
    {     
        public int Courier_DetId { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int UomId { get; set; }
        public string Uom { get; set; }
        public int Quantity { get; set; }
    }
}
