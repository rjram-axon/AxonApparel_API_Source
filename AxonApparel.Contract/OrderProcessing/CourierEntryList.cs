using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CourierEntryList
    {
        public int Courier_MasId { get; set; }
        public string EntryNo { get; set; }
        public DateTime EntryDate { get; set; }
        public string Courier { get; set; }
        public string DespLocation { get; set; }
        public int Courier_DetId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int UomId { get; set; }
        public int Quantity { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Uom { get; set; }
    }
}
