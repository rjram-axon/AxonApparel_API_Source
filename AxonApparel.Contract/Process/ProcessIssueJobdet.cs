using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessIssueJobdet
    {
        public int ProcessIssueJobId { get; set; }
        public int ProcessIssueId { get; set; }
        public int ProcessIssueDetId { get; set; }
        public int processorddetid { get; set; }
        public int processordjobdetid { get; set; }
        public decimal bal { get; set; }
        public string Job_ord_no { get; set; }
        public string ProdPrgNo { get; set; }
        public int LastProcessid { get; set; }
        public decimal IssueQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal SecQty { get; set; }
        public int itemid { get; set; }
        public int colorid { get; set; }
        public int sizeid { get; set; }
        public string ip_op { get; set; }
        public int sno { get; set; }
        public int jmasid { get; set; }
        public int PlannedSizeID { get; set; }
        public int opitemid { get; set; }
        public int opcolorid { get; set; }
        public int opsizeid { get; set; }
    }
}
