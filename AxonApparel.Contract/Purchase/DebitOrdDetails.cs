using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DebitOrdDetails
    {
        public int Debit_detid { get; set; }
        public int Debit_Orddetid { get; set; }
        public string OrderNo { get; set; }
        public int Styleid { get; set; }
        public decimal DebitQty { get; set; }
        public decimal InvQty { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public int Debit_id { get; set; }
        public int GrnDetId { get; set; }
        public string Mode { get; set; }
        public string EType { get; set; }
        public int Sno { get; set; }
        public int OItemid { get; set; }
        public int OColorid { get; set; }
        public int OSizeid { get; set; }
        public int OUomid { get; set; }
    }
}
