using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class P1Entry
    {
        public int P1EntryId { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public string RefNo { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public DateTime EntryDate { get; set; }
        public string IsActive { get; set; }
        
    }
}
