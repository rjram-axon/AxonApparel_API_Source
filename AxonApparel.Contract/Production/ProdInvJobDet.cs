using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdInvJobDet
    {
        public int Prod_InvDetid { get; set; }
        public int Prod_InvId { get; set; }
        public int Prod_recpt_DetId { get; set; }
        public int Prood_Inv_JobDetID { get; set; }
        public string Job_Ord_No { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public decimal InvoiceQty { get; set; }
        public int OSNo { get; set; }
        public decimal RecQty { get; set; }
        public decimal RecRate { get; set; }
    }
}
