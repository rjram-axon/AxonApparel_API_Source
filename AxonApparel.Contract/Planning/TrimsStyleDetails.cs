using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsStyleDetails
    {
        public int Sno { get; set; }
        public string OrderNo { get; set; }
        public int ItemId { get; set; }
        public int AccColorId { get; set; }
        public int AccReqDetId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int UomId { get; set; }
        public string UOM { get; set; }
        public int SizeId { get; set; }
        public int ShipRowId { get; set; }
        public int Qty { get; set; }
        public string Size { get; set; }
        public decimal OrdQty { get; set; }
        public decimal ProdQty { get; set; }
        public int ReqQty { get; set; }
        public decimal ProcessQty { get; set; }
        public decimal QUnit { get; set; }
        public int PColorid { get; set; }
        public string PColor { get; set; }
        public int AccSizeId { get; set; }
        public string AccSize { get; set; }
        public int AccItemId { get; set; }
        public int OAccColorId { get; set; }
        public int OAccSizeId { get; set; }
        public int CheckPoMade { get; set; }
        public decimal OrderQty { get; set; }
    }
}
