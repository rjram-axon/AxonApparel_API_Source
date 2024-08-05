using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Garment_Uom
    {
        public int GUomId {get; set;}
        public int CountGuomId { get; set; }
        public string GUom {get; set;} 
        public string GUom_Lookup { get; set; }
        public int To_BUom { get; set; }
        public string IsActive { get; set; }
    }
}
