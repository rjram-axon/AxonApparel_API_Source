using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PreCostingEmbellishment_Det
    {
        public int PrecostEmbellishmentmasid { get; set; }
        public int PrecostFabTrimmasid { get; set; }
        public int Processid { get; set; }
        public string Process { get; set; }
        public int GItemid { get; set; }
        public string GItem { get; set; }
        public decimal Rate { get; set; }
        public decimal Target { get; set; }
        public string Approved { get; set; }
    }
}
