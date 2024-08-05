using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class VendorEntry
    {
        public int QuoteDetid { get; set; }
        public int Quoteid { get; set; }
        public int Itemid { get; set; }
        public string Item { get; set; }
        public int Colorid { get; set; }
        public string Color { get; set; }
        public int Sizeid { get; set; }
        public string Size { get; set; }
        public int Uomid { get; set; }
        public string Uom { get; set; }
        public int Quantity { get; set; }
        public int Rate { get; set; }
        public int MinQty { get; set; }
        public int Apprate { get; set; }
        public DateTime AppDate { get; set; }
        public string Buy_ord_no { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public int ApprovedBy { get; set; }
        public int MaxQty { get; set; }
        public int StyleId { get; set; }

        public string EntryNo { get; set; }
        public string Supplier { get; set; }
    }
}
