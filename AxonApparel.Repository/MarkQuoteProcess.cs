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
    
    public partial class MarkQuoteProcess
    {
        public int QuoteID { get; set; }
        public int ProcessId { get; set; }
        public int Fabricid { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public int Detid { get; set; }
        public Nullable<int> ComponentId { get; set; }
    
        public virtual OrderItem Item { get; set; }
        public virtual MarkQuoteMas MarkQuoteMas { get; set; }
    }
}