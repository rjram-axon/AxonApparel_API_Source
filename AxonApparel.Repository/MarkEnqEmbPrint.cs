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
    
    public partial class MarkEnqEmbPrint
    {
        public int MarkEnqEmbPrintId { get; set; }
        public int EnquiryID { get; set; }
        public string EmbDesc { get; set; }
        public string EmbSize { get; set; }
        public string EmbPlacement { get; set; }
        public Nullable<int> EmbColors { get; set; }
        public Nullable<int> EmbStiches { get; set; }
        public string EmbType { get; set; }
        public string PrnDesc { get; set; }
        public string PrnSize { get; set; }
        public string PrnPlacement { get; set; }
        public Nullable<int> PrnColors { get; set; }
        public Nullable<int> PrnType { get; set; }
        public Nullable<int> PrnQlty { get; set; }
        public string EmbNo { get; set; }
        public string PrnNo { get; set; }
        public string EmbImage { get; set; }
        public string PrintImage { get; set; }
        public string Emb_or_Prn { get; set; }
    
        public virtual MarkEnqMas MarkEnqMas { get; set; }
    }
}