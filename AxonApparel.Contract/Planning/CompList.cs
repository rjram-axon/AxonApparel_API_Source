using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class CompList
    {
       public string item { get; set; }
       public int itemid { get; set; }
       public string color{get;set;}
       public int colorid { get; set; }
       public int componentid { get; set; }
       public string component { get; set; }
       public int sizeid { get; set; }
       public string size { get; set; }
       public int noparts { get; set; }
       public decimal prodqty { get; set; }
       public decimal nocomps { get; set; }
       public int sizerow { get; set; }
       public int CColorid { get; set; }
       public string CColor { get; set; }
       public string type { get; set; }
       public string required { get; set; }
      
    }
}
