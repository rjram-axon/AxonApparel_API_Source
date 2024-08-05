using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockAuditDet
    {
        public int Audit_Detid { get; set; }
        public string DEntry_no { get; set; }
        public int AuditMasid { get; set; }
        public int Stockid { get; set; }
        public decimal Shortage_Qty { get; set; }
        public decimal Excess_Qty { get; set; }
        public decimal StockQty { get; set; }
        public int Excess_Stockid { get; set; }
        public int DItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int uomid { get; set; }
        public string DItem { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string PUnit { get; set; }
        public string LotNo { get; set; }
        public int DSupplierId { get; set; }
        public string DSupplier { get; set; }
        public string Type { get; set; }
        public decimal ActQty { get; set; }
        public decimal Alloted { get; set; }
    }
       

}
