using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class S2PhotoSuit
    {
        public int S2EntryId { get; set; }
        public string RefNo { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public string Fabric { get; set; }
        public string Elastic { get; set; }
        public string PhotoSuitSmpleSew { get; set; }
        public string PhotoSuitSmpleSubmit { get; set; }        
        public string Remarks { get; set; }
        public string IsActive { get; set; }
    }
}
