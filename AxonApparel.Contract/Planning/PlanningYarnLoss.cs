using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningYarnLoss
    {
        public int YPlanDetID { get; set; }
        public int SlNo { get; set; }
        public int ProcessId { get; set; }
        public decimal Loss_Per { get; set; }
        public string ProcessName { get; set; }
        //public int FSNo { get; set; }
        public int YPlanLossID { get; set; }
        public int SNo { get; set; }
        public int CompSNo { get; set; }
    }
}
