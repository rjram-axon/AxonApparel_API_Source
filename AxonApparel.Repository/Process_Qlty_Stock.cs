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
    
    public partial class Process_Qlty_Stock
    {
        public int Proc_Qlty_Stockid { get; set; }
        public Nullable<int> Proc_qlty_jobDetid { get; set; }
        public Nullable<int> Stockid { get; set; }
        public Nullable<decimal> Rejectedqty { get; set; }
        public Nullable<int> JobRowid { get; set; }
        public Nullable<int> Proc_Recpt_jobdetid { get; set; }
    
        public virtual Process_Qlty_Jobdet Process_Qlty_Jobdet { get; set; }
    }
}
