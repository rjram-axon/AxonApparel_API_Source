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
    
    public partial class Cutting_Issue_Mas
    {
        public Cutting_Issue_Mas()
        {
            this.Cutting_Issue_Det = new HashSet<Cutting_Issue_Det>();
            this.Cutting_Issue_Stock = new HashSet<Cutting_Issue_Stock>();
        }
    
        public int CuttingIssueId { get; set; }
        public Nullable<int> CuttingOrdid { get; set; }
        public string CuttingIssueNo { get; set; }
        public Nullable<System.DateTime> CuttingIssueDate { get; set; }
        public string VehicleNo { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> FromStoreid { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> FLineId { get; set; }
        public Nullable<bool> IsApproved { get; set; }
        public Nullable<int> ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
    
        public virtual ICollection<Cutting_Issue_Det> Cutting_Issue_Det { get; set; }
        public virtual ICollection<Cutting_Issue_Stock> Cutting_Issue_Stock { get; set; }
        public virtual Cutting_Order_Mas Cutting_Order_Mas { get; set; }
    }
}
