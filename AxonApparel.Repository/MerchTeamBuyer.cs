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
    
    public partial class MerchTeamBuyer
    {
        public int MechTeamBuyerId { get; set; }
        public Nullable<int> TeamId { get; set; }
        public Nullable<int> BuyerId { get; set; }
    
        public virtual MerchTeamMas MerchTeamMas { get; set; }
        public virtual Buyer Buyer { get; set; }
    }
}
