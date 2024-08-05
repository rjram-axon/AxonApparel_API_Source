using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public  class Prod_Return_Reason
    {
        public int Retreasondetid { get; set; }
        public Nullable<int> ProdPrgDetId { get; set; }
        public Nullable<int> RecptId { get; set; }
        public Nullable<int> ReasonId { get; set; }
        public decimal Quantity { get; set; }
        public string RType { get; set; }
        public Nullable<int> ReworkProcessid { get; set; }
        public Nullable<decimal> ReworkQty { get; set; }
        public string Reason { get; set; }
        public string Process { get; set; }
    }
}
