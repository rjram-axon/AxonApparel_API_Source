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
    
    public partial class PlanningUnit_of_measurement
    {
        public PlanningUnit_of_measurement()
        {
            this.Acc_Req_Mas = new HashSet<Acc_Req_Mas>();
            this.Buy_Ord_BOMDet = new HashSet<Buy_Ord_BOMDet>();
            this.Buy_Ord_BOMDet1 = new HashSet<Buy_Ord_BOMDet>();
            this.Cost_Defn_BOM = new HashSet<Cost_Defn_BOM>();
            this.Cost_Defn_BOM_Amend = new HashSet<Cost_Defn_BOM_Amend>();
            this.Item = new HashSet<PlanningItem>();
            this.Item1 = new HashSet<PlanningItem>();
            this.Item2 = new HashSet<PlanningItem>();
            this.MarkQuoteFab = new HashSet<MarkQuoteFab>();
            this.Sample_Ord_PlanDet = new HashSet<Sample_Ord_PlanDet>();
            this.Sample_Ord_PlanDet1 = new HashSet<Sample_Ord_PlanDet>();
            this.Cost_Defn_Bom_First = new HashSet<Cost_Defn_Bom_First>();
            this.Process_Quote_Det = new HashSet<Process_Quote_Det>();
            this.VendorQuoteDet = new HashSet<VendorQuoteDet>();
        }
    
        public int UomId { get; set; }
        public string Uom { get; set; }
        public string Abbreviation { get; set; }
        public string IsDecimal { get; set; }
        public bool IsActive { get; set; }
    
        public virtual ICollection<Acc_Req_Mas> Acc_Req_Mas { get; set; }
        public virtual ICollection<Buy_Ord_BOMDet> Buy_Ord_BOMDet { get; set; }
        public virtual ICollection<Buy_Ord_BOMDet> Buy_Ord_BOMDet1 { get; set; }
        public virtual ICollection<Cost_Defn_BOM> Cost_Defn_BOM { get; set; }
        public virtual ICollection<Cost_Defn_BOM_Amend> Cost_Defn_BOM_Amend { get; set; }
        public virtual ICollection<PlanningItem> Item { get; set; }
        public virtual ICollection<PlanningItem> Item1 { get; set; }
        public virtual ICollection<PlanningItem> Item2 { get; set; }
        public virtual ICollection<MarkQuoteFab> MarkQuoteFab { get; set; }
        public virtual ICollection<Sample_Ord_PlanDet> Sample_Ord_PlanDet { get; set; }
        public virtual ICollection<Sample_Ord_PlanDet> Sample_Ord_PlanDet1 { get; set; }
        public virtual ICollection<Cost_Defn_Bom_First> Cost_Defn_Bom_First { get; set; }
        public virtual ICollection<Process_Quote_Det> Process_Quote_Det { get; set; }
        public virtual ICollection<VendorQuoteDet> VendorQuoteDet { get; set; }
    }
}
