using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TermsCondition
    {
        public int TermId { get; set; }
        public int PoId { get; set; }
        public int TermsSeq { get; set; }
        public string TermName { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
    }
}
