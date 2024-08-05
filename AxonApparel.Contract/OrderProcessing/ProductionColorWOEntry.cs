using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionColorWOEntry
    {
        public int Job_Ord_ColorId { get; set; }
        public string JobOrderNo { get; set; }
        public string Buy_Ord_Ship { get; set; }
        public int ItemId { get; set; }
        public int Colorid { get; set; }
        public int SizeId { get; set; }
        public decimal OrderQty { get; set; }
        public decimal FinishQty { get; set; }
        public decimal DespatchQty { get; set; }
        public int SizerowId { get; set; }
        public int ColorrowId { get; set; }
        public decimal WorkOrderQty { get; set; }
        public decimal Rate { get; set; }
        public int ItemrowId { get; set; } 
    }
}
