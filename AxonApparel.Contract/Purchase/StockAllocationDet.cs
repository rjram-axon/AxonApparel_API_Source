using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockAllocationDet
    {

        public int AllocationId { get; set; }
        public int AllocationDetID { get; set; }
        public int StockID { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public decimal Qty { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public int sno { get; set; }
    }
}
