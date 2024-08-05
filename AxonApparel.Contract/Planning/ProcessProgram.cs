using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessProgram
    {
        public int JMasId { get; set; }
        public int CompanyId { get; set; }
        public string company { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string JobOrderNo { get; set; }
        public string Ordertype { get; set; }
        public string Programtype { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public string CompanyUnit { get; set; }
        public int CompanyUnitId { get; set; }
        public string Buyer { get; set; }
        public decimal Quantity { get; set; }
        public string orderno { get; set; }
        public int Buyordmasid { get; set; }
        public int Buyerid { get; set;}
        public string Approved { get; set; }
        public int ProcSeqMNo {get;set;}
    }
}
