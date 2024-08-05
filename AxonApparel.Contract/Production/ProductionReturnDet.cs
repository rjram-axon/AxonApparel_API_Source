using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionReturnDet
    {
        public int ReturnId { get; set; }
        public int Prodprgdetid { get; set; }
        public int Prodissdetid { get; set; }
        public int ProdPrgId { get; set; }
        public int ReturnDetId { get; set; }
        public int ItemId { get; set; }
        public int colorId { get; set; }
        public int SizeId { get; set; }
        public int unitId { get; set; }
        public int UomId { get; set; }
        public int SupplierId { get; set; }
        public int ProcessId { get; set; }
        public string JobNo { get; set; }
        public int StyleId { get; set; }
        public int IssStockId { get; set; }
        public int ItemStockid { get; set; }
        public decimal ReturnQty { get; set; }
        public int NewStockId { get; set; }
        public string Bundled { get; set; }
        public string ProdPrgNo { get; set; }
        public int IssueDetId { get; set; }
        public Nullable<decimal> RejectQty { get; set; }
        public Nullable<decimal> ReworkQty { get; set; }
    }
}
