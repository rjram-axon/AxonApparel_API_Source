using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class EnquiryItem
    {
        public int MarkEnqItemId { get; set; }
        public int EnquiryId { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public int UomId { get; set; }
        public string Uom { get; set; }
        public int DespatchQty { get; set; }

    }
}
