using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProductionOrdAddLess
    {
        public int Production_Ord_Discountid { get; set; }
        public int Production_Ord_id { get; set; }
        public int Addlessid { get; set; }
        public string Addless { get; set; }
        public decimal Percentage { get; set; }
        public string PlusOrMinus { get; set; }
        public decimal Amount { get; set; }
    }
}
