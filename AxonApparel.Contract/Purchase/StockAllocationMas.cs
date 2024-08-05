using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockAllocationMas
    {
        public int AllocationID { get; set; }
        public string AllocationNo { get; set; }
        public string AllocationRefNo { get; set; }
        public System.DateTime AllocationDate { get; set; }
        public int CompanyID { get; set; }
        public string company { get; set; }
        public int SubStoreID { get; set; }
        public string SubStore { get; set; }
        public string StockType { get; set; }
        public string OrderType { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public string OrderNo { get; set; }
        public string JobOrdNo { get; set; }

        public List<StockAllocationDet> StkDet { get; set; }
        public List<StockAllocationSection> StkSection { get; set; }
        public List<StockLocAllocation> Gendet { get; set; }
        public List<ItmStkDet> Itmstkdet { get; set; }
    }
}
