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
    
    public partial class Style
    {
        public int StyleId { get; set; }
        public string Style1 { get; set; }
        public int ItemId { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> StyleGroupID { get; set; }
    
        public virtual Style_Group Style_Group { get; set; }
        public virtual Item Item { get; set; }
    }
}
