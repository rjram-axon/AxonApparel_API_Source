using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class MarkQuoteAcc
    {
        public int MarkquoteaccId { get; set; }
        public long SNo { get; set; }
        public int QuoteId { get; set; }
        public int ItemID { get; set; }
        public string item { get; set; }
        public int Uomid { get; set; }
        public string uom { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitCost { get; set; }
        public string Remarks { get; set; }
        public decimal value { get; set; }
        public string ItemType { get; set; }
    
    }
}
