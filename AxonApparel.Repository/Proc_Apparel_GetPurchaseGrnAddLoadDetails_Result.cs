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
    
    public partial class Proc_Apparel_GetPurchaseGrnAddLoadDetails_Result
    {
        public string pur_ord_no { get; set; }
        public string Purchase_Type { get; set; }
        public int pur_ord_id { get; set; }
        public Nullable<System.DateTime> orddate { get; set; }
        public decimal Amount { get; set; }
        public int companyid { get; set; }
        public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public Nullable<int> PoNo { get; set; }
        public string IsApproved { get; set; }
    }
}