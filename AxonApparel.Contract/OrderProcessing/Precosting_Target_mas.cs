using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class Precosting_Target_mas
    {
        public int Targetmasid { get; set; }
        public string TargetNo { get; set; }
        public DateTime EntryDate { get; set; }
        public string BMasid { get; set; }
        public string Approved { get; set; }
        public List<PrecostingTrim_det> TrimsDet { get; set; }
        public List<PrecostingFabric_det> FabricDet { get; set; }
        public List<PreCostingEmbellishment_Det> EmbellishmentDet { get; set; }
        // public List<PreCostFabDept_mas> PrecostFab { get; set; }
        public List<PrecostFabDept_Fab> PrecostFab { get; set; }
        public List<PrecostFabDept_Yarn> YarnDet { get; set; }
        public List<PrecostFabDept_Process> ProcessDet { get; set; }
    }
}
