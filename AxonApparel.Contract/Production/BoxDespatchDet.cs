using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BoxDespatchDet :BoxDespatchStock
    {
        public int DespatchDetid { get; set; }
        public int DespatchId { get; set; }
        public string EntryNo { get; set; }
        public string SKUstkno { get; set; }
        public int StockReqDetID { get; set; }
        public decimal IssuQuantity { get; set; }
    }
}
