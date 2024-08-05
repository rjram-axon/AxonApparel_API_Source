using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Sales_Inv_Det
    {
        public int SalesInvDetid { get; set; }
        public Nullable<int> SalesInvMasid { get; set; }
        public Nullable<decimal> Sales { get; set; }
        public string SalesType { get; set; }
        public string Type { get; set; }
        public string InvoiceNo { get; set; }
        public Nullable<System.DateTime> InvoiceDate { get; set; }
    }
}
