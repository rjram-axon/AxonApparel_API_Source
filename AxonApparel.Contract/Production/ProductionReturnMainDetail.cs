using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionReturnMainDetail
    {
        public int ReturnId { get; set; }
        public int ProcessId { get; set; }
        public DateTime ReturnDate { get; set; }
        public string ReturnNo { get; set; }
        public string RefNo { get; set; }
        public DateTime RefDate { get; set; }
        public string Process { get; set; }
        public string WorkDivision { get; set; }
        public string OrderNo { get; set; }
        public string ProgramNo { get; set; }
    }
}
