using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Ledger
    {
        public int LedgerId { get; set; }
        public string LedgerName { get; set; }
        public string IsActive { get; set; }

    }
}
