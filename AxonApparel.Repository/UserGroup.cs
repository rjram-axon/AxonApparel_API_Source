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
    
    public partial class UserGroup
    {
        public UserGroup()
        {
            this.Username = new HashSet<Username>();
        }
    
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public string GroupType { get; set; }
    
        public virtual ICollection<Username> Username { get; set; }
    }
}
