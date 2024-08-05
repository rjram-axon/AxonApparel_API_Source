using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class UnitConversion
    {
        public int Id { get; set; }
        public int FromUomId { get; set; }
        public int ToUomId { get; set; }
        public string Conversion { get; set; }
        public string Mode { get; set; }
        public string FromUom { get; set; }
        public string ToUom { get; set; }
        public string IsActive { get; set; }
        public string FuomTuom { get; set; }
    }
}
