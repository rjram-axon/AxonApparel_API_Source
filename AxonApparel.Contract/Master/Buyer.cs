using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Buyer
    {
        public int BuyerId { get; set; }
        public int CountBuyerId { get; set; }
        public string BuyerName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string Zipcode { get; set; }
        public int  CountryId { get; set; }
        public string ContPerson { get; set; }
        public string LookUp { get; set; }
        public string Designation { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string IsActive { get; set; }
        public string CountryName { get; set; }
        public decimal Commission { get; set; }
        public decimal MarkPrice { get; set; }
        public decimal DisMargin { get; set; }
        public decimal AdminExp { get; set; }
        public decimal CompMargin { get; set; }
        public decimal BankInt { get; set; }
        public decimal DealerMargin { get; set; }
        public int Currency { get; set; }
        public int System { get; set; }
        public int Shipment { get; set; }
        public int Paymode { get; set; }
        public int Manager { get; set; }
        public int Merch { get; set; }
        public int PortLoad { get; set; }
        public int PortDestination { get; set; }
        public decimal Allowence { get; set; }
        //public List<SelectListItem> CityList { get; set; }
    }
}