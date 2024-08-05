using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class SpecialRequisition
    {
       public string orderno { get; set; }
       public int buymasid { get; set; }
       public string refno { get; set; }
       public int styleid { get; set; }
       public string style { get; set; }
       public int jobid { get; set; }
       public string jobordno { get; set; }
       public int itmgrpid { get; set; }
       public string itmgrp { get; set; }
    }
}
