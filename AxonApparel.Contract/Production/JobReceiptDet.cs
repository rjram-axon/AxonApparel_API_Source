using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobReceiptDet
    {
        public int JobRecptDetId { get; set; }
        public int JobRecptId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public string LotNo { get; set; }
        public decimal RecptQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal InvoiceQty { get; set; }
        public decimal Rate { get; set; }
        public decimal AcceptedQty { get; set; }
        public decimal DespatchQty { get; set; }
        public decimal RejQty { get; set; }

    }
}
