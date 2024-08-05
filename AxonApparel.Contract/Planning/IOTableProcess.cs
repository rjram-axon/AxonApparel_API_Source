using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class IOTableProcess
    {
        public int PSId { get; set; }
        public string Type { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string uom { get; set; }
        public string Required { get; set; }
        public decimal Quantity { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int UomId { get; set; }
        public int ItemGroupId { get; set; }
        public long Sno { get; set; }

        public int Prodprgid { get; set; }
        public int Prodprgdetid { get; set; }
        public string prodno { get; set; }
        public decimal ActualPlan_Qty { get; set; }
        public string InorOut { get; set; }
        public decimal Prog_Op_Qty { get; set; }
        public decimal order_qty { get; set; }
        public decimal Issue_qty { get; set; }
        public decimal Receipt_Qty { get; set; }
        public string CatType { get; set; }
        public decimal SecQty { get; set; }
        public string required { get; set; }
        public Nullable<System.DateTime> prodpgmdate { get; set; }
        public string Reason { get; set; }
        public string Remarks { get; set; }

        public string Despatch_Closed { get; set; }

    }
}
