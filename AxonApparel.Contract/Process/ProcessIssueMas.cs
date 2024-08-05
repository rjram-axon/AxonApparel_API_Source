using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessIssueMas
    {
        public int ProcessIssueId { get; set; }
        public string ProcessIssueNo { get; set; }
        public DateTime ProcessIssueDate { get; set; }
        public int ProcessOrdId { get; set; }
        public string Remarks { get; set; }
        public string GatePassVehicle { get; set; }
        public int IssueStoreid { get; set; }
        public int CreatedBy { get; set; }
        public string EWayNo { get; set; }
        public DateTime EWayDate { get; set; }


        public List<ProcessIssueDet> ProcissDet { get; set; }
        public List<ProcessIssueJobdet> ProcissJobDet { get; set; }       
        public List<ProcessIssueStock> Procissstk { get; set; }
    }
}
