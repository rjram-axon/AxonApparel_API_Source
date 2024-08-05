using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseOrderAccount
    {
        public int Pur_Ord_Discountid { get; set; }
        public int Pur_Ord_id { get; set; }
        public int Addlessid { get; set; }
        public string Addless { get; set; }
        public string PlusOrMinus { get; set; }
        public decimal Percentage { get; set; }
        public decimal Amount { get; set; }
            
    }
}
