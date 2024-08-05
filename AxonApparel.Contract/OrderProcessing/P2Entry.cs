using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class P2Entry
    {
        public int P2EntryId { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public string RefNo { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public DateTime P1Date { get; set; }
        public DateTime P2Date { get; set; }
        public string IsActive { get; set; }
        
    }
}
