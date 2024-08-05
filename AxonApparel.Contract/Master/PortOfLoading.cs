using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PortOfLoading
    {
        public int PortOfLoadingId { get; set; }

        public string PortOfLoading1 { get; set; }

        public string PortCode { get; set; }

        public int CountryId { get; set; }

        public string Country { get; set; }

        public string IsActive { get; set; }
        public int CountportId { get; set; }
    }
}
