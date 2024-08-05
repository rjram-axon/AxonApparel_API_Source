using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class WorkDivision
    {
        public int WorkDivisionId { get; set; }
        public int IncrId { get; set; }
        public int UnitId { get; set; }
        public string WorkDivisionName { get; set; }

        public string DivisionType { get; set; }

        public string IsActive { get; set; }

      
    }
}