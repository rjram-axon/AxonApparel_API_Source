using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurDebitOthers
    {
        public int Debit_id { get; set; }
        public int Debit_othersid { get; set; }
        public string sDesc { get; set; }
        public string Reason { get; set; }
        public decimal DAmount { get; set; }
        public decimal CAmount { get; set; }
        public int InvId { get; set; }
        public string EType { get; set; }
        public string Head { get; set; }
    }

}
