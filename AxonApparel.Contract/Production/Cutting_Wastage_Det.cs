using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Cutting_Wastage_Det
    {
        public int WastageDetId { get; set; }
        public int CuttingIsuuedetId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int UOMId { get; set; }
        public int SizeId { get; set; }
        public decimal Quantity { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<int> CuttingReturnid { get; set; }
        public Nullable<int> NewStockId { get; set; }

        public string Item { get; set; }
        public string Color { get; set; }
        public string UOM { get; set; }
        public string Size { get; set; }
    
    }
}
