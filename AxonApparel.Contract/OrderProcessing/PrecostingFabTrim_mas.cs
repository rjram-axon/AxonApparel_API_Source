using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PrecostingFabTrim_mas
    {
        public int PrecostFabTrimmasid { get; set; }
        public int Buyerid { get; set; }
        public string Buyer { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public int Stylerowid { get; set; }
        public DateTime Entrydate { get; set; }
        public DateTime Orderdate { get; set; }
        public int Bmasid { get; set; }
        public string Orderno { get; set; }
        public string RefNo { get; set; }
        public int Quantity { get; set; }
        public int PreCostFabDeptmasid { get; set; }
        public DateTime ConsumptionEntrydate { get; set; }
        public DateTime RateEntrydate { get; set; }
        public List<PrecostingTrim_det> TrimsDet { get; set; }
        public List<PrecostingFabric_det> FabricDet { get; set; }
        public List<PreCostingEmbellishment_Det> EmbellishmentDet { get; set; }
       // public List<PreCostFabDept_mas> PrecostFab { get; set; }
        public List<PrecostFabDept_Fab> PrecostFab { get; set; }
        public List<PrecostFabDept_Yarn> YarnDet { get; set; }
        public List<PrecostFabDept_Process> ProcessDet { get; set; }
    }
}
