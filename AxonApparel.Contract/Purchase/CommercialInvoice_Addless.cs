using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CommercialInvoice_Addless
    {
        public Nullable<int> Com_InvID { get; set; }
        public int Comiv_Addless_ID { get; set; }
        public int addlessid { get; set; }
        public decimal Percentage { get; set; }
        public decimal Amount { get; set; }
        public string AorL { get; set; }
        public string AddLess { get; set; }
        public int SlNo { get; set; }
    }
}
