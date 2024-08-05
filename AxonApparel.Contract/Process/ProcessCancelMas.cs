using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessCancelMas
    {
        public int Process_Cancel_masid { get; set; }
        public string process_Cancel_no { get; set; }
        public string process_return_no { get; set; }
        public DateTime process_Cancel_date { get; set; }
        public string Cancel_Ref_no { get; set; }
        public DateTime Cancel_Ref_date { get; set; }
        public string Remarks { get; set; }
        public string OrderType { get; set; }
        public string CancelOrClose { get; set; }
        public int proc_recpt_masid { get; set; }

        public List<ProcessCancelDet> ProcDet { get; set; }
        public List<ProcessCancelJobdet> ProcJobDet { get; set; }
        public List<ProcessCancel> ProcObj { get; set; }
    }
}
