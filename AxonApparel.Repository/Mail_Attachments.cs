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
    
    public partial class Mail_Attachments
    {
        public int ID { get; set; }
        public Nullable<int> MailId { get; set; }
        public Nullable<int> FileId { get; set; }
        public string FileName { get; set; }
        public string FailPath { get; set; }
    
        public virtual Mail Mail { get; set; }
    }
}
