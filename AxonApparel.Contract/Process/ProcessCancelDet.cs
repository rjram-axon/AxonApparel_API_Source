using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessCancelDet
    {
        public int Process_Cancel_Detid { get; set; }
        public int Process_Cancel_Masid { get; set; }
        public int ProcessOrdId { get; set; }
        public int itemid { get; set; }
        public int sizeid { get; set; }
        public int plansizeid { get; set; }
        public int colorid { get; set; }
        public decimal Canceled_qty { get; set; }
        public decimal Sec_Qty { get; set; }
        public string InorOut { get; set; }
        public int ProcessOrdDetid { get; set; }
    }
}
