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
    
    public partial class OrdCons_YarnFab
    {
        public int ordconsyarnfabmasid { get; set; }
        public Nullable<int> ordconsmasid { get; set; }
        public string ordconsitemtype { get; set; }
        public Nullable<int> ordconsitemid { get; set; }
    
        public virtual OrderItem Item { get; set; }
    }
}
