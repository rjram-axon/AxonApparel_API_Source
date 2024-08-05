using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class AccessoryReqDet
    {
        public int AccReqMasID { get; set; }
        public int AccReqDetID { get; set; }
        public int GarColorID { get; set; }
        public int GarSizeID { get; set; }
        public int GarQty { get; set; }
        public int AccColorID { get; set; }
        public int AccSizeID { get; set; }
        public decimal QtyPerPiece { get; set; }
        public decimal TotalQty { get; set; }
        public decimal BOMQty { get; set; }
        public string LockRow { get; set; }
        public string ItemRem { get; set; }
        public int PColorId { get; set; }
        public string ProcessColor { get; set; }
        public decimal PQty { get; set; }
        public string ItemCode { get; set; }
        public string Color { get; set; }
    }
}
