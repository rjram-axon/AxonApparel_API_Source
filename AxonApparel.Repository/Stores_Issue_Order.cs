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
    
    public partial class Stores_Issue_Order
    {
        public Stores_Issue_Order()
        {
            this.Stores_Issue_Stock = new HashSet<Stores_Issue_Stock>();
        }
    
        public int IssueOrdID { get; set; }
        public int IssueID { get; set; }
        public int IssueDetID { get; set; }
        public string OrderNo { get; set; }
        public Nullable<decimal> IssueQty { get; set; }
        public Nullable<int> UnitStockId { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal RejectedQty { get; set; }
        public Nullable<int> RejectStockId { get; set; }
        public decimal ReturnQty { get; set; }
        public Nullable<decimal> ExcessQty { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> SizeID { get; set; }
        public Nullable<int> ColorID { get; set; }
        public Nullable<int> UOMId { get; set; }
        public Nullable<int> PlannedSizeID { get; set; }
        public Nullable<int> jmasid { get; set; }
    
        public virtual PurchaseColor Color { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual Stores_Issue_Det Stores_Issue_Det { get; set; }
        public virtual ICollection<Stores_Issue_Stock> Stores_Issue_Stock { get; set; }
        public virtual Stores_Issue_Mas Stores_Issue_Mas { get; set; }
    }
}
