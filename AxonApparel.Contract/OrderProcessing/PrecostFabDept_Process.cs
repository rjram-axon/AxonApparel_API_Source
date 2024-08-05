using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PrecostFabDept_Process
    {
        public int PreCostFabDeptProcmasid { get; set; }
        public int PreCostFabDeptmasid { get; set; }
        public int PreCostFabDeptFabmasid { get; set; }
        public int Fabricid { get; set; }
        public int Processid { get; set; }
        public decimal LossPercentage { get; set; }
        public string Fabric { get; set; }
        public string FabricColor { get; set; }
        public string Process { get; set; }
        public decimal Rate { get; set; }
        public int FabSlno { get; set; }
        public decimal Target { get; set; }
        public string Approved { get; set; }
    }
}
