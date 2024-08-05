using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BillPass
    {
        public string Approved { get; set; }
        public string type { get; set; }
        public string process { get; set; }
        public string company { get; set; }
        public Nullable<decimal> grnvalue { get; set; }
        public string supplier { get; set; }
        public string receipt_no { get; set; }
        public string job_ord_no { get; set; }
        public int pur_invid { get; set; }
        public string invoice_no { get; set; }
        public Nullable<System.DateTime> invoice_date { get; set; }
        public string supp_inv_no { get; set; }
        public Nullable<System.DateTime> supp_inv_date { get; set; }
        public decimal? netamount { get; set; }
        public string passed { get; set; }
        public decimal paymentamt { get; set; }
        public Nullable<decimal> advance { get; set; }
        public string companyunit { get; set; }
        public int companyunitid { get; set; }
        public int processid { get; set; }
        public string ordertype { get; set; }
        public string order_no { get; set; }
        public string ref_no { get; set; }
        public string processor { get; set; }
        public int prodinvid { get; set; }
        public string invoicetype { get; set; }
        public string internalorexternal { get; set; }
        public string invno { get; set; }
        public Nullable<System.DateTime> invdate { get; set; }
        public string refno { get; set; }
        public decimal invamount { get; set; }
        public string Abbreviation { get; set; }
        public string PONo { get; set; }
        public Nullable<System.DateTime> PODate { get; set; }
        public string Style { get; set; }
        public decimal Order_QTY { get; set; }
        public decimal GrnRate { get; set; }
        public int UserId { get; set; }
        public Nullable<decimal> Payment_amt { get; set; }
        public Nullable<int> pur_ord_detid { get; set; }
        public string Hold_OR_Ret { get; set; }

        public string OType { get; set; }
        public string status { get; set; }

        public List<BillPass> DetList { get; set; }
    }
}
