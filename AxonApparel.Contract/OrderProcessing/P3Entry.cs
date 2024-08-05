using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class P3Entry
    {
        public int P3EntryId { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public string RefNo { get; set; }
        public string Yarn_PO { get; set; }
        public string Yarn_IH { get; set; }
        public string Fab_IH { get; set; }
        public string Remarks { get; set; }
        public string IsActive { get; set; }
    }
}
