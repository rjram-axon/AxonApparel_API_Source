using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionProgramming
    {
        public int Id { get; set; }
        public string JobOrderNo { get; set; }
        public string Buyer { get; set; }
        public string CompanyUnit { get; set; }
        public int CompanyUnitId { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public int StyleId { get; set; }
        public string Process { get; set; }
        public int ProcessId { get; set; }
        public decimal Quantity { get; set; }
        public int ProProgId { get; set; }
        public string ProProgNo { get; set; }
        public string reason { get; set; }
        public bool Iscomp { get; set; }
        public DateTime? ProProgDate { get; set; }
        public string Ordertype { get; set; }
        public string PrgEdittype { get; set; }

        public string Approved { get; set; }
        public int DcChk { get; set; }
        public int MaxChk { get; set; }
    }
}
