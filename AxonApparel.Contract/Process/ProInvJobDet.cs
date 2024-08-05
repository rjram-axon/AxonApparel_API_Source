using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProInvJobDet
    {
        public int Process_Inv_JobDetID { get; set; }
        public int Process_InvDetid { get; set; }
        public int Process_InvId { get; set; }
        public int Process_recpt_DetId { get; set; }
        public int Process_recpt_JobDetId { get; set; }
        public string Job_Ord_No { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public decimal InvoiceQty { get; set; }
        public int OSNo { get; set; }
        public decimal RecQty { get; set; }
        public decimal RecRate { get; set; }
        public decimal OrdQty { get; set; }
        public string ValidateProcessQty { get; set; }
    }
    
}
