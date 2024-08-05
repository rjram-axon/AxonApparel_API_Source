using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Country
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string Lookup { get; set; }
        public string IsActive { get; set; }
        public int CountCountryId { get; set; }
    }
}
