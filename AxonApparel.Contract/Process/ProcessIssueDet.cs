using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessIssueDet
    {
        public int ProcessIssueDetId { get; set; }
        public int ProcessIssueId { get; set; }
        public int processordid { get; set; }
        public int processorddetid { get; set; }
        public int itemid { get; set; }
        public string item { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public decimal orderqty { get; set; }
        public decimal bal { get; set; }
        public decimal IssueQty { get; set; }
        public decimal SecQty { get; set; }
        public int OutputUom { get; set; }
        public decimal OutputValue { get; set; }
        public decimal IPMarkup_Rate { get; set; }
        public string ip_op { get; set; }
        public int sno { get; set; }
        public int PlannedSizeID { get; set; }
        public int opitemid { get; set; }
        public int opcolorid { get; set; }
        public int opsizeid { get; set; }
    }
}
