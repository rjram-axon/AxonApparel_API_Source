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
    
    public partial class DebitOrderDetail
    {
        public int Debit_Orddetid { get; set; }
        public Nullable<int> Debit_detid { get; set; }
        public string OrderNo { get; set; }
        public Nullable<int> Styleid { get; set; }
        public Nullable<decimal> DebitQty { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<int> Debit_id { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> SizeID { get; set; }
        public Nullable<int> ColorID { get; set; }
        public Nullable<int> UOMId { get; set; }
    
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual Pur_Debit_ItemDet Pur_Debit_ItemDet { get; set; }
        public virtual Pur_Debit_Mas Pur_Debit_Mas { get; set; }
        public virtual PurchaseSize Size { get; set; }
    }
}