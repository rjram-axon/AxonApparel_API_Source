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
    
    public partial class Pur_Debit_Others
    {
        public int Debit_detotherid { get; set; }
        public Nullable<int> Debit_id { get; set; }
        public string sDesc { get; set; }
        public string Reason { get; set; }
        public Nullable<decimal> Amount { get; set; }
    
        public virtual Pur_Debit_Mas Pur_Debit_Mas { get; set; }
    }
}
