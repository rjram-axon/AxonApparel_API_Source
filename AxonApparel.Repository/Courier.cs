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
    
    public partial class Courier
    {
        public int CourierId { get; set; }
        public string Courier1 { get; set; }
        public string CourierAddress { get; set; }
        public string URL { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public int CountryId { get; set; }
        public bool IsActive { get; set; }
    
        public virtual Country Country { get; set; }
    }
}
