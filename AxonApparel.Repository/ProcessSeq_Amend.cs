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
    
    public partial class ProcessSeq_Amend
    {
        public int AmdPSeqId { get; set; }
        public int ProcessSeqid { get; set; }
        public Nullable<int> Processid { get; set; }
        public Nullable<int> AmdProc_seq_masid { get; set; }
    
        public virtual ProcessSeq_Mas_Amend ProcessSeq_Mas_Amend { get; set; }
    }
}
