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
    
    public partial class ItemGroup
    {
        public ItemGroup()
        {
            this.Item = new HashSet<Item>();
        }
    
        public int Id { get; set; }
        public string ItemGroup1 { get; set; }
        public string Category1 { get; set; }
        public string Category2 { get; set; }
        public string Category3 { get; set; }
        public bool IsActive { get; set; }
    
        public virtual ICollection<Item> Item { get; set; }
    }
}
