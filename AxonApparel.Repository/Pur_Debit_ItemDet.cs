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
    
    public partial class Pur_Debit_ItemDet
    {
        public Pur_Debit_ItemDet()
        {
            this.DebitOrderDetail = new HashSet<DebitOrderDetail>();
        }
    
        public int Debit_detid { get; set; }
        public Nullable<int> Debit_id { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public Nullable<int> uomid { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public Nullable<decimal> Qty { get; set; }
        public Nullable<decimal> dQty { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> dRate { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<int> grn_detid { get; set; }
        public string DocType { get; set; }
        public decimal Excess_qty { get; set; }
    
        public virtual Pur_Debit_Mas Pur_Debit_Mas { get; set; }
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual ICollection<DebitOrderDetail> DebitOrderDetail { get; set; }
    }
}