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
    
    public partial class Pur_Inv_Dc
    {
        public Pur_Inv_Dc()
        {
            this.Pur_Inv_Det = new HashSet<Pur_Inv_Det>();
        }
    
        public int Pur_Inv_DcId { get; set; }
        public Nullable<int> pur_invid { get; set; }
        public Nullable<int> pur_grn_masid { get; set; }
    
        public virtual Pur_Grn_Mas Pur_Grn_Mas { get; set; }
        public virtual ICollection<Pur_Inv_Det> Pur_Inv_Det { get; set; }
        public virtual Pur_Inv_Mas Pur_Inv_Mas { get; set; }
    }
}
