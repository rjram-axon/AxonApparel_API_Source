using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdReceiptDet
    {
        public int ProdPrgDetid { get; set; }
        public int Receiptid { get; set; }
        public int RecptDetID { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int Uomid { get; set; }
        public int Issueid { get; set; }
        public decimal Rate { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal RejectionQty { get; set; }
        public decimal InputRate { get; set; }
        public decimal OutputRate { get; set; }
        public string ProdPrgNo { get; set; }
        public string JobNo { get; set; }
        public string JobOrdNo { get; set; }
        public string Bundled { get; set; }
        public Nullable<decimal> AcceptQty { get; set; }
        public Nullable<decimal> ReworkQty { get; set; }

    }
}
