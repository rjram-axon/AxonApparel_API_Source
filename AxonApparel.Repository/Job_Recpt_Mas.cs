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
    
    public partial class Job_Recpt_Mas
    {
        public Job_Recpt_Mas()
        {
            this.Job_Inv_Det = new HashSet<Job_Inv_Det>();
            this.Job_Recpt_Det = new HashSet<Job_Recpt_Det>();
        }
    
        public int JobRecptId { get; set; }
        public string JobRecptNo { get; set; }
        public System.DateTime JobRecptDate { get; set; }
        public string DcNo { get; set; }
        public System.DateTime DcDate { get; set; }
        public int SupplierId { get; set; }
        public string Unit_Or_Other { get; set; }
        public string Job_Ord_No { get; set; }
        public Nullable<int> Companyid { get; set; }
        public string Order_No { get; set; }
        public Nullable<int> styleid { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Tostoreid { get; set; }
        public string QualityMade { get; set; }
        public string QualityRemarks { get; set; }
        public Nullable<System.DateTime> QualityDate { get; set; }
        public string DispatchNo { get; set; }
        public string Buy_Ord_Ship { get; set; }
        public Nullable<int> ShipmentMode { get; set; }
        public Nullable<int> SystemID { get; set; }
        public string DocRefNo { get; set; }
        public Nullable<System.DateTime> DocRefDate { get; set; }
        public string InvRefNo { get; set; }
        public Nullable<System.DateTime> InvRefDate { get; set; }
        public string ShipmentType { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<bool> isaccountsposted { get; set; }
    
        public virtual ICollection<Job_Inv_Det> Job_Inv_Det { get; set; }
        public virtual ICollection<Job_Recpt_Det> Job_Recpt_Det { get; set; }
    }
}
