using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class UpdateScript
    {
        public int ScriptId { get; set; }
        public DateTime ScriptDate { get; set; }
        public string sType { get; set; }
        public string TemplateName { get; set; }
        public int TempId { get; set; }
        public string Scripts { get; set; }
        public string result { get; set; }
        public string message { get; set; }

        
    }
}
