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
    
    public partial class MarkQuoteFab
    {
        public int QuoteId { get; set; }
        public int DetId { get; set; }
        public int CompID { get; set; }
        public int FabID { get; set; }
        public decimal Weight { get; set; }
        public string Remarks { get; set; }
        public string Fab_purchase { get; set; }
        public Nullable<decimal> BaseQty { get; set; }
        public Nullable<int> Uomid { get; set; }
        public Nullable<int> GSM { get; set; }
    
        public virtual OrderItem Item { get; set; }
        public virtual OrderItem Item1 { get; set; }
        public virtual OrderUnit_of_measurement Unit_of_measurement { get; set; }
        public virtual MarkQuoteMas MarkQuoteMas { get; set; }
    }
}
