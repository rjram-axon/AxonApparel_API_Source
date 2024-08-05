using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class MarkQuoteYarn
    {
        public int Markquoteyarnid { get; set; }
        public long SNo { get; set; }
        public int QuoteId { get; set; }
        public int FabID { get; set; }
        public string Fab { get; set; }
        public int CompoId { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public decimal Percentage { get; set; }
        public decimal Weight { get; set; }
        public decimal CostPerKG { get; set; }
        public int ComponentId { get; set; }
    }
}
