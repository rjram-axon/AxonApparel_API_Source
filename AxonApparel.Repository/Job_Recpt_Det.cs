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
    using System.Collections.Generic;
    
    public partial class Job_Recpt_Det
    {
        public int JobRecptDetId { get; set; }
        public int JobRecptId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public string LotNo { get; set; }
        public decimal RecptQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal InvoiceQty { get; set; }
        public decimal Rate { get; set; }
        public Nullable<decimal> AcceptedQty { get; set; }
        public Nullable<decimal> DespatchQty { get; set; }
        public Nullable<decimal> RejQty { get; set; }
        public Nullable<decimal> ExcessQty { get; set; }
        public Nullable<decimal> LooseQty { get; set; }
    
        public virtual Job_Recpt_Mas Job_Recpt_Mas { get; set; }
    }
}
