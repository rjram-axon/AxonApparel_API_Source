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
    
    public partial class Process_Issue_Jobdet
    {
        public Process_Issue_Jobdet()
        {
            this.Process_Issue_Stock = new HashSet<Process_Issue_Stock>();
        }
    
        public int ProcessIssueJobId { get; set; }
        public Nullable<int> ProcessIssueId { get; set; }
        public Nullable<int> ProcessIssueDetId { get; set; }
        public string Job_ord_no { get; set; }
        public string ProdPrgNo { get; set; }
        public Nullable<int> LastProcessid { get; set; }
        public Nullable<decimal> IssueQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal SecQty { get; set; }
        public Nullable<int> itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public string ip_op { get; set; }
        public Nullable<int> PlannedSizeID { get; set; }
        public Nullable<int> OpItemId { get; set; }
        public Nullable<int> OpColorId { get; set; }
        public Nullable<int> OpSizeId { get; set; }
    
        public virtual Process_Issue_Det Process_Issue_Det { get; set; }
        public virtual Process_Issue_Mas Process_Issue_Mas { get; set; }
        public virtual ICollection<Process_Issue_Stock> Process_Issue_Stock { get; set; }
    }
}
