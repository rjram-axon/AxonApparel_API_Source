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
    
    public partial class Proc_Apparel_ApiSupplierOutstandingPurchasedetails_Result
    {
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public int pur_ord_id { get; set; }
        public string pur_ord_no { get; set; }
        public Nullable<decimal> issuedqty { get; set; }
        public Nullable<decimal> receivedqty { get; set; }
        public Nullable<decimal> cancelqty { get; set; }
        public Nullable<decimal> balanceqty { get; set; }
        public string outuom { get; set; }
        public string inpuom { get; set; }
    }
}
