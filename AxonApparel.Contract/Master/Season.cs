using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AxonApparel.Domain
{
   public class Season
    {
        public int SeasonId { get; set; }

        public string SeasonName { get; set; }

        public string IsActive { get; set; }
    }
}
