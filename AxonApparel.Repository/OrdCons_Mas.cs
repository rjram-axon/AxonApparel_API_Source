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
    
    public partial class OrdCons_Mas
    {
        public OrdCons_Mas()
        {
            this.OrdCons_ProcSeq = new HashSet<OrdCons_ProcSeq>();
        }
    
        public int ordconsmasid { get; set; }
        public Nullable<decimal> ordconsavggramage { get; set; }
        public Nullable<int> GarmentItemid { get; set; }
        public Nullable<int> BmasId { get; set; }
        public Nullable<int> StyleRowId { get; set; }
    
        public virtual OrderItem Item { get; set; }
        public virtual ICollection<OrdCons_ProcSeq> OrdCons_ProcSeq { get; set; }
    }
}