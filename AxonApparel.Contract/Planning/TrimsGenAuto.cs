using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsGenAuto
    {
        public int Sno { get; set; }
        public int Allow { get; set; }
        public string DivOrMul { get; set; }
        public int AccReqDetId { get; set; }
        public int AccReqID { get; set; }
        public int AccReqMasID { get; set; }
        public int ColorId { get; set; }
        public int ReqColorId { get; set; }
        public string ColorName { get; set; }
        public int ShipRowId { get; set; }
        public int SizeId { get; set; }
        public int ReqSizeId { get; set; }
        public string SizeName { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public decimal QtyPerPiece { get; set; }
        public decimal GarQty { get; set; }
        public decimal TotQty { get; set; }
        public decimal OrdQty { get; set; }
        public int UomId { get; set; }
        public int CheckPoMade { get; set; }
        public string UomName { get; set; }
    }
}
