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
    
    public partial class OrderPortofLoading
    {
        public OrderPortofLoading()
        {
            this.Buy_Ord_Ship = new HashSet<Buy_Ord_Ship>();
            this.Buy_Ord_Ship_Amend = new HashSet<Buy_Ord_Ship_Amend>();
        }
    
        public int PortOfLoadingId { get; set; }
        public string PortOfLoading1 { get; set; }
        public Nullable<int> Countryid { get; set; }
        public bool IsActive { get; set; }
        public string PortCode { get; set; }
    
        public virtual ICollection<Buy_Ord_Ship> Buy_Ord_Ship { get; set; }
        public virtual ICollection<Buy_Ord_Ship_Amend> Buy_Ord_Ship_Amend { get; set; }
        public virtual OrderCountry Country { get; set; }
    }
}