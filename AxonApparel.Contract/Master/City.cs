using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class City
    {
        public int CityId { get; set; }
        public int CountcityId { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string IsActive { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public List<ListItem> CountryList { get; set; }

    }
}
