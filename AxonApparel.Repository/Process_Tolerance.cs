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
    
    public partial class Process_Tolerance
    {
        public int ToleranceId { get; set; }
        public Nullable<int> ProcessId { get; set; }
        public string IsPercent { get; set; }
        public decimal Percentage { get; set; }
        public decimal Quantity { get; set; }
    
        public virtual MisPathProcess Process { get; set; }
    }
}
