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
    
    public partial class CommercialInvoice_Addless
    {
        public Nullable<int> Com_InvID { get; set; }
        public int Comiv_Addless_ID { get; set; }
        public int addlessid { get; set; }
        public decimal Percentage { get; set; }
        public decimal Amount { get; set; }
        public string AorL { get; set; }
    
        public virtual Commercial_Invmas Commercial_Invmas { get; set; }
    }
}
