using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProgramSummary
    {
        public string OrderNo { get; set; }
        public string Type { get; set; }
        public string BuyJobWork { get; set; }
        public int Styleid { get; set; }
        public int Itemid { get; set; }
        public int Sizeid { get; set; }        
        public int Colorid { get; set; }
        public int UOMid { get; set; }
        public int Qty { get; set; }

    }
}
