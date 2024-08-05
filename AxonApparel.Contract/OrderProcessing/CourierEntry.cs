using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CourierEntry
    {
        public int Courier_MasId { get; set; }
        public int CompanyId { get; set; }
        public string EntryNo { get; set; }
        public DateTime EntryDate { get; set; }
        public string Ref_No { get; set; }
        public int CourierId { get; set; }
        public string DespType { get; set; }
        public int DespLocationId { get; set; }
        public string DespLocation { get; set; }
        public string AWBNo { get; set; }
        public string Courier { get; set; }
        public DateTime AWBDate { get; set; }
        public string ContactPerson { get; set; }
        public string InOrOut { get; set; }
        public bool ReturnStatus { get; set; }
        public string ReturnableDate { get; set; }
        public string Remarks { get; set; }
        public List<CourierItem> CourierItem { get; set; }
    }
}
