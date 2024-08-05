using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessSetup
    {
        public int ProcessSetupid { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int Processid { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CuttingorSewing { get; set; }
        public string ProcessName { get; set; }
    }
}
