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
    
    public partial class FabricMaster
    {
        public FabricMaster()
        {
            this.FabricProcess = new HashSet<FabricProcess>();
            this.FabricYarn = new HashSet<FabricYarn>();
        }
    
        public int Fabricmasid { get; set; }
        public Nullable<int> Fabricid { get; set; }
        public Nullable<decimal> FromGSM { get; set; }
        public Nullable<decimal> ToGSM { get; set; }
    
        public virtual ICollection<FabricProcess> FabricProcess { get; set; }
        public virtual ICollection<FabricYarn> FabricYarn { get; set; }
        public virtual Item Item { get; set; }
    }
}