using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningFabric
    {
    
        public int Comp_Plan_MasID { get; set; }
        public int CompSlNo { get; set; }
        public int PlanID { get; set; }
        public int ComponentID { get; set; }
        public string ComponentName { get; set; }
        //public int No_Of_Parts { get; set; }
        public string Fabric_Type { get; set; }
        public string Fabric_TypeID { get; set; }
        public decimal kgs { get; set; }
        public decimal WMeters { get; set; }
        public int PanParts { get; set; }
        public string OrderNo { get; set; }
        public int StyleId { get; set; }
        public int CompanyId { get; set; }
        public string Mode { get; set; }
        public string PrgThr { get; set; }
        public string GColor { get; set; }
        public int GColorId { get; set; }
        public int FabircId { get; set; }

        public DateTime EntryDate { get; set; }
        public List<PlanningFabricDetails> PlanFabricDet { get; set; }
        public List<PlanningFabric> PlanFabric { get; set; }
        public List<PlanLoss> PlanLoss { get; set; }

    }
}
