using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockLocAllocation
    {
        public int buymasid { get; set; }
        public string orderno { get; set; }
        public string refno { get; set; }
        public int styleid { get; set; }
        public string style { get; set; }
        public int jmasid { get; set; }
        public string jobordno { get; set; }
        public int Inwardtypeid { get; set; }
        public string Inwardtype { get; set; }
        public string transtype { get; set; }
        public int strunitid { get; set; }
        public string strunit { get; set; }
        public string transno { get; set; }
        public int compid { get; set; }
        public string company { get; set; }
        public long sno { get; set; }
        public DateTime transdate { get; set; }

        public int itmid { get; set; }
        public string itm { get; set; }
        public int clrid { get; set; }
        public string clr { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public string uom { get; set; }
        public decimal stkqty { get; set; }
        public decimal allocqty { get; set; }
        public int stockid { get; set; }
        public decimal  rate { get; set; }
        public string unitrother { get; set; }
        public string itmcat { get; set; }
        public int cmpunitid { get; set; }
        public int processid { get; set; }
        public int suppid { get; set; }
        public string itmcode { get; set; }
        public string lotno { get; set; }
        public string bundleno { get; set; }
        public string purorord { get; set; }
        public int mfrid { get; set; }
        public int qty { get; set;}
        public string cattype { get; set; }
        public string fabgsm { get; set; }
        public int uomid { get; set; }
        public string stocktype { get; set; }
        public decimal markuprate { get; set; }
        public string reprog { get; set; }
        public string orderindent { get; set; }
        public decimal alloted { get; set; }
        public decimal sqty { get; set; }
        public decimal balqty { get; set; }
        public decimal retqty { get; set; }
        public string remarks { get; set; }
        public int sectionid { get; set; }
      
    }
}
