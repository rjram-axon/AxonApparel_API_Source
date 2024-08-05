using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class MarkQuoteCMT
    {
        public int MarkquoteCmtId { get; set; }
        public long SNo { get; set; }
        public int QuoteId { get; set; }
        public int ProcessID { get; set; }
        public string process { get; set; }
        public decimal Cost { get; set; }
        public string Remarks { get; set; }
    }
}
