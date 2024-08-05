using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsSizeDetails
    {
        public int Sno { get; set; }
        public string OrderNo { get; set; }
        public int ShipRowId { get; set; }
        public int AccReqDetId { get; set; }
        public int AccColorId { get; set; }
        public int AccSizeId { get; set; }
        public string AccSize { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int SizeRow { get; set; }
        public int UomId { get; set; }
        public string UOM { get; set; }
        public int ReqQty { get; set; }
        public int Qty { get; set; }
        public decimal ProdQty { get; set; }
        public decimal QUnit { get; set; }
        public int Allow { get; set; }
        public string DivOrMul { get; set; }
        public int OAccSizeId { get; set; }
        public int CheckPoMade { get; set; }

        public decimal OrdQty { get; set; }
    }
}
