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
    
    public partial class Pur_Grn_Order
    {
        public int Grn_DetOrdId { get; set; }
        public Nullable<int> grn_detid { get; set; }
        public decimal quantity { get; set; }
        public Nullable<int> pur_ord_detid { get; set; }
        public Nullable<int> actual_mfrid { get; set; }
        public decimal Rate { get; set; }
        public Nullable<decimal> Invoiced_Qty { get; set; }
        public decimal Rate_Diff { get; set; }
        public Nullable<decimal> Excess_Qty { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> SizeID { get; set; }
        public Nullable<int> ColorID { get; set; }
        public Nullable<int> UOMId { get; set; }
    
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual Pur_Ord_Det Pur_Ord_Det { get; set; }
        public virtual Pur_Grn_Det Pur_Grn_Det { get; set; }
    }
}
