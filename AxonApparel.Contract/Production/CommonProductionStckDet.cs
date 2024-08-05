using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommonProductionStckDet
    {
        public int StockId { get; set; }
        public string DocumentNo { get; set; }
        public string JobOrdNo { get; set; }
        public string LotNo { get; set; }
        public decimal Stock { get; set; }
        public decimal Issues { get; set; }
        public string Process { get; set; }
        public string Manufacturer { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int ProdJobDetId { get; set; }
        public int ProdStockDetId { get; set; }
        public string ProdPrgNo { get; set; }
        public decimal MarkupRate { get; set; }
    }
}
