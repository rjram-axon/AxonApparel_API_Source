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
    
    public partial class Process_Qlty_Jobdet
    {
        public Process_Qlty_Jobdet()
        {
            this.Process_Qlty_Stock = new HashSet<Process_Qlty_Stock>();
        }
    
        public int Proc_qlty_jobDetid { get; set; }
        public Nullable<int> Proc_qlty_Masid { get; set; }
        public Nullable<int> Proc_qlty_Detid { get; set; }
        public Nullable<int> Proc_Recpt_jobDetid { get; set; }
        public Nullable<decimal> DebitQty { get; set; }
        public Nullable<decimal> AcptQty { get; set; }
        public Nullable<int> DbtProcessId { get; set; }
        public Nullable<int> DbtProcessorId { get; set; }
    
        public virtual Process_Qlty_det Process_Qlty_det { get; set; }
        public virtual ICollection<Process_Qlty_Stock> Process_Qlty_Stock { get; set; }
        public virtual Process_Qlty_mas Process_Qlty_mas { get; set; }
        public virtual Process Process { get; set; }
    }
}
