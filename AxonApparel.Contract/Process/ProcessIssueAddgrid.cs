using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessIssueAddgrid
    {
       public int processid { get; set; }
       public string process { get; set; }
       public int suppid { get; set; }
       public string supp { get; set; }
       public int companyid { get; set; }
       public string company { get; set; }
       public int cmpunitid { get; set; }
       public string cmpunit { get; set; }
       public int processordid { get; set; }
       public string processorder { get; set; }
       public int processorid { get; set; }
       public string processor { get; set; }
       public DateTime procdate { get; set; }
       public decimal qty { get; set; }
       public decimal issueqty { get; set; }
       public decimal bal { get; set; }

       public int processissueid { get; set; }
       public string processissue { get; set; }
       public string orderno { get; set; }
       public string refno { get; set; }
       public string ordtype { get; set; }
       public string processortype { get; set; }
       public string remarks { get; set; }
       public int buyerid { get; set; }
       public string buyer { get; set; }
    }
}
