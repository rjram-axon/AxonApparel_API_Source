using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Shift
    {
        public int shiftid { get; set; }
        public string Shiftname { get; set; }
        public string RegularOrOT { get; set; }
        public string IsActive { get; set; }
    }
}
