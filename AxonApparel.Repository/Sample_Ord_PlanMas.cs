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
    
    public partial class Sample_Ord_PlanMas
    {
        public Sample_Ord_PlanMas()
        {
            this.Sample_Ord_PlanDet = new HashSet<Sample_Ord_PlanDet>();
        }
    
        public int SPlanId { get; set; }
        public Nullable<System.DateTime> PlanDate { get; set; }
        public string Order_No { get; set; }
        public string Sample_Job_No { get; set; }
        public Nullable<int> Companyid { get; set; }
        public Nullable<int> Company_Unitid { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> App_By { get; set; }
        public Nullable<System.DateTime> App_Date { get; set; }
        public string App_Remarks { get; set; }
    
        public virtual ICollection<Sample_Ord_PlanDet> Sample_Ord_PlanDet { get; set; }
    }
}