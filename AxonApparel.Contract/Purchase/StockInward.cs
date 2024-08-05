using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class StockInward
    {
       public string jobordno { get; set; }
       public int jobid { get; set; }
       public string refno { get; set; }
       public string orderno { get; set; }
       public int Buymasid { get; set; }
       public string style { get; set; }
       public int styleid { get; set; }
       public int itemgrpid { get; set; }
       public string itemgrp { get; set; }


       public int itemid { get; set; }
       public string item { get; set; }
       public int colorid { get; set; }
       public string color { get; set; }
       public int sizeid { get; set; }
       public string size { get; set; }
       public int unitid { get; set; }
       public string unit { get; set; }
       public decimal prgqty { get; set; }
       public decimal recdqty { get; set; }
       public decimal balqty { get; set; }
       public decimal secqty { get; set; }
       public decimal rate { get; set; }
       public long sno { get; set; }
       public int suppid { get; set; }
       public string supp { get; set; }

       

    }
}
