using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class OpenInvoiceDet
    {
        public int Open_InvID { get; set; }
        public int Open_Inv_DetID { get; set; }
        public string CostHead { get; set; }
        public int CostHeadID { get; set; }
        public decimal Rate { get; set; }
        public decimal Qty { get; set; }
        public decimal Amount { get; set; }
        public int UOMID { get; set; }
        public string uom { get; set; }
        public int ordid { get; set; }
        public string Order_No { get; set; }
        public int jobid { get; set; }
        public string Job_Ord_No { get; set; }
        public string Refno { get; set; }
        public int refid { get; set; }
        public int slno { get; set; }
    
    }
}
