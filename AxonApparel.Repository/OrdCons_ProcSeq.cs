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
    
    public partial class OrdCons_ProcSeq
    {
        public int ordconsprocessmasid { get; set; }
        public Nullable<int> ordconsmasid { get; set; }
        public Nullable<int> ordconsprocessid { get; set; }
        public Nullable<decimal> ordconsprocessloss { get; set; }
    
        public virtual OrdCons_Mas OrdCons_Mas { get; set; }
    }
}
