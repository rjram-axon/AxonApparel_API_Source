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
    
    public partial class Process_Issue_Mas
    {
        public Process_Issue_Mas()
        {
            this.Process_Issue_Det = new HashSet<Process_Issue_Det>();
            this.Process_Issue_Jobdet = new HashSet<Process_Issue_Jobdet>();
        }
    
        public int ProcessIssueId { get; set; }
        public string ProcessIssueNo { get; set; }
        public Nullable<System.DateTime> ProcessIssueDate { get; set; }
        public Nullable<int> ProcessOrdId { get; set; }
        public string Remarks { get; set; }
        public string GatePassVehicle { get; set; }
        public Nullable<int> IssueStoreid { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string EWayNo { get; set; }
        public Nullable<System.DateTime> EWayDate { get; set; }
    
        public virtual ICollection<Process_Issue_Det> Process_Issue_Det { get; set; }
        public virtual ICollection<Process_Issue_Jobdet> Process_Issue_Jobdet { get; set; }
        public virtual Process_Ord_Mas Process_Ord_Mas { get; set; }
    }
}
