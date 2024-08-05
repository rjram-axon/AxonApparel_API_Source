using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessCancelJobdet
    {
        public int Process_Cancel_JobDetid { get; set; }
        public int Process_Cancel_Detid { get; set; }
        public int Process_Cancel_Masid { get; set; }
        public string Job_Ord_No { get; set; }
        public string ProdPrgNo { get; set; }
        public string SequenceNo { get; set; }
        public decimal Cancel_Qty { get; set; }
        public int ProcessOrdDetid { get; set; }
        public int ProcessOrdid { get; set; }
        public int ProcessOrdJobDetid { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int plansizeid { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string InorOut { get; set; }
        public decimal balqty { get; set; }
        public string Processorder { get; set; }
        public decimal secqty { get; set; }
        public decimal ordqty { get; set; }
    }
}
