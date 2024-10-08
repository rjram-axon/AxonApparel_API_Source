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
    
    public partial class PurchaseBuy_Ord_BOMDet
    {
        public PurchaseBuy_Ord_BOMDet()
        {
            this.Indent_BuyJob = new HashSet<Indent_BuyJob>();
        }
    
        public int Buy_Ord_BOMDetid { get; set; }
        public int Buy_Ord_BOMid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public int UOMid { get; set; }
        public decimal Prg_qty { get; set; }
        public decimal Order_qty { get; set; }
        public decimal Received_qty { get; set; }
        public decimal Issue_qty { get; set; }
        public decimal BOM_qty { get; set; }
        public Nullable<int> Pur_UOMid { get; set; }
        public Nullable<decimal> ToPurUOM { get; set; }
        public Nullable<bool> head_office { get; set; }
        public string purchase_thru { get; set; }
        public string Conv_Mode { get; set; }
        public Nullable<decimal> Adjust_Qty { get; set; }
        public string PurForJob { get; set; }
        public Nullable<decimal> Debit_qty { get; set; }
        public decimal Transfer_In { get; set; }
        public decimal Transfer_Out { get; set; }
        public Nullable<decimal> Cancelled_Qty { get; set; }
        public Nullable<decimal> BOMDiff_Qty { get; set; }
        public decimal Cancel_Qty { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public string Semi_finished_item { get; set; }
        public string CSP { get; set; }
        public string ProcessInput { get; set; }
        public string AltItem { get; set; }
        public string ItemRemarks { get; set; }
        public string ItemClosure { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public Nullable<decimal> StockIn { get; set; }
        public decimal StockOut { get; set; }
        public Nullable<decimal> Indent_Qty { get; set; }
        public Nullable<decimal> Indent_cancelqty { get; set; }
        public Nullable<int> SupplierId { get; set; }
    
        public virtual PurchaseBuy_Ord_BOMMas Buy_Ord_BOMMas { get; set; }
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual ICollection<Indent_BuyJob> Indent_BuyJob { get; set; }
        public virtual PurchaseItem Item { get; set; }
    }
}
