using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DespatchDet
    {
        public int Sno { get; set; }
        public int DespatchId { get; set; }
        public int DespatchDetId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public decimal Quantity { get; set; }
        public decimal BalQty { get; set; }
        public decimal DespatchQty { get; set; }
        public decimal Productionqty { get; set; }
        public decimal Rate { get; set; }
    }
}
