using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class CSPReceiptDet
    {
        public int ReceiptDetId { get; set; }
        public int ReceiptID { get; set; }
        public string recptno { get; set; }
        public DateTime recptdate { get; set; }
        public int cmpid { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public int styleid { get; set; }
        public int UomId { get; set; }
        public int struntid { get; set; }
        public string uom { get; set; }
        public decimal RecvdQuantity { get; set; }
        public decimal Balqty { get; set; }
        public decimal SecQty { get; set; }
        public int suppid { get; set; }
        public int unitid { get; set; }
        public int SecUomID { get; set; }
        public string secuom { get; set; }
        public int StockID { get; set; }
        public decimal AcceptQty { get; set; }
        public decimal RejectedQty { get; set; }
        public decimal Oldrejqty { get; set; }
        public decimal Oldaccpqty { get; set; }
        public string jobordno { get; set; }
        public int buyordbomdetid { get; set; }
    
    }
}
