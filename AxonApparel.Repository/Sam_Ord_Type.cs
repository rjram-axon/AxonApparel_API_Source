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
    
    public partial class Sam_Ord_Type
    {
        public int RecId { get; set; }
        public Nullable<int> SamTypeSeq { get; set; }
        public Nullable<int> Buy_ord_masid { get; set; }
        public Nullable<int> SamTypeId { get; set; }
        public Nullable<decimal> SamTypeQty { get; set; }
    
        public virtual Buy_Ord_Mas Buy_Ord_Mas { get; set; }
    }
}
