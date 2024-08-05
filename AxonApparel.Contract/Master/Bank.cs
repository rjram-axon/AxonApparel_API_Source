using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Bank
    {
        public int BankId { set; get; }
        public string BankName { get; set; }
        public string BankLookup { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string Zipcode { get; set; }
        public long MobNum { get; set; }
        public string Telex { get; set; }
        public string shortcode { get; set; }
        public int shiftno { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string IsActive { get; set; }
        public string ContactName { get; set; }
        //public List<SelectListItem> CityList { get; set; }
    }
}