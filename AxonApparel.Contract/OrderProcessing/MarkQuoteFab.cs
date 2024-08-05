using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  public  class MarkQuoteFab
    {
        public int QuoteId { get; set; }
        public int DetId { get; set; }
        public long SNo { get; set; }
        public int CompID { get; set; }
        public string Comp { get; set; }
        public int FabID { get; set; }
        public string Fab { get; set; }
        public decimal Weight { get; set; }
        public string Remarks { get; set; }
        public string Fab_purchase { get; set; }
        public decimal BaseQty { get; set; }
        public int Uomid { get; set; }
        public int GSM { get; set; }
    }
}
