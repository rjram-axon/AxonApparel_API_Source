using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessReceiptDet
    {
        public int Proc_Recpt_Detid { get; set; }
        public int Proc_Recpt_Masid { get; set; }
        public int ProcessOrdId { get; set; }
        public int itemid { get; set; }
        public string item { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public decimal Received_qty { get; set; }
        public decimal Sec_Qty { get; set; }
        public decimal rate { get; set; }
        public decimal Invoice_Qty { get; set; }
        public string closed { get; set; }
        public decimal IPMarkup_rate { get; set; }
        public decimal OPMarkup_Rate { get; set; }
        public int IssuedSizeID { get; set; }
        public int PlanSizeID { get; set; }
        public int FinSizeID { get; set; }
        public decimal WasQty { get; set; }
        public string FinDia { get; set; }
        public string processorder { get; set; }
        public int procordid { get; set; }
        public decimal orderqty { get; set; }
        public decimal bal { get; set; }
        public int sno { get; set; }
        public string recptno { get; set; }
        public int ProcessOrdDetid { get; set; }
    }
}
