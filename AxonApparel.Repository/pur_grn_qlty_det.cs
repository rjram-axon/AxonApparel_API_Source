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
    
    public partial class pur_grn_qlty_det
    {
        public int PurGrnQltydetId { get; set; }
        public Nullable<int> grn_detid { get; set; }
        public Nullable<int> pur_ord_detid { get; set; }
        public Nullable<int> pur_ord_buyjobid { get; set; }
        public Nullable<decimal> accept_qty { get; set; }
        public Nullable<decimal> debit_qty { get; set; }
        public Nullable<decimal> receivable_qty { get; set; }
        public Nullable<decimal> Excess_Qty { get; set; }
        public Nullable<decimal> Returnqty { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> SizeID { get; set; }
        public Nullable<int> ColorID { get; set; }
        public Nullable<int> UOMId { get; set; }
    
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual Pur_Ord_BuyJob Pur_Ord_BuyJob { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual Pur_Ord_Det Pur_Ord_Det { get; set; }
        public virtual Pur_Grn_Det Pur_Grn_Det { get; set; }
    }
}