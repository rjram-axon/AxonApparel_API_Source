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
    
    public partial class Fabric_Plan_Amend
    {
        public int FPlanAmndId { get; set; }
        public Nullable<int> FPlanId { get; set; }
        public Nullable<int> CompSlNo { get; set; }
        public Nullable<int> PlanID { get; set; }
        public int ColorID { get; set; }
        public int SizeId { get; set; }
        public int Prdn_Qty { get; set; }
        public decimal Fabric_Req { get; set; }
        public decimal Grammage { get; set; }
        public decimal Woven_Req_InMtrs { get; set; }
        public decimal LossGain { get; set; }
        public int FabricId { get; set; }
        public string Fabric_type { get; set; }
        public int Fab_WidthId { get; set; }
        public int Table_WidthID { get; set; }
        public int BaseColorID { get; set; }
        public decimal BColorPur_Qty { get; set; }
        public int FinishColorID { get; set; }
        public Nullable<decimal> FColorPur_Qty { get; set; }
        public Nullable<int> PrintColorId { get; set; }
        public System.DateTime EntryDate { get; set; }
        public string Knit_GSM { get; set; }
        public string Fin_GSM { get; set; }
        public string Loop_Len { get; set; }
        public string Texture { get; set; }
        public string Content { get; set; }
        public string Gauge { get; set; }
    
        public virtual PlanningColor Color { get; set; }
        public virtual PlanningColor Color1 { get; set; }
        public virtual PlanningColor Color2 { get; set; }
        public virtual PlanningColor Color3 { get; set; }
        public virtual PlanningItem Item { get; set; }
    }
}
