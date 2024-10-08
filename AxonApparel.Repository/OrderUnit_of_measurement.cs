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
    
    public partial class OrderUnit_of_measurement
    {
        public OrderUnit_of_measurement()
        {
            this.Program_Summary = new HashSet<Program_Summary>();
            this.Program_Summary_Amend = new HashSet<Program_Summary_Amend>();
            this.Item = new HashSet<OrderItem>();
            this.Item1 = new HashSet<OrderItem>();
            this.Item2 = new HashSet<OrderItem>();
            this.Job_Ord_BomDet = new HashSet<Job_Ord_BomDet>();
            this.Job_Ord_BomDet1 = new HashSet<Job_Ord_BomDet>();
            this.MarkQuoteAcc = new HashSet<MarkQuoteAcc>();
            this.MarkQuoteAcc_Amend = new HashSet<MarkQuoteAcc_Amend>();
            this.MarkQuoteFab = new HashSet<MarkQuoteFab>();
            this.MarkQuoteFab_Amend = new HashSet<MarkQuoteFab_Amend>();
            this.Courier_Det = new HashSet<Courier_Det>();
        }
    
        public int UomId { get; set; }
        public string Uom { get; set; }
        public string Abbreviation { get; set; }
        public string IsDecimal { get; set; }
        public bool IsActive { get; set; }
    
        public virtual ICollection<Program_Summary> Program_Summary { get; set; }
        public virtual ICollection<Program_Summary_Amend> Program_Summary_Amend { get; set; }
        public virtual ICollection<OrderItem> Item { get; set; }
        public virtual ICollection<OrderItem> Item1 { get; set; }
        public virtual ICollection<OrderItem> Item2 { get; set; }
        public virtual ICollection<Job_Ord_BomDet> Job_Ord_BomDet { get; set; }
        public virtual ICollection<Job_Ord_BomDet> Job_Ord_BomDet1 { get; set; }
        public virtual ICollection<MarkQuoteAcc> MarkQuoteAcc { get; set; }
        public virtual ICollection<MarkQuoteAcc_Amend> MarkQuoteAcc_Amend { get; set; }
        public virtual ICollection<MarkQuoteFab> MarkQuoteFab { get; set; }
        public virtual ICollection<MarkQuoteFab_Amend> MarkQuoteFab_Amend { get; set; }
        public virtual ICollection<Courier_Det> Courier_Det { get; set; }
    }
}
