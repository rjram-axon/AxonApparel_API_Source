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
    
    public partial class Pur_Cancel_Mas
    {
        public Pur_Cancel_Mas()
        {
            this.Pur_Cancel_Det = new HashSet<Pur_Cancel_Det>();
            this.Pur_Cancel_Order = new HashSet<Pur_Cancel_Order>();
        }
    
        public int CancelId { get; set; }
        public int Pur_Ord_Id { get; set; }
        public string CancelNo { get; set; }
        public Nullable<System.DateTime> CancelDate { get; set; }
        public string CancelledBY { get; set; }
        public string Remarks { get; set; }
    
        public virtual ICollection<Pur_Cancel_Det> Pur_Cancel_Det { get; set; }
        public virtual Pur_Ord_Mas Pur_Ord_Mas { get; set; }
        public virtual ICollection<Pur_Cancel_Order> Pur_Cancel_Order { get; set; }
    }
}
