﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class State
    {
       public int id { get; set; }
       public string state { get; set; }
       public string lookup { get; set; }
       public string isactive { get; set; }
    }
}
