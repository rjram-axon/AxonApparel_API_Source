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
    
    public partial class Job_Inv_Mas
    {
        public Job_Inv_Mas()
        {
            this.Job_Inv_addless = new HashSet<Job_Inv_addless>();
            this.Job_Inv_Det = new HashSet<Job_Inv_Det>();
        }
    
        public int Job_InvId { get; set; }
        public string Job_Inv_No { get; set; }
        public string Sup_Inv_No { get; set; }
        public System.DateTime Job_Inv_Date { get; set; }
        public System.DateTime Sup_Inv_Date { get; set; }
        public int SupplierId { get; set; }
        public string Unit_or_Other { get; set; }
        public int Passed { get; set; }
        public string Remarks { get; set; }
        public decimal Gross_Amount { get; set; }
        public decimal Addless_Amount { get; set; }
        public decimal Invoice_value { get; set; }
        public decimal Payment_Amt { get; set; }
        public Nullable<int> CreatedBy { get; set; }
    
        public virtual ICollection<Job_Inv_addless> Job_Inv_addless { get; set; }
        public virtual ICollection<Job_Inv_Det> Job_Inv_Det { get; set; }
    }
}
