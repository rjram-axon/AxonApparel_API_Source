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
    
    public partial class Cutting_Wastage_Det
    {
        public int WastageDetId { get; set; }
        public int CuttingIsuuedetId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int UOMId { get; set; }
        public int SizeId { get; set; }
        public decimal Quantity { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<int> CuttingReturnid { get; set; }
        public Nullable<int> NewStockId { get; set; }
    
        public virtual Cutting_Issue_Det Cutting_Issue_Det { get; set; }
        public virtual Cutting_Return_Mas Cutting_Return_Mas { get; set; }
        public virtual ProductionItemStock ItemStock { get; set; }
    }
}
