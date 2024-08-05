using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Unit_of_measurement
    {
        public int UomId { get; set; }
        public int CountUomId { get; set; }
        public string Uom { get; set; }
        public string IsDecimal { get; set; }
        public string Abbreviation { get; set; }
        public string IsActive { get; set; }
    }
}
