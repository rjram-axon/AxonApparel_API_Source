using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class OpenDebitAddless
    {
        public int OpenDebitAddlessid { get; set; }
        public int DebitId { get; set; }
        public int Addlessid { get; set; }
        public string Addless { get; set; }
        public string PlusOrMinus { get; set; }
        public decimal Percentage { get; set; }
        public decimal Amount { get; set; }
    }
}
