using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BoxConversionStock
    {
        public int BoxConMasId { get; set; }
        public int BoxConDetId { get; set; }
        public int BoxConStockId { get; set; }
        public int ItemStockId { get; set; }
        public decimal StockQty { get; set; }
        public decimal AllotedQty { get; set; }
        public decimal PcsQty { get; set; }
        public decimal OldPcsQty { get; set; }
        public decimal BoxQty { get; set; }
        public decimal Rate { get; set; }
        public string TransNo { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int BMasId { get; set; }
        public int SknMasId { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }

    }
}
