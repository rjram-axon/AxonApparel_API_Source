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
    
    public partial class Pur_Inv_Debit_Credit
    {
        public Pur_Inv_Debit_Credit()
        {
            this.Pur_Inv_Mas1 = new HashSet<Pur_Inv_Mas>();
            this.Pur_Inv_Mas2 = new HashSet<Pur_Inv_Mas>();
        }
    
        public int Debit_CreditID { get; set; }
        public int Pur_Inv_id { get; set; }
        public string Head { get; set; }
        public decimal CreditAmount { get; set; }
        public decimal DebitAmount { get; set; }
        public string Reason { get; set; }
    
        public virtual Pur_Inv_Mas Pur_Inv_Mas { get; set; }
        public virtual ICollection<Pur_Inv_Mas> Pur_Inv_Mas1 { get; set; }
        public virtual ICollection<Pur_Inv_Mas> Pur_Inv_Mas2 { get; set; }
    }
}
