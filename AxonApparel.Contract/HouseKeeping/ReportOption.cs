using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ReportOption
    {
        public int setupid { get; set; }
        public int optionid { get; set; }
        public string option { get; set; }
        public bool optionvalue { get; set; }
    }
}
