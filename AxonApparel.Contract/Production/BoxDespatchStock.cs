using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BoxDespatchStock 
    {
        public int DespatchStockid { get; set; }
        public int StockReqDetID { get; set; }
        public int DespatchId { get; set; }
        public int StockId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal OldQty { get; set; }
    }
}
