using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Consignee
    {
        public int ConsigneeId { get; set; }
        public string ConsigneeName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string Zipcode { get; set; }
        public string IsActive { get; set; }
        public string Lookup { get; set; }
        public string Remarks { get; set; }
        //public List<SelectListItem> CityList { get; set; }
    }
}