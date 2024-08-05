using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class BudgetApproval
    {
       public int cmpid { get; set; }
       public string cmp { get; set; }
       public int buyerid { get; set; }
       public string buyer { get; set; }
       public string orderno { get; set; }
       public int styleid { get; set; }
       public string style { get; set; }
       public DateTime date { get; set; }
       public decimal qty { get; set; }
       public string refno { get; set; }
       public int stylerwid { get; set; }
       public string type { get; set; }

       public int costdefnid { get; set; }
       public string costdefnno { get; set; }
       public decimal profitper { get; set; }
       public decimal pcswt { get; set; }


       public int purjobid { get; set; }     
       public int bomdetid { get; set; }
       public int procjobdetid { get; set; }
       public int procordid { get; set; }
       public int procorddetid { get; set; }

       public int cuttingorddetid { get; set; }
       public int cuttingordid { get; set; }
       public int itemid { get; set; }
       public decimal StyleAmnt { get; set; }
       public string GUOM { get; set; }
    }
}
