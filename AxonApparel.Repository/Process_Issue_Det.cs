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
    
    public partial class Process_Issue_Det
    {
        public Process_Issue_Det()
        {
            this.Process_Issue_Jobdet = new HashSet<Process_Issue_Jobdet>();
        }
    
        public int ProcessIssueDetId { get; set; }
        public Nullable<int> ProcessIssueId { get; set; }
        public Nullable<int> itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public Nullable<decimal> IssueQty { get; set; }
        public Nullable<decimal> SecQty { get; set; }
        public Nullable<int> OutputUom { get; set; }
        public Nullable<decimal> OutputValue { get; set; }
        public Nullable<decimal> IPMarkup_Rate { get; set; }
        public string ip_op { get; set; }
        public Nullable<int> PlannedSizeID { get; set; }
        public Nullable<int> OpItemId { get; set; }
        public Nullable<int> OpColorId { get; set; }
        public Nullable<int> OpSizeId { get; set; }
    
        public virtual ICollection<Process_Issue_Jobdet> Process_Issue_Jobdet { get; set; }
        public virtual Process_Issue_Mas Process_Issue_Mas { get; set; }
    }
}