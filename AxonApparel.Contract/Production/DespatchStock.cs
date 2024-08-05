using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DespatchStock
    {
        public int DespatchStockId{get;set;}
        public int DespatchId { get; set; }
        public int DespatchDetId { get; set; }
        public int StockId { get; set; }        
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int ProcessId { get; set; }
        public int SupplierId { get; set; }
        public string TransNo { get; set; }
        public string Process { get; set; }
        public string LotNo { get; set; }
        public string BundleNo { get; set; }
        public string Supplier { get; set; }
        public decimal BalQty { get; set; }
        public decimal DespatchQty { get; set; }
        public DateTime TransDate { get; set; }
    }
}
