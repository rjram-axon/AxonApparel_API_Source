using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProInvDc
    {
        public int Process_Inv_DcId { get; set; }
        public int Process_invid { get; set; }
        public int proc_recpt_masid { get; set; }
        public string PrnNo { get; set; }
        public string DcNo { get; set; }
        public DateTime DCDate { get; set; }
        public int ProcessId { get; set; }
        public string Process { get; set; }
    }
}
