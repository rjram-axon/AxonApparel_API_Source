using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PrefixEntry
    {
        public int DocID { get; set; }
        public string Prefix { get; set; }
        public string Document_Name { get; set; }
        public List<PrefixEntry> PrefixSetUp { get; set; }
    }
}
