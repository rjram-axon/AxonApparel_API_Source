using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseGrnAccount
    {
        public string aorl { get; set; }
        public int Grn_OrdAddLess_Id { get; set; }
        public int grn_masid { get; set; }
        public int company_unitid { get; set; }
        public int addlessid { get; set; }
        public decimal amount { get; set; }
    }

}
