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
    
    public partial class Prod_Ord_Mas
    {
        public Prod_Ord_Mas()
        {
            this.Prod_Ord_Det = new HashSet<Prod_Ord_Det>();
            this.Prod_Ord_JobDet = new HashSet<Prod_Ord_JobDet>();
        }
    
        public int ProductionId { get; set; }
        public string ProdOrder { get; set; }
        public Nullable<System.DateTime> processordate { get; set; }
        public Nullable<int> processorid { get; set; }
        public Nullable<int> processid { get; set; }
        public string remarks { get; set; }
        public Nullable<int> companyunitid { get; set; }
        public int companyid { get; set; }
        public string ProcessorType { get; set; }
        public string OrderType { get; set; }
        public string Closed { get; set; }
        public string OrderCumIssue { get; set; }
        public Nullable<System.DateTime> DelidateTime { get; set; }
        public string ComboIds { get; set; }
        public string DispLocType { get; set; }
        public int DispLoc { get; set; }
        public string IssueLocType { get; set; }
        public int IssueLoc { get; set; }
        public Nullable<int> Teamid { get; set; }
        public Nullable<int> StoreUnitId { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string Phoneno { get; set; }
        public string contactperson { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<decimal> taxamount { get; set; }
        public string saccode { get; set; }
        public Nullable<decimal> CGST { get; set; }
        public Nullable<decimal> SGST { get; set; }
        public Nullable<decimal> IGST { get; set; }
        public Nullable<decimal> TotCGST { get; set; }
        public Nullable<decimal> TotSGST { get; set; }
        public Nullable<decimal> TotIGST { get; set; }
    
        public virtual ICollection<Prod_Ord_Det> Prod_Ord_Det { get; set; }
        public virtual ICollection<Prod_Ord_JobDet> Prod_Ord_JobDet { get; set; }
    }
}
