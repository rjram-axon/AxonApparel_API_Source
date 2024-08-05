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
    
    public partial class Buyer
    {
        public Buyer()
        {
            this.Item_Rate = new HashSet<Item_Rate>();
            this.BuyerCharges = new HashSet<BuyerCharges>();
            this.MerchTeamBuyer = new HashSet<MerchTeamBuyer>();
        }
    
        public int BuyerId { get; set; }
        public string Buyer1 { get; set; }
        public string Buyer_lookup { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public Nullable<int> CityId { get; set; }
        public Nullable<int> CountryId { get; set; }
        public string Zipcode { get; set; }
        public string Contact_person { get; set; }
        public string Designation { get; set; }
        public string Phone { get; set; }
        public string E_mail { get; set; }
        public bool IsActive { get; set; }
        public Nullable<decimal> Commission { get; set; }
        public Nullable<decimal> BankInterest { get; set; }
        public Nullable<decimal> AdminExp { get; set; }
        public Nullable<decimal> MarkExp { get; set; }
        public Nullable<decimal> CompMargin { get; set; }
        public Nullable<decimal> DisMargin { get; set; }
        public Nullable<decimal> DealMargin { get; set; }
        public Nullable<int> Currency { get; set; }
        public Nullable<int> System { get; set; }
        public Nullable<int> Shipment { get; set; }
        public Nullable<int> Paymode { get; set; }
        public Nullable<int> Manager { get; set; }
        public Nullable<int> Merch { get; set; }
        public Nullable<int> PortLoad { get; set; }
        public Nullable<int> PortDestination { get; set; }
        public Nullable<decimal> Allowence { get; set; }
        public string REMARKS { get; set; }
    
        public virtual ICollection<Item_Rate> Item_Rate { get; set; }
        public virtual City City { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<BuyerCharges> BuyerCharges { get; set; }
        public virtual ICollection<MerchTeamBuyer> MerchTeamBuyer { get; set; }
    }
}
