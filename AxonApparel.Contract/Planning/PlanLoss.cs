using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanLoss
    {
        public int FPlanId { get; set; }
        public int SlNo { get; set; }
        public int ProcessId { get; set; }
        public decimal Loss_Per { get; set; }
        public string ProcessName { get; set; }
        public int CompSNo { get; set; }
        public int FLPlanID { get; set; }
        public int FLGColorID { get; set; }
        public int FLBColorId { get; set; }
        public int FLFColorId { get; set; }
    }
}
