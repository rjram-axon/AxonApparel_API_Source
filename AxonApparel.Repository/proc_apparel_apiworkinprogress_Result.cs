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
    
    public partial class proc_apparel_apiworkinprogress_Result
    {
        public int supplierid { get; set; }
        public int processid { get; set; }
        public int processordid { get; set; }
        public string Process { get; set; }
        public string supplier { get; set; }
        public string processorder { get; set; }
        public string processorddate { get; set; }
        public string Order_no { get; set; }
        public string Ref_no { get; set; }
        public Nullable<decimal> issuedqty { get; set; }
        public Nullable<decimal> receivedqty { get; set; }
        public Nullable<decimal> cancelqty { get; set; }
        public Nullable<decimal> balanceqty { get; set; }
        public Nullable<decimal> IssueValue { get; set; }
        public Nullable<decimal> Balvalue { get; set; }
        public string outuom { get; set; }
        public string inpuom { get; set; }
    }
}
