using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurInvDebCrd
    {
        public int Debit_CreditID { get; set; }
        public int Pur_Inv_id { get; set; }
        public string Head { get; set; }
        public decimal CrdAmt { get; set; }
        public decimal DbtAmt { get; set; }
        public string Reason { get; set; }
    }

}
