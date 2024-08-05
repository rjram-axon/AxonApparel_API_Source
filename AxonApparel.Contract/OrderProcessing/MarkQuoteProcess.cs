using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class MarkQuoteProcess
    {
        public int QuoteID { get; set; }
        public long SNo { get; set; }   
        public int ProcessId { get; set; }
        public string process { get; set; }
        public int Fabricid { get; set; }
        public string fabric { get; set; }
        public decimal Cost { get; set; }
        public int Detid { get; set; }
        public int ComponentId { get; set; }
    }
}
