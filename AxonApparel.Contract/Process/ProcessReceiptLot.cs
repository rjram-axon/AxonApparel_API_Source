using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessReceiptLot
    {
        public int prod_recpt_lotid { get; set; }
        public int prod_recpt_detid { get; set; }
        public int prod_recpt_Jobdetid { get; set; }
        public decimal LotQty { get; set; }
        public decimal LotSecQty { get; set; }
        public int ProcessOrdId { get; set; }
        public int ProcessJobOrdId { get; set; }
        public string LotNo { get; set; }
      
    }
}
