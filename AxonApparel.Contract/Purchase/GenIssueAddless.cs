using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class GenIssueAddless
    {
        public int GenIssueAddlessId { get; set; }
        public int IssueId { get; set; }
        public int Addlessid { get; set; }
        public decimal Amount { get; set; }
        public string Addless { get; set; }
        public decimal Percentage { get; set; }
        public string PlusOrMinus { get; set; }
        public int SlNo { get; set; }
    }
}
