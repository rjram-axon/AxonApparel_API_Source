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
    
    public partial class Cutting_Issue_Stock
    {
        public Cutting_Issue_Stock()
        {
            this.Cutting_Return_det = new HashSet<Cutting_Return_det>();
        }
    
        public int CuttingIssueStockId { get; set; }
        public Nullable<int> CuttingIssueId { get; set; }
        public Nullable<int> CuttingIssueDetId { get; set; }
        public Nullable<int> StockId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal MarkUp_Rate { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
    
        public virtual Cutting_Issue_Det Cutting_Issue_Det { get; set; }
        public virtual Cutting_Issue_Mas Cutting_Issue_Mas { get; set; }
        public virtual ICollection<Cutting_Return_det> Cutting_Return_det { get; set; }
    }
}
