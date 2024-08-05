using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessCancel
    {

        public int Process_Cancel_Detid { get; set; }
        public int Process_Cancel_Masid { get; set; }
        public int ProcessOrdId { get; set; }
        public int itemid { get; set; }
        public int sizeid { get; set; }
        public int colorid { get; set; }
        public decimal Canceled_qty { get; set; }
        public decimal Sec_Qty { get; set; }
        public string InorOut { get; set; }
        public string process_return_no { get; set; }
        public int Process_Cancel_JobDetid { get; set; }
       // public int Process_Cancel_Detid { get; set; }
        public string Job_Ord_No { get; set; }
        public string ProdPrgNo { get; set; }
        public string SequenceNo { get; set; }
        public decimal Cancel_Qty { get; set; }
        public int ProcessOrdDetid { get; set; }
        public int ProcessOrdJobDetid { get; set; }
    }
}
