using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdReceiptReason
    {
        public int RecptReasonId { get; set; }
        public int ReasonId { get; set; }
        public int RecptId { get; set; }
        public int RecptDetId { get; set; }
        public string Reason { get; set; }
        public decimal Qty { get; set; }
        public string RType { get; set; }
        public Nullable<int> ReworkProcessid { get; set; }
        public Nullable<decimal> ReworkQty { get; set; }
        public string Process { get; set; }

    }
}
