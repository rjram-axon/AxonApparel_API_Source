using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class LotSplitUpItem
    {
        public int LotSplitMasid { get; set; }
        public int LotSplitDetid { get; set; }
        public int Stockid { get; set; }
        public int itemid { get; set; }
        public string Item { get; set; }
        public int UomId { get; set; }
        public string Uom { get; set; }
        public int colorid { get; set; }
        public string Color { get; set; }
        public int Sizeid { get; set; }
        public string Size { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public int processid { get; set; }
        public string ItemProcess { get; set; }
        public string Orderno { get; set; }
        public string LotNo { get; set; }
        public decimal Quantity { get; set; }
        public decimal BalQty { get; set; }
        public decimal SplQty { get; set; }
        public int LSno { get; set; }
        public int SNo { get; set; }
        
    }
        

}
