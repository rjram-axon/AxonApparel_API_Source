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
    
    public partial class Yarn_Plan_Det
    {
        public Yarn_Plan_Det()
        {
            this.Yarn_Plan_ProLoss = new HashSet<Yarn_Plan_ProLoss>();
        }
    
        public int YPlanDetID { get; set; }
        public int YPlanMasID { get; set; }
        public int Knit_In_ItemId { get; set; }
        public int Knit_In_SizeID { get; set; }
        public int Knit_in_ColorID { get; set; }
        public decimal Knit_In_Per { get; set; }
        public Nullable<decimal> Knit_In_Qty { get; set; }
        public decimal Loss_per { get; set; }
        public bool Dyeing_Req { get; set; }
        public int SlNo { get; set; }
        public int YSNo { get; set; }
        public int FabricID { get; set; }
        public int Fabric_ColorId { get; set; }
        public Nullable<int> YDSlno { get; set; }
    
        public virtual Yarn_Plan_Mas Yarn_Plan_Mas { get; set; }
        public virtual ICollection<Yarn_Plan_ProLoss> Yarn_Plan_ProLoss { get; set; }
        public virtual PlanningColor Color { get; set; }
        public virtual PlanningColor Color1 { get; set; }
        public virtual PlanningItem Item { get; set; }
        public virtual PlanningItem Item1 { get; set; }
    }
}
