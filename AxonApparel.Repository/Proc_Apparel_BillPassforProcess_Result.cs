//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AxonApparel.Repository
{
    using System;
    
    public partial class Proc_Apparel_BillPassforProcess_Result
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
        public Nullable<decimal> netamount { get; set; }
        public bool passed { get; set; }
        public decimal paymentamt { get; set; }
        public decimal advance { get; set; }
        public string companyunit { get; set; }
        public int companyunitid { get; set; }
        public int processid { get; set; }
        public string ordertype { get; set; }
        public string order_no { get; set; }
        public string ref_no { get; set; }
        public string processor { get; set; }
    }
}
