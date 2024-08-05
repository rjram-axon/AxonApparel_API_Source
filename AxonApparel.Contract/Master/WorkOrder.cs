using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class WorkOrder
    {
        public int Stylerowid { get; set; }
        public int StyleId { get; set; }
        public int Quantity { get; set; }
        public string Stylename { get; set; }
        public int Price { get; set; }
        public int Value { get; set; }
        public int ProcessunitId{get;set;}
        public string Workorder { get; set; }
        public int ProductionQnty { get; set; }

    }
}
