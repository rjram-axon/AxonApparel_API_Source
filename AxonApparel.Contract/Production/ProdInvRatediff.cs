using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdInvRatediff
    {
        public int ProdinvRateid { get; set; }
        public int ProdInvId { get; set; }
        public string Grnno { get; set; }
        public decimal GrnAmt { get; set; }
        public decimal InvAmt { get; set; }
        public decimal RateDiff { get; set; }
        public int Proc_Recpt_Detid { get; set; }
        public decimal QtyDiff { get; set; }


        //public int Process_inv_Rateid { get; set; }
        //public int Process_Invid { get; set; }
    
        public int Proc_Recpt_Masid { get; set; }
        //public string Grnno { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public decimal BalQty { get; set; }
        public decimal Invoice_Qty { get; set; }
        public decimal Rate { get; set; }
        public decimal RateAmntDif { get; set; } 
        public decimal QtyAmntDif { get; set; }
        public string Date { get; set; }
        public string IsChecked { get; set; }
    }
    
}
