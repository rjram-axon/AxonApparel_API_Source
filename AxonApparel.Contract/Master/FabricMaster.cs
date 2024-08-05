using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class FabricMaster
    {
        public int Fabricid { get; set; }
        public int Fabricmasid { get; set; }
        public string Fabric { get; set; }
        public decimal FromGSM { get; set; }
        public decimal ToGSM { get; set; }
        public List<FabricYarn> FabricYarn { get; set; }
        public List<FabricProcess> FabricProcess { get; set; }

    }
}
