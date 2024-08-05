using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsAccShipDet
    {
        public int shiprowid { get; set; }
        public string assortno { get; set; }
        public DateTime shipdate { get; set; }
        public string destination { get; set; }
        public decimal qty { get; set; }
        public decimal prodqty { get; set; }
        public decimal bomQty { get; set; }
        public decimal bpqty { get; set; }
    }
}
