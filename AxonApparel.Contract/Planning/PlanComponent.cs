using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanComponent
    {

        public DateTime Entry_Date { get; set; }
        public int Comp_Plan_MasID { get; set; }
        public int CompSlNo { get; set; }
        public int PlanID { get; set; }
        public int ComponentID { get; set; }
        public string ComponentName { get; set; }
        public int No_Of_Parts { get; set; }
        public string Fabric_Type { get; set; }
        public string Fabric_TypeID { get; set; }
        public string Grouping { get; set; }
        public string GroupingID { get; set; }
        public string Unit { get; set; }
        public string Description { get; set; }
        public int FabricID { get; set; }
        public string FabricName { get; set; }
        public decimal GSM { get; set; }
        public int CheckDcMade { get; set; }
    }
}
