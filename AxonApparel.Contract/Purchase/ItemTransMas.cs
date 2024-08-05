using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ItemTransMas
    {
        public int TransMasId { get; set; }
        public string EntryNo { get; set; }
        public System.DateTime EntryDate { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string OrderType { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
        public IList<ItemTransDet> ItmTrsDet { get; set; }
    }
}
