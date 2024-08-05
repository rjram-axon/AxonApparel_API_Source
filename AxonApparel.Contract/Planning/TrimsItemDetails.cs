using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TrimsItemDetails
    {
        public int AccReqMasID { get; set; }
        public int ItemId { get; set; }
        public int Sno { get; set; }
        public string ItemName { get; set; }
        public decimal quantity { get; set; }
        public int Unitid { get; set; }
        public string UOM { get; set; }
        public int Type { get; set; }
        public string PlanType { get; set; }
        public int ApplyID { get; set; }
        public string Apply { get; set; }
        public decimal Rate { get; set; }
        public string ItemRemarks { get; set; }
        public string ProdOrOrd { get; set; }
    }
}
