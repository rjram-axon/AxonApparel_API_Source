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
    
    public partial class FabDelySec_Issue_Stock
    {
        public int FabDelyIssueStockId { get; set; }
        public Nullable<int> FabDelyIssueId { get; set; }
        public Nullable<int> FabDelyIssueDetId { get; set; }
        public Nullable<int> StockId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal Markup_rate { get; set; }
    
        public virtual FabDelySec_Issue_Det FabDelySec_Issue_Det { get; set; }
        public virtual FabDelySec_Issue_Mas FabDelySec_Issue_Mas { get; set; }
    }
}
