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
    
    public partial class General_Memo_det
    {
        public int Gen_memo_Detid { get; set; }
        public Nullable<int> Gen_memo_Masid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public Nullable<int> Uomid { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public string ItemRemarks { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> Amount { get; set; }
    
        public virtual General_Memo_mas General_Memo_mas { get; set; }
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual PurchaseSize Size { get; set; }
    }
}
