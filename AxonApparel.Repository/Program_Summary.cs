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
    
    public partial class Program_Summary
    {
        public int Program_SummaryID { get; set; }
        public string Type { get; set; }
        public string BuyJobWork { get; set; }
        public string Order_No { get; set; }
        public Nullable<int> Styleid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public Nullable<int> UOMId { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public string InOrOut { get; set; }
        public Nullable<decimal> ff_despatch { get; set; }
        public Nullable<decimal> SecQty { get; set; }
    
        public virtual OrderUnit_of_measurement Unit_of_measurement { get; set; }
        public virtual OrderItem Item { get; set; }
        public virtual OrderStyleHeader StyleHeader { get; set; }
        public virtual OrderSize Size { get; set; }
        public virtual OrderColor Color { get; set; }
    }
}
