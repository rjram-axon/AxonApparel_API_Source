using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FabricMas
    {
        public int Fabric_Req_Masid { get; set; }
        public string Fabric_Req_no { get; set; }
        public DateTime Fabric_Req_date { get; set; }
        public string IntenalOrExternal { get; set; }
        public int ProcessorId { get; set; }
        public string Processor { get; set; }
        public int Buy_Ord_Masid { get; set; }
        public int DeliScheduleNo { get; set; }
        public decimal PlannedQty { get; set; }
        public decimal PendingQty { get; set; }
        public int companyid { get; set; }
        public List<FabricDet> FabDet { get; set; }
        public string Otype { get; set; }
        public int CreatedBy { get; set; }
        public string orderno { get; set; }
        public string style { get; set; }
        public int styleid { get; set; }
        public string refno { get; set; }
    }
}
