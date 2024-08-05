using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProductionReturn
    {
       public int processid { get; set; }
       public string process { get; set; }
       public int supplierid { get; set; }
       public string supplier { get; set; }
       public int buyerid { get; set; }
       public string buyer { get; set; }
       public int bmasid { get; set; }
       public string orderno { get; set; }
       public string refno { get; set; }

       public int prodordid { get; set; }
       public string prodord { get; set; }
       public int processorid { get; set; }
       public string processor { get; set; }
       public decimal orderqty { get; set; }
       public decimal bal { get; set; }
       public decimal issued { get; set; }
       public DateTime proddate { get; set; }
       public int cmpid { get; set; }
       public string cmp { get; set; }
       public int unitid { get; set; }
       public string unit { get; set; }
       public string ordtype { get; set; }
       public string procordtype { get; set; }

    }
}
