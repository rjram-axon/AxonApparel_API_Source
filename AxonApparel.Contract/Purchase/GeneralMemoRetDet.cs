using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class GeneralMemoRetDet
    {
        public int Gen_MemoRet_Detid { get; set; }
        public int Gen_memo_Masid { get; set; }
        public string gen_memo_no { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public int Uomid { get; set; }
        public string uom { get; set; }
        public decimal issuqty { get; set; }
        public decimal Quantity { get; set; }
        public int Gen_memo_Detid { get; set; }
        public string Closed { get; set; }
    }
}
