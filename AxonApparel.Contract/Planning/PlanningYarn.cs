using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningYarn
    {
        public int YPlanmasID { get; set; }
        public int PlanId { get; set; }
        public int FabricID { get; set; }
        public string Fabric { get; set; }
        public int Fabric_ColorId { get; set; }
        public string BColor { get; set; }
        public string Fabric_type { get; set; }
        public decimal Fabric_Weight { get; set; }
        public DateTime EntryDate { get; set; }
        public int SlNo { get; set; }
        public string OrderNo { get; set; }
        public int StyleId { get; set; }
        public int CompanyId { get; set; }
        public string Mode { get; set; }
        public string PrgThr { get; set; }
        public int YSlno { get; set; }
        public int ComponentId { get; set; }
        public int CompSlno { get; set; }
        public string Component { get; set; }

        public List<PlanningYarn> PlanYarn { get; set; }
        public List<PlanningYarnDyeing> PlanYarnDyeing { get; set; }
        public List<PlanningYarnLoss> PlanYarnLoss { get; set; }
        public List<PlanningYarnDet> PlanYarnDet { get; set; }
        public List<PlanningYarn> PlanYarnN { get; set; }

    }
}
