using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessQuote
    {
        public int Process_Quoteid { get; set; }
        public string Process_QuoteNo { get; set; }
        public DateTime Process_QuoteDate { get; set; }
        public string RefNo { get; set; }
        public DateTime RefDate { get; set; }
        public int Processorid { get; set; }
        public string Supplier { get; set; }
        public string BuyOrdGeneral { get; set; }
        public string Buy_ord_no { get; set; }
        public string BRefNo { get; set; }
        public string Remarks { get; set; }
        public string Commit_Cancel { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public int JobId { get; set; }
        public string JobNo { get; set; }
        public int Buy_ord_masId { get; set; }
        public int StyleId { get; set; }
        public string Style { get; set; }    
        public string Add1 { get; set; }
        public string Add2 { get; set; }
        public string Add3 { get; set; }
        public int Rate { get; set; }
        public int MinQty { get; set; }
        public List<ProcessQuoteDet> ProQuoteDet { get; set; }
        public List<ProProcessQuote> ProQuoteProcess { get; set; }
    }
}
