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
    
    public partial class Cutting_Recpt_Det
    {
        public Cutting_Recpt_Det()
        {
            this.Cutting_Recpt_Bundle = new HashSet<Cutting_Recpt_Bundle>();
        }
    
        public int CuttingRecptDetID { get; set; }
        public Nullable<int> CuttingRecptId { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> ColorID { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public string Lotno { get; set; }
        public decimal RecptQty { get; set; }
        public decimal SecQty { get; set; }
        public decimal Rate { get; set; }
        public decimal NoOfBundles { get; set; }
        public decimal IPMarkup_rate { get; set; }
        public decimal OPMarkup_rate { get; set; }
        public decimal Grammage { get; set; }
        public decimal weight { get; set; }
        public decimal InvQty { get; set; }
        public string Closed { get; set; }
        public Nullable<decimal> Wages_Qty { get; set; }
        public Nullable<decimal> rejectedQty { get; set; }
        public int CuttingOrdDetId { get; set; }
    
        public virtual ICollection<Cutting_Recpt_Bundle> Cutting_Recpt_Bundle { get; set; }
        public virtual Cutting_Recpt_Mas Cutting_Recpt_Mas { get; set; }
    }
}
