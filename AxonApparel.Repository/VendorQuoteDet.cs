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
    
    public partial class VendorQuoteDet
    {
        public int QuoteDetid { get; set; }
        public Nullable<int> Quoteid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public Nullable<int> Uomid { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public decimal Rate { get; set; }
        public Nullable<decimal> MinQty { get; set; }
        public decimal Apprate { get; set; }
        public Nullable<System.DateTime> AppDate { get; set; }
        public string Buy_ord_no { get; set; }
        public Nullable<int> Buy_Ord_MasId { get; set; }
        public Nullable<int> ApprovedBy { get; set; }
        public Nullable<decimal> MaxQty { get; set; }
        public Nullable<int> StyleId { get; set; }
    
        public virtual PlanningBuy_Ord_Mas Buy_Ord_Mas { get; set; }
        public virtual PlanningColor Color { get; set; }
        public virtual PlanningItem Item { get; set; }
        public virtual PlanningUnit_of_measurement Unit_of_measurement { get; set; }
        public virtual VendorQuoteMas VendorQuoteMas { get; set; }
    }
}