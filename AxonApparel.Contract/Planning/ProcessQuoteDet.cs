using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessQuoteDet
    {
        public int Process_Quote_detid { get; set; }
        public int Process_Quoteid { get; set; }
        public int Process_QuoteProid { get; set; }
        public int Itemid { get; set; }
        public string Item { get; set; }
        public int Colorid { get; set; }
        public string Color { get; set; }
        public int Sizeid { get; set; }
        public string Size { get; set; }
        public int Uomid { get; set; }
        public string Uom { get; set; }
        public int rate { get; set; }
        public int MinQty { get; set; }
        public int AppRate { get; set; }
        public int PsNo { get; set; }
        public string Supplier { get; set; }
        public string QuoteNo { get; set; }
        public int Disable { get; set; }
        public int DelChk { get; set; }
    }
}
