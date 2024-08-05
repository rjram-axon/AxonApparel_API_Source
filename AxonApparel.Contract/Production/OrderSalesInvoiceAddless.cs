using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class OrderSalesInvoiceAddless
    {
        public Nullable<int> InvId { get; set; }
        public int InvAddLessid { get; set; }
        public Nullable<int> addless_id { get; set; }
        public decimal percentage { get; set; }
        public decimal amount { get; set; }
        public string Addless { get; set; }
        public string PlusOrMinus { get; set; }
        public string aorl { get; set; }

    }
}
