using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProProcessQuote
    {
        public int Process_QuoteProid { get; set; }
        public int Process_Quoteid { get; set; }
        public int Processid { get; set; }
        public string Process { get; set; }
        public string Job_ord_no { get; set; }
        public int JobMasId { get; set; }
        public int PsNo { get; set; }
        public int ListChk { get; set; }
        public int DelChk { get; set; }
    }
}
