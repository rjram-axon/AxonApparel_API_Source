using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurInvOrdDet
    {
        public int Pur_Inv_Ord_DetID { get; set; }
        public string Order_No { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public int Pur_invID { get; set; }
        public decimal InvoiceQty { get; set; }
        public decimal ReceQty { get; set; }
        public decimal Rate { get; set; }
        public int Pur_Inv_DetID { get; set; }
        public int StyleID { get; set; }
        public int OItemID { get; set; }
        public int OColorID { get; set; }
        public int OSizeID { get; set; }
        public int OSSNo { get; set; }

        public decimal ExcessQty { get; set; }
        public decimal debit_qty { get; set; }
        public decimal receivable_qty { get; set; }
        public string Grn_No { get; set; } 
    }
    
}
