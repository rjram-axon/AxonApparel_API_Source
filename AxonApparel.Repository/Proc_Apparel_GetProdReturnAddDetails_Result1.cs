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
    
    public partial class Proc_Apparel_GetProdReturnAddDetails_Result1
    {
        public int prodprgid { get; set; }
        public string ProdPrgNo { get; set; }
        public int ProdIssueId { get; set; }
        public string ProdIssueNo { get; set; }
        public Nullable<System.DateTime> ProdIssueDate { get; set; }
        public string Job_ord_no { get; set; }
        public string Order_No { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public string Processor { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public Nullable<decimal> IssueQty { get; set; }
        public Nullable<decimal> BalQty { get; set; }
    }
}