using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Process
    {
        /// <summary>
        /// 
        /// </summary>
        public int ProcessId { get; set; }
        public int CountProcessId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ProcessName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public byte Stage_Schedule { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsProportion { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsComponentProcess { get; set; }
        public string IsValidateProcessOrdQty { get; set; }
        public string IsEmblishmentProcess { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string AllowLotNumGen { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsActive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SeqNo { get; set; }
        public string Programinput { get; set; }
        public string Programoutput { get; set; }
        public string programtype { get; set; }
        public string program { get; set; }
        public decimal ProcessLoss { get; set; }

    }
}
