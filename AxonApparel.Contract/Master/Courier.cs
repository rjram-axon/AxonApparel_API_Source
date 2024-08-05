using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Courier
    {
        public int CourierId { get; set; }
        public string CourierName { get; set; }
        public string CourierAddress { get; set; }
        public string URL { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        //public List<SelectListItem> CountryList { get; set; }
        public string IsActive { get; set; }
    }
}