using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class MarkQuoteCommercial
    {
        public int MarkquoteCommercialId { get; set; }
        public int QuoteId { get; set; }
        public long SNo { get; set; }
        public int ParticularID { get; set; }
        public string particular { get; set; }
        public decimal Cost { get; set; }
        public string Remarks { get; set; }
    }
}
