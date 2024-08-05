using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class StockAllocationSection
    {
        public int StockAllocationSectionID { get; set; }
        public int AllocationId { get; set; }
        public int AllocationDetID { get; set; }
        public int SectionID { get; set; }
        public string Section { get; set; }
        public decimal AllocationQty { get; set; }
        public Nullable<int> NewStockID { get; set; }
        public int sno { get; set; }
        public int SecMasid { get; set; }
        public int Stockid { get; set; }
        public int Modefn { get; set; }
        public int OldStockID { get; set; }
    }
}
