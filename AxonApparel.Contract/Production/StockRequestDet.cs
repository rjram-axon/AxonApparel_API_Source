using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockRequestDet : StockRequestMas
    {
        public int StockReqDetID { get; set; }
        public int ColorID { get; set; }
        public int SizeID { get; set; }
        public int UOMID { get; set; }
        public decimal Quantity { get; set; }
        public int StyleID { get; set; }
        public int PackUOMID { get; set; }
        public int SKUID { get; set; }
        public string SKUdisplayno { get; set; }
        public string SKUstkno { get; set; }
        public decimal BalQuantity { get; set; }
        public decimal IssuQuantity { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string uom { get; set; }
    }
}
