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
    
    public partial class Cost_Defn_Component
    {
        public Nullable<int> Cost_Defn_id { get; set; }
        public int Cost_Defn_Compid { get; set; }
        public Nullable<int> Processid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public Nullable<int> Componentid { get; set; }
        public decimal Quantity { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public decimal AppQty { get; set; }
        public Nullable<decimal> AppRate { get; set; }
        public decimal Actual_Qty { get; set; }
        public Nullable<decimal> Actual_Rate { get; set; }
        public string DisplayOption { get; set; }
        public Nullable<decimal> FirstRate { get; set; }
        public Nullable<decimal> Invoice_Qty { get; set; }
        public Nullable<decimal> Invoice_Rate { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
    
        public virtual PlanningColor Color { get; set; }
        public virtual PlanningColor Color1 { get; set; }
        public virtual PlanningItem Item { get; set; }
        public virtual PlanningItem Item1 { get; set; }
        public virtual Cost_Defn_Mas Cost_Defn_Mas { get; set; }
        public virtual Cost_Defn_Mas Cost_Defn_Mas1 { get; set; }
    }
}