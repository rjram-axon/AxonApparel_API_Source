using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class FabricProcess
    {
        public int FabricProcessmasid { get; set; }
        public int Fabricmasid { get; set; }
        public int Processid { get; set; }
        public string Process { get; set; }
        public decimal LossPercentage { get; set; }
        public decimal Rate { get; set; }
    }
}
